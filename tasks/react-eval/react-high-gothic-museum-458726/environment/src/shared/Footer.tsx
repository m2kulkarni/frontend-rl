export default function Footer() {
    return (
        <footer className="site-footer" role="contentinfo">
          <div className="site-footer__arcade" aria-hidden="true"></div>
          <div className="site-footer__inner">
            <section className="site-footer__col site-footer__col--seal">
              <img className="site-footer__seal" src="svg/cross-flory.svg" alt="" />
              <p className="site-footer__name">The Cloister Museum<br/>of Sacred Glass &amp; Stone</p>
              <p className="site-footer__founded">Founded MDCCCXCVII<br/>by Édouard de Saint-Pierre</p>
            </section>
            <section className="site-footer__col">
              <h3 className="site-footer__heading">Direction</h3>
              <address className="site-footer__address">
                7, rue des Vitraux<br/>
                77300 Fontainebleau<br/>
                France<br/>
                +33 1 64 22 41 18<br/>
                bureau@cloister-museum.fr
              </address>
            </section>
            <section className="site-footer__col">
              <h3 className="site-footer__heading">Hours</h3>
              <p className="site-footer__hours">
                Tuesday – Sunday<br/>
                X heures – XVII heures et demie<br/>
                <em>Closed Mondays &amp; All Saints</em>
              </p>
            </section>
            <section className="site-footer__col">
              <h3 className="site-footer__heading">The Museum</h3>
              <ul className="site-footer__nav">
                <li><a href="#/page-1">Nave</a></li>
                <li><a href="#/page-2">Galleries</a></li>
                <li><a href="#/page-3">Exhibitions</a></li>
                <li><a href="#/page-4">Visit</a></li>
                <li><a href="#/page-5">Lectures &amp; Vespers</a></li>
                <li><a href="#/page-6">History</a></li>
              </ul>
            </section>
          </div>
          <div className="site-footer__band" aria-hidden="true"></div>
          <p className="site-footer__colophon">
            &copy; MMXXIV · Le Musée du Cloître · All rights reserved · <span lang="la">Soli Deo gloria</span>
          </p>
        </footer>
    )
}
