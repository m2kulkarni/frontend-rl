export default function Nav() {
    return (
        <header className="site-nav">
          <div className="site-nav__topband" aria-hidden="true"></div>
          <div className="site-nav__inner">
            <div className="site-nav__brand">
              <span className="site-nav__kicker">Est. Madurai · 1887</span>
              <a className="site-nav__wordmark" href="#/page-1">
                <span className="site-nav__line1">Sthapati Ramaswamy</span>
                <span className="site-nav__seal" aria-hidden="true">✦</span>
                <span className="site-nav__line2">Workshop &mdash; Temple Architects</span>
              </a>
            </div>
            <nav className="site-nav__menu" aria-label="Primary">
              <ul>
                <li><a href="#/page-1">Atelier</a></li>
                <li><a href="#/page-2">Lineage</a></li>
                <li><a href="#/page-3">Practice</a></li>
                <li><a href="#/page-4">Works</a></li>
                <li><a href="#/page-5">Workshop</a></li>
                <li><a href="#/page-6">Correspondence</a></li>
              </ul>
            </nav>
          </div>
          <div className="site-nav__rule" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
        </header>
    )
}
