import type { DateExperience } from "../types/dateExperience";
import { isValidDateExperience } from "./validation";

function bytesToBinary(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;

  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }

  return binary;
}

export function encodeExperience(experience: DateExperience): string {
  const bytes = new TextEncoder().encode(JSON.stringify(experience));

  return btoa(bytesToBinary(bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function decodeExperience(payload: string): DateExperience | null {
  try {
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(
      normalized.length + ((4 - (normalized.length % 4)) % 4),
      "=",
    );
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (character) =>
      character.charCodeAt(0),
    );
    const parsed: unknown = JSON.parse(new TextDecoder().decode(bytes));

    return isValidDateExperience(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
