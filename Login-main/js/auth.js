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

        <div class="relative flex items-center z-10">
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

  const botones = contenedor.querySelectorAll("[data-modo]");
  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", function() {
      const nuevoModo = this.getAttribute("data-modo");
      if (nuevoModo === modoActual) return;
      modoActual = nuevoModo;
      actualizarToggle();
      mostrarFormulario();
    });
  }
}

function actualizarToggle() {
  const pildora = document.getElementById("toggle-pill");
  const botones = document.querySelectorAll("[data-modo]");

  if (modoActual === "login") {
    pildora.style.transform = "translateX(0)";
  } else {
    pildora.style.transform = "translateX(100%)";
  }

  for (let i = 0; i < botones.length; i++) {
    if (botones[i].getAttribute("data-modo") === modoActual) {
      botones[i].style.color = "#ffffff";
    } else {
      botones[i].style.color = "#94a3b8";
    }
  }
}

function mostrarFormulario() {
  const contenedor = document.getElementById("form-container");

  let titulo = "";
  let subtitulo = "";
  let campoNombre = "";
  let campoConfirmar = "";
  let textoBoton = "";
  let delayBoton = "";

  if (modoActual === "login") {
    titulo = "Bienvenido de vuelta";
    subtitulo = "Ingresa tus datos para continuar.";
    textoBoton = "Iniciar sesión";
    delayBoton = "200ms";
  } else {
    titulo = "Crea tu cuenta";
    subtitulo = "Empieza a registrar tu progreso hoy.";
    campoNombre = crearCampo("name", "Nombre", "text", "Tu nombre", 1);
    campoConfirmar = crearCampo("confirm", "Confirmar contraseña", "password", "Repite tu contraseña", 4);
    textoBoton = "Crear cuenta";
    delayBoton = "300ms";
  }

  const campoEmail = crearCampo("email", "Email", "email", "tucorreo@ejemplo.com", modoActual === "register" ? 2 : 1);
  const campoPassword = crearCampo("password", "Contraseña", "password", "Mínimo 8 caracteres", modoActual === "register" ? 3 : 2);

  contenedor.innerHTML = `
    <div class="mb-6">
      <h2 class="text-2xl font-bold fade-in-up" style="color:#0F172A;">${titulo}</h2>
      <p class="text-sm mt-1 fade-in-up" style="color:#64748b; animation-delay:60ms">${subtitulo}</p>
    </div>

    <form id="auth-form" class="space-y-5" novalidate>
      ${campoNombre}
      ${campoEmail}
      ${campoPassword}
      ${campoConfirmar}

      <p id="form-error" class="text-sm text-red-400 hidden"></p>

      <button type="submit" id="submit-btn"
              class="btn-primary w-full flex items-center justify-center gap-2 fade-in-up"
              style="animation-delay:${delayBoton}">
        <span id="btn-label">${textoBoton}</span>
      </button>
    </form>
  `;

  document.getElementById("auth-form").addEventListener("submit", enviarFormulario);
}

function crearCampo(nombre, etiqueta, tipo, placeholder, orden) {
  const delay = orden * 80;
  return `
    <div class="fade-in-up" style="animation-delay:${delay}ms">
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

function validarCampos(nombre, email, password, confirmar) {
  const errores = {};

  if (modoActual === "register") {
    if (nombre === "") {
      errores.name = "El nombre es obligatorio";
    }
  }

  if (email === "") {
    errores.email = "El email es obligatorio";
  } else if (!emailRegex.test(email)) {
    errores.email = "Formato de email inválido";
  }

  if (password === "") {
    errores.password = "La contraseña es obligatoria";
  } else if (password.length < 8) {
    errores.password = "Mínimo 8 caracteres";
  }

  if (modoActual === "register") {
    if (confirmar === "") {
      errores.confirm = "Confirma tu contraseña";
    } else if (confirmar !== password) {
      errores.confirm = "Las contraseñas no coinciden";
    }
  }

  return errores;
}

function mostrarErrores(errores) {
  const elementos = document.querySelectorAll("[data-error-for]");

  for (let i = 0; i < elementos.length; i++) {
    const campo = elementos[i].getAttribute("data-error-for");
    const mensaje = errores[campo];

    if (mensaje) {
      elementos[i].textContent = mensaje;
      elementos[i].classList.remove("hidden");
      const input = document.querySelector('input[name="' + campo + '"]');
      input.classList.remove("shake");
      void input.offsetWidth;
      input.classList.add("shake");
    } else {
      elementos[i].classList.add("hidden");
    }
  }
}

function enviarFormulario(evento) {
  evento.preventDefault();

  let nombre = "";
  let confirmar = "";

  if (document.querySelector('input[name="name"]')) {
    nombre = document.querySelector('input[name="name"]').value;
  }

  const email = document.querySelector('input[name="email"]').value;
  const password = document.querySelector('input[name="password"]').value;

  if (document.querySelector('input[name="confirm"]')) {
    confirmar = document.querySelector('input[name="confirm"]').value;
  }

  const errores = validarCampos(nombre, email, password, confirmar);
  mostrarErrores(errores);

  const cantidadErrores = Object.keys(errores).length;
  if (cantidadErrores > 0) return;

  const boton = document.getElementById("submit-btn");
  const etiqueta = document.getElementById("btn-label");
  const textoOriginal = etiqueta.textContent;

  boton.disabled = true;
  etiqueta.innerHTML = '<span class="spinner"></span> Enviando...';

  setTimeout(function() {
    const token = "fake-jwt-" + Date.now();
    localStorage.setItem("devtrack_token", token);
  }, 700);

  boton.addEventListener("error", function() {
    const cajError = document.getElementById("form-error");
    cajError.textContent = "Algo salió mal";
    cajError.classList.remove("hidden");
    boton.disabled = false;
    etiqueta.textContent = textoOriginal;
  });
}
