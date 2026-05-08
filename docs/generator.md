# Generator pipeline — design

Status: design only. No implementation in this doc.

This doc covers: how a single (architectural_style, variant, site_purpose, seed) configuration becomes a complete Harbor task on disk. It does not cover the grader (separate doc), nor task selection / curation for the final 10-task deliverable.

---

## 1. What the generator must produce

For each generated task, the directory layout (locked from `docs/harbor.md`):

```
tasks/<style>-<purpose>-<seed>/
├── task.toml
├── instruction.md
├── README.md
├── environment/
│   └── Dockerfile
├── screenshots/                  # input the AGENT sees (N ∈ {5,6,7})
│   ├── page-1.png
│   ├── ...
│   └── page-N.png
├── ground_truth/                 # used only by the grader, never seen by the agent
│   ├── design-system.css
│   ├── page-1.html
│   ├── ...
│   └── page-N.html
├── tests/
│   ├── test.sh
│   └── grader/                   # shared grader code, copied in
└── solution/
    └── solve.sh                  # copies ground_truth/ → agent output dir (oracle baseline)
```

Pages link to each other — `<a href="page-3.html">` etc. — so each generated site reads as a real navigable thing, even though the grader doesn't score functionality.

**Two artifacts in particular matter most for quality:**
- `screenshots/page-*.png` — what the agent sees. If these don't read clearly as <style>, the task is broken.
- `ground_truth/*.html|css` — what the grader compares against. Must render deterministically.

## 2. Guiding principles

- **Multi-page coherence is the hard part.** A naive 5-page generation produces "five sites in a trench coat." We prevent that by generating a *design system* once, then generating each page against that locked design system.
- **The motif library does the heavy aesthetic lifting.** The LLM composes; it does not invent geometry from scratch. Every architectural-style commitment is anchored in the per-style `palette.toml` + `fonts.toml` + `notes.md` + selected SVG motifs.
- **Each task is independent and parallelizable.** Modal-backed fan-out is the natural execution model.
- **Discard, don't retry.** A failed validation rejects the whole task and resamples. Simpler than per-page retry loops; cheap because budget is unconstrained.

## 3. Architecture — the four stages

```
┌─────────────┐    ┌──────────────────┐    ┌─────────────────┐    ┌────────────┐
│ taxonomy    │ →  │ design system    │ →  │ page generation │ →  │ render +   │
│ sample      │    │ generation       │    │ (5 in parallel) │    │ validate   │
│ (CPU)       │    │ (1 LLM call)     │    │ (5 LLM calls)   │    │ (Playwright)│
└─────────────┘    └──────────────────┘    └─────────────────┘    └────────────┘
                                                                         │
                                                                         ▼
                                                                  ┌────────────┐
                                                                  │ Harbor     │
                                                                  │ packaging  │
                                                                  └────────────┘
```

Total: **6 LLM calls per task** (1 design-system + 5 page implementations). Page calls fan out, so wall-clock latency is roughly two LLM calls.

### Why 1+5 instead of 1 mega-call

- **Coherence.** A single mega-prompt asking for 5 HTML files lets the model drift: page 4 forgets the palette decided in page 1. Explicit design-system locking prevents drift.
- **Output budget.** 5 HTML files of moderate complexity exceeds comfortable single-call output. Splitting halves the per-call output and improves quality at depth.
- **Parallelism.** Page calls fan out; latency improves.
- **Failure isolation.** If page 3 fails to validate, we know which page; we can resample just that page (or the whole task) cleanly.

### Why not 7+ calls (separate "outline" pass)

We considered a three-pass version (design system → outline → pages). Rejected: the design-system pass already produces enough page-level brief inline. Adding a separate outline call adds latency and an extra failure point without adding much coherence value.

## 4. Stage 1 — Taxonomy sampling

The taxonomy:

```
architectural_style ∈ {persian-safavid, roman-imperial, high-gothic, dravidian, edo-japanese}   (5)
variant             ∈ {period_faithful, modern}                                                  (2)
site_purpose        ∈ {museum, university, restaurant, studio, editorial,
                       portfolio, civic, foundation}                                             (8)
```

Cardinality: 5 × 2 × 8 = **80 base configurations**, then a free-running seed for within-cell variation.

**Sampler modes:**
- `stratified(N)` — for the 10-task deliverable: ensure every architectural_style appears ≥ 1, vary site_purpose, mix both variants. The sampler picks N points to maximize coverage across the three dimensions.
- `random(N, seed)` — for scaling beyond the curated 10 (training data, calibration set, etc.).

**Why stratified for the 10:** the report is the deliverable. It needs to *look diverse*. Random sampling of 10 from 80 has a meaningful chance of duplicating a (style, purpose) cell — bad optics.

The seed is propagated through every downstream LLM call (passed as `seed` parameter) for reproducibility.

## 5. Stage 2 — Design system generation

**One LLM call.** Output: a JSON object that locks every cross-page design decision.

### Inputs to the prompt

- The sampled taxonomy point (`{style, variant, purpose}`).
- For the chosen style: full content of `palette.toml`, `fonts.toml`, `notes.md`, and `manifest.toml`.
- The list of all SVG motif filenames available for the style (just names + roles, not bodies — we keep token budget for thinking).
- Few-shot example: one or two previously-generated design systems, with annotations.

### Output schema

```json
{
  "site": {
    "name": "Isfahan: City of Tile and Light",
    "concept": "A museum-exhibition site introducing Safavid Iranian architecture",
    "purpose": "museum"
  },
  "css_tokens": {
    "--bg": "#f3ebd9", "--primary": "#1e3a5f", "--accent": "#c9a23a", ...
  },
  "fonts": {
    "display": "Cinzel Decorative",
    "body": "Cormorant Garamond",
    "google_fonts_link": "https://fonts.googleapis.com/css2?family=...",
    "import_css": "@import url(...);"
  },
  "motif_selection": {
    "hero_frame":        "pointed-arch",
    "section_dividers":  "tile-border-strip",
    "centerpiece_seal":  "medallion",
    "ornament_inline":   "arabesque-flourish",
    "background_pattern": null
  },
  "shared_components": {
    "navigation_pattern": "...prose description...",
    "card_pattern":       "...",
    "footer_pattern":     "..."
  },
  "design_rules": "Symmetric layouts dominant. Ornament concentrated at borders/corners. Field interiors calm against ornamental edges. ...",
  "pages": [
    { "filename": "index.html",     "role": "hero / overview",   "content_brief": "..." },
    { "filename": "exhibits.html",  "role": "list of items",     "content_brief": "..." },
    { "filename": "about.html",     "role": "long-form essay",   "content_brief": "..." },
    { "filename": "visit.html",     "role": "practical info",    "content_brief": "..." },
    { "filename": "contact.html",   "role": "form / map / hours","content_brief": "..." }
  ]
}
```

The `css_tokens` block becomes the literal contents of `ground_truth/design-system.css` (wrapped in `:root { ... }`). The `motif_selection` map names which SVG files get embedded into which pages. The `pages[].content_brief` is the per-page brief for stage 3.

### Validation gate

- All 5 page filenames must be present and unique.
- All `motif_selection` values must be either null or a real filename in the manifest.
- All required design-token keys must be present (`--bg`, `--primary`, `--accent`, `--text`, etc.).
- `fonts.google_fonts_link` parses as a URL to fonts.googleapis.com.

If any check fails: discard, resample.

## 6. Stage 3 — Page generation (5 parallel LLM calls)

**Five LLM calls, fanned out.** Each produces one HTML file.

### Inputs to each page prompt

- The full design system spec from stage 2.
- The specific page's `content_brief` and `role`.
- The contents of `design-system.css` (the assembled token block) — included as literal text the page should `<link>` to.
- The bodies of the SVG motifs assigned to the page (i.e., the SVGs named in `motif_selection`). These are inlined verbatim, ~5–15 KB of SVG context per call.
- The `notes.md` for the architectural style — design-rules reminder.

### Output

A single HTML file. Required properties:
- Self-contained (HTML + inline `<style>` + inline `<svg>` motifs).
- Links to `design-system.css` (which lives one directory up — `../design-system.css` relative to the page when both live in `ground_truth/`).
- Imports the chosen Google Fonts at the top.
- Uses only the CSS tokens declared in the design system; does not redefine them.
- Renders deterministically at the fixed viewport (1440 × 900).

### Validation per page

- Parses as valid HTML5 (e.g., via Python `html.parser` strict mode, or `lxml`).
- Contains exactly one `<title>`.
- All `url(...)` references resolve (no missing assets).
- No external image fetches except Google Fonts.
- Renders to a PNG without errors via Playwright.
- The rendered PNG is non-trivial (not a blank screen — heuristic: at least 5% non-background pixels).

If any page fails: discard the whole task, resample. (We don't surgically retry single pages because the design-system context is shared and a failed page may indicate a deeper issue.)

## 7. Stage 4 — Render + validate

**Playwright runs the 5 pages locally** (in the Modal worker container that's running the generator). This is *not* the same Playwright run that the grader will eventually do inside the verifier container — but it uses the same pinned Chromium / fonts / viewport so the screenshots are byte-comparable.

For each page:
1. Spin up a headless Chromium at viewport 1440 × 900.
2. Navigate to `file://...page-N.html`.
3. Wait for fonts (`document.fonts.ready`).
4. Wait an additional 500ms for any CSS animations to settle.
5. Screenshot the full page (not just the viewport) — pages may scroll.
6. Save as `screenshots/page-N.png`.

After all 5 pages render: run the cross-page validation:
- All 5 PNGs exist, non-empty.
- All 5 PNGs share the same dominant palette (k-means cluster centers within ΔE-2000 ≤ ~10 of each other) — sanity check that pages didn't drift in color.

This catches "page 4 forgot the palette" failures that page-level validation misses.

## 8. Stage 5 — Harbor task packaging

Once everything validates, write the Harbor task directory:

1. **`task.toml`** — populated from a template:
   - `[task]` name = `proximal/<style>-<purpose>-<seed>`
   - `[metadata]` includes the taxonomy point (style, variant, purpose) for downstream filtering
   - `[environment]` cpus=2, memory_mb=4096, storage_mb=10240, allow_internet=true (we need Google Fonts)
   - `[verifier]` timeout_sec=900 (grading can be slow)
2. **`instruction.md`** — generated from a template, parametrized by the design system. Names the file structure the agent should produce, the viewport, the input screenshot paths.
3. **`environment/Dockerfile`** — pinned Node + Chromium + Playwright + grader Python deps. Same image for every task; we just `COPY` task-specific files in.
4. **`screenshots/`** — copy from stage 4.
5. **`ground_truth/`** — write design-system.css + 5 HTML files.
6. **`tests/test.sh`** — a thin wrapper that runs the grader against `ground_truth/` and the agent's output, writing `reward.json`.
7. **`tests/grader/`** — copied from `proximal_env/grader/` (the shared grader package, designed in a separate doc).
8. **`solution/solve.sh`** — `cp -r /verifier/ground_truth/. /workspace/output/`. Oracle baseline.
9. **`README.md`** — generator metadata (taxonomy point, seed, generation timestamp, design-system summary). Useful for human review during curation.

## 9. Concurrency on Modal

Each task generation = 1 Modal worker, ~3 min wall clock (1+5 LLM calls + render + validate + write).

For the 10-task deliverable: launch 10 Modal workers in parallel; total ~3 min if no failures.

For larger runs (calibration set, training data), Modal scales transparently. The only shared state is the motif library (read-only) and the Anthropic API rate limit (manage with semaphore).

**One-time setup per worker:** the Docker image bakes in Playwright + fonts. No per-task setup overhead.

## 10. Observability / debugging

- **Per-task logs** captured to `jobs/<run-id>/<task-name>/` containing:
  - `design-system.json` — the stage 2 output verbatim
  - `prompts/{stage1,stage2-page-N}.txt` — exact prompts sent
  - `responses/{stage1,stage2-page-N}.txt` — raw LLM responses
  - `validation-failures.txt` — if any
  - `render-log.txt` — Playwright stdout
- **A run-level summary CSV** — one row per task, columns include taxonomy, seed, success/fail, num retries, total LLM cost.

If a task fails repeatedly, we have everything we need to debug without rerunning.

## 11. Discarded ideas (and why)

- **Single mega-prompt for all 5 pages.** Rejected — output budget + drift problem.
- **Iterative refinement loop ("now look at the rendered screenshot, fix it").** Rejected for v1 — adds complexity and the cost grows fast. Worth revisiting if validation pass rate is low.
- **Tool-use / agent loop for generation.** Rejected — the generator's job is well-bounded; an agent adds latency and surface area without clear quality gain over a structured pipeline.
- **Hand-written templates per (style × purpose).** Rejected — that's what we're trying *not* to do. The LLM is the composer; templates collapse the diversity we're paying for.

## 12. Locked decisions (resolved 2026-05-08)

1. **Modernity dial = per-site.** Sampled once at taxonomy time; all pages share the variant.
2. **Page count = random 5–7, sampled per task.** The design-system pass declares the exact count (in `pages[]`); downstream stages fan out to that count.
3. **Pages link to each other.** Each page links to the others via `<a href="page-N.html">`. The grader doesn't score links, but realism reads as more legitimate.
4. **Modernity sub-modes** — leave as two-level (`period_faithful` / `modern`) for v1.
5. **Content = real-feeling copy.** The LLM writes period-appropriate prose / labels / dates / addresses; not lorem ipsum.

## 13. Locked decisions — second round (resolved 2026-05-08)

6. **Page filenames = deterministic.** `page-1.html` through `page-N.html`. The grader matches by filename 1-to-1. The page's role (Home / About / Visit / etc.) lives in `<title>` so screenshots still read as a real navigable site.
7. **Model choice = Opus 4.7 for all 6 calls per task.** Both the design-system pass and the 5–7 page passes use Opus. Cost is real but acceptable per the brief; sticking to one model also simplifies the report ("Claude Code with Opus 4.7" applies uniformly).
8. **Harbor packaging = single-step task.** Agent sees all screenshots up-front, produces all pages, gets one composite grade. Multi-step would let the agent see each page in isolation — we want the cross-page-coherence signal preserved.
9. **Site purposes = the 8 currently designed.** `museum / university / restaurant / studio / editorial / portfolio / civic / foundation`. Revisit if patterns from the eval suggest a category swap.
10. **Fonts = self-hosted.** ~30 Google-Fonts families (the union across all 5 styles' `fonts.toml`) downloaded once as `.woff2`, stored at `fonts/` in the project root, baked into the Docker image at `/usr/share/fonts/proximal/`. Every generated page (and every agent attempt) loads fonts via local `@font-face` URLs — never the Google Fonts CDN. Freezes the visual world for grading.

### What still needs design (next docs)

- The **grader** itself — composite signals, calibration plan, monotonicity validation. The user has deferred this.
- The **`instruction.md` template** the agent will see. Specifies: workspace layout, output paths, viewport, font availability, what to (not) do about navigation links.
- The **shared `proximal_env/grader/` package** — Python module structure for what `tests/test.sh` invokes inside the verifier container.
