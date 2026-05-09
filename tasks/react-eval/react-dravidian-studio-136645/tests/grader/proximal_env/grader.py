"""Decomposed grader — independent reward streams, no geometric mean.

The grader emits each rubric score independently, plus `overall` (set to
the visual SSIM score) as the primary outcome reward Harbor records as
"the" scalar reward for the trial.

We *used* to compute a weighted geometric mean across all rubrics gated by
coverage. That worked for human-readable single-score ranking but is bad
for any RL use of this env:

- Geomean flattens per-axis gradient (high-scoring rubrics dominate the
  derivative; weak rubrics learn slowly or not at all).
- A single near-zero rubric (typography is the canonical example) dragged
  the whole composite down by a flat factor on every trial — flat penalty,
  no gradient.
- Coverage-as-multiplicative-gate creates a discontinuous reward landscape:
  a missed page has outsized impact relative to gradual quality changes.

Design now: each rubric is its own number in [0, 1], emitted side-by-side.
The "overall" key is **visual SSIM** (the actual outcome we care about) so
Harbor's default scalar-reward path keeps working. An optional
`overall_geomean` is also emitted for backward-compat with the visualizer's
existing aggregate display — it's no longer load-bearing.

See `docs/rubric_audit.md` for the full reasoning + the per-rubric
hack-fix plan.
"""

from __future__ import annotations

from pathlib import Path

from proximal_env.rubric import (
    animation, consistency, coverage, palette, structural, typography, visual,
)


# Optional: an aggregate display number for the visualizer's score chip.
# This is NOT used as a training signal and is NOT what Harbor reads as
# the trial reward. It's a friendly summary stat for humans skimming the
# viewer.
_DISPLAY_WEIGHTS: dict[str, float] = {
    "visual": 2.0,
    "palette": 1.0,
    "structural": 1.0,
    "typography": 0.5,
    "animation": 1.0,
    "consistency": 0.5,
}


def _display_geomean(scores: dict[str, float]) -> float:
    """Coverage-free weighted geomean over whatever scores are present.

    Used only for `overall_geomean` in reward.json — a human-readable summary
    column in the visualizer. NOT used by Harbor, NOT used as a training
    signal. If you're tempted to use this for anything important, read
    docs/rubric_audit.md instead.
    """
    keys = [k for k in _DISPLAY_WEIGHTS if k in scores]
    if not keys:
        return 0.0
    total_weight = sum(_DISPLAY_WEIGHTS[k] for k in keys)
    product = 1.0
    for k in keys:
        s = max(scores[k], 1e-3)
        product *= s ** (_DISPLAY_WEIGHTS[k] / total_weight)
    return product


def grade(ground_truth_dir: Path, candidate_dir: Path) -> dict:
    """Run every rubric and emit independent reward streams.

    Returns a dict of all numeric scores. Schema:

        {
          "overall":          float,  # = visual; this is THE reward Harbor logs
          "overall_geomean":  float,  # display-only (visualizer)
          "coverage":         float,
          "visual":           float,
          "palette":          float,
          "structural":       float,
          "typography":       float,
          "consistency":      float,
          "animation":        float,  # animated tasks only — key omitted otherwise
        }

    Each value is a Python float in [0, 1]. Coverage is no longer a
    multiplicative gate — it's just another stream.
    """
    gt = Path(ground_truth_dir)
    cand = Path(candidate_dir)
    animated = animation.is_animated_task(gt)

    cov = coverage.score(gt, cand)
    vis = visual.score(gt, cand)
    pal = palette.score(gt, cand)
    stc = structural.score(gt, cand)
    typ = typography.score(gt, cand)
    con = consistency.score(gt, cand)

    components: dict[str, float] = {
        "coverage": cov,
        "visual": vis,
        "palette": pal,
        "structural": stc,
        "typography": typ,
        "consistency": con,
    }
    if animated:
        components["animation"] = animation.score(gt, cand)

    # The headline reward Harbor logs is the visual SSIM score — that's the
    # actual "did the agent solve the replication task" signal. Auxiliary
    # streams are siblings, not sub-components of overall.
    overall = vis

    return {
        "overall": float(overall),
        "overall_geomean": float(_display_geomean(components)),
        **{k: float(v) for k, v in components.items()},
    }
