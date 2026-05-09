export default function Footer() {
    return (
        <footer className="site-footer" role="contentinfo">
          <div className="site-footer__inner">
            <div className="site-footer__seal" aria-hidden="true">
              <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" style={{color: "var(--fg)"}}>
                <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" stroke-width="1.2"/>
                <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" stroke-width="0.8"/>
                <text x="32" y="38" text-anchor="middle" font-family="serif" font-size="18" fill="currentColor">月</text>
              </svg>
            </div>
            <div className="site-footer__col site-footer__col--mark">
              <p className="site-footer__name">月見亭</p>
              <p className="site-footer__sub">Tsukimi-tei — Kappō &amp; Sake</p>
              <p className="site-footer__line">Seven seats. One counter.</p>
            </div>
            <div className="site-footer__col">
              <h4>Address</h4>
              <p>3-14-7 Yanaka<br/>Taitō-ku, Tōkyō 110-0001</p>
              <p>Nippori Stn. — 6 min on foot</p>
            </div>
            <div className="site-footer__col">
              <h4>Hours</h4>
              <p>Seatings 17:30 &amp; 20:30<br/>
              Reservations 14:00–16:00</p>
              <p>Closed Sundays &amp; 2nd Tuesdays</p>
            </div>
            <div className="site-footer__col">
              <h4>Contact</h4>
              <p>03&#8209;3823&#8209;XXXX</p>
              <p>counter@tsukimi-tei.jp</p>
            </div>
            <nav className="site-footer__nav" aria-label="Footer">
              <a href="#/page-1">Counter</a>
              <a href="#/page-2">Course</a>
              <a href="#/page-3">Sake</a>
              <a href="#/page-4">The Chef</a>
              <a href="#/page-5">Reservations</a>
              <a href="#/page-6">Visit</a>
            </nav>
            <div className="site-footer__meta">
              <p>© 令和六年 / 2024 Tsukimi-tei. All rights reserved.</p>
              <p className="site-footer__attr">Kamon &amp; wagara motifs adapted from Wikimedia sources under CC BY-SA; historical designs in the public domain.</p>
            </div>
          </div>
        </footer>
    )
}
