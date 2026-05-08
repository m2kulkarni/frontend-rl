"""Generate the shared design-system.css file from a DesignSystem spec.

The CSS file is what every page links to. It contains:
    - the chosen Google Fonts @import
    - the CSS custom properties (--bg, --primary, etc.) on :root
    - a minimal CSS reset
    - a few base styles (links, body type)
Pages add page-specific styles in their own <style> blocks on top of this.
"""

from proximal_env.generator.design_system import DesignSystem


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


def render_design_system_css(ds: DesignSystem) -> str:
    """Build the contents of design-system.css from the design-system JSON."""
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
    return "\n".join(parts)
