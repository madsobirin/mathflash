/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLocation, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Stars,
  Settings as SettingsIcon,
} from 'lucide-react';

interface HeaderProps {
  xp: number;
}

const Header = ({ xp }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isPractice = location.pathname === '/practice';

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex justify-between items-center px-6 py-4 w-full max-w-[600px] mx-auto">
        <div className="flex items-center gap-3">
          {isPractice && (
            <button onClick={() => navigate('/')} className="bg-white border-2 border-slate-900 p-1 rounded-lg active-press mr-2">
              <ChevronLeft />
            </button>
          )}
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter font-lexend uppercase">MathFlash</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-primary-container text-white px-4 py-1.5 rounded-full border-2 border-slate-900 neubrutal-shadow flex items-center gap-2">
            <Stars size={16} fill="currentColor" />
            <span className="font-lexend font-black text-sm">{xp} XP</span>
          </div>
          <button onClick={() => navigate('/settings')} className="text-slate-900 hover:bg-slate-100 p-2 rounded-full active-press">
            <SettingsIcon />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
