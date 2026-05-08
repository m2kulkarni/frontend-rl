# Roman Imperial — design notes for the generator

These notes are pasted verbatim into the generator prompt. Keep terse, factual, declarative.

## Period & references

Roman Empire, ~30 BCE – 300 CE. Anchor references:
- **Pantheon, Rome** — concrete dome, oculus, monumental portico.
- **Pompeii / Herculaneum frescoes** — the Pompeian-red walls, geometric mosaic floors, trompe-l'œil architectural panels.
- **Trajan's Column** — Roman square capitals, the typographic origin of Cinzel.
- **Imperial Forum baths and basilicas** — coffered vaults, axial planning, monumental columns.

## What is true of the visual world

- **Symmetric, axial, monumental.** Center-line dominant. Hero elements always centered.
- **Capital lettering for prominence.** Roman square capitals; never lowercase for headings in the period-faithful mode.
- **Restrained palette discipline.** Travertine cream is the ground for ~70% of the page; red, gold, and purple appear as small accents, not as dominant fields.
- **Geometric border + figurative center.** Mosaics famously have a meander/Greek-key border surrounding a figural panel. Cards / hero blocks should follow this pattern.
- **Coffered, gridded surfaces.** When ornament fills a field, prefer regular grids of squares or rosettes — not free-form scrollwork.
- **Round arches and pediments.** No pointed arches. The pediment is the canonical headline frame.
- **Wreath-bound roundels.** Important seals / titles are framed by laurel or oak wreaths.

## What to avoid

- Pointed arches (those are Gothic — wrong style).
- Saturated rainbow color palettes — Roman-Imperial discipline is travertine + 2-3 saturated accents, not all-color-everywhere.
- Generic "antiquity" pastiche (random columns, random togas, random togate figures).
- Christian iconography (the period is pre-Christian; even early-Christian motifs are out-of-period).
- Gothic blackletter, illuminated-manuscript ornament — those belong to a later millennium.

## Layout proportions

- Hero: framed by a pediment outline (triangular top, two columns flanking, cornice band). Or by a full coffered-vault frame.
- Body: classical proportions — text columns roughly golden-ratio width to the page; generous margins.
- Cards/modules: rectangular with meander/Greek-key borders, sometimes with a small wreath roundel for the title.
- Footer: horizontal frieze band, sometimes with rosette repeats.
- Section dividers: a single Greek-key strip, or a short laurel-wreath row.

## Typography behavior

- Display: Roman square capitals (Cinzel-style), tracked tight for titles, generous for sub-heads.
- Body: classical serif, generous line-height (1.6+).
- Hierarchy contrast is sharp (4× ratio between display and body).
- All-caps headings are appropriate; mixed-case sub-heads are a modern interpretation.

## Motif use

The motif SVGs in `svg/` are the canonical ornament vocabulary. Compose pages by reusing these. Acceptable transformations: scaling, recoloring (where supported), tiling, mirroring. Most files are scanned line art (ATF / Cleland / Serlio plates) — single-color black-on-transparent and respond well to `fill: currentColor` after a one-time preprocessing pass to swap hardcoded `#000000` for `currentColor`.

## Honest gaps in the v1 library

No clean PD SVG of:
- Pure acanthus-leaf scroll (only embedded inside larger compositions like the Ionic order plate).
- Corinthian capital silhouette.
- Vitruvian-wave / running dog border.
- Triglyph + metope frieze unit.

For these, the generator should compose them from path syntax (the geometry is well-defined) rather than rely on motif files. Mosaic patterns (opus sectile, opus tessellatum) similarly should be generated programmatically since clean PD SVG references don't exist.
