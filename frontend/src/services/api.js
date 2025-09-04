import axios from 'axios';

// Crear instancia de axios con configuración base
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});
console.log('API URL:', process.env.REACT_APP_API_URL);
console.log('Using baseURL:', api.defaults.baseURL);

// Interceptor para agregar el token a cada petición
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } 
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
