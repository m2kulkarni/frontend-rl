# Bonus 1 — Animations: design + plan

> *"Normal websites — can we also add animations to the website? How can you have some animations and judge the ability of the model to perfectly replicate these animations? You can pass in video recordings to the model alongside screenshots for this."* — the brief

This doc captures the full design before we touch code, in the same decision-log style as `design.md` / `generator.md` / `harbor.md`.

---

## 1 · The trial in one sentence

Extend the recipe so generated sites have **CSS-based loop animations**, give the agent **video recordings** as additional input alongside screenshots, and add an **animation rubric** to the composite grader so animation fidelity affects the reward signal.

## 2 · Scope decisions (locked at design time)

| | Decision | Why |
|---|---|---|
| 1 | **CSS-only animations** (no JavaScript). | Preserves the existing static-HTML constraint. The brief itself says functionality is out of scope; animations stay declarative. |
| 2 | **Loop animations only.** | A site has 1–3 ornamental elements that animate continuously. No scroll-triggered, no hover, no on-click. This makes both video capture and frame-level grading bounded and deterministic. |
| 3 | **One designated animation per page** (max). Some pages have none. | Keeps the agent's task tractable; keeps grading per-page comparable. |
| 4 | **Per-style animation vocabulary** in `motifs/<style>/animations.md`. | Each style's animations should match its aesthetic — wagara drift for Edo, slow rotation for Persian medallions, stained-glass color shimmer for Gothic, etc. |
| 5 | **Video format: WebM, 5 seconds, 30fps, viewport 1440×900.** | WebM is what Playwright outputs natively. 5 sec covers ≥1 loop for typical 2–4 sec animations. 30 fps × 5 sec = 150 frames; we don't need to grade every one (sample). |
| 6 | **`animated: bool` flag on `TaxonomyPoint`** — for now we keep it as a generator-side switch, not a sampled dimension. The bonus generates a fresh batch where every task has `animated=True`. | Simplest extension; doesn't muddy the existing static-task corpus. |

## 3 · Per-style animation vocabulary (sketch)

To be fleshed out in `motifs/<style>/animations.md`. Each entry: a name, a CSS keyframes pattern, and "what part of the site this typically applies to."

| Style | Vocabulary candidates |
|---|---|
| **Persian Safavid** | (a) slow rotation of a girih medallion (15s linear), (b) gold-leaf shimmer on borders, (c) breathing scale on the central seal |
| **Roman Imperial** | (a) hero-roundel slow fade in/out, (b) Greek-key border subtle glide (parallax-style horizontal drift), (c) torchlight flicker on a divider |
| **High Gothic** | (a) stained-glass color shimmer (cycle hue across rose-window panels), (b) fleur-de-lis pulse, (c) cross-flory rotate slowly |
| **Dravidian** | (a) lotus petals open/close, (b) gopuram silhouette tier slowly bouncing, (c) peacock-tail color cycle |
| **Edo Japanese** | (a) seigaiha wave drift (background-position animation on the wave pattern), (b) sakura petals falling, (c) ink-splash recur on a seal |

The generator's design-system pass picks one from the style's vocabulary at sample time and records the choice in `design-system.json` under a new `animation` key. The agent has to *infer* the animation from the video, not from any spec.

## 4 · Generator changes

### `taxonomy.py`
- `TaxonomyPoint` gets `animated: bool = False`. Default is False so existing flows are unchanged.
- New helper `sample_stratified_animated(n, ...)` that always sets `animated=True`.

### `generator/design_system.py`
- When `point.animated`, the prompt includes the per-style animation vocabulary and asks Claude to pick **one** animation pattern and identify which page element/role it applies to (e.g., `centerpiece_seal`).
- New schema field on the design-system JSON:
  ```json
  "animation": {
    "name": "girih-rotation",
    "applied_to": "centerpiece_seal",
    "duration_sec": 15,
    "easing": "linear",
    "iteration_count": "infinite",
    "description": "slow continuous rotation of the medallion"
  }
  ```

### `generator/page.py`
- Page prompt is told the animation spec when present.
- Required output behavior: emit the matching CSS `@keyframes` rule + apply it to the targeted element (or wrap the SVG with an animated container).

### Validation gate
- The generator validates that for `animated=True` tasks, the produced `design-system.css` contains at least one `@keyframes` rule. If not → discard & resample (matches existing discard-and-resample policy).

## 5 · Video recording

### `render.py`
- New function `record_task(task_dir, *, screenshots_dir, videos_dir)` that:
  1. Renders full-page screenshots (existing behavior — keeps static SSIM working as today).
  2. Records a 5-second video at viewport 1440×900 per page using Playwright's `record_video_dir` context option.
  3. Saves to `screenshots/page-N.png` (still) + `videos/page-N.webm` (new).

Playwright captures the visible viewport (1440×900), not full-page. That's a constraint of the API — we can't full-page-record. So the animation needs to be visible in the top viewport region, or we record multiple "scrolled" videos. Lean toward "animation is in the hero / first-fold area only" as a soft constraint in the generator prompt.

### Output directory layout (per task)
```
generated/<slug>/
├── design-system.json     (now includes the "animation" key)
├── design-system.css      (with @keyframes)
├── page-1.html ... page-N.html
├── screenshots/
│   ├── page-1.png         (canonical full-page; for the visual rubric)
│   ├── page-1-tile-K.png  (for the agent's vision API)
│   └── ...
└── videos/
    ├── page-1.webm        (5-sec, 1440×900, 30fps)
    └── ...
```

## 6 · Harbor packaging changes

`harbor_pack.py`:
- Copy `videos/` into the agent's environment under `/app/videos/` alongside `/app/screenshots/`.
- `instruction.md` template gets a new section explaining that video recordings exist at `/app/videos/page-N.webm` and **show the page after load**, including any animations the agent must reproduce. The agent can `Read` the videos via Claude Code's tool support (Claude Code can attach video to its messages? — TBD; if not, we provide pre-extracted frames as PNG sequences).

### Open question on agent video access
Anthropic's vision API supports static images, not video. Claude Code's typical input is via tool calls (`Read` returns text/images). Three options:
- **(a) Extract video → frame sequence** at server side, deliver as `videos/page-N/frame-001.png ... frame-150.png`. The agent pages through frames using Read.
- **(b) Use Anthropic's video-input feature** if it exists (or has shipped in 2026).
- **(c) Ship the .webm + a hint that the agent should poll periodically** — but the agent has no way to actually decode video.

**Lean toward (a)** — extract every Nth frame (say every 5th = 30 frames per 5-sec clip) and put them in `videos/page-N/`. Predictable, debuggable, no agent-side video machinery. The grader uses the original .webm.

## 7 · Animation rubric

New file: `src/proximal_env/rubric/animation.py`.

Two sub-signals combined:

### A — Frame-SSIM over time
- Extract M frames from both videos at the **same timestamps** (say, every 0.25s → 20 frames over 5s).
- Compute SSIM per frame between GT and candidate (resize to common shape if needed).
- Score = mean SSIM across M frames.
- Captures: "do the two animations look the same at each moment?"
- Limitation: temporal misalignment penalizes everything. We mitigate by either (a) accepting the penalty or (b) doing a small temporal-shift search over ±0.5s and taking the best alignment.

### B — `@keyframes` parse similarity
- Extract `@keyframes <name> { ... }` blocks from both `design-system.css` (and any other CSS the candidate ships).
- For each keyframes block: extract a fingerprint = (animated_property, from→to value pair, duration if findable, easing if findable).
- Compute Jaccard on the set of fingerprints.
- Captures: "did the candidate use the same kind of animation, regardless of *which* element gets it?"
- Cheap, deterministic, doesn't need video processing.

### Composite
```
animation = 0.7 * frame_ssim + 0.3 * keyframes_jaccard
```

(Weights tunable later via calibration.)

### Validation protocol
Same as other rubrics:
- `score(gt, gt) ≥ 0.95` (identity)
- `score(gt, "agent-static-only-output") < 0.5` (sanity: an agent that produces no animation should score poorly)
- `score(gt, agent_real_attempt) < 0.95` (discrimination)

## 8 · Composite grader update

`grader.py`:
- Add `"animation"` key to `WEIGHTS`.
- For `animated=True` tasks, animation is part of the geometric mean.
- For `animated=False` tasks (existing tasks), animation is absent from the dict (or set to a neutral 1.0 — TBD; lean toward "absent" so the geometric mean averages over fewer keys).

The `animated` flag must be communicated to the verifier. Cleanest path: include it as a metadata field in `task.toml` (`metadata.animated = true/false`), and the bundled grader reads it.

## 9 · Implementation stages

| Stage | What | Hours |
|---|---|---|
| 1 | Write `motifs/<style>/animations.md` (5 files) | 1 |
| 2 | `TaxonomyPoint.animated` + design-system pass updates | 2 |
| 3 | Page generator emits `@keyframes` | 1 |
| 4 | `render.py.record_task` (video recording + frame extraction) | 2 |
| 5 | `harbor_pack.py` copies videos + frames + updates instruction template | 1 |
| 6 | `rubric/animation.py` (frame-SSIM + keyframes parse) | 3 |
| 7 | `grader.py` composes animation into the overall | 1 |
| 8 | End-to-end test: generate 1 animated task, validate rubric, run on Modal | 2 |
| | **Total** | **~13** |

This is a real day-and-a-half of focused work. Stages can overlap — 1+2+3 in parallel with 4+5 in parallel with 6 — but realistically I'd do them in order so each can be validated before the next.

## 10 · Out of scope (and why)

- **Hover / scroll-triggered animations.** Those require user interaction OR JS for IntersectionObserver. We're CSS-loop only.
- **3D/WebGL animations.** Heavy, browser-specific, hard to grade.
- **Animation easing inference from video alone.** The frame-SSIM rubric implicitly captures easing via the per-frame match; we don't try to *parse* the easing curve from pixels.
- **Per-element keyframe matching by ID.** Element-level alignment would need DOM matching which is fragile across different agent implementations. We compare *animation vocabulary* (Jaccard on @keyframes signatures), not *element-to-animation mapping*.
- **Animation-only tasks.** Every animated task still has the existing 5-rubric grading layer; the animation rubric is *additive*, not replacement.

## 11 · Open questions for the user (lock before coding)

1. **Generate a fresh animated batch, or upgrade existing tasks to be animated?** Lean toward fresh — keeps the static eval data clean.
2. **How many animated tasks for the bonus?** 5 (one per style) is the minimum credible delivery. 10 (matches Part 1) would be nicer.
3. **Frame-extraction count for the agent.** 30 frames per page (every 5th frame of 150) is my default. More frames = better resolution but more agent input volume and bigger images.
4. **Video grading: temporal alignment search?** My default: no alignment search (penalize timing offsets). Could add ±0.5s alignment search if pre-flight shows real candidates time-shift consistently.
5. **Animation in instruction.md: how prescriptive?** Same dial as before — point at the per-style animation vocabulary (analogous to the font menu)? Or just "match what you see"? Lean toward menu-driven for the harness.

## 12 · Risk / what could go wrong

- **Playwright video recording on Modal**: untested in our pipeline. May need additional flags or a different image. Stage 4 catches this.
- **Frame extraction tool**: Playwright produces WebM; we'd need ffmpeg or similar to extract frames. Adds a dep + Dockerfile change.
- **Anthropic vision token cost** balloons if we ship 30 frames × 6 pages = 180 frames per task to the agent. ~10× current visual input. Cost climbs.
- **Animations don't add much eval signal** if all agents produce ~similar-looking animations. The bonus rubric becomes uninformative. Calibration set could surface this.
