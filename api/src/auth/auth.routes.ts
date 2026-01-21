import { Router } from "express";
import * as auth from "./auth.service"
import { login } from "./auth.controller"

const router = Router();

router.post('/register', async(req, res)=>{
    try {
        const {email, password} = req.body;
        const user = await auth.register(email,password)
        return res.status(201).json({
            message: "User registered successfully",
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

router.post('/login', login);


export default router;