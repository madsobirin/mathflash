/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Operation = 'addition' | 'subtraction' | 'multiplication' | 'division';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
  id: string;
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  userAnswer?: string;
  isCorrect?: boolean;
  timeTaken?: number;
}

export interface SessionConfig {
  operation: Operation;
  difficulty: Difficulty;
  questionCount: number;
}

export interface UserStats {
  totalSolved: number;
  xp: number;
  accuracy: number;
  avgTime: number;
  streaks: number;
}
