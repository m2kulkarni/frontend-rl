#!/usr/bin/env python3
"""Build script for the Thiruvanam Civic Authority site."""
import re
from pathlib import Path

MOTIFS = Path('/app/motifs')
OUT = Path('/app/output')
OUT.mkdir(parents=True, exist_ok=True)


def read_svg_inner(name, fill_class=None, width=None, height=None, css_class=''):
    """Read an SVG file, strip XML/metadata, and return an inline <svg> tag.

    Replaces explicit width/height with our own and strips out fill/stroke
    overrides where possible so CSS currentColor/fill rules can take effect.
    """
    src = (MOTIFS / f'{name}.svg').read_text()
    # extract first <svg ...> open tag and the body up to the matching </svg>
    m = re.search(r'<svg\b[^>]*>', src, re.IGNORECASE)
    if not m:
        return ''
    svg_open = m.group(0)
    body_start = m.end()
    body_end = src.rfind('</svg>')
    body = src[body_start:body_end]

    # remove sodipodi:namedview and metadata blocks (not needed for render)
    body = re.sub(r'<metadata\b[^>]*>.*?</metadata>', '', body, flags=re.DOTALL)
    body = re.sub(r'<sodipodi:namedview\b[^>]*/?>', '', body, flags=re.DOTALL)

    # extract viewBox
    vb_match = re.search(r'viewBox="([^"]+)"', svg_open)
    if vb_match:
        view_box = vb_match.group(1)
    else:
        # if no viewBox, build one from width/height
        w_m = re.search(r'width="([^"]+)"', svg_open)
        h_m = re.search(r'height="([^"]+)"', svg_open)
        w = re.sub(r'[^0-9.]', '', w_m.group(1)) if w_m else '100'
        h = re.sub(r'[^0-9.]', '', h_m.group(1)) if h_m else '100'
        view_box = f'0 0 {w} {h}'

    attrs = [f'viewBox="{view_box}"']
    if width is not None:
        attrs.append(f'width="{width}"')
    if height is not None:
        attrs.append(f'height="{height}"')
    attrs.append('preserveAspectRatio="xMidYMid meet"')
    attrs.append('xmlns="http://www.w3.org/2000/svg"')
    if css_class:
        attrs.append(f'class="{css_class}"')

    return f'<svg {" ".join(attrs)}>{body}</svg>'


# Top bar with status / phone numbers seen at top of every page
def topbar():
    return '''<div class="topbar">
  <div class="topbar-inner">
    <span class="topbar-left">EST. 1947 &middot; THIRUVANAM MUNICIPAL ACT &middot; SHREE 19/2/E-94</span>
    <span class="topbar-right">OFFICE HOURS &middot; MON&ndash;SAT &middot; 09:30 &ndash; 17:00</span>
  </div>
</div>'''


def header(active):
    pages = [
        ('page-1.html', 'OFFICE'),
        ('page-2.html', 'WARDS'),
        ('page-3.html', 'HERITAGE'),
        ('page-4.html', 'NOTICES'),
        ('page-5.html', 'SERVICES'),
        ('page-6.html', 'VISIT'),
    ]
    nav = ''.join(
        f'<a href="{href}" class="nav-link{" active" if active == href else ""}">{label}</a>'
        for href, label in pages
    )
    return f'''<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="page-1.html">
      <span class="brand-name">Thiruvanam</span>
      <span class="brand-sub">CIVIC AUTHORITY <em>&middot; est. 1947</em></span>
    </a>
    <nav class="primary-nav">{nav}</nav>
  </div>
</header>'''


def footer():
    om = read_svg_inner('om-symbol', width=44, height=44, css_class='footer-om')
    return f'''<footer class="site-footer">
  <div class="footer-seal">{om}</div>
  <div class="footer-grid">
    <div>
      <h4>TOWN HALL</h4>
      <p>14 Sannidhi Veethi<br/>Thiruvanam 612 401<br/>Thanjavur District, Tamil Nadu</p>
    </div>
    <div>
      <h4>COMMISSIONER&#39;S OFFICE</h4>
      <p>Tel.&nbsp;+91 4362 240 147<br/>Extension&nbsp;1800 425 1947<br/>commissioner@thiruvanam.tn.gov.in</p>
    </div>
    <div>
      <h4>HOURS</h4>
      <p>Mon&ndash;Sat &middot; 09:30 &ndash; 17:00<br/>Closed 2nd Saturdays<br/>Grievance Darbar &middot; 1st Mon &middot; 10:30</p>
    </div>
    <div>
      <h4>SECTIONS</h4>
      <ul class="footer-list">
        <li><a href="page-1.html">Office of the Commissioner</a></li>
        <li><a href="page-2.html">Wards &amp; Administration</a></li>
        <li><a href="page-3.html">Heritage Precinct</a></li>
        <li><a href="page-4.html">Notices &amp; Tenders</a></li>
        <li><a href="page-5.html">Resident Services</a></li>
        <li><a href="page-6.html">Visit Town Hall</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-meta">
    <p>&copy; 2026 THIRUVANAM CIVIC AUTHORITY &middot; CONSTITUTED UNDER T.M. ACT 21 OF 1947 &middot; ISSUED BY THE PUBLIC INFORMATION SECTION &middot; IMPRINT NO. 19/2/E-94</p>
  </div>
</footer>'''


def page(active, body, body_class=''):
    cls = f' class="{body_class}"' if body_class else ''
    return f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>Thiruvanam Civic Authority</title>
<meta name="viewport" content="width=1440"/>
<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700;9..144,800&family=Spectral:wght@300;400;500;600;700&display=swap" rel="stylesheet"/>
<link rel="stylesheet" href="styles.css"/>
</head>
<body{cls}>
{topbar()}
{header(active)}
<main class="page-main">
{body}
</main>
{footer()}
</body>
</html>'''


# ----- Inline SVG handles ---------------------------------------------------
def lotus(size=210, animated=True):
    css_class = 'lotus' + (' lotus-bloom' if animated else '')
    return read_svg_inner('lotus-flower', width=size, height=int(size*301/383), css_class=css_class)


def headpiece(name, width=920, height=None, css_class='headpiece'):
    return read_svg_inner(name, width=width, height=height, css_class=css_class)


# ----- Page bodies ---------------------------------------------------------
def page_1():
    bird = headpiece('bird-headpiece', width=900, height=58, css_class='headpiece bird')
    lot = lotus(220, animated=True)
    return f'''
<section class="hero">
  <div class="hero-card">
    <div class="hero-text">
      <div class="ornament-band">{bird}</div>
      <p class="eyebrow">OFFICE OF THE COMMISSIONER &middot; PROCLAMATION 19 OF 2026</p>
      <h1 class="display-1">The Ward Roll for Fiscal <span class="hot">2024&ndash;25</span> stands published this day.</h1>
      <p class="lede">Thiruvanam Civic Authority &mdash; constituted 1947 under the Madras Municipal Act and reconstituted under T.N. Act 21 of 1994 &mdash; administers the township of Thiruvanam across forty-two wards along the south bank of the Kaveri. The revised electoral and revenue roll is now lodged with the Tahsildar and may be inspected at the Town Hall reading-room until the 30th of November.</p>
      <dl class="stat-row">
        <div><dt>ROLL EFFECTIVE</dt><dd>14&nbsp;Aippasi 1946 SE</dd></div>
        <div><dt>ZONES</dt><dd>04&nbsp;<small>incl.&nbsp;4 hamlets</small></dd></div>
        <div><dt>RESIDENT HOUSEHOLDS</dt><dd>38,617</dd></div>
      </dl>
      <dl class="stat-row tight">
        <div><dt>ANNUAL BUDGET</dt><dd>&#x20B9;&nbsp;272.4&nbsp;Cr</dd></div>
      </dl>
    </div>
    <aside class="hero-aside">
      <p class="aside-eyebrow">MUDRA &middot; SEAL OF OFFICE</p>
      <div class="lotus-stage">{lot}</div>
      <p class="aside-name">Sathyameva Jayate</p>
      <p class="aside-meta">Thiruvanam Registry Sabha<br/><em>est. ada/16/c/47</em></p>
    </aside>
  </div>
</section>

<p class="rule-label">STANDING NOTICES</p>

<section class="three-cols">
  <article class="info-card">
    <p class="card-eyebrow">PUBLIC ADDRESS</p>
    <h3 class="card-title hot">From the Commissioner&rsquo;s Desk</h3>
    <p>Citizens are informed that the Commissioner&rsquo;s chambers receive deputations on every visiting <em>Tuesday</em> between 11:00 and 13:00 IST without prior appointment.</p>
    <p>Written representations may be tendered at Counter No.&nbsp;3, Old Block, against acknowledgement.</p>
  </article>
  <article class="info-card">
    <p class="card-eyebrow">MONTHLY SITTING</p>
    <h3 class="card-title hot">Grievance Darbar</h3>
    <p>Held on the <em>first Monday</em> of every Gregorian month at 10:30 IST in the Pillared Hall of Town Hall, Sannidhi Veethi.</p>
    <p>Open hearing. Tokens issued from 09:45. Tamil and English equally entertained; interpreter provisions <em>on request</em>.</p>
  </article>
  <article class="info-card">
    <p class="card-eyebrow">FISCAL YEAR 2024&ndash;25</p>
    <h3 class="card-title hot">Three Priority Programmes</h3>
    <p>The Council&rsquo;s session on the 12th of Aippasi resolved to undertake three works of immediate civic consequence under the consolidated Works Vote.</p>
    <p>Tenders, drawings, and award orders are catalogued in the <a href="page-4.html" class="lnk">Notices register</a>.</p>
  </article>
</section>

<h2 class="section-h">Works Vote &middot; 2024&ndash;25</h2>

<section class="three-cols mt-tight">
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">&sect;&nbsp;Scheme&nbsp;1</span> &middot; PUBLIC WORKS &middot; READY 1 &middot; 04</p>
    <h3 class="card-title">Kaveri Embankment Restoration</h3>
    <p>Reinforcement of the masonry bund between Karaikudi&nbsp;sluice and the Sannidhi&nbsp;steps with a 1.6&nbsp;m raise during dry-season storms, restoring the 1875 alignment surveyed by the Madras Presidency.</p>
    <ul class="meta-list">
      <li><span>&#x20B9; 24.20 Cr</span><span>22 months</span></li>
    </ul>
  </article>
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">&sect;&nbsp;Scheme&nbsp;2</span> &middot; HERITAGE WALL &middot; WARD 1 &middot; 04</p>
    <h3 class="card-title">Heritage Precinct Lighting</h3>
    <p>Replacement of the sodium-vapour mast lamps along the four mada-veethis of the temple precinct with low-glare warm LED stanchions cast in the original 1932 Holkar pattern.</p>
    <ul class="meta-list">
      <li><span>&#x20B9; 3.75 Cr</span><span>9 months</span></li>
    </ul>
  </article>
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">&sect;&nbsp;Scheme&nbsp;3</span> &middot; THREE WARDS &middot; SANCTIONED 13 APRIL</p>
    <h3 class="card-title">Ward 14 Drainage Rebuild</h3>
    <p>Complete reconstruction of the storm and foul-water sewer network of Ward 14 (Sengazhini Theru, and adjoining lanes) following the floods of October last, with new concrete trunk laid to a 1-in-400 fall.</p>
    <ul class="meta-list">
      <li><span>&#x20B9; 8.92 Cr</span><span>14 months</span></li>
    </ul>
  </article>
</section>

<section class="two-cols mt-2x">
  <article class="info-card wide">
    <p class="card-eyebrow">ADDRESS BY THE COMMISSIONER</p>
    <h3 class="display-2">On the duty of custodianship.</h3>
    <p>The Authority&rsquo;s labour is twofold. We administer drains, street-lamps, and the markets at Periya Theru &mdash; the daily mechanics by which a town breathes. We also keep watch over the stone gopurams, the bathing tanks, and the inscriptions whose donors are eight centuries gone.</p>
    <p>A municipality is not a corporation that turns its town: it is the temporary custodian of a settlement that was itself, and which has on its face for one one-term only.</p>
    <p>I invite every resident to read the published Ward Roll, to attend the monthly Darbar, and to write to this office on any matter &mdash; however small &mdash; that touches upon the dignity of public space in Thiruvanam.</p>
    <p class="signoff"><span class="hot">&sect;</span> <strong>R. Subhalakshmi</strong>, Iyer, I.A.S.<br/><em class="muted-lab">COMMISSIONER &middot; THIRUVANAM CIVIC AUTHORITY</em></p>
  </article>
  <aside class="info-card narrow">
    <h3 class="card-title">Office of Record</h3>
    <ul class="address-list">
      <li><span class="hot dot">&bull;</span><strong>TOWN HALL</strong><br/>14&nbsp;Sannidhi Veethi, Thiruvanam 612 401, Thanjavur District</li>
      <li><span class="hot dot">&bull;</span><strong>READING ROOM</strong><br/>Old Block, Counter 4 &middot; Mon &ndash; Sat &middot; 10:30 &ndash; 16:30</li>
      <li><span class="hot dot">&bull;</span><strong>TELEPHONE</strong><br/>+91 4362 240 147 (board) <br/>+91 4362 240 162 (registry)</li>
      <li><span class="hot dot">&bull;</span><strong>POSTAL</strong><br/>Box No. 27, GPO Thiruvanam, 612 001</li>
      <li><span class="hot dot">&bull;</span><strong>ELECTRONIC</strong><br/>commissioner@thiruvanam.tn.gov.in</li>
      <li><span class="hot dot">&bull;</span><strong>PLEADINGS &amp; APPEALS</strong><br/>To be lodged in writing, in duplicate, on or before the 15th of each calendar month.</li>
    </ul>
  </aside>
</section>
'''


def page_2():
    floral = headpiece('floral-headpiece', width=900, height=58, css_class='headpiece')
    lot = lotus(220, animated=True)
    rows = [
        ('zone-i', 'Zone I &middot; Sannidhi (Wards 1&ndash;7)', 'Joint Officer &middot; THIRU S. JANANI M.A., L.L.B.', [
            ('01','Thiru M. Subramanian','Big Bazaar Street &middot; Thanjavur Block','TOWN HALL &middot; EST. 1939'),
            ('02','Tmt. R. Lakshmi Devi','Periya Theru, North Ward','TOWN HALL &middot; EST. 1939'),
            ('03','Tmt. K. Padmavathi','Karaikudi Bridge Road','TOWN HALL &middot; EST. 1939'),
            ('04','Thiru P. Ganesan','Thiru J. Chidambaram','TOWN HALL &middot; EST. 1939'),
            ('05','Thiru A. Chidambaram','Sannidhi Veethi East','TOWN HALL &middot; EST. 1939'),
            ('06','Tmt. V. Bhuvaneswari','Marketplace Lane','TOWN HALL &middot; EST. 1939'),
            ('07','Thiru G. Murugesan','Sannidhi Veethi West','TOWN HALL &middot; EST. 1939'),
        ]),
        ('zone-ii', 'Zone II &middot; Kaveri (Wards 8&ndash;14)', 'Joint Officer &middot; TMT. J. JANAKI M.A., L.L.B.', [
            ('08','Thiru S. Selvaraj','Karaikkal Theru','TOWN HALL &middot; EST. 1939'),
            ('09','Tmt. M. Saraswathi','East Kaveri Bund','TOWN HALL &middot; EST. 1939'),
            ('10','Thiru G. Balasubramanian','South Marketplace','TOWN HALL &middot; EST. 1939'),
            ('11','Thiru S. Arumugam','West Kaveri Bund','TOWN HALL &middot; EST. 1939'),
            ('12','Tmt. P. Kamalavalli','Kovil Patti Theru','TOWN HALL &middot; EST. 1939'),
            ('13','Thiru N. Karunanidhi','Veedhi Pillar Road','TOWN HALL &middot; EST. 1939'),
            ('14','Thiru E. Rajendran','South Bund Lane','TOWN HALL &middot; EST. 1939'),
        ]),
        ('zone-iii', 'Zone III &middot; Pillaiyar Koil (Wards 15&ndash;21)', 'Joint Officer &middot; THIRU S. RAMASUBRAMANIAM B.E., I.A.S.', [
            ('15','Tmt. T. Mangaiyarkarasi','Periya Mada-veethi','TOWN HALL &middot; EST. 1939'),
            ('16','Thiru J. Krishnamurthy','Sannidhi Cross','TOWN HALL &middot; EST. 1939'),
            ('17','Tmt. L. Anjalai Ammal','East Kovil Bypass Road','TOWN HALL &middot; EST. 1939'),
            ('18','Thiru K. Mohanraj','Mada-veethi North','TOWN HALL &middot; EST. 1939'),
            ('19','Thiru H. Ilappappan','Mada-veethi South','TOWN HALL &middot; EST. 1939'),
            ('20','Tmt. U. Kanchana','Bazaar Cross','TOWN HALL &middot; EST. 1939'),
            ('21','Thiru T. Sundararajan','Kovil Tank Lane','TOWN HALL &middot; EST. 1939'),
        ]),
        ('zone-iv', 'Zone IV &middot; Periya Theru (Wards 22&ndash;27)', 'Joint Officer &middot; THIRU U. CHELVARASAN N.D.A.', [
            ('22','Tmt. O. Vijayalakshmi','East Channel Walk','TOWN HALL &middot; EST. 1939'),
            ('23','Tmt. R. Shenbagam','Cottonpet Quarter','TOWN HALL &middot; EST. 1939'),
            ('24','Thiru W. Pandian','Periya Theru West','TOWN HALL &middot; EST. 1939'),
            ('25','Tmt. P. Thenmozhi','Sannidhi Veethi Mid','TOWN HALL &middot; EST. 1939'),
            ('26','Thiru V. Sekar','South Quarter','TOWN HALL &middot; EST. 1939'),
            ('27','Thiru Z. Revathi','Old Bridge Lane','TOWN HALL &middot; EST. 1939'),
        ]),
    ]
    zones_html = ''
    for slug, title, jo, wards in rows:
        cards = ''
        for num, name, addr, est in wards:
            cards += f'<div class="ward-card"><p class="ward-eyebrow">WARD <span class="hot">{num}</span></p><p class="ward-name">{name}</p><p class="ward-addr">{addr}</p><p class="ward-est">{est}</p></div>'
        zones_html += f'''<div class="zone-block {slug}">
  <header class="zone-header"><span class="zone-title">{title}</span><span class="zone-officer">{jo}</span></header>
  <div class="ward-grid">{cards}</div>
</div>'''
    return f'''
<section class="hero center">
  <div class="hero-band">{floral}</div>
  <p class="eyebrow">SECTION II &middot; WARDS &amp; ADMINISTRATION</p>
  <h1 class="display-1 center-text">Twenty&dash;Seven Wards of<br/>Thiruvanam</h1>
  <p class="lede center-text wide">The municipal limits of Thiruvanam are divided into twenty-seven electoral wards across four administrative zones &mdash; Sannidhi, Kaveri, Pillaiyar Koil, and Periya Theru. Each ward returns one councillor to the General Council, which sits on the second Tuesday of every month at the Chola Hall, Town Hall complex.</p>
  <dl class="stat-row center">
    <div><dt>ELECTED WARDS</dt><dd>27</dd></div>
    <div><dt>ZONES</dt><dd>04</dd></div>
    <div><dt>STANDING COMMITTEES</dt><dd>02</dd></div>
    <div><dt>REGISTERED ELECTORS</dt><dd>62,418</dd></div>
  </dl>
</section>

<p class="rule-label">ROLL OF COUNCILLORS</p>

<h2 class="section-h hot">Wards by Zone &middot; 2022&ndash;2027 Term</h2>

<section class="zones">{zones_html}</section>

<p class="rule-label">ARTICLE IV &middot; BICAMERAL CONSTITUTION OF THE GENERAL COUNCIL</p>

<h2 class="section-h center-text">Committee Structure &amp; Zonal Command</h2>

<section class="two-cols mt-tight">
  <article class="info-card">
    <p class="card-eyebrow">STANDING COMMITTEES &middot; BICAMERAL CONSTITUTION</p>
    <h3 class="card-title hot">Two Houses of the General Council</h3>
    <p class="muted">Pursuant to <em>Government Order No. 16(M89/89)</em> dated the 12 June 2019, the General Council of Thiruvanam shall be constituted of a standing Council of Resolution affecting the heritage precincts and a separate, restricted Council of Public Works.</p>
    <p class="card-sub">Standing Committee for Public Works <span class="hot small">&sect; 24 SEATS</span></p>
    <ul class="ledger">
      <li><strong>Thiru P. Ganesan</strong>, Chairperson, Ward 04 &middot; <em>Convenor</em></li>
      <li><strong>Tmt. M. Saraswathi</strong>, Vice-Chair, Ward 09</li>
      <li><strong>Thiru G. Balasubramanian</strong>, Roads &amp; Drainage, Ward 10</li>
      <li><strong>Thiru E. Rajendran</strong>, Water Supply, Ward 14</li>
      <li><strong>Thiru J. Krishnamurthy</strong>, Solid Waste, Ward 16</li>
      <li><strong>Tmt. L. Anjalai Ammal</strong>, Street Lighting, Ward 17</li>
      <li><strong>Thiru W. Pandian</strong>, Transport, Ward 24</li>
      <li><strong>Thiru V. Sekar</strong>, Industrial Lines, Ward 26</li>
    </ul>
    <p class="card-sub">Heritage &amp; Antiquities Committee <span class="hot small">&sect; 12 SEATS</span></p>
    <ul class="ledger">
      <li><strong>Tmt. R. Padmavathi</strong>, Chairperson, Ward 03</li>
      <li><strong>Thiru K. Subramaniam</strong>, Vice-Chair, Ward 01</li>
      <li><strong>Thiru S. Sarvanaperumal</strong>, Inscriptions, Ward 06</li>
      <li><strong>Thiru E. Rajendran</strong>, Mada-streets, Ward 14</li>
      <li><strong>Thiru S. Pavaivarasan</strong>, Architectural Index, Ward 11</li>
      <li><strong>Thiru P. Mangaiyarkarasi</strong>, Temple Precincts, Ward 15</li>
      <li><strong>Thiru O. Vijayalakshmi</strong>, Periya Theru, Ward 22</li>
      <li><strong>Curator, Govt. Museum</strong> &middot; <em>Member ex-officio</em></li>
    </ul>
    <p class="muted small">The Heritage &amp; Antiquities Committee was reconstituted under <span class="hot">G.O. 16/9</span> 2019 following the listing of seventeen Thiruvanam streetscapes by the Tamil Nadu State Department of Archaeology. The Committee enjoys statutory consultation authority on all building permissions within the heritage envelope marked under Schedule II, Section A.</p>
  </article>
  <article class="info-card">
    <p class="card-eyebrow">TOWN HALL &middot; ZONAL COMMAND</p>
    <h3 class="card-title hot">Zonal Officers &mdash; Direct Lines</h3>
    <div class="lotus-stage small">{lot}</div>
    <p class="muted center-text">PADMA-MUDRA &middot; SEAL OF THE COUNCIL</p>
    <table class="zonal-table">
      <thead><tr><th>ZONE</th><th>OFFICER &amp; CHAMBER</th><th>EXT.</th></tr></thead>
      <tbody>
        <tr><td><span class="hot">I</span><br/>Sannidhi</td><td><strong>Thiru K. Subhalakshmi</strong><br/>Heritage Bazaar &amp; Temple Precinct</td><td>2202</td></tr>
        <tr><td><span class="hot">II</span><br/>Kaveri</td><td><strong>Tmt. J. Janaki</strong><br/>Riverfront, Drains &amp; Sumphouses East</td><td>2208</td></tr>
        <tr><td><span class="hot">III</span><br/>Pillaiyar Koil</td><td><strong>Thiru S. Ramagopalan</strong><br/>Public Works &amp; Mada-Lights Inspectorate</td><td>2214</td></tr>
        <tr><td><span class="hot">IV</span><br/>Periya Theru</td><td><strong>Thiru J. Chelvarasan</strong><br/>Markets, Transport &amp; Bypasses</td><td>2220</td></tr>
        <tr><td colspan="2"><strong>Grievance Cell &middot; Public Information</strong><br/>Thiru S. Anandhi &middot; 24-hour booth</td><td>2226</td></tr>
        <tr><td colspan="2"><strong>Council Secretariat</strong><br/>Thiru R. Velloranai, Resolutions &amp; Minutes</td><td>2230</td></tr>
      </tbody>
    </table>
    <p class="muted small">General Tuesday months: 11:00&nbsp;hr &middot; Chola Hall &middot; Town Hall &middot; Public gallery seats 41. &mdash; pleadings to be lodged from the front desk before 10:30 hrs the same morning. Proceedings recorded in Tamil and English.</p>
  </article>
</section>
'''


def page_3():
    pal = headpiece('arabesque-palmette', width=140, height=80, css_class='headpiece small-pal')
    lot = lotus(180, animated=True)
    return f'''
<section class="hero center">
  <p class="eyebrow"><span class="hot">SECTION&nbsp;III</span> &middot; HERITAGE PRECINCT &middot; CONSERVATION &amp; STEWARDSHIP</p>
  <div class="hero-band tiny">{pal}</div>
  <h1 class="display-1 center-text">Heritage Precinct &amp; Conservation</h1>
  <p class="muted-script">&mdash;&nbsp;<em>uralibu unguru gam</em>&nbsp;&mdash;</p>
  <p class="lede center-text wide">The Authority holds stewardship over the 28.4-acre quadrant bounded by North, South, East and West Mada Veethi &mdash; the granite-paved processional roads encircling the seventeenth-century temple core, the 1623 Kalyana Theertham stone tank, and the colonnaded mandapa marked on East Veethi. Conservation is undertaken in concert with the Department of Archaeology, Chennai, under Notification G.O.&nbsp;(Ms.)&nbsp;412.</p>
  <dl class="stat-row center">
    <div><dt>PRECINCT AREA</dt><dd>28.4 acres</dd></div>
    <div><dt>LISTED STRUCTURES</dt><dd>147</dd></div>
    <div><dt>STONE INSCRIPTIONS</dt><dd>1098</dd></div>
    <div><dt>TANK BUILT</dt><dd>1623</dd></div>
    <div><dt>G.O. 412 / 1986</dt></div>
  </dl>
</section>

<p class="rule-label">THE QUADRANT</p>

<section class="two-cols">
  <article class="info-card">
    <p class="card-eyebrow">THE OLD MADA STREETS &middot; HERITAGE WALK</p>
    <h3 class="card-title hot">Granite Processional Roads &amp; the Mandapa-Market</h3>
    <p>On East Veethi stands the colonnaded <em>mandapa</em>-market, sixty-eight pillars in five aisles, each capital carved with seal-and-creeper motifs. Resilient to fire, weather and termite, the timber halves were replaced with granite in 1762 under Maratha command.</p>
    <p>The Authority&rsquo;s mandate is twofold: to keep the precinct visually intact, and to keep its uses living. Lamplight and granite, merchants and merchants, are not their separate maps but the same map.</p>
    <ul class="ledger compact">
      <li>North Veethi &mdash; 412 m, repaved in original Holkar bond, 2017</li>
      <li>East Veethi &mdash; 408 m, mandapa-market colonnade, 68 pillars in continuous use</li>
      <li>South Veethi &mdash; 419 m, gradient mid-stream edge cleared</li>
      <li>West Veethi &mdash; 410 m, Kalyana Theertham tank entry near steps</li>
    </ul>
  </article>
  <article class="info-card">
    <p class="card-eyebrow">STEWARDSHIP COMPACT</p>
    <h3 class="card-title hot">Custody, Use &amp; Custodial Limits</h3>
    <p>The Authority maintains the precinct in trust for the residents of Wards 1&ndash;6, and for visitors of every faith and place of birth. The quadrant, the temple binders, country-burnt brick, and Kadappa stone &mdash; sourced under the 1932 Materials Compact.</p>
    <p>Reconstruction and electrical works are routed only through the historic service trenches identified in the 1956 Public Works survey. Vehicles access is restricted to the four cardinal gateways between 06:00 and 09:00 and 16:00 and 22:00 daily.</p>
    <dl class="stat-row tight">
      <div><dt>HERITAGE NOTICES POSTED</dt><dd>147</dd></div>
      <div><dt>ACTIVE WORKS PERMITS</dt><dd>64</dd></div>
      <div><dt>RECONSTITUTED FY 2024&ndash;25</dt><dd>&#x20B9;4.3 Cr</dd></div>
      <div><dt>PERMIT QUEUE</dt><dd>12</dd></div>
    </dl>
    <p class="muted small">CITIZEN COUNCIL OVER THE HERITAGE BY-LAWS OF 1956.</p>
  </article>
</section>

<p class="rule-label">ACTIVE CONSERVATION WORKS &middot; 2026</p>

<section class="three-cols">
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">WORK 1</span> &middot; SOUTHERN PRAKARA WALL</p>
    <h3 class="card-title">Lime-Mortar Repointing of the Southern Prakara</h3>
    <p>The 312-metre southern enclosure wall &mdash; a granite rubble core faced in dressed ashlar &mdash; is being repointed with traditional lime-jaggery-kadukai mortar prepared on site at the Vadakku Veethi works yard. Concrete sealants from the 1968 intervention are being carefully reversed.</p>
    <ul class="meta-list"><li><span>SANCTIONED</span><span>04 SEPT 2025</span></li><li><span>COST</span><span>&#x20B9; 1.92 Cr</span></li><li><span>STATUS</span><span class="hot">In progress &middot; 38%</span></li></ul>
  </article>
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">WORK 2</span> &middot; MANDAPA ROSETTES</p>
    <h3 class="card-title">Polychrome Restoration of Mandapa Rosettes</h3>
    <p>Under the East Veethi colonnade, eighteen of the sixty-eight ceiling rosettes retain their original natural-mineral pigment under Madras Presidency whitewash. The Authority&rsquo;s restorers &mdash; trained at the Government College of Architecture &amp; Sculpture, Mamallapuram &mdash; are stabilising rather than completing.</p>
    <ul class="meta-list"><li><span>SANCTIONED</span><span>02 AUG 2025</span></li><li><span>COST</span><span>&#x20B9; 80 L</span></li><li><span>STATUS</span><span class="hot">Aug 2026</span></li></ul>
  </article>
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">WORK 3</span> &middot; INSCRIPTION SURVEY</p>
    <h3 class="card-title">Seventeenth-Century Stone Inscription Survey</h3>
    <p>The joint inventory with the Department of Archaeology, Chennai, catalogues every inscription of the seventeenth century within the regulated 28.4-acre quadrant. To date 247 inscriptions of the original 1098 have been read; transcripts are filed at the Reading Room.</p>
    <ul class="meta-list"><li><span>SANCTIONED</span><span>JAN 2026</span></li><li><span>STATUS</span><span class="hot">Phase 1 complete</span></li><li><span>FIELD CARDS</span><span>247 / 1098</span></li></ul>
  </article>
</section>

<p class="rule-label">THE INSCRIPTION REGISTER</p>

<section class="two-cols mt-tight">
  <aside class="info-card narrow">
    <p class="card-eyebrow">VANT CUSTODY &middot; AUTHORITY &amp; DEPARTMENT OF ARCHAEOLOGY, CHENNAI</p>
    <div class="lotus-stage small">{lot}</div>
  </aside>
  <article class="info-card wide">
    <h3 class="display-2">Of stones that remember the village&rsquo;s earliest grants</h3>
    <p>Two hundred and eighty-seven inscribed-surfaces have been identified within the heritage quadrant. The earliest is the Kulottunga Chola endowment of CE 1098, incised on the southern face of the sanctum plinth on East Veethi. The latest pre-modern stone is a Maratha-period grant for the maintenance of the tank steps &mdash; is dated Saka 1722 (CE 1799).</p>
    <p>Each inscription is photographed, three-dimensionally scanned at 0.4&nbsp;mm resolution, and transcribed in Tamil and Roman characters. Estampages on country-made paper are taken at the seal months between November and February only.</p>
  </article>
</section>

<section class="register">
  <h3 class="card-title">Selected entries from the public register</h3>
  <p class="muted">Drawn from Volume IV (2024) &mdash; open to inspection at the Sannidhi Veethi archive on weekdays, 10:00 &ndash; 16:30.</p>
  <table class="ledger-table">
    <thead><tr><th>REGISTER&nbsp;#</th><th>DATE</th><th>SCRIPT</th><th>LOCATION</th><th>SUBJECT OF THE GRANT</th></tr></thead>
    <tbody>
      <tr><td><span class="hot">TVN/I/04</span></td><td>CE 1098</td><td>TAMIL</td><td>Sanctum plinth, south face</td><td>Kulottunga Chola I &mdash; endowment of four <em>veli</em> of land at Periyakulivaal for daily lamp oil</td></tr>
      <tr><td><span class="hot">TVN/I/09</span></td><td>CE 1247</td><td>TAMIL</td><td>North Mada, gateway lintel</td><td>Pandya Maravarman &mdash; assignment of weavers&rsquo; guild dues to mandapa lamp service</td></tr>
      <tr><td><span class="hot">TVN/I/14</span></td><td>CE 1349</td><td>GRANTHA</td><td>Tank coping, east step</td><td>Sankrit benediction recording the deepening of the Kalyana Theertham by Vinayaka Sastri</td></tr>
      <tr><td><span class="hot">TVN/I/22</span></td><td>CE 1498</td><td>TAMIL</td><td>East Veethi mandapa, pillar 27</td><td>Achutappa Nayak &mdash; order constituting the brass-merchants&rsquo; aisle and its measure tax</td></tr>
      <tr><td><span class="hot">TVN/I/55</span></td><td>CE 1641</td><td>TAMIL</td><td>South prakara, course 4</td><td>Vijayaraghava Nayak &mdash; masons&rsquo; completion-record marking twelve khipanis</td></tr>
      <tr><td><span class="hot">TVN/I/72</span></td><td>CE 1721</td><td>TAMIL</td><td>West Veethi, ghat balustrade</td><td>Serfoji I &mdash; assignment of public revenues for annual tank silt clearing in Aippasi</td></tr>
      <tr><td><span class="hot">TVN/I/99</span></td><td>CE 1799</td><td>TAMIL</td><td>Tank south steps, riser 2</td><td>Maratha-period grant for the upkeep of the bathing ghats and the daily ablution lamps</td></tr>
    </tbody>
  </table>
</section>

<p class="rule-label">PUBLIC CALENDAR &middot; CONSERVATION</p>

<section class="four-cols">
  <article class="info-card cal"><p class="hot bigdate">12<small>NOVEMBER 2025</small></p><h4>Estampage Season Opens</h4><p>First impressions of the season taken on inscriptions TVN/I/120-148; weather permitting.</p></article>
  <article class="info-card cal"><p class="hot bigdate">04<small>JANUARY 2026</small></p><h4>Rosetta Panel Review</h4><p>Public viewing of restored panels 14&ndash;32; lectern at scale, 11.30 hr at the mandapa.</p></article>
  <article class="info-card cal"><p class="hot bigdate">19<small>MARCH 2026</small></p><h4>Annual Tank Clearing</h4><p>Traditional desilting of Kalyana Theertham. Ward 7 volunteers roll opens 04 Mar.</p></article>
  <article class="info-card cal"><p class="hot bigdate">27<small>FEBRUARY 2026</small></p><h4>Heritage Walk &middot; East Veethi</h4><p>Curator-led walk on the Sannidhi Veethi archive, 16:00 from the Sannidhi pillar.</p></article>
</section>
'''


def page_4():
    bird = headpiece('twin-peacocks', width=520, height=44, css_class='headpiece twin')
    lot = lotus(150, animated=True)
    return f'''
<section class="hero center">
  <p class="eyebrow"><span class="hot">SECTION&nbsp;IV</span> &middot; THE OFFICIAL NOTICE BOARD</p>
  <div class="hero-band tiny">{bird}</div>
  <h1 class="display-1 center-text">Public Notices &amp; <span class="hot">Tenders</span></h1>
  <p class="lede center-text wide">Issued under the Public Information Section, Counter 4. Notices are simultaneously affixed in the press, in the Town Hall display board, and on this register. Tenders are entertained by lot in writing in the prescribed form. The fortnightly bulletin is despatched on the 1st and 15th.</p>
  <dl class="stat-row center">
    <div><dt>VOL.</dt><dd>14</dd></div>
    <div><dt>NO.</dt><dd>O</dd></div>
    <div><dt>BULLETIN</dt><dd>21 Aippasi</dd></div>
    <div><dt>SANCTIONED</dt><dd>9 R. Sundararajan, IAS</dd></div>
    <div><dt>NOV 2025</dt><dd>04 Nov 2025</dd></div>
  </dl>
</section>

<section class="two-cols">
  <article class="info-card wide">
    <p class="card-eyebrow"><span class="hot">NOTICE A &middot; PWD/2026/04</span> &middot; TENDER OPEN &middot; 14 NOV</p>
    <h3 class="card-title hot">Rebuilding of the Kulibam Culvert at Sannidhi North Crossing</h3>
    <p>Sealed tenders are invited for the demolition and reconstruction of the masonry culvert at the Sannidhi North Crossing, comprising a 4.8 m clear span over the Kulibam channel, with side parapets in coursed Karaikudi granite. The work shall be executed in two seasons (off-monsoon) following the published schedule.</p>
    <table class="ledger-table compact">
      <thead><tr><th>ITEM</th><th>QUANTITY</th><th>UNIT RATE (PROVISIONAL)</th></tr></thead>
      <tbody>
        <tr><td>Granite ashlar (Karaikudi grade A)</td><td>184 cu m</td><td>&#x20B9; 38,200/cu m</td></tr>
        <tr><td>Lime-mortar bedding (1:2 mix)</td><td>62 cu m</td><td>&#x20B9; 8,400/cu m</td></tr>
        <tr><td>Hand-dressed kerb stones</td><td>312 m</td><td>&#x20B9; 1,250/m</td></tr>
        <tr><td>Wrought-iron handrail</td><td>96 m</td><td>&#x20B9; 4,400/m</td></tr>
        <tr><td>Cast pavement carriageway</td><td>240 sq m</td><td>&#x20B9; 4,800/sq m</td></tr>
      </tbody>
    </table>
    <p class="muted small"><span class="hot">&sect;</span> Sealed quotations to be tendered in triplicate, accompanied by drawings A-1 to A-9 of the precinct schedule, on or before 20 Nov 2025 in the Counter 4 register.</p>
  </article>
  <aside class="info-card narrow">
    <h3 class="card-title">Where to Inspect Documents</h3>
    <p class="muted">All schedule drawings are exhibited under glass in the corridor of the Old Block. Office copies are available, on requisition, at Counter 4.</p>
    <div class="lotus-stage small">{lot}</div>
    <ul class="address-list">
      <li><span class="hot dot">&bull;</span><strong>SCHEDULE A</strong>&nbsp;&mdash; Drawings and elevations</li>
      <li><span class="hot dot">&bull;</span><strong>SCHEDULE B</strong>&nbsp;&mdash; Material specifications</li>
      <li><span class="hot dot">&bull;</span><strong>SCHEDULE C</strong>&nbsp;&mdash; Performance bond template</li>
    </ul>
    <h3 class="card-title">Closures &amp; Hearings</h3>
    <ul class="ledger compact">
      <li>Counter 4 closed: <em>02 Dec, 11:00&ndash;13:00</em></li>
      <li>Heritage Cell hearing: <em>05 Dec, 14:30</em></li>
      <li>Markets Section: <em>11 Dec, public</em></li>
      <li>Tenders open by lot: <em>15 Dec, 10:30</em></li>
    </ul>
    <h3 class="card-title">Public Notices</h3>
    <p class="muted small">By orders of the Authority, all street-vendors are required to renew traffic-free badges by the close of business on 30 November.</p>
  </aside>
</section>

<section class="single-col mt-2x">
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">NOTICE B &middot; PWD/2026/05</span> &middot; ASSESSMENT</p>
    <h3 class="card-title hot">Revised Property Tax Assessment Schedule for Zones A, B, &amp; C</h3>
    <p>In pursuance of <em>G.O. 16(M)/2024</em>, dated 12 June 2024, the Revenue Section has reissued the assessment schedule for residential properties valued at or below &#x20B9; 5 lakh per annum. The reassessment applies to Zones A (Sannidhi), B (Kaveri) and C (Pillaiyar Koil) and shall be effective from the financial year 2026&ndash;27.</p>
    <ol class="numbered">
      <li>Form 14-A, duly attested by the Ward Officer of competent jurisdiction, shall be submitted in duplicate.</li>
      <li>Properties bearing a heritage-citation Class I or II shall continue to enjoy a 35% remission, vide <span class="hot">Schedule III</span>.</li>
      <li>The first instalment shall be payable on or before the 15th of December 2025; the second by the 15th of February 2026.</li>
      <li>Disputes arising out of the present revision shall be heard by the Tribunal on such Mondays as the Tribunal so directs.</li>
      <li>This notice supersedes paragraphs 4 to 9 of the schedule of 12 June 2024 in so far as they apply to Zones A, B, and C.</li>
    </ol>
  </article>
</section>

<section class="single-col mt-tight">
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">NOTICE C &middot; TPL/2026/02</span> &middot; PROCESSION</p>
    <h3 class="card-title hot">Road Closure &middot; Chitra Veethi during the Brahmotsava Temple-Car Festival</h3>
    <p>On the joint command of the Brahmasrini Office and the Office of the Commissioner, the eight-day Brahmotsava festival shall be observed between the 18th and 25th of November, 2025. During the festival, the routes prescribed below shall be closed to all wheeled traffic save the temple-car (vamana) and the medical assistance vehicles:</p>
    <ul class="ledger compact">
      <li>North Mada Veethi &mdash; closed 06:00&ndash;14:00 daily &middot; chariot circumambulation</li>
      <li>East Mada Veethi &mdash; closed 14:00&ndash;22:00 daily &middot; lamp procession</li>
      <li>Sannidhi cross at the Bull Pillar &mdash; closed throughout, except 02:00&ndash;05:00 service window</li>
      <li>Bypass diversion via the Outer Bund &middot; signage at six points</li>
    </ul>
  </article>
</section>

<section class="single-col mt-tight">
  <h3 class="card-title">Recent Notices on Record</h3>
  <table class="ledger-table">
    <thead><tr><th>NOTICE&nbsp;#</th><th>SUBJECT</th><th>POSTED</th><th>STATUS</th></tr></thead>
    <tbody>
      <tr><td><span class="hot">TVN/N/118</span></td><td>Renewal of trade-licence for the Periya Theru market block</td><td>02 Sep 2025</td><td><span class="hot">Open</span></td></tr>
      <tr><td><span class="hot">TVN/N/119</span></td><td>Repair of the Sannidhi-North gully section</td><td>14 Sep 2025</td><td>Closed</td></tr>
      <tr><td><span class="hot">TVN/N/120</span></td><td>Tender for the Kalyana Theertham desilting</td><td>21 Sep 2025</td><td><span class="hot">Open</span></td></tr>
      <tr><td><span class="hot">TVN/N/121</span></td><td>Hearing on the Sankan Sundavu Kovil east wall conservation</td><td>05 Oct 2025</td><td>Reserved</td></tr>
      <tr><td><span class="hot">TVN/N/122</span></td><td>Closure of Counter 6 for archive shifting (29 Oct only)</td><td>22 Oct 2025</td><td>Closed</td></tr>
      <tr><td><span class="hot">TVN/N/123</span></td><td>Vehicle entry permits for the Brahmotsava festival</td><td>09 Nov 2025</td><td><span class="hot">Open</span></td></tr>
    </tbody>
  </table>
</section>
'''


def page_5():
    pal = headpiece('arabesque-palmette', width=120, height=70, css_class='headpiece small-pal')
    conch = read_svg_inner('conch-shell', width=110, height=70, css_class='conch')
    return f'''
<section class="hero center">
  <p class="eyebrow"><span class="hot">SECTION&nbsp;V</span> &middot; SERVICES &amp; FORMS &middot; FOR THE RESIDENT</p>
  <div class="hero-band tiny">{pal}</div>
  <h1 class="display-1 center-text">Services for Residents</h1>
  <p class="lede center-text wide">The Authority issues twelve standing services from the Counter Block on weekdays, in conformance with the Citizens&rsquo; Charter of 2018. Forms below are valid for the entire fiscal year. Late applications carry a flat acceptance fee of &#x20B9; 200, paid at the same window.</p>
  <p class="muted center-text"><a class="lnk hot">Counter Charter (PDF, 2018)</a> &middot; <a class="lnk hot">Online Form Helper</a></p>
</section>

<section class="four-cols">
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">FORM 1</span> &middot; CIVIL REGISTRATION</p>
    <h3 class="card-title">Birth &amp; Death Registration</h3>
    <p class="muted">Birth and death applications are entertained at Counter 1 on the day of recording. Beyond 21 days, an attestation by the Ward Officer is required.</p>
    <ul class="ledger compact">
      <li>Counter 1 &middot; Block A</li>
      <li>Form B-14 (white)</li>
      <li>Birth certificate fee &middot; &#x20B9; 25</li>
      <li>Late: &#x20B9; 200 + clearance</li>
    </ul>
  </article>
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">FORM 2</span> &middot; LICENCE</p>
    <h3 class="card-title">Trade Licensing</h3>
    <p class="muted">Trade and service-house licences and renewals are entertained on the strength of the prescribed form. Hearings on first issuance fall on alternate Wednesdays.</p>
    <ul class="ledger compact">
      <li>Counter 5 &middot; Block A</li>
      <li>Form L-22 (yellow)</li>
      <li>Issue fee &middot; &#x20B9; 1,200</li>
      <li>Renewal fee &middot; &#x20B9; 800</li>
    </ul>
  </article>
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">FORM 3</span> &middot; UTILITY</p>
    <h3 class="card-title">Water Connection Applications</h3>
    <p class="muted">Domestic water connection sanctions are issued from Counter 3 jointly with the Engineering Section. Site survey is undertaken within ten working days of receipt.</p>
    <ul class="ledger compact">
      <li>Counter 3 &middot; Block B</li>
      <li>Form W-04 (blue)</li>
      <li>Sanction fee &middot; &#x20B9; 4,500</li>
      <li>Survey within 10 days</li>
    </ul>
  </article>
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">FORM 4</span> &middot; PERMIT</p>
    <h3 class="card-title">Building Plan Approvals</h3>
    <p class="muted">All building plan approvals within the precinct envelope are routed through the Heritage Cell. Outside the envelope, ordinary plan approvals are dealt with on a 21-day cycle.</p>
    <ul class="ledger compact">
      <li>Counter 7 &middot; Block C</li>
      <li>Form P-09 (green)</li>
      <li>Plan fee &middot; &#x20B9; 35/sqft</li>
      <li>Heritage premium &middot; +25%</li>
    </ul>
  </article>
</section>

<section class="hotline">
  <div class="hotline-conch">{conch}</div>
  <div class="hotline-text">
    <p class="card-eyebrow">GRIEVANCE &amp; PUBLIC HEARING &middot; HOTLINE</p>
    <h3>Grievance Darbar Hotline</h3>
    <p>For redressal of civic grievance &middot; toll-free, 08:00&nbsp;&ndash;&nbsp;20:00, every day.</p>
  </div>
  <div class="hotline-num">
    <p class="bignum">1800&ndash;425&ndash;1947</p>
    <p class="muted small">Counter 8 &middot; Old Block<br/>Daily Roster</p>
  </div>
</section>

<section class="two-cols mt-2x">
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">RATES</span> &middot; ACTIVE</p>
    <h3 class="card-title hot">e-Sevai Kiosks &middot; Six Revenue Circles</h3>
    <table class="ledger-table compact">
      <thead><tr><th>CIRCLE</th><th>LOCATION</th><th>HOURS</th><th>AVG. WAIT</th></tr></thead>
      <tbody>
        <tr><td><span class="hot">CR/01</span></td><td>Sannidhi</td><td>09:00&ndash;17:00</td><td>14 min</td></tr>
        <tr><td><span class="hot">CR/02</span></td><td>Kaveri Bund</td><td>09:00&ndash;16:30</td><td>21 min</td></tr>
        <tr><td><span class="hot">CR/03</span></td><td>Pillaiyar Koil</td><td>10:00&ndash;17:00</td><td>9 min</td></tr>
        <tr><td><span class="hot">CR/04</span></td><td>Periya Theru</td><td>09:00&ndash;18:00</td><td>32 min</td></tr>
        <tr><td><span class="hot">CR/05</span></td><td>Mada Veethi East</td><td>09:00&ndash;17:00</td><td>17 min</td></tr>
        <tr><td><span class="hot">CR/06</span></td><td>Outer Bund</td><td>09:00&ndash;16:00</td><td>11 min</td></tr>
      </tbody>
    </table>
  </article>
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">SCHEDULE</span> &middot; FORTNIGHTLY</p>
    <h3 class="card-title hot">Night Sanitation Roster</h3>
    <table class="ledger-table compact">
      <thead><tr><th>EVE</th><th>WARDS COVERED</th><th>SHIFT</th></tr></thead>
      <tbody>
        <tr><td><span class="hot">MON</span></td><td>01, 02, 03 &middot; Sannidhi</td><td>22:00&ndash;05:00</td></tr>
        <tr><td><span class="hot">TUE</span></td><td>04, 05, 06 &middot; Sannidhi East</td><td>22:00&ndash;05:00</td></tr>
        <tr><td><span class="hot">WED</span></td><td>07, 08, 09 &middot; Kaveri</td><td>22:00&ndash;05:00</td></tr>
        <tr><td><span class="hot">THU</span></td><td>10, 11, 12 &middot; Kaveri</td><td>22:00&ndash;05:00</td></tr>
        <tr><td><span class="hot">FRI</span></td><td>13, 14, 15 &middot; Pillaiyar</td><td>22:00&ndash;05:00</td></tr>
        <tr><td><span class="hot">SAT</span></td><td>16, 17, 18 &middot; Pillaiyar</td><td>22:00&ndash;05:00</td></tr>
      </tbody>
    </table>
  </article>
</section>

<section class="four-cols mt-tight">
  <article class="info-card cal"><p class="hot bigdate">11<small>FORM TURN-AROUND</small></p><h4>Take or Surprise</h4><p>Median time at Counter 1 for an attested copy of birth certificate &mdash; 11 working minutes.</p></article>
  <article class="info-card cal"><p class="hot bigdate">19<small>NOV CIVIC FILING</small></p><h4>Counter Filing</h4><p>Median bulk filings cleared by the Counter Block per working day.</p></article>
  <article class="info-card cal"><p class="hot bigdate">3<small>BLOCKS</small></p><h4>Counter &middot; Hall A</h4><p>Three counter blocks operate concurrently; Block C is reserved for Heritage Cell only.</p></article>
  <article class="info-card cal"><p class="hot bigdate">14<small>FY 2024-25</small></p><h4>Disposal &amp; Despatch</h4><p>Median disposal time, in calendar days, of a residential plan-approval application within the heritage envelope.</p></article>
</section>
'''


def page_6():
    bird = headpiece('peacock-headpiece', width=400, height=58, css_class='headpiece peacock-mini')
    return f'''
<section class="hero">
  <div class="hero-card">
    <div class="hero-text full">
      <p class="eyebrow"><span class="hot">SECTION&nbsp;VI</span> &middot; VISIT TOWN HALL &middot; HOW TO REACH 14 SANNIDHI VEETHI</p>
      <h1 class="display-1">Visit the <span class="hot">Town Hall</span> at 14 Sannidhi Veethi</h1>
      <p class="lede">A granite and brick edifice of 1909, surveyed in 1956 under the Heritage Districts Act 12. The premises front Sannidhi Veethi to the north on five terrace lines and the colonnaded ones with mada-veethis south. The current commissioner&rsquo;s chambers occupy the ground floor of the central wing. Visitors are received within usual office hours from the front gate.</p>
      <dl class="stat-row">
        <div><dt>BUILT</dt><dd>10 Sannidhi Veethi, 612 401</dd></div>
        <div><dt>HOURS</dt><dd>Mon&ndash;Sat &middot; 09:30&ndash;17:00</dd></div>
        <div><dt>EAST GATE BAGGAGE</dt><dd>1900</dd></div>
      </dl>
      <div class="hero-band tiny right">{bird}</div>
    </div>
  </div>
</section>

<section class="two-cols">
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">VISITING</span> &middot; HOURS</p>
    <h3 class="card-title hot">When the Hall is Open</h3>
    <table class="ledger-table compact">
      <tbody>
        <tr><td><span class="hot">MONDAY</span></td><td>09:30 &mdash; 17:00</td></tr>
        <tr><td><span class="hot">TUESDAY</span></td><td>09:30 &mdash; 17:00</td></tr>
        <tr><td><span class="hot">WEDNESDAY</span></td><td>09:30 &mdash; 17:00</td></tr>
        <tr><td><span class="hot">THURSDAY</span></td><td>09:30 &mdash; 17:00</td></tr>
        <tr><td><span class="hot">FRIDAY</span></td><td>09:30 &mdash; 17:00</td></tr>
        <tr><td><span class="hot">SATURDAY</span></td><td>09:30 &mdash; 13:00</td></tr>
        <tr><td><span class="hot">SUNDAY</span></td><td>Closed</td></tr>
        <tr><td><span class="hot">2nd SATURDAY</span></td><td>Closed</td></tr>
        <tr><td><span class="hot">PUBLIC HOLIDAYS</span></td><td>Closed</td></tr>
      </tbody>
    </table>
  </article>
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">ENTRY</span> &middot; FOUR ENTRANCES</p>
    <h3 class="card-title hot">Finding the Right Door</h3>
    <ul class="ledger compact">
      <li><strong>Mukhya Vaayil</strong>&nbsp;&middot; Sannidhi Veethi</li>
      <li><strong>Sannidhi Vaayil</strong>&nbsp;&middot; from East Mada Veethi</li>
      <li><strong>Padma Vaayil</strong>&nbsp;&middot; from West Mada Veethi (handicapped ramp)</li>
      <li><strong>Sevai Vaayil</strong>&nbsp;&middot; for office staff and registered counsel; pass required</li>
      <li><strong>Eastern Block</strong>&nbsp;&middot; Heritage Cell exit, escorted only</li>
      <li><strong>Garba Vaayil</strong>&nbsp;&middot; archives, by appointment via Counter 4</li>
    </ul>
  </article>
</section>

<section class="map">
  <h2 class="section-h center-text">SANNIDHI VEETHI</h2>
  <p class="muted center-text">CIVIC CARTOGRAPHY &middot; 14 SANNIDHI VEETHI &middot; 612 401 &middot; THANJAVUR &middot; TAMIL NADU</p>
  <div class="map-canvas">
    <div class="map-block"><span>TOWN HALL</span></div>
    <div class="map-pin">14</div>
    <div class="map-veethi">SANNIDHI VEETHI</div>
    <div class="map-park">PARK</div>
    <div class="map-temple">TEMPLE</div>
  </div>
</section>

<section class="two-cols">
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">TRANSPORT</span> &middot; PUBLIC</p>
    <h3 class="card-title hot">Walking from the Infused Bus Stand</h3>
    <p>The bus stand is at the western end of the Mada-Veethi square; trains halt at Thiruvanam Station, 1.6 km out. From either, the route through the Park is shaded and pleasant.</p>
    <ul class="ledger compact">
      <li>From the bus stand &mdash; <strong>5 min walk</strong> via Mada Veethi</li>
      <li>From the railway station &mdash; <strong>14 min auto ride</strong> @ &#x20B9; 70</li>
      <li>From the temple precinct &mdash; <strong>3 min walk</strong></li>
      <li>From the river ghat &mdash; <strong>9 min walk</strong></li>
      <li>From the highway terminus &mdash; <strong>17 min auto ride</strong></li>
    </ul>
  </article>
  <article class="info-card">
    <p class="card-eyebrow"><span class="hot">DETAIL</span> &middot; WHAT TO BRING</p>
    <h3 class="card-title hot">For Every Visitor</h3>
    <div class="g4">
      <div><p class="card-eyebrow">A1</p><p>Photo identification of the bearer (Aadhaar, voter ID).</p></div>
      <div><p class="card-eyebrow">A2</p><p>Reference (notice or receipt) bearing the file/index number.</p></div>
      <div><p class="card-eyebrow">A3</p><p>Counter-pass for any registered counsel, valid through the visit.</p></div>
      <div><p class="card-eyebrow">A4</p><p>Modest dress as appropriate to a Government office.</p></div>
    </div>
  </article>
</section>

<section class="cta single-col">
  <div class="cta-card">
    <p class="card-eyebrow"><span class="hot">NEED A LETTER</span> APPOINTMENT?</p>
    <p>The Commissioner is reachable for in-person hearings on Tuesday morning by prior appointment. Letters from constituents are welcomed and answered fortnightly.</p>
    <a class="lnk hot" href="#">REQUEST AN APPOINTMENT &rarr;</a>
  </div>
</section>
'''


# ----- CSS -------------------------------------------------------------------
CSS = r'''
:root {
  --bg: #fbf3df;
  --bg-2: #f6e9c8;
  --bg-card: #fff7e1;
  --ink: #2a201a;
  --ink-soft: #5a4a3e;
  --hot: #c33b1e;
  --hot-2: #e25036;
  --rule: #d8b893;
  --line: #cfa97e;
  --footer-bg: #15110d;
  --footer-ink: #ddc5a3;
  --footer-rule: #4a3520;
  --font-display: "Fraunces", "Spectral", Georgia, serif;
  --font-eye: "Cinzel", "Fraunces", serif;
  --font-body: "Spectral", "Fraunces", Georgia, serif;
}
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.55;
  width: 1440px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
}
a { color: var(--hot); text-decoration: none; }
a:hover { text-decoration: underline; }
em { font-style: italic; color: var(--ink-soft); }
small { font-size: 0.78em; }
.hot { color: var(--hot); }
.muted { color: var(--ink-soft); }
.muted-script { font-style: italic; color: var(--ink-soft); margin-top: -8px; }
.center-text { text-align: center; }
.center { justify-content: center; }
.mt-tight { margin-top: 24px; }
.mt-2x { margin-top: 56px; }

/* topbar */
.topbar {
  background: #0e0a06;
  color: #d9c69e;
  font-family: var(--font-eye);
  letter-spacing: 0.14em;
  font-size: 11px;
}
.topbar-inner {
  max-width: 1320px;
  margin: 0 auto;
  padding: 8px 36px;
  display: flex;
  justify-content: space-between;
}
.topbar-right { color: #f0c279; }

/* header */
.site-header {
  border-bottom: 1px solid var(--line);
  padding: 18px 36px;
  background: var(--bg);
}
.header-inner {
  max-width: 1320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.brand { display: flex; flex-direction: column; line-height: 1; }
.brand-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 26px;
  letter-spacing: 0.01em;
}
.brand-sub {
  font-family: var(--font-eye);
  font-size: 10px;
  letter-spacing: 0.32em;
  color: var(--ink-soft);
  margin-top: 4px;
}
.brand-sub em { color: var(--hot); font-style: italic; letter-spacing: 0.14em; }
.primary-nav { display: flex; gap: 28px; }
.nav-link {
  font-family: var(--font-eye);
  font-size: 12px;
  letter-spacing: 0.22em;
  color: var(--ink);
  padding: 8px 2px;
  border-bottom: 2px solid transparent;
}
.nav-link.active { color: var(--hot); border-bottom-color: var(--hot); }

/* main */
.page-main {
  max-width: 1320px;
  margin: 0 auto;
  padding: 30px 36px 60px;
}

/* hero */
.hero { margin-top: 8px; }
.hero.center { text-align: center; padding: 6px 0 12px; }
.hero-card {
  display: grid;
  grid-template-columns: 1.55fr 1fr;
  gap: 32px;
  align-items: stretch;
  background: var(--bg-card);
  border: 1px solid var(--line);
  padding: 36px 38px;
  position: relative;
}
.hero-text { padding: 8px 0; }
.hero-text.full { grid-column: span 2; }
.ornament-band { display: flex; justify-content: center; margin-bottom: 18px; }
.hero-band { display: flex; justify-content: center; margin: 6px 0 16px; }
.hero-band.tiny svg { max-height: 80px; }
.hero-band.right { justify-content: flex-end; }
.eyebrow {
  font-family: var(--font-eye);
  font-size: 11px;
  letter-spacing: 0.28em;
  color: var(--ink-soft);
  text-transform: uppercase;
  margin: 0 0 14px;
}
.display-1 {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 56px;
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin: 0 0 18px;
  color: var(--ink);
}
.display-1.center-text { font-size: 60px; margin: 8px auto 18px; max-width: 880px; }
.display-2 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 34px;
  line-height: 1.15;
  margin: 6px 0 14px;
}
.lede { font-size: 15px; max-width: 720px; line-height: 1.65; color: var(--ink-soft); }
.lede.wide { max-width: 980px; margin: 0 auto 22px; }
.lede.center-text { margin-left: auto; margin-right: auto; }

.stat-row { display: flex; gap: 36px; padding: 0; margin: 18px 0 0; flex-wrap: wrap; }
.stat-row.center { justify-content: center; gap: 64px; }
.stat-row.tight { margin-top: 10px; }
.stat-row > div { display: flex; flex-direction: column; }
.stat-row dt {
  font-family: var(--font-eye);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: var(--ink-soft);
}
.stat-row dd {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 600;
  margin: 2px 0 0;
  color: var(--ink);
}
.stat-row.center dd { font-size: 38px; color: var(--hot); }

.hero-aside {
  background: var(--bg-2);
  border: 1px dashed var(--line);
  padding: 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
}
.aside-eyebrow {
  font-family: var(--font-eye);
  font-size: 10px;
  letter-spacing: 0.3em;
  color: var(--hot);
  margin: 0 0 14px;
}
.aside-name {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 24px;
  color: var(--ink);
  margin: 18px 0 8px;
}
.aside-meta { font-size: 12px; color: var(--ink-soft); line-height: 1.55; }

.lotus-stage {
  width: 220px; height: 200px; display: flex; align-items: center; justify-content: center;
  color: var(--hot);
}
.lotus-stage.small { width: 180px; height: 160px; margin: 0 auto; }

/* lotus animation */
.lotus { transform-origin: 50% 60%; }
.lotus-bloom { animation: lotus-bloom 4s ease-in-out infinite; }
@keyframes lotus-bloom {
  0%, 100% { transform: scale(0.65) rotate(-3deg); }
  50% { transform: scale(1.04) rotate(3deg); }
}

/* rule label */
.rule-label {
  font-family: var(--font-eye);
  text-align: center;
  letter-spacing: 0.32em;
  color: var(--ink-soft);
  font-size: 11px;
  margin: 38px 0 16px;
  position: relative;
}
.rule-label::before, .rule-label::after {
  content: "";
  position: absolute;
  top: 50%;
  width: calc(50% - 200px);
  height: 1px;
  background: var(--line);
}
.rule-label::before { left: 0; }
.rule-label::after { right: 0; }

.section-h {
  font-family: var(--font-display);
  font-size: 36px;
  margin: 14px 0 18px;
  color: var(--hot);
  font-weight: 700;
}
.section-h.center-text { text-align: center; color: var(--ink); }

/* card grid */
.three-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
.two-cols { display: grid; grid-template-columns: 1.55fr 1fr; gap: 22px; }
.four-cols { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.single-col { display: block; }

.info-card {
  background: var(--bg-card);
  border: 1px solid var(--line);
  padding: 22px 24px;
  position: relative;
}
.info-card.wide { grid-column: span 1; }
.info-card.narrow { background: var(--bg-2); }
.card-eyebrow {
  font-family: var(--font-eye);
  font-size: 10px;
  letter-spacing: 0.22em;
  color: var(--ink-soft);
  text-transform: uppercase;
  margin: 0 0 10px;
}
.card-title {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  margin: 0 0 10px;
  line-height: 1.18;
  color: var(--ink);
}
.card-sub {
  font-family: var(--font-eye);
  font-size: 12px;
  letter-spacing: 0.18em;
  margin: 16px 0 8px;
  color: var(--ink);
}
.card-sub .small { font-size: 9px; }
.meta-list { list-style: none; padding: 0; margin: 12px 0 0; }
.meta-list li { display: flex; justify-content: space-between; border-top: 1px solid var(--line); padding-top: 8px; font-family: var(--font-eye); font-size: 11px; letter-spacing: 0.16em; }
.meta-list span:first-child { color: var(--hot); }

.address-list { list-style: none; padding: 0; margin: 0; }
.address-list li { padding: 10px 0; border-top: 1px dashed var(--line); font-size: 13px; line-height: 1.5; color: var(--ink-soft); }
.address-list li:first-child { border-top: 0; }
.address-list strong { display: inline; color: var(--ink); font-family: var(--font-eye); font-size: 11px; letter-spacing: 0.18em; margin-left: 6px; }
.dot { font-size: 18px; vertical-align: middle; }

.signoff { margin-top: 22px; line-height: 1.4; }
.signoff strong { font-family: var(--font-display); font-size: 18px; }
.muted-lab { font-family: var(--font-eye); font-size: 10px; letter-spacing: 0.2em; color: var(--ink-soft); }

/* zones */
.zones { display: flex; flex-direction: column; gap: 18px; }
.zone-block { background: var(--bg-card); border: 1px solid var(--line); }
.zone-header {
  background: var(--hot);
  color: #fff;
  font-family: var(--font-eye);
  letter-spacing: 0.18em;
  font-size: 12px;
  padding: 12px 22px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
}
.zone-header .zone-officer { font-size: 10px; opacity: 0.9; }
.ward-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; padding: 8px; }
.ward-card { padding: 14px 14px 16px; border-right: 1px dashed var(--line); border-bottom: 1px dashed var(--line); }
.ward-card:nth-child(4n) { border-right: 0; }
.ward-eyebrow { font-family: var(--font-eye); font-size: 10px; letter-spacing: 0.2em; color: var(--ink-soft); margin: 0; }
.ward-name { font-family: var(--font-display); font-weight: 600; font-size: 14px; margin: 4px 0 2px; color: var(--hot); }
.ward-addr { font-size: 12px; color: var(--ink-soft); margin: 0 0 4px; }
.ward-est { font-family: var(--font-eye); font-size: 9px; letter-spacing: 0.18em; color: var(--ink-soft); margin: 0; }

/* tables */
.zonal-table, .ledger-table { width: 100%; border-collapse: collapse; margin: 12px 0; font-size: 13px; }
.zonal-table th, .ledger-table th { font-family: var(--font-eye); font-size: 10px; letter-spacing: 0.18em; text-align: left; color: var(--ink-soft); padding: 10px 8px; border-bottom: 1px solid var(--line); }
.zonal-table td, .ledger-table td { padding: 10px 8px; border-bottom: 1px dashed var(--line); vertical-align: top; line-height: 1.4; }
.ledger-table tbody tr:nth-child(odd) { background: rgba(225, 195, 145, 0.18); }
.ledger-table.compact th, .ledger-table.compact td { padding: 7px 6px; font-size: 12px; }

.ledger { list-style: none; padding: 0; margin: 8px 0; }
.ledger li { padding: 7px 0; border-top: 1px dashed var(--line); font-size: 13px; }
.ledger li:first-child { border-top: 0; }
.ledger.compact li { padding: 5px 0; font-size: 12px; }

.numbered { padding-left: 18px; line-height: 1.65; }
.numbered li { padding: 4px 0; }

/* register */
.register .card-title { color: var(--hot); margin-bottom: 4px; }

/* calendar cards */
.cal { text-align: left; }
.bigdate { font-family: var(--font-display); font-size: 56px; font-weight: 700; line-height: 1; margin: 0 0 8px; }
.bigdate small { font-family: var(--font-eye); font-size: 10px; letter-spacing: 0.2em; color: var(--ink-soft); display: block; margin-top: 6px; }

/* hotline (page 5) */
.hotline {
  background: #1a1410;
  color: #f1d999;
  display: grid;
  grid-template-columns: 200px 1fr 360px;
  gap: 24px;
  align-items: center;
  padding: 26px 36px;
  margin: 26px 0;
  border: 1px solid #2c1f15;
}
.hotline h3 { font-family: var(--font-display); color: #f7c14e; margin: 0 0 4px; font-size: 30px; }
.hotline-conch { color: #f7c14e; }
.bignum { font-family: var(--font-display); font-weight: 700; font-size: 48px; color: #f7c14e; margin: 0; }
.hotline .card-eyebrow { color: #c79f57; }

/* map */
.map { margin: 36px 0 24px; }
.map-canvas {
  background: var(--bg-2);
  border: 1px solid var(--line);
  height: 320px;
  position: relative;
  margin-top: 18px;
  background-image: linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px);
  background-size: 32px 32px;
}
.map-block {
  position: absolute; left: 36%; top: 36%; width: 220px; height: 110px;
  background: rgba(195, 59, 30, 0.15);
  border: 1.5px solid var(--hot);
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-eye); letter-spacing: 0.24em; font-size: 12px; color: var(--hot);
}
.map-pin {
  position: absolute; left: 47.5%; top: 32%;
  width: 32px; height: 32px; border-radius: 50%; background: var(--hot); color: #fff;
  display: flex; align-items: center; justify-content: center; font-family: var(--font-display); font-weight: 700; font-size: 14px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.18);
}
.map-veethi {
  position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%);
  font-family: var(--font-eye); letter-spacing: 0.32em; font-size: 11px; color: var(--ink-soft);
}
.map-park, .map-temple { position: absolute; font-family: var(--font-eye); letter-spacing: 0.16em; font-size: 11px; color: var(--ink-soft); }
.map-park { left: 8%; top: 22%; }
.map-temple { right: 12%; top: 60%; }

/* g4 grid (page-6) */
.g4 { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }

/* CTA */
.cta { margin: 36px 0 0; }
.cta-card { background: var(--bg-card); border: 1px dashed var(--line); padding: 28px 32px; display: flex; align-items: center; justify-content: space-between; gap: 32px; }
.cta-card p { margin: 0; max-width: 720px; }

/* footer */
.site-footer {
  background: var(--footer-bg);
  color: var(--footer-ink);
  padding: 36px 36px 18px;
  margin-top: 56px;
  position: relative;
}
.footer-seal {
  display: flex; justify-content: center; margin-bottom: 24px;
  color: var(--hot-2);
}
.footer-grid {
  max-width: 1320px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}
.footer-grid h4 { font-family: var(--font-eye); letter-spacing: 0.22em; font-size: 12px; color: #f0c279; margin: 0 0 12px; }
.footer-grid p { line-height: 1.6; font-size: 13px; }
.footer-list { list-style: none; padding: 0; margin: 0; }
.footer-list li { padding: 4px 0; }
.footer-list a { color: var(--footer-ink); font-size: 13px; }
.footer-list a:hover { color: var(--hot-2); }
.footer-meta {
  max-width: 1320px;
  margin: 24px auto 0;
  border-top: 1px solid var(--footer-rule);
  padding-top: 14px;
  font-family: var(--font-eye);
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #8a7958;
  text-align: center;
}

/* SVG colour overrides */
.headpiece { color: var(--hot); }
.headpiece path, .headpiece polygon, .headpiece circle, .headpiece ellipse, .headpiece rect {
  fill: var(--hot) !important;
  stroke: none;
}
.footer-om path, .footer-om polygon, .footer-om circle { fill: currentColor !important; }
.conch path { fill: #f7c14e !important; }
.conch { color: #f7c14e; }

/* keep gradients on lotus */
.lotus { display: block; }
'''


def main():
    (OUT / 'styles.css').write_text(CSS)

    pages = {
        'page-1.html': page_1(),
        'page-2.html': page_2(),
        'page-3.html': page_3(),
        'page-4.html': page_4(),
        'page-5.html': page_5(),
        'page-6.html': page_6(),
    }
    for filename, body in pages.items():
        active = filename
        (OUT / filename).write_text(page(active, body))
    print('Built', len(pages), 'pages')


if __name__ == '__main__':
    main()
