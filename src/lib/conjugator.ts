import rawVerbs from "../data/verbs-top-300.json";
import { VERB_DEFINITIONS } from "../data/verbDefinitions";
import type { Person, Tense, VerbEntry, VerbGroup, StemChangeType } from "../types/conjugation";
import { IRREGULAR_TENSE_VERBS, REGULAR_ENDINGS } from "./rules";

const STEM_CHANGE_TARGETS: Person[] = ["yo", "tu", "el_ella_usted", "ellos_ellas_ustedes", "vos"];

const STEM_CHANGE_RULES: Record<StemChangeType, [string, string]> = {
  e_ie: ["e", "ie"],
  o_ue: ["o", "ue"],
  e_i: ["e", "i"],
  u_ue: ["u", "ue"]
};

const STEM_CHANGE_VERBS: Partial<Record<string, StemChangeType>> = {
  pensar: "e_ie",
  sentir: "e_ie",
  querer: "e_ie",
  preferir: "e_ie",
  mentir: "e_ie",
  oler: "o_ue",
  volver: "o_ue",
  costar: "o_ue",
  poder: "o_ue",
  dormir: "o_ue",
  morir: "o_ue",
  pedir: "e_i",
  repetir: "e_i",
  elegir: "e_i",
  seguir: "e_i",
  jugar: "u_ue"
};

function removeReflexive(infinitive: string): string {
  return infinitive.endsWith("se") ? infinitive.slice(0, -2) : infinitive;
}

function inferVerbGroup(infinitive: string): VerbGroup {
  const plain = removeReflexive(infinitive);
  if (plain.endsWith("ar")) return "ar";
  if (plain.endsWith("er")) return "er";
  if (plain.endsWith("ir")) return "ir";
  return "er";
}

function getStem(infinitive: string): string {
  const plain = removeReflexive(infinitive);
  return plain.slice(0, -2);
}

function applyOrthographic(stem: string, person: Person, tense: Tense): string {
  if (tense !== "preterite" || person !== "yo") return stem;
  if (stem.endsWith("c")) return `${stem.slice(0, -1)}qu`;
  if (stem.endsWith("g")) return `${stem.slice(0, -1)}gu`;
  if (stem.endsWith("z")) return `${stem.slice(0, -1)}c`;
  return stem;
}

function applyStemChange(stem: string, stemChange: StemChangeType | undefined, person: Person, tense: Tense): string {
  if (!stemChange || tense !== "present" || !STEM_CHANGE_TARGETS.includes(person)) return stem;
  const [from, to] = STEM_CHANGE_RULES[stemChange];
  const idx = stem.lastIndexOf(from);
  if (idx === -1) return stem;
  return `${stem.slice(0, idx)}${to}${stem.slice(idx + from.length)}`;
}

export function getVerbList(limit = 300): VerbEntry[] {
  const verbs = rawVerbs.verbs.slice(0, limit);
  return verbs.map((infinitive) => ({
    infinitive,
    definition: VERB_DEFINITIONS[infinitive] ?? "to do/to be",
    group: inferVerbGroup(infinitive),
    stemChange: STEM_CHANGE_VERBS[removeReflexive(infinitive)]
  }));
}

export function conjugate(verb: VerbEntry, tense: Tense, person: Person): string {
  const base = removeReflexive(verb.infinitive);
  const irregular = IRREGULAR_TENSE_VERBS[base as keyof typeof IRREGULAR_TENSE_VERBS];
  const irregularForm = irregular?.[tense]?.[person];
  if (irregularForm) return irregularForm;
  const verbSpecificForm = verb.irregular?.[tense]?.[person];
  if (verbSpecificForm) return verbSpecificForm;

  const group = verb.group;
  const ending = REGULAR_ENDINGS[tense][group][person];
  let stem = getStem(verb.infinitive);
  stem = applyStemChange(stem, verb.stemChange, person, tense);
  stem = applyOrthographic(stem, person, tense);

  if (tense === "preterite" && group === "ir" && ["el_ella_usted", "ellos_ellas_ustedes", "vos"].includes(person)) {
    if (verb.stemChange === "e_i") {
      stem = stem.replace(/e(?!.*e)/, "i");
    }
    if (verb.stemChange === "o_ue") {
      stem = stem.replace(/o(?!.*o)/, "u");
    }
  }

  return `${stem}${ending}`;
}

