import { api } from '../utils/api.js';
import { renderShell } from '../components/layout.js';
import { escapeHtml } from '../utils/dom.js';
import { levelInfo } from '../utils/skills.js';

// /profile  -> own profile, rendered inside the app shell.
export async function renderOwnProfile(params, app) {
  const content = renderShell(app, {
    active: '/profile',
    hero: {
      eyebrow: 'Dev Card',
      title: 'Tu <em>tarjeta</em> de developer.',
      desc: 'Así te ve el mundo. Comparte tu perfil público con el enlace de abajo.',
    },
  });

  content.innerHTML = '<div class="page-loading">Cargando perfil...</div>';

  try {
    const me = await api.get('/auth/me');
    const profile = await api.get(`/profile/${encodeURIComponent(me.username)}`);
    const shareUrl = `${location.origin}/profile/${encodeURIComponent(me.username)}`;
    content.innerHTML =
      devCardHtml(profile) +
      `<p class="section-desc" style="margin-top:1.5rem;">Enlace público:
        <a class="proj-link" href="/profile/${encodeURIComponent(me.username)}" data-route>${escapeHtml(shareUrl)}</a>
      </p>`;
  } catch (error) {
    content.innerHTML = `<div class="empty-state"><p>${escapeHtml(error.message)}</p></div>`;
  }
}

// /profile/:username  -> public dev card, reachable without login.
export async function renderPublicProfile(params, app) {
  app.innerHTML = `
    <header class="topbar">
      <a href="/dashboard" data-route class="topbar-logo">dev<span>track</span></a>
      <nav class="topbar-nav"><a href="/login" data-route class="nav-tab">Entrar</a></nav>
    </header>
    <div class="content"><div class="page-loading">Cargando perfil...</div></div>
  `;

  const content = app.querySelector('.content');
  try {
    const profile = await api.get(`/profile/${encodeURIComponent(params.username)}`);
    content.innerHTML = devCardHtml(profile);
  } catch (error) {
    content.innerHTML = `<div class="empty-state"><p>${escapeHtml(error.message)}</p></div>`;
  }
}

function devCardHtml({ user, skills, projects, badges }) {
  const initial = escapeHtml((user.full_name || user.username || '?').charAt(0).toUpperCase());

  const skillPills = skills.length
    ? skills
        .map((s) => {
          const lvl = levelInfo(s.level);
          return `<span class="level-chip" style="text-transform:none;color:var(--text);background:var(--surface);">${escapeHtml(
            s.name
          )} · ${lvl.label}</span>`;
        })
        .join(' ')
    : '<p class="section-desc">Sin skills aún.</p>';

  const projectItems = projects.length
    ? projects
        .map(
          (p) => `
        <div class="proj-card">
          <div class="proj-left">
            <div class="proj-icon">${escapeHtml((p.name || '?').charAt(0).toUpperCase())}</div>
            <div class="proj-info">
              <p class="proj-name">${escapeHtml(p.name)}</p>
              <p class="proj-desc">${escapeHtml(p.description || 'Sin descripción')}</p>
              <p class="proj-stack">${escapeHtml(p.technologies || '')}</p>
            </div>
          </div>
          <div class="proj-right">${
            p.github_url
              ? `<a class="proj-link" href="${escapeHtml(p.github_url)}" target="_blank" rel="noopener">GitHub ↗</a>`
              : ''
          }</div>
        </div>`
        )
        .join('')
    : '<p class="section-desc">Sin proyectos aún.</p>';

  const badgeItems = badges.length
    ? badges
        .map(
          (b) => `
        <div class="badge-card">
          <span class="badge-icon">${escapeHtml(b.icon || '🏅')}</span>
          <div><p class="badge-name">${escapeHtml(b.name)}</p><p class="badge-desc">${escapeHtml(b.description || '')}</p></div>
        </div>`
        )
        .join('')
    : '<p class="section-desc">Aún no ha conseguido badges.</p>';

  return `
    <div class="devcard">
      <div class="devcard-head">
        <div class="devcard-avatar">${initial}</div>
        <div>
          <p class="devcard-name">${escapeHtml(user.full_name || user.username)}</p>
          <p class="devcard-user">@${escapeHtml(user.username)}${
            user.github_username ? ` · github.com/${escapeHtml(user.github_username)}` : ''
          }</p>
          <span class="level-chip">${escapeHtml(user.current_level)} · ${user.total_points} pts</span>
        </div>
      </div>

      <div class="stats-grid">
        <div class="stat-card"><p class="stat-label">Skills</p><p class="stat-value">${skills.length}</p></div>
        <div class="stat-card"><p class="stat-label">Proyectos</p><p class="stat-value">${projects.length}</p></div>
        <div class="stat-card"><p class="stat-label">Racha</p><p class="stat-value green">${user.current_streak}</p></div>
        <div class="stat-card"><p class="stat-label">Badges</p><p class="stat-value">${badges.length}</p></div>
      </div>

      <h3 class="section-title" style="margin-top:1.5rem;">Skills</h3>
      <div style="display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 1.5rem;">${skillPills}</div>

      <h3 class="section-title">Proyectos</h3>
      <div class="projects-grid" style="margin:10px 0 1.5rem;">${projectItems}</div>

      <h3 class="section-title">Badges</h3>
      <div class="badges-grid" style="margin-top:10px;">${badgeItems}</div>
    </div>
  `;
}
