# Bonus 2 — React eval report (5 tasks × 10 attempts)

**Date:** 2026-05-10

**Run:** `jobs/2026-05-10__14-03-59/`

**Agent:** claude-code v2.1.138 with `claude-opus-4-7`

**Environment:** Modal (parallel sandboxes, custom React Dockerfile w/ Node 20 + cached node_modules)

**Total trials:** 50 (50 OK, 0 failed)


Each trial: agent edits `/app/src/pages/Page<N>.tsx` (one component per page); 
verifier runs `npm run build`, dumps each route to vanilla-shape HTML + screenshots, then grades against ground truth.


## Aggregate scores

| Rubric | Mean | Median | Stdev | Min | Max |
|---|---|---|---|---|---|
| Overall (= visual) | 0.754 | 0.742 | 0.070 | 0.636 | 0.837 |
| Visual (SSIM) | 0.754 | 0.742 | 0.070 | 0.636 | 0.837 |
| Palette | 0.875 | 0.861 | 0.105 | 0.696 | 0.989 |
| Structural | 0.660 | 0.661 | 0.065 | 0.461 | 0.774 |
| Typography | 1.000 | 1.000 | 0.000 | 1.000 | 1.000 |
| Consistency | 0.926 | 0.926 | 0.013 | 0.891 | 0.963 |
| Coverage | 1.000 | 1.000 | 0.000 | 1.000 | 1.000 |

## Per-task aggregates (mean of 10 attempts)

| # | Task | n | Overall | Visual | Palette | Struct | Typo | Cons |
|---|---|---|---|---|---|---|---|---|
| 1 | `react-edo-japanese-restaurant-23` | 10 | **0.832** | 0.83 | 0.98 | 0.74 | 1.00 | 0.94 |
| 2 | `react-roman-imperial-portfolio-5` | 10 | **0.825** | 0.82 | 0.99 | 0.66 | 1.00 | 0.92 |
| 3 | `react-persian-safavid-civic-1738` | 10 | **0.739** | 0.74 | 0.74 | 0.63 | 1.00 | 0.92 |
| 4 | `react-high-gothic-museum-458726` | 10 | **0.729** | 0.73 | 0.84 | 0.59 | 1.00 | 0.92 |
| 5 | `react-dravidian-studio-136645` | 10 | **0.645** | 0.65 | 0.82 | 0.69 | 1.00 | 0.93 |

## Comparison to vanilla 10×10 (animated)

| Rubric | React 5×10 | Vanilla animated 10×10 | Δ |
|---|---|---|---|
| Overall | 0.754 | 0.558 | +0.196 |
| Visual | 0.754 | 0.721 | +0.033 |
| Palette | 0.875 | 0.673 | +0.202 |
| Structural | 0.660 | 0.587 | +0.073 |
| Typography | 1.000 | 0.371 | +0.629 |
| Consistency | 0.926 | 0.673 | +0.253 |

**Caveat.** React variant scores higher across every rubric, but this is *eval-design* not *model capability*. The React env supplies more scaffolding than vanilla: pre-built `Nav.tsx`, `Footer.tsx`, design-system CSS already loaded, fonts wired through CSS variables. The agent has strictly less surface area to mess up. Typography is perfect because the agent can't pick the wrong font — `var(--font-display)` always points at whatever the design system declares.

## Per-trial scores + viewer links

Click **view** to jump to that trial's GT-vs-agent comparison in the side-by-side visualizer (open `viewer/index.html` first).

| # | Task | Trial id | Overall | Visual | Palette | Struct | Typo | Cons | View |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `react-dravidian-studio-136645` | `VDAUeRF` | **0.656** | 0.66 | 0.80 | 0.72 | 1.00 | 0.94 | [view](../viewer/index.html#react-dravidian-studio-136645__VDAUeRF) |
| 2 | `react-dravidian-studio-136645` | `mmFVLVT` | **0.654** | 0.65 | 0.82 | 0.69 | 1.00 | 0.93 | [view](../viewer/index.html#react-dravidian-studio-136645__mmFVLVT) |
| 3 | `react-dravidian-studio-136645` | `dvRHojx` | **0.651** | 0.65 | 0.87 | 0.72 | 1.00 | 0.92 | [view](../viewer/index.html#react-dravidian-studio-136645__dvRHojx) |
| 4 | `react-dravidian-studio-136645` | `wkLkWbh` | **0.647** | 0.65 | 0.81 | 0.70 | 1.00 | 0.94 | [view](../viewer/index.html#react-dravidian-studio-136645__wkLkWbh) |
| 5 | `react-dravidian-studio-136645` | `WgyVX5N` | **0.647** | 0.65 | 0.79 | 0.73 | 1.00 | 0.93 | [view](../viewer/index.html#react-dravidian-studio-136645__WgyVX5N) |
| 6 | `react-dravidian-studio-136645` | `RKNU3ki` | **0.644** | 0.64 | 0.83 | 0.65 | 1.00 | 0.94 | [view](../viewer/index.html#react-dravidian-studio-136645__RKNU3ki) |
| 7 | `react-dravidian-studio-136645` | `zBVWc6D` | **0.640** | 0.64 | 0.86 | 0.66 | 1.00 | 0.93 | [view](../viewer/index.html#react-dravidian-studio-136645__zBVWc6D) |
| 8 | `react-dravidian-studio-136645` | `6nfJHgU` | **0.638** | 0.64 | 0.79 | 0.65 | 1.00 | 0.94 | [view](../viewer/index.html#react-dravidian-studio-136645__6nfJHgU) |
| 9 | `react-dravidian-studio-136645` | `PQ6TZzS` | **0.637** | 0.64 | 0.84 | 0.67 | 1.00 | 0.93 | [view](../viewer/index.html#react-dravidian-studio-136645__PQ6TZzS) |
| 10 | `react-dravidian-studio-136645` | `S3UehHb` | **0.636** | 0.64 | 0.82 | 0.67 | 1.00 | 0.93 | [view](../viewer/index.html#react-dravidian-studio-136645__S3UehHb) |
| 11 | `react-edo-japanese-restaurant-23` | `fkeGNN7` | **0.837** | 0.84 | 0.98 | 0.75 | 1.00 | 0.94 | [view](../viewer/index.html#react-edo-japanese-restaurant-23__fkeGNN7) |
| 12 | `react-edo-japanese-restaurant-23` | `yQn8CX8` | **0.836** | 0.84 | 0.98 | 0.72 | 1.00 | 0.94 | [view](../viewer/index.html#react-edo-japanese-restaurant-23__yQn8CX8) |
| 13 | `react-edo-japanese-restaurant-23` | `3sem4NR` | **0.835** | 0.83 | 0.99 | 0.77 | 1.00 | 0.93 | [view](../viewer/index.html#react-edo-japanese-restaurant-23__3sem4NR) |
| 14 | `react-edo-japanese-restaurant-23` | `GhrcrJM` | **0.834** | 0.83 | 0.98 | 0.71 | 1.00 | 0.94 | [view](../viewer/index.html#react-edo-japanese-restaurant-23__GhrcrJM) |
| 15 | `react-edo-japanese-restaurant-23` | `fnxGPQM` | **0.833** | 0.83 | 0.98 | 0.73 | 1.00 | 0.94 | [view](../viewer/index.html#react-edo-japanese-restaurant-23__fnxGPQM) |
| 16 | `react-edo-japanese-restaurant-23` | `Ua5xonT` | **0.831** | 0.83 | 0.98 | 0.75 | 1.00 | 0.94 | [view](../viewer/index.html#react-edo-japanese-restaurant-23__Ua5xonT) |
| 17 | `react-edo-japanese-restaurant-23` | `HECfJ4c` | **0.831** | 0.83 | 0.98 | 0.71 | 1.00 | 0.94 | [view](../viewer/index.html#react-edo-japanese-restaurant-23__HECfJ4c) |
| 18 | `react-edo-japanese-restaurant-23` | `RsRiQu7` | **0.830** | 0.83 | 0.98 | 0.76 | 1.00 | 0.93 | [view](../viewer/index.html#react-edo-japanese-restaurant-23__RsRiQu7) |
| 19 | `react-edo-japanese-restaurant-23` | `R63xZ3N` | **0.828** | 0.83 | 0.98 | 0.76 | 1.00 | 0.94 | [view](../viewer/index.html#react-edo-japanese-restaurant-23__R63xZ3N) |
| 20 | `react-edo-japanese-restaurant-23` | `9sYagsL` | **0.826** | 0.83 | 0.98 | 0.70 | 1.00 | 0.94 | [view](../viewer/index.html#react-edo-japanese-restaurant-23__9sYagsL) |
| 21 | `react-high-gothic-museum-458726` | `rnuvPLM` | **0.752** | 0.75 | 0.90 | 0.63 | 1.00 | 0.92 | [view](../viewer/index.html#react-high-gothic-museum-458726__rnuvPLM) |
| 22 | `react-high-gothic-museum-458726` | `qQfMjQL` | **0.747** | 0.75 | 0.92 | 0.55 | 1.00 | 0.92 | [view](../viewer/index.html#react-high-gothic-museum-458726__qQfMjQL) |
| 23 | `react-high-gothic-museum-458726` | `8fi6Pef` | **0.743** | 0.74 | 0.89 | 0.63 | 1.00 | 0.92 | [view](../viewer/index.html#react-high-gothic-museum-458726__8fi6Pef) |
| 24 | `react-high-gothic-museum-458726` | `5yrpZGj` | **0.733** | 0.73 | 0.92 | 0.55 | 1.00 | 0.91 | [view](../viewer/index.html#react-high-gothic-museum-458726__5yrpZGj) |
| 25 | `react-high-gothic-museum-458726` | `Z6JMEkU` | **0.733** | 0.73 | 0.83 | 0.59 | 1.00 | 0.92 | [view](../viewer/index.html#react-high-gothic-museum-458726__Z6JMEkU) |
| 26 | `react-high-gothic-museum-458726` | `PuvAPKs` | **0.730** | 0.73 | 0.81 | 0.59 | 1.00 | 0.93 | [view](../viewer/index.html#react-high-gothic-museum-458726__PuvAPKs) |
| 27 | `react-high-gothic-museum-458726` | `cxwy7Vp` | **0.728** | 0.73 | 0.81 | 0.54 | 1.00 | 0.92 | [view](../viewer/index.html#react-high-gothic-museum-458726__cxwy7Vp) |
| 28 | `react-high-gothic-museum-458726` | `2atFWPq` | **0.716** | 0.72 | 0.79 | 0.57 | 1.00 | 0.92 | [view](../viewer/index.html#react-high-gothic-museum-458726__2atFWPq) |
| 29 | `react-high-gothic-museum-458726` | `sBTX8mn` | **0.713** | 0.71 | 0.79 | 0.58 | 1.00 | 0.91 | [view](../viewer/index.html#react-high-gothic-museum-458726__sBTX8mn) |
| 30 | `react-high-gothic-museum-458726` | `gR2B6PD` | **0.699** | 0.70 | 0.76 | 0.61 | 1.00 | 0.96 | [view](../viewer/index.html#react-high-gothic-museum-458726__gR2B6PD) |
| 31 | `react-persian-safavid-civic-1738` | `qKsBsZL` | **0.758** | 0.76 | 0.70 | 0.65 | 1.00 | 0.93 | [view](../viewer/index.html#react-persian-safavid-civic-1738__qKsBsZL) |
| 32 | `react-persian-safavid-civic-1738` | `mudMuSz` | **0.752** | 0.75 | 0.83 | 0.61 | 1.00 | 0.92 | [view](../viewer/index.html#react-persian-safavid-civic-1738__mudMuSz) |
| 33 | `react-persian-safavid-civic-1738` | `2QH4i2s` | **0.741** | 0.74 | 0.70 | 0.69 | 1.00 | 0.92 | [view](../viewer/index.html#react-persian-safavid-civic-1738__2QH4i2s) |
| 34 | `react-persian-safavid-civic-1738` | `KtVsM5r` | **0.739** | 0.74 | 0.81 | 0.69 | 1.00 | 0.91 | [view](../viewer/index.html#react-persian-safavid-civic-1738__KtVsM5r) |
| 35 | `react-persian-safavid-civic-1738` | `vm9xDdZ` | **0.738** | 0.74 | 0.70 | 0.64 | 1.00 | 0.92 | [view](../viewer/index.html#react-persian-safavid-civic-1738__vm9xDdZ) |
| 36 | `react-persian-safavid-civic-1738` | `gMbw35U` | **0.735** | 0.74 | 0.71 | 0.63 | 1.00 | 0.93 | [view](../viewer/index.html#react-persian-safavid-civic-1738__gMbw35U) |
| 37 | `react-persian-safavid-civic-1738` | `66SSxqZ` | **0.734** | 0.73 | 0.82 | 0.63 | 1.00 | 0.91 | [view](../viewer/index.html#react-persian-safavid-civic-1738__66SSxqZ) |
| 38 | `react-persian-safavid-civic-1738` | `EsAn6rd` | **0.733** | 0.73 | 0.70 | 0.60 | 1.00 | 0.91 | [view](../viewer/index.html#react-persian-safavid-civic-1738__EsAn6rd) |
| 39 | `react-persian-safavid-civic-1738` | `PLZCkaJ` | **0.733** | 0.73 | 0.71 | 0.46 | 1.00 | 0.92 | [view](../viewer/index.html#react-persian-safavid-civic-1738__PLZCkaJ) |
| 40 | `react-persian-safavid-civic-1738` | `TrZUYGP` | **0.725** | 0.73 | 0.70 | 0.72 | 1.00 | 0.92 | [view](../viewer/index.html#react-persian-safavid-civic-1738__TrZUYGP) |
| 41 | `react-roman-imperial-portfolio-5` | `KNzZ7WL` | **0.829** | 0.83 | 0.99 | 0.65 | 1.00 | 0.93 | [view](../viewer/index.html#react-roman-imperial-portfolio-5__KNzZ7WL) |
| 42 | `react-roman-imperial-portfolio-5` | `3brgkzc` | **0.829** | 0.83 | 0.99 | 0.66 | 1.00 | 0.93 | [view](../viewer/index.html#react-roman-imperial-portfolio-5__3brgkzc) |
| 43 | `react-roman-imperial-portfolio-5` | `ofYGCiZ` | **0.828** | 0.83 | 0.99 | 0.68 | 1.00 | 0.93 | [view](../viewer/index.html#react-roman-imperial-portfolio-5__ofYGCiZ) |
| 44 | `react-roman-imperial-portfolio-5` | `EgenC4w` | **0.827** | 0.83 | 0.99 | 0.62 | 1.00 | 0.90 | [view](../viewer/index.html#react-roman-imperial-portfolio-5__EgenC4w) |
| 45 | `react-roman-imperial-portfolio-5` | `c9LyuVf` | **0.826** | 0.83 | 0.99 | 0.67 | 1.00 | 0.92 | [view](../viewer/index.html#react-roman-imperial-portfolio-5__c9LyuVf) |
| 46 | `react-roman-imperial-portfolio-5` | `HRYCFgH` | **0.826** | 0.83 | 0.99 | 0.66 | 1.00 | 0.90 | [view](../viewer/index.html#react-roman-imperial-portfolio-5__HRYCFgH) |
| 47 | `react-roman-imperial-portfolio-5` | `3TpR9BE` | **0.822** | 0.82 | 0.99 | 0.73 | 1.00 | 0.92 | [view](../viewer/index.html#react-roman-imperial-portfolio-5__3TpR9BE) |
| 48 | `react-roman-imperial-portfolio-5` | `9Zv94Po` | **0.821** | 0.82 | 0.99 | 0.67 | 1.00 | 0.92 | [view](../viewer/index.html#react-roman-imperial-portfolio-5__9Zv94Po) |
| 49 | `react-roman-imperial-portfolio-5` | `8xmmJkw` | **0.821** | 0.82 | 0.99 | 0.63 | 1.00 | 0.89 | [view](../viewer/index.html#react-roman-imperial-portfolio-5__8xmmJkw) |
| 50 | `react-roman-imperial-portfolio-5` | `JyRR4Vx` | **0.819** | 0.82 | 0.99 | 0.65 | 1.00 | 0.93 | [view](../viewer/index.html#react-roman-imperial-portfolio-5__JyRR4Vx) |
