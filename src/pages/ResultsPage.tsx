/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Home,
  Timer,
  CheckCircle2,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { Operation, Difficulty } from '../types';
import Button from '../components/Button';

interface ResultsState {
  score: number;
  avgTime: number;
  correctCount: number;
  totalCount: number;
  operation: Operation;
  difficulty: Difficulty;
}

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as ResultsState | null;

  // If no state (direct navigation), redirect to menu
  if (!state) {
    navigate('/');
    return null;
  }

  const { score, avgTime, correctCount, totalCount, operation, difficulty } = state;

  const handleTryAgain = () => {
    navigate('/practice', { state: { operation, difficulty } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-[600px] mx-auto px-6 py-12 flex flex-col items-center gap-10"
    >
      <div className="text-center space-y-2">
        <h2 className="font-lexend text-4xl font-black text-on-surface">Awesome Job!</h2>
        <p className="font-inter text-lg text-slate-500 font-medium font-body-lg">You've mastered these equations!</p>
      </div>

      <div className="w-full bg-white border-2 border-slate-900 rounded-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-12 flex flex-col items-center relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-addition-blue opacity-10 rounded-full"></div>
        <div className="flex flex-col items-center gap-6 relative z-10">
          <span className="font-inter font-black text-xs text-addition-blue tracking-[0.3em] uppercase">FINAL SCORE</span>
          <span className="font-lexend text-8xl font-black text-addition-blue">{score}%</span>
          <div className="h-3 w-40 bg-slate-100 rounded-full border-2 border-slate-900 overflow-hidden">
            <div className="h-full bg-addition-blue transition-all duration-1000" style={{ width: `${score}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 w-full">
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-xl flex items-center gap-5">
          <div className="w-14 h-14 bg-multiplication-purple/20 text-multiplication-purple rounded-xl border-2 border-slate-900 flex items-center justify-center">
            <Timer size={28} />
          </div>
          <div className="flex flex-col">
            <span className="font-inter text-[10px] font-black text-slate-400 uppercase tracking-widest">AVG TIME</span>
            <span className="font-lexend text-2xl font-bold">{avgTime}s</span>
          </div>
        </div>
        <div className="bg-white border-2 border-slate-900 rounded-2xl p-6 shadow-xl flex items-center gap-5">
          <div className="w-14 h-14 bg-division-green/20 text-division-green rounded-xl border-2 border-slate-900 flex items-center justify-center">
            <CheckCircle2 size={28} />
          </div>
          <div className="flex flex-col">
            <span className="font-inter text-[10px] font-black text-slate-400 uppercase tracking-widest">CORRECT</span>
            <span className="font-lexend text-2xl font-bold">{correctCount}/{totalCount}</span>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <Button className="w-full py-6 text-xl" onClick={() => navigate('/')}><Home size={24} /> Main Menu</Button>
        <Button variant="secondary" className="w-full py-6 text-xl" onClick={handleTryAgain}><RotateCcw size={24} /> Try Again</Button>
      </div>

      <div className="w-full bg-tertiary-fixed border-2 border-slate-900 rounded-2xl p-8 flex items-center gap-8 shadow-xl mt-4">
        <div className="relative w-24 h-24 bg-white/20 rounded-full border-2 border-slate-900 flex items-center justify-center overflow-hidden">
          <Zap className="text-multiplication-purple" size={48} />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-inter text-[10px] font-black text-multiplication-purple uppercase tracking-widest">New Milestone!</span>
          <h3 className="font-lexend text-2xl font-black text-slate-900">Speed Demon</h3>
          <p className="text-slate-600 font-medium">Answered 5 questions in under 2 seconds each.</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ResultsPage;
