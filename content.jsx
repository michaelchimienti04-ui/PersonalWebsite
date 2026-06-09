/* global React */
const { useState } = React;

/* ----------------------------------------------------------------
   CONTENT — edit these objects to update the site copy.
   ---------------------------------------------------------------- */

const SITE = {
  firstName: 'Michael',
  lastName: 'Chimienti',
  role: 'Realtor · Southeast Michigan',
  group: 'Social House Group',
  phone: '(248) 567-9930',
  email: 'michael@socialhousegroup.com',
  social: 'michaelchimientirealtor',
};

// Stats are framed around what's true today and what clients care about —
// not vanity numbers. Edit the values up as you close more business.
const STATS = [
  { num: '$1', suf: 'M+', label: 'In Closed Sales' },
  { num: '5.0', suf: '\u2605', label: 'Client Rating' },
  { num: '24/7', suf: '', label: 'Always Reachable' },
];

const SOLD = [
  {
    addr: '4218 Yorkshire Road',
    loc: 'Grosse Pointe · Wayne County',
    price: '$642,000',
    ask: '$619,000',
    beds: '4', baths: '3', sqft: '2,940',
    desc: 'A center-entrance colonial steps from the lake. We staged, photographed, and brought it to market on a Thursday — by Monday we were reviewing six offers and closed $23K over ask with an accelerated timeline for the sellers.',
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

// Add your active listings here. While this array is empty, the Current
// Listings tab shows a polished "between listings" state automatically.
// As soon as you add one, the grid appears. Example format:
//   { status:'For Sale', addr:'226 Notre Dame St', loc:'Grosse Pointe',
//     price:'$489,000', beds:'3', baths:'2.5', sqft:'2,180', tag:'Just Listed' },
const LISTINGS = [
];

const TESTIMONIALS = [
  { name: 'Daniel & Erin M.', where: 'Sold in Grosse Pointe', stars: 5, text: 'Michael made selling our family home feel effortless. He understood what the house was worth and exactly how to position it. We had multiple offers in a weekend.' },
  { name: 'Priya S.', where: 'First-time buyer, Detroit', stars: 5, text: 'After being outbid again and again, Michael was the one who finally got us home. Patient, honest, and relentless when it mattered.' },
  { name: 'The Caruso Family', where: 'Relocated to Livonia', stars: 5, text: 'We were moving from out of state and trusted Michael with everything. He treated our search like it was his own. Genuinely the hardest-working agent we have met.' },
];

/* ----------------------------------------------------------------
   SHARED COMPONENTS
   ---------------------------------------------------------------- */

function Placeholder({ tag, className = '', style }) {
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
  return <div className="quote-stars" aria-label={`${n} out of 5 stars`}>{'\u2605'.repeat(n)}</div>;
}

Object.assign(window, {
  SITE, STATS, SOLD, LISTINGS, TESTIMONIALS,
  Placeholder, Stat, StatsRow, Arrow, Stars,
});
