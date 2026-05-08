# Harbor — task interface and how we'll use it

Notes for the Proximal trial. Captures the parts of Harbor that affect how we shape generated tasks. Not exhaustive — only what we need.

---

## What Harbor expects per task

A task is a **directory**. Minimum mandatory contents (from `harbor init`):

```
my-task/
├── task.toml                   # config + metadata + sandbox spec
├── instruction.md              # the prompt the agent sees
├── README.md                   # human-facing description
├── environment/
│   └── Dockerfile              # the container the agent runs in
├── tests/
│   ├── test.sh                 # runs in container, writes reward
│   └── test_outputs.py         # optional pytest scaffolding
└── solution/
    └── solve.sh                # the "oracle" baseline (used for sanity)
```

`harbor init -t <org/name>` scaffolds this. The scaffolded `task.toml` looks like:

```toml
schema_version = "1.2"
artifacts = []

[task]
name = "example/website-replication"
description = "..."
authors = []
keywords = []

[metadata]
difficulty = "unknown"
category = "software_engineering"
tags = []

[verifier]
timeout_sec = 600.0

[agent]
timeout_sec = 600.0

[environment]
build_timeout_sec = 600.0
os = "linux"
cpus = 1
memory_mb = 2048
storage_mb = 10240
gpus = 0
allow_internet = true
mcp_servers = []
```

Pydantic schema lives in `harbor/models/task/config.py` (TaskConfig).

## How rewards work — and why this is a gift for us

The verifier is just `tests/test.sh` running inside the container. Whatever it writes to `/logs/verifier/reward.txt` (a single float) or `/logs/verifier/reward.json` (a flat dict of floats) becomes the score.

The default scaffold writes a binary `1` or `0` based on pytest pass/fail. **We will not do that.** We'll have `test.sh`:

1. Render the agent's HTML output to screenshots (Playwright, headless).
2. Run our composite grader against the ground-truth screenshots.
3. Write something like:
   ```json
   {
     "overall": 0.71,
     "visual_ssim": 0.83,
     "structural": 0.65,
     "palette": 0.79,
     "typography": 0.58,
     "layout": 0.74
   }
   ```
   to `/logs/verifier/reward.json`.

Harbor preserves all keys, so the report can break down per-signal performance, not just the headline number. This is exactly what the brief asks for ("continuous, not discrete").

**Failure modes Harbor will catch automatically:**
- `RewardFileNotFoundError` — grader didn't run / crashed
- `RewardFileEmptyError` — file written but empty
- `VerifierOutputParseError` — malformed JSON / non-float

These appear in `--retry-exclude` by default — meaning they don't trigger retries, they fail loudly. Good — we want grader bugs to be visible, not silently retried.

## Running the eval

The brief wants 10 attempts × 10 tasks. Harbor does this in one command:

```bash
harbor run \
  --agent claude-code \
  --model claude-opus-4-7 \
  --env modal \
  --path ./tasks/<task-name> \
  -k 10 \                      # n-attempts per trial
  -n 4 \                        # concurrent trials
  --jobs-dir ./jobs
```

`--env modal` swaps Docker for Modal containers — same task definition, no code change. That's the abstraction we want.

For a dataset (all 10 tasks at once), package them into a `dataset.toml` and use `--dataset` instead of `--path`. `harbor add` / `harbor sync` manages the manifest.

## Claude Code adapter — kwargs we care about

Built into Harbor as the `claude-code` agent (`harbor/agents/installed/claude_code.py`). Useful flags via `--ak key=value`:

| Kwarg | Why we'd set it |
|---|---|
| `effort` | low / medium / high / xhigh / max — controls reasoning budget |
| `max_turns` | cap conversation length — sane default to keep cost bounded |
| `thinking` | enabled / adaptive / disabled |
| `max_thinking_tokens` | cap thinking budget per turn |
| `max_budget_usd` | hard $ cap per attempt — useful guardrail |
| `append_system_prompt` | if we want to inject a constant style preamble |

Model name format: `claude-opus-4-7` (no provider prefix needed for direct API). Bedrock requires the full ARN; we'll use direct API.

The brief's discrepancy (4.7 vs 4.6) is just a model-name flag swap at eval time.

## Multi-step tasks — and why we *might* use them

Harbor supports multi-step tasks: `[[steps]]` array in `task.toml`, each step with its own `instruction.md`, `tests/`, and optional `solution/`. Rewards aggregate by `mean` (default) or `final`.

**Tempting use:** decompose "replicate this 5-page website" into 5 steps, one per page, with the model finishing one page before being shown the next.

**Why I'd lean against it for now:** the trial is about whole-design replication, including cross-page coherence. Splitting into steps lets the model see each page screenshot in isolation, which throws away the multi-page-coherence signal we *want* to test. Better: single-step, agent gets all 5 screenshots up front, grader scores each page and aggregates.

**Where multi-step *does* fit:** Bonus 1 (animations). One step for static-design replication, a second step where the agent watches a video and adds the animation. That decomposes naturally.

## Mandatory vs optional files

From `TaskPaths.is_valid()`:

| File | Mandatory? | Notes |
|---|---|---|
| `task.toml` | yes | always |
| `instruction.md` | yes (single-step) / no (multi-step) | multi-step has per-step instructions instead |
| `environment/Dockerfile` | yes (or `docker-compose.yaml`) | |
| `tests/test.sh` | yes (unless verification globally disabled) | |
| `solution/solve.sh` | no | useful for sanity baseline; we should ship it |
| `README.md` | no | recommended |
| `tests/test_outputs.py` | no | only if we use pytest scaffolding |

## Our planned task layout

Concretely, for each generated website-replication task:

```
tasks/<style>-<purpose>-<seed>/
├── task.toml                       # auto-generated from generator config
├── instruction.md                  # "replicate the 5-page design from screenshots in /workspace/screenshots/"
├── README.md                       # generator metadata for human review
├── environment/
│   └── Dockerfile                  # node + playwright + pillow + grader deps
├── screenshots/                    # input to the agent — copied into container
│   ├── page-1.png
│   ├── page-2.png
│   ├── ...
├── ground_truth/                   # never seen by agent — used by grader
│   ├── page-1.html
│   ├── page-2.html
│   ├── styles.css
│   └── screenshots-rendered/       # canonical renders for direct comparison
├── tests/
│   ├── test.sh                     # render agent output → run grader → reward.json
│   └── grader/                     # our grader code, mounted via the Dockerfile
│       ├── score.py
│       ├── visual.py
│       ├── structural.py
│       ├── palette.py
│       └── typography.py
└── solution/
    └── solve.sh                    # copies ground_truth/ to agent's output dir — oracle baseline
```

Reasoning:
- **`screenshots/` is the agent's input.** Copied into `/workspace/screenshots/` by the Dockerfile.
- **`ground_truth/` is the grader's reference.** Mounted into the verifier's environment, never visible to the agent. Harbor's `tests/` directory is naturally hidden from the agent at run time.
- **`grader/` lives inside `tests/`.** The grader is per-task code; living next to the verifier script keeps it self-contained per task. Common code can be a shared library installed into the Docker image.
- **`solve.sh` copies ground truth.** This gives us an automatic "oracle gets ~1.0" sanity check — if the oracle scores below 0.95 on our grader, our pipeline has a rendering / determinism bug, not a model-quality issue.

## Open questions

- **Where do agent outputs go?** Need a convention like `/workspace/output/` with subdirs `page-1/`, etc. Will spec in `instruction.md`.
- **Determinism of rendering.** Same HTML rendered in slightly different Playwright/Chromium versions can shift pixels. The Dockerfile pins versions, but we should also pin fonts (system fonts vary).
- **Grader runtime.** If grading is slow (Playwright + image diff per page × 5 pages × 10 attempts × 10 tasks = 500 grader runs), we need the verifier to use Modal's resources sensibly. The `[verifier].timeout_sec` default is 600s — should be plenty per task, but worth measuring.
- **Image fidelity for screenshots.** Headless Chromium at 1280×800? 1440×900? The agent needs the same viewport dimensions baked into its workflow. Spell out in `instruction.md`.
- **MCP servers.** Harbor supports MCP servers per task. We probably don't need them (the agent's job is straight code-writing) but flagging for later — could be useful if we want a "view-rendered-page" tool.

## What this means for the generator

- The generator's job is to produce a directory of the shape above.
- The grader is shared code — same `grader/` contents across all generated tasks. Probably lives in a top-level `proximal_env/grader/` Python package, with `tests/grader/` being a thin wrapper that imports it.
- Task variation ≈ varying `screenshots/`, `ground_truth/`, and `instruction.md`.

## Rewards: continuous, multi-key — confirmed compatible

The brief asks for continuous grading. Harbor's `reward.json` (`dict[str, float]`) is a clean fit. We'll use `overall` as the headline score (a weighted combination of sub-scores) and ship the sub-scores so the report can drill in.
