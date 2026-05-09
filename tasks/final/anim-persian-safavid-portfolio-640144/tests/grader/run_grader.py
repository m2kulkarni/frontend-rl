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
