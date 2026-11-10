// ============================================================
// SURYAKANT SHAH — PORTFOLIO INTERACTION SCRIPT
// ============================================================

(function () {
  'use strict';

  // --- Mobile Navigation ---
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking any nav link
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        mainNav.classList.remove('is-open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Dynamic Year in Footer ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Dark / Light Theme Toggle ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  // Check saved theme, default to dark
  const savedTheme = localStorage.getItem('portfolio-theme');
  const initialTheme = savedTheme === 'light' ? 'light' : 'dark';

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    if (themeMeta) {
      themeMeta.content = theme === 'light' ? '#f8fafc' : '#09090b';
    }
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    }
  }

  applyTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.dataset.theme;
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('portfolio-theme', nextTheme);
      applyTheme(nextTheme);
    });
  }
})();
