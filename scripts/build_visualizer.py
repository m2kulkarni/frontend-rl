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


def build_one_task(slug: str, trial_dir: Path, out_root: Path) -> dict:
    """Process one (task, trial) pair into the visualizer assets.

    Returns a dict with everything index.html needs to render this task.
    """
    gt_dir = GENERATED_ROOT / slug
    if not gt_dir.is_dir():
        raise FileNotFoundError(
            f"ground truth missing for {slug} — expected at {gt_dir}"
        )

    task_out = out_root / slug
    task_out.mkdir(parents=True, exist_ok=True)

    # 1. Stage agent files in viewer/<slug>/agent-html/
    agent_html_dir = task_out / "agent-html"
    collect_agent_output(trial_dir, agent_html_dir)

    # 2. Render screenshots for both gt and agent into viewer/<slug>/{gt|agent}/
    gt_pngs_dir = task_out / "gt"
    agent_pngs_dir = task_out / "agent"
    gt_pngs_dir.mkdir(exist_ok=True)
    agent_pngs_dir.mkdir(exist_ok=True)

    # gt: render fresh from generated/<slug>/. (Could symlink the cached
    # screenshots/ but re-rendering keeps it deterministic with the same
    # Playwright config the grader uses.)
    for png in render_task(gt_dir, screenshots_dir=gt_pngs_dir):
        if "-tile-" in png.name:
            png.unlink()  # tiles are agent-input only, drop from viewer
    for png in render_task(agent_html_dir, screenshots_dir=agent_pngs_dir):
        if "-tile-" in png.name:
            png.unlink()

    # 3. Compute composite + per-page breakdown
    overall = grade(gt_dir, agent_html_dir)
    breakdown = per_page_breakdown(gt_dir, agent_html_dir)

    # 4. Stash scores.json for re-use
    scores_data = {
        "slug": slug,
        "trial_id": trial_dir.name.split("__", 1)[-1],
        "overall": overall,
        "per_page": breakdown,
    }
    (task_out / "scores.json").write_text(json.dumps(scores_data, indent=2))

    # 5. List the page files we have
    gt_pages = sorted(p.name for p in gt_pngs_dir.glob("page-*.png"))
    agent_pages = sorted(p.name for p in agent_pngs_dir.glob("page-*.png"))
    pages = sorted(set(gt_pages) | set(agent_pages))

    return {
        "slug": slug,
        "trial_id": scores_data["trial_id"],
        "overall": overall,
        "per_page": breakdown,
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


def render_task_html(task: dict, slug: str) -> str:
    """Render the HTML block for one task."""
    overall = task["overall"]
    rubric_keys = ("overall", "coverage", "visual", "palette", "structural", "typography")
    score_chips = "".join(
        f'<div class="score">'
        f'<div class="score-label">{k}</div>'
        f'<div class="score-value {color_class(overall[k])}">{overall[k]:.3f}</div>'
        f'</div>'
        for k in rubric_keys
    )

    pages_html = []
    for page in task["pages"]:
        per_page_scores = {
            "visual": task["per_page"]["visual"].get(page.replace(".png", ".png"), 0.0),
            "palette": task["per_page"]["palette"].get(page.replace(".png", ".png"), 0.0),
            "structural": task["per_page"]["structural"].get(page.replace(".png", ".html"), 0.0),
            "typography": task["per_page"]["typography"].get(page.replace(".png", ".html"), 0.0),
        }
        info_dl = "".join(
            f"<dt>{k}</dt><dd>{v:.3f}</dd>"
            for k, v in per_page_scores.items()
        )
        gt_panel = (
            f'<img src="{slug}/gt/{page}" alt="gt {page}">'
            if task["has_gt"].get(page) else
            '<div class="panel missing">missing</div>'
        )
        agent_panel = (
            f'<img src="{slug}/agent/{page}" alt="agent {page}">'
            if task["has_agent"].get(page) else
            '<div class="panel missing">missing</div>'
        )
        pages_html.append(f"""
        <div class="page-row">
          <div class="page-info">
            <h3>{page}</h3>
            <dl>{info_dl}</dl>
          </div>
          <div class="panel"><div class="panel-label">ground truth</div>{gt_panel}</div>
          <div class="panel"><div class="panel-label">agent attempt</div>{agent_panel}</div>
        </div>""")

    return f"""<div class="task" id="{slug}">
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
    parser.add_argument("run_dir", type=Path,
                        help="path to a jobs/<run-id> directory")
    parser.add_argument("--out", type=Path, default=Path("viewer"),
                        help="output viewer directory (default: viewer/)")
    args = parser.parse_args()

    if not args.run_dir.is_dir():
        print(f"error: {args.run_dir} is not a directory", file=sys.stderr)
        return 2

    args.out.mkdir(parents=True, exist_ok=True)

    trials = find_trial_dirs(args.run_dir)
    if not trials:
        print(f"no trials found under {args.run_dir}", file=sys.stderr)
        return 1

    print(f"Building viewer for {len(trials)} trial(s)...\n")
    tasks_data = []
    for slug, trial in trials:
        print(f"  {slug}  → ", end="", flush=True)
        t0 = time.time()
        try:
            t = build_one_task(slug, trial, args.out)
        except Exception as exc:
            print(f"FAILED: {exc!r}")
            continue
        elapsed = time.time() - t0
        print(f"overall={t['overall']['overall']:.3f}  ({elapsed:.0f}s)")
        tasks_data.append((slug, t))

    # Build the index.html
    nav = " ".join(f'<a href="#{slug}">{slug.split("-", 1)[0]}</a>' for slug, _ in tasks_data)
    tasks_html = "\n".join(render_task_html(t, slug) for slug, t in tasks_data)
    html = INDEX_HTML.replace("__NAV__", nav).replace("__TASKS__", tasks_html)
    (args.out / "index.html").write_text(html)

    print(f"\nWrote {args.out / 'index.html'}")
    print(f"To open: open {args.out / 'index.html'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
