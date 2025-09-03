import React, {createContext, useState, useContext, useEffect} from 'react';
import api from '../services/api.js';

// Crear el contexto
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

// Provider que envuelve la app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');


 // Verificar si hay token al cargar la app
useEffect(() => {
    
    const token = localStorage.getItem('token');
    
    if (token) {

        // Verificar si el token es válido
        api.get('/users/profile')
        .then(response => {
            setUser(response.data.user);
        })
        .catch(() => {
            localStorage.removeItem('token');
        })
        .finally(() => {
            setLoading(false);
        });
    } else {
        setLoading(false);
    }
}, []);

// Función de login
const login = async (email, password) => {
    try {
        setError('');
        const response = await api.post('auth/login', {email, password});
        const {token, user} = response.data;

        localStorage.setItem('token', token);
        console.log('Token guardado:', token);
        setUser(user);
        console.log('Usuario establecido:', user);
        return {success: true};

    } catch(error) {
        const message = error.response?.data?.message || 'Error al iniciar sesión';
        setError(message);
        return {success: false, message};
    }
};

// Función de registro
const register = async (name, email, password) => {
    try {
        setError('');
        const response = await api.post('auth/register', {name, email, password});
        console.log('Usuario creado: ', response.data);
        return {success: true, message: 'Usuario registrado exitosamente'};
    } catch (error) {
        const message = error.response?.data?.message || 'Error al registrar';
        setError(message);
        return {success: false, message};
    }
};

const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
};

const value = {
    user,
    login,
    register,
    logout,
    loading,
    error
};

return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
);
};
