/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Plus, ArrowRight, UserCircle } from 'lucide-react';
import Button from '../components/Button';

const SettingsPage = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[600px] mx-auto px-6 pt-8 pb-32 space-y-10">
    <section className="bg-white border-2 border-slate-900 rounded-3xl p-8 shadow-2xl relative">
      <div className="flex items-center gap-6 mb-8">
        <div className="relative">
          <div className="w-24 h-24 rounded-full border-4 border-slate-900 bg-slate-100 flex items-center justify-center overflow-hidden">
            <UserCircle size={80} className="text-slate-400" />
          </div>
          <div className="absolute bottom-0 right-0 bg-addition-blue text-white p-2 rounded-full border-2 border-slate-900 shadow-md">
            <Plus size={16} className="rotate-45" />
          </div>
        </div>
        <div className="flex-1">
          <h2 className="font-lexend text-3xl font-black text-slate-900">Alex Rivera</h2>
          <p className="font-inter font-medium text-slate-500">alex.math@example.com</p>
        </div>
      </div>
      <Button className="w-full py-4 text-lg">Edit Profile</Button>
    </section>

    <section className="space-y-4">
      <h3 className="font-lexend text-xs font-black text-slate-400 uppercase tracking-widest px-1">Preferences</h3>
      <div className="bg-white border-2 border-slate-900 rounded-3xl overflow-hidden shadow-xl">
        {[
          { label: 'Dark Mode', icon: <Plus className="rotate-45" />, color: 'text-addition-blue', checked: false },
          { label: 'Sound Effects', icon: <Plus size={20} />, color: 'text-multiplication-purple', checked: true },
          { label: 'Haptic Feedback', icon: <Plus size={20} />, color: 'text-division-green', checked: true },
        ].map((item, i) => (
          <div key={item.label} className={`flex items-center justify-between p-5 ${i !== 2 ? 'border-b-2 border-slate-100' : ''}`}>
            <div className="flex items-center gap-4">
              <span className={item.color}>{item.icon}</span>
              <span className="font-lexend font-bold text-slate-900">{item.label}</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
              <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-addition-blue border-2 border-slate-900" />
            </label>
          </div>
        ))}
      </div>
    </section>

    <section className="space-y-4">
      <h3 className="font-lexend text-xs font-black text-slate-400 uppercase tracking-widest px-1">Account</h3>
      <div className="bg-white border-2 border-slate-900 rounded-3xl overflow-hidden shadow-xl">
        {[
          { label: 'Change Password', icon: <Plus className="rotate-45" />, color: 'text-subtraction-red' },
          { label: 'Subscription Status', badge: 'PRO', color: 'text-addition-blue' },
          { label: 'Logout', color: 'text-subtraction-red', isDanger: true },
        ].map((item, i) => (
          <button key={item.label} className={`w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors ${i !== 2 ? 'border-b-2 border-slate-100' : ''}`}>
            <span className={`font-lexend font-bold ${item.isDanger ? 'text-subtraction-red' : 'text-slate-900'}`}>{item.label}</span>
            {item.badge && <span className="bg-division-green text-white text-[10px] font-black px-3 py-1 rounded-full border-2 border-slate-900 shadow-sm">{item.badge}</span>}
            {!item.badge && !item.isDanger && <ArrowRight size={20} className="text-slate-400" />}
          </button>
        ))}
      </div>
    </section>

    <footer className="text-center py-10">
      <div className="flex justify-center gap-4 mb-4">
        <Button variant="secondary" className="px-4 py-2 text-xs">Terms</Button>
        <Button variant="secondary" className="px-4 py-2 text-xs">Privacy</Button>
      </div>
      <p className="font-inter text-xs text-slate-400 font-bold">MathFlash v2.4.0 (Build 88)</p>
    </footer>
  </motion.div>
);

export default SettingsPage;
