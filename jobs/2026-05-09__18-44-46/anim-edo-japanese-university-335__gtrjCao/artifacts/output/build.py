#!/usr/bin/env python3
import re, os
out_dir = "/app/output"
def read(p):
    with open(p) as f: return f.read()
def strip_xml(s):
    s = re.sub(r"<\?xml[^>]*\?>", "", s)
    s = re.sub(r"<!DOCTYPE[^>]*>", "", s, flags=re.I)
    s = re.sub(r"<!--.*?-->", "", s, flags=re.S)
    return s

def normalize_svg(s, viewbox=None, default_class=""):
    # Remove width/height attrs from root <svg>; ensure viewBox; allow CSS to size.
    def repl(m):
        attrs = m.group(1)
        attrs = re.sub(r'\swidth="[^"]*"', '', attrs)
        attrs = re.sub(r'\sheight="[^"]*"', '', attrs)
        if "viewBox=" not in attrs and viewbox:
            attrs += f' viewBox="{viewbox}"'
        attrs += ' preserveAspectRatio="xMidYMid meet"'
        if default_class:
            if 'class="' in attrs:
                attrs = re.sub(r'class="([^"]*)"', f'class="\\1 {default_class}"', attrs)
            else:
                attrs += f' class="{default_class}"'
        return f"<svg{attrs}>"
    return re.sub(r'<svg([^>]*)>', repl, s, count=1)

head_t = read(f"{out_dir}/_partials/head.html")
nav = read(f"{out_dir}/_partials/nav.html")
infobar = read(f"{out_dir}/_partials/infobar.html")
footer = read(f"{out_dir}/_partials/footer.html")
bg = read(f"{out_dir}/_partials/bg-seigaiha.html")

kiri = normalize_svg(strip_xml(read("/app/motifs/kiri-paulownia-mon.svg")), viewbox="0 0 345 326", default_class="kiri-svg pulse")
torii = normalize_svg(strip_xml(read("/app/motifs/torii-myoujin.svg")), viewbox="40 60 980 700", default_class="torii-svg")
saya = normalize_svg(strip_xml(read("/app/motifs/sayagata-keyfret.svg")), viewbox="0 0 600 600", default_class="saya-svg")

# Add a class to the kiri SVG root for animation targeting (the .pulse wrapper handles it)
# but ensure SVG dimensions are sane
# the SVG has width/height attrs so we leave them; CSS sets size on parent

titles = {1:"Home",2:"Faculties",3:"Admissions",4:"Research",5:"Campus",6:"About"}
for n in range(1,7):
    body = read(f"{out_dir}/_partials/page-{n}-body.html")
    head = head_t.replace("__TITLE__", titles[n])
    out = head + body
    out = out.replace("__NAV__", nav)
    out = out.replace("__INFOBAR__", infobar)
    out = out.replace("__FOOTER__", footer)
    out = out.replace("__BG_SEIGAIHA__", bg)
    out = out.replace("__SVG_KIRI__", kiri)
    out = out.replace("__SVG_TORII__", torii)
    out = out.replace("__SVG_SAYA__", saya)
    with open(f"{out_dir}/page-{n}.html", "w") as f:
        f.write(out)
    print(f"wrote page-{n}.html ({len(out)} bytes)")
