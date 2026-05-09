export default function Footer() {
    return (
        <footer className="site-footer">
          <div className="site-footer__rule" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>
          </div>
          <div className="site-footer__arcade">
            <div className="site-footer__pillar">
              <h4>The Workshop</h4>
              <p>14 East Chitra Veedhi<br />Madurai 625 001<br />Tamil Nadu</p>
              <p className="site-footer__phone">Tel. 0452&middot;234&middot;1887</p>
            </div>
            <div className="site-footer__pillar site-footer__pillar--center">
              <div className="site-footer__mandala" aria-hidden="true">
                <div className="site-footer__mandala-ring"></div>
                <div className="site-footer__mandala-ring site-footer__mandala-ring--inner"></div>
                <span className="site-footer__mandala-glyph">ॐ</span>
              </div>
              <p className="site-footer__motto">Yathā piṇḍe tathā brahmāṇḍe<br /><em>As in the form, so in the cosmos</em></p>
            </div>
            <div className="site-footer__pillar">
              <h4>Drafting Hall Hours</h4>
              <p>Monday &mdash; Saturday<br />7.00 &ndash; 12.00 &middot; 16.00 &ndash; 19.30<br />Closed amavasya &amp; festival days</p>
            </div>
          </div>
          <nav className="site-footer__nav" aria-label="Footer">
            <a href="#/page-1">Atelier</a>
            <span aria-hidden="true">·</span>
            <a href="#/page-2">Lineage</a>
            <span aria-hidden="true">·</span>
            <a href="#/page-3">Practice</a>
            <span aria-hidden="true">·</span>
            <a href="#/page-4">Works</a>
            <span aria-hidden="true">·</span>
            <a href="#/page-5">Workshop</a>
            <span aria-hidden="true">·</span>
            <a href="#/page-6">Correspondence</a>
          </nav>
          <div className="site-footer__colophon">
            <p>&copy; Sthapati Ramaswamy Workshop &middot; Drawings, plans &amp; figural sculpture in the Dravida tradition since 1887. Commissions undertaken across the southern peninsula by retainer.</p>
          </div>
        </footer>
    )
}
