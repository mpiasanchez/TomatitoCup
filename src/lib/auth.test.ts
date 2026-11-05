import { describe, expect, it } from "vitest";
import {
  getResetPasswordRedirectUrl,
  isValidEmail,
  normalizeAuthEmail,
  validatePassword,
} from "./auth";

describe("auth helpers", () => {
  it("normalizes auth emails", () => {
    expect(normalizeAuthEmail("  PERSON@Example.COM ")).toBe("person@example.com");
  });

  it("validates email format", () => {
    expect(isValidEmail("hello@example.com")).toBe(true);
    expect(isValidEmail("not-an-email")).toBe(false);
  });

  it("validates password length", () => {
    expect(validatePassword("1234567")).toBe(false);
    expect(validatePassword("12345678")).toBe(true);
  });

  it("builds reset password redirect urls", () => {
    expect(getResetPasswordRedirectUrl("https://nomequemes.com")).toBe(
      "https://nomequemes.com/auth/reset-password",
    );
  });
});
