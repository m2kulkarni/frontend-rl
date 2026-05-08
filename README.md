# proximal-env

Pipeline that generates RL-environment tasks for testing coding agents on
website-design replication. Built for a Proximal work trial.

## Status

Implementation in progress. Designs locked in `docs/`:
- `docs/design.md` — diversity strategy (5 architectural styles) + decision log.
- `docs/harbor.md` — Harbor task interface + planned task layout.
- `docs/generator.md` — generator pipeline architecture (10 design decisions locked).

Motif libraries in `motifs/` cover all 5 styles with public-domain SVGs from
Wikimedia Commons. Open `motifs/<style>/preview.html` in a browser to eyeball.

## Setup

```bash
# Install Python deps
uv sync

# Set your API key
cp .env.example .env
# then edit .env and put your real ANTHROPIC_API_KEY in
```

## Smoke test the design-system pass

```bash
uv run python scripts/generate_one.py
```

Samples one task, calls Opus 4.7 once to produce the design-system JSON, and writes
the result to `generated/<slug>/design-system.json`. No HTML pages yet — that's the
next implementation slice.
