import Nav from '../shared/Nav';
import Footer from '../shared/Footer';
import Motif from '../shared/Motif';

export default function Page5() {
  return (
    <div className="page5-root">
      <style>{`
        .page5-root {
          background: var(--bg);
          color: var(--text);
          font-family: var(--font-body), serif;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .page5-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 4vw;
          position: relative;
        }

        .page5-hero {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 0;
          padding: 8rem 0 6rem;
          position: relative;
          min-height: 70vh;
        }

        .page5-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'/>");
          pointer-events: none;
        }

        .page5-hero-bg {
          position: absolute;
          right: -8%;
          top: 4rem;
          opacity: 0.08;
          width: 520px;
          height: 520px;
          z-index: 0;
          pointer-events: none;
        }

        .page5-hero-bg svg {
          width: 100%;
          height: 100%;
        }

        .page5-eyebrow {
          font-family: var(--font-display), serif;
          font-size: 0.78rem;
          letter-spacing: 0.5em;
          text-transform: uppercase;
          color: var(--text-emphasis);
          writing-mode: vertical-rl;
          padding-top: 1rem;
          align-self: start;
          height: 14rem;
        }

        .page5-eyebrow .kanji {
          font-size: 1.1rem;
          letter-spacing: 0.3em;
          color: var(--accent);
          margin-bottom: 1.5rem;
          display: inline-block;
        }

        .page5-title-block {
          position: relative;
          z-index: 1;
          padding-left: 3rem;
          border-left: 1px solid var(--ornament);
        }

        .page5-title {
          font-family: var(--font-display), serif;
          font-size: clamp(2.6rem, 5.5vw, 4.6rem);
          font-weight: 400;
          line-height: 1.2;
          margin: 0 0 2rem;
          color: var(--primary);
          letter-spacing: 0.02em;
        }

        .page5-title .accent-mark {
          color: var(--accent);
          display: inline-block;
          margin-left: 0.4rem;
          font-size: 0.6em;
          vertical-align: top;
        }

        .page5-subtitle {
          font-family: var(--font-display), serif;
          font-size: 1.1rem;
          line-height: 1.8;
          max-width: 32rem;
          color: var(--text);
          margin: 0;
        }

        .page5-divider {
          margin: 4rem 0;
          display: flex;
          align-items: center;
          gap: 2rem;
          opacity: 0.55;
        }

        .page5-divider .line {
          flex: 1;
          height: 1px;
          background: var(--ornament);
        }

        .page5-divider svg {
          flex-shrink: 0;
        }

        .page5-instructions {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 0;
          padding: 4rem 0 6rem;
          position: relative;
        }

        .page5-instructions-empty {
          /* deliberate emptiness, left third */
        }

        .page5-instructions-body {
          grid-column: 2 / 4;
          padding-left: 4rem;
          border-left: 1px solid rgba(12, 12, 12, 0.15);
          max-width: 38rem;
        }

        .page5-instructions-body p {
          font-family: var(--font-display), serif;
          font-size: 1.05rem;
          line-height: 1.95;
          margin: 0 0 1.8rem;
        }

        .page5-instructions-body .lead {
          font-size: 1.25rem;
          line-height: 1.85;
          color: var(--text-emphasis);
          margin-bottom: 2.5rem;
        }

        .page5-instructions-body .telephone {
          display: block;
          font-family: var(--font-display), serif;
          font-size: 2rem;
          letter-spacing: 0.04em;
          color: var(--primary);
          margin: 0.4rem 0 0.2rem;
        }

        .page5-instructions-body .telephone-window {
          display: block;
          font-size: 0.9rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--text-emphasis);
        }

        .page5-instructions-body em.season {
          color: var(--accent);
          font-style: normal;
          font-weight: 500;
        }

        .page5-particulars {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 0;
          padding: 6rem 0 4rem;
          position: relative;
          background: var(--surface);
        }

        .page5-particulars-pattern {
          position: absolute;
          left: -4%;
          top: 0;
          width: 360px;
          height: 100%;
          opacity: 0.07;
          pointer-events: none;
          z-index: 0;
        }

        .page5-particulars-pattern svg {
          width: 100%;
          height: 100%;
        }

        .page5-particulars-head {
          padding-right: 3rem;
          position: relative;
          z-index: 1;
        }

        .page5-particulars-head h2 {
          font-family: var(--font-display), serif;
          font-size: 2rem;
          font-weight: 400;
          line-height: 1.4;
          margin: 0;
          color: var(--text-emphasis);
        }

        .page5-particulars-head .kanji-side {
          font-family: var(--font-display), serif;
          font-size: 0.85rem;
          letter-spacing: 0.3em;
          color: var(--accent);
          display: block;
          margin-bottom: 1rem;
        }

        .page5-particulars-list {
          position: relative;
          z-index: 1;
          padding-left: 3rem;
          border-left: 1px solid var(--ornament);
        }

        .page5-particulars-list dl {
          display: grid;
          grid-template-columns: 11rem 1fr;
          gap: 1.4rem 2rem;
          margin: 0;
        }

        .page5-particulars-list dt {
          font-family: var(--font-display), serif;
          font-size: 0.82rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-emphasis);
          padding-top: 0.3rem;
        }

        .page5-particulars-list dd {
          font-family: var(--font-display), serif;
          font-size: 1rem;
          line-height: 1.85;
          margin: 0;
          color: var(--primary);
        }

        .page5-seal {
          margin: 6rem 0 4rem;
          display: flex;
          justify-content: flex-end;
          padding-right: 8%;
        }

        .page5-seal-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.8rem;
        }

        .page5-seal svg {
          color: var(--primary);
        }

        .page5-seal .seal-caption {
          font-family: var(--font-display), serif;
          font-size: 0.75rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-emphasis);
        }

        .page5-coda {
          display: grid;
          grid-template-columns: 2fr 1fr;
          padding: 4rem 0 8rem;
          gap: 4rem;
        }

        .page5-coda-text {
          max-width: 30rem;
        }

        .page5-coda-text p {
          font-family: var(--font-display), serif;
          font-size: 1rem;
          line-height: 1.95;
          color: var(--text);
          margin: 0 0 1.4rem;
        }

        .page5-coda-meta {
          font-family: var(--font-display), serif;
          font-size: 0.85rem;
          line-height: 1.9;
          color: var(--text-emphasis);
          letter-spacing: 0.05em;
          align-self: end;
          text-align: right;
        }

        .page5-coda-meta a {
          color: var(--accent);
          text-decoration: none;
          border-bottom: 1px solid var(--accent);
        }

        @media (max-width: 880px) {
          .page5-hero { grid-template-columns: 1fr; padding: 5rem 0 3rem; }
          .page5-eyebrow { writing-mode: horizontal-tb; height: auto; padding-bottom: 1.5rem; }
          .page5-title-block { padding-left: 0; border-left: none; border-top: 1px solid var(--ornament); padding-top: 2rem; }
          .page5-instructions { grid-template-columns: 1fr; }
          .page5-instructions-body { grid-column: 1; padding-left: 0; border-left: none; }
          .page5-particulars { grid-template-columns: 1fr; padding: 4rem 0; }
          .page5-particulars-list { padding-left: 0; border-left: none; margin-top: 2rem; }
          .page5-particulars-list dl { grid-template-columns: 1fr; gap: 0.4rem 0; }
          .page5-particulars-list dd { margin-bottom: 1.2rem; }
          .page5-coda { grid-template-columns: 1fr; }
          .page5-coda-meta { text-align: left; }
        }
      `}</style>

      <Nav />

      <main className="page5-main">
        <section className="page5-hero">
          <div className="page5-hero-bg" aria-hidden="true">
            
<svg xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="700" height="700" id="svg2" viewBox="0 0 700 700" width={520} height={520} style={{color: "var(--fg)"}}>
	<title>Seigaiha</title>
	<defs>
		<g id="C1">
			<path d="M 1,210 V 100 A 98,98 0 0 1 100,1 98,98 0 0 1 199,100 V 210" />
			<path d="M 175,210 V 100 A 75,75 0 0 0 100,25 75,75 0 0 0 25,100 V 210" />
		</g>
	</defs>
	<g id="C4">
		<use xlink:href="#C1" />
		<use xlink:href="#C1" transform="translate(200,0)" />
		<use xlink:href="#C1" transform="translate(400,0)" />
		<use xlink:href="#C1" transform="translate(600,0)" />
	</g>
	<use xlink:href="#C4" transform="translate(-100,100)" />
	<use xlink:href="#C4" transform="translate(0,200)" />
	<use xlink:href="#C4" transform="translate(-100,300)" />
	<use xlink:href="#C4" transform="translate(0,400)" />
	<use xlink:href="#C4" transform="translate(-100,500)" />
	<use xlink:href="#C4" transform="translate(0,600)" />
</svg>
          </div>

          <div className="page5-eyebrow">
            <span className="kanji">予約</span>
            Reservations · 月見亭
          </div>

          <div className="page5-title-block">
            <h1 className="page5-title">
              By telephone,<br />
              between two<br />
              and four<span className="accent-mark">·</span>
            </h1>
            <p className="page5-subtitle">
              Seven seats. Two seatings nightly. The booking is a small
              ceremony of its own — please call the house directly, in the
              quiet hours of the afternoon.
            </p>
          </div>
        </section>

        <div className="page5-divider" aria-hidden="true">
          <span className="line" />
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="600" height="600" viewBox="0 0 600 600" width={120} height={28} style={{color: "var(--fg)"}}>
<style type="text/css">{`
	.st0{fill:none;stroke:#000;stroke-width:2;}
`}</style>
<polygon className="st0" points="501.6,301.2 551.1,251.7 500.8,201.4 451.3,250.9 300.9,100.5 350.4,51 300.1,0.7 250.6,50.2 
	201.1,0.7 150.3,51.5 500.3,401.5 551.1,350.7 "/>
<polygon className="st0" points="600.9,199.9 551.6,150.7 601.2,101 550.7,50.4 501,100.1 450.4,150.7 400.8,200.3 451.3,250.9 
	501,201.2 550.3,250.5 "/>
<polyline className="st0" points="600,0 400.8,200.3 351,150.5 501.5,0 "/>
<polygon className="st0" points="349.9,452.9 300.4,502.4 250.1,452.1 299.6,402.6 149.2,252.2 99.7,301.7 49.4,251.4 98.9,201.9 
	49.4,152.4 100.2,101.6 450.2,451.6 399.4,502.4 "/>
<polygon className="st0" points="248.7,552.1 199.4,502.9 149.7,552.5 99.2,501.9 148.8,452.3 199.4,401.7 249,352.1 299.6,402.6 
	250,452.3 299.2,501.6 "/>
<polygon className="st0" points="-0.9,302.6 48.4,351.9 -1.2,401.5 49.3,452.1 99,402.5 149.6,351.9 199.2,302.2 148.7,251.7 99,301.3 
	49.7,252 "/>
<rect x="86.2" y="284.6" transform="matrix(-0.7071 -0.7071 0.7071 -0.7071 -96.6059 819.6381)" className="st0" width="70.5" height="290.4"/>
<polyline className="st0" points="551.1,350.7 501.6,301.2 551.1,251.7 600.6,301.2 "/>
<polyline className="st0" points="49.4,152.4 99.4,202.4 49.7,252 -0.2,202.1 "/>
<polyline className="st0" points="399.4,502.4 349.4,452.4 299.8,502.1 349.7,552.1 299.2,602.6 "/>
<line className="st0" x1="600.4" y1="400" x2="398.7" y2="600.7"/>
<line className="st0" x1="99.4" y1="0" x2="0.4" y2="101.6"/>
<line className="st0" x1="600" y1="502.4" x2="499.6" y2="600"/>
<line className="st0" x1="43.7" y1="557.4" x2="0.4" y2="600.7"/>
<line className="st0" x1="149.7" y1="552.5" x2="99" y2="600.7"/>
</svg>
          <span className="line" />
        </div>

        <section className="page5-instructions">
          <div className="page5-instructions-empty" aria-hidden="true" />
          <div className="page5-instructions-body">
            <p className="lead">
              Tsukimi-tei accepts reservations by voice only. We keep no
              online ledger; the master, Ogawa-san, takes the book in hand
              each afternoon and writes guests in by name.
            </p>

            <p>
              <em className="season">Two seatings</em> are offered each
              evening — the early at <strong>17:30</strong> and the late at
              <strong> 20:30</strong>. The counter holds seven; on most
              nights both seatings are filled within the week.
            </p>

            <p>
              Telephone reservations are received between
              <strong> 14:00 and 16:00</strong>, in the gap between the
              morning market and evening preparation. Outside these hours
              the line is left to ring.
            </p>

            <p>
              <span className="telephone">03-3823-4781</span>
              <span className="telephone-window">14:00 – 16:00 · Japan Standard Time</span>
            </p>

            <p>
              A deposit of <strong>¥10,000 per seat</strong> is requested
              upon booking, sent by furikomi within two weeks of the
              reservation being entered. The deposit is refundable in full
              up to <em className="season">seventy-two hours</em> before
              the seating, and applied to the bill on the night.
            </p>

            <p>
              The house is closed on <strong>Sundays</strong> and on the
              <strong> second Tuesday</strong> of each month. Out of regard
              for the quietness of the room, children under twelve are not
              seated at the counter.
            </p>

            <p>
              Should you wish to mark a particular occasion — a birthday,
              the first viewing of cherry, the harvest moon — please say
              so on the telephone. Ogawa-san will place a small flourish in
              the menu.
            </p>
          </div>
        </section>

        <section className="page5-particulars">
          <div className="page5-particulars-pattern" aria-hidden="true">
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" width="503" height="501" viewBox="0 0 503 501" width={360} height={720} style={{color: "var(--fg)"}}>
<style type="text/css">{`
	.st0{fill:none;stroke:#000;stroke-linecap:round;}
	.st1{fill:none;stroke:#000;}
`}</style>
<symbol  id="grid" viewBox="-50.5 -50.5 101 101">
	<line className="st0" x1="0" y1="50" x2="0" y2="-15"/>
	<line className="st0" x1="0" y1="50" x2="-50" y2="15"/>
	<line className="st0" x1="0" y1="50" x2="50" y2="15"/>
	<line className="st0" x1="0" y1="50" x2="-50" y2="-50"/>
	<line className="st0" x1="0" y1="50" x2="50" y2="-50"/>
	<line className="st1" x1="0" y1="-15" x2="-50" y2="-50"/>
	<line className="st1" x1="0" y1="-15" x2="50" y2="-50"/>
	<line className="st1" x1="50" y1="15" x2="50" y2="-50"/>
</symbol>
<line className="st1" x1="0.5" y1="100.5" x2="500.5" y2="100.5"/>
<line className="st1" x1="0.5" y1="200.5" x2="500.5" y2="200.5"/>
<line className="st1" x1="0.5" y1="300.5" x2="500.5" y2="300.5"/>
<line className="st1" x1="0.5" y1="400.5" x2="500.5" y2="400.5"/>
<line className="st1" x1="100.5" y1="35.5" x2="100.5" y2="100.5"/>
<line className="st1" x1="0.5" y1="300.5" x2="500.5" y2="300.5"/>
<use xlink:href="#grid"  width="101" height="101" id="XMLID_1_" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 50.5 50.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 151 50.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 251.5 50.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 352 50.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 452.5 50.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 1 50.5 150.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 1 151 150.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 1 251.5 150.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 1 352 150.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 1 452.5 150.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 50.5 250.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 151 250.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 251.5 250.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 352 250.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 452.5 250.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 50.5 450.5048)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 151 450.5048)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 251.5 450.5048)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 352 450.5048)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 -1 452.5 450.5048)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 1 50.5 350.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 1 151 350.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 1 251.5 350.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 1 352 350.5)"/>
<use xlink:href="#grid"  width="101" height="101" x="-50.5" y="-50.5" transform="matrix(1 0 0 1 452.5 350.5)"/>
</svg>
          </div>

          <div className="page5-particulars-head">
            <span className="kanji-side">細目</span>
            <h2>The particulars,<br />for the record.</h2>
          </div>

          <div className="page5-particulars-list">
            <dl>
              <dt>Telephone</dt>
              <dd>03-3823-4781<br />Calls received 14:00 – 16:00 only</dd>

              <dt>Seatings</dt>
              <dd>17:30 (early) · 20:30 (late)<br />Counter of seven seats</dd>

              <dt>Course</dt>
              <dd>One omakase kaiseki, ¥28,000 per guest<br />Sake pairing of seven, ¥9,000</dd>

              <dt>Deposit</dt>
              <dd>¥10,000 per seat, by furikomi<br />Refundable up to 72 hours prior</dd>

              <dt>Closures</dt>
              <dd>Sundays<br />Second Tuesday of each month<br />New Year, 29 December – 5 January</dd>

              <dt>Address</dt>
              <dd>2-7-12 Yanaka, Taitō-ku, Tōkyō 110-0001<br />Three minutes on foot from Sendagi station, exit 2</dd>

              <dt>Children</dt>
              <dd>Guests under twelve are respectfully not seated</dd>

              <dt>Attire</dt>
              <dd>No code; a quiet jacket is welcome.<br />Strong fragrance discouraged.</dd>
            </dl>
          </div>
        </section>

        <div className="page5-seal" aria-hidden="true">
          <div className="page5-seal-inner">
            

<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   version="1.1"
   width="688"
   height="688"
   id="svg2"
   xml:space="preserve" className="seal" width={110} height={110}><metadata
     id="metadata8"><rdf:RDF><cc:Work
         rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type
           rdf:resource="http://purl.org/dc/dcmitype/StillImage" /><dc:title></dc:title></cc:Work></rdf:RDF></metadata><defs
     id="defs6" /><g
     transform="matrix(1.25,0,0,-1.25,130.52945,976.02211)"
     id="g10"><rect
       width="550.40002"
       height="550.40002"
       x="-104.42356"
       y="-780.81769"
       transform="scale(1,-1)"
       id="rect5733" /><g
       transform="matrix(0.90805161,0,0,0.90805161,-98.479009,143.93972)"
       id="g5609"><path
         d="m 150.3,329.4816 c -16.62,1.08 -32.58,6.84 -46.02,16.5 1.56,-9.18 3.96,-18.18 6.96,-26.94 17.64,-10.44 37.92,-15.96 58.56,-15.96 1.8,0 3.24,0.12 4.14,0.12 l 0.06,0 -0.3,2.94 c -10.38,4.74 -18.66,13.02 -23.4,23.34 z"
         id="path14" /><path
         d="m 259.14,174.32064 c -8.22,-6.24 -17.94,-10.2 -28.2,-11.34 8.58,4.74 16.26,11.22 22.68,18.96 1.62,-2.58 3.42,-5.1 5.52,-7.62 z"
         id="path24" /><path
         d="m 281.64,154.04064 0,0 -7.2,5.04 c -3.24,-1.32 -6.36,-2.52 -9.6,-3.42 z"
         id="path32" /><path
         d="M 281.64,154.04064 z"
         id="path34" /><path
         d="m 247.92,158.36064 0,0.06 c 4.32,2.7 8.16,6.06 11.16,10.14 -5.76,-3.84 -12.12,-6.72 -18.66,-8.46 z"
         id="path40" /><path
         d="m 236.52,176.12064 c -9.48,-3.48 -19.32,-5.4 -29.22,-5.7 l 15.96,-5.64 c 4.98,2.94 9.54,6.78 13.26,11.34 z"
         id="path44" /><path
         d="m 234.36,190.40064 -0.06,0 c -6.3,-6.12 -13.62,-11.04 -21.66,-14.34 12.36,1.02 24.48,4.86 34.26,11.22 z"
         id="path52" /><path
         d="m 208.68,200.42064 c 6.12,-2.94 12.24,-5.46 18.48,-7.62 -10.2,-9.12 -23.28,-14.4 -36.96,-15 l -18.54,10.02 c 12.54,2.82 25.02,7.02 37.02,12.6 z"
         id="path58" /><path
         d="M 190.2,177.80064 z"
         id="path62" /><path
         d="m 137.4,213.44064 c 13.2,0 26.4,2.16 39,6.06 7.56,-5.7 15.72,-10.74 24.24,-15.12 -12.96,-5.1 -26.52,-8.34 -40.32,-9.42 -8.76,5.88 -16.8,12 -24.18,18.54 -1.38,0.06 -0.9,-0.06 1.26,-0.06 z"
         id="path66" /><path
         d="m 247.08,194.96064 c -12.48,2.88 -24.84,7.2 -36.72,12.84 l 30.24,12.12 -0.06,0.06 c 0.9,-8.58 3.06,-16.98 6.54,-25.02 z"
         id="path70" /><path
         d="m 151.08,241.2216 c -9.48,-1.50096 -19.2,-2.34096 -28.92,-2.34096 -4.56,0 -8.52,0.24 -11.88,0.54 5.52,-6.54 11.4,-12.66 17.64,-18.54 -3.12,0 -2.76,-0.12 1.2,-0.12 13.8,0 27.48,1.32 40.68,3.66 -6.48,5.1 -12.84,10.74 -18.72,16.80096 z"
         id="path84" /><path
         d="m 128.1,269.4816 c -6.54,-0.6 -13.38,-0.96 -20.46,-0.96 -6.96,0 -13.32,0.36 -19.26,0.96 4.26,-7.08 9.06,-14.04 14.22,-20.58 3.96,-0.42 8.52,-0.66 13.68,-0.66 9,0 17.88,0.72 26.52,1.98 -5.16,5.94 -10.08,12.42 -14.7,19.26 z"
         id="path92" /><path
         d="m 148.38,254.5416 c 0.06,-0.18 2.46,-0.3 7.14,-0.3 19.56,0 39,2.04 57.9,6.18 0.06,-0.06 0.06,0.18 0.06,0.66 0,2.52 0.24,4.92 0.72,7.32 0,0 -0.36,-0.12 -0.96,-0.12 -9.12,0 -17.88,3.12 -24.9,8.82 -16.38,-2.7 -33.18,-4.02 -50.1,-4.02 -5.4,0 -6.84,0.12 -4.32,0.18 4.44,-6.66 9.24,-12.9 14.46,-18.72 z"
         id="path98" /><path
         d="m 67.14,312.4416 c 13.02,-9.6 28.74,-14.88 45.06,-14.88 1.2,0 1.32,0 0.24,0.12 2.76,-6.48 6.12,-12.84 9.96,-19.2 -5.4,-0.96 -10.92,-1.44 -16.44,-1.44 -8.16,0 -16.2,1.08 -23.82,3.06 -5.82,10.38 -10.86,21.18 -15,32.34 z"
         id="path102" /><path
         d="m 63.3,323.4816 c 12.42,-10.8 28.26,-16.68 44.82,-16.68 1.08,0 1.2,0 0.24,0.18 -3.6,8.94 -6.48,18.3 -8.64,27.6 -16.68,3.42 -32.16,11.46 -44.76,23.1 1.92,-11.52 4.68,-22.92 8.34,-34.2 z"
         id="path108" /><path
         d="m 51.6,398.4816 c 0,4.08 0,7.68 0.18,10.74 10.02,-18.66 25.02,-34.14 43.26,-44.7 0.48,-6.72 1.32,-13.68 2.7,-20.52 -17.34,3.72 -33.06,13.08 -44.58,26.46 -1.08,8.94 -1.56,18.3 -1.56,28.02 z"
         id="path120" /><path
         d="m 146.04,349.1616 c 0,0.84 0,1.56 0,2.16 -16.44,9.24 -31.56,20.76 -44.64,34.44 -0.12,-0.96 -0.12,-3 -0.12,-6.12 0,-8.88 0.6,-17.64 1.8,-26.28 13.08,-9.36 28.56,-15.12 44.58,-16.38 -1.14,4.02 -1.62,8.1 -1.62,12.18 z"
         id="path124" /><path
         d="m 94.92,392.9016 0,0.06 -0.36,-17.4 c -16.68,11.52 -30.96,26.04 -42.18,42.84 1.02,12.36 2.94,24.72 5.88,36.84 8.1,-23.04 20.58,-44.16 36.66,-62.34 z"
         id="path126" /><path
         d="m 150,394.2816 c 0,5.88 0.96,11.52 3,16.86 -14.88,12.42 -27,27.78 -35.76,44.88 -3.48,-7.86 -6.36,-16.02 -8.82,-24.48 10.98,-16.62 25.14,-31.02 41.7,-42.12 -0.12,1.74 -0.12,3.3 -0.12,4.86 z"
         id="path142" /><path
         d="m 83.16,515.6016 c 0,-26.76 6.96,-52.92 20.34,-76.08 2.58,8.52 5.82,16.92 9.78,25.02 -8.16,18.42 -12.24,38.46 -12.24,58.62 0,8.88 0.72,17.64 2.34,26.04 -7.5,-9.48 -14.1,-19.56 -20.1,-30.18 -0.12,0.3 -0.12,-0.9 -0.12,-3.42 z"
         id="path146" /><path
         d="m 76.02,505.1616 c -5.58,-11.52 -10.38,-23.52 -14.16,-36.06 6.3,-24.06 17.82,-46.74 33.84,-66.18 1.02,8.88 2.7,17.88 4.98,26.64 -13.92,22.92 -22.44,48.84 -24.66,75.6 z"
         id="path150" /><path
         d="m 112.26,559.9416 c -3.54,-12.3 -5.34,-25.02 -5.34,-37.86 0,-17.4 3.24,-34.68 9.72,-50.7 4.08,8.1 8.64,15.66 13.74,22.8 -1.26,8.7 -1.86,17.7 -1.86,26.94 0,22.44 3.72,44.64 11.16,65.58 -9.84,-8.22 -19.08,-17.22 -27.42,-26.76 z"
         id="path162" /><path
         d="m 120.42,462.9216 c 8.94,-18.72 22.02,-35.04 38.22,-47.76 -1.2,3.96 -1.8,7.92 -1.8,12 0,3.36 0.36,6.72 1.2,9.96 -10.68,17.4 -16.92,37.08 -18,57.42 -7.68,-9.78 -14.16,-20.46 -19.62,-31.62 z"
         id="path166" /><path
         d="M 148.32,504.6816 z"
         id="path170" /><path
         d="m 176.76,531.2616 c -4.44,-12.54 -6.72,-25.62 -6.72,-38.82 0,-10.92 1.56,-21.84 4.68,-32.4 -5.28,-3.36 -9.72,-8.04 -12.84,-13.56 -9.24,14.4 -14.04,31.2 -14.04,48.24 0,3.48 0.12,6.84 0.48,9.96 l 9.24,9.96 c 6.12,6.12 12.48,11.64 19.2,16.62 z"
         id="path172" /><path
         d="m 153.84,597.5616 c -12.84,-24.12 -19.32,-50.88 -19.32,-78.24 0,-6.24 0.24,-12.36 1.02,-18.12 5.58,7.2 11.58,14.04 18.12,20.52 4.38,36.36 18.66,70.8 41.4,99.72 -14.46,-6.48 -28.26,-14.52 -41.22,-23.88 z"
         id="path176" /><path
         d="m 163.02,530.2416 c 6.78,6 13.98,11.4 21.54,16.2 22.68,40.8 56.64,74.4 98.04,96.6 -25.8,-1.44 -51.12,-6.96 -75.18,-16.32 -22.86,-27.96 -38.1,-61.2 -44.4,-96.48 z"
         id="path180" /><path
         d="m 318.3,159.08064 0.06,0 -7.2,-5.04 16.74,1.62 c -3.3,0.9 -6.42,2.1 -9.6,3.42 z"
         id="path192" /><path
         d="M 327.96,155.60064 z"
         id="path196" /><path
         d="m 352.32,160.04064 0,0.06 c -6.6,1.74 -12.96,4.62 -18.66,8.46 2.94,-4.08 6.78,-7.44 11.16,-10.14 z"
         id="path202" /><path
         d="m 356.16,176.12064 c 3.72,-4.56 8.28,-8.4 13.32,-11.34 l 15.96,5.58 0.06,0.06 c -10.02,0.3 -19.86,2.22 -29.34,5.7 z"
         id="path208" /><path
         d="m 421.08,187.76064 -18.48,-9.96 c -13.8,0.6 -26.88,5.88 -37.08,15 6.24,2.16 12.36,4.68 18.48,7.62 12,-5.58 24.48,-9.78 37.08,-12.6 z"
         id="path218" /><path
         d="m 432.54,194.96064 c -13.98,1.08 -27.54,4.32 -40.5,9.42 8.52,4.38 16.68,9.42 24.36,15.12 12.48,-3.9 25.68,-6.06 39,-6.06 2.04,0 2.52,0.12 1.38,0.06 -7.38,-6.54 -15.42,-12.66 -24.24,-18.54 z"
         id="path228" /><path
         d="m 463.68,220.76064 c 3.84,0 4.2,0.12 1.26,0.12 6.3,5.88 12.18,12 17.64,18.54 -3.54,-0.3 -7.5,-0.54 -11.94,-0.54 -9.84,0 -19.56,0.84 -29.04,2.34096 -5.88,-6.06096 -12.24,-11.70096 -18.72,-16.80096 13.2,-2.34 26.88,-3.66 40.8,-3.66 z"
         id="path244" /><path
         d="m 490.26,248.9016 c -4.14,-0.42 -8.7,-0.66 -13.74,-0.66 -9.12,0 -18,0.72 -26.64,1.98 5.16,5.94 10.08,12.42 14.76,19.26 6.48,-0.6 13.32,-0.96 20.52,-0.96 6.84,0 13.2,0.36 19.26,0.96 -4.14,-7.08 -8.94,-14.04 -14.16,-20.58 z"
         id="path246" /><path
         d="m 525.66,312.4416 c -13.14,-9.6 -28.86,-14.88 -45.06,-14.88 -1.32,0 -1.32,0 -0.3,0.12 -2.82,-6.48 -6.18,-12.84 -9.96,-19.2 5.34,-0.96 10.86,-1.44 16.5,-1.44 8.04,0 16.08,1.08 23.94,3.06 5.82,10.38 10.86,21.18 14.88,32.34 z"
         id="path262" /><path
         d="m 529.5,323.4816 c -12.54,-10.8 -28.38,-16.68 -44.82,-16.68 -1.2,0 -1.32,0 -0.3,0.18 3.54,8.94 6.42,18.3 8.58,27.6 16.68,3.42 32.16,11.46 44.88,23.1 -1.8,-11.52 -4.56,-22.92 -8.34,-34.2 z"
         id="path264" /><path
         d="m 478.2,310.0416 c -17.4,-9.48 -36.84,-14.4 -56.64,-14.4 -2.04,0 -2.64,0.12 -1.86,0.12 -0.3,-3.84 -1.38,-7.8 -3.06,-11.52 7.2,-0.84 15.12,-1.2 23.64,-1.2 8.76,0 17.28,0.48 25.56,1.32 4.8,8.28 8.88,16.8 12.36,25.68 z"
         id="path266" /><path
         d="m 495,344.0016 c 1.32,6.84 2.16,13.8 2.64,20.52 18.24,10.56 33.36,26.04 43.38,44.7 0.3,-3.06 0.42,-6.66 0.42,-10.74 0,-9.72 -0.6,-19.08 -1.74,-28.02 -11.7,-13.38 -27.42,-22.74 -44.7,-26.46 z"
         id="path278" /><path
         d="m 497.82,392.9016 0.42,-17.34 0,0 c 16.56,11.52 30.84,26.04 42.18,42.84 -0.78,12.36 -2.82,24.72 -5.82,36.84 -8.28,-23.04 -20.76,-44.16 -36.78,-62.34 z"
         id="path286" /><path
         d="m 509.64,515.6016 c 0,2.52 -0.12,3.72 -0.12,3.42 -5.76,10.62 -12.48,20.7 -20.1,30.18 1.5,-8.4 2.34,-17.16 2.34,-26.04 0,-20.16 -4.2,-40.2 -12.36,-58.62 3.96,-8.1 7.2,-16.5 9.78,-25.02 13.38,23.16 20.46,49.32 20.46,76.08 z"
         id="path306" /><path
         d="m 516.78,505.1616 c 5.7,-11.52 10.5,-23.52 14.16,-36.06 -6.42,-24.06 -17.94,-46.74 -33.96,-66.18 -1.02,8.88 -2.58,17.88 -4.98,26.64 13.92,22.92 22.44,48.84 24.78,75.6 z"
         id="path310" /><path
         d="m 453.12,586.7016 c 7.32,-20.94 11.16,-43.14 11.16,-65.58 0,-9.24 -0.72,-18.24 -1.98,-26.94 5.1,-7.14 9.66,-14.7 13.74,-22.8 6.48,16.02 9.84,33.3 9.84,50.7 0,12.84 -1.8,25.56 -5.34,37.86 -8.22,9.54 -17.46,18.54 -27.42,26.76 z"
         id="path320" /><path
         d="m 458.28,519.3216 c 0,27.36 -6.6,54.12 -19.32,78.24 -12.84,9.36 -26.64,17.4 -41.22,23.88 22.62,-28.92 36.9,-63.36 41.28,-99.72 6.54,-6.48 12.54,-13.32 18.12,-20.52 0.78,5.76 1.14,11.88 1.14,18.12 z"
         id="path324" /><path
         d="m 408.18,546.4416 c -22.74,40.8 -56.7,74.4 -97.92,96.6 25.86,-1.44 51.18,-6.96 75.12,-16.32 22.74,-27.96 37.98,-61.2 44.28,-96.48 -6.78,6 -13.98,11.4 -21.48,16.2 z"
         id="path346" /><path
         d="m 251.52,309.6816 c -16.32,0 -29.4,13.2 -29.4,29.4 0,3.96 0.72,7.8 2.22,11.4 6.9,-5.4 15.3,-8.4 24.06,-8.4 1.56,0 3.24,0.12 4.86,0.3 l -12.3,-8.46 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.04,0.66 l 9.78,6.6 c -0.06,-0.78 -0.06,-1.74 -0.06,-2.82 0,-7.2 1.92,-14.28 5.82,-20.34 -2.94,-0.9 -6.06,-1.5 -9.18,-1.5 z"
         id="path350" /><path
         d="m 166.8,248.4816 c 16.2,0 32.16,1.32 47.58,3.96 0.78,-2.64 1.74,-5.16 2.94,-7.56 -13.8,-6.96096 -28.68,-11.76096 -43.86,-14.16096 -7.14,5.52 -13.86,11.64096 -20.04,18.18096 4.02,-0.3 8.46,-0.42 13.38,-0.42 z"
         id="path360" /><path
         d="m 274.68,166.46064 c -11.88,17.58 -18.84,37.98 -19.98,58.98 -1.74,-0.24 -3.42,-0.48 -5.1,-0.48 -1.32,0 -2.52,0.12 -3.84,0.3 1.2,-22.62 11.64,-43.98 28.92,-58.8 z"
         id="path368" /><path
         d="m 202.32,211.82064 c -7.44,3.9 -14.52,8.34 -21.12,13.02 14.04,2.64 27.72,7.08 40.74,13.08 4.02,-4.8 9.18,-8.52 15.06,-10.62 -10.2,-7.74 -22.08,-13.14 -34.68,-15.48 z"
         id="path376" /><path
         d="m 310.32,203.66064 c -0.84,-0.66 -1.32,-1.74 -1.32,-2.94 0,-2.04 1.56,-3.72 3.72,-3.72 0.84,0 1.56,0.36 2.28,0.78 l 7.98,6.3 c 1.62,-5.28 4.38,-10.2 8.1,-14.28 -3.6,-2.28 -7.8,-3.48 -12,-3.48 -12.84,0 -23.04,10.32 -23.04,23.04 0,3.24 0.6,6.48 1.98,9.3 l 3.06,1.14 0,0.06 c 4.56,-4.86 10.32,-8.34 16.74,-10.2 z"
         id="path384" /><path
         d="m 307.92,261.2016 -0.06,0 c 5.22,-3.96 11.7,-6.12 18.3,-6.12 0.48,0 0.48,0 0.3,0.06 l -7.92,-10.32 c -0.54,-0.66 -0.78,-1.5 -0.78,-2.34 0,-2.04 1.56,-3.72096 3.72,-3.72096 1.08,0 2.16,0.6 2.94,1.44096 l 7.98,10.14 c 0.12,-1.5 0.36,-3.06 0.66,-4.74 -7.38,-7.32096 -11.7,-17.04096 -12.06,-27.30096 -12.24,3.18 -20.76,14.34 -20.76,26.94096 0,5.16 1.32,10.2 4.14,14.58 z"
         id="path388" /><path
         d="m 451.44,396.6816 c 0,6.96 -2.28,13.68 -6.3,19.26 12.42,11.46 22.62,25.14 30.3,40.08 3.48,-7.86 6.48,-16.02 8.82,-24.48 -8.94,-13.62 -20.1,-25.74 -32.88,-35.58 -0.06,0 0.06,0.24 0.06,0.72 z"
         id="path402" /><path
         d="m 491.28,385.7616 c 0.12,-0.96 0.24,-3 0.24,-6.12 0,-8.88 -0.72,-17.64 -1.92,-26.28 -14.04,-10.08 -30.72,-15.84 -47.88,-16.62 0,0.78 0.12,1.38 0.12,2.1 0,3.24 -0.48,6.36 -1.32,9.3 18.84,9.54 36,22.38 50.76,37.62 z"
         id="path410" /><path
         d="m 440.52,329.3616 c -3.72,-13.44 -15,-23.4 -28.68,-25.68 3.72,-0.36 7.32,-0.6 11.16,-0.6 20.52,0 40.8,5.52 58.44,15.96 3.12,8.76 5.4,17.76 6.96,26.94 -14.04,-10.02 -30.6,-15.78 -47.88,-16.62 z"
         id="path416" /><path
         d="m 454.68,273.0816 c 5.28,0 6.72,0.12 4.2,0.18 -4.44,-6.66 -9.36,-12.9 -14.52,-18.72 -0.12,-0.18 -2.52,-0.3 -7.08,-0.3 -17.16,0 -34.08,1.56 -50.28,4.68 l 0,0 1.5,6.42 c 8.58,0.54 16.74,4.38 22.68,10.8 13.98,-1.98 28.5,-3.06 43.5,-3.06 z"
         id="path424" /><path
         d="m 337.44,157.40064 c -3.6,2.52 -6.48,5.88 -8.64,9.72 l -6.6,-5.4 -0.06,0.06 c 4.86,-1.86 10.02,-3.42 15.3,-4.38 z"
         id="path432" /><path
         d="m 341.64,179.00064 -6.24,-6.12 0,0.06 c 7.8,-5.46 16.8,-8.94 26.34,-9.96 -7.5,4.14 -14.22,9.54 -20.1,16.02 z"
         id="path434" /><path
         d="m 358.02,198.32064 c 3.66,4.8 7.02,9.84 9.96,15 l 14.46,-5.52 -0.06,0 c -8.1,-3.72 -16.26,-6.96 -24.36,-9.48 z"
         id="path442" /><path
         d="m 370.74,218.24064 c 6.3,-3 13.02,-5.16 19.68,-6.42 7.38,3.9 14.46,8.34 21.12,13.02 -11.22,2.16 -22.26,5.4 -32.88,9.66 -2.34,-5.58 -4.98,-11.1 -7.92,-16.26 z"
         id="path452" /><path
         d="m 419.22,230.72064 c 7.14,5.52 13.86,11.64096 20.1,18.18096 -4.08,-0.3 -8.52,-0.42 -13.32,-0.42 -14.04,0 -27.72,1.08 -41.1,3 l -3.36,-9.54 c 12.06,-5.34096 24.66,-9.18096 37.68,-11.22096 z"
         id="path456" /><path
         d="M 381.6,241.8816 z"
         id="path462" /><path
         d="m 416.28,407.2416 c 0,-9.96 -7.2,-18.48 -16.92,-20.28 0,0.72 0.12,1.44 0.12,2.28 0,5.64 -1.56,11.16 -4.44,15.96 l 6.9,-2.1 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -7.5,2.28 c 3.78,3.72 7.02,7.8 9.9,12.24 6,-3.72 9.72,-10.32 9.72,-17.52 z"
         id="path478" /><path
         d="m 417.84,387.3216 c 5.64,-3.12 9.24,-9.12 9.24,-15.72 0,-9.84 -8.16,-18 -18,-18 -0.36,0 -0.36,0 -0.18,0 0.06,-0.48 0.06,-0.36 0.06,0.24 0,5.64 -1.2,11.16 -3.48,16.08 l 6.42,-1.98 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -10.56,3.3 c 5.46,1.62 10.38,4.62 14.22,8.94 z"
         id="path482" /><path
         d="m 472.26,462.9216 c -7.62,-15.96 -18.3,-30.24 -31.5,-42.12 l -2.22,1.8 c 1.02,3.36 1.74,6.84 1.74,10.32 0,3.72 -0.72,7.2 -1.92,10.68 8.4,15.84 13.32,33.12 14.34,50.94 7.62,-9.78 14.1,-20.46 19.56,-31.62 z"
         id="path490" /><path
         d="M 440.76,420.8016 z"
         id="path492" /><path
         d="m 435.24,514.5216 9.18,-9.84 c 0.3,-3.12 0.54,-6.48 0.54,-9.96 0,-15 -3.84,-29.76 -11.1,-43.02 -3.9,4.98 -9.18,8.7 -15.3,10.56 2.76,9.78 4.2,19.98 4.2,30.18 0,13.2 -2.28,26.28 -6.84,38.82 6.72,-4.98 13.08,-10.5 19.26,-16.62 z"
         id="path498" /><path
         d="m 437.64,361.5216 c 0,3.72 -0.36,7.32 -1.08,10.8 19.92,12.72 36.96,29.4 50.22,49.08 1.98,-8.4 3.3,-16.92 4.02,-25.68 -15.12,-16.68 -33.36,-30.24 -53.58,-39.96 0.3,2.04 0.42,3.84 0.42,5.76 z"
         id="path506" /><path
         d="m 179.52,401.7216 c -8.76,5.4 -14.04,15.12 -14.04,25.44 0,9.6 4.32,18.48 11.94,24.24 1.14,-5.04 2.7,-9.96 4.62,-14.58 l -2.04,-0.06 0,0 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 5.28,0 3.42,-6.6 c -5.1,-5.88 -8.22,-13.2 -9.18,-21 z"
         id="path518" /><path
         d="m 105.9,421.4016 c -1.98,-8.4 -3.3,-16.92 -4.02,-25.68 13.08,-14.4 28.32,-26.4 45.36,-35.64 1.2,5.04 3.24,9.84 6,14.16 -18.72,12.48 -34.8,28.56 -47.34,47.16 z"
         id="path542" /><path
         d="m 152.52,283.0416 c 9.6,0 19.2,0.6 28.56,1.68 -2.52,3.48 -4.32,7.2 -5.58,11.04 -0.9,0 -2.34,-0.12 -4.26,-0.12 -19.8,0 -39.36,4.92 -56.76,14.4 3.48,-8.88 7.56,-17.4 12.42,-25.68 8.22,-0.84 16.74,-1.32 25.62,-1.32 z"
         id="path566" /><path
         d="m 178.38,350.7216 c 0.18,-1.44 0.42,-3.12 0.96,-4.74 l -8.82,-2.94 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.88,2.94 c 0.54,-1.44 1.26,-2.88 2.1,-4.26 -4.8,-5.34 -8.16,-11.94 -9.48,-19.02 -12.24,6.84 -19.68,19.68 -19.68,33.6 0,6.12 1.32,12.12 4.14,17.46 5.1,-7.02 11.82,-12.54 19.56,-15.9 z"
         id="path576" /><path
         d="m 302.7,179.36064 c -0.9,-7.08 -3.06,-13.92 -6.24,-20.46 l -0.06,24.96 c 1.8,-1.74 3.96,-3.18 6.3,-4.5 z"
         id="path592" /><path
         d="m 319.08,175.16064 c 2.28,0 4.56,0.24 6.9,0.72 -6.42,-9.48 -15.18,-17.16 -25.38,-22.32 4.08,7.2 6.84,15.12 7.98,23.28 3.3,-1.08 6.9,-1.68 10.5,-1.68 z"
         id="path596" /><path
         d="M 345.48,186.92064 z"
         id="path604" /><path
         d="m 380.16,176.06064 c -8.16,3.3 -15.48,8.22 -21.72,14.34 l -13.02,-3.42 c 10.62,-6.18 22.5,-9.9 34.74,-10.92 z"
         id="path606" /><path
         d="m 292.92,153.56064 0,0.48 c -2.79966,20.86163 -4.2396,41.94491 -3.9,63 -0.66,0 -1.26,-0.12 -1.74,-0.12 -10.2,0 -19.92,4.32 -26.82,11.88 0.78,-28.2 12.42,-55.08 32.4,-75.18 z"
         id="path612" /><path
         d="M 223.32,164.72064 z"
         id="path656" /><path
         d="m 255.24,157.40064 c 3.96,2.76 7.08,6.48 9.12,10.8 2.04,-2.16 4.2,-4.32 6.54,-6.24 -4.98,-2.04 -10.26,-3.48 -15.66,-4.56 z"
         id="path658" /><path
         d="m 283.32,612.4416 -14.82,14.94 c -13.5,-8.7 -26.1,-18.78 -37.5,-30.06 16.2,8.76 34.08,14.04 52.38,15.18 z"
         id="path664" /><path
         d="m 361.68,597.3216 c -16.2,8.76 -34.08,14.04 -52.26,15.18 l 14.94,14.94 -0.06,-0.06 c 13.5,-8.7 25.98,-18.78 37.38,-30.06 z"
         id="path676" /><path
         d="m 292.08,371.1216 c -1.68,-0.24 -3.72,-0.36 -5.76,-0.36 -33.36,0 -64.8,15.6 -84.96,42.18 l 3.84,3.54 0,-0.06 c 19.2,-25.5 49.08,-40.38 80.82,-40.32 1.74,-1.74 3.78,-3.42 6.06,-4.98 z"
         id="path700" /><path
         d="M 321.72,530.7216 z"
         id="path740" /><path
         d="M 328.68,525.6816 z"
         id="path762" /><path
         d="M 332.52,558.4416 z"
         id="path798" /><path
         d="M 317.28,544.1616 z"
         id="path806" /><path
         d="M 307.56,557.7216 z"
         id="path838" /><path
         d="M 317.16,559.5216 z"
         id="path858" /><path
         d="M 308.52,569.7216 z"
         id="path866" /><path
         d="m 381.75,317.6875 c -34.35,0 -62.09375,27.775 -62.09375,62.125 0,1.05 -0.0125,2.25 0.0625,3.375 l -70.40625,39.21875 78.375,-34.0625 c 0.525,-0.3 1.125,-0.4375 1.875,-0.4375 2.1,0 4.03125,1.78125 4.03125,4.03125 0,1.35 -0.90625,2.71875 -2.03125,3.46875 l -78.375,34.78125 104.5,-32.6875 c 2.325,-0.9 4.85625,-1.34375 7.40625,-1.34375 11.25,0 20.40625,9.00625 20.40625,20.40625 0,1.05 -0.15,2.075 -0.375,3.125 -3.225,19.05 -14.01875,36.15625 -30.21875,47.03125 -34.05,15.975 -65.54375,36.38125 -93.59375,60.90625 21.45,28.875 54.6,46.56875 90.375,48.21875 -8.025,-10.5 -12.25,-23.23125 -12.25,-36.28125 0,-16.35 6.6125,-31.8125 18.3125,-43.0625 17.55,-16.65 29.99375,-37.95 35.84375,-61.5 3.6,-10.65 5.5625,-21.75 5.5625,-33 0,-1.8 -0.14375,-3.1375 -0.21875,-4.1875 -0.075,-0.3 0.0625,-0.7625 0.0625,-1.0625 0,-13.5 -10.9625,-24.3125 -24.3125,-24.3125 -9.6,0 -18.2875,5.55 -22.1875,14.25 -1.05,0.3 -0.82837,0.18522 -1.80337,0.18522 0.825,-2.25 0.89712,-4.08522 2.39712,-6.18522 -0.45,-0.6 -0.8875,-1.18125 -1.5625,-1.78125 -2.025,2.55 -3.54375,5.25 -4.59375,8.25 -0.75,0 -0.64315,0.11478 -1.61815,-0.18522 0.975,-2.85 1.48065,-5.96478 3.43065,-8.43978 -5.25,-0.075 -10.4875,-2.25288 -15.4375,-4.35288 -0.3,-1.05 -0.45,-0.96587 -0.375,-1.86587 5.025,2.4 10.575,3.75 16.125,3.75 0.6,0 0.75,-0.0937 0.75,-0.0937 -0.45,-0.825 -0.9,-1.56875 -1.125,-2.46875 -5.475,0 -10.59147,-2.1881 -15.46647,-4.6631 0.075,-0.825 -0.0648,-0.8744 0.31022,-1.7744 4.725,2.7 10.13125,4.03125 15.53125,4.03125 18.11658,0.96862 29.38565,-13.30884 29.53125,-28.1875 0,-2.55 -0.43125,-4.8 -1.03125,-7.125 l 1.5,0.65625 c 0.6254,5.03432 1.08522,10.57294 -0.0937,14.9375 l 0.96875,0.53125 c 1.94753,-3.56289 3.59978,-7.42106 4.03582,-12.49543 l 1.11586,0.6494 c -0.36435,7.3589 -1.86175,9.05252 -2.90168,13.03353 l 7.65853,-8.71418 1.05794,0.93065 -6.90397,9.59603 0.4375,0.4375 c 3.58019,-1.3774 7.07114,-2.84404 11.37957,-3.4932 l 0.62043,1.24315 c -3.5,0.57048 -7,2.27013 -10.5,4.34375 l 0.76448,1.25992 c 3.46629,-1.93372 7.41492,-2.54926 10.95427,-3.13492 l 0.4375,1.21875 c -7.5,0.825 -14.4,5.0125 -19.125,10.9375 3.225,1.425 7.14375,2.34375 11.34375,2.34375 10.65,0 20.375,-6.175 25.25,-15.625 l -0.125,5.9375 c -4.575,6.075 -11.34375,10.4375 -18.84375,11.9375 l 1.21875,2.75 c 6.6,-1.575 12.5875,-5 17.3125,-9.875 l 0.0625,0.0625 -0.5,4.28125 c -4.575,3.975 -9.975,6.825 -15.75,8.25 l 0.0625,0.0625 0.90625,2.71875 c 5.1,-1.35 10.05625,-3.61875 14.40625,-6.84375 l 0,0.0937 -0.53125,3.75 c -4.125,2.55 -8.4875,4.475 -13.0625,5.75 l 0.0937,0.0937 0.65625,2.78125 c 4.125,-1.125 8.01875,-2.625 11.84375,-4.875 l 0.0937,0 -0.6875,3.65625 c -3.525,1.725 -6.98125,3.0875 -10.65625,4.0625 l 0.46875,2.90625 c 3.225,-0.9 6.50625,-1.9375 9.65625,-3.4375 l -0.65625,3.4375 c -2.925,1.2 -5.94375,2.125 -8.71875,2.875 l 0.0937,0 0.15625,2.90625 c 2.55,-0.675 5.09375,-1.43125 7.71875,-2.40625 l -0.6875,3.46875 c -2.4,0.825 -4.79375,1.4125 -6.96875,1.9375 l 0.0625,0.0937 -0.21875,2.90625 c 2.025,-0.525 4.1375,-0.98125 6.3125,-1.65625 l 0.0625,0.0937 -0.75,3.21875 c -0.45,37.425 -16.05,73.28125 -43.125,99.15625 -9.675,9.075 -14.90625,21.68125 -14.90625,35.03125 0,15.6 7.475,30.15 20,39.375 3.375,2.475 7.425,3.8125 11.625,3.8125 3.45,0 6.75625,-0.9 9.90625,-2.625 16.65,-4.425 31.95,-12.06875 45.375,-22.71875 -20.475,-22.95 -31.71875,-52.65 -31.71875,-83.25 0,-6.45 0.44375,-12.9125 1.34375,-19.0625 1.65,-11.1 7.35,-21.3 15.75,-28.875 13.35,-11.775 21,-28.70625 21,-46.40625 0,-34.35 -27.89375,-62.125 -62.09375,-62.125 z m -26.6875,24.625 c 6,0 10.9375,4.78125 10.9375,10.78125 l 0,0.15625 c -0.15,5.85 -4.9375,10.8125 -10.9375,10.8125 -6,0 -10.8125,-4.9625 -10.8125,-10.8125 l 0,-0.15625 c 0,-6 4.8125,-10.78125 10.8125,-10.78125 z"
         transform="matrix(0.8,0,0,-0.8,0,842)"
         id="path876" /><path
         d="M 318.48,556.5216 z"
         id="path882" /><path
         d="m 284.04,555.9216 c 1.92,0 3.48,1.56 3.6,3.48 0,0 0,0 0,0.12 0,1.92 -1.68,3.48 -3.6,3.48 -1.92,0 -3.48,-1.56 -3.48,-3.48 0,-0.12 0,-0.12 0,-0.12 0,-1.92 1.56,-3.48 3.48,-3.48 z"
         id="path892" /><path
         d="m 200.64,299.3616 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.68 0.96,3.12 2.52,3.54 l 15.84,5.22 -0.06,0.36 c -10.26,1.8 -19.5,7.2 -26.16,15 -4.38,-5.52 -6.66,-12.24 -6.66,-19.32 0,-16.92 13.8,-30.84 30.84,-30.84 2.64,0 5.28,0.36 7.92,1.02 -4.92,6.54 -7.56,14.46 -7.56,22.62 0,1.08 0,1.92 0,2.7 l -11.82,-3.84 c -0.42,-0.06 -0.78,-0.18 -1.14,-0.18 z"
         id="path904" /><path
         d="m 241.8,288.2016 c -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.04,5.58 c -8.58,0.9 -16.74,4.62 -22.98,10.5 -1.32,-3.36 -1.92,-6.84 -1.92,-10.44 0,-15.48 12.6,-28.2 28.2,-28.2 3.36,0 6.72,0.72 9.9,1.86 -4.02,6.18 -6.18,13.38 -6.18,20.7 0,0.72 -0.06,1.02 -0.06,1.02 l -10.8,-7.2 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 z"
         id="path912" /><path
         d="m 279.48,323.3616 c 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.72,6.54 c -0.06,-8.4 3.3,-16.44 9.36,-22.26 -3.42,-1.38 -7.26,-2.22 -10.98,-2.22 -16.2,0 -29.16,13.08 -29.16,29.16 0,2.4 0.24,4.8 0.84,7.2 6,-3.96 12.96,-6.24 20.16,-6.24 1.68,0 3.48,0.24 5.28,0.42 l -9.42,-6.48 c -1.02,-0.66 -1.62,-1.74 -1.62,-3.06 z"
         id="path920" /><path
         d="m 359.4,215.60064 -6.72,-5.28 c -0.72,-0.48 -1.44,-0.84 -2.28,-0.84 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.2 0.48,2.28 1.32,3 l 7.44,5.88 c -7.56,2.28 -14.16,7.2 -18.42,13.98 -4.38,-5.58 -6.66,-12.42 -6.66,-19.5 0,-9.48 4.32,-18.48 11.76,-24.48 6.48,7.2 12.24,15.12 17.28,23.52 z"
         id="path942" /><path
         d="m 367.92,394.4616 9.84,-3.06 c 1.56,-0.48 2.64,-1.92 2.64,-3.6 0,-2.04 -1.68,-3.72 -3.72,-3.72 -0.48,0 -0.84,0.12 -1.14,0.18 l -9.9,3.06 c 3.36,-6.12 6.36,-12.36 9,-18.72 9.24,2.64 15.6,11.04 15.6,20.64 0,5.16 -1.8,10.08 -5.16,13.8 -5.4,-3.72 -11.16,-6.6 -17.16,-8.58 z"
         id="path946" /><path
         d="m 386.76,350.2416 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -8.7,2.7 c 6.06,2.22 11.46,6.42 15.12,11.94 4.02,-5.28 6.18,-11.76 6.18,-18.36 0,-10.08 -5.16,-19.56 -13.56,-25.2 -1.56,8.04 -3.6,15.84 -6,23.1 l 4.74,-1.32 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z"
         id="path948" /><path
         d="m 420.6,333.9216 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.26,1.32 c 4.62,1.32 8.94,3.84 12.54,7.32 1.68,-3.48 2.52,-7.2 2.52,-11.04 0,-9.48 -5.16,-18.24 -13.44,-22.86 0.24,1.38 0.36,2.82 0.36,4.26 0,5.28 -1.32,10.32 -3.66,15 l 3.72,-1.14 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z"
         id="path950" /><path
         d="m 416.88,430.4016 c 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.64,3.6 l -4.02,1.26 c 1.74,4.5 3.06,9.06 3.9,13.74 7.92,-3.36 13.2,-11.16 13.2,-19.8 0,-6 -2.64,-11.88 -7.2,-15.9 -1.92,5.82 -5.64,10.86 -10.56,14.4 l 2.46,-0.84 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z"
         id="path956" /><path
         d="m 208.2,397.3416 -8.76,-2.88 c -1.56,-0.42 -2.52,-1.86 -2.52,-3.54 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 9.18,3 c -0.84,-3.06 -1.2,-6.3 -1.2,-9.66 0,-4.08 0.6,-8.28 1.92,-12.24 -13.08,3.24 -22.2,15.12 -22.2,28.56 0,6 1.68,11.64 5.04,16.44 3.96,-5.88 8.64,-11.28 13.68,-16.14 z"
         id="path960" /><path
         d="M 185.28,429.3216 z"
         id="path976" /><path
         d="M 183.24,377.9616 z"
         id="path984" /><path
         d="m 179.52,388.1016 -6.96,-0.12 0,-0.06 c -2.16,0 -3.72,-1.56 -3.72,-3.72 0,-2.04 1.56,-3.72 3.72,-3.72 l 0,0 9.48,0 1.14,-2.46 c -2.94,-5.46 -4.62,-11.34 -5.04,-17.46 -12.06,6.84 -19.5,19.8 -19.5,33.72 0,5.52 1.08,10.92 3.36,15.96 3.6,-7.2 9.48,-13.08 16.62,-16.62 0.18,-1.74 0.42,-3.66 0.9,-5.52 z"
         id="path986" /><path
         d="m 216.96,356.3616 0,0 -13.8,-4.56 c -1.56,-0.48 -2.52,-1.92 -2.52,-3.6 0,-2.04 1.56,-3.72 3.72,-3.72 0.36,0 0.72,0.12 1.14,0.18 l 8.22,2.76 c -0.6,-2.7 -0.84,-5.46 -0.84,-8.34 0,-6.12 1.44,-12.12 4.2,-17.7 -17.28,3.06 -29.76,18.06 -29.76,35.58 0,4.56 0.72,9 2.46,13.2 7.14,-7.8 17.1,-12.36 27.72,-12.78 z"
         id="path998" /><path
         d="m 243.48,374.1216 -7.56,-5.04 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 9.54,6.42 c 0,-0.24 0,-0.72 0,-1.32 0,-5.52 1.32,-11.04 3.78,-16.14 -1.74,-0.3 -3.42,-0.54 -5.1,-0.54 -16.32,0 -29.4,13.2 -29.4,29.4 0,2.4 0.24,4.68 0.78,6.84 7.38,-5.52 15.3,-10.08 23.7,-13.44 z"
         id="path1016" /><path
         d="m 290.94,360.5016 -9.36,-6.36 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.56,3.12 l 7.98,5.34 c -8.82,-0.06 -17.7,1.02 -26.34,3.36 0,-0.18 0,-0.54 0,-1.02 0,-14.4 11.76,-26.28 26.28,-26.28 4.44,0 8.88,1.2 12.72,3.36 -3.84,4.44 -6.24,9.84 -7.02,15.42 z"
         id="path1030" /><path
         d="m 314.76,365.3016 c -0.48,-0.66 -0.72,-1.5 -0.72,-2.34 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 4.2,5.4 c 1.38,-7.08 5.46,-13.32 11.46,-17.28 -3.96,-3.6 -9.24,-5.64 -14.52,-5.64 -12.24,0 -22.08,9.96 -22.08,22.08 0,0.48 0,0.84 0.12,1.26 6.48,0.66 12.84,1.98 19.14,4.02 z"
         id="path1038" /><path
         d="m 352.02,387.0216 -3.3,-11.1 c -0.12,-0.36 -0.12,-0.72 -0.12,-1.08 0,-2.04 1.56,-3.72 3.72,-3.72 1.56,0 3.12,1.2 3.54,2.7 l 2.64,8.7 c 3.42,-6.24 6.42,-12.72 9,-19.2 -3.06,-6 -9.18,-9.84 -15.9,-9.84 -9.96,0 -17.88,8.04 -17.88,17.88 0,1.8 0.24,3.6 0.84,5.28 6.24,2.88 12.12,6.36 17.46,10.38 z"
         id="path1044" /><path
         d="m 442.2,396.6816 c 0,-6.84 -3.12,-13.32 -8.34,-17.76 -1.98,6.72 -6.66,12.36 -12.84,15.6 l 4.68,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,1.68 -1.08,3.12 -2.58,3.6 l -4.5,1.38 c 0.24,1.5 0.48,2.94 0.48,4.32 3.84,1.98 7.32,4.86 9.96,8.46 5.16,-4.32 8.28,-10.8 8.28,-17.76 z"
         id="path1080" /><path
         d="M 215.28,311.8416 z"
         id="path1100" /><path
         d="m 291.84,285.5616 c 0,0.6 0,0.72 0.12,0.24 l -6.66,-4.5 c -0.66,-0.42 -1.38,-0.66 -2.1,-0.66 -2.16,0 -3.72,1.68 -3.72,3.72 0,1.32 0.6,2.4 1.62,3.12 l 8.4,5.76 c -9.06,0.96 -17.46,5.04 -23.82,11.52 -1.2,-3.12 -1.68,-6.36 -1.68,-9.72 0,-15.48 12.6,-28.2 28.2,-28.2 1.68,0 3.36,0.24 4.92,0.54 -3.48,5.46 -5.28,11.82 -5.28,18.18 z"
         id="path1118" /><path
         d="m 345.6,277.2816 c -3.24,-7.8 -10.92,-12.96 -19.44,-12.96 -11.76,0 -21.24,9.6 -21.24,21.24 0,5.4 1.92,10.44 5.52,14.34 4.92,-2.94 10.44,-4.5 16.2,-4.5 2.16,0 4.44,0.24 6.6,0.72 l -9.72,-12.36 c -0.48,-0.72 -0.72,-1.56 -0.72,-2.4 0,-2.04 1.56,-3.72 3.72,-3.72 1.08,0 2.16,0.6 2.94,1.44 l 9.48,12.18 c 1.02,-5.1 3.3,-9.9 6.66,-13.98 z"
         id="path1130" /><path
         d="m 378.48,259.8816 -7.62,-9.6 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 4.38,5.52 c -7.98,0.3 -15.66,3.06 -21.9,7.98 -3.72,-4.2 -5.76,-9.72 -5.76,-15.36 0,-12.6 10.2,-22.92096 22.92,-22.92096 0.96,0 1.8,0.12 2.82,0.18 4.74,9.54 8.46,19.50096 11.1,29.58096 z"
         id="path1136" /><path
         d="m 382.44,288.0816 c 0,5.52 -0.24,10.44 -0.72,14.82 l -5.82,-7.5 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.34 l 6.9,8.88 c -4.26,-1.98 -8.82,-3.18 -13.38,-3.18 -4.08,0 -8.04,0.84 -11.7,2.46 -3.42,-4.02 -5.22,-9.18 -5.22,-14.46 0,-12.12 9.84,-22.08 22.08,-22.08 4.8,0 9.36,1.56 13.26,4.5 0.3,3.54 0.54,7.5 0.54,11.94 z"
         id="path1150" /><path
         d="m 374.04,344.8416 -1.86,-6.12 c -0.42,-1.56 -1.98,-2.76 -3.54,-2.76 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.36 0,0.72 0.12,1.08 l 2.4,8.52 c -4.68,-3.36 -10.2,-5.16 -15.84,-5.16 -1.92,0 -3.72,0.24 -5.64,0.66 -1.68,-2.94 -2.52,-6.3 -2.52,-9.78 0,-11.04 8.88,-20.04 20.04,-20.04 6.12,0 12,2.88 15.78,7.74 -1.14,7.26 -2.94,14.7 -5.22,22.14 z"
         id="path1162" /><path
         d="m 321.84,333.9216 c -5.28,0 -10.44,1.32 -14.94,3.84 -1.74,-3.24 -2.58,-6.96 -2.58,-10.68 0,-12.24 9.96,-22.32 22.32,-22.32 6.72,0 13.08,3.12 17.28,8.4 -4.8,4.32 -8.16,10.2 -9.24,16.5 l -5.22,-6.66 c -0.78,-0.84 -1.86,-1.44 -2.94,-1.44 -2.16,0 -3.72,1.68 -3.72,3.72 0,0.84 0.24,1.68 0.72,2.4 l 5.58,7.14 c -2.46,-0.54 -4.86,-0.9 -7.26,-0.9 z"
         id="path1164" /><path
         d="m 393,315.0816 c 2.04,0 3.72,1.68 3.72,3.72 0,2.04 -1.68,3.72 -3.54,3.78 3.9,2.94 7.14,6.54 9.72,10.5 2.94,-3.6 4.62,-8.16 4.62,-12.84 0,-9.84 -7.32,-18.24 -17.1,-19.68 l -1.38,15.6 0,0 2.82,-0.9 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 z"
         id="path1182" /><path
         d="M 390.96,287.8416 z"
         id="path1196" /><path
         d="m 390.96,287.8416 4.62,-1.38 c 0.3,-0.06 0.66,-0.18 1.14,-0.18 2.04,0 3.72,1.68 3.72,3.72 0,0.96 -0.36,1.8 -0.9,2.4 4.14,1.8 7.86,4.56 10.86,7.86 0,-0.54 0.12,-1.02 0.12,-1.74 0,-11.64 -8.64,-21.72 -20.1,-23.58 z"
         id="path1198" /><path
         d="m 291,245.2416 c 0,-6.12096 1.44,-12.12096 4.5,-17.52096 -2.58,-0.96 -5.46,-1.44 -8.22,-1.44 -14.88,0 -26.76,12 -26.76,26.76096 0,5.64 1.68,11.16 5.04,15.72 6.36,-6.48 15,-10.44 24.06,-11.04 l -9.78,-6.6 c -0.96,-0.72 -1.56,-1.8 -1.56,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 l 7.26,5.04 c -0.36,-1.5 -0.36,-3.06 -0.36,-4.74 z"
         id="path1214" /><path
         d="m 251.46,257.6016 c -0.3,-1.44 -0.3,-3 -0.3,-4.56 0,-6.48 1.68,-12.84 5.04,-18.48096 -2.16,-0.48 -4.44,-0.84 -6.6,-0.84 -15.12,0 -27.36,12.36096 -27.36,27.36096 0,4.44 0.96,8.64 2.94,12.48 5.94,-5.64 13.5,-9.12 21.66,-10.02 l -7.14,-4.86 c -1.02,-0.72 -1.62,-1.8 -1.62,-3.12 0,-2.04 1.56,-3.72 3.72,-3.72 0.72,0 1.44,0.24 2.1,0.66 z"
         id="path1220" /></g></g></svg>
            <span className="seal-caption">小川 · Ogawa</span>
          </div>
        </div>

        <section className="page5-coda">
          <div className="page5-coda-text">
            <p>
              We understand that an afternoon telephone call, in a
              language not one's own, asks something of the guest. If
              English is preferred, please ask for Mariko, who answers
              the line on Mondays, Wednesdays and Fridays.
            </p>
            <p>
              The room is small, and we keep it so on purpose. Thank you
              for the patience the booking requires; the evening, we
              hope, will repay it.
            </p>
          </div>

          <aside className="page5-coda-meta">
            Tsukimi-tei 月見亭<br />
            Yanaka, Tōkyō<br />
            <a href="#/page-1">return to the entrance →</a>
          </aside>
        </section>
      </main>

      <Footer />
    </div>
  );
}