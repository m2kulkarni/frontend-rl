"""Stage 3: per-page HTML generation.

For each page declared in the design system, one Opus call produces the full HTML
file. Pages share the locked design system (palette, fonts, motifs, components),
so coherence is preserved across the 5-7 pages without the model drifting.

Calls fan out via ThreadPoolExecutor — Anthropic's HTTP client is I/O-bound and
threading is the simplest fit. Up to 7 concurrent calls (max page_count).
"""

import concurrent.futures as _cf
import json
import re
from dataclasses import dataclass

from anthropic import Anthropic

from proximal_env.generator.design_system import DesignSystem
from proximal_env.motifs import StyleLibrary
from proximal_env.taxonomy import TaxonomyPoint


SYSTEM_PROMPT = (
    "You are a senior web developer. You produce a single complete HTML5 file "
    "committed to a chosen architectural-aesthetic style, using a provided "
    "design system. The HTML must be production-quality, semantically correct, "
    "and visually committed to the style.\n\n"
    "Output ONLY the HTML file content — no preamble, no explanation, no "
    "markdown code fences. Start with `<!DOCTYPE html>` and end with `</html>`."
)


def _other_pages(filename: str, all_pages: list[dict]) -> list[dict]:
    return [p for p in all_pages if p["filename"] != filename]


def _embed_motif_svg(library: StyleLibrary, ref: str | None) -> str:
    """Read SVG body for a motif reference like 'svg/girih-8-star.svg'.

    Returns empty string if ref is None or not found. Returns the full SVG file
    contents (a couple of KB up to a few hundred KB).
    """
    if ref is None:
        return ""
    target = (library.style_dir / ref)
    if not target.is_file():
        return ""
    return target.read_text(encoding="utf-8")


def _build_motif_context(library: StyleLibrary, motif_selection: dict) -> str:
    """Produce the inline-SVG block for the prompt — assigned motifs only."""
    chunks = []
    for slot, ref in motif_selection.items():
        if not ref:
            continue
        body = _embed_motif_svg(library, ref)
        if not body:
            continue
        chunks.append(f"### Motif: {slot}  (file: `{ref}`)\n\n```svg\n{body}\n```")
    return "\n\n".join(chunks) if chunks else "(no motifs assigned to this design system)"


def build_user_prompt(
    page: dict,
    design_system: DesignSystem,
    library: StyleLibrary,
    point: TaxonomyPoint,
) -> str:
    ds = design_system.raw
    other_pages = _other_pages(page["filename"], ds["pages"])
    nav_links = "\n".join(
        f"- `{p['filename']}` — title: {p['title']!r}, role: {p['role']}"
        for p in ds["pages"]
    )

    motif_context = _build_motif_context(library, ds["motif_selection"])

    css_tokens_summary = "\n".join(f"  {k}: {v};" for k, v in ds["css_tokens"].items())

    return f"""# Goal

Produce the full HTML for **{page['filename']}** of a static-HTML website
committed to the **{point.style}** architectural-aesthetic style, in
**{point.variant}** mode, for a **{point.purpose}** site.

# Site identity

- Site name: {ds['site']['name']}
- Concept:   {ds['site']['concept']}

# Design rules (MUST follow)

{ds['design_rules']}

# CSS tokens (defined in design-system.css; reference as `var(--bg)`, etc.)

```
:root {{
{css_tokens_summary}
  --font-display: "{ds['fonts']['display']}";
  --font-body:    "{ds['fonts']['body']}";
}}
```

The shared `design-system.css` already loads these tokens, the Google Fonts, a
minimal reset, and base typography. **Your `<head>` must contain
`<link rel="stylesheet" href="design-system.css">`.** Use `var(--*)` for colors;
do NOT redefine the tokens.

# Shared component patterns (apply consistently across all pages)

- **Navigation:** {ds['shared_components']['navigation_pattern']}
- **Cards:**     {ds['shared_components']['card_pattern']}
- **Footer:**    {ds['shared_components']['footer_pattern']}

# This page

- **filename:**      `{page['filename']}`
- **title:**         {page['title']}
- **role:**          {page['role']}
- **content brief:** {page['content_brief']}

Real-feeling content. Use the brief above as a literal spec — names, dates,
prices, addresses go in. No lorem ipsum.

# Cross-page navigation

The site has {ds['page_count']} pages. Every page links to every other page
(deterministic filenames `page-1.html`...`page-{ds['page_count']}.html`):

{nav_links}

The current page's nav must include all of these as anchors. Mark the current
page as active (e.g., add `aria-current="page"`).

# Inline-SVG motifs to use

The design system pre-assigned these motif files to roles. Their full SVG
bodies are below — embed (or transform) them inline where appropriate. Do not
fetch external SVGs; do not invent geometric ornament from scratch — use these.

{motif_context}

# Hard constraints

- Single self-contained HTML file. All page-specific CSS in one `<style>` block in `<head>`.
- `<link rel="stylesheet" href="design-system.css">` is required.
- Viewport: assume the page is rendered at 1440×900. Layout for that width.
- No JavaScript. No external image fetches except via `design-system.css`'s
  Google Fonts (already handled — do not add another fonts.googleapis.com link).
- All cross-page hyperlinks use the `page-N.html` filenames listed above.
- Output ONLY the HTML. No preamble, no code fences."""


_CODE_FENCE_RE = re.compile(r"^```(?:html)?\s*\n(.*?)\n```\s*$", re.DOTALL)


def _strip_code_fence(text: str) -> str:
    text = text.strip()
    m = _CODE_FENCE_RE.match(text)
    return m.group(1) if m else text


@dataclass
class GeneratedPage:
    filename: str
    html: str
    stop_reason: str | None = None  # 'end_turn' is good; 'max_tokens' means truncated


def generate_page(
    page_brief: dict,
    design_system: DesignSystem,
    library: StyleLibrary,
    point: TaxonomyPoint,
    *,
    client: Anthropic,
    model: str = "claude-opus-4-7",
    max_tokens: int = 32000,
) -> GeneratedPage:
    """Generate one HTML page via streaming.

    Streaming is required by the Anthropic SDK for max_tokens budgets large
    enough that a non-streaming call could exceed 10 minutes. Pages can be
    32K tokens of dense HTML+SVG; we stream and aggregate.
    """
    user_prompt = build_user_prompt(page_brief, design_system, library, point)
    with client.messages.stream(
        model=model,
        max_tokens=max_tokens,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": user_prompt}],
    ) as stream:
        for _ in stream.text_stream:
            pass  # drain the stream; we only need the final aggregated message
        final = stream.get_final_message()

    text = "".join(b.text for b in final.content if b.type == "text")
    html = _strip_code_fence(text)
    return GeneratedPage(
        filename=page_brief["filename"],
        html=html,
        stop_reason=final.stop_reason,
    )


def generate_all_pages(
    design_system: DesignSystem,
    library: StyleLibrary,
    point: TaxonomyPoint,
    *,
    client: Anthropic | None = None,
    model: str = "claude-opus-4-7",
    max_concurrency: int = 7,
) -> list[GeneratedPage]:
    """Fan out one Opus call per page, in parallel threads."""
    client = client or Anthropic()
    page_briefs = design_system.page_briefs()

    def _one(brief: dict) -> GeneratedPage:
        return generate_page(brief, design_system, library, point,
                             client=client, model=model)

    with _cf.ThreadPoolExecutor(max_workers=min(max_concurrency, len(page_briefs))) as ex:
        results = list(ex.map(_one, page_briefs))

    # Re-sort to canonical order (page-1, page-2, ...) just in case threads return
    # in a non-deterministic order.
    results.sort(key=lambda g: int(g.filename.split("-")[1].split(".")[0]))
    return results


def basic_validate_html(page: GeneratedPage) -> list[str]:
    """Lightweight sanity checks. Returns list of error strings; empty = ok."""
    errors: list[str] = []
    html = page.html
    if page.stop_reason and page.stop_reason != "end_turn":
        errors.append(f"stop_reason={page.stop_reason!r} (likely truncated)")
    if not html.strip().lower().startswith("<!doctype"):
        errors.append("does not start with <!DOCTYPE>")
    if "</html>" not in html.lower():
        errors.append("missing </html> closing tag")
    if "<title>" not in html.lower():
        errors.append("missing <title>")
    if "design-system.css" not in html:
        errors.append("missing reference to design-system.css")
    return errors
