import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { createRoot } from 'react-dom/client';
import Magnet from './vendor/react-bits/Magnet.jsx';

gsap.registerPlugin(ScrollTrigger);

const categoryLinks = [...document.querySelectorAll('[data-choice]')];
const catalogSections = [...document.querySelectorAll('[data-category]')];

function updateActiveCategory() {
  const readingLine = window.innerHeight * 0.38;
  let activeCategory;

  for (const section of catalogSections) {
    const { top, bottom } = section.getBoundingClientRect();
    if (top <= readingLine && bottom >= readingLine) {
      activeCategory = section.dataset.category;
      break;
    }
  }

  for (const link of categoryLinks) {
    if (link.dataset.choice === activeCategory) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  }
}

let scrollFrame;
window.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    scrollFrame = undefined;
    updateActiveCategory();
  });
}, { passive: true });
window.addEventListener('resize', updateActiveCategory);
updateActiveCategory();

gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  const lenis = new Lenis({ lerp: 0.12, stopInertiaOnNavigate: true });
  const tick = time => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  lenis.on('scroll', ScrollTrigger.update);

  const photo = document.querySelector('.hero-photo');
  const photoLoop = gsap.fromTo(photo, { scale: 1.055, xPercent: 0 }, {
    scale: 1.18,
    xPercent: -1.7,
    duration: 5.1,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
    paused: true
  });

  let visible = false;
  const syncLoop = () => photoLoop.paused(!visible || document.hidden);
  const viewport = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    syncLoop();
  });
  viewport.observe(photo.closest('.photo-mask'));
  document.addEventListener('visibilitychange', syncLoop);

  for (const section of document.querySelectorAll('.picks, .menu-block, .visit')) {
    const heading = section.querySelector('h2');
    gsap.from(heading, {
      y: 15, opacity: 0.72, duration: 0.65, ease: 'power2.out',
      scrollTrigger: { trigger: heading, start: 'top 95%', once: true }
    });
  }

  return () => {
    viewport.disconnect();
    document.removeEventListener('visibilitychange', syncLoop);
    gsap.ticker.remove(tick);
    lenis.destroy();
  };
});

if (window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) {
  for (const holder of document.querySelectorAll('.magnet')) {
    const link = holder.querySelector('a');
    createRoot(holder).render(
      <Magnet padding={16} magnetStrength={7} maxOffset={7}>
        <span ref={node => node?.replaceChildren(link)} />
      </Magnet>
    );
  }
}

