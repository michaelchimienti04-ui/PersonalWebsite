/* global React, Placeholder, StatsRow, Arrow, Stars, SITE, SOLD, LISTINGS, TESTIMONIALS */
const { useState } = React;

/* ===================== ABOUT ===================== */
function AboutPage({ go }) {
  return (
    <div className="page stagger">
      <div className="about-hero">
        <div className="about-text">
          <p className="eyebrow">About — Michael Chimienti</p>
          <h1 className="h-display">REAL ESTATE,<br />DONE YOUR WAY</h1>
        </div>
        <div className="about-photos">
          <Placeholder tag="Portrait — tall" className="tall" />
          <Placeholder tag="Candid / on-site" className="wide" />
          <Placeholder tag="With clients" className="wide" />
        </div>
      </div>

      <div className="about-bio" style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: '64px', alignItems: 'start', marginBottom: '72px' }}>
        <div>
          <p className="lede">I help people across Southeast Michigan buy and sell with clarity, candor, and a little less stress.</p>
        </div>
        <div className="body-copy">
          <p>I'm a Wayne County specialist and a proud part of <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Social House Group</strong>. Whether you're selling the home you raised a family in or buying your very first place, my job is the same: protect your interests, tell you the truth, and get the deal done.</p>
          <p>My clients tend to come back — and they send their friends. That word-of-mouth is the foundation of everything I've built. I'd be honored to earn yours.</p>
          <div className="about-cta">
            <button className="btn" onClick={() => go('contact')}>Work With Me <Arrow /></button>
            <button className="btn btn-ghost" onClick={() => go('work')}>See Recent Sales</button>
          </div>
        </div>
      </div>

      <StatsRow />
    </div>);

}

/* ===================== MY WORK ===================== */
function WorkPage() {
  return (
    <div className="page fade-in">
      <div className="intro">
        <p className="eyebrow">My Work — Recent Sales</p>
        <h1 className="h-section">Homes I've had the<br />privilege to sell.</h1>
        <p className="lede">A few recent results from across Wayne County and the surrounding area. Every one of these started with a conversation.</p>
      </div>

      {SOLD.map((p, i) =>
      <div className="prop" key={i}>
          <div className={`prop-grid ${p.flip ? 'flip' : ''}`}>
            <div className="prop-media">
              <div className={`prop-media-stack ${p.photos.length > 1 ? 'two' : ''}`}>
                {p.photos.map((ph, j) =>
              <Placeholder key={j} tag={ph} style={{ aspectRatio: p.photos.length > 1 ? '4/5' : '16/11' }} />
              )}
              </div>
            </div>
            <div className="prop-info">
              <div className="prop-sold">Sold</div>
              <h2 className="prop-addr">{p.addr}</h2>
              <p className="prop-loc">{p.loc}</p>
              <p className="prop-price">{p.price}<span className="strike">{p.ask}</span></p>
              <div className="prop-specs">
                <div><div className="spec-val">{p.beds}</div><div className="spec-label">Beds</div></div>
                <div><div className="spec-val">{p.baths}</div><div className="spec-label">Baths</div></div>
                <div><div className="spec-val">{p.sqft}</div><div className="spec-label">Sq Ft</div></div>
              </div>
              <p className="prop-desc">{p.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>);

}

/* ===================== CURRENT LISTINGS ===================== */
function ListingsPage({ go }) {
  const hasListings = LISTINGS.length > 0;
  return (
    <div className="page fade-in">
      <div className="intro">
        <p className="eyebrow">Current Listings — Available Now</p>
        <h1 className="h-section">Homes on the market.</h1>
        <p className="lede">{hasListings ?
          "A current look at what's available through my book of business. Reach out for a private showing of any property below." :
          "New listings land here the moment they go live. In the meantime, let's get ahead of the market and find the right home for you."}</p>
      </div>

      {hasListings ?
      <React.Fragment>
          <div className="listing-grid">
            {LISTINGS.map((l, i) =>
          <div className="listing-card" key={i}>
                <div className="listing-media">
                  <Placeholder tag="Property photo" style={{ position: 'absolute', inset: 0 }} />
                  <span className={`listing-badge ${l.status === 'Pending' ? 'pending' : ''}`}>{l.tag}</span>
                </div>
                <div className="listing-body">
                  <p className="listing-price">{l.price}</p>
                  <p className="listing-addr">{l.addr}</p>
                  <p className="listing-loc">{l.loc} · Wayne County</p>
                  <div className="listing-specs">
                    <span>{l.beds} Beds</span>
                    <span>{l.baths} Baths</span>
                    <span>{l.sqft} Sq Ft</span>
                  </div>
                </div>
              </div>
          )}
          </div>

          <div style={{ marginTop: '64px', paddingTop: '46px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
            <p className="lede" style={{ margin: 0, maxWidth: '440px' }}>Don't see the right fit? I have access to everything on the market — and a few things that aren't listed yet.</p>
            <button className="btn" onClick={() => go('contact')}>Start a Search <Arrow /></button>
          </div>
        </React.Fragment> :

      <div className="listings-empty">
          <div className="empty-panel">
            <div className="empty-mark" aria-hidden="true"></div>
            <p className="empty-eyebrow">Between Listings</p>
            <h2 className="empty-title">Nothing active at this moment.</h2>
            <p className="empty-body">Inventory moves fast across Southeast Michigan — the right homes don't sit for long. Tell me what you're looking for and I'll send you matches the instant they hit the market, including off-market opportunities you won't find on the major sites.</p>
            <div className="empty-cta">
              <button className="btn" onClick={() => go('contact')}>Get Matched to New Listings <Arrow /></button>
              <button className="btn btn-ghost" onClick={() => go('work')}>See Homes I've Sold</button>
            </div>
          </div>
        </div>
      }
    </div>);

}

/* ===================== TESTIMONIALS ===================== */
function TestimonialsPage() {
  return (
    <div className="page fade-in">
      <div className="intro">
        <p className="eyebrow">Testimonials — In Their Words</p>
        <h1 className="h-section">The people behind<br />the transactions.</h1>
        <p className="lede">Real estate is personal. These are a few of the families and individuals I've had the privilege of representing.</p>
      </div>

      <div className="quotes">
        {TESTIMONIALS.map((q, i) =>
        <div className="quote" key={i}>
            <div>
              <div className="quote-mark" aria-hidden="true">&#8220;</div>
              <div className="quote-by"><strong>{q.name}</strong>{q.where}</div>
            </div>
            <div>
              <Stars n={q.stars} />
              <p className="quote-text">{q.text}</p>
            </div>
          </div>
        )}
      </div>

      <ReviewSection />
    </div>);

}

function StarPicker({ value, onChange, error }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="rating" role="radiogroup" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map((n) =>
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
        
          {'\u2605'}
        </button>
      )}
    </div>);

}

function ReviewSection() {
  const [open, setOpen] = useState(false);
  const empty = { name: '', email: '', worked: '', area: '', rating: 0, review: '' };
  const [v, setV] = useState(empty);
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => {
    setV({ ...v, [k]: e.target.value });
    if (errs[k]) setErrs({ ...errs, [k]: null });
  };
  const setRating = (n) => {setV({ ...v, rating: n });if (errs.rating) setErrs({ ...errs, rating: null });};

  const validate = () => {
    const e = {};
    if (!v.name.trim()) e.name = 'Please enter your name.';
    if (!v.rating) e.rating = 'Please choose a rating.';
    if (!v.review.trim()) e.review = 'Please write a few words.';else
    if (v.review.trim().length < 12) e.review = 'A little more detail, please.';
    if (v.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'That email doesn\u2019t look right.';
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrs(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    // Ready to wire to an email service (Formspree / serverless / etc.).
    setTimeout(() => {setSubmitting(false);setSent(true);}, 700);
  };

  return (
    <div className="review-section">
      {!open && !sent &&
      <div className="review-cta">
          <div className="review-cta-text">
            <h3 className="review-cta-title">Worked with me? I'd love to hear about it.</h3>
            <p className="review-cta-sub">Your words help other families decide who to trust with their move.</p>
          </div>
          <button className="btn" onClick={() => setOpen(true)}>Leave a Review <Arrow /></button>
        </div>
      }

      {open && !sent &&
      <form className="form-card lead review-form" onSubmit={submit} noValidate>
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
              <input id="rv-area" value={v.area} onChange={set('area')} placeholder="e.g. Grosse Pointe" />
            </div>
          </div>

          <div className={`field ${errs.review ? 'err' : ''}`}>
            <label htmlFor="rv-review">Your Review<span className="req"> *</span></label>
            <textarea id="rv-review" value={v.review} onChange={set('review')} placeholder="Tell us about your experience working with Michael…" />
            {errs.review && <div className="field-msg">{errs.review}</div>}
          </div>

          <div className="form-actions">
            <button className="btn" type="submit" disabled={submitting}>
              {submitting ? 'Sending…' : <>Submit Review <Arrow /></>}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => {setOpen(false);setErrs({});}}>Cancel</button>
          </div>
        </form>
      }

      {sent &&
      <div className="form-card lead">
          <div className="form-success">
            <div className="check" aria-hidden="true">&#10003;</div>
            <h3>Thank you{v.name ? ', ' + v.name.split(' ')[0] : ''}.</h3>
            <p>Your review has been sent to Michael. It means the world — thank you for taking the time.</p>
            <button className="btn btn-ghost" style={{ marginTop: '24px' }} onClick={() => {setV(empty);setSent(false);setOpen(false);}}>Done <Arrow /></button>
          </div>
        </div>
      }
    </div>);

}

/* ===================== WORK WITH ME (FORM) ===================== */
function ContactPage() {
  return (
    <div className="page fade-in">
      <div className="form-wrap">
        <div className="form-aside">
          <p className="eyebrow">Work With Me</p>
          <h1 className="h-section">Let's find your<br />next move.</h1>
          <p className="lede" style={{ marginTop: '24px' }}>Tell me a little about what you're looking for and I'll be in touch within one business day. No pressure, no obligation — just a conversation.</p>
          <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--line)' }}>
            <p style={{ fontFamily: 'var(--font-label)', fontSize: '10.5px', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--ink-faint)', margin: '0 0 14px' }}>Prefer to reach out directly?</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', color: 'var(--ink)', margin: '0 0 6px' }}>{SITE.phone}</p>
            <p style={{ fontFamily: 'var(--font-label)', fontSize: '13px', letterSpacing: '.02em', color: 'var(--ink-soft)', margin: 0 }}>{SITE.email}</p>
          </div>
        </div>

        <LeadForm />
      </div>
    </div>);

}

function LeadForm() {
  const empty = { fullName: '', email: '', phone: '', timeline: '', budget: '', message: '' };
  const [v, setV] = useState(empty);
  const [errs, setErrs] = useState({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k) => (e) => {
    setV({ ...v, [k]: e.target.value });
    if (errs[k]) setErrs({ ...errs, [k]: null });
  };

  const validate = () => {
    const e = {};
    if (!v.fullName.trim()) e.fullName = 'Please enter your name.';
    if (!v.email.trim()) e.email = 'Please enter your email.';else
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = 'That email doesn\u2019t look right.';
    if (!v.phone.trim()) e.phone = 'Please enter a phone number.';
    if (!v.timeline) e.timeline = 'Select a timeline.';
    return e;
  };

  const submit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrs(e);
    if (Object.keys(e).length) {
      const first = document.querySelector('.field.err input, .field.err select');
      if (first) first.focus();
      return;
    }
    setSubmitting(true);
    // Ready to wire to an email service (Formspree / serverless / etc.).
    // For now we simulate a successful send.
    setTimeout(() => {setSubmitting(false);setSent(true);}, 700);
  };

  if (sent) {
    return (
      <div className="form-card lead">
        <div className="form-success">
          <div className="check" aria-hidden="true">&#10003;</div>
          <h3>Thank you, {v.fullName.split(' ')[0]}.</h3>
          <p>Your message is on its way to Michael. You'll hear back within one business day.</p>
          <p style={{ color: 'var(--ink-faint)', fontSize: '14px' }}>In a hurry? Call {SITE.phone}.</p>
          <button className="btn btn-ghost" style={{ marginTop: '24px' }} onClick={() => {setV(empty);setSent(false);}}>Send Another <Arrow /></button>
        </div>
      </div>);

  }

  const F = ({ name, label, type = 'text', req, placeholder, half }) =>
  <div className={`field ${errs[name] ? 'err' : ''}`}>
      <label htmlFor={name}>{label}{req && <span className="req"> *</span>}</label>
      <input id={name} type={type} value={v[name]} onChange={set(name)} placeholder={placeholder} autoComplete="off" />
      {errs[name] && <div className="field-msg">{errs[name]}</div>}
    </div>;


  return (
    <form className="form-card lead" onSubmit={submit} noValidate>
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
        <textarea id="message" value={v.message} onChange={set('message')} placeholder="Tell me about what you're looking for, the neighborhood you have in mind, or anything else on your mind…" />
      </div>

      <div className="form-actions">
        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Sending…' : <>Send to Michael <Arrow /></>}
        </button>
        <p className="form-note">Your details go straight to Michael.<br />Never shared, never sold.</p>
      </div>
    </form>);

}

Object.assign(window, { AboutPage, WorkPage, ListingsPage, TestimonialsPage, ContactPage });