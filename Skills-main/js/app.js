document.getElementById('app').innerHTML = `
  <header class="topbar">
    <span class="topbar-logo">devtrack</span>
    <nav class="topbar-nav">
      <a href="#skills"   class="nav-tab active" id="tab-btn-skills">Skills</a>
      <a href="#projects" class="nav-tab"         id="tab-btn-projects">Proyectos</a>
    </nav>
  </header>

  <div class="hero-band" id="hero-band">
    <div class="hero-band-grid"></div>
    <div class="hero-band-glow"></div>
    <div class="hero-band-inner">
      <p class="hero-eyebrow" id="hero-eyebrow">Tecnologías</p>
      <h1 class="hero-title" id="hero-title">Tu stack como <em>developer</em>,<br>en un solo lugar.</h1>
      <p class="hero-desc" id="hero-desc">Registra las tecnologías que dominas, organizadas por categoría y mide tu progreso con horas reales de práctica.</p>
    </div>
  </div>

  <div class="content">

    <div id="tab-skills">
      <div class="form-card">
        <p class="form-card-title">Agregar nueva skill</p>
        <p class="form-card-sub">Completa los campos para añadirla a tu perfil</p>
        <form id="skill-form" class="form-row">
          <div class="f-field f-grow">
            <label class="f-label">Nombre</label>
            <input class="f-input" name="sname" type="text" placeholder="Ej. TypeScript" required />
          </div>
          <div class="f-field" style="width:148px">
            <label class="f-label">Categoría</label>
            <select class="f-input f-select" name="scategory">
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
              <option value="Data">Data</option>
              <option value="Mobile">Mobile</option>
            </select>
          </div>
          <div class="f-field" style="width:128px">
            <label class="f-label">Nivel</label>
            <select class="f-input f-select" name="slevel">
              <option value="1">Nivel 1</option>
              <option value="2">Nivel 2</option>
              <option value="3" selected>Nivel 3</option>
              <option value="4">Nivel 4</option>
              <option value="5">Nivel 5</option>
            </select>
          </div>
          <div class="f-field" style="width:110px">
            <label class="f-label">Horas</label>
            <input class="f-input" name="shours" type="number" placeholder="120" min="0" />
          </div>
          <button type="submit" class="btn-primary">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
            </svg>
            Agregar
          </button>
        </form>
      </div>

      <div class="filter-bar">
        <div class="pills-group">
          <button class="fpill active" id="pill-skills-todos">Todos</button>
          <button class="fpill" id="pill-skills-frontend">Frontend</button>
          <button class="fpill" id="pill-skills-backend">Backend</button>
          <button class="fpill" id="pill-skills-devops">DevOps</button>
          <button class="fpill" id="pill-skills-data">Data</button>
          <button class="fpill" id="pill-skills-mobile">Mobile</button>
        </div>
        <div class="search-wrap">
          <svg class="search-icon" width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
          </svg>
          <input id="skill-search" class="search-input" type="text" placeholder="Buscar skill..." />
        </div>
      </div>

      <div id="skills-grid" class="skills-grid">
        <div class="skill-card" data-cat="Frontend" data-kw="javascript frontend">
          <button class="del-btn" onclick="deleteCard(this)"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <div class="sc-logo" style="background:linear-gradient(135deg,#f59e0b,#d97706)"><img src="https://cdn.simpleicons.org/javascript/ffffff" width="26" height="26" alt="JS" /></div>
          <p class="sc-name">JavaScript</p><p class="sc-cat frontend">FRONTEND</p>
          <div class="sc-footer"><div class="sc-stats"><span class="sc-level">Nv 5</span><span class="sc-hours">329h</span></div><div class="sc-bar-track"><div class="sc-bar-fill" style="width:95%;background:linear-gradient(90deg,#2563eb,#60a5fa)"></div></div></div>
        </div>
        <div class="skill-card" data-cat="Frontend" data-kw="react frontend">
          <button class="del-btn" onclick="deleteCard(this)"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <div class="sc-logo" style="background:linear-gradient(135deg,#0891b2,#0e7490)"><img src="https://cdn.simpleicons.org/react/ffffff" width="26" height="26" alt="React" /></div>
          <p class="sc-name">React</p><p class="sc-cat frontend">FRONTEND</p>
          <div class="sc-footer"><div class="sc-stats"><span class="sc-level">Nv 4</span><span class="sc-hours">218h</span></div><div class="sc-bar-track"><div class="sc-bar-fill" style="width:80%;background:linear-gradient(90deg,#2563eb,#60a5fa)"></div></div></div>
        </div>
        <div class="skill-card" data-cat="Backend" data-kw="node.js nodejs backend">
          <button class="del-btn" onclick="deleteCard(this)"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <div class="sc-logo" style="background:linear-gradient(135deg,#16a34a,#15803d)"><img src="https://cdn.simpleicons.org/nodedotjs/ffffff" width="26" height="26" alt="Node.js" /></div>
          <p class="sc-name">Node.js</p><p class="sc-cat backend">BACKEND</p>
          <div class="sc-footer"><div class="sc-stats"><span class="sc-level">Nv 3</span><span class="sc-hours">120h</span></div><div class="sc-bar-track"><div class="sc-bar-fill" style="width:65%;background:linear-gradient(90deg,#059669,#34d399)"></div></div></div>
        </div>
        <div class="skill-card" data-cat="Data" data-kw="postgresql postgres data">
          <button class="del-btn" onclick="deleteCard(this)"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <div class="sc-logo" style="background:linear-gradient(135deg,#2563eb,#1d4ed8)"><img src="https://cdn.simpleicons.org/postgresql/ffffff" width="26" height="26" alt="PostgreSQL" /></div>
          <p class="sc-name">PostgreSQL</p><p class="sc-cat data">DATA</p>
          <div class="sc-footer"><div class="sc-stats"><span class="sc-level">Nv 3</span><span class="sc-hours">90h</span></div><div class="sc-bar-track"><div class="sc-bar-fill" style="width:60%;background:linear-gradient(90deg,#7c3aed,#a78bfa)"></div></div></div>
        </div>
        <div class="skill-card" data-cat="DevOps" data-kw="docker devops">
          <button class="del-btn" onclick="deleteCard(this)"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <div class="sc-logo" style="background:linear-gradient(135deg,#0369a1,#0284c7)"><img src="https://cdn.simpleicons.org/docker/ffffff" width="28" height="28" alt="Docker" /></div>
          <p class="sc-name">Docker</p><p class="sc-cat devops">DEVOPS</p>
          <div class="sc-footer"><div class="sc-stats"><span class="sc-level">Nv 2</span><span class="sc-hours">45h</span></div><div class="sc-bar-track"><div class="sc-bar-fill" style="width:40%;background:linear-gradient(90deg,#d97706,#fcd34d)"></div></div></div>
        </div>
        <div class="skill-card" data-cat="Frontend" data-kw="typescript frontend">
          <button class="del-btn" onclick="deleteCard(this)"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <div class="sc-logo" style="background:linear-gradient(135deg,#1d4ed8,#2563eb)"><img src="https://cdn.simpleicons.org/typescript/ffffff" width="24" height="24" alt="TypeScript" /></div>
          <p class="sc-name">TypeScript</p><p class="sc-cat frontend">FRONTEND</p>
          <div class="sc-footer"><div class="sc-stats"><span class="sc-level">Nv 4</span><span class="sc-hours">175h</span></div><div class="sc-bar-track"><div class="sc-bar-fill" style="width:80%;background:linear-gradient(90deg,#2563eb,#60a5fa)"></div></div></div>
        </div>
        <div class="skill-card" data-cat="Data" data-kw="python data">
          <button class="del-btn" onclick="deleteCard(this)"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <div class="sc-logo" style="background:linear-gradient(135deg,#7c3aed,#6d28d9)"><img src="https://cdn.simpleicons.org/python/ffffff" width="26" height="26" alt="Python" /></div>
          <p class="sc-name">Python</p><p class="sc-cat data">DATA</p>
          <div class="sc-footer"><div class="sc-stats"><span class="sc-level">Nv 3</span><span class="sc-hours">98h</span></div><div class="sc-bar-track"><div class="sc-bar-fill" style="width:60%;background:linear-gradient(90deg,#7c3aed,#a78bfa)"></div></div></div>
        </div>
        <div class="skill-card" data-cat="Mobile" data-kw="flutter mobile">
          <button class="del-btn" onclick="deleteCard(this)"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <div class="sc-logo" style="background:linear-gradient(135deg,#db2777,#be185d)"><img src="https://cdn.simpleicons.org/flutter/ffffff" width="26" height="26" alt="Flutter" /></div>
          <p class="sc-name">Flutter</p><p class="sc-cat mobile">MOBILE</p>
          <div class="sc-footer"><div class="sc-stats"><span class="sc-level">Nv 2</span><span class="sc-hours">60h</span></div><div class="sc-bar-track"><div class="sc-bar-fill" style="width:40%;background:linear-gradient(90deg,#db2777,#f472b6)"></div></div></div>
        </div>
        <div id="skills-empty" class="empty-state hidden">
          <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <p>No se encontraron skills con ese filtro.</p>
        </div>
      </div>
    </div>

    <div id="tab-projects" style="display:none">
      <div class="form-card">
        <p class="form-card-title">Registrar proyecto</p>
        <p class="form-card-sub">Completa los campos para añadirlo a tu perfil</p>
        <form id="proj-form" class="form-row">
          <div class="f-field f-grow">
            <label class="f-label">Nombre</label>
            <input class="f-input" name="pname" type="text" placeholder="Ej. API REST" required />
          </div>
          <div class="f-field f-grow">
            <label class="f-label">Descripción</label>
            <input class="f-input" name="pdesc" type="text" placeholder="Breve descripción" />
          </div>
          <div class="f-field" style="width:148px">
            <label class="f-label">Stack</label>
            <input class="f-input" name="pstack" type="text" placeholder="React, Node..." />
          </div>
          <div class="f-field" style="width:148px">
            <label class="f-label">Estado</label>
            <select class="f-input f-select" name="pstatus">
              <option value="active">Activo</option>
              <option value="review">En revisión</option>
              <option value="done">Completado</option>
              <option value="paused">Pausado</option>
            </select>
          </div>
          <button type="submit" class="btn-primary">
            <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"/>
            </svg>
            Agregar
          </button>
        </form>
      </div>

      <div class="filter-bar">
        <div class="pills-group">
          <button class="fpill active" id="pill-proj-todos">Todos</button>
          <button class="fpill" id="pill-proj-active">Activo</button>
          <button class="fpill" id="pill-proj-review">En revisión</button>
          <button class="fpill" id="pill-proj-done">Completado</button>
          <button class="fpill" id="pill-proj-paused">Pausado</button>
        </div>
        <div class="search-wrap">
          <svg class="search-icon" width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0"/>
          </svg>
          <input id="proj-search" class="search-input" type="text" placeholder="Buscar proyecto..." />
        </div>
      </div>

      <div id="projects-grid" class="projects-grid">
        <div class="proj-card" data-status="active" data-kw="devtrack react node fullstack">
          <button class="del-btn" onclick="deleteCard(this)"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <div class="proj-left"><div class="proj-icon" style="background:linear-gradient(135deg,#2563eb,#1d4ed8)">DT</div><div class="proj-info"><p class="proj-name">DevTrack</p><p class="proj-desc">Plataforma de seguimiento de skills y proyectos para developers</p><span class="proj-stack">React · Node.js · PostgreSQL</span></div></div>
          <div class="proj-right"><span class="status-dot active"></span><span class="status-label active">Activo</span></div>
        </div>
        <div class="proj-card" data-status="review" data-kw="portfolio personal nextjs">
          <button class="del-btn" onclick="deleteCard(this)"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <div class="proj-left"><div class="proj-icon" style="background:linear-gradient(135deg,#7c3aed,#6d28d9)">PO</div><div class="proj-info"><p class="proj-name">Portfolio Personal</p><p class="proj-desc">Sitio web personal con proyectos y experiencia profesional</p><span class="proj-stack">Next.js · Tailwind</span></div></div>
          <div class="proj-right"><span class="status-dot review"></span><span class="status-label review">En revisión</span></div>
        </div>
        <div class="proj-card" data-status="active" data-kw="api rest express postgres backend">
          <button class="del-btn" onclick="deleteCard(this)"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <div class="proj-left"><div class="proj-icon" style="background:linear-gradient(135deg,#059669,#047857)">AP</div><div class="proj-info"><p class="proj-name">API REST Usuarios</p><p class="proj-desc">Backend con autenticación JWT, roles y manejo de sesiones</p><span class="proj-stack">Express · PostgreSQL · JWT</span></div></div>
          <div class="proj-right"><span class="status-dot active"></span><span class="status-label active">Activo</span></div>
        </div>
        <div class="proj-card" data-status="done" data-kw="landing html tailwind">
          <button class="del-btn" onclick="deleteCard(this)"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <div class="proj-left"><div class="proj-icon" style="background:linear-gradient(135deg,#d97706,#b45309)">LC</div><div class="proj-info"><p class="proj-name">Landing Corporativa</p><p class="proj-desc">Página de presentación para cliente con animaciones CSS</p><span class="proj-stack">HTML · Tailwind · CSS</span></div></div>
          <div class="proj-right"><span class="status-dot done"></span><span class="status-label done">Completado</span></div>
        </div>
        <div class="proj-card" data-status="paused" data-kw="dashboard mobile react native">
          <button class="del-btn" onclick="deleteCard(this)"><svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg></button>
          <div class="proj-left"><div class="proj-icon" style="background:linear-gradient(135deg,#db2777,#be185d)">MB</div><div class="proj-info"><p class="proj-name">Dashboard Mobile</p><p class="proj-desc">App móvil para visualización de métricas en tiempo real</p><span class="proj-stack">React Native · Expo</span></div></div>
          <div class="proj-right"><span class="status-dot paused"></span><span class="status-label paused">Pausado</span></div>
        </div>
        <div id="proj-empty" class="empty-state hidden">
          <svg width="40" height="40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          <p>No hay proyectos con ese filtro.</p>
        </div>
      </div>
    </div>

  </div>
`

let categoriaSkillActiva = 'Todos'
let busquedaSkill = ''
let estadoProyectoActivo = 'Todos'
let busquedaProyecto = ''

const textosHero = {
  skills: {
    etiqueta: 'Tecnologías',
    titulo: 'Tu stack como <em>developer</em>,<br>en un solo lugar.',
    descripcion: 'Registra las tecnologías que dominas, organizadas por categoría y mide tu progreso con horas reales de práctica.'
  },
  projects: {
    etiqueta: 'Repositorios',
    titulo: 'Tus proyectos,<br><em>organizados y listos.</em>',
    descripcion: 'Agrega proyectos manualmente o importa tus repositorios desde GitHub. Filtra por estado y lleva el control.'
  }
}

function switchTab(pestanaElegida, elementoClicado) {
  document.querySelectorAll('.nav-tab').forEach(function(pestana) {
    pestana.classList.remove('active')
  })
  elementoClicado.classList.add('active')

  const seccionSkills    = document.getElementById('tab-skills')
  const seccionProyectos = document.getElementById('tab-projects')

  if (pestanaElegida === 'skills') {
    seccionSkills.style.display    = ''
    seccionProyectos.style.display = 'none'
  } else {
    seccionSkills.style.display    = 'none'
    seccionProyectos.style.display = ''
  }

  const textos = textosHero[pestanaElegida]
  document.getElementById('hero-eyebrow').textContent = textos.etiqueta
  document.getElementById('hero-title').innerHTML     = textos.titulo
  document.getElementById('hero-desc').textContent    = textos.descripcion
}

document.getElementById('tab-btn-skills').addEventListener('click', function() {
  switchTab('skills', this)
})
document.getElementById('tab-btn-projects').addEventListener('click', function() {
  switchTab('projects', this)
})

function setSkillFilter(categoriaElegida, botonClicado) {
  categoriaSkillActiva = categoriaElegida
  document.querySelectorAll('#tab-skills .fpill').forEach(function(boton) {
    boton.classList.remove('active')
  })
  botonClicado.classList.add('active')
  mostrarSkills()
}

document.getElementById('pill-skills-todos').addEventListener('click',    function() { setSkillFilter('Todos',    this) })
document.getElementById('pill-skills-frontend').addEventListener('click', function() { setSkillFilter('Frontend', this) })
document.getElementById('pill-skills-backend').addEventListener('click',  function() { setSkillFilter('Backend',  this) })
document.getElementById('pill-skills-devops').addEventListener('click',   function() { setSkillFilter('DevOps',   this) })
document.getElementById('pill-skills-data').addEventListener('click',     function() { setSkillFilter('Data',     this) })
document.getElementById('pill-skills-mobile').addEventListener('click',   function() { setSkillFilter('Mobile',   this) })

document.getElementById('skill-search').addEventListener('input', function() {
  busquedaSkill = this.value.toLowerCase()
  mostrarSkills()
})

function mostrarSkills() {
  const todasLasTarjetas = document.querySelectorAll('.skill-card')
  let cantidadVisible = 0

  todasLasTarjetas.forEach(function(tarjeta) {
    const pasaCategoria = (categoriaSkillActiva === 'Todos') || (tarjeta.dataset.cat === categoriaSkillActiva)
    const pasaBusqueda  = (busquedaSkill === '') || (tarjeta.dataset.kw.includes(busquedaSkill))

    if (pasaCategoria && pasaBusqueda) {
      tarjeta.style.display = ''
      cantidadVisible++
    } else {
      tarjeta.style.display = 'none'
    }
  })

  const mensajeVacio = document.getElementById('skills-empty')
  if (cantidadVisible === 0) {
    mensajeVacio.classList.remove('hidden')
  } else {
    mensajeVacio.classList.add('hidden')
  }
}

function setProjFilter(estadoElegido, botonClicado) {
  estadoProyectoActivo = estadoElegido
  document.querySelectorAll('#tab-projects .fpill').forEach(function(boton) {
    boton.classList.remove('active')
  })
  botonClicado.classList.add('active')
  mostrarProyectos()
}

document.getElementById('pill-proj-todos').addEventListener('click',  function() { setProjFilter('Todos',  this) })
document.getElementById('pill-proj-active').addEventListener('click', function() { setProjFilter('active', this) })
document.getElementById('pill-proj-review').addEventListener('click', function() { setProjFilter('review', this) })
document.getElementById('pill-proj-done').addEventListener('click',   function() { setProjFilter('done',   this) })
document.getElementById('pill-proj-paused').addEventListener('click', function() { setProjFilter('paused', this) })

document.getElementById('proj-search').addEventListener('input', function() {
  busquedaProyecto = this.value.toLowerCase()
  mostrarProyectos()
})

function mostrarProyectos() {
  const todasLasTarjetas = document.querySelectorAll('.proj-card')
  let cantidadVisible  = 0

  todasLasTarjetas.forEach(function(tarjeta) {
    const pasaEstado   = (estadoProyectoActivo === 'Todos') || (tarjeta.dataset.status === estadoProyectoActivo)
    const pasaBusqueda = (busquedaProyecto === '') || (tarjeta.dataset.kw.includes(busquedaProyecto))

    if (pasaEstado && pasaBusqueda) {
      tarjeta.style.display = ''
      cantidadVisible++
    } else {
      tarjeta.style.display = 'none'
    }
  })

  const mensajeVacio = document.getElementById('proj-empty')
  if (cantidadVisible === 0) {
    mensajeVacio.classList.remove('hidden')
  } else {
    mensajeVacio.classList.add('hidden')
  }
}

function deleteCard(botonX) {
  const tarjeta = botonX.closest('.skill-card, .proj-card')
  tarjeta.style.transition = 'opacity 0.2s, transform 0.2s'
  tarjeta.style.opacity    = '0'
  tarjeta.style.transform  = 'scale(0.95)'

  setTimeout(function() {
    tarjeta.remove()
    mostrarSkills()
    mostrarProyectos()
  }, 200)
}

const iconosPorNombre = {
  'javascript': 'javascript', 'typescript': 'typescript', 'react': 'react',
  'vue': 'vuedotjs', 'vue.js': 'vuedotjs', 'angular': 'angular', 'svelte': 'svelte',
  'next.js': 'nextdotjs', 'nextjs': 'nextdotjs', 'node.js': 'nodedotjs', 'nodejs': 'nodedotjs',
  'express': 'express', 'nestjs': 'nestjs', 'python': 'python', 'django': 'django',
  'fastapi': 'fastapi', 'postgresql': 'postgresql', 'mysql': 'mysql', 'mongodb': 'mongodb',
  'redis': 'redis', 'docker': 'docker', 'kubernetes': 'kubernetes', 'git': 'git',
  'github': 'github', 'linux': 'linux', 'flutter': 'flutter', 'dart': 'dart',
  'swift': 'swift', 'kotlin': 'kotlin', 'tailwind': 'tailwindcss', 'graphql': 'graphql',
  'aws': 'amazonaws', 'firebase': 'firebase', 'supabase': 'supabase', 'figma': 'figma',
  'rust': 'rust', 'go': 'go', 'java': 'java', 'php': 'php', 'laravel': 'laravel'
}

function getIcono(nombreTecnologia) {
  const slug = iconosPorNombre[nombreTecnologia.toLowerCase()]
  if (slug) {
    return '<img src="https://cdn.simpleicons.org/' + slug + '/ffffff" width="26" height="26" alt="' + nombreTecnologia + '" />'
  }
  const iniciales = nombreTecnologia.slice(0, 2).toUpperCase()
  return '<span style="font-size:14px;font-weight:800;color:#fff">' + iniciales + '</span>'
}

const colorLogoPorCategoria = {
  'Frontend': 'linear-gradient(135deg, #2563eb, #1d4ed8)',
  'Backend':  'linear-gradient(135deg, #059669, #047857)',
  'DevOps':   'linear-gradient(135deg, #d97706, #b45309)',
  'Data':     'linear-gradient(135deg, #7c3aed, #6d28d9)',
  'Mobile':   'linear-gradient(135deg, #db2777, #be185d)'
}

const colorBarraPorCategoria = {
  'Frontend': 'linear-gradient(90deg, #2563eb, #60a5fa)',
  'Backend':  'linear-gradient(90deg, #059669, #34d399)',
  'DevOps':   'linear-gradient(90deg, #d97706, #fcd34d)',
  'Data':     'linear-gradient(90deg, #7c3aed, #a78bfa)',
  'Mobile':   'linear-gradient(90deg, #db2777, #f472b6)'
}

document.getElementById('skill-form').addEventListener('submit', function(evento) {
  evento.preventDefault()

  const nombre    = this.sname.value.trim()
  const categoria = this.scategory.value
  const nivel     = parseInt(this.slevel.value)
  const horas     = this.shours.value.trim()

  if (nombre === '') return

  const porcentaje = Math.round((nivel / 5) * 100)
  const horasTexto = (horas !== '') ? horas + 'h' : '—'

  const nuevaTarjeta = document.createElement('div')
  nuevaTarjeta.className   = 'skill-card'
  nuevaTarjeta.dataset.cat = categoria
  nuevaTarjeta.dataset.kw  = nombre.toLowerCase() + ' ' + categoria.toLowerCase()

  nuevaTarjeta.innerHTML = `
    <button class="del-btn" onclick="deleteCard(this)">
      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <div class="sc-logo" style="background:${colorLogoPorCategoria[categoria]}">
      ${getIcono(nombre)}
    </div>
    <p class="sc-name">${nombre}</p>
    <p class="sc-cat ${categoria.toLowerCase()}">${categoria.toUpperCase()}</p>
    <div class="sc-footer">
      <div class="sc-stats">
        <span class="sc-level">Nv ${nivel}</span>
        <span class="sc-hours">${horasTexto}</span>
      </div>
      <div class="sc-bar-track">
        <div class="sc-bar-fill" style="width:${porcentaje}%;background:${colorBarraPorCategoria[categoria]}"></div>
      </div>
    </div>
  `

  const grid         = document.getElementById('skills-grid')
  const mensajeVacio = document.getElementById('skills-empty')
  grid.insertBefore(nuevaTarjeta, mensajeVacio)
  this.reset()
  mostrarSkills()
})

const etiquetaEstado = {
  'active': 'Activo', 'review': 'En revisión', 'done': 'Completado', 'paused': 'Pausado'
}

const coloresDeProyecto = [
  'linear-gradient(135deg, #2563eb, #1d4ed8)', 'linear-gradient(135deg, #7c3aed, #6d28d9)',
  'linear-gradient(135deg, #059669, #047857)', 'linear-gradient(135deg, #d97706, #b45309)',
  'linear-gradient(135deg, #db2777, #be185d)', 'linear-gradient(135deg, #0369a1, #0284c7)'
]

document.getElementById('proj-form').addEventListener('submit', function(evento) {
  evento.preventDefault()

  const nombre      = this.pname.value.trim()
  const descripcion = this.pdesc.value.trim()
  const stack       = this.pstack.value.trim()
  const estado      = this.pstatus.value

  if (nombre === '') return

  const indiceAleatorio = Math.floor(Math.random() * coloresDeProyecto.length)
  const colorElegido    = coloresDeProyecto[indiceAleatorio]
  const iniciales       = nombre.slice(0, 2).toUpperCase()
  const textoEstado     = etiquetaEstado[estado]

  const htmlDescripcion = (descripcion !== '') ? `<p class="proj-desc">${descripcion}</p>` : ''
  const htmlStack       = (stack !== '')       ? `<span class="proj-stack">${stack}</span>` : ''

  const nuevaTarjeta = document.createElement('div')
  nuevaTarjeta.className      = 'proj-card'
  nuevaTarjeta.dataset.status = estado
  nuevaTarjeta.dataset.kw     = nombre.toLowerCase() + ' ' + descripcion.toLowerCase() + ' ' + stack.toLowerCase()

  nuevaTarjeta.innerHTML = `
    <button class="del-btn" onclick="deleteCard(this)">
      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <div class="proj-left">
      <div class="proj-icon" style="background:${colorElegido}">${iniciales}</div>
      <div class="proj-info">
        <p class="proj-name">${nombre}</p>
        ${htmlDescripcion}
        ${htmlStack}
      </div>
    </div>
    <div class="proj-right">
      <span class="status-dot ${estado}"></span>
      <span class="status-label ${estado}">${textoEstado}</span>
    </div>
  `

  const grid         = document.getElementById('projects-grid')
  const mensajeVacio = document.getElementById('proj-empty')
  grid.insertBefore(nuevaTarjeta, mensajeVacio)
  this.reset()
  mostrarProyectos()
})
