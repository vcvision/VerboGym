import { describe, expect, it } from "vitest";
import { conjugate, getVerbList } from "../conjugator";

describe("conjugator", () => {
  it("loads top 300 verbs", () => {
    expect(getVerbList(300)).toHaveLength(300);
  });

  it("conjugates regular present verbs", () => {
    const hablar = { infinitive: "hablar", group: "ar" as const };
    expect(conjugate(hablar, "present", "yo")).toBe("hablo");
    expect(conjugate(hablar, "present", "nosotros")).toBe("hablamos");
  });

  it("conjugates irregular verbs", () => {
    const ser = { infinitive: "ser", group: "er" as const };
    expect(conjugate(ser, "present", "yo")).toBe("soy");
    expect(conjugate(ser, "preterite", "ellos_ellas_ustedes")).toBe("fueron");
  });

  it("supports vos endings in latam mode", () => {
    const comer = { infinitive: "comer", group: "er" as const };
    expect(conjugate(comer, "present", "vos")).toBe("comés");
  });
});

