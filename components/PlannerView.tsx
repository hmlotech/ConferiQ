
import React, { useState } from 'react';
import { Icons, Button, Badge, Avatar, cn } from './UIComponents';
import { AIPanel, AICard } from './AIPanel';
import { DATE_TABS, AI_SUGGESTIONS, SESSIONS, USERS, CONFERENCES } from '../constants';
import { Session, SessionType, Priority, CoverageStatus } from '../types';
import { View } from './Sidebar';

export const PlannerView = ({ conferenceId, onNavigate }: { conferenceId?: string | null, onNavigate?: (view: View, id?: string) => void }) => {
    const conference = CONFERENCES.find(c => c.id === conferenceId) || CONFERENCES[0];
    const users = USERS;

    const [dates, setDates] = useState(DATE_TABS.map(d => ({ ...d, isActive: false }))); // Default none active
    const [isAllDates, setIsAllDates] = useState(true);
    const [selectedTrack, setSelectedTrack] = useState('All Tracks');
    const [allSessions, setAllSessions] = useState(SESSIONS);

    const activeDate = dates.find(d => d.isActive)?.date;

    // Get unique tracks from sessions
    const uniqueTracks = Array.from(new Set(allSessions.map(s => s.track))).sort();

    // Filter sessions based on active date and selected track
    const filteredSessions = allSessions.filter(s => {
        const dateMatch = isAllDates || s.date === activeDate;
        const trackMatch = selectedTrack === 'All Tracks' || s.track === selectedTrack;
        return dateMatch && trackMatch;
    });
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const handleDateClick = (idx: number) => {
        const newDates = dates.map((d, i) => ({ ...d, isActive: i === idx }));
        setDates(newDates);
        setIsAllDates(false);
    };

    const handleAllDatesClick = () => {
        const newDates = dates.map(d => ({ ...d, isActive: false }));
        setDates(newDates);
        setIsAllDates(true);
    };

    const handleOpenDetails = (session: Session) => {
        setSelectedSession(session);
        setIsDetailsOpen(true);
    };

    const handleAddDocument = (session: Session) => {
        const mockFile = {
            id: `doc-${Date.now()}`,
            name: `Analysis_${session.abstractId}_${Date.now().toString().slice(-4)}.pdf`,
            size: `${(Math.random() * 5 + 1).toFixed(1)} MB`,
            type: 'PDF',
            uploadedAt: new Date().toLocaleDateString('en-GB')
        };

        const updatedSessions = allSessions.map(s => {
            if (s.id === session.id) {
                return {
                    ...s,
                    documents: [...(s.documents || []), mockFile]
                };
            }
            return s;
        });

        setAllSessions(updatedSessions);

        // If details modal is open for this session, sync it
        if (selectedSession && selectedSession.id === session.id) {
            setSelectedSession({
                ...selectedSession,
                documents: [...(selectedSession.documents || []), mockFile]
            });
        }
    };

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
                        <Button
                            variant="primary"
                            className="pl-4 pr-4 h-10 rounded-xl font-semibold shadow-lg shadow-purple-500/30"
                            onClick={() => onNavigate?.('conference-detail', conference.id)}
                        >
                            CONFERENCE DASHBOARD <Icons.ChevronDown className="ml-2 w-4 h-4 opacity-70" />
                        </Button>
                    </div>
                </header>

                {/* --- Controls Bar --- */}
                <div className="px-8 py-6 space-y-6 bg-[#F3F4F6]">
                    {/* Title & Dates Row */}
                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <span className="text-xl font-bold text-slate-800">{conference.title}</span>
                            <div className="h-6 w-px bg-slate-300"></div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={handleAllDatesClick}
                                    className={cn(
                                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1",
                                        isAllDates
                                            ? "bg-white text-slate-800 shadow-sm border border-slate-200"
                                            : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                                    )}
                                >
                                    All Dates
                                </button>
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
                            </div>
                        </div>
                    </div>

                    {/* Filters Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
                            <div className="relative inline-block">
                                <Button variant="ghost" className="gap-2 px-4 bg-purple-100/50 text-purple-700 hover:bg-purple-100 border border-purple-200/50">
                                    <Icons.Grid className="w-4 h-4" /> {selectedTrack}
                                </Button>
                                <select
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                    value={selectedTrack}
                                    onChange={(e) => setSelectedTrack(e.target.value)}
                                >
                                    <option>All Tracks</option>
                                    {uniqueTracks.map(track => (
                                        <option key={track} value={track}>{track}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="relative">
                                <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search"
                                    className="bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 shadow-sm w-48 placeholder:text-slate-400"
                                />
                            </div>

                            <div className="h-6 w-px bg-slate-300 mx-2"></div>

                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-8 pb-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-24">ID</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-1/3">Session Headline</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-32">Date & Time</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-28">Track</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-28">Priority</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-40">Assigned To</th>
                                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-40">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredSessions.map((session) => (
                                    <tr key={session.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="p-4 text-sm font-medium text-slate-500">#{session.id.toUpperCase()}</td>
                                        <td className="p-4">
                                            <p className="text-sm font-bold text-slate-800">{session.title}</p>
                                        </td>
                                        <td className="p-4">
                                            <p className="text-[11px] font-bold text-slate-500">
                                                {(() => {
                                                    const [y, m, d] = session.date.split('-');
                                                    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                                    return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
                                                })()}
                                            </p>
                                            <p className="text-[11px] font-medium text-slate-400 capitalize">{session.startTime}</p>
                                        </td>
                                        <td className="p-4">
                                            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-wider border-slate-200 text-slate-500 px-2 py-0.5 whitespace-nowrap">
                                                {session.track}
                                            </Badge>
                                        </td>
                                        <td className="p-4">
                                            <div className="relative inline-block w-full">
                                                <select
                                                    defaultValue={session.priority}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                                >
                                                    <option value={Priority.CRITICAL}>Critical</option>
                                                    <option value={Priority.HIGH}>High</option>
                                                    <option value={Priority.MEDIUM}>Medium</option>
                                                    <option value={Priority.LOW}>Low</option>
                                                </select>
                                                <Icons.ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="relative inline-block w-40">
                                                <select
                                                    defaultValue={session.assignedTo[0]?.id || ""}
                                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-2 pr-8 py-1.5 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                                >
                                                    <option value="">Unassigned</option>
                                                    {users.map(u => (
                                                        <option key={u.id} value={u.id}>{u.name}</option>
                                                    ))}
                                                </select>
                                                <Icons.ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    className="text-xs font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 px-3 py-1.5 rounded-lg gap-2"
                                                    onClick={() => handleAddDocument(session)}
                                                >
                                                    <Icons.Plus className="w-3.5 h-3.5" /> Add Doc
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    className="text-xs font-bold text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-3 py-1.5 rounded-lg gap-2"
                                                    onClick={() => handleOpenDetails(session)}
                                                >
                                                    <Icons.List className="w-3.5 h-3.5" /> Session Details
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* --- Session Details Dialog --- */}
                {selectedSession && (
                    <div className={cn(
                        "fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300",
                        isDetailsOpen ? "visible opacity-100" : "invisible opacity-0"
                    )}>
                        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsDetailsOpen(false)}></div>
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col relative z-10 overflow-hidden border border-slate-200">
                            <div className="p-8 border-b border-slate-100 flex items-start justify-between bg-white relative">
                                <div className="space-y-2">
                                    <Badge variant="blue" className="bg-purple-50 text-purple-700 border-purple-100 uppercase tracking-widest px-2 text-[10px] font-bold">
                                        Session Details
                                    </Badge>
                                    <h3 className="text-2xl font-bold text-slate-900">{selectedSession.title}</h3>
                                    <p className="text-sm font-medium text-slate-400 flex items-center gap-2">
                                        <Icons.Clock className="w-4 h-4" />
                                        {(() => {
                                            const [y, m, d] = selectedSession.date.split('-');
                                            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                            return `${parseInt(d)} ${months[parseInt(m) - 1]} ${y}`;
                                        })()}
                                        • {selectedSession.startTime} - {selectedSession.endTime} • {selectedSession.location}
                                    </p>
                                </div>
                                <button onClick={() => setIsDetailsOpen(false)} className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 transition-colors">
                                    <Icons.X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="p-8 overflow-y-auto space-y-8">
                                <div className="bg-purple-50/50 rounded-2xl p-6 border border-purple-100/50 space-y-4 relative overflow-hidden group">
                                    <div className="flex items-center gap-2 text-purple-700 mb-2">
                                        <Icons.AI className="w-5 h-5 animate-pulse" />
                                        <h4 className="text-sm font-bold uppercase tracking-wider">AI Generated Summary</h4>
                                    </div>
                                    <p className="text-sm text-slate-700 leading-relaxed font-medium">
                                        This session explores the latest advancements in {selectedSession.track.toLowerCase()}.
                                        Key takeaways include emerging biomarkers, novel therapeutic combinations, and updated safety data from Phase II/III clinical trials.
                                        The summary highlights {selectedSession.matchScore}% relevance based on your research interests in radio-pharmaceuticals and oncology.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Associated Files</h4>
                                        <Badge variant="default" className="bg-slate-100 text-slate-500 border-none rounded-lg px-2 text-[10px] font-bold">
                                            3 files
                                        </Badge>
                                    </div>
                                    <div className="grid grid-cols-1 gap-3">
                                        {selectedSession.documents && selectedSession.documents.length > 0 ? (
                                            selectedSession.documents.map(file => (
                                                <div key={file.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:bg-white hover:border-blue-200 hover:shadow-sm transition-all cursor-pointer">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                                                            <Icons.FileText className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-800">{file.name}</p>
                                                            <p className="text-[10px] text-slate-400">{file.size} • Uploaded {file.uploadedAt}</p>
                                                        </div>
                                                    </div>
                                                    <Icons.Download className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                                <Icons.FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                                                <p className="text-sm text-slate-400 font-medium">No documents added yet</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3 rounded-b-3xl">
                                <Button variant="white" onClick={() => setIsDetailsOpen(false)} className="rounded-xl font-bold px-6">Close</Button>
                                <Button variant="primary" className="rounded-xl bg-slate-900 border-none hover:bg-slate-800 font-bold px-6">Full Report</Button>
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* Planner Specific AI */}
            <AIPanel title="Planner AI" initialOpen={false}>
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


