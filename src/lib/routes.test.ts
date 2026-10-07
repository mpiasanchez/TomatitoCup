import { describe, expect, it } from "vitest";
import { resolveAppRoute } from "./routes";

describe("resolveAppRoute", () => {
  it("returns home for the root path", () => {
    expect(resolveAppRoute("/")).toBe("home");
  });

  it("returns guest for the play path", () => {
    expect(resolveAppRoute("/play")).toBe("guest");
  });

  it("returns host for the create path", () => {
    expect(resolveAppRoute("/create")).toBe("host");
  });

  it("returns home for unknown paths", () => {
    expect(resolveAppRoute("/anything-else")).toBe("home");
  });
});
