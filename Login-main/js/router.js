import { renderAuth } from "./auth.js";

var app = document.getElementById("app");

function render() {
  app.innerHTML = "";
  renderAuth(app);
}

render();

export function navigateTo(hash) {
  window.location.hash = hash;
}
