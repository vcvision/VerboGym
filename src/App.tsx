import { useEffect, useMemo, useState } from "react";
import { FeedbackPanel } from "./components/FeedbackPanel";
import { QuizConfig } from "./components/QuizConfig";
import { QuizPrompt } from "./components/QuizPrompt";
import { ResultsView } from "./components/ResultsView";
import { checkAnswer } from "./lib/answerCheck";
import { conjugate, getVerbList } from "./lib/conjugator";
import { LATAM_DEFAULT_PERSONS } from "./lib/rules";
import { PERSONS, TENSES } from "./types/conjugation";
import type { AnswerFeedback, Person, QuizQuestion, QuizSettings, Tense } from "./types/conjugation";

const defaultSettings: QuizSettings = {
  enabledTenses: ["present", "preterite", "imperfect"],
  enabledPersons: LATAM_DEFAULT_PERSONS,
  includeVos: false,
  questionCount: 10
};

const SETTINGS_STORAGE_KEY = "verbogym.quizSettings";

function isPerson(value: string): value is Person {
  return PERSONS.includes(value as Person);
}

function isTense(value: string): value is Tense {
  return TENSES.includes(value as Tense);
}

function loadSavedSettings(): QuizSettings {
  if (typeof window === "undefined") return defaultSettings;

  try {
    const raw = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return defaultSettings;

    const parsed = JSON.parse(raw) as Partial<QuizSettings>;
    const enabledTenses = Array.isArray(parsed.enabledTenses) ? parsed.enabledTenses.filter(isTense) : [];
    const enabledPersons = Array.isArray(parsed.enabledPersons) ? parsed.enabledPersons.filter(isPerson) : [];
    const includeVos = Boolean(parsed.includeVos);
    const questionCount =
      typeof parsed.questionCount === "number" && parsed.questionCount >= 5 && parsed.questionCount <= 50
        ? parsed.questionCount
        : defaultSettings.questionCount;

    return {
      enabledTenses: enabledTenses.length > 0 ? enabledTenses : defaultSettings.enabledTenses,
      enabledPersons: enabledPersons.length > 0 ? enabledPersons : defaultSettings.enabledPersons,
      includeVos,
      questionCount
    };
  } catch {
    return defaultSettings;
  }
}

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
  const [settings, setSettings] = useState<QuizSettings>(loadSavedSettings);
  const [started, setStarted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState<AnswerFeedback | null>(null);
  const [result, setResult] = useState({ correct: 0, close: 0, incorrect: 0 });
  const [streak, setStreak] = useState(0);

  const isDone = started && index >= questions.length;
  const current = useMemo(() => questions[index], [questions, index]);

  useEffect(() => {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const startQuiz = () => {
    const appliedSettings = settings.includeVos
      ? settings
      : { ...settings, enabledPersons: settings.enabledPersons.filter((p) => p !== "vos") };
    setQuestions(buildSessionQuestions(appliedSettings));
    setResult({ correct: 0, close: 0, incorrect: 0 });
    setStreak(0);
    setIndex(0);
    setFeedback(null);
    setStarted(true);
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  const onAnswerSubmit = (value: string) => {
    if (!current) return;
    const nextFeedback = checkAnswer(value, current.answer, current.person, current.tense);
    setFeedback(nextFeedback);
    setStreak((prev) => (nextFeedback.status === "correct" ? prev + 1 : 0));
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

  const abortSession = () => {
    setStarted(false);
    setQuestions([]);
    setIndex(0);
    setFeedback(null);
    setResult({ correct: 0, close: 0, incorrect: 0 });
    setStreak(0);
  };

  if (!started) {
    return (
      <main className="layout">
        <QuizConfig settings={settings} onChange={setSettings} onStart={startQuiz} onReset={resetSettings} />
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
          streak={streak}
          onSubmit={onAnswerSubmit}
          onAbort={abortSession}
        />
      )}
      <FeedbackPanel feedback={feedback} onContinue={onContinue} />
    </main>
  );
}

