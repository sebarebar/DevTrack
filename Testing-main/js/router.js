// ============================================================
// router.js — decide qué pantalla mostrar
// Router mega simple basado en el hash de la URL:
//   #/          -> login/registro
// ============================================================

import { renderAuth } from "./auth.js";

// Contenedor donde inyectamos cada pantalla
const app = document.querySelector("#app");

// Renderiza el login siempre
function render() {
  app.innerHTML = "";
  renderAuth(app);
}

// Primer render
render();

// Helper global para navegar (lo usan los módulos que lo importen)
export function navigateTo(hash) {
  window.location.hash = hash;
}
