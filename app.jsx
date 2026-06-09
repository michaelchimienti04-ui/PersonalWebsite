/* global React, ReactDOM, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle, AboutPage, WorkPage, ListingsPage, TestimonialsPage, ContactPage, SITE, Arrow */
const { useState, useEffect } = React;

const TABS = [
{ id: 'about', label: 'About' },
{ id: 'work', label: 'My Work' },
{ id: 'listings', label: 'Current Listings' },
{ id: 'testimonials', label: 'Testimonials' },
{ id: 'contact', label: 'Work With Me' }];


const ACCENTS = {
  Pine: { pine: '#1F3D2E', deep: '#15291F', tint: '#ECF0EA', line: '#C9D4C8' },
  Forest: { pine: '#234A33', deep: '#173524', tint: '#EBF1EC', line: '#C7D6C9' },
  Hunter: { pine: '#19352B', deep: '#0F231C', tint: '#E9EFEC', line: '#C3D2CB' },
  Olive: { pine: '#3A4A2A', deep: '#28351C', tint: '#EFF0E8', line: '#D2D6C3' }
};

const FONTS = {
  Warm: { disp: "'Lora', Georgia, serif", body: "'Mulish', 'Helvetica Neue', Arial, sans-serif" },
  Classic: { disp: "'Playfair Display', Georgia, serif", body: "'Mulish', 'Helvetica Neue', Arial, sans-serif" },
  Modern: { disp: "'Mulish', 'Helvetica Neue', Arial, sans-serif", body: "'Mulish', 'Helvetica Neue', Arial, sans-serif" }
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "direction": "editorial",
  "accent": "Pine",
  "font": "Warm",
  "fade": true,
  "showStats": true
} /*EDITMODE-END*/;

const SOCIALS = [
{ name: 'Instagram', href: `https://instagram.com/${SITE.social}`,
  svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" /></svg> },
{ name: 'Facebook', href: `https://facebook.com/${SITE.social}`,
  svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M13.6 21v-8.4h2.83l.42-3.28H13.6V7.2c0-.95.26-1.6 1.63-1.6h1.74V2.66c-.3-.04-1.33-.13-2.53-.13-2.5 0-4.22 1.53-4.22 4.34v2.42H7.4v3.28h2.82V21h3.38z" /></svg> },
{ name: 'TikTok', href: `https://tiktok.com/@${SITE.social}`,
  svg: <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M16.6 3c.32 2.05 1.52 3.43 3.5 3.66v2.62c-1.32.1-2.52-.22-3.62-.83v5.62c0 2.9-2.32 5.23-5.2 5.23S6 19 6 16.1c0-2.72 2.1-4.95 4.8-5.16v2.72c-1.12.18-1.95 1.1-1.95 2.32 0 1.3 1.03 2.32 2.3 2.32 1.3 0 2.32-1.02 2.32-2.32V3h3.13z" /></svg> }];


function Sidebar({ active, go }) {
  return (
    <aside className="sidebar">
      <p className="sb-brand-eyebrow"></p>
      <h1 className="sb-name">{SITE.firstName}<span className="last">{SITE.lastName}</span></h1>
      <p className="sb-role">REALTOR AND INVESTOR SERVING SOUTHEAST MICHIGAN</p>

      <div className="sb-rule"></div>

      <nav className="nav">
        {TABS.map((t, i) =>
        <button
          key={t.id}
          className={`nav-item ${active === t.id ? 'active' : ''}`}
          onClick={() => go(t.id)}>
          
            <span className="nav-num">0{i + 1}</span>
            <span className="nav-label">{t.label}</span>
          </button>
        )}
      </nav>

      <div className="sb-foot">
        <p className="sb-foot-label">Follow Along</p>
        <p className="sb-handle">@{SITE.social} on:</p>
        <div className="sb-socials">
          {SOCIALS.map((s) =>
          <a key={s.name} className="sb-social" href={s.href} target="_blank" rel="noreferrer">
              <span className="sb-social-ic">{s.svg}</span>
              <span className="sb-social-name">{s.name}</span>
              <span className="sb-social-arr" aria-hidden="true">&#8599;</span>
            </a>
          )}
        </div>
        <div className="sb-contact">
          <a href={`tel:${SITE.phone.replace(/[^0-9+]/g, '')}`}>{SITE.phone}</a><br />
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        </div>
        <div className="sb-house">Brokered by <strong>Social House Group</strong></div>
      </div>
    </aside>);

}

function PageReveal({ pageKey, fade, children }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    if (!fade) {setShown(true);return;}
    setShown(false);
    const id = setTimeout(() => setShown(true), 30);
    return () => clearTimeout(id);
  }, [pageKey, fade]);
  return (
    <div key={pageKey} className={`page-reveal ${fade ? 'rv-fade' : ''} ${shown ? 'shown' : ''}`}>
      {children}
    </div>);

}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [active, setActive] = useState(() => {
    const h = (location.hash || '').replace('#', '');
    return TABS.some((x) => x.id === h) ? h : 'about';
  });

  const go = (id) => {
    setActive(id);
    history.replaceState(null, '', '#' + id);
    const main = document.querySelector('.main');
    if (main) main.scrollTo({ top: 0, behavior: 'auto' });
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // apply accent + fonts to root
  const ac = ACCENTS[t.accent] || ACCENTS.Pine;
  const fn = FONTS[t.font] || FONTS.Warm;
  useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--pine', ac.pine);
    r.style.setProperty('--pine-deep', ac.deep);
    r.style.setProperty('--pine-tint', ac.tint);
    r.style.setProperty('--pine-line', ac.line);
    r.style.setProperty('--font-display', fn.disp);
    r.style.setProperty('--font-body', fn.body);
  }, [t.accent, t.font]);

  const PAGES = {
    about: <AboutPage go={go} />,
    work: <WorkPage />,
    listings: <ListingsPage go={go} />,
    testimonials: <TestimonialsPage />,
    contact: <ContactPage />
  };

  // hide stats by toggling a class consumed in About via CSS
  const dirClass = `dir-${t.direction}`;
  const fadeClass = t.fade ? 'fade-on' : 'fade-off';

  return (
    <div className="shell">
      <Sidebar active={active} go={go} />
      <main className={`main ${dirClass} ${fadeClass} ${t.showStats ? '' : 'hide-stats'}`}>
        <PageReveal pageKey={active + t.direction} fade={t.fade}>
          {PAGES[active]}
        </PageReveal>
      </main>

      <TweaksPanel>
        <TweakSection label="About — Layout Direction" />
        <TweakRadio
          label="Direction"
          value={t.direction}
          options={['editorial', 'centered', 'gallery']}
          onChange={(v) => setTweak('direction', v)} />
        
        <TweakSection label="Palette" />
        <TweakColor
          label="Green accent"
          value={ac.pine}
          options={Object.values(ACCENTS).map((a) => a.pine)}
          onChange={(hex) => {
            const name = Object.keys(ACCENTS).find((k) => ACCENTS[k].pine === hex) || 'Pine';
            setTweak('accent', name);
          }} />
        
        <TweakSection label="Typography" />
        <TweakRadio
          label="Type style"
          value={t.font}
          options={['Warm', 'Classic', 'Modern']}
          onChange={(v) => setTweak('font', v)} />
        
        <TweakSection label="Motion & Content" />
        <TweakToggle label="Fade transitions" value={t.fade} onChange={(v) => setTweak('fade', v)} />
        <TweakToggle label="Show stats on About" value={t.showStats} onChange={(v) => setTweak('showStats', v)} />
      </TweaksPanel>
    </div>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);