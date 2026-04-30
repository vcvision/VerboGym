interface Props {
  correct: number;
  close: number;
  incorrect: number;
  onRestart: () => void;
}

export function ResultsView({ correct, close, incorrect, onRestart }: Props) {
  const total = correct + close + incorrect;
  const score = total > 0 ? Math.round((correct / total) * 100) : 0;
  const tier = score >= 80 ? "high" : score >= 50 ? "mid" : "low";

  return (
    <section className="card">
      <h2 style={{ textAlign: "center", marginTop: 0 }}>Session Complete</h2>

      <div className={`results-score-display results-score-${tier}`}>
        <div className="results-score-number">{score}%</div>
        <div className="results-score-label">Accuracy</div>
      </div>

      <div className="results-stats">
        <div className="results-stat results-stat-correct">
          <div className="results-stat-value">{correct}</div>
          <div className="results-stat-label">Correct</div>
        </div>
        <div className="results-stat results-stat-close">
          <div className="results-stat-value">{close}</div>
          <div className="results-stat-label">Close</div>
        </div>
        <div className="results-stat results-stat-incorrect">
          <div className="results-stat-value">{incorrect}</div>
          <div className="results-stat-label">Incorrect</div>
        </div>
      </div>

      <button onClick={onRestart}>Start new session</button>
    </section>
  );
}
