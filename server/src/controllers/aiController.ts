import { Request, Response } from "express";
import { z } from "zod";
import { generateHealthAdvice } from "../config/gemini.js";

const adviceSchema = z.object({
  message: z.string().min(10).max(1500),
  role: z.enum(["Patient", "Volunteer"]),
});

export async function getAdvice(req: Request, res: Response) {
  const parsed = adviceSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Please provide a valid message and role." });
  }

  const advice = await generateHealthAdvice(parsed.data.message, parsed.data.role);
  return res.status(200).json({ advice });
}
