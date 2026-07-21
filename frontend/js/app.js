import { registerRoute, initRouter, navigateTo } from './router.js';
import { isAuthenticated } from './utils/auth.js';
import { renderAuth } from './pages/auth.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderSkills } from './pages/skills.js';
import { renderProjects } from './pages/projects.js';
import { renderOwnProfile, renderPublicProfile } from './pages/profile.js';

// Root: send to dashboard or login depending on session.
registerRoute('/', () => {
  navigateTo(isAuthenticated() ? '/dashboard' : '/login');
});

registerRoute('/login', renderAuth('login'), { guestOnly: true });
registerRoute('/register', renderAuth('register'), { guestOnly: true });

registerRoute('/dashboard', renderDashboard, { protected: true });
registerRoute('/skills', renderSkills, { protected: true });
registerRoute('/projects', renderProjects, { protected: true });
registerRoute('/profile', renderOwnProfile, { protected: true });

// Public dev card (no auth required).
registerRoute('/profile/:username', renderPublicProfile);

// Restore the original deep-link after a GitHub Pages 404.html fallback.
const redirect = sessionStorage.getItem('spa-redirect');
if (redirect) {
  sessionStorage.removeItem('spa-redirect');
  history.replaceState({}, '', redirect);
}

initRouter();
