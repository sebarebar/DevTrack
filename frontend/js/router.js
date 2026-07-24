import { isAuthenticated } from './utils/auth.js';

// History API SPA router with route params and auth guards.
const routes = [];

// Detect base path: empty for local dev, /repo-name for GitHub Pages
function detectBasePath() {
  if (location.hostname.indexOf('github.io') !== -1) {
    var parts = location.pathname.split('/');
    return '/' + parts[1];
  }
  return '';
}
const BASE_PATH = detectBasePath();


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


function getAppPath() {
  const pathname = location.pathname;

  if (pathname.startsWith(BASE_PATH)) {
    return pathname.slice(BASE_PATH.length) || '/';
  }

  return pathname;
}


export function navigateTo(path) {
  const fullPath = `${BASE_PATH}${path}`;

  if (fullPath === location.pathname) {
    return renderRoute();
  }

  history.pushState({}, '', fullPath);
  renderRoute();
}


async function renderRoute() {
  const app = document.getElementById('app');

  const pathname = getAppPath();

  const matched = matchRoute(pathname);

  if (!matched) {
    app.innerHTML = `
      <div class="page-loading">
        <h2 class="section-title">404</h2>
        <p>Route not found.</p>
      </div>
    `;
    return;
  }


  const { route, params } = matched;


  // Protected routes
  if (route.isProtected && !isAuthenticated()) {
    return navigateTo('/login');
  }


  // Guest only routes
  if (route.guestOnly && isAuthenticated()) {
    return navigateTo('/dashboard');
  }


  await route.handler(params, app);
}


export function initRouter() {

  // Intercept SPA links
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