"""Animation rubric: frame-SSIM over time + @keyframes Jaccard, gated on
detected motion in the candidate's rendering.

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

  • motion gate
        Compute pixelwise frame-to-frame delta on the candidate's recorded
        frames. If no page exhibits motion above MIN_MOTION_DELTA, the
        animation score is forced to 0 — closes adversaries that declare
        the GT's @keyframes verbatim but never apply the class, or apply
        it to a 0×0 / display:none element. Without the gate, those
        adversaries score 0.3 × Jaccard for free.

Composite:  animation = motion_detected × (0.7 × frame_ssim + 0.3 × keyframes_jaccard).

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

# Motion gate — a candidate must move pixels by at least this much (mean
# absolute pixel delta in [0, 255]) on at least one recorded page to be
# considered "actually animating." Below this we treat the candidate as
# static and force the animation score to 0 regardless of how cleanly the
# @keyframes Jaccard aligns. 1.5 is loose enough to allow font-rendering
# jitter / sub-pixel text shifts but tight enough to catch flat pages.
MIN_MOTION_DELTA = 1.5

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


# ---- motion gate -------------------------------------------------------------

def _max_motion_per_page(video_root: Path) -> float:
    """Maximum mean-absolute frame-to-frame pixel delta across pages.

    For each page-K subdir, compute mean(|frame[i] - frame[i-1]|) across
    consecutive frame pairs. Take the max across pages. Returns 0.0 if
    no frames present (i.e., we couldn't record).

    A page that's completely static (no animation, no class hookup)
    returns ~0; a page with even subtle motion returns >> MIN_MOTION_DELTA.
    """
    if not video_root.is_dir():
        return 0.0
    page_max = 0.0
    for page_dir in sorted(video_root.iterdir()):
        if not page_dir.is_dir():
            continue
        frames = sorted(page_dir.glob("frame-*.png"))
        if len(frames) < 2:
            continue
        prev = np.array(Image.open(frames[0]).convert("RGB"), dtype=np.int16)
        deltas: list[float] = []
        for f in frames[1:]:
            cur = np.array(Image.open(f).convert("RGB"), dtype=np.int16)
            if cur.shape != prev.shape:
                # Resize doesn't preserve animation comparison meaning;
                # if dimensions vary frame-to-frame something is off,
                # safest is to treat that page as no-motion.
                prev = cur
                continue
            deltas.append(float(np.mean(np.abs(cur - prev))))
            prev = cur
        if deltas:
            page_max = max(page_max, max(deltas))
    return page_max


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
    """Composite animation score in [0, 1].

    Gated: if the candidate's rendered frames show no motion above
    MIN_MOTION_DELTA on any page, the score is 0 regardless of how well
    its @keyframes match GT's. Closes the "declare keyframes but never
    apply the class" hack.
    """
    gt = Path(ground_truth_dir)
    cand = Path(candidate_dir)

    with tempfile.TemporaryDirectory() as gt_tmp, tempfile.TemporaryDirectory() as cand_tmp:
        record_task(gt,   videos_dir=Path(gt_tmp))
        record_task(cand, videos_dir=Path(cand_tmp))
        gt_root = Path(gt_tmp)
        cand_root = Path(cand_tmp)

        cand_motion = _max_motion_per_page(cand_root)
        if cand_motion < MIN_MOTION_DELTA:
            # No detectable motion in the candidate's render → policy
            # didn't actually animate anything. Force-zero the score.
            return 0.0

        per_page = _frame_ssim_per_page(gt_root, cand_root)

    fs = sum(per_page.values()) / len(per_page) if per_page else 0.0
    kj = _keyframes_jaccard(gt, cand)
    return W_FRAME * fs + W_KEYFRAMES * kj


def score_detailed(ground_truth_dir: Path, candidate_dir: Path) -> dict:
    """Composite + per-page frame-SSIM + keyframes-jaccard + motion gate."""
    gt = Path(ground_truth_dir)
    cand = Path(candidate_dir)
    with tempfile.TemporaryDirectory() as gt_tmp, tempfile.TemporaryDirectory() as cand_tmp:
        record_task(gt,   videos_dir=Path(gt_tmp))
        record_task(cand, videos_dir=Path(cand_tmp))
        gt_root = Path(gt_tmp)
        cand_root = Path(cand_tmp)
        per_page = _frame_ssim_per_page(gt_root, cand_root)
        cand_motion = _max_motion_per_page(cand_root)

    fs_mean = sum(per_page.values()) / len(per_page) if per_page else 0.0
    kj = _keyframes_jaccard(gt, cand)
    motion_passed = cand_motion >= MIN_MOTION_DELTA
    raw_overall = W_FRAME * fs_mean + W_KEYFRAMES * kj
    return {
        "frame_ssim_mean": fs_mean,
        "frame_ssim_per_page": per_page,
        "keyframes_jaccard": kj,
        "candidate_motion_max": cand_motion,
        "motion_gate_passed": motion_passed,
        "overall": raw_overall if motion_passed else 0.0,
    }
