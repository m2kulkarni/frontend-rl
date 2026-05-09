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


def _build_motif_context(library: StyleLibrary, motif_selection: dict) -> str:
    """Produce the per-slot motif catalog for the prompt.

    Output is a tiny table — slot, basename, and a one-line description from
    the manifest. We deliberately do NOT include the SVG body in the prompt
    anymore: the LLM doesn't need to copy the geometry, only decide where to
    place each motif and at what size/class. The build inlines the bodies
    deterministically post-LLM (`inline_motif_imgs`).
    """
    chunks = []
    motifs_by_path = library.motifs_by_filename()
    for slot, ref in motif_selection.items():
        if not ref:
            continue
        basename = ref.split("/")[-1]
        motif = motifs_by_path.get(ref) or library.motif_by_basename(basename)
        notes = (motif.notes if motif else "") or "(no description)"
        chunks.append(
            f"- **slot `{slot}`** → `motifs/{basename}` — {notes}"
        )
    return "\n".join(chunks) if chunks else "(no motifs assigned to this design system)"


_IMG_MOTIF_RE = re.compile(
    r'<img\s+([^>]*?)\bsrc="motifs/([^"]+\.svg)"([^>]*?)/?>',
    re.IGNORECASE | re.DOTALL,
)
_SVG_OPEN_RE = re.compile(r'<svg\b([^>]*)>', re.IGNORECASE)
_XML_DECL_RE = re.compile(r'<\?xml[^?]*\?>\s*', re.IGNORECASE)
_DOCTYPE_RE = re.compile(r'<!DOCTYPE[^>]*>\s*', re.IGNORECASE)


def inline_motif_imgs(html: str, library: StyleLibrary) -> str:
    """Replace `<img src="motifs/X.svg" ...>` with the inlined SVG body.

    The LLM is told to emit `<img src="motifs/<basename>.svg" class="..." width=...>`
    references for ornaments. This pass reads each referenced SVG file and
    inlines it byte-for-byte (path data, viewBox), merging the `<img>`'s
    attributes (class, width, height, style) onto the outer `<svg>` tag so
    layout + recoloring CSS still hits.

    Geometric fidelity is now structural: the LLM cannot redraw the motif
    even if it wanted to.
    """
    def replace(match: re.Match) -> str:
        before_attrs = (match.group(1) or "").strip()
        ref = match.group(2)
        after_attrs = (match.group(3) or "").strip()
        extra_attrs = " ".join(p for p in (before_attrs, after_attrs) if p)

        motif = library.motif_by_basename(ref.split("/")[-1])
        if motif is None:
            return match.group(0)  # unknown motif — leave the img alone (will 404)

        body = library.read_motif_svg(motif)
        body = _XML_DECL_RE.sub("", body)
        body = _DOCTYPE_RE.sub("", body)
        body = body.strip()

        # Merge LLM-provided attributes onto the outer <svg>. The source SVG
        # already has its own viewBox, xmlns, width, height — we APPEND new
        # attrs after, and the browser uses the *last* duplicate, so size/class
        # from the LLM wins over the source's hard-coded width/height.
        def merge_into_svg(svg_match: re.Match) -> str:
            existing = svg_match.group(1) or ""
            sep = " " if existing and not existing.endswith(" ") else ""
            return f"<svg{existing}{sep}{extra_attrs}>" if extra_attrs else f"<svg{existing}>"

        return _SVG_OPEN_RE.sub(merge_into_svg, body, count=1)

    return _IMG_MOTIF_RE.sub(replace, html)


def build_user_prompt(
    page: dict,
    design_system: DesignSystem,
    library: StyleLibrary,
    point: TaxonomyPoint,
) -> str:
    ds = design_system.raw
    motif_context = _build_motif_context(library, ds["motif_selection"])
    css_tokens_summary = "\n".join(f"  {k}: {v};" for k, v in ds["css_tokens"].items())

    sh = ds.get("shared_html", {})
    nav_html = sh.get("nav_html", "")
    footer_html = sh.get("footer_html", "")

    # If the design-system selected an animation, give the page generator the
    # animation's CSS class name + target motif role so it knows which inline
    # SVG to mark with the matching class.
    animation_section = ""
    anim_spec = ds.get("animation")
    if anim_spec and library.animations:
        anim_obj = library.animation_by_name(anim_spec["name"])
        if anim_obj is not None:
            css_class = _animation_css_class(anim_obj.css) or f"animated-{anim_spec['name']}"
            target_role = anim_obj.applies_to
            target_motif = ds["motif_selection"].get(target_role)
            animation_section = f"""
# Animation (this site is animated)

The shared `design-system.css` already declares the @keyframes + class rule for the animation `{anim_spec['name']}`. Your job on each page: ensure the inline SVG embedded for the **`{target_role}`** motif (file: `{target_motif}`) carries the CSS class `{css_class}` on its outermost wrapping element. That wrapper can be the `<svg>` itself or a containing `<div>`/`<span>` — whatever makes layout sense — but the class **must be applied** so the animation activates.

The animation: *{anim_obj.description}* — duration {anim_obj.duration_sec}s, easing {anim_obj.easing}, looped infinitely. The animation runs on the entire targeted ornament; do not animate any other element.
"""

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

# Shared HTML — embed VERBATIM (do not modify)

The site has a single shared `<header>` and `<footer>` that appear identically on every page. The exact HTML is provided below. **You must paste these blocks verbatim** at the top and bottom of `<body>` respectively. Do not change classes, attribute order, or text.

### nav_html — paste at the top of <body>:

```html
{nav_html}
```

### footer_html — paste at the bottom of <body>:

```html
{footer_html}
```

The CSS rules that style these blocks are already in `design-system.css`. Don't re-style them in this page's `<style>` block.

## Card pattern (per-page guidance only)

{ds.get('card_pattern', '')}

# This page

- **filename:**      `{page['filename']}`
- **title:**         {page['title']}
- **role:**          {page['role']}
- **content brief:** {page['content_brief']}
{animation_section}

Real-feeling content. Use the brief above as a literal spec — names, dates,
prices, addresses go in. No lorem ipsum.

# Cross-page navigation

Already handled by the shared `nav_html` above. Filenames in the site:
`page-1.html` through `page-{ds['page_count']}.html`. The current page is `{page['filename']}`.

# Motifs — emit references; the build inlines them for you

The design system pre-assigned these motif files to roles. **Do not draw
your own SVG. Do not paste SVG bodies into the HTML.** Instead, emit a
plain `<img>` tag referencing the file, and the build pipeline will replace
each one with the file's verbatim SVG body before rendering.

Format:
  `<img src="motifs/<basename>.svg" class="<your-class>" width="<px>" height="<px>" style="...">`

The `class`, `width`, `height`, and `style` attributes you put on the
`<img>` will be carried onto the outer `<svg>` after inlining, so they
control layout and CSS targeting normally. Recoloring the motif works via
ordinary CSS:

```css
.seal {{ fill: var(--accent); }}
.divider svg path {{ stroke: var(--fg); }}
```

(remember: after inlining, `<img class="seal">` becomes `<svg class="seal">` —
your CSS targets the inlined SVG directly).

The motifs assigned to this design system:

{motif_context}

Use these slots judiciously — each page only needs a few motifs, not all of
them. Place them where the screenshot's typographic rhythm calls for an
ornament: dividers, seals, marginalia, hero accents, footer flourishes.
Every `<svg>`-flavored ornament you emit MUST be an `<img src="motifs/...">`
reference — never a hand-drawn `<svg>` block.

# Hard constraints

- Single self-contained HTML file. All page-specific CSS in one `<style>` block in `<head>`.
- `<link rel="stylesheet" href="design-system.css">` is required.
- Viewport: assume the page is rendered at 1440×900. Layout for that width.
- No JavaScript. No external image fetches except via `design-system.css`'s
  Google Fonts (already handled — do not add another fonts.googleapis.com link).
- All cross-page hyperlinks use the `page-N.html` filenames listed above.
- Output ONLY the HTML. No preamble, no code fences."""


_CODE_FENCE_RE = re.compile(r"^```(?:html)?\s*\n(.*?)\n```\s*$", re.DOTALL)
_FIRST_CLASS_RE = re.compile(r"\.([a-zA-Z][a-zA-Z0-9_-]*)\s*\{")


def _animation_css_class(css: str) -> str | None:
    """Extract the first class selector defined in an animation CSS block.

    For our animations the second rule is always `.animated-foo { animation: ...; }`.
    """
    m = _FIRST_CLASS_RE.search(css)
    return m.group(1) if m else None


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
    # Replace `<img src="motifs/X.svg" ...>` references with the literal SVG
    # body from disk. This is what makes GT geometrically faithful to the
    # source library — the LLM never gets to redraw the motifs.
    html = inline_motif_imgs(html, library)
    return GeneratedPage(
        filename=page_brief["filename"],
        html=html,
        stop_reason=final.stop_reason,
    )


def _generate_all_react_pages(
    design_system: DesignSystem,
    library: StyleLibrary,
    point: TaxonomyPoint,
    *,
    client: Anthropic,
    model: str,
    max_concurrency: int,
) -> list[GeneratedPage]:
    """React variant: parallel page-LLM calls + bundled boilerplate files.

    Returns one GeneratedPage per file the caller should write — the LLM-
    generated `src/pages/Page<N>.tsx` plus the deterministic project shell
    (`package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`,
    `src/main.tsx`, `src/App.tsx`, `src/shared/{Nav,Footer,Motif}.tsx`).
    """
    from proximal_env.generator.page_react import generate_react_page_tsx
    from proximal_env.generator.react_templates import react_project_files

    page_briefs = design_system.page_briefs()

    def _one(brief: dict) -> GeneratedPage:
        target, tsx = generate_react_page_tsx(brief, design_system, library, point,
                                              client=client, model=model)
        return GeneratedPage(filename=target, html=tsx, stop_reason=None)

    with _cf.ThreadPoolExecutor(max_workers=min(max_concurrency, len(page_briefs))) as ex:
        page_results = list(ex.map(_one, page_briefs))

    # Stable sort: pages first (in page-N order), then boilerplate files.
    page_results.sort(
        key=lambda g: int(g.filename.rsplit("/", 1)[-1].replace("Page", "").replace(".tsx", ""))
    )

    sh = design_system.raw.get("shared_html", {})
    boilerplate = react_project_files(
        site_name=design_system.raw["site"]["name"],
        nav_html=sh.get("nav_html", ""),
        footer_html=sh.get("footer_html", ""),
        num_pages=len(page_briefs),
    )
    boilerplate_pages = [
        GeneratedPage(filename=path, html=content, stop_reason=None)
        for path, content in boilerplate
    ]
    return page_results + boilerplate_pages


def generate_all_pages(
    design_system: DesignSystem,
    library: StyleLibrary,
    point: TaxonomyPoint,
    *,
    client: Anthropic | None = None,
    model: str = "claude-opus-4-7",
    max_concurrency: int = 7,
) -> list[GeneratedPage]:
    """Fan out one Opus call per page, in parallel threads.

    Dispatches on `point.framework`:
      - "vanilla" (default): emits page-1.html ... page-6.html, each with
        embedded shared header/footer + inlined SVG motifs.
      - "react": emits src/pages/Page1.tsx ... PageN.tsx (one Opus call each)
        PLUS the deterministic React+Vite project shell (package.json,
        vite.config.ts, App.tsx, etc.) — see `react_templates.py`.
    """
    client = client or Anthropic()

    if point.framework == "react":
        return _generate_all_react_pages(
            design_system, library, point,
            client=client, model=model, max_concurrency=max_concurrency,
        )

    # Vanilla path (the original behavior).
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
    """Lightweight sanity checks. Returns list of error strings; empty = ok.

    Only checks vanilla HTML pages (page-N.html). React TSX files and project
    boilerplate are validated by the build step (Vite catches their issues
    when render runs `npm run build`).
    """
    errors: list[str] = []
    if not page.filename.endswith(".html"):
        return errors  # not HTML — skip validation
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
