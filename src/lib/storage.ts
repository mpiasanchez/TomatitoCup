import type {
  DateExperience,
  GuestProgress,
} from "../types/dateExperience";
import { isValidDateExperience } from "./validation";

export const STORAGE_KEYS = {
  HOST_DATES: "surprise-date.host.dates",
  GUEST_PROGRESS_PREFIX: "surprise-date.guest.progress.",
} as const;

function getStorage(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function getHostDates(): DateExperience[] {
  try {
    const value = getStorage()?.getItem(STORAGE_KEYS.HOST_DATES);
    const parsed: unknown = value ? JSON.parse(value) : [];

    return Array.isArray(parsed) ? parsed.filter(isValidDateExperience) : [];
  } catch {
    return [];
  }
}

export function saveHostDate(experience: DateExperience): void {
  try {
    const storage = getStorage();

    if (!storage) {
      return;
    }

    const existingDates = getHostDates();
    const existingIndex = existingDates.findIndex(
      (date) => date.id === experience.id,
    );
    const nextDates =
      existingIndex === -1
        ? [experience, ...existingDates]
        : existingDates.map((date) =>
            date.id === experience.id ? experience : date,
          );

    storage.setItem(STORAGE_KEYS.HOST_DATES, JSON.stringify(nextDates));
  } catch {
    // LocalStorage may be unavailable in private or restricted browsing modes.
  }
}

export function getGuestProgress(dateId: string): GuestProgress | null {
  try {
    const value = getStorage()?.getItem(
      `${STORAGE_KEYS.GUEST_PROGRESS_PREFIX}${dateId}`,
    );
    const parsed: unknown = value ? JSON.parse(value) : null;

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("dateId" in parsed) ||
      parsed.dateId !== dateId ||
      !("solvedRiddleIds" in parsed) ||
      !Array.isArray(parsed.solvedRiddleIds) ||
      !parsed.solvedRiddleIds.every((id) => typeof id === "string") ||
      !("currentRiddleIndex" in parsed) ||
      typeof parsed.currentRiddleIndex !== "number" ||
      !("isFinalUnlocked" in parsed) ||
      typeof parsed.isFinalUnlocked !== "boolean" ||
      !("lastUpdatedAt" in parsed) ||
      typeof parsed.lastUpdatedAt !== "string"
    ) {
      return null;
    }

    return parsed as GuestProgress;
  } catch {
    return null;
  }
}

export function saveGuestProgress(progress: GuestProgress): void {
  try {
    getStorage()?.setItem(
      `${STORAGE_KEYS.GUEST_PROGRESS_PREFIX}${progress.dateId}`,
      JSON.stringify(progress),
    );
  } catch {
    // Progress continues in memory if persistence is unavailable.
  }
}

export function createInitialGuestProgress(dateId: string): GuestProgress {
  return {
    dateId,
    solvedRiddleIds: [],
    currentRiddleIndex: 0,
    isFinalUnlocked: false,
    lastUpdatedAt: new Date().toISOString(),
  };
}
