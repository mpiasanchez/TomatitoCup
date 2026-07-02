import type {
  DateExperience,
  GuestProgress,
  Riddle,
} from "../types/dateExperience";

export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ");
}

export function isAnswerCorrect(input: string, answer: string): boolean {
  return normalizeAnswer(input) === normalizeAnswer(answer);
}

export function getCurrentRiddle(
  experience: DateExperience,
  progress: GuestProgress,
): Riddle | null {
  if (progress.isFinalUnlocked) {
    return null;
  }

  return experience.riddles[progress.currentRiddleIndex] ?? null;
}

export function solveRiddle(
  experience: DateExperience,
  progress: GuestProgress,
  riddleId: string,
): GuestProgress {
  const currentRiddle = getCurrentRiddle(experience, progress);

  if (!currentRiddle || currentRiddle.id !== riddleId) {
    return progress;
  }

  const solvedRiddleIds = Array.from(
    new Set([...progress.solvedRiddleIds, riddleId]),
  );
  const isFinalUnlocked = solvedRiddleIds.length === experience.riddles.length;

  return {
    ...progress,
    solvedRiddleIds,
    currentRiddleIndex: isFinalUnlocked
      ? experience.riddles.length - 1
      : Math.min(progress.currentRiddleIndex + 1, experience.riddles.length - 1),
    isFinalUnlocked,
    lastUpdatedAt: new Date().toISOString(),
  };
}

export function isExperienceComplete(progress: GuestProgress): boolean {
  return progress.isFinalUnlocked;
}
