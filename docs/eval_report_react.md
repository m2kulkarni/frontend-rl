# Bonus 2 — React eval report (5 tasks × 10 attempts)

**Date:** 2026-05-09

**Runs:** `jobs/2026-05-09__21-35-08/` (k=2) + `jobs/2026-05-09__22-04-50/` (k=8)

**Agent:** claude-code v2.1.138 with `claude-opus-4-7`

**Environment:** Modal (parallel sandboxes, custom React Dockerfile w/ Node 20 + cached node_modules)

**Total trials:** 50 (5 unique tasks × 10 attempts each, 0 failures)


Each trial: agent edits `/app/src/pages/Page<N>.tsx` (one component per page); 
verifier runs `npm run build`, dumps each route to vanilla-shape HTML + screenshots, then grades against ground truth.


## Aggregate scores

| Rubric | Mean | Median | Stdev | Min | Max |
|---|---|---|---|---|---|
| Overall (= visual) | 0.773 | 0.744 | 0.090 | 0.625 | 1.000 |
| Visual (SSIM) | 0.773 | 0.744 | 0.090 | 0.625 | 1.000 |
| Palette | 0.895 | 0.914 | 0.097 | 0.702 | 1.000 |
| Structural | 0.684 | 0.659 | 0.107 | 0.532 | 1.000 |
| Typography | 0.999 | 1.000 | 0.007 | 0.958 | 1.000 |
| Consistency | 0.922 | 0.923 | 0.022 | 0.862 | 0.990 |
| Coverage | 1.000 | 1.000 | 0.000 | 1.000 | 1.000 |

## Per-task aggregates (mean of 10 attempts)

| # | Task | Overall | Visual | Palette | Struct | Typo | Cons |
|---|---|---|---|---|---|---|---|
| 1 | `react-edo-japanese-restaurant-23` | **0.847** | 0.85 | 0.98 | 0.76 | 1.00 | 0.94 |
| 2 | `react-roman-imperial-portfolio-5` | **0.826** | 0.83 | 0.99 | 0.64 | 1.00 | 0.91 |
| 3 | `react-persian-safavid-civic-1738` | **0.776** | 0.78 | 0.81 | 0.71 | 1.00 | 0.91 |
| 4 | `react-high-gothic-museum-458726` | **0.732** | 0.73 | 0.86 | 0.58 | 1.00 | 0.93 |
| 5 | `react-dravidian-studio-136645` | **0.682** | 0.68 | 0.83 | 0.73 | 1.00 | 0.93 |

## Comparison to vanilla 10×10 (animated)

| Rubric | React 5×10 | Vanilla animated 10×10 | Δ |
|---|---|---|---|
| Overall | 0.773 | 0.558 | +0.215 |
| Visual | 0.773 | 0.721 | +0.052 |
| Palette | 0.895 | 0.673 | +0.222 |
| Structural | 0.684 | 0.587 | +0.097 |
| Typography | 0.999 | 0.371 | +0.628 |
| Consistency | 0.922 | 0.673 | +0.249 |

**Caveat.** React variant scores higher across every rubric, but this is *eval-design* not *model capability*. The React env supplies substantially more scaffolding than the vanilla env: pre-built `Nav.tsx` and `Footer.tsx` components, design-system CSS already loaded with all tokens, fonts wired through CSS variables. The agent has strictly less surface area to mess up. Typography is near-perfect because the agent literally can't pick the wrong font — `var(--font-display)` always points at whatever the design system declares. To make a fair head-to-head, the React variant would need to give the agent the same level of control as vanilla (let them edit `index.html`, `App.tsx`, `package.json`) — but that defeats the framework-knowledge test.

## Per-trial scores + GitHub URLs

Click any trial's **task ID** to view the rendered React app via githack:

| # | Task | Trial | Overall | Visual | Palette | Struct | Typo | Cons | Build |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `react-dravidian-studio-136645` | `85bKXxD` | **1.000** | 1.00 | 1.00 | 1.00 | 1.00 | 0.95 | 1.0 |
| 2 | `react-dravidian-studio-136645` | `8PBynUp` | **0.664** | 0.66 | 0.82 | 0.70 | 1.00 | 0.93 | 1.0 |
| 3 | `react-dravidian-studio-136645` | `sXCKJpt` | **0.657** | 0.66 | 0.83 | 0.66 | 1.00 | 0.94 | 1.0 |
| 4 | `react-dravidian-studio-136645` | `gQgTF4m` | **0.655** | 0.65 | 0.83 | 0.72 | 1.00 | 0.94 | 1.0 |
| 5 | `react-dravidian-studio-136645` | `FHLh8tp` | **0.653** | 0.65 | 0.80 | 0.68 | 1.00 | 0.92 | 1.0 |
| 6 | `react-dravidian-studio-136645` | `Trgk6ib` | **0.646** | 0.65 | 0.77 | 0.70 | 1.00 | 0.94 | 1.0 |
| 7 | `react-dravidian-studio-136645` | `zoMVDAA` | **0.645** | 0.65 | 0.76 | 0.70 | 1.00 | 0.86 | 1.0 |
| 8 | `react-dravidian-studio-136645` | `qdKVHKc` | **0.642** | 0.64 | 0.80 | 0.71 | 1.00 | 0.94 | 1.0 |
| 9 | `react-dravidian-studio-136645` | `4UpDRE7` | **0.631** | 0.63 | 0.83 | 0.68 | 1.00 | 0.91 | 1.0 |
| 10 | `react-dravidian-studio-136645` | `n96Nw6f` | **0.625** | 0.63 | 0.82 | 0.72 | 1.00 | 0.93 | 1.0 |
| 11 | `react-edo-japanese-restaurant-23` | `iMahFj6` | **1.000** | 1.00 | 1.00 | 1.00 | 1.00 | 0.95 | 1.0 |
| 12 | `react-edo-japanese-restaurant-23` | `L4t6eAG` | **0.838** | 0.84 | 0.98 | 0.75 | 1.00 | 0.94 | 1.0 |
| 13 | `react-edo-japanese-restaurant-23` | `wwUtyTK` | **0.836** | 0.84 | 0.98 | 0.74 | 1.00 | 0.94 | 1.0 |
| 14 | `react-edo-japanese-restaurant-23` | `drKV6qm` | **0.833** | 0.83 | 0.98 | 0.75 | 1.00 | 0.94 | 1.0 |
| 15 | `react-edo-japanese-restaurant-23` | `SDVShRm` | **0.831** | 0.83 | 0.98 | 0.72 | 1.00 | 0.94 | 1.0 |
| 16 | `react-edo-japanese-restaurant-23` | `ibatJ4K` | **0.831** | 0.83 | 0.98 | 0.65 | 1.00 | 0.93 | 1.0 |
| 17 | `react-edo-japanese-restaurant-23` | `J3cDuMN` | **0.829** | 0.83 | 0.98 | 0.75 | 0.98 | 0.93 | 1.0 |
| 18 | `react-edo-japanese-restaurant-23` | `shn5xqx` | **0.828** | 0.83 | 0.98 | 0.72 | 1.00 | 0.93 | 1.0 |
| 19 | `react-edo-japanese-restaurant-23` | `srbheBm` | **0.828** | 0.83 | 0.98 | 0.72 | 1.00 | 0.94 | 1.0 |
| 20 | `react-edo-japanese-restaurant-23` | `nudiAkH` | **0.811** | 0.81 | 0.98 | 0.77 | 1.00 | 0.93 | 1.0 |
| 21 | `react-high-gothic-museum-458726` | `pMCMEU3` | **0.744** | 0.74 | 0.89 | 0.56 | 1.00 | 0.92 | 1.0 |
| 22 | `react-high-gothic-museum-458726` | `XohkXN4` | **0.744** | 0.74 | 0.92 | 0.63 | 1.00 | 0.92 | 1.0 |
| 23 | `react-high-gothic-museum-458726` | `XZz6Mne` | **0.740** | 0.74 | 0.92 | 0.61 | 1.00 | 0.99 | 1.0 |
| 24 | `react-high-gothic-museum-458726` | `BihHdbA` | **0.737** | 0.74 | 0.82 | 0.55 | 1.00 | 0.93 | 1.0 |
| 25 | `react-high-gothic-museum-458726` | `aSCuevo` | **0.735** | 0.74 | 0.91 | 0.63 | 1.00 | 0.92 | 1.0 |
| 26 | `react-high-gothic-museum-458726` | `YmuR3q4` | **0.735** | 0.73 | 0.91 | 0.55 | 1.00 | 0.92 | 1.0 |
| 27 | `react-high-gothic-museum-458726` | `iiDwy8m` | **0.733** | 0.73 | 0.86 | 0.57 | 1.00 | 0.92 | 1.0 |
| 28 | `react-high-gothic-museum-458726` | `Lufsqbh` | **0.731** | 0.73 | 0.80 | 0.59 | 1.00 | 0.91 | 1.0 |
| 29 | `react-high-gothic-museum-458726` | `FLmHrcB` | **0.718** | 0.72 | 0.83 | 0.53 | 1.00 | 0.90 | 1.0 |
| 30 | `react-high-gothic-museum-458726` | `ZtAnyva` | **0.707** | 0.71 | 0.78 | 0.57 | 1.00 | 0.93 | 1.0 |
| 31 | `react-persian-safavid-civic-1738` | `qvNbcgf` | **1.000** | 1.00 | 1.00 | 1.00 | 1.00 | 0.87 | 1.0 |
| 32 | `react-persian-safavid-civic-1738` | `6RBn3v4` | **0.870** | 0.87 | 0.99 | 0.96 | 1.00 | 0.87 | 1.0 |
| 33 | `react-persian-safavid-civic-1738` | `2bNaNjY` | **0.753** | 0.75 | 0.70 | 0.64 | 1.00 | 0.91 | 1.0 |
| 34 | `react-persian-safavid-civic-1738` | `cqjhGcH` | **0.741** | 0.74 | 0.82 | 0.70 | 1.00 | 0.92 | 1.0 |
| 35 | `react-persian-safavid-civic-1738` | `xpPtqM3` | **0.738** | 0.74 | 0.79 | 0.62 | 1.00 | 0.92 | 1.0 |
| 36 | `react-persian-safavid-civic-1738` | `hMKDyT3` | **0.738** | 0.74 | 0.70 | 0.69 | 1.00 | 0.92 | 1.0 |
| 37 | `react-persian-safavid-civic-1738` | `GRYpVKi` | **0.736** | 0.74 | 0.80 | 0.63 | 1.00 | 0.91 | 1.0 |
| 38 | `react-persian-safavid-civic-1738` | `cqUxTmW` | **0.735** | 0.74 | 0.78 | 0.64 | 1.00 | 0.93 | 1.0 |
| 39 | `react-persian-safavid-civic-1738` | `xCSAt7x` | **0.735** | 0.73 | 0.81 | 0.65 | 1.00 | 0.92 | 1.0 |
| 40 | `react-persian-safavid-civic-1738` | `5VM9frL` | **0.718** | 0.72 | 0.70 | 0.63 | 1.00 | 0.92 | 1.0 |
| 41 | `react-roman-imperial-portfolio-5` | `kGzoXxM` | **0.831** | 0.83 | 0.99 | 0.63 | 1.00 | 0.88 | 1.0 |
| 42 | `react-roman-imperial-portfolio-5` | `jMZJuvB` | **0.831** | 0.83 | 0.98 | 0.71 | 1.00 | 0.89 | 1.0 |
| 43 | `react-roman-imperial-portfolio-5` | `uNKpcwj` | **0.830** | 0.83 | 0.99 | 0.64 | 1.00 | 0.93 | 1.0 |
| 44 | `react-roman-imperial-portfolio-5` | `YEFRmCG` | **0.827** | 0.83 | 0.99 | 0.66 | 0.96 | 0.92 | 1.0 |
| 45 | `react-roman-imperial-portfolio-5` | `xpUhvjV` | **0.826** | 0.83 | 0.99 | 0.65 | 1.00 | 0.92 | 1.0 |
| 46 | `react-roman-imperial-portfolio-5` | `mvGN2Dn` | **0.825** | 0.82 | 0.99 | 0.60 | 1.00 | 0.90 | 1.0 |
| 47 | `react-roman-imperial-portfolio-5` | `8wjXdM9` | **0.824** | 0.82 | 0.99 | 0.64 | 1.00 | 0.92 | 1.0 |
| 48 | `react-roman-imperial-portfolio-5` | `MmBuYTY` | **0.823** | 0.82 | 0.99 | 0.65 | 1.00 | 0.90 | 1.0 |
| 49 | `react-roman-imperial-portfolio-5` | `Rp2EkV2` | **0.823** | 0.82 | 0.99 | 0.64 | 1.00 | 0.92 | 1.0 |
| 50 | `react-roman-imperial-portfolio-5` | `3wHmSPT` | **0.818** | 0.82 | 0.99 | 0.63 | 1.00 | 0.93 | 1.0 |
