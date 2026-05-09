"""Composite-grader rubrics.

Each module in this package implements one signal as:
    NAME: str
    def score(ground_truth_dir: Path, candidate_dir: Path) -> float  # in [0, 1]

A score of 1.0 = candidate is indistinguishable from ground truth on this signal.
A score of 0.0 = candidate is unrelated.

Rubrics are validated individually (see scripts/validate_rubric.py) before being
composed into the overall grader.
"""
