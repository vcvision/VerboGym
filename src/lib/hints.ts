import type { Person, Tense } from "../types/conjugation";

function stripAccents(text: string): string {
  // Keep this regex broadly browser-compatible (including older mobile Safari).
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function levenshtein(a: string, b: string): number {
  const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[a.length][b.length];
}

function endingHint(person: Person, tense: Tense): string {
  return `The ending for ${person} in ${tense} looks off. Check person/tense ending.`;
}

export function buildHints(userAnswer: string, canonicalAnswer: string, person: Person, tense: Tense): string[] {
  const rawUser = userAnswer.trim().toLowerCase();
  const rawCanonical = canonicalAnswer.trim().toLowerCase();
  const cleanUser = stripAccents(rawUser);
  const cleanCanonical = stripAccents(rawCanonical);

  if (!rawUser) return ["Type a conjugated form to get targeted hints."];

  const hints: string[] = [];
  if (cleanUser === cleanCanonical && rawUser !== rawCanonical) {
    hints.push("Almost perfect: accent or diacritic marks are missing/mistyped.");
  }

  if (rawUser.length >= 2 && rawCanonical.length >= 2 && rawUser.slice(-2) !== rawCanonical.slice(-2)) {
    hints.push(endingHint(person, tense));
  }

  if (rawUser[0] === rawCanonical[0] && cleanUser !== cleanCanonical) {
    hints.push("Stem is close but likely irregular. Re-check stem change or irregular root.");
  }

  const distance = levenshtein(cleanUser, cleanCanonical);
  if (distance <= 2) {
    hints.push("Very close spelling. Check one or two letters.");
  } else if (distance <= 4) {
    hints.push("Close answer. Re-check full verb pattern for this tense.");
  }

  return Array.from(new Set(hints));
}

export function isCloseMatch(userAnswer: string, canonicalAnswer: string): boolean {
  const rawUser = userAnswer.trim().toLowerCase();
  const rawCanonical = canonicalAnswer.trim().toLowerCase();
  if (!rawUser) return false;
  const cleanUser = stripAccents(rawUser);
  const cleanCanonical = stripAccents(rawCanonical);
  if (cleanUser === cleanCanonical) return true;
  return levenshtein(cleanUser, cleanCanonical) <= 2;
}

