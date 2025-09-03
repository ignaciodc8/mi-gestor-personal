import mongoose from "mongoose"

/**
 * Esquema de Usuario para MongoDB
 * Define la estructura y validaciones de los documentos de usuario
 */
const userSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true,  // Campo obligatorio
        unique: true     // No puede haber dos usuarios con el mismo email
    },
    password: {
        type: String, 
        required: true  // La contraseña se guarda encriptada
    },
    name: {
        type: String, 
        required: true
    },
    createdAt: {
        type: Date, 
        default: Date.now // Se establece automáticamente al crear
    }
});

// Crear el modelo a partir del esquema
// 'User' es el nombre del modelo, mongoose creará la colección 'users'
const User = mongoose.model("User", userSchema);

export default User;