import jwt from "jsonwebtoken"

/**
 * Genera un token JWT para un usuario
 * @param {string} userId - ID del usuario para incluir en el token
 * @returns {string} Token JWT firmado
 */
const generateToken = (userId) => {
    return jwt.sign (
        { userId },     // Payload: datos que incluye el token
        process.env.JWT_SECRET,     // Clave secreta para firmar
        { expiresIn: '30d' }    // El token expira en 30 días
    );
};

export default generateToken;