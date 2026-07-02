import { describe, expect, it } from "vitest";
import type {
  DateExperience,
  GuestProgress,
} from "../types/dateExperience";
import {
  getCurrentRiddle,
  isAnswerCorrect,
  normalizeAnswer,
  solveRiddle,
} from "./gameEngine";

const experience: DateExperience = {
  id: "date_test",
  version: 1,
  title: "A night out",
  teaser: "Three clues await.",
  scheduledAt: "2026-08-12T22:30:00.000Z",
  finalSurpriseText: "Dinner beneath the stars.",
  riddles: [
    { id: "riddle_1", order: 1, prompt: "First?", answer: "Café" },
    { id: "riddle_2", order: 2, prompt: "Second?", answer: "Teatro Solís" },
    { id: "riddle_3", order: 3, prompt: "Third?", answer: "Rooftop" },
  ],
  createdAt: "2026-07-02T18:00:00.000Z",
  updatedAt: "2026-07-02T18:00:00.000Z",
};

const initialProgress: GuestProgress = {
  dateId: experience.id,
  solvedRiddleIds: [],
  currentRiddleIndex: 0,
  isFinalUnlocked: false,
  lastUpdatedAt: "2026-07-02T18:00:00.000Z",
};

describe("game engine", () => {
  it("normalizes case, spaces, and punctuation without stripping letters", () => {
    expect(normalizeAnswer("  Teatro,   SOLÍS! ")).toBe("teatro solís");
    expect(isAnswerCorrect("CAFÉ!", "café")).toBe(true);
  });

  it("refuses to solve a future riddle", () => {
    expect(solveRiddle(experience, initialProgress, "riddle_2")).toEqual(
      initialProgress,
    );
  });

  it("unlocks riddles sequentially and reveals only after the third", () => {
    const afterFirst = solveRiddle(experience, initialProgress, "riddle_1");
    const afterSecond = solveRiddle(experience, afterFirst, "riddle_2");
    const afterThird = solveRiddle(experience, afterSecond, "riddle_3");

    expect(getCurrentRiddle(experience, afterFirst)?.id).toBe("riddle_2");
    expect(afterSecond.isFinalUnlocked).toBe(false);
    expect(afterThird.isFinalUnlocked).toBe(true);
    expect(getCurrentRiddle(experience, afterThird)).toBeNull();
  });
});
