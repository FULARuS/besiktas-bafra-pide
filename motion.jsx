import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { createRoot } from 'react-dom/client';
import Magnet from './vendor/react-bits/Magnet.jsx';
import { getFlavors } from './flavors.js';

gsap.registerPlugin(ScrollTrigger);

const flavors = getFlavors(document.documentElement.lang);
const rtl = document.documentElement.dir === 'rtl';
const revealOrigin = rtl ? '30% 48%' : '70% 48%';
const hero = document.querySelector('.hero');
const picker = document.querySelector('.flavor-picker');
const pickerLinks = [...picker.querySelectorAll('[data-select]')];
const swipeSurface = hero.querySelector('.hero-product');
const heroAnchor = document.querySelector('[data-hero-anchor]');
const detailAnchor = document.querySelector('[data-detail-anchor]');
const detailStage = document.querySelector('[data-detail-stage]');
const colorReveal = document.querySelector('.hero-reveal');
const heroArt = heroAnchor.querySelector('.pide-art');
const detailArt = detailAnchor.querySelector('.pide-art');
const heroName = document.querySelector('[data-hero-name]');
const heroDesc = document.querySelector('[data-hero-desc]');
const detailName = document.querySelector('[data-detail-name]');
const detailFeature = document.querySelector('[data-detail-feature]');
const detailLink = document.querySelector('[data-detail-link]');
const ingredients = document.querySelector('[data-ingredients]');
const cards = [...document.querySelectorAll('[data-dish]')];
const languageLinks = [...document.querySelectorAll('[data-language]')];
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
let selectedIndex = 0;
let colorTween;
let refreshTravel = () => {};
let followScroll = !location.hash || location.hash === '#ana';

function useAnchor(hash) {
  followScroll = !hash || hash === '#ana';
  refreshTravel();
}

function resumeFlight() {
  if (followScroll) return;
  followScroll = true;
  refreshTravel();
}

const traveller = document.createElement('div');
traveller.className = 'traveller';
traveller.setAttribute('aria-hidden', 'true');
traveller.hidden = true;
const travelArt = heroArt.cloneNode(true);
travelArt.querySelector('img').alt = '';
travelArt.querySelector('img').removeAttribute('fetchpriority');
traveller.append(travelArt);
document.body.append(traveller);

function updateArt(art, flavor) {
  art.dataset.art = flavor.id;
  const img = art.querySelector('img');
  img.src = '/media/' + flavor.photo;
  if (art === heroArt) img.alt = flavor.alt;
}

function updateColor(previousColor, nextColor, animate) {
  colorTween?.kill();
  hero.style.setProperty('--flavor', animate ? previousColor : nextColor);
  if (!animate) {
    gsap.set(colorReveal, { opacity: 0 });
    return;
  }
  colorReveal.style.setProperty('--reveal-color', nextColor);
  gsap.set(colorReveal, { opacity: 1, clipPath: 'circle(0% at ' + revealOrigin + ')' });
  colorTween = gsap.to(colorReveal, {
    clipPath: 'circle(135% at ' + revealOrigin + ')', duration: 0.72, ease: 'power2.out',
    onComplete: () => {
      hero.style.setProperty('--flavor', nextColor);
      gsap.set(colorReveal, { opacity: 0 });
    }
  });
}

function updateLanguageLinks() {
  for (const link of languageLinks) {
    const url = new URL(link.href);
    if (selectedIndex) url.searchParams.set('pide', flavors[selectedIndex].id);
    else url.searchParams.delete('pide');
    url.hash = location.hash;
    link.href = url.href;
  }
}

function selectFlavor(index, direction = 1, animate = !reduced.matches) {
  const next = (index + flavors.length) % flavors.length;
  if (next === selectedIndex) return;
  const previous = flavors[selectedIndex];
  const flavor = flavors[next];
  selectedIndex = next;

  updateColor(previous.theme, flavor.theme, animate);
  hero.style.setProperty('--flavor-light', flavor.light);
  detailStage.style.setProperty('--detail-flavor', flavor.light);
  for (const art of [heroArt, detailArt, travelArt]) updateArt(art, flavor);
  heroName.textContent = flavor.title;
  heroDesc.textContent = flavor.description;
  detailName.textContent = flavor.title;
  detailFeature.textContent = flavor.feature;
  detailLink.href = '#dish-' + flavor.id;
  ingredients.replaceChildren(...flavor.ingredients.map(text => {
    const item = document.createElement('li');
    item.textContent = text;
    return item;
  }));

  for (const [position, link] of pickerLinks.entries()) {
    if (position === next) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
  for (const [position, card] of cards.entries()) card.classList.toggle('is-selected', position === next);

  if (animate) {
    gsap.fromTo(heroArt, { x: direction * 32, opacity: 0.35, rotationY: direction * 14 }, {
      x: 0, opacity: 1, rotationY: 0, duration: 0.52, ease: 'power3.out', overwrite: true, clearProps: 'transform,opacity'
    });
  }
  updateLanguageLinks();
  refreshTravel();
}

window.addEventListener('hashchange', () => {
  useAnchor(location.hash);
  updateLanguageLinks();
});
document.addEventListener('click', event => {
  if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest('a[href^="#"]');
  if (link) useAnchor(link.hash);
});
window.addEventListener('wheel', resumeFlight, { passive: true });
window.addEventListener('touchmove', resumeFlight, { passive: true });
window.addEventListener('keydown', event => {
  if (!event.defaultPrevented && ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '].includes(event.key)) {
    resumeFlight();
  }
});
for (const link of document.querySelectorAll('[data-recommend]')) {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    selectFlavor(flavors.findIndex(dish => dish.id === link.dataset.recommend), 1, false);
  });
}

for (const [index, link] of pickerLinks.entries()) {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    selectFlavor(index, index < selectedIndex ? -1 : 1);
  });
}
picker.addEventListener('keydown', event => {
  const direction = ({ ArrowLeft: -1, ArrowRight: 1 }[event.key] ?? 0) * (rtl ? -1 : 1);
  if (!direction) return;
  event.preventDefault();
  selectFlavor(selectedIndex + direction, direction);
  pickerLinks[selectedIndex].focus({ preventScroll: true });
});

let swipeStart;
swipeSurface.addEventListener('pointerdown', event => {
  if (!event.isPrimary || event.button !== 0) return;
  swipeStart = { x: event.clientX, y: event.clientY };
  swipeSurface.setPointerCapture(event.pointerId);
});
swipeSurface.addEventListener('pointercancel', () => { swipeStart = undefined; });
swipeSurface.addEventListener('pointerup', event => {
  if (!swipeStart) return;
  const dx = event.clientX - swipeStart.x;
  const dy = event.clientY - swipeStart.y;
  swipeStart = undefined;
  if (Math.abs(dx) >= 44 && Math.abs(dx) > Math.abs(dy) * 1.25) {
    const direction = (dx < 0 ? 1 : -1) * (rtl ? -1 : 1);
    selectFlavor(selectedIndex + direction, direction);
  }
});

let frame;
function requestFrame() {
  if (frame) return;
  frame = requestAnimationFrame(() => {
    frame = undefined;
    refreshTravel();
  });
}
window.addEventListener('scroll', requestFrame, { passive: true });
window.addEventListener('resize', requestFrame);
requestFrame();

const ease = gsap.parseEase('sine.inOut');
const lerp = gsap.utils.interpolate;
const centerY = box => box.top + box.height / 2;

function getFlight(source, target, startLine, endLine) {
  const height = innerHeight;
  const start = startLine * height;
  const end = endLine * height;
  const travelled = start - centerY(source);
  const distance = travelled + centerY(target) - end;
  if (travelled <= 0 || travelled >= distance) return null;
  return { source, target, start, end, progress: travelled / distance };
}

gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  const lenis = new Lenis({ lerp: 0.12, stopInertiaOnNavigate: true });
  const tick = time => lenis.raf(time * 1000);
  const motion = heroArt.querySelector('.pide-motion');
  const idle = gsap.to(motion, {
    y: -7, scale: 1.018, rotation: -0.7, duration: 2.3, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true
  });
  let heroVisible = false;
  const syncIdle = () => idle.paused(!heroVisible || document.hidden || !traveller.hidden);
  const observer = new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    syncIdle();
  });
  observer.observe(heroAnchor);
  document.addEventListener('visibilitychange', syncIdle);
  gsap.ticker.add(tick);
  lenis.on('scroll', ScrollTrigger.update);

  let hiddenArt = [];
  function showFlight(flight, sourceArt, targetArt) {
    for (const art of hiddenArt) art.style.visibility = '';
    hiddenArt = [];
    traveller.hidden = !flight;
    syncIdle();
    if (!flight) return;

    hiddenArt = [sourceArt, targetArt];
    for (const art of hiddenArt) art.style.visibility = 'hidden';
    const { source, target, start, end, progress } = flight;
    const t = ease(progress);
    const arc = Math.sin(Math.PI * t);
    const width = lerp(source.width, target.width, t);
    const height = lerp(source.height, target.height, t);
    const x = lerp(source.left + source.width / 2, target.left + target.width / 2, t);
    gsap.set(traveller, {
      width, height, x: x - width / 2, y: lerp(start, end, t) - height / 2 - 26 * arc,
      rotation: -5 * arc, rotationX: -10 * arc, rotationY: 21 * arc, transformPerspective: 1050
    });
  }

  refreshTravel = () => {
    if (!followScroll) {
      showFlight(null);
      return;
    }
    const heroBox = heroAnchor.getBoundingClientRect();
    const detailBox = detailAnchor.getBoundingClientRect();
    const next = cards[selectedIndex].querySelector('[data-landing] .pide-art');
    const cardBox = next.getBoundingClientRect();
    const first = getFlight(heroBox, detailBox, 0.42, 0.53);
    if (first) showFlight(first, heroArt, detailArt);
    else showFlight(getFlight(detailBox, cardBox, 0.34, 0.57), detailArt, next);
  };
  refreshTravel();

  for (const heading of document.querySelectorAll('.ritual h2, .selection h2, .visit h2')) {
    gsap.from(heading, {
      y: 16, opacity: 0.65, duration: 0.62, ease: 'power2.out',
      scrollTrigger: { trigger: heading, start: 'top 94%', once: true }
    });
  }

  return () => {
    showFlight(null);
    idle.kill();
    gsap.set(motion, { clearProps: 'transform' });
    refreshTravel = () => {};
    observer.disconnect();
    document.removeEventListener('visibilitychange', syncIdle);
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
});

const requestedFlavor = flavors.findIndex(dish => dish.id === new URLSearchParams(location.search).get('pide'));
if (requestedFlavor > 0) selectFlavor(requestedFlavor, 1, false);
updateLanguageLinks();

if (matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
  for (const holder of document.querySelectorAll('.magnet')) {
    const link = holder.querySelector('a');
    createRoot(holder).render(
      <Magnet padding={16} magnetStrength={7} maxOffset={7}>
        <span ref={node => node?.replaceChildren(link)} />
      </Magnet>
    );
  }
}
