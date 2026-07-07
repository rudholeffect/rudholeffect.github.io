/* RU Dhol Effect — shared site behavior */

// ── Mobile nav ──
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
const scrim = document.getElementById('navScrim');

function closeNav() {
  links.classList.remove('open');
  toggle.classList.remove('open');
  if (scrim) scrim.classList.remove('show');
  toggle.setAttribute('aria-expanded', 'false');
}

toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.classList.toggle('open', open);
  if (scrim) scrim.classList.toggle('show', open);
  toggle.setAttribute('aria-expanded', String(open));
});
if (scrim) scrim.addEventListener('click', closeNav);
links.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

// ── Navbar background on scroll ──
const navbar = document.querySelector('.navbar');
function onScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
}
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// ── Scroll-reveal ──
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

// ── Gallery lightbox ──
const lightbox = document.getElementById('lightbox');
if (lightbox) {
  const lbImg = document.getElementById('lightboxImg');
  const lbCount = document.getElementById('lightboxCount');
  const images = Array.from(document.querySelectorAll('.gallery-item img'));
  let current = 0;

  function show(i) {
    current = (i + images.length) % images.length;
    lbImg.src = images[current].src;
    lbImg.alt = images[current].alt;
    if (lbCount) lbCount.textContent = (current + 1) + ' / ' + images.length;
  }
  function openLb(i) {
    show(i);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLb() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  images.forEach((img, i) => img.addEventListener('click', () => openLb(i)));
  document.getElementById('lightboxClose').addEventListener('click', closeLb);
  document.getElementById('lightboxPrev').addEventListener('click', () => show(current - 1));
  document.getElementById('lightboxNext').addEventListener('click', () => show(current + 1));
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLb();
  });
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
}
