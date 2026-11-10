const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded', 'false');
}));
document.querySelector('#year').textContent = new Date().getFullYear();

const themeButton = document.querySelector('.theme-toggle');
const themeLabel = themeButton?.querySelector('.theme-label');
const themeIcon = themeButton?.querySelector('.theme-icon');
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
const savedTheme = localStorage.getItem('portfolio-theme');
document.documentElement.dataset.theme = savedTheme === 'dark' ? 'dark' : 'light';

function updateThemeButton() {
  const isLight = document.documentElement.dataset.theme === 'light';
  themeButton?.setAttribute('aria-pressed', String(isLight));
  themeButton?.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
  if (themeLabel) themeLabel.textContent = isLight ? 'Dark' : 'Light';
  if (themeIcon) themeIcon.textContent = isLight ? '☾' : '☼';
  if (themeColorMeta) themeColorMeta.content = isLight ? '#f7f5f4' : '#090909';
}

updateThemeButton();
themeButton?.addEventListener('click', () => {
  const isLight = document.documentElement.dataset.theme !== 'light';
  document.documentElement.dataset.theme = isLight ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
  updateThemeButton();
});
