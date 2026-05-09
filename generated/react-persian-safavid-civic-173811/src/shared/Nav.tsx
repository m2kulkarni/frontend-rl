export default function Nav() {
    return (
        <header className="site-nav" role="banner">
          <div className="site-nav__rule" aria-hidden="true"></div>
          <div className="site-nav__inner">
            <div className="site-nav__brand">
              <span className="site-nav__seal" aria-hidden="true">✶</span>
              <a className="site-nav__wordmark" href="#/page-1">
                <span className="site-nav__wordmark-line1">Dīvān-i Shahr</span>
                <span className="site-nav__wordmark-line2">Civic Register of Isfahan</span>
              </a>
              <span className="site-nav__seal" aria-hidden="true">✶</span>
            </div>
            <p className="site-nav__kicker">Established 1006 A.H. &middot; Maydān-i Naqsh-e Jahān</p>
            <nav className="site-nav__menu" aria-label="Primary">
              <ul>
                <li><a href="#/page-1">Entry Hall</a></li>
                <li><a href="#/page-2">Edicts &amp; Notices</a></li>
                <li><a href="#/page-3">Petitions</a></li>
                <li><a href="#/page-4">The Bureau</a></li>
                <li><a href="#/page-5">Quarters &amp; Bazaars</a></li>
                <li><a href="#/page-6">Visit</a></li>
              </ul>
            </nav>
          </div>
          <div className="site-nav__rule site-nav__rule--bottom" aria-hidden="true"></div>
        </header>
    )
}
