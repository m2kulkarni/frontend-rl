# Eval report — 10 animated tasks × 2 attempts (Bonus 1 deliverable)

**Date:** 2026-05-09

**Run:** `jobs/2026-05-09__15-57-29/`

**Agent:** claude-code v2.1.138 with `claude-opus-4-7`

**Environment:** Modal (parallel sandboxes)

**Total trials:** 20 (10 unique tasks × 2 attempts)


This report covers only the **10 animated** tasks (Bonus 1). The full 60-trial eval (which also included 20 static tasks) ran on the same date — those scores aren't in this submission since the static-task viewer assets aren't committed to keep the repo lean.


## Aggregate scores (20 animated trials)

| Rubric | Mean | Median | Stdev | Min | Max |
|---|---|---|---|---|---|
| Overall | 0.544 | 0.608 | 0.146 | 0.243 | 0.720 |
| Visual | 0.729 | 0.752 | 0.048 | 0.628 | 0.790 |
| Palette | 0.577 | 0.715 | 0.313 | 0.036 | 0.963 |
| Structural | 0.580 | 0.588 | 0.063 | 0.461 | 0.698 |
| Typography | 0.372 | 0.250 | 0.348 | 0.000 | 1.000 |
| Consistency | 0.688 | 0.667 | 0.243 | 0.167 | 1.000 |
| Animation | 0.645 | 0.661 | 0.109 | 0.471 | 0.848 |
| Coverage | 1.000 | 1.000 | 0.000 | 1.000 | 1.000 |

## Per-task scores (mean of 2 attempts)

| # | Task | Overall | Visual | Palette | Structural | Typography | Consistency | Animation |
|---|---|---|---|---|---|---|---|---|
| 1 | `anim-persian-safavid-portfolio-6` | **0.662** | 0.74 | 0.81 | 0.58 | 0.39 | 0.75 | 0.66 |
| 2 | `anim-dravidian-museum-863314` | **0.649** | 0.66 | 0.75 | 0.62 | 0.46 | 0.96 | 0.59 |
| 3 | `anim-high-gothic-restaurant-7172` | **0.639** | 0.78 | 0.77 | 0.56 | 0.19 | 0.54 | 0.83 |
| 4 | `anim-persian-safavid-museum-4269` | **0.620** | 0.75 | 0.65 | 0.47 | 0.31 | 0.83 | 0.67 |
| 5 | `anim-edo-japanese-editorial-7474` | **0.620** | 0.75 | 0.71 | 0.60 | 0.79 | 0.38 | 0.50 |
| 6 | `anim-persian-safavid-civic-27907` | **0.600** | 0.70 | 0.43 | 0.64 | 0.25 | 0.88 | 0.74 |
| 7 | `anim-high-gothic-civic-597158` | **0.503** | 0.76 | 0.56 | 0.51 | 0.50 | 0.42 | 0.67 |
| 8 | `anim-edo-japanese-university-335` | **0.481** | 0.76 | 0.09 | 0.68 | 0.83 | 0.75 | 0.49 |
| 9 | `anim-dravidian-civic-489417` | **0.341** | 0.63 | 0.51 | 0.56 | 0.00 | 0.50 | 0.74 |
| 10 | `anim-roman-imperial-portfolio-74` | **0.330** | 0.76 | 0.50 | 0.58 | 0.00 | 0.88 | 0.56 |

## Per-trial scores + viewer links

Click **view** to jump to the side-by-side ground-truth-vs-agent comparison in the visualizer (open `viewer/index.html` first).

| # | Task | Trial id | Overall | Visual | Palette | Structural | Typography | Consistency | Animation | View |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `anim-high-gothic-civic-597158` | `eveu4Ti` | **0.720** | 0.76 | 0.94 | 0.51 | 1.00 | 0.58 | 0.67 | [view](../viewer/index.html#anim-high-gothic-civic-597158__eveu4Ti) |
| 2 | `anim-edo-japanese-editorial-7474` | `6PL2iCV` | **0.676** | 0.76 | 0.95 | 0.58 | 0.58 | 0.58 | 0.51 | [view](../viewer/index.html#anim-edo-japanese-editorial-7474__6PL2iCV) |
| 3 | `anim-persian-safavid-portfolio-6` | `Cq458pk` | **0.675** | 0.72 | 0.85 | 0.56 | 0.58 | 0.58 | 0.65 | [view](../viewer/index.html#anim-persian-safavid-portfolio-6__Cq458pk) |
| 4 | `anim-dravidian-museum-863314` | `jXs2moS` | **0.675** | 0.65 | 0.74 | 0.61 | 0.67 | 1.00 | 0.60 | [view](../viewer/index.html#anim-dravidian-museum-863314__jXs2moS) |
| 5 | `anim-persian-safavid-portfolio-6` | `3auSNuA` | **0.649** | 0.75 | 0.78 | 0.61 | 0.20 | 0.92 | 0.66 | [view](../viewer/index.html#anim-persian-safavid-portfolio-6__3auSNuA) |
| 6 | `anim-high-gothic-restaurant-7172` | `piFHx7r` | **0.639** | 0.79 | 0.77 | 0.57 | 0.17 | 0.50 | 0.85 | [view](../viewer/index.html#anim-high-gothic-restaurant-7172__piFHx7r) |
| 7 | `anim-high-gothic-restaurant-7172` | `ixqsxrj` | **0.639** | 0.76 | 0.76 | 0.56 | 0.20 | 0.58 | 0.81 | [view](../viewer/index.html#anim-high-gothic-restaurant-7172__ixqsxrj) |
| 8 | `anim-persian-safavid-museum-4269` | `BCLoeNh` | **0.637** | 0.76 | 0.60 | 0.46 | 0.38 | 1.00 | 0.68 | [view](../viewer/index.html#anim-persian-safavid-museum-4269__BCLoeNh) |
| 9 | `anim-dravidian-museum-863314` | `F2NdB37` | **0.623** | 0.66 | 0.77 | 0.62 | 0.25 | 0.92 | 0.59 | [view](../viewer/index.html#anim-dravidian-museum-863314__F2NdB37) |
| 10 | `anim-persian-safavid-civic-27907` | `2GTDkZ6` | **0.613** | 0.70 | 0.47 | 0.66 | 0.25 | 0.75 | 0.81 | [view](../viewer/index.html#anim-persian-safavid-civic-27907__2GTDkZ6) |
| 11 | `anim-persian-safavid-museum-4269` | `p6HTa68` | **0.604** | 0.74 | 0.70 | 0.47 | 0.25 | 0.67 | 0.66 | [view](../viewer/index.html#anim-persian-safavid-museum-4269__p6HTa68) |
| 12 | `anim-persian-safavid-civic-27907` | `dgLyHC5` | **0.586** | 0.70 | 0.39 | 0.63 | 0.25 | 1.00 | 0.67 | [view](../viewer/index.html#anim-persian-safavid-civic-27907__dgLyHC5) |
| 13 | `anim-edo-japanese-editorial-7474` | `UGtRiv9` | **0.564** | 0.74 | 0.46 | 0.62 | 1.00 | 0.17 | 0.50 | [view](../viewer/index.html#anim-edo-japanese-editorial-7474__UGtRiv9) |
| 14 | `anim-edo-japanese-university-335` | `5nHqGB7` | **0.512** | 0.76 | 0.12 | 0.70 | 1.00 | 0.67 | 0.47 | [view](../viewer/index.html#anim-edo-japanese-university-335__5nHqGB7) |
| 15 | `anim-edo-japanese-university-335` | `uJmB8uu` | **0.449** | 0.77 | 0.06 | 0.66 | 0.67 | 0.83 | 0.51 | [view](../viewer/index.html#anim-edo-japanese-university-335__uJmB8uu) |
| 16 | `anim-roman-imperial-portfolio-74` | `Lmiae7T` | **0.417** | 0.77 | 0.96 | 0.56 | 0.00 | 0.83 | 0.57 | [view](../viewer/index.html#anim-roman-imperial-portfolio-74__Lmiae7T) |
| 17 | `anim-dravidian-civic-489417` | `NKTB8Ca` | **0.378** | 0.64 | 0.80 | 0.59 | 0.00 | 0.42 | 0.73 | [view](../viewer/index.html#anim-dravidian-civic-489417__NKTB8Ca) |
| 18 | `anim-dravidian-civic-489417` | `vTVUDc3` | **0.304** | 0.63 | 0.21 | 0.52 | 0.00 | 0.58 | 0.75 | [view](../viewer/index.html#anim-dravidian-civic-489417__vTVUDc3) |
| 19 | `anim-high-gothic-civic-597158` | `XEo6Zcz` | **0.286** | 0.76 | 0.18 | 0.51 | 0.00 | 0.25 | 0.67 | [view](../viewer/index.html#anim-high-gothic-civic-597158__XEo6Zcz) |
| 20 | `anim-roman-imperial-portfolio-74` | `mFaoGeu` | **0.243** | 0.76 | 0.04 | 0.60 | 0.00 | 0.92 | 0.56 | [view](../viewer/index.html#anim-roman-imperial-portfolio-74__mFaoGeu) |
