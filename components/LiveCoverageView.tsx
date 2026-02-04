import React from 'react';
import { Icons, Button, Badge, Avatar, cn } from './UIComponents';
import { AIPanel, AICard } from './AIPanel';
import { USERS } from '../constants';

// Mock data specific to the Live View mockup
const LIVE_SESSIONS = [
  {
    id: 1,
    time: '8.00 am',
    title: 'Lead-212 Targeted Therapy',
    room: 'Room E76',
    duration: '90.06am',
    status: 'live',
    analysts: USERS,
    meta1: 'Room E76',
    meta2: 'Sociflows',
    pattern: 'bg-gradient-to-r from-cyan-50/80 via-white to-white'
  },
  {
    id: 2,
    time: '9:30 am',
    title: 'Epoptoluccine on Captacticas-Mashiiacea',
    room: 'Pattal: E75, 6:00am',
    status: 'live',
    analysts: [USERS[1], USERS[2]],
    meta1: 'Room 575',
    meta2: 'Room',
    typeIcon: 'red',
    pattern: 'bg-white'
  },
  {
    id: 3,
    time: '10.10 am',
    title: 'Theranostics Advances',
    room: 'Room E76, 10.08am',
    status: 'live',
    analysts: [USERS[0], USERS[2], USERS[3]],
    meta1: 'Room 675',
    meta2: 'Sociflows',
    note: '3:00 PM',
    pattern: 'bg-gradient-to-r from-blue-50/50 via-white to-white'
  },
  {
    id: 4,
    time: '11:00 am',
    title: 'Summor therapy, Now Thesis',
    room: 'Room E76, 600am',
    status: 'live',
    analysts: USERS,
    meta1: 'Sosan Bellamy',
    meta2: 'Room',
    note: '2:30 PM',
    typeIcon: 'red',
    pattern: 'bg-white'
  }
];

export const LiveCoverageView = () => {
  return (
    <div className="flex-1 flex h-full overflow-hidden relative">
        <div className="flex-1 flex flex-col h-full bg-[#F3F4F6] overflow-hidden relative font-sans">
            {/* --- Header --- */}
            <header className="h-18 px-8 py-4 flex items-center justify-between bg-white border-b border-slate-200">
                <div className="flex items-center gap-3">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Live Conference Coverage</h1>
                    <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1 pr-3">
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md bg-white shadow-sm">
                            <Icons.Search className="w-4 h-4 text-slate-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600">
                            <Icons.User className="w-4 h-4" />
                        </Button>
                    </div>
                    <Button className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-6 h-10 rounded-xl font-semibold shadow-lg shadow-purple-500/30">
                        END DAY <Icons.ChevronDown className="ml-2 w-4 h-4 opacity-70" />
                    </Button>
                </div>
            </header>

            {/* --- Controls & Metrics --- */}
            <div className="px-8 py-6 space-y-6 bg-[#F3F4F6] overflow-y-auto">
                
                {/* Date Tabs & Filters */}
                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                    <div className="flex items-center gap-6">
                        <span className="text-xl font-bold text-slate-800">AACR 2026</span>
                        <div className="h-6 w-px bg-slate-300"></div>
                        <div className="flex items-center gap-1">
                            <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700">Apr 6 <Icons.ChevronDown className="inline w-3 h-3 opacity-50 ml-1"/></button>
                            <button className="px-3 py-1.5 text-sm font-medium text-slate-800 bg-white shadow-sm border border-slate-200 rounded-lg">Apr 7 <Icons.ChevronDown className="inline w-3 h-3 opacity-50 ml-1"/></button>
                            <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700">Apr 8 <Icons.ChevronDown className="inline w-3 h-3 opacity-50 ml-1"/></button>
                            <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700">Apr 9 <Icons.ChevronDown className="inline w-3 h-3 opacity-50 ml-1"/></button>
                            <button className="px-3 py-1.5 text-sm font-medium text-slate-500 hover:text-slate-700">Custom <Icons.ChevronDown className="inline w-3 h-3 opacity-50 ml-1"/></button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant="white" className="text-slate-500 text-xs h-8">
                            <Icons.Upload className="w-3 h-3 mr-2" /> Overall Progress <Icons.ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                        </Button>
                        <Button variant="white" className="text-slate-500 text-xs h-8">
                            <Icons.CheckCircle2 className="w-3 h-3 mr-2" /> Check-in Needed <Icons.ChevronDown className="w-3 h-3 ml-1 opacity-50" />
                        </Button>
                        <Button variant="ghost" className="text-slate-500 text-xs h-8 hover:bg-slate-200/50">
                            <Icons.List className="w-3 h-3 mr-2" /> Show All Updates
                        </Button>
                    </div>
                </div>

                {/* Secondary Filter Bar */}
                <div className="flex items-center gap-3">
                    <Button variant="white" className="gap-2 px-4 shadow-sm h-9 bg-purple-50 text-purple-700 border-purple-200">
                        <Icons.List className="w-4 h-4" /> All Topics
                    </Button>
                    <Button variant="ghost" className="gap-2 px-4 bg-purple-100/30 text-slate-600 hover:bg-purple-100/50 border border-transparent h-9">
                        <Icons.Grid className="w-4 h-4 text-slate-400" /> All Tracks
                    </Button>
                    <Button variant="ghost" className="gap-2 px-4 bg-purple-100/30 text-slate-600 hover:bg-purple-100/50 border border-transparent h-9">
                        <Icons.Grid className="w-4 h-4 text-slate-400" /> All Tracks <Icons.ChevronDown className="w-3 h-3 opacity-50" />
                    </Button>
                    <div className="relative">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search" 
                            className="bg-purple-50/50 border border-transparent hover:border-purple-200 rounded-lg pl-9 pr-4 h-9 text-sm text-slate-700 focus:outline-none w-32 placeholder:text-slate-400 transition-all"
                        />
                    </div>
                    <Button variant="ghost" className="gap-2 text-slate-500 hover:bg-slate-200/50 h-9">
                        <Icons.Plus className="w-4 h-4" /> Add Session
                    </Button>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-4 gap-4">
                    {/* Card 1 */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-24">
                        <span className="text-sm font-semibold text-slate-700">Coverage Progress</span>
                        <div className="flex items-end justify-between">
                            <div className="text-xs text-slate-500 font-medium"><span className="text-slate-900 font-bold text-lg">24 / 28</span> Sessions Covered</div>
                            <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">85.7%</span>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-24">
                        <span className="text-sm font-semibold text-slate-700">Full Completion Rate</span>
                        <div className="flex items-end justify-between">
                            <div className="text-xs text-slate-500 font-medium"><span className="text-slate-900 font-bold text-lg">19 / 28</span> Fully Completed</div>
                            <span className="bg-[#F0C988] text-amber-900 text-xs font-bold px-2 py-1 rounded">67.9%</span>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-24">
                        <span className="text-sm font-semibold text-slate-700">Left Out Sessions</span>
                        <div className="flex items-end justify-between">
                            <div className="text-xs text-slate-500 font-medium"><span className="text-red-500 font-bold text-lg">4</span> Missed Sessions</div>
                            <span className="bg-red-400 text-white text-xs font-bold px-2 py-1 rounded">14.3%</span>
                        </div>
                    </div>

                    {/* Card 4 (Decorative) */}
                    <div className="bg-slate-100/50 p-4 rounded-xl border border-slate-200/50 shadow-inner flex items-center justify-center h-24 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-400 via-slate-100 to-transparent"></div>
                        <div className="w-2 h-2 bg-slate-300 rounded-full mx-1"></div>
                        <div className="w-2 h-2 bg-slate-300 rounded-full mx-1"></div>
                        <div className="w-2 h-2 bg-slate-300 rounded-full mx-1"></div>
                    </div>
                </div>

                {/* --- List View --- */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* List Header */}
                    <div className="grid grid-cols-[80px_2fr_1fr_1fr] gap-4 px-6 py-3 border-b border-slate-100 bg-slate-50/50">
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Time</div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Title</div>
                        <div className="grid grid-cols-4 gap-2 opacity-10">
                            <div className="h-2 bg-slate-300 rounded"></div>
                            <div className="h-2 bg-slate-300 rounded"></div>
                            <div className="h-2 bg-slate-300 rounded"></div>
                            <div className="h-2 bg-slate-300 rounded"></div>
                        </div>
                        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide text-right flex items-center justify-end gap-1">
                            <Icons.Settings className="w-3 h-3" /> Analysts <Icons.ChevronDown className="w-3 h-3" />
                        </div>
                    </div>

                    {/* List Rows */}
                    <div className="divide-y divide-slate-100">
                        {LIVE_SESSIONS.map((session) => (
                            <div key={session.id} className={cn("grid grid-cols-[80px_2fr_1fr_1fr] gap-4 px-6 py-4 hover:bg-slate-50 transition-colors group items-center", session.pattern)}>
                                {/* Time */}
                                <div className="text-sm font-medium text-slate-600">{session.time}</div>

                                {/* Title & Status */}
                                <div className="flex items-center gap-3">
                                    <div className="relative flex-shrink-0">
                                        <div className={cn("w-2.5 h-2.5 rounded-full", session.id % 2 === 0 ? "bg-emerald-400" : "bg-teal-500")}></div>
                                        {session.id === 1 && <div className="absolute inset-0 bg-teal-500 rounded-full animate-ping opacity-20"></div>}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-800 leading-tight mb-1">{session.title}</h4>
                                        <p className="text-xs text-slate-400 flex items-center gap-1">
                                            {session.room} <Icons.ChevronDown className="w-3 h-3 opacity-50" />
                                        </p>
                                    </div>
                                </div>

                                {/* Middle Meta Columns */}
                                <div className="flex items-center gap-8">
                                    {/* Mock Avatars for abstract owners/speakers */}
                                    {session.id === 2 || session.id === 3 ? (
                                        <div className="flex -space-x-2 opacity-80">
                                            <Avatar size="sm" fallback="A" className="w-8 h-8 border-white" />
                                            <Avatar size="sm" fallback="B" className="w-8 h-8 border-white" />
                                            {session.id === 3 && <Avatar size="sm" fallback="C" className="w-8 h-8 border-white" />}
                                        </div>
                                    ) : (
                                        <div></div>
                                    )}

                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-xs text-slate-600 font-medium">
                                            <Icons.List className="w-3 h-3 text-slate-400" /> {session.meta1}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            {session.typeIcon === 'red' ? (
                                                <div className="w-3 h-3 rounded-full bg-red-100 flex items-center justify-center text-[8px] text-red-500 font-bold">R</div>
                                            ) : (
                                                <div className="w-3 h-3 rounded-full bg-blue-100 flex items-center justify-center text-[8px] text-blue-500 font-bold">●</div>
                                            )}
                                            {session.meta2}
                                        </div>
                                    </div>
                                </div>

                                {/* Analysts / Right Actions */}
                                <div className="flex items-center justify-end gap-4">
                                    {session.note && (
                                        <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">{session.note}</span>
                                    )}
                                    {session.typeIcon && !session.note && (
                                        <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-400">
                                            <span className="text-[10px] font-bold">α</span>
                                        </div>
                                    )}
                                    <div className="flex -space-x-2">
                                        {session.analysts.map((u, i) => (
                                            <Avatar key={i} src={u.avatar} fallback={u.name[0]} size="md" className="border-2 border-white w-9 h-9" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Stats - Reused Design */}
                <div className="mt-4 bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between gap-4 text-sm">
                        <div className="flex items-center gap-6">
                            <span className="flex items-center gap-2 font-medium text-slate-700 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
                                <Icons.CheckCircle2 className="w-4 h-4 text-purple-600" /> Assigned: <span className="text-slate-900 font-bold">26 / 32</span>
                            </span>
                            <span className="flex items-center gap-2 font-medium text-slate-700 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
                                <Icons.CheckCircle2 className="w-4 h-4 text-purple-600" /> High-Priority: <span className="text-slate-900 font-bold">12</span>
                            </span>
                            <span className="flex items-center gap-2 font-medium text-slate-700 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-100">
                                <Icons.CheckCircle2 className="w-4 h-4 text-purple-600" /> Priority Coverage: <span className="text-slate-900 font-bold">90%</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button size="sm" className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs py-1 h-7 rounded-md shadow-sm border-0 font-normal">
                            + Theranostics
                        </Button>
                        <Button size="sm" className="bg-[#8BB8C6] hover:bg-[#7AA8B6] text-white text-xs py-1 h-7 rounded-md shadow-sm border-0 font-normal">
                            + Radiopharma
                        </Button>
                        <Button size="sm" className="bg-[#F3D68A] hover:bg-[#E3C67A] text-amber-900 text-xs py-1 h-7 rounded-md shadow-sm border-0 font-normal">
                            + Ac-225 15%
                        </Button>
                        <Button size="sm" className="bg-[#F0C0D4] hover:bg-[#E0B0C4] text-pink-900 text-xs py-1 h-7 rounded-md shadow-sm border-0 font-normal">
                            <Icons.Circle className="w-2 h-2 fill-current mr-1 text-red-500" /> Lead-212 10%
                        </Button>
                    </div>
                </div>
                
                {/* Bottom Progress Bar - Reused Design */}
                <div className="bg-slate-100 rounded-full h-3 flex overflow-hidden w-full">
                    <div className="bg-[#7B8BB2] w-[50%] h-full"></div>
                    <div className="bg-[#8BB8C6] w-[15%] h-full"></div>
                    <div className="bg-[#C5D9D4] w-[15%] h-full"></div>
                    <div className="bg-[#F3D68A] w-[10%] h-full"></div>
                    <div className="bg-[#F0C0D4] w-[10%] h-full"></div>
                </div>
                <div className="flex justify-between text-[10px] text-slate-500 px-1 font-medium pb-2">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-sm bg-[#7B8BB2]"></div> Theranostics 50%</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-sm bg-[#8BB8C6]"></div> Radiopharma 15%</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-sm bg-[#C5D9D4]"></div> Ac-225 15%</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-sm bg-[#F3D68A]"></div> Lead-212 10%</div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-sm bg-[#F0C0D4]"></div> Lead-212 15%</div>
                </div>

            </div>
        </div>

        {/* Live View AI Panel */}
        <AIPanel title="Live Insights">
             <AICard title="Transcription Highlights" type="Real-time" typeColor="green">
                 <p className="mb-2"><strong>Dr. Patel</strong> mentioned "unexpected toxicity" in the 50mg cohort during Q&A.</p>
                 <div className="text-[10px] text-slate-400">Captured 2m ago in Room 575</div>
             </AICard>

             <AICard title="Trending Topic" type="Buzz" typeColor="purple">
                 <p>Discussions around <strong>ADC Linker Stability</strong> have spiked by 200% this morning.</p>
             </AICard>

             <AICard title="Sentiment Alert" type="Negative" typeColor="red">
                 <p>Mixed reactions detected in <strong>Keynote Room E75</strong> regarding the new Phase 3 data.</p>
             </AICard>
        </AIPanel>
    </div>
  );
};