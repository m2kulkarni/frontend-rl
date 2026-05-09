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
    "You are a senior web designer producing static-HTML+CSS websites that "
    "commit hard to a chosen architectural-aesthetic style. You are given a "
    "curated motif library for that style.\n\n"
    "Your output is FOUR fenced code blocks in this exact order:\n\n"
    "  1. ```json — the design-system JSON spec (schema in the user message)\n"
    "  2. ```html — the shared <header> HTML embedded into every page verbatim\n"
    "  3. ```html — the shared <footer> HTML embedded into every page verbatim\n"
    "  4. ```css  — the shared CSS that styles the nav + footer\n\n"
    "Use four distinct ``` fenced blocks in that order. No prose between them. "
    "No content before the first fence or after the fourth."
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

    # For animated tasks, build the animation menu the LLM picks from. For
    # static tasks, this section + the schema field stay absent.
    animation_section = ""
    animation_schema = ""
    if point.animated and library.animations:
        animation_lines = "\n".join(
            f"- **{a.name}** (applies_to=`{a.applies_to}`, "
            f"duration={a.duration_sec}s, easing={a.easing}) — {a.description}"
            for a in library.animations
        )
        animation_section = f"""

# Animations menu (this is an animated site)

This is an animated task. The site has ONE looped CSS animation, applied to a single ornamental element. Pick exactly one animation from the menu below by `name` and emit it under the `animation` key in the output JSON. The animation's `applies_to` field tells you which motif role it usually targets — make sure your `motif_selection` has that role populated (don't leave it null).

{animation_lines}
"""
        animation_schema = (
            ',\n  "animation": {\n'
            '    "name": "string — exactly one of the animation names listed above"\n'
            '  }'
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

{library.notes_md}{animation_section}

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
  "card_pattern": "string — short prose description of how content cards / module units should look on body pages (this is per-page guidance only, not shared markup)",
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
  ]{animation_schema}
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

# After the JSON: three more fenced blocks (in order)

After the ```json block above, emit three more ``` fenced blocks. They are inserted **verbatim** into every page so they MUST be production-ready and identical across pages.

**Block 2 — ```html (the shared `<header>`)**

A complete `<header>` element. Must include:
- The site's wordmark / logo
- Primary navigation linking to **every** page from `page-1.html` through `page-N.html` (where N is your declared page_count) by exact filename
- Optional: small ornament / kicker / date

No `<html>`, `<head>`, or `<body>` wrappers — just the `<header>...</header>` fragment. Reference CSS variables like `var(--primary)` for colors. **Exact same HTML on every page**, so don't add page-specific decoration here.

**Block 3 — ```html (the shared `<footer>`)**

A complete `<footer>` element with site info appropriate to the purpose (address, hours, contact, repeat nav, closing ornament). Same constraints as the header block.

**Block 4 — ```css (the shared CSS for nav + footer)**

CSS rules that style the elements you used in blocks 2 and 3. These get appended to `design-system.css`, so use class selectors like `.site-nav`, `.site-footer` that match the classes you declared.

Reminder of the required output order:
1. ```json — the design system spec
2. ```html — `<header>` HTML
3. ```html — `<footer>` HTML
4. ```css  — shared CSS"""


_CODE_FENCE_RE = re.compile(r"^```(?:json)?\s*\n(.*?)\n```\s*$", re.DOTALL)
# Match every ``` fenced block (any language tag), capturing the body.
_ALL_FENCES_RE = re.compile(r"```(?:[a-zA-Z0-9_-]*)?\s*\n(.*?)```", re.DOTALL)


def _strip_code_fence(text: str) -> str:
    text = text.strip()
    m = _CODE_FENCE_RE.match(text)
    return m.group(1) if m else text


def _parse_four_block_response(text: str) -> dict:
    """Extract the JSON + 3 fenced blocks (nav HTML, footer HTML, shared CSS).

    The model is asked to emit, in order:
        ```json   {...}                    ```
        ```html   <header>...</header>     ```
        ```html   <footer>...</footer>     ```
        ```css    .site-nav { ... }        ```
    Returns the parsed JSON dict, with `shared_html` injected so downstream
    code looks the same as if the JSON had carried it directly.
    """
    blocks = _ALL_FENCES_RE.findall(text)
    if len(blocks) < 4:
        raise ValueError(
            f"expected 4 fenced blocks (JSON + nav + footer + CSS), got {len(blocks)}"
        )
    json_body = blocks[0].strip()
    parsed = json.loads(json_body)
    parsed["shared_html"] = {
        "nav_html":    blocks[1].strip(),
        "footer_html": blocks[2].strip(),
        "shared_css":  blocks[3].strip(),
    }
    return parsed


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

    # shared_html — required for every task, regardless of animated/static.
    sh = ds.get("shared_html", {})
    for key in ("nav_html", "footer_html", "shared_css"):
        if not isinstance(sh.get(key), str) or not sh[key].strip():
            errors.append(f"shared_html.{key} missing or empty")
    # Nav must link to every page-N.html.
    nav_html = sh.get("nav_html", "")
    if isinstance(nav_html, str) and isinstance(page_count, int) and page_count > 0:
        for i in range(1, page_count + 1):
            if f"page-{i}.html" not in nav_html:
                errors.append(f"shared_html.nav_html missing link to page-{i}.html")

    motif_files = {m.file for m in library.motifs}
    motif_sel = ds.get("motif_selection", {})
    for slot, value in motif_sel.items():
        if value is None:
            continue
        if value not in motif_files:
            errors.append(f"motif_selection.{slot}={value!r} not in library "
                          f"(motifs are referenced as 'svg/<name>.svg')")

    # Animation validation for animated tasks.
    if point.animated:
        if "animation" not in ds:
            errors.append("animation key missing — required for animated=True tasks")
        else:
            anim_names = {a.name for a in library.animations}
            picked = ds["animation"].get("name")
            if picked not in anim_names:
                errors.append(
                    f"animation.name={picked!r} not in library "
                    f"(valid: {sorted(anim_names)})"
                )
            else:
                # Ensure the targeted motif role has a motif assigned.
                anim = library.animation_by_name(picked)
                target_role = anim.applies_to
                if motif_sel.get(target_role) is None:
                    errors.append(
                        f"animation '{picked}' applies to {target_role!r} but "
                        f"motif_selection.{target_role} is null — pick a motif there"
                    )

    return errors


def generate_design_system(
    point: TaxonomyPoint,
    library: StyleLibrary,
    *,
    client: Anthropic | None = None,
    model: str = "claude-opus-4-7",
    max_tokens: int = 8192,
) -> DesignSystem:
    """Run the design-system pass.

    The prompt asks for FOUR fenced blocks: JSON + nav HTML + footer HTML +
    shared CSS. Splitting the HTML/CSS out of the JSON avoids the
    "unterminated string" failure mode where multi-line HTML inside a JSON
    string slot gets mangled by the model.
    """
    client = client or Anthropic()

    user_prompt = build_user_prompt(point, library)

    response = client.messages.create(
        model=model,
        max_tokens=max_tokens,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
    )

    text = "".join(b.text for b in response.content if b.type == "text")
    parsed = _parse_four_block_response(text)

    errors = validate_design_system(parsed, library, point)
    if errors:
        raise ValueError(
            "design-system validation failed:\n  - " + "\n  - ".join(errors)
        )

    return DesignSystem(raw=parsed)
