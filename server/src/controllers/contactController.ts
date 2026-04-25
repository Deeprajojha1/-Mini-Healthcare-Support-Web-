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

  const contact = await Contact.create({
    ...parsed.data,
    email: req.user?.email ?? parsed.data.email,
  });
  return res.status(201).json({ contact });
}

export async function getLatestContact(req: Request, res: Response) {
  const email = req.user?.email;

  if (!email) {
    return res.status(401).json({ message: "Not authorized." });
  }

  const contact = await Contact.findOne({ email }).sort({ createdAt: -1 });
  return res.status(200).json({ contact });
}
