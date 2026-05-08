# High Gothic — design notes for the generator

These notes are pasted verbatim into the generator prompt. Keep terse, factual, declarative.

## Period & references

High Gothic, ~12th–14th c. France-Northern Europe. Anchor references:
- **Notre-Dame de Paris** — west façade, twin towers, the famous rose window.
- **Chartres Cathedral** — stained glass at peak; the cobalt-blue + madder-red visual language.
- **Reims, Amiens, Beauvais cathedrals** — soaring vertical proportions, ribbed vaults, flying buttresses.
- **The Très Riches Heures du Duc de Berry** (early 15c, illuminated manuscript) — palette and ornament for non-architectural surfaces.

## What is true of the visual world

- **Vertical emphasis.** Tall, soaring proportions. Hero elements taller than wide. Columns / arches reach upward.
- **Pointed arches everywhere.** No round arches. The lancet (steep, narrow) and equilateral (broader) arches are both canonical.
- **Geometric tracery.** Quatrefoils, trefoils, cinquefoils — usually inscribed inside circles, set into the heads of windows. These are *the* go-to ornamental primitives.
- **Jewel tones in lead matrix.** Stained-glass aesthetic — saturated cobalt, madder red, gold-yellow, verdigris green, separated by black outlines that read as lead came.
- **Diaper patterns as backgrounds.** Lozenge-grid backgrounds with small ornamental motifs (fleurs-de-lis, quatrefoils, crosses) repeated. The Wilton Diptych ground.
- **Ornament concentrated at heads, capitals, and corners.** Walls are largely undecorated stone; ornament arrives at structural transitions.
- **Heraldic vocabulary.** Crosses (flory, pattée, bottony, moline), fleurs-de-lis, escutcheons. These read Gothic when used in ornamental rather than functional roles.

## What to avoid

- **Round (Romanesque) arches** — wrong period.
- **Gothic Revival pastiche** (Pugin, Victorian neo-Gothic) — that's a 19th-century *interpretation*, not the original.
- **"Fantasy gothic"** (modern dark-fantasy aesthetic, "gothic typography" as a generic decorative trope).
- **Heraldic crests of specific real noble houses or modern nation-states** — keep it generic.
- **Pastel palettes** — Gothic glass is *saturated*. Pastels read as Easter, not Chartres.

## Layout proportions

- Hero: a tall pointed-arch silhouette frames the central image / title. The two flanking jambs can extend down through the page like cathedral piers.
- Body: tall narrow columns of text (matching the verticality). 16–22em max width for body text columns.
- Cards: each set inside a quatrefoil or trefoil frame, or inscribed in a pointed-arch shape.
- Section dividers: a single horizontal band of repeated crosses/quatrefoils, or a stained-glass-style band of color-blocked lozenges.
- Footer: horizontal arcade of pointed arches in miniature; or a heraldic-inspired band with repeated crosses or fleurs-de-lis.

## Typography behavior

- Display (period-faithful): blackletter (UnifrakturMaguntia) for major titles; reserve for hero only — blackletter body is unreadable.
- Display (modern interpretation): Cinzel Decorative or Cormorant Unicase reads as illuminated-manuscript capitals.
- Body: classical serif (Crimson, EB Garamond, Cormorant). Generous line-height.
- Drop caps are appropriate — illuminated initial letters at the start of sections.

## Motif use

The motif SVGs in `svg/` cover the canonical Gothic primitives (trefoils, quatrefoils, heraldic crosses, fleurs-de-lis). Use them generously — Gothic is *high-density* ornament. Acceptable transformations: tiling (especially quatrefoils-in-square as diaper-pattern background), scaling, recoloring.

The Notre-Dame rose window SVG is multicolor and ~307KB — use as a single hero centerpiece, not a tile.

## Honest gaps in the v1 library

No clean PD SVG of:
- Plate or bar tracery as standalone diagrams.
- Diaper-pattern fields (we generate these by tiling the quatrefoil-in-square primitive).
- Crocket / pinnacle silhouettes.
- Pure stained-glass quarry shapes.

For diaper patterns specifically: tile `quatrefoil-in-square.svg` as a CSS `background-image` with ~80px repeat. For tracery, the generator can compose from existing primitives (a pointed arch + 3 quatrefoils + 2 trefoils approximates plate tracery in a Gothic window head).
