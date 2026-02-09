import React, { useState } from 'react';
import { Icons, Button, Badge, Avatar, cn } from './UIComponents';
import { DATE_TABS, SESSIONS, CONFERENCES } from '../constants';

interface ConferenceDetailViewProps {
    conferenceId: string | null;
    onBack: () => void;
}

export const ConferenceDetailView = ({ conferenceId, onBack }: ConferenceDetailViewProps) => {
    const conference = CONFERENCES.find(c => c.id === conferenceId) || CONFERENCES[0];

    // Group global sessions by date for display
    const groupedPresentations = Array.from(new Set(SESSIONS.map(s => s.date)))
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .map(date => {
            const daySessions = SESSIONS.filter(s => s.date === date);
            const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            });
            return {
                date: formattedDate,
                count: daySessions.length,
                items: daySessions.map(s => ({
                    id: s.abstractId || s.id,
                    title: s.title,
                    time: s.startTime,
                    status: s.status,
                    tags: [s.track],
                    assignedTo: s.assignedTo.length > 0 ? s.assignedTo[0].name : "Unassigned",
                    priority: s.priority
                }))
            };
        });

    const activities = [
        {
            user: "Sarah Johnson",
            initials: "SJ",
            action: "Uploaded presentation slides",
            target: "Novel Immunotherapy...",
            time: "2 days ago",
            icon: Icons.FileText,
            color: "blue"
        },
        {
            user: "Michael Chen",
            initials: "MC",
            action: "Assigned to session",
            target: "HER2+ Breast Cancer: Latest...",
            time: "3 days ago",
            icon: Icons.User,
            color: "purple"
        },
        {
            user: "David Lee",
            initials: "DL",
            action: "Uploaded abstract PDF",
            target: "CAR-T Cell Therapy Innovations",
            time: "3 days ago",
            icon: Icons.FileText,
            color: "blue"
        },
        {
            user: "Emily Rodriguez",
            initials: "ER",
            action: "Uploaded clinical trial data",
            target: "Biomarker-Driven Oncology...",
            time: "4 days ago",
            icon: Icons.FileText,
            color: "blue"
        },
        {
            user: "Sarah Johnson",
            initials: "SJ",
            action: "Added competitor intelligence note",
            target: "Checkpoint Inhibitors...",
            time: "4 days ago",
            icon: Icons.Lightbulb,
            color: "orange"
        }
    ];

    return (
        <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-hidden font-sans">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-slate-200">
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-4">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-bold"
                        >
                            <Icons.ChevronLeft className="w-4 h-4" /> Back
                        </button>
                        <div className="flex items-center gap-4">
                            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{conference.title}</h1>
                        </div>
                        <p className="text-slate-400 text-sm font-medium">
                            {new Date(conference.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(conference.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} <span className="mx-2">•</span> {conference.location}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm w-72 flex flex-col justify-center">
                            <p className="text-slate-400 text-[10px] font-bold uppercase mb-2 tracking-wider">Completion Status</p>
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-2xl font-bold text-slate-800 leading-none">0 <span className="text-slate-400 text-sm font-medium">/ 6</span></div>
                                <div className="text-xl font-bold text-blue-600 leading-none">0%</div>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 w-[0%] transition-all duration-500"></div>
                            </div>
                        </div>
                        <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 shadow-sm w-72 flex flex-col justify-center">
                            <p className="text-slate-400 text-[10px] font-bold uppercase mb-2 tracking-wider">Assignment Coverage</p>
                            <div className="flex items-center justify-between mb-3">
                                <div className="text-2xl font-bold text-slate-800 leading-none">5 <span className="text-slate-400 text-sm font-medium">/ 6</span></div>
                                <div className="text-xl font-bold text-slate-900 leading-none">83%</div>
                            </div>
                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-slate-900 w-[83%] transition-all duration-500"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="p-8 overflow-y-auto flex-1 h-full">
                <div className="flex gap-8">
                    {/* Left Column: Presentations */}
                    <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col">
                        <div className="p-8 border-b border-slate-100">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-800">Conference Presentations</h2>
                                    <p className="text-slate-400 text-sm">{SESSIONS.length} total presentations</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button className="bg-slate-900 text-white hover:bg-slate-800 gap-2 rounded-xl text-xs font-bold py-2 px-4 shadow-none">
                                        <Icons.FileText className="w-4 h-4" /> Conference Report
                                    </Button>
                                    <div className="flex bg-slate-100 p-1 rounded-xl">
                                        <button className="px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm">All</button>
                                        <button className="px-4 py-1.5 text-slate-500 rounded-lg text-xs font-bold hover:text-slate-800">Upcoming (6)</button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-slate-500">Date:</span>
                                <div className="relative group">
                                    <select className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 pr-10 min-w-[160px]">
                                        <option>All Days</option>
                                        {DATE_TABS.map(tab => (
                                            <option key={tab.date} value={tab.date}>{tab.label}, 2026</option>
                                        ))}
                                    </select>
                                    <Icons.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        <div className="p-8 space-y-12">
                            {groupedPresentations.map((group) => (
                                <div key={group.date} className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Icons.Planner className="w-5 h-5 text-slate-400" />
                                            <h3 className="text-lg font-bold text-slate-800">{group.date}</h3>
                                            <Badge variant="default" className="bg-slate-100 text-slate-600 border-none rounded-lg font-bold text-[10px] px-2">
                                                {group.count} presentations
                                            </Badge>
                                        </div>
                                        <Button variant="outline" className="text-xs font-bold border-slate-200 text-slate-600 gap-2 py-1.5 rounded-xl">
                                            <Icons.Grid className="w-4 h-4" /> Day Summary
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        {group.items.map((item) => (
                                            <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 hover:shadow-md transition-shadow group">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">ID: {item.id}</p>
                                                        <h4 className="text-base font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{item.title}</h4>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative group/priority">
                                                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-100 transition-colors">
                                                                <span className="text-[10px] font-bold text-red-500 uppercase tracking-wider">{item.priority}</span>
                                                                <Icons.ChevronDown className="w-3 h-3 text-slate-400" />
                                                            </div>
                                                        </div>
                                                        <Icons.ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-400 transition-colors" />
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1.5 text-slate-400">
                                                        <Icons.Clock className="w-4 h-4" />
                                                        <span className="text-xs font-bold uppercase">{item.time}</span>
                                                    </div>
                                                    <Badge className="bg-slate-100 text-slate-500 border-none rounded-lg text-[10px] uppercase font-bold px-2 py-0.5 tracking-wider">
                                                        {item.status}
                                                    </Badge>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {item.tags.map((tag, i) => (
                                                        <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-medium text-slate-400">Assigned to:</span>
                                                        <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-slate-100 transition-colors">
                                                            <span className="text-xs font-bold text-slate-700">{item.assignedTo}</span>
                                                            <Icons.ChevronDown className="w-3 h-3 text-slate-400" />
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" className="text-[10px] font-bold border-slate-200 text-slate-600 gap-2 py-1.5 rounded-xl h-9 px-4">
                                                            <Icons.Upload className="w-3.5 h-3.5" /> Add Files
                                                        </Button>
                                                        <Button variant="outline" className="text-[10px] font-bold border-slate-200 text-slate-600 gap-2 py-1.5 rounded-xl h-9 px-4">
                                                            <Icons.FileText className="w-3.5 h-3.5" /> Summarize
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Team Activity */}
                    <div className="w-72 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-800 mb-1">Team Activity</h2>
                            <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">Recent updates and actions</p>
                        </div>
                        <div className="p-6 space-y-8">
                            {activities.map((activity, i) => (
                                <div key={i} className="flex gap-4 relative">
                                    {i !== activities.length - 1 && (
                                        <div className="absolute left-[18px] top-10 bottom-[-32px] w-px bg-slate-100" />
                                    )}
                                    <div className={cn(
                                        "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm",
                                        activity.color === 'blue' ? "bg-blue-50 text-blue-500" :
                                            activity.color === 'purple' ? "bg-purple-50 text-purple-500" :
                                                "bg-orange-50 text-orange-500"
                                    )}>
                                        <activity.icon className="w-4 h-4" />
                                    </div>
                                    <div className="space-y-1">
                                        <h5 className="text-sm font-bold text-slate-800 leading-tight">
                                            {activity.action}
                                        </h5>
                                        <div className="flex items-center gap-1.5">
                                            <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-500">
                                                {activity.initials}
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400">{activity.user}</span>
                                        </div>
                                        <p className="text-[10px] text-slate-500 leading-relaxed max-w-[160px]">
                                            <span className="font-medium">{activity.target}</span>
                                        </p>
                                        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-1">
                                            {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
