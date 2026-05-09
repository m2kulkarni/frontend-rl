"""Loader for per-style motif libraries.

Each style directory under motifs/ has the following structure (locked in design.md):
    palette.toml   — named colors + role mappings per variant
    fonts.toml     — Google Fonts pairings per variant
    notes.md       — declarative style facts the generator prompt quotes verbatim
    manifest.toml  — SVG inventory with provenance + per-motif metadata
    svg/*.svg      — the actual public-domain motif files

This module reads all of that into structured Python objects.
"""

import tomllib
from dataclasses import dataclass, field
from pathlib import Path

# Resolve the project root from this file's location: .../src/proximal_env/motifs.py
_PROJECT_ROOT = Path(__file__).resolve().parents[2]
MOTIFS_ROOT = _PROJECT_ROOT / "motifs"


@dataclass
class FontPairing:
    name: str
    display: str
    display_weights: list[int]
    body: str
    body_weights: list[int]
    notes: str


@dataclass
class Animation:
    """One CSS-loop animation pattern from a style's animations.toml.

    The generator's design-system pass picks one of these by name; the page
    generator emits the `css` block verbatim into the page's <style> and
    applies the matching class to the element matching `applies_to`.
    """
    name: str
    description: str
    applies_to: str           # motif role this animation typically targets
    duration_sec: float
    easing: str
    iteration_count: str
    css: str


@dataclass
class Motif:
    file: str  # path inside the style dir, e.g. "svg/girih-8-star.svg"
    role: str
    notes: str
    source: str
    license: str
    recolorable: bool


@dataclass
class StyleLibrary:
    style: str
    style_dir: Path
    palette: dict
    pairings_period: list[FontPairing] = field(default_factory=list)
    pairings_modern: list[FontPairing] = field(default_factory=list)
    notes_md: str = ""
    motifs: list[Motif] = field(default_factory=list)
    animations: list[Animation] = field(default_factory=list)

    def animation_by_name(self, name: str) -> Animation | None:
        for a in self.animations:
            if a.name == name:
                return a
        return None

    def named_colors(self) -> dict[str, str]:
        return self.palette["colors"]

    def colors_for(self, variant: str) -> dict[str, str]:
        """Return resolved {role -> hex} mapping for a variant.

        E.g. {"background": "#f3ebd9", "primary": "#1e3a5f", ...}
        """
        named = self.palette["colors"]
        role_to_name = self.palette["variants"][variant]
        return {role: named[name] for role, name in role_to_name.items()}

    def pairings_for(self, variant: str) -> list[FontPairing]:
        return self.pairings_period if variant == "period_faithful" else self.pairings_modern

    def motifs_by_filename(self) -> dict[str, Motif]:
        return {m.file: m for m in self.motifs}

    def motif_by_basename(self, basename: str) -> Motif | None:
        """Look up a motif by its bare filename (e.g. 'girih-8-star.svg')."""
        for m in self.motifs:
            if m.file.endswith(basename):
                return m
        return None

    def read_motif_svg(self, motif: Motif) -> str:
        return (self.style_dir / motif.file).read_text(encoding="utf-8")


def load_style(style: str, *, root: Path = MOTIFS_ROOT) -> StyleLibrary:
    """Load all artifacts for one architectural style from disk."""
    style_dir = root / style
    if not style_dir.is_dir():
        raise FileNotFoundError(f"style directory not found: {style_dir}")

    palette = tomllib.loads((style_dir / "palette.toml").read_text())
    fonts = tomllib.loads((style_dir / "fonts.toml").read_text())
    notes = (style_dir / "notes.md").read_text()
    manifest = tomllib.loads((style_dir / "manifest.toml").read_text())

    def parse_pairings(variant_key: str) -> list[FontPairing]:
        raw = (
            fonts.get("variants", {})
                 .get(variant_key, {})
                 .get("pairings", [])
        )
        return [
            FontPairing(
                name=p["name"],
                display=p["display"],
                display_weights=p.get("display_weights", [400]),
                body=p["body"],
                body_weights=p.get("body_weights", [400]),
                notes=p.get("notes", ""),
            )
            for p in raw
        ]

    motifs = [
        Motif(
            file=m["file"],
            role=m["role"],
            notes=m.get("notes", ""),
            source=m.get("source", ""),
            license=m.get("license", ""),
            recolorable=m.get("recolorable", True),
        )
        for m in manifest.get("motifs", [])
    ]

    # Animations are optional — only animated-bonus styles will have an
    # animations.toml. Static tasks ignore this list entirely.
    animations: list[Animation] = []
    anim_path = style_dir / "animations.toml"
    if anim_path.is_file():
        anim_data = tomllib.loads(anim_path.read_text())
        animations = [
            Animation(
                name=a["name"],
                description=a.get("description", ""),
                applies_to=a.get("applies_to", "ornament_inline"),
                duration_sec=float(a.get("duration_sec", 5.0)),
                easing=a.get("easing", "ease-in-out"),
                iteration_count=a.get("iteration_count", "infinite"),
                css=a.get("css", ""),
            )
            for a in anim_data.get("animations", [])
        ]

    return StyleLibrary(
        style=style,
        style_dir=style_dir,
        palette=palette,
        pairings_period=parse_pairings("period_faithful"),
        pairings_modern=parse_pairings("modern"),
        notes_md=notes,
        motifs=motifs,
        animations=animations,
    )
