/**
 * main.js
 * NCM Digital — General UI logic: hamburger menu, theme toggle, scroll, animations
 */

// ── Hamburger Menu ─────────────────────────────────
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburgerBtn) {
  hamburgerBtn.addEventListener('click', () => {
    hamburgerBtn.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });
}

function closeMobile() {
  if (hamburgerBtn) hamburgerBtn.classList.remove('active');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

// ── Dark Mode / Theme Toggle ───────────────────────
const themeToggle = document.getElementById('themeToggle');
const storedTheme = localStorage.getItem('ncm_theme');

// Default to dark if no preference stored
let currentTheme = storedTheme || 'dark';

const themeSequence = ['light', 'dim', 'dark'];
const themeIcons = { 'light': '☀️', 'dim': '🌗', 'dark': '🌙' };

if (!themeSequence.includes(currentTheme)) currentTheme = 'dark';

document.documentElement.setAttribute('data-theme', currentTheme);
if (themeToggle) themeToggle.textContent = themeIcons[currentTheme];

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    let activeTheme = document.documentElement.getAttribute('data-theme') || 'light';
    let currentIndex = themeSequence.indexOf(activeTheme);
    let targetTheme = themeSequence[(currentIndex + 1) % themeSequence.length];

    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('ncm_theme', targetTheme);
    themeToggle.textContent = themeIcons[targetTheme];
  });
}

// ── Scroll to Top Button ───────────────────────────
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

// ── Intersection Observer Animations ──────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0) scale(1)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.card, .list-item, .stat-box').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px) scale(0.95)';
  el.style.transition = 'opacity .7s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform .7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
  observer.observe(el);
});
