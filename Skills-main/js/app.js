let filtroActivo = 'Todos'
let textoBusqueda = ''

let filtroProyecto = 'Todos'
let textoBusquedaProyecto = ''

const heroInfo = {
  skills: {
    eyebrow: 'Tecnologías',
    title: 'Tu stack como <em>developer</em>,<br>en un solo lugar.',
    desc: 'Registra las tecnologías que dominas, organizadas por categoría y mide tu progreso con horas reales de práctica.'
  },
  projects: {
    eyebrow: 'Repositorios',
    title: 'Tus proyectos,<br><em>organizados y listos.</em>',
    desc: 'Agrega proyectos manualmente o importa tus repositorios desde GitHub. Filtra por estado y lleva el control.'
  }
}

function switchTab(tab, el) {
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'))
  el.classList.add('active')

  const secSkills = document.getElementById('tab-skills')
  const secProyectos = document.getElementById('tab-projects')

  if (tab === 'skills') {
    secSkills.style.display = ''
    secProyectos.style.display = 'none'
  } else {
    secSkills.style.display = 'none'
    secProyectos.style.display = ''
  }

  const info = heroInfo[tab]
  document.getElementById('hero-eyebrow').textContent = info.eyebrow
  document.getElementById('hero-title').innerHTML = info.title
  document.getElementById('hero-desc').textContent = info.desc
}

function setSkillFilter(categoria, boton) {
  filtroActivo = categoria
  document.querySelectorAll('#tab-skills .fpill').forEach(p => p.classList.remove('active'))
  boton.classList.add('active')
  mostrarSkills()
}

document.getElementById('skill-search').addEventListener('input', function() {
  textoBusqueda = this.value.toLowerCase()
  mostrarSkills()
})

function mostrarSkills() {
  const cards = document.querySelectorAll('.skill-card')
  let visibles = 0

  cards.forEach(card => {
    const pasaCategoria = filtroActivo === 'Todos' || card.dataset.cat === filtroActivo
    const pasaBusqueda = textoBusqueda === '' || card.dataset.kw.includes(textoBusqueda)

    if (pasaCategoria && pasaBusqueda) {
      card.style.display = ''
      visibles++
    } else {
      card.style.display = 'none'
    }
  })

  const msgVacio = document.getElementById('skills-empty')
  if (visibles === 0) {
    msgVacio.classList.remove('hidden')
  } else {
    msgVacio.classList.add('hidden')
  }
}

function setProjFilter(estado, boton) {
  filtroProyecto = estado
  document.querySelectorAll('#tab-projects .fpill').forEach(p => p.classList.remove('active'))
  boton.classList.add('active')
  mostrarProyectos()
}

document.getElementById('proj-search').addEventListener('input', function() {
  textoBusquedaProyecto = this.value.toLowerCase()
  mostrarProyectos()
})

function mostrarProyectos() {
  const cards = document.querySelectorAll('.proj-card')
  let visibles = 0

  cards.forEach(card => {
    const pasaEstado = filtroProyecto === 'Todos' || card.dataset.status === filtroProyecto
    const pasaBusqueda = textoBusquedaProyecto === '' || card.dataset.kw.includes(textoBusquedaProyecto)

    if (pasaEstado && pasaBusqueda) {
      card.style.display = ''
      visibles++
    } else {
      card.style.display = 'none'
    }
  })

  const msgVacio = document.getElementById('proj-empty')
  if (visibles === 0) {
    msgVacio.classList.remove('hidden')
  } else {
    msgVacio.classList.add('hidden')
  }
}

function deleteCard(btn) {
  const card = btn.closest('.skill-card, .proj-card')
  card.style.transition = 'opacity 0.2s, transform 0.2s'
  card.style.opacity = '0'
  card.style.transform = 'scale(0.95)'

  setTimeout(() => {
    card.remove()
    mostrarSkills()
    mostrarProyectos()
  }, 200)
}

const iconosPorNombre = {
  'javascript': 'javascript',
  'typescript': 'typescript',
  'react': 'react',
  'vue': 'vuedotjs',
  'vue.js': 'vuedotjs',
  'angular': 'angular',
  'svelte': 'svelte',
  'next.js': 'nextdotjs',
  'nextjs': 'nextdotjs',
  'node.js': 'nodedotjs',
  'nodejs': 'nodedotjs',
  'express': 'express',
  'nestjs': 'nestjs',
  'python': 'python',
  'django': 'django',
  'fastapi': 'fastapi',
  'postgresql': 'postgresql',
  'mysql': 'mysql',
  'mongodb': 'mongodb',
  'redis': 'redis',
  'docker': 'docker',
  'kubernetes': 'kubernetes',
  'git': 'git',
  'github': 'github',
  'linux': 'linux',
  'flutter': 'flutter',
  'dart': 'dart',
  'swift': 'swift',
  'kotlin': 'kotlin',
  'tailwind': 'tailwindcss',
  'graphql': 'graphql',
  'aws': 'amazonaws',
  'firebase': 'firebase',
  'supabase': 'supabase',
  'figma': 'figma',
  'rust': 'rust',
  'go': 'go',
  'java': 'java',
  'php': 'php',
  'laravel': 'laravel'
}

function getIcono(nombre) {
  const slug = iconosPorNombre[nombre.toLowerCase()]

  if (slug) {
    return `<img src="https://cdn.simpleicons.org/${slug}/ffffff" width="26" height="26" alt="${nombre}" />`
  }

  const iniciales = nombre.slice(0, 2).toUpperCase()
  return `<span style="font-size:14px;font-weight:800;color:#fff">${iniciales}</span>`
}

const colorPorCategoria = {
  'Frontend': 'linear-gradient(135deg, #2563eb, #1d4ed8)',
  'Backend': 'linear-gradient(135deg, #059669, #047857)',
  'DevOps': 'linear-gradient(135deg, #d97706, #b45309)',
  'Data': 'linear-gradient(135deg, #7c3aed, #6d28d9)',
  'Mobile': 'linear-gradient(135deg, #db2777, #be185d)'
}

const barraPorCategoria = {
  'Frontend': 'linear-gradient(90deg, #2563eb, #60a5fa)',
  'Backend': 'linear-gradient(90deg, #059669, #34d399)',
  'DevOps': 'linear-gradient(90deg, #d97706, #fcd34d)',
  'Data': 'linear-gradient(90deg, #7c3aed, #a78bfa)',
  'Mobile': 'linear-gradient(90deg, #db2777, #f472b6)'
}

document.getElementById('skill-form').addEventListener('submit', function(e) {
  e.preventDefault()

  const nombre = this.sname.value.trim()
  const categoria = this.scategory.value
  const nivel = parseInt(this.slevel.value)
  const horas = this.shours.value.trim()

  if (nombre === '') return

  const porcentaje = Math.round((nivel / 5) * 100)
  const horasTexto = horas !== '' ? horas + 'h' : '—'

  const nuevaCard = document.createElement('div')
  nuevaCard.className = 'skill-card'
  nuevaCard.dataset.cat = categoria
  nuevaCard.dataset.kw = nombre.toLowerCase() + ' ' + categoria.toLowerCase()

  nuevaCard.innerHTML = `
    <button class="del-btn" onclick="deleteCard(this)">
      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <div class="sc-logo" style="background:${colorPorCategoria[categoria]}">
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
        <div class="sc-bar-fill" style="width:${porcentaje}%;background:${barraPorCategoria[categoria]}"></div>
      </div>
    </div>
  `

  const grid = document.getElementById('skills-grid')
  const msgVacio = document.getElementById('skills-empty')
  grid.insertBefore(nuevaCard, msgVacio)

  this.reset()
  mostrarSkills()
})

const nombreEstado = {
  'active': 'Activo',
  'review': 'En revisión',
  'done': 'Completado',
  'paused': 'Pausado'
}

const coloresProyecto = [
  'linear-gradient(135deg, #2563eb, #1d4ed8)',
  'linear-gradient(135deg, #7c3aed, #6d28d9)',
  'linear-gradient(135deg, #059669, #047857)',
  'linear-gradient(135deg, #d97706, #b45309)',
  'linear-gradient(135deg, #db2777, #be185d)',
  'linear-gradient(135deg, #0369a1, #0284c7)'
]

document.getElementById('proj-form').addEventListener('submit', function(e) {
  e.preventDefault()

  const nombre = this.pname.value.trim()
  const descripcion = this.pdesc.value.trim()
  const stack = this.pstack.value.trim()
  const estado = this.pstatus.value

  if (nombre === '') return

  const indice = Math.floor(Math.random() * coloresProyecto.length)
  const colorElegido = coloresProyecto[indice]
  const iniciales = nombre.slice(0, 2).toUpperCase()
  const etiqueta = nombreEstado[estado]

  const descHtml = descripcion !== '' ? `<p class="proj-desc">${descripcion}</p>` : ''
  const stackHtml = stack !== '' ? `<span class="proj-stack">${stack}</span>` : ''

  const nuevaCard = document.createElement('div')
  nuevaCard.className = 'proj-card'
  nuevaCard.dataset.status = estado
  nuevaCard.dataset.kw = nombre.toLowerCase() + ' ' + descripcion.toLowerCase() + ' ' + stack.toLowerCase()

  nuevaCard.innerHTML = `
    <button class="del-btn" onclick="deleteCard(this)">
      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
    <div class="proj-left">
      <div class="proj-icon" style="background:${colorElegido}">${iniciales}</div>
      <div class="proj-info">
        <p class="proj-name">${nombre}</p>
        ${descHtml}
        ${stackHtml}
      </div>
    </div>
    <div class="proj-right">
      <span class="status-dot ${estado}"></span>
      <span class="status-label ${estado}">${etiqueta}</span>
    </div>
  `

  const grid = document.getElementById('projects-grid')
  const msgVacio = document.getElementById('proj-empty')
  grid.insertBefore(nuevaCard, msgVacio)

  this.reset()
  mostrarProyectos()
})
