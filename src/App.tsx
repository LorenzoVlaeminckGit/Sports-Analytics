import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { EVCalculator } from './components/EVCalculator';
import { BankrollManager } from './components/BankrollManager';
import { OddsComparisonEngine } from './components/OddsComparisonEngine';
import { GenerativeModule } from './components/GenerativeModule';
import { Documentation } from './components/Documentation';
import { About } from './components/About';
import { DecisionLog } from './components/DecisionLog';
import { MODULES } from './constants';

export default function App() {
  const [activeModule, setActiveModule] = useState('documentation');

  const renderContent = () => {
    switch (activeModule) {
      case 'documentation':
        return <Documentation />;
      case 'dashboard':
        return <Dashboard />;
      case 'ev-calculator':
        return <EVCalculator />;
      case 'bankroll-manager':
        return <BankrollManager />;
      case 'odds-comparison':
        return <OddsComparisonEngine />;
      case 'about':
        return <About />;
      case 'decision-log':
        return <DecisionLog />;
      // Fallbacks for other component-based modules that are not fully built yet
      case 'line-movement':
      case 'clv-tracker':
      case 'multi-model':
      case 'variance-simulator':
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center glass-card p-8 rounded-xl shadow-[0_0_20px_rgba(34,211,238,0.1)] border border-white/5">
              <h2 className="text-xl text-slate-200 font-medium mb-2">{MODULES.find(m => m.id === activeModule)?.name}</h2>
              <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">Module offline // Under construction</p>
            </div>
          </div>
        );
      default:
        // Use GenerativeModule for anything marked 'ai' category or specifically for reports
        return <GenerativeModule moduleId={activeModule} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-gradient-main text-slate-200 font-sans selection:bg-cyan-500/30">
      <Sidebar activeModule={activeModule} setActiveModule={setActiveModule} />
      <main className="flex-1 flex flex-col h-full bg-transparent overflow-hidden">
        {renderContent()}
      </main>
    </div>
  );
}
