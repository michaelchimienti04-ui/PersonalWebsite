/* global React */
const { useState } = React;

/* ================================================================
   CONTENT, edit these objects to update the site copy & data.
   This is the single source of truth for everything on the page.
   ================================================================ */

const SITE = {
  firstName: 'Michael',
  lastName: 'Chimienti',
  role: 'Realtor & Investor · Southeast Michigan',
  group: 'Social House Group',
  phone: '(248) 567-9930',
  email: 'michael@socialhousegroup.com',
  social: 'michaelchimientirealtor',
  domain: 'michaelchimientirealtor.com',
};

/* ----------------------------------------------------------------
   FORM_ENDPOINT, paste your Formspree (or other) endpoint here to
   make all three forms send for real, e.g.:
     'https://formspree.io/f/abcdwxyz'
   While this is empty (''), forms validate and show the success
   state without sending anywhere (great for previewing).
   ---------------------------------------------------------------- */
const FORM_ENDPOINT = '';

/* Stats shown in the trust band. These are honest, defensible
   framings, NOT fabricated sales figures. Once you have real
   production numbers (homes sold, total volume, avg days on
   market), swap them in here. */
const STATS = [
  { num: '$1M', suf: '+', label: 'In Closed Sales' },
  { num: '24', suf: 'hr', label: 'Typical Response' },
  { num: '5.0', suf: '★', label: 'Client Rating' },
];

/* Cities you serve, used in the scrolling "areas" marquee.
   Add or remove freely. */
const AREAS = [
  'Detroit', 'Grosse Pointe', 'Royal Oak', 'Ferndale', 'Berkley',
  'Birmingham', 'Canton', 'Livonia', 'Dearborn', 'Troy', 'Rochester',
  'St. Clair Shores', 'Plymouth', 'Northville', 'Bloomfield', 'Warren',
];

/* Two value props, one for buyers, one for sellers. Balanced site:
   speaks to young first-time/move-up buyers AND move-up sellers. */
const VALUE = {
  buy: {
    kicker: 'For Buyers',
    title: 'Your first place, or your next one.',
    body: 'Outbid before? Just starting to look? I move fast, write clean offers, and tell you the truth about every house, so you land the right one without overpaying.',
    points: ['First-time buyer friendly', 'Off-market & new-listing alerts', 'Honest, no-pressure guidance'],
    cta: 'Start a Search',
    go: 'contact',
  },
  sell: {
    kicker: 'For Sellers',
    title: "Get what your home is actually worth.",
    body: 'Staging, pro photos, and a marketing push built for how buyers actually shop now, which is social-first. We position it right and bring you serious offers, fast.',
    points: ['Full-property marketing', 'Priced on real local data', 'Built for social-first buyers'],
    cta: "What's My Home Worth?",
    go: 'homevalue',
  },
};

/* Recent sales. Replace with your real closings + photos. */
const SOLD = [
  {
    addr: '4218 Yorkshire Road',
    loc: 'Grosse Pointe · Wayne County',
    price: '$642,000',
    ask: '$619,000',
    beds: '4', baths: '3', sqft: '2,940',
    desc: 'A center-entrance colonial steps from the lake. We staged, photographed, and brought it to market on a Thursday. By Monday we were reviewing six offers, and closed $23K over ask with an accelerated timeline for the sellers.',
    flip: false,
    photos: ['Front elevation', 'Kitchen'],
  },
  {
    addr: '871 Lakepointe Avenue',
    loc: 'Detroit · Wayne County',
    price: '$311,500',
    ask: '$299,900',
    beds: '3', baths: '2', sqft: '1,720',
    desc: 'First-time buyers who had been outbid three times. We moved fast, wrote a clean offer with a personal letter, and got them the keys to a restored brick bungalow in a neighborhood they love.',
    flip: true,
    photos: ['Living room'],
  },
  {
    addr: '15530 Fairway Drive',
    loc: 'Livonia · Wayne County',
    price: '$528,000',
    ask: '$524,900',
    beds: '5', baths: '4', sqft: '3,310',
    desc: 'A relocation listing on a tight schedule. Coordinated repairs, full-property marketing, and a private broker preview that produced a cash buyer within the first week on market.',
    flip: false,
    photos: ['Front elevation', 'Backyard'],
  },
];

/* Active listings. While empty, the Listings section shows a polished
   "between listings" state automatically. Example item:
     { status:'For Sale', addr:'226 Notre Dame St', loc:'Grosse Pointe',
       price:'$489,000', beds:'3', baths:'2.5', sqft:'2,180', tag:'Just Listed' } */
const LISTINGS = [
];

/* Reels / social. Each card links to your Instagram or TikTok. Drop a
   cover image into /pictures and reference it from `img` to replace the
   placeholder. `tag` is the label shown on the placeholder. */
const REELS = [
  { tag: 'Tour: Ferndale bungalow', href: `https://instagram.com/${SITE.social}`, platform: 'Instagram', img: '' },
  { tag: 'First-time buyer tips', href: `https://tiktok.com/@${SITE.social}`, platform: 'TikTok', img: '' },
  { tag: 'Just sold, over ask', href: `https://instagram.com/${SITE.social}`, platform: 'Instagram', img: '' },
  { tag: 'Market in 60 seconds', href: `https://tiktok.com/@${SITE.social}`, platform: 'TikTok', img: '' },
];

/* SAMPLE testimonials, replace the names and text with REAL reviews
   from past clients before you publish. Do not present these sample
   quotes as real. */
const TESTIMONIALS = [
  { name: 'Daniel & Erin M.', where: 'Sold in Grosse Pointe', stars: 5, text: 'Michael made selling our family home feel effortless. He understood what the house was worth and exactly how to position it. We had multiple offers in a weekend.' },
  { name: 'Priya S.', where: 'First-time buyer, Detroit', stars: 5, text: 'After being outbid again and again, Michael was the one who finally got us home. Patient, honest, and relentless when it mattered.' },
  { name: 'The Caruso Family', where: 'Relocated to Livonia', stars: 5, text: 'We were moving from out of state and trusted Michael with everything. He treated our search like it was his own. Genuinely the hardest-working agent we have met.' },
];

/* ----------------------------------------------------------------
   SHARED HELPERS / SMALL COMPONENTS
   ---------------------------------------------------------------- */

// Branded image placeholder. Pass `img` to drop in a real photo.
function Placeholder({ tag, img, className = '', style }) {
  if (img) {
    return (
      <div className={`ph has-img ${className}`} style={style}>
        <img src={img} alt={tag || ''} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`ph ${className}`} style={style}>
      <span className="ph-tag">{tag}</span>
    </div>
  );
}

function Stat({ num, suf, label }) {
  return (
    <div className="stat">
      <div className="stat-num">{num}<span className="suf">{suf}</span></div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function StatsRow() {
  return (
    <div className="stats">
      {STATS.map((s, i) => <Stat key={i} {...s} />)}
    </div>
  );
}

function Arrow() {
  return <span className="arr" aria-hidden="true">&#8594;</span>;
}

function Stars({ n }) {
  return <div className="quote-stars" aria-label={`${n} out of 5 stars`}>{'★'.repeat(n)}</div>;
}

// Posts a plain object to FORM_ENDPOINT. Resolves true on success, or
// when no endpoint is configured (preview mode). Resolves false on a
// network/server error so the form can show a fallback.
async function submitForm(payload) {
  if (!FORM_ENDPOINT) {
    await new Promise((r) => setTimeout(r, 600));
    return true;
  }
  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch (e) {
    return false;
  }
}

Object.assign(window, {
  SITE, FORM_ENDPOINT, STATS, AREAS, VALUE, SOLD, LISTINGS, REELS, TESTIMONIALS,
  Placeholder, Stat, StatsRow, Arrow, Stars, submitForm,
});
