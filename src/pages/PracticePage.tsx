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
import { Operation, Difficulty, Question } from '../types';
import { generateQuestion, getOpColor, getOpBorderColor } from '../utils';
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
  const { operation = 'addition', difficulty = 'easy' } = (location.state as { operation: Operation; difficulty: Difficulty }) || {};

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [startTime, setStartTime] = useState(0);

  // Initialize questions on mount
  useEffect(() => {
    const qCount = 10;
    const newQuestions = Array.from({ length: qCount }).map(() =>
      generateQuestion(operation, difficulty)
    );
    setQuestions(newQuestions);
    setStartTime(Date.now());
  }, [operation, difficulty]);

  const handleInput = (val: string) => {
    if (val === 'back') {
      setUserAnswer(prev => prev.slice(0, -1));
      return;
    }
    if (userAnswer.length >= 6) return;
    setUserAnswer(prev => prev + val);
  };

  const submitAnswer = useCallback(() => {
    if (!userAnswer || questions.length === 0) return;

    const currentQ = questions[currentIndex];
    const isCorrect = parseInt(userAnswer) === currentQ.answer;
    const timeTaken = (Date.now() - startTime) / 1000;

    const updatedQuestions = [...questions];
    updatedQuestions[currentIndex] = {
      ...currentQ,
      userAnswer,
      isCorrect,
      timeTaken
    };
    setQuestions(updatedQuestions);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setUserAnswer('');
      setStartTime(Date.now());
    } else {
      // End session — navigate to results
      const correctCount = updatedQuestions.filter(q => q.isCorrect).length;
      const totalTime = updatedQuestions.reduce((acc, q) => acc + (q.timeTaken || 0), 0);
      navigate('/results', {
        state: {
          score: Math.round((correctCount / questions.length) * 100),
          avgTime: parseFloat((totalTime / questions.length).toFixed(1)),
          correctCount,
          totalCount: questions.length,
          operation,
          difficulty,
        }
      });
    }
  }, [currentIndex, questions, userAnswer, startTime, navigate, operation, difficulty]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') submitAnswer();
      if (e.key === 'Backspace') handleInput('back');
      if (/^[0-9]$/.test(e.key)) handleInput(e.key);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [submitAnswer]);

  if (questions.length === 0) return null;

  const q = questions[currentIndex];
  const opSym = q.operation === 'addition' ? '+' : q.operation === 'subtraction' ? '-' : q.operation === 'multiplication' ? '×' : '÷';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-[600px] mx-auto px-6 py-8 flex flex-col gap-10"
    >
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-end px-1">
          <span className={`font-lexend text-xl font-bold uppercase tracking-wider ${getOpColor(q.operation).split(' ')[0]}`}>{q.operation}</span>
          <span className="font-inter font-bold text-xs text-on-surface-variant uppercase tracking-widest">Question {currentIndex + 1} of 10</span>
        </div>
        <div className="h-6 w-full bg-slate-200 rounded-full border-2 border-slate-900 overflow-hidden relative">
          <div
            className={`h-full transition-all duration-500 shadow-inner ${getOpColor(q.operation).split(' ')[1].replace('bg-', 'bg-').replace('/10', '')}`}
            style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="relative group">
        <div
          className="w-full aspect-[4/3] bg-white border-2 border-slate-900 border-b-8 rounded-2xl shadow-2xl flex flex-col items-center justify-center relative hover:translate-y-[-4px] transition-transform duration-200"
          style={{ borderBottomColor: getOpBorderColor(q.operation) }}
        >
          <div className="absolute top-6 left-6 opacity-5">{opIcons[q.operation]}</div>
          <div className="flex flex-col items-center gap-4">
            <span className="font-lexend text-7xl font-black text-slate-900">{q.num1} {opSym} {q.num2}</span>
            <div className="h-2 w-32 bg-slate-100 rounded-full border border-slate-200"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-slate-900 translate-x-1.5 translate-y-1.5 rounded-xl"></div>
          <div className="relative bg-white border-2 border-slate-900 p-6 rounded-xl flex items-center justify-center gap-4">
            <span className="font-lexend text-2xl text-slate-400">?</span>
            <div className="w-full text-center font-lexend text-4xl font-black text-slate-900 min-h-[48px]">
              {userAnswer || <span className="text-slate-200">Enter Answer</span>}
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
