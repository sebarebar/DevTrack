import { api } from '../utils/api.js';
import { renderShell } from '../components/layout.js';
import { escapeHtml, toast } from '../utils/dom.js';
import {
  LEVELS,
  levelInfo,
  categorySlug,
  categoryGradient,
} from '../utils/skills.js';

let state = { skills: [], categories: [], filter: 'all', search: '' };

export async function renderSkills(params, app) {
  const content = renderShell(app, {
    active: '/skills',
    hero: {
      eyebrow: 'Technologies',
      title: 'Your developer <em>stack</em>, in one place.',
      desc: 'Register the technologies you master, organized by category, and track your progress.',
    },
  });

  content.innerHTML = '<div class="page-loading">Loading skills...</div>';

  try {
    const [skills, catalog] = await Promise.all([
      api.get('/skills'),
      api.get('/skills/catalog'),
    ]);

    state.skills = skills;
    state.categories = catalog.categories;

  } catch (error) {

    content.innerHTML = `<div class="empty-state"><p>${escapeHtml(error.message)}</p></div>`;
    return;

  }


  content.innerHTML = `

    <div class="form-card">

      <p class="form-card-title">Add new skill</p>

      <p class="form-card-sub">
        Complete the fields to add it to your profile
      </p>


      <form id="skill-form" class="form-row">

        <div class="f-field f-grow">

          <label class="f-label">Name</label>

          <input 
            class="f-input" 
            name="name" 
            type="text" 
            placeholder="Ex. TypeScript" 
            required 
          />

        </div>


        <div class="f-field" style="width:160px">

          <label class="f-label">Category</label>

          <select class="f-input f-select" name="category_id">

            ${state.categories
      .map(
        (c) =>
          `<option value="${c.id}">
                    ${escapeHtml(c.name)}
                  </option>`
      )
      .join('')}

          </select>

        </div>


        <div class="f-field" style="width:150px">

          <label class="f-label">Level</label>

          <select class="f-input f-select" name="level">

            ${LEVELS
      .map(
        (l) =>
          `<option value="${l.value}">
                    ${l.label}
                  </option>`
      )
      .join('')}

          </select>

        </div>


        <button type="submit" class="btn-primary">
          + Add
        </button>


      </form>

    </div>



    <div class="filter-bar">

      <div class="pills-group" id="skill-pills">

        <button class="fpill active" data-cat="all">
          All
        </button>


        ${state.categories
      .map(
        (c) =>
          `<button 
                class="fpill" 
                data-cat="${escapeHtml(c.name)}"
              >
                ${escapeHtml(c.name)}
              </button>`
      )
      .join('')}


      </div>



      <div class="search-wrap">

        <svg 
          class="search-icon" 
          width="13" 
          height="13" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"
          />
        </svg>


        <input 
          id="skill-search" 
          class="search-input" 
          type="text" 
          placeholder="Search skill..." 
        />


      </div>


    </div>



    <div id="skills-grid" class="skills-grid"></div>

  `;



  document
    .getElementById('skill-form')
    .addEventListener('submit', onAdd);



  document
    .getElementById('skill-pills')
    .addEventListener('click', (e) => {

      const pill = e.target.closest('.fpill');

      if (!pill) return;


      document
        .querySelectorAll('#skill-pills .fpill')
        .forEach((p) => p.classList.remove('active'));


      pill.classList.add('active');

      state.filter = pill.dataset.cat;

      paint();

    });



  document
    .getElementById('skill-search')
    .addEventListener('input', (e) => {

      state.search = e.target.value.toLowerCase().trim();

      paint();

    });



  paint();

}

function paint() {
  const grid = document.getElementById('skills-grid');

  const visible = state.skills.filter((s) => {

    const matchCat =
      state.filter === 'all' || s.category === state.filter;

    const matchSearch =
      !state.search || s.name.toLowerCase().includes(state.search);

    return matchCat && matchSearch;

  });


  if (visible.length === 0) {

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
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <p>No skills match this filter.</p>

      </div>`;

    return;

  }



  grid.innerHTML = visible
    .map((s) => {

      const lvl = levelInfo(s.level);

      const slug = categorySlug(s.category);

      const initial = escapeHtml(
        (s.name || '?').charAt(0).toUpperCase()
      );


      return `

        <div class="skill-card">


          <button 
            class="del-btn" 
            data-del="${s.id}" 
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



          <div 
            class="sc-logo" 
            style="background:${categoryGradient(s.category)}"
          >
            ${initial}
          </div>



          <p class="sc-name">
            ${escapeHtml(s.name)}
          </p>



          <p class="sc-cat ${slug}">
            ${escapeHtml(s.category || 'Other')}
          </p>



          <div class="sc-footer">


            <div class="sc-stats">

              <span class="sc-level">
                ${lvl.label}
              </span>


              <button 
                class="sc-edit" 
                data-edit="${s.id}"
              >
                Change level
              </button>


            </div>



            <div class="sc-bar-track">

              <div 
                class="sc-bar-fill" 
                style="width:${lvl.width}%"
              ></div>

            </div>



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



  grid
    .querySelectorAll('[data-edit]')
    .forEach((btn) =>
      btn.addEventListener(
        'click',
        () => onEditLevel(btn.dataset.edit)
      )
    );

}




async function onAdd(event) {
  event.preventDefault();

  const form = event.target;
  const btn = form.querySelector('button[type="submit"]');
  if (btn.disabled) return;
  btn.disabled = true;

  const values = Object.fromEntries(new FormData(form).entries());

  if (!values.name.trim()) { btn.disabled = false; return; }

  try {
    await api.post('/skills', {
      name: values.name.trim(),
      category_id: Number(values.category_id),
      level: values.level,
    });

    toast('Skill added.', 'success');
    form.reset();
    await reload();
  } catch (error) {
    toast(error.message, 'error');
  } finally {
    btn.disabled = false;
  }
}




async function onDelete(id) {

  try {

    await api.delete(`/skills/${id}`);


    toast('Skill deleted.', 'success');


    await reload();


  } catch (error) {

    toast(error.message, 'error');

  }

}




async function onEditLevel(id) {

  const skill = state.skills.find(
    (s) => String(s.id) === String(id)
  );


  const options = LEVELS
    .map((l) => `${l.order}=${l.label}`)
    .join(', ');



  const input = prompt(
    `New level for ${skill.name} (${options}):`
  );


  if (!input) return;



  const chosen = LEVELS.find(
    (l) => String(l.order) === input.trim()
  );



  if (!chosen) {

    toast('Invalid level.', 'error');

    return;

  }



  try {

    await api.put(`/skills/${id}`, {
      level: chosen.value,
    });


    toast('Level updated.', 'success');


    await reload();



  } catch (error) {

    toast(error.message, 'error');

  }

}




async function reload() {

  state.skills = await api.get('/skills');

  paint();

}