import { Request, Response } from "express";
import type { CookieOptions } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import User from "../models/User.js";

const authSchema = z.object({
  name: z.string().min(2).max(60).optional(),
  email: z.string().email(),
  password: z.string().min(6),
});

function createToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });
}

function getCookieOptions(): CookieOptions {
  const isProduction = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
}

function formatUser(user: { _id: string; name: string; email: string; image?: string }) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    image: user.image ?? "",
  };
}

function sendAuthResponse(
  res: Response,
  statusCode: number,
  user: { _id: string; name: string; email: string; image?: string },
) {
  const token = createToken(user._id);
  res.cookie("mini_healthcare_token", token, getCookieOptions());

  return res.status(statusCode).json({
    user: formatUser(user),
  });
}

export async function signup(req: Request, res: Response) {
  const parsed = authSchema.safeParse(req.body);

  if (!parsed.success || !parsed.data.name) {
    return res.status(400).json({ message: "Please provide a valid name, email, and password." });
  }

  const { name, email, password } = parsed.data;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "An account already exists with this email." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    image: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(name)}`,
  });

  return sendAuthResponse(res, 201, {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image,
  });
}

export async function login(req: Request, res: Response) {
  const parsed = authSchema.pick({ email: true, password: true }).safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Please provide a valid email and password." });
  }

  const { email, password } = parsed.data;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  return sendAuthResponse(res, 200, {
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    image: user.image,
  });
}

export async function getCurrentUser(req: Request, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized." });
  }

  return res.status(200).json({
    user: formatUser({
      _id: req.user._id.toString(),
      name: req.user.name,
      email: req.user.email,
      image: req.user.image,
    }),
  });
}

export async function logout(_req: Request, res: Response) {
  res.clearCookie("mini_healthcare_token", {
    ...getCookieOptions(),
    maxAge: undefined,
  });

  return res.status(200).json({ message: "Logged out successfully." });
}
