"""Coverage rubric: did the candidate produce all expected pages?

This is a gate signal. It returns 1.0 when the candidate has all the
`page-*.html` files the ground truth has, and falls proportionally when pages
are missing. Extra files in the candidate (e.g., a `styles.css`) do not count
against the score — only missing-required-pages do.

Used in the composite grader as a coverage multiplier: pages that didn't ship
should not be averaged-away by other strong signals on the pages that did.
"""

from pathlib import Path

NAME = "coverage"


def score(ground_truth_dir: Path, candidate_dir: Path) -> float:
    """Fraction of ground-truth `page-*.html` filenames also present in the candidate.

    >>> score returns 1.0 when every gt page is matched by name in candidate
    >>> score returns 0.0 when none are
    >>> score returns 0.5 when half are missing
    """
    gt = Path(ground_truth_dir)
    cand = Path(candidate_dir)
    expected = sorted(p.name for p in gt.glob("page-*.html"))
    if not expected:
        return 0.0
    candidate_names = {p.name for p in cand.glob("page-*.html")}
    matched = sum(1 for name in expected if name in candidate_names)
    return matched / len(expected)
