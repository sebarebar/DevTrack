const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let modoActual = "login";

export function renderAuth(contenedor) {
  contenedor.innerHTML = `
    <div class="min-h-screen flex flex-col md:flex-row">

      <aside class="relative overflow-hidden md:w-[55%] md:min-h-screen
                    flex flex-col justify-between p-6 md:py-14 md:px-24
                    border-b md:border-b-0 md:border-r"
            style="background-color:#0F172A; border-color:#1e3a5f;">

        <div class="absolute inset-0 grid-bg opacity-100"></div>

        <div class="absolute top-0 right-0 w-72 h-72 pointer-events-none"
             style="background:radial-gradient(circle at top right, rgba(37,99,235,0.18), transparent 70%);"></div>

        <div class="relative flex items-center gap-3 z-10">
          <svg width="52" height="34" viewBox="0 0 52 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 4 C7 4 6 5 6 8 L6 12 C6 14 5 15 3 15 C5 15 6 16 6 18 L6 22 C6 25 7 26 10 26"
                  stroke="#2563EB" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M19 4 C22 4 23 5 23 8 L23 12 C23 14 24 15 26 15 C24 15 23 16 23 18 L23 22 C23 25 22 26 19 26"
                  stroke="#2563EB" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <line x1="30" y1="12" x2="49" y2="12" stroke="#2563EB" stroke-width="2.2" stroke-linecap="round"/>
            <line x1="30" y1="17" x2="46" y2="17" stroke="#2563EB" stroke-width="2.2" stroke-linecap="round"/>
            <line x1="30" y1="22" x2="41" y2="22" stroke="#2563EB" stroke-width="2.2" stroke-linecap="round"/>
          </svg>
          <span class="font-bold text-xl tracking-tight" style="color:#ffffff;">devtrack</span>
        </div>

        <div class="relative z-10 hidden md:flex md:flex-col md:justify-center md:flex-1 py-12 px-8">
          <h1 class="text-5xl lg:text-6xl font-bold tracking-tight leading-tight" style="color:#ffffff;">
            Tu progreso<br/>
            como <span style="color:#2563EB;">developer</span>,<br/>
            visualizado.
          </h1>
          <p class="mt-5 max-w-md text-base leading-relaxed" style="color:#94a3b8;">
            Registra skills, proyectos y horas de estudio.
            Consigue badges. Mira cómo creces.
          </p>

          <div class="mt-10 max-w-sm">
            <div class="flex justify-between text-xs mb-2" style="color:#94a3b8;">
              <span>JavaScript · Nivel 3</span>
              <span>72%</span>
            </div>
            <div class="h-2 rounded-full overflow-hidden" style="background:rgba(255,255,255,0.08);">
              <div class="progress-fill h-full rounded-full"></div>
            </div>
          </div>
        </div>

      </aside>

      <section class="md:w-[45%] flex items-center justify-center p-6 md:p-14"
               style="background-color:#f1f5f9;">
        <div class="w-full max-w-lg bg-white rounded-2xl shadow-lg p-10">

          <div class="relative rounded-full p-1 flex mb-8 border"
               style="background:#f1f5f9; border-color:#e2e8f0;">
            <div id="toggle-pill"
                 class="toggle-pill absolute top-1 bottom-1 left-1
                        w-[calc(50%-4px)] rounded-full"
                 style="background:#2563EB; box-shadow:0 2px 12px rgba(37,99,235,0.3);"></div>
            <button data-modo="login"
                    class="relative flex-1 py-2 text-sm font-semibold z-10"
                    style="color:#ffffff;">
              Login
            </button>
            <button data-modo="register"
                    class="relative flex-1 py-2 text-sm font-medium z-10"
                    style="color:#94a3b8;">
              Registro
            </button>
          </div>

          <div id="form-container"></div>
        </div>
      </section>

    </div>
  `;

  mostrarFormulario();

  contenedor.querySelectorAll("[data-modo]").forEach(function(boton) {
    boton.addEventListener("click", function() {
      let nuevoModo = boton.getAttribute("data-modo");
      if (nuevoModo === modoActual) return;
      modoActual = nuevoModo;
      actualizarToggle();
      mostrarFormulario();
    });
  });
}

function actualizarToggle() {
  let pildora = document.querySelector("#toggle-pill");
  let botones = document.querySelectorAll("[data-modo]");

  if (modoActual === "login") {
    pildora.style.transform = "translateX(0)";
  } else {
    pildora.style.transform = "translateX(100%)";
  }

  botones.forEach(function(boton) {
    if (boton.getAttribute("data-modo") === modoActual) {
      boton.style.color = "#ffffff";
    } else {
      boton.style.color = "#94a3b8";
    }
  });
}

function mostrarFormulario() {
  let contenedor = document.querySelector("#form-container");

  let titulo = modoActual === "login" ? "Bienvenido de vuelta" : "Crea tu cuenta";
  let subtitulo = modoActual === "login" ? "Ingresa tus datos para continuar." : "Empieza a registrar tu progreso hoy.";

  let campoNombre = modoActual === "register" ? crearCampo("name", "Nombre", "text", "Tu nombre", 1) : "";
  let campoConfirmar = modoActual === "register" ? crearCampo("confirm", "Confirmar contraseña", "password", "Repite tu contraseña", 4) : "";

  contenedor.innerHTML = `
    <div class="mb-6">
      <h2 class="text-2xl font-bold fade-in-up" style="color:#0F172A;">${titulo}</h2>
      <p class="text-sm mt-1 fade-in-up" style="color:#64748b; animation-delay:60ms">${subtitulo}</p>
    </div>

    <form id="auth-form" class="space-y-5" novalidate>
      ${campoNombre}
      ${crearCampo("email", "Email", "email", "tucorreo@ejemplo.com", modoActual === "register" ? 2 : 1)}
      ${crearCampo("password", "Contraseña", "password", "Mínimo 8 caracteres", modoActual === "register" ? 3 : 2)}
      ${campoConfirmar}

      <p id="form-error" class="text-sm text-red-400 hidden"></p>

      <button type="submit" id="submit-btn"
              class="btn-primary w-full flex items-center justify-center gap-2 fade-in-up"
              style="animation-delay:${modoActual === "register" ? 300 : 200}ms">
        <span id="btn-label">
          ${modoActual === "login" ? "Iniciar sesión" : "Crear cuenta"}
        </span>
      </button>
    </form>
  `;

  document.querySelector("#auth-form").addEventListener("submit", enviarFormulario);
}

function crearCampo(nombre, etiqueta, tipo, placeholder, orden) {
  return `
    <div class="fade-in-up" style="animation-delay:${orden * 80}ms">
      <label class="block text-xs font-medium mb-1" style="color:#64748b;">
        ${etiqueta}
      </label>
      <input
        name="${nombre}"
        type="${tipo}"
        placeholder="${placeholder}"
        class="input-line"
        autocomplete="off"
      />
      <p class="text-xs text-red-400 mt-1 hidden" data-error-for="${nombre}"></p>
    </div>
  `;
}

function validarCampos(datos) {
  let errores = {};

  if (modoActual === "register" && !datos.name?.trim()) {
    errores.name = "El nombre es obligatorio";
  }

  if (!datos.email?.trim()) {
    errores.email = "El email es obligatorio";
  } else if (!emailRegex.test(datos.email)) {
    errores.email = "Formato de email inválido";
  }

  if (!datos.password) {
    errores.password = "La contraseña es obligatoria";
  } else if (datos.password.length < 8) {
    errores.password = "Mínimo 8 caracteres";
  }

  if (modoActual === "register") {
    if (!datos.confirm) {
      errores.confirm = "Confirma tu contraseña";
    } else if (datos.confirm !== datos.password) {
      errores.confirm = "Las contraseñas no coinciden";
    }
  }

  return errores;
}

function mostrarErrores(errores) {
  document.querySelectorAll("[data-error-for]").forEach(function(elemento) {
    let campo = elemento.getAttribute("data-error-for");
    let mensaje = errores[campo];

    if (mensaje) {
      elemento.textContent = mensaje;
      elemento.classList.remove("hidden");
      let input = document.querySelector(`input[name="${campo}"]`);
      input.classList.remove("shake");
      void input.offsetWidth;
      input.classList.add("shake");
    } else {
      elemento.classList.add("hidden");
    }
  });
}

async function enviarFormulario(evento) {
  evento.preventDefault();

  let formulario = evento.target;
  let datos = Object.fromEntries(new FormData(formulario));

  let errores = validarCampos(datos);
  mostrarErrores(errores);
  if (Object.keys(errores).length > 0) return;

  let boton = document.querySelector("#submit-btn");
  let etiqueta = document.querySelector("#btn-label");
  let textoOriginal = etiqueta.textContent;

  boton.disabled = true;
  etiqueta.innerHTML = `<span class="spinner"></span> Enviando...`;

  try {
    let respuesta = await llamarApi(datos);
    localStorage.setItem("devtrack_token", respuesta.token);
    console.log("login exitoso");
  } catch (error) {
    let cajError = document.querySelector("#form-error");
    cajError.textContent = error.message || "Algo salió mal";
    cajError.classList.remove("hidden");
    boton.disabled = false;
    etiqueta.textContent = textoOriginal;
  }
}

async function llamarApi(datos) {
  let url = modoActual === "login" ? "/api/auth/login" : "/api/auth/register";

  await new Promise(function(resolve) { setTimeout(resolve, 700); });
  return { token: "fake-jwt-" + Date.now() };
}
