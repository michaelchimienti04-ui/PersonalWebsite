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
const FORM_ENDPOINT = 'https://formspree.io/f/mojzbnjg';

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

/* Recent sales. Real closings with photos. `ask` is left blank on purpose
   (no original-list-price advertised), so no "over ask" badge shows. */
const SOLD = [
  {
    addr: '26709 Ashton Dr',
    loc: 'Woodhaven · Wayne County',
    price: '$175,000',
    ask: '',
    beds: '2', baths: '1.5', sqft: '1,300',
    desc: 'I was the listing agent on this Woodhaven home, and getting it closed took some patience. When the first deal fell through just ten days before closing, I got it back on the market, under contract, and closed in only 15 days from accepted offer to keys being handed to the new buyers. Steady and focused on protecting my seller every step.',
    flip: false,
    photos: [{ img: 'pictures/sold-26709-ashton.jpg', tag: '26709 Ashton Dr' }],
  },
  {
    addr: '938 E 2nd Street',
    loc: 'Royal Oak · Oakland County',
    price: '$820,000',
    ask: '',
    beds: '4', baths: '3.5', sqft: '2,700',
    desc: 'Representing the buyers on this new-build steps from downtown Royal Oak, one of the most competitive areas around, I helped them win a crowded bidding war. We structured smart terms and a quick close that worked for both sides, and my clients walked away with the home they truly wanted.',
    flip: true,
    photos: [{ img: 'pictures/sold-938-e-2nd.jpg', tag: '938 E 2nd Street' }],
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
  { tag: '$775K Detroit House Tour', href: `https://instagram.com/${SITE.social}`, platform: 'Instagram', img: 'pictures/reel-detroit-tour.jpg' },
  { tag: 'First-Time Home Buyer Tips', href: `https://instagram.com/${SITE.social}`, platform: 'Instagram', img: 'pictures/reel-buyer-tips.jpg' },
  { tag: 'Inspection Tips', href: `https://instagram.com/${SITE.social}`, platform: 'Instagram', img: 'pictures/reel-inspection-tips.jpg' },
  { tag: 'My Detroit Renovation: weekly series', href: `https://instagram.com/${SITE.social}`, platform: 'Instagram', img: 'pictures/reel-renovation.jpg' },
];

/* Real client testimonials. */
const TESTIMONIALS = [
  { name: 'Jena Aderhold', where: 'Bought in Royal Oak', stars: 5, text: 'Michael was extremely helpful in helping us find our new home in Royal Oak. We had a specific criteria in a competitive area, and he was always on top of sending us and showing us new properties. Always available for a text or call, and answered all of our questions!' },
  { name: 'Edward Mroczka', where: 'Sold his home', stars: 5, text: 'Michael was helpful every step of the way throughout the process of selling my home. Every time we encountered a problem, he handled the issue quickly and calmly. Would definitely recommend his services.' },
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
