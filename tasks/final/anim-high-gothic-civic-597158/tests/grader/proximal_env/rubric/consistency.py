"""Consistency rubric: header/footer must match across pages.

The generator pipeline embeds a single shared `<header>` (nav) and `<footer>`
verbatim on every page — that's a hard constraint of the design. A faithful
replication should preserve this: across the 6 pages of the candidate site,
the `<header>` blocks should be byte-identical (after whitespace
normalization), and so should the `<footer>` blocks.

This rubric is intra-candidate — it does NOT compare to ground truth. It
asks: "given only the candidate's pages, are the headers and footers
consistent across them?" That's a structural integrity check independent of
whether the agent picked the right styling.

Score per dimension (header, footer):
    fraction of pages whose tag block matches the *modal* (most-common) hash.
    1.0 = every page has the same header/footer; lower if pages diverge.

Composite consistency score = mean(header_consistency, footer_consistency).
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


def _normalize(s: str) -> str:
    return _WS_RE.sub(" ", s).strip()


def _extract(html: str, regex: re.Pattern) -> str:
    """Extract first matching block, normalized for whitespace."""
    m = regex.search(html)
    if m is None:
        return ""
    # Hash the inner content of the tag — outer attrs don't matter for
    # consistency (they would for byte-identical, but inner content is the
    # signal we care about: the same nav links, the same footer text).
    return _normalize(m.group(1))


def _consistency(blocks: list[str]) -> float:
    """Fraction of pages sharing the modal block hash."""
    blocks = [b for b in blocks if b]  # skip pages without the tag
    if not blocks:
        return 0.0
    hashes = [hashlib.md5(b.encode("utf-8")).hexdigest() for b in blocks]
    _, modal_count = Counter(hashes).most_common(1)[0]
    return modal_count / len(hashes)


def _scores(candidate_dir: Path) -> tuple[float, float]:
    pages = sorted(candidate_dir.glob("page-*.html"))
    if not pages:
        return 0.0, 0.0
    htmls = [p.read_text(encoding="utf-8", errors="replace") for p in pages]
    headers = [_extract(h, _HEADER_RE) for h in htmls]
    footers = [_extract(h, _FOOTER_RE) for h in htmls]
    return _consistency(headers), _consistency(footers)


def score(ground_truth_dir: Path, candidate_dir: Path) -> float:
    """Composite consistency score in [0, 1].

    Note: ground_truth_dir is unused — this is an intra-candidate check.
    Argument is accepted to match the rubric interface used by grader.py.
    """
    h, f = _scores(Path(candidate_dir))
    return (h + f) / 2.0


def detailed_score(candidate_dir: Path) -> dict[str, float]:
    """For debugging / report — returns per-dimension scores."""
    h, f = _scores(Path(candidate_dir))
    return {"header": h, "footer": f, "consistency": (h + f) / 2.0}
