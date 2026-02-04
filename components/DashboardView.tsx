
import React, { useState } from 'react';
import { Icons, Button, Avatar, Dialog, cn } from './UIComponents';
import { AIPanel, AICard } from './AIPanel';
import { AIService } from '../services/ai';
import { SESSIONS, USERS } from '../constants';
import { CoverageStatus, Activity } from '../types';

export const DashboardView = () => {
  // Use static data instead of Context
  const sessions = SESSIONS;
  const users = USERS;
  
  // Static mock activity feed
  const activityFeed: Activity[] = [
    {
        id: 'init-1',
        userId: USERS[1].id,
        userName: USERS[1].name,
        userAvatar: USERS[1].avatar,
        action: 'uploaded PDF transcript for',
        target: 'Theranostics Keynote',
        timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
        type: 'upload'
    },
    {
        id: 'init-2',
        userId: USERS[0].id,
        userName: USERS[0].name,
        userAvatar: USERS[0].avatar,
        action: 'flagged critical insight in',
        target: 'Lead-212 Safety Profile',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
        type: 'alert'
    }
  ];

  const [isGenerating, setIsGenerating] = useState(false);
  const [briefResult, setBriefResult] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateBrief = async () => {
    setIsGenerating(true);
    try {
        const result = await AIService.generateDailyBrief(sessions);
        setBriefResult(result);
        setIsModalOpen(true);
    } catch (e) {
        console.error(e);
    } finally {
        setIsGenerating(false);
    }
  };

  // Calculate Real-time stats
  const assignedCount = sessions.filter(s => s.status !== CoverageStatus.UNASSIGNED).length;
  const coveragePercent = Math.round((assignedCount / sessions.length) * 100) || 0;
  
  const completedCount = sessions.filter(s => s.status === CoverageStatus.COMPLETE).length;
  const completedPercent = Math.round((completedCount / sessions.length) * 100) || 0;

  return (
    <div className="flex-1 flex h-full overflow-hidden relative">
        <div className="flex-1 flex flex-col h-full bg-[#F3F4F6] overflow-hidden relative font-sans">
            {/* Header */}
            <header className="h-18 px-8 py-4 flex items-center justify-between bg-white border-b border-slate-200">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Executive Dashboard</h1>
                <div className="flex items-center gap-3">
                    <Button variant="white" className="text-slate-500">
                        <Icons.Clock className="w-4 h-4 mr-2" /> Last updated: Just now
                    </Button>
                    <Button 
                        variant="primary" 
                        className="shadow-lg shadow-purple-500/30 min-w-[180px]"
                        onClick={handleGenerateBrief}
                        disabled={isGenerating}
                    >
                        {isGenerating ? (
                            <><Icons.Loader className="w-4 h-4 mr-2 animate-spin" /> Analyzing...</>
                        ) : (
                            "Generate Daily Brief"
                        )}
                    </Button>
                </div>
            </header>

            <div className="p-8 overflow-y-auto space-y-8 flex-1">
                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Icons.Live className="w-24 h-24 text-purple-600" />
                        </div>
                        <h3 className="text-slate-500 font-medium text-sm mb-2">Coverage Assignment</h3>
                        <div className="text-4xl font-bold text-slate-800 mb-2">{coveragePercent}%</div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded flex items-center">
                                <Icons.ArrowUpRight className="w-3 h-3 mr-1" /> +12%
                            </span>
                            <span className="text-slate-400">vs yesterday</span>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-500 transition-all duration-1000" style={{ width: `${coveragePercent}%` }}></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Icons.FileText className="w-24 h-24 text-blue-600" />
                        </div>
                        <h3 className="text-slate-500 font-medium text-sm mb-2">Completion Status</h3>
                        <div className="text-4xl font-bold text-slate-800 mb-2">{completedCount}/{sessions.length}</div>
                        <div className="flex items-center gap-2 text-sm">
                            <span className="text-blue-600 font-medium bg-blue-50 px-2 py-0.5 rounded">
                                {completedPercent}% Done
                            </span>
                            <span className="text-slate-400">of sessions</span>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${completedPercent}%` }}></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Icons.Users className="w-24 h-24 text-amber-600" />
                        </div>
                        <h3 className="text-slate-500 font-medium text-sm mb-2">Team Load</h3>
                        <div className="text-4xl font-bold text-slate-800 mb-2">Active</div>
                        <div className="flex items-center gap-2 text-sm">
                            <div className="flex -space-x-2 mr-2">
                                {users.map(u => <Avatar key={u.id} src={u.avatar} fallback={u.name[0]} size="sm" className="border-white" />)}
                            </div>
                            <span className="text-slate-400">{users.length} analysts online</span>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-amber-500 w-[100%]"></div>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Activity Feed */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <h2 className="font-bold text-slate-800">Team Activity</h2>
                            </div>
                            <Button variant="ghost" size="sm">Filter</Button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {activityFeed.map((activity) => (
                                <div key={activity.id} className="flex gap-4">
                                    <div className="mt-1">
                                        <Avatar src={activity.userAvatar} fallback={activity.userName[0]} size="md" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-sm font-bold text-slate-800">{activity.userName}</span>
                                            <span className="text-xs text-slate-400">
                                                {new Date(activity.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600">
                                            {activity.action} <span className="font-medium text-purple-700">{activity.target}</span>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Key Sessions */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                            <h2 className="font-bold text-slate-800">Up Next (Critical)</h2>
                            <Button variant="ghost" size="sm">Schedule</Button>
                        </div>
                        <div className="divide-y divide-slate-100 overflow-y-auto">
                            {sessions.slice(0, 4).map((session) => (
                                <div key={session.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                                    <div className="flex flex-col items-center min-w-[60px]">
                                        <span className="text-xs font-bold text-slate-400 uppercase">
                                            {session.startTime.split(' ')[0]}
                                        </span>
                                        <span className="text-xs text-slate-400">{session.startTime.split(' ')[1]}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-slate-700 text-sm mb-1 truncate max-w-[200px]">{session.title}</h4>
                                        <div className="flex items-center gap-3 text-xs text-slate-500">
                                            <span className="flex items-center gap-1"><Icons.Location className="w-3 h-3" /> {session.location}</span>
                                            {session.assignedTo.length > 0 ? (
                                                <span className="flex items-center gap-1 text-emerald-600">
                                                    <Icons.CheckCircle2 className="w-3 h-3" /> Assigned
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-amber-500">
                                                    <Icons.AlertTriangle className="w-3 h-3" /> Unassigned
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" className="h-8 text-xs">Details</Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Dashboard Specific AI */}
        <AIPanel title="Strategic Intel">
             <AICard title="Competitor Movement" type="Alert" typeColor="red">
                 <p>Novartis team has increased presence in <strong>Radio-ligand</strong> track by 40% compared to 2025.</p>
                 <div className="mt-2 flex items-center gap-2">
                     <Button size="sm" variant="outline" className="w-full text-xs h-7">View Analysis</Button>
                 </div>
             </AICard>
             
             <AICard title="Coverage Gap Risk" type="Warning" typeColor="amber">
                 <p>3 Critical Priority sessions on <strong>Lead-212</strong> overlap at 2:00 PM today.</p>
                 <div className="mt-2 text-xs font-medium text-purple-600 cursor-pointer hover:underline">
                     + Auto-optimize schedule
                 </div>
             </AICard>

             <AICard title="Emerging Narrative" type="Insight" typeColor="purple">
                 <p>Sentiment analysis suggests a shift in focus towards <strong>Combination Therapies</strong> in early stage abstracts.</p>
             </AICard>
        </AIPanel>

        {/* AI Result Dialog */}
        <Dialog 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            title="Daily Executive Briefing"
            actions={
                <>
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Close</Button>
                    <Button variant="primary">Share with Team</Button>
                </>
            }
        >
            <div className="prose prose-sm prose-slate max-w-none whitespace-pre-wrap">
                {briefResult}
            </div>
        </Dialog>
    </div>
  );
};
