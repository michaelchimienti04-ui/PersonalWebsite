#!/usr/bin/env bash
# ============================================================
# build-index.sh, assembles a self-contained index.html from
# the modular source files (styles.css + *.jsx).
#
# Usage:  bash build-index.sh
#
# Edit the source files (styles.css, content.jsx, tabs.jsx,
# app.jsx), then re-run this to regenerate the deployable
# index.html. The output works both by double-clicking the file
# AND when served by GitHub Pages.
# ============================================================
set -euo pipefail
cd "$(dirname "$0")"

OUT="index.html"
TITLE="Michael Chimienti | Southeast Michigan Realtor"
DESC="Buying your first place or selling the one you've outgrown, across Michigan. Straight answers, fast moves, real market knowledge, and a realtor who actually picks up the phone."
URL="https://michaelchimientirealtor.com/"
OGIMG="https://michaelchimientirealtor.com/pictures/og-image.jpg"

{
cat <<HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18251413963"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-18251413963');
  </script>

  <title>${TITLE}</title>
  <meta name="description" content="${DESC}" />
  <link rel="canonical" href="${URL}" />
  <meta name="theme-color" content="#0E3A38" />

  <!-- Open Graph (social sharing) -->
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Michael Chimienti, Real Estate" />
  <meta property="og:title" content="${TITLE}" />
  <meta property="og:description" content="${DESC}" />
  <meta property="og:url" content="${URL}" />
  <meta property="og:image" content="${OGIMG}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${TITLE}" />
  <meta name="twitter:description" content="${DESC}" />
  <meta name="twitter:image" content="${OGIMG}" />

  <!-- Favicon (MC monogram, inline) -->
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%230E3A38'/%3E%3Ctext x='32' y='44' font-family='Georgia,serif' font-size='34' font-weight='700' fill='%237ECEC1' text-anchor='middle'%3EMC%3C/text%3E%3C/svg%3E" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <style>
HTML

cat styles.css

cat <<'HTML'
  </style>
</head>
<body>
  <div id="root"></div>

  <script crossorigin src="https://unpkg.com/react@18.3.1/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js"></script>

HTML

# Each source file goes in its OWN text/babel block. They share globals via
# window (see the Object.assign at the bottom of each file), but keeping them
# in separate blocks avoids top-level `const` collisions (e.g. useState).
for f in content.jsx tabs.jsx app.jsx; do
  echo '  <script type="text/babel">'
  cat "$f"
  echo '  </script>'
done

cat <<'HTML'
</body>
</html>
HTML
} > "$OUT"

echo "Built $OUT ($(wc -c < "$OUT") bytes)"
