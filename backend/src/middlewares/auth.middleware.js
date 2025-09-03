import jwt from "jsonwebtoken";
import User from "../models/User.js";

/**
 * Middleware de protección de rutas
 * Verifica que el usuario esté autenticado mediante JWT
 * Si es válido, agrega el usuario a req.user para uso en los controladores
 */

export const protect = async (req, res, next) => {
    try {
        let token;

        // 1. Verificar si el token viene en el header Authorization
        // El formato esperado es: "Bearer eyJhbGciOiJIUzI1NiIs..."


        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        // 2. Si no hay token, el usuario no está autenticado
        if (!token) {
            return res.status(401).json({
                message: "No autorizado, no hay token"
            });
        }

        // 3. Verificar que el token sea válido y no haya expirado
        // decoded contendrá el payload del token (userId)

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

         // 4. Buscar el usuario en la BD y agregarlo a la request
        // select('-password') excluye la contraseña del resultado
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        // Si el token es inválido o expiró
        res.status(401).json({
            message: "No autorizado, token inválido"
        });
    }
};