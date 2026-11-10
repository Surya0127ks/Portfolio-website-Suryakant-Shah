// Mobile nav toggle
const toggle = document.querySelector('.menu-toggle');
const nav    = document.querySelector('.nav');

toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Close nav when any link is clicked
nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

// Year in footer
const yearEl = document.querySelector('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// --- Theme toggle ---
const themeButton   = document.querySelector('.theme-toggle');
const themeLabel    = themeButton?.querySelector('.theme-label');
const themeIcon     = themeButton?.querySelector('.theme-icon');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');

// Default: dark. Only switch to light if explicitly saved.
const savedTheme = localStorage.getItem('portfolio-theme');
const initTheme  = savedTheme === 'light' ? 'light' : 'dark';
document.documentElement.dataset.theme = initTheme;

function updateThemeUI() {
  const isLight = document.documentElement.dataset.theme === 'light';
  themeButton?.setAttribute('aria-pressed', String(isLight));
  themeButton?.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
  if (themeLabel)    themeLabel.textContent = isLight ? 'Dark' : 'Light';
  if (themeIcon)     themeIcon.textContent  = isLight ? '☾' : '☼';
  if (themeColorMeta) themeColorMeta.content = isLight ? '#f4f1ef' : '#0a0a0a';
}

updateThemeUI();

themeButton?.addEventListener('click', () => {
  const nowLight = document.documentElement.dataset.theme !== 'light';
  document.documentElement.dataset.theme = nowLight ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', nowLight ? 'light' : 'dark');
  updateThemeUI();
});
