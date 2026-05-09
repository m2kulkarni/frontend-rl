"""Palette rubric: color-distribution similarity in CIE Lab space.

For each page, compute a 3D histogram of pixels in CIE Lab (perceptually uniform),
then compute histogram intersection between ground truth and candidate. Mean across
pages = palette score in [0, 1].

Why Lab over RGB:
    Lab is approximately perceptually uniform — equal numerical distance ≈
    equal perceptual difference. RGB over-weights the green channel.

Why histogram intersection over Earth-Mover's Distance:
    - Deterministic (no k-means random init).
    - Already in [0, 1] for normalized histograms.
    - No heavy optimal-transport dependency (POT / pyemd).
    - Captures the "how much of one distribution overlaps with the other"
      intuition that matches our notion of palette commitment.

Intuition for what it catches:
    - Black <img>-tag motifs on a vermillion-palette page → black bin gains weight,
      vermillion bins lose weight → intersection drops.
    - Wrong-saturation palette (everything desaturated) → low-chroma bins gain
      weight at the expense of saturated bins → intersection drops.
    - Right palette but slightly different proportions → intersection drops a little
      (this is correct: proportions of color usage are part of palette commitment).
"""

from __future__ import annotations

import tempfile
from pathlib import Path

import numpy as np
from PIL import Image
from skimage.color import rgb2lab

from proximal_env.render import render_task

NAME = "palette"

LAB_BINS = 8  # 8 bins per L*, a*, b* axis = 512 bins total — enough resolution
              # to distinguish the architectural-style palettes without blowing
              # up the histogram size.


def _full_page_pngs(rendered_paths: list[Path]) -> dict[str, Path]:
    return {p.name: p for p in rendered_paths if "-tile-" not in p.name}


def _lab_histogram(png_path: Path, bins: int = LAB_BINS) -> np.ndarray:
    """Normalized 3D histogram of an image's pixels in CIE Lab space.

    Returns an array of shape (bins, bins, bins) summing to 1.0.
    """
    img = np.array(Image.open(png_path).convert("RGB"))
    # rgb2lab expects floats in [0, 1].
    lab = rgb2lab(img / 255.0)
    pixels = lab.reshape(-1, 3)
    edges = [
        np.linspace(0.0, 100.0, bins + 1),       # L*  in [0, 100]
        np.linspace(-128.0, 127.0, bins + 1),    # a*  approx [-128, 127]
        np.linspace(-128.0, 127.0, bins + 1),    # b*  approx [-128, 127]
    ]
    hist, _ = np.histogramdd(pixels, bins=edges)
    total = hist.sum()
    return hist / total if total > 0 else hist


def _histogram_intersection(h1: np.ndarray, h2: np.ndarray) -> float:
    """Sum of element-wise min. For two normalized distributions, ∈ [0, 1]."""
    return float(np.minimum(h1, h2).sum())


def _per_page_scores(gt_dir: Path, cand_dir: Path) -> dict[str, float]:
    with tempfile.TemporaryDirectory() as gt_tmp, tempfile.TemporaryDirectory() as cand_tmp:
        gt_pngs = _full_page_pngs(render_task(gt_dir, screenshots_dir=Path(gt_tmp)))
        cand_pngs = _full_page_pngs(render_task(cand_dir, screenshots_dir=Path(cand_tmp)))
        out: dict[str, float] = {}
        for name, gt_png in gt_pngs.items():
            cand_png = cand_pngs.get(name)
            if cand_png is None:
                out[name] = 0.0
                continue
            gt_hist = _lab_histogram(gt_png)
            cand_hist = _lab_histogram(cand_png)
            out[name] = _histogram_intersection(gt_hist, cand_hist)
    return out


def score(ground_truth_dir: Path, candidate_dir: Path) -> float:
    """Mean per-page palette intersection score in [0, 1]. 1.0 = identical palettes."""
    per_page = _per_page_scores(Path(ground_truth_dir), Path(candidate_dir))
    if not per_page:
        return 0.0
    return sum(per_page.values()) / len(per_page)


def score_detailed(ground_truth_dir: Path, candidate_dir: Path) -> dict:
    per_page = _per_page_scores(Path(ground_truth_dir), Path(candidate_dir))
    mean = sum(per_page.values()) / len(per_page) if per_page else 0.0
    return {"per_page": per_page, "mean": mean}
