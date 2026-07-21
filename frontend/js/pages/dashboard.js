import { api } from '../utils/api.js';
import { renderShell } from '../components/layout.js';
import { escapeHtml, toast } from '../utils/dom.js';

let charts = { category: null, hours: null };

export async function renderDashboard(params, app) {
  const content = renderShell(app, {
    active: '/dashboard',
    hero: {
      eyebrow: 'Panel',
      title: 'Tu progreso, <em>en números</em>.',
      desc: 'Puntos, nivel, racha, skills, proyectos y horas — todo calculado por el backend en tiempo real.',
    },
  });

  content.innerHTML = '<div class="page-loading">Cargando tu progreso...</div>';

  let me, skills, projects, logs, badges;
  try {
    [me, skills, projects, logs, badges] = await Promise.all([
      api.get('/auth/me'),
      api.get('/skills'),
      api.get('/projects'),
      api.get('/study-logs'),
      api.get('/badges'),
    ]);
  } catch (error) {
    content.innerHTML = `<div class="empty-state"><p>${escapeHtml(error.message)}</p></div>`;
    return;
  }

  const totalHours = logs.reduce((sum, l) => sum + Number(l.hours), 0);
  const earnedBadges = badges.filter((b) => b.earned);

  content.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><p class="stat-label">Puntos</p><p class="stat-value blue">${me.total_points}</p><p class="stat-sub">Nivel ${escapeHtml(me.current_level)}</p></div>
      <div class="stat-card"><p class="stat-label">Racha actual</p><p class="stat-value green">${me.current_streak} <span style="font-size:14px;">días</span></p><p class="stat-sub">Máxima: ${me.longest_streak} días</p></div>
      <div class="stat-card"><p class="stat-label">Skills</p><p class="stat-value">${skills.length}</p><p class="stat-sub">tecnologías registradas</p></div>
      <div class="stat-card"><p class="stat-label">Proyectos</p><p class="stat-value">${projects.length}</p><p class="stat-sub">en tu portafolio</p></div>
      <div class="stat-card"><p class="stat-label">Horas</p><p class="stat-value purple">${totalHours}</p><p class="stat-sub">de estudio acumuladas</p></div>
      <div class="stat-card"><p class="stat-label">Badges</p><p class="stat-value">${earnedBadges.length}<span style="font-size:14px;color:var(--muted);">/${badges.length}</span></p><p class="stat-sub">conseguidos</p></div>
    </div>

    <div class="chart-grid">
      <div class="chart-card">
        <p class="chart-title">Skills por categoría</p>
        <div class="chart-box"><canvas id="chart-category"></canvas></div>
      </div>
      <div class="chart-card">
        <p class="chart-title">Horas de estudio · últimas 4 semanas</p>
        <div class="chart-box"><canvas id="chart-hours"></canvas></div>
      </div>
    </div>

    <div class="form-card">
      <p class="form-card-title">Registrar horas de estudio</p>
      <p class="form-card-sub">Un registro por día. La racha y los puntos se recalculan solos.</p>
      <form id="log-form" class="form-row">
        <div class="f-field" style="width:170px">
          <label class="f-label">Fecha</label>
          <input class="f-input" name="log_date" type="date" required />
        </div>
        <div class="f-field" style="width:130px">
          <label class="f-label">Horas</label>
          <input class="f-input" name="hours" type="number" step="0.5" min="0.5" max="24" placeholder="2.5" required />
        </div>
        <button type="submit" class="btn-primary">+ Registrar</button>
      </form>
    </div>

    <div id="logs-list" style="margin-bottom:2rem;"></div>

    <h3 class="section-title" style="margin-top:1rem;">Badges</h3>
    <p class="section-desc">Se otorgan automáticamente al cumplir cada condición.</p>
    <div class="badges-grid">
      ${badges
        .map(
          (b) => `
        <div class="badge-card ${b.earned ? '' : 'locked'}">
          <span class="badge-icon">${escapeHtml(b.icon || '🏅')}</span>
          <div>
            <p class="badge-name">${escapeHtml(b.name)}</p>
            <p class="badge-desc">${escapeHtml(b.description || '')}</p>
          </div>
        </div>`
        )
        .join('')}
    </div>
  `;

  const today = new Date().toISOString().slice(0, 10);
  content.querySelector('input[name="log_date"]').value = today;
  document.getElementById('log-form').addEventListener('submit', (e) => onAddLog(e, app));

  paintLogs(logs);
  drawCategoryChart(skills);
  drawHoursChart(logs);
}

function paintLogs(logs) {
  const box = document.getElementById('logs-list');
  if (logs.length === 0) {
    box.innerHTML = '<p class="section-desc">Todavía no has registrado horas.</p>';
    return;
  }
  box.innerHTML = `
    <div class="projects-grid">
      ${logs
        .slice(0, 10)
        .map(
          (l) => `
        <div class="proj-card">
          <button class="del-btn" data-del-log="${l.id}" title="Eliminar">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <div class="proj-left">
            <div class="proj-icon" style="background:linear-gradient(135deg,#7c3aed,#6d28d9)">⏱</div>
            <div class="proj-info">
              <p class="proj-name">${escapeHtml(new Date(l.log_date).toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'short' }))}</p>
              <p class="proj-desc">${Number(l.hours)} horas de estudio</p>
            </div>
          </div>
        </div>`
        )
        .join('')}
    </div>`;

  box.querySelectorAll('[data-del-log]').forEach((btn) =>
    btn.addEventListener('click', () => onDeleteLog(btn.dataset.delLog))
  );
}

async function onAddLog(event, app) {
  event.preventDefault();
  const values = Object.fromEntries(new FormData(event.target).entries());
  
async function onAddLog(event, app) {
  event.preventDefault();

  const values = Object.fromEntries(new FormData(event.target).entries());

  const hours = Number(values.hours);

  if (hours < 0.5 || hours > 24) {
    toast('Solo puedes registrar entre 0.5 y 24 horas por día.', 'error');
    return;
  }

  try {
    await api.post('/study-logs', {
      hours,
      log_date: values.log_date,
    });

    toast('Horas registradas.', 'success');
    await renderDashboard({}, app);

  } catch (error) {
    toast(error.message, 'error');
  }
}

  try {
    await api.post('/study-logs', {
      hours: Number(values.hours),
      log_date: values.log_date,
    });
    toast('Horas registradas.', 'success');
    await renderDashboard({}, app);
  } catch (error) {
    toast(error.message, 'error');
  }
}

async function onDeleteLog(id) {
  try {
    await api.delete(`/study-logs/${id}`);
    toast('Registro eliminado.', 'success');
    const logs = await api.get('/study-logs');
    paintLogs(logs);
    drawHoursChart(logs);
  } catch (error) {
    toast(error.message, 'error');
  }
}

// ---- Charts (real data) ----
function drawCategoryChart(skills) {
  const counts = {};
  skills.forEach((s) => {
    const key = s.category || 'Otros';
    counts[key] = (counts[key] || 0) + 1;
  });
  const labels = Object.keys(counts);
  const data = Object.values(counts);

  if (charts.category) charts.category.destroy();
  const ctx = document.getElementById('chart-category');
  if (!ctx) return;

  charts.category = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.length ? labels : ['Sin skills'],
      datasets: [
        {
          label: 'Skills',
          data: data.length ? data : [0],
          backgroundColor: '#2563eb',
          borderRadius: 6,
          maxBarThickness: 46,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: '#e2e8f0' } },
        x: { grid: { display: false } },
      },
    },
  });
}

function drawHoursChart(logs) {
  // Sum hours into the last 4 calendar weeks (oldest -> newest).
  const weeks = [0, 0, 0, 0];
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  logs.forEach((l) => {
    const d = new Date(l.log_date);
    d.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((now - d) / (1000 * 60 * 60 * 24));
    if (diffDays >= 0 && diffDays < 28) {
      const weekIndex = 3 - Math.floor(diffDays / 7);
      weeks[weekIndex] += Number(l.hours);
    }
  });

  if (charts.hours) charts.hours.destroy();
  const ctx = document.getElementById('chart-hours');
  if (!ctx) return;

  charts.hours = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
      datasets: [
        {
          label: 'Horas',
          data: weeks,
          borderColor: '#2563eb',
          backgroundColor: 'rgba(37,99,235,0.12)',
          fill: true,
          tension: 0.35,
          pointBackgroundColor: '#2563eb',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: '#e2e8f0' } },
        x: { grid: { display: false } },
      },
    },
  });
}
