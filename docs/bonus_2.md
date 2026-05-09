# Bonus 2 — Multi-framework support (Tier A: React + Vite)

## Goal

Extend the env from "agent must reproduce a design in static HTML+CSS" to
"agent must reproduce a design in a specific frontend framework." Tier A is
a focused proof of concept: **add React (with Vite) as a second framework
alongside the existing vanilla pipeline.** Decide based on Tier A's scores
whether to expand to Vue / Svelte (Tier B).

Why narrow:
- The hard work is the build step inside the verifier, not the framework
  count. Solving it once for React de-risks every subsequent framework.
- We get a clean A/B comparison: same task design rendered as vanilla vs
  React, see whether agent score changes meaningfully when the framework
  changes. That's a real signal Tier B would only refine, not unlock.
- Faster to ship; cheaper to eval. ~$300, ~1.5 days work.

## Architectural changes per layer

### Taxonomy
- Add `Framework = Literal["vanilla", "react"]`.
- Add `framework: Framework` to `TaxonomyPoint`.
- Slug includes the framework when non-vanilla: `react-edo-japanese-studio-12345`
  (vanilla keeps existing format for backward compat).
- `sample_stratified()` rotates the `framework` axis the same way it
  rotates `variant` — guarantees coverage in batch 1.

### Generator
- `design_system.py` is **unchanged**. Palette + fonts + motif assignment
  + page briefs + shared nav/footer HTML are framework-agnostic.
- `page.py` forks: dispatch on `point.framework`. Vanilla → existing prompt.
  React → new prompt that asks for JSX components + a Vite project layout.
- React output shape (per task):
  ```
  generated/<slug>/
    design-system.json          # unchanged — same shape
    design-system.css           # unchanged — Vite copies it via main.tsx
    package.json                # vite + react + react-dom; pinned versions
    vite.config.ts
    tsconfig.json               # minimal, allow-jsx
    index.html                  # mount point only — <div id="root">
    src/
      main.tsx                  # entry; imports App + global CSS
      App.tsx                   # router shell — picks the page by URL hash or path
      pages/
        Page1.tsx ... Page6.tsx # one component per page
      shared/
        Nav.tsx                 # the verbatim shared nav, as a component
        Footer.tsx              # ditto
        Motif.tsx               # `<Motif name="..." />` — replaced server-side
  ```
- `inline_motif_imgs()` becomes `inline_motifs(html_or_jsx, library, framework)`:
  - vanilla: replace `<img src="motifs/X.svg">` with verbatim SVG body (existing).
  - react: replace `<Motif name="X" class="..." />` with a JSX expression that
    inlines the SVG body via `dangerouslySetInnerHTML` or — cleaner — emits the
    SVG body as JSX directly.
- All page-LLM calls run in parallel like vanilla; total task time similar.

### Render
- For vanilla, `render_task()` opens `page-N.html` directly via `file://`.
- For React, `render_task()` runs **`npm run build`** first, then opens
  `dist/index.html#/page-1` (or routes to each page). Build adds 20–60s
  the first time per task; subsequent renders within the same Python
  process can keep `dist/` cached.
- `record_task()` (animated) works the same way — same build, then record
  frames against the built output.
- Build failure handling: if `npm run build` returns non-zero, render
  produces a flag screenshot (a 1440×900 red error PNG) and the rubrics
  score it normally. Visual SSIM = ~0, palette = ~0, etc. The reward
  signal is "task failed to build" without crashing the grader.

### Harbor packaging
- `harbor_pack.py` per-framework Dockerfile templates:
  - **vanilla:** existing — `mcr.microsoft.com/playwright/python:v1.59.0-noble`.
  - **react:** new — same base + Node 20 + a pre-cached `node_modules` for the
    pinned package.json (run `npm ci` at image-build time, not trial time).
    The agent's `package.json` MUST be lockfile-compatible with our pinned
    one — agent gets the lockfile in instruction.md as a constraint.
- Per-task `tests/test.sh` for React:
  ```sh
  cd /app/output && npm run build > /logs/agent/build.log 2>&1
  python3 /tests/grader/render_react_built.py /app/output/dist /logs/agent/render
  python3 /tests/grader/run_grader.py /tests/ground_truth /logs/agent/render
  ```
  (current vanilla flow stays simple — no extra build step.)
- `instruction.md` per-framework template — explains the project layout,
  the build command, the constraints (must use these exact dependency
  versions; output goes to `/app/output`).

### Grader
- **No rubric logic changes.** All rubrics already work on rendered output:
  - visual / palette / animation operate on screenshots — framework-agnostic.
  - structural runs on rendered HTML (extract DOM from built `dist/index.html`),
    NOT on the JSX source. Same Jaccard, same logic.
  - typography parses CSS — extract `dist/assets/*.css` instead of `*.html`'s
    inline `<style>`. Selector-grounded matching unchanged.
  - consistency runs on the rendered HTML output of all 6 routes.
  - coverage gates on substantive content per route.
- **Render-to-HTML happens before grading**, so the rubrics never see JSX.
  This is what makes "framework-agnostic grading" actually work.

## Concrete implementation steps

In rough sequence, each step gates the next:

**Step 1 — Taxonomy + slug change** (~30 min)
- Add `Framework` literal + `framework: Framework = "vanilla"` field.
- Update `slug()` to prepend `react-` only when non-vanilla.
- Update `sample_stratified` to cycle framework.
- Smoke test: `sample_stratified(8, rng_seed=42)` covers both frameworks.

**Step 2 — React page-LLM prompt** (~3 hours)
- Hand-write the React page-LLM prompt template.
- Add a fork in `generator/page.py:generate_page` based on `point.framework`.
- Output the file structure (App.tsx, pages/PageN.tsx, etc.) — emit each
  file as a separate fenced block in the LLM response, parse server-side.
- Reuse the design-system pass output verbatim (same JSON, same shared HTML
  rendered as JSX components rather than HTML strings).

**Step 3 — One end-to-end React task, hand-validated** (~2 hours)
- Generate one `react-edo-japanese-studio-X` task locally.
- Run `npm install && npm run build && open dist/index.html` manually.
- Verify it visually matches a vanilla version of the same `(style, variant,
  purpose, seed)` point.
- Iterate on the prompt until it produces a valid build on the first try.

**Step 4 — Render integration** (~3 hours)
- Add `_render_built_react(task_dir)` to `render.py` that:
  - shells out to `npm run build` in `task_dir`
  - opens each route in Playwright via `dist/index.html#/page-N`
  - falls back to a red error PNG on build failure
- Wire it into `render_task` based on a `framework` arg or a sentinel file
  (`package.json` exists → react path).

**Step 5 — Harbor package + Dockerfile** (~3 hours)
- New `DOCKERFILE_REACT_TEMPLATE` in `harbor_pack.py`.
- Pre-cache `node_modules` at image-build time (RUN npm ci against a stub
  package.json with our pinned deps).
- Update `tests/test.sh` per framework: build, render, grade.
- Smoke test: `harbor run -k 1 -n 1` on Modal against one React task.

**Step 6 — React-specific instruction.md** (~1 hour)
- Tell the agent the project skeleton, allowed dependencies, build command,
  output location.
- Provide an example component as a hint (the Motif component pattern).

**Step 7 — Validation: 5 React tasks** (~30 min wall, ~$50 generation)
- Generate 5 React tasks, mixed across styles + variants.
- Render + render manually verify they look right.
- Eval claude-code on all 5 (k=2): ~25 min, ~$150.
- Compare scores to vanilla counterparts of similar (style × variant ×
  purpose) cells.

**Step 8 — Decide: ship Tier A or expand to Tier B**
- If React scores look sane (mean overall in same 0.4–0.7 range as vanilla,
  no systemic build failures), ship. Write up findings.
- If they don't, debug. Common likely failures listed below.

## Cost / time estimate

| Item | Time | Cost |
|---|---|---|
| Taxonomy + slug | 30 min | $0 |
| React page-LLM prompt | 3 h | <$5 (prompt iteration) |
| End-to-end one task | 2 h | <$5 |
| Render integration | 3 h | $0 |
| Harbor pack + Docker | 3 h | $0 (image build is free) |
| Instruction.md | 1 h | $0 |
| Generate 5 React tasks | 30 min | ~$50 |
| Eval 5 × 2 = 10 trials | ~25 min | ~$150 |
| Report + commit | 1 h | $0 |
| **Total** | **~14 hours** | **~$200** |

## Risks I'd flag now

1. **Cold-build cost is the biggest unknown.** Vite's first build pulls and
   compiles 200+ MB of `node_modules`. Modal cold-starts can stretch this
   to 60–90s per trial. Mitigation: bake `node_modules` into the Docker
   image (`RUN npm ci` at image-build time, against a pinned lockfile). Adds
   ~250 MB to the image but saves 60s per trial — easy trade.

2. **Agent build failures = all-zero rewards.** If Claude writes JSX with
   a typo, `npm run build` errors, no render, all rubrics score 0. This is
   technically correct (the task wasn't completed) but it's a different
   *kind* of failure than "agent's design looks wrong." For RL, you'd want
   to differentiate. Two-line fix: emit a `build_succeeded: 0/1` field in
   reward.json so the report can split scores by build success.

3. **Lockfile drift.** Our pre-cached `node_modules` is built against our
   pinned `package.json`. If the agent edits `package.json` (adds a dep,
   changes a version), the cache is stale and `npm ci` will fail. Choices:
   (a) forbid `package.json` edits in instruction.md — least flexible but
   simplest, (b) re-run `npm install` per trial if the lockfile changed —
   slow but works.

4. **JSX-source vs rendered-HTML rubric mismatch.** Structural runs on
   rendered HTML, but rendered HTML from React often has different DOM
   shape than vanilla (extra wrapper divs, hydration markers, etc.). GT
   and agent are both React, so they share this distortion — but
   *cross-framework* comparisons (vanilla GT vs React agent) would be
   unfair. We never do that comparison; both sides of the grader are
   always the same framework. Sanity-check this is true.

5. **Routing.** React-Router vs hash-routing vs static-build-per-page —
   each has different render semantics. Pin one upfront. **Recommendation:**
   simple hash routing in `App.tsx`. Vite builds a single SPA; we open
   `dist/index.html#/page-1`, `#/page-2`, etc. in Playwright. Equivalent
   to the vanilla "page-N.html" world but through one bundle.

## Out-of-scope for Tier A

- Vue, Svelte, Next.js, Astro, Nuxt — Tier B.
- Server-side rendering (Next.js, Remix) — Tier C if ever.
- Per-framework AST diff for the structural rubric — punt; rendered-HTML
  Jaccard is fine.
- Cross-framework comparison ("can the same task be solved in any
  framework?") — interesting but not the Tier A question.
- Running the *full* 30+ task eval with both frameworks at full scale.
  After Tier A: if React behaves well, the next step is regenerating 30
  tasks split 15 vanilla + 15 React, rerun the 60-trial eval. That's the
  10×10 conversation, not Tier A.

## What "done" looks like

- `taxonomy.py`, `generator/page.py`, `render.py`, `harbor_pack.py` all
  recognize `framework="react"` paths.
- 5 React tasks live in `generated/`, screenshots render.
- One claude-code trial succeeds end-to-end on Modal (build + render +
  grade).
- 10-trial mini-eval (5 React tasks × 2 attempts) lands in `jobs/`.
- A short addendum in `docs/eval_report.md` (or a new
  `docs/bonus_2_results.md`) compares React scores to vanilla baseline.
- README "Latest eval" or "Bonus 2 results" subsection added.
- All committed, branch ready to merge to `main` after review.
