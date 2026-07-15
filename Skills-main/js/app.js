'use strict';

// ─────────────────────────────────────────
// MODALES
// ─────────────────────────────────────────
function openModal(id) {
  document.getElementById(id).classList.remove('hidden');
}
function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
}

// Cerrar modal al hacer clic fuera del cuadro
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function (e) {
    if (e.target === this) closeModal(this.id);
  });
});

// Botones que abren modales
document.getElementById('btn-open-skill-modal').addEventListener('click', () => openModal('modal-skill'));
document.getElementById('btn-open-proj-modal').addEventListener('click', () => openModal('modal-project'));


// ─────────────────────────────────────────
// SKILLS — filtro y búsqueda
// ─────────────────────────────────────────
let activeFilter = 'Todos';
let activeSearch = '';

function setFilter(cat, btn) {
  activeFilter = cat;
  document.querySelectorAll('.fpill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderSkills();
}

document.getElementById('search').addEventListener('input', function () {
  activeSearch = this.value.toLowerCase().trim();
  renderSkills();
});

function renderSkills() {
  let visible = 0;
  document.querySelectorAll('#skills-grid .big-card:not(.big-card--add)').forEach(card => {
    const match =
      (activeFilter === 'Todos' || card.dataset.cat === activeFilter) &&
      (!activeSearch || card.dataset.kw.includes(activeSearch));
    card.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  document.getElementById('skills-empty').classList.toggle('hidden', visible > 0);
}


// ─────────────────────────────────────────
// SKILLS — mapa de slugs para Simple Icons
// ─────────────────────────────────────────
const ICON_SLUGS = {
  'javascript':    ['javascript',   'f7df1e'],
  'typescript':    ['typescript',   '3178c6'],
  'react':         ['react',        '61dafb'],
  'vue':           ['vuedotjs',     '4FC08D'],
  'angular':       ['angular',      'DD0031'],
  'svelte':        ['svelte',       'FF3E00'],
  'next.js':       ['nextdotjs',    'ffffff'],
  'nextjs':        ['nextdotjs',    'ffffff'],
  'node.js':       ['nodedotjs',    '4ade80'],
  'nodejs':        ['nodedotjs',    '4ade80'],
  'express':       ['express',      'ffffff'],
  'nestjs':        ['nestjs',       'E0234E'],
  'python':        ['python',       'ffffff'],
  'django':        ['django',       '092E20'],
  'fastapi':       ['fastapi',      '009688'],
  'postgresql':    ['postgresql',   '4169e1'],
  'postgres':      ['postgresql',   '4169e1'],
  'mysql':         ['mysql',        '4479A1'],
  'mongodb':       ['mongodb',      '47A248'],
  'redis':         ['redis',        'DC382D'],
  'docker':        ['docker',       '2496ed'],
  'kubernetes':    ['kubernetes',   '326CE5'],
  'git':           ['git',          'F05032'],
  'github':        ['github',       'ffffff'],
  'linux':         ['linux',        'FCC624'],
  'flutter':       ['flutter',      '02569B'],
  'dart':          ['dart',         '0175C2'],
  'swift':         ['swift',        'FA7343'],
  'kotlin':        ['kotlin',       '7F52FF'],
  'tailwind':      ['tailwindcss',  '06B6D4'],
  'graphql':       ['graphql',      'E10098'],
  'aws':           ['amazonaws',    'FF9900'],
  'firebase':      ['firebase',     'FFCA28'],
  'supabase':      ['supabase',     '3ECF8E'],
  'figma':         ['figma',        'F24E1E'],
};

function getIconHTML(name, size = 42) {
  const entry = ICON_SLUGS[name.toLowerCase()];
  if (entry) {
    const [slug, color] = entry;
    return `<img src="https://cdn.simpleicons.org/${slug}/${color}" width="${size}" height="${size}" alt="${name}" style="display:block;" />`;
  }
  // fallback: iniciales
  return `<span style="font-size:18px;font-weight:800;letter-spacing:.01em;color:#e8f0fe;">${name.slice(0, 2).toUpperCase()}</span>`;
}

// ── Color configs por categoría ──────────
const CAT_CONFIG = {
  Frontend: {
    avatarBg: 'linear-gradient(135deg,#0d1f3c,#0a1a38)',
    barFill:  'linear-gradient(90deg,#3b82f6,#60a5fa)',
    tagColor: '#60a5fa',
    tagBg:    '#1a2d48',
  },
  Backend: {
    avatarBg: 'linear-gradient(135deg,#0d2416,#0a1f12)',
    barFill:  'linear-gradient(90deg,#10b981,#34d399)',
    tagColor: '#34d399',
    tagBg:    '#0d2316',
  },
  DevOps: {
    avatarBg: 'linear-gradient(135deg,#1e1200,#1a1000)',
    barFill:  'linear-gradient(90deg,#f59e0b,#fcd34d)',
    tagColor: '#fbbf24',
    tagBg:    '#1f1708',
  },
  Data: {
    avatarBg: 'linear-gradient(135deg,#1a1a2e,#1a1530)',
    barFill:  'linear-gradient(90deg,#8b5cf6,#a78bfa)',
    tagColor: '#a78bfa',
    tagBg:    '#1e1535',
  },
  Mobile: {
    avatarBg: 'linear-gradient(135deg,#2a0a14,#1e0810)',
    barFill:  'linear-gradient(90deg,#f43f5e,#fb7185)',
    tagColor: '#fb7185',
    tagBg:    '#2a0a14',
  },
};

// badge color: dorado para nv 4-5, gris para el resto
function badgeStyle(level) {
  return level >= 4
    ? 'background:#f59e0b;color:#fff;'
    : 'background:#64748b;color:#e2e8f0;';
}


// ─────────────────────────────────────────
// SKILLS — agregar nueva
// ─────────────────────────────────────────
document.getElementById('skill-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name  = this.sname.value.trim();
  const cat   = this.scategory.value;
  const level = parseInt(this.slevel.value);
  const hours = this.shours.value.trim();
  if (!name) return;

  const pct = Math.round((level / 5) * 100);
  const cfg = CAT_CONFIG[cat];

  const card = document.createElement('div');
  card.className = 'big-card';
  card.dataset.cat = cat;
  card.dataset.kw  = `${name} ${cat}`.toLowerCase();

  card.innerHTML = `
    <div class="bc-badge" style="${badgeStyle(level)}">Nv ${level}</div>
    <div class="bc-icon-wrap" style="background:${cfg.avatarBg};">
      ${getIconHTML(name)}
    </div>
    <p class="bc-name">${name}</p>
    <span class="bc-cat-tag" style="color:${cfg.tagColor};background:${cfg.tagBg};">${cat.toUpperCase()}</span>
    <div class="bc-track-wrap">
      <div class="bc-track">
        <div class="bc-fill" style="width:${pct}%;background:${cfg.barFill}"></div>
      </div>
      <span class="bc-pct">${pct}%</span>
    </div>
    ${hours ? `<p class="bc-hours">${hours}h practicadas</p>` : ''}
  `;

  // Insertar antes del botón "Añadir habilidad"
  const grid    = document.getElementById('skills-grid');
  const addBtn  = document.getElementById('btn-open-skill-modal');
  grid.insertBefore(card, addBtn);

  this.reset();
  closeModal('modal-skill');
  renderSkills();
});


// ─────────────────────────────────────────
// PROYECTOS — mapa de colores por tecnología
// ─────────────────────────────────────────
const PROJ_TECH_CONFIG = {
  react:       { bg: 'linear-gradient(135deg,#061a26,#0c2233)', icon: ['react',       '61dafb'] },
  nodedotjs:   { bg: 'linear-gradient(135deg,#0d2416,#0a1f12)', icon: ['nodedotjs',   '4ade80'] },
  typescript:  { bg: 'linear-gradient(135deg,#0d1f3c,#0a1a38)', icon: ['typescript',  '3178c6'] },
  python:      { bg: 'linear-gradient(135deg,#1a1a2e,#1a1530)', icon: ['python',      'ffffff'] },
  docker:      { bg: 'linear-gradient(135deg,#071d2e,#061826)', icon: ['docker',      '2496ed'] },
  postgresql:  { bg: 'linear-gradient(135deg,#0d1f40,#081730)', icon: ['postgresql',  '4169e1'] },
  javascript:  { bg: 'linear-gradient(135deg,#1c2d10,#1a2d1a)', icon: ['javascript',  'f7df1e'] },
  vuedotjs:    { bg: 'linear-gradient(135deg,#0a1f12,#091a10)', icon: ['vuedotjs',    '4FC08D'] },
};

const BADGE_CLASS = {
  'En progreso': 'badge-progress',
  'Completado':  'badge-done',
  'Pendiente':   'badge-pending',
};


// ─────────────────────────────────────────
// PROYECTOS — agregar nuevo
// ─────────────────────────────────────────
document.getElementById('project-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name   = this.pname.value.trim();
  const desc   = this.pdesc.value.trim();
  const tech   = this.ptech.value;
  const status = this.pstatus.value;
  if (!name) return;

  const cfg        = PROJ_TECH_CONFIG[tech] || PROJ_TECH_CONFIG['react'];
  const [slug, clr] = cfg.icon;
  const badgeCls   = BADGE_CLASS[status] || 'badge-pending';

  const card = document.createElement('div');
  card.className = 'proj-card';
  card.dataset.status = status;

  card.innerHTML = `
    <div class="proj-icon-wrap" style="background:${cfg.bg};">
      <img src="https://cdn.simpleicons.org/${slug}/${clr}" width="28" height="28" alt="${name}" />
    </div>
    <div class="proj-info">
      <p class="proj-name">${name}</p>
      <p class="proj-desc">${desc || 'Sin descripción'}</p>
      <span class="proj-badge ${badgeCls}">${status}</span>
    </div>
  `;

  const list  = document.getElementById('projects-list');
  const empty = document.getElementById('projects-empty');
  list.insertBefore(card, empty);

  this.reset();
  closeModal('modal-project');

  // Mostrar/ocultar empty state
  const count = list.querySelectorAll('.proj-card').length;
  empty.classList.toggle('hidden', count > 0);
});
