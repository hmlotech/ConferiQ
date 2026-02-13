import React, { useState } from 'react';
import { Sidebar, View } from './components/Sidebar';
import { PlannerView } from './components/PlannerView';
import { LiveCoverageView } from './components/LiveCoverageView';
import { DashboardView } from './components/DashboardView';
import { ReportsView } from './components/ReportsView';
import { TeamView } from './components/TeamView';
import { SettingsView } from './components/SettingsView';
import { HomeView } from './components/HomeView';
import { ConferenceDetailView } from './components/ConferenceDetailView';
import { ConferenceProvider } from './contexts/ConferenceContext';

const AppContent = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedConferenceId, setSelectedConferenceId] = useState<string | null>(null);

  const handleNavigate = (view: View, id?: string) => {
    setCurrentView(view);
    if (id) setSelectedConferenceId(id);
  };

  const renderView = () => {
    switch (currentView) {
      case 'home': return <HomeView onNavigateDetail={(id) => handleNavigate('conference-detail', id)} onNavigate={handleNavigate} />;
      case 'conference-detail': return <ConferenceDetailView conferenceId={selectedConferenceId} onBack={() => handleNavigate('home')} onNavigate={handleNavigate} />;
      case 'dashboard': return <DashboardView />;
      case 'planner': return <PlannerView conferenceId={selectedConferenceId} onNavigate={handleNavigate} />;
      case 'live': return <LiveCoverageView />;
      case 'reports': return <ReportsView />;
      case 'team': return <TeamView />;
      case 'settings': return <SettingsView />;
      default: return <HomeView onNavigateDetail={(id) => handleNavigate('conference-detail', id)} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F3F4F6] text-slate-800 font-sans">
      <Sidebar currentView={currentView} onNavigate={handleNavigate} />
      <main className="flex-1 flex overflow-hidden shadow-2xl rounded-l-[30px] my-4 ml-4 bg-[#F3F4F6] relative z-10 border border-slate-200/50">
        {renderView()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ConferenceProvider>
      <AppContent />
    </ConferenceProvider>
  );
}
