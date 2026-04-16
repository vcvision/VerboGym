import type { AnswerFeedback, Person, Tense } from "../types/conjugation";
import { buildHints, isCloseMatch } from "./hints";

export function checkAnswer(userAnswer: string, canonicalAnswer: string, person: Person, tense: Tense): AnswerFeedback {
  const normalizedUser = userAnswer.trim().toLowerCase();
  const normalizedCanonical = canonicalAnswer.trim().toLowerCase();

  if (normalizedUser === normalizedCanonical) {
    return { status: "correct", canonicalAnswer, hints: [] };
  }

  if (isCloseMatch(normalizedUser, normalizedCanonical)) {
    return {
      status: "close",
      canonicalAnswer,
      hints: buildHints(normalizedUser, normalizedCanonical, person, tense)
    };
  }

  return {
    status: "incorrect",
    canonicalAnswer,
    hints: buildHints(normalizedUser, normalizedCanonical, person, tense).slice(0, 2)
  };
}

