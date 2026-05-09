"""Composite grader — weighted combination of the per-rubric scores.

The composite score is a coverage-gated geometric mean of the visual,
palette, structural, and typography rubrics.

Why geometric mean: a candidate that nails 4 of 5 dimensions but completely
misses the palette should not score 0.8 — it should score lower, because
"right structure, wrong vibe" is a much bigger failure than "right vibe,
slightly off structure." Geometric mean is harsher on weak components than
arithmetic mean.

Why coverage as a multiplier: a candidate that produced 4 of 6 pages should
not have its per-page scores averaged-away; the missing pages should count.
Coverage = 4/6 → composite ≤ 0.667.

Weights are reasonable defaults for v1. Calibration against ~30 hand-ranked
pairs would tune these to maximize agreement with human judgment.
"""

from __future__ import annotations

from pathlib import Path

from proximal_env.rubric import (
    animation, coverage, palette, structural, typography, visual,
)

# Default weights. Tunable. Animation is only included when the task is
# actually animated — see grade() below.
WEIGHTS: dict[str, float] = {
    "visual": 2.0,       # the primary "does it look right" signal
    "palette": 1.0,
    "structural": 1.0,
    "typography": 0.5,   # weakest signal in current implementation
    "animation": 1.0,    # only contributes when task is animated
}

COMPOSED_STATIC = ("visual", "palette", "structural", "typography")
COMPOSED_ANIMATED = ("visual", "palette", "structural", "typography", "animation")


def _weighted_geometric_mean(scores: dict[str, float], keys: tuple[str, ...]) -> float:
    """Weighted geometric mean over `keys`, using WEIGHTS."""
    total_weight = sum(WEIGHTS[k] for k in keys)
    product = 1.0
    for k in keys:
        # Floor each score at a small epsilon so a single 0 doesn't zero the
        # product; we still want low scores to drag the composite down.
        s = max(scores[k], 1e-3)
        product *= s ** (WEIGHTS[k] / total_weight)
    return product


def grade(ground_truth_dir: Path, candidate_dir: Path) -> dict:
    """Run every rubric and produce a composite score.

    Returns a dict shaped to fit Harbor's reward.json schema (all values
    numeric). For animated tasks, the `animation` key is also present and
    contributes to the composite. For static tasks, animation is omitted
    entirely (so the geomean isn't diluted by a free 1.0 on an axis we
    aren't actually measuring).

    Animated case:
        {
          "overall":    float,  # coverage * geomean(visual, palette, structural,
                                #                   typography, animation)
          "coverage":   float,
          "visual":     float,
          "palette":    float,
          "structural": float,
          "typography": float,
          "animation":  float
        }

    Static case: same dict minus `animation`.
    """
    gt = Path(ground_truth_dir)
    cand = Path(candidate_dir)
    animated = animation.is_animated_task(gt)

    cov = coverage.score(gt, cand)
    vis = visual.score(gt, cand)
    pal = palette.score(gt, cand)
    stc = structural.score(gt, cand)
    typ = typography.score(gt, cand)

    components: dict[str, float] = {
        "visual": vis, "palette": pal, "structural": stc, "typography": typ,
    }
    if animated:
        components["animation"] = animation.score(gt, cand)

    keys = COMPOSED_ANIMATED if animated else COMPOSED_STATIC
    geom = _weighted_geometric_mean(components, keys)
    overall = cov * geom

    result: dict[str, float] = {
        "overall": float(overall),
        "coverage": float(cov),
        **{k: float(v) for k, v in components.items()},
    }
    return result
