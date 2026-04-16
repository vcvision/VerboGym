import type { AnswerFeedback } from "../types/conjugation";

interface Props {
  feedback: AnswerFeedback | null;
  onContinue: () => void;
}

export function FeedbackPanel({ feedback, onContinue }: Props) {
  if (!feedback) return null;
  return (
    <section className={`card feedback-${feedback.status}`}>
      <h2>{feedback.status === "correct" ? "Correct" : feedback.status === "close" ? "Close" : "Incorrect"}</h2>
      <p>
        Correct answer: <strong>{feedback.canonicalAnswer}</strong>
      </p>
      {feedback.hints.length > 0 && (
        <ul>
          {feedback.hints.map((hint) => (
            <li key={hint}>{hint}</li>
          ))}
        </ul>
      )}
      <button onClick={onContinue}>Next</button>
    </section>
  );
}

