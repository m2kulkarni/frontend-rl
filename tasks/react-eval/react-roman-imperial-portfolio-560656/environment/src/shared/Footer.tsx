export default function Footer() {
    return (
        <footer className="site-footer" role="contentinfo">
          <div className="site-footer__meander" aria-hidden="true"></div>
          <div className="site-footer__inner">
            <div className="site-footer__col site-footer__col--mark">
              <span className="site-footer__name">ATELIER VESPERIA</span>
              <span className="site-footer__tag">ARCHITECTURE · MOSAIC · ORNAMENT</span>
            </div>
            <div className="site-footer__col">
              <h4>Studio</h4>
              <p>Via dei Coronari 138<br />00186 Roma, Italia</p>
              <p>By appointment<br />Mar–Ven · 10:00–17:00</p>
            </div>
            <div className="site-footer__col">
              <h4>Inquiries</h4>
              <p>studio@vesperia.atelier<br />+39 06 6880 4412</p>
              <p>Flavia Settembrini<br />Atelier Manager</p>
            </div>
            <nav className="site-footer__col site-footer__nav" aria-label="Footer">
              <h4>Index</h4>
              <a href="#/page-1">Atrium</a>
              <a href="#/page-2">Selected Works</a>
              <a href="#/page-3">Villa Aurelia</a>
              <a href="#/page-4">Drawings &amp; Ornament</a>
              <a href="#/page-5">Studio &amp; Practice</a>
              <a href="#/page-6">Commissions &amp; Visit</a>
            </nav>
          </div>
          <div className="site-footer__rule" aria-hidden="true"></div>
          <div className="site-footer__colophon">
            <span>© MMXXIV · Atelier Vesperia · Lucia Marciana</span>
            <span className="site-footer__dot" aria-hidden="true">❦</span>
            <span>Set in Marcellus &amp; Inter · Roma</span>
          </div>
        </footer>
    )
}
