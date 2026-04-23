/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Plus,
  Minus,
  X,
  Percent,
  Delete as Backspace,
  CornerDownLeft,
} from 'lucide-react';
import { Operation, MathOperationType } from '../types';
import { getOpColor, getOpBorderColor, toNewOp, toLegacyOp } from '../utils';
import { useMathGame } from '../hooks/useMathGame';
import Button from '../components/Button';

const opIcons: Record<Operation, React.ReactNode> = {
  addition: <Plus size={32} />,
  subtraction: <Minus size={32} />,
  multiplication: <X size={32} />,
  division: <Percent size={32} />,
};

const PracticePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Accept both legacy Operation strings and new MathOperationType
  const routeState = (location.state || { operation: 'addition', difficulty: 'easy' }) as { operation: string; difficulty: string };
  const legacyOp = routeState.operation || 'addition';
  const difficulty = (routeState.difficulty || 'easy') as 'easy' | 'medium' | 'hard';

  // Convert legacy operation name to new MathOperationType
  const mathOp: MathOperationType = (['add', 'subtract', 'multiply', 'divide'].includes(legacyOp))
    ? legacyOp as MathOperationType
    : toNewOp(legacyOp as Operation);

  // The legacy Operation name for UI helpers
  const legacyOperation = toLegacyOp(mathOp);

  // ─── Use the game hook ──────────────────────────────────────────
  const { state, actions } = useMathGame({
    operation: mathOp,
    difficulty,
    questionCount: 10,
  });

  const [userInput, setUserInput] = useState('');
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);

  const handleInput = (val: string) => {
    if (showFeedback) return; // Ignore input during feedback
    if (val === 'back') {
      setUserInput(prev => prev.slice(0, -1));
      return;
    }
    if (userInput.length >= 6) return;
    setUserInput(prev => prev + val);
  };

  const submitAnswer = useCallback(() => {
    if (!userInput || state.isFinished || showFeedback) return;

    const numericAnswer = parseInt(userInput, 10);
    if (isNaN(numericAnswer)) return;

    const result = actions.checkAnswer(numericAnswer);

    // Brief visual feedback
    setShowFeedback(result.isCorrect ? 'correct' : 'wrong');

    setTimeout(() => {
      setShowFeedback(null);
      setUserInput('');
      actions.nextQuestion();
    }, 600);
  }, [userInput, state.isFinished, showFeedback, actions]);

  // Navigate to results when finished
  useEffect(() => {
    if (state.isFinished) {
      const sessionResult = actions.getSessionResult();
      navigate('/results', {
        state: {
          ...sessionResult,
          // Pass legacy operation name so ResultsPage works unchanged
          operation: legacyOperation,
        },
      });
    }
  }, [state.isFinished, actions, navigate, legacyOperation]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') submitAnswer();
      if (e.key === 'Backspace') handleInput('back');
      if (/^[0-9]$/.test(e.key)) handleInput(e.key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [submitAnswer]);

  // ─── Render ─────────────────────────────────────────────────────

  const q = state.currentQuestion;
  if (!q) return null;

  const feedbackBorderClass = showFeedback === 'correct'
    ? 'ring-4 ring-division-green'
    : showFeedback === 'wrong'
      ? 'ring-4 ring-subtraction-red shake-animation'
      : '';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-[600px] mx-auto px-6 py-8 flex flex-col gap-10"
    >
      {/* Progress bar */}
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-end px-1">
          <span className={`font-lexend text-xl font-bold uppercase tracking-wider ${getOpColor(legacyOperation).split(' ')[0]}`}>
            {legacyOperation}
          </span>
          <span className="font-inter font-bold text-xs text-on-surface-variant uppercase tracking-widest">
            Question {state.currentIndex + 1} of {state.totalCount}
          </span>
        </div>
        <div className="h-6 w-full bg-slate-200 rounded-full border-2 border-slate-900 overflow-hidden relative">
          <div
            className={`h-full transition-all duration-500 shadow-inner ${getOpColor(legacyOperation).split(' ')[1].replace('bg-', 'bg-').replace('/10', '')}`}
            style={{ width: `${((state.currentIndex + 1) / state.totalCount) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question card */}
      <div className="relative group">
        <div
          className={`w-full aspect-[4/3] bg-white border-2 border-slate-900 border-b-8 rounded-2xl shadow-2xl flex flex-col items-center justify-center relative hover:translate-y-[-4px] transition-transform duration-200 ${feedbackBorderClass}`}
          style={{ borderBottomColor: getOpBorderColor(legacyOperation) }}
        >
          <div className="absolute top-6 left-6 opacity-5">{opIcons[legacyOperation]}</div>
          <div className="flex flex-col items-center gap-4">
            <span className="font-lexend text-7xl font-black text-slate-900">
              {q.numA} {q.operatorSymbol} {q.numB}
            </span>
            <div className="h-2 w-32 bg-slate-100 rounded-full border border-slate-200"></div>
          </div>
        </div>
      </div>

      {/* Answer input + numpad */}
      <div className="flex flex-col gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-slate-900 translate-x-1.5 translate-y-1.5 rounded-xl"></div>
          <div className={`relative bg-white border-2 border-slate-900 p-6 rounded-xl flex items-center justify-center gap-4 ${feedbackBorderClass}`}>
            <span className="font-lexend text-2xl text-slate-400">?</span>
            <div className="w-full text-center font-lexend text-4xl font-black text-slate-900 min-h-[48px]">
              {userInput || <span className="text-slate-200">Enter Answer</span>}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
            <Button key={num} variant="secondary" onClick={() => handleInput(num.toString())} className="text-3xl py-6">{num}</Button>
          ))}
          <Button variant="danger" onClick={() => handleInput('back')} className="py-6"><Backspace /></Button>
          <Button variant="secondary" onClick={() => handleInput('0')} className="text-3xl py-6">0</Button>
          <Button onClick={submitAnswer} className="py-6"><CornerDownLeft /></Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PracticePage;
