import { navigateTo } from '../router.js';
import { logout } from '../utils/auth.js';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Dashboard' },
  { path: '/skills', label: 'Skills' },
  { path: '/projects', label: 'Proyectos' },
  { path: '/profile', label: 'Perfil' },
];

// Renders the authenticated app shell (topbar + hero + content slot) into #app
// and returns the inner content element so pages can fill it.
export function renderShell(app, { active, hero }) {
  const tabs = NAV_ITEMS.map(
    (item) =>
      `<a href="${item.path}" data-route class="nav-tab ${
        active === item.path ? 'active' : ''
      }">${item.label}</a>`
  ).join('');

  app.innerHTML = `
    <header class="topbar">
      <a href="/dashboard" data-route class="topbar-logo">dev<span>track</span></a>
      <nav class="topbar-nav">
        ${tabs}
        <button id="logout-btn" class="nav-tab" title="Cerrar sesión">Salir</button>
      </nav>
    </header>

    <section class="hero-band">
      <div class="hero-band-glow"></div>
      <div class="hero-band-inner">
        <p class="hero-eyebrow">${hero.eyebrow}</p>
        <h1 class="hero-title">${hero.title}</h1>
        <p class="hero-desc">${hero.desc}</p>
      </div>
    </section>

    <main id="page-content" class="content"></main>
  `;

  document.getElementById('logout-btn').addEventListener('click', () => {
    logout();
    navigateTo('/login');
  });

  return document.getElementById('page-content');
}
