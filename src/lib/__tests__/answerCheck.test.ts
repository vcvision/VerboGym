import { describe, expect, it } from "vitest";
import { checkAnswer } from "../answerCheck";

describe("answer checking", () => {
  it("marks exact answers as correct", () => {
    const result = checkAnswer("hablo", "hablo", "yo", "present");
    expect(result.status).toBe("correct");
  });

  it("marks accent-only mismatch as close", () => {
    const result = checkAnswer("hable", "hablé", "yo", "preterite");
    expect(result.status).toBe("close");
    expect(result.hints.join(" ")).toContain("accent");
  });

  it("marks distant answers as incorrect", () => {
    const result = checkAnswer("zzz", "hablo", "yo", "present");
    expect(result.status).toBe("incorrect");
  });
});

