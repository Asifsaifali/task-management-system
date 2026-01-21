import express from 'express';
import cors from 'cors';
import authRoutes from './auth/auth.routes'
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 4000;


const startServer = async () => {
    try {
        app.use(express.json());
        app.use(cookieParser())
        app.use('/v1/auth',authRoutes);
        app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        })
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();





