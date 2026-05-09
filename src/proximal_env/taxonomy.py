"""Taxonomy sampler for the website-generation pipeline.

Dimensions (locked in docs/generator.md):
    architectural_style ∈ 5 values
    variant             ∈ 2 values  (period_faithful | modern)
    site_purpose        ∈ 8 values
    seed                ∈ free-running integer (within-cell variation)

Two sampling modes:
    - sample_stratified(N) — for the curated 10-task deliverable.
    - sample_random(N)     — for scaling beyond the curated set.
"""

from dataclasses import dataclass
from random import Random
from typing import Literal

ArchitecturalStyle = Literal[
    "persian-safavid", "roman-imperial", "high-gothic", "dravidian", "edo-japanese"
]
Variant = Literal["period_faithful", "modern"]
SitePurpose = Literal[
    "museum", "university", "restaurant", "studio",
    "editorial", "portfolio", "civic", "foundation",
]

ARCHITECTURAL_STYLES: tuple[ArchitecturalStyle, ...] = (
    "persian-safavid", "roman-imperial", "high-gothic", "dravidian", "edo-japanese",
)
VARIANTS: tuple[Variant, ...] = ("period_faithful", "modern")
SITE_PURPOSES: tuple[SitePurpose, ...] = (
    "museum", "university", "restaurant", "studio",
    "editorial", "portfolio", "civic", "foundation",
)


@dataclass(frozen=True)
class TaxonomyPoint:
    style: ArchitecturalStyle
    variant: Variant
    purpose: SitePurpose
    seed: int
    animated: bool = False

    def slug(self) -> str:
        # Prefix animated tasks so filenames make the kind obvious without
        # having to crack open design-system.json. Static tasks keep their
        # existing slug form for backward compatibility.
        prefix = "anim-" if self.animated else ""
        return f"{prefix}{self.style}-{self.purpose}-{self.seed}"


def sample_random(n: int, *, rng_seed: int | None = None) -> list[TaxonomyPoint]:
    rng = Random(rng_seed)
    return [
        TaxonomyPoint(
            style=rng.choice(ARCHITECTURAL_STYLES),
            variant=rng.choice(VARIANTS),
            purpose=rng.choice(SITE_PURPOSES),
            seed=rng.randint(0, 1_000_000),
        )
        for _ in range(n)
    ]


def sample_stratified_animated(n: int, *, rng_seed: int | None = None) -> list[TaxonomyPoint]:
    """Like sample_stratified, but every returned point has animated=True."""
    points = sample_stratified(n, rng_seed=rng_seed)
    return [
        TaxonomyPoint(p.style, p.variant, p.purpose, p.seed, animated=True)
        for p in points
    ]


def sample_stratified(n: int, *, rng_seed: int | None = None) -> list[TaxonomyPoint]:
    """Stratified sampling — guarantees every architectural style appears at least once.

    The curated 10-task deliverable goes through this. Goal: maximize visible diversity
    in the report (no two near-identical (style × purpose) pairs).
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

    # Round 1: one task per architectural style; alternate variants.
    for i, style in enumerate(ARCHITECTURAL_STYLES):
        variant: Variant = VARIANTS[i % 2]
        purpose = purposes_left.pop() if purposes_left else rng.choice(SITE_PURPOSES)
        points.append(TaxonomyPoint(
            style=style,
            variant=variant,
            purpose=purpose,
            seed=rng.randint(0, 1_000_000),
        ))

    # Remaining slots: random with light bias against repeating (style, purpose).
    for _ in range(n - len(ARCHITECTURAL_STYLES)):
        seen = {(p.style, p.purpose) for p in points}
        candidate = None
        for _attempt in range(20):
            candidate = TaxonomyPoint(
                style=rng.choice(ARCHITECTURAL_STYLES),
                variant=rng.choice(VARIANTS),
                purpose=rng.choice(SITE_PURPOSES),
                seed=rng.randint(0, 1_000_000),
            )
            if (candidate.style, candidate.purpose) not in seen:
                break
        points.append(candidate)  # accept whatever we have after 20 tries

    rng.shuffle(points)
    return points
