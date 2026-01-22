import { Router } from "express";
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from "./task.controller";
import { authMiddleware } from "../middleware/auth.middleware";


const router = Router();

router.post('/',authMiddleware, createTask);
router.get('/', authMiddleware, getTasks)
router.get('/:id',authMiddleware, getTaskById);
router.delete('/:id',authMiddleware, deleteTask)
router.patch('/:id', authMiddleware, updateTask);


export default router;
