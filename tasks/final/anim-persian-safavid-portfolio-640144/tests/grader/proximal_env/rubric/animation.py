"""Animation rubric: frame-SSIM over time + @keyframes Jaccard.

Two sub-signals composed into one [0,1] score:

  • frame_ssim
        Render both the ground-truth task and the candidate task to a sequence
        of viewport frames at the same 15 timestamps (using `record_task`),
        compute per-frame SSIM in RGB, average across frames AND across pages.
        This captures *visual* animation fidelity — does the candidate's motion
        look like the original's at each moment in time.

  • keyframes_jaccard
        Extract every `@keyframes name { ... }` block from each side's CSS
        (design-system.css + any same-directory .css + inline <style> blocks).
        For each block compute a fingerprint = the set of CSS properties
        animated (e.g. {"transform"} or {"opacity", "transform"}). Compute
        multiset Jaccard between GT's bag of fingerprints and candidate's bag.
        This captures *intent* fidelity — did the candidate animate the same
        kind of property change, regardless of which element gets it.

Composite:  animation = 0.7 × frame_ssim + 0.3 × keyframes_jaccard.

This rubric only makes sense for animated tasks. The grader gates its inclusion
on `is_animated_task(task_dir)` so static tasks aren't penalized.
"""

from __future__ import annotations

import re
import tempfile
from collections import Counter
from pathlib import Path

import numpy as np
from PIL import Image
from skimage.metrics import structural_similarity as ssim

from proximal_env.render import record_task

NAME = "animation"

# Weights inside the composite (frame-SSIM dominates because it captures the
# actual visual outcome; keyframes-jaccard is a sanity check on the strategy).
W_FRAME = 0.7
W_KEYFRAMES = 0.3

# Regex for `@keyframes <name> { ... }` blocks. Allows one level of nesting
# (the per-step blocks like `0% { ... }`). Suitable for our well-formed CSS.
_KEYFRAMES_RE = re.compile(
    r"@keyframes\s+[\w-]+\s*\{((?:[^{}]|\{[^{}]*\})*)\}",
    re.DOTALL | re.IGNORECASE,
)
_PROP_RE = re.compile(r"(\b[a-zA-Z][a-zA-Z0-9_-]*)\s*:", re.IGNORECASE)
_STYLE_BLOCK_RE = re.compile(r"<style[^>]*>(.*?)</style>", re.DOTALL | re.IGNORECASE)


def is_animated_task(task_dir: Path) -> bool:
    """A task is 'animated' iff its design-system.css contains @keyframes."""
    css = task_dir / "design-system.css"
    if not css.is_file():
        return False
    return bool(_KEYFRAMES_RE.search(css.read_text(encoding="utf-8", errors="replace")))


# ---- frame-SSIM --------------------------------------------------------------

def _frame_ssim_one_pair(gt: Path, cand: Path) -> float:
    """SSIM between two equally-sized PNG frames in RGB."""
    a = np.array(Image.open(gt).convert("RGB"))
    b = np.array(Image.open(cand).convert("RGB"))
    if a.shape != b.shape:
        target = (a.shape[1], a.shape[0])
        b = np.array(Image.fromarray(b).resize(target, Image.LANCZOS))
    score = ssim(a, b, channel_axis=2, data_range=255)
    return float(max(0.0, min(1.0, score)))


def _frame_ssim_per_page(gt_video_root: Path, cand_video_root: Path) -> dict[str, float]:
    """For every page-K subdir present in both, mean SSIM across frames."""
    out: dict[str, float] = {}
    if not gt_video_root.is_dir():
        return out
    for page_dir in sorted(gt_video_root.iterdir()):
        if not page_dir.is_dir():
            continue
        page_name = page_dir.name
        cand_dir = cand_video_root / page_name
        gt_frames = sorted(page_dir.glob("frame-*.png"))
        cand_frames = sorted(cand_dir.glob("frame-*.png"))
        if not gt_frames or not cand_frames:
            out[page_name] = 0.0
            continue
        n = min(len(gt_frames), len(cand_frames))
        per_frame = [_frame_ssim_one_pair(gt_frames[i], cand_frames[i]) for i in range(n)]
        out[page_name] = sum(per_frame) / len(per_frame)
    return out


def _frame_ssim(gt_task: Path, cand_task: Path) -> float:
    """Mean per-page mean-SSIM. Renders BOTH sides to frames in a temp dir.

    Always re-renders rather than trusting any pre-cached frames — keeps
    Playwright config consistent for both.
    """
    with tempfile.TemporaryDirectory() as gt_tmp, tempfile.TemporaryDirectory() as cand_tmp:
        record_task(gt_task,   videos_dir=Path(gt_tmp))
        record_task(cand_task, videos_dir=Path(cand_tmp))
        per_page = _frame_ssim_per_page(Path(gt_tmp), Path(cand_tmp))
    if not per_page:
        return 0.0
    return sum(per_page.values()) / len(per_page)


# ---- @keyframes Jaccard ------------------------------------------------------

def _all_css_for_task(task_dir: Path) -> str:
    """Concatenate every CSS source the task uses:

    - any *.css file at the task root (design-system.css, styles.css, ...)
    - the contents of every <style>...</style> block inside any page-*.html
    """
    blob_parts: list[str] = []
    for css_file in sorted(task_dir.glob("*.css")):
        try:
            blob_parts.append(css_file.read_text(encoding="utf-8", errors="replace"))
        except OSError:
            pass
    for html in sorted(task_dir.glob("page-*.html")):
        try:
            text = html.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue
        for m in _STYLE_BLOCK_RE.finditer(text):
            blob_parts.append(m.group(1))
    return "\n\n".join(blob_parts)


def _keyframes_signatures(css_blob: str) -> list[frozenset[str]]:
    """One frozenset of CSS-property-names per @keyframes rule.

    Example fingerprint: frozenset({"transform"}) for a scale/rotate animation,
    frozenset({"opacity"}) for a fade, frozenset({"opacity", "transform"})
    for a combined fade-and-scale.
    """
    sigs: list[frozenset[str]] = []
    for m in _KEYFRAMES_RE.finditer(css_blob):
        body = m.group(1)
        props: set[str] = set()
        for pm in _PROP_RE.finditer(body):
            prop = pm.group(1).lower()
            # Skip CSS percentage step labels — they end with `%` so the regex
            # won't match them (they don't have a leading letter), but defense
            # in depth: skip the literal "from" / "to" keywords too.
            if prop in {"from", "to"}:
                continue
            props.add(prop)
        sigs.append(frozenset(props))
    return sigs


def _keyframes_jaccard(gt_task: Path, cand_task: Path) -> float:
    gt_sigs = _keyframes_signatures(_all_css_for_task(gt_task))
    cd_sigs = _keyframes_signatures(_all_css_for_task(cand_task))
    if not gt_sigs and not cd_sigs:
        return 1.0  # neither has animations → trivially equal
    a, b = Counter(gt_sigs), Counter(cd_sigs)
    inter = sum((a & b).values())
    union = sum((a | b).values())
    return inter / union if union > 0 else 0.0


# ---- public API --------------------------------------------------------------

def score(ground_truth_dir: Path, candidate_dir: Path) -> float:
    """Composite animation score in [0, 1]."""
    gt = Path(ground_truth_dir)
    cand = Path(candidate_dir)
    fs = _frame_ssim(gt, cand)
    kj = _keyframes_jaccard(gt, cand)
    return W_FRAME * fs + W_KEYFRAMES * kj


def score_detailed(ground_truth_dir: Path, candidate_dir: Path) -> dict:
    """Composite + per-page frame-SSIM + keyframes-jaccard."""
    gt = Path(ground_truth_dir)
    cand = Path(candidate_dir)
    with tempfile.TemporaryDirectory() as gt_tmp, tempfile.TemporaryDirectory() as cand_tmp:
        record_task(gt,   videos_dir=Path(gt_tmp))
        record_task(cand, videos_dir=Path(cand_tmp))
        per_page = _frame_ssim_per_page(Path(gt_tmp), Path(cand_tmp))
    fs_mean = sum(per_page.values()) / len(per_page) if per_page else 0.0
    kj = _keyframes_jaccard(gt, cand)
    return {
        "frame_ssim_mean": fs_mean,
        "frame_ssim_per_page": per_page,
        "keyframes_jaccard": kj,
        "overall": W_FRAME * fs_mean + W_KEYFRAMES * kj,
    }
