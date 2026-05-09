"""Typography rubric: usage-grounded font-family + Google-Fonts overlap.

For each page, build two sets of font names:

  Set A — fonts actually used in CSS rules
      Walk every CSS rule (inline `<style>` blocks, linked same-directory
      .css files). For each rule with a `font-family: ...` declaration,
      add EVERY name in the family stack (not just the primary). Generic
      families (serif, sans-serif, …) are dropped. CSS variables that
      declare a font but are never `var(--foo)`-referenced elsewhere are
      treated as dead and dropped.

  Set B — fonts requested via Google Fonts <link>
      Parse `<link href="https://fonts.googleapis.com/css2?family=Cinzel&family=Lora">`
      to get the URL-requested family names.

Jaccard each set against GT's, average per page, mean across pages.

What this catches:
  • Stuffing the family stack (`font-family: "Cinzel", "Lora", "Playfair",
    every-font, serif;`) used to score 1.0 because the rubric only took the
    primary. Now the whole stack contributes — the adversary's set grows,
    so Jaccard goes DOWN, not up.
  • Loading Google Fonts but never applying them: still allowed in set B
    (URL request is a real DOM artifact), but it doesn't drag set A up.
  • Dead CSS variables (`--font-display: "X"` with no `var()` reference)
    are excluded — closes the "declare but never reference" hack.

What this still doesn't catch:
  • Visual-similarity credit (Lora vs Spectral both look editorial, but
    score 0 today). That's a signal-quality fix, not a hack-fix; see
    docs/rubric_audit.md for the style-cluster credit plan.
"""

from __future__ import annotations

import re
from pathlib import Path

NAME = "typography"

# `font-family: "Some Name", "Another", serif;` — the whole declaration value.
_FONT_FAMILY_RE = re.compile(
    r"font-family\s*:\s*([^;}{]+)", re.IGNORECASE
)

# CSS custom-property declarations whose name contains 'font'. These act as
# font-name aliases that other rules reach via `var(--name)`.
_CSS_VAR_FONT_RE = re.compile(
    r"(--[\w-]*font[\w-]*)\s*:\s*([^;}{]+)", re.IGNORECASE
)

# `<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400&family=Lora&display=swap">`
_GOOGLE_FONTS_URL_RE = re.compile(
    r"fonts\.googleapis\.com/css2?\?[^\"'\s>]*", re.IGNORECASE
)
_FAMILY_PARAM_RE = re.compile(r"family=([^&]+)", re.IGNORECASE)

_GENERIC_FAMILIES = frozenset({
    "serif", "sans-serif", "monospace", "cursive", "fantasy",
    "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded",
    "inherit", "initial", "unset", "revert", "revert-layer",
})


def _load_html_with_local_css(html_path: Path) -> str:
    """Concatenate page HTML with any same-directory .css file it links to."""
    html = html_path.read_text(encoding="utf-8", errors="replace")
    css_links = re.findall(
        r"""<link[^>]*?\bhref\s*=\s*['"]([^'"]+\.css)['"][^>]*>""",
        html,
        flags=re.IGNORECASE,
    )
    blob = html
    for link in css_links:
        if link.startswith(("http://", "https://", "//")):
            continue
        css_path = (html_path.parent / link).resolve()
        if css_path.is_file():
            try:
                blob += "\n" + css_path.read_text(encoding="utf-8", errors="replace")
            except OSError:
                pass
    return blob


def _parse_stack(value: str) -> list[str]:
    """Tokenize a `font-family: ...` value into a list of font names.

    Drops generic families. Strips quotes. Preserves order so the caller
    can dedup if it wants to (we don't — set semantics handle that).
    """
    out: list[str] = []
    for raw in value.split(","):
        name = raw.strip().strip("'\"").strip()
        if not name:
            continue
        if name.startswith("var("):
            # Indirection — caller resolves via _CSS_VAR_FONT_RE. Skip here.
            continue
        if name.lower() in _GENERIC_FAMILIES:
            continue
        out.append(name)
    return out


def _live_css_var_fonts(blob: str) -> dict[str, list[str]]:
    """Return CSS-var → list-of-font-names *only* if the var is actually used.

    A var like `--font-display: "Cinzel"` is dead unless some other rule
    references `var(--font-display)`. Dead vars don't contribute to the
    "fonts used" set (closes the declare-but-never-reference hack).
    """
    out: dict[str, list[str]] = {}
    for m in _CSS_VAR_FONT_RE.finditer(blob):
        var_name = m.group(1)
        var_value = m.group(2)
        # Is var_name referenced via var(--name) anywhere in the blob?
        if not re.search(rf"var\(\s*{re.escape(var_name)}\b", blob):
            continue
        fonts = _parse_stack(var_value)
        if fonts:
            out[var_name] = fonts
    return out


def _extract_font_families(blob: str) -> set[str]:
    """Set of non-generic font-family names actually used by CSS rules."""
    out: set[str] = set()

    # Direct font-family declarations — the whole stack contributes (not just
    # the primary). Stuffing the stack hurts Jaccard via larger union.
    for m in _FONT_FAMILY_RE.finditer(blob):
        out.update(_parse_stack(m.group(1)))

    # CSS variables that ARE referenced elsewhere — resolve and add their stacks.
    for fonts in _live_css_var_fonts(blob).values():
        out.update(fonts)

    return out


def _extract_google_fonts(blob: str) -> set[str]:
    """Set of Google Fonts family names requested via <link> URLs."""
    out: set[str] = set()
    for url_match in _GOOGLE_FONTS_URL_RE.finditer(blob):
        url = url_match.group(0)
        for fm in _FAMILY_PARAM_RE.finditer(url):
            family = fm.group(1).split(":")[0].replace("+", " ").strip()
            if family:
                out.add(family)
    return out


def _jaccard(a: set, b: set) -> float:
    if not a and not b:
        return 1.0
    union = a | b
    return len(a & b) / len(union) if union else 1.0


def _per_page_score(gt_blob: str, cand_blob: str) -> float:
    gt_fam = _extract_font_families(gt_blob)
    cand_fam = _extract_font_families(cand_blob)
    gt_goog = _extract_google_fonts(gt_blob)
    cand_goog = _extract_google_fonts(cand_blob)
    return 0.5 * (_jaccard(gt_fam, cand_fam) + _jaccard(gt_goog, cand_goog))


def _per_page_scores(gt_dir: Path, cand_dir: Path) -> dict[str, float]:
    out: dict[str, float] = {}
    for gt_file in sorted(gt_dir.glob("page-*.html")):
        cand_file = cand_dir / gt_file.name
        if not cand_file.is_file():
            out[gt_file.name] = 0.0
            continue
        gt_blob = _load_html_with_local_css(gt_file)
        cand_blob = _load_html_with_local_css(cand_file)
        out[gt_file.name] = _per_page_score(gt_blob, cand_blob)
    return out


def score(ground_truth_dir: Path, candidate_dir: Path) -> float:
    per_page = _per_page_scores(Path(ground_truth_dir), Path(candidate_dir))
    if not per_page:
        return 0.0
    return sum(per_page.values()) / len(per_page)


def score_detailed(ground_truth_dir: Path, candidate_dir: Path) -> dict:
    per_page = _per_page_scores(Path(ground_truth_dir), Path(candidate_dir))
    mean = sum(per_page.values()) / len(per_page) if per_page else 0.0
    return {"per_page": per_page, "mean": mean}
