import type { AnswerFeedback } from "../types/conjugation";

interface Props {
  feedback: AnswerFeedback | null;
  onContinue: () => void;
}

export function FeedbackPanel({ feedback, onContinue }: Props) {
  if (!feedback) return null;
  const title = feedback.status === "correct" ? "Correct" : feedback.status === "close" ? "Close" : "Incorrect";

  return (
    <section className={`card feedback-${feedback.status}`}>
      <div className="feedback-header">
        <span className={`feedback-badge feedback-badge-${feedback.status}`}>{title}</span>
        <h2 className="feedback-title">{title}</h2>
      </div>
      <p className="feedback-answer">
        Correct answer: <strong>{feedback.canonicalAnswer}</strong>
      </p>
      {feedback.hints.length > 0 && (
        <ul className="feedback-hints">
          {feedback.hints.map((hint) => (
            <li key={hint}>{hint}</li>
          ))}
        </ul>
      )}
      <button onClick={onContinue}>Next</button>
    </section>
  );
}

