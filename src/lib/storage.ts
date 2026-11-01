import type {
  DateExperience,
  GuestProgress,
  HostFormDraft,
} from "../types/dateExperience";
import { isValidDateExperience } from "./validation";

export const STORAGE_KEYS = {
  HOST_DATES: "surprise-date.host.dates",
  HOST_DRAFT: "surprise-date.host.draft",
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

export function getHostDraft(): HostFormDraft | null {
  try {
    const value = getStorage()?.getItem(STORAGE_KEYS.HOST_DRAFT);
    const parsed: unknown = value ? JSON.parse(value) : null;

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    const draft = parsed as Partial<HostFormDraft>;
    const riddles = Array.isArray(draft.riddles) ? draft.riddles : [];

    if (
      typeof draft.title !== "string" ||
      typeof draft.teaser !== "string" ||
      typeof draft.scheduledAt !== "string" ||
      typeof draft.startingLocation !== "string" ||
      typeof draft.finalSurpriseText !== "string" ||
      typeof draft.finalSurpriseLocation !== "string" ||
      riddles.length !== 3 ||
      !riddles.every(
        (riddle) =>
          riddle &&
          typeof riddle === "object" &&
          typeof (riddle as Record<string, unknown>).prompt === "string" &&
          typeof (riddle as Record<string, unknown>).answer === "string" &&
          typeof (riddle as Record<string, unknown>).successMessage === "string",
      )
    ) {
      return null;
    }

    const normalizedRiddles = riddles.map((riddle) => ({
      prompt: (riddle as Record<string, string>).prompt,
      answer: (riddle as Record<string, string>).answer,
      successMessage: (riddle as Record<string, string>).successMessage,
    }));

    return {
      title: draft.title,
      teaser: draft.teaser,
      scheduledAt: draft.scheduledAt,
      startingLocation: draft.startingLocation,
      finalSurpriseText: draft.finalSurpriseText,
      finalSurpriseLocation: draft.finalSurpriseLocation,
      riddles: normalizedRiddles as [
        typeof normalizedRiddles[0],
        typeof normalizedRiddles[1],
        typeof normalizedRiddles[2],
      ],
    };
  } catch {
    return null;
  }
}

export function saveHostDraft(draft: HostFormDraft): void {
  try {
    getStorage()?.setItem(STORAGE_KEYS.HOST_DRAFT, JSON.stringify(draft));
  } catch {
    // Draft persistence may be unavailable in restricted browsing contexts.
  }
}

export function clearHostDraft(): void {
  try {
    getStorage()?.removeItem(STORAGE_KEYS.HOST_DRAFT);
  } catch {
    // Draft persistence may be unavailable in restricted browsing contexts.
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
