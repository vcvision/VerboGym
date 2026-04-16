interface Props {
  correct: number;
  close: number;
  incorrect: number;
  onRestart: () => void;
}

export function ResultsView({ correct, close, incorrect, onRestart }: Props) {
  const total = correct + close + incorrect;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  return (
    <section className="card">
      <h2>Session complete</h2>
      <p>
        Exact score: <strong>{score}%</strong>
      </p>
      <p>Correct: {correct}</p>
      <p>Close: {close}</p>
      <p>Incorrect: {incorrect}</p>
      <button onClick={onRestart}>Start new session</button>
    </section>
  );
}

