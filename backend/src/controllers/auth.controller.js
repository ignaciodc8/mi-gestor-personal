import bcrypt from "bcryptjs";
import User from "../models/User.js"
import generateToken from "../utils/generateToken.js";

/**
 * Registrar nuevo usuario
 * @route   POST /api/auth/register
 * @access  Public
 * @body    {name, email, password}
 */


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

            // Validación: todos los campos son requeridos
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            })
        }
        const existingUser = await User.findOne({email});

            // Verificar si el email ya está registrado
        if (existingUser) {
            return res.status(400).json({
                message: "El email ya está registrado"
            })
        }
         
            // Encriptar contraseña antes de guardar
            // El "10" es el salt rounds (nivel de seguridad)
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);

            // Crear nuevo usuario con la contraseña encriptada
            const newUser = new User ({
                name,
                email,
                password: hashedPassword
            });
        

            // Guardar en la base de datos
            const savedUser = await newUser.save();

            // Responder con los datos del usuario (sin la contraseña)
            res.status(201).json({
                message: "Usuario registrado exitosamente",
                user: {
                    _id: savedUser._id,
                    name: savedUser.name,
                    email: savedUser.email,
                    createdAt: savedUser.createdAt
                }
            });

    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        };
        const user = await User.findOne({email})
        if (!user) {
            return res.status(401).json({
                message: "Credenciales inválidas"
            });
        };
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Credenciales inválidas"
            });
        };
        res.json({
            message: "Login exitoso",
            token: generateToken(user._id),
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Error en el servidor",
            error: error.message
        });
    }
}