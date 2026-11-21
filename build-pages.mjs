import { mkdirSync, writeFileSync } from 'node:fs';
import { getFlavors, languageCodes } from './flavors.js';
import { copy } from './site-copy.js';

const origin = 'https://besiktas-bafra-pide.hale-krill-6032.chatgpt.site';
const venue = 'https://mekanradar.com/mekan/istanbul/besiktas/besiktas-bafra-pide';
const migros = 'https://www.migros.com.tr/yemek/besiktas-bafra-pide-besiktas-turkali-mah-st-1e391';
const order = 'https://www.yemeksepeti.com/restaurant/urly/besiktas-bafra-pide';
const route = 'https://www.google.com/maps/dir/?api=1&amp;destination=41.0461733%2C29.0020476';
const paths = { tr: '/', en: '/en/', ar: '/ar/' };
const languageNames = { tr: 'Türkçe', en: 'English', ar: 'العربية' };
const brand = '<span class="brand"><svg viewBox="0 0 54 50" class="logo-oven" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 43V29a24 24 0 0 1 48 0v14H3Zm7 0V29a17 17 0 0 1 34 0v14M4 48h46M27 6v6M10 12l4 5m30-5-4 5M4 23l7 2m39-2-7 2"/><path d="M17 36c4-4 11-9 20-11-4 7-11 11-20 11ZM21 35l11-7" stroke-width="1.9"/></g></svg><span><small>BEŞİKTAŞ</small><b>Bafra Pide</b></span></span>';

const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const out = (href, label, className = '') => `<a class="${className}" href="${href}" target="_blank" rel="noopener">${label}</a>`;
const chips = items => items.map(item => `<li>${escape(item)}</li>`).join('');
const art = (dish, mode = '') => `<div class="pide-art" data-art="${dish.id}">
  <div class="pide-motion"><img src="/media/${dish.photo}" alt="${mode === 'decorative' ? '' : escape(dish.alt)}" ${mode === 'hero' ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></div>
</div>`;

function render(language, index) {
  const t = key => escape(copy[key][index]);
  const headline = key => copy[key][index].map(escape).join('<br> <em>') + '</em>';
  const flavors = getFlavors(language);
  const first = flavors[0];
  const languageMenu = languageCodes.map(code => `<a href="${paths[code]}" data-language lang="${code}" hreflang="${code}"${language === code ? ' aria-current="page"' : ''}>${languageNames[code]}</a>`).join('');
  const choices = flavors.map(dish => `<a href="#dish-${dish.id}" data-select="${dish.id}"${dish === first ? ' aria-current="true"' : ''}><span class="swatch" style="--swatch:${dish.light}" aria-hidden="true"></span>${escape(dish.name)}</a>`).join('');
  const guidance = ['ustanin', 'spinach', 'trabzon'].map((id, i) => {
    const dish = flavors.find(dish => dish.id === id);
    return `<a href="#dish-${id}" data-recommend="${id}"><strong>${escape(copy.guides[i][index])}</strong><span>${escape(dish.title)}</span></a>`;
  }).join('');
  const cards = flavors.map(dish => `<article class="dish-card${dish === first ? ' is-selected' : ''}" id="dish-${dish.id}" data-dish="${dish.id}" style="--dish-color:${dish.theme};--dish-light:${dish.light}">
  <div class="dish-image" data-landing>${art(dish)}</div>
  <div class="dish-copy">
    <p class="dish-kind">${escape(copy.groups[dish.group][index])}</p>
    <h3>${escape(dish.title)}</h3>
    <p>${escape(dish.description)}</p>
    <details class="dish-detail"><summary>${t('detail')}</summary><ul class="ingredients">${chips(dish.ingredients)}</ul></details>
  </div>
</article>`).join('\n');
  const alternates = languageCodes.map(code => `<link rel="alternate" hreflang="${code}" href="${origin}${paths[code]}">`).join('');

  return `<!doctype html>
<html lang="${language}" dir="${language === 'ar' ? 'rtl' : 'ltr'}">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#21130e">
<title>${t('title')}</title><meta name="description" content="${t('meta')}">
<link rel="canonical" href="${origin}${paths[language]}">${alternates}<link rel="alternate" hreflang="x-default" href="${origin}/">
<link rel="icon" href="/media/icon.svg" type="image/svg+xml">
<link rel="preload" as="image" href="/media/${first.photo}">
<link rel="stylesheet" href="/style.css"><link rel="stylesheet" href="/motion.css"><script defer src="/motion.js"></script>
</head>
<body>
<a class="skip" href="#ana">${t('skip')}</a>
<header class="header">
  <div class="shell head-in">
    <a class="home" href="#ana" aria-label="${t('home')}">${brand}</a>
    <nav class="head-nav" aria-label="${t('nav')}"><a href="#menu">${t('menu')}</a><a href="#ziyaret">${t('visit')}</a></nav>
    <div class="header-actions"><nav class="language-nav" aria-label="${t('languages')}">${languageMenu}</nav><div class="magnet header-order">${out(order, t('order'), 'btn btn-nav')}</div></div>
  </div>
</header>

<main id="ana">
<section class="hero" aria-labelledby="hero-title" style="--flavor:${first.theme};--flavor-light:${first.light}">
  <div class="hero-glow" aria-hidden="true"></div><div class="hero-reveal" aria-hidden="true"></div><div class="hero-word" aria-hidden="true">BAFRA</div>
  <div class="shell hero-shell">
    <div class="hero-main">
      <div class="hero-copy">
        <p class="eyebrow">${t('tag')}</p>
        <h1 id="hero-title">${headline('hero')}</h1>
        <div class="hero-selection" aria-live="polite"><p data-hero-name>${escape(first.title)}</p><p data-hero-desc>${escape(first.description)}</p></div>
        <div class="hero-actions"><div class="magnet"><a class="btn btn-fill" href="#menu">${t('explore')}</a></div>${out(route, t('directions'), 'hero-route')}</div>
      </div>
      <div class="hero-product">
        <div class="hero-ring" aria-hidden="true"></div>
        <div class="product-anchor" data-hero-anchor>${art(first, 'hero')}</div>
      </div>
    </div>
    <nav class="flavor-picker" aria-label="${t('choose')}">${choices}</nav>
  </div>
</section>

<section class="ritual" id="firindan" aria-labelledby="ritual-heading">
  <div class="shell ritual-grid">
    <div class="detail-art" data-detail-stage><span class="detail-watermark" aria-hidden="true">BAFRA</span><div class="product-anchor" data-detail-anchor aria-hidden="true">${art(first, 'decorative')}</div></div>
    <div class="ritual-copy">
      <p class="eyebrow">${t('sectionLabel')}</p>
      <h2 id="ritual-heading">${headline('ritual')}</h2>
      <h3 data-detail-name>${escape(first.title)}</h3>
      <p data-detail-feature>${escape(first.feature)}</p>
      <ul class="ingredients" data-ingredients aria-label="${t('ingredients')}">${chips(first.ingredients)}</ul>
      <a class="detail-link" data-detail-link href="#dish-${first.id}">${t('see')}</a>
    </div>
  </div>
</section>

<section class="selection shell" id="menu" aria-labelledby="selection-heading">
  <header class="section-top"><h2 id="selection-heading">${t('menuTitle')}</h2><p>${t('menuDesc')}</p></header>
  <div class="menu-guide">
    <div><h3>${t('newHere')}</h3><p>${t('newDesc')}</p></div>
    <nav class="guide-links" aria-label="${t('choose')}">${guidance}</nav>
  </div>
  <div class="dish-grid">${cards}</div>
  <div class="share-panel">
    <div><h3>${t('share')}</h3><p>${t('shareDesc')}</p></div>
    <div class="share-actions"><div class="magnet">${out(route, t('directions'), 'btn btn-fill')}</div>${out(order, t('order'), 'order-link')}</div>
  </div>
</section>

<section class="visit" id="ziyaret" aria-labelledby="visit-heading">
  <div class="shell visit-grid">
    <div class="visit-copy">
      <p class="eyebrow">${t('tag')}</p><h2 id="visit-heading">${headline('visitTitle')}</h2>
      <address>${t('address')}<br>${t('city')}</address>
      <dl><div><dt>${t('daily')}</dt><dd><bdi dir="ltr">10:00 – 22:00</bdi></dd></div><div><dt>${t('phone')}</dt><dd><a href="tel:+905313411023"><bdi dir="ltr">0531 341 10 23</bdi></a></dd></div></dl>
      <div class="visit-actions"><div class="magnet">${out(route, t('directions'), 'btn btn-paper')}</div>${out(order, t('order'), 'order-link')}</div>
    </div>
    <div class="map-board">
      <a class="map-image" href="${route}" target="_blank" rel="noopener" aria-label="${t('directions')}"><img src="/media/turkali.webp" width="650" height="440" loading="lazy" alt="${t('mapAlt')}"></a>
      <div class="map-foot"><span dir="ltr">Türkali / Beşiktaş</span>${out('https://www.openstreetmap.org/copyright', '© OpenStreetMap')}</div>
    </div>
  </div>
</section>
</main>

<footer><div class="shell foot">
  <a class="home" href="#ana" aria-label="${t('home')}">${brand}</a>
  <details class="credits"><summary>${t('credits')}</summary><div><p>${t('visualNote')}</p>${out(migros, t('menuReference') + ' · Migros Yemek')}${out(order, t('menuReference') + ' · Yemeksepeti')}${out(venue, t('venueReference') + ' · MekanRadar')}</div></details>
</div></footer>
</body></html>`;
}

for (const [index, language] of languageCodes.entries()) {
  const directory = 'dist' + paths[language];
  mkdirSync(directory, { recursive: true });
  writeFileSync(directory + 'index.html', render(language, index));
}
