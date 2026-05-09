# proximal-env

A pipeline that **generates RL-environment tasks for testing coding agents on multi-page website-design replication.** Built for a Proximal work trial.

The pipeline:
1. Samples a (style × variant × purpose × seed) point from a taxonomy
2. Calls Claude (Opus 4.7) to produce a 5–7 page website committed to one of five architectural styles (Persian Safavid, Roman Imperial, High Gothic, Dravidian, Edo Japanese)
3. Renders each page to a PNG via Playwright
4. Packages the result into a Harbor task: screenshots are the agent's input, the original HTML/CSS is the verifier's reference
5. Runs Claude Code (or any Harbor agent) on Modal in parallel against every task
6. The verifier's composite grader scores each attempt on coverage + visual SSIM + palette EMD-ish + structural DOM tag Jaccard + typography
7. A static visualizer renders side-by-side comparisons and per-rubric breakdowns

Decision log lives in `docs/`:
- `docs/design.md` — diversity strategy + rationale
- `docs/generator.md` — pipeline architecture, all locked design decisions
- `docs/harbor.md` — Harbor task interface notes
- `docs/animations.md` — Bonus 1 design (animations + filmstrip input)
- [`docs/eval_report.md`](docs/eval_report.md) — **30 × 2 trial eval results**
- [`docs/rubric_audit.md`](docs/rubric_audit.md) — reward-hack audit + decomposition plan for RL use

## Design Choices i made
- **Architectural Style Diversity** - Five Styles (roman, gothic, south-indian, japanese and persian) for the website design. Along with different palettes and targetting different industries. I wanted the websites to be visually tough to reproduce, while also being diverse enough. This is also easy to extend, because we can add more styles, more industries, more palettes etc.
- **Motifs** - The RL environemnt sees a few SVG's and their description while making the website. LLMs are terrible at recreating hard designs, and I did not want that to influence our environment, its a seperate problem to make good designs. Plus, in a real world usecase, a website maker would design motifs (logos, brand design), give it to the LLM and ask it to use that to make the website appealing.  There were some issues with SVGs and using them, so for this env, I ask the LLM to not inline the SVGs, and I post process replace it. Slightly hacky, but letting the LLM use SVGs will just bloat the context.
- **Animation rendering** - I render 30 frames, at equal intervals and then make 1 image out of these 30 images. This way, the LLM can look at whats happening. Example [filmstrip](generated/anim-high-gothic-civic-597158/videos/page-1/filmstrip.png). And the recreated website attempts - [#1](jobs/2026-05-09__15-57-29/anim-high-gothic-civic-597158__eveu4Ti/artifacts/output/page-1.html), [#2](jobs/2026-05-09__15-57-29/anim-high-gothic-civic-597158__XEo6Zcz/artifacts/output/page-1.html).



## Latest eval — 30 tasks × 2 attempts

**Run:** `jobs/2026-05-09__15-57-29/`  ·  **Wall clock:** 1h 32m  ·  **Cost:** ~$600  ·  **Agent:** claude-code with `claude-opus-4-7`

| Rubric | Mean | Median | Stdev |
|---|---|---|---|
| Overall (composite) | 0.522 | 0.577 | 0.146 |
| Visual (SSIM) | 0.707 | 0.737 | 0.078 |
| Palette (Lab + 3D histogram) | 0.539 | 0.647 | **0.303** |
| Structural (DOM tag Jaccard) | 0.573 | 0.586 | 0.065 |
| Typography (font-name Jaccard) | 0.342 | 0.250 | 0.267 |
| Consistency (header/footer hash) | 0.631 | 0.583 | 0.262 |
| Animation (frame-SSIM + @keyframes) | 0.645 | 0.661 | 0.109 |
| Coverage | 1.000 | 1.000 | 0.000 |

Full per-task and per-trial breakdowns + viewer links: **[`docs/eval_report.md`](docs/eval_report.md)**.

Open the side-by-side viewer:
```bash
open viewer/index.html
```

Per-trial deep links (jump straight to that trial's GT-vs-agent comparison) are listed in `docs/eval_report.md`.

## Setup

```bash
# Install Python deps and Chromium
uv sync
uv run playwright install chromium

# Set credentials
cp .env.example .env
# then edit .env to fill in:
#   ANTHROPIC_API_KEY=sk-ant-...
# (Modal credentials should be set via `modal token set` so they live in ~/.modal.toml)

# Install Harbor (with the modal extra) if not already
uv tool install 'harbor[modal]'
```

## The canonical flow

The pipeline runs in five stages. Each is a separate script so you can re-run any stage independently.

### 1 · Generate ground-truth websites

Produces `generated/<slug>/` with `design-system.json`, `design-system.css`, and `page-1.html` … `page-N.html` for each task.

```bash
# Single task — useful for iteration on prompts / rubrics
uv run python scripts/generate_many.py --n 1 --seed 42

# Curated batch
uv run python scripts/generate_many.py --n 10 --seed 100 --concurrent 3

# Large batch (multiple tasks generate concurrently; each task already
# parallelizes its own 6 page calls internally)
uv run python scripts/generate_many.py --n 50 --seed 200 --concurrent 3
```

`--seed` controls reproducibility and the taxonomy sampler. `--concurrent K` overlaps K task pipelines (each pipeline is 6 parallel Claude calls); 3 is a safe default for Anthropic rate limits.

### 2 · Render screenshots

Produces `generated/<slug>/screenshots/page-N.png` plus `page-N-tile-K.png` (tile crops for tall pages — keeps detail visible to the agent's vision API). These are the *only* visual input the agent ever sees.

```bash
# Render every task in generated/
uv run python scripts/render_screenshots.py

# Or just one
uv run python scripts/render_screenshots.py generated/<slug>
```

### 3 · Package as Harbor tasks

Converts each `generated/<slug>/` into a Harbor-shaped `tasks/<slug>/` with task.toml, instruction.md, Dockerfile, screenshots, motifs (the agent has the SVG library in its workspace), ground-truth (verifier-only), and the bundled composite grader.

```bash
uv run python scripts/package_tasks.py
bash scripts/build_dataset_toml.sh    # creates tasks/dataset.toml
```

### 4 · Run the eval

Claude Code attempts every task on Modal, in parallel.

```bash
# All tasks, 1 attempt each, 12 concurrent (default)
bash scripts/run_eval_batch.sh

# k attempts per task, n concurrent
K=10 N_CONCURRENT=12 bash scripts/run_eval_batch.sh
```

Each trial writes `reward.json` with all five sub-scores plus the weighted composite. Output lands in `jobs/<run-id>/`.

### 5 · Build the visualizer

Static HTML report — every task rendered side-by-side (ground truth ↔ agent attempt) with per-rubric scores per page.

```bash
uv run python scripts/build_visualizer.py jobs/<run-id>
open viewer/index.html
```

## Development tools

For iterating on rubrics and the grader without a full Modal run:

```bash
# Validate one rubric on one (gt, candidate) pair — checks identity ≥ 0.95
uv run python scripts/validate_rubric.py visual generated/<slug>/ peek-or-other/<slug>/

# Run the composite grader on local dirs
uv run python scripts/run_grader.py generated/<slug>/ <candidate-dir>
```

## Project layout

```
proximal-env/
├── docs/                        — decision logs (design / generator / harbor)
├── motifs/                      — five style libraries (palette, fonts, notes, SVGs)
├── src/proximal_env/
│   ├── taxonomy.py              — sampler
│   ├── motifs.py                — library loader
│   ├── render.py                — Playwright pipeline
│   ├── grader.py                — composite grader
│   ├── harbor_pack.py           — task packager
│   ├── generator/{design_system,page,css}.py
│   └── rubric/{coverage,visual,palette,structural,typography}.py
├── scripts/                     — entry points (see "canonical flow" above)
└── (run artifacts — gitignored: generated/, tasks/, jobs/, viewer/)
```

## Notable design choices

- **Diversity by architectural style.** Five styles (Roman Imperial, Persian Safavid, High Gothic, Dravidian, Edo Japanese) instead of generic SaaS-vs-blog-vs-portfolio. Forces the agent to commit to specific visual vocabulary; gives the grader specific per-style fingerprints to grade against.
- **Two-pass generation.** A single design-system Opus call locks the palette, fonts, motif assignments, and per-page briefs *before* any individual page is generated. Page calls then fan out (5–7 parallel) using the locked spec as shared context. Prevents drift across pages; keeps coherence.
- **Public-domain motif library.** Every SVG ornament comes from Wikimedia Commons (Owen Jones plates, kamon, girih tiles, etc.). Honesty about gaps (notably Dravidian — Wikimedia is thin on Hindu temple SVGs; we substitute Vogeler 1902 peacocks and document this in `motifs/dravidian/notes.md`).
- **Composite grader as the product.** The grader is what an RL training run would optimize against; if it's noisy, the agent learns nothing. Five signals — coverage + visual SSIM + palette histogram intersection in CIE Lab + structural DOM tag Jaccard + typography font-set Jaccard — combined via weighted geometric mean, gated on coverage. Each rubric validated individually before composition (identity ≥ 0.95 + sensible discrimination on real candidates).
- **Inline-SVG mandate + sizing requirement in the agent's instruction.** Necessary for color fidelity (img-tag SVGs ignore CSS `fill`); we accept the resulting hand-holding because it removes a confounder from the eval signal.
