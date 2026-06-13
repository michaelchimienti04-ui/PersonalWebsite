/* global React, Placeholder, StatsRow, Arrow, Stars, submitForm,
   SITE, STATS, AREAS, VALUE, SOLD, LISTINGS, REELS, TESTIMONIALS */
const { useState } = React;

const telHref = (p) => `tel:${p.replace(/[^0-9+]/g, '')}`;
const smsHref = (p) => `sms:${p.replace(/[^0-9+]/g, '')}`;

/* ===================== HERO ===================== */
function Hero({ go }) {
  return (
    <header className="hero" id="top">
      <div className="wrap hero-inner">
        <div className="reveal in">
          <p className="eyebrow">{SITE.role}</p>
          <h1 className="hero-title">
            Let's get<br />you <span className="em">home.</span>
          </h1>
          <p className="hero-sub">
            Buying your first place or selling the one you've outgrown, across
            Wayne, Oakland &amp; Macomb. Straight answers, fast moves, and a
            realtor who actually picks up the phone.
          </p>
          <div className="hero-cta">
            <button className="btn btn-sun" onClick={() => go('listings')}>Browse Homes <Arrow /></button>
            <a className="btn btn-outline" href={smsHref(SITE.phone)}>Text Me</a>
          </div>
          <div className="hero-proof">
            <span className="stars" aria-hidden="true">★★★★★</span>
            <span><b>5.0 rating</b> · real Southeast Michigan families</span>
          </div>
        </div>

        <div className="hero-media reveal in d1">
          <div className="hero-photo">
            <Placeholder tag="Portrait of Michael, replace in /pictures" />
          </div>
          <div className="hero-chip">
            <div className="hc-num">24&nbsp;hr</div>
            <div className="hc-label">Typical response time</div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ===================== AREAS MARQUEE ===================== */
function Areas() {
  const track = (
    <div className="marquee-track" aria-hidden="true">
      {AREAS.map((a, i) => (
        <React.Fragment key={i}>
          <span className="m-item">{a}</span>
          <span className="m-dot"></span>
        </React.Fragment>
      ))}
    </div>
  );
  return (
    <div className="areas" aria-label={`Serving ${AREAS.join(', ')}`}>
      <div className="marquee">{track}{track}</div>
    </div>
  );
}

/* ===================== TRUST BAND ===================== */
function TrustBand() {
  return (
    <section className="section" id="why">
      <div className="wrap trust-grid">
        <div className="reveal">
          <p className="eyebrow">Why Work With Me</p>
          <h2 className="h2">A local who treats your move<br />like it's <span className="mark-sun">his own.</span></h2>
          <p className="lede" style={{ marginTop: '22px' }}>
            I'm a Southeast Michigan specialist and a proud part of {SITE.group}.
            Whether it's your first home or your fourth, the job is the same: protect
            your interests, tell you the truth, and get the deal done.
          </p>
          <p className="trust-brokered">Brokered by <b>{SITE.group}</b></p>
        </div>
        <div className="reveal d1">
          <StatsRow />
        </div>
      </div>
    </section>
  );
}

/* ===================== VALUE PROPS ===================== */
function ValueCard({ data, go }) {
  return (
    <div className="value-card">
      <p className="kicker">{data.kicker}</p>
      <h3 className="h3">{data.title}</h3>
      <p className="vc-body">{data.body}</p>
      <ul className="vc-points">
        {data.points.map((p, i) => <li key={i}>{p}</li>)}
      </ul>
      <button className="btn btn-pine" onClick={() => go(data.go)}>{data.cta} <Arrow /></button>
    </div>
  );
}

function ValueProps({ go }) {
  return (
    <section className="section" id="start">
      <div className="wrap">
        <div className="intro reveal">
          <p className="eyebrow">Where Are You Headed?</p>
          <h2 className="h2">Two paths. <span className="mark-sun">One agent</span> who gets it.</h2>
        </div>
        <div className="value-grid">
          <div className="reveal"><ValueCard data={VALUE.buy} go={go} /></div>
          <div className="reveal d1"><ValueCard data={VALUE.sell} go={go} /></div>
        </div>
      </div>
    </section>
  );
}

/* ===================== HOME VALUE CTA ===================== */
function HomeValue() {
  return (
    <section className="section homeval homeval-soft" id="homevalue">
      <div className="wrap homeval-grid">
        <div className="reveal">
          <p className="eyebrow">Thinking of Selling?</p>
          <h2 className="h2">What's your home <span className="mark-sun">actually worth?</span></h2>
          <p className="lede" style={{ marginTop: '22px' }}>
            Online estimates guess. I'll give you a real, data-backed number based on
            what's actually selling on your street, plus exactly what we'd do to get
            you top dollar. No cost, no obligation.
          </p>
          <div className="homeval-list">
            <span>Real local comps</span>
            <span>Same-week turnaround</span>
            <span>Zero pressure</span>
          </div>
        </div>
        <div className="reveal d1">
          <HomeValueForm />
        </div>
      </div>
    </section>
  );
}

function HomeValueForm() {
  const empty = { fullName: '', email: '', phone: '', address: '', timeline: '' };
  const [v, setV] = useState(empty);
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);

  const set = (k) => (e) => {
    setV({ ...v, [k]: e.target.value });
    if (errs[k]) setErrs({ ...errs, [k]: null });
  };

  const validate = () => {
    const e = {};
    if (!v.fullName.trim()) e.fullName = 'Please enter your name.';
    if (!v.address.trim()) e.address = 'Please enter the property address.';
    if (!v.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'That email doesn’t look right.';
    if (!v.phone.trim()) e.phone = 'Please enter a phone number.';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrs(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    setFailed(false);
    const ok = await submitForm({ _subject: 'Home valuation request', type: 'home-value', ...v });
    setSubmitting(false);
    if (ok) setSent(true); else setFailed(true);
  };

  if (sent) {
    return (
      <div className="form-card accent">
        <div className="form-success">
          <div className="check" aria-hidden="true">✓</div>
          <h3>On its way{v.fullName ? ', ' + v.fullName.split(' ')[0] : ''}.</h3>
          <p>I'll pull the comps for {v.address || 'your home'} and get your valuation back to you, usually within a day.</p>
          <p style={{ color: 'var(--ink-faint)' }}>In a hurry? Call {SITE.phone}.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card accent" onSubmit={submit} noValidate>
      <h2 className="form-title">Get my home value</h2>
      <p className="form-sub">Free · no obligation · fields marked * required.</p>

      <div className={`field ${errs.address ? 'err' : ''}`}>
        <label htmlFor="hv-address">Property Address<span className="req"> *</span></label>
        <input id="hv-address" value={v.address} onChange={set('address')} placeholder="123 Main St, Royal Oak" autoComplete="street-address" />
        {errs.address && <div className="field-msg">{errs.address}</div>}
      </div>
      <div className={`field ${errs.fullName ? 'err' : ''}`}>
        <label htmlFor="hv-name">Full Name<span className="req"> *</span></label>
        <input id="hv-name" value={v.fullName} onChange={set('fullName')} placeholder="Jane Doe" autoComplete="name" />
        {errs.fullName && <div className="field-msg">{errs.fullName}</div>}
      </div>
      <div className="field-row">
        <div className={`field ${errs.email ? 'err' : ''}`}>
          <label htmlFor="hv-email">Email<span className="req"> *</span></label>
          <input id="hv-email" type="email" value={v.email} onChange={set('email')} placeholder="jane@email.com" autoComplete="email" />
          {errs.email && <div className="field-msg">{errs.email}</div>}
        </div>
        <div className={`field ${errs.phone ? 'err' : ''}`}>
          <label htmlFor="hv-phone">Phone<span className="req"> *</span></label>
          <input id="hv-phone" type="tel" value={v.phone} onChange={set('phone')} placeholder="(313) 555-0100" autoComplete="tel" />
          {errs.phone && <div className="field-msg">{errs.phone}</div>}
        </div>
      </div>
      <div className="field">
        <label htmlFor="hv-timeline">When are you thinking of selling?</label>
        <select id="hv-timeline" value={v.timeline} onChange={set('timeline')}>
          <option value="" disabled>Select one…</option>
          <option>As soon as possible</option>
          <option>1–3 months</option>
          <option>3–6 months</option>
          <option>Just curious</option>
        </select>
      </div>
      <div className="form-actions">
        <button className="btn btn-sun" type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : <>Get My Value <Arrow /></>}
        </button>
        <p className="form-note">{failed ? 'Something went wrong, please call or text instead.' : 'Goes straight to Michael. Never shared.'}</p>
      </div>
    </form>
  );
}

/* ===================== RECENT SALES ===================== */
function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <div className="intro reveal">
          <p className="eyebrow">Recent Sales</p>
          <h2 className="h2">Homes I've had the<br />privilege to <span className="mark-sun">sell.</span></h2>
          <p className="lede" style={{ marginTop: '20px' }}>A few recent results from across Southeast Michigan. Every one started with a conversation.</p>
        </div>

        {SOLD.map((p, i) => {
          const over = (() => {
            const n = (s) => Number(String(s).replace(/[^0-9.]/g, ''));
            const diff = n(p.price) - n(p.ask);
            return diff > 0 ? `+$${Math.round(diff / 1000)}K over ask` : '';
          })();
          return (
            <div className="sold reveal" key={i}>
              <div className={`sold-grid ${p.flip ? 'flip' : ''}`}>
                <div className="sold-media">
                  <div className={`sold-media-stack ${p.photos.length > 1 ? 'two' : ''}`}>
                    {p.photos.map((ph, j) => (
                      <Placeholder key={j} tag={ph} style={{ borderRadius: '16px', aspectRatio: p.photos.length > 1 ? '4/5' : '16/11' }} />
                    ))}
                  </div>
                </div>
                <div className="sold-info">
                  <span className="sold-tag"><span className="dot"></span>Sold</span>
                  <h3 className="sold-addr">{p.addr}</h3>
                  <p className="sold-loc">{p.loc}</p>
                  <p className="sold-price">
                    {p.price}
                    <span className="strike">{p.ask}</span>
                    {over && <span className="over">{over}</span>}
                  </p>
                  <div className="sold-specs">
                    <div><div className="spec-val">{p.beds}</div><div className="spec-label">Beds</div></div>
                    <div><div className="spec-val">{p.baths}</div><div className="spec-label">Baths</div></div>
                    <div><div className="spec-val">{p.sqft}</div><div className="spec-label">Sq Ft</div></div>
                  </div>
                  <p className="sold-desc">{p.desc}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ===================== LISTINGS ===================== */
function Listings({ go }) {
  const hasListings = LISTINGS.length > 0;
  return (
    <section className="section band-cream2" id="listings">
      <div className="wrap">
        <div className="intro reveal">
          <p className="eyebrow">Current Listings</p>
          <h2 className="h2">Homes on the <span className="mark-sun">market.</span></h2>
          <p className="lede" style={{ marginTop: '20px' }}>
            {hasListings
              ? "A current look at what's available. Reach out for a private showing of any home below."
              : "New listings land here the moment they go live. In the meantime, let's get ahead of the market together."}
          </p>
        </div>

        {hasListings ? (
          <React.Fragment>
            <div className="listing-grid">
              {LISTINGS.map((l, i) => (
                <div className="listing-card reveal" key={i}>
                  <div className="listing-media">
                    <Placeholder tag="Property photo" img={l.img} style={{ position: 'absolute', inset: 0 }} />
                    <span className={`listing-badge ${l.status === 'Pending' ? 'pending' : ''}`}>{l.tag}</span>
                  </div>
                  <div className="listing-body">
                    <p className="listing-price">{l.price}</p>
                    <p className="listing-addr">{l.addr}</p>
                    <p className="listing-loc">{l.loc}</p>
                    <div className="listing-specs">
                      <span>{l.beds} Beds</span>
                      <span>{l.baths} Baths</span>
                      <span>{l.sqft} Sq Ft</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="reels-foot">
              <p className="lede" style={{ maxWidth: '440px' }}>Don't see the right fit? I have access to everything on the market, and a few things that aren't listed yet.</p>
              <button className="btn btn-pine" onClick={() => go('contact')}>Start a Search <Arrow /></button>
            </div>
          </React.Fragment>
        ) : (
          <div className="reveal">
            <div className="empty-panel">
              <div className="empty-mark" aria-hidden="true"></div>
              <p className="empty-eyebrow">Between Listings</p>
              <h3 className="empty-title">Nothing active at this moment.</h3>
              <p className="empty-body">Inventory moves fast in Southeast Michigan, and the right homes don't sit. Tell me what you're after and I'll send matches the instant they hit the market, including off-market homes you won't find on the big sites.</p>
              <div className="empty-cta">
                <button className="btn btn-sun" onClick={() => go('contact')}>Get New-Listing Alerts <Arrow /></button>
                <button className="btn btn-outline" onClick={() => go('work')}>See Homes I've Sold</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ===================== REELS / SOCIAL ===================== */
function Reels() {
  return (
    <section className="section" id="reels">
      <div className="wrap">
        <div className="intro reveal">
          <p className="eyebrow">Follow Along</p>
          <h2 className="h2">Tours, tips &amp; the local market, <span className="mark-sun">on your feed.</span></h2>
          <p className="lede" style={{ marginTop: '20px' }}>House tours, first-time-buyer breakdowns, and what's really happening in Southeast Michigan real estate. Come say hi.</p>
        </div>

        <div className="reel-grid">
          {REELS.map((r, i) => (
            <a className="reel-card reveal" key={i} href={r.href} target="_blank" rel="noreferrer" aria-label={`${r.tag} on ${r.platform}`}>
              <Placeholder tag={r.tag} img={r.img} />
              <span className="reel-plat">{r.platform}</span>
              <span className="reel-play" aria-hidden="true">▶</span>
              <div className="reel-cover"><span className="reel-tag">{r.tag}</span></div>
            </a>
          ))}
        </div>

        <div className="reels-foot">
          <p className="reels-handle">@<span>{SITE.social}</span></p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a className="btn btn-pine" href={`https://instagram.com/${SITE.social}`} target="_blank" rel="noreferrer">Instagram <Arrow /></a>
            <a className="btn btn-outline" href={`https://tiktok.com/@${SITE.social}`} target="_blank" rel="noreferrer">TikTok</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== TESTIMONIALS ===================== */
function Testimonials() {
  return (
    <section className="section band-cream2" id="testimonials">
      <div className="wrap">
        <div className="intro reveal">
          <p className="eyebrow">In Their Words</p>
          <h2 className="h2">The people behind<br />the <span className="mark-sun">transactions.</span></h2>
        </div>

        <div className="quotes">
          {TESTIMONIALS.map((q, i) => (
            <div className="quote reveal" key={i}>
              <Stars n={q.stars} />
              <p className="quote-text">{q.text}</p>
              <div className="quote-by"><strong>{q.name}</strong>{q.where}</div>
            </div>
          ))}
        </div>

        <ReviewSection />
      </div>
    </section>
  );
}

function StarPicker({ value, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="rating" role="radiogroup" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          className={`star ${(hover || value) >= n ? 'on' : ''}`}
          onMouseEnter={() => setHover(n)}
          onMouseLeave={() => setHover(0)}
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          aria-checked={value === n}
          role="radio">
          ★
        </button>
      ))}
    </div>
  );
}

function ReviewSection() {
  const [open, setOpen] = useState(false);
  const empty = { name: '', email: '', worked: '', area: '', rating: 0, review: '' };
  const [v, setV] = useState(empty);
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);

  const set = (k) => (e) => {
    setV({ ...v, [k]: e.target.value });
    if (errs[k]) setErrs({ ...errs, [k]: null });
  };
  const setRating = (n) => { setV({ ...v, rating: n }); if (errs.rating) setErrs({ ...errs, rating: null }); };

  const validate = () => {
    const e = {};
    if (!v.name.trim()) e.name = 'Please enter your name.';
    if (!v.rating) e.rating = 'Please choose a rating.';
    if (!v.review.trim()) e.review = 'Please write a few words.';
    else if (v.review.trim().length < 12) e.review = 'A little more detail, please.';
    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'That email doesn’t look right.';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrs(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    setFailed(false);
    const ok = await submitForm({ _subject: 'New client review', type: 'review', ...v });
    setSubmitting(false);
    if (ok) setSent(true); else setFailed(true);
  };

  return (
    <div className="review-section">
      {!open && !sent && (
        <div className="review-cta reveal">
          <div>
            <h3 className="review-cta-title">Worked with me? I'd love to hear about it.</h3>
            <p className="review-cta-sub">Your words help other families decide who to trust with their move.</p>
          </div>
          <button className="btn btn-pine" onClick={() => setOpen(true)}>Leave a Review <Arrow /></button>
        </div>
      )}

      {open && !sent && (
        <form className="form-card accent review-form" onSubmit={submit} noValidate>
          <h2 className="form-title">Leave a Review</h2>
          <p className="form-sub">Fields marked * are required. Reviews go straight to Michael.</p>

          <div className={`field ${errs.rating ? 'err' : ''}`}>
            <label>Your Rating<span className="req"> *</span></label>
            <StarPicker value={v.rating} onChange={setRating} />
            {errs.rating && <div className="field-msg">{errs.rating}</div>}
          </div>

          <div className="field-row">
            <div className={`field ${errs.name ? 'err' : ''}`}>
              <label htmlFor="rv-name">Full Name<span className="req"> *</span></label>
              <input id="rv-name" value={v.name} onChange={set('name')} placeholder="Jane Doe" autoComplete="name" />
              {errs.name && <div className="field-msg">{errs.name}</div>}
            </div>
            <div className={`field ${errs.email ? 'err' : ''}`}>
              <label htmlFor="rv-email">Email <span style={{ textTransform: 'none', letterSpacing: 0, color: 'var(--ink-faint)' }}>(optional)</span></label>
              <input id="rv-email" type="email" value={v.email} onChange={set('email')} placeholder="jane@email.com" autoComplete="email" />
              {errs.email && <div className="field-msg">{errs.email}</div>}
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="rv-worked">We Worked Together To…</label>
              <select id="rv-worked" value={v.worked} onChange={set('worked')}>
                <option value="" disabled>Select one…</option>
                <option>Buy a home</option>
                <option>Sell a home</option>
                <option>Buy &amp; sell</option>
                <option>Other</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="rv-area">City / Area</label>
              <input id="rv-area" value={v.area} onChange={set('area')} placeholder="e.g. Royal Oak" />
            </div>
          </div>

          <div className={`field ${errs.review ? 'err' : ''}`}>
            <label htmlFor="rv-review">Your Review<span className="req"> *</span></label>
            <textarea id="rv-review" value={v.review} onChange={set('review')} placeholder="Tell us about your experience working with Michael…" />
            {errs.review && <div className="field-msg">{errs.review}</div>}
          </div>

          <div className="form-actions">
            <button className="btn btn-sun" type="submit" disabled={submitting}>
              {submitting ? 'Sending…' : <>Submit Review <Arrow /></>}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => { setOpen(false); setErrs({}); }}>Cancel</button>
            {failed && <p className="form-note">Something went wrong, please try again.</p>}
          </div>
        </form>
      )}

      {sent && (
        <div className="form-card accent">
          <div className="form-success">
            <div className="check" aria-hidden="true">✓</div>
            <h3>Thank you{v.name ? ', ' + v.name.split(' ')[0] : ''}.</h3>
            <p>Your review has been sent to Michael. It means the world, thank you for taking the time.</p>
            <button className="btn btn-ghost" style={{ marginTop: '18px' }} onClick={() => { setV(empty); setSent(false); setOpen(false); }}>Done <Arrow /></button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== CONTACT ===================== */
function Contact() {
  return (
    <section className="section" id="contact">
      <div className="wrap contact-grid">
        <div className="reveal">
          <p className="eyebrow">Work With Me</p>
          <h2 className="h2">Let's find your<br /><span className="mark-sun">next move.</span></h2>
          <p className="lede" style={{ marginTop: '22px' }}>
            Tell me a little about what you're looking for and I'll be in touch within
            one business day. No pressure, no obligation, just a conversation.
          </p>
          <div className="contact-direct">
            <p className="cd-label">Prefer to reach out directly?</p>
            <p className="cd-phone"><a href={telHref(SITE.phone)}>{SITE.phone}</a></p>
            <p className="cd-email"><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
          </div>
        </div>
        <div className="reveal d1">
          <LeadForm />
        </div>
      </div>
    </section>
  );
}

function LeadForm() {
  const empty = { fullName: '', email: '', phone: '', timeline: '', budget: '', message: '' };
  const [v, setV] = useState(empty);
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [failed, setFailed] = useState(false);

  const set = (k) => (e) => {
    setV({ ...v, [k]: e.target.value });
    if (errs[k]) setErrs({ ...errs, [k]: null });
  };

  const validate = () => {
    const e = {};
    if (!v.fullName.trim()) e.fullName = 'Please enter your name.';
    if (!v.email.trim()) e.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'That email doesn’t look right.';
    if (!v.phone.trim()) e.phone = 'Please enter a phone number.';
    if (!v.timeline) e.timeline = 'Select a timeline.';
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrs(e);
    if (Object.keys(e).length) {
      const first = document.querySelector('.field.err input, .field.err select');
      if (first) first.focus();
      return;
    }
    setSubmitting(true);
    setFailed(false);
    const ok = await submitForm({ _subject: 'New lead from website', type: 'lead', ...v });
    setSubmitting(false);
    if (ok) setSent(true); else setFailed(true);
  };

  if (sent) {
    return (
      <div className="form-card accent">
        <div className="form-success">
          <div className="check" aria-hidden="true">✓</div>
          <h3>Thank you, {v.fullName.split(' ')[0]}.</h3>
          <p>Your message is on its way to Michael. You'll hear back within one business day.</p>
          <p style={{ color: 'var(--ink-faint)' }}>In a hurry? Call {SITE.phone}.</p>
          <button className="btn btn-ghost" style={{ marginTop: '18px' }} onClick={() => { setV(empty); setSent(false); }}>Send Another <Arrow /></button>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card accent" onSubmit={submit} noValidate>
      <h2 className="form-title">Looking to buy or sell?</h2>
      <p className="form-sub">Fields marked * are required.</p>

      <div className={`field ${errs.fullName ? 'err' : ''}`}>
        <label htmlFor="fullName">Full Name<span className="req"> *</span></label>
        <input id="fullName" value={v.fullName} onChange={set('fullName')} placeholder="Jane Doe" autoComplete="name" />
        {errs.fullName && <div className="field-msg">{errs.fullName}</div>}
      </div>

      <div className="field-row">
        <div className={`field ${errs.email ? 'err' : ''}`}>
          <label htmlFor="email">Email Address<span className="req"> *</span></label>
          <input id="email" type="email" value={v.email} onChange={set('email')} placeholder="jane@email.com" autoComplete="email" />
          {errs.email && <div className="field-msg">{errs.email}</div>}
        </div>
        <div className={`field ${errs.phone ? 'err' : ''}`}>
          <label htmlFor="phone">Phone Number<span className="req"> *</span></label>
          <input id="phone" type="tel" value={v.phone} onChange={set('phone')} placeholder="(313) 555-0100" autoComplete="tel" />
          {errs.phone && <div className="field-msg">{errs.phone}</div>}
        </div>
      </div>

      <div className="field-row">
        <div className={`field ${errs.timeline ? 'err' : ''}`}>
          <label htmlFor="timeline">Timeline<span className="req"> *</span></label>
          <select id="timeline" value={v.timeline} onChange={set('timeline')}>
            <option value="" disabled>Select one…</option>
            <option>Ready now</option>
            <option>1–3 months</option>
            <option>3–6 months</option>
            <option>6–12 months</option>
            <option>Just exploring</option>
          </select>
          {errs.timeline && <div className="field-msg">{errs.timeline}</div>}
        </div>
        <div className="field">
          <label htmlFor="budget">Budget</label>
          <select id="budget" value={v.budget} onChange={set('budget')}>
            <option value="" disabled>Select a range…</option>
            <option>Under $250K</option>
            <option>$250K – $400K</option>
            <option>$400K – $600K</option>
            <option>$600K – $900K</option>
            <option>$900K+</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Questions, Comments or Concerns</label>
        <textarea id="message" value={v.message} onChange={set('message')} placeholder="Tell me about what you're looking for, the neighborhood you have in mind, or anything else…" />
      </div>

      <div className="form-actions">
        <button className="btn btn-sun" type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : <>Send to Michael <Arrow /></>}
        </button>
        <p className="form-note">{failed ? 'Something went wrong, please call or text instead.' : 'Your details go straight to Michael. Never shared, never sold.'}</p>
      </div>
    </form>
  );
}

/* ===================== FOOTER ===================== */
function Footer({ go }) {
  return (
    <footer className="footer grain">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">MC</div>
            <div className="footer-name">{SITE.firstName} {SITE.lastName}</div>
            <p className="footer-tag">{SITE.role}. Helping Southeast Michigan buy and sell with clarity, candor, and a little less stress.</p>
          </div>
          <div className="footer-col">
            <h4>Explore</h4>
            <a onClick={() => go('start')}>Buy / Sell</a>
            <a onClick={() => go('work')}>Recent Sales</a>
            <a onClick={() => go('listings')}>Listings</a>
            <a onClick={() => go('reels')}>Follow Along</a>
            <a onClick={() => go('contact')}>Work With Me</a>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href={telHref(SITE.phone)}>{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={`https://instagram.com/${SITE.social}`} target="_blank" rel="noreferrer">Instagram</a>
            <a href={`https://tiktok.com/@${SITE.social}`} target="_blank" rel="noreferrer">TikTok</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {SITE.firstName} {SITE.lastName} · Brokered by {SITE.group}</span>
          <span>{SITE.domain}</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Hero, Areas, TrustBand, ValueProps, HomeValue, Work, Listings, Reels,
  Testimonials, ReviewSection, StarPicker, Contact, LeadForm, Footer,
});
