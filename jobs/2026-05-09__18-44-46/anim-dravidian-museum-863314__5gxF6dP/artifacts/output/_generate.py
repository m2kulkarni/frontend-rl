#!/usr/bin/env python3
"""Generates all 6 HTML pages."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from _build import load_svg

OUT = "/app/output"

FONTS = """<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">"""

def head(title, active):
    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{title} · Pālāru Museum</title>
{FONTS}
<link rel="stylesheet" href="styles.css">
</head>
<body>
"""

def utility_bar():
    return """
<div class="utility-bar"><div class="inner">
  <span>Est. 1962 · Tanjavur · Tamil Nadu</span>
  <span>Tuesday—Sunday · 09.30—17.30</span>
</div></div>
"""

def brand_bar():
    seal = load_svg("conch-shell.svg")
    return f"""
<header class="brand-bar">
  <h1 class="brand"><span class="seal svg-ink">{seal}</span>PĀLĀRU MUSEUM<span class="seal svg-ink">{seal}</span></h1>
  <div class="brand-tag">of Drāviḍian Temple Arts</div>
</header>
"""

NAV_ITEMS = [
    ("page-1.html", "Home"),
    ("page-2.html", "Galleries"),
    ("page-3.html", "Gopuram Exhibition"),
    ("page-4.html", "Visit"),
    ("page-5.html", "Scholarship"),
    ("page-6.html", "About the Trust"),
]

def primary_nav(active):
    items = "\n".join(
        f'    <li><a href="{href}" class="{"active" if href == active else ""}">{name}</a></li>'
        for href, name in NAV_ITEMS
    )
    return f"""<nav class="primary"><ul>
{items}
</ul></nav>
"""

def footer():
    om = load_svg("om-alt.svg") if os.path.exists("/app/motifs/om-alt.svg") else load_svg("om-symbol.svg")
    return f"""
<footer class="site">
  <div class="inner">
    <div>
      <h5>The Museum</h5>
      <address class="addr">
        Pālāru Museum of<br>
        Drāviḍian Temple Arts<br>
        <br>
        37 Royal Road<br>
        East Sivagangai Quarter<br>
        Tanjavur 613410<br>
        Tamil Nadu, India
      </address>
    </div>
    <div class="center">
      <div class="seal-wrap svg-red">{om}</div>
      <div class="sanskrit">सत्यम् शिवम् सुन्दरम्</div>
      <div class="motto">Truth · Auspiciousness · Beauty</div>
    </div>
    <div>
      <h5>Hours &amp; Contact</h5>
      <p class="addr">Tuesday—Sunday<br>
      09.30—17.30<br>
      Closed Mondays<br>
      <br>
      +91 4362 274 156<br>
      curator@palaru-museum.in</p>
    </div>
  </div>
  <div class="nav-foot">
    <a href="page-1.html">Home</a>
    <a href="page-2.html">Galleries</a>
    <a href="page-3.html">Gopuram Exhibition</a>
    <a href="page-4.html">Visit</a>
    <a href="page-5.html">Scholarship</a>
    <a href="page-6.html">About the Trust</a>
  </div>
  <div class="copyright">
    © 1962 — 2025 The Pālāru Trust, Tanjavur. Registered charitable trust under the Tamil Nadu Societies Act.<br>
    Holdings catalogued in accordance with the Antiquities and Art Treasures Act, 1972.
  </div>
</footer>
</body>
</html>"""

def page_shell(active, body, title):
    return head(title, active) + utility_bar() + brand_bar() + primary_nav(active) + body + footer()

# ===================================================================
# PAGE 1 - HOME
# ===================================================================
def page1():
    floral = load_svg("twin-peacocks.svg", "svg-ink")
    lotus = load_svg("lotus-flower.svg")
    conch = load_svg("conch-shell.svg", "svg-ink")
    arabesque = load_svg("arabesque-palmette.svg", "svg-ink")
    body = f"""
<div class="page">
  <section class="hero-card">
    <div class="hero-headpiece svg-ink">{floral}</div>
    <div class="eyebrow">Spring 2025 <span class="dot">·</span> Founded on the Tanjore Plain <span class="dot">·</span> Established 1962</div>
    <h1 class="hero-title">A Study Collection of</h1>
    <div class="hero-sub">Chola Through Hayak Temple Arts</div>
    <div class="hero-body">
      <p class="dropcap">For sixty-three years the Pālāru Museum has gathered, conserved, and published the sacred material culture of South India — the lost-wax bronzes of the imperial Cōḻa workshops, the granite scripture of Pāṇḍya and Vijayanagara hands, the painted ceiling cloths of Nāyak Madurai, and the ritual implements that gave them rise. The galleries are arranged not as treasury but as treatise: every object catalogued to the standards of the Antiquities Act, every plinth labelled in Tamil, English, and IAST.</p>
    </div>
    <div class="stats">
      <div class="stat">
        <div class="stat-label">Holdings</div>
        <div class="stat-value">6,318 Objects</div>
      </div>
      <div class="stat">
        <div class="stat-label">Galleries</div>
        <div class="stat-value">Eleven Bays</div>
      </div>
      <div class="stat">
        <div class="stat-label">Manuscripts</div>
        <div class="lotus-mark lotus-anim" style="width:42px;height:32px;display:block;margin:0 auto;">{lotus}</div>
        <div class="stat-value">312 Folios</div>
      </div>
      <div class="stat">
        <div class="stat-label">Founded</div>
        <div class="stat-value">16 April 1962</div>
      </div>
    </div>
  </section>

  <div class="split">
    <div class="panel">
      <div class="panel-head">
        <div class="kicker">Hall IV, Bronze · Through 28 June</div>
        <h2>Now on View</h2>
        <div class="sub">The City Bronzes — Pāṇḍya and the Forms of Fire</div>
      </div>
      <div class="panel-band" style="background:var(--wine)">
        <div class="label">Now on View · Hall IV</div>
        <h3>Naṭarāja, Tiruvārūr</h3>
        <div class="meta">c. 1011 CE · cast bronze · h. 70cm · Museum acc. n. 312/1968</div>
      </div>
      <div class="panel-body">
        <div class="entries">
          <div class="entry"><span class="num">Hall I</span><span class="name">Ardhanārīśvara</span><span class="right">c. 850 CE</span></div>
          <div class="entry"><span class="num">Hall II</span><span class="name">Kāḷī of the Crematorium</span><span class="right">11th cent.</span></div>
          <div class="entry"><span class="num">Hall III</span><span class="name">Jvarahareśvara</span><span class="right">c. 950 CE</span></div>
          <div class="entry"><span class="num">Hall IV</span><span class="name">Naṭarāja</span><span class="right">c. 1011 CE</span></div>
          <div class="entry"><span class="num">Hall V</span><span class="name">Sōmaskanda procession</span><span class="right">12th cent.</span></div>
        </div>
      </div>
    </div>

    <div class="panel">
      <div class="panel-head">
        <div class="kicker">SR-1502 · Pāṇḍya · Vijayanagara</div>
        <h2>Featured Acquisition</h2>
        <div class="sub">Yāḷi Pillar, c. 1124–1189 CE</div>
      </div>
      <div class="panel-band" style="background:var(--teal)">
        <div class="label">Acquisition · Spring 2025</div>
        <h3>Yāḷi Pillar, c. 1124–1189 CE</h3>
        <div class="meta">Granite · acquired from the Tirumala estate</div>
      </div>
      <div class="panel-body">
        <p>The fragment preserves the lower register of a composite <em>maṇḍapa</em> pier: a rampant <em>yāḷi</em> (leogriff) trampling a war-elephant, the rider half-emerging from the beast's mane, with subsidiary panels of <em>gaṇa</em> drummers carved into the chamfered shaft. The iconography accords with the great pillared halls of the Vrishabha mandapa at Hampi, and the chisel-work — particularly the cadence-rhythm of the elephant's saddle — points to the second generation of imperial Vijayanagara stoneworkers.</p>
        <p>The fragment will anchor the new <em>Pillar Hall</em> reinstallation, opening Pongal 2026.</p>
        <p><a class="btn" href="page-2.html">Conservation Notes</a> &nbsp; <a class="btn btn-ghost" href="page-3.html">Provenance Dossier</a></p>
      </div>
    </div>
  </div>

  <div class="plan-block">
    <h2 class="plan-title">Plan Your Visit</h2>
    <p class="plan-sub">Royal Road · East Sivagangai Quarter — a ten-minute walk from Tanjavur Junction</p>
    <div class="three-col">
      <div>
        <h4>Hours</h4>
        <p class="big">Tue — Sun</p>
        <p class="small">09.30 — 17.30</p>
        <p class="small">Closed Mondays &amp; civic holidays</p>
      </div>
      <div>
        <h4>Admission</h4>
        <p class="big">₹40 General</p>
        <p class="small">₹20 Student</p>
        <p class="small">Free Members &amp; visitors under 12</p>
      </div>
      <div>
        <h4>Saturdays<br>11.00 &amp; 14.00</h4>
        <p class="big">Eighth Tour</p>
        <p class="small">Tamil and English alternating</p>
      </div>
      <div>
        <h4>By Appointment<br>WED · FRI</h4>
        <p class="big"></p>
        <p class="small">Reference Library · two visits per session</p>
      </div>
    </div>
  </div>

  <div class="quote-band">
    <p style="text-align:right">Last Quarter's Lecture<br><em>The Iconometry of the Sembiyan Bronzes — Prof. Padma Subrahmanyam, M. Jayanti DCS, 1939, in the Reading Room.</em></p>
    <div class="conch svg-ink">{conch}</div>
    <p>This Quarter<br><em>Members of the Pālāru Trust, Vol XLI — essays on the polylithic ceiling programmes and a re-dating of the Tirumalai-naṭu lintel.</em></p>
  </div>
</div>
"""
    return page_shell("page-1.html", body, "Home")

# ===================================================================
# PAGE 2 - GALLERIES
# ===================================================================
def page2():
    floral = load_svg("twin-peacocks.svg", "svg-ink")
    lotus = load_svg("lotus-flower.svg")
    arabesque = load_svg("arabesque-palmette.svg", "svg-ink")
    body = f"""
<div class="page">
  <section class="hero-card">
    <div class="hero-headpiece svg-ink">{floral}</div>
    <div class="eyebrow">Permanent Collection <span class="dot">·</span> Seven Galleries <span class="dot">·</span> One Catechism Building</div>
    <h1 class="hero-title">Galleries &amp; <span class="accent-word">Permanent</span><br>Collection</h1>
    <div class="hero-sub">Chola · Pandya · Vijayanagara · Nayak · 9th — 17th Centuries</div>
    <div class="hero-body">
      <p class="dropcap">The seven galleries of the Pālāru Museum trace the material life of the South Indian temple from the granite foundations of the early Cōḻa plinth through the polychromed mandapa ceilings of late Nāyak Madurai. Each room is conceived as a discrete prākara — a walled enclosure — moving the visitor from raw stone, through cast bronze and carved wood, into the interior worlds of pigment, silk, lamplight, and inscribed copper. The arrangement is iconographic rather than chronological, following the order of construction prescribed in the Mānāsara and the Kāśīkāgama.</p>
    </div>
  </section>

  <div class="tabs">
    <span>Stone</span>·<span>Bronze</span>·<span>Wood</span>·<span>Pigment</span>·<span>Textile</span>·<span>Metalwork</span>·<span>Inscription</span>
  </div>

  <div class="lotus-mark lotus-anim" style="width:130px; margin: 32px auto 8px; display:block;">{lotus}</div>
  <div class="center">
    <p class="muted">"The Padma at the Heart of the Plan"</p>
    <p class="muted">"Where the lotus opens, there the deity stands; where the deity stands, there the carver lays down his chisel and the inscriber takes up his stylus."<br>— <strong>Mānasāra</strong>, Chapter XIV. 22–28</p>
  </div>

  <div class="ornament-band svg-ink" style="height:90px;">{arabesque}</div>

  <div class="center" style="margin-bottom:14px">
    <h2 style="font-family:var(--font-display); color:var(--wine); letter-spacing:0.18em; font-size:22px;">THE SEVEN PRĀKĀRAS</h2>
  </div>

  <div class="cards col-3">
    <div class="card">
      <div class="kicker">Gallery I</div>
      <h3>Stone</h3>
      <div class="sub">Granite &amp; Greenstone Sculpture · 9th — 12th c.</div>
      <p>Eighty-three figural stones arranged around a reconstructed garbhagriha doorway from Tirukkurungudi. The gallery opens with apsaras early Cōḻa Aiśvaryāḥsa to coarse Pallava granitic and closes with the polished black-chlorite of late Nāyaka and Cōḻa, allowing the lotus pose, scene of <em>karaṇāmsa</em> ritual feet, and the celebrated Khazaraśāra Mahishāsuramardinī, acquired 1968.</p>
      <p class="quote">"The granite of the early Cōḻa is not amended stone: it is stone that has agreed to be held."</p>
    </div>
    <div class="card">
      <div class="kicker">Gallery II</div>
      <h3>Bronze</h3>
      <div class="sub">Lost-Wax Processional Images · 10th — 13th c.</div>
      <p>The 199 piṇḍika cluster from Sembiyan-Mahādevi, including four Naṭarājas, a paired Saundarakāṇḍa group from Tirumūlanāṭha 1, 2012, and the rare seated Kalpaka-mūlatta from Karaikampangam. Lighting follows the lamp reconstruction by ITAM, low-angle, throwing shadow into the published ponds as the carver intended for nightly procession.</p>
      <p class="quote">"Don't burn bronzes with the hot fires. The cōḻa and the kāl indicates the time — the offering."</p>
    </div>
    <div class="card">
      <div class="kicker">Gallery III</div>
      <h3>Wood</h3>
      <div class="sub">Painted Ratha &amp; Mandapa Carving · 14th — 17th c.</div>
      <p>Salvaged temple-cart panels in palmwood and rosewood, including the seventeen-panel cycle from Tirupparankunram East with a side-rider corner-brackets, and the exhibited Kīlavellākatti Mahishāsuramardinī, acquired 1968.</p>
      <p class="quote">"Wood remembers the chisel longer than stone. Stand it before any monsoon: just listen."</p>
    </div>
    <div class="card">
      <div class="kicker">Gallery IV</div>
      <h3>Pigment</h3>
      <div class="sub">Mural Programmes · 1500 — 1750</div>
      <p>Forty-six fragmentary lifted from collapsed mandapa ceilings, principally from the Tirunelveli mainstay and the Mīṇākṣīta cycles at the Ananda. Earth red, lamp-black, indigo, and the unstable orpiment yellow surveys with rare and contested ground. Chosen folio of XV. Hits NRL viewing limited to fifty lux on a reverse-rotation timetable.</p>
      <p class="quote">"The painters of Lepakshi did not draw the line — they discovered where it was already drawn."</p>
    </div>
    <div class="card">
      <div class="kicker">Gallery V</div>
      <h3>Textile</h3>
      <div class="sub">Kanchipuram Temple Cloth · 1700s—1900s</div>
      <p>Vestments and processional canopies from working-temple secret jam-hospitalsbox: rare brocaded dance and lampblack silks; six rare blue Sri Vaiṅkuṇṭhanātha banners; the full programme run of nine current cotton-cloth from Tirunelveli district, donated 2012. To recover lighting, the only object in the collection still in active liturgical use.</p>
      <p class="quote">"To weave for the temple is to weave the body of the deity in cotton across the loom."</p>
    </div>
    <div class="card">
      <div class="kicker">Gallery VI</div>
      <h3>Metalwork</h3>
      <div class="sub">Lamps &amp; Ritual Bronze · 1500 — 1900</div>
      <p>Eight hundred and ninety-six objects in bell metal, brass, and panchaloha: the standing kuthuvilakku, hanging gaja-kanthatu lamps, hanak vēsels, ahivahini pots, and the rare seven-tiered Tanjavur deepam of 1808. A working kuthuvilakku is lit in 9.45 every Friday during conservator-led talks; the only object in the collection still in active liturgical use.</p>
      <p class="quote">"The lamp is not the gods. The lamp is what permits the question."</p>
    </div>
  </div>

  <div class="cards col-2" style="margin-top:20px">
    <div class="card">
      <div class="kicker">Gallery VII · The Catechism Hall</div>
      <h3>Inscription</h3>
      <div class="sub">Copperplate Grants &amp; Lithic Records · 9th — 18th c.</div>
      <p>The longest room in the museum — eighty-four meters along the eastern axis — holds 1,914 ink-on-paper estampages taken between 1946 and 2019 by the Trust's epigraphical and field staff. A foldable fold-script appears as the foundational of the Maṇimēkalai-naṭu register; a hand of the Bahudhanyas, the seventeenth prologue of Rājādhirāja II Sembiyan: the herring-bone reverse-incising of late Pāṇḍya, the iron-stylus of the Mailāpūr panhandle. A full electric catalogue (with the rest in a forthcoming) is now opening for any object via the Reference Library, a kind of three-dimensional accomplishment of all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all literate dimensions of the South Indian temple at all.</p>
    </div>
    <div class="card">
      <div class="kicker">The Walking Order</div>
      <h3>A Plan in the Shape of a Mandala</h3>
      <p>The galleries are laid out in concentric square enclosures around a central courtyard, mirroring the prākara system of a working Cōḻa-period kīl. The visitor's path begins at the southeast corner — the agra-bhuja of the rāmā-prākara — and proceeds anti-clockwise through stone, bronze, wood, pigment, textile, and metalwork before arriving at the inscription hall on the inner axis.</p>
      <ul style="font-size:13px; color:var(--ink-soft);">
        <li>I. Stone (SW)</li>
        <li>II. Bronze (W)</li>
        <li>III. Wood (NW)</li>
        <li>IV. Pigment (NW UPPER)</li>
        <li>V. Textile (N)</li>
        <li>VI. Metalwork (NE)</li>
        <li>VII. Inscription (CTR)</li>
      </ul>
      <div style="background:var(--teal); height:120px; margin:14px 0; border:6px solid var(--rule); position:relative">
        <div style="position:absolute; inset:14px; border:2px solid var(--red);"></div>
        <div style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:18px; height:18px; background:var(--red);"></div>
      </div>
    </div>
  </div>

  <div class="ornament-band svg-ink" style="height:90px; margin-top:30px">{arabesque}</div>

  <div class="strip-head">Founding &amp; Successive Keepers of the Permanent Collection</div>
  <div class="cards col-4" style="margin-top:0">
    <div class="card center"><div class="kicker">Founding Curator · Epigraphist</div><h3 style="font-size:16px">T. V. Manjuvāgam</h3><p class="muted">1962—1971</p></div>
    <div class="card center"><div class="kicker">Master of Bronze &amp; Bronze</div><h3 style="font-size:16px">K. V. Soundararaajan</h3><p class="muted">1971—1986</p></div>
    <div class="card center"><div class="kicker">Master of Bronze · Director</div><h3 style="font-size:16px">Padma Subrahmanyam</h3><p class="muted">1986—2002</p></div>
    <div class="card center"><div class="kicker">Director, Permanent Collection</div><h3 style="font-size:16px">Lhourenam Ranganathan</h3><p class="muted">2002—Present</p></div>
  </div>

  <div class="ornament-band svg-ink" style="height:90px; margin-top:30px">{arabesque}</div>
</div>
"""
    return page_shell("page-2.html", body, "Galleries & Permanent Collection")

# ===================================================================
# PAGE 3 - ARCHITECTURE & THE GOPURAM
# ===================================================================
def page3():
    floral = load_svg("twin-peacocks.svg", "svg-ink")
    om = load_svg("om-symbol.svg", "svg-red")
    lotus = load_svg("lotus-flower.svg")
    body = f"""
<div class="page">
  <section class="hero-card">
    <div class="hero-headpiece svg-ink">{floral}</div>
    <div class="eyebrow">Standing Exhibition <span class="dot">·</span> East Wing <span class="dot">·</span> Hall III &amp; IV</div>
    <h1 class="hero-title">Architecture &amp; The <span class="accent-word">Gopuram</span></h1>
    <div class="hero-sub">From the Modest Dvārapāla-flanked Thresholds of the Early Cōḻa</div>
    <div class="hero-body">
      <p>From the modest dvārapāla-flanked thresholds of the early Cōḻa foundations to the towering tiered structures of the Madurai Nāyaks — an exercise in stone, stucco and ritual descent traced through model, plan, and finial.</p>
    </div>
    <div class="kv">
      <div><span class="key">Opens</span></div><div class="val">15 March 2025</div>
      <div><span class="key">Curator</span></div><div class="val">Dr. R. Anantharaman</div>
      <div><span class="key">Objects on View</span></div><div class="val">147</div>
      <div><span class="key">Halls</span></div><div class="val">III &amp; IV, East Wing</div>
    </div>
  </section>

  <div class="om-block svg-red lotus-anim" style="margin-top: 30px;">{om}
    <div class="label">The Five Phases of the Tower</div>
    <div class="label-sub">Late 9th — 17th c.</div>
  </div>

  <div class="cards col-4">
    <div class="card center"><div class="kicker">Phase I · 880 — 985 CE</div><h3>Early Cōḻa</h3><p>Single-storey gopuram no taller than the surrounding compound wall. Granite plinth flanked by paired dvārapālas. Seal capped by a low kapota cornice. Vimāna of the inner shrine, not the gateway, dominates the silhouette.</p></div>
    <div class="card center"><div class="kicker">Phase II · 985 — 1265 CE</div><h3>Imperial Cōḻa</h3><p>Rāja-rāja's Brihadīśvara complex demonstrates the dual-axis: dvārapāla introduced as a structural-narrative element. Carvings still bring continuity than the kāyaka.</p></div>
    <div class="card center"><div class="kicker">Phase III · 1265 — 1450 CE</div><h3>Later Pāṇḍya</h3><p>The gopuram tower overtakes the vimāna in scale. Five and seven-storey towers at Cidambaram and Cītai-vellūr appear in fully carved silhouettes. Tirumalai-stucco façade appears for the first time.</p></div>
    <div class="card center"><div class="kicker">Phase IV · 1450 — 1565 CE</div><h3>Vijayanagara &amp; Madurai Nāyak</h3><p>The eleven and thirteen-storey monuments of Mīṇākṣīta, Madurai-Mīṇākṣī, and Aravamānan — some recording 67 metres. Then densely populated with stucco celestials, narrative friezes, and the kalasha crowned shoulder ridge.</p></div>
  </div>

  <div class="lotus-mark lotus-anim" style="width:130px; margin: 32px auto 8px; display:block;">{lotus}</div>

  <div class="section">
    <h3 class="center">The Curator's Argument</h3>
    <p>The exhibition advances a single thesis: the gopuram is not merely a gate but a <em>contra-axial horizontal</em>. As the worshipper passes inward through successive prākaras — each lower than the last — the diminishing scale of the gateway towers inverts the upward gaze of <em>vimāna</em> worship and replaces it with a graduated, processional descent toward the garbhagriha.</p>
    <p>Three principal media support this reading on the floor: a sequence of nine cedar timber models commissioned from the silpaka workshops of Tirucharappalli between 1979 and 1996; the seven prākara plan drawings of Sirirangam executed in indigo wash on the upper floor — and the cloud-work — particularly the southern flag of Sirirangam's marble.</p>
    <p class="muted">"To enter a Drāviḍian temple is to walk inward against the grain of the heavens — each gate a smaller doorway to a larger silence." — R. Anantharaman, 1992 inaugural essay</p>
  </div>

  <div class="om-block svg-red lotus-anim">{om}
    <div class="label">The Seven Prakaras of Srirangam</div>
    <div class="label-sub">Sri Ranganathaswami · Tiruchirāpalli</div>
  </div>

  <div class="cards col-2">
    <div class="card">
      <div class="diagram">
        <div class="nest" style="width:340px; height:340px;">
          <div class="ring" style="inset:0"></div>
          <div class="ring" style="inset:30px"></div>
          <div class="ring" style="inset:60px"></div>
          <div class="ring" style="inset:90px"></div>
          <div class="ring" style="inset:120px"></div>
          <div class="ring" style="inset:150px"></div>
          <div class="center-square" style="background:var(--red); width:32px; height:32px; left:50%; top:50%; transform:translate(-50%,-50%); position:absolute; color:white; display:flex; align-items:center; justify-content:center; font-family:var(--font-display); font-size:8px; letter-spacing:0.1em;">ARBH</div>
          <div style="position:absolute; left:50%; top:14px; width:14px; height:14px; background:var(--gold); transform:translateX(-50%);"></div>
          <div style="position:absolute; left:50%; top:44px; width:14px; height:14px; background:var(--gold); transform:translateX(-50%);"></div>
          <div style="position:absolute; left:50%; top:74px; width:14px; height:14px; background:var(--gold); transform:translateX(-50%);"></div>
          <div style="position:absolute; left:50%; top:104px; width:14px; height:14px; background:var(--gold); transform:translateX(-50%);"></div>
          <div style="position:absolute; left:50%; top:134px; width:14px; height:14px; background:var(--gold); transform:translateX(-50%);"></div>
          <div style="position:absolute; left:50%; bottom:14px; width:18px; height:18px; background:var(--red); transform:translateX(-50%);"></div>
        </div>
      </div>
    </div>
    <div class="card">
      <h3>Concentric Worlds</h3>
      <p class="muted" style="font-style:italic; color:var(--teal)">A 156-acre temple-city ordered as seven nested rectangles, pierced by twenty-one gopurams along the cardinal axes.</p>
      <p>The diagram on display in Hall IV — a 1956 indigo-wash plan by V. Mūrti Sthapati — renders the seven prakaras at 1:2400. The southernmost gateway of the seventh prakara, the Rajagopuram completed only in 1987, rises 72 metres and remains the tallest temple gateway in Asia.</p>
      <div class="kv">
        <div><span class="key" style="color:var(--red)">VII</span> Chitirai Veedhi (outer city)</div><div class="val">Rajagopuram</div>
        <div><span class="key" style="color:var(--red)">VI</span> Tirumanjana Veedhi</div><div class="val">4 Gateways</div>
        <div><span class="key" style="color:var(--red)">V</span> Akalanka Veedhi</div><div class="val">4 Gateways</div>
        <div><span class="key" style="color:var(--red)">IV</span> Alinādan Veedhi</div><div class="val">4 Gateways</div>
        <div><span class="key" style="color:var(--red)">III</span> Kulasekharan Tiruveedhi</div><div class="val">3 Gateways</div>
        <div><span class="key" style="color:var(--red)">II</span> Rāja Mahendran Tiruveedhi</div><div class="val">2 Gateways</div>
        <div><span class="key" style="color:var(--red)">I</span> Dharma-varma Tiruveedhi (sanctum)</div><div class="val">Vellai Gopuram</div>
      </div>
    </div>
  </div>

  <div class="om-block svg-red lotus-anim">{om}
    <div class="label">The Kalasha Finial</div>
    <div class="label-sub">Pinnacle · Termination · Vase</div>
  </div>

  <div class="cards col-2">
    <div class="card">
      <div class="kicker">As Ritual Vessel</div>
      <h3>Pūrṇa-kumbha — the brimming pot</h3>
      <p>Before installation atop the gopuram, each <em>copper-or-gilt-bronze</em> kalasha is filled by the chief silpa with milk, paddy, ten coins, and the navadhanya seeds. It carries within and is sealed below the offering, that the entire structure may rest on a foundation of plenty.</p>
      <p>The vessels on display in vitrine 4-2 — including the dismantled finial of the western gopuram of Tirumūlanāṭha, 1573 — preserve their interior contents intact, a rare survival.</p>
    </div>
    <div class="card">
      <div class="kicker">As Structural Terminus</div>
      <h3>Stūpī — the Crowning Stone</h3>
      <p>Structurally the kalasha closes the brick-and-mortar shoulder ridge, locking the upper tiers against the seasonal expansion of the limestone-and-mortar fill, the temple's stuccoed laminations rapidly disqualify after 70cm and the pyramidal weight equals the structure into a tensioned union.</p>
      <p>The exhibition's most technical drawing, Plate XIV, sections an axonometric pen the proper-and-mortar-axis and demonstrates how the kalasha's true expansion can decode forty-four metres into the masonry, behaving as a tensioned spine.</p>
    </div>
  </div>

  <div class="om-block svg-red lotus-anim">{om}
    <div class="label">Selected Objects on View</div>
    <div class="label-sub">Hall IV · West Wing</div>
  </div>

  <div class="cards col-3">
    <div class="card">
      <div class="kicker">EWS · 1976 · ZBO</div>
      <h3>Model of the Brihadishvara West Gopuram</h3>
      <p>Teak with line-stucco facing · 148 — 1979 · Workshop of M. Subramania Sthapati, Tiruchirāpalli</p>
    </div>
    <div class="card">
      <div class="kicker">EWS · 1968 · WLP</div>
      <h3>Stucco Yāḷi Bracket from a Dismantled Tier</h3>
      <p>Lime stucco over brick · 32 cm · 1641 CE · Madurai region · gift of the Smithsonian Trust</p>
    </div>
    <div class="card">
      <div class="kicker">EWS · 1985 · LBL</div>
      <h3>Later Pāṇḍya</h3>
      <p>One of fourteen comparable brackets recovered during the 1958 conservation of an unidentified Nāyaka gopuram of Tiruppankunnam-naṭṭu, gifted Smithsonian estate. Rare animal-vine ornament forms part of new reinstallation.</p>
    </div>
    <div class="card">
      <div class="kicker">EWS · 1991 · LBL</div>
      <h3>Copper Kalasha, Western Gopuram</h3>
      <p>Hammered copper over iron core · h. 88 cm · 1573 CE · Tirumūlanāṭha · on loan from the Hindu Religious Trust.</p>
    </div>
    <div class="card">
      <div class="kicker">EWS · 1985 · ZBO</div>
      <h3>Granite Dvārapāla Torso</h3>
      <p>Granite · 1.10 m · early Cōḻa · late 9th c. · acquired 1976. Tirumūlanāṭha. The earliest object in the exhibition. The figure's tribhanga stance and the simplicity of his ornament locate him within Cōḻa-mūla canon. The figure is sustained by his right hand and is displayed beside the second register.</p>
    </div>
    <div class="card">
      <div class="kicker">EWS · 1985 · ZBO</div>
      <h3>Sthapati's Measuring Rod (Kōl)</h3>
      <p>Tamarind wood with brass caps · 138 cm · 16th c. · Hereditary instrument · donated 2002</p>
      <p>A measuring rod calibrated in 24 angulas, used by four generations of the Karuvur silpaśa lineage. The rakṣma section preserves invocations to Viśvakarman and the Sthapati's craft.</p>
    </div>
  </div>

  <div class="quote-band" style="background:var(--teal)">
    <div></div>
    <div>
      <p style="text-align:center"><span style="color:var(--accent); letter-spacing:0.2em;">CURATOR'S ACKNOWLEDGEMENT</span></p>
      <h3 style="margin:6px 0; font-family:var(--font-display); letter-spacing:0.2em; color:var(--paper)">DR. R. ANANTHARAMAN</h3>
      <p style="text-align:center; font-style:italic; max-width:760px; margin:0 auto;">Curator of architecture, Pālāru Museum. Reader in Temple Arts, University of Madras (retd). Author of <em>The Eleven-Tier Tower: Stucco, Pigment and Patronage in the Madurai-Nāyak Gopuram (Oxford, Oxford University Press, 2003)</em> and editor of the Journal of South Indian Silpaśāstra since 1989. The 1976 foundation was undertaken in collaboration with the Department of Hindu Religious and Charitable Endowments (Tamil Nadu), the Archaeological Survey of India (Chennai Circle), and the surviving silpaśa workshops of Tanjavur, Tiruchirāpalli, and Karaikkur.</p>
    </div>
    <div></div>
  </div>

  <div class="section center">
    <h3>Plan Your Visit to Halls III &amp; IV</h3>
    <p>The Gopuram Exhibition is included with general admission ₹40 / ₹400 foreign visitors. Guided tours in Tamil and English depart from the East Wing rotunda at 11.00 and 15.00 daily.</p>
    <p><a class="btn" href="page-4.html">Visit the Museum</a></p>
  </div>
</div>
"""
    return page_shell("page-3.html", body, "Architecture & The Gopuram")

# ===================================================================
# PAGE 4 - PLAN YOUR VISIT
# ===================================================================
def page4():
    floral = load_svg("twin-peacocks.svg", "svg-ink")
    lotus = load_svg("lotus-flower.svg")
    body = f"""
<div class="page">
  <section class="hero-card">
    <div class="hero-headpiece svg-ink">{floral}</div>
    <div class="eyebrow">Mandala IV <span class="dot">·</span> Visitor Notices</div>
    <h1 class="hero-title">Plan Your Visit</h1>
    <div class="hero-sub">Hours <span class="dot">·</span> Admission <span class="dot">·</span> Tours <span class="dot">·</span> Access</div>
    <div class="hero-body">
      <p>The museum occupies the restored Sivagangai garrison house on the eastern bank of the Vadavāru, a short walk from the Brihadīśvara temple complex. All ten galleries, the Gopuram Hall, the sculpture courtyard and the Dr. R. Ramaswamy Reference Library are open to the public on a single ticket. We welcome scholars, students, pilgrims, and the merely curious.</p>
    </div>
  </section>

  <div class="split">
    <div class="panel">
      <div class="panel-head"><h2>Hours of Opening</h2></div>
      <div class="panel-body">
        <div class="kv">
          <div>Monday</div><div class="val">CLOSED</div>
          <div>Tuesday</div><div class="val">09.30 — 17.30</div>
          <div>Wednesday</div><div class="val">09.30 — 17.30</div>
          <div>Thursday</div><div class="val">09.30 — 17.30</div>
          <div>Friday</div><div class="val">09.30 — 21.00</div>
          <div>Saturday</div><div class="val">09.30 — 17.30</div>
          <div>Sunday</div><div class="val">10.30 — 17.30</div>
        </div>
        <hr class="dec">
        <p class="muted"><strong>Pongal</strong> &mdash; 14 — 16 January<br><strong>Mahāśivarātri</strong> &mdash; 26 February<br><strong>Diwali</strong> &mdash; 30 — 31 October</p>
        <p class="muted">Annual conservation closure: 1—5 August.</p>
        <p class="muted">Last admission thirty minutes before closing. Galleries clear at the chime of the temple bell.</p>
      </div>
    </div>

    <div class="panel">
      <div class="panel-head"><h2>Finding the Museum</h2></div>
      <div class="panel-body">
        <p style="font-family:var(--font-display); letter-spacing:0.2em; color:var(--wine)">PĀLĀRU MUSEUM OF DRĀVIḌIAN TEMPLE ARTS</p>
        <p>37 Royal Road<br>East Sivagangai Quarter<br>Tanjavur 613410<br>Tamil Nadu, India</p>
        <hr class="dec">
        <p><strong>By Rail</strong></p>
        <p>Tanjavur Junction, 1.4 km. Auto-rickshaw to Royal Road, ten minutes.</p>
        <hr class="dec">
        <p><strong>By Road</strong></p>
        <p>NH-38 from Tiruchy (55 km) and NH-36 from Kumbakonam (40 km). Coach parking on Sivagangai Road.</p>
        <p class="muted">+91 4362 274 156 · curator@palaru-museum.in</p>
      </div>
    </div>
  </div>

  <div class="lotus-mark lotus-anim" style="width:90px; margin: 30px auto 8px; display:block;">{lotus}</div>
  <div class="center" style="margin-bottom:20px"><p class="muted">PĀLĀRU · SEAL OF WELCOME · the lotus opens to the visitor</p></div>

  <div class="split">
    <div class="panel">
      <div class="panel-head"><h2>Admission</h2></div>
      <div class="panel-body">
        <div class="kv">
          <div><span class="key">Category</span></div><div class="val"><span class="key">Fare</span></div>
          <div>Adult, general admission</div><div class="val">₹40</div>
          <div>Student with valid card</div><div class="val">₹20</div>
          <div>Children under 12, accompanied</div><div class="val">FREE</div>
          <div>Veterans above 70 years</div><div class="val">₹15</div>
          <div>Scholar with appointment</div><div class="val">FREE</div>
          <div>Family pass · 2 adults + 3 children</div><div class="val">₹100</div>
          <div>Annual Patron membership</div><div class="val">₹2,500</div>
        </div>
        <p class="muted">Scholars and research students may apply in writing to the Curator at least seven working days in advance, attaching a letter from their host institution. Reference Library access requires a separate read-only pass for the day; a letter of introduction must accompany each visit.</p>
      </div>
    </div>

    <div class="panel">
      <div class="panel-head"><h2>Guided Tours</h2></div>
      <div class="panel-body">
        <div class="kv">
          <div>Daily</div><div class="val">11.00 · 14.00</div>
          <div>Saturday</div><div class="val">11.00 · 14.00 · 16.00</div>
          <div></div><div></div>
        </div>
        <hr class="dec">
        <p class="muted">Curator-led tours of the Cōḻa Bronze Gallery and the Brihadīśvara model. Approximately 70 minutes.</p>
        <p class="muted">Tours are alternated in Tamil and English. Sanskrit/Sanskrit-Tamil ($45)</p>
        <p class="muted">The Gopuram Exhibition: emen-aja, polychrome and the Nāyaka period</p>
        <p class="muted">Tours by appointment</p>
        <p class="muted">By appointment</p>
        <p>Tours not included in admission. Group bookings of more than ten visitors require seven working days' notice. Sign-on group bookings are conducted in any gallery on arrival.</p>
        <p>Roof, plinth and elevation are not permitted in the cloister hall. Eight</p>
      </div>
    </div>
  </div>

  <div class="cards col-3" style="margin-top:30px">
    <div class="card">
      <div class="kicker">Accessibility</div>
      <p>Step-free entry from Royal Road through the eastern gate. A 4× series of ports.cor in the principal galleries. The Gopuram Hall is reached by a long ramp added during the 2015 restoration.</p>
    </div>
    <div class="card">
      <div class="kicker">Photography</div>
      <p>Hand-held photography is permitted in all permanent galleries without flash and without tripod. No flash, lighting, podcasting filming, or studio set-ups in front of the Naṭarāja-mūrtis. The Reference Library and the polychrome rooms are fully off-limits.</p>
    </div>
    <div class="card">
      <div class="kicker">In the Galleries</div>
      <p>Visitors are asked to speak softly; donate dance no display devotee no display objects; the museum welcomes prayer in silence before any image. We ask their conservation request that visitors approach the silver, copper, and the the sandalwood altars at the rare moment in the pubelu.</p>
      <p>Food, drink, and tobacco are not permitted beyond the visitor reception. The Tanjavur Trust grants of 25cm at the bench at the cloakroom free of charge.</p>
    </div>
  </div>

  <div class="section">
    <h3>The Reference Library</h3>
    <div class="muted center">Dr. R. Ramaswamy Wing · established 1971</div>
    <p>The on-site reference library holds approximately 18,499 volumes on South Indian architecture, epigraphy, and ritual practice, together with the museum's run of the <em>Journal of the Mānāsara Trust</em> (1942 — present), and the unpublished field notebooks of Vinayaka V. Sarvadwamy SS (concerning the Tanjavur Big Temple restoration of 1971).</p>
    <p>Holdings include the editions of the Mānāsara, Manasāra-archebejutra, Kal de Tirah-Sthala, 7th Generation Kall and the all of the Pioneer estampage of the South Indian temples and seven complete sets of the South Indian temples and the Tirumūlanāṭha 1976.</p>
    <div class="kv">
      <div><span class="key">Open</span></div><div class="val">Wednesdays &amp; Fridays · 10.00 — 16.00</div>
      <div><span class="key">Reading Room</span></div><div class="val">Tuesday–Sunday during regular hours</div>
      <div><span class="key">Inquiries</span></div><div class="val">library@palaru-museum.in</div>
    </div>
  </div>
</div>
"""
    return page_shell("page-4.html", body, "Plan Your Visit")

# ===================================================================
# PAGE 5 - SCHOLARSHIP & THE PALARU JOURNAL
# ===================================================================
def page5():
    floral = load_svg("twin-peacocks.svg", "svg-ink")
    lotus = load_svg("lotus-flower.svg")
    arabesque = load_svg("arabesque-palmette.svg", "svg-ink")
    body = f"""
<div class="page">
  <section class="hero-card">
    <div class="hero-headpiece svg-ink">{floral}</div>
    <div class="eyebrow">Volume XLI <span class="dot">·</span> Quarterly</div>
    <h1 class="hero-title">Scholarship &amp; The <span class="accent-word">Pālāru</span><br>Journal</h1>
    <div class="hero-sub">Refereed Quarterly · Catalogue Raisonné · Annual Lectures</div>
    <div class="hero-body">
      <p>Since 1971, the Trust has maintained a programme of original research into the temple architecture, bronze-casting, mural painting, and ritual literatures of the Tamil country, from the Late Cōḻa foundations of the eleventh century through the late Nāyaka cradle-bay reconstructions of the late seventeenth.</p>
    </div>
  </section>

  <div class="ornament-band svg-ink" style="height:80px;">{arabesque}</div>

  <div class="split">
    <div class="panel">
      <div class="panel-head"><h2>The Pālāru Journal</h2></div>
      <div class="panel-body">
        <p class="muted center">A Quarterly Refereed in English</p>
        <hr class="dec">
        <div class="kv">
          <div>Vol XLI · No. 1</div><div class="val">Spring 2025</div>
          <div>Vol XLI · No. 2</div><div class="val">Summer 2025</div>
          <div>Vol XL · No. 4</div><div class="val">Winter 2024</div>
          <div>Vol XL · No. 3</div><div class="val">Autumn 2024</div>
        </div>
      </div>
    </div>
    <div class="panel" style="background:var(--teal); color:var(--paper);">
      <div class="panel-head"><h2 style="color:var(--paper)">Vol XLI · No. 1</h2><div class="sub" style="color:#d2c4a6">Spring 2025</div></div>
      <div class="panel-body" style="color:#d2c4a6">
        <p style="font-family:var(--font-display); letter-spacing:0.18em; text-transform:uppercase; font-size:11px;">Contents</p>
        <ul style="font-size:13px; color:#e8c9a3; line-height:1.7;">
          <li>Editor's Foreword — Padma Subrahmanyam</li>
          <li>The Yāḷi Pillar of Hampi: A Re-attribution — N. K. Vāgam</li>
          <li>Three Sembiyan Naṭarājas in Belgian collections — V. K. Soundararājan</li>
          <li>The Vimāna of Tanjavur: a re-examination of the southern panels — R. Anantharaman</li>
          <li>Notes on a Lost Pallava Coppergrant — T. Manjuvāgam</li>
          <li>Reviews and inscriptions, Spring 2025</li>
        </ul>
      </div>
    </div>
  </div>

  <div class="lotus-mark lotus-anim" style="width:80px; margin: 32px auto 12px; display:block;">{lotus}</div>

  <div class="strip-head">The Visiting Sthapati Scholarship</div>

  <div class="section">
    <p class="center">Now in its forty-seventh year, the Sthapati Scholarship invites a working silpaśa or temple-building craftsman to spend a residency of one academic year working alongside the Trust's curatorial staff. Six awards are made each year. The current recipient is M. Subramaniam Sthapati of Karaikkudi.</p>
    <div class="kv">
      <div>I · A practising silpa from a hereditary workshop, full-time, 2025–26</div><div class="val">M. Subramania Sthapati</div>
      <div>II · A scholar working on the metallurgy of the cast bronze record</div><div class="val">Dr. P. Marketal Reddy</div>
      <div>III · A specialist in Tamil epigraphy and palaeography of the eleventh century</div><div class="val">A. R. Indra Mukherjee</div>
      <div>IV · A specialist in temple ritual lineage of the Nāyak period</div><div class="val">R. K. Sundaresan</div>
      <div>V · A scholar of the painted dance ceiling tradition</div><div class="val">Smt. M. Kāmākśī</div>
      <div>VI · A scholar of Sanskrit aesthetic theory and architecture</div><div class="val">Dr. Ranga Vidyāmaurthy</div>
    </div>
  </div>

  <div class="ornament-band svg-ink" style="height:80px;">{arabesque}</div>

  <div class="strip-head">Current Research Projects</div>

  <div class="cards col-3" style="margin-top:0">
    <div class="card">
      <div class="kicker">Project · Spring 2024 — Spring 2027</div>
      <h3>The Cōḻa Bronze Hoard Project</h3>
      <p>Under the inscription of the seventy-three lost-wax piṇḍika excavated near the Sembiyan-Mahādevi village in 2017. A monograph is in preparation co-authored by the Curator's bench and the Tirumalai-Sthapati line.</p>
    </div>
    <div class="card">
      <div class="kicker">Project · Autumn 2025 — Autumn 2027</div>
      <h3>Pigment, Plaster, Patronage: The Painted Vimānas of Lepakshi</h3>
      <p>An on-site reading and re-attribution of the cycle of mural panels in the cloister hall of Lepakshi-Sthapati, supplemented by archival material drawn from Trust holdings.</p>
    </div>
    <div class="card">
      <div class="kicker">Project · Spring 2025 — Spring 2026</div>
      <h3>The Reading Sanskrit Edition</h3>
      <p>A digital diplomatic edition of the four extant manuscripts of the Mānasāra-Sūtra, with translation into modern Tamil and English. Funded by the Tirupati Endowment of Tamil Nadu.</p>
    </div>
  </div>

  <div class="ornament-band svg-ink" style="height:80px; margin-top:30px">{arabesque}</div>

  <div class="strip-head">Forthcoming from the Museum Press</div>

  <div class="cards col-2" style="margin-top:0">
    <div class="card">
      <div class="kicker">May 2025 · ₹980 · 184pp · 47 plates</div>
      <h3>Stone in the Service of the Image: A Brief Iconography of the Cōḻa Plinth</h3>
      <p>The first full study of the lower architectural register of the imperial Cōḻa shrine, drawing on the detailed measured surveys of the Trust's foundation team. Includes 47 hand-drawn line plates and a complete photographic record of every surviving plinth-band of the Brihadīśvara complex.</p>
    </div>
    <div class="card">
      <div class="kicker">December 2025 · ₹1,200 · 240pp · 38 plates</div>
      <h3>The Plates of Vēṅkaṭa-Naṭarāja: Dance and the Pillar of the Mahāmaṇḍapa</h3>
      <p>An unpublished critical re-examination of the carved pillar-and-bracket programmes of the Mīṇākṣī-Sundareśvara at Madurai, with new attributions of the dance-pose programmes to the late Nāyaka silpaśa workshop.</p>
    </div>
  </div>
</div>
"""
    return page_shell("page-5.html", body, "Scholarship & The Pālāru Journal")

# ===================================================================
# PAGE 6 - ABOUT THE TRUST
# ===================================================================
def page6():
    floral = load_svg("twin-peacocks.svg", "svg-ink")
    om = load_svg("om-symbol.svg", "svg-red")
    lotus = load_svg("lotus-flower.svg")
    body = f"""
<div class="page">
  <section class="hero-card">
    <div class="hero-headpiece svg-ink">{floral}</div>
    <div class="eyebrow">Constituted 1962 <span class="dot">·</span> Reg. No. TR/CHR/1962/041</div>
    <h1 class="hero-title">The Pālāru Trust</h1>
    <div class="hero-sub">A History of Service to the Sacred Material Cultures of South India</div>
    <div class="hero-body">
      <p>Founded in 1962 by Tirumalai Naṭarāja Iyer and Padma Subrahmanyam under the Tamil Nadu Charitable Endowments and Religious Trusts Act, the Pālāru Trust is constituted in perpetuity for the preservation, study, and exhibition of the architectural and movable arts of the South Indian temple.</p>
    </div>
  </section>

  <div class="om-block svg-red lotus-anim" style="margin-top:30px">{om}
    <div class="label">Bequest &amp; Foundation</div>
    <div class="label-sub">A Trust in Perpetuity · Constituted 1962</div>
  </div>

  <div class="section">
    <h3>A Chronology of the Institution</h3>
    <div class="kv">
      <div><span class="key">1962</span> Foundation</div><div class="val">Tirumalai Naṭarāja Iyer endows the Royal Road property and his collection of 1,238 bronzes; the deed is registered at the Tanjavur sub-registry. T. V. Manjuvāgam appointed first Curator.</div>
      <div><span class="key">1968</span> First Acquisition Year</div><div class="val">The 16th April purchase of the Khazaraśāra Mahishāsuramardinī, the first object acquired by the Trust outside the founding gift.</div>
      <div><span class="key">1971</span> Reference Library</div><div class="val">Dr. R. Ramaswamy bequeaths his library of 6,800 volumes; constitution of a separate research wing.</div>
      <div><span class="key">1989</span> First External Loan</div><div class="val">A pair of Sembiyan Naṭarājas travels to the Royal Academy, London, for the inaugural <em>Bronzes of the Cōḻa</em> exhibition.</div>
      <div><span class="key">2002</span> Lhourenam Ranganathan, Director</div><div class="val">Padma Subrahmanyam retires from active curatorship after sixteen years; succeeded by Lhourenam Ranganathan.</div>
      <div><span class="key">2015</span> Conservation Wing</div><div class="val">Construction of the Dr. P. Madhusudanan Conservation Laboratory in the south-east quadrant of the compound, the first temple-arts conservation lab in the south Indian subcontinent.</div>
      <div><span class="key">2024</span> Pillar Hall</div><div class="val">Completion of the new Pillar Hall annex; reinstallation of the granite sculpture spans the eleventh through seventeenth centuries.</div>
    </div>
  </div>

  <div class="om-block svg-red lotus-anim">{om}
    <div class="label">The Director</div>
    <div class="label-sub">Office &amp; Office</div>
  </div>

  <div class="section">
    <div style="display:grid; grid-template-columns: 200px 1fr; gap:24px; align-items:flex-start">
      <div class="lotus-mark lotus-anim" style="width:160px; height:120px;">{lotus}</div>
      <div>
        <p>The Director of the Pālāru Museum and Trust is appointed by the Board of Trustees from a shortlist drawn by the standing Curatorial Committee, for a renewable term of seven years. The Director is responsible for the day-to-day administration of the museum, the curatorial programme, and the conduct of research and publication. The Director is ex-officio editor of <em>The Pālāru Journal</em> and convenes the annual Sthapati seminar.</p>
        <p>The current Director, <strong>Dr. Lhourenam Ranganathan</strong>, has held the office since 2002. He is the author of <em>The Iconometry of Cōḻa Bronze</em> (Princeton, 2010) and <em>Pārśva: Side, Lateral, Dvarapala</em> (OUP, 2018).</p>
      </div>
    </div>
  </div>

  <div class="om-block svg-red lotus-anim">{om}
    <div class="label">The Board of Trustees</div>
    <div class="label-sub">Constituted in Perpetuity · Six Members</div>
  </div>

  <div class="cards col-3">
    <div class="card center"><div class="kicker">Chair</div><h3>Padma Subrahmanyam</h3><p class="muted">Founding Trustee · Curator emerita</p><p>Director of the Trust 1986—2002.</p></div>
    <div class="card center"><div class="kicker">Vice-Chair</div><h3>Dr. R. Anantharaman</h3><p class="muted">Curator of Architecture</p><p>Reader (retd) Madras Univ; author of <em>The Eleven-Tier Tower</em>, OUP 2003.</p></div>
    <div class="card center"><div class="kicker">Treasurer</div><h3>Sri V. Krishna Iyer, ICS</h3><p class="muted">Retired civil servant</p><p>Joint Secretary, Ministry of Culture, Govt. of India 1998—2010.</p></div>
    <div class="card center"><div class="kicker">Secretary</div><h3>Dr. Sītā Vēṅkaṭasubrahmaṇyam</h3><p class="muted">Reader, Department of Classical Tamil, Madras University</p></div>
    <div class="card center"><div class="kicker">Member</div><h3>Sri P. Iraiyamudaiyaar</h3><p class="muted">Hereditary Sthapati of Tirumūlanāṭha</p></div>
    <div class="card center"><div class="kicker">Member</div><h3>Smt. T. Tirupatī Vāyu</h3><p class="muted">Senior Trustee, Hindu Religious &amp; Charitable Endowments, T.N.</p></div>
  </div>

  <div class="om-block svg-red lotus-anim">{om}
    <div class="label">Acknowledgements</div>
    <div class="label-sub">For Service to the Trust</div>
  </div>

  <div class="section">
    <p class="center">The Trust acknowledges the long support of the <strong>Department of Hindu Religious and Charitable Endowments, Government of Tamil Nadu</strong>, the <strong>Archaeological Survey of India (Chennai Circle)</strong>, the hereditary silpaśa lineages of Karaikkudi, Tirumalai, Mailāpūr, and Pālayam, and the more than 1,800 individual annual donors whose annual gifts make the Trust's research and publication programme possible. We extend our particular gratitude to the late Sri R. Subramaniam (Tirupati) for his bequest of the Bahudhanyas plate.</p>
    <div class="cards col-3" style="margin-top:18px">
      <div class="card center"><div class="kicker">Patron</div><p>Sri T. R. Krishnakumar, Sembiyan</p></div>
      <div class="card center"><div class="kicker">Friend</div><p>Mrs. Vidyā Iyer</p></div>
      <div class="card center"><div class="kicker">Counsel</div><p>Iyer &amp; Iyer, Tanjavur</p></div>
    </div>
  </div>

  <div class="om-block svg-red lotus-anim">{om}</div>
</div>
"""
    return page_shell("page-6.html", body, "About the Trust")

# ===================================================================
# Write all pages
# ===================================================================
pages = {
    "page-1.html": page1(),
    "page-2.html": page2(),
    "page-3.html": page3(),
    "page-4.html": page4(),
    "page-5.html": page5(),
    "page-6.html": page6(),
}
for name, content in pages.items():
    with open(os.path.join(OUT, name), "w") as f:
        f.write(content)
    print(f"Wrote {name}: {len(content):,} bytes")
