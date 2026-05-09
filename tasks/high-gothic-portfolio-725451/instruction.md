# Task: replicate this 6-page website design from screenshots

You are given screenshots of a multi-page website. Your job is to write HTML and CSS files that visually replicate the design as faithfully as possible.

## Inputs

- **`/app/screenshots/page-1.png` ... `page-6.png`** — full-page screenshots, one per page. Each is the entire scrollable rendering of one page at viewport 1440 px wide.
- **`/app/screenshots/page-K-tile-J.png`** — additional 1440×1568 tile crops of pages that were taller than 2000 px. Use these when you need to see fine detail (small typography, narrow ornament) that may be downsampled in the full-page version.
- **`/app/motifs/`** — a flat directory of `.svg` ornament files used in the original design. Some are visible in the screenshots, some are not — you must **look at the screenshots to figure out which ones to use, where, at what size, and in what color**. The filenames are descriptive but not authoritative; trust your eyes over the names.

## Your output

Write files to **`/app/output/`**:

- `page-1.html`, `page-2.html`, ..., `page-6.html` — one HTML file per page, in screenshot order.
- A shared CSS file (you choose the name, e.g., `styles.css`) that all pages link to. Or, if you prefer, inline styles in each page — but the pages must look stylistically coherent.

## Constraints

- **Static HTML + CSS only.** No JavaScript.
- **Viewport: 1440 × 900.** Layout for that width.
- **Cross-page navigation.** The pages link to each other; every page's nav should list all 6 pages by their `page-N.html` filename.
- **Fonts.** The original site loads its typography from Google Fonts via `<link>` to `fonts.googleapis.com`. The fonts the original might have chosen come from this curated list (style-specific):
  ```
  Cinzel Decorative, Cormorant Garamond, Cormorant Unicase, Crimson Pro, EB Garamond, Fraunces, Inter, Pirata One, Source Sans 3, UnifrakturMaguntia
  ```
  Look at the typography in the screenshots and select the **display** and **body** font(s) from this list that visually match (character shapes, contrast, weight, x-height). Load them via `<link>` and apply them via CSS — both as direct `font-family: "Name", ...` declarations and (optionally) as CSS custom properties like `--font-display: "Name"`. Picking fonts not on this list will not match the target.
- **Motifs — REQUIRED: embed as inline `<svg>...</svg>`, not as `<img>` or `background-image`.** Read the contents of each motif file from `/app/motifs/` (e.g., with the `Read` tool) and paste the SVG body directly into your HTML. The reason is color fidelity: when an SVG is loaded via `<img src="...">` or `background-image: url(...)`, the page's CSS *cannot* set its `fill` or `stroke` colors — the SVG renders in whatever colors it shipped with (often black), which won't match the palette in the screenshots. Inline SVGs DO inherit `currentColor` and respond to CSS `fill`/`stroke` rules, letting you recolor each motif to match the design.
- **Sizing inlined SVGs is your responsibility.** Inline `<svg>` elements have **no intrinsic size**. Without an explicit dimension, the browser renders them at the parent container's full width — destroying the layout. After embedding each motif, give it dimensions via CSS or `width`/`height` attributes. Look at the screenshots to gauge what size each ornament should be in its context. Examples:
  - For a thin horizontal divider: `.divider svg { width: 100%; height: 40px; display: block; }`
  - For a small inline accent: `.accent svg { width: 24px; height: 24px; }`
  - For a centered seal: `.seal svg { width: 120px; height: 120px; }`
  Or set attributes directly on the `<svg>` tag itself: `<svg width="120" height="120" ...>`. **Every inline SVG you write should have explicit dimensions.**
- **Recolor inlined SVGs via CSS** so they match the screenshot's palette. Default black SVGs need recoloring — set `fill` and/or `stroke` on the SVG (or use `currentColor` and set the parent's `color`).
- **Do not invent your own geometric ornament** from scratch when an existing motif file fits the design.
- **Do not read from `/verifier/`.** That directory contains the grader's reference data — it's not part of your inputs.

## What you do NOT have

- The original HTML/CSS source.
- A list of which motif belongs in which slot.
- A design-system / palette / font spec.

All of that must be inferred from the visual evidence in the screenshots.

## What "replication" means

Match: layout structure, color palette, typography hierarchy, the placement and styling of motifs (including their *colors* — see the inline-SVG requirement above), and the overall architectural-aesthetic commitment of the site. The grader compares your rendering to the original on multiple visual axes.
