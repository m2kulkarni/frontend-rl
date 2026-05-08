#!/usr/bin/env python3
"""Render screenshots for one or all generated tasks.

Usage:
    # render every task under generated/
    uv run python scripts/render_screenshots.py

    # render one specific task
    uv run python scripts/render_screenshots.py generated/dravidian-restaurant-776646

    # render every task under a different root
    uv run python scripts/render_screenshots.py --root generated/batch-2
"""

import argparse
import sys
import time
from pathlib import Path

from proximal_env.render import render_task


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("task_dir", type=Path, nargs="?",
                        help="render only this task directory (omit to render all)")
    parser.add_argument("--root", type=Path, default=Path("generated"),
                        help="root containing task subdirs (default: generated/)")
    args = parser.parse_args()

    if args.task_dir:
        task_dirs = [args.task_dir]
    else:
        task_dirs = [
            d for d in sorted(args.root.iterdir())
            if d.is_dir() and any(d.glob("page-*.html"))
        ]

    if not task_dirs:
        print(f"No task directories with page-*.html found under {args.root}")
        return 1

    print(f"Rendering screenshots for {len(task_dirs)} task(s)...")
    overall_t0 = time.time()
    for td in task_dirs:
        t0 = time.time()
        print(f"  {td.name}")
        try:
            written = render_task(td)
        except Exception as exc:
            print(f"    ✗ FAILED: {exc!r}")
            continue
        elapsed = time.time() - t0
        # Group tiles under their parent page for readable output.
        full_pages = [p for p in written if "-tile-" not in p.name]
        for fp in full_pages:
            kb = fp.stat().st_size / 1024
            print(f"    → {fp.relative_to(td)}  ({kb:.0f} KB)")
            tiles = sorted(p for p in written
                           if p.name.startswith(fp.stem + "-tile-"))
            for t in tiles:
                tkb = t.stat().st_size / 1024
                print(f"        + {t.name}  ({tkb:.0f} KB)")
        n_full = len(full_pages)
        n_tile = len(written) - n_full
        print(f"    ({n_full} pages + {n_tile} tiles in {elapsed:.1f}s)")
    print(f"\nDone in {time.time()-overall_t0:.1f}s")
    return 0


if __name__ == "__main__":
    sys.exit(main())
