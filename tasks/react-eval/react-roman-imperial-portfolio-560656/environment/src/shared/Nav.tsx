export default function Nav() {
    return (
        <header className="site-nav" role="banner">
          <div className="site-nav__rule" aria-hidden="true"></div>
          <div className="site-nav__inner">
            <a className="site-nav__wordmark" href="#/page-1" aria-label="Atelier Vesperia, home">
              <span className="site-nav__kicker">STUDIO · ROMA · MMXXIV</span>
              <span className="site-nav__name">ATELIER VESPERIA</span>
              <span className="site-nav__sub">Studio of Lucia Marciana</span>
            </a>
            <nav className="site-nav__links" aria-label="Primary">
              <a href="#/page-1">Atrium</a>
              <span className="site-nav__sep" aria-hidden="true">·</span>
              <a href="#/page-2">Works</a>
              <span className="site-nav__sep" aria-hidden="true">·</span>
              <a href="#/page-3">Case Study</a>
              <span className="site-nav__sep" aria-hidden="true">·</span>
              <a href="#/page-4">Drawings</a>
              <span className="site-nav__sep" aria-hidden="true">·</span>
              <a href="#/page-5">Studio</a>
              <span className="site-nav__sep" aria-hidden="true">·</span>
              <a href="#/page-6">Commissions</a>
            </nav>
          </div>
          <div className="site-nav__meander" aria-hidden="true"></div>
        </header>
    )
}
