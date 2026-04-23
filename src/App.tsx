/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Outlet } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

export default function App() {
  return (
    <div className="min-h-screen pb-32">
      <Header xp={840} />
      <main>
        <AnimatePresence mode="wait">
          <Outlet />
        </AnimatePresence>
      </main>
      <BottomNav />
    </div>
  );
}
