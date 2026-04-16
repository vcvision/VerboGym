import { useMemo, useState } from "react";
import { FeedbackPanel } from "./components/FeedbackPanel";
import { QuizConfig } from "./components/QuizConfig";
import { QuizPrompt } from "./components/QuizPrompt";
import { ResultsView } from "./components/ResultsView";
import { checkAnswer } from "./lib/answerCheck";
import { conjugate, getVerbList } from "./lib/conjugator";
import { LATAM_DEFAULT_PERSONS } from "./lib/rules";
import type { AnswerFeedback, QuizQuestion, QuizSettings, Tense } from "./types/conjugation";

const defaultSettings: QuizSettings = {
  enabledTenses: ["present", "preterite", "imperfect"],
  enabledPersons: LATAM_DEFAULT_PERSONS,
  includeVos: false,
  questionCount: 10
};

function pickRandom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function buildSessionQuestions(settings: QuizSettings): QuizQuestion[] {
  const verbs = getVerbList(300);
  const questions: QuizQuestion[] = [];
  for (let i = 0; i < settings.questionCount; i += 1) {
    const verb = pickRandom(verbs);
    const person = pickRandom(settings.enabledPersons);
    const tense = pickRandom(settings.enabledTenses) as Tense;
    questions.push({ verb, person, tense, answer: conjugate(verb, tense, person) });
  }
  return questions;
}

export default function App() {
  const [settings, setSettings] = useState<QuizSettings>(defaultSettings);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [result, setResult] = useState({ correct: 0, close: 0, incorrect: 0 });

  const isDone = started && index >= questions.length;
  const current = useMemo(() => questions[index], [questions, index]);

  const startQuiz = () => {
    const appliedSettings = settings.includeVos
      ? settings
      : { ...settings, enabledPersons: settings.enabledPersons.filter((p) => p !== "vos") };
    setQuestions(buildSessionQuestions(appliedSettings));
    setResult({ correct: 0, close: 0, incorrect: 0 });
    setIndex(0);
    setFeedback(null);
    setStarted(true);
  };

  const onAnswerSubmit = (value: string) => {
    if (!current) return;
    const nextFeedback = checkAnswer(value, current.answer, current.person, current.tense);
    setFeedback(nextFeedback);
    setResult((prev) => ({
      correct: prev.correct + (nextFeedback.status === "correct" ? 1 : 0),
      close: prev.close + (nextFeedback.status === "close" ? 1 : 0),
      incorrect: prev.incorrect + (nextFeedback.status === "incorrect" ? 1 : 0)
    }));
  };

  const onContinue = () => {
    setFeedback(null);
    setIndex((prev) => prev + 1);
  };

  if (!started) {
    return (
      <main className="layout">
        <QuizConfig settings={settings} onChange={setSettings} onStart={startQuiz} />
      </main>
    );
  }

  if (isDone) {
    return (
      <main className="layout">
        <ResultsView
          correct={result.correct}
          close={result.close}
          incorrect={result.incorrect}
          onRestart={() => setStarted(false)}
        />
      </main>
    );
  }

  return (
    <main className="layout">
      {!feedback && current && (
        <QuizPrompt
          question={current}
          questionIndex={index}
          totalQuestions={questions.length}
          onSubmit={onAnswerSubmit}
        />
      )}
      <FeedbackPanel feedback={feedback} onContinue={onContinue} />
    </main>
  );
}

