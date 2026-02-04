import React from 'react';
import { Icons, Button, Avatar, Badge, cn } from './UIComponents';
import { AIPanel, AICard } from './AIPanel';
import { USERS } from '../constants';

export const TeamView = () => {
  return (
    <div className="flex-1 flex h-full overflow-hidden relative">
        <div className="flex-1 flex flex-col h-full bg-[#F3F4F6] overflow-hidden relative font-sans">
            {/* Header */}
            <header className="h-18 px-8 py-4 flex items-center justify-between bg-white border-b border-slate-200">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Team Management</h1>
                <Button variant="primary" className="shadow-lg shadow-purple-500/30 gap-2">
                    <Icons.Plus className="w-4 h-4" /> Add Member
                </Button>
            </header>

            <div className="p-8 overflow-y-auto">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {/* Table Header */}
                    <div className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr_50px] gap-4 px-6 py-4 border-b border-slate-100 bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        <div>Member</div>
                        <div>Role</div>
                        <div>Status</div>
                        <div>Coverage Load</div>
                        <div>Reports</div>
                        <div></div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-slate-100">
                        {USERS.map((user, idx) => (
                            <div key={user.id} className="grid grid-cols-[3fr_1fr_1fr_1fr_1fr_50px] gap-4 px-6 py-4 items-center hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <Avatar src={user.avatar} fallback={user.name[0]} size="lg" />
                                        <div className={cn("absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white", idx === 0 || idx === 3 ? "bg-emerald-500" : "bg-amber-400")}></div>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-slate-800">{user.name}</h3>
                                        <p className="text-xs text-slate-500">Analyst • Bio-oncology</p>
                                    </div>
                                </div>
                                
                                <div>
                                    <Badge variant={user.role === 'Lead' ? 'purple' : 'default'}>{user.role}</Badge>
                                </div>
                                
                                <div>
                                    {idx === 0 || idx === 3 ? (
                                        <span className="flex items-center text-xs font-medium text-emerald-600 gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Online
                                        </span>
                                    ) : (
                                        <span className="flex items-center text-xs font-medium text-amber-600 gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> In Session
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs font-medium text-slate-700">8/12</span>
                                        <span className="text-[10px] text-slate-400">Sessions</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden max-w-[100px]">
                                        <div className="h-full bg-purple-500" style={{ width: `${(8/12)*100}%` }}></div>
                                    </div>
                                </div>

                                <div className="text-sm font-medium text-slate-600">
                                    {12 - idx * 2} Filed
                                </div>

                                <Button variant="ghost" size="icon" className="text-slate-400">
                                    <Icons.More className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
        <AIPanel title="Team Insights">
             <AICard title="Burnout Risk" type="Warning" typeColor="red">
                 <p><strong>Emma Liu</strong> has 5 consecutive sessions scheduled today without a break.</p>
             </AICard>

             <AICard title="Expertise Match" type="Suggestion" typeColor="blue">
                 <p>New session on <strong>ADC Safety</strong> matches <strong>Mark Porter's</strong> historical coverage profile.</p>
                 <Button size="sm" variant="outline" className="w-full mt-2 text-xs">Assign Mark</Button>
             </AICard>
        </AIPanel>
    </div>
  );
};