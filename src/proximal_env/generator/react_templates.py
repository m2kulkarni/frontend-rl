"""React+Vite project boilerplate templates.

Bonus 2 (multi-framework) generates a runnable Vite+React app per task.
Most files in the project are pure boilerplate — the LLM doesn't need to
write `package.json`, `vite.config.ts`, `tsconfig.json`, `main.tsx`, the
router shell, or the shared Nav/Footer/Motif components. We generate
those deterministically here.

What the LLM DOES write per React task: one `src/pages/Page<N>.tsx` per
page (6 files), each a default-exported React component that uses the
provided `<Nav>`, `<Footer>`, and `<Motif name="..."/>` building blocks.

The Motif component is a placeholder — at task-package time the build
pipeline replaces `<Motif name="foo">` with the verbatim source SVG body.
Same idea as the vanilla `<img src="motifs/foo.svg">` post-process.
"""

from __future__ import annotations

import re

# Pinned React + Vite versions. Lockfile-stable so we can pre-cache
# node_modules in the Docker image and skip per-trial `npm install`.
PACKAGE_JSON = """\
{
  "name": "proximal-react-task",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "vite build"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1"
  },
  "devDependencies": {
    "@types/react": "18.3.12",
    "@types/react-dom": "18.3.1",
    "@vitejs/plugin-react": "4.3.3",
    "typescript": "5.6.3",
    "vite": "5.4.10"
  }
}
"""

VITE_CONFIG_TS = """\
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Static-only build — pages are referenced via hash routing in App.tsx.
// Output to ./dist; the verifier renders dist/index.html#/page-N.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: false, // keep readable so structural rubric can parse the rendered HTML
  },
})
"""

TSCONFIG_JSON = """\
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
"""

INDEX_HTML = """\
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="design-system.css" />
    <title>{site_name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
"""

MAIN_TSX = """\
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// Pull the design-system tokens + base typography into Vite's bundle so they
// land in dist/assets/. Without this import, the CSS file lives in the task
// root but never gets shipped to dist/.
import '../design-system.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
"""


def render_app_tsx(num_pages: int) -> str:
    """Hash-router shell. Each #/page-N route renders the corresponding
    Page<N> component. Defaults to Page1.

    We use a hash-based router (not BrowserRouter) so that:
      - The same dist/index.html serves every route via fragment.
      - The verifier opens `file://.../dist/index.html#/page-N` directly.
      - No server needed — pure static.
    """
    page_imports = "\n".join(
        f"import Page{i} from './pages/Page{i}'" for i in range(1, num_pages + 1)
    )
    page_routes = "\n    ".join(
        f'\'/page-{i}\': <Page{i} />,' for i in range(1, num_pages + 1)
    )
    return f"""\
import {{ useEffect, useState }} from 'react'
{page_imports}

const ROUTES: Record<string, React.ReactElement> = {{
    {page_routes}
}}

function getRoute(): string {{
    const h = (typeof window !== 'undefined' ? window.location.hash : '') || '#/page-1'
    return h.replace(/^#/, '') || '/page-1'
}}

export default function App() {{
    const [route, setRoute] = useState(getRoute())
    useEffect(() => {{
        const onHash = () => setRoute(getRoute())
        window.addEventListener('hashchange', onHash)
        return () => window.removeEventListener('hashchange', onHash)
    }}, [])
    return ROUTES[route] || ROUTES['/page-1']
}}
"""


def render_nav_tsx(jsx_inner: str) -> str:
    """Wrap pre-converted JSX (the design-system shared nav) into a Nav
    component."""
    return f"""\
export default function Nav() {{
    return (
{jsx_inner}
    )
}}
"""


def render_footer_tsx(jsx_inner: str) -> str:
    return f"""\
export default function Footer() {{
    return (
{jsx_inner}
    )
}}
"""


# The Motif component is a stub at LLM-generation time. The build pipeline
# replaces `<Motif name="foo" ... />` references in the LLM-emitted Page*.tsx
# files with inline JSX containing the verbatim source SVG body. So this
# component never actually renders at build time — it's a *placeholder
# token* the regex post-process matches against.
#
# We still ship a working stub here so that if a Page<N>.tsx slips through
# without post-processing, Vite's build doesn't fail catastrophically — it
# just renders a `[motif: foo]` placeholder text node.
MOTIF_TSX = """\
type Props = {
  name: string
  className?: string
  width?: number | string
  height?: number | string
  style?: React.CSSProperties
}

export default function Motif({ name, className, width, height, style }: Props) {
  // Build-time post-process replaces these with inlined SVG. If you see this
  // text in a rendered page, the post-process didn't run.
  return (
    <span
      className={className}
      style={{ display: 'inline-block', width, height, ...style }}
      data-motif={name}
    >
      [motif: {name}]
    </span>
  )
}
"""


# ---- HTML → JSX converter ---------------------------------------------------

# JSX uses className instead of class, htmlFor instead of for, and all
# attributes camelCase. We only handle a small set — the shared-HTML the
# design-system pass produces is well-controlled (we wrote the prompt) so
# we don't need a general DOM walker.

_JSX_ATTR_FIXUPS = (
    (re.compile(r"\bclass="),   "className="),
    (re.compile(r"\bfor="),     "htmlFor="),
    (re.compile(r"\btabindex=", re.IGNORECASE), "tabIndex="),
    (re.compile(r"\breadonly\b(?!=)", re.IGNORECASE), 'readOnly={true}'),
)

# Self-closing void elements we need to JSX-correct.
_VOID = ("br", "hr", "img", "input", "meta", "link", "source", "track", "wbr", "area", "base", "col", "embed", "param")


def html_to_jsx(html: str) -> str:
    """Best-effort HTML→JSX rewrite for the shared nav/footer blocks.

    Handles: class= → className=, for= → htmlFor=, void tags self-closed.
    Doesn't try to parse arbitrary HTML — assumes the input is well-formed
    (the design-system pass's output is, since we wrote the prompt).
    """
    out = html
    for pat, sub in _JSX_ATTR_FIXUPS:
        out = pat.sub(sub, out)
    # Void elements: replace `<br>` and `<br />` with `<br />`. Already-
    # self-closed forms are idempotent under this regex.
    for tag in _VOID:
        out = re.sub(rf"<{tag}\b([^/>]*)>", rf"<{tag}\1 />", out, flags=re.IGNORECASE)
    # Comments: HTML `<!-- ... -->` becomes `{/* ... */}` in JSX.
    out = re.sub(r"<!--\s*(.*?)\s*-->", r"{/* \1 */}", out, flags=re.DOTALL)
    return out


def react_project_files(
    site_name: str,
    nav_html: str,
    footer_html: str,
    num_pages: int,
) -> list[tuple[str, str]]:
    """Return all the deterministic React+Vite boilerplate files for one task.

    Returns a list of (relative_path, content) pairs the caller writes into
    the task's generated/<slug>/ directory. The LLM-generated Page<N>.tsx
    files are written separately by the page generator.

    Inputs:
        site_name   — used in `index.html`'s <title>.
        nav_html    — verbatim shared nav HTML emitted by the design-system
                      pass; we convert to JSX and embed in Nav.tsx.
        footer_html — same for footer.
        num_pages   — App.tsx imports & routes Page1..PageN accordingly.
    """
    # Convert HTML→JSX, then rewrite cross-page links (page-N.html → #/page-N)
    # so the hash router in App.tsx picks up clicks. Imported here (not at
    # module top) to avoid the circular page_react ↔ react_templates dance.
    from proximal_env.generator.page_react import rewrite_react_routes

    # Indent the converted JSX by 8 spaces so it sits inside `return (\n...\n)`
    nav_jsx = "\n".join(
        "        " + ln for ln in
        rewrite_react_routes(html_to_jsx(nav_html)).splitlines()
        if ln.strip()
    )
    footer_jsx = "\n".join(
        "        " + ln for ln in
        rewrite_react_routes(html_to_jsx(footer_html)).splitlines()
        if ln.strip()
    )

    return [
        ("package.json", PACKAGE_JSON),
        ("vite.config.ts", VITE_CONFIG_TS),
        ("tsconfig.json", TSCONFIG_JSON),
        ("index.html", INDEX_HTML.format(site_name=site_name)),
        ("src/main.tsx", MAIN_TSX),
        ("src/App.tsx", render_app_tsx(num_pages)),
        ("src/shared/Nav.tsx", render_nav_tsx(nav_jsx)),
        ("src/shared/Footer.tsx", render_footer_tsx(footer_jsx)),
        ("src/shared/Motif.tsx", MOTIF_TSX),
    ]
