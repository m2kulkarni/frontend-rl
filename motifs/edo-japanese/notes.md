# Edo Japanese — design notes for the generator

These notes are pasted verbatim into the generator prompt. Keep terse, factual, declarative.

## Period & references

Edo period, ~1603–1868. Anchor references:
- **Kyoto machiya townhouses** — wood + paper + tatami palette, restrained façades, layered wooden grilles.
- **Edo-period woodblock prints** — Hokusai (*Thirty-Six Views of Mt. Fuji*), Hiroshige (*Sixty-Nine Stations of the Kisokaidō*). Color palette and compositional sensibility.
- **Nikkō Tōshō-gū** — vermilion + gold lacquer architecture, dense ornament (the high-luxury end).
- **Kimono textile design** — wagara patterns: seigaiha, asanoha, shippō, sayagata, kikkō, kara­kusa.

## What is true of the visual world

- **Asymmetric balance.** Unlike Roman or Persian (axial-symmetric), Edo composition prizes off-center balance — heavy element balanced by negative space rather than mirrored on the other side.
- **Generous negative space (ma).** The blank field is structural, not just absence. Plan for ~30%+ of the layout to be deliberately empty.
- **Wagara patterns as backgrounds.** The five canonical textile patterns (seigaiha, asanoha, shippō, sayagata, kikkō) are *the* backgrounds. Tile them at low contrast (kraft + sumi at 15% opacity, or kraft + indigo at low opacity).
- **Kamon as marks.** Family crests are stamps / seals — used as small, formal accents, not decorative ornament. Place them at section heads, footer signatures, or framed in roundels.
- **Hierarchical line weights.** Brush calligraphy variation: thick-thin contrast in display type, restrained body. SVG ornament likewise has clear line-weight discipline.
- **Vertical text orientation OK in display.** Headlines may run vertically (top-to-bottom, right-to-left columns) — though for a Latin-only website, restrict to one or two short titular elements.
- **Material vocabulary.** Wood texture (in muted brown), paper (kraft cream), bamboo (silhouette green), lacquer (cinnabar/sumi).

## What to avoid

- **Pan-Asian stereotypes** — generic "Asian-themed" red-and-gold dragon-embellished pastiche. Edo is restrained, materially grounded.
- **Anime / manga aesthetic** — the tonal range is a thousand years off. Modern Japanese pop culture is a different visual world.
- **Kanji-as-decoration** — using Japanese characters purely for visual flavor is uncomfortable. If we use kanji, they should mean something on the page.
- **Heian-period vocabulary** — courtly aristocratic ornament, gold-leaf-on-rice-paper folding screens, *yamato-e* painting. That's a different period and a different visual register.
- **Modern stadium / brand torii** — torii silhouettes are sacred-architecture markers, not generic decorative gates.

## Layout proportions

- Hero: an asymmetric composition — title placed off-center, balanced by negative space and a single small kamon mark.
- Body: vertical rhythm dominant. Long narrow text columns. Pull-quotes set with brushy display type.
- Cards: each marked with one kamon at the corner, otherwise plain.
- Section dividers: a thin sumi line, or a low-opacity wagara-pattern band.
- Footer: a kamon-sealed signature block, address in vertical orientation if ambitious; otherwise standard horizontal.

## Typography behavior

- Display: brushy Japanese-serif (Yuji Syuku, Klee One, Shippori Mincho) for major titles. Use the weight contrast (thick down-stroke / thin up-stroke) deliberately.
- Body: Japanese-serif with Latin set (Shippori Mincho, Noto Serif JP) — these handle Latin elegantly while preserving Japanese typographic feel.
- Letter-spacing: tight for display in period-faithful, generous in modern.
- Line-height: very generous (1.7+) — supports the negative-space sensibility.

## Motif use

The motif SVGs in `svg/` cover both wagara textile patterns (tile-able backgrounds) and kamon (formal mark/seal use). Distinct usage rules:

- **Wagara**: tile as backgrounds at low opacity; never use as full-saturation pattern fills (loud).
- **Kamon**: use individually as marks/seals — at most one per section. Never tile or repeat as wallpaper.
- **Torii**: sparingly as a silhouette-headpiece, only when the site's content actually relates to shrines / sacred architecture; otherwise feels appropriative.

## Honest license note

Most kamon SVGs on Wikimedia carry CC-BY-SA on the *rendering* (the 19th-century or earlier *designs* are PD by age). We accept this — strict-PD-only would gut the library. Attribution is documented in `manifest.toml`. The website generator embeds an attribution line in the page footer when kamon SVGs are used.
