"""Stage 3 — React variant: per-page TSX component generation.

Vanilla `page.py` emits a complete HTML file per page, with shared chrome
embedded verbatim and motifs as `<img src="motifs/X.svg">` references.

For framework="react", the equivalent unit is a `Page<N>.tsx` React
component. The pipeline takes care of *everything else* — `package.json`,
`vite.config.ts`, `tsconfig.json`, `index.html`, `main.tsx`, `App.tsx`,
and the shared `Nav.tsx` / `Footer.tsx` / `Motif.tsx` components. The LLM
only writes the per-page component body.

Output of `generate_react_page(brief, ds, library, point)` is a
`GeneratedPage` whose `.html` field actually carries the TSX text. We
reuse the GeneratedPage container so callers stay framework-agnostic.

Motifs: the LLM emits `<Motif name="..." className="..." width=... />`.
At task-package time the build pipeline regex-replaces those with verbatim
source SVG bodies — exact same trick as `inline_motif_imgs()` in
`page.py`, just JSX flavored.
"""

from __future__ import annotations

import re

from anthropic import Anthropic

from proximal_env.generator.design_system import DesignSystem
from proximal_env.motifs import StyleLibrary
from proximal_env.taxonomy import TaxonomyPoint


SYSTEM_PROMPT_REACT = (
    "You are a senior React+TypeScript engineer. You produce a single React "
    "component (one default-exported function) for one page of a multi-page "
    "site committed to a chosen architectural-aesthetic style. The component "
    "must be production-quality, use the provided design system tokens via "
    "className/CSS variables, and use the provided shared `<Nav />`, "
    "`<Footer />`, and `<Motif name=... />` building blocks.\n\n"
    "Output ONLY the TSX file content — no preamble, no explanation, no "
    "markdown code fences. Start with `import` statements and end with a "
    "default export."
)


def _build_motif_catalog(library: StyleLibrary, motif_selection: dict) -> str:
    """Return a tiny per-slot catalog of available motifs (basename + notes)."""
    motifs_by_path = library.motifs_by_filename()
    chunks = []
    for slot, ref in motif_selection.items():
        if not ref:
            continue
        basename = ref.split("/")[-1].rsplit(".svg", 1)[0]
        motif = motifs_by_path.get(ref) or library.motif_by_basename(ref.split("/")[-1])
        notes = (motif.notes if motif else "") or "(no description)"
        chunks.append(f"- **slot `{slot}`** → `<Motif name=\"{basename}\" />` — {notes}")
    return "\n".join(chunks) if chunks else "(no motifs assigned)"


def _animation_section(ds_raw: dict, library: StyleLibrary) -> str:
    """Build the animation guidance block (only for animated tasks)."""
    anim_spec = ds_raw.get("animation")
    if not anim_spec or not library.animations:
        return ""
    anim_obj = library.animation_by_name(anim_spec["name"])
    if anim_obj is None:
        return ""
    target_role = anim_obj.applies_to
    target_motif_path = ds_raw["motif_selection"].get(target_role)
    if not target_motif_path:
        return ""
    target_motif = target_motif_path.split("/")[-1].rsplit(".svg", 1)[0]
    # The class name comes from the design-system.css `@keyframes` rule;
    # by convention we emit `animated-<animation-name>`.
    css_class = f"animated-{anim_spec['name']}"
    return f"""
# Animation (this site is animated)

The shared `design-system.css` already declares the `@keyframes` rule for
the animation `{anim_spec['name']}`. On THIS page, find the
`<Motif name="{target_motif}" />` you embed — apply `className="{css_class}"`
to it (or wrap it in a `<div className="{css_class}">`). The animation
runs on the entire targeted ornament; do not animate any other element.

Animation summary: *{anim_obj.description}* — duration {anim_obj.duration_sec}s,
easing {anim_obj.easing}, looped infinitely.
"""


def build_react_user_prompt(
    page: dict,
    design_system: DesignSystem,
    library: StyleLibrary,
    point: TaxonomyPoint,
) -> str:
    ds = design_system.raw
    motif_catalog = _build_motif_catalog(library, ds["motif_selection"])
    css_tokens_summary = "\n".join(f"  {k}: {v};" for k, v in ds["css_tokens"].items())
    animation_section = _animation_section(ds, library)
    page_n = page["filename"].replace("page-", "").replace(".html", "")

    return f"""# Goal

Produce **`src/pages/Page{page_n}.tsx`** — a single React component for page
**{page['filename']}** of a multi-page React+TypeScript+Vite site committed to
the **{point.style}** architectural-aesthetic style, in **{point.variant}**
mode, for a **{point.purpose}** site.

# Site identity

- Site name:  {ds['site']['name']}
- Concept:    {ds['site']['concept']}

# Design rules (MUST follow)

{ds['design_rules']}

# CSS tokens (defined in `design-system.css`, already loaded by `index.html`)

```css
:root {{
{css_tokens_summary}
  --font-display: "{ds['fonts']['display']}";
  --font-body:    "{ds['fonts']['body']}";
}}
```

Reference these in your CSS class declarations or inline styles
(`style={{{{ background: 'var(--bg)' }}}}` — note the double braces in JSX).
**Do NOT redefine the tokens** in this file.

# Pre-built imports — use these

The project already contains:
- `import Nav from '../shared/Nav'`
- `import Footer from '../shared/Footer'`
- `import Motif from '../shared/Motif'`

Use them directly:

```tsx
<Nav />                      // verbatim shared header on every page
<Footer />                   // verbatim shared footer on every page
<Motif name="seigaiha-waves" className="seal" width={{120}} height={{120}} />
```

The build pipeline replaces each `<Motif>` instance with the verbatim source
SVG body at package time, carrying class/width/height/style props onto the
inlined `<svg>`. **Do not draw your own SVGs. Do not import SVG files.**

# Motifs available for this design system

{motif_catalog}
{animation_section}
# This page

- **page name:**     `{page['filename']}` (rendered at hash route `#/page-{page_n}`)
- **title:**         {page['title']}
- **role:**          {page['role']}
- **content brief:** {page['content_brief']}

Real-feeling content. Use the brief above as a literal spec — names, dates,
prices, addresses go in. No lorem ipsum.

# Hard constraints

- Single file: `src/pages/Page{page_n}.tsx`. Default-exports a function
  component named `Page{page_n}`.
- Use **JSX/TSX**: `className=` (not class), `htmlFor=` (not for),
  `{{expressions}}` for JS values, `style={{{{ ... }}}}` for inline styles.
- All page-specific CSS goes in a top-level `<style>{{ `<expression with backticks>` }}</style>`
  block at the start of your component's return — that's the React idiom for
  per-component CSS without an extra .css file. Use `var(--bg)` etc. for
  tokens.
- `<Nav />` at the top of the page's main wrapper, `<Footer />` at the bottom.
- No JavaScript-only navigation; the App-level hash router handles route
  changes. Cross-page links use `<a href="#/page-N">` for `N` in 1..6.
- Output **ONLY** the .tsx file content. No preamble, no code fences, no
  comments outside the file. Start with `import ...` and end with the
  default export."""


# ---- Route rewriting (post-process) ----------------------------------------

# Vanilla shared HTML uses href="page-N.html" for cross-page links. The React
# variant runs through a hash router that expects href="#/page-N". This is a
# deterministic fix-up — no JSX surgery, just URL rewriting.
_HREF_PAGE_HTML_RE = re.compile(r'href="page-(\d+)\.html"', re.IGNORECASE)


def rewrite_react_routes(jsx: str) -> str:
    """Rewrite `href="page-N.html"` → `href="#/page-N"` for the React variant."""
    return _HREF_PAGE_HTML_RE.sub(r'href="#/page-\1"', jsx)


# ---- Motif inlining (post-process) -----------------------------------------

# Match `<Motif name="X" {...other-attrs} />` (and `<Motif name="X" {...} ></Motif>`).
# JSX `props={value}` syntax means we may see `width={120}` etc., not just
# `width="120"`. Both must round-trip onto the inlined <svg>.
_MOTIF_TAG_RE = re.compile(
    r"<Motif\s+([^>]*?)/?>(?:</Motif>)?",
    re.DOTALL | re.IGNORECASE,
)
_NAME_ATTR_RE = re.compile(r'\bname\s*=\s*"([^"]+)"', re.IGNORECASE)
_SVG_OPEN_RE = re.compile(r"<svg\b([^>]*)>", re.IGNORECASE)
_XML_DECL_RE = re.compile(r"<\?xml[^?]*\?>\s*", re.IGNORECASE)
_DOCTYPE_RE = re.compile(r"<!DOCTYPE[^>]*>\s*", re.IGNORECASE)
# Inline <style>...</style> blocks inside source SVGs contain raw CSS like
# `.st0{fill:none}` — those `{` would be interpreted as JSX expression
# delimiters at build time. Wrap the contents in a template literal.
_INNER_STYLE_RE = re.compile(r"<style\b([^>]*)>(.*?)</style>",
                             re.DOTALL | re.IGNORECASE)


def inline_motif_jsx(tsx: str, library: StyleLibrary) -> str:
    """Replace `<Motif name="X" ...attrs />` with the verbatim source SVG body
    as a JSX expression.

    Same idea as `inline_motif_imgs()` in `page.py`, but the JSX flavor:
    every preserved attr goes onto the outer `<svg>` tag, and the attrs may
    use JSX `{expr}` syntax (e.g. `width={120}`) or string syntax
    (`width="120"`).
    """
    def replace(match: re.Match) -> str:
        attrs_blob = match.group(1)
        name_match = _NAME_ATTR_RE.search(attrs_blob)
        if not name_match:
            return match.group(0)  # malformed: leave as-is, dev-time stub will render
        name = name_match.group(1)

        # Strip the `name=` attr from what we'll forward to the <svg>.
        forwarded = _NAME_ATTR_RE.sub("", attrs_blob, count=1).strip()
        # Strip any trailing slash from JSX self-close.
        forwarded = re.sub(r"/$", "", forwarded).strip()

        # Look up the motif file. The LLM emits the bare basename (no .svg
        # extension); we map back to the manifest entry.
        motif = library.motif_by_basename(name + ".svg")
        if motif is None:
            return match.group(0)  # unknown motif — leave the JSX placeholder

        body = library.read_motif_svg(motif)
        body = _XML_DECL_RE.sub("", body)
        body = _DOCTYPE_RE.sub("", body)
        body = body.strip()

        # XML/HTML comments (e.g. `<!-- Created with Inkscape -->` from
        # Wikimedia source SVGs) aren't valid JSX. Strip them — they're
        # metadata, not visual content.
        body = re.sub(r"<!--.*?-->", "", body, flags=re.DOTALL)
        # `<!DOCTYPE svg [<!ENTITY foo "..."> ... ]>` — DOCTYPE with internal
        # subset. Strip the whole thing (open + entities + close) so we don't
        # leave orphan `]>` brackets behind. Stripped before the looser
        # `<!\w+...>` regex so the entire block goes as a unit.
        body = re.sub(r"<!DOCTYPE\b[^>\[]*\[.*?\]\s*>", "", body,
                      flags=re.DOTALL | re.IGNORECASE)
        # SGML/XML declarations like `<!ENTITY ns_ai "...">` (Adobe
        # Illustrator metadata) and standalone `<!DOCTYPE svg>`. JSX rejects
        # the leading `<!`, esbuild errors with "Expected identifier".
        body = re.sub(r"<!\w+[^>]*?>", "", body, flags=re.DOTALL)
        # Final cleanup: orphan `]>` lines left behind when an entity-stripping
        # pass removed the contents of a DOCTYPE internal subset but the close
        # bracket survived (this happens when the entity regex caught the
        # individual entries before the DOCTYPE-with-subset regex could match).
        body = re.sub(r"^\s*\]>\s*$", "", body, flags=re.MULTILINE)
        # The source SVG might contain `class="foo"` — needs JSX rewrite.
        body = body.replace("class=", "className=")
        # Inline-style attributes inside the SVG (`style="x:y"`) ALSO need to
        # become JSX-style objects. Rare in our motifs (mostly path data),
        # but cheap to handle: just remove inline style= entirely. Future
        # work could parse them properly.
        body = re.sub(r'\s+style="[^"]*"', "", body)
        # `<style>.x{fill:none}</style>` would have its `{` parsed as a JSX
        # expression — wrap the body in a template literal so it's a string.
        # Result: `<style ...>{`.x{fill:none}`}</style>`.
        body = _INNER_STYLE_RE.sub(
            lambda m: f"<style{m.group(1)}>{{`{m.group(2)}`}}</style>",
            body,
        )

        # Merge forwarded attrs onto the <svg>.
        def merge(m: re.Match) -> str:
            existing = m.group(1) or ""
            sep = " " if existing and not existing.endswith(" ") else ""
            return f"<svg{existing}{sep}{forwarded}>" if forwarded else f"<svg{existing}>"

        body = _SVG_OPEN_RE.sub(merge, body, count=1)

        # Wrap in a JSX expression so it sits inside arbitrary JSX context.
        # `dangerouslySetInnerHTML` would also work but doesn't let CSS reach
        # inside; plain JSX SVG does.
        return body
    return _MOTIF_TAG_RE.sub(replace, tsx)


# ---- LLM call --------------------------------------------------------------

_CODE_FENCE_RE = re.compile(r"^```(?:tsx|jsx|typescript|ts)?\s*\n(.*?)\n```\s*$", re.DOTALL)


def _strip_code_fence(text: str) -> str:
    text = text.strip()
    m = _CODE_FENCE_RE.match(text)
    return m.group(1) if m else text


def generate_react_page_tsx(
    page_brief: dict,
    design_system: DesignSystem,
    library: StyleLibrary,
    point: TaxonomyPoint,
    *,
    client: Anthropic,
    model: str = "claude-opus-4-7",
    max_tokens: int = 32000,
) -> tuple[str, str]:
    """Generate one React page-component file. Returns (target_filename, tsx_text).

    target_filename is e.g. 'src/pages/Page3.tsx' so the caller can write
    it to disk at the right path.
    """
    user_prompt = build_react_user_prompt(page_brief, design_system, library, point)
    with client.messages.stream(
        model=model,
        max_tokens=max_tokens,
        system=SYSTEM_PROMPT_REACT,
        messages=[{"role": "user", "content": user_prompt}],
    ) as stream:
        for _ in stream.text_stream:
            pass
        final = stream.get_final_message()

    text = "".join(b.text for b in final.content if b.type == "text")
    tsx = _strip_code_fence(text)
    tsx = inline_motif_jsx(tsx, library)
    tsx = rewrite_react_routes(tsx)

    page_n = page_brief["filename"].replace("page-", "").replace(".html", "")
    target = f"src/pages/Page{page_n}.tsx"
    return target, tsx
