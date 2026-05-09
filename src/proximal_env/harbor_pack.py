"""Package a generated/<slug>/ directory into a Harbor-shaped task directory.

Layout produced:

    tasks/<slug>/
    ├── task.toml
    ├── instruction.md
    ├── README.md
    ├── environment/                     (Docker build context for the image)
    │   ├── Dockerfile
    │   ├── screenshots/                 (COPY'd into agent's /app/screenshots/)
    │   └── motifs/                      (COPY'd into agent's /app/motifs/)
    ├── tests/
    │   ├── test.sh                      (verifier; real grader pending)
    │   └── ground_truth/                (verifier-only mount at /tests/...)
    └── solution/
        ├── solve.sh                     (oracle baseline)
        └── ground_truth/                (oracle-only mount at /solution/...)

Why screenshots/ and motifs/ live inside environment/:
Modal (and most Docker runtimes) use the directory containing the Dockerfile as
the build context. Anything outside that directory is unreachable to COPY
directives. Putting agent-input directories inside environment/ keeps the
Dockerfile's COPY paths simple and reproducible across cloud backends.

Why ground_truth lives in BOTH tests/ and solution/:
Harbor mounts tests/ only during verifier runs and solution/ only during oracle
runs. The agent's container never sees either, so the ground-truth answer key
is invisible at agent time. Two copies — small files (~50KB total) — beat a
single copy that we'd need a special mount mechanism for.
"""

import json
import shutil
from pathlib import Path

from proximal_env.motifs import load_style

# Resolve project paths
_PROJECT_ROOT = Path(__file__).resolve().parents[2]
_MOTIFS_ROOT = _PROJECT_ROOT / "motifs"
_PROXIMAL_ENV_SRC = _PROJECT_ROOT / "src" / "proximal_env"


def _font_menu(style: str) -> str:
    """Comma-separated list of every Google Font referenced by any pairing
    in the given style's fonts.toml. Used as a hint in the agent's instruction
    so it picks from a known menu rather than the entire Google Fonts catalog.
    """
    library = load_style(style)
    families: set[str] = set()
    for variant_pairings in library.pairings.values():
        for pairing in variant_pairings:
            families.add(pairing.display)
            families.add(pairing.body)
    return ", ".join(sorted(families))


def _animation_menu(style: str) -> str:
    """Per-style menu of animation patterns the agent might be looking at.

    Same hand-holding logic as `_font_menu`: the agent gets a finite list to
    identify from the filmstrip rather than reverse-engineering arbitrary CSS.
    """
    library = load_style(style)
    if not library.animations:
        return ""
    lines = []
    for a in library.animations:
        lines.append(
            f"  - `{a.name}` ({a.duration_sec}s {a.easing}) — {a.description}"
        )
    return "\n".join(lines)


# ---------------------------------------------------------------- templates

INSTRUCTION_TEMPLATE = """\
# Task: replicate this {N}-page website design from screenshots

You are given screenshots of a multi-page website. Your job is to write HTML and CSS files that visually replicate the design as faithfully as possible.

## Inputs

- **`/app/screenshots/page-1.png` ... `page-{N}.png`** — full-page screenshots, one per page. Each is the entire scrollable rendering of one page at viewport 1440 px wide.
- **`/app/screenshots/page-K-tile-J.png`** — additional 1440×1568 tile crops of pages that were taller than 2000 px. Use these when you need to see fine detail (small typography, narrow ornament) that may be downsampled in the full-page version.
- **`/app/motifs/`** — a flat directory of `.svg` ornament files used in the original design. Some are visible in the screenshots, some are not — you must **look at the screenshots to figure out which ones to use, where, at what size, and in what color**. The filenames are descriptive but not authoritative; trust your eyes over the names.

## Your output

Write files to **`/app/output/`**:

- `page-1.html`, `page-2.html`, ..., `page-{N}.html` — one HTML file per page, in screenshot order.
- A shared CSS file (you choose the name, e.g., `styles.css`) that all pages link to. Or, if you prefer, inline styles in each page — but the pages must look stylistically coherent.

## Constraints

- **Static HTML + CSS only.** No JavaScript.
- **Viewport: 1440 × 900.** Layout for that width.
- **Cross-page navigation.** The pages link to each other; every page's nav should list all {N} pages by their `page-N.html` filename.
- **Fonts.** The original site loads its typography from Google Fonts via `<link>` to `fonts.googleapis.com`. The fonts the original might have chosen come from this curated list (style-specific):
  ```
  {FONT_MENU}
  ```
  Look at the typography in the screenshots and select the **display** and **body** font(s) from this list that visually match (character shapes, contrast, weight, x-height). Load them via `<link>` and apply them via CSS — both as direct `font-family: "Name", ...` declarations and (optionally) as CSS custom properties like `--font-display: "Name"`. Picking fonts not on this list will not match the target.
{ANIMATION_SECTION}- **Motifs — REQUIRED: embed as inline `<svg>...</svg>`, not as `<img>` or `background-image`.** Read the contents of each motif file from `/app/motifs/` (e.g., with the `Read` tool) and paste the SVG body directly into your HTML. 
- **Sizing inlined SVGs is your responsibility.** Inline `<svg>` elements have **no intrinsic size**. Without an explicit dimension, the browser renders them at the parent container's full width — destroying the layout. After embedding each motif, give it dimensions via CSS or `width`/`height` attributes. Look at the screenshots to gauge what size each ornament should be in its context. Examples:
  - For a thin horizontal divider: `.divider svg { width: 100%; height: 40px; display: block; }`
  - For a small inline accent: `.accent svg { width: 24px; height: 24px; }`
  - For a centered seal: `.seal svg { width: 120px; height: 120px; }`
  Or set attributes directly on the `<svg>` tag itself: `<svg width="120" height="120" ...>`. **Every inline SVG you write should have explicit dimensions.**
- **Recolor inlined SVGs via CSS** so they match the screenshot's palette. 
- **Do not invent your own geometric ornament** from scratch when an existing motif file fits the design.
- **Do not read from `/verifier/`.** That directory contains the grader's reference data — it's not part of your inputs.

## What you do NOT have

- The original HTML/CSS source.
- A list of which motif belongs in which slot.
- A design-system / palette / font spec.
- The exact CSS @keyframes used (for animated tasks — you have the visual evidence in the filmstrip + frames).

All of that must be inferred from the visual evidence in the screenshots (and, for animated tasks, the filmstrip / frames).

## What "replication" means

Match: layout structure, color palette, typography hierarchy, the placement and styling of motifs (including their *colors* — see the inline-SVG requirement above), and the overall architectural-aesthetic commitment of the site. The grader compares your rendering to the original on multiple visual axes.
"""


INSTRUCTION_TEMPLATE_REACT = """\
# Task: replicate this {N}-page website design from screenshots — React + Vite

You are given screenshots of a multi-page website. Your job is to write **React + TypeScript** components that visually replicate the design. The project skeleton is already set up; you only write the per-page components.

## Inputs

- **`/app/screenshots/page-1.png` ... `page-{N}.png`** — full-page screenshots, one per page. Each is the entire scrollable rendering at viewport 1440 px wide.
- **`/app/screenshots/page-K-tile-J.png`** — 1440×1568 tile crops of pages taller than 2000 px. Use these for fine detail (small typography, narrow ornament).
- **`/app/motifs/`** — flat directory of `.svg` ornament files used in the original design (filenames match the `<Motif name=...>` you pass to the `<Motif>` component — see below).

## The project already has

- `/app/package.json` — pinned `react@18.3.1`, `react-dom@18.3.1`, `vite@5.4.10`, `typescript@5.6.3`. **Do not edit.**
- `/app/vite.config.ts`, `/app/tsconfig.json`, `/app/index.html` — pre-configured. **Do not edit.**
- `/app/design-system.css` — CSS custom properties for the design (`--bg`, `--fg`, `--primary`, `--font-display`, `--font-body`, etc.). Loaded automatically. **Do not edit.**
- `/app/node_modules/` — already installed, do not run `npm install`.
- `/app/src/main.tsx` — bootstraps React. **Do not edit.**
- `/app/src/App.tsx` — hash-router that routes `#/page-1` → `Page1`, `#/page-2` → `Page2`, etc. **Do not edit.**
- `/app/src/shared/Nav.tsx` — the verbatim shared header for every page. Use as `<Nav />`. **Do not edit.**
- `/app/src/shared/Footer.tsx` — the verbatim shared footer. Use as `<Footer />`. **Do not edit.**
- `/app/src/shared/Motif.tsx` — placeholder component. Reference motifs as `<Motif name="kiri-paulownia-mon" className="..." width={120} height={120} />`. The verifier replaces these with verbatim source SVG bodies before grading.

## Your output

Write/edit files in `/app/src/pages/`:

- `Page1.tsx`, `Page2.tsx`, …, `Page{N}.tsx` — one default-exported component per page. Component names match: `function Page1() { ... }`.

The verifier will run `npm run build` then screenshot each route. **You do NOT need to build or run anything.**

## React/TSX rules (must follow)

- JSX syntax: `className=` (not `class=`), `htmlFor=` (not `for=`), `{expressions}` for JS values, `style={{ background: 'var(--bg)' }}` for inline styles (note double braces in JSX object-literal style).
- Per-page CSS goes in a `<style>{`...CSS...`}</style>` block at the start of the component's return — JSX template literal so curly braces in CSS aren't interpreted as expressions.
- Always render `<Nav />` at the top and `<Footer />` at the bottom of each page's outer wrapper.
- Use design-system tokens: `var(--bg)`, `var(--fg)`, `var(--primary)`, `var(--font-display)`, `var(--font-body)`, etc. Don't hardcode colors or fonts that should come from the design system.
- For ornaments use `<Motif name="..." className="..." width={...} height={...} />`. **Do not draw your own SVGs. Do not import SVG files.** The build pipeline replaces every `<Motif>` instance with the verbatim source SVG body, carrying through your className/width/height/style props.
- Cross-page links use the App-level hash router: `<a href="#/page-N">`. Do not link to `page-N.html` — those don't exist in the built dist.

## Constraints

- **Static SPA only.** No data fetching, no setState beyond minimal client interactions. The verifier compares the rendered output, not interactivity.
- **Viewport: 1440 × 900.** Layout for that width.
- **Typography.** The original loads from Google Fonts via `<link>`. The fonts the original might have chosen come from this curated list (style-specific):
  ```
  {FONT_MENU}
  ```
  Pick the **display** and **body** font(s) from this list and reference them via the design-system CSS variables (`--font-display`, `--font-body`) — those variables are pre-defined and the Google Fonts `<link>` is already in `index.html`.
{ANIMATION_SECTION}
## What you do NOT have

- The original source.
- A list of which motif belongs in which slot.
- A design-system / palette / font spec.

All of that must be inferred from the visual evidence in the screenshots (and, for animated tasks, the filmstrip / frames).

## What "replication" means

Match: layout structure, color palette, typography hierarchy, the placement and styling of motifs, cross-page consistency of header/footer, and the overall architectural-aesthetic commitment of the site. The grader compares your rendering to the original on multiple visual axes.
"""


DOCKERFILE_TEMPLATE = """\
# Microsoft's official Playwright Python image — has Playwright + Chromium
# pre-installed plus system fonts. We *also* explicitly re-install every
# Python dep we need; this is cheap (mostly hits pip's cache) and removes
# any ambiguity about which python interpreter sees which packages.
FROM mcr.microsoft.com/playwright/python:v1.59.0-noble

ENV PIP_BREAK_SYSTEM_PACKAGES=1
ENV DEBIAN_FRONTEND=noninteractive

# All Python deps the grader needs. Pinned for reproducibility.
RUN python3 -m pip install --no-cache-dir \\
    "playwright==1.59.0" \\
    "Pillow==12.2.0" \\
    "scikit-image==0.26.0" \\
    "beautifulsoup4==4.14.3" \\
    "lxml==6.1.0"

# Make sure Chromium is installed for `python3 -m playwright`. The base image
# already has it but re-running is idempotent.
RUN python3 -m playwright install chromium

# One-line build-time sanity: every grader dep imports cleanly.
RUN python3 -c "import playwright, skimage, bs4, lxml, PIL"

# Agent's workspace
WORKDIR /app
RUN mkdir -p /app/output

# Agent inputs only — visible to the agent at /app/.
# Ground truth is intentionally NOT in this image; Harbor mounts it via tests/
# and solution/ only at verifier / oracle execution time.
COPY screenshots/ /app/screenshots/
COPY motifs/ /app/motifs/

# Animated tasks ship a videos/ tree alongside motifs/. Static tasks won't
# have this directory — the COPY will fail unless we make it conditional.
# Solution: put videos/ inside motifs-equivalent build context so it's an
# optional tree. Since Docker has no native conditional COPY, we use a
# trailing wildcard pattern that matches "videos" if present and is a no-op
# if absent.
COPY video[s]/ /app/videos/
"""


# Bonus 2 — React variant. Same Python+Playwright base, plus Node 20, plus
# pre-cached node_modules so trials don't pay the install cost (~30s, ~200MB).
DOCKERFILE_REACT_TEMPLATE = """\
FROM mcr.microsoft.com/playwright/python:v1.59.0-noble

ENV PIP_BREAK_SYSTEM_PACKAGES=1
ENV DEBIAN_FRONTEND=noninteractive

# Python grader deps (same as vanilla)
RUN python3 -m pip install --no-cache-dir \\
    "playwright==1.59.0" \\
    "Pillow==12.2.0" \\
    "scikit-image==0.26.0" \\
    "beautifulsoup4==4.14.3" \\
    "lxml==6.1.0"
RUN python3 -m playwright install chromium
RUN python3 -c "import playwright, skimage, bs4, lxml, PIL"

# Node 20 for Vite. NodeSource setup script handles apt-key + sources.list.
RUN apt-get update && apt-get install -y curl && \\
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \\
    apt-get install -y --no-install-recommends nodejs && \\
    apt-get clean && rm -rf /var/lib/apt/lists/* && \\
    node --version && npm --version

# Pre-cache the React project's node_modules at image build time. The
# project skeleton (package.json + lockfile) is COPYd in, then we run
# `npm ci` against it. node_modules ends up baked into the image, so
# every Modal trial starts with `npm install` already done.
WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci --no-audit --no-fund --silent

# Now the rest of the project skeleton + agent inputs.
COPY vite.config.ts /app/vite.config.ts
COPY tsconfig.json /app/tsconfig.json
COPY index.html /app/index.html
COPY design-system.css /app/design-system.css
COPY src /app/src
COPY screenshots/ /app/screenshots/
COPY motifs/ /app/motifs/
COPY video[s]/ /app/videos/

RUN mkdir -p /app/output
"""


TEST_SH_TEMPLATE = """\
#!/bin/bash
# Decomposed grader: emits each rubric (visual SSIM, palette histogram in Lab,
# structural DOM Jaccard, typography font-set Jaccard, consistency, animation,
# coverage) as an independent numeric stream in reward.json. The `overall`
# key duplicates `visual` so Harbor's default scalar-reward path keeps
# working — visual SSIM is the actual outcome we care about. Code lives in
# /tests/grader/proximal_env/, bundled at task-package time so each task is
# self-contained.
#
# Output: /logs/verifier/reward.json. Every value is numeric (Harbor's
# VerifierResult schema rejects strings/bools).

set -e
mkdir -p /logs/verifier

# Make the bundled proximal_env package importable.
export PYTHONPATH=/tests/grader:${PYTHONPATH:-}

if python3 /tests/grader/run_grader.py /tests/ground_truth /app/output \\
        > /logs/verifier/reward.json 2>/logs/verifier/grader-stderr.log; then
    echo "Grader succeeded:"
    cat /logs/verifier/reward.json
else
    echo "Grader failed — emitting fallback reward.json (all zeros)." >&2
    echo "stderr was:" >&2
    cat /logs/verifier/grader-stderr.log >&2 || true
    # IMPORTANT: this fallback must match the schema grader.grade() produces.
    # All keys numeric (Harbor rejects strings/bools). Animation included
    # unconditionally — it's safe to emit 0.0 for static tasks; the consumer
    # (visualizer / aggregator) keys on rubric NAMES, not the animated bit.
    cat > /logs/verifier/reward.json <<EOF
{
  "overall": 0.0,
  "overall_geomean": 0.0,
  "coverage": 0.0,
  "visual": 0.0,
  "palette": 0.0,
  "structural": 0.0,
  "typography": 0.0,
  "consistency": 0.0,
  "animation": 0.0
}
EOF
fi
"""


# Bonus 2 — React test.sh: build, render to vanilla shape, grade.
TEST_SH_REACT_TEMPLATE = """\
#!/bin/bash
# React variant verifier: builds the agent's edits, renders each route to
# both HTML and screenshot, then runs the same grader the vanilla flow uses.
#
# Why the indirection: the agent edits src/pages/Page<N>.tsx — those don't
# look like the page-N.html files the grader's structural / typography /
# consistency rubrics walk. Rendering to vanilla shape (page-N.html +
# screenshots/page-N.png + design-system.css) lets the grader run unchanged.

set -e
mkdir -p /logs/verifier
mkdir -p /logs/agent

export PYTHONPATH=/tests/grader:${PYTHONPATH:-}

# 1. Build the React app. node_modules is pre-cached in the image, so this
#    is just `vite build` (~1-3s for a small project).
cd /app
if ! npm run build > /logs/agent/build.log 2>&1; then
    echo "vite build FAILED — emitting build-failure reward" >&2
    cat /logs/agent/build.log >&2
    cat > /logs/verifier/reward.json <<EOF
{
  "overall": 0.0,
  "overall_geomean": 0.0,
  "coverage": 0.0,
  "visual": 0.0,
  "palette": 0.0,
  "structural": 0.0,
  "typography": 0.0,
  "consistency": 0.0,
  "animation": 0.0,
  "build_succeeded": 0.0
}
EOF
    exit 0
fi

# 2. Render each route to /app/_candidate/ — page-N.html + screenshots/.
#    This is what the grader actually compares against.
python3 -c "
from pathlib import Path
from proximal_env.render import render_react_to_files
result = render_react_to_files(Path('/app'), Path('/app/_candidate'))
print(f'rendered {result}')
" > /logs/agent/render.log 2>&1
RENDER_EXIT=$?
if [ $RENDER_EXIT -ne 0 ]; then
    echo "render FAILED — emitting all-zero reward" >&2
    cat /logs/agent/render.log >&2
    cat > /logs/verifier/reward.json <<EOF
{
  "overall": 0.0,
  "overall_geomean": 0.0,
  "coverage": 0.0,
  "visual": 0.0,
  "palette": 0.0,
  "structural": 0.0,
  "typography": 0.0,
  "consistency": 0.0,
  "animation": 0.0,
  "build_succeeded": 1.0,
  "render_succeeded": 0.0
}
EOF
    exit 0
fi

# 3. Run the grader against the vanilla-shaped candidate dir.
if python3 /tests/grader/run_grader.py /tests/ground_truth /app/_candidate \\
        > /logs/verifier/reward.json 2>/logs/verifier/grader-stderr.log; then
    echo "Grader succeeded:"
    cat /logs/verifier/reward.json
else
    echo "Grader failed — emitting fallback reward.json (all zeros)." >&2
    cat /logs/verifier/grader-stderr.log >&2 || true
    cat > /logs/verifier/reward.json <<EOF
{
  "overall": 0.0,
  "overall_geomean": 0.0,
  "coverage": 0.0,
  "visual": 0.0,
  "palette": 0.0,
  "structural": 0.0,
  "typography": 0.0,
  "consistency": 0.0,
  "animation": 0.0,
  "build_succeeded": 1.0,
  "render_succeeded": 1.0,
  "grader_succeeded": 0.0
}
EOF
fi
"""


# Tiny shim that the test.sh runs. Lives at /tests/grader/run_grader.py.
RUN_GRADER_PY = '''\
#!/usr/bin/env python3
"""Run the composite grader and dump JSON to stdout.

Usage:
    python run_grader.py <ground_truth_dir> <candidate_dir>
"""

import json
import sys
from pathlib import Path

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("usage: run_grader.py <ground_truth> <candidate>", file=sys.stderr)
        sys.exit(2)

    # The bundled package lives one level up (in /tests/grader/proximal_env).
    sys.path.insert(0, str(Path(__file__).parent))

    from proximal_env.grader import grade

    gt = Path(sys.argv[1])
    cand = Path(sys.argv[2])
    result = grade(gt, cand)
    print(json.dumps(result, indent=2))
'''


SOLVE_SH_TEMPLATE = """\
#!/bin/bash
# Oracle baseline: copy the ground-truth pages into the agent's output dir.
# When the real grader is wired up, running with this 'agent' should yield
# overall ≈ 1.0 — a sanity check that the rendering / comparison pipeline is
# deterministic. Note: Harbor mounts solution/ at /solution/ during oracle runs.

set -e
mkdir -p /app/output
cp /solution/ground_truth/page-*.html /app/output/
if [ -f /solution/ground_truth/design-system.css ]; then
    cp /solution/ground_truth/design-system.css /app/output/
fi
echo "Oracle copied $(find /app/output -maxdepth 1 -name 'page-*.html' | wc -l | tr -d ' ') ground-truth pages → /app/output/"
"""


README_TEMPLATE = """\
# {slug}

Generated by the proximal-env recipe.

| Field | Value |
|---|---|
| **Style** | `{style}` |
| **Purpose** | `{purpose}` |
| **Seed** | `{seed}` |
| **Pages** | {page_count} |
| **Site name** | {site_name} |

The agent is given screenshots + a flat SVG motif library and must reproduce the design as HTML + CSS in `/app/output/`. The original HTML, CSS, and design-system spec are deliberately withheld.

Run the agent against this task with:

```
harbor run -a claude-code -m claude-opus-4-7 -e modal --path .
```
"""


# ---------------------------------------------------------------- helpers

def parse_slug(slug: str) -> tuple[str, str, int, bool, str]:
    """Parse `[react-][anim-]<style>-<purpose>-<seed>` slug.

    Returns (style, purpose, seed, animated, framework).

    Examples:
        'persian-safavid-museum-475203'           → ('persian-safavid', 'museum', 475203, False, 'vanilla')
        'anim-edo-japanese-studio-556616'         → ('edo-japanese',    'studio', 556616, True,  'vanilla')
        'react-edo-japanese-studio-42'            → ('edo-japanese',    'studio', 42,    False, 'react')
        'react-anim-high-gothic-civic-597158'     → ('high-gothic',     'civic',  597158, True,  'react')
    """
    framework = "vanilla"
    if slug.startswith("react-"):
        slug = slug[len("react-"):]
        framework = "react"
    animated_from_slug = False
    if slug.startswith("anim-"):
        slug = slug[len("anim-"):]
        animated_from_slug = True
    parts = slug.rsplit("-", 2)
    if len(parts) != 3:
        raise ValueError(f"slug doesn't match <style>-<purpose>-<seed>: {slug!r}")
    style, purpose, seed_str = parts
    return style, purpose, int(seed_str), animated_from_slug, framework


# ---------------------------------------------------------------- main entry

def package_task(generated_dir: Path, output_dir: Path) -> dict:
    """Convert one generated/<slug>/ into a Harbor-shaped tasks/<slug>/ directory.

    Returns a small summary dict with file counts.
    """
    if not generated_dir.is_dir():
        raise FileNotFoundError(f"{generated_dir} not found")

    slug = generated_dir.name
    style, purpose, seed, _animated_from_slug, framework = parse_slug(slug)

    ds_path = generated_dir / "design-system.json"
    if not ds_path.exists():
        raise FileNotFoundError(f"design-system.json missing in {generated_dir}")
    ds = json.loads(ds_path.read_text())
    page_count = ds["page_count"]
    site_name = ds["site"]["name"]
    animated = "animation" in ds

    # ---- prepare output structure ----
    output_dir.mkdir(parents=True, exist_ok=True)
    (output_dir / "environment").mkdir(exist_ok=True)
    (output_dir / "tests").mkdir(exist_ok=True)
    (output_dir / "solution").mkdir(exist_ok=True)

    # ---- screenshots/ (full pages + tiles) — placed INSIDE environment/
    #      because that's the Docker build context Modal uses.
    src_shots = generated_dir / "screenshots"
    dst_shots = output_dir / "environment" / "screenshots"
    if dst_shots.exists():
        shutil.rmtree(dst_shots)
    if not src_shots.is_dir():
        raise FileNotFoundError(
            f"{src_shots} missing — run scripts/render_screenshots.py first"
        )
    shutil.copytree(src_shots, dst_shots)

    # ---- motifs/
    style_svg_dir = _MOTIFS_ROOT / style / "svg"
    if not style_svg_dir.is_dir():
        raise FileNotFoundError(f"motifs not found at {style_svg_dir}")
    dst_motifs = output_dir / "environment" / "motifs"
    if dst_motifs.exists():
        shutil.rmtree(dst_motifs)
    dst_motifs.mkdir()
    for svg in sorted(style_svg_dir.glob("*.svg")):
        shutil.copy(svg, dst_motifs / svg.name)

    # ---- videos/ — for animated tasks, copy filmstrips + per-page frames.
    dst_videos = output_dir / "environment" / "videos"
    src_videos = generated_dir / "videos"
    if animated and src_videos.is_dir():
        if dst_videos.exists():
            shutil.rmtree(dst_videos)
        shutil.copytree(src_videos, dst_videos)
    else:
        dst_videos.mkdir(parents=True, exist_ok=True)
        (dst_videos / ".placeholder").write_text("")

    # ---- ground_truth/ — placed inside tests/ AND solution/ so it's only
    #      visible to the verifier and the oracle, NOT the agent's container.
    #      (Harbor mounts tests/ and solution/ separately at run time.)
    if framework == "react":
        # For React tasks, the GT is the BUILT React app rendered to the same
        # vanilla shape the verifier produces from the agent's output. Same
        # file layout (page-*.html + screenshots/ + assets/ + design-system.css)
        # so the grader compares like-with-like.
        from proximal_env.render import render_react_to_files
        for parent in ("tests", "solution"):
            dst_gt = output_dir / parent / "ground_truth"
            if dst_gt.exists():
                shutil.rmtree(dst_gt)
            render_react_to_files(generated_dir, dst_gt)
    else:
        gt_files: list[Path] = []
        for html in sorted(generated_dir.glob("page-*.html")):
            gt_files.append(html)
        css = generated_dir / "design-system.css"
        if css.exists():
            gt_files.append(css)

        for parent in ("tests", "solution"):
            dst_gt = output_dir / parent / "ground_truth"
            if dst_gt.exists():
                shutil.rmtree(dst_gt)
            dst_gt.mkdir()
            for f in gt_files:
                shutil.copy(f, dst_gt / f.name)

    # ---- task.toml ----
    (output_dir / "task.toml").write_text(
        _build_task_toml(slug, style, purpose, seed, site_name, page_count, animated)
    )

    # ---- build the animation section for instruction.md (when animated) --
    animation_section = ""
    if animated:
        animation_section = (
            "- **Animations.** This page has ONE looped CSS animation, applied to a "
            "single ornament. Visual evidence:\n"
            "  - **`/app/videos/page-K/filmstrip.png`** — a 4×4 grid (1440×900) of 15 "
            "evenly-spaced viewport frames covering 5 seconds. Time progresses "
            "**left-to-right, top-to-bottom** (frame 1 = top-left, frame 16 = bottom-right "
            "and is blank). Read this first to identify **which element moves and how**.\n"
            "  - **`/app/videos/page-K/frame-NN.png`** — full-resolution viewport "
            "frame at moment NN (1–15). Read individual frames for fine detail.\n"
            f"  The original picked one of the following animations from this style's menu:\n"
            f"{_animation_menu(style)}\n"
            "  Reproduce the matching `@keyframes` rule + a class applied to the "
            "appropriate inline `<svg>` (or its wrapper). The animation runs on "
            "every page that contains the targeted ornament.\n"
        )

    # ---- instruction.md ----
    # Use .replace() rather than .format() because the instruction contains
    # CSS code examples with literal `{` `}` braces, which .format() would try
    # to interpret as placeholder syntax.
    template = INSTRUCTION_TEMPLATE_REACT if framework == "react" else INSTRUCTION_TEMPLATE
    instruction = (
        template
        .replace("{N}", str(page_count))
        .replace("{FONT_MENU}", _font_menu(style))
        .replace("{ANIMATION_SECTION}", animation_section)
    )
    (output_dir / "instruction.md").write_text(instruction)

    # ---- README.md ----
    (output_dir / "README.md").write_text(
        README_TEMPLATE.format(
            slug=slug, style=style, purpose=purpose, seed=seed,
            page_count=page_count, site_name=site_name,
        )
    )

    # ---- environment/Dockerfile ----
    if framework == "react":
        (output_dir / "environment" / "Dockerfile").write_text(DOCKERFILE_REACT_TEMPLATE)
        # React tasks need the project skeleton in the build context.
        # Copy from generated/<slug>/ into environment/ so the Dockerfile
        # COPY directives can reach them.
        for f in ("package.json", "package-lock.json", "vite.config.ts",
                  "tsconfig.json", "index.html", "design-system.css"):
            src = generated_dir / f
            if src.is_file():
                shutil.copy(src, output_dir / "environment" / f)
        # src/ tree (App.tsx, main.tsx, shared/, pages/)
        src_dir = generated_dir / "src"
        if src_dir.is_dir():
            dst_src = output_dir / "environment" / "src"
            if dst_src.exists():
                shutil.rmtree(dst_src)
            shutil.copytree(src_dir, dst_src)
    else:
        (output_dir / "environment" / "Dockerfile").write_text(DOCKERFILE_TEMPLATE)

    # ---- tests/test.sh ----
    test_sh = output_dir / "tests" / "test.sh"
    if framework == "react":
        test_sh.write_text(TEST_SH_REACT_TEMPLATE)
    else:
        test_sh.write_text(TEST_SH_TEMPLATE)
    test_sh.chmod(0o755)

    # ---- tests/grader/ — bundle the composite grader code with the task
    #      so the verifier can run it without depending on a separately
    #      installed package. Files travel with the task = reproducibility.
    grader_dst = output_dir / "tests" / "grader" / "proximal_env"
    if grader_dst.exists():
        shutil.rmtree(grader_dst)
    grader_dst.mkdir(parents=True)
    (grader_dst / "rubric").mkdir()

    grader_files = [
        "__init__.py",
        "render.py",
        "motifs.py",      # render.py imports MOTIFS_ROOT from here
        "taxonomy.py",    # motifs.py is otherwise standalone but cheap to copy
        "grader.py",
        "rubric/__init__.py",
        "rubric/coverage.py",
        "rubric/visual.py",
        "rubric/palette.py",
        "rubric/structural.py",
        "rubric/typography.py",
        "rubric/animation.py",
        "rubric/consistency.py",
    ]
    for rel in grader_files:
        src_file = _PROXIMAL_ENV_SRC / rel
        dst_file = grader_dst / rel
        dst_file.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy(src_file, dst_file)

    # Write the entry-point shim test.sh invokes.
    runner = output_dir / "tests" / "grader" / "run_grader.py"
    runner.write_text(RUN_GRADER_PY)
    runner.chmod(0o755)

    # ---- solution/solve.sh (oracle) ----
    solve_sh = output_dir / "solution" / "solve.sh"
    solve_sh.write_text(SOLVE_SH_TEMPLATE)
    solve_sh.chmod(0o755)

    gt_dir = output_dir / "tests" / "ground_truth"
    return {
        "slug": slug,
        "framework": framework,
        "screenshots": sum(1 for _ in dst_shots.iterdir()),
        "motifs": sum(1 for _ in dst_motifs.iterdir()),
        "ground_truth_files": sum(1 for _ in gt_dir.iterdir() if _.is_file()),
    }


def _build_task_toml(slug: str, style: str, purpose: str, seed: int,
                     site_name: str, page_count: int, animated: bool = False) -> str:
    safe_site = site_name.replace('"', "'")
    animated_lower = "true" if animated else "false"
    return f"""\
schema_version = "1.2"
# Auto-download the agent's output dir after each trial — no need to pass
# --artifact /app/output on the harbor run command line.
artifacts = ["/app/output"]

[task]
name = "proximal/{slug}"
description = "Replicate the {page_count}-page {style} ({purpose}) website \\"{safe_site}\\" from screenshots."
authors = []
keywords = ["website", "design", "html", "css", "{style}"]

[metadata]
category = "design_replication"
difficulty = "medium"
style = "{style}"
purpose = "{purpose}"
page_count = {page_count}
seed = {seed}
site_name = "{safe_site}"
animated = {animated_lower}
tags = ["website", "html-css", "{style}", "{purpose}"]

[verifier]
timeout_sec = 900.0

[verifier.env]

[agent]
timeout_sec = 1800.0

[environment]
build_timeout_sec = 900.0
os = "linux"
cpus = 2
memory_mb = 4096
storage_mb = 10240
gpus = 0
allow_internet = true
mcp_servers = []

[environment.env]

[solution.env]
"""
