import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { createApp } from "../src/app.js";

vi.mock("../src/gemini.js", () => ({
  generateText: vi.fn(async (prompt) => `mocked: ${prompt}`),
}));

describe("API", () => {
  it("GET /health", async () => {
    const app = createApp();
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ ok: true });
  });

  it("POST /generate requires prompt", async () => {
    const app = createApp();
    const res = await request(app).post("/generate").send({});
    expect(res.status).toBe(400);
  });

  it("POST /generate returns text", async () => {
    const app = createApp();
    const res = await request(app).post("/generate").send({ prompt: "hello" });
    expect(res.status).toBe(200);
    expect(res.body.text).toBe("mocked: hello");
  });
});
