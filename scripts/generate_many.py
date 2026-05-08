#!/usr/bin/env python3
"""Generate N tasks via the full pipeline. Each goes to generated/<slug>/.

Sequential by default — 5 tasks × ~5 min each ≈ 25 min wall clock.
Per-task failures don't abort the run; we record and continue.

Usage:
    uv run python scripts/generate_many.py --n 5 --seed 43
    uv run python scripts/generate_many.py --n 10 --seed 100 --out generated/batch-2/
"""

import argparse
import json
import sys
import time
import traceback
from pathlib import Path

from dotenv import load_dotenv

from proximal_env.generator.css import render_design_system_css
from proximal_env.generator.design_system import generate_design_system
from proximal_env.generator.page import basic_validate_html, generate_all_pages
from proximal_env.motifs import load_style
from proximal_env.taxonomy import TaxonomyPoint, sample_stratified


def generate_one_task(point: TaxonomyPoint, out_root: Path) -> dict:
    """Run the full pipeline for one task. Returns a summary dict."""
    library = load_style(point.style)
    out_dir = out_root / point.slug()
    out_dir.mkdir(parents=True, exist_ok=True)

    t0 = time.time()

    print(f"  [1/3] design system pass...")
    ds = generate_design_system(point, library)
    (out_dir / "design-system.json").write_text(json.dumps(ds.raw, indent=2))
    (out_dir / "design-system.css").write_text(render_design_system_css(ds))

    print(f"  [2/3] generating {ds.page_count} pages in parallel...")
    pages = generate_all_pages(ds, library, point)

    print(f"  [3/3] validating + writing pages...")
    page_errors_total = 0
    for p in pages:
        errs = basic_validate_html(p)
        (out_dir / p.filename).write_text(p.html)
        if errs:
            page_errors_total += 1

    elapsed = time.time() - t0
    return {
        "slug": point.slug(),
        "site_name": ds.site_name,
        "page_count": ds.page_count,
        "page_errors": page_errors_total,
        "elapsed_sec": elapsed,
    }


def main() -> int:
    load_dotenv()

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", type=Path, default=Path("generated"))
    parser.add_argument("--seed", type=int, required=True)
    parser.add_argument("--n", type=int, default=5)
    args = parser.parse_args()

    args.out.mkdir(parents=True, exist_ok=True)

    points = sample_stratified(args.n, rng_seed=args.seed)

    print(f"Plan: generate {len(points)} tasks (seed={args.seed}) → {args.out}")
    for p in points:
        print(f"  - {p.slug():50s}  [{p.style}, {p.variant}, {p.purpose}]")
    print()

    results = []
    overall_t0 = time.time()
    for i, point in enumerate(points, 1):
        print(f"==== task {i}/{len(points)}: {point.slug()} ====")
        try:
            result = generate_one_task(point, args.out)
            results.append({**result, "ok": True})
            print(f"  ✓ {result['site_name']!r}  "
                  f"({result['elapsed_sec']:.0f}s, {result['page_count']} pages, "
                  f"{result['page_errors']} validation warnings)")
        except Exception as exc:
            traceback.print_exc()
            results.append({"slug": point.slug(), "ok": False, "error": str(exc)})
            print(f"  ✗ FAILED: {exc!r}")
        print()

    print(f"==== Summary ({sum(1 for r in results if r['ok'])}/{len(results)} succeeded, "
          f"total {time.time()-overall_t0:.0f}s) ====")
    for r in results:
        if r.get("ok"):
            print(f"  ✓ {r['slug']:50s} → {r['site_name']!r:50s} "
                  f"({r['page_count']} pages, {r['elapsed_sec']:.0f}s)")
        else:
            print(f"  ✗ {r['slug']:50s} → {r['error'][:60]}")
    return 0 if all(r.get("ok") for r in results) else 1


if __name__ == "__main__":
    sys.exit(main())
