#!/usr/bin/env python3
"""Builds the 6 HTML pages with the rose-window SVG inlined."""
import os
import re
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

from _partials import (
    page, FLEUR_DE_LIS_INLINE, CROSS_PATTEE_INLINE, VINE_LEAF_INLINE,
    CROSS_FLORY_INLINE, ARCH_INLINE,
)

# Read the rose-window SVG and prepare it for inlining
with open('/app/motifs/rose-window-notre-dame.svg', 'r') as f:
    rose_raw = f.read()

# Strip XML declaration so inlining is clean
rose_inline = re.sub(r'<\?xml[^>]*\?>\s*', '', rose_raw)
# Remove width/height attributes if any, force preserveAspectRatio
rose_inline = re.sub(r'\bwidth="[^"]*"', '', rose_inline, count=1)
rose_inline = re.sub(r'\bheight="[^"]*"', '', rose_inline, count=1)


def rose(klass=""):
    cls = f' class="rose-window-wrap {klass}"'
    return f'<div{cls}>{rose_inline}</div>'


def arch_bg():
    return f'<div class="arch-bg">{ARCH_INLINE}</div>'


# ============================================================
# PAGE 1 — HOME
# ============================================================

page1_body = f"""
<section class="hero-grid">
  <div class="hero-side">
    <div class="small-eyebrow">✦ LE LIEU ✦</div>
    <h3>TWELVE TABLES<br>BENEATH VAULTED<br>STONE</h3>
    <p>A narrow refectory off the Rue des Lombards, candlelit from dusk, with an open hearth at the gable end and a single long oak board where the regulars are seated.</p>
  </div>
  <div class="hero-center">
    <div class="eyebrow">ANNO DOMINI MCMLXXXII</div>
    <h2 class="display">MAISON DE LA<br><span class="second">VERRIÈRE</span></h2>
    <div class="lede">A candlelit Gothic refectory in the old quarter,<br>serving the cookery of medieval France.</div>
    {rose("medium")}
    <div class="signature">— Maître Henri Beauvilliers, maître d'hôtel —<br><span style="color:var(--text-muted);font-size:11px;letter-spacing:0.2em;">FOUNDED RUE DES LOMBARDS</span></div>
  </div>
  <div class="hero-side">
    <div class="small-eyebrow">✦ LA CUISINE ✦</div>
    <h3>FROM THE KITCHEN<br>ROLLS OF REIMS</h3>
    <p>Drawn from the Viandier of Taillevent and the orchards of the Île-de-France — verjuice, quinces, saffron, hippocras, and game roasted on the spit before the fire.</p>
  </div>
</section>

<section class="intro-block">
  <div class="dropcap-side">
    <div class="dropcap">M</div>
    <div class="dropcap-caption">— CANDELABRA —</div>
    <div class="dropcap-caption-2">Henri Beauvilliers,<br>maître d'hôtel</div>
  </div>
  <div>
    <h2>YOU ARE MOST WELCOME AT OUR TABLE.</h2>
    <p>Forty-two years our family has kept this house. My father Marcel, a stonemason's son from Reims, took the lease on Rue des Lombards in the autumn of 1982, persuaded that Paris had want of a refectory in the old manner — a room of twelve tables, an open hearth, and a vaulted cellar of Burgundy and Loire. My mother Hélène cooked from the kitchen rolls she had copied by hand at the Bibliothèque de Carnavalet, and the first guests sat down on the eve of Saint-Martin.</p>
    <p>We have changed almost nothing since. The hearth is the same hearth. The boards on which our heads rest are the same boards. The cellar still steps down three flights to the chalk, where the Chambolle and the Vouvray sleep in their bins as they have done these forty winters. The cookery — pottages thickened with bread, fowl glazed with honey and cinnamon, tarts of verjuice and crab-apple — is read aloud each morning from the same hand-bound copies my mother left us.</p>
    <p>We eat forty guests. We open at seven. We do not hurry. If you would dine in the manner of Reims in the fourteenth century, by the light of beeswax and the warmth of an oak fire, the table is yours.</p>
    <div class="quote">— Henri Beauvilliers, son of the house, Paris</div>
  </div>
</section>

<section class="section">
  <div class="section-eyebrow">À LA TABLE DU SOIR</div>
  <h2 class="section-heading">TONIGHT'S REFECTORY</h2>
  <div class="section-sub">A prix fixe in three courses · Vendredi, le 8 novembre</div>

  <div class="dish-grid" style="margin-top: 50px;">
    <div class="dish">
      {arch_bg()}
      <div class="star">✦ I ✦</div>
      <h4>POTAGE DE<br>CHATAIGNES</h4>
      <p>A pottage of chestnuts from the Limousin, onions and verjuice, eggs, and a little venison broth bound with toasted bread and a knife of cultured butter, after the manner of the Reims kitchen rolls of 1392.</p>
      <div class="price">XIV EUROS</div>
    </div>
    <div class="dish">
      {arch_bg()}
      <div class="star">✦ II ✦</div>
      <h4>PERDREAU AUX<br>COINGS</h4>
      <p>Young partridge from the Beauce, roasted on the spit before the open hearth, glazed with honey, cinnamon, and quinces poached in red wine, served upon a trencher of dark bread, in the fashion of Taillevent.</p>
      <div class="price">XLII EUROS</div>
    </div>
    <div class="dish">
      {arch_bg()}
      <div class="star">✦ III ✦</div>
      <h4>TARTE AU VERIUS</h4>
      <p>A tart of verjuice and crab-apple from the orchards of the Île-de-France — a russet and saffron-glazed open custard, dusted with verjuice salt and beeswax, served with a flagon of hippocras at the close.</p>
      <div class="price">XVI EUROS</div>
    </div>
  </div>

  <div class="menu-summary">
    <span class="label">LE MENU COMPLET</span>
    <span class="price">LXVIII €</span>
    <span class="label">PAR PERSONNE</span>
    <span class="conn">·</span>
    <span class="label">PAIRINGS DE LA CAVE</span>
    <span class="price">+ XLVIII €</span>
  </div>
</section>

<div class="crest-rule"><div class="crest">{VINE_LEAF_INLINE}</div></div>

<section class="pillar-row">
  <div class="pillar">
    {arch_bg()}
    <div class="star">✦ I ✦</div>
    <h3>LA CARTE</h3>
    <p>The full bill of fare — pottages, roasts, tarts, and entremets after the medieval houses.</p>
    <a href="page-2.html" class="pill-link">LIRE LA CARTE</a>
  </div>
  <div class="pillar">
    {arch_bg()}
    <div class="star">✦ II ✦</div>
    <h3>LE CELLIER</h3>
    <p>Three flights down to the chalk: Burgundy, Loire, hippocras, and forty winters of bottles.</p>
    <a href="page-3.html" class="pill-link">DESCENDRE</a>
  </div>
  <div class="pillar">
    {arch_bg()}
    <div class="star">✦ III ✦</div>
    <h3>HISTOIRE</h3>
    <p>Forty-two years on the Rue des Lombards, and seven hundred since the Viandier was set down.</p>
    <a href="page-4.html" class="pill-link">LIRE L'HISTOIRE</a>
  </div>
  <div class="pillar">
    {arch_bg()}
    <div class="star">✦ IV ✦</div>
    <h3>RÉSERVATIONS</h3>
    <p>Twelve tables only. Mardi through Samedi, seven o'clock. Henri keeps the book by hand.</p>
    <a href="page-6.html" class="pill-link">RÉSERVER</a>
  </div>
</section>

<hr class="rule-line gold">
"""

# ============================================================
# PAGE 2 — LA CARTE
# ============================================================

page2_body = f"""
<section class="section" style="padding-top: 50px;">
  <div class="section-eyebrow">CARTA COQUINARIA · ANNO DOMINI MMXXIV</div>
  <h2 class="display tight" style="font-size:62px; margin-top:8px;">LA CARTE</h2>
  <p class="italic-lead">Composée chaque saison d'après les rouleaux de cuisine de Reims, le Viandier de Taillevent et les vergers de l'Île-de-France. Trois services — entrées, plats, desserts — selon qu'on lit du dressoir à la taillé d'un dauphin.</p>
  {rose("medium")}
</section>

<section class="section" style="padding-top:0;">
  <h2 class="section-heading" style="font-size:30px;">ENTRÉES</h2>
  <div class="section-sub">— I · LE PREMIER SERVICE —</div>
  <div class="dish-grid">
    <div class="dish">{arch_bg()}<div class="star">✦ I ✦</div><h4>ŒUFS EN<br>COCOTTE AU<br>SAFRAN</h4><p>Œufs du ferme de Houdan cuits avec lait, oignons doux, safran de Boynes, et un beurre fin à l'ail.</p><div class="price">XLII LIVRES</div></div>
    <div class="dish">{arch_bg()}<div class="star">✦ II ✦</div><h4>TERRINE DE<br>LIÈVRE À<br>L'ANCIENNE</h4><p>Terrine de lièvre du Beauce, marinée au cuit-de-vin, foie noir, lard, châtaigneset cornichons, servie sur pain grillé.</p><div class="price">XXIV LIVRES</div></div>
    <div class="dish">{arch_bg()}<div class="star">✦ III ✦</div><h4>SOUPE À<br>L'OIGNON<br>GRATINÉE À LA<br>MIE DE REIMS</h4><p>Oignons des Cévennes longuement compoté, bouillon de bœuf au vin, cumin, croûtes de pain d'épice et tome chimseulière fondue.</p><div class="price">XVI LIVRES</div></div>
  </div>
</section>

<section class="section" style="padding-top:30px;">
  <h2 class="section-heading" style="font-size:30px;">PLATS</h2>
  <div class="section-sub">— II · DESSERTE PRINCIPALE —</div>
  <div class="dish-grid">
    <div class="dish">{arch_bg()}<div class="star">✦ I ✦</div><h4>CANARD RÔTI<br>AUX FIGUES<br>NOIRES</h4><p>Canard de Challans rôti à la broche, figues noires de Solliès confites au vin, sauce au vinaigre d'orange.</p><div class="price">XLII LIVRES</div></div>
    <div class="dish">{arch_bg()}<div class="star">✦ II ✦</div><h4>BROCHET AU<br>BEURRE BLANC</h4><p>Brochet pêché dans la Loire, pochée au court-bouillon, beurre blanc monté à la mie, persil et poivre du moulin.</p><div class="price">XXXVIII LIVRES</div></div>
    <div class="dish">{arch_bg()}<div class="star">✦ III ✦</div><h4>ÉPAULE<br>D'AGNEAU AUX<br>HERBES DU<br>POTAGER</h4><p>Épaule d'agneau de lait des Pyrénées braisée sept heures, herbes du jardin, ail nouveau, jus d'olive.</p><div class="price">XLV LIVRES</div></div>
  </div>

  <div class="dish center-dish" style="margin-top:40px;">
    {arch_bg()}
    <h4>CIVET DE CERF</h4>
    <p>Cerf des forêts de Compiègne mariné trois jours au vin de Chinon, sang lié à l'ancienne, lardons fumés, champignons des bois.</p>
    <div class="price">XLVIII LIVRES</div>
  </div>
</section>

<div class="crest-rule"><div class="crest">{VINE_LEAF_INLINE}</div></div>

<section class="section" style="padding-top:20px;">
  <h2 class="section-heading" style="font-size:30px;">DESSERTS</h2>
  <div class="section-sub">— III · LA TABLE DOUCE —</div>
  <div class="dish-grid">
    <div class="dish">{arch_bg()}<h4>POIRE POCHÉE<br>AU VIN DE<br>CAHORS</h4><p>Poire Williams pochée dans le malbec noir du Lot, cannelle de Ceylan, clou de girofle, glace au lait cru.</p><div class="price">XIV LIVRES</div></div>
    <div class="dish">{arch_bg()}<h4>TARTE FINE AUX<br>POMMES DE<br>CALVILLE</h4><p>Pommes de Calville blanc d'hiver, vergers de Yerres, déposées en rosace sur pâte feuilletée au beurre cru, caramel au verjus.</p><div class="price">XII LIVRES</div></div>
    <div class="dish">{arch_bg()}<h4>BLANC-MANGER<br>AUX AMANDES<br>DE PROVENCE</h4><p>Lait d'amandes de Valensole pris à la gélatine de poisson, eau de fleur d'oranger, pétales de rose cristallisés.</p><div class="price">XII LIVRES</div></div>
  </div>
</section>

<div class="italic-section">
  La maison se réjouit de vous accueillir. Le menu et la cave changent avec les saisons et la chasse — les rouleaux sont copiés à la main, et les heures à l'horloge de Saint-Merri.
</div>
"""

# ============================================================
# PAGE 3 — LE CELLIER
# ============================================================

page3_body = f"""
<section class="section">
  {rose("medium")}
  <div class="section-eyebrow">DE LA CAVE BAS · ANNO DOMINI MMXXIV</div>
  <h2 class="display tight" style="font-size:62px;">LE CELLIER</h2>
  <p class="italic-lead">Three flights down to the chalk-vaulted cellar.</p>
</section>

<div class="stat-row">
  <div class="stat"><div class="num">1100</div><div class="lbl">BOTTLES</div></div>
  <div class="stat"><div class="num">XIII<sup style="font-size:0.4em">e</sup></div><div class="lbl">SIÈCLE · CHALK CAVE</div></div>
  <div class="stat"><div class="num">IV</div><div class="lbl">FLIGHTS DOWN</div></div>
  <div class="stat"><div class="num">1982</div><div class="lbl">FIRST CASKS LAID</div></div>
</div>

<section class="section">
  <h2 class="section-heading" style="font-size:30px;">BOURGOGNE</h2>
  <div class="section-sub">— PINOT NOIR · CHARDONNAY —</div>
  <div class="dish-grid" style="margin-top:30px;">
    <div class="bordered-card">
      <div class="meta">CÔTE DE NUITS · 2018</div>
      <h4>GEVREY-CHAMBERTIN</h4>
      <p>Domaine Trapet — black cherry, woodsmoke, Gothic cellar floor.</p>
      <div class="price-roman">LXVIII €</div>
    </div>
    <div class="bordered-card">
      <div class="meta">CÔTE CHALONNAISE · 2020</div>
      <h4>MEURSAULT<br>LES CHARMES</h4>
      <p>Domaine Roulot Hazelnut — pear and pierre-de-lune.</p>
      <div class="price-roman">LXXII €</div>
    </div>
    <div class="bordered-card">
      <div class="meta">CÔTE DE BEAUNE · 2017</div>
      <h4>CHARLIS<br>VIEILLES</h4>
      <p>Vincent Dauvissat — chalk, lemon peel, oyster shell.</p>
      <div class="price-roman">LIV €</div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <h2 class="section-heading" style="font-size:30px;">LOIRE</h2>
  <div class="section-sub">— VOUVRAY · SANCERRE · CHINON —</div>
  <div class="dish-grid" style="margin-top:30px;">
    <div class="bordered-card">
      <div class="meta">SANCERRE · 2021</div>
      <h4>SANCERRE<br>LES ROMAINS</h4>
      <p>Domaine Vacheron — citrus, gooseberry, river stone.</p>
      <div class="price-roman">XLIV €</div>
    </div>
    <div class="bordered-card">
      <div class="meta">CHINON · 2019</div>
      <h4>CHINON<br>LES GRAVIÈRES</h4>
      <p>Bernard Baudry — slate, blackberry, fresh tobacco leaf.</p>
      <div class="price-roman">XXXVIII €</div>
    </div>
    <div class="bordered-card">
      <div class="meta">VOUVRAY · 2018</div>
      <h4>VOUVRAY<br>LE MONT</h4>
      <p>Huet — quince, beeswax, the steeple at Vernou.</p>
      <div class="price-roman">XLVI €</div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <h2 class="section-heading" style="font-size:30px;">CHAMPAGNE</h2>
  <div class="section-sub">— BLANC DE BLANCS · ROSÉ DE SAIGNÉE —</div>
  <div class="dish-grid" style="grid-template-columns:repeat(2,1fr);max-width:760px;margin:30px auto 0;">
    <div class="bordered-card">
      <div class="meta">CRAMANT · 2014</div>
      <h4>GASTON<br>CHIQUET</h4>
      <p>Blanc de Blancs grand cru — chalk, brioche, sea spray.</p>
      <div class="price-roman">LXXX €</div>
    </div>
    <div class="bordered-card">
      <div class="meta">AŸ · 2016</div>
      <h4>EGLY-OURIET</h4>
      <p>Rosé de saignée — wild strawberry, walnut leaf, smoke.</p>
      <div class="price-roman">XCV €</div>
    </div>
  </div>
</section>

<section class="section" style="padding-top:0;">
  <h2 class="section-heading" style="font-size:26px;">EAUX-DE-VIE &amp; RATAFIAS</h2>
  <div class="section-sub">— A LA FIN DU REPAS —</div>

  <div class="eaux-table">
    <div class="row head"><span class="name" style="font-family:var(--font-heading);font-size:10px;letter-spacing:0.32em;color:var(--gold);">DISTILLAT</span><span></span><span class="name" style="font-family:var(--font-heading);font-size:10px;letter-spacing:0.32em;color:var(--gold);">DISTILLAT</span><span></span></div>
    <div class="row"><span class="name">EAU DE POIRE WILLIAMS</span><span class="price-roman">XII €</span><span class="name">VIEILLE PRUNE</span><span class="price-roman">XIV €</span></div>
    <div class="row"><span class="name">CALVADOS XX ANS</span><span class="price-roman">XVIII €</span><span class="name">ARMAGNAC HORS D'ÂGE</span><span class="price-roman">XXII €</span></div>
    <div class="row"><span class="name">RATAFIA DE CHAMPAGNE</span><span class="price-roman">X €</span><span class="name">EAU DE FRAMBOISE SAUVAGE</span><span class="price-roman">XII €</span></div>
    <div class="row"><span class="name">CHARTREUSE VERTE</span><span class="price-roman">XIV €</span><span class="name">MARC DE BOURGOGNE</span><span class="price-roman">XVI €</span></div>
  </div>

  <div class="italic-section" style="margin-top:50px;">
    Henri sera ravi de vous mener à la cave entre les services. Les bouteilles dorment chacun sur son flanc, comme à l'abbaye, sur les claies de châtaignier qu'a posées mon père en l'an MCMLXXXII.
  </div>
</section>
"""

# ============================================================
# PAGE 4 — HISTOIRE
# ============================================================

page4_body = f"""
<section class="hero-grid">
  <div class="hero-side">
    <div class="small-eyebrow">✦ LE LIEU ✦</div>
    <p>Une maison de la pierre dans les anciennes voûtes de la Verrière à Paris.</p>
  </div>
  <div class="hero-center">
    {rose("medium")}
    <div class="eyebrow">FONDÉ MCMLXXXII</div>
    <h2 class="display tight" style="font-size:54px;">HISTOIRE DE LA<br>MAISON</h2>
    <div class="lede">A chronicle of stones, of kitchens, and of the eighty-four candles lit each night against the dark.</div>
  </div>
  <div class="hero-side">
    <div class="small-eyebrow">✦ LA CUISINE ✦</div>
    <p>Recipes copied by Hélène from the Reims rolls in 1979 — and read aloud each morning since.</p>
  </div>
</section>

<section class="two-col-feature">
  <div class="col">
    {arch_bg()}
    <h3>OF THE STONES</h3>
    <p>The building at 14 Rue des Lombards was raised in 1278 as the customs-house in the chapter-house of Saint-Merri. After the wars when most of the parish quarter to the Bibliothèque to Carnavalet, and what passed before the eyes had only candles for memory.</p>
    <p>After the Augustinian house in 1799 the same passed through the hands of a glass-cutter named Verrière — and from him the building took its name. The Maison thereafter passed in turn to printers, a notary's clerk, and a forty-winter watchmaker, who sold the keys to my father in the autumn of MCMLXXXII.</p>
  </div>
  <div class="col">
    {arch_bg()}
    <h3>OF THE KITCHEN</h3>
    <p>Hélène opened the doors of the Maison de la Verrière on the eve of Saint-Martin, 1982, with a kitchen of three pots, an open hearth, and a worn copy of Carême — among them, a leather-bound Viandier of Taillevent given to her by the Abbé Sicard at Saint-Germain-l'Auxerrois.</p>
    <p>Her cuisine is drawn from far before, from those manuscripts: roast partridge, cherry tarts, hippocras spiced with anise. She believed that the cooking of medieval France must not be brought back as a curiosity — but lived in once again, and that an evening at the Maison should be one's longest at table for a year, and that the company should sit in a single warm light.</p>
  </div>
</section>

<div class="crest-rule"><div class="crest">{VINE_LEAF_INLINE}</div></div>

<section class="dining-room">
  <div>
    <h3>THE DINING ROOM</h3>
    <p>One enters from the round through a low door of oak, sets the chamberlain to the gable end, and the hearth at the gable end. Twelve places are set on a long oak board, with eighty-four candles in cast pewter sconces.</p>
    <p>The cellars run beneath the floor, three flights below the chalk vaults of the chapter-house. The boards are read by the maître d'hôtel before the doors open, by the leaf of one of three or four Hélène kept up.</p>
    <div class="blockquote">"The candles flicker on the boards, and one feels for a moment the weight of seven centuries."<br>— H. Beauvilliers</div>
  </div>
  <div class="table">
    <div class="row"><span class="label">CAPACITY</span><span class="val">12 covered, 16 standing</span></div>
    <div class="row"><span class="label">SEATING</span><span class="val">One refectory board</span></div>
    <div class="row"><span class="label">CANDLES</span><span class="val">Eighty-four cast pewter</span></div>
    <div class="row"><span class="label">HEARTH</span><span class="val">Open oak fire, 1278</span></div>
    <div class="row"><span class="label">FLOOR</span><span class="val">Stone, original</span></div>
    <div class="row"><span class="label">CEILING</span><span class="val">Vaulted, chalk</span></div>
    <div class="row"><span class="label">CLOSED</span><span class="val">August 1–15</span></div>
  </div>
</section>

<div class="crest-rule"><div class="crest">{VINE_LEAF_INLINE}</div></div>

<section class="section" style="padding-bottom:30px;">
  <h2 class="section-heading" style="font-size:32px;">LA MAISONNÉE</h2>
  <div class="section-sub">— SIX HANDS BY THE LAMP —</div>
</section>

<div class="staff-grid">
  <div class="staff"><div class="initials">NC</div><h4>NICOLAS<br>CHAPENTIER</h4><div class="role">SAUCIER</div><p>Master of the open hearth and the pewter spit since the fall of XIV anno MM.</p></div>
  <div class="staff"><div class="initials">JB</div><h4>JEANNE<br>BEAUVILLIERS</h4><div class="role">PÂTISSIÈRE</div><p>Henri's daughter, learned the tarts of verjuice and crab-apple at her grandmother's elbow.</p></div>
  <div class="staff"><div class="initials">LD</div><h4>LUC SAINT-LIÈVRE</h4><div class="role">SOMMELIER</div><p>Eight winters in the cellars below — keeps the keys of the chalk caves and the cellar book.</p></div>
  <div class="staff"><div class="initials">OT</div><h4>OLIVIER TASSIN</h4><div class="role">CHEF DE RANG</div><p>Carries plates by the lamps and seats the regulars in the manner of his father — an old hand.</p></div>
</div>

<div class="sources">
  <h4>OF OUR SOURCES</h4>
  <p>The kitchen library draws from divers authorities: the Roulleaux de Cuisine of Carnavalet (Bibliothèque, MS 248) — 1392, preserved by the Confraternity, the Viandier of Taillevent (Saint-Germain-l'Auxerrois, leaf-press of 1486), the householder's letters of Père Beauvilliers, l'Abbaye Saint-Denis, the orchards of Yerres, and the slow conversations of forty winters at the table on Rue des Lombards.</p>
</div>
"""

# ============================================================
# PAGE 5 — BANQUETS PRIVÉS
# ============================================================

page5_body = f"""
<section class="hero-grid">
  <div class="hero-side">
    <div class="small-eyebrow">✦ LA SALLE ✦</div>
    <p>Le réfectoire bas de la Sainte-Geneviève accueille jusqu'à seize convives à une seule table, sous la voûte de chalk du XIIIe siècle.</p>
  </div>
  <div class="hero-center">
    {rose("medium")}
    <div class="eyebrow">À HUIS CLOS · DE NOTRE TABLE</div>
    <h2 class="display tight" style="font-size:54px;">BANQUETS<br>PRIVÉS</h2>
    <div class="lede">&amp; VŒUX SOLENNELS</div>
  </div>
  <div class="hero-side">
    <div class="small-eyebrow">✦ LE SERVICE ✦</div>
    <p>Le maître d'hôtel mène les festoiements en personne, et la cave répond à toute occasion — noces, baptêmes, vœux.</p>
  </div>
</section>

<hr class="rule-line gold">

<section class="section" style="padding-top:30px;">
  <h2 class="section-heading" style="font-size:30px;">LES DEUX SALLES</h2>
  <div class="section-sub">— UNE SALLE PRIVÉE, UN PETIT CELLIER —</div>

  <div class="dish-grid" style="grid-template-columns:repeat(2,1fr);max-width:880px;margin:30px auto 0;">
    <div class="bordered-card" style="text-align:left;padding:30px 36px;">
      <h4 style="text-align:center;">SALLE SAINTE-GENEVIÈVE</h4>
      <div class="meta" style="text-align:center;">— LA GRANDE SALLE BASSE —</div>
      <p>Sous la voûte de chalk d'origine, seize convives autour d'une seule table de chêne. Un foyer ouvert, vingt-quatre cierges en candélabres d'étain.</p>
      <div style="display:flex;justify-content:space-around;border-top:1px solid var(--rule-soft);padding-top:14px;margin-top:14px;">
        <div><div style="font-family:var(--font-roman);color:var(--gold-bright);font-size:20px;">XVI</div><div style="font-family:var(--font-heading);font-size:9px;letter-spacing:0.3em;color:var(--text-soft);">CONVIVES</div></div>
        <div><div style="font-family:var(--font-roman);color:var(--gold-bright);font-size:20px;">VIII H</div><div style="font-family:var(--font-heading);font-size:9px;letter-spacing:0.3em;color:var(--text-soft);">DE SERVICE</div></div>
      </div>
    </div>
    <div class="bordered-card" style="text-align:left;padding:30px 36px;">
      <h4 style="text-align:center;">LE PETIT CELLIER</h4>
      <div class="meta" style="text-align:center;">— LA TABLE BASSE —</div>
      <p>Trois flights down, dans la cave de chalk, une table ronde de huit convives parmi les claies à bouteilles, lit dégagement de la cire chaude. Un sommelier dédié.</p>
      <div style="display:flex;justify-content:space-around;border-top:1px solid var(--rule-soft);padding-top:14px;margin-top:14px;">
        <div><div style="font-family:var(--font-roman);color:var(--gold-bright);font-size:20px;">VIII</div><div style="font-family:var(--font-heading);font-size:9px;letter-spacing:0.3em;color:var(--text-soft);">CONVIVES</div></div>
        <div><div style="font-family:var(--font-roman);color:var(--gold-bright);font-size:20px;">VI H</div><div style="font-family:var(--font-heading);font-size:9px;letter-spacing:0.3em;color:var(--text-soft);">DE SERVICE</div></div>
      </div>
    </div>
  </div>
</section>

<div class="crest-rule"><div class="crest">{VINE_LEAF_INLINE}</div></div>

<section class="section" style="padding-top:0;">
  <h2 class="section-heading" style="font-size:30px;">LES TROIS MENUS DE BANQUET</h2>
  <div class="section-sub">— SELON LA SAISON ET LA CHASSE —</div>

  <div class="dish-grid" style="margin-top:30px;">
    <div class="menu-table">
      <h4>MENU DE LA SAINT-MICHEL</h4>
      <div class="menu-sub">— III SERVICES —</div>
      <ul>
        <li>Tartelette aux cèpes et noix</li>
        <li>Velouté de châtaigne, lard fumé</li>
        <li>Faisan rôti aux raisins</li>
        <li>Gratin de cardons à la moelle</li>
        <li>Tarte fine aux poires de Bonne</li>
        <li>Hippocras et noix glacées</li>
      </ul>
      <div class="menu-price">CXX €</div>
    </div>
    <div class="menu-table">
      <h4>MENU DES ROIS</h4>
      <div class="menu-sub">— V SERVICES —</div>
      <ul>
        <li>Œufs en cocotte au safran</li>
        <li>Terrine de lièvre à l'ancienne</li>
        <li>Brochet au beurre blanc</li>
        <li>Civet de cerf à la chinonaise</li>
        <li>Plateau des fromages d'abbaye</li>
        <li>Galette des rois aux amandes</li>
        <li>Vin chaud à la cannelle</li>
      </ul>
      <div class="menu-price">CLXII €</div>
    </div>
    <div class="menu-table">
      <h4>MENU DE LA PENTECÔTE</h4>
      <div class="menu-sub">— IV SERVICES —</div>
      <ul>
        <li>Asperges blanches du Vaucluse</li>
        <li>Truite de rivière à l'oseille</li>
        <li>Agneau de lait aux herbes du potager</li>
        <li>Fraises de bois au vin de Vouvray</li>
        <li>Macarons à la fleur d'oranger</li>
      </ul>
      <div class="menu-price">CXLII €</div>
    </div>
  </div>
</section>

<div class="crest-rule"><div class="crest">{VINE_LEAF_INLINE}</div></div>

<section class="bullet-section">
  <div>
    <h2 class="section-heading" style="font-size:28px; text-align:left;">VŒUX &amp; CÉRÉMONIES</h2>

    <h4>DÉJEUNERS DE NOCES</h4>
    <p>L'usage médiéval recommande un repas de mariage de douze à seize couverts, le matin du Saint-Martin, dans la grande salle basse. Le maître d'hôtel mène le service en personne, et la cave réserve une magnum de Champagne.</p>

    <h4>SOUPERS DE BAPTÊME</h4>
    <p>Une table dressée près du foyer, avec hippocras d'amandes et de la rose, gâteau de baptême aux fleurs cristallisées. Pour douze convives au plus, dans la salle Sainte-Geneviève ou le Petit Cellier — et une chambre haute au-dessus.</p>
  </div>

  <div>
    <div class="price-card">
      <h4>L'ORDONNANCE DE LA MAISON</h4>
      <div class="price-row"><span class="lbl">Vin d'honneur</span><span class="num">XII € / TÊTE</span></div>
      <div class="price-row"><span class="lbl">Menu à III services</span><span class="num">CXX €</span></div>
      <div class="price-row"><span class="lbl">Menu à V services</span><span class="num">CLXII €</span></div>
      <div class="price-row"><span class="lbl">Pairings de la cave</span><span class="num">+ XLVIII €</span></div>
      <div class="price-row"><span class="lbl">Soirée privative</span><span class="num">+ CCC €</span></div>
      <div class="price-row"><span class="lbl">Sommelier dédié</span><span class="num">INCLUS</span></div>
      <div class="extra">PRIX PAR CONVIVE · MIN. XII PERSONNES</div>
    </div>
  </div>
</section>
"""

# ============================================================
# PAGE 6 — RÉSERVATIONS
# ============================================================

page6_body = f"""
<section style="padding:60px 80px 30px;text-align:center;">
  <div class="res-banner">
    <div class="ornament-top">{CROSS_PATTEE_INLINE}</div>
    <div class="eyebrow">DE LA TABLE</div>
    <h2 class="display tight" style="font-size:42px;">RÉSERVATIONS<br>&amp; ADRESSE</h2>
    {rose("small")}
    <p class="italic-lead" style="font-size:15px;margin-top:12px;">To take a place at our long table, write or speak with the maître d'hôtel.</p>
  </div>

  <div class="hero-grid" style="padding-top:0;">
    <div class="hero-side"><div class="small-eyebrow">✦ MARDI À SAMEDI ✦</div><p>The refectory unbolts its oak doors at the hour of seven and the candles burn between seven and eleven of the clock.</p></div>
    <div></div>
    <div class="hero-side"><div class="small-eyebrow">✦ AU CŒUR DU MARAIS ✦</div><p>Fourteen, Rue des Lombards, in the fourth arrondissement of Paris — three minutes on foot from Châtelet, four from Hôtel-de-Ville.</p></div>
  </div>
</section>

<section class="section" style="padding-top:20px;">
  <h2 class="section-heading" style="font-size:30px;">BY VOICE, BY HAND, ON FOOT</h2>
</section>

<div class="contact-grid">
  <div class="contact-card">
    {arch_bg()}
    <h4>PAR TÉLÉPHONE</h4>
    <p>Speak with Henri Beauvilliers, our maître d'hôtel, at the immediate moment.</p>
    <div class="info">+33 1 42 78 14 09</div>
    <p style="font-size:13px;margin-top:10px;">We answer from XIIh of the clock until the table is laid; he keeps the cover for two reservations and seven readings every Mardi day until the wedding.</p>
    <div class="foot-note">— MARDI À SAMEDI —</div>
  </div>
  <div class="contact-card">
    {arch_bg()}
    <h4>PAR LETTRE<br>ÉLECTRONIQUE</h4>
    <p>For private banquets, allergies, dietary observations, or parties of six and above, write us at length to —</p>
    <div class="info">RÉSERVATIONS@<br>MAISONVERRIERE.FR</div>
    <p style="font-size:13px;margin-top:14px;">A reply, in Henri's hand, arrives within the day. Confirmations are sealed by return.</p>
    <div class="foot-note">— RÉPONSE PAR LE JOUR —</div>
  </div>
  <div class="contact-card">
    {arch_bg()}
    <h4>À PIED, À L'ADRESSE</h4>
    <p>Closed on Sunday and Mondays in observation of the old rule, and from the first to the fifteenth of August.</p>
    <div class="info">14, RUE DES LOMBARDS</div>
    <div class="info-sub">75004 PARIS</div>
    <p style="font-size:13px;margin-top:14px;">Métro Châtelet (lines 1·4·7·11) or Hôtel-de-Ville (1·11).</p>
    <div class="foot-note">— ARRONDISSEMENT IV —</div>
  </div>
</div>

<div class="hours-panel">
  <div class="grid">
    <div>
      <h4>LES HEURES DU SERVICE</h4>
      <p>The doors are unbarred at half past six in the evening for the late; the great table is set as on noon. The kitchen receives its last order at half past ten, and the candles are extinguished at midnight, no later.</p>
    </div>
    <div>
      <div class="center-emblem">{CROSS_FLORY_INLINE}</div>
      <div style="margin-top:16px;font-family:var(--font-heading);font-size:9px;letter-spacing:0.3em;color:var(--gold);">— L'HORLOGE —</div>
      <div style="font-family:var(--font-roman);color:var(--gold-bright);font-size:30px;letter-spacing:0.04em;margin-top:6px;">XIX</div>
      <div style="font-family:var(--font-heading);font-size:9px;letter-spacing:0.3em;color:var(--text-soft);">Au grand ouvrant</div>
      <div style="font-family:var(--font-roman);color:var(--gold-bright);font-size:30px;letter-spacing:0.04em;margin-top:14px;">XII</div>
      <div style="font-family:var(--font-heading);font-size:9px;letter-spacing:0.3em;color:var(--text-soft);">Au juste minuit</div>
    </div>
    <div>
      <h4>LES HEURES DE FERMETURE</h4>
      <p>Closed on Sundays and Mondays in observation of the old rule, and from the first to the fifteenth of August, when the house and its staff retire to the Île-de-France for the harvest.</p>
    </div>
  </div>
</div>

<div class="italic-section" style="margin-top:50px;">
  Upon the matter of dress: a jacket is preferred at our long table, in keeping with the candlelit hour, but it is not required of any guest — we hold the welcome above the wardrobe. The small wonder our long table receives in but order at half past ten, and the candles are extinguished at midnight or whenever night you find your way to the Rue des Lombards.
</div>
"""

# ============================================================
# Build all pages
# ============================================================

PAGES = [
    ("page-1.html", "Maison",       page1_body),
    ("page-2.html", "La Carte",     page2_body),
    ("page-3.html", "Le Cellier",   page3_body),
    ("page-4.html", "Histoire",     page4_body),
    ("page-5.html", "Banquets",     page5_body),
    ("page-6.html", "Réservations", page6_body),
]

for filename, title, body in PAGES:
    html = page(title, body, active=filename)
    with open(os.path.join(HERE, filename), 'w') as f:
        f.write(html)
    print(f"Wrote {filename}: {len(html)} bytes")

print("Done.")
