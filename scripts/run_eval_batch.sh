#!/bin/bash
# Run Claude Code (Opus 4.7) against every task in tasks/ via Harbor on Modal,
# K attempts per task, N concurrent trials.
#
# Prereqs:
#   - tasks/<slug>/ directories already packaged via scripts/package_tasks.py
#   - tasks/dataset.toml exists and lists every task (created by harbor add)
#   - ANTHROPIC_API_KEY in environment
#
# Usage:
#   scripts/run_eval_batch.sh           # all tasks, 1 attempt each, 12 concurrent
#   N_CONCURRENT=8 K=3 scripts/run_eval_batch.sh   # 3 attempts × 8 concurrent

set -e
cd "$(dirname "$0")/.."

: "${ANTHROPIC_API_KEY:?Set ANTHROPIC_API_KEY (or put it in .env and load via 'source <(grep ANTHROPIC_API_KEY .env)')}"
: "${N_CONCURRENT:=12}"
: "${K:=1}"
: "${MAX_BUDGET_USD:=20}"

if [ ! -f tasks/dataset.toml ]; then
    echo "tasks/dataset.toml is missing. Run scripts/build_dataset_toml.sh first." >&2
    exit 1
fi

n_tasks=$(grep -c '^\[\[tasks\]\]' tasks/dataset.toml)
echo "Running ${n_tasks} task(s), K=${K} attempts each, ${N_CONCURRENT} concurrent."
echo "Estimated wall clock: $(( (n_tasks * K * 25 + N_CONCURRENT - 1) / N_CONCURRENT )) minutes."

harbor run \
    --path tasks/ \
    -a claude-code \
    -m claude-opus-4-7 \
    -e modal \
    -k "${K}" \
    -n "${N_CONCURRENT}" \
    --ak "max_budget_usd=${MAX_BUDGET_USD}" \
    -y
