"""Consistency rubric: header/footer must match across pages — but pages
themselves must be distinct.

The generator pipeline embeds a single shared `<header>` (nav) and `<footer>`
verbatim on every page. A faithful replication preserves that. Naive
implementation: hash each page's `<header>` and `<footer>`, score = fraction
of pages sharing the modal hash.

That's hackable — the trivial way to score 1.0 is to emit six identical
pages. Headers AND footers match because the WHOLE page matches. RL policy
trained against this naive rubric will collapse to "always emit one
canonical page."

Fix: gate consistency on **inter-page diversity**. Each page's main content
(everything outside the chrome) must be substantively distinct from its
siblings; if pages are clones, the consistency bonus is voided.

Score:
    header_match     = fraction of pages whose <header> matches the modal one
    footer_match     = fraction of pages whose <footer> matches the modal one
    chrome_match     = mean(header_match, footer_match)        # the original signal
    diversity        = 1 - mean pairwise main-content similarity
                       (1.0 = all pages distinct, 0.0 = all pages identical)
    consistency      = chrome_match × diversity

This way the 6-clone hack scores ~0 (diversity ≈ 0) regardless of header/
footer match. Real GT (6 distinct pages with shared chrome) scores ~1.

Diversity is computed on tokenized text content — fast, no rendering.
"""

from __future__ import annotations

import hashlib
import re
from collections import Counter
from pathlib import Path

NAME = "consistency"

_WS_RE = re.compile(r"\s+")
_HEADER_RE = re.compile(r"<header\b[^>]*>(.*?)</header\s*>", re.IGNORECASE | re.DOTALL)
_FOOTER_RE = re.compile(r"<footer\b[^>]*>(.*?)</footer\s*>", re.IGNORECASE | re.DOTALL)
_NAV_RE = re.compile(r"<nav\b[^>]*>(.*?)</nav\s*>", re.IGNORECASE | re.DOTALL)
_TAG_RE = re.compile(r"<[^>]+>")


def _normalize(s: str) -> str:
    return _WS_RE.sub(" ", s).strip()


def _extract_block(html: str, regex: re.Pattern) -> str:
    """Extract first matching block, normalized for whitespace.

    Hashes the tag *inner content* — outer attrs don't matter.
    """
    m = regex.search(html)
    if m is None:
        return ""
    return _normalize(m.group(1))


def _strip_chrome(html: str) -> str:
    """Return page text with `<header>`, `<footer>`, `<nav>` blocks removed.

    What's left = the page-specific main content. Used for diversity.
    """
    out = html
    for regex in (_HEADER_RE, _FOOTER_RE, _NAV_RE):
        out = regex.sub("", out)
    # Strip remaining tags, normalize whitespace, lowercase.
    out = _TAG_RE.sub(" ", out)
    return _normalize(out).lower()


def _chrome_match(blocks: list[str]) -> float:
    """Fraction of pages sharing the modal block hash (the original signal)."""
    blocks = [b for b in blocks if b]
    if not blocks:
        return 0.0
    hashes = [hashlib.md5(b.encode("utf-8")).hexdigest() for b in blocks]
    _, modal_count = Counter(hashes).most_common(1)[0]
    return modal_count / len(hashes)


def _token_shingles(text: str, n: int = 3) -> set[str]:
    """N-gram shingles over whitespace-tokenized text. Empty for very short text."""
    tokens = text.split()
    if len(tokens) < n:
        return set()
    return {" ".join(tokens[i:i + n]) for i in range(len(tokens) - n + 1)}


def _jaccard(a: set, b: set) -> float:
    if not a and not b:
        return 1.0  # vacuously identical
    union = a | b
    return len(a & b) / len(union) if union else 1.0


def _diversity(main_contents: list[str]) -> float:
    """Inter-page diversity in [0, 1].

    1.0 = every pair of pages is completely distinct.
    0.0 = every pair of pages has identical main content.

    Computed as `1 - mean pairwise Jaccard similarity` on 3-gram shingles.
    """
    shingles = [_token_shingles(c) for c in main_contents]
    n = len(shingles)
    if n < 2:
        return 1.0  # not enough pages to gauge — don't penalize
    pairs = 0
    sim_sum = 0.0
    for i in range(n):
        for j in range(i + 1, n):
            sim_sum += _jaccard(shingles[i], shingles[j])
            pairs += 1
    mean_sim = sim_sum / pairs if pairs else 0.0
    return max(0.0, 1.0 - mean_sim)


def _scores(candidate_dir: Path) -> dict[str, float]:
    """Compute the four numbers underlying the rubric.

    Returns dict with header_match, footer_match, chrome_match, diversity,
    consistency.
    """
    pages = sorted(candidate_dir.glob("page-*.html"))
    if not pages:
        return {"header_match": 0.0, "footer_match": 0.0,
                "chrome_match": 0.0, "diversity": 0.0, "consistency": 0.0}
    htmls = [p.read_text(encoding="utf-8", errors="replace") for p in pages]
    headers = [_extract_block(h, _HEADER_RE) for h in htmls]
    footers = [_extract_block(h, _FOOTER_RE) for h in htmls]
    main_contents = [_strip_chrome(h) for h in htmls]

    h_match = _chrome_match(headers)
    f_match = _chrome_match(footers)
    chrome = (h_match + f_match) / 2.0
    div = _diversity(main_contents)
    return {
        "header_match": h_match,
        "footer_match": f_match,
        "chrome_match": chrome,
        "diversity": div,
        "consistency": chrome * div,
    }


def score(ground_truth_dir: Path, candidate_dir: Path) -> float:
    """Composite consistency × diversity score in [0, 1].

    Note: ground_truth_dir is unused — this is an intra-candidate check.
    Argument is accepted to match the rubric interface used by grader.py.
    """
    return _scores(Path(candidate_dir))["consistency"]


def detailed_score(candidate_dir: Path) -> dict[str, float]:
    """For debugging / report — returns all five sub-scores."""
    return _scores(Path(candidate_dir))
