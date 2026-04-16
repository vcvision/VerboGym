export const PERSONS = [
  "yo",
  "tu",
  "el_ella_usted",
  "nosotros",
  "ellos_ellas_ustedes",
  "vos"
] as const;

export const TENSES = ["present", "preterite", "imperfect"] as const;

export type Person = (typeof PERSONS)[number];
export type Tense = (typeof TENSES)[number];
export type VerbGroup = "ar" | "er" | "ir";

export type ConjugationMap = Partial<Record<Tense, Partial<Record<Person, string>>>>;

export type StemChangeType = "e_ie" | "o_ue" | "e_i" | "u_ue";

export interface VerbEntry {
  infinitive: string;
  definition: string;
  group: VerbGroup;
  stemChange?: StemChangeType;
  irregular?: ConjugationMap;
}

export interface QuizSettings {
  enabledTenses: Tense[];
  enabledPersons: Person[];
  includeVos: boolean;
  questionCount: number;
}

export interface QuizQuestion {
  verb: VerbEntry;
  tense: Tense;
  person: Person;
  answer: string;
}

export interface AnswerFeedback {
  status: "correct" | "close" | "incorrect";
  canonicalAnswer: string;
  hints: string[];
}
