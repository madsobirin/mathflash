/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Custom hook that encapsulates all math game session logic.
 * Manages question generation, answer validation, scoring, timing,
 * and session lifecycle — keeping the UI component (PracticePage) thin.
 */

import { useState, useCallback, useRef } from 'react';
import {
  MathOperationType,
  DifficultyLevel,
  Question,
  SessionResult,
  MathGameState,
  MathGameActions,
} from '../types';
import { generateQuestions } from '../utils';

interface UseMathGameOptions {
  operation: MathOperationType;
  difficulty: DifficultyLevel;
  questionCount?: number;
}

/**
 * useMathGame — manages a full practice session.
 *
 * @example
 * ```tsx
 * const { state, actions } = useMathGame({
 *   operation: 'add',
 *   difficulty: 'easy',
 *   questionCount: 10,
 * });
 *
 * // Check answer when user submits
 * const result = actions.checkAnswer(42);
 * // result.isCorrect → true/false
 *
 * // Move to next question (or finish)
 * actions.nextQuestion();
 *
 * // At end, get the session summary
 * if (state.isFinished) {
 *   const summary = actions.getSessionResult();
 * }
 * ```
 */
export const useMathGame = ({
  operation,
  difficulty,
  questionCount = 10,
}: UseMathGameOptions): { state: MathGameState; actions: MathGameActions } => {
  // Generate all questions once on hook init
  const [questions, setQuestions] = useState<Question[]>(() =>
    generateQuestions(operation, difficulty, questionCount)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Track per-question start time
  const questionStartTime = useRef(Date.now());

  /**
   * Validate the user's answer against the current question.
   * Updates the question record with correctness and time taken.
   * Returns immediate feedback so the UI can animate accordingly.
   */
  const checkAnswer = useCallback(
    (input: number): { isCorrect: boolean; correctAnswer: number } => {
      const current = questions[currentIndex];
      if (!current) return { isCorrect: false, correctAnswer: 0 };

      const isCorrect = input === current.correctAnswer;
      const timeTaken = (Date.now() - questionStartTime.current) / 1000;

      // Immutably update the answered question
      setQuestions(prev => {
        const updated = [...prev];
        updated[currentIndex] = {
          ...current,
          userAnswer: input,
          isCorrect,
          timeTaken,
        };
        return updated;
      });

      if (isCorrect) {
        setScore(prev => prev + 1);
      }

      return { isCorrect, correctAnswer: current.correctAnswer };
    },
    [currentIndex, questions]
  );

  /**
   * Advance to the next question, or mark the session as finished
   * if all questions have been answered.
   */
  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      questionStartTime.current = Date.now();
    } else {
      setIsFinished(true);
    }
  }, [currentIndex, questions.length]);

  /**
   * Build the final session result summary.
   * Call this when isFinished is true to get data for ResultsPage.
   */
  const getSessionResult = useCallback((): SessionResult => {
    const answeredQuestions = questions.filter(q => q.userAnswer !== undefined);
    const correctCount = answeredQuestions.filter(q => q.isCorrect).length;
    const totalTime = answeredQuestions.reduce((acc, q) => acc + (q.timeTaken || 0), 0);
    const totalCount = questions.length;

    return {
      score: totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 0,
      avgTime: totalCount > 0 ? parseFloat((totalTime / totalCount).toFixed(1)) : 0,
      correctCount,
      totalCount,
      operation,
      difficulty,
    };
  }, [questions, operation, difficulty]);

  // ─── Computed State ────────────────────────────────────────────────

  const state: MathGameState = {
    questions,
    currentIndex,
    currentQuestion: questions[currentIndex] ?? null,
    score,
    isFinished,
    totalCount: questions.length,
  };

  const actions: MathGameActions = {
    checkAnswer,
    nextQuestion,
    getSessionResult,
  };

  return { state, actions };
};
