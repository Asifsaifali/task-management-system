import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  console.log("TOKEN:", token);
  try {
    const payload = verifyAccessToken(token);
    console.log("PAYLOAD:", payload);
    req.user = { userId: payload.id };

    next();
  } catch (err: any) {
    console.error("JWT ERROR:", err.message);
    return res.status(401).json({ message: err.message });
  }
};
