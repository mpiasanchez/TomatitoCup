import { describe, expect, it } from "vitest";
import type { HostFormDraft } from "../types/dateExperience";
import { isValidDateExperience, validateHostDraft } from "./validation";

describe("host validation", () => {
  it("connects required fields to friendly messages", () => {
    const draft: HostFormDraft = {
      title: "",
      teaser: "",
      scheduledAt: "",
      startingLocation: "",
      finalSurpriseText: "",
      finalSurpriseLocation: "",
      riddles: [
        { prompt: "", answer: "", successMessage: "" },
        { prompt: "", answer: "", successMessage: "" },
        { prompt: "", answer: "", successMessage: "" },
      ],
    };

    const errors = validateHostDraft(draft);

    expect(errors.title).toBeTruthy();
    expect(errors["riddles.2.answer"]).toBeTruthy();
  });

  it("rejects decoded experiences with duplicate riddle ordering", () => {
    expect(
      isValidDateExperience({
        id: "date_1",
        version: 1,
        title: "Test",
        teaser: "Teaser",
        scheduledAt: "2026-08-12T22:30:00.000Z",
        finalSurpriseText: "Surprise",
        riddles: [
          { id: "r1", order: 1, prompt: "A", answer: "A" },
          { id: "r2", order: 1, prompt: "B", answer: "B" },
          { id: "r3", order: 3, prompt: "C", answer: "C" },
        ],
        createdAt: "2026-07-02T18:00:00.000Z",
        updatedAt: "2026-07-02T18:00:00.000Z",
      }),
    ).toBe(false);
  });
});
