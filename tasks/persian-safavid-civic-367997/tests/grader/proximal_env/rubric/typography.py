"""Typography rubric: font-family / Google Fonts overlap.

For each page, extract:
    - The set of font-family names referenced anywhere in the HTML or in any
      same-directory CSS file linked via `<link rel="stylesheet" href=...>`.
    - The set of Google Fonts family names requested via `<link>` to
      fonts.googleapis.com.

Compare ground truth to candidate via Jaccard on each set independently, then
average. Mean across pages = typography score.

Why this representation:
    - Captures "did the candidate pick similar fonts" — the most diagnostic
      typography signal we can extract without a headless browser pass.
    - Cheap, deterministic, no rendering required.

Acknowledged limits:
    - Doesn't capture size hierarchy precisely (would require resolving the
      cascade — easier to do via a Playwright `getComputedStyle` pass; punted
      for v1).
    - Generic-family fallbacks (`serif`, `sans-serif`, etc.) are filtered out
      since they're not stylistic commitments.
    - Doesn't capture font weight / style usage — also punted for v1.
"""

from __future__ import annotations

import re
from pathlib import Path

NAME = "typography"

# `font-family: "Some Name", "Another", serif;`
_FONT_FAMILY_RE = re.compile(
    r"font-family\s*:\s*([^;}{]+)", re.IGNORECASE
)

# CSS custom-property declarations whose name contains 'font', e.g.
#   --font-display: "Yatra One";
#   --font-body: "Lora", serif;
# These let our generator (and any agent that uses CSS variables) declare the
# real font name once and reference it as `var(--font-display)`. Without picking
# these up, the GT side looks like {var(--font-display)} which never matches a
# real font name.
_CSS_VAR_FONT_RE = re.compile(
    r"--[\w-]*font[\w-]*\s*:\s*([^;}{]+)", re.IGNORECASE
)

# `<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400&family=Lora&display=swap">`
_GOOGLE_FONTS_RE = re.compile(
    r"fonts\.googleapis\.com/css2?\?[^\"'\s>]*family=([^\"'&\s>]+)", re.IGNORECASE
)

# Within one Google-Fonts URL, the `family=` parameter can repeat. Find every
# `family=...` segment and parse the family name from each.
_GOOGLE_FONTS_FAMILY_PARAM_RE = re.compile(
    r"family=([^&]+)", re.IGNORECASE
)

_GENERIC_FAMILIES = frozenset({
    "serif", "sans-serif", "monospace", "cursive", "fantasy",
    "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded",
    "inherit", "initial", "unset", "revert", "revert-layer",
})


def _load_html_with_local_css(html_path: Path) -> str:
    """Concatenate the page HTML with any same-directory CSS files it links to.

    This captures font-family declarations that live in a separate `styles.css`
    rather than inline in `<style>`.
    """
    html = html_path.read_text(encoding="utf-8", errors="replace")
    css_links = re.findall(
        r"""<link[^>]*?\bhref\s*=\s*['"]([^'"]+\.css)['"][^>]*>""",
        html,
        flags=re.IGNORECASE,
    )
    blob = html
    for link in css_links:
        if link.startswith(("http://", "https://", "//")):
            continue  # external CSS — skip
        css_path = (html_path.parent / link).resolve()
        if css_path.is_file():
            try:
                blob += "\n" + css_path.read_text(encoding="utf-8", errors="replace")
            except OSError:
                pass
    return blob


def _extract_font_families(blob: str) -> set[str]:
    """Set of non-generic font-family names referenced in the blob.

    Pulls from two patterns:
      1. Direct `font-family: "Name", ...` declarations.
      2. CSS custom-property declarations like `--font-display: "Name"` that
         our generator uses (and any agent using CSS variables).

    `var(--name)` references are skipped — they're indirections, not actual
    font names, and we resolve the indirection by also matching pattern 2.
    """
    out: set[str] = set()

    for m in _FONT_FAMILY_RE.finditer(blob):
        decl = m.group(1).strip()
        primary = decl.split(",")[0].strip().strip("'\"").strip()
        if not primary:
            continue
        if primary.startswith("var("):
            continue  # the var() will be resolved by _CSS_VAR_FONT_RE below
        if primary.lower() in _GENERIC_FAMILIES:
            continue
        out.add(primary)

    for m in _CSS_VAR_FONT_RE.finditer(blob):
        decl = m.group(1).strip()
        primary = decl.split(",")[0].strip().strip("'\"").strip()
        if not primary or primary.startswith("var("):
            continue
        if primary.lower() in _GENERIC_FAMILIES:
            continue
        out.add(primary)

    return out


def _extract_google_fonts(blob: str) -> set[str]:
    """Set of Google Fonts family names requested via `<link>` URLs."""
    out: set[str] = set()
    for url_match in _GOOGLE_FONTS_RE.finditer(blob):
        # Re-scan the URL for ALL `family=...` params (one URL can request many).
        url = url_match.group(0)
        for fm in _GOOGLE_FONTS_FAMILY_PARAM_RE.finditer(url):
            family = fm.group(1)
            # Strip weight/style spec after `:`, then turn `+` into spaces.
            family = family.split(":")[0]
            family = family.replace("+", " ").strip()
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
