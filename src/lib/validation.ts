import type {
  DateExperience,
  HostFormDraft,
  Riddle,
} from "../types/dateExperience";

export type HostFormErrors = Record<string, string>;

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isRiddle(value: unknown): value is Riddle {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    isNonEmptyString(record.id) &&
    typeof record.order === "number" &&
    Number.isInteger(record.order) &&
    record.order >= 1 &&
    record.order <= 3 &&
    isNonEmptyString(record.prompt) &&
    isNonEmptyString(record.answer) &&
    (record.successMessage === undefined ||
      typeof record.successMessage === "string")
  );
}

export function isValidDateExperience(
  value: unknown,
): value is DateExperience {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  if (
    !isNonEmptyString(record.id) ||
    record.version !== 1 ||
    !isNonEmptyString(record.title) ||
    !isNonEmptyString(record.teaser) ||
    !isNonEmptyString(record.scheduledAt) ||
    Number.isNaN(Date.parse(record.scheduledAt)) ||
    !isNonEmptyString(record.finalSurpriseText) ||
    !isNonEmptyString(record.createdAt) ||
    Number.isNaN(Date.parse(record.createdAt)) ||
    !isNonEmptyString(record.updatedAt) ||
    Number.isNaN(Date.parse(record.updatedAt)) ||
    (record.startingLocation !== undefined &&
      typeof record.startingLocation !== "string") ||
    (record.finalSurpriseLocation !== undefined &&
      typeof record.finalSurpriseLocation !== "string") ||
    !Array.isArray(record.riddles) ||
    record.riddles.length !== 3 ||
    !record.riddles.every(isRiddle)
  ) {
    return false;
  }

  const orders = record.riddles.map((riddle) => riddle.order);
  const ids = record.riddles.map((riddle) => riddle.id);

  return (
    new Set(orders).size === 3 &&
    orders.every((order) => order >= 1 && order <= 3) &&
    new Set(ids).size === 3
  );
}

export function validateHostDraft(draft: HostFormDraft): HostFormErrors {
  const errors: HostFormErrors = {};

  if (!draft.title.trim()) {
    errors.title = "Add a title for your mystery date.";
  }
  if (!draft.teaser.trim()) {
    errors.teaser = "Add a short teaser for your partner.";
  }
  if (!draft.scheduledAt) {
    errors.scheduledAt = "Choose a date and time.";
  } else if (Number.isNaN(new Date(draft.scheduledAt).getTime())) {
    errors.scheduledAt = "Choose a valid date and time.";
  }
  if (!draft.finalSurpriseText.trim()) {
    errors.finalSurpriseText = "Describe the final surprise.";
  }
  if (draft.riddles.length !== 3) {
    errors.riddles = "A mystery date needs exactly three clues.";
  }

  draft.riddles.forEach((riddle, index) => {
    if (!riddle.prompt.trim()) {
      errors[`riddles.${index}.prompt`] = `Add a prompt for clue ${index + 1}.`;
    }
    if (!riddle.answer.trim()) {
      errors[`riddles.${index}.answer`] =
        `Add the correct answer for clue ${index + 1}.`;
    }
  });

  return errors;
}
