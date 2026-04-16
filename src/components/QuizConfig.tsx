import type { Person, QuizSettings, Tense } from "../types/conjugation";
import { DEFAULT_PERSON_LABELS } from "../lib/rules";

interface Props {
  settings: QuizSettings;
  onChange: (next: QuizSettings) => void;
  onStart: () => void;
  onReset: () => void;
}

const personOrder: Person[] = ["yo", "tu", "el_ella_usted", "nosotros", "ellos_ellas_ustedes", "vos"];
const tenseOrder: Tense[] = ["present", "preterite", "imperfect"];

export function QuizConfig({ settings, onChange, onStart, onReset }: Props) {
  const toggleTense = (tense: Tense) => {
    const enabled = settings.enabledTenses.includes(tense);
    const next = enabled ? settings.enabledTenses.filter((t) => t !== tense) : [...settings.enabledTenses, tense];
    if (next.length > 0) onChange({ ...settings, enabledTenses: next });
  };

  const togglePerson = (person: Person) => {
    const enabled = settings.enabledPersons.includes(person);
    const next = enabled ? settings.enabledPersons.filter((p) => p !== person) : [...settings.enabledPersons, person];
    if (next.length > 0) onChange({ ...settings, enabledPersons: next });
  };

  const canStart = settings.enabledTenses.length > 0 && settings.enabledPersons.length > 0;

  return (
    <section className="card">
      <h1>VerboGym</h1>
      <p className="muted">Latin American conjugation trainer with present, preterite, and imperfect drills.</p>

      <h2>Tenses</h2>
      <p className="muted" style={{ fontSize: "0.875rem", marginTop: "-0.5rem", marginBottom: "1rem" }}>
        <strong>Preterite:</strong> Completed actions in the past (e.g., "I went").<br />
        <strong>Imperfect:</strong> Ongoing or repeated past actions (e.g., "I used to go").
      </p>
      <div className="toggle-grid">
        {tenseOrder.map((tense) => (
          <label key={tense} className="toggle">
            <input type="checkbox" checked={settings.enabledTenses.includes(tense)} onChange={() => toggleTense(tense)} />
            <span style={{ textTransform: "capitalize" }}>{tense}</span>
          </label>
        ))}
      </div>

      <h2>Subject Forms</h2>
      <div className="toggle-grid">
        {personOrder.map((person) => (
          <label key={person} className="toggle">
            <input type="checkbox" checked={settings.enabledPersons.includes(person)} onChange={() => togglePerson(person)} />
            <span>{DEFAULT_PERSON_LABELS[person]}</span>
          </label>
        ))}
      </div>


      <label className="stack">
        Questions per session
        <input
          type="number"
          min={5}
          max={50}
          value={settings.questionCount}
          onChange={(event) => onChange({ ...settings, questionCount: Number(event.target.value) || 10 })}
        />
      </label>

      <div className="action-row">
        <button type="button" className="secondary-button" onClick={onReset}>
          Reset to defaults
        </button>
        <button onClick={onStart} disabled={!canStart}>
          Start quiz
        </button>
      </div>
    </section>
  );
}

