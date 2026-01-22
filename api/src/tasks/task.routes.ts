import { Router } from "express";
import { createTask, getTasks } from "./task.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.post('/tasks',authMiddleware, createTask);
router.get('/tasks', authMiddleware, getTasks)


export default router;
