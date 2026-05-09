"""Taxonomy sampler for the website-generation pipeline.

Dimensions (see docs/generator.md, docs/animations.md, docs/bonus_2.md):
    architectural_style ∈ 5 values
    variant             ∈ 3 values  (period_faithful | modern | bold)
    site_purpose        ∈ 8 values
    framework           ∈ 2 values  (vanilla | react)   ← Bonus 2
    animated            ∈ {True, False}                  ← Bonus 1
    seed                ∈ free-running integer (within-cell variation)

Two sampling modes:
    - sample_stratified(N) — guarantees every style appears at least once.
    - sample_random(N)     — uniform random across all dimensions.
"""

from dataclasses import dataclass
from random import Random
from typing import Literal

ArchitecturalStyle = Literal[
    "persian-safavid", "roman-imperial", "high-gothic", "dravidian", "edo-japanese"
]
Variant = Literal["period_faithful", "modern", "bold"]
SitePurpose = Literal[
    "museum", "university", "restaurant", "studio",
    "editorial", "portfolio", "civic", "foundation",
]
Framework = Literal["vanilla", "react"]

ARCHITECTURAL_STYLES: tuple[ArchitecturalStyle, ...] = (
    "persian-safavid", "roman-imperial", "high-gothic", "dravidian", "edo-japanese",
)
VARIANTS: tuple[Variant, ...] = ("period_faithful", "modern", "bold")
SITE_PURPOSES: tuple[SitePurpose, ...] = (
    "museum", "university", "restaurant", "studio",
    "editorial", "portfolio", "civic", "foundation",
)
FRAMEWORKS: tuple[Framework, ...] = ("vanilla", "react")


@dataclass(frozen=True)
class TaxonomyPoint:
    style: ArchitecturalStyle
    variant: Variant
    purpose: SitePurpose
    seed: int
    animated: bool = False
    framework: Framework = "vanilla"

    def slug(self) -> str:
        # Slug format: [react-][anim-]<style>-<purpose>-<seed>.
        # Vanilla static tasks keep the original `<style>-<purpose>-<seed>`
        # form for backward compatibility with existing generated/, tasks/,
        # jobs/ artifacts. Anything non-default gets a prefix.
        prefix = ""
        if self.framework != "vanilla":
            prefix += f"{self.framework}-"
        if self.animated:
            prefix += "anim-"
        return f"{prefix}{self.style}-{self.purpose}-{self.seed}"


def sample_random(n: int, *, rng_seed: int | None = None,
                  framework: Framework | None = None) -> list[TaxonomyPoint]:
    """Uniformly sample N points across all dimensions.

    framework: if None, sampler picks freely from FRAMEWORKS. If a specific
    framework string is passed, every returned point is locked to it —
    useful when caller wants a single-framework batch.
    """
    rng = Random(rng_seed)
    return [
        TaxonomyPoint(
            style=rng.choice(ARCHITECTURAL_STYLES),
            variant=rng.choice(VARIANTS),
            purpose=rng.choice(SITE_PURPOSES),
            seed=rng.randint(0, 1_000_000),
            framework=framework if framework is not None else rng.choice(FRAMEWORKS),
        )
        for _ in range(n)
    ]


def sample_stratified_animated(n: int, *, rng_seed: int | None = None,
                               framework: Framework | None = None) -> list[TaxonomyPoint]:
    """Like sample_stratified, but every returned point has animated=True."""
    points = sample_stratified(n, rng_seed=rng_seed, framework=framework)
    return [
        TaxonomyPoint(p.style, p.variant, p.purpose, p.seed, animated=True,
                      framework=p.framework)
        for p in points
    ]


def sample_stratified(n: int, *, rng_seed: int | None = None,
                      framework: Framework | None = None) -> list[TaxonomyPoint]:
    """Stratified sampling — guarantees every architectural style appears at least once.

    `framework` arg:
      None     → mix across all FRAMEWORKS (round 1 cycles through them; round 2 random).
      "react"  → every point gets framework="react".
      "vanilla"→ every point gets framework="vanilla".
    """
    if n < len(ARCHITECTURAL_STYLES):
        raise ValueError(
            f"stratified sampling needs n >= {len(ARCHITECTURAL_STYLES)} "
            f"to cover every architectural style; got n={n}"
        )

    rng = Random(rng_seed)
    points: list[TaxonomyPoint] = []
    purposes_left = list(SITE_PURPOSES)
    rng.shuffle(purposes_left)

    def _pick_framework(idx: int) -> Framework:
        if framework is not None:
            return framework
        return FRAMEWORKS[idx % len(FRAMEWORKS)]

    # Round 1: one task per architectural style; cycle through variants AND
    # frameworks so a small batch covers both axes deliberately.
    for i, style in enumerate(ARCHITECTURAL_STYLES):
        variant: Variant = VARIANTS[i % len(VARIANTS)]
        purpose = purposes_left.pop() if purposes_left else rng.choice(SITE_PURPOSES)
        points.append(TaxonomyPoint(
            style=style,
            variant=variant,
            purpose=purpose,
            seed=rng.randint(0, 1_000_000),
            framework=_pick_framework(i),
        ))

    # Remaining slots: random with light bias against repeating (style, purpose).
    for k in range(n - len(ARCHITECTURAL_STYLES)):
        seen = {(p.style, p.purpose) for p in points}
        candidate = None
        for _attempt in range(20):
            candidate = TaxonomyPoint(
                style=rng.choice(ARCHITECTURAL_STYLES),
                variant=rng.choice(VARIANTS),
                purpose=rng.choice(SITE_PURPOSES),
                seed=rng.randint(0, 1_000_000),
                framework=framework if framework is not None else rng.choice(FRAMEWORKS),
            )
            if (candidate.style, candidate.purpose) not in seen:
                break
        points.append(candidate)  # accept whatever we have after 20 tries

    rng.shuffle(points)
    return points
