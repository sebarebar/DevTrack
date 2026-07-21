import { isAuthenticated } from './utils/auth.js';

// History API SPA router with route params and auth guards.
const routes = [];

// registerRoute('/skills', handler, { protected: true })
export function registerRoute(path, handler, options = {}) {
  const paramNames = [];
  const pattern = path.replace(/:([^/]+)/g, (_, name) => {
    paramNames.push(name);
    return '([^/]+)';
  });
  routes.push({
    regex: new RegExp(`^${pattern}$`),
    paramNames,
    handler,
    isProtected: options.protected === true,  
    guestOnly: options.guestOnly === true,
  });
}

function matchRoute(pathname) {
  for (const route of routes) {
    const match = pathname.match(route.regex);
    if (match) {
      const params = {};
      route.paramNames.forEach((name, i) => {
        params[name] = decodeURIComponent(match[i + 1]);
      });
      return { route, params };
    }
  }
  return null;
}

export function navigateTo(path) {
  if (path === location.pathname) return renderRoute();
  history.pushState({}, '', path);
  renderRoute();
}

async function renderRoute() {
  const app = document.getElementById('app');
  const matched = matchRoute(location.pathname);

  if (!matched) {
    app.innerHTML =
      '<div class="page-loading"><h2 class="section-title">404</h2><p>Página no encontrada.</p></div>';
    return;
  }

  const { route, params } = matched;

  // Guards.
  if (route.isProtected && !isAuthenticated()) {
    return navigateTo('/login');
  }
  if (route.guestOnly && isAuthenticated()) {
    return navigateTo('/dashboard');
  }

  await route.handler(params, app);
}

export function initRouter() {
  // Intercept in-app links marked with data-route.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-route]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;
    event.preventDefault();
    navigateTo(href);
  });

  window.addEventListener('popstate', renderRoute);
  renderRoute();
}
