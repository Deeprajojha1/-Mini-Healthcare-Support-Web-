import { Request, Response } from "express";
import { z } from "zod";
import Form from "../models/Form.js";

const formSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  message: z.string().min(10).max(1500),
  role: z.enum(["Patient", "Volunteer"]),
});

export async function submitForm(req: Request, res: Response) {
  const parsed = formSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Please provide valid form details." });
  }

  const form = await Form.create(parsed.data);
  return res.status(201).json({ form });
}
