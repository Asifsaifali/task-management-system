import { Router } from "express";
import { createTask, deleteTask, getTaskById, getTasks, toggleTaskCompletion, updateTask } from "./task.controller";
import { authMiddleware } from "../middleware/auth.middleware";


const router = Router();

router.post('/',authMiddleware, createTask);
router.get('/', authMiddleware, getTasks)
router.get('/:id',authMiddleware, getTaskById);
router.delete('/:id',authMiddleware, deleteTask)
router.patch('/:id', authMiddleware, updateTask);
router.patch('/:id/toggle', authMiddleware, toggleTaskCompletion);


export default router;
