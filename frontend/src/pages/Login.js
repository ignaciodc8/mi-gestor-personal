import React, {useState} from "react";
import {useAuth} from '../context/AuthContext.js';
import './Auth.css';
import {useNavigate} from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {login, error} = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const result = await login(email, password);

        if(result.success) {
            // El AuthContext se encargará de la redirección
            console.log('Login exitoso');
            console.log('Intentando navegar a /');
            navigate('/');
            console.log('Navigate ejecutado');
            
        }
    
    setIsLoading(false);
    }

return (
    <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Iniciar Sesión</h2>

            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="tu@email.com"
                    />
            </div>

            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Tu contraseña"
                />
            </div>
            <button type="submit" disabled={isLoading}>
                {isLoading ? 'Ingresando...' : 'Ingresar'}
            </button>
            <p className="auth-link">
                ¿No tienes cuenta? <Link to="/register">Registrate aquí</Link>
            </p>
        </form>
    </div>
);
};

export default Login;