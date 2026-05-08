#!/usr/bin/env python3
"""Run the composite grader on a (ground_truth, candidate) pair.

Usage:
    uv run python scripts/run_grader.py \\
        generated/dravidian-restaurant-776646/ \\
        peek/dravidian-restaurant-776646/agent/
"""

import argparse
import json
import sys
from pathlib import Path

from proximal_env.grader import grade


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__,
                                     formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("ground_truth", type=Path)
    parser.add_argument("candidate", type=Path)
    args = parser.parse_args()

    if not args.ground_truth.is_dir():
        print(f"error: ground truth dir not found: {args.ground_truth}")
        return 2
    if not args.candidate.is_dir():
        print(f"error: candidate dir not found: {args.candidate}")
        return 2

    print(f"Ground truth:  {args.ground_truth}")
    print(f"Candidate:     {args.candidate}")
    print()

    result = grade(args.ground_truth, args.candidate)
    print(json.dumps(result, indent=2))
    return 0


if __name__ == "__main__":
    sys.exit(main())
