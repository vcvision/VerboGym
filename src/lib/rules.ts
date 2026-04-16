import type { Person, Tense, ConjugationMap } from "../types/conjugation";

export const DEFAULT_PERSON_LABELS: Record<Person, string> = {
  yo: "yo",
  tu: "tú",
  el_ella_usted: "él/ella/usted",
  nosotros: "nosotros/as",
  ellos_ellas_ustedes: "ellos/ellas/ustedes",
  vos: "vos"
};

export const LATAM_DEFAULT_PERSONS: Person[] = [
  "yo",
  "tu",
  "el_ella_usted",
  "nosotros",
  "ellos_ellas_ustedes"
];

export const REGULAR_ENDINGS: Record<Tense, Record<"ar" | "er" | "ir", Record<Person, string>>> = {
  present: {
    ar: { yo: "o", tu: "as", el_ella_usted: "a", nosotros: "amos", ellos_ellas_ustedes: "an", vos: "ás" },
    er: { yo: "o", tu: "es", el_ella_usted: "e", nosotros: "emos", ellos_ellas_ustedes: "en", vos: "és" },
    ir: { yo: "o", tu: "es", el_ella_usted: "e", nosotros: "imos", ellos_ellas_ustedes: "en", vos: "ís" }
  },
  preterite: {
    ar: { yo: "é", tu: "aste", el_ella_usted: "ó", nosotros: "amos", ellos_ellas_ustedes: "aron", vos: "aste" },
    er: { yo: "í", tu: "iste", el_ella_usted: "ió", nosotros: "imos", ellos_ellas_ustedes: "ieron", vos: "iste" },
    ir: { yo: "í", tu: "iste", el_ella_usted: "ió", nosotros: "imos", ellos_ellas_ustedes: "ieron", vos: "iste" }
  },
  imperfect: {
    ar: { yo: "aba", tu: "abas", el_ella_usted: "aba", nosotros: "ábamos", ellos_ellas_ustedes: "aban", vos: "abas" },
    er: { yo: "ía", tu: "ías", el_ella_usted: "ía", nosotros: "íamos", ellos_ellas_ustedes: "ían", vos: "ías" },
    ir: { yo: "ía", tu: "ías", el_ella_usted: "ía", nosotros: "íamos", ellos_ellas_ustedes: "ían", vos: "ías" }
  }
};

export const IRREGULAR_TENSE_VERBS: Record<string, ConjugationMap> = {
  ser: {
    present: { yo: "soy", tu: "eres", el_ella_usted: "es", nosotros: "somos", ellos_ellas_ustedes: "son", vos: "sos" },
    preterite: { yo: "fui", tu: "fuiste", el_ella_usted: "fue", nosotros: "fuimos", ellos_ellas_ustedes: "fueron", vos: "fuiste" },
    imperfect: { yo: "era", tu: "eras", el_ella_usted: "era", nosotros: "éramos", ellos_ellas_ustedes: "eran", vos: "eras" }
  },
  ir: {
    present: { yo: "voy", tu: "vas", el_ella_usted: "va", nosotros: "vamos", ellos_ellas_ustedes: "van", vos: "vas" },
    preterite: { yo: "fui", tu: "fuiste", el_ella_usted: "fue", nosotros: "fuimos", ellos_ellas_ustedes: "fueron", vos: "fuiste" },
    imperfect: { yo: "iba", tu: "ibas", el_ella_usted: "iba", nosotros: "íbamos", ellos_ellas_ustedes: "iban", vos: "ibas" }
  },
  haber: {
    present: { yo: "he", tu: "has", el_ella_usted: "ha", nosotros: "hemos", ellos_ellas_ustedes: "han", vos: "has" },
    preterite: { yo: "hube", tu: "hubiste", el_ella_usted: "hubo", nosotros: "hubimos", ellos_ellas_ustedes: "hubieron", vos: "hubiste" },
    imperfect: { yo: "había", tu: "habías", el_ella_usted: "había", nosotros: "habíamos", ellos_ellas_ustedes: "habían", vos: "habías" }
  },
  dar: {
    preterite: { yo: "di", tu: "diste", el_ella_usted: "dio", nosotros: "dimos", ellos_ellas_ustedes: "dieron", vos: "diste" }
  },
  ver: {
    imperfect: { yo: "veía", tu: "veías", el_ella_usted: "veía", nosotros: "veíamos", ellos_ellas_ustedes: "veían", vos: "veías" },
    preterite: { yo: "vi", tu: "viste", el_ella_usted: "vio", nosotros: "vimos", ellos_ellas_ustedes: "vieron", vos: "viste" }
  },
  tener: {
    present: { yo: "tengo" },
    preterite: { yo: "tuve", tu: "tuviste", el_ella_usted: "tuvo", nosotros: "tuvimos", ellos_ellas_ustedes: "tuvieron", vos: "tuviste" }
  },
  estar: {
    present: { yo: "estoy" },
    preterite: { yo: "estuve", tu: "estuviste", el_ella_usted: "estuvo", nosotros: "estuvimos", ellos_ellas_ustedes: "estuvieron", vos: "estuviste" }
  },
  poder: {
    preterite: { yo: "pude", tu: "pudiste", el_ella_usted: "pudo", nosotros: "pudimos", ellos_ellas_ustedes: "pudieron", vos: "pudiste" }
  },
  poner: {
    present: { yo: "pongo" },
    preterite: { yo: "puse", tu: "pusiste", el_ella_usted: "puso", nosotros: "pusimos", ellos_ellas_ustedes: "pusieron", vos: "pusiste" }
  },
  decir: {
    present: { yo: "digo" },
    preterite: { yo: "dije", tu: "dijiste", el_ella_usted: "dijo", nosotros: "dijimos", ellos_ellas_ustedes: "dijeron", vos: "dijiste" }
  },
  hacer: {
    present: { yo: "hago" },
    preterite: { yo: "hice", tu: "hiciste", el_ella_usted: "hizo", nosotros: "hicimos", ellos_ellas_ustedes: "hicieron", vos: "hiciste" }
  },
  venir: {
    present: { yo: "vengo" },
    preterite: { yo: "vine", tu: "viniste", el_ella_usted: "vino", nosotros: "vinimos", ellos_ellas_ustedes: "vinieron", vos: "viniste" }
  },
  querer: {
    preterite: { yo: "quise", tu: "quisiste", el_ella_usted: "quiso", nosotros: "quisimos", ellos_ellas_ustedes: "quisieron", vos: "quisiste" }
  },
  saber: {
    preterite: { yo: "supe", tu: "supiste", el_ella_usted: "supo", nosotros: "supimos", ellos_ellas_ustedes: "supieron", vos: "supiste" }
  },
  traer: {
    preterite: { yo: "traje", tu: "trajiste", el_ella_usted: "trajo", nosotros: "trajimos", ellos_ellas_ustedes: "trajeron", vos: "trajiste" }
  },
  conducir: {
    preterite: { yo: "conduje", tu: "condujiste", el_ella_usted: "condujo", nosotros: "condujimos", ellos_ellas_ustedes: "condujeron", vos: "condujiste" }
  }
};

