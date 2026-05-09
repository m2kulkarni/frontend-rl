#!/usr/bin/env python3
"""Adversarial regression suite for the rubrics.

Each adversary is a hand-built lazy attacker that maximizes its target rubric
*without* doing the replication task. Every fixed hack should score ≤ 0.2 on
its target. If any scores higher, the rubric still has a hole — re-open
docs/rubric_audit.md.

Run:
    uv run python scripts/adversarial_rubric_test.py
"""

import shutil
import sys
import tempfile
from pathlib import Path

from proximal_env.rubric import (
    consistency, coverage, structural, typography, animation,
)

GT_SLUG = "anim-edo-japanese-editorial-747422"
GT_DIR = Path("generated") / GT_SLUG

# Each adversary returns a dict {label: <Path or None>} where None means
# "use GT_DIR itself" — convenience for sanity-vs-self.
def six_clones(gt: Path, td: Path) -> Path:
    """Hack: emit six identical copies of GT page-1. Used to score 1.0 on
    naive consistency rubric; should now score ~0 because diversity = 0."""
    src = (gt / "page-1.html").read_text()
    for i in range(1, 7):
        (td / f"page-{i}.html").write_text(src)
    return td


def empty_stubs(gt: Path, td: Path) -> Path:
    """Hack: emit six empty <html><body></body></html>. Used to score 1.0
    on naive coverage; should now score 0 because each fails the gate."""
    for i in range(1, 7):
        (td / f"page-{i}.html").write_text("<html><body></body></html>")
    return td


def hidden_tag_stuffer(gt: Path, td: Path) -> Path:
    """Hack: pack every GT structural tag into a `display:none` subtree.
    Used to inflate structural Jaccard; should now score ~0 because the
    rubric skips hidden subtrees."""
    # Copy GT to extract its tag set, then make a single page that hides them all.
    from collections import Counter
    from bs4 import BeautifulSoup

    gt_tags: Counter = Counter()
    for p in gt.glob("page-*.html"):
        soup = BeautifulSoup(p.read_text(), "lxml")
        for el in soup.find_all(True):
            gt_tags[el.name] += 1
    hidden = "".join(f"<{t}></{t}>" * c for t, c in gt_tags.items())
    body = (
        f'<html><body>'
        f'<div style="display:none">{hidden}</div>'
        f'<p>visible-but-thin</p>'
        f'</body></html>'
    )
    for i in range(1, 7):
        (td / f"page-{i}.html").write_text(body)
    return td


def font_stuffer(gt: Path, td: Path) -> Path:
    """Hack: load + declare every Google Font in one big stack. Used to
    score 1.0 on naive typography; should now penalize via larger union."""
    big_link = (
        '<link href="https://fonts.googleapis.com/css2?'
        'family=Cinzel&family=Lora&family=Playfair+Display&family=Bodoni+Moda'
        '&family=Trajan&family=Spectral&family=Eczar&family=Yatra+One'
        '&family=Yuji+Syuku&family=Kosugi+Maru&family=Klee+One&family=Inter">'
    )
    big_stack = (
        '"Cinzel", "Lora", "Playfair Display", "Bodoni Moda", "Trajan", '
        '"Spectral", "Eczar", "Yatra One", "Yuji Syuku", "Kosugi Maru", '
        '"Klee One", "Inter", serif'
    )
    body = (
        f'<html><head>{big_link}<style>body {{ font-family: {big_stack}; }}</style></head>'
        f'<body>{"<p>real visible content lorem ipsum dolor sit amet" * 5}</p></body></html>'
    )
    for i in range(1, 7):
        (td / f"page-{i}.html").write_text(body)
    return td


def dead_css_var(gt: Path, td: Path) -> Path:
    """Hack: declare CSS variables for the GT fonts but never reference them.
    Used to fake font usage; should now exclude unused vars from the set."""
    body = (
        '<html><head><style>'
        ':root { --font-display: "Cinzel"; --font-body: "Lora"; }'
        'body { font-family: "Helvetica", sans-serif; }'
        '</style></head>'
        f'<body>{"<p>real visible content with enough characters to pass</p>" * 5}</body></html>'
    )
    for i in range(1, 7):
        (td / f"page-{i}.html").write_text(body)
    return td


# ----- runner -----

def run_one(name: str, build_fn, target_rubric: str, max_score: float, gt: Path) -> tuple[bool, float]:
    """Build the adversary, score it on the target rubric, return (passed, score)."""
    with tempfile.TemporaryDirectory() as td:
        cand = build_fn(gt, Path(td))
        rubric_modules = {
            "coverage": coverage,
            "structural": structural,
            "typography": typography,
            "consistency": consistency,
            "animation": animation,
        }
        mod = rubric_modules[target_rubric]
        score = mod.score(gt, cand)
        passed = score <= max_score
        flag = "PASS" if passed else "FAIL"
        print(f"  [{flag}] {name:30s}  → {target_rubric:12s} = {score:.3f}  (max {max_score})")
        return passed, score


def main() -> int:
    if not GT_DIR.is_dir():
        print(f"Need a real GT at {GT_DIR}. Run `uv run python scripts/generate_many.py --n 5 --seed 901 --animated` first.",
              file=sys.stderr)
        return 2

    print(f"Adversarial rubric test — GT: {GT_DIR.name}\n")
    cases = [
        ("six-clones",         six_clones,         "consistency",  0.20),
        ("empty-stubs",        empty_stubs,        "coverage",     0.05),
        ("hidden-tag-stuffer", hidden_tag_stuffer, "structural",   0.20),
        ("font-stuffer",       font_stuffer,       "typography",   0.30),
        ("dead-css-var",       dead_css_var,       "typography",   0.30),
    ]
    all_passed = True
    for name, fn, rubric, max_score in cases:
        passed, _ = run_one(name, fn, rubric, max_score, GT_DIR)
        all_passed = all_passed and passed

    print()
    if all_passed:
        print("All adversaries successfully blocked.")
        return 0
    else:
        print("FAIL — at least one rubric is still hackable. See docs/rubric_audit.md.")
        return 1


if __name__ == "__main__":
    sys.exit(main())
