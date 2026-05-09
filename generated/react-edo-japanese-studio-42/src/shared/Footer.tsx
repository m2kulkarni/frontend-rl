export default function Footer() {
    return (
        <footer className="site-footer" role="contentinfo">
          <div className="site-footer__rule" aria-hidden="true"></div>
          <div className="site-footer__inner">
            <div className="site-footer__col site-footer__col--seal">
              <svg className="site-footer__seal" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">
                <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" stroke-width="1.25"/>
                <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" stroke-width="0.75"/>
                <path d="M32 12 C26 22, 22 26, 14 30 C22 30, 28 32, 32 38 C36 32, 42 30, 50 30 C42 26, 38 22, 32 12 Z" fill="currentColor"/>
                <circle cx="32" cy="34" r="2" fill="var(--bg)"/>
              </svg>
              <p className="site-footer__signature">花組工房印<br /><span>Hanagumi Atelier</span></p>
            </div>
            <div className="site-footer__col">
              <h4>Studio</h4>
              <p>
                二階, 384 Aneyakōji-dōri<br />
                Tominokōji nishi-iru<br />
                Nakagyō-ku, Kyōto 604-8091
              </p>
              <p>Tue–Fri · 11:00–18:00<br />By appointment</p>
            </div>
            <div className="site-footer__col">
              <h4>Contact</h4>
              <p>studio@hanagumi.kyoto<br />+81 75 231 4408</p>
              <p>Next commission intake<br />closes 30 September</p>
            </div>
            <nav className="site-footer__col site-footer__nav" aria-label="Footer">
              <h4>Index</h4>
              <a href="#/page-1">Home</a>
              <a href="#/page-2">Studio</a>
              <a href="#/page-3">Works</a>
              <a href="#/page-4">Process</a>
              <a href="#/page-5">Journal</a>
              <a href="#/page-6">Contact</a>
            </nav>
          </div>
          <div className="site-footer__base">
            <p>© 2014–2024 Hanagumi Atelier · Adachi &amp; Kuwabara g.k.</p>
            <p className="site-footer__attr">Kamon &amp; wagara motifs adapted from Wikimedia sources (CC BY-SA, 19th-c. designs PD by age).</p>
          </div>
        </footer>
    )
}
