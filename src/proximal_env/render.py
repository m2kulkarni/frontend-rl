"""Render generated HTML pages to PNG screenshots via Playwright.

Renders at the canonical viewport (1440×900), full-page (so scrollable content
is captured), with font readiness awaited. Uses Chromium pinned by the installed
playwright version.

For pages taller than TILE_THRESHOLD pixels, additionally produces vertical
tiles (1440×1568 with 200 px overlap) so the agent's vision API receives
images at full fidelity — Anthropic downsamples images with longest-side
> 1568, which would lose fine ornament on tall scrolling pages.

The full-page PNG (page-N.png) remains the grader's reference.
The tiles (page-N-tile-K.png) are agent-input convenience.

Usage from Python:
    from proximal_env.render import render_task
    paths = render_task(Path("generated/kalasha-..."))

Or via the CLI: scripts/render_screenshots.py
"""

from pathlib import Path

from PIL import Image
from playwright.sync_api import Page, sync_playwright

# Locked in docs/generator.md
VIEWPORT_WIDTH = 1440
VIEWPORT_HEIGHT = 900

# Tiling parameters — see module docstring for rationale.
TILE_HEIGHT = 1568   # Anthropic vision API longest-side fidelity ceiling
TILE_OVERLAP = 200   # so a section straddling a boundary is fully visible in one tile
TILE_THRESHOLD = 2000  # below this height, pages are not tiled (one PNG is enough)

# Video / frame-capture parameters (Bonus 1, animations).
VIDEO_DURATION_SEC = 5.0
VIDEO_FRAME_COUNT = 15      # one frame every ~333ms over a 5-second window
FILMSTRIP_COLS = 4          # 4×4 grid = 16 cells, 15 frames + 1 blank.
FILMSTRIP_ROWS = 4          # Time runs left-to-right, top-to-bottom.
FILMSTRIP_FRAME_W = 360     # 25% of viewport width
FILMSTRIP_FRAME_H = 225     # 25% of viewport height
# Total filmstrip dimensions: 1440 × 900 — matches the canonical viewport, well
# under Anthropic's 1568 longest-side limit so the vision API processes each
# cell at full per-cell resolution without downsampling.


def _compute_tile_ranges(height: int) -> list[tuple[int, int]]:
    """Compute (y0, y1) ranges for tiles covering a full-page render.

    Returns an empty list for short pages (no tiling needed).
    """
    if height <= TILE_THRESHOLD:
        return []
    stride = TILE_HEIGHT - TILE_OVERLAP
    starts: list[int] = []
    y = 0
    while y + TILE_HEIGHT <= height:
        starts.append(y)
        y += stride
    # Ensure the bottom is covered. If the last tile we added doesn't reach the
    # bottom, add one more tile anchored to the bottom edge.
    if starts and starts[-1] + TILE_HEIGHT < height:
        starts.append(height - TILE_HEIGHT)
    return [(s, s + TILE_HEIGHT) for s in starts]


def _save_tiles(full_png_path: Path) -> list[Path]:
    """Slice a full-page screenshot into tiles. Returns the written tile paths."""
    img = Image.open(full_png_path)
    width, height = img.size
    ranges = _compute_tile_ranges(height)
    if not ranges:
        return []
    base = full_png_path.stem  # "page-1"
    written: list[Path] = []
    for i, (y0, y1) in enumerate(ranges, start=1):
        crop = img.crop((0, y0, width, y1))
        out = full_png_path.parent / f"{base}-tile-{i}.png"
        crop.save(out, "PNG")
        written.append(out)
    return written


def _render_with_page(page: Page, html_path: Path, out_path: Path) -> None:
    """Inner: assumes a Playwright Page is already attached and configured."""
    file_url = f"file://{html_path.resolve()}"
    page.goto(file_url, wait_until="networkidle", timeout=30000)

    # Wait for web fonts to settle. document.fonts.ready is a promise; awaiting
    # it via evaluate ensures CSS-bundled fonts have arrived before we shoot.
    page.evaluate("document.fonts.ready")

    # Small extra settle for any CSS transitions/animations that fire on load.
    page.wait_for_timeout(500)

    page.screenshot(path=str(out_path), full_page=True)


def render_page(html_path: Path, out_path: Path) -> None:
    """Render a single HTML file to PNG. Spins up its own Playwright context."""
    with sync_playwright() as p:
        browser = p.chromium.launch()
        try:
            context = browser.new_context(
                viewport={"width": VIEWPORT_WIDTH, "height": VIEWPORT_HEIGHT},
                device_scale_factor=1,
            )
            page = context.new_page()
            _render_with_page(page, html_path, out_path)
        finally:
            browser.close()


def _record_one_page_frames(page, html_path: Path, frames_dir: Path) -> list[Path]:
    """Take VIDEO_FRAME_COUNT timed screenshots of a page, evenly spaced over
    VIDEO_DURATION_SEC. Build a horizontal filmstrip alongside the frames.

    The viewport screenshots show the animation at evenly-spaced moments
    (frame-01 at t=0, frame-02 at t=333ms, …, frame-15 at t=4666ms). The agent
    reads the filmstrip first ("which element moves?"), then loads individual
    frames for fine detail.
    """
    file_url = f"file://{html_path.resolve()}"
    page.goto(file_url, wait_until="networkidle", timeout=30000)
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(500)  # initial settle so the first frame is the post-load state

    frames_dir.mkdir(parents=True, exist_ok=True)
    interval_ms = int((VIDEO_DURATION_SEC * 1000) / VIDEO_FRAME_COUNT)

    frame_paths: list[Path] = []
    for i in range(VIDEO_FRAME_COUNT):
        if i > 0:
            page.wait_for_timeout(interval_ms)
        out = frames_dir / f"frame-{i+1:02d}.png"
        page.screenshot(path=str(out), full_page=False)  # viewport-only on purpose
        frame_paths.append(out)

    # Build the 4×4 grid filmstrip (rows-first, time progresses left-to-right
    # then top-to-bottom). Total = 1440×900, within Anthropic's 1568 ceiling.
    strip_w = FILMSTRIP_COLS * FILMSTRIP_FRAME_W
    strip_h = FILMSTRIP_ROWS * FILMSTRIP_FRAME_H
    strip = Image.new("RGB", (strip_w, strip_h), "white")
    for i, fp in enumerate(frame_paths):
        if i >= FILMSTRIP_COLS * FILMSTRIP_ROWS:
            break
        row = i // FILMSTRIP_COLS
        col = i % FILMSTRIP_COLS
        img = Image.open(fp).resize(
            (FILMSTRIP_FRAME_W, FILMSTRIP_FRAME_H), Image.LANCZOS
        )
        strip.paste(img, (col * FILMSTRIP_FRAME_W, row * FILMSTRIP_FRAME_H))
    strip_path = frames_dir / "filmstrip.png"
    strip.save(strip_path, "PNG")
    return [strip_path, *frame_paths]


def record_task(task_dir: Path, *, videos_dir: Path | None = None) -> list[Path]:
    """For each page-*.html in task_dir, capture timed frames + a filmstrip.

    Output layout:
        videos_dir/
        ├── page-1/
        │   ├── filmstrip.png
        │   └── frame-01.png ... frame-15.png
        └── page-2/ ...
    """
    if videos_dir is None:
        videos_dir = task_dir / "videos"
    videos_dir.mkdir(parents=True, exist_ok=True)

    html_paths = sorted(task_dir.glob("page-*.html"))
    if not html_paths:
        return []

    written: list[Path] = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        try:
            context = browser.new_context(
                viewport={"width": VIEWPORT_WIDTH, "height": VIEWPORT_HEIGHT},
                device_scale_factor=1,
            )
            page = context.new_page()
            for html_path in html_paths:
                page_dir = videos_dir / html_path.stem  # videos/page-1/
                # Wipe previous frames so a re-render doesn't leave stale ones.
                if page_dir.exists():
                    for stale in page_dir.glob("*.png"):
                        stale.unlink()
                written.extend(_record_one_page_frames(page, html_path, page_dir))
        finally:
            browser.close()
    return written


def render_task(task_dir: Path, *, screenshots_dir: Path | None = None) -> list[Path]:
    """Render every page-*.html in a task directory to its screenshots/ subdir.

    Produces one full-page PNG per page (page-N.png), and additionally tiles
    (page-N-tile-K.png) for any page taller than TILE_THRESHOLD pixels.

    Reuses a single browser/context across pages within the task — much faster
    than spinning up Chromium per page. Returns the list of all written PNG
    paths (full pages + tiles).
    """
    if screenshots_dir is None:
        screenshots_dir = task_dir / "screenshots"
    screenshots_dir.mkdir(parents=True, exist_ok=True)

    # Clean stale tile files so a re-render with different page heights
    # doesn't leave orphaned tiles around.
    for stale in screenshots_dir.glob("page-*-tile-*.png"):
        stale.unlink()

    html_paths = sorted(task_dir.glob("page-*.html"))
    if not html_paths:
        return []

    written: list[Path] = []
    with sync_playwright() as p:
        browser = p.chromium.launch()
        try:
            context = browser.new_context(
                viewport={"width": VIEWPORT_WIDTH, "height": VIEWPORT_HEIGHT},
                device_scale_factor=1,
            )
            page = context.new_page()
            for html_path in html_paths:
                out_path = screenshots_dir / (html_path.stem + ".png")
                _render_with_page(page, html_path, out_path)
                written.append(out_path)
                # Slice tall pages into tiles for the agent's vision API.
                tiles = _save_tiles(out_path)
                written.extend(tiles)
        finally:
            browser.close()

    return written
