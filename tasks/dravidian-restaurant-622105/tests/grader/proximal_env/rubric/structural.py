"""Structural rubric: DOM-tag bag-of-tags Jaccard similarity.

For each page, parse the HTML and build a multiset of (tag_name, depth) pairs
over structural-meaningful elements. Compute weighted Jaccard between the
ground-truth and candidate multisets. Mean across pages = structural score.

Why bag-of-tags vs full tree edit distance (Zhang-Shasha):
    - No new heavy dependency (BeautifulSoup + lxml are already installed)
    - Deterministic and fast (~ms per page)
    - Captures "did the candidate use similar structural elements at similar
      nesting depths" — the meat of layout fidelity
    - Loses sibling order and exact tree shape — acceptable for v1; the
      visual SSIM rubric already captures spatial fidelity

Tags counted are the structurally-meaningful ones — `<div>`, semantic HTML5
landmarks, headings, lists, forms, tables, links, images, SVG, etc. We
deliberately skip `<style>`, `<script>`, `<meta>`, `<link>` and the like.
"""

from __future__ import annotations

from collections import Counter
from pathlib import Path

from bs4 import BeautifulSoup, Tag

NAME = "structural"

# Tags we count toward structural similarity. Inline-formatting tags
# (`<b>`, `<i>`, `<em>`, `<strong>`) are intentionally excluded — they don't
# describe layout structure. Same for head metadata.
STRUCTURAL_TAGS: frozenset[str] = frozenset({
    "html", "body",
    "header", "nav", "main", "section", "article", "aside", "footer",
    "div", "ul", "ol", "li", "figure", "figcaption",
    "form", "fieldset", "legend",
    "table", "thead", "tbody", "tfoot", "tr", "td", "th",
    "h1", "h2", "h3", "h4", "h5", "h6",
    "p", "blockquote",
    "a", "img", "svg",
    "label", "input", "button", "select", "textarea",
    "span",
})


def _layout_multiset(html_path: Path) -> Counter:
    """Build a multiset of structural tags used in a page.

    We deliberately use depth-agnostic tag counts rather than (tag, depth)
    pairs. Empirically, depth-aware matching was too strict: a candidate that
    happens to use one fewer wrapper `<div>` ends up with all its tags at
    depth-1, scoring near-zero on Jaccard despite structurally similar
    vocabulary. The visual SSIM rubric already captures spatial fidelity
    (which is where exact nesting depth matters); structural's job is the
    "did the candidate use a similar set of layout primitives" question.
    """
    raw = html_path.read_text(encoding="utf-8", errors="replace")
    soup = BeautifulSoup(raw, "lxml")
    counter: Counter = Counter()

    def walk(elem) -> None:
        for child in elem.children:
            if not isinstance(child, Tag):
                continue
            tag = (child.name or "").lower()
            if tag in STRUCTURAL_TAGS:
                counter[tag] += 1
            walk(child)

    root = soup.html or soup.body or soup
    walk(root)
    return counter


def _multiset_jaccard(c1: Counter, c2: Counter) -> float:
    """Multiset Jaccard: sum(min) / sum(max). Both empty → 1.0 by convention."""
    if not c1 and not c2:
        return 1.0
    intersection = sum((c1 & c2).values())
    union = sum((c1 | c2).values())
    return intersection / union if union > 0 else 0.0


def _per_page_scores(gt_dir: Path, cand_dir: Path) -> dict[str, float]:
    out: dict[str, float] = {}
    for gt_file in sorted(gt_dir.glob("page-*.html")):
        cand_file = cand_dir / gt_file.name
        if not cand_file.is_file():
            out[gt_file.name] = 0.0
            continue
        gt_tags = _layout_multiset(gt_file)
        cand_tags = _layout_multiset(cand_file)
        out[gt_file.name] = _multiset_jaccard(gt_tags, cand_tags)
    return out


def score(ground_truth_dir: Path, candidate_dir: Path) -> float:
    gt = Path(ground_truth_dir)
    cand = Path(candidate_dir)
    per_page = _per_page_scores(gt, cand)
    if not per_page:
        return 0.0
    return sum(per_page.values()) / len(per_page)


def score_detailed(ground_truth_dir: Path, candidate_dir: Path) -> dict:
    per_page = _per_page_scores(Path(ground_truth_dir), Path(candidate_dir))
    mean = sum(per_page.values()) / len(per_page) if per_page else 0.0
    return {"per_page": per_page, "mean": mean}
