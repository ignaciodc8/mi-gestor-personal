import express from "express"
import connectDB from "./config/database.js";
import dotenv from "dotenv"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 7000;
const MONGODBURI = process.env.MONGODB_URI

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

app.get("/", (req, res) => {
    res.json({message: "API funcionando."})
});

startServer();



