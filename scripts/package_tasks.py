#!/usr/bin/env python3
"""Package generated tasks into Harbor task directories.

Usage:
    # package every generated task → tasks/
    uv run python scripts/package_tasks.py

    # package one specific task
    uv run python scripts/package_tasks.py generated/dravidian-restaurant-776646

    # custom output root
    uv run python scripts/package_tasks.py --out tasks/batch-1
"""

import argparse
import sys
from pathlib import Path

from proximal_env.harbor_pack import package_task


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("task_dir", type=Path, nargs="?",
                        help="package only this generated task (omit to package all)")
    parser.add_argument("--root", type=Path, default=Path("generated"),
                        help="root containing generated/<slug>/ dirs (default: generated/)")
    parser.add_argument("--out", type=Path, default=Path("tasks"),
                        help="output root for tasks/<slug>/ (default: tasks/)")
    args = parser.parse_args()

    if args.task_dir:
        sources = [args.task_dir]
    else:
        sources = [
            d for d in sorted(args.root.iterdir())
            if d.is_dir() and (d / "design-system.json").exists()
        ]

    if not sources:
        print(f"No generated tasks found under {args.root}")
        return 1

    args.out.mkdir(parents=True, exist_ok=True)

    print(f"Packaging {len(sources)} task(s) → {args.out}/\n")
    n_ok = 0
    n_fail = 0
    for src in sources:
        dst = args.out / src.name
        try:
            summary = package_task(src, dst)
            print(f"  ✓ {src.name}")
            print(f"      → {dst}")
            print(f"      screenshots: {summary['screenshots']}, "
                  f"motifs: {summary['motifs']}, "
                  f"ground_truth: {summary['ground_truth']}")
            n_ok += 1
        except Exception as exc:
            print(f"  ✗ {src.name}  → FAILED: {exc!r}")
            n_fail += 1

    print(f"\n{n_ok} packaged, {n_fail} failed.")
    return 0 if n_fail == 0 else 1


if __name__ == "__main__":
    sys.exit(main())
