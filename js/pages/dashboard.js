const mockData = {
    progress: 68,
    totalProjects: 4,
    totalSkills: 12,
    recentProjects: [
        'Proyecto de Venta',
        'Proyecto de Demiga', 
        'Proyecto de Tecnología Regional'
    ],
    weeklyProgress: [45, 52, 48, 60, 55, 68, 65, 68]
};

export function renderDashboard() {
    return `
        <div class="container mx-auto px-4 py-8">
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h2>
            
            <!-- Cards Grid - Estilo mockup -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                
                <!-- Progreso Total - Card principal con gráfica -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Progreso Total</h3>
                    <div class="flex items-end justify-between mb-4">
                        <div>
                            <span class="text-5xl font-bold text-blue-600">${mockData.progress}%</span>
                        </div>
                        <div class="text-right text-sm text-gray-500 dark:text-gray-400">
                            <p>Proyectos: ${mockData.totalProjects}</p>
                            <p>Habilidades: ${mockData.totalSkills}</p>
                        </div>
                    </div>
                    <!-- Gráfica de línea suave -->
                    <div class="h-32 w-full">
                        <canvas id="progressChart"></canvas>
                    </div>
                </div>

                <!-- Proyectos Recientes -->
                <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Proyectos Recientes</h3>
                    <div class="space-y-3">
                        ${mockData.recentProjects.map(project => `
                            <div class="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer">
                                <div class="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                                <span class="text-gray-700 dark:text-gray-300 font-medium">${project}</span>
                            </div>
                        `).join('')}
                    </div>
                    <button class="mt-4 w-full py-2 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                        Ver todos los proyectos
                    </button>
                </div>
            </div>

            <!-- Stats Cards pequeñas -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
                    <p class="text-sm opacity-80 mb-1">Nivel</p>
                    <p class="text-2xl font-bold">12</p>
                </div>
                <div class="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
                    <p class="text-sm opacity-80 mb-1">Puntos</p>
                    <p class="text-2xl font-bold">3,450</p>
                </div>
                <div class="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
                    <p class="text-sm opacity-80 mb-1">Racha</p>
                    <p class="text-2xl font-bold">8 días</p>
                </div>
                <div class="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
                    <p class="text-sm opacity-80 mb-1">Horas</p>
                    <p class="text-2xl font-bold">156h</p>
                </div>
            </div>
        </div>
    `;
}

export function initDashboardCharts() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;

    const isDark = document.documentElement.classList.contains('dark');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom', 'Hoy'],
            datasets: [{
                data: mockData.weeklyProgress,
                borderColor: '#2563eb',
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 100);
                    gradient.addColorStop(0, 'rgba(37, 99, 235, 0.3)');
                    gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
                    return gradient;
                },
                borderWidth: 3,
                tension: 0.4, // Curva suave
                fill: true,
                pointRadius: 0,
                pointHoverRadius: 4,
                pointHoverBackgroundColor: '#2563eb'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    enabled: true,
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: (context) => `${context.parsed.y}%`
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    grid: { display: false },
                    ticks: {
                        color: isDark ? '#9ca3af' : '#6b7280',
                        font: { size: 10 }
                    }
                },
                y: {
                    display: false,
                    min: 0,
                    max: 100
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });
}

export async function fetchDashboardData() {
    return mockData;
}