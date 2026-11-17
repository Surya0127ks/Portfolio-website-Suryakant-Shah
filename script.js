// ============================================================
// SURYAKANT SHAH — PORTFOLIO INTERACTION SCRIPT
// ============================================================

(function () {
  'use strict';

  // --- Mobile Navigation ---
  const menuToggle = document.getElementById('menu-toggle');
  const mainNav = document.getElementById('main-nav');

  if (menuToggle && mainNav) {
    const setMenuOpen = (isOpen) => {
      mainNav.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    };

    menuToggle.addEventListener('click', () => {
      setMenuOpen(!mainNav.classList.contains('is-open'));
    });

    // Close menu when clicking any nav link
    mainNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        setMenuOpen(false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    // Let keyboard users close the menu and return focus to its toggle.
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        setMenuOpen(false);
        menuToggle.focus();
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
  let savedTheme = null;
  try {
    savedTheme = window.localStorage.getItem('portfolio-theme');
  } catch {
    // Storage can be unavailable in private or restricted browsing contexts.
  }
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
      try {
        window.localStorage.setItem('portfolio-theme', nextTheme);
      } catch {
        // The theme still changes for this visit when storage is unavailable.
      }
      applyTheme(nextTheme);
    });
  }
})();
