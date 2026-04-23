/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Operation, Difficulty, Question } from './types';

export const generateQuestion = (op: Operation, diff: Difficulty): Question => {
  let range1 = [1, 10];
  let range2 = [1, 10];

  if (diff === 'medium') {
    range1 = [10, 50];
    range2 = [1, 20];
  } else if (diff === 'hard') {
    range1 = [50, 200];
    range2 = [10, 100];
  }

  let n1 = Math.floor(Math.random() * (range1[1] - range1[0] + 1)) + range1[0];
  let n2 = Math.floor(Math.random() * (range2[1] - range2[0] + 1)) + range2[0];

  // Adjustments for specific operations
  if (op === 'subtraction') {
    if (n1 < n2) [n1, n2] = [n2, n1];
  } else if (op === 'division') {
    // Ensure no division by zero and clean results
    if (n2 === 0) n2 = 1;
    const result = n1 * n2;
    [n1, n2] = [result, n2];
  }

  let ans = 0;
  switch (op) {
    case 'addition': ans = n1 + n2; break;
    case 'subtraction': ans = n1 - n2; break;
    case 'multiplication': ans = n1 * n2; break;
    case 'division': ans = n1 / n2; break;
  }

  return {
    id: Math.random().toString(36).substring(7),
    num1: n1,
    num2: n2,
    operation: op,
    answer: ans
  };
};

export const getOpColor = (op: Operation) => {
  switch (op) {
    case 'addition': return 'text-addition-blue bg-addition-blue/10 border-addition-blue';
    case 'subtraction': return 'text-subtraction-red bg-subtraction-red/10 border-subtraction-red';
    case 'multiplication': return 'text-multiplication-purple bg-multiplication-purple/10 border-multiplication-purple';
    case 'division': return 'text-division-green bg-division-green/10 border-division-green';
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

export const getOpSymbol = (op: Operation): string => {
  switch (op) {
    case 'addition': return '+';
    case 'subtraction': return '-';
    case 'multiplication': return '×';
    case 'division': return '÷';
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
