
import React, { useState } from 'react';
import { Icons, Button, Badge, cn } from './UIComponents';
import { Conference } from '../types';
import { CONFERENCES } from '../constants';

export const HomeView = ({ onNavigateDetail, onNavigate }: { onNavigateDetail: (id: string) => void, onNavigate: (view: any) => void }) => {
    const [activeTab, setActiveTab] = useState('all');

    // Sorting and Filtering Logic
    const sortedConferences = [...CONFERENCES].sort((a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    );

    const filteredConferences = sortedConferences.filter(conf => {
        if (activeTab === 'all') return true;
        return conf.status === activeTab;
    });

    const stats = {
        total: CONFERENCES.length,
        upcoming: CONFERENCES.filter(c => c.status === 'upcoming').length,
        completed: CONFERENCES.filter(c => c.status === 'completed').length,
        ongoing: CONFERENCES.filter(c => c.status === 'ongoing').length
    };

    return (
        <div className="flex-1 flex flex-col h-full bg-[#F8FAFC] overflow-hidden font-sans">
            {/* Header */}
            <header className="px-8 py-6 bg-white border-b border-slate-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <Icons.Live className="w-8 h-8" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Pharma CI Portal</h1>
                            <p className="text-slate-500 text-sm font-medium">Conference Intelligence & Planning</p>
                        </div>
                    </div>
                    <Button variant="primary" className="bg-[#1D4ED8] hover:bg-blue-700 shadow-lg shadow-blue-500/20 gap-2">
                        <Icons.Plus className="w-5 h-5" /> Add Conference
                    </Button>
                </div>
            </header>

            <div className="p-8 overflow-y-auto space-y-8 flex-1">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden group">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">Total Conferences</p>
                            <h2 className="text-4xl font-extrabold text-slate-800">{stats.total}</h2>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <Icons.Grid className="w-8 h-8 opacity-40" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden group">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">Upcoming / Ongoing</p>
                            <h2 className="text-4xl font-extrabold text-blue-600">{stats.upcoming + stats.ongoing}</h2>
                        </div>
                        <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                            <Icons.TrendingUp className="w-8 h-8 opacity-40" />
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden group">
                        <div>
                            <p className="text-slate-500 text-sm font-medium mb-1">Completed</p>
                            <h2 className="text-4xl font-extrabold text-slate-800">{stats.completed}</h2>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl text-slate-400">
                            <Icons.TrendingUp className="w-8 h-8 opacity-20" />
                        </div>
                    </div>
                </div>

                {/* Filters Tabs */}
                {['All Conferences', 'Upcoming', 'Ongoing', 'Completed'].map((tab) => {
                    const id = tab.toLowerCase().split(' ')[0];
                    const isActive = activeTab === id;
                    return (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                                isActive
                                    ? "bg-slate-800 text-white shadow-md shadow-slate-200"
                                    : "text-slate-500 hover:bg-slate-200/50"
                            )}
                        >
                            {tab} {tab !== 'All Conferences' && `(${stats[id as keyof typeof stats]})`}
                        </button>
                    )
                })}

                {/* Main Content Layout */}
                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <div className="w-64 flex-shrink-0 space-y-6">
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
                            <div className="flex items-center gap-2 font-bold text-slate-700">
                                <Icons.Filter className="w-4 h-4" /> Filters
                            </div>

                            <div className="relative">
                                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search conferences..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                                    <div className="relative group">
                                        <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                            <option>All statuses</option>
                                            <option>Upcoming</option>
                                            <option>Completed</option>
                                        </select>
                                        <Icons.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Priority</label>
                                    <div className="relative group">
                                        <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                            <option>All priorities</option>
                                            <option>High</option>
                                            <option>Medium</option>
                                            <option>Low</option>
                                        </select>
                                        <Icons.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold text-slate-500 uppercase">Category</label>
                                    <div className="relative group">
                                        <select className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                                            <option>All categories</option>
                                            <option>Oncology</option>
                                            <option>Cardiology</option>
                                            <option>Neurology</option>
                                        </select>
                                        <Icons.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Conference Cards Grid */}
                    <div className="flex-1 grid grid-cols-1 2xl:grid-cols-2 gap-6 pb-8">
                        {filteredConferences.map((conf) => (
                            <div key={conf.id} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group flex flex-col relative overflow-hidden">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-xl font-bold text-slate-800 pr-12 line-clamp-1">{conf.title}</h3>
                                    <div className="flex flex-col gap-2 items-end flex-shrink-0">
                                        <div className="flex gap-2">
                                            <Badge
                                                variant={conf.status === 'ongoing' ? 'emerald' : conf.status === 'upcoming' ? 'blue' : 'slate'}
                                                className={cn(
                                                    "rounded-lg px-3 py-1 text-[10px] uppercase font-bold tracking-wider",
                                                    conf.status === 'ongoing' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                                        conf.status === 'upcoming' ? "bg-blue-50 text-blue-700 border-blue-100" :
                                                            "bg-slate-50 text-slate-600 border-slate-100"
                                                )}
                                            >
                                                {conf.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                                            <Icons.Planner className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                        </div>
                                        <span className="text-sm font-medium">{conf.startDate} - {conf.endDate}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-slate-600">
                                        <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                                            <Icons.Location className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                        </div>
                                        <span className="text-sm font-medium">{conf.location}</span>
                                    </div>
                                </div>

                                <div className="mt-auto space-y-4">
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase mb-3 tracking-wider">Therapeutic Areas:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {conf.therapeuticAreas.map((area) => (
                                                <span key={area} className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all cursor-default">
                                                    {area}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <button
                                            onClick={() => onNavigateDetail(conf.id)}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all border-dashed border-2"
                                        >
                                            <Icons.TrendingUp className="w-4 h-4 text-blue-500" /> View Dashboard
                                        </button>
                                        <button
                                            onClick={() => onNavigate('planner')}
                                            className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all border-dashed border-2"
                                        >
                                            <Icons.Planner className="w-4 h-4 text-purple-500" /> Planner
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-50 border border-blue-100 rounded-2xl text-sm font-bold text-blue-700 hover:bg-blue-100 hover:border-blue-200 transition-all">
                                            <Icons.FileText className="w-4 h-4" /> Conference Report
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
