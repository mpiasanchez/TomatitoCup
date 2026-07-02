import { describe, expect, it } from "vitest";
import type { DateExperience } from "../types/dateExperience";
import { decodeExperience, encodeExperience } from "./encoding";

const experience: DateExperience = {
  id: "date_unicode",
  version: 1,
  title: "Cena en Ciudad Vieja 🍉",
  teaser: "Una noche sólo para vos.",
  scheduledAt: "2026-09-18T23:00:00.000Z",
  startingLocation: "Plaza Zabala",
  finalSurpriseText: "Teatro y cena.",
  finalSurpriseLocation: "Teatro Solís",
  riddles: [
    { id: "r1", order: 1, prompt: "¿Primera pista?", answer: "café" },
    { id: "r2", order: 2, prompt: "¿Segunda pista?", answer: "música" },
    { id: "r3", order: 3, prompt: "¿Tercera pista?", answer: "teatro" },
  ],
  createdAt: "2026-07-02T18:00:00.000Z",
  updatedAt: "2026-07-02T18:00:00.000Z",
};

describe("experience encoding", () => {
  it("round-trips Unicode through URL-safe Base64", () => {
    const payload = encodeExperience(experience);

    expect(payload).not.toMatch(/[+/=]/);
    expect(decodeExperience(payload)).toEqual(experience);
  });

  it("returns null for malformed or invalid payloads", () => {
    expect(decodeExperience("not-valid-base64%%%")).toBeNull();
    expect(decodeExperience(btoa(JSON.stringify({ title: "Incomplete" })))).toBeNull();
  });
});
