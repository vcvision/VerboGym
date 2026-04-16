import { useState } from "react";
import { DEFAULT_PERSON_LABELS } from "../lib/rules";
import type { QuizQuestion } from "../types/conjugation";

interface Props {
  question: QuizQuestion;
  questionIndex: number;
  totalQuestions: number;
  onSubmit: (value: string) => void;
}

export function QuizPrompt({ question, questionIndex, totalQuestions, onSubmit }: Props) {
  const [answer, setAnswer] = useState("");

  return (
    <section className="card">
      <div className="row">
        <strong>
          Question {questionIndex + 1}/{totalQuestions}
        </strong>
      </div>
      <p className="prompt-infinitive">{question.verb.infinitive}</p>
      <p className="muted">
        Conjugate in <strong>{question.tense}</strong> for <strong>{DEFAULT_PERSON_LABELS[question.person]}</strong>
      </p>
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
    </section>
  );
}

