import { Router } from "express";
import * as auth from "./auth.service"


async function login(req:any, res:any) {
    try {
        const { email, password } = req.body;
        const user = await auth.login(email, password);

        return res.status(200).json({
            message: "Login successful",
            ...user
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export { login };