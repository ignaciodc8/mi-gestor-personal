import bcrypt from "bcryptjs";
import User from "../models/User.js"

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            })
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                message: "El email ya está registrado"
            })
        }
         
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = new User ({
                name,
                email,
                password: hashedPassword
            });
        
            const savedUser = await newUser.save();

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

export const login = (req, res) => {
    res.json({ message: "Login - Por implementar"});
};