"""Coverage rubric: did the candidate produce real pages, not stubs?

Naive coverage = fraction of expected `page-*.html` filenames that exist
in the candidate directory. Hackable: an adversary emits 6 empty (or
near-empty) HTML files and gets full coverage credit.

Fix: each page must pass a **minimum-content gate** before counting:

    1. HTML parses without fatal error.
    2. `<body>` contains ≥ MIN_TAGS distinct structural tags (rules out
       a page that's literally `<html><body></body></html>`).
    3. Visible text length ≥ MIN_TEXT_CHARS (rules out tag soup with no
       readable content).

Pages that fail any gate contribute 0 to coverage. The score remains in
[0, 1] — same shape, hack-resistant.
"""

from __future__ import annotations

from pathlib import Path

from bs4 import BeautifulSoup

NAME = "coverage"

MIN_TAGS = 10           # body must have at least this many tags
MIN_TEXT_CHARS = 200    # visible text content (after tag-strip + ws-collapse)


def _is_substantive(html_path: Path) -> bool:
    """Does this page have enough content to count toward coverage?

    Empty pages, single-tag-soup pages, and minimum-stub pages fail the
    gate. The thresholds are deliberately permissive — a real page with
    real content blows past them by an order of magnitude.
    """
    try:
        raw = html_path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return False
    if not raw.strip():
        return False
    try:
        soup = BeautifulSoup(raw, "lxml")
    except Exception:
        return False

    body = soup.body or soup
    # Tag count: any tag, anywhere under body.
    tag_count = sum(1 for _ in body.find_all(True))
    if tag_count < MIN_TAGS:
        return False

    # Visible text: drop <script> and <style> contents, normalize whitespace.
    for s in body.find_all(["script", "style"]):
        s.extract()
    text = body.get_text(separator=" ", strip=True)
    if len(text) < MIN_TEXT_CHARS:
        return False
    return True


def score(ground_truth_dir: Path, candidate_dir: Path) -> float:
    """Fraction of expected pages present *and* substantive in the candidate."""
    gt = Path(ground_truth_dir)
    cand = Path(candidate_dir)
    expected = sorted(p.name for p in gt.glob("page-*.html"))
    if not expected:
        return 0.0
    counted = 0
    for name in expected:
        cand_file = cand / name
        if cand_file.is_file() and _is_substantive(cand_file):
            counted += 1
    return counted / len(expected)
