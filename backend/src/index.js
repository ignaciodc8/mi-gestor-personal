import express from "express"
import connectDB from "./config/database.js";
import dotenv from "dotenv"
import cors from "cors";
import authRoutes from './routes/auth.routes.js';
import userRoutes from "./routes/user.routes.js";
import taskRoutes from "./routes/task.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;

app.get("/", (req, res) => {
    res.json({message: "API funcionando."})
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto: ${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
}

// Debug: mostrar todas las rutas
console.log("Rutas configuradas:");
console.log("- /");
console.log("- /api/auth");
console.log("- /api/users");
console.log("- /api/tasks");

startServer();



