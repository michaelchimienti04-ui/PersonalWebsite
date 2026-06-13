/* global React, ReactDOM, SITE, Arrow,
   Hero, Areas, TrustBand, ValueProps, HomeValue, Work, Listings, Reels,
   Testimonials, Contact, Footer */
const { useState, useEffect, useRef, useCallback } = React;

const NAV = [
  { id: 'start', label: 'Buy / Sell' },
  { id: 'work', label: 'Recent Sales' },
  { id: 'listings', label: 'Listings' },
  { id: 'reels', label: 'Follow Along' },
  { id: 'testimonials', label: 'Reviews' },
];

const telHref = (p) => `tel:${p.replace(/[^0-9+]/g, '')}`;
const smsHref = (p) => `sms:${p.replace(/[^0-9+]/g, '')}`;

// Smooth-scroll to a section by id, accounting for the fixed nav.
function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}

// Reveal-on-scroll: adds `.in` to any `.reveal` as it enters the viewport.
function useScrollReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.in)'));
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function NavBar({ go }) {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menu ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menu]);

  const handle = (id) => { setMenu(false); go(id); };

  return (
    <React.Fragment>
      <nav className={`nav-bar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <button className="nav-brand" onClick={() => handle('top')} aria-label="Back to top">
            <span className="nav-logo">MC</span>
            <span>
              <span className="nav-brand-name">{SITE.firstName} {SITE.lastName}</span>
              <span className="nav-brand-sub">SE Michigan Realtor</span>
            </span>
          </button>

          <div className="nav-links">
            {NAV.map((n) => (
              <button key={n.id} className="nav-link" onClick={() => handle(n.id)}>{n.label}</button>
            ))}
          </div>

          <div className="nav-actions">
            <a className="btn btn-outline btn-sm nav-call" href={telHref(SITE.phone)}>Call</a>
            <button className="btn btn-sun btn-sm" onClick={() => handle('contact')}>Work With Me</button>
            <button
              className={`nav-burger ${menu ? 'open' : ''}`}
              aria-label="Menu"
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-mobile ${menu ? 'open' : ''}`}>
        {NAV.map((n) => (
          <button className="m-link" key={n.id} onClick={() => handle(n.id)}>{n.label}</button>
        ))}
        <button className="btn btn-sun m-cta" onClick={() => handle('contact')}>Work With Me <Arrow /></button>
      </div>
    </React.Fragment>
  );
}

function MobileBar({ go }) {
  return (
    <div className="mobilebar grain">
      <div className="mobilebar-inner">
        <a className="mb-btn" href={telHref(SITE.phone)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
          Call
        </a>
        <a className="mb-btn" href={smsHref(SITE.phone)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
          Text
        </a>
        <button className="mb-btn primary" onClick={() => go('contact')}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
          Work With Me
        </button>
      </div>
    </div>
  );
}

function App() {
  useScrollReveal();

  const go = useCallback((id) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      history.replaceState(null, '', location.pathname + location.search);
      return;
    }
    scrollToId(id);
    history.replaceState(null, '', '#' + id);
  }, []);

  // Always open at the top (the hero), never restore scroll or jump to a
  // leftover #section hash from a previous visit.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <NavBar go={go} />
      <main>
        <Hero go={go} />
        <Areas />
        <TrustBand />
        <ValueProps go={go} />
        <HomeValue go={go} />
        <Work />
        <Listings go={go} />
        <Reels />
        <Testimonials />
        <Contact />
      </main>
      <Footer go={go} />
      <MobileBar go={go} />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
