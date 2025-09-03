// Importaciones necesarias para el servidor
import express from "express"
import connectDB from "./config/database.js";
import dotenv from "dotenv"
import cors from "cors";

// Importación de rutas
import authRoutes from './routes/auth.routes.js';
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

// Crear la aplicación Express
const app = express();

// Middlewares globales
app.use(cors()); // Permite peticiones desde otros dominios (importante para el frontend)
app.use(express.json()); // Permite recibir JSON en el body de las peticiones
app.use(express.urlencoded({ extended: true })); // Permite recibir datos de formularios


dotenv.config(); // Cargar variables de entorno desde .env

// Puerto del servidor (usa el del .env o 7000 por defecto)
const PORT = process.env.PORT || 7000;

// Ruta de prueba - verificar que el servidor funciona
app.get("/", (req, res) => {
    res.json({message: "API funcionando."})
});

// Rutas de la aplicación
app.use('/api/auth', authRoutes); // Rutas de autenticación (login, registro)
app.use('/api/users', userRoutes); // Rutas de usuario (perfil)
app.use('/api/tasks', taskRoutes); // Rutas de tareas (CRUD)

// Función para iniciar el servidor
const startServer = async () => {
    try {
         // Primero conectar a la base de datos
        await connectDB();

        // Si la conexión es exitosa, iniciar el servidor
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto: ${PORT}`);
        });
    } catch (error) {
        // Si hay error, mostrar y no iniciar el servidor
        console.error(error);
    }
}

// Iniciar la aplicación
startServer();



