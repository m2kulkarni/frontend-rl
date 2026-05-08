# Dravidian — design notes for the generator

These notes are pasted verbatim into the generator prompt. Keep terse, factual, declarative.

## Period & references

Dravidian Hindu temple architecture, anchor on Chola through Vijayanagara/Nayak (~10th–17th c.). Anchor references:
- **Brihadeeswarar Temple, Tanjore** (Chola, ~1010) — granite, monumental vimana, restrained ornament.
- **Meenakshi Amman Temple, Madurai** (Nayak, expanded 1623–55) — peak gopuram exuberance, dense polychrome figural sculpture.
- **Ranganathaswamy Temple, Srirangam** — the largest functioning temple complex; concentric prakaras (enclosures), 21 gopurams.
- **Hampi (Vijayanagara)** — pillared mandapas, Yali capitals, royal-residence ornament.

## What is true of the visual world

- **Tiered, pyramidal silhouettes.** The gopuram is the iconic form — stepped tiers, each with figural sculpture, narrowing to a barrel-vaulted finial.
- **Density over restraint.** Surfaces are *covered* in figural and floral ornament. Empty fields are rare.
- **Polychrome over monochrome.** Vijayanagara/Nayak temples were painted in saturated vermilion, saffron, peacock blue/green, with gold accents over a sandstone or whitewashed base. Modern restorations (e.g., Meenakshi) preserve this.
- **Lotus everywhere.** The padma motif appears in capitals, ceiling rosettes, finials, base bands.
- **Pillared mandapas.** Great pillared halls with figurative capitals. Yali figures (lion-elephant guardians) at column bases.
- **Mandala-based plans.** Temple layouts are often based on radial / concentric mandala geometry.
- **Sacred geometry of the kalasha.** The pot-finial appears at every roof apex.

## What to avoid

- **Pan-Indian generic "exotic" pastiche.** This is specifically Dravidian Hindu temple — distinct from Mughal (Indo-Islamic), Rajput, Bengali, Mysore, Indo-Saracenic.
- **Mughal vocabulary intrusion** — pointed arches, jali screens, onion domes, geometric tessellation. Those belong to a different (Indo-Islamic) tradition.
- **Specific deity images** — depictions of identifiable Hindu deities (Vishnu, Shiva, Ganesha figures). Generic figural ornament is fine; avoid recognizable iconography.
- **Photographic-source SVGs of specific real temples** — those map too closely to a specific place. Use generic temple-architecture vocabulary.

## Layout proportions

- Hero: a tiered/stepped composition mimicking gopuram silhouette — tall, narrowing toward the top, with horizontal band-divisions.
- Body: dense — small modules, ornamental borders, generous use of color blocks.
- Cards/modules: framed by lotus-petal borders, or by carved-pillar pairs.
- Section dividers: a horizontal band of repeated lotus-petal motifs, or a thin vermilion + gold double-line.
- Footer: horizontal pillared-arcade band, with mandala / kolam-style centerpieces.

## Typography behavior

- Display: Yatra One (Indian-poster feel) or Cinzel (stone-carved-inscription feel) for hero titles.
- Body: Eczar — designed for Latin/Devanagari pairing with a warmth that suits the palette.
- All-caps for major titles is acceptable; mixed-case feels more contemporary.
- Generous letter-spacing in titles to mimic the inter-character space typical in stone inscription.

## Motif use — and an honest disclosure

The motif library for Dravidian is **the weakest of the five styles in v1.** Wikimedia Commons does not have authentic public-domain Dravidian SVGs in any meaningful quantity. What we have:

- **2 Om/Aum symbols** (genuine Hindu).
- **1 conch shell** (Dewey Ornament, generic but visually reasonable as shankha).
- **1 lotus** (OpenClipart, multicolor — needs stylization).
- **6 European-Renaissance / Art Nouveau ornaments** (Vogeler peacocks, 1902 German Jugendstil; Serlio arabesque, 1551 Italian) — these read as "rich foliated ornament" but are NOT authentically Dravidian. Use sparingly and recolor aggressively to fit the palette.

**Real gaps in the library** (no PD SVG exists on Commons):
- Kolam / rangoli patterns (recommend procedural generation — the geometry is well-defined)
- Yali figures (mythical-beast pillar guardians)
- Kalasha finial (sacred water-pot)
- Torana / temple-gateway silhouettes
- Authentic Dravidian-tradition mandalas (the SVG mandalas on Commons are mostly Tibetan or generic geometric, not Hindu)
- Gopuram silhouette

For these, the generator should compose from path syntax (gopuram is just stepped-rectangle stack with ornament; kalasha is bulb-on-stem) or generate kolam patterns programmatically.

This is the most honest thing we can say: the v1 Dravidian library is *thin*, the report should acknowledge this, and a v2 motif investment would be best directed here (vectorize plates from Hindu-iconography reference books or commission line-art SVGs).
