#!/usr/bin/env python3
"""Build script: inlines motif SVGs into HTML page templates."""
import re
import os
import sys

MOTIFS_DIR = "/app/motifs"
OUTPUT_DIR = "/app/output"


def clean_svg(path, want_attrs=None, recolor=True):
    """Read an SVG file, strip XML decl/DOCTYPE/comments/metadata, return the <svg>...</svg>.
    If want_attrs is provided (dict), they are merged into the <svg> opening tag.
    """
    with open(path, "r", encoding="utf-8") as f:
        s = f.read()
    # Strip XML declaration
    s = re.sub(r"<\?xml[^>]*\?>", "", s)
    # Strip DOCTYPE block (with internal subset)
    s = re.sub(r"<!DOCTYPE[^>]*(?:\[.*?\])?\s*>", "", s, flags=re.DOTALL)
    # Strip comments
    s = re.sub(r"<!--.*?-->", "", s, flags=re.DOTALL)
    # Strip <metadata>...</metadata>
    s = re.sub(r"<metadata[^>]*>.*?</metadata>", "", s, flags=re.DOTALL)
    # Strip sodipodi:namedview block (single tag or range)
    s = re.sub(r"<sodipodi:namedview\b[^/]*/>", "", s, flags=re.DOTALL)
    s = re.sub(r"<sodipodi:namedview\b.*?</sodipodi:namedview>", "", s, flags=re.DOTALL)
    # Strip defs that are empty or only contain sodipodi
    # Trim
    s = s.strip()
    # find <svg ...>
    m = re.search(r"<svg\b([^>]*)>", s, flags=re.DOTALL)
    if not m:
        return s
    open_tag_attrs = m.group(1)
    rest = s[m.end():]
    end_idx = rest.rfind("</svg>")
    inner = rest[:end_idx] if end_idx >= 0 else rest
    # Drop xmlns:dc, xmlns:cc, xmlns:rdf, xmlns:sodipodi, xmlns:inkscape, xmlns:i, xmlns:graph, xmlns:x, xmlns:serif, xmlns:xlink (keep), x="0px" y="0px"
    open_tag_attrs = re.sub(r'\s+xmlns:(?:dc|cc|rdf|sodipodi|inkscape|i|graph|x|serif|svg)="[^"]*"', "", open_tag_attrs)
    open_tag_attrs = re.sub(r'\s+(?:sodipodi|inkscape|i):[a-zA-Z\-]+="[^"]*"', "", open_tag_attrs)
    open_tag_attrs = re.sub(r'\s+id="[^"]*"', "", open_tag_attrs, count=1)
    open_tag_attrs = re.sub(r'\s+enable-background="[^"]*"', "", open_tag_attrs)
    open_tag_attrs = re.sub(r'\s+xml:space="[^"]*"', "", open_tag_attrs)
    open_tag_attrs = re.sub(r'\s+overflow="[^"]*"', "", open_tag_attrs)
    open_tag_attrs = re.sub(r'\s+x="0px"', "", open_tag_attrs)
    open_tag_attrs = re.sub(r'\s+y="0px"', "", open_tag_attrs)
    open_tag_attrs = re.sub(r'\s+version="[^"]*"', "", open_tag_attrs)
    open_tag_attrs = re.sub(r'\s+width="[^"]*"', "", open_tag_attrs)
    open_tag_attrs = re.sub(r'\s+height="[^"]*"', "", open_tag_attrs)
    # Strip sodipodi/inkscape attributes within inner content
    inner = re.sub(r'\s+(?:sodipodi|inkscape):[a-zA-Z\-]+="[^"]*"', "", inner)
    inner = re.sub(r"<sodipodi:[^>]*>.*?</sodipodi:[^>]*>", "", inner, flags=re.DOTALL)
    inner = re.sub(r"<sodipodi:[^/]*/>", "", inner, flags=re.DOTALL)
    inner = re.sub(r"<inkscape:[^>]*>.*?</inkscape:[^>]*>", "", inner, flags=re.DOTALL)
    inner = re.sub(r"<inkscape:[^/]*/>", "", inner, flags=re.DOTALL)
    if recolor == True:
        # Recolor hardcoded fills/strokes to currentColor (preserving 'none'/'transparent')
        def replace_style(mt):
            st = mt.group(1)
            def repl_color(m, prop):
                val = m.group(1).strip()
                if val.lower() in ("none", "transparent", "currentcolor"):
                    return f"{prop}:{val};"
                return f"{prop}:currentColor;"
            st = re.sub(r"stroke:([^;\"]+);?", lambda m: repl_color(m, "stroke"), st)
            st = re.sub(r"fill:([^;\"]+);?", lambda m: repl_color(m, "fill"), st)
            return f'style="{st}"'
        inner = re.sub(r'style="([^"]*)"', replace_style, inner)
        inner = re.sub(r'fill="#[0-9a-fA-F]{3,6}"', 'fill="currentColor"', inner)
        inner = re.sub(r'stroke="#[0-9a-fA-F]{3,6}"', 'stroke="currentColor"', inner)
        for c in ("black", "white", "Black", "White", "BLACK", "WHITE"):
            inner = inner.replace(f'fill="{c}"', 'fill="currentColor"')
            inner = inner.replace(f'stroke="{c}"', 'stroke="currentColor"')
    elif isinstance(recolor, dict):
        # color remap dict: {"#abc": "#def", ...}, case-insensitive
        for src, dst in recolor.items():
            sl = src.lower(); su = src.upper()
            for variant in (sl, su, src):
                inner = inner.replace(f'#{variant.lstrip("#")}', f'{dst}')
                inner = inner.replace(f'fill:{variant}', f'fill:{dst}')
                inner = inner.replace(f'stroke:{variant}', f'stroke:{dst}')
    # Clean up whitespace
    inner = re.sub(r"\s+\n", "\n", inner)
    inner = re.sub(r"\n\s+", "\n", inner)
    inner = re.sub(r"\n+", "\n", inner)

    extra = ""
    if want_attrs:
        for k, v in want_attrs.items():
            extra += f' {k}="{v}"'
    return f"<svg{open_tag_attrs}{extra}>{inner}</svg>"


def load_motif(name, recolor=True, **attrs):
    return clean_svg(os.path.join(MOTIFS_DIR, name), want_attrs=attrs, recolor=recolor)


# Pre-load motifs (with placeholder; we'll size them via CSS)
M = {
    "divider": lambda: load_motif("arabesque-filet-divider.svg", **{"preserveAspectRatio": "xMidYMid meet"}),
    "horseshoe": lambda: load_motif("arch-horseshoe.svg", **{"preserveAspectRatio": "xMidYMid meet"}),
    "ogee": lambda: load_motif("arch-ogee.svg", **{"preserveAspectRatio": "xMidYMid meet"}),
    "arrangement": lambda: load_motif("girih-arrangement.svg", recolor={
        "#00A0C6": "#3b51a5",
        "#309E2D": "#4a8a3e",
        "#4360AA": "#3b51a5",
        "#4DB9B6": "#4a8a3e",
        "#ABDA4D": "#4a8a3e",
        "#FF0000": "#0d1a36",
        "#FFFFFF": "#0d1a36",
    }, **{"preserveAspectRatio": "xMidYMid meet"}),
    "arrangement_red": lambda: load_motif("girih-arrangement.svg", recolor={
        "#00A0C6": "#b53a3a",
        "#309E2D": "#4a8a3e",
        "#4360AA": "#3b51a5",
        "#4DB9B6": "#b53a3a",
        "#ABDA4D": "#4a8a3e",
        "#FF0000": "#0d0d0d",
        "#FFFFFF": "#0d0d0d",
    }, **{"preserveAspectRatio": "xMidYMid meet"}),
    "tess1": lambda: load_motif("girih-tessellation-1.svg", **{"preserveAspectRatio": "xMidYMid meet"}),
    "tess2": lambda: load_motif("girih-tessellation-2.svg", **{"preserveAspectRatio": "xMidYMid meet"}),
    "tess3": lambda: load_motif("girih-tessellation-3.svg", **{"preserveAspectRatio": "xMidYMid slice"}),
    "tiles": lambda: load_motif("girih-tiles-set.svg", **{"preserveAspectRatio": "xMidYMid meet"}),
    "star": lambda: load_motif("islamic-star.svg", **{"preserveAspectRatio": "xMidYMid meet"}),
    "palmette": lambda: load_motif("arabesque-palmette.svg", **{"preserveAspectRatio": "xMidYMid meet"}),
    "headpiece": lambda: load_motif("arabesque-serlio-headpiece.svg", **{"preserveAspectRatio": "xMidYMid meet"}),
    "tailpiece": lambda: load_motif("arabesque-serlio-tailpiece.svg", **{"preserveAspectRatio": "xMidYMid meet"}),
    "spandrel": lambda: load_motif("spandrel-pattern.svg", **{"preserveAspectRatio": "xMidYMid meet"}),
    "geo": lambda: load_motif("islamic-geometric-pattern.svg", **{"preserveAspectRatio": "xMidYMid meet"}),
}

cached = {}


def m(name):
    if name not in cached:
        cached[name] = M[name]()
    return cached[name]


# ---------- Common templates ----------

NAV_LINKS = [
    ("page-1.html", "Entrance"),
    ("page-2.html", "Galleries"),
    ("page-3.html", "Exhibition"),
    ("page-4.html", "Visit"),
    ("page-5.html", "Scholarship"),
    ("page-6.html", "About"),
]


def header(active_idx):
    nav = "".join(
        f'<a href="{href}" class="{"active" if i == active_idx else ""}">{label}</a>'
        for i, (href, label) in enumerate(NAV_LINKS)
    )
    return f"""<header class="site-header">
  <div class="brand">
    <div class="est">EST.<br>ISFAHAN<br>1971</div>
    <div class="logo">
      <span class="name">Museum of</span>
      <span class="brand-mark">&#10038;</span>
      <span class="name">Isfahan</span>
      <span class="sub">The Safavid Court</span>
    </div>
  </div>
  <nav class="main-nav">{nav}</nav>
</header>
"""


def divider(extra_class=""):
    return f'<div class="divider {extra_class}">{m("divider")}</div>'


def footer():
    return f"""<footer class="site-footer">
  <div class="footer-mark"><span class="seal-mark">{SMALL_STAR}</span></div>
  <div class="footer-cols">
    <div>
      <h5>The Museum</h5>
      <p>17 Chahar Bagh Abbasi Avenue<br>Isfahan, Iran 8174652871</p>
      <p>+98 31 3222 4040<br>contact@museumofisfahan.ir</p>
    </div>
    <div>
      <h5>Hours</h5>
      <p>Tuesday — Sunday<br>09:00 — 17:30</p>
      <p>Closed Mondays<br>Closed Nowruz Week</p>
    </div>
    <div>
      <h5>Halls</h5>
      <ul>
        <li>Entrance</li><li>Galleries</li><li>Current Exhibition</li>
        <li>Visit</li><li>Scholarship</li><li>About</li>
      </ul>
    </div>
    <div>
      <h5>Patronage</h5>
      <p>Iwan Patron · Tilework Circle · Atelier Friend</p>
      <p>For bequests and dedications, write to the Office of the Director.</p>
    </div>
  </div>
  <div class="colophon">
    © 1971 — 2024 Museum of Isfahan · Ministry of Cultural Heritage, Tourism and Handicrafts
    <span class="tag">Beneath the Half of the World</span>
  </div>
</footer>
"""

# Style the footer mark — apply size via CSS but svg dimensions need attr. We need to inject width/height onto the inline svg.
# We'll style via CSS using .footer-mark svg


HEAD = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=1440">
<title>Museum of Isfahan — {title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Almendra+SC&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Marcellus&display=swap" rel="stylesheet">
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="page-wrap">
"""

TAIL = """</div>
</body>
</html>
"""


# Helpers to wrap SVGs with classes
def svg_with_class(html, cls):
    """Insert class= attribute into the first <svg ...> tag."""
    return re.sub(r"<svg\b", f'<svg class="{cls}"', html, count=1)


def svg_with_color(html, fill=None, stroke=None):
    insert = ""
    if fill:
        insert += f' fill="{fill}"'
    if stroke:
        insert += f' stroke="{stroke}"'
    return re.sub(r"<svg\b", f"<svg{insert}", html, count=1)


# A small reusable color seal (the colorful little square)
SMALL_STAR = """<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <g fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">
    <polygon points="32,4 38,22 56,22 41,33 47,52 32,40 17,52 23,33 8,22 26,22"/>
    <circle cx="32" cy="32" r="22"/>
    <polygon points="32,12 35,24 48,24 38,32 42,46 32,38 22,46 26,32 16,24 29,24"/>
  </g>
</svg>"""

def color_seal_svg():
    """A handcrafted small color seal showing girih-style color tessellation
    (matches the small colorful tessellation badge seen in headers)."""
    return """<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
  <rect width="120" height="120" fill="#0d1a36"/>
  <g stroke="#000" stroke-width="1.4" stroke-linejoin="round">
    <!-- 4x4 grid of star+circle tessellation, alternating green & blue with red circles -->
    <g>
      <rect x="0" y="0" width="30" height="30" fill="#3b51a5"/>
      <rect x="30" y="0" width="30" height="30" fill="#4a8a3e"/>
      <rect x="60" y="0" width="30" height="30" fill="#3b51a5"/>
      <rect x="90" y="0" width="30" height="30" fill="#4a8a3e"/>
      <rect x="0" y="30" width="30" height="30" fill="#4a8a3e"/>
      <rect x="30" y="30" width="30" height="30" fill="#3b51a5"/>
      <rect x="60" y="30" width="30" height="30" fill="#4a8a3e"/>
      <rect x="90" y="30" width="30" height="30" fill="#3b51a5"/>
      <rect x="0" y="60" width="30" height="30" fill="#3b51a5"/>
      <rect x="30" y="60" width="30" height="30" fill="#4a8a3e"/>
      <rect x="60" y="60" width="30" height="30" fill="#3b51a5"/>
      <rect x="90" y="60" width="30" height="30" fill="#4a8a3e"/>
      <rect x="0" y="90" width="30" height="30" fill="#4a8a3e"/>
      <rect x="30" y="90" width="30" height="30" fill="#3b51a5"/>
      <rect x="60" y="90" width="30" height="30" fill="#4a8a3e"/>
      <rect x="90" y="90" width="30" height="30" fill="#3b51a5"/>
    </g>
    <g fill="#b53a3a">
      <circle cx="15" cy="15" r="8"/><circle cx="45" cy="15" r="8"/>
      <circle cx="75" cy="15" r="8"/><circle cx="105" cy="15" r="8"/>
      <circle cx="15" cy="45" r="8"/><circle cx="45" cy="45" r="8"/>
      <circle cx="75" cy="45" r="8"/><circle cx="105" cy="45" r="8"/>
      <circle cx="15" cy="75" r="8"/><circle cx="45" cy="75" r="8"/>
      <circle cx="75" cy="75" r="8"/><circle cx="105" cy="75" r="8"/>
      <circle cx="15" cy="105" r="8"/><circle cx="45" cy="105" r="8"/>
      <circle cx="75" cy="105" r="8"/><circle cx="105" cy="105" r="8"/>
    </g>
    <g fill="none" stroke="#0d1a36" stroke-width="1.4">
      <path d="M0 30 L30 0 M30 30 L60 0 M60 30 L90 0 M90 30 L120 0
               M0 60 L30 30 M30 60 L60 30 M60 60 L90 30 M90 60 L120 30
               M0 90 L30 60 M30 90 L60 60 M60 90 L90 60 M90 90 L120 60
               M0 120 L30 90 M30 120 L60 90 M60 120 L90 90 M90 120 L120 90"/>
    </g>
  </g>
</svg>"""


def page1():
    body = f"""{header(0)}
<section class="hero">
  <div class="notice">Founded MDCCCLXXI <span class="sep">·</span> Chahar Bagh District</div>
  <div class="hero-arch">
    {svg_with_color(m('horseshoe'), fill='none', stroke='currentColor')}
    <div class="infill">{color_seal_svg().replace('viewBox="0 0 120 120"', 'viewBox="0 0 120 120" class="breathe"')}</div>
  </div>
  <h1>Beneath the<span class="it">Half of the World</span></h1>
  <p class="lede">A museum of the arts, architecture, and courtly life of Safavid Iran, 1501–1736.</p>
  <div class="meta">Galleries Open Today <span class="sep">·</span> 09:00 — 17:30 <span class="sep">·</span> Free with Admission of 300,000 IRR</div>
</section>

<section class="section alt">
  <h2 class="section-title">An Address from the Director</h2>
  {divider("short")}
  <div class="prose">
    <p class="dropcap">Founded in 1971 in the gardens of Chahar Bagh, this museum was conceived as a centre for the study of the Safavid age — that brief, brilliant interval when Isfahan, seized by Shah ʿAbbas I to be the seat of empire, was named by its peers <em>nesf-e jahān</em>, the half of the world. Within these walls are gathered eleven from the Mosque-i-Shah, illuminated manuscripts from the royal book-bindery, tiles of Kashan and Yazd, and the courtly portraiture of Riza ʿAbbasi.</p>
    <p>We see, before all else, a place of close looking. The objects ask for it; the city requires it.</p>
  </div>
</section>

<section class="section">
  <div class="eyebrow-c">Currently in the Halls</div>
  <h2 class="section-title">Three Notices for the Visitor</h2>
  <div class="cards">
    <div class="card">
      <div class="kicker">Current Exhibition</div>
      <h3>Riza ʿAbbasi &amp; the<br>Single-Page Painting</h3>
      <div class="seal">{SMALL_STAR}</div>
      <p>Forty-two loose drawings between 1598 and 1635, gathered for the first time outside the album-trades, dervishes, and the long calligraphic lines that defined the late Safavid hand.</p>
      <div class="cta">Hall V <span style="color:var(--ink-soft)">·</span> Through 28 March 2025</div>
    </div>
    <div class="card">
      <div class="kicker">New on Conservation</div>
      <h3>The Ardabil-Style<br>Carpet Fragment</h3>
      <div class="seal">{SMALL_STAR}</div>
      <p>After three months in the textile atelier, the medallion fragment attributed to the Tabriz workshop, c. 1539, returns to view. Wool on silk warp; restored knot count 380 per square inch.</p>
      <div class="cta">Hall I <span style="color:var(--ink-soft)">·</span> On view from 9 November</div>
    </div>
    <div class="card">
      <div class="kicker">For Your Visit</div>
      <h3>Hours of the<br>Galleries</h3>
      <div class="seal">{SMALL_STAR}</div>
      <table class="hours-table">
        <tr><td>Tuesday — Thursday</td><td>09:00 — 17:30</td></tr>
        <tr><td>Friday</td><td>10:00 — 19:00</td></tr>
        <tr><td>Saturday — Sunday</td><td>09:00 — 17:30</td></tr>
        <tr><td>Mondays</td><td>Closed</td></tr>
        <tr><td>Nowruz Week</td><td>Closed</td></tr>
      </table>
      <p style="font-size:12px;color:var(--ink-soft);margin-top:14px">Last admission thirty minutes before closing. The People's Salon Reading Room remains open by appointment until 21:00.</p>
      <div class="cta">Admissions <span style="color:var(--ink-soft)">·</span> 300,000 IRR</div>
    </div>
  </div>
</section>

<section class="quote">
  <div class="qmark">&#10078;</div>
  <blockquote>The great square of Isfahan is, in my opinion, the most beautiful in the world; it is more vast than the Place Royale of Paris, and bordered all about with double porticoes of two storeys, of an equal whiteness, broken only by tilework of so prodigious a blue that one would say a piece of the very heaven had fallen upon the earth.</blockquote>
  <cite>— Jean Chardin, Voyages en Perse, 1686</cite>
</section>

<section class="findus">
  <div class="col left">
    <h4>The Museum</h4>
    <p>17 Chahar Bagh Abbasi Avenue</p>
    <p>Isfahan, Iran 8174652871</p>
    <p style="margin-top:10px;font-style:italic;color:var(--ink-soft)">Two blocks south of the Madreseh-ye Chahar Bagh</p>
  </div>
  <div class="badge">{color_seal_svg()}</div>
  <div class="col right">
    <h4>Find Us / Correspondence</h4>
    <p>+98 31 3222 4040</p>
    <p>contact@museumofisfahan.ir</p>
    <p style="margin-top:10px;font-style:italic;color:var(--ink-soft)">Office of the Director by appointment</p>
  </div>
</section>

{footer()}
"""
    return HEAD.format(title="Entrance") + body + TAIL


def page2():
    body = f"""{header(1)}
<section class="hero">
  <div class="eyebrow">Hall II <span class="dot">·</span> The Permanent Collection</div>
  <h1>Galleries of the<br>Safavid Court</h1>
  <div class="color-seal breathe">{color_seal_svg()}</div>
  <p class="lede">Seven halls trace two centuries of imperial patronage — from the cobalt tilework of the Maydan-i Naqsh-i Jahan to the inlaid steel of the arsenal of Shah Sultan Husayn. Each gallery is curated as a chapter in a single argument: that under the Safavids, Isfahan became, as the saying goes, half of the world.</p>
  {divider("short")}
</section>

<section class="stats">
  <div><div class="num">7</div><div class="lab">Permanent Halls</div></div>
  <div><div class="num">3,418</div><div class="lab">Catalogued Objects</div></div>
  <div><div class="num">1501–1736</div><div class="lab">Era of the Dynasty</div></div>
  <div><div class="num">14</div><div class="lab">Curators in Residence</div></div>
</section>

<section class="section">
  <div class="eyebrow-c">Visit by Hall</div>
  <h2 class="section-title">The Seven Galleries</h2>
  {divider("short")}
  <div class="galleries">
    <div class="gallery-card">
      <div class="num">Gallery I</div>
      <h3>Tilework of the Maydān</h3>
      <div class="keyline">1602 — 1622</div>
      <p>Cuerda-seca and haft-rang panels salvaged in the 1958 conservation campaign of the Masjid-i Shah's portal niches, paired with kiln-tile fragments.</p>
      <div class="foot">— ground floor —</div>
    </div>
    <div class="gallery-card">
      <div class="num">Gallery II</div>
      <h3>Manuscripts of the Royal Library</h3>
      <div class="keyline">1587 — 1666</div>
      <p>Sixteen illuminated bindings from the Kitabkhāna of Shah Abbas, including a Khamsa of Nizami in the hand of Mir Imad and the Falnāma of Shah Tahmasp.</p>
      <div class="foot">— ground floor —</div>
    </div>
    <div class="gallery-card">
      <div class="num">Gallery III</div>
      <h3>Inlaid Steel &amp; the Arsenal of Yazd</h3>
      <div class="keyline">1610 — 1722</div>
      <p>Damascened cuirasses, mace heads, and the celebrated cuirass of Mirza Husayn — eighty-three pieces from the workshops of Yazd and Mashhad.</p>
      <div class="foot">— first floor —</div>
    </div>
    <div class="gallery-card">
      <div class="num">Gallery IV</div>
      <h3>Metalwork &amp; Majolica Vessels</h3>
      <div class="keyline">1576 — 1729</div>
      <p>Tinned-copper basins, brass dirham trays inlaid with silver and copper, ceremonial ewers, and a unique pierced lamp from the shrine of Hazrat Maʿsuma.</p>
      <div class="foot">— first floor —</div>
    </div>
    <div class="gallery-card">
      <div class="num">Gallery V</div>
      <h3>Coinage of Shah ʿAbbas I</h3>
      <div class="keyline">1587 — 1629</div>
      <p>Three hundred silver abbasis, mahmudis, and shahis arranged by mint and reign, with a study cabinet of forty-two rare lārins struck at Hormuz.</p>
      <div class="foot">— first floor —</div>
    </div>
    <div class="gallery-card">
      <div class="num">Gallery VI</div>
      <h3>Portraiture: Riza &amp; his Pupils</h3>
      <div class="keyline">1598 — 1672</div>
      <p>Forty-eight album leaves of dervishes, page-boys and gentlemen of the court, drawn in the soft black-and-tinted manner that defined the late Safavid school.</p>
      <div class="foot">— second floor —</div>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="callout-box">
    <h3>The Reconstructed Iwān</h3>
    <p style="color:var(--ink)">A fifteen-metre architectural recreation of the eastern <em>iwān</em> from the Sheikh Lutfullah, mounted in the museum's central atrium with an annotated diagram of its tilework. The gallery is open to scholars and to schoolchildren on guided visits; an audio commentary in the Isfahani dialect plays continuously.</p>
    <div class="cta" style="margin-top:14px;text-align:center;font-family:var(--font-caps);letter-spacing:0.25em;color:var(--gold);font-size:11px;text-transform:uppercase">Visit Hall VII · Daily after Asr Prayer</div>
  </div>
</section>

<section class="section deep">
  <div class="eyebrow-c">From the Registrar</div>
  <h2 class="section-title">Recent Acquisitions, 2023–2024</h2>
  {divider("short")}
  <table class="acq-table">
    <tr><td class="yr">2024</td><td><div class="ttl">Tinder-tin steel inkpot, gilt</div><div class="desc">Damascened iron with silver inlay, Khorasan, c.1685</div></td><td class="src">Donated from the estate of Bahram Khanlarī</td><td class="gal">Gallery III</td></tr>
    <tr><td class="yr">2024</td><td><div class="ttl">The first deposit binding of Nizami</div><div class="desc">Lacquered pasteboard, with mother-of-pearl inlay, Tabriz workshop, dated 1614</div></td><td class="src">Acquired at auction, Tehran</td><td class="gal">Gallery II</td></tr>
    <tr><td class="yr">2023</td><td><div class="ttl">Underglaze-painted dish with lustre and palmette</div><div class="desc">Stonepaste, Isfahan kiln, late 17th century</div></td><td class="src">Bequest of Dr Manūchehr Hekmatī</td><td class="gal">Gallery IV</td></tr>
    <tr><td class="yr">2023</td><td><div class="ttl">Six folios from a Falnāma of Shah Tahmasp</div><div class="desc">Pigment, gold, silver on paper, c.1546</div></td><td class="src">Long-term loan from the Hekmatī Foundation</td><td class="gal">Gallery II</td></tr>
    <tr><td class="yr">2023</td><td><div class="ttl">Standing-cup album leaves by the Aqā Riza pupils</div><div class="desc">Drawing in black ink with gold-flake, c.1612</div></td><td class="src">Purchase</td><td class="gal">Gallery VI</td></tr>
    <tr><td class="yr">2023</td><td><div class="ttl">Lacquered book-cover with gilded sheen</div><div class="desc">Pasteboard, with mother-of-pearl, late Safavid</div></td><td class="src">Donor unnamed</td><td class="gal">Gallery II</td></tr>
    <tr><td class="yr">2023</td><td><div class="ttl">Ten weapons-of-form from the Ardabil shrine cache</div><div class="desc">Inlaid steel, with chiselled cartouche, c.1640</div></td><td class="src">Hekmatī Foundation, long-term loan</td><td class="gal">Gallery III</td></tr>
  </table>
</section>

{footer()}
"""
    return HEAD.format(title="Galleries") + body + TAIL


def page3():
    body = f"""{header(2)}
<section class="hero">
  <div class="eyebrow">Current Exhibition <span class="dot">·</span> Chehel-Sotoun Gallery <span class="dot">·</span> 14 March — 28 September 2024</div>
  <div class="arch-title">
    {svg_with_color(m('horseshoe'), fill='none', stroke='currentColor')}
    <div class="inner">
      <h1>Riza Abbasi<br>&amp; the Isfahan<br>Style</h1>
      <div class="by">Drawings from the Royal Library<br>1598 – 1635</div>
    </div>
  </div>
  <div class="visit-meta" style="margin-top:24px">
    <div class="cell"><div class="lab">Dates</div><div class="val">14 March — 28 Sept 2024</div></div>
    <div class="cell"><div class="lab">Location</div><div class="val">Chehel-Sotoun Gallery</div></div>
    <div class="cell"><div class="lab">Curator</div><div class="val">Dr Maḥnaz Tabandeh</div></div>
    <div class="cell"><div class="lab">Admission</div><div class="val">Included with Entry</div></div>
  </div>
</section>

<section class="section alt">
  <div class="eyebrow-c">From the Curator</div>
  <h2 class="section-title">From the Curator</h2>
  {divider("short")}
  <div class="prose">
    <p>Riza ʿAbbasi (b. 1565, d. 1635) carried with him the prestige of the Safavid court — and a particular trouble within it: he wished, when middle-aged, to lay aside the patron's commission and to draw, instead, the unembellished body. The eighty-three drawings gathered here — fourteen on view at any one time, in rotation to preserve their pigments — trace the emergence of what later cataloguers would name simply the Isfahan Style: a manner, single-figure (drawn in soft, soaking lines), with brief calligraphic captions, often a single landscape gesture, and a quiet command of contour.</p>
    <p>The exhibition asks two questions of its visitor. The first is technical: how does a master who has spent thirty years on the formal portrait of princes free his hand at fifty? The second is social: who were the men and women — page-boys, dervishes, scholars, gentlemen of the bath — for whom Riza chose, in his late period, to set down nothing but a face?</p>
    <p>To answer them, the gallery is hung as a chronology, broken twice by interludes from his pupils — Mu'in Musavvir and Aqā Riza of Heart — whose drawings show how a hand may be both copied and transformed.</p>
  </div>
</section>

<section class="section">
  <div class="eyebrow-c">Selected Works</div>
  <h2 class="section-title">Fourteen Works on View</h2>
  {divider("short")}
  <div class="galleries">
    <div class="gallery-card"><div class="num">No. 01 · 1598</div><h3>Youth Reading Beneath a Cypress</h3><p>Brush, ink and gold on paper. From the Album of the Prince Soltan Husayn, dispersed 1881.</p><div class="foot">cat. M.1972.4</div></div>
    <div class="gallery-card"><div class="num">No. 02 · 1602</div><h3>Standing Dervish with Staff</h3><p>Black ink wash on toned paper, faintly tinted with vermilion at the sash and turban.</p><div class="foot">cat. M.1958.32</div></div>
    <div class="gallery-card"><div class="num">No. 03 · 1604</div><h3>The Lovers Encountered at Dawn</h3><p>Bound album leaf, with gold-flake border in the manner of the late Tabriz workshop.</p><div class="foot">cat. M.1972.7</div></div>
    <div class="gallery-card"><div class="num">No. 04 · 1607</div><h3>Lady Reclining with a Mirror</h3><p>Brush, opaque watercolour and gold on paper, signed in nastaʿliq beneath the cypress.</p><div class="foot">cat. M.1981.11</div></div>
    <div class="gallery-card"><div class="num">No. 05 · 1610</div><h3>Calligrapher Sharpening a Reed Pen</h3><p>Black ink with sepia wash. The pen-case at the right is rendered in fine outline only.</p><div class="foot">cat. M.1958.41</div></div>
    <div class="gallery-card"><div class="num">No. 06 · 1612</div><h3>Bystander &amp; Wine-Bowl</h3><p>From the Mihtar album, sold to the museum from a private Tehran collection in 1962.</p><div class="foot">cat. M.1962.16</div></div>
    <div class="gallery-card"><div class="num">No. 07 · 1615</div><h3>Falconer in the Garden of Karaj</h3><p>Brush and tinted ink, the falcon outlined in dark gold leaf, restored 2018.</p><div class="foot">cat. M.1972.9</div></div>
    <div class="gallery-card"><div class="num">No. 08 · 1618</div><h3>Bedouin in Striped Mantle</h3><p>One of three known studies of camel-trader figures from the western caravan-route.</p><div class="foot">cat. M.1989.04</div></div>
    <div class="gallery-card"><div class="num">No. 09 · 1620</div><h3>Two Pages of the Royal Hunt</h3><p>Double-page composition, opening of the Tahmasp <em>Shahnāma</em> rebound at Isfahan.</p><div class="foot">cat. M.1958.50</div></div>
    <div class="gallery-card"><div class="num">No. 10 · 1622</div><h3>Bath-Attendant with Towel</h3><p>Sketch on toned paper. A late companion to the published Standing Dervish series.</p><div class="foot">cat. M.1981.18</div></div>
    <div class="gallery-card"><div class="num">No. 11 · 1626</div><h3>Old Man Seated at the Quince Tree</h3><p>Brush and watercolour, with brief calligraphic caption: 'all things rest where they began.'</p><div class="foot">cat. M.1958.62</div></div>
    <div class="gallery-card"><div class="num">No. 12 · 1629</div><h3>Two Friends in Conversation</h3><p>Album leaf with gold-flecked margins, lent by the Hekmatī Foundation.</p><div class="foot">cat. HF.04.11</div></div>
    <div class="gallery-card"><div class="num">No. 13 · 1632</div><h3>Self-Portrait, with Hand to Beard</h3><p>One of two known late self-portraits. Signed lower right and dated by the year of the Hijra.</p><div class="foot">cat. M.1972.12</div></div>
    <div class="gallery-card"><div class="num">No. 14 · 1635</div><h3>Final Drawing: An Old Friend</h3><p>The last sheet bound in the master's working album, attributed to the year of his death.</p><div class="foot">cat. M.1958.71</div></div>
  </div>
</section>

<section class="section alt">
  <div class="eyebrow-c">Apparatus</div>
  <h2 class="section-title">Riza &amp; Conservation</h2>
  {divider("short")}
  <div class="two-col">
    <div class="col">
      <h4>Material, Method, Studio</h4>
      <table class="kv">
        <tr><td>Support</td><td>Paper, sized &amp; burnished</td></tr>
        <tr><td>Pigments</td><td>Lapis · cinnabar · gold-flake</td></tr>
        <tr><td>Inks</td><td>Lampblack &amp; sepia</td></tr>
        <tr><td>Brushes</td><td>Squirrel · marten · cat</td></tr>
        <tr><td>Workshop</td><td>Bāzār-e Honar, Isfahan</td></tr>
        <tr><td>Pupils Recorded</td><td>11 (1614 — 1635)</td></tr>
      </table>
    </div>
    <div class="col">
      <h4>A Note on Conservation</h4>
      <p>Album leaves are rotated every twelve weeks to limit cumulative light exposure to seventy lux-hours per annum. The fourteen sheets on view are framed without glass abutting the support, in the technique developed for the V&amp;A's Khamsa folios and modified by our atelier in 2018 for the higher humidity of Isfahan in the months of Mehr and Aban.</p>
      <p>Visitors are kindly asked to refrain from photography in the Chehel-Sotoun Gallery; loose flash is corrosive to the cinnabar.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="tess-hero">
    {m('arrangement_red')}
    <div class="cap">— Sadiqi Beg Afshar, Qanun Al-Suvar, c. 1597 —</div>
  </div>
</section>

{footer()}
"""
    return HEAD.format(title="Exhibition") + body + TAIL


def page4():
    body = f"""{header(3)}
<section class="hero">
  <div class="eyebrow">Hall I <span class="dot">·</span> Practical Information for the Visitor</div>
  <h1>Visit</h1>
  <p class="lede">Hours · Tickets · Directions</p>
  <p class="lede" style="margin-top:6px">The doors of the Museum of Isfahan open beneath an age-worn arch of Chahar Bagh Abbasi, where Shah ʿAbbas once paced the avenue of plane trees, now still finer to perambulate; we ask that you pass through the halls of the Safavid court with no measure of haste, but the closer light of close looking.</p>
  {divider("short")}
  <div class="color-seal breathe">{color_seal_svg()}</div>
  <div class="visit-meta">
    <div class="cell"><div class="lab">Day</div><div class="val">Tue — Sun</div></div>
    <div class="cell"><div class="lab">General Entry</div><div class="val">300,000 IRR</div></div>
    <div class="cell"><div class="lab">Address</div><div class="val">17 Chahar Bagh<br>Abbasi Avenue</div></div>
    <div class="cell"><div class="lab">Time</div><div class="val">9:00 — 17:30</div></div>
  </div>
</section>

<section class="section alt">
  <div class="eyebrow-c">Practical</div>
  <h2 class="section-title">Hours, Admission &amp; Counsel</h2>
  {divider("short")}
  <div class="galleries" style="grid-template-columns: repeat(3, 1fr)">
    <div class="gallery-card">
      <div class="num">Hours of Opening</div>
      <h3>Hours of Opening</h3>
      <table class="hours-table">
        <tr><td>Tuesday</td><td>09:00 — 17:30</td></tr>
        <tr><td>Wednesday</td><td>09:00 — 17:30</td></tr>
        <tr><td>Thursday</td><td>09:00 — 17:30</td></tr>
        <tr><td>Friday</td><td>10:00 — 19:00</td></tr>
        <tr><td>Saturday</td><td>09:00 — 17:30</td></tr>
        <tr><td>Sunday</td><td>09:00 — 17:30</td></tr>
        <tr><td>Mondays</td><td>Closed</td></tr>
      </table>
    </div>
    <div class="gallery-card">
      <div class="num">Tickets &amp; Patronage</div>
      <h3>Tickets &amp; Patronage</h3>
      <table class="hours-table">
        <tr><td>General Adult</td><td>300,000 IRR</td></tr>
        <tr><td>Students &amp; Youth</td><td>150,000 IRR</td></tr>
        <tr><td>Members</td><td>Free</td></tr>
        <tr><td>Children &lt; 12</td><td>Free of Charge</td></tr>
        <tr><td>Tuesday Mornings</td><td>Half Price</td></tr>
        <tr><td>Last Friday Each Month</td><td>By Donation</td></tr>
      </table>
    </div>
    <div class="gallery-card">
      <div class="num">Counsel for Visitors</div>
      <h3>Counsel for Visitors</h3>
      <p>Bags above the size of a thirty-litre rucksack must be left at the porter's lodge. Photography is permitted in all halls except the Chehel-Sotoun Gallery and the Royal Library Reading Room.</p>
      <p>The cooler hours of the morning, before noon prayer, are most rewarding: the museum's diagonal light enters by the eastern iwān at half-eleven and crosses Hall II by half past two.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="eyebrow-c">Where to Find Us</div>
  <h2 class="section-title">Address &amp; Approaches</h2>
  {divider("short")}
  <div class="address-block">
    <div class="blk">
      <h4>On the Avenue of Plane Trees</h4>
      <p>Museum of Isfahan<br>17 Chahar Bagh Abbasi Avenue<br>Isfahan 8174652871<br>Islamic Republic of Iran</p>
      <p style="margin-top:14px">+98 31 3222 4040<br>contact@museumofisfahan.ir</p>
      <p style="margin-top:14px;font-style:italic;color:var(--ink-soft)">Across the avenue from the Madrasa-ye Chahar Bagh, two blocks south of the Hasht Behesht garden pavilion.</p>
    </div>
    <div class="blk">
      <h4>Approaches by Road &amp; Rail</h4>
      <table class="kv">
        <tr><td>By Air</td><td>Isfahan IFN, 32 km — taxi 45 min, bus 70 min</td></tr>
        <tr><td>By Rail</td><td>Isfahan central station, 8 km — taxi 20 min</td></tr>
        <tr><td>Coach</td><td>Soffeh Coach Terminal, 6 km — line 7 to Si-o-se-pol</td></tr>
        <tr><td>Walking</td><td>From Naqsh-i Jahan Square, 12 minutes by Chahar Bagh</td></tr>
      </table>
    </div>
  </div>
</section>

<section class="section alt">
  <div class="eyebrow-c">Visitor Services</div>
  <h2 class="section-title">Access, Groups &amp; Schools</h2>
  {divider("short")}
  <div class="galleries" style="grid-template-columns: repeat(3, 1fr)">
    <div class="gallery-card"><div class="num">Accessibility</div><h3>Accessibility</h3><p>The Iwan Patron entrance is wheelchair-accessible by a smooth concrete ramp; lifts are available between all five floors. Audio loops are installed in Halls II, IV and VI; large-print labels in Persian, Arabic and English may be requested at the porter's lodge.</p></div>
    <div class="gallery-card"><div class="num">Group Bookings</div><h3>Group Bookings</h3><p>Groups of ten or more, please book by writing to <em>groups@museumofisfahan.ir</em>; the museum cannot guarantee admission to walk-in parties of fifteen or more, especially in the months of Khordad and Tir.</p></div>
    <div class="gallery-card"><div class="num">Schools &amp; Visits</div><h3>Schools &amp; Visits</h3><p>The museum is free of charge for schoolchildren accompanied by a teacher; please write the Education Office at least two weeks in advance. Special tours by request in Persian, Arabic, English, French and Italian.</p></div>
  </div>
</section>

<section class="section">
  <div class="eyebrow-c">Programme</div>
  <h2 class="section-title">A Typical Week at the Museum</h2>
  {divider("short")}
  <table class="week-table">
    <tr><th>Day</th><th>Permanent</th><th>Exhibition</th><th>Library</th><th>Atelier Visits</th></tr>
    <tr><td>Tue</td><td>09:00 — 17:30</td><td>09:00 — 17:30</td><td>By appt.</td><td>—</td></tr>
    <tr><td>Wed</td><td>09:00 — 17:30</td><td>09:00 — 17:30</td><td>11:00 — 17:00</td><td>14:00 — 16:00</td></tr>
    <tr><td>Thu</td><td>09:00 — 17:30</td><td>09:00 — 17:30</td><td>11:00 — 17:00</td><td>—</td></tr>
    <tr><td>Fri</td><td>10:00 — 19:00</td><td>10:00 — 19:00</td><td>13:00 — 19:00</td><td>—</td></tr>
    <tr><td>Sat</td><td>09:00 — 17:30</td><td>09:00 — 17:30</td><td>11:00 — 17:00</td><td>14:00 — 16:00</td></tr>
    <tr><td>Sun</td><td>09:00 — 17:30</td><td>09:00 — 17:30</td><td>11:00 — 17:00</td><td>—</td></tr>
  </table>
</section>

<section class="outro-banner">
  <em>— Beneath the Half of the World, you are awaited —</em>
  <p style="font-size:14px;color:var(--ink-soft);margin-top:10px">By bequest, dedication, an envelope or a stop along Chahar Bagh.</p>
</section>

{footer()}
"""
    return HEAD.format(title="Visit") + body + TAIL


def page5():
    body = f"""{header(4)}
<section class="hero">
  <div class="eyebrow">The Royal Atelier</div>
  <h1>Scholarship &amp;<span class="it">The Royal Atelier Library</span></h1>
  <p class="lede">An apparatus of looking, in three rooms — the Reading Library, the Atelier of Conservation, and the Press of the Museum's Office of Research.</p>
  {divider("short")}
</section>

<section class="section alt">
  <h2 class="section-title">The Royal Atelier Library</h2>
  {divider("short")}
  <div class="two-col">
    <div class="col">
      <h4>A Working Library</h4>
      <p>Eighty-two thousand volumes covering Safavid Iran, the Persianate world from Hormuz to Lahore, and the wider world of early-modern Islamic visual culture. Reference and rare-book consultation by appointment, in person, between 11:00 and 17:00 on consultation days.</p>
      <table class="kv" style="margin-top:14px">
        <tr><td>Volumes</td><td>82,000</td></tr>
        <tr><td>Manuscripts</td><td>340</td></tr>
        <tr><td>Periodicals</td><td>1,860</td></tr>
        <tr><td>Photographs</td><td>22,000</td></tr>
      </table>
    </div>
    <div class="col">
      <h4>Access &amp; Appointments</h4>
      <p>Researchers — please write to <em>library@museumofisfahan.ir</em> with credentials and the title of your project. We respond within five working days. Stipends for visiting fellows are listed below; non-residential consultation is gratis.</p>
      <ul style="padding-left:18px;margin-top:10px">
        <li>Tuesday — Thursday, 11:00 – 17:00</li>
        <li>Saturday, 11:00 – 17:00 (rare-book days)</li>
        <li>Closed Friday, Sunday &amp; Monday</li>
        <li>Closed Nowruz Week and the first ten days of Muharram</li>
      </ul>
    </div>
  </div>
</section>

<section class="section">
  <div class="eyebrow-c">Apply by 15 Mehr</div>
  <h2 class="section-title">Resident Fellowships</h2>
  {divider("short")}
  <div class="two-col">
    <div class="col">
      <h4>The Aqā Riza Fellowship for Drawing &amp; Calligraphy</h4>
      <p>One year in residence at the Atelier, with studio space and access to the rare-book vaults. Stipend 600,000,000 IRR, plus material allowance and one international travel stipend. Applicants must hold a master's degree or its equivalent.</p>
      <div class="cta" style="text-align:center;margin-top:14px;color:var(--gold);font-family:var(--font-caps);letter-spacing:0.25em;font-size:11px;text-transform:uppercase">Apply by 15 Mehr</div>
    </div>
    <div class="col">
      <h4>The Behzādiyya Fellowship for Pre-Doctoral Research</h4>
      <p>Six months in residence, awarded annually to two pre-doctoral researchers in any field touching on Safavid material culture. Stipend 280,000,000 IRR plus housing in the Hekmatī Garden, two minutes from the museum's south gate.</p>
      <div class="cta" style="text-align:center;margin-top:14px;color:var(--gold);font-family:var(--font-caps);letter-spacing:0.25em;font-size:11px;text-transform:uppercase">Apply by 15 Mehr</div>
    </div>
  </div>
</section>

<section class="section alt">
  <h2 class="section-title">Patterns of Patronage</h2>
  <div class="callout-box">
    <div class="eyebrow-c" style="margin-bottom:10px">8 — 9 November 2024 · Hall II</div>
    <h3>The Annual Symposium of the Museum</h3>
    <p>Two days of papers, one symposium-evening of music in the Chehel-Sotoun Gallery, and the announcement of the year's resident-fellowship prizes. Free attendance for members and registered scholars; symposium dinner by subscription.</p>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px;margin-top:18px;font-size:13.5px;text-align:left">
      <div><strong style="color:var(--gold-bright)">Day I</strong><br>Workshop networks; pigment economies; the calligraphic scribe in the chancery.</div>
      <div><strong style="color:var(--gold-bright)">Day II</strong><br>Riza ʿAbbasi at fifty; pupils &amp; patronage; the late drawing.</div>
      <div><strong style="color:var(--gold-bright)">Evening</strong><br>Concert of dast-gāh in the gallery, lit only by oil-lamps.</div>
    </div>
  </div>
</section>

<section class="section">
  <h2 class="section-title">The Museum Press</h2>
  {divider("short")}
  <div class="press">
    <div class="book"><div class="frame">{SMALL_STAR}</div><h4>The Maydān Tilework Catalogue</h4><p>Eds. Tabandeh &amp; Hekmati, 2024 · 432 pp.</p></div>
    <div class="book"><div class="frame">{SMALL_STAR}</div><h4>Riza ʿAbbasi: Drawings 1598–1635</h4><p>Single-volume facsimile · 2023</p></div>
    <div class="book"><div class="frame">{SMALL_STAR}</div><h4>Inlaid Steel of the Yazd Arsenal</h4><p>Tabandeh, ed. · 2022 · 280 pp.</p></div>
    <div class="book"><div class="frame">{SMALL_STAR}</div><h4>The Falnāma of Shah Tahmasp</h4><p>Reproduction of folios &amp; commentary · 2021</p></div>
    <div class="book"><div class="frame">{SMALL_STAR}</div><h4>Letters of Aqā Mirak</h4><p>Annotated edition, with translation · 2020</p></div>
    <div class="book"><div class="frame">{SMALL_STAR}</div><h4>The Hekmatī Album</h4><p>Catalogued, with full plate reproduction · 2019</p></div>
    <div class="book"><div class="frame">{SMALL_STAR}</div><h4>The Isfahan Style</h4><p>Survey monograph · 2018</p></div>
    <div class="book"><div class="frame">{SMALL_STAR}</div><h4>The Museum's First Fifty Years</h4><p>Anniversary volume · 2017</p></div>
  </div>
</section>

<section class="section alt">
  <div class="eyebrow-c">By Letter, By Hand</div>
  <h2 class="section-title">Write to the Office of Research</h2>
  {divider("short")}
  <p style="text-align:center;font-size:15px">Office of Research · Museum of Isfahan<br>17 Chahar Bagh Abbasi Avenue · Isfahan, Iran 8174652871<br>+98 31 3222 4040 · <em>research@museumofisfahan.ir</em></p>
</section>

{footer()}
"""
    return HEAD.format(title="Scholarship") + body + TAIL


def page6():
    body = f"""{header(5)}
<section class="hero">
  <div class="eyebrow">About the Museum</div>
  <h1>A House for the Half of the<br>World</h1>
  <p class="lede">Beneath the half-vault of Chahar Bagh Avenue, where Shah ʿAbbas once paced the avenue of plane trees, the Museum of Isfahan has gathered, since 1971, the visual record of his city — and of the dynasty that made it half of the world.</p>
  {divider("short")}
</section>

<section class="section alt">
  <h2 class="section-title">A Brief Chronicle of the Museum</h2>
  {divider("short")}
  <div class="timeline">
    <div class="item"><div class="yr">1971</div><p>Founded by decree of the Office of Antiquities, in the gardens of the former Madrasa-ye Chahar Bagh; first director, Dr Manūchehr Hekmatī.</p></div>
    <div class="item"><div class="yr">1983</div><p>Reconstruction of the eastern <em>iwān</em> begins under Tabandeh; the Royal Atelier Library is moved into the south wing.</p></div>
    <div class="item"><div class="yr">2008</div><p>The Hekmatī Wing for Late Safavid Drawing opens to the public; the museum's first symposium is held in the Chehel-Sotoun Gallery.</p></div>
  </div>
</section>

<section class="section">
  <div class="eyebrow-c">Stewardship</div>
  <h2 class="section-title">Charter of the Museum</h2>
  {divider("short")}
  <div class="prose" style="max-width:840px">
    <p>The Museum of Isfahan exists, charter and law, to gather, to conserve, and to make available for close looking the visual material of Iran's Safavid dynasty (1501 — 1736) and its surrounding centuries, with particular attention to the city of Isfahan during the reigns of Shah ʿAbbas I and Shah Sultan Husayn.</p>
    <p>The collection is the property of the Iranian people, held in trust by the Ministry of Cultural Heritage; the Office of the Director is appointed for a renewable seven-year term and answers to a Board of nine Trustees. Acquisitions in excess of three thousand million IRR require the assent of the Board.</p>
  </div>
  <div class="color-seal" style="margin-top:24px">{color_seal_svg()}</div>
  <div class="cta" style="text-align:center;margin-top:8px;color:var(--gold);font-family:var(--font-caps);letter-spacing:0.25em;font-size:11px;text-transform:uppercase">Download a PDF of the Charter (1.4 mb)</div>
</section>

<section class="section alt">
  <div class="eyebrow-c">Stewardship</div>
  <h2 class="section-title">Office of the Director</h2>
  {divider("short")}
  <div class="officers">
    <div class="o">
      <h4>Dr Jeesoun Mohajeri</h4>
      <div class="role">Director</div>
      <p>Appointed 2019. Author of <em>The Maydān Tilework Catalogue</em> (2024) and <em>Inlaid Steel of the Yazd Arsenal</em> (2022). Doctoral training at the Sorbonne, with the late professor Élise Berthel.</p>
    </div>
    <div class="o">
      <h4>Dr Parisi Khorsani</h4>
      <div class="role">Deputy &amp; Head of Conservation</div>
      <p>Appointed 2017. Trained at the Hamilton-Kerr Institute, Cambridge, and at the Imperial Iranian Bibliotek-i Markazi. Led the 2018 conservation of the Ardabil-style fragment.</p>
    </div>
  </div>
</section>

<section class="section">
  <div class="eyebrow-c">Constitution</div>
  <h2 class="section-title">Board of Trustees</h2>
  {divider("short")}
  <div class="trustees">
    <div class="name">Dr Manūchehr Hekmatī</div><div class="role">Chair · Founding Director Emeritus</div>
    <div class="name">Behzad Lotfi</div><div class="role">Vice-Chair · Hekmatī Foundation</div>
    <div class="name">Roxana Akhavan</div><div class="role">Treasurer · Bank Mellat Trust</div>
    <div class="name">Dr Saeed Tavakkoli</div><div class="role">Sec. · Ministry of Cultural Heritage</div>
    <div class="name">Mehrnoush Bakhtiari</div><div class="role">Patron · Tilework Circle</div>
    <div class="name">Sasan Ardakani</div><div class="role">Patron · Iwan Friend</div>
    <div class="name">Prof. Yasaman Karimi</div><div class="role">Trustee · University of Tehran</div>
    <div class="name">Hamidreza Davoudi</div><div class="role">Trustee · Atelier of Yazd</div>
    <div class="name">Vida Ghorbani</div><div class="role">Trustee · Counsel to the Board</div>
  </div>
</section>

<section class="section alt">
  <div class="eyebrow-c">Membership</div>
  <h2 class="section-title">Patron Tiers</h2>
  {divider("short")}
  <div class="tiers">
    <div class="tier">
      <div class="badge">{SMALL_STAR}</div>
      <h4>Atelier Friend</h4>
      <ul>
        <li>Free entry for the year</li>
        <li>Members' newsletter quarterly</li>
        <li>Invitation to two yearly events</li>
        <li>10% Press &amp; shop discount</li>
      </ul>
      <div class="cta" style="text-align:center;margin-top:10px;color:var(--gold);font-family:var(--font-caps);letter-spacing:0.25em;font-size:11px;text-transform:uppercase">From 6,000,000 IRR</div>
    </div>
    <div class="tier">
      <div class="badge">{SMALL_STAR}</div>
      <h4>Tilework Circle</h4>
      <ul>
        <li>All Atelier Friend benefits</li>
        <li>Two annual private viewings</li>
        <li>Behind-the-scenes atelier visit</li>
        <li>Symposium dinner invitation</li>
      </ul>
      <div class="cta" style="text-align:center;margin-top:10px;color:var(--gold);font-family:var(--font-caps);letter-spacing:0.25em;font-size:11px;text-transform:uppercase">From 28,000,000 IRR</div>
    </div>
    <div class="tier">
      <div class="badge">{SMALL_STAR}</div>
      <h4>Iwan Patron</h4>
      <ul>
        <li>All Tilework Circle benefits</li>
        <li>Director's roundtable, twice yearly</li>
        <li>Acknowledgement in catalogues</li>
        <li>Conservation studio access</li>
      </ul>
      <div class="cta" style="text-align:center;margin-top:10px;color:var(--gold);font-family:var(--font-caps);letter-spacing:0.25em;font-size:11px;text-transform:uppercase">From 120,000,000 IRR</div>
    </div>
  </div>
</section>

<section class="section">
  <div class="eyebrow-c">Acts of Generosity</div>
  <h2 class="section-title">Bequests &amp; Dedications</h2>
  {divider("short")}
  <div class="prose" style="text-align:center;max-width:760px">
    <p>The museum welcomes bequests of objects, of correspondence, and of funds. The Office of the Director is pleased to advise. For acts of dedication — a hall, a vitrine, a bound book — the Trustees consider proposals twice each year, in Khordad and in Aban.</p>
    <p style="font-style:italic;color:var(--ink-soft)">Office of the Director · 17 Chahar Bagh Abbasi Avenue<br>director@museumofisfahan.ir · +98 31 3222 4040</p>
  </div>
</section>

{footer()}
"""
    return HEAD.format(title="About") + body + TAIL


PAGES = {
    "page-1.html": page1,
    "page-2.html": page2,
    "page-3.html": page3,
    "page-4.html": page4,
    "page-5.html": page5,
    "page-6.html": page6,
}


def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    for name, fn in PAGES.items():
        out_path = os.path.join(OUTPUT_DIR, name)
        with open(out_path, "w", encoding="utf-8") as f:
            f.write(fn())
        print(f"wrote {out_path}")


if __name__ == "__main__":
    main()
