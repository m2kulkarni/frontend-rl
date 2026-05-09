export default function Nav() {
    return (
        <header className="site-nav" role="banner">
          <div className="site-nav__inner">
            <a className="site-nav__brand" href="#/page-1" aria-label="Hanagumi Atelier — home">
              <span className="site-nav__mark" aria-hidden="true">
                <svg viewBox="0 0 32 32" width="28" height="28" style={{color: "var(--fg)"}}>
                  <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" stroke-width="1.25"/>
                  <circle cx="16" cy="6.5" r="2.4" fill="currentColor"/>
                  <circle cx="24.4" cy="12.5" r="2.4" fill="currentColor"/>
                  <circle cx="21.2" cy="22.4" r="2.4" fill="currentColor"/>
                  <circle cx="10.8" cy="22.4" r="2.4" fill="currentColor"/>
                  <circle cx="7.6" cy="12.5" r="2.4" fill="currentColor"/>
                  <circle cx="16" cy="16" r="1.6" fill="currentColor"/>
                </svg>
              </span>
              <span className="site-nav__wordmark">
                <span className="site-nav__name">Hanagumi Atelier</span>
                <span className="site-nav__sub">花組 — Kyōto, est. 2014</span>
              </span>
            </a>
            <nav className="site-nav__links" aria-label="Primary">
              <a href="#/page-1"><span className="site-nav__num">01</span> Home</a>
              <a href="#/page-2"><span className="site-nav__num">02</span> Studio</a>
              <a href="#/page-3"><span className="site-nav__num">03</span> Works</a>
              <a href="#/page-4"><span className="site-nav__num">04</span> Process</a>
              <a href="#/page-5"><span className="site-nav__num">05</span> Journal</a>
              <a href="#/page-6"><span className="site-nav__num">06</span> Contact</a>
            </nav>
          </div>
          <div className="site-nav__rule" aria-hidden="true"></div>
        </header>
    )
}
