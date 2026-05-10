#!/bin/bash
# React variant verifier: builds the agent's edits, renders each route to
# both HTML and screenshot, then runs the same grader the vanilla flow uses.
#
# Why the indirection: the agent edits src/pages/Page<N>.tsx — those don't
# look like the page-N.html files the grader's structural / typography /
# consistency rubrics walk. Rendering to vanilla shape (page-N.html +
# screenshots/page-N.png + design-system.css) lets the grader run unchanged.

set -e
mkdir -p /logs/verifier
mkdir -p /logs/agent

export PYTHONPATH=/tests/grader:${PYTHONPATH:-}

# 1. Build the React app. node_modules is pre-cached in the image, so this
#    is just `vite build` (~1-3s for a small project).
cd /app
if ! npm run build > /logs/agent/build.log 2>&1; then
    echo "vite build FAILED — emitting build-failure reward" >&2
    cat /logs/agent/build.log >&2
    cat > /logs/verifier/reward.json <<EOF
{
  "overall": 0.0,
  "overall_geomean": 0.0,
  "coverage": 0.0,
  "visual": 0.0,
  "palette": 0.0,
  "structural": 0.0,
  "typography": 0.0,
  "consistency": 0.0,
  "animation": 0.0,
  "build_succeeded": 0.0
}
EOF
    exit 0
fi

# 2. Render each route to /app/_candidate/ — page-N.html + screenshots/.
#    This is what the grader actually compares against.
python3 -c "
from pathlib import Path
from proximal_env.render import render_react_to_files
result = render_react_to_files(Path('/app'), Path('/app/_candidate'))
print(f'rendered {result}')
" > /logs/agent/render.log 2>&1
RENDER_EXIT=$?
if [ $RENDER_EXIT -ne 0 ]; then
    echo "render FAILED — emitting all-zero reward" >&2
    cat /logs/agent/render.log >&2
    cat > /logs/verifier/reward.json <<EOF
{
  "overall": 0.0,
  "overall_geomean": 0.0,
  "coverage": 0.0,
  "visual": 0.0,
  "palette": 0.0,
  "structural": 0.0,
  "typography": 0.0,
  "consistency": 0.0,
  "animation": 0.0,
  "build_succeeded": 1.0,
  "render_succeeded": 0.0
}
EOF
    exit 0
fi

# Mirror /app/_candidate/* into /app/output/* so Harbor captures the
# rendered React output as the trial artifact. Without this, artifacts/output/
# is empty for React trials (the agent edits src/pages/, not output/) and
# downstream tools — the visualizer especially — have nothing to compare
# against ground truth.
mkdir -p /app/output
cp -r /app/_candidate/. /app/output/ 2>/dev/null || true

# 3. Run the grader against the vanilla-shaped candidate dir.
if python3 /tests/grader/run_grader.py /tests/ground_truth /app/_candidate \
        > /logs/verifier/reward.json 2>/logs/verifier/grader-stderr.log; then
    echo "Grader succeeded:"
    cat /logs/verifier/reward.json
else
    echo "Grader failed — emitting fallback reward.json (all zeros)." >&2
    cat /logs/verifier/grader-stderr.log >&2 || true
    cat > /logs/verifier/reward.json <<EOF
{
  "overall": 0.0,
  "overall_geomean": 0.0,
  "coverage": 0.0,
  "visual": 0.0,
  "palette": 0.0,
  "structural": 0.0,
  "typography": 0.0,
  "consistency": 0.0,
  "animation": 0.0,
  "build_succeeded": 1.0,
  "render_succeeded": 1.0,
  "grader_succeeded": 0.0
}
EOF
fi
