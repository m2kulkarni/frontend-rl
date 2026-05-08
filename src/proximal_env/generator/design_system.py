"""Stage 2: design-system generation.

Single Opus call that locks every cross-page design decision before any individual
page is generated. Output is a JSON object with site identity, CSS tokens, font
selection, motif assignments, and per-page briefs. Downstream stages (page generation)
fan out using this spec as shared context.
"""

import json
import re
from dataclasses import dataclass

from anthropic import Anthropic

from proximal_env.motifs import StyleLibrary
from proximal_env.taxonomy import TaxonomyPoint


SYSTEM_PROMPT = (
    "You are a senior web designer producing static-HTML+CSS websites that commit "
    "hard to a chosen architectural-aesthetic style. You are given a curated motif "
    "library for that style. Your job is to produce a single design-system "
    "specification in JSON.\n\n"
    "Output ONLY the JSON object — no preamble, no explanation, no markdown code "
    "fences."
)


def build_user_prompt(point: TaxonomyPoint, library: StyleLibrary) -> str:
    pairings = library.pairings_for(point.variant)
    pairings_summary = "\n".join(
        f"- **{p.name}**: display={p.display}, body={p.body} — {p.notes}"
        for p in pairings
    )

    motifs_summary = "\n".join(
        f"- `{m.file}` (role: {m.role}) — {m.notes[:120]}"
        for m in library.motifs
    )

    palette_named = library.named_colors()
    variant_roles = library.palette["variants"][point.variant]
    palette_summary = "\n".join(
        f"- **{role}**: `{name}` = `{palette_named[name]}`"
        for role, name in variant_roles.items()
    )

    return f"""# Goal

Produce a design-system specification for a static-HTML website committed to the
**{point.style}** architectural-aesthetic style, in **{point.variant}** mode,
for a **{point.purpose}** site.

The site has 5 to 7 pages. You decide the page count and what each page is for.
Pages are referenced by deterministic filenames `page-1.html` through `page-N.html`,
contiguous. Every page links to every other page.

Use real-feeling content briefs — period-appropriate prose, plausible names / dates /
addresses / labels. No lorem ipsum.

# Style brief (notes.md, verbatim)

{library.notes_md}

# Palette — named colors and role mapping for variant=`{point.variant}`

{palette_summary}

# Available font pairings for variant=`{point.variant}`

{pairings_summary}

# Available SVG motifs

{motifs_summary}

# Required JSON schema

```json
{{
  "site": {{
    "name": "string — proper-noun site name, period-feeling and specific",
    "concept": "string — one sentence",
    "purpose": "{point.purpose}"
  }},
  "css_tokens": {{
    "--bg":            "#hex",
    "--surface":       "#hex",
    "--primary":       "#hex",
    "--secondary":     "#hex",
    "--accent":        "#hex",
    "--text":          "#hex",
    "--text-emphasis": "#hex",
    "--ornament":      "#hex"
  }},
  "fonts": {{
    "pairing_name":      "string — pick from the listed pairings",
    "display":           "string — display family",
    "body":              "string — body family",
    "google_fonts_link": "https://fonts.googleapis.com/css2?family=...&display=swap"
  }},
  "motif_selection": {{
    "hero_frame":         "filename.svg or null",
    "section_dividers":   "filename.svg or null",
    "centerpiece_seal":   "filename.svg or null",
    "ornament_inline":    "filename.svg or null",
    "background_pattern": "filename.svg or null"
  }},
  "shared_components": {{
    "navigation_pattern": "string — prose about how nav looks",
    "card_pattern":       "string",
    "footer_pattern":     "string"
  }},
  "design_rules": "string — 2-3 sentences pinning the visual character of this site",
  "page_count": <integer 5-7 inclusive>,
  "pages": [
    {{
      "filename":      "page-1.html",
      "title":         "string — the <title> for this page",
      "role":          "string — short role tag (home / collection / about / visit / etc.)",
      "content_brief": "string — 2-4 sentences of real-feeling content spec"
    }}
    // ... one entry per page, filenames page-1.html through page-N.html (contiguous)
  ]
}}
```

# Constraints

- CSS token hex values: pick from the palette declared above; the role mappings tell
  you which named color goes to which CSS variable role.
- Font names must come from the pairings list above.
- Motif filenames must be either `null` or a value from the SVG list above (the
  `svg/foo.svg` form, NOT just `foo.svg`).
- `page_count` is between 5 and 7 inclusive. Page filenames are
  `page-1.html` through `page-{{page_count}}.html`, contiguous.
- Real-feeling content. No lorem ipsum.

Output ONLY the JSON object. No preamble. No code fences."""


_CODE_FENCE_RE = re.compile(r"^```(?:json)?\s*\n(.*?)\n```\s*$", re.DOTALL)


def _strip_code_fence(text: str) -> str:
    text = text.strip()
    m = _CODE_FENCE_RE.match(text)
    return m.group(1) if m else text


@dataclass
class DesignSystem:
    raw: dict

    @property
    def page_count(self) -> int:
        return int(self.raw["page_count"])

    @property
    def site_name(self) -> str:
        return self.raw["site"]["name"]

    def page_briefs(self) -> list[dict]:
        return self.raw["pages"]


def validate_design_system(ds: dict, library: StyleLibrary, point: TaxonomyPoint) -> list[str]:
    """Return a list of validation error strings; empty list = valid."""
    errors: list[str] = []

    page_count = ds.get("page_count")
    if not isinstance(page_count, int) or not (5 <= page_count <= 7):
        errors.append(f"page_count must be int 5-7, got {page_count!r}")

    pages = ds.get("pages", [])
    if not isinstance(pages, list) or len(pages) != page_count:
        errors.append(f"len(pages)={len(pages)} != page_count={page_count}")

    expected_files = {f"page-{i}.html" for i in range(1, (page_count or 0) + 1)}
    actual_files = {p.get("filename") for p in pages if isinstance(p, dict)}
    if expected_files != actual_files:
        errors.append(
            f"page filenames mismatch: expected {sorted(expected_files)}, "
            f"got {sorted(actual_files)}"
        )

    required_tokens = {
        "--bg", "--surface", "--primary", "--secondary", "--accent",
        "--text", "--text-emphasis", "--ornament",
    }
    tokens = ds.get("css_tokens", {})
    missing = required_tokens - tokens.keys()
    if missing:
        errors.append(f"missing css_tokens: {sorted(missing)}")

    motif_files = {m.file for m in library.motifs}
    motif_sel = ds.get("motif_selection", {})
    for slot, value in motif_sel.items():
        if value is None:
            continue
        if value not in motif_files:
            errors.append(f"motif_selection.{slot}={value!r} not in library "
                          f"(motifs are referenced as 'svg/<name>.svg')")

    return errors


def generate_design_system(
    point: TaxonomyPoint,
    library: StyleLibrary,
    *,
    client: Anthropic | None = None,
    model: str = "claude-opus-4-7",
    max_tokens: int = 4096,
) -> DesignSystem:
    client = client or Anthropic()

    user_prompt = build_user_prompt(point, library)

    response = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
    )

    text = "".join(b.text for b in response.content if b.type == "text")
    text = _strip_code_fence(text)
    parsed = json.loads(text)

    errors = validate_design_system(parsed, library, point)
    if errors:
        raise ValueError(
            "design-system validation failed:\n  - " + "\n  - ".join(errors)
        )

    return DesignSystem(raw=parsed)
