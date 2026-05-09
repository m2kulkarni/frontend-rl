export default function Nav() {
    return (
        <header className="site-nav" role="banner">
          <div className="site-nav__inner">
            <a className="site-nav__mark" href="#/page-1" aria-label="Tsukimi-tei home">
              <span className="site-nav__kanji">月見亭</span>
              <span className="site-nav__romaji">Tsukimi&#8209;tei</span>
            </a>
            <div className="site-nav__kicker">
              <span className="site-nav__season">晩秋 · Late Autumn</span>
              <span className="site-nav__sep" aria-hidden="true">—</span>
              <span className="site-nav__est">Est. 令和元年 / 2019</span>
            </div>
            <nav className="site-nav__links" aria-label="Primary">
              <ol>
                <li><a href="#/page-1"><span className="num">一</span><span className="lbl">Counter</span></a></li>
                <li><a href="#/page-2"><span className="num">二</span><span className="lbl">Course</span></a></li>
                <li><a href="#/page-3"><span className="num">三</span><span className="lbl">Sake</span></a></li>
                <li><a href="#/page-4"><span className="num">四</span><span className="lbl">The Chef</span></a></li>
                <li><a href="#/page-5"><span className="num">五</span><span className="lbl">Reservations</span></a></li>
                <li><a href="#/page-6"><span className="num">六</span><span className="lbl">Visit</span></a></li>
              </ol>
            </nav>
          </div>
          <div className="site-nav__rule" aria-hidden="true"></div>
        </header>
    )
}
