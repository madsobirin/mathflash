/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Strategy Engine — implements the Strategy Design Pattern for math
 * question generation. Each operation is a self-contained class that
 * knows how to produce valid questions for any difficulty level.
 *
 * Adding a new operation (e.g., modulo) requires only a new class +
 * registering it in the strategyMap — no existing code changes needed
 * (Open/Closed Principle).
 */

import {
  MathOperationType,
  MathStrategy,
  DifficultyLevel,
  DifficultyRanges,
  Question,
  Operation,
} from './types';

// ─── Shared Helpers ────────────────────────────────────────────────

/** Generate a random integer in [min, max] (inclusive). */
const randomInt = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Create a unique question ID. */
const uid = (): string => Math.random().toString(36).substring(2, 9);

/**
 * Default number ranges per difficulty tier.
 * Each strategy can override these if needed.
 */
const DEFAULT_RANGES: DifficultyRanges = {
  easy:   { rangeA: { min: 1, max: 10 },  rangeB: { min: 1, max: 10 } },
  medium: { rangeA: { min: 10, max: 50 },  rangeB: { min: 1, max: 20 } },
  hard:   { rangeA: { min: 50, max: 200 }, rangeB: { min: 10, max: 100 } },
};

// ─── Strategy Implementations ──────────────────────────────────────

/**
 * Addition Strategy
 * Generates: numA + numB = correctAnswer
 * No special constraints needed.
 */
class AdditionStrategy implements MathStrategy {
  readonly operationType: MathOperationType = 'add';
  readonly symbol = '+';

  generate(difficulty: DifficultyLevel): Question {
    const { rangeA, rangeB } = DEFAULT_RANGES[difficulty];
    const numA = randomInt(rangeA.min, rangeA.max);
    const numB = randomInt(rangeB.min, rangeB.max);

    return {
      id: uid(),
      numA,
      numB,
      operatorSymbol: this.symbol,
      correctAnswer: numA + numB,
    };
  }
}

/**
 * Subtraction Strategy
 * Generates: numA - numB = correctAnswer
 * Constraint: numA >= numB (no negative results).
 */
class SubtractionStrategy implements MathStrategy {
  readonly operationType: MathOperationType = 'subtract';
  readonly symbol = '−';

  generate(difficulty: DifficultyLevel): Question {
    const { rangeA, rangeB } = DEFAULT_RANGES[difficulty];
    let numA = randomInt(rangeA.min, rangeA.max);
    let numB = randomInt(rangeB.min, rangeB.max);

    // Swap to ensure non-negative result
    if (numA < numB) [numA, numB] = [numB, numA];

    return {
      id: uid(),
      numA,
      numB,
      operatorSymbol: this.symbol,
      correctAnswer: numA - numB,
    };
  }
}

/**
 * Multiplication Strategy
 * Generates: numA × numB = correctAnswer
 * Uses slightly smaller ranges for hard mode to keep answers reasonable.
 */
class MultiplicationStrategy implements MathStrategy {
  readonly operationType: MathOperationType = 'multiply';
  readonly symbol = '×';

  private readonly ranges: DifficultyRanges = {
    easy:   { rangeA: { min: 1, max: 10 },  rangeB: { min: 1, max: 10 } },
    medium: { rangeA: { min: 2, max: 15 },  rangeB: { min: 2, max: 12 } },
    hard:   { rangeA: { min: 10, max: 30 }, rangeB: { min: 5, max: 20 } },
  };

  generate(difficulty: DifficultyLevel): Question {
    const { rangeA, rangeB } = this.ranges[difficulty];
    const numA = randomInt(rangeA.min, rangeA.max);
    const numB = randomInt(rangeB.min, rangeB.max);

    return {
      id: uid(),
      numA,
      numB,
      operatorSymbol: this.symbol,
      correctAnswer: numA * numB,
    };
  }
}

/**
 * Division Strategy — Inverse Multiplication Trick
 * Instead of dividing random numbers (which produces decimals),
 * we pick a divisor and a quotient, then compute the dividend:
 *   quotient × divisor = dividend  →  question: dividend ÷ divisor = ?
 *
 * This guarantees clean integer answers every time.
 */
class DivisionStrategy implements MathStrategy {
  readonly operationType: MathOperationType = 'divide';
  readonly symbol = '÷';

  private readonly ranges: DifficultyRanges = {
    easy:   { rangeA: { min: 1, max: 10 },  rangeB: { min: 1, max: 10 } },
    medium: { rangeA: { min: 2, max: 15 },  rangeB: { min: 2, max: 12 } },
    hard:   { rangeA: { min: 5, max: 25 }, rangeB: { min: 5, max: 20 } },
  };

  generate(difficulty: DifficultyLevel): Question {
    const { rangeA, rangeB } = this.ranges[difficulty];

    // rangeA = quotient range, rangeB = divisor range
    const quotient = randomInt(rangeA.min, rangeA.max);
    const divisor = randomInt(rangeB.min, rangeB.max);
    const dividend = quotient * divisor;

    return {
      id: uid(),
      numA: dividend,
      numB: divisor,
      operatorSymbol: this.symbol,
      correctAnswer: quotient,
    };
  }
}

// ─── Strategy Registry ─────────────────────────────────────────────

/** Singleton instances — one per operation. */
const strategies: Record<MathOperationType, MathStrategy> = {
  add:      new AdditionStrategy(),
  subtract: new SubtractionStrategy(),
  multiply: new MultiplicationStrategy(),
  divide:   new DivisionStrategy(),
};

/**
 * Get the strategy for a given operation type.
 * @throws {Error} if the operation type is unknown.
 */
export const getStrategy = (op: MathOperationType): MathStrategy => {
  const strategy = strategies[op];
  if (!strategy) throw new Error(`Unknown operation type: ${op}`);
  return strategy;
};

/**
 * Generate a batch of questions for a session.
 * This is the main entry point that PracticePage / useMathGame calls.
 */
export const generateQuestions = (
  op: MathOperationType,
  difficulty: DifficultyLevel,
  count: number = 10
): Question[] => {
  const strategy = getStrategy(op);
  return Array.from({ length: count }, () => strategy.generate(difficulty));
};

// ─── Mapping Helpers (Legacy ↔ New) ────────────────────────────────

/** Map legacy Operation strings to new MathOperationType. */
const legacyToNew: Record<Operation, MathOperationType> = {
  addition: 'add',
  subtraction: 'subtract',
  multiplication: 'multiply',
  division: 'divide',
};

/** Map new MathOperationType to legacy Operation strings. */
const newToLegacy: Record<MathOperationType, Operation> = {
  add: 'addition',
  subtract: 'subtraction',
  multiply: 'multiplication',
  divide: 'division',
};

export const toLegacyOp = (op: MathOperationType): Operation => newToLegacy[op];
export const toNewOp = (op: Operation): MathOperationType => legacyToNew[op];

// ─── UI Helpers (kept for MenuPage, StatsPage, etc.) ───────────────

export const getOpColor = (op: Operation) => {
  switch (op) {
    case 'addition': return 'text-addition-blue bg-addition-blue/10 border-addition-blue';
    case 'subtraction': return 'text-subtraction-red bg-subtraction-red/10 border-subtraction-red';
    case 'multiplication': return 'text-multiplication-purple bg-multiplication-purple/10 border-multiplication-purple';
    case 'division': return 'text-division-green bg-division-green/10 border-division-green';
  }
};

export const getOpBorderColor = (op: Operation): string => {
  switch (op) {
    case 'addition': return '#3B82F6';
    case 'subtraction': return '#EF4444';
    case 'multiplication': return '#8B5CF6';
    case 'division': return '#10B981';
  }
};

export const getOpLabel = (op: Operation): string => {
  switch (op) {
    case 'addition': return 'Tambah';
    case 'subtraction': return 'Kurang';
    case 'multiplication': return 'Kali';
    case 'division': return 'Bagi';
  }
};

export const getOpSymbol = (op: Operation): string => {
  switch (op) {
    case 'addition': return '+';
    case 'subtraction': return '-';
    case 'multiplication': return '×';
    case 'division': return '÷';
  }
};

export const getOpIcon = (op: Operation): string => {
  switch (op) {
    case 'addition': return '+';
    case 'subtraction': return '−';
    case 'multiplication': return '×';
    case 'division': return '÷';
  }
};
