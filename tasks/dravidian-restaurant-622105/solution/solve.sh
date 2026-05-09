#!/bin/bash
# Oracle baseline: copy the ground-truth pages into the agent's output dir.
# When the real grader is wired up, running with this 'agent' should yield
# overall ≈ 1.0 — a sanity check that the rendering / comparison pipeline is
# deterministic. Note: Harbor mounts solution/ at /solution/ during oracle runs.

set -e
mkdir -p /app/output
cp /solution/ground_truth/page-*.html /app/output/
if [ -f /solution/ground_truth/design-system.css ]; then
    cp /solution/ground_truth/design-system.css /app/output/
fi
echo "Oracle copied $(find /app/output -maxdepth 1 -name 'page-*.html' | wc -l | tr -d ' ') ground-truth pages → /app/output/"
