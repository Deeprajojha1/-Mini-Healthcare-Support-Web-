import { Request, Response } from "express";
import { z } from "zod";
import Contact from "../models/Contact.js";

const contactSchema = z.object({
  name: z.string().min(2).max(80),
  email: z.string().email(),
  subject: z.string().min(3).max(120),
  message: z.string().min(10).max(1500),
});

export async function submitContact(req: Request, res: Response) {
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ message: "Please provide valid contact form details." });
  }

  const contact = await Contact.create(parsed.data);
  return res.status(201).json({ contact });
}
