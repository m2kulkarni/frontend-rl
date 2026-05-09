export default function Footer() {
    return (
        <footer className="site-footer" role="contentinfo">
          <div className="site-footer__rule" aria-hidden="true"></div>
          <div className="site-footer__inner">
            <div className="site-footer__col site-footer__col--center">
              <span className="site-footer__seal" aria-hidden="true">✶</span>
              <p className="site-footer__name">Dīvān-i Shahr-i Iṣfahān</p>
              <p className="site-footer__tagline">The Civic Register &middot; Bureau of Records of the Royal City</p>
            </div>
            <div className="site-footer__cols">
              <div className="site-footer__col">
                <h4>Address</h4>
                <p>Western Arcade,<br />Maydān-i Naqsh-e Jahān,<br />three doors north of the<br />Qaysariyya Gate, Iṣfahān.</p>
              </div>
              <div className="site-footer__col">
                <h4>Chancery Hours</h4>
                <p>Saturday — Wednesday<br />Second hour past dawn<br />until the call for ẓuhr.<br />Closed on holy days.</p>
              </div>
              <div className="site-footer__col">
                <h4>Officers</h4>
                <p>Mīrzā Ḥusayn Khān Shīrāzī, Mayor<br />Mīr Muḥammad-Bāqir, Chief Scribe<br />Āqā Ṣādiq Tabrīzī, Inspector</p>
              </div>
              <div className="site-footer__col">
                <h4>Register</h4>
                <ul className="site-footer__nav">
                  <li><a href="#/page-1">Entry Hall</a></li>
                  <li><a href="#/page-2">Edicts &amp; Notices</a></li>
                  <li><a href="#/page-3">Petitions</a></li>
                  <li><a href="#/page-4">The Bureau</a></li>
                  <li><a href="#/page-5">Quarters &amp; Bazaars</a></li>
                  <li><a href="#/page-6">Visit</a></li>
                </ul>
              </div>
            </div>
            <p className="site-footer__colophon">
              Sealed and recorded in the year 1108 A.H. &middot; By the hand of the Chief Scribe.
            </p>
          </div>
          <div className="site-footer__rule site-footer__rule--bottom" aria-hidden="true"></div>
        </footer>
    )
}
