import { GoogleGenerativeAI } from "@google/generative-ai";

export async function generateHealthAdvice(message: string, role: string) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from environment variables.");
  }

  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel({
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
  });

  const prompt = `
You are a healthcare support assistant providing only basic, non-diagnostic wellness guidance.
User role: ${role}
User message: ${message}

Rules:
- Keep the answer under 120 words.
- Use supportive, practical language.
- Do not claim to diagnose.
- Tell the user to seek licensed medical help for severe, worsening, or emergency symptoms.
`;

  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}
