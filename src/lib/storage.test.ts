import { beforeEach, describe, expect, it } from "vitest";
import type { HostFormDraft } from "../types/dateExperience";
import { clearHostDraft, getHostDraft, saveHostDraft } from "./storage";

const draft: HostFormDraft = {
  title: "City date",
  teaser: "A soft conversation under the lights.",
  scheduledAt: "2026-09-18T23:00",
  startingLocation: "Plaza Zabala",
  finalSurpriseText: "A rooftop toast.",
  finalSurpriseLocation: "Teatro Solís",
  riddles: [
    { prompt: "First clue", answer: "coffee", successMessage: "Nice." },
    { prompt: "Second clue", answer: "music", successMessage: "Good." },
    { prompt: "Third clue", answer: "theatre", successMessage: "Perfect." },
  ],
};

function mockWindowStorage() {
  const storage = {
    data: new Map<string, string>(),
    getItem(key: string) {
      return this.data.has(key) ? this.data.get(key)! : null;
    },
    setItem(key: string, value: string) {
      this.data.set(key, value);
    },
    removeItem(key: string) {
      this.data.delete(key);
    },
    clear() {
      this.data.clear();
    },
  };

  Object.defineProperty(globalThis, "window", {
    value: { localStorage: storage },
    configurable: true,
    writable: true,
  });

  return storage;
}

describe("host draft persistence", () => {
  beforeEach(() => {
    mockWindowStorage().clear();
  });

  it("round-trips draft data through local storage", () => {
    saveHostDraft(draft);

    expect(getHostDraft()).toEqual(draft);
  });

  it("clears persisted draft data", () => {
    saveHostDraft(draft);
    clearHostDraft();

    expect(getHostDraft()).toBeNull();
  });
});
