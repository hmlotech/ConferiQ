import React from 'react';
import { Icons, cn } from './UIComponents';

const NAV_ITEMS = [
  { id: 'home', icon: Icons.Dashboard, label: 'Home' },
  { id: 'dashboard', icon: Icons.List, label: 'Dashboard' },
  { id: 'planner', icon: Icons.Planner, label: 'Conference Planner' },
  { id: 'live', icon: Icons.Live, label: 'Live Coverage' },
  { id: 'reports', icon: Icons.Reports, label: 'Reports Hub' },
  { id: 'team', icon: Icons.Users, label: 'Team' },
  { id: 'settings', icon: Icons.Settings, label: 'Settings' },
];

export type View = 'home' | 'dashboard' | 'planner' | 'live' | 'reports' | 'team' | 'settings' | 'conference-detail';

interface SidebarProps {
  currentView?: View;
  onNavigate?: (view: View) => void;
}

export const Sidebar = ({ currentView = 'planner', onNavigate }: SidebarProps) => {
  return (
    <div className="w-20 h-screen bg-[#1E1B2E] flex flex-col items-center flex-shrink-0 py-6 gap-8 z-50">
      {/* Logo */}
      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 cursor-pointer" onClick={() => onNavigate?.('planner')}>
        <span className="text-white font-bold text-xl">C</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-4 w-full px-4">
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === currentView;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate?.(item.id as View)}
              className={cn(
                "w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-[#7C3AED] text-white shadow-lg shadow-purple-500/25"
                  : "text-slate-400 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "")} />
              {isActive && (
                <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-400 rounded-r-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div className="mt-auto flex flex-col gap-6 items-center">
        <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
          <Icons.Bell className="w-5 h-5" />
        </button>
        <div className="relative cursor-pointer">
          <img src="https://picsum.photos/seed/user/40/40" alt="User" className="w-10 h-10 rounded-full border-2 border-[#7C3AED]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#1E1B2E]"></div>
        </div>
      </div>
    </div>
  );
};