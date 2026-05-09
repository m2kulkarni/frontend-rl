# Eval report — 10 animated tasks × 10 attempts (Bonus 1, brief deliverable)

**Date:** 2026-05-09

**Runs:** `jobs/2026-05-09__15-57-29/` (k=2) + `jobs/2026-05-09__18-44-46/` (k=8)

**Agent:** claude-code v2.1.138 with `claude-opus-4-7`

**Environment:** Modal (parallel sandboxes)

**Total successful trials:** 98 (10 unique tasks × 10 attempts each, with 2 agent-side failures excluded)


Each trial: agent reads only the page screenshots + filmstrips, writes 6 HTML files to `/app/output/`. Verifier renders the agent's HTML, computes 7 rubrics + coverage, returns reward.json.


## Aggregate scores

| Rubric | Mean | Median | Stdev | Min | Max |
|---|---|---|---|---|---|
| Overall (=visual) | 0.558 | 0.608 | 0.136 | 0.243 | 0.751 |
| Visual (SSIM) | 0.721 | 0.739 | 0.048 | 0.613 | 0.790 |
| Palette (Lab + 3D histogram) | 0.673 | 0.772 | 0.285 | 0.036 | 0.967 |
| Structural (DOM Jaccard) | 0.587 | 0.592 | 0.063 | 0.433 | 0.776 |
| Typography (font-name Jaccard) | 0.371 | 0.250 | 0.325 | 0.000 | 1.000 |
| Consistency (chrome match × diversity) | 0.676 | 0.583 | 0.241 | 0.000 | 1.000 |
| Animation (frame-SSIM + @keyframes) | 0.618 | 0.626 | 0.108 | 0.371 | 0.848 |
| Coverage | 1.000 | 1.000 | 0.000 | 1.000 | 1.000 |

## Per-task aggregates (mean of 10 attempts)

| # | Task | n | Overall | Visual | Palette | Structural | Typography | Consistency | Animation |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `anim-persian-safavid-portfolio-6` | 10 | **0.662** | 0.72 | 0.76 | 0.60 | 0.40 | 0.88 | 0.64 |
| 2 | `anim-high-gothic-restaurant-7172` | 9 | **0.656** | 0.75 | 0.77 | 0.61 | 0.22 | 0.68 | 0.81 |
| 3 | `anim-persian-safavid-museum-4269` | 10 | **0.632** | 0.74 | 0.71 | 0.53 | 0.49 | 0.61 | 0.63 |
| 4 | `anim-edo-japanese-editorial-7474` | 10 | **0.623** | 0.76 | 0.76 | 0.55 | 0.84 | 0.47 | 0.49 |
| 5 | `anim-persian-safavid-civic-27907` | 10 | **0.615** | 0.68 | 0.66 | 0.66 | 0.31 | 0.74 | 0.64 |
| 6 | `anim-edo-japanese-university-335` | 10 | **0.603** | 0.75 | 0.59 | 0.63 | 0.79 | 0.69 | 0.46 |
| 7 | `anim-dravidian-museum-863314` | 10 | **0.548** | 0.65 | 0.53 | 0.56 | 0.39 | 0.71 | 0.59 |
| 8 | `anim-high-gothic-civic-597158` | 9 | **0.480** | 0.75 | 0.75 | 0.55 | 0.20 | 0.64 | 0.66 |
| 9 | `anim-roman-imperial-portfolio-74` | 10 | **0.384** | 0.77 | 0.59 | 0.58 | 0.04 | 0.82 | 0.56 |
| 10 | `anim-dravidian-civic-489417` | 10 | **0.383** | 0.65 | 0.63 | 0.61 | 0.01 | 0.53 | 0.72 |

## Per-trial scores + viewer links

Click **view** to jump to that trial's GT-vs-agent comparison in the side-by-side visualizer (open `viewer/index.html` first).

| # | Task | Trial id | Run | Overall | Visual | Palette | Struct | Typo | Cons | Anim | View |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `anim-edo-japanese-editorial-7474` | `M32X4oU` | r2 | **0.751** | 0.78 | 0.95 | 0.59 | 1.00 | 1.00 | 0.54 | [view](../viewer/index.html#anim-edo-japanese-editorial-7474__M32X4oU) |
| 2 | `anim-edo-japanese-university-335` | `jTg8BE7` | r2 | **0.739** | 0.77 | 0.96 | 0.66 | 1.00 | 0.83 | 0.47 | [view](../viewer/index.html#anim-edo-japanese-university-335__jTg8BE7) |
| 3 | `anim-edo-japanese-university-335` | `cyisiBz` | r2 | **0.733** | 0.76 | 0.97 | 0.64 | 1.00 | 0.83 | 0.47 | [view](../viewer/index.html#anim-edo-japanese-university-335__cyisiBz) |
| 4 | `anim-high-gothic-civic-597158` | `WauMdm4` | r2 | **0.728** | 0.75 | 0.92 | 0.78 | 0.53 | 0.58 | 0.66 | [view](../viewer/index.html#anim-high-gothic-civic-597158__WauMdm4) |
| 5 | `anim-persian-safavid-portfolio-6` | `WACbP4R` | r2 | **0.721** | 0.71 | 0.78 | 0.61 | 1.00 | 0.92 | 0.63 | [view](../viewer/index.html#anim-persian-safavid-portfolio-6__WACbP4R) |
| 6 | `anim-high-gothic-civic-597158` | `eveu4Ti` | r1 | **0.720** | 0.76 | 0.94 | 0.51 | 1.00 | 0.58 | 0.67 | [view](../viewer/index.html#anim-high-gothic-civic-597158__eveu4Ti) |
| 7 | `anim-persian-safavid-museum-4269` | `ehBgGeX` | r2 | **0.706** | 0.74 | 0.72 | 0.63 | 0.67 | 0.83 | 0.67 | [view](../viewer/index.html#anim-persian-safavid-museum-4269__ehBgGeX) |
| 8 | `anim-high-gothic-restaurant-7172` | `GXHTfaP` | r2 | **0.702** | 0.75 | 0.75 | 0.67 | 0.25 | 1.00 | 0.84 | [view](../viewer/index.html#anim-high-gothic-restaurant-7172__GXHTfaP) |
| 9 | `anim-edo-japanese-university-335` | `Qi7PBqy` | r2 | **0.691** | 0.75 | 0.86 | 0.58 | 0.83 | 0.83 | 0.47 | [view](../viewer/index.html#anim-edo-japanese-university-335__Qi7PBqy) |
| 10 | `anim-edo-japanese-university-335` | `8GKQZ6f` | r2 | **0.690** | 0.73 | 0.94 | 0.64 | 0.83 | 0.75 | 0.43 | [view](../viewer/index.html#anim-edo-japanese-university-335__8GKQZ6f) |
| 11 | `anim-persian-safavid-museum-4269` | `PWrn5aB` | r2 | **0.690** | 0.74 | 0.84 | 0.58 | 0.67 | 0.50 | 0.69 | [view](../viewer/index.html#anim-persian-safavid-museum-4269__PWrn5aB) |
| 12 | `anim-persian-safavid-portfolio-6` | `pACaFKx` | r2 | **0.687** | 0.74 | 0.79 | 0.59 | 0.40 | 1.00 | 0.65 | [view](../viewer/index.html#anim-persian-safavid-portfolio-6__pACaFKx) |
| 13 | `anim-persian-safavid-portfolio-6` | `eJgwbAZ` | r2 | **0.683** | 0.76 | 0.78 | 0.66 | 0.29 | 0.92 | 0.66 | [view](../viewer/index.html#anim-persian-safavid-portfolio-6__eJgwbAZ) |
| 14 | `anim-edo-japanese-editorial-7474` | `Ha8nno7` | r2 | **0.682** | 0.79 | 0.96 | 0.50 | 1.00 | 0.42 | 0.52 | [view](../viewer/index.html#anim-edo-japanese-editorial-7474__Ha8nno7) |
| 15 | `anim-persian-safavid-museum-4269` | `BcdKTjU` | r2 | **0.678** | 0.73 | 0.82 | 0.55 | 0.67 | 0.58 | 0.64 | [view](../viewer/index.html#anim-persian-safavid-museum-4269__BcdKTjU) |
| 16 | `anim-edo-japanese-editorial-7474` | `6PL2iCV` | r1 | **0.676** | 0.76 | 0.95 | 0.58 | 0.58 | 0.58 | 0.51 | [view](../viewer/index.html#anim-edo-japanese-editorial-7474__6PL2iCV) |
| 17 | `anim-persian-safavid-portfolio-6` | `Cq458pk` | r1 | **0.675** | 0.72 | 0.85 | 0.56 | 0.58 | 0.58 | 0.65 | [view](../viewer/index.html#anim-persian-safavid-portfolio-6__Cq458pk) |
| 18 | `anim-dravidian-museum-863314` | `jXs2moS` | r1 | **0.675** | 0.65 | 0.74 | 0.61 | 0.67 | 1.00 | 0.60 | [view](../viewer/index.html#anim-dravidian-museum-863314__jXs2moS) |
| 19 | `anim-edo-japanese-editorial-7474` | `59boH6L` | r2 | **0.671** | 0.77 | 0.95 | 0.58 | 0.83 | 0.42 | 0.48 | [view](../viewer/index.html#anim-edo-japanese-editorial-7474__59boH6L) |
| 20 | `anim-edo-japanese-editorial-7474` | `cZmfGmB` | r2 | **0.666** | 0.78 | 0.96 | 0.60 | 0.58 | 0.42 | 0.51 | [view](../viewer/index.html#anim-edo-japanese-editorial-7474__cZmfGmB) |
| 21 | `anim-high-gothic-restaurant-7172` | `CzSAg6Q` | r2 | **0.664** | 0.68 | 0.72 | 0.67 | 0.25 | 1.00 | 0.76 | [view](../viewer/index.html#anim-high-gothic-restaurant-7172__CzSAg6Q) |
| 22 | `anim-persian-safavid-civic-27907` | `GsCYBNQ` | r2 | **0.661** | 0.69 | 0.89 | 0.67 | 0.20 | 1.00 | 0.65 | [view](../viewer/index.html#anim-persian-safavid-civic-27907__GsCYBNQ) |
| 23 | `anim-high-gothic-restaurant-7172` | `Ak7irGR` | r2 | **0.657** | 0.75 | 0.73 | 0.60 | 0.20 | 0.83 | 0.80 | [view](../viewer/index.html#anim-high-gothic-restaurant-7172__Ak7irGR) |
| 24 | `anim-persian-safavid-civic-27907` | `cU6xfUc` | r2 | **0.657** | 0.61 | 0.76 | 0.66 | 0.50 | 1.00 | 0.61 | [view](../viewer/index.html#anim-persian-safavid-civic-27907__cU6xfUc) |
| 25 | `anim-persian-safavid-portfolio-6` | `uJCXBV2` | r2 | **0.657** | 0.69 | 0.86 | 0.63 | 0.25 | 1.00 | 0.62 | [view](../viewer/index.html#anim-persian-safavid-portfolio-6__uJCXBV2) |
| 26 | `anim-high-gothic-restaurant-7172` | `eKEwBJv` | r2 | **0.656** | 0.74 | 0.75 | 0.60 | 0.20 | 0.83 | 0.78 | [view](../viewer/index.html#anim-high-gothic-restaurant-7172__eKEwBJv) |
| 27 | `anim-persian-safavid-portfolio-6` | `Ekgs7H2` | r2 | **0.656** | 0.72 | 0.82 | 0.62 | 0.25 | 0.92 | 0.64 | [view](../viewer/index.html#anim-persian-safavid-portfolio-6__Ekgs7H2) |
| 28 | `anim-persian-safavid-portfolio-6` | `cYwNMWE` | r2 | **0.656** | 0.71 | 0.85 | 0.60 | 0.25 | 1.00 | 0.63 | [view](../viewer/index.html#anim-persian-safavid-portfolio-6__cYwNMWE) |
| 29 | `anim-high-gothic-restaurant-7172` | `fdPBtJq` | r2 | **0.653** | 0.75 | 0.75 | 0.64 | 0.25 | 0.50 | 0.80 | [view](../viewer/index.html#anim-high-gothic-restaurant-7172__fdPBtJq) |
| 30 | `anim-persian-safavid-civic-27907` | `LCX6qRN` | r2 | **0.653** | 0.68 | 0.87 | 0.68 | 0.20 | 1.00 | 0.62 | [view](../viewer/index.html#anim-persian-safavid-civic-27907__LCX6qRN) |
| 31 | `anim-edo-japanese-editorial-7474` | `Kn8Nb2j` | r2 | **0.652** | 0.77 | 0.95 | 0.46 | 0.83 | 0.42 | 0.50 | [view](../viewer/index.html#anim-edo-japanese-editorial-7474__Kn8Nb2j) |
| 32 | `anim-persian-safavid-portfolio-6` | `7x6nogT` | r2 | **0.651** | 0.77 | 0.62 | 0.52 | 0.38 | 0.92 | 0.67 | [view](../viewer/index.html#anim-persian-safavid-portfolio-6__7x6nogT) |
| 33 | `anim-persian-safavid-museum-4269` | `ADuizQK` | r2 | **0.650** | 0.72 | 0.68 | 0.53 | 0.67 | 0.58 | 0.65 | [view](../viewer/index.html#anim-persian-safavid-museum-4269__ADuizQK) |
| 34 | `anim-high-gothic-restaurant-7172` | `9NhYZQp` | r2 | **0.649** | 0.78 | 0.77 | 0.58 | 0.23 | 0.50 | 0.82 | [view](../viewer/index.html#anim-high-gothic-restaurant-7172__9NhYZQp) |
| 35 | `anim-persian-safavid-portfolio-6` | `3auSNuA` | r1 | **0.649** | 0.75 | 0.78 | 0.61 | 0.20 | 0.92 | 0.66 | [view](../viewer/index.html#anim-persian-safavid-portfolio-6__3auSNuA) |
| 36 | `anim-roman-imperial-portfolio-74` | `izgwur5` | r2 | **0.648** | 0.78 | 0.95 | 0.64 | 0.12 | 1.00 | 0.56 | [view](../viewer/index.html#anim-roman-imperial-portfolio-74__izgwur5) |
| 37 | `anim-edo-japanese-university-335` | `8TfwoR2` | r2 | **0.647** | 0.77 | 0.81 | 0.56 | 0.67 | 0.50 | 0.47 | [view](../viewer/index.html#anim-edo-japanese-university-335__8TfwoR2) |
| 38 | `anim-edo-japanese-university-335` | `gtrjCao` | r2 | **0.647** | 0.71 | 0.92 | 0.65 | 0.83 | 0.50 | 0.37 | [view](../viewer/index.html#anim-edo-japanese-university-335__gtrjCao) |
| 39 | `anim-high-gothic-restaurant-7172` | `MxooS6E` | r2 | **0.645** | 0.78 | 0.92 | 0.56 | 0.23 | 0.33 | 0.84 | [view](../viewer/index.html#anim-high-gothic-restaurant-7172__MxooS6E) |
| 40 | `anim-edo-japanese-editorial-7474` | `ovAXDFk` | r2 | **0.644** | 0.73 | 0.94 | 0.56 | 0.58 | 0.50 | 0.48 | [view](../viewer/index.html#anim-edo-japanese-editorial-7474__ovAXDFk) |
| 41 | `anim-high-gothic-restaurant-7172` | `piFHx7r` | r1 | **0.639** | 0.79 | 0.77 | 0.57 | 0.17 | 0.50 | 0.85 | [view](../viewer/index.html#anim-high-gothic-restaurant-7172__piFHx7r) |
| 42 | `anim-high-gothic-restaurant-7172` | `ixqsxrj` | r1 | **0.639** | 0.76 | 0.76 | 0.56 | 0.20 | 0.58 | 0.81 | [view](../viewer/index.html#anim-high-gothic-restaurant-7172__ixqsxrj) |
| 43 | `anim-high-gothic-civic-597158` | `k4XPV85` | r2 | **0.638** | 0.76 | 0.93 | 0.47 | 0.29 | 0.58 | 0.65 | [view](../viewer/index.html#anim-high-gothic-civic-597158__k4XPV85) |
| 44 | `anim-persian-safavid-museum-4269` | `BCLoeNh` | r1 | **0.637** | 0.76 | 0.60 | 0.46 | 0.38 | 1.00 | 0.68 | [view](../viewer/index.html#anim-persian-safavid-museum-4269__BCLoeNh) |
| 45 | `anim-persian-safavid-civic-27907` | `9m2fLZX` | r2 | **0.623** | 0.68 | 0.76 | 0.64 | 0.33 | 0.50 | 0.64 | [view](../viewer/index.html#anim-persian-safavid-civic-27907__9m2fLZX) |
| 46 | `anim-dravidian-museum-863314` | `F2NdB37` | r1 | **0.623** | 0.66 | 0.77 | 0.62 | 0.25 | 0.92 | 0.59 | [view](../viewer/index.html#anim-dravidian-museum-863314__F2NdB37) |
| 47 | `anim-persian-safavid-museum-4269` | `oF4rYJ2` | r2 | **0.618** | 0.75 | 0.61 | 0.46 | 0.67 | 0.42 | 0.67 | [view](../viewer/index.html#anim-persian-safavid-museum-4269__oF4rYJ2) |
| 48 | `anim-persian-safavid-civic-27907` | `2GTDkZ6` | r1 | **0.613** | 0.70 | 0.47 | 0.66 | 0.25 | 0.75 | 0.81 | [view](../viewer/index.html#anim-persian-safavid-civic-27907__2GTDkZ6) |
| 49 | `anim-persian-safavid-civic-27907` | `EVqqi5k` | r2 | **0.608** | 0.69 | 0.47 | 0.60 | 0.67 | 0.50 | 0.64 | [view](../viewer/index.html#anim-persian-safavid-civic-27907__EVqqi5k) |
| 50 | `anim-dravidian-museum-863314` | `aTPoGTk` | r2 | **0.608** | 0.66 | 0.49 | 0.55 | 0.50 | 1.00 | 0.60 | [view](../viewer/index.html#anim-dravidian-museum-863314__aTPoGTk) |
| 51 | `anim-dravidian-museum-863314` | `83FmEqV` | r2 | **0.604** | 0.65 | 0.69 | 0.51 | 0.33 | 1.00 | 0.58 | [view](../viewer/index.html#anim-dravidian-museum-863314__83FmEqV) |
| 52 | `anim-persian-safavid-museum-4269` | `p6HTa68` | r1 | **0.604** | 0.74 | 0.70 | 0.47 | 0.25 | 0.67 | 0.66 | [view](../viewer/index.html#anim-persian-safavid-museum-4269__p6HTa68) |
| 53 | `anim-dravidian-museum-863314` | `naaMYZ8` | r2 | **0.603** | 0.64 | 0.84 | 0.56 | 0.25 | 0.75 | 0.57 | [view](../viewer/index.html#anim-dravidian-museum-863314__naaMYZ8) |
| 54 | `anim-persian-safavid-museum-4269` | `89TGUgM` | r2 | **0.596** | 0.73 | 0.83 | 0.59 | 0.33 | 0.33 | 0.51 | [view](../viewer/index.html#anim-persian-safavid-museum-4269__89TGUgM) |
| 55 | `anim-persian-safavid-civic-27907` | `BWCDJWX` | r2 | **0.595** | 0.68 | 0.46 | 0.64 | 0.25 | 1.00 | 0.65 | [view](../viewer/index.html#anim-persian-safavid-civic-27907__BWCDJWX) |
| 56 | `anim-persian-safavid-civic-27907` | `9HpyJWr` | r2 | **0.589** | 0.71 | 0.90 | 0.67 | 0.18 | 0.25 | 0.65 | [view](../viewer/index.html#anim-persian-safavid-civic-27907__9HpyJWr) |
| 57 | `anim-persian-safavid-civic-27907` | `dgLyHC5` | r1 | **0.586** | 0.70 | 0.39 | 0.63 | 0.25 | 1.00 | 0.67 | [view](../viewer/index.html#anim-persian-safavid-civic-27907__dgLyHC5) |
| 58 | `anim-persian-safavid-portfolio-6` | `TrdQUpd` | r2 | **0.582** | 0.67 | 0.51 | 0.61 | 0.38 | 0.58 | 0.59 | [view](../viewer/index.html#anim-persian-safavid-portfolio-6__TrdQUpd) |
| 59 | `anim-persian-safavid-museum-4269` | `XYaS4hu` | r2 | **0.575** | 0.71 | 0.50 | 0.56 | 0.50 | 0.58 | 0.49 | [view](../viewer/index.html#anim-persian-safavid-museum-4269__XYaS4hu) |
| 60 | `anim-dravidian-civic-489417` | `bRz7u6u` | r2 | **0.573** | 0.66 | 0.81 | 0.65 | 0.08 | 0.50 | 0.75 | [view](../viewer/index.html#anim-dravidian-civic-489417__bRz7u6u) |
| 61 | `anim-persian-safavid-museum-4269` | `z3rqxDA` | r2 | **0.566** | 0.73 | 0.85 | 0.51 | 0.08 | 0.58 | 0.65 | [view](../viewer/index.html#anim-persian-safavid-museum-4269__z3rqxDA) |
| 62 | `anim-edo-japanese-editorial-7474` | `UGtRiv9` | r1 | **0.564** | 0.74 | 0.46 | 0.62 | 1.00 | 0.17 | 0.50 | [view](../viewer/index.html#anim-edo-japanese-editorial-7474__UGtRiv9) |
| 63 | `anim-persian-safavid-civic-27907` | `Jo2Yt3E` | r2 | **0.563** | 0.68 | 0.64 | 0.70 | 0.25 | 0.42 | 0.48 | [view](../viewer/index.html#anim-persian-safavid-civic-27907__Jo2Yt3E) |
| 64 | `anim-dravidian-museum-863314` | `wyZekow` | r2 | **0.556** | 0.65 | 0.53 | 0.57 | 0.33 | 0.50 | 0.58 | [view](../viewer/index.html#anim-dravidian-museum-863314__wyZekow) |
| 65 | `anim-dravidian-museum-863314` | `5gxF6dP` | r2 | **0.552** | 0.66 | 0.32 | 0.55 | 0.33 | 1.00 | 0.63 | [view](../viewer/index.html#anim-dravidian-museum-863314__5gxF6dP) |
| 66 | `anim-edo-japanese-editorial-7474` | `yxzWmgm` | r2 | **0.529** | 0.68 | 0.44 | 0.53 | 1.00 | 0.25 | 0.40 | [view](../viewer/index.html#anim-edo-japanese-editorial-7474__yxzWmgm) |
| 67 | `anim-dravidian-museum-863314` | `CHnoxHB` | r2 | **0.520** | 0.66 | 0.47 | 0.51 | 0.23 | 0.42 | 0.62 | [view](../viewer/index.html#anim-dravidian-museum-863314__CHnoxHB) |
| 68 | `anim-edo-japanese-university-335` | `5nHqGB7` | r1 | **0.512** | 0.76 | 0.12 | 0.70 | 1.00 | 0.67 | 0.47 | [view](../viewer/index.html#anim-edo-japanese-university-335__5nHqGB7) |
| 69 | `anim-edo-japanese-university-335` | `8pLUxwM` | r2 | **0.511** | 0.77 | 0.13 | 0.60 | 0.83 | 0.75 | 0.49 | [view](../viewer/index.html#anim-edo-japanese-university-335__8pLUxwM) |
| 70 | `anim-edo-japanese-university-335` | `uJmB8uu` | r1 | **0.449** | 0.77 | 0.06 | 0.66 | 0.67 | 0.83 | 0.51 | [view](../viewer/index.html#anim-edo-japanese-university-335__uJmB8uu) |
| 71 | `anim-high-gothic-civic-597158` | `2scvVr7` | r2 | **0.426** | 0.75 | 0.90 | 0.54 | 0.00 | 1.00 | 0.68 | [view](../viewer/index.html#anim-high-gothic-civic-597158__2scvVr7) |
| 72 | `anim-high-gothic-civic-597158` | `6W2kYQe` | r2 | **0.422** | 0.74 | 0.90 | 0.59 | 0.00 | 1.00 | 0.62 | [view](../viewer/index.html#anim-high-gothic-civic-597158__6W2kYQe) |
| 73 | `anim-roman-imperial-portfolio-74` | `kCUcMJk` | r2 | **0.420** | 0.78 | 0.94 | 0.55 | 0.00 | 0.92 | 0.57 | [view](../viewer/index.html#anim-roman-imperial-portfolio-74__kCUcMJk) |
| 74 | `anim-high-gothic-civic-597158` | `XKYEPpE` | r2 | **0.420** | 0.76 | 0.94 | 0.58 | 0.00 | 0.67 | 0.67 | [view](../viewer/index.html#anim-high-gothic-civic-597158__XKYEPpE) |
| 75 | `anim-roman-imperial-portfolio-74` | `Lmiae7T` | r1 | **0.417** | 0.77 | 0.96 | 0.56 | 0.00 | 0.83 | 0.57 | [view](../viewer/index.html#anim-roman-imperial-portfolio-74__Lmiae7T) |
| 76 | `anim-roman-imperial-portfolio-74` | `PAPLyGy` | r2 | **0.415** | 0.75 | 0.96 | 0.60 | 0.00 | 0.83 | 0.54 | [view](../viewer/index.html#anim-roman-imperial-portfolio-74__PAPLyGy) |
| 77 | `anim-edo-japanese-university-335` | `GCp7r2B` | r2 | **0.413** | 0.75 | 0.09 | 0.64 | 0.25 | 0.42 | 0.49 | [view](../viewer/index.html#anim-edo-japanese-university-335__GCp7r2B) |
| 78 | `anim-dravidian-civic-489417` | `KfTN9bG` | r2 | **0.412** | 0.66 | 0.94 | 0.64 | 0.00 | 0.58 | 0.77 | [view](../viewer/index.html#anim-dravidian-civic-489417__KfTN9bG) |
| 79 | `anim-dravidian-museum-863314` | `3hyMf22` | r2 | **0.409** | 0.63 | 0.08 | 0.58 | 0.50 | 0.50 | 0.54 | [view](../viewer/index.html#anim-dravidian-museum-863314__3hyMf22) |
| 80 | `anim-roman-imperial-portfolio-74` | `3RBckgB` | r2 | **0.398** | 0.76 | 0.05 | 0.57 | 0.23 | 0.92 | 0.57 | [view](../viewer/index.html#anim-roman-imperial-portfolio-74__3RBckgB) |
| 81 | `anim-roman-imperial-portfolio-74` | `SddEoWa` | r2 | **0.398** | 0.77 | 0.95 | 0.57 | 0.00 | 0.50 | 0.56 | [view](../viewer/index.html#anim-roman-imperial-portfolio-74__SddEoWa) |
| 82 | `anim-edo-japanese-editorial-7474` | `3UjgdCR` | r2 | **0.398** | 0.75 | 0.05 | 0.48 | 1.00 | 0.50 | 0.45 | [view](../viewer/index.html#anim-edo-japanese-editorial-7474__3UjgdCR) |
| 83 | `anim-dravidian-civic-489417` | `DmJfYwW` | r2 | **0.390** | 0.67 | 0.94 | 0.54 | 0.00 | 0.42 | 0.77 | [view](../viewer/index.html#anim-dravidian-civic-489417__DmJfYwW) |
| 84 | `anim-high-gothic-civic-597158` | `vjk29dK` | r2 | **0.389** | 0.70 | 0.83 | 0.53 | 0.00 | 0.58 | 0.67 | [view](../viewer/index.html#anim-high-gothic-civic-597158__vjk29dK) |
| 85 | `anim-roman-imperial-portfolio-74` | `LhbkB4f` | r2 | **0.387** | 0.76 | 0.96 | 0.46 | 0.00 | 0.58 | 0.54 | [view](../viewer/index.html#anim-roman-imperial-portfolio-74__LhbkB4f) |
| 86 | `anim-dravidian-civic-489417` | `NKTB8Ca` | r1 | **0.378** | 0.64 | 0.80 | 0.59 | 0.00 | 0.42 | 0.73 | [view](../viewer/index.html#anim-dravidian-civic-489417__NKTB8Ca) |
| 87 | `anim-dravidian-civic-489417` | `Ta77CBi` | r2 | **0.376** | 0.64 | 0.64 | 0.59 | 0.00 | 0.58 | 0.75 | [view](../viewer/index.html#anim-dravidian-civic-489417__Ta77CBi) |
| 88 | `anim-dravidian-civic-489417` | `7ohX48E` | r2 | **0.366** | 0.65 | 0.79 | 0.64 | 0.00 | 0.58 | 0.45 | [view](../viewer/index.html#anim-dravidian-civic-489417__7ohX48E) |
| 89 | `anim-dravidian-civic-489417` | `QsbQ9i8` | r2 | **0.365** | 0.66 | 0.46 | 0.64 | 0.00 | 0.58 | 0.76 | [view](../viewer/index.html#anim-dravidian-civic-489417__QsbQ9i8) |
| 90 | `anim-dravidian-civic-489417` | `9SNWVyg` | r2 | **0.354** | 0.62 | 0.53 | 0.60 | 0.00 | 0.50 | 0.70 | [view](../viewer/index.html#anim-dravidian-civic-489417__9SNWVyg) |
| 91 | `anim-dravidian-museum-863314` | `qgTuRF8` | r2 | **0.326** | 0.66 | 0.37 | 0.55 | 0.50 | 0.00 | 0.60 | [view](../viewer/index.html#anim-dravidian-museum-863314__qgTuRF8) |
| 92 | `anim-dravidian-civic-489417` | `D9fgmjr` | r2 | **0.309** | 0.65 | 0.17 | 0.67 | 0.00 | 0.58 | 0.74 | [view](../viewer/index.html#anim-dravidian-civic-489417__D9fgmjr) |
| 93 | `anim-dravidian-civic-489417` | `vTVUDc3` | r1 | **0.304** | 0.63 | 0.21 | 0.52 | 0.00 | 0.58 | 0.75 | [view](../viewer/index.html#anim-dravidian-civic-489417__vTVUDc3) |
| 94 | `anim-high-gothic-civic-597158` | `sN6WR8m` | r2 | **0.291** | 0.75 | 0.17 | 0.43 | 0.00 | 0.50 | 0.65 | [view](../viewer/index.html#anim-high-gothic-civic-597158__sN6WR8m) |
| 95 | `anim-high-gothic-civic-597158` | `XEo6Zcz` | r1 | **0.286** | 0.76 | 0.18 | 0.51 | 0.00 | 0.25 | 0.67 | [view](../viewer/index.html#anim-high-gothic-civic-597158__XEo6Zcz) |
| 96 | `anim-roman-imperial-portfolio-74` | `3mYdjMo` | r2 | **0.261** | 0.77 | 0.06 | 0.60 | 0.00 | 0.75 | 0.58 | [view](../viewer/index.html#anim-roman-imperial-portfolio-74__3mYdjMo) |
| 97 | `anim-roman-imperial-portfolio-74` | `Sfoa99v` | r2 | **0.257** | 0.75 | 0.05 | 0.60 | 0.00 | 0.92 | 0.57 | [view](../viewer/index.html#anim-roman-imperial-portfolio-74__Sfoa99v) |
| 98 | `anim-roman-imperial-portfolio-74` | `mFaoGeu` | r1 | **0.243** | 0.76 | 0.04 | 0.60 | 0.00 | 0.92 | 0.56 | [view](../viewer/index.html#anim-roman-imperial-portfolio-74__mFaoGeu) |
