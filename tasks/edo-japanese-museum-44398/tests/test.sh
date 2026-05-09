#!/bin/bash
# Composite grader: visual SSIM + palette histogram (Lab) + structural DOM tag
# Jaccard + typography font-set Jaccard, all gated on coverage. Code lives in
# /tests/grader/proximal_env/ — bundled at task-package time so each task is
# self-contained.
#
# Output: /logs/verifier/reward.json with all sub-scores plus 'overall'. Every
# value is numeric (Harbor's VerifierResult schema rejects strings/bools).

set -e
mkdir -p /logs/verifier

# Make the bundled proximal_env package importable.
export PYTHONPATH=/tests/grader:${PYTHONPATH:-}

if python3 /tests/grader/run_grader.py /tests/ground_truth /app/output \
        > /logs/verifier/reward.json 2>/logs/verifier/grader-stderr.log; then
    echo "Grader succeeded:"
    cat /logs/verifier/reward.json
else
    echo "Grader failed — emitting fallback reward.json (all zeros)." >&2
    echo "stderr was:" >&2
    cat /logs/verifier/grader-stderr.log >&2 || true
    cat > /logs/verifier/reward.json <<EOF
{
  "overall": 0.0,
  "coverage": 0.0,
  "visual": 0.0,
  "palette": 0.0,
  "structural": 0.0,
  "typography": 0.0,
  "grader_failed": 1
}
EOF
fi
