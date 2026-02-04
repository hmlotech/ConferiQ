
import React, { useState } from 'react';
import { Icons, Button, Badge, Avatar, cn } from './UIComponents';
import { AIPanel, AICard } from './AIPanel';
import { DATE_TABS, AI_SUGGESTIONS, SESSIONS, USERS } from '../constants';
import { Session, SessionType, Priority, CoverageStatus } from '../types';

export const PlannerView = () => {
  // Use static data
  const sessions = SESSIONS;
  const users = USERS;

  const [dates, setDates] = useState(DATE_TABS);

  const handleDateClick = (idx: number) => {
    const newDates = dates.map((d, i) => ({ ...d, isActive: i === idx }));
    setDates(newDates);
  };

  // Group sessions by start time for the timeline view
  const groupedSessions: Record<string, Session[]> = {};
  sessions.forEach(s => {
      if (!groupedSessions[s.startTime]) groupedSessions[s.startTime] = [];
      groupedSessions[s.startTime].push(s);
  });
  
  // Sort times
  const sortedTimes = Object.keys(groupedSessions).sort((a,b) => a.localeCompare(b));

  return (
    <div className="flex-1 flex h-full overflow-hidden relative">
        <div className="flex-1 flex flex-col h-full bg-[#F3F4F6] overflow-hidden relative font-sans">
            {/* --- Top Header --- */}
            <header className="h-18 px-8 py-4 flex items-center justify-between bg-white border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Conference Planner</h1>
                    <span className="text-slate-400 text-sm">v2.4</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1 pr-3">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md bg-white shadow-sm">
                            <Icons.Search className="w-4 h-4 text-slate-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                            <Icons.Settings className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button variant="primary" className="pl-4 pr-4 h-10 rounded-xl font-semibold shadow-lg shadow-purple-500/30">
                        LAUNCH <Icons.ChevronDown className="ml-2 w-4 h-4 opacity-70" />
                    </Button>
                </div>
            </header>

            {/* --- Controls Bar --- */}
            <div className="px-8 py-6 space-y-6 bg-[#F3F4F6]">
                {/* Title & Dates Row */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <span className="text-xl font-bold text-slate-800">AACR 2026</span>
                        <div className="h-6 w-px bg-slate-300"></div>
                        <div className="flex items-center gap-1">
                            {dates.map((tab, idx) => (
                                <button
                                    key={tab.label}
                                    onClick={() => handleDateClick(idx)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1",
                                        tab.isActive 
                                            ? "bg-white text-slate-800 shadow-sm border border-slate-200" 
                                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                                    )}
                                >
                                    {tab.label} <Icons.ChevronDown className="w-3 h-3 opacity-50" />
                                </button>
                            ))}
                            <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 flex items-center ml-2">
                                Custom <Icons.ChevronDown className="ml-1 w-3 h-3" />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="white" className="gap-2 text-slate-600 font-medium">
                            <Icons.Upload className="w-4 h-4" /> Upload PDF or <Icons.ChevronDown className="w-3 h-3 opacity-50" />
                        </Button>
                        <Button variant="white" className="gap-2 text-purple-600 font-medium border-purple-100 bg-purple-50 hover:bg-purple-100">
                            <Icons.Plus className="w-4 h-4" /> Add Session
                        </Button>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                        <Button variant="white" className="gap-2 px-4 shadow-sm">
                            <Icons.List className="w-4 h-4 text-purple-500" /> All Topics
                        </Button>
                        <Button variant="ghost" className="gap-2 px-4 bg-purple-100/50 text-purple-700 hover:bg-purple-100 border border-purple-200/50">
                            <Icons.Grid className="w-4 h-4" /> All Tracks
                        </Button>
                        <Button variant="white" className="gap-2 px-4 text-slate-500">
                            All Tracks <Icons.ChevronDown className="w-3 h-3" />
                        </Button>
                        
                        <div className="relative">
                            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input 
                                type="text" 
                                placeholder="Search" 
                                className="bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-sm w-48 placeholder:text-slate-400"
                            />
                        </div>

                        <div className="h-6 w-px bg-slate-300 mx-2"></div>

                        <Button variant="ghost" className="gap-2 text-slate-500 hover:bg-slate-200/50">
                            <Icons.Plus className="w-4 h-4" /> Add Session
                        </Button>
                    </div>
                </div>
            </div>

            {/* --- Main Grid Content --- */}
            <div className="flex-1 overflow-y-auto px-8 pb-8">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-w-[800px]">
                    {/* Header */}
                    <div className="grid grid-cols-[100px_1fr_1fr_1fr] bg-slate-50/50 border-b border-slate-100">
                        <div className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</div>
                        <div className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Track</div>
                        <div className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">TMT 145</div>
                        <div className="p-4 text-xs font-semibold text-slate-500 uppercase tracking-wider flex justify-between">
                            <span>19 Jan 5</span>
                            <span className="text-slate-400">1.2.1 Task</span>
                        </div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-slate-100">
                        {sortedTimes.map((time) => (
                             <div key={time} className="grid grid-cols-[100px_1fr_1fr_1fr] min-h-[140px] hover:bg-slate-50/30 transition-colors group">
                                <div className="p-6 text-sm font-medium text-slate-500">{time}</div>
                                
                                {groupedSessions[time].map((session, idx) => (
                                    <div key={session.id} className={cn("p-3 border-r border-slate-100 border-dashed", idx >= 2 ? "col-span-2" : "")}>
                                        <SessionCard 
                                            session={session} 
                                            color={idx === 0 ? "blue" : idx === 1 ? "purple" : "green"} 
                                            headerText={session.track.length > 20 ? session.track.substring(0,18) + '...' : session.track}
                                            subText={`${session.location}, 60min`}
                                            match={session.matchScore ? `${session.matchScore}%` : undefined}
                                            wide={idx >= 2}
                                        />
                                    </div>
                                ))}

                                {/* Add placeholder slots if less than 3 sessions */}
                                {groupedSessions[time].length < 3 && (
                                    <div className="p-3 flex items-center justify-center">
                                        <div className="w-full h-full border border-dashed border-slate-200 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-slate-50">
                                            <Icons.Plus className="w-5 h-5 text-slate-300" />
                                        </div>
                                    </div>
                                )}
                             </div>
                        ))}
                    </div>
                </div>
                
                {/* Footer Stats */}
                <div className="mt-8 bg-slate-100 rounded-xl p-1 flex overflow-hidden h-6">
                    <div className="bg-[#5B8C98] w-[50%] h-full rounded-l-lg"></div>
                    <div className="bg-[#A4D4BC] w-[15%] h-full"></div>
                    <div className="bg-[#F0C988] w-[20%] h-full"></div>
                    <div className="bg-[#DAB38E] w-[10%] h-full"></div>
                    <div className="bg-[#D8D29F] w-[5%] h-full rounded-r-lg"></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-500 px-2 font-medium">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#5B8C98]"></div> Theranostics 50%</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#A4D4BC]"></div> Radiopharma 15%</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#F0C988]"></div> Ac-225 20%</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#DAB38E]"></div> Lead-212 10%</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#D8D29F]"></div> Lead-212 10%</div>
                </div>
            </div>
        </div>

        {/* Planner Specific AI */}
        <AIPanel title="Planner AI">
             {AI_SUGGESTIONS.map(suggestion => (
                 <AICard key={suggestion.id} title={suggestion.title} type={suggestion.type} typeColor="blue">
                     <p>{suggestion.reason}</p>
                     <div className="mt-2 flex justify-between items-center">
                         <span className="text-purple-600 font-bold">{suggestion.score}% Match</span>
                         <Button size="sm" variant="outline" className="h-6 text-[10px]">Add</Button>
                     </div>
                 </AICard>
             ))}
             
             <div className="pt-4 border-t border-slate-100">
                 <h3 className="font-bold text-slate-700 uppercase text-xs tracking-wider mb-3">Coverage Conflicts</h3>
                 {users.slice(0, 2).map(user => (
                    <div key={user.id} className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100 shadow-sm mb-2">
                        <div className="flex items-center gap-3">
                            <Avatar src={user.avatar} fallback={user.name[0]} size="sm" />
                            <div>
                                <p className="text-xs font-semibold text-slate-700">{user.name}</p>
                                <p className="text-[10px] text-slate-400 text-red-400">Double booked @ 9am</p>
                            </div>
                        </div>
                        <Icons.AlertTriangle className="w-4 h-4 text-red-400" />
                    </div>
                 ))}
             </div>
        </AIPanel>
    </div>
  );
};

// --- Sub-component: Session Card ---
const SessionCard = ({ session, color, headerText, subText, match, wide }: { session: Session, color: string, headerText: string, subText: string, match?: string, wide?: boolean }) => {
    
    const getColors = (c: string) => {
        switch(c) {
            case 'blue': return 'bg-[#E1F0F3] text-[#417684]';
            case 'purple': return 'bg-[#F2EFF7] text-[#6B5A8A]';
            case 'green': return 'bg-[#E6F3EB] text-[#4C8865]';
            case 'orange': return 'bg-[#FFF4E5] text-[#B87033]';
            case 'indigo': return 'bg-[#EEF2FF] text-[#4F46E5]';
            case 'teal': return 'bg-[#E0F2F1] text-[#00897B]';
            default: return 'bg-slate-100 text-slate-600';
        }
    }

    const colorClasses = getColors(color);
    const statusColor = session.status === CoverageStatus.COMPLETE ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                        session.status === CoverageStatus.IN_PROGRESS ? 'bg-amber-50 text-amber-600 border-amber-100' :
                        'bg-slate-50 text-slate-400 border-slate-100';

    return (
        <div className={cn(
            "bg-white rounded-xl shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border border-slate-100 h-full flex flex-col hover:shadow-md transition-all cursor-pointer relative overflow-hidden group/card",
            wide ? "flex-row items-center p-0" : "p-0",
            session.status === CoverageStatus.IN_PROGRESS ? "ring-2 ring-amber-400/30" : ""
        )}>
            {/* Header/Tag Strip */}
            <div className={cn(
                "px-3 py-2 flex items-center gap-2 text-xs font-bold transition-colors",
                colorClasses,
                wide ? "h-full w-48 flex-col justify-center items-start border-r border-slate-100" : "w-full"
            )}>
                 {color === 'blue' && <Icons.Circle className="w-3 h-3 fill-current" />}
                 {color === 'purple' && <Icons.List className="w-3 h-3" />}
                 {color === 'green' && <Icons.CheckCircle2 className="w-3 h-3" />}
                 {color === 'orange' && <Icons.List className="w-3 h-3" />}
                 
                 <span className="truncate w-full">{headerText}</span>
            </div>

            <div className={cn("flex flex-col flex-1", wide ? "p-3 pl-4" : "p-3")}>
                 {/* Metadata */}
                 {!wide && (
                     <div className="text-[10px] text-slate-400 mb-2 flex justify-between items-center">
                        <span className="truncate">{subText}</span>
                        {match && <span className="text-purple-600 font-bold bg-purple-50 px-1 rounded">{match}</span>}
                     </div>
                 )}

                 {/* Title */}
                 {!wide && (
                    <p className="text-sm font-medium text-slate-700 leading-snug mb-3 line-clamp-2 group-hover/card:text-purple-700 transition-colors">
                        {session.title}
                    </p>
                 )}
                 {wide && (
                     <div className="flex justify-between w-full items-center">
                        <div>
                             <p className="text-sm font-medium text-slate-700 leading-snug mb-1 group-hover/card:text-purple-700 transition-colors">
                                {session.title}
                            </p>
                            <p className="text-xs text-slate-400 flex items-center gap-2">
                                <span className="w-2 h-2 bg-slate-300 rounded-sm"></span>
                                {subText}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-md">4:00 PM</span>
                            <div className="flex -space-x-2">
                                {session.assignedTo.map(u => (
                                    <Avatar key={u.id} src={u.avatar} fallback={u.name[0]} size="sm" />
                                ))}
                            </div>
                        </div>
                     </div>
                 )}

                 {/* Footer: Avatars & Status */}
                 {!wide && (
                     <div className="mt-auto flex items-center justify-between">
                         <div className="flex -space-x-2">
                            {session.assignedTo.length > 0 ? (
                                session.assignedTo.map(u => (
                                    <Avatar key={u.id} src={u.avatar} fallback={u.name[0]} size="sm" />
                                ))
                            ) : (
                                <div className="w-6 h-6 rounded-full bg-slate-50 border border-dashed border-slate-300 flex items-center justify-center">
                                    <Icons.Plus className="w-3 h-3 text-slate-400" />
                                </div>
                            )}
                         </div>
                         <div className={cn("text-[10px] px-1.5 py-0.5 rounded border font-mono transition-colors", statusColor)}>
                             {session.status}
                         </div>
                     </div>
                 )}
            </div>
        </div>
    );
};
