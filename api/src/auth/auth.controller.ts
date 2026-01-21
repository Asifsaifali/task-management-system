import * as auth from "./auth.service"
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../utils/prisma";


//Refresh Token Controller

const refreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({ message: "Refresh token missing" });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!
    ) as { userId: string };

    const storedToken = await prisma.refreshToken.findUnique({
      where: { token }
    });

    if (!storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { userId: payload.userId },
      process.env.JWT_ACCESS_SECRET!,
      { expiresIn: "15m" }
    );

    return res.json({ accessToken: newAccessToken });

  } catch {
    return res.status(403).json({ message: "Refresh token expired" });
  }
};

//Register Controller

async function Register(req:Request, res:Response) {
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
}




//Login Controller
async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const { token, refreshToken, user } =
      await auth.login(email, password);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Login failed"
    });
  }
}



//Logout Controller

 const logout = async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (token) {
    await prisma.refreshToken.deleteMany({
      where: { token }
    });
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict"
  });

  return res.status(200).json({ message: "Logged out successfully" });
};


export { login, logout, refreshToken, Register };