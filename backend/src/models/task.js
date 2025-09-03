import mongoose from "mongoose";
/**
 * Esquema de Tarea
 * Cada tarea pertenece a un usuario específico
 */

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Tipo especial para IDs de MongoDB
        required: true,
        ref: 'User' // Referencia al modelo User (relación)
    },
    title: {
        type: String,
        required: [true, 'El título es obligatorio'], // Mensaje de error personalizado
        trim: true       // Elimina espacios al inicio y final
    },
    description: {
        type: String,
        default: ''     // Si no se proporciona, será string vacío
    },
    completed: {
        type: Boolean,
        default: false // Las tareas empiezan como no completadas
    },
    dueDate: {
        type: Date,
        default: null // Fecha límite opcional
    }
}, {
    timestamps: true // Agrega createdAt y updatedAt automáticamente
});

const Task = mongoose.model('Task', taskSchema);

export default Task;