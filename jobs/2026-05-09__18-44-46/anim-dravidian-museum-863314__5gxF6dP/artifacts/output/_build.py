#!/usr/bin/env python3
"""Build helper: prepares SVG content for inlining."""
import os
import re

MOTIFS_DIR = "/app/motifs"

def compute_bbox(svg_text):
    """Compute the rough bounding box of all <path d="..."/> coords, including
    any single outer <g transform="translate(x,y)"> on the first nesting level."""
    # Outer translate
    tx, ty = 0.0, 0.0
    g_m = re.search(r'<g[^>]*transform="translate\(([-+\d.]+)[, ]+([-+\d.]+)\)"', svg_text)
    if g_m:
        tx = float(g_m.group(1))
        ty = float(g_m.group(2))
    xs, ys = [], []
    for m in re.finditer(r'\sd="([^"]+)"', svg_text):
        d = m.group(1)
        nums = re.findall(r'[-+]?\d+\.?\d*', d)
        nums = [float(n) for n in nums]
        for i in range(0, len(nums) - 1, 2):
            xs.append(nums[i] + tx)
            ys.append(nums[i + 1] + ty)
    if not xs:
        return None
    return (min(xs), min(ys), max(xs) - min(xs), max(ys) - min(ys))


# Pre-computed viewBoxes that look good (manually tuned).
# These are computed from the path bbox + outer translate.
VIEWBOX_OVERRIDES = {
    "arabesque-palmette.svg": "auto",
    "floral-headpiece.svg":   "auto",
    "bird-headpiece.svg":     "auto",
    "twin-peacocks.svg":      "auto",
    "peacock-headpiece.svg":  "auto",
    "peacock-ornament.svg":   "auto",
    "peacock-tailpiece.svg":  "auto",
    "lotus-flower.svg":       None,
    "om-symbol.svg":          None,
    "om-alt.svg":             None,
    "conch-shell.svg":        None,
}

def load_svg(name, extra_class=None, viewbox=None, par=None):
    """Load an SVG file and prepare it for inlining."""
    path = os.path.join(MOTIFS_DIR, name)
    with open(path) as f:
        s = f.read()
    s = re.sub(r'<\?xml[^?]*\?>', '', s)
    s = re.sub(r'<!--.*?-->', '', s, flags=re.DOTALL)
    s = re.sub(r'<sodipodi:namedview[^/]*?/>', '', s, flags=re.DOTALL)
    s = re.sub(r'<sodipodi:namedview.*?</sodipodi:namedview>', '', s, flags=re.DOTALL)
    s = re.sub(r'<metadata.*?</metadata>', '', s, flags=re.DOTALL)

    m = re.search(r'<svg([^>]*)>', s)
    if not m:
        return s
    attrs = m.group(1)
    w_m = re.search(r'\swidth="([^"]+)"', attrs)
    h_m = re.search(r'\sheight="([^"]+)"', attrs)
    vb_m = re.search(r'\sviewBox="([^"]+)"', attrs)

    new_attrs = attrs
    new_attrs = re.sub(r'\swidth="[^"]*"', '', new_attrs)
    new_attrs = re.sub(r'\sheight="[^"]*"', '', new_attrs)
    new_attrs = re.sub(r'\sviewBox="[^"]*"', '', new_attrs)
    new_attrs = re.sub(r'\spreserveAspectRatio="[^"]*"', '', new_attrs)

    # Determine viewBox
    if viewbox:
        vb = viewbox
    elif name in VIEWBOX_OVERRIDES and VIEWBOX_OVERRIDES[name] == "auto":
        bbox = compute_bbox(s)
        if bbox:
            x, y, w, h = bbox
            # Add a small padding
            pad_x = w * 0.02
            pad_y = h * 0.02
            vb = f"{x - pad_x} {y - pad_y} {w + 2*pad_x} {h + 2*pad_y}"
        elif vb_m:
            vb = vb_m.group(1)
        else:
            vb = "0 0 1000 1000"
    elif name in VIEWBOX_OVERRIDES and VIEWBOX_OVERRIDES[name]:
        vb = VIEWBOX_OVERRIDES[name]
    elif vb_m:
        vb = vb_m.group(1)
    elif w_m and h_m:
        def numeric(v):
            return re.match(r'^[\d.]+', v).group(0)
        wv = numeric(w_m.group(1))
        hv = numeric(h_m.group(1))
        if 'mm' in w_m.group(1):
            wv = str(round(float(wv) * 3.78))
            hv = str(round(float(hv) * 3.78))
        vb = f"0 0 {wv} {hv}"
    else:
        # Compute from bbox
        bbox = compute_bbox(s)
        if bbox:
            vb = f"{bbox[0]} {bbox[1]} {bbox[2]} {bbox[3]}"
        else:
            vb = "0 0 1000 1000"

    if par is None:
        par = "xMidYMid meet"

    new_attrs += f' viewBox="{vb}"'
    new_attrs += f' preserveAspectRatio="{par}"'
    if extra_class:
        if 'class="' in new_attrs:
            new_attrs = re.sub(r'class="([^"]*)"', rf'class="\1 {extra_class}"', new_attrs)
        else:
            new_attrs += f' class="{extra_class}"'
    s = s[:m.start()] + f'<svg{new_attrs}>' + s[m.end():]
    return s.strip()

def write(path, content):
    with open(path, "w") as f:
        f.write(content)

if __name__ == "__main__":
    # Test
    print(load_svg("om-symbol.svg")[:300])
