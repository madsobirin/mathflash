/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLocation, useNavigate } from 'react-router-dom';
import {
  Zap,
  BarChart3,
  Settings as SettingsIcon,
} from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // Don't show bottom nav during practice or results
  if (currentPath === '/practice' || currentPath === '/results') return null;

  const tabs = [
    { path: '/', label: 'Play', Icon: Zap },
    { path: '/stats', label: 'Stats', Icon: BarChart3 },
    { path: '/settings', label: 'Setup', Icon: SettingsIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] z-50 flex justify-around items-center px-4 py-4 pb-10 bg-white border-t-4 border-slate-900 rounded-t-3xl shadow-[0_-4px_0px_0px_rgba(0,0,0,0.1)]">
      {tabs.map(({ path, label, Icon }) => {
        const isActive = currentPath === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 ${
              isActive
                ? 'bg-primary text-white border-2 border-slate-900 translate-y-[-4px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <Icon size={24} fill={isActive ? 'currentColor' : 'none'} />
            <span className="font-lexend font-black text-[10px] uppercase tracking-wider mt-1">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNav;
