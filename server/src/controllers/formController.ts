import { Request, Response } from "express";
import { z } from "zod";
import Form from "../models/Form.js";

const formSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(1500),
  role: z.enum(["Patient", "Volunteer"]),
  aiAdvice: z.string().max(3000).optional(),
});

export async function submitForm(req: Request, res: Response) {
  const parsed = formSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Please provide valid form details." });
  }

  const form = await Form.create({
    ...parsed.data,
    email: req.user?.email ?? parsed.data.email,
    aiAdvice: parsed.data.aiAdvice ?? "",
  });
  return res.status(201).json({ form });
}

export async function getLatestForm(req: Request, res: Response) {
  const email = req.user?.email;

  if (!email) {
    return res.status(401).json({ message: "Not authorized." });
  }

  const form = await Form.findOne({ email }).sort({ createdAt: -1 });
  return res.status(200).json({ form });
}
