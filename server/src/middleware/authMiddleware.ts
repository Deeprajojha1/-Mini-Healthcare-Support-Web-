import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

interface JwtPayload {
  id: string;
}

export async function protect(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.mini_healthcare_token;

  if (!token) {
    return res.status(401).json({ message: "Not authorized. Missing token." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token verification failed." });
  }
}
