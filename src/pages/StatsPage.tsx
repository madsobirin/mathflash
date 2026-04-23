/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import {
  Plus,
  Minus,
  X,
  Percent,
  Trophy,
  GraduationCap,
  Zap,
  History,
  Flame,
} from 'lucide-react';

const StatsPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[600px] mx-auto px-6 pt-8 pb-32 space-y-10">
    <h2 className="font-lexend text-4xl font-black">Your Progress</h2>
    <div className="bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-2xl">
      <div className="flex justify-between items-end mb-8">
        <div>
          <p className="font-inter text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weekly Activity</p>
          <h3 className="font-lexend text-3xl font-black">482 Solved</h3>
        </div>
        <span className="text-addition-blue font-black font-lexend text-xl">+12%</span>
      </div>
      <div className="flex items-end justify-between h-40 gap-3">
        {[40, 60, 90, 35, 55, 75, 20].map((h, i) => (
          <div key={i} className="flex flex-col items-center flex-1 gap-3">
            <div className={`w-full rounded-t-lg border-2 border-slate-900 shadow-sm ${i === 2 ? 'bg-addition-blue' : 'bg-slate-100'}`} style={{ height: `${h}%` }} />
            <span className="font-inter text-[10px] font-black text-slate-400">{['M','T','W','T','F','S','S'][i]}</span>
          </div>
        ))}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-6">
      {[
        { op: 'Addition', color: 'bg-addition-blue', icon: <Plus size={24}/>, progress: 92, count: 1402 },
        { op: 'Subtraction', color: 'bg-subtraction-red', icon: <Minus size={24}/>, progress: 88, count: 945 },
        { op: 'Multiplication', color: 'bg-multiplication-purple', icon: <X size={24}/>, progress: 76, count: 420 },
        { op: 'Division', color: 'bg-division-green', icon: <Percent size={24}/>, progress: 64, count: 218 },
      ].map(item => (
        <div key={item.op} className={`${item.color} text-white border-2 border-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden group`}>
          <div className="absolute -right-2 -bottom-2 opacity-20 group-hover:scale-125 transition-transform duration-500">{item.icon}</div>
          <p className="font-inter text-[10px] font-black opacity-80 uppercase tracking-widest">{item.op}</p>
          <h3 className="font-lexend text-3xl font-black mt-1">{item.progress}%</h3>
          <p className="text-sm font-bold mt-2 opacity-90">{item.count} Solved</p>
        </div>
      ))}
    </div>
    <section>
      <h2 className="font-lexend text-2xl font-black mb-6 flex items-center gap-3">
        <Trophy className="text-yellow-500" fill="currentColor" size={28} /> Achievements
      </h2>
      <div className="flex overflow-x-auto pb-4 gap-6 no-scrollbar">
        {[
          { name: 'First 100', icon: <GraduationCap/>, color: 'bg-yellow-400', unlocked: true },
          { name: 'Speed Demon', icon: <Zap/>, color: 'bg-blue-400', unlocked: true },
          { name: 'Math Pro', icon: <History/>, color: 'bg-purple-400', unlocked: true },
          { name: '30 Day Streak', icon: <Flame/>, color: 'bg-slate-200', unlocked: false },
        ].map(medal => (
          <div key={medal.name} className={`min-w-[140px] bg-white border-2 border-slate-900 rounded-3xl p-5 flex flex-col items-center text-center shadow-xl ${!medal.unlocked && 'grayscale opacity-50'}`}>
            <div className={`w-16 h-16 rounded-full border-2 border-slate-900 flex items-center justify-center mb-3 shadow-md ${medal.color}`}>{medal.icon}</div>
            <p className="text-xs font-black leading-tight font-lexend">{medal.name}</p>
          </div>
        ))}
      </div>
    </section>
    <div className="space-y-6">
      <h2 className="font-lexend text-2xl font-black">Recent Sessions</h2>
      {[
        { op: 'Addition', time: 'Today, 2:30 PM', score: '18/20', pts: '+50', color: 'bg-addition-blue', icon: <Plus size={20}/> },
        { op: 'Subtraction', time: 'Yesterday, 5:15 PM', score: '15/20', pts: '+35', color: 'bg-subtraction-red', icon: <Minus size={20}/> },
        { op: 'Multiplication', time: 'Oct 24, 10:00 AM', score: '12/20', pts: '+20', color: 'bg-multiplication-purple', icon: <X size={20}/> },
      ].map((s, i) => (
        <div key={i} className="bg-white border-2 border-slate-900 rounded-3xl p-5 flex items-center justify-between shadow-xl active-press cursor-pointer">
          <div className="flex items-center gap-5">
            <div className={`w-12 h-12 rounded-2xl border-2 border-slate-900 flex items-center justify-center text-white ${s.color}`}>{s.icon}</div>
            <div>
              <p className="font-lexend font-black">{s.op}</p>
              <p className="text-xs font-bold text-slate-400">{s.time}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-black text-xl ${s.color.replace('bg-','text-')}`}>{s.score}</p>
            <p className="text-[10px] font-black uppercase tracking-tighter text-slate-400">{s.pts} PTS</p>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

export default StatsPage;
