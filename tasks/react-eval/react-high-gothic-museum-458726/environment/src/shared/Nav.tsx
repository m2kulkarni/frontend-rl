export default function Nav() {
    return (
        <header className="site-nav" role="banner">
          <div className="site-nav__arcade" aria-hidden="true"></div>
          <div className="site-nav__inner">
            <a className="site-nav__brand" href="#/page-1">
              <span className="site-nav__kicker">Anno Domini · MMXXIV</span>
              <span className="site-nav__wordmark">The Cloister Museum</span>
              <span className="site-nav__subtitle">of Sacred Glass &amp; Stone</span>
            </a>
            <nav className="site-nav__menu" aria-label="Primary">
              <ul className="site-nav__list">
                <li className="site-nav__item"><a className="site-nav__link" href="#/page-1">Nave</a></li>
                <li className="site-nav__item"><a className="site-nav__link" href="#/page-2">Galleries</a></li>
                <li className="site-nav__item"><a className="site-nav__link" href="#/page-3">Exhibitions</a></li>
                <li className="site-nav__item"><a className="site-nav__link" href="#/page-4">Visit</a></li>
                <li className="site-nav__item"><a className="site-nav__link" href="#/page-5">Lectures &amp; Vespers</a></li>
                <li className="site-nav__item"><a className="site-nav__link" href="#/page-6">History</a></li>
              </ul>
            </nav>
          </div>
          <div className="site-nav__cusp" aria-hidden="true">
            <img src="svg/vine-leaf-ornament.svg" alt="" />
            <span className="site-nav__motto">Lux perpetua luceat</span>
            <img src="svg/vine-leaf-ornament.svg" alt="" />
          </div>
        </header>
    )
}
