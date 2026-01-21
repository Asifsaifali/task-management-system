import { Router } from "express";
import { login, Register, refreshToken, logout } from "./auth.controller"

const router = Router();

router.post('/register', Register)
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router;