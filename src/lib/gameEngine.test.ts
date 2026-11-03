import { createElement } from "react";
import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { LockedSurpriseCard } from "../components/LockedSurpriseCard";
import { ProgressSteps } from "../components/ProgressSteps";
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

  it("renders a progress step for each clue in a longer experience", () => {
    const extendedExperience: DateExperience = {
      ...experience,
      riddles: [
        { id: "riddle_1", order: 1, prompt: "First?", answer: "Café" },
        { id: "riddle_2", order: 2, prompt: "Second?", answer: "Teatro Solís" },
        { id: "riddle_3", order: 3, prompt: "Third?", answer: "Rooftop" },
        { id: "riddle_4", order: 4, prompt: "Fourth?", answer: "Garden" },
        { id: "riddle_5", order: 5, prompt: "Fifth?", answer: "Moon" },
      ],
    };

    const progress: GuestProgress = {
      dateId: extendedExperience.id,
      solvedRiddleIds: ["riddle_1", "riddle_2"],
      currentRiddleIndex: 2,
      isFinalUnlocked: false,
      lastUpdatedAt: "2026-07-02T18:00:00.000Z",
    };

    const html = renderToStaticMarkup(
      createElement(ProgressSteps, {
        progress,
        language: "en",
        totalRiddles: extendedExperience.riddles.length,
      }),
    );

    expect(extendedExperience.riddles.length).toBe(5);
    expect(html).toContain("Clue 5");
    expect(html).toContain("Surprise");
    expect(progress.currentRiddleIndex).toBe(2);
    expect(progress.solvedRiddleIds).toHaveLength(2);
  });

  it("uses the total clue count in the locked-surprise message", () => {
    const extendedExperience: DateExperience = {
      ...experience,
      riddles: [
        { id: "riddle_1", order: 1, prompt: "First?", answer: "Café" },
        { id: "riddle_2", order: 2, prompt: "Second?", answer: "Teatro Solís" },
        { id: "riddle_3", order: 3, prompt: "Third?", answer: "Rooftop" },
        { id: "riddle_4", order: 4, prompt: "Fourth?", answer: "Garden" },
        { id: "riddle_5", order: 5, prompt: "Fifth?", answer: "Moon" },
      ],
    };

    const progress: GuestProgress = {
      dateId: extendedExperience.id,
      solvedRiddleIds: ["riddle_1", "riddle_2", "riddle_3"],
      currentRiddleIndex: 3,
      isFinalUnlocked: false,
      lastUpdatedAt: "2026-07-02T18:00:00.000Z",
    };

    const html = renderToStaticMarkup(
      createElement(LockedSurpriseCard, {
        experience: extendedExperience,
        progress,
        language: "en",
      }),
    );

    expect(html).toContain("Solve all 5 riddles to unlock the final reveal.");
  });
});
