import { initRouter, registerRoute, navigateTo } from './router.js';
import { renderDashboard, initDashboardCharts } from './pages/dashboard.js';

// ===== MENÚ HAMBURGUESA =====
const menuBtn = document.getElementById('menu-btn');
const closeMenuBtn = document.getElementById('close-menu');
const mobileMenu = document.getElementById('mobile-menu');
const menuOverlay = document.getElementById('menu-overlay');

function openMenu() {
    mobileMenu.classList.remove('menu-closed');
    mobileMenu.classList.add('menu-open');
    menuOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    mobileMenu.classList.remove('menu-open');
    mobileMenu.classList.add('menu-closed');
    menuOverlay.classList.add('hidden');
    document.body.style.overflow = '';
}

menuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ===== TOGGLE TEMA =====
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') html.classList.add('dark');

themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
    // Re-renderizar charts si existen
    setTimeout(() => initDashboardCharts(), 0);
});

// ===== VISTAS =====
const views = {
    home: () => `
        <div class="container mx-auto px-4 py-12 text-center">
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">Bienvenido a devtrack</h2>
            <p class="text-lg text-gray-600 dark:text-gray-400 mb-8">Tu progreso como developer, visualizado.</p>
            <a href="/dashboard" data-route class="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Ver Dashboard
            </a>
        </div>
    `,
    
    // Home como dashboard (acceso directo)
    dashboard: () => {
        setTimeout(() => initDashboardCharts(), 0);
        return renderDashboard();
    },
    
    skills: () => `
        <div class="container mx-auto px-4 py-8">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Mis Skills</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${[
                    {name: 'JavaScript', level: 85, icon: 'JS'},
                    {name: 'React', level: 75, icon: '⚛'},
                    {name: 'Python', level: 70, icon: '🐍'},
                    {name: 'Node.js', level: 80, icon: '⬢'}
                ].map(skill => `
                    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 text-center">
                        <div class="w-16 h-16 mx-auto mb-3 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                            <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">${skill.icon}</span>
                        </div>
                        <h3 class="font-semibold text-gray-900 dark:text-white mb-2">${skill.name}</h3>
                        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${skill.level}%"></div>
                        </div>
                        <span class="text-sm text-gray-600 dark:text-gray-400">${skill.level}%</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `,
    
    projects: () => `
        <div class="container mx-auto px-4 py-8">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Proyectos</h2>
            <div class="space-y-4">
                ${[
                    {name: 'DevTrack App', desc: 'Aplicación de seguimiento de progreso', status: 'En progreso', color: 'blue'},
                    {name: 'API REST', desc: 'Backend con Node.js y Express', status: 'Completado', color: 'green'},
                    {name: 'Portfolio', desc: 'Sitio web personal', status: 'Planificado', color: 'gray'}
                ].map(project => `
                    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center">
                        <div>
                            <h3 class="font-semibold text-gray-900 dark:text-white text-lg">${project.name}</h3>
                            <p class="text-gray-600 dark:text-gray-400 text-sm">${project.desc}</p>
                        </div>
                        <span class="px-3 py-1 rounded-full text-xs font-medium bg-${project.color}-100 text-${project.color}-600 dark:bg-${project.color}-900 dark:text-${project.color}-400">
                            ${project.status}
                        </span>
                    </div>
                `).join('')}
            </div>
        </div>
    `,
    
    profile: () => `
        <div class="container mx-auto px-4 py-8">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Perfil</h2>
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto">
                <div class="flex items-center space-x-6 mb-8">
                    <div class="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                        D
                    </div>
                    <div>
                        <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Developer</h3>
                        <p class="text-gray-500 dark:text-gray-400">Full Stack Developer</p>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-4 text-center">
                    <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p class="text-2xl font-bold text-blue-600">12</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Skills</p>
                    </div>
                    <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p class="text-2xl font-bold text-green-600">5</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Proyectos</p>
                    </div>
                    <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <p class="text-2xl font-bold text-purple-600">156h</p>
                        <p class="text-sm text-gray-600 dark:text-gray-400">Horas</p>
                    </div>
                </div>
            </div>
        </div>
    `
};

// ===== INICIALIZACIÓN =====
function init() {
    registerRoute('/', views.home);
    registerRoute('/dashboard', views.dashboard);
    registerRoute('/skills', views.skills);
    registerRoute('/projects', views.projects);
    registerRoute('/profile', views.profile);
    
    initRouter();
    
    window.navigateTo = navigateTo;
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}