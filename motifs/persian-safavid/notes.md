# Persian Safavid — design notes for the generator

These notes are pasted verbatim into the generator prompt. Keep terse, factual, declarative.

## Period & references

Safavid Iran, ~1501–1736. Anchor references:
- **Sheikh Lotfollah Mosque, Isfahan** — turquoise/cobalt tilework, an inner dome with radiating arabesques.
- **Imam Mosque (Shah Mosque), Isfahan** — monumental iwans, deep-blue tile fields with floral-arabesque overlays.
- **Chehel Sotoun palace, Isfahan** — wooden columned veranda, mirror-work ceilings, polychrome figural panels.

## What is true of the visual world

- **Symmetric, axial layouts.** Centerpoint or central vertical axis is dominant.
- **Dense ornament concentrated at borders, corners, and around openings.** Field interiors are often calmer (cream plaster, single-color tile).
- **Pattern fields contrast with empty cream backgrounds.** Heavy-light alternation, not even pattern density.
- **Tile mosaic vocabulary.** Ornament reads as if assembled from cut tile, not painted continuously.
- **Pointed arches.** Either single-curve (two-centered) or ogee (four-centered, S-curve to apex).
- **Geometric tessellation alongside organic floral/arabesque.** The two coexist — geometry on borders/medallions, vines and lotuses in fields.
- **Calligraphic banding.** Long horizontal panels of stylized script frame major elements. (For Latin-text websites: treat as ornamental Latin-script bands, do not invent fake Arabic.)

## What to avoid

- Generic "Middle Eastern" pastiche (random crescents, lamps, sand textures). None of these are Safavid.
- Quranic verses or recognizable religious calligraphy as decoration.
- Figurative imagery suggesting holy figures.
- Saturated rainbow palettes — Safavid is dominated by the cobalt-turquoise-gold-ivory axis; other colors are sparing accents.

## Layout proportions

- Hero/iwan section: roughly 16:9 or taller (vertical iwan archways suggest tall hero bands).
- Body: two-column or single wide column with generous side margins; never edge-to-edge.
- Cards/medallion modules: square-ish, framed by a pointed-arch outline or ornamental border.
- Footer: horizontal band, full-width, often mirroring the hero in palette.
- Ornamental dividers between major sections.

## Typography behavior

- Display type set tight, often centered, often all-caps.
- Body type generously leaded (1.6+ line-height).
- Hierarchy is sharp: clear contrast between display and body sizes (e.g., 4× ratio).

## Motif use

The motif SVGs in `svg/` are the canonical ornament vocabulary. Compose pages by reusing these — do not invent geometric patterns from scratch. Acceptable transformations: scaling, recoloring (via `currentColor`), tiling, mirroring.
