"""Visual rubric: structural similarity (SSIM) on rendered screenshots.

Renders both the ground-truth and candidate page-*.html files via Playwright at
the canonical 1440 viewport, full-page, then computes SSIM page-by-page in RGB.
The rubric score is the mean SSIM across the matched pages.

Why SSIM:
- Captures perceived structural / luminance similarity, not just pixel diff.
- Robust-ish to small spatial shifts.
- One number per page, easy to aggregate.

Why not raw pixel diff: a 1-px shift would give catastrophically low scores.
Why not LPIPS: it's better but adds a heavy ML dependency. Add later if calibration shows we need it.

Pages with mismatched dimensions are aligned by resizing the candidate to the
ground-truth's shape (Lanczos). That is fair — a candidate with a wildly tall
page (broken layout) gets compressed, losing fine detail, and SSIM drops.
"""

from __future__ import annotations

import tempfile
from pathlib import Path

import numpy as np
from PIL import Image
from skimage.metrics import structural_similarity as ssim

from proximal_env.render import render_task

NAME = "visual"


def _full_page_pngs(rendered_paths: list[Path]) -> dict[str, Path]:
    """Filter render_task output to just full-page PNGs (drop tile crops),
    indexed by filename so we can match candidate→ground-truth by name.
    """
    return {p.name: p for p in rendered_paths if "-tile-" not in p.name}


def _ssim_one_page(gt_png: Path, cand_png: Path) -> float:
    """Compute SSIM between two PNGs. Resizes candidate to ground-truth shape if needed."""
    gt = np.array(Image.open(gt_png).convert("RGB"))
    cand = np.array(Image.open(cand_png).convert("RGB"))

    if cand.shape != gt.shape:
        # Resize candidate to match ground-truth height/width.
        target_wh = (gt.shape[1], gt.shape[0])  # PIL is (W, H)
        cand_img = Image.fromarray(cand).resize(target_wh, Image.LANCZOS)
        cand = np.array(cand_img)

    # SSIM works on uint8 RGB. channel_axis=2 → multichannel SSIM.
    score = ssim(gt, cand, channel_axis=2, data_range=255)
    # Clip to [0, 1] — SSIM can technically be slightly negative.
    return float(max(0.0, min(1.0, score)))


def score(ground_truth_dir: Path, candidate_dir: Path) -> float:
    """Mean per-page SSIM score in [0, 1]. 1.0 = identical."""
    gt_dir = Path(ground_truth_dir)
    cand_dir = Path(candidate_dir)

    with tempfile.TemporaryDirectory() as gt_tmp, tempfile.TemporaryDirectory() as cand_tmp:
        gt_pngs = _full_page_pngs(render_task(gt_dir, screenshots_dir=Path(gt_tmp)))
        cand_pngs = _full_page_pngs(render_task(cand_dir, screenshots_dir=Path(cand_tmp)))

        if not gt_pngs:
            return 0.0

        per_page: list[float] = []
        for name, gt_png in gt_pngs.items():
            cand_png = cand_pngs.get(name)
            if cand_png is None:
                # Missing page → contributes 0.0 to the mean.
                per_page.append(0.0)
                continue
            per_page.append(_ssim_one_page(gt_png, cand_png))

        return sum(per_page) / len(per_page)


def score_detailed(ground_truth_dir: Path, candidate_dir: Path) -> dict:
    """Return per-page SSIM scores plus the mean. Useful for the report."""
    gt_dir = Path(ground_truth_dir)
    cand_dir = Path(candidate_dir)

    with tempfile.TemporaryDirectory() as gt_tmp, tempfile.TemporaryDirectory() as cand_tmp:
        gt_pngs = _full_page_pngs(render_task(gt_dir, screenshots_dir=Path(gt_tmp)))
        cand_pngs = _full_page_pngs(render_task(cand_dir, screenshots_dir=Path(cand_tmp)))

        per_page: dict[str, float] = {}
        for name, gt_png in gt_pngs.items():
            cand_png = cand_pngs.get(name)
            per_page[name] = (
                _ssim_one_page(gt_png, cand_png) if cand_png is not None else 0.0
            )

    mean = sum(per_page.values()) / len(per_page) if per_page else 0.0
    return {"per_page": per_page, "mean": mean}
