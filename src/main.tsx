import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import MenuPage from './pages/MenuPage.tsx';
import PracticePage from './pages/PracticePage.tsx';
import ResultsPage from './pages/ResultsPage.tsx';
import StatsPage from './pages/StatsPage.tsx';
import SettingsPage from './pages/SettingsPage.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<MenuPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
