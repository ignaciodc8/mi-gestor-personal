import mongoose from "mongoose"

/**
 * Función para conectar a MongoDB
 * Usa la URI de conexión desde las variables de entorno
 * Si falla, detiene todo el proceso
 */
const connectDB = async () => {
try {
    // Intenta conectar a MongoDB usando la URI del .env
    const conn = await mongoose.connect(process.env.MONGODB_URI);

        // Si tiene éxito, muestra el host al que se conectó
        console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
        // Si falla, muestra el error
    console.error(`Error: ${error.message}`);

    // process.exit(1) detiene Node.js con código de error
    // Esto previene que el servidor funcione sin base de datos
    process.exit(1);
    }
}

export default connectDB;