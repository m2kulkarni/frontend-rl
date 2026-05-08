#!/usr/bin/env python3
"""End-to-end generator smoke test.

Samples one taxonomy point, runs the design-system pass, fans out to generate
each page, writes everything to disk under generated/<slug>/. No screenshots,
no Harbor packaging yet — those are next implementation slices.

Usage:
    uv run python scripts/generate_one.py
    uv run python scripts/generate_one.py --seed 42 --out generated/
    uv run python scripts/generate_one.py --skip-pages    # design system only (cheap)
"""

import argparse
import json
import sys
import time
from pathlib import Path

from dotenv import load_dotenv

from proximal_env.generator.css import render_design_system_css
from proximal_env.generator.design_system import generate_design_system
from proximal_env.generator.page import basic_validate_html, generate_all_pages
from proximal_env.motifs import load_style
from proximal_env.taxonomy import sample_stratified


def main() -> int:
    load_dotenv()

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--out", type=Path, default=Path("generated"))
    parser.add_argument("--seed", type=int, default=42)
    parser.add_argument("--n", type=int, default=5,
                        help="how many points to sample; first one is used")
    parser.add_argument("--skip-pages", action="store_true",
                        help="run only the design-system pass (faster, no page calls)")
    args = parser.parse_args()

    args.out.mkdir(parents=True, exist_ok=True)

    points = sample_stratified(args.n, rng_seed=args.seed)
    point = points[0]

    print(f"Sampled task:")
    print(f"  slug:    {point.slug()}")
    print(f"  style:   {point.style}")
    print(f"  variant: {point.variant}")
    print(f"  purpose: {point.purpose}")
    print(f"  seed:    {point.seed}")
    print()

    library = load_style(point.style)
    print(f"Library: {len(library.motifs)} motifs · "
          f"{len(library.pairings_period)+len(library.pairings_modern)} font pairings")
    print()

    out_dir = args.out / point.slug()
    out_dir.mkdir(parents=True, exist_ok=True)

    # ---- Stage 2: design system ----
    t0 = time.time()
    print("[1/3] Calling Opus design-system pass...")
    ds = generate_design_system(point, library)
    print(f"      done in {time.time()-t0:.1f}s · "
          f"site={ds.site_name!r} · pages={ds.page_count}")

    (out_dir / "design-system.json").write_text(json.dumps(ds.raw, indent=2))

    # ---- design-system.css from the JSON ----
    css = render_design_system_css(ds)
    (out_dir / "design-system.css").write_text(css)
    print(f"      wrote design-system.json + design-system.css")
    print()

    if args.skip_pages:
        print("--skip-pages set; stopping here.")
        return 0

    # ---- Stage 3: page generation ----
    t1 = time.time()
    print(f"[2/3] Fanning out {ds.page_count} parallel Opus calls for pages...")
    pages = generate_all_pages(ds, library, point)
    print(f"      done in {time.time()-t1:.1f}s")
    print()

    # ---- Validate + write ----
    print("[3/3] Validating + writing pages...")
    any_errors = False
    for p in pages:
        errors = basic_validate_html(p)
        status = "ok" if not errors else f"WARN: {', '.join(errors)}"
        (out_dir / p.filename).write_text(p.html)
        print(f"      {p.filename:14s}  {len(p.html):>6d} bytes  stop={p.stop_reason}  {status}")
        if errors:
            any_errors = True

    print()
    print(f"All artifacts → {out_dir}")
    print(f"Open page-1.html in a browser to review.")
    if any_errors:
        print("(some validation warnings above; pages were still written)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
