import { useState } from "react";
import { DEFAULT_PERSON_LABELS } from "../lib/rules";
import type { QuizQuestion } from "../types/conjugation";

interface Props {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  streak: number;
  onSubmit: (value: string) => void;
  onAbort: () => void;
}

export function QuizPrompt({ question, questionIndex, totalQuestions, streak, onSubmit, onAbort }: Props) {
  const [answer, setAnswer] = useState("");
  const progressPercent = ((questionIndex + 1) / totalQuestions) * 100;

  return (
    <section className="card">
      <div className="quiz-status">
        <div>
          <strong>
          Question {questionIndex + 1}/{totalQuestions}
          </strong>
          <div className="progress-track" aria-hidden="true">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
        <div className="streak-chip" aria-label="current-streak">
          <span className="streak-label">Streak</span>
          <span className="streak-value">{streak}</span>
        </div>
      </div>
      <p className="prompt-infinitive">{question.verb.infinitive}</p>
      <div className="definition-chip" aria-label="verb-definition">
        <span className="definition-chip-icon" aria-hidden="true">💡</span>
        <span className="definition-chip-text">{question.verb.definition}</span>
      </div>
      <div className="prompt-meta" aria-label="prompt-details">
        <span className="prompt-chip prompt-chip-tense">
          <span className="prompt-chip-label">Tense</span>
          <span className="prompt-chip-value">{question.tense}</span>
        </span>
        <span className="prompt-chip prompt-chip-person">
          <span className="prompt-chip-label">Subject</span>
          <span className="prompt-chip-value">{DEFAULT_PERSON_LABELS[question.person]}</span>
        </span>
      </div>
      <p className="muted">Type the correct conjugation for this tense and subject form.</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(answer);
          setAnswer("");
        }}
        className="stack"
      >
        <input
          autoFocus
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Type conjugation..."
          aria-label="conjugation-input"
        />
        <button type="submit">Submit</button>
      </form>
      <button type="button" className="link-button" onClick={onAbort}>
        END SESSION
      </button>
    </section>
  );
}

