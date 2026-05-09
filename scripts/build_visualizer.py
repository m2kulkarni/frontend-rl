#!/usr/bin/env python3
"""Build a static HTML viewer for the eval — true vs agent attempts vs scores.

Walks `jobs/<run-id>/<slug>__<trial-id>/artifacts/output/` directories,
renders the agent's HTML to PNGs, runs the composite grader, and produces a
single self-contained `viewer.html` showing each task page-by-page with the
ground-truth and agent's screenshot side-by-side plus the per-rubric scores.

Usage:
    uv run python scripts/build_visualizer.py jobs/<run-id> [--out viewer/]

The output directory will contain:
    viewer/index.html
    viewer/<slug>/{gt|agent}/page-N.png   — for the side-by-side display
    viewer/<slug>/scores.json             — per-task grader output
"""

import argparse
import base64
import json
import shutil
import sys
import time
from pathlib import Path

from proximal_env.grader import grade
from proximal_env.render import render_task
from proximal_env.rubric import (
    coverage as r_coverage,
    palette as r_palette,
    structural as r_structural,
    typography as r_typography,
    visual as r_visual,
)


GENERATED_ROOT = Path("generated")
JOBS_ROOT = Path("jobs")


def find_trial_dirs(run_dir: Path) -> list[tuple[str, Path]]:
    """Find each (task-slug, trial-dir) pair under a run."""
    out: list[tuple[str, Path]] = []
    for trial in sorted(run_dir.iterdir()):
        if not trial.is_dir():
            continue
        if "__" not in trial.name:
            continue
        slug = trial.name.split("__")[0]
        out.append((slug, trial))
    return out


def collect_agent_output(trial_dir: Path, dst: Path) -> Path:
    """Copy the agent's HTML/CSS files from artifacts/output/ into a dest dir.

    Returns the destination dir.
    """
    src = trial_dir / "artifacts" / "output"
    dst.mkdir(parents=True, exist_ok=True)
    if src.is_dir():
        for f in src.iterdir():
            if f.suffix in {".html", ".css"} or f.name == "design-system.css":
                shutil.copy(f, dst / f.name)
    return dst


def per_page_breakdown(gt_dir: Path, cand_dir: Path) -> dict:
    """Per-page rubric scores for the rich detail view."""
    return {
        "visual": r_visual.score_detailed(gt_dir, cand_dir).get("per_page", {}),
        "palette": r_palette.score_detailed(gt_dir, cand_dir).get("per_page", {}),
        "structural": r_structural.score_detailed(gt_dir, cand_dir).get("per_page", {}),
        "typography": r_typography.score_detailed(gt_dir, cand_dir).get("per_page", {}),
    }


def _load_reward_json(trial_dir: Path) -> dict | None:
    """Read the verifier-emitted reward.json. Returns None if missing/malformed."""
    reward = trial_dir / "verifier" / "reward.json"
    if not reward.is_file():
        return None
    try:
        return json.loads(reward.read_text())
    except (json.JSONDecodeError, OSError):
        return None


def _resolve_gt_dir(slug: str) -> Path:
    """Find the ground-truth dir for a trial slug.

    Harbor truncates trial-directory names at some cap, so a slug like
    'persian-safavid-foundation-335124' may show up as '...-33512'. Fall
    back to a unique prefix-match against generated/.
    """
    direct = GENERATED_ROOT / slug
    if direct.is_dir():
        return direct
    matches = [d for d in GENERATED_ROOT.iterdir()
               if d.is_dir() and d.name.startswith(slug)]
    if len(matches) == 1:
        return matches[0]
    raise FileNotFoundError(
        f"ground truth missing for {slug} — expected at {direct} "
        f"(prefix-match returned {[m.name for m in matches]})"
    )


def build_one_task(slug: str, trial_dir: Path, out_root: Path) -> dict | None:
    """Process one (task, trial) pair into the visualizer assets.

    Reads composite scores from the verifier's reward.json (fast — no
    re-grading), copies the agent's HTML, and renders both GT and agent to
    PNGs for the side-by-side. Returns None if the trial is incomplete
    (no reward.json yet).

    Output dir is keyed by `trial_dir.name` (e.g. `slug__abc123`) so that
    multiple trials of the same slug (k>1) each get their own dir and
    don't overwrite each other.
    """
    gt_dir = _resolve_gt_dir(slug)

    overall = _load_reward_json(trial_dir)
    if overall is None:
        # Trial still in flight or failed before verifier ran.
        return None

    trial_key = trial_dir.name  # `slug__hash` — unique per trial
    task_out = out_root / trial_key
    task_out.mkdir(parents=True, exist_ok=True)

    # 1. Stage agent files
    agent_html_dir = task_out / "agent-html"
    collect_agent_output(trial_dir, agent_html_dir)

    if not any(agent_html_dir.glob("page-*.html")):
        # Verifier wrote a reward (likely the all-zeros fallback), but the
        # agent didn't actually produce HTML. Skip — nothing to render.
        return None

    # 2. Render screenshots for both gt and agent
    gt_pngs_dir = task_out / "gt"
    agent_pngs_dir = task_out / "agent"
    gt_pngs_dir.mkdir(exist_ok=True)
    agent_pngs_dir.mkdir(exist_ok=True)

    for png in render_task(gt_dir, screenshots_dir=gt_pngs_dir):
        if "-tile-" in png.name:
            png.unlink()
    for png in render_task(agent_html_dir, screenshots_dir=agent_pngs_dir):
        if "-tile-" in png.name:
            png.unlink()

    # 3. List the page files we have for the index template
    gt_pages = sorted(p.name for p in gt_pngs_dir.glob("page-*.png"))
    agent_pages = sorted(p.name for p in agent_pngs_dir.glob("page-*.png"))
    pages = sorted(set(gt_pages) | set(agent_pages))

    # 4. Stash a small scores.json for ad-hoc inspection / re-use
    (task_out / "scores.json").write_text(json.dumps({
        "slug": slug,
        "trial_key": trial_key,
        "trial_id": trial_dir.name.split("__", 1)[-1],
        "overall": overall,
    }, indent=2))

    return {
        "slug": slug,
        "trial_key": trial_key,
        "trial_id": trial_dir.name.split("__", 1)[-1],
        "overall": overall,
        "pages": pages,
        "has_gt": {p: p in gt_pages for p in pages},
        "has_agent": {p: p in agent_pages for p in pages},
    }


INDEX_HTML = """\
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Proximal Eval — Viewer</title>
<style>
  :root {
    --bg: #f3ebd9;
    --fg: #1a1410;
    --panel: #fff;
    --primary: #1d3a72;
    --good: #356b4a;
    --bad: #a93226;
    --warn: #c08a3e;
  }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 24px; background: var(--bg); color: var(--fg);
         font-family: ui-serif, Georgia, serif; font-size: 15px; line-height: 1.5; }
  h1 { font-size: 28px; margin: 0 0 6px; letter-spacing: 0.02em; }
  .lede { color: rgba(26,20,16,0.7); margin-bottom: 28px; }
  .task { background: var(--panel); border: 1px solid rgba(0,0,0,0.1);
          padding: 20px; margin-bottom: 32px; }
  .task h2 { margin: 0 0 4px; font-size: 22px; }
  .meta { font-size: 13px; color: rgba(26,20,16,0.6); margin-bottom: 14px; }
  .scorebar { display: flex; gap: 14px; flex-wrap: wrap; padding: 12px 14px;
              background: rgba(0,0,0,0.04); margin-bottom: 18px; font-size: 13px; }
  .score { display: flex; flex-direction: column; gap: 2px; }
  .score-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;
                 color: rgba(26,20,16,0.55); }
  .score-value { font-weight: 700; font-size: 18px; font-variant-numeric: tabular-nums; }
  .score-value.good { color: var(--good); }
  .score-value.warn { color: var(--warn); }
  .score-value.bad  { color: var(--bad); }
  .pages { display: flex; flex-direction: column; gap: 16px; }
  .page-row { border: 1px solid rgba(0,0,0,0.08); padding: 12px;
              display: grid; grid-template-columns: 200px 1fr 1fr; gap: 14px;
              align-items: start; }
  .page-info { font-size: 12px; }
  .page-info h3 { margin: 0 0 6px; font-size: 14px; }
  .page-info dl { margin: 0; display: grid; grid-template-columns: auto 1fr; gap: 2px 8px; }
  .page-info dt { color: rgba(26,20,16,0.55); }
  .page-info dd { margin: 0; font-variant-numeric: tabular-nums; }
  .panel { display: flex; flex-direction: column; gap: 4px; }
  .panel-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;
                 color: rgba(26,20,16,0.55); }
  .panel img { max-width: 100%; height: auto; border: 1px solid rgba(0,0,0,0.1); display: block; }
  .panel.missing { background: rgba(169,50,38,0.05); padding: 24px; text-align: center;
                   color: var(--bad); font-size: 12px; }
  details summary { cursor: pointer; }
  .nav { position: sticky; top: 0; background: var(--bg); padding: 12px 0; margin: -24px -24px 18px;
         padding-left: 24px; border-bottom: 1px solid rgba(0,0,0,0.08); z-index: 10; }
  .nav a { margin-right: 14px; color: var(--primary); text-decoration: none; }
  .nav a:hover { text-decoration: underline; }
</style>
</head>
<body>
<div class="nav">
  __NAV__
</div>
<h1>Proximal Eval — Viewer</h1>
<div class="lede">Ground truth (left) vs. Claude Code's attempt (right), with composite grader scores.</div>
__TASKS__
</body>
</html>
"""


def color_class(score: float) -> str:
    if score >= 0.7:
        return "good"
    if score >= 0.4:
        return "warn"
    return "bad"


def render_task_html(task: dict) -> str:
    """Render the HTML block for one (task, trial) pair."""
    slug = task["slug"]
    trial_key = task["trial_key"]  # unique per trial — used for anchor + image paths
    overall = task["overall"]
    # Display every numeric key in reward.json, ordered with the most important first.
    canonical_order = ("overall", "coverage", "visual", "palette",
                       "structural", "typography", "consistency", "animation")
    rubric_keys = [k for k in canonical_order if k in overall]
    # Append any extras that snuck in (forward-compat).
    for k in overall:
        if k not in rubric_keys and isinstance(overall[k], (int, float)):
            rubric_keys.append(k)

    score_chips = "".join(
        f'<div class="score">'
        f'<div class="score-label">{k}</div>'
        f'<div class="score-value {color_class(overall[k])}">{overall[k]:.3f}</div>'
        f'</div>'
        for k in rubric_keys
    )

    pages_html = []
    for page in task["pages"]:
        gt_panel = (
            f'<img src="{trial_key}/gt/{page}" alt="gt {page}">'
            if task["has_gt"].get(page) else
            '<div class="panel missing">missing</div>'
        )
        agent_panel = (
            f'<img src="{trial_key}/agent/{page}" alt="agent {page}">'
            if task["has_agent"].get(page) else
            '<div class="panel missing">missing</div>'
        )
        pages_html.append(f"""
        <div class="page-row">
          <div class="page-info">
            <h3>{page}</h3>
          </div>
          <div class="panel"><div class="panel-label">ground truth</div>{gt_panel}</div>
          <div class="panel"><div class="panel-label">agent attempt</div>{agent_panel}</div>
        </div>""")

    return f"""<div class="task" id="{trial_key}">
  <h2>{slug}</h2>
  <div class="meta">trial: <code>{task['trial_id']}</code></div>
  <div class="scorebar">{score_chips}</div>
  <div class="pages">
    {''.join(pages_html)}
  </div>
</div>"""


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("run_dir", type=Path, nargs="+",
                        help="one or more jobs/<run-id> directories. "
                             "Multiple dirs are merged — useful for k>1 evals "
                             "split across runs.")
    parser.add_argument("--out", type=Path, default=Path("viewer"),
                        help="output viewer directory (default: viewer/)")
    parser.add_argument("--workers", type=int, default=6,
                        help="parallel render workers (default: 6).")
    args = parser.parse_args()

    for d in args.run_dir:
        if not d.is_dir():
            print(f"error: {d} is not a directory", file=sys.stderr)
            return 2

    args.out.mkdir(parents=True, exist_ok=True)

    # Merge trials from every run dir. Each run lives in its own jobs/<run-id>/
    # so trial keys (slug__hash) don't collide; if two runs ever happen to use
    # the same hash, the second wins.
    trials: list[tuple[str, Path]] = []
    for d in args.run_dir:
        trials.extend(find_trial_dirs(d))
    if not trials:
        print(f"no trials found under {args.run_dir}", file=sys.stderr)
        return 1

    print(f"Building viewer for {len(trials)} trial(s) with up to {args.workers} parallel renders...\n")

    import concurrent.futures as _cf
    import threading

    print_lock = threading.Lock()
    tasks_data = []
    skipped = 0

    def _one(slug: str, trial: Path) -> tuple[str, dict | None, str | None]:
        t0 = time.time()
        try:
            t = build_one_task(slug, trial, args.out)
        except Exception as exc:
            return slug, None, f"FAILED: {exc!r}"
        if t is None:
            return slug, None, "(in flight or no reward.json yet — skipping)"
        elapsed = time.time() - t0
        return slug, t, f"overall={t['overall']['overall']:.3f}  ({elapsed:.0f}s)"

    with _cf.ThreadPoolExecutor(max_workers=args.workers) as ex:
        futures = {ex.submit(_one, slug, trial): (slug, trial) for slug, trial in trials}
        for fut in _cf.as_completed(futures):
            slug, t, msg = fut.result()
            with print_lock:
                print(f"  {slug:55s}  →  {msg}", flush=True)
            if t is None and msg and msg.startswith("("):
                skipped += 1
            elif t is not None:
                tasks_data.append((slug, t))

    # Sort tasks by overall score, descending — best-first in the viewer.
    # Group by slug, then within each slug rank best-first. Keeps all k attempts
    # of the same task adjacent in the rendered page — easier to scan than a
    # global score-sort that scatters them.
    tasks_data.sort(key=lambda st: (st[0], -st[1]["overall"]["overall"]))

    nav = " ".join(
        f'<a href="#{t["trial_key"]}">{slug.split("-", 1)[0]}</a>'
        for slug, t in tasks_data
    )
    tasks_html = "\n".join(render_task_html(t) for _, t in tasks_data)
    html = INDEX_HTML.replace("__NAV__", nav).replace("__TASKS__", tasks_html)
    (args.out / "index.html").write_text(html)

    print(f"\n{len(tasks_data)} tasks rendered" +
          (f", {skipped} skipped (in flight)" if skipped else "") +
          ".")
    print(f"Wrote {args.out / 'index.html'}")
    print(f"To open: open {args.out / 'index.html'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
