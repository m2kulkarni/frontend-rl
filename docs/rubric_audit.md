# Rubric audit: reward hacks + decomposition plan

This doc captures the work needed to turn the current grader from an **eval
harness** into something safe to use as an **RL training signal**. Two
themes:

1. **Reward hacks** — for each rubric, what's the cheapest way an adversarial
   agent could maximize the score *without doing the task*? Each is a hole
   in the env that policy gradient will find and exploit.
2. **Decomposition** — replace the geometric-mean composite with independent
   reward streams. Geomean was right for human-readable single scores but
   flattens gradient per-axis; for RL, each rubric should expose its own
   signal.

Skipping per-step / process rewards and curriculum sampling — separate
projects, lower priority for the env's correctness.

---

## Per-rubric audit

### `coverage.py`

**Measures:** Fraction of expected `page-N.html` files the agent produced
(`len(found) / len(expected)`).

**Hack:** Emit 6 empty (or near-empty) `page-N.html` files. They count as
"produced." Coverage = 1.0.

**Why this matters:** Coverage is currently a multiplicative gate on the
composite. An adversary who emits 6 stub pages and lets the per-page rubrics
score what they will gets full coverage credit while doing nothing.

**Fix:** Require each page to pass a minimum-content check before counting.
Concrete:
- HTML must parse without errors (`bs4` doesn't raise).
- DOM has a non-trivial `<body>` (e.g., ≥10 distinct tags within it).
- Total visible-text length ≥ some floor (e.g., 200 chars).

A page that fails any of these contributes 0 to coverage. Counter remains
in [0, 1].

**LOC:** ~20.

---

### `visual.py`

**Measures:** Multi-channel SSIM between agent's rendered screenshots and
GT's rendered screenshots, page-by-page, mean across pages.

**Hacks:**
- *Single-page clone:* render one page, copy that screenshot to all 6
  output slots. Per-page comparison defeats this naturally — page-1 vs
  page-1 might score high, but page-2..6 against a copy of page-1 will
  score low. **Already mitigated.**
- *Aggressive blur:* output a blurred version of each GT (which the agent
  doesn't have, but a sufficiently smart prior could approximate). SSIM is
  somewhat blur-tolerant but not catastrophically so. Low risk.
- *Dominant-color page:* output a flat-color page in roughly the GT's mean
  color. SSIM falls hard on the gradient/structure axis even when intensity
  matches. **Already mitigated** by SSIM's structural component.

**Verdict:** Visual is the primary outcome reward and is reasonably
hack-resistant. **No code change** but verify with adversarial test (see
"adversarial test pass" section below).

---

### `palette.py`

**Measures:** CIE Lab 3D histogram intersection on the agent's *rendered
screenshot* vs GT's rendered screenshot, mean across pages.

**Hacks:**
- *Hidden-div color dump:* place a `<div style="display:none">` containing
  every GT color. **Mitigated already** — palette grades rendered pixels,
  not HTML. `display:none` doesn't render.
- *Color swatch grid:* emit a visible grid of 1×1 px squares, one per GT
  palette color. Histogram nails the GT distribution. Visually nothing else
  on the page works. **Real hack.** With independent reward streams the
  agent could max palette while bombing visual — and unless we explicitly
  test the joint, an RL policy that learns "paint a swatch grid in the
  corner" gets free palette reward.
- *Tiny corner swatches:* same as above but small enough to barely affect
  visual SSIM. Real hack.

**Fix:** Score palette only on pixels that *also pass a visual-relevance
filter* — drop pixels in regions with extreme uniformity (1×1 grids), drop
pixels in tiny isolated color blobs, or weight pixels by their "structural
significance" (e.g., L* gradient magnitude). Simpler version: require pixel
patches of a minimum spatial extent (e.g., 8×8) to contribute to the
histogram, suppressing the tiny-swatch hack.

**Even simpler fix:** require pixel contributing to be inside an
"information-dense" region — discard the bottom & top decile of L*
variance regions (which tend to be flat backgrounds OR swatch grids).

**LOC:** ~30 to add a region-extent filter.

---

### `structural.py`

**Measures:** DOM tag bag-of-tags Jaccard. Counts every `<div>`, `<header>`,
`<nav>`, `<a>`, etc. anywhere in the parsed DOM. Multiset Jaccard against
GT.

**Hacks:**
- *Hidden-DOM tag stuffing:* emit a `<div style="display:none">` packed
  with every GT tag (deeply nested if needed). Tag bag matches; nothing
  rendered. **Real hack.**
- *Head-stuffing:* place tags in `<head>` or in `<noscript>`. They count
  but don't render. **Real hack** (currently the multiset walks the whole
  tree, including head).
- *Comment-driven tags:* `<!-- <div><nav>...</nav></div> -->` — these are
  parsed as comments by lxml, so this *doesn't* hack. Already mitigated.

**Fix:** Two-part.
1. *Restrict to `<body>`*: the walk should start at `<body>`, not at root.
   Tags in `<head>` shouldn't count. **5-line fix.**
2. *Visible-only filter*: skip subtrees whose ancestor has `style=
   "display:none"` or `visibility:hidden`. Need to either parse `<style>`
   blocks (heavy) or do a lightweight check on inline `style=` attributes
   only — which is what most agents would use to hide tags. **15-line
   fix** for inline-style only.

**LOC:** ~20.

---

### `typography.py`

**Measures:** Per page, two Jaccard sets (font-family declarations + Google
Fonts URL family params). Mean across pages.

**Hacks:**
- *Font-family stuffing:* `font-family: "Cinzel", "Lora", "Playfair", ...
  every-font-on-the-curated-list, serif;`. Set covers GT's primary choice
  by inclusion. **Real hack** (current code only takes the *primary* of
  the family stack though, which is the "first comma-separated entry").
- *Google Fonts URL stuffing:* request every font in the curated list via
  one big `<link>`. Set membership trivially holds. **Real hack.**
- *Declare-but-don't-use:* declare `font-family: "Cinzel"` somewhere in
  a CSS file but never apply it to any rendered text. Set membership
  passes; visual typography is wrong. **Real hack.**

**Fix:** Restrict the set to fonts that are *actually applied to a
visible text-bearing element*. Concrete:
1. Parse the CSS (inline + linked same-dir) to build selector → fonts.
2. For each text-bearing tag in the DOM (`<p>`, `<h1>..h6>`, `<span>`,
   `<a>`, `<li>`, etc.), resolve the cascade to a single font-family stack.
3. Score on the union of "primary applied fonts." Compare GT's vs cand's.

This is a real cascade-resolution exercise; cheaper proxy:
1. Walk `<style>` and linked CSS for `font-family` declarations along with
   their selectors.
2. For each declaration, emit (font-family-primary, selector). Skip if
   selector is overly generic (`*`, `body { font-family: ... }` is OK,
   `body div { font-family: "X" }` is a usage).
3. Match on (font, has-real-selector) tuples. Pure declarations without
   matching elements in DOM don't count.

This eliminates the "declare-but-don't-use" hack and the "stuff every font
into one big stack" hack (since each gets only one selector hit).

For full cascade resolution: render the page in Playwright and use
`window.getComputedStyle(el).fontFamily` for each text node. Heavy but
unambiguous. **Punt** for v1.

Independent of the hack-fixing, the *signal quality* of typography is
weak — see `docs/typography_improvements.md` (TODO). At minimum:
- Match against the *entire* font-family stack, not just primary.
- Style-cluster credit: if cand's font is in the GT's architectural-style
  pairings (loaded from `motifs/<style>/fonts.toml`), award partial credit
  even when not the exact GT pick.

**LOC:** ~50 for hack-fix + cluster credit, no rendering.

---

### `animation.py`

**Measures:** For animated tasks only.
1. **Frame-SSIM**: render N frames over 5s of agent's rendered page, compare
   against GT's frame sequence per-frame, mean.
2. **@keyframes Jaccard**: parse all `@keyframes` blocks in agent's CSS,
   compute multiset Jaccard against GT's keyframes property-set fingerprints.

Composite: 0.7 × frame-SSIM + 0.3 × keyframes-Jaccard.

**Hacks:**
- *Empty @keyframes:* declare `@keyframes spin { from {} to {} }` — Jaccard
  passes structurally. Frame-SSIM should catch the no-motion case. **Partial
  hack** — Jaccard contributes 0.3.
- *Apply-but-no-class:* declare GT's `@keyframes` verbatim but never apply
  the class. Jaccard nails it; frame-SSIM is flat (no motion). Net: agent
  gets 0.3 × 1 = 0.3 free. **Real hack.**
- *Animate invisible element:* attach the animation class to a
  `display:none` or 0×0 wrapper. Frame-SSIM is flat; Jaccard passes. **Real
  hack.**

**Fix:** Both keyframes-Jaccard and frame-SSIM should require **detected
motion in the rendered output**. Concrete:
1. Compute pixelwise frame-to-frame delta on agent's rendering. If max
   delta < threshold, set animation score to 0 regardless of Jaccard.
2. This makes frame-SSIM the *gating* signal — Jaccard is only a quality
   modifier.

Equivalent formulation: `score = (motion_detected) × (0.7 × frame-SSIM +
0.3 × keyframes-Jaccard)`. Boolean gate prevents the no-motion hack.

**LOC:** ~15.

---

### `consistency.py`

**Measures:** Hash-equality of `<header>` blocks across the candidate's 6
pages, and same for `<footer>`. Score = (modal-hash-count / page-count)
averaged over header and footer.

**Hacks:**
- *Six identical pages:* output the same HTML for every `page-N.html`.
  Headers AND footers match across pages because the *whole page* matches.
  Score = 1.0. Visual SSIM also probably bombs because each page-N has
  unique GT content, but consistency in isolation is gamed completely.
  **Worst hack in the env.** A model trained against this rubric will
  collapse to "always emit one canonical page."

**Fix:** Add an **inter-page diversity check** that pairs with consistency.
Concrete: extract main-content of each page (everything outside `<header>`/
`<footer>`/`<nav>`) and compute pairwise *dissimilarity* across pages. If
all main-contents are nearly identical, the consistency bonus is voided.

Mathematically:
```
header_consistency = (modal-hash-count / page-count)  # current
diversity = mean pairwise main-content edit-distance / max-edit-distance
final_consistency = header_consistency × diversity
```

Diversity ≈ 1 when pages have distinct content (which the GT does);
diversity ≈ 0 when all 6 pages are clones. The 6-clone hack scores 0 even
though headers/footers all "match."

**LOC:** ~30.

Optional second guard: require headers/footers to be a *bounded fraction*
of total page content (e.g., header should be ≤30% of total token count).
A page that's 99% header trivially matches across pages.

---

## Drop the geomean — independent reward streams

### Current behavior

`grader.py:51` computes weighted geometric mean of {visual, palette,
structural, typography, animation, consistency} → multiplies by coverage
gate → emits `overall`. This is the single-number summary and the value
Harbor logs as "the reward."

### Why drop it

- Geomean *flattens gradient*: if visual is 0.4 and structural is 0.9, the
  partial derivative w.r.t. structural is tiny — RL policy learns to ignore
  structural and only optimize visual.
- A single number hides which axis is failing. For RL credit assignment we
  want each axis exposed.
- Geomean is sensitive to the floor: when one rubric near-zero, the whole
  composite collapses. Typography (currently ~0.1) is the canonical
  example — every agent gets a 21% flat haircut on the composite from a
  rubric that isn't even discriminating.
- Coverage gate is *multiplicative*; a missed page kills the composite
  more than the agent earned by improving any single axis. Discontinuous
  reward landscape.

### What to do instead

`reward.json` schema becomes a **set of independent streams**:

```json
{
  "visual": 0.74,         // primary outcome — what the eval should care about
  "palette": 0.81,
  "structural": 0.62,
  "typography": 0.18,
  "animation": 0.55,      // animated tasks only
  "consistency": 1.00,
  "coverage": 0.83,       // expressed in [0,1] not as a multiplicative gate
  // For human reporting (not used in training):
  "overall_geomean": 0.61 // optional, for backward compat with the visualizer
}
```

For Harbor's required scalar reward, use `visual` directly — it's the most
faithful "did the agent solve the task" signal. Other streams are auxiliary
heads.

For RL training, the model would receive:
- **Outcome reward**: visual_SSIM (weight α, large).
- **Auxiliary rewards**: each independent rubric (weight β, small, possibly
  annealed during training).
- **Penalty rewards**: hack-detection violations (weight γ, large negative).

We don't implement multi-objective RL here — we just ensure the env *emits*
the streams cleanly. Training-side weighting is a separate concern.

### Code changes

1. `grader.py`: keep computing all rubric scores. Stop computing the geomean
   product. Always emit every score (including animation if available, else
   omit). Add `overall_geomean` for backward-compat with the visualizer
   (optional — the visualizer can switch to using `visual` as the headline).
2. `harbor_pack.py` test.sh fallback: needs to emit the same shape (the
   audit caught this drift already).
3. `scripts/build_visualizer.py`: read each rubric score directly, plot
   each as its own column. Drop the "overall" headline if we drop geomean
   entirely.

**LOC:** ~50 across all three files.

---

## Adversarial test pass

After the per-rubric fixes are implemented, add `tests/adversarial.py` (or
extend `scripts/validate_rubric.py`) with 5–10 hand-built lazy adversaries:

| Adversary | Should score low on |
|---|---|
| 6-clone page (identical HTML repeated) | consistency, visual, structural |
| Swatch-grid page (every GT color, nothing else) | visual, structural; palette acceptable |
| Hidden-tag-stuffed page | structural |
| Font-stack stuffer (every font listed) | typography |
| Empty-page coverage (6 stub HTMLs) | coverage, visual, all axes |
| Empty-keyframes (declares but doesn't animate) | animation |
| Display-none animation target | animation |

Each adversary should produce ≤ 0.2 on its target rubric. If any scores
> 0.5, that rubric still has a hack. This becomes a regression test.

---

## Implementation priority

Ordered by impact × cost:

1. **Drop geomean / decompose reward streams** (50 LOC, no rubric logic
   changes needed). High value: exposes per-axis signal. Lowest risk.
2. **Consistency × diversity gate** (30 LOC). Critical: prevents the
   "clone all pages" collapse, the worst hack we have.
3. **Structural visibility filter** (20 LOC). Closes hidden-tag hack.
4. **Coverage minimum-content gate** (20 LOC). Closes empty-page hack.
5. **Animation motion gate** (15 LOC). Closes empty-keyframes hack.
6. **Typography selector-grounded matching** (50 LOC). Closes font-stuffer
   hack and improves signal quality.
7. **Palette region-extent filter** (30 LOC). Closes swatch-grid hack.
8. **Adversarial test pass** (~100 LOC, new file). Regression suite.

Total: ~300 LOC across rubrics + tests. ~1 day of focused work.
