import express from 'express';
import cors from 'cors';


const app = express();
const PORT = 4000;


const startServer = async () => {
    try {

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





