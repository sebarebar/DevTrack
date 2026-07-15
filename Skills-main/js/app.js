'use strict';

let activeFilter = 'Todos';
let activeSearch  = '';

// ── Filter ──────────────────────────────────────────────
function setFilter(cat, btn) {
  activeFilter = cat;
  document.querySelectorAll('.fpill').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  render();
}

// ── Search ──────────────────────────────────────────────
document.getElementById('search').addEventListener('input', function () {
  activeSearch = this.value.toLowerCase().trim();
  render();
});

// ── Render ──────────────────────────────────────────────
function render() {
  let n = 0;
  document.querySelectorAll('.skill-card').forEach(c => {
    const ok = (activeFilter === 'Todos' || c.dataset.cat === activeFilter)
            && (!activeSearch || c.dataset.kw.includes(activeSearch));
    c.style.display = ok ? '' : 'none';
    if (ok) n++;
  });
  document.getElementById('empty').classList.toggle('hidden', n > 0);
}

// ── Logo slugs for Simple Icons CDN ─────────────────────
// Maps lowercase skill name → simpleicons slug
const ICON_SLUGS = {
  'javascript':  'javascript',
  'typescript':  'typescript',
  'react':       'react',
  'vue':         'vuedotjs',
  'angular':     'angular',
  'svelte':      'svelte',
  'nextjs':      'nextdotjs',
  'next.js':     'nextdotjs',
  'node.js':     'nodedotjs',
  'nodejs':      'nodedotjs',
  'express':     'express',
  'nestjs':      'nestjs',
  'python':      'python',
  'django':      'django',
  'fastapi':     'fastapi',
  'postgresql':  'postgresql',
  'postgres':    'postgresql',
  'mysql':       'mysql',
  'mongodb':     'mongodb',
  'redis':       'redis',
  'docker':      'docker',
  'kubernetes':  'kubernetes',
  'git':         'git',
  'github':      'github',
  'linux':       'linux',
  'flutter':     'flutter',
  'dart':        'dart',
  'swift':       'swift',
  'kotlin':      'kotlin',
  'react native':'reactnative',
  'tailwind':    'tailwindcss',
  'graphql':     'graphql',
  'aws':         'amazonaws',
  'firebase':    'firebase',
  'supabase':    'supabase',
  'figma':       'figma',
};

function getIconHTML(name) {
  const slug = ICON_SLUGS[name.toLowerCase()];
  if (slug) {
    return `<img src="https://cdn.simpleicons.org/${slug}/ffffff" width="20" height="20" alt="${name}" style="display:block;" />`;
  }
  // fallback: initials
  return `<span style="font-size:12px;font-weight:700;letter-spacing:.01em;">${name.slice(0,2).toUpperCase()}</span>`;
}

// ── Add skill ───────────────────────────────────────────
document.getElementById('skill-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name  = this.sname.value.trim();
  const cat   = this.scategory.value;
  const level = parseInt(this.slevel.value);
  const hours = this.shours.value.trim();
  if (!name) return;

  const pct = Math.round((level / 5) * 100);

  const avatarGrad = {
    Frontend: 'linear-gradient(135deg,#3b82f6,#2563eb)',
    Backend:  'linear-gradient(135deg,#10b981,#059669)',
    DevOps:   'linear-gradient(135deg,#f59e0b,#d97706)',
    Data:     'linear-gradient(135deg,#8b5cf6,#6d28d9)',
    Mobile:   'linear-gradient(135deg,#f43f5e,#be185d)',
  };
  const barFill = {
    Frontend: 'linear-gradient(90deg,#3b82f6,#60a5fa)',
    Backend:  'linear-gradient(90deg,#10b981,#34d399)',
    DevOps:   'linear-gradient(90deg,#f59e0b,#fcd34d)',
    Data:     'linear-gradient(90deg,#8b5cf6,#a78bfa)',
    Mobile:   'linear-gradient(90deg,#f43f5e,#fb7185)',
  };
  const catColor = {
    Frontend: '#60a5fa', Backend: '#34d399',
    DevOps: '#fbbf24', Data: '#a78bfa', Mobile: '#fb7185',
  };

  const card = document.createElement('div');
  card.className = 'skill-card';
  card.dataset.cat = cat;
  card.dataset.kw  = `${name} ${cat}`.toLowerCase();

  card.innerHTML = `
    <div class="sc-top">
      <div class="sc-avatar" style="background:${avatarGrad[cat]}">${getIconHTML(name)}</div>
      <div class="sc-info">
        <p class="sc-name">${name}</p>
        <p class="sc-cat" style="color:${catColor[cat]}">${cat.toUpperCase()}</p>
      </div>
      <div class="sc-right">
        <p class="sc-level">Nv ${level}</p>
        ${hours ? `<p class="sc-hours">${hours}h</p>` : ''}
      </div>
    </div>
    <div class="sc-bottom">
      <div class="sc-meta"><span>Nivel ${level} de 5</span><span>${pct}%</span></div>
      <div class="sc-track">
        <div class="sc-fill" style="width:${pct}%;background:${barFill[cat]}"></div>
      </div>
    </div>`;

  // insert before empty state
  const grid  = document.getElementById('skills-grid');
  const empty = document.getElementById('empty');
  grid.insertBefore(card, empty);

  this.reset();
  render();
});
