import { api } from '../utils/api.js';
import { renderShell } from '../components/layout.js';
import { escapeHtml, toast } from '../utils/dom.js';

let projects = [];

export async function renderProjects(params, app) {
  const content = renderShell(app, {
    active: '/projects',
    hero: {
      eyebrow: 'Portfolio',
      title: 'Your <em>projects</em>, from repo to profile.',
      desc: 'Register your projects manually or import them from your GitHub account.',
    },
  });

  content.innerHTML = '<div class="page-loading">Loading projects...</div>';

  try {
    projects = await api.get('/projects');
  } catch (error) {
    content.innerHTML = `<div class="empty-state"><p>${escapeHtml(error.message)}</p></div>`;
    return;
  }

  content.innerHTML = `
    <div class="form-card">

      <p class="form-card-title">Register project</p>

      <p class="form-card-sub">
        Complete the fields to add it to your profile
      </p>

      <form id="proj-form" class="form-row">

        <div class="f-field f-grow">

          <label class="f-label">Name</label>

          <input 
            class="f-input" 
            name="name" 
            type="text" 
            placeholder="Ex. REST API" 
            required 
          />
        </div>

        <div class="f-field f-grow">

          <label class="f-label">Description</label>

          <input 
            class="f-input" 
            name="description" 
            type="text" 
            placeholder="Brief description" 
          />
        </div>

        <div class="f-field" style="width:170px">
          <label class="f-label">Technologies</label>

          <input 
            class="f-input" 
            name="technologies" 
            type="text" 
            placeholder="React, Node..." 
          />
        </div>

        <div class="f-field" style="width:200px">

          <label class="f-label">GitHub URL</label>

          <input 
            class="f-input" 
            name="github_url" 
            type="url" 
            placeholder="https://github.com/..." 
          />
        </div>

        <button type="submit" class="btn-primary">
          + Add
        </button>

      </form>
    </div>

    <div class="form-card">

      <p class="form-card-title">
        Import from GitHub
      </p>

      <p class="form-card-sub">
        Bring public repositories from a user to add them quickly
      </p>

      <form id="github-form" class="form-row">

        <div class="f-field f-grow">

          <label class="f-label">
            GitHub username
          </label>

          <input 
            class="f-input" 
            name="username" 
            type="text" 
            placeholder="Ex. sebarebar" 
            required 
          />
        </div>

        <button type="submit" class="btn-primary">
          Search repos
        </button>

      </form>

      <div id="github-results" style="margin-top:12px;"></div>

    </div>
    <div id="projects-grid" class="projects-grid"></div>
  `;

  document
    .getElementById('proj-form')
    .addEventListener('submit', onAdd);

  document
    .getElementById('github-form')
    .addEventListener('submit', onGithub);

  paint();
}

function paint() {
  const grid = document.getElementById('projects-grid');
  if (projects.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <svg 
          width="40" 
          height="40" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="1.5" 
            d="M4 7v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H6a2 2 0 00-2 2z"
          />
        </svg>
        <p>You don't have any projects yet. Add your first one.</p>
      </div>`;
    return;
  }

  grid.innerHTML = projects
    .map((p) => {
      const initial = escapeHtml(
        (p.name || '?').charAt(0).toUpperCase()
      );
      const link = p.github_url
        ? `<a 
            class="proj-link" 
            href="${escapeHtml(p.github_url)}" 
            target="_blank" 
            rel="noopener"
          >
            GitHub ↗
          </a>`
        : '';

      return `
        <div class="proj-card">
          <button 
            class="del-btn" 
            data-del="${p.id}" 
            title="Delete"
          >
            <svg 
              width="12" 
              height="12" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                stroke-linecap="round" 
                stroke-linejoin="round" 
                stroke-width="2.5" 
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div class="proj-left">
            <div class="proj-icon">
              ${initial}
            </div>
            <div class="proj-info">
              <p class="proj-name">
                ${escapeHtml(p.name)}
              </p>
              <p class="proj-desc">
                ${escapeHtml(p.description || 'No description')}
              </p>
              <p class="proj-stack">
                ${escapeHtml(p.technologies || '')}
              </p>
            </div>
          </div>
          <div class="proj-right">
            ${link}
          </div>
        </div>`;
    })
    .join('');


  grid
    .querySelectorAll('[data-del]')
    .forEach((btn) =>
      btn.addEventListener(
        'click',
        () => onDelete(btn.dataset.del)
      )
    );
}

async function onAdd(event) {
  event.preventDefault();

  const form = event.target;

  const values = Object.fromEntries(
    new FormData(form).entries()
  );

  if (!values.name.trim()) return;

  try {
    await api.post('/projects', {
      name: values.name.trim(),
      description: values.description || null,
      technologies: values.technologies || null,
      github_url: values.github_url || null,
    });

    toast('Project added.', 'success');

    form.reset();

    projects = await api.get('/projects');

    paint();

  } catch (error) {
    toast(error.message, 'error');
  }
}

async function onDelete(id) {
  try {
    await api.delete(`/projects/${id}`);

    toast('Project deleted.', 'success');

    projects = await api.get('/projects');

    paint();

  } catch (error) {
    toast(error.message, 'error');
  }
}

async function onGithub(event) {
  event.preventDefault();

  const username = new FormData(event.target)
    .get('username')
    .trim();

  const box = document.getElementById('github-results');

  if (!username) return;

  box.innerHTML = '<p class="page-loading">Searching...</p>';

  try {
    const repos = await api.get(
      `/projects/github/${encodeURIComponent(username)}`
    );

    if (repos.length === 0) {
      box.innerHTML =
        '<p class="section-desc">This user has no public repositories.</p>';
      return;
    }

    box.innerHTML = repos
      .slice(0, 12)
      .map(
        (r, i) => `
        <div 
          class="proj-card" 
          style="margin-bottom:8px;"
        >
          <div class="proj-left">
            <div class="proj-icon">
              ${escapeHtml(
                r.name.charAt(0).toUpperCase()
              )}
            </div>

            <div class="proj-info">
              <p class="proj-name">
                ${escapeHtml(r.name)}
              </p>
              <p class="proj-desc">
                ${escapeHtml(
                  r.description || 'No description'
                )}
              </p>
            </div>

          </div>

          <div class="proj-right">
            <button 
              class="btn-ghost" 
              data-import="${i}"
            >
              Add
            </button>
          </div>
        </div>`
      )
      .join('');

    box
      .querySelectorAll('[data-import]')
      .forEach((btn) =>
        btn.addEventListener(
          'click',
          () =>
            importRepo(
              repos[Number(btn.dataset.import)],
              btn
            )
        )
      );
  } catch (error) {
    box.innerHTML =
      `<p class="form-error">${escapeHtml(error.message)}</p>`;
  }
}

async function importRepo(repo, btn) {
  btn.disabled = true;
  btn.textContent = 'Adding...';

  try {
    await api.post('/projects', {
      name: repo.name,
      description: repo.description || null,
      github_url: repo.github_url || null,
      technologies: null,
    });
    toast(
      `"${repo.name}" added.`,
      'success'
    );
    btn.textContent = 'Added ✓';
    projects = await api.get('/projects');

    paint();

  } catch (error) {
    toast(error.message, 'error');
    btn.disabled = false;
    btn.textContent = 'Add';
  }
}