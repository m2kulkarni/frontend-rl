#!/usr/bin/env python3
"""Generate N tasks via the full pipeline. Each goes to generated/<slug>/.

Sequential by default — ~5 min per task. With --concurrent=K, K tasks generate
in parallel (each task internally already runs its 6 page-LLM calls in
parallel; concurrent=K means K of those task-level pipelines overlap).
Per-task failures don't abort the run; we record and continue.

Usage:
    uv run python scripts/generate_many.py --n 5 --seed 43
    uv run python scripts/generate_many.py --n 50 --seed 100 --concurrent 3
"""

import argparse
import concurrent.futures as _cf
import json
import sys
import threading
import time
import traceback
from pathlib import Path

from dotenv import load_dotenv

from proximal_env.generator.css import render_design_system_css
from proximal_env.generator.design_system import generate_design_system
from proximal_env.generator.page import basic_validate_html, generate_all_pages
from proximal_env.motifs import load_style
from proximal_env.taxonomy import (
    TaxonomyPoint, sample_stratified, sample_stratified_animated
)

_PRINT_LOCK = threading.Lock()


def _safe_print(*args, **kwargs) -> None:
    """Thread-safe print so concurrent task output doesn't interleave mid-line."""
    with _PRINT_LOCK:
        print(*args, **kwargs, flush=True)


def generate_one_task(point: TaxonomyPoint, out_root: Path) -> dict:
    """Run the full pipeline for one task. Returns a summary dict.

    Thread-safe — uses _safe_print so progress lines don't interleave when
    multiple tasks generate concurrently.
    """
    library = load_style(point.style)
    out_dir = out_root / point.slug()
    out_dir.mkdir(parents=True, exist_ok=True)
    slug = point.slug()

    t0 = time.time()
    _safe_print(f"  [{slug}] design-system pass...")
    ds = generate_design_system(point, library)
    (out_dir / "design-system.json").write_text(json.dumps(ds.raw, indent=2))
    (out_dir / "design-system.css").write_text(render_design_system_css(ds, library))

    _safe_print(f"  [{slug}] generating {ds.page_count} pages...")
    pages = generate_all_pages(ds, library, point)

    page_errors_total = 0
    for p in pages:
        errs = basic_validate_html(p)
        # React tasks emit nested paths like `src/pages/Page1.tsx` — ensure
        # parent dirs exist before writing.
        target = out_dir / p.filename
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(p.html)
        if errs:
            page_errors_total += 1

    elapsed = time.time() - t0
    return {
        "slug": slug,
        "site_name": ds.site_name,
        "page_count": ds.page_count,
        "page_errors": page_errors_total,
        "elapsed_sec": elapsed,
    }


def _run_one(point: TaxonomyPoint, out_root: Path, idx: int, total: int) -> dict:
    """Wrapper for ThreadPoolExecutor — catches per-task failures."""
    _safe_print(f"==== [{idx}/{total}] starting {point.slug()} ====")
    try:
        result = generate_one_task(point, out_root)
        _safe_print(
            f"  ✓ [{idx}/{total}] {point.slug()}  →  {result['site_name']!r}  "
            f"({result['elapsed_sec']:.0f}s, {result['page_count']} pages, "
            f"{result['page_errors']} warnings)"
        )
        return {**result, "ok": True}
    except Exception as exc:
        _safe_print(f"  ✗ [{idx}/{total}] {point.slug()} FAILED: {exc!r}")
        traceback.print_exc()
        return {"slug": point.slug(), "ok": False, "error": str(exc)}


def main() -> int:
    load_dotenv()

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", type=Path, default=Path("generated"))
    parser.add_argument("--seed", type=int, required=True)
    parser.add_argument("--n", type=int, default=5)
    parser.add_argument("--concurrent", type=int, default=1,
                        help="Number of tasks to generate in parallel.")
    parser.add_argument("--animated", action="store_true",
                        help="Generate animated tasks (every sample sets animated=True).")
    parser.add_argument("--variant", choices=["period_faithful", "modern", "bold"],
                        default=None,
                        help="If set, override the sampled variant on every point. "
                             "Useful for batching a single variant (e.g., bold).")
    parser.add_argument("--framework", choices=["vanilla", "react"],
                        default=None,
                        help="If set, lock all sampled points to this framework. "
                             "If omitted, the sampler mixes across all FRAMEWORKS.")
    args = parser.parse_args()

    args.out.mkdir(parents=True, exist_ok=True)

    sampler = sample_stratified_animated if args.animated else sample_stratified
    points = sampler(args.n, rng_seed=args.seed, framework=args.framework)
    if args.variant:
        points = [
            TaxonomyPoint(p.style, args.variant, p.purpose, p.seed, p.animated,
                          framework=p.framework)
            for p in points
        ]

    print(f"Plan: generate {len(points)} tasks (seed={args.seed}, "
          f"concurrent={args.concurrent}) → {args.out}")
    for p in points:
        print(f"  - {p.slug():50s}  [{p.style}, {p.variant}, {p.purpose}]")
    print()

    overall_t0 = time.time()
    results: list[dict] = []
    if args.concurrent == 1:
        # Sequential — preserves nice strict ordering of progress output.
        for i, point in enumerate(points, 1):
            results.append(_run_one(point, args.out, i, len(points)))
    else:
        with _cf.ThreadPoolExecutor(max_workers=args.concurrent) as ex:
            futures = {
                ex.submit(_run_one, p, args.out, i, len(points)): p
                for i, p in enumerate(points, 1)
            }
            for fut in _cf.as_completed(futures):
                results.append(fut.result())

    n_ok = sum(1 for r in results if r.get("ok"))
    print()
    print(f"==== Summary ({n_ok}/{len(results)} succeeded, "
          f"total wall clock {time.time()-overall_t0:.0f}s) ====")
    # Sort by slug for stable summary regardless of completion order.
    for r in sorted(results, key=lambda r: r.get("slug", "")):
        if r.get("ok"):
            print(f"  ✓ {r['slug']:50s} → {r['site_name']!r:50s} "
                  f"({r['page_count']} pages, {r['elapsed_sec']:.0f}s)")
        else:
            print(f"  ✗ {r['slug']:50s} → {r.get('error', 'unknown')[:60]}")
    return 0 if n_ok == len(results) else 1


if __name__ == "__main__":
    sys.exit(main())
