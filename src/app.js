import express from "express";
import { generateText } from "./gemini.js";

export function createApp() {
  const app = express();
  app.use(express.json());

  app.get("/health", (req, res) => res.json({ ok: true }));

  app.post("/generate", async (req, res) => {
    const { prompt } = req.body ?? {};
    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({ error: 'Missing field "prompt" (string).' });
    }

    try {
      const text = await generateText(prompt);
      return res.json({ text });
    } catch (err) {
      return res.status(500).json({
        error: "Gemini call failed",
        detail: err?.message ?? String(err),
      });
    }
  });

  return app;
}
