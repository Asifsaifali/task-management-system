import express from 'express';
import cors from 'cors';
import authRoutes from './auth/auth.routes'
import cookieParser from 'cookie-parser';
import taskRoute from './tasks/task.routes'


const app = express();
const PORT = 4000;

 app.use(cors({
            origin: 'http://localhost:3000',
            credentials: true,
        }));

const startServer = async () => {
    try {
        app.use(express.json());
        app.use(cookieParser())
        app.use('/api/v1/auth',authRoutes);
        app.use('/api/v1/tasks',taskRoute);
       
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        })
    } catch (error) {
        console.error("Error starting server:", error);
    }
}

startServer();





