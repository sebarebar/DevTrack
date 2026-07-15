const API_BASE_URL = 'http://localhost:3000/api';

export async function apiFetch(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers
        },
        ...options
    };
    
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (config.body && typeof config.body === 'object') {
        config.body = JSON.stringify(config.body);
    }
    
    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: 'Error desconocido' }));
            throw new Error(error.message || `Error ${response.status}`);
        }
        
        if (response.status === 204) return null;
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

export const api = {
    get: (endpoint) => apiFetch(endpoint, { method: 'GET' }),
    post: (endpoint, body) => apiFetch(endpoint, { method: 'POST', body }),
    put: (endpoint, body) => apiFetch(endpoint, { method: 'PUT', body }),
    patch: (endpoint, body) => apiFetch(endpoint, { method: 'PATCH', body }),
    delete: (endpoint) => apiFetch(endpoint, { method: 'DELETE' })
};