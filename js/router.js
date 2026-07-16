const routes = {};

export function registerRoute(path, handler) {
    routes[path] = handler;
}

function matchRoute(path) {
    if (routes[path]) {
        return { handler: routes[path], params: {} };
    }
    
    for (const routePath in routes) {
        if (routePath.includes(':')) {
            const regex = new RegExp('^' + routePath.replace(/:[^/]+/g, '([^/]+)') + '$');
            const match = path.match(regex);
            if (match) {
                const paramNames = routePath.match(/:([^/]+)/g).map(p => p.slice(1));
                const params = {};
                paramNames.forEach((name, i) => {
                    params[name] = match[i + 1];
                });
                return { handler: routes[routePath], params };
            }
        }
    }
    
    return null;
}

export function navigateTo(path) {
    history.pushState({}, '', path);
    renderRoute(path);
}

function renderRoute(path) {
    const main = document.getElementById('main-content');
    const route = matchRoute(path);
    
    if (route) {
        main.innerHTML = route.handler(route.params);
    } else {
        main.innerHTML = '<div class="text-center py-12"><h2 class="text-2xl font-bold text-gray-900 dark:text-white">404</h2><p class="text-gray-600 dark:text-gray-400">Página no encontrada</p></div>';
    }
}

export function initRouter() {
    document.addEventListener('click', (e) => {
        if (e.target.matches('[data-route]')) {
            e.preventDefault();
            navigateTo(e.target.getAttribute('href'));
        }
    });
    
    window.addEventListener('popstate', () => {
        renderRoute(window.location.pathname);
    });
    
    renderRoute(window.location.pathname);
}