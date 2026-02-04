
import React, { useState } from 'react';
import { Sidebar, View } from './components/Sidebar';
import { PlannerView } from './components/PlannerView';
import { LiveCoverageView } from './components/LiveCoverageView';
import { DashboardView } from './components/DashboardView';
import { ReportsView } from './components/ReportsView';
import { TeamView } from './components/TeamView';
import { SettingsView } from './components/SettingsView';
import { Icons, cn } from './components/UIComponents';

const AppContent = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardView />;
      case 'planner': return <PlannerView />;
      case 'live': return <LiveCoverageView />;
      case 'reports': return <ReportsView />;
      case 'team': return <TeamView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F3F4F6] text-slate-800 font-sans">
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />
      <main className="flex-1 flex overflow-hidden shadow-2xl rounded-l-[30px] my-4 ml-4 bg-[#F3F4F6] relative z-10 border border-slate-200/50">
        {renderView()}
      </main>
    </div>
  );
}

export default function App() {
  return <AppContent />;
}
