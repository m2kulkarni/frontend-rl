# Eval report — 30 × 2 = 60 trials

**Date:** 2026-05-09
**Run:** `jobs/2026-05-09__15-57-29/`
**Agent:** claude-code v2.1.138 with `claude-opus-4-7` (Anthropic)
**Environment:** Modal (per-task containers, parallel)
**Wall clock:** 1h 32m
**Approximate cost:** ~$600 (Anthropic API + Modal compute)

## What we ran

- **30 ground-truth tasks** (`tasks/final/`):
  - 20 static + 10 animated
  - Stratified across all 5 architectural styles (Persian Safavid, Roman Imperial, High Gothic, Dravidian, Edo Japanese)
  - Mix of all 3 variants (period_faithful, modern, bold)
  - 6 pages each, shared `<header>`/`<footer>`, ~6KB ground-truth HTML per page after motif-inlining
- **2 attempts per task** (`-k 2`), giving 60 trials.
- **All trials launched concurrently** (`-n 60`) — Modal handled the parallelism without throttling.

The agent's job each trial: given six PNG screenshots (plus filmstrips for animated tasks), write `/app/output/page-1.html` … `page-6.html` that visually replicate the originals at 1440 × 900.

## Aggregate scores (60 trials)

| Rubric | Mean | Median | Stdev | Min | Max |
|---|---|---|---|---|---|
| Overall (composite) | 0.522 | 0.577 | 0.146 | 0.150 | 0.689 |
| Visual (SSIM) | 0.707 | 0.737 | 0.078 | 0.45 | 0.81 |
| Palette (Lab + 3D histogram) | 0.539 | 0.647 | **0.303** | 0.02 | 0.97 |
| Structural (DOM tag Jaccard) | 0.573 | 0.586 | 0.065 | 0.41 | 0.72 |
| Typography (font-name Jaccard) | 0.342 | 0.250 | 0.267 | 0.00 | 0.83 |
| Consistency (header/footer hash equality) | 0.631 | 0.583 | 0.262 | 0.00 | 1.00 |
| Animation (frame-SSIM + @keyframes Jaccard) | 0.645 | 0.661 | 0.109 | 0.45 | 0.83 |
| Coverage (page count) | 1.000 | 1.000 | 0.000 | 1.00 | 1.00 |

**Animation** is computed only on the 20 animated trials.

## Per-style breakdown

| Style | Trials | Mean overall | Stdev | Min | Max |
|---|---|---|---|---|---|
| edo-japanese | 12 | 0.612 | 0.073 | 0.45 | 0.69 |
| persian-safavid | 18 | 0.585 | 0.091 | 0.28 | 0.68 |
| high-gothic | 10 | 0.565 | 0.124 | 0.29 | 0.72 |
| dravidian | 10 | 0.408 | 0.162 | 0.15 | 0.68 |
| roman-imperial | 10 | 0.369 | 0.124 | 0.15 | 0.60 |

(Persian Safavid has more trials because the random taxonomy sampler happened to select it more often within the 30-task budget.)

## Headline observations

1. **Coverage is 100%** across every trial — the agent never failed to produce all 6 pages.
2. **Palette is the biggest discriminator** (stdev 0.30). Bold-variant tasks (dark/saturated backgrounds) penalize agents who default to cream-on-black-text — a real failure mode this rubric correctly catches.
3. **Visual SSIM is consistent** (stdev 0.08, mean 0.71). Agents reliably hit the gross "looks roughly like a webpage in this style" target.
4. **Consistency is highly bimodal** (stdev 0.26). Some agents successfully replicate the shared `<header>`/`<footer>` across all 6 pages; others write a different header for each page. Catches drift the visual rubric blurs over.
5. **Typography is harsh by design** — exact-match Jaccard on font names. Agents rarely pick the GT's exact font choice. See `docs/rubric_audit.md` for plan to soften this with style-cluster credit.
6. **Roman Imperial + Dravidian are the hardest styles** — mean ~0.37–0.41. Roman because of the bold-variant pompeian-red palette (low palette scores); Dravidian because of weaker motif library / sparser Wikimedia coverage on Hindu temple ornaments.
7. **Animation rubric works.** Animated trials score 0.55–0.83 across the 20 attempts — discriminating range, neither saturated nor bottomed out.

### Per-task scores (mean of 2 attempts)

| # | Task | Type | Overall | Visual | Palette | Structural | Typography | Consistency | Animation |
|---|---|---|---|---|---|---|---|---|---|
| 1 | `edo-japanese-foundation-190509` | static | **0.680** | 0.77 | 0.89 | 0.60 | 0.41 | 0.50 | — |
| 2 | `edo-japanese-university-573911` | static | **0.664** | 0.77 | 0.97 | 0.55 | 0.44 | 0.42 | — |
| 3 | `anim-persian-safavid-portfolio-6` | anim | **0.662** | 0.74 | 0.81 | 0.58 | 0.39 | 0.75 | 0.66 |
| 4 | `persian-safavid-university-52509` | static | **0.650** | 0.64 | 0.76 | 0.72 | 0.30 | 0.96 | — |
| 5 | `anim-dravidian-museum-863314` | anim | **0.649** | 0.66 | 0.75 | 0.62 | 0.46 | 0.96 | 0.59 |
| 6 | `anim-high-gothic-restaurant-7172` | anim | **0.639** | 0.78 | 0.77 | 0.56 | 0.19 | 0.54 | 0.83 |
| 7 | `high-gothic-studio-81931` | static | **0.628** | 0.71 | 0.72 | 0.58 | 0.43 | 0.50 | — |
| 8 | `edo-japanese-restaurant-351157` | static | **0.626** | 0.79 | 0.52 | 0.55 | 0.41 | 0.79 | — |
| 9 | `anim-persian-safavid-museum-4269` | anim | **0.620** | 0.75 | 0.65 | 0.47 | 0.31 | 0.83 | 0.67 |
| 10 | `anim-edo-japanese-editorial-7474` | anim | **0.620** | 0.75 | 0.71 | 0.60 | 0.79 | 0.38 | 0.50 |
| 11 | `edo-japanese-portfolio-233247` | static | **0.602** | 0.73 | 0.79 | 0.57 | 0.26 | 0.42 | — |
| 12 | `anim-persian-safavid-civic-27907` | anim | **0.600** | 0.70 | 0.43 | 0.64 | 0.25 | 0.88 | 0.74 |
| 13 | `persian-safavid-civic-515225` | static | **0.599** | 0.69 | 0.75 | 0.53 | 0.29 | 0.58 | — |
| 14 | `persian-safavid-restaurant-29937` | static | **0.557** | 0.73 | 0.43 | 0.52 | 0.46 | 0.50 | — |
| 15 | `persian-safavid-studio-55231` | static | **0.556** | 0.73 | 0.49 | 0.47 | 0.46 | 0.71 | — |
| 16 | `high-gothic-museum-464910` | static | **0.554** | 0.63 | 0.60 | 0.60 | 0.23 | 0.62 | — |
| 17 | `persian-safavid-museum-635546` | static | **0.552** | 0.67 | 0.50 | 0.63 | 0.22 | 0.67 | — |
| 18 | `anim-high-gothic-civic-597158` | anim | **0.503** | 0.76 | 0.56 | 0.51 | 0.50 | 0.42 | 0.67 |
| 19 | `high-gothic-university-576445` | static | **0.501** | 0.65 | 0.47 | 0.58 | 0.23 | 0.46 | — |
| 20 | `anim-edo-japanese-university-335` | anim | **0.481** | 0.76 | 0.09 | 0.68 | 0.83 | 0.75 | 0.49 |
| 21 | `persian-safavid-portfolio-610786` | static | **0.468** | 0.79 | 0.47 | 0.55 | 0.10 | 0.96 | — |
| 22 | `roman-imperial-studio-768601` | static | **0.465** | 0.76 | 0.31 | 0.60 | 0.50 | 0.42 | — |
| 23 | `dravidian-portfolio-237017` | static | **0.458** | 0.60 | 0.26 | 0.52 | 0.40 | 0.54 | — |
| 24 | `roman-imperial-editorial-340853` | static | **0.449** | 0.75 | 0.07 | 0.61 | 0.83 | 0.92 | — |
| 25 | `roman-imperial-university-211040` | static | **0.359** | 0.72 | 0.03 | 0.63 | 0.38 | 0.88 | — |
| 26 | `anim-dravidian-civic-489417` | anim | **0.341** | 0.63 | 0.51 | 0.56 | 0.00 | 0.50 | 0.74 |
| 27 | `anim-roman-imperial-portfolio-74` | anim | **0.330** | 0.76 | 0.50 | 0.58 | 0.00 | 0.88 | 0.56 |
| 28 | `dravidian-editorial-928086` | static | **0.307** | 0.47 | 0.65 | 0.60 | 0.04 | 0.29 | — |
| 29 | `dravidian-studio-595000` | static | **0.287** | 0.54 | 0.68 | 0.56 | 0.00 | 0.54 | — |
| 30 | `roman-imperial-restaurant-170812` | static | **0.240** | 0.80 | 0.03 | 0.43 | 0.15 | 0.38 | — |

### Per-trial scores + viewer links

Click the **view** link to jump to that trial in the side-by-side viewer (renders ground-truth vs. agent output, page by page).

| # | Task | Trial id | Overall | Visual | Palette | Structural | Typography | Consistency | Animation | View |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | `anim-high-gothic-civic-597158` | `eveu4Ti` | **0.720** | 0.76 | 0.94 | 0.51 | 1.00 | 0.58 | 0.67 | [view](viewer/index.html#anim-high-gothic-civic-597158__eveu4Ti) |
| 2 | `edo-japanese-foundation-190509` | `kSaWMYS` | **0.685** | 0.77 | 0.88 | 0.62 | 0.45 | 0.50 | — | [view](viewer/index.html#edo-japanese-foundation-190509__kSaWMYS) |
| 3 | `edo-japanese-university-573911` | `22pBp4S` | **0.683** | 0.76 | 0.97 | 0.49 | 0.58 | 0.50 | — | [view](viewer/index.html#edo-japanese-university-573911__22pBp4S) |
| 4 | `anim-edo-japanese-editorial-7474` | `6PL2iCV` | **0.676** | 0.76 | 0.95 | 0.58 | 0.58 | 0.58 | 0.51 | [view](viewer/index.html#anim-edo-japanese-editorial-7474__6PL2iCV) |
| 5 | `anim-persian-safavid-portfolio-6` | `Cq458pk` | **0.675** | 0.72 | 0.85 | 0.56 | 0.58 | 0.58 | 0.65 | [view](viewer/index.html#anim-persian-safavid-portfolio-6__Cq458pk) |
| 6 | `persian-safavid-university-52509` | `EX8QSYe` | **0.675** | 0.63 | 0.74 | 0.76 | 0.40 | 1.00 | — | [view](viewer/index.html#persian-safavid-university-52509__EX8QSYe) |
| 7 | `anim-dravidian-museum-863314` | `jXs2moS` | **0.675** | 0.65 | 0.74 | 0.61 | 0.67 | 1.00 | 0.60 | [view](viewer/index.html#anim-dravidian-museum-863314__jXs2moS) |
| 8 | `edo-japanese-foundation-190509` | `mpgVNg7` | **0.674** | 0.78 | 0.91 | 0.59 | 0.37 | 0.50 | — | [view](viewer/index.html#edo-japanese-foundation-190509__mpgVNg7) |
| 9 | `persian-safavid-portfolio-610786` | `Z6AoAd5` | **0.654** | 0.80 | 0.75 | 0.55 | 0.20 | 1.00 | — | [view](viewer/index.html#persian-safavid-portfolio-610786__Z6AoAd5) |
| 10 | `anim-persian-safavid-portfolio-6` | `3auSNuA` | **0.649** | 0.75 | 0.78 | 0.61 | 0.20 | 0.92 | 0.66 | [view](viewer/index.html#anim-persian-safavid-portfolio-6__3auSNuA) |
| 11 | `edo-japanese-university-573911` | `vu4tTbj` | **0.645** | 0.78 | 0.97 | 0.60 | 0.29 | 0.33 | — | [view](viewer/index.html#edo-japanese-university-573911__vu4tTbj) |
| 12 | `edo-japanese-restaurant-351157` | `EsrMJTS` | **0.640** | 0.79 | 0.40 | 0.59 | 0.53 | 1.00 | — | [view](viewer/index.html#edo-japanese-restaurant-351157__EsrMJTS) |
| 13 | `high-gothic-studio-81931` | `bg2dz5Y` | **0.639** | 0.71 | 0.73 | 0.58 | 0.50 | 0.50 | — | [view](viewer/index.html#high-gothic-studio-81931__bg2dz5Y) |
| 14 | `anim-high-gothic-restaurant-7172` | `piFHx7r` | **0.639** | 0.79 | 0.77 | 0.57 | 0.17 | 0.50 | 0.85 | [view](viewer/index.html#anim-high-gothic-restaurant-7172__piFHx7r) |
| 15 | `anim-high-gothic-restaurant-7172` | `ixqsxrj` | **0.639** | 0.76 | 0.76 | 0.56 | 0.20 | 0.58 | 0.81 | [view](viewer/index.html#anim-high-gothic-restaurant-7172__ixqsxrj) |
| 16 | `anim-persian-safavid-museum-4269` | `BCLoeNh` | **0.637** | 0.76 | 0.60 | 0.46 | 0.38 | 1.00 | 0.68 | [view](viewer/index.html#anim-persian-safavid-museum-4269__BCLoeNh) |
| 17 | `persian-safavid-university-52509` | `8VnG5bY` | **0.625** | 0.65 | 0.79 | 0.67 | 0.20 | 0.92 | — | [view](viewer/index.html#persian-safavid-university-52509__8VnG5bY) |
| 18 | `anim-dravidian-museum-863314` | `F2NdB37` | **0.623** | 0.66 | 0.77 | 0.62 | 0.25 | 0.92 | 0.59 | [view](viewer/index.html#anim-dravidian-museum-863314__F2NdB37) |
| 19 | `persian-safavid-studio-55231` | `DbG2jvA` | **0.618** | 0.71 | 0.76 | 0.45 | 0.67 | 0.42 | — | [view](viewer/index.html#persian-safavid-studio-55231__DbG2jvA) |
| 20 | `persian-safavid-civic-515225` | `aZzfTE4` | **0.618** | 0.70 | 0.85 | 0.56 | 0.25 | 0.58 | — | [view](viewer/index.html#persian-safavid-civic-515225__aZzfTE4) |
| 21 | `high-gothic-studio-81931` | `bkop9tK` | **0.617** | 0.71 | 0.71 | 0.58 | 0.37 | 0.50 | — | [view](viewer/index.html#high-gothic-studio-81931__bkop9tK) |
| 22 | `anim-persian-safavid-civic-27907` | `2GTDkZ6` | **0.613** | 0.70 | 0.47 | 0.66 | 0.25 | 0.75 | 0.81 | [view](viewer/index.html#anim-persian-safavid-civic-27907__2GTDkZ6) |
| 23 | `edo-japanese-restaurant-351157` | `DGtmXZS` | **0.612** | 0.79 | 0.64 | 0.52 | 0.29 | 0.58 | — | [view](viewer/index.html#edo-japanese-restaurant-351157__DGtmXZS) |
| 24 | `edo-japanese-portfolio-233247` | `FSYMuFC` | **0.604** | 0.74 | 0.78 | 0.59 | 0.29 | 0.33 | — | [view](viewer/index.html#edo-japanese-portfolio-233247__FSYMuFC) |
| 25 | `anim-persian-safavid-museum-4269` | `p6HTa68` | **0.604** | 0.74 | 0.70 | 0.47 | 0.25 | 0.67 | 0.66 | [view](viewer/index.html#anim-persian-safavid-museum-4269__p6HTa68) |
| 26 | `edo-japanese-portfolio-233247` | `NhpMMeb` | **0.600** | 0.72 | 0.80 | 0.55 | 0.23 | 0.50 | — | [view](viewer/index.html#edo-japanese-portfolio-233247__NhpMMeb) |
| 27 | `roman-imperial-studio-768601` | `SUMhSSW` | **0.599** | 0.75 | 0.61 | 0.60 | 0.33 | 0.42 | — | [view](viewer/index.html#roman-imperial-studio-768601__SUMhSSW) |
| 28 | `anim-persian-safavid-civic-27907` | `dgLyHC5` | **0.586** | 0.70 | 0.39 | 0.63 | 0.25 | 1.00 | 0.67 | [view](viewer/index.html#anim-persian-safavid-civic-27907__dgLyHC5) |
| 29 | `persian-safavid-museum-635546` | `UkjXTz6` | **0.586** | 0.66 | 0.49 | 0.64 | 0.25 | 1.00 | — | [view](viewer/index.html#persian-safavid-museum-635546__UkjXTz6) |
| 30 | `persian-safavid-civic-515225` | `gM2zJ54` | **0.581** | 0.68 | 0.66 | 0.50 | 0.33 | 0.58 | — | [view](viewer/index.html#persian-safavid-civic-515225__gM2zJ54) |
| 31 | `persian-safavid-restaurant-29937` | `5KjWibB` | **0.574** | 0.74 | 0.43 | 0.50 | 0.67 | 0.42 | — | [view](viewer/index.html#persian-safavid-restaurant-29937__5KjWibB) |
| 32 | `high-gothic-university-576445` | `SmaM4Zj` | **0.570** | 0.68 | 0.72 | 0.54 | 0.20 | 0.58 | — | [view](viewer/index.html#high-gothic-university-576445__SmaM4Zj) |
| 33 | `anim-edo-japanese-editorial-7474` | `UGtRiv9` | **0.564** | 0.74 | 0.46 | 0.62 | 1.00 | 0.17 | 0.50 | [view](viewer/index.html#anim-edo-japanese-editorial-7474__UGtRiv9) |
| 34 | `high-gothic-museum-464910` | `FMkpa39` | **0.564** | 0.66 | 0.65 | 0.59 | 0.20 | 0.58 | — | [view](viewer/index.html#high-gothic-museum-464910__FMkpa39) |
| 35 | `high-gothic-museum-464910` | `QerxaZE` | **0.544** | 0.60 | 0.54 | 0.60 | 0.25 | 0.67 | — | [view](viewer/index.html#high-gothic-museum-464910__QerxaZE) |
| 36 | `persian-safavid-restaurant-29937` | `Vg2FVUd` | **0.540** | 0.72 | 0.43 | 0.54 | 0.25 | 0.58 | — | [view](viewer/index.html#persian-safavid-restaurant-29937__Vg2FVUd) |
| 37 | `persian-safavid-museum-635546` | `iNVPBJX` | **0.518** | 0.68 | 0.51 | 0.62 | 0.20 | 0.33 | — | [view](viewer/index.html#persian-safavid-museum-635546__iNVPBJX) |
| 38 | `anim-edo-japanese-university-335` | `5nHqGB7` | **0.512** | 0.76 | 0.12 | 0.70 | 1.00 | 0.67 | 0.47 | [view](viewer/index.html#anim-edo-japanese-university-335__5nHqGB7) |
| 39 | `roman-imperial-editorial-340853` | `nskHn4Q` | **0.503** | 0.74 | 0.12 | 0.64 | 0.67 | 0.92 | — | [view](viewer/index.html#roman-imperial-editorial-340853__nskHn4Q) |
| 40 | `persian-safavid-studio-55231` | `v537jFV` | **0.493** | 0.74 | 0.22 | 0.50 | 0.25 | 1.00 | — | [view](viewer/index.html#persian-safavid-studio-55231__v537jFV) |
| 41 | `dravidian-portfolio-237017` | `WETXdR3` | **0.475** | 0.59 | 0.35 | 0.53 | 0.29 | 0.50 | — | [view](viewer/index.html#dravidian-portfolio-237017__WETXdR3) |
| 42 | `dravidian-editorial-928086` | `ywkDpnA` | **0.464** | 0.49 | 0.67 | 0.61 | 0.08 | 0.58 | — | [view](viewer/index.html#dravidian-editorial-928086__ywkDpnA) |
| 43 | `anim-edo-japanese-university-335` | `uJmB8uu` | **0.449** | 0.77 | 0.06 | 0.66 | 0.67 | 0.83 | 0.51 | [view](viewer/index.html#anim-edo-japanese-university-335__uJmB8uu) |
| 44 | `dravidian-portfolio-237017` | `ybtZk6f` | **0.441** | 0.60 | 0.17 | 0.51 | 0.50 | 0.58 | — | [view](viewer/index.html#dravidian-portfolio-237017__ybtZk6f) |
| 45 | `high-gothic-university-576445` | `tM82F3Q` | **0.433** | 0.61 | 0.22 | 0.62 | 0.25 | 0.33 | — | [view](viewer/index.html#high-gothic-university-576445__tM82F3Q) |
| 46 | `anim-roman-imperial-portfolio-74` | `Lmiae7T` | **0.417** | 0.77 | 0.96 | 0.56 | 0.00 | 0.83 | 0.57 | [view](viewer/index.html#anim-roman-imperial-portfolio-74__Lmiae7T) |
| 47 | `roman-imperial-editorial-340853` | `VVfoZR2` | **0.396** | 0.75 | 0.03 | 0.57 | 1.00 | 0.92 | — | [view](viewer/index.html#roman-imperial-editorial-340853__VVfoZR2) |
| 48 | `anim-dravidian-civic-489417` | `NKTB8Ca` | **0.378** | 0.64 | 0.80 | 0.59 | 0.00 | 0.42 | 0.73 | [view](viewer/index.html#anim-dravidian-civic-489417__NKTB8Ca) |
| 49 | `roman-imperial-university-211040` | `8VfpK9h` | **0.366** | 0.70 | 0.03 | 0.63 | 0.50 | 0.92 | — | [view](viewer/index.html#roman-imperial-university-211040__8VfpK9h) |
| 50 | `roman-imperial-university-211040` | `q3Li8eS` | **0.352** | 0.75 | 0.03 | 0.63 | 0.25 | 0.83 | — | [view](viewer/index.html#roman-imperial-university-211040__q3Li8eS) |
| 51 | `roman-imperial-studio-768601` | `e5ZyCTZ` | **0.332** | 0.76 | 0.02 | 0.60 | 0.67 | 0.42 | — | [view](viewer/index.html#roman-imperial-studio-768601__e5ZyCTZ) |
| 52 | `dravidian-studio-595000` | `LjKJJFe` | **0.327** | 0.54 | 0.67 | 0.61 | 0.00 | 1.00 | — | [view](viewer/index.html#dravidian-studio-595000__LjKJJFe) |
| 53 | `roman-imperial-restaurant-170812` | `fLhvzo7` | **0.326** | 0.80 | 0.03 | 0.41 | 0.30 | 0.58 | — | [view](viewer/index.html#roman-imperial-restaurant-170812__fLhvzo7) |
| 54 | `anim-dravidian-civic-489417` | `vTVUDc3` | **0.304** | 0.63 | 0.21 | 0.52 | 0.00 | 0.58 | 0.75 | [view](viewer/index.html#anim-dravidian-civic-489417__vTVUDc3) |
| 55 | `anim-high-gothic-civic-597158` | `XEo6Zcz` | **0.286** | 0.76 | 0.18 | 0.51 | 0.00 | 0.25 | 0.67 | [view](viewer/index.html#anim-high-gothic-civic-597158__XEo6Zcz) |
| 56 | `persian-safavid-portfolio-610786` | `pZnhooe` | **0.282** | 0.79 | 0.18 | 0.54 | 0.00 | 0.92 | — | [view](viewer/index.html#persian-safavid-portfolio-610786__pZnhooe) |
| 57 | `dravidian-studio-595000` | `ZA6hiKi` | **0.247** | 0.54 | 0.68 | 0.52 | 0.00 | 0.08 | — | [view](viewer/index.html#dravidian-studio-595000__ZA6hiKi) |
| 58 | `anim-roman-imperial-portfolio-74` | `mFaoGeu` | **0.243** | 0.76 | 0.04 | 0.60 | 0.00 | 0.92 | 0.56 | [view](viewer/index.html#anim-roman-imperial-portfolio-74__mFaoGeu) |
| 59 | `roman-imperial-restaurant-170812` | `x9kKvei` | **0.153** | 0.80 | 0.02 | 0.45 | 0.00 | 0.17 | — | [view](viewer/index.html#roman-imperial-restaurant-170812__x9kKvei) |
| 60 | `dravidian-editorial-928086` | `thQhFXP` | **0.150** | 0.45 | 0.62 | 0.60 | 0.00 | 0.00 | — | [view](viewer/index.html#dravidian-editorial-928086__thQhFXP) |
