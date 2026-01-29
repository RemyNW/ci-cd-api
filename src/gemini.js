import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
export async function generateText(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
  });
  return response.text;
}
