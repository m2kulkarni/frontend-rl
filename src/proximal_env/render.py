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

Bonus 2 (multi-framework): tasks with `package.json` + `src/App.tsx` are
treated as React+Vite projects. `render_task` runs `npm install` (one-time,
cached) and `npm run build` before screenshotting `dist/index.html#/page-N`
via the hash router. Pages and tiles are produced exactly as for vanilla
tasks; downstream rubrics see identical filenames.

Usage from Python:
    from proximal_env.render import render_task
    paths = render_task(Path("generated/kalasha-..."))

Or via the CLI: scripts/render_screenshots.py
"""

import http.server
import json
import socketserver
import subprocess
import threading
from contextlib import contextmanager
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

    page.evaluate("document.fonts.ready")
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


def _is_react_task(task_dir: Path) -> bool:
    """A task is React+Vite if it has a Vite project layout."""
    return (task_dir / "package.json").is_file() and (task_dir / "src" / "App.tsx").is_file()


def _ensure_react_built(task_dir: Path) -> Path:
    """Run `npm install` + `npm run build` for a React task. Returns dist/.

    Skips installation if `node_modules/` already exists (idempotent re-runs
    are cheap). Skips the build if `dist/index.html` already exists; callers
    that want a fresh build should rm -rf the dist/ directory first.
    """
    dist = task_dir / "dist"
    nm = task_dir / "node_modules"

    if not nm.is_dir():
        # `--cache` to a per-run dir avoids permission issues with shared
        # ~/.npm caches that may be owned by another user (sudo install
        # earlier in the host's history is the canonical case).
        subprocess.run(
            ["npm", "install", "--cache", "/tmp/proximal-npm-cache",
             "--no-audit", "--no-fund", "--silent"],
            cwd=task_dir, check=True,
        )

    if not (dist / "index.html").is_file():
        subprocess.run(
            ["npm", "run", "build", "--silent"],
            cwd=task_dir, check=True,
        )

    return dist


def _react_num_pages(task_dir: Path) -> int:
    """How many Page<N>.tsx files does this React task have?

    Prefers design-system.json's page_count when available; falls back to
    counting `src/pages/Page*.tsx`.
    """
    ds_path = task_dir / "design-system.json"
    if ds_path.is_file():
        try:
            ds = json.loads(ds_path.read_text())
            n = int(ds.get("page_count", 0))
            if n > 0:
                return n
        except (json.JSONDecodeError, OSError, ValueError):
            pass
    return len(list((task_dir / "src" / "pages").glob("Page*.tsx")))


@contextmanager
def _local_static_server(dir_to_serve: Path):
    """Tiny background HTTP server. Yields the base URL.

    Required because file:// + ES modules + crossorigin (the shape Vite emits)
    is blocked by Chromium. SPAs need HTTP.
    """
    handler = lambda *a, **kw: http.server.SimpleHTTPRequestHandler(
        *a, directory=str(dir_to_serve), **kw
    )

    # Silence the per-request stderr noise.
    class _QuietHandler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args, **kwargs): pass

    handler = lambda *a, **kw: _QuietHandler(*a, directory=str(dir_to_serve), **kw)
    httpd = socketserver.TCPServer(("127.0.0.1", 0), handler)
    port = httpd.server_address[1]
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    try:
        yield f"http://127.0.0.1:{port}"
    finally:
        httpd.shutdown()
        httpd.server_close()


def _render_react_with_page(page: Page, base_url: str, route: str, out_path: Path) -> None:
    """Open a hash route on the local HTTP server and screenshot it full-page."""
    url = f"{base_url}/index.html#{route}"
    page.goto(url, wait_until="networkidle", timeout=30000)
    page.evaluate("document.fonts.ready")
    # Hash routers re-render on hashchange; give it a beat to settle.
    page.wait_for_timeout(500)
    page.screenshot(path=str(out_path), full_page=True)


def render_task(task_dir: Path, *, screenshots_dir: Path | None = None) -> list[Path]:
    """Render every page in a task directory to its screenshots/ subdir.

    Two paths:
      - Vanilla: every `page-*.html` at the task root, opened via `file://`.
      - React (Bonus 2): builds `dist/` if needed, then opens
        `dist/index.html#/page-N` for each route registered by App.tsx.

    Produces one full-page PNG per page (`page-N.png`), and additionally tiles
    (`page-N-tile-K.png`) for any page taller than TILE_THRESHOLD pixels. The
    output filenames are framework-agnostic so downstream rubrics don't need
    to know which framework produced them.

    Reuses a single browser/context across pages within the task. Returns the
    list of all written PNG paths (full pages + tiles).
    """
    if screenshots_dir is None:
        screenshots_dir = task_dir / "screenshots"
    screenshots_dir.mkdir(parents=True, exist_ok=True)

    # Clean stale tile files so a re-render with different page heights
    # doesn't leave orphaned tiles around.
    for stale in screenshots_dir.glob("page-*-tile-*.png"):
        stale.unlink()

    react = _is_react_task(task_dir)
    if react:
        dist = _ensure_react_built(task_dir)
        num_pages = _react_num_pages(task_dir)
        if num_pages == 0:
            return []
    else:
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

            if react:
                # Need HTTP, not file://, because Vite emits ES modules with
                # `crossorigin` which Chromium refuses to load over file://.
                with _local_static_server(dist) as base_url:
                    for n in range(1, num_pages + 1):
                        out_path = screenshots_dir / f"page-{n}.png"
                        _render_react_with_page(page, base_url, f"/page-{n}", out_path)
                        written.append(out_path)
                        tiles = _save_tiles(out_path)
                        written.extend(tiles)
            else:
                for html_path in html_paths:
                    out_path = screenshots_dir / (html_path.stem + ".png")
                    _render_with_page(page, html_path, out_path)
                    written.append(out_path)
                    tiles = _save_tiles(out_path)
                    written.extend(tiles)
        finally:
            browser.close()

    return written
