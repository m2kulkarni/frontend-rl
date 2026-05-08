#!/usr/bin/env python3
"""Validate a single rubric on a (ground_truth, candidate) pair.

Reports:
    - identity score:   rubric.score(ground_truth, ground_truth)
    - candidate score:  rubric.score(ground_truth, candidate)

A rubric "passes" if the identity score is >= 0.95. The candidate score is
reported for inspection — discrimination (lower than identity) is informative
but not strictly required (e.g., a coverage rubric will be 1.0 for any
candidate that produces all expected pages).

Usage:
    uv run python scripts/validate_rubric.py coverage \\
        generated/dravidian-restaurant-776646/ \\
        peek/dravidian-restaurant-776646/agent/
"""

import argparse
import importlib
import sys
from pathlib import Path


IDENTITY_THRESHOLD = 0.95


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("rubric", help="rubric module name (e.g. 'coverage', 'visual')")
    parser.add_argument("ground_truth", type=Path,
                        help="path to the ground-truth task directory")
    parser.add_argument("candidate", type=Path,
                        help="path to the candidate (agent output) directory")
    args = parser.parse_args()

    if not args.ground_truth.is_dir():
        print(f"error: ground truth dir not found: {args.ground_truth}")
        return 2
    if not args.candidate.is_dir():
        print(f"error: candidate dir not found: {args.candidate}")
        return 2

    module_path = f"proximal_env.rubric.{args.rubric}"
    try:
        module = importlib.import_module(module_path)
    except ImportError as exc:
        print(f"error: could not import {module_path}: {exc}")
        return 2

    name = getattr(module, "NAME", args.rubric)
    print(f"Rubric:        {name}")
    print(f"Ground truth:  {args.ground_truth}")
    print(f"Candidate:     {args.candidate}")
    print()

    identity = module.score(args.ground_truth, args.ground_truth)
    candidate = module.score(args.ground_truth, args.candidate)

    identity_pass = identity >= IDENTITY_THRESHOLD
    print(f"  identity   score (gt vs gt):        {identity:.4f}  "
          f"{'PASS' if identity_pass else 'FAIL'}  (threshold ≥ {IDENTITY_THRESHOLD})")
    print(f"  candidate  score (gt vs candidate): {candidate:.4f}")
    print()

    if not identity_pass:
        print("✗ Rubric FAILED identity check. Fix before moving on.")
        return 1

    print("✓ Identity check passed.")
    if candidate < identity:
        delta = identity - candidate
        print(f"✓ Discriminates: candidate is {delta:.4f} below identity.")
    else:
        print("  Score did not drop on this candidate. That's fine if the rubric")
        print("  measures something the candidate happens to have nailed (e.g.,")
        print("  coverage when the agent produced all pages).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
