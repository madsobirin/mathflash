/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// ─── Core Math Types ───────────────────────────────────────────────

/** The four arithmetic operations supported by the app. */
export type MathOperationType = 'add' | 'subtract' | 'multiply' | 'divide';

/** Difficulty tiers that control number ranges for question generation. */
export type DifficultyLevel = 'easy' | 'medium' | 'hard';

/** A single math question with its operands, correct answer, and user response. */
export interface Question {
  id: string;
  numA: number;
  numB: number;
  operatorSymbol: string;
  correctAnswer: number;
  userAnswer?: number;
  isCorrect?: boolean;
  timeTaken?: number;
}

/**
 * Strategy interface for generating math questions.
 * Each operation implements this to encapsulate its own generation logic.
 * (Strategy Design Pattern — Open/Closed Principle)
 */
export interface MathStrategy {
  /** The operation type this strategy handles. */
  readonly operationType: MathOperationType;
  /** The display symbol for this operation (e.g., '+', '−', '×', '÷'). */
  readonly symbol: string;
  /** Generate a question at the given difficulty level. */
  generate(difficulty: DifficultyLevel): Question;
}

// ─── Number Range Config ───────────────────────────────────────────

/** Defines the inclusive [min, max] range for random number generation. */
export interface NumberRange {
  min: number;
  max: number;
}

/** Number ranges per difficulty tier. */
export type DifficultyRanges = Record<DifficultyLevel, { rangeA: NumberRange; rangeB: NumberRange }>;

// ─── Game Session Types ────────────────────────────────────────────

/** Configuration for starting a practice session. */
export interface SessionConfig {
  operation: MathOperationType;
  difficulty: DifficultyLevel;
  questionCount: number;
}

/** Aggregated user statistics. */
export interface UserStats {
  totalSolved: number;
  xp: number;
  accuracy: number;
  avgTime: number;
  streaks: number;
}

/** Result summary after completing a session. */
export interface SessionResult {
  score: number;
  avgTime: number;
  correctCount: number;
  totalCount: number;
  operation: MathOperationType;
  difficulty: DifficultyLevel;
}

/** State shape returned by the useMathGame hook. */
export interface MathGameState {
  questions: Question[];
  currentIndex: number;
  currentQuestion: Question | null;
  score: number;
  isFinished: boolean;
  totalCount: number;
}

/** Actions returned by the useMathGame hook. */
export interface MathGameActions {
  checkAnswer: (input: number) => { isCorrect: boolean; correctAnswer: number };
  nextQuestion: () => void;
  getSessionResult: () => SessionResult;
}

// ─── Legacy Aliases (backward compatibility) ───────────────────────
// These map old type names to new ones so existing pages keep working.

export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division';
export type Difficulty = DifficultyLevel;
