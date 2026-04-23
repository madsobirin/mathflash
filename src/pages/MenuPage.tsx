/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Plus,
  Minus,
  X,
  Percent,
  Calculator,
} from 'lucide-react';
import { Operation, Difficulty } from '../types';
import { getOpColor, getOpLabel } from '../utils';

const opIcons: Record<Operation, React.ReactNode> = {
  addition: <Plus size={32} />,
  subtraction: <Minus size={32} />,
  multiplication: <X size={32} />,
  division: <Percent size={32} />,
};

const MenuPage = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');

  const startSession = (op: Operation) => {
    navigate('/practice', { state: { operation: op, difficulty } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[600px] mx-auto px-6 pt-8 pb-32"
    >
      <header className="mb-10">
        <div className="bg-white rounded-xl p-6 shadow-xl border-2 border-slate-900 border-b-8 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="font-lexend text-3xl font-black text-slate-900 mb-2">Ready to play?</h1>
            <p className="text-slate-500 text-lg">Choose your level and operation to start a new flashcard session.</p>
          </div>
          <Calculator className="absolute -right-4 -bottom-4 opacity-10 text-[120px]" size={120} />
        </div>
      </header>

      <div className="mb-10">
        <h2 className="font-lexend font-bold text-slate-500 text-sm uppercase tracking-widest mb-4 px-1">Select Difficulty</h2>
        <div className="grid grid-cols-3 gap-2 bg-slate-200 p-1.5 rounded-2xl border-2 border-slate-900 border-b-4">
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((d) => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`py-3 rounded-xl font-lexend font-bold transition-all ${
                difficulty === d
                  ? 'bg-white text-slate-900 shadow-md border-2 border-slate-900 border-b-4 translate-y-[-2px]'
                  : 'text-slate-500 hover:bg-white/50'
              }`}
            >
              {d.charAt(0).toUpperCase() + d.slice(1)}
              <span className="block text-[10px] font-medium opacity-60">
                {d === 'easy' ? '1-10' : d === 'medium' ? '10-100' : '100-1000'}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {(['addition', 'subtraction', 'multiplication', 'division'] as Operation[]).map(op => (
          <button
            key={op}
            onClick={() => startSession(op)}
            className={`bg-white rounded-3xl p-6 shadow-xl border-2 border-slate-900 border-b-8 flex flex-col items-center justify-center aspect-square group transition-all active:translate-y-1 active:border-b-4 ${
              op === 'addition' ? 'border-b-addition-blue' :
              op === 'subtraction' ? 'border-b-subtraction-red' :
              op === 'multiplication' ? 'border-b-multiplication-purple' : 'border-b-division-green'
            }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${getOpColor(op)}`}>
              {opIcons[op]}
            </div>
            <span className="font-lexend text-2xl font-bold text-slate-900 capitalize">
              {getOpLabel(op)}
            </span>
            <span className="text-xs font-lexend font-bold text-slate-400 mt-1 uppercase">{op}</span>
          </button>
        ))}
      </div>

      <div className="mt-10">
        <div className="bg-slate-900 rounded-3xl p-8 flex items-center justify-between shadow-2xl border-2 border-slate-900 border-b-[12px] border-slate-700">
          <div>
            <h3 className="text-white font-lexend text-xl mb-2">Weekly Goal</h3>
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-40 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div className="h-full w-[70%] bg-blue-500 rounded-full"></div>
              </div>
              <span className="text-slate-400 text-xs font-bold font-lexend">70%</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Questions solved</p>
            <p className="text-white font-lexend font-black text-2xl tracking-tighter">842/1.2k</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuPage;
