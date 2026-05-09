#!/bin/bash
# Build tasks/dataset.toml listing every packaged task in tasks/.
# Idempotent — re-running rebuilds from scratch.

set -e
cd "$(dirname "$0")/.."

if [ ! -d tasks ]; then
    echo "tasks/ does not exist. Run scripts/package_tasks.py first." >&2
    exit 1
fi

# Wipe any prior dataset.toml so we start clean.
rm -f tasks/dataset.toml tasks/README.md

# Initialize a fresh dataset.toml at tasks/.
harbor init -d proximal/eval-batch -o tasks/ --description "Proximal eval — multi-page website-replication tasks" 2>&1 | tail -3

# Add every task subdir.
n_added=0
for d in tasks/*/; do
    if [ -f "${d}task.toml" ]; then
        harbor add "${d%/}" -t tasks/ > /dev/null
        n_added=$((n_added + 1))
    fi
done

echo "Added ${n_added} task(s) to tasks/dataset.toml"
