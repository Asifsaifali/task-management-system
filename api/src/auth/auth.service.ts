import { comparePassword, hashPassword } from "../utils/hash"
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import prisma from "../utils/prisma";
export async function register(email:string, password: string){
    try {
        const hashed = await hashPassword(password);
        return await prisma.user.create({
            data : {
                email,
                password: hashed
            }
        })
        
    } catch (error) {
        throw error
    }
}

export async function login(email:string, password:string){
    try {
        console.log("Attempting login for:", email);
        const user = await prisma.user.findUnique({
            where: {email},
        })
        if(!user){
            throw new Error("User not found")
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if(!isPasswordValid){
            throw new Error("Invalid password")
        }
        console.log("Login successful for:", user);
        const token = generateAccessToken({id: user.id, email: user.email})
        const refreshToken = generateRefreshToken({id: user.id, email: user.email})
        console.log("Generated token:", token);
        return { token,
                refreshToken,
            user:{
                id: user.id,
                email: user.email
            }
        }
    } catch (error) {
        throw error
    }
}