"""Generate the shared design-system.css file from a DesignSystem spec.

The CSS file is what every page links to. It contains:
    - the chosen Google Fonts @import
    - the CSS custom properties (--bg, --primary, etc.) on :root
    - a minimal CSS reset
    - a few base styles (links, body type)
    - if animated: the picked animation's @keyframes + class rule
Pages add page-specific styles in their own <style> blocks on top of this.
"""

from proximal_env.generator.design_system import DesignSystem
from proximal_env.motifs import StyleLibrary


_RESET = """\
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
img, svg { max-width: 100%; height: auto; display: block; }
"""

_BASE = """\
:root { color-scheme: light; }
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-body), Georgia, serif;
  line-height: 1.55;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display), Georgia, serif;
  color: var(--text);
  margin: 0;
  line-height: 1.18;
}
a { color: var(--text-emphasis); text-decoration: none; }
a:hover { text-decoration: underline; }
"""


def render_design_system_css(ds: DesignSystem, library: StyleLibrary | None = None) -> str:
    """Build the contents of design-system.css from the design-system JSON.

    If `library` is provided AND the design-system declared an `animation`
    block, append that animation's @keyframes + class rule so every page
    that loads design-system.css can apply the animation by adding the class.
    """
    fonts = ds.raw["fonts"]
    google_fonts_link = fonts["google_fonts_link"]
    display = fonts["display"]
    body = fonts["body"]

    tokens = ds.raw["css_tokens"]
    token_lines = [f"  {name}: {value};" for name, value in tokens.items()]
    token_block = ":root {\n" + "\n".join(token_lines) + "\n"
    token_block += f'  --font-display: "{display}";\n'
    token_block += f'  --font-body: "{body}";\n'
    token_block += "}\n"

    parts = [
        f"@import url('{google_fonts_link}');",
        "",
        token_block.rstrip(),
        "",
        _RESET.rstrip(),
        "",
        _BASE.rstrip(),
        "",
    ]

    # Shared CSS for nav + footer (lives in design-system.css so every page inherits it).
    shared_css = ds.raw.get("shared_html", {}).get("shared_css", "").strip()
    if shared_css:
        parts.extend([
            "/* --- shared (nav + footer) --- */",
            shared_css,
            "",
        ])

    # Animation block (if any).
    anim = ds.raw.get("animation")
    if anim and library is not None:
        anim_obj = library.animation_by_name(anim["name"])
        if anim_obj is not None and anim_obj.css:
            parts.extend([
                "/* --- animation: " + anim["name"] + " --- */",
                anim_obj.css.rstrip(),
                "",
            ])

    return "\n".join(parts)
