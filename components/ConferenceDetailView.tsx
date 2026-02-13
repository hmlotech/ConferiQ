import React, { useState } from 'react';
import { Icons, Button, Badge, Avatar, cn } from './UIComponents';
import { DATE_TABS, SESSIONS, USERS } from '../constants';
import { Priority } from '../types';
import { useConference } from '../contexts/ConferenceContext';

interface ConferenceDetailViewProps {
    conferenceId: string | null;
    onBack: () => void;
    onNavigate: (view: string, id?: string) => void;
}

export const ConferenceDetailView = ({ conferenceId, onBack, onNavigate }: ConferenceDetailViewProps) => {
    const { conferences, sessions: contextSessions } = useConference();
    const [selectedDate, setSelectedDate] = useState<string>('All Days');
    const [selectedPriority, setSelectedPriority] = useState<string>('All Priorities');
    const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);
    const [isDaySummaryOpen, setIsDaySummaryOpen] = useState(false);
    const [isSessionSummaryOpen, setIsSessionSummaryOpen] = useState(false);
    const [isConferenceReportOpen, setIsConferenceReportOpen] = useState(false);
    const [summarySessionId, setSummarySessionId] = useState<string | null>(null);

    const conference = conferences.find(c => c.id === conferenceId) || conferences[0];

    if (!conference) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-slate-50">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-slate-300 shadow-sm mb-4">
                    <Icons.TrendingUp className="w-8 h-8 opacity-20" />
                </div>
                <h3 className="text-lg font-bold text-slate-800">Conference Not Found</h3>
                <p className="text-slate-500 mb-6">We couldn't find the conference you're looking for.</p>
                <Button onClick={onBack} variant="outline">Back to Home</Button>
            </div>
        );
    }

    const conferenceSessions = contextSessions.filter(s => s.conferenceId === conference.id);
    const [localSessions, setLocalSessions] = useState(conferenceSessions);

    // Sync local sessions when context sessions or conference changes
    React.useEffect(() => {
        setLocalSessions(contextSessions.filter(s => s.conferenceId === conference.id));
    }, [contextSessions, conference.id]);

    // Helper to generate dates between range
    const generateDateTabs = (startStr: string, endStr: string) => {
        const start = new Date(startStr);
        const end = new Date(endStr);
        const tabs = [];
        let curr = new Date(start);
        while (curr <= end) {
            const dateStr = curr.toISOString().split('T')[0];
            const label = curr.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            tabs.push({ label, date: dateStr, isActive: false });
            curr.setDate(curr.getDate() + 1);
        }
        return tabs;
    };

    const conferenceDates = generateDateTabs(conference.startDate, conference.endDate);

    // Filter sessions based on selected date AND priority
    const filteredSessions = localSessions.filter(s => {
        const dateMatch = selectedDate === 'All Days' || s.date === selectedDate;
        const priorityMatch = selectedPriority === 'All Priorities' || s.priority === selectedPriority;
        return dateMatch && priorityMatch;
    });

    // Group filtered sessions by date for display
    const sessionDates: string[] = Array.from(new Set(filteredSessions.map(s => s.date as string)));
    const groupedPresentations = sessionDates
        .sort((a: string, b: string) => new Date(a).getTime() - new Date(b).getTime())
        .map((date: string) => {
            const daySessions = filteredSessions.filter(s => s.date === date);
            const formattedDate = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
                month: 'short',
                day: '2-digit',
                year: 'numeric'
            });
            return {
                date: formattedDate,
                count: daySessions.length,
                items: daySessions
            };
        });

    const selectedSession = localSessions.find(s => s.id === selectedSessionId);

    const handleUpdatePriority = (id: string, priority: Priority) => {
        setLocalSessions(prev => prev.map(s => s.id === id ? { ...s, priority } : s));
    };

    const handleUpdateAssignment = (id: string, userName: string) => {
        const user = USERS.find(u => u.name === userName);
        if (user) {
            setLocalSessions(prev => prev.map(s => s.id === id ? { ...s, assignedTo: [user] } : s));
        }
    };

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
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => onNavigate('home')}
                                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-bold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"
                            >
                                <Icons.Home className="w-4 h-4" /> Home
                            </button>
                            <div className="h-4 w-px bg-slate-200" />
                            <button
                                onClick={() => onNavigate('planner', conferenceId || undefined)}
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-bold"
                            >
                                <Icons.Planner className="w-4 h-4" /> Planner
                            </button>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border border-slate-200 shadow-sm overflow-hidden">
                                {conference.logo && conference.logo.startsWith('/') ? (
                                    <img src={conference.logo} alt={conference.title} className="w-full h-full object-contain p-2" />
                                ) : (
                                    conference.logo || '🎯'
                                )}
                            </div>
                            <div className="flex flex-col gap-1">
                                <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">{conference.title}</h1>
                                <p className="text-slate-400 text-sm font-medium">
                                    {new Date(conference.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(conference.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} <span className="mx-2">•</span> {conference.location}
                                </p>
                            </div>
                        </div>
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
                                    <div className="flex gap-4">
                                        <Button
                                            onClick={() => setIsConferenceReportOpen(true)}
                                            className="bg-slate-900 text-white hover:bg-slate-800 gap-2 rounded-xl text-xs font-bold py-2 px-6 shadow-none h-11"
                                        >
                                            <Icons.FileText className="w-4 h-4" /> Conference Report
                                        </Button>
                                        <div className="flex bg-slate-100 p-1 rounded-xl h-11">
                                            <button className="px-5 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm">All</button>
                                            <button className="px-5 py-1.5 text-slate-500 rounded-lg text-xs font-bold hover:text-slate-800">Upcoming ({filteredSessions.length})</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">Dates:</span>
                                    <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                                        <button
                                            onClick={() => setSelectedDate('All Days')}
                                            className={cn(
                                                "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                                selectedDate === 'All Days' ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                                            )}
                                        >
                                            All Days
                                        </button>
                                        {conferenceDates.map(tab => (
                                            <button
                                                key={tab.date}
                                                onClick={() => setSelectedDate(tab.date)}
                                                className={cn(
                                                    "px-4 py-1.5 rounded-lg text-xs font-bold transition-all",
                                                    selectedDate === tab.date ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                                                )}
                                            >
                                                {tab.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">Priority:</span>
                                    <div className="relative group">
                                        <select
                                            value={selectedPriority}
                                            onChange={(e) => setSelectedPriority(e.target.value)}
                                            className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-700 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500/20 pr-10 min-w-[150px]"
                                        >
                                            <option value="All Priorities">All Priorities</option>
                                            {Object.values(Priority).map(p => (
                                                <option key={p} value={p}>{p}</option>
                                            ))}
                                        </select>
                                        <Icons.ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                                    </div>
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
                                        <Button
                                            onClick={() => setIsDaySummaryOpen(true)}
                                            variant="outline"
                                            className="text-xs font-bold border-slate-200 text-slate-600 gap-2 py-1.5 rounded-xl hover:bg-slate-50"
                                        >
                                            <Icons.AI className="w-4 h-4 text-purple-500" /> Day Summary AI
                                        </Button>
                                    </div>

                                    <div className="space-y-3">
                                        {group.items.map((item) => (
                                            <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 hover:shadow-md transition-shadow group">
                                                <div className="flex justify-between items-start">
                                                    <div className="space-y-1 flex-1">
                                                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">ID: {item.abstractId || item.id}</p>
                                                        <h4
                                                            onClick={() => setSelectedSessionId(item.id)}
                                                            className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors cursor-pointer leading-tight"
                                                        >
                                                            {item.title}
                                                        </h4>
                                                    </div>
                                                    <div className="flex items-center gap-2 ml-4">
                                                        <div className="relative group/priority">
                                                            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-lg px-2 py-1 cursor-pointer hover:bg-slate-100 transition-colors">
                                                                <span className={cn(
                                                                    "text-[9px] font-bold uppercase tracking-wider",
                                                                    item.priority === Priority.CRITICAL ? "text-red-600" :
                                                                        item.priority === Priority.HIGH ? "text-orange-600" :
                                                                            item.priority === Priority.MEDIUM ? "text-blue-600" : "text-slate-500"
                                                                )}>{item.priority}</span>
                                                                <Icons.ChevronDown className="w-3 h-3 text-slate-400" />
                                                            </div>
                                                            <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-2 min-w-[120px] opacity-0 invisible group-hover/priority:opacity-100 group-hover/priority:visible transition-all z-20">
                                                                {Object.values(Priority).map(p => (
                                                                    <button
                                                                        key={p}
                                                                        onClick={() => handleUpdatePriority(item.id, p)}
                                                                        className="w-full text-left px-4 py-1.5 text-[10px] font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                                                    >
                                                                        {p}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                        <Icons.ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-400 transition-colors" />
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-1 text-slate-400">
                                                            <Icons.Clock className="w-3.5 h-3.5" />
                                                            <span className="text-[10px] font-bold uppercase">{item.startTime} - {item.endTime}</span>
                                                        </div>
                                                        {item.roomNo && (
                                                            <div className="flex items-center gap-1 text-slate-400">
                                                                <Icons.Location className="w-3.5 h-3.5" />
                                                                <span className="text-[10px] font-bold uppercase">Room {item.roomNo}</span>
                                                            </div>
                                                        )}
                                                        <Badge className="bg-slate-100 text-slate-500 border-none rounded-lg text-[9px] uppercase font-bold px-1.5 py-0.5 tracking-wider">
                                                            {item.status}
                                                        </Badge>
                                                        <span className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-lg text-[9px] font-bold text-slate-500 uppercase tracking-wider">
                                                            {item.track}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-3">
                                                        <div className="flex items-center gap-3">
                                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-tight">Assigned:</span>
                                                            <div className="relative group/assignee">
                                                                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 cursor-pointer hover:bg-slate-100 transition-all">
                                                                    <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                                        {item.assignedTo[0]?.name.charAt(0) || "U"}
                                                                    </div>
                                                                    <span className="text-xs font-extrabold text-slate-800">{item.assignedTo[0]?.name || "Unassigned"}</span>
                                                                    <Icons.ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                                                </div>
                                                                <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl py-2 min-w-[150px] opacity-0 invisible group-hover/assignee:opacity-100 group-hover/assignee:visible transition-all z-20 max-h-48 overflow-y-auto">
                                                                    {USERS.map(u => (
                                                                        <button
                                                                            key={u.id}
                                                                            onClick={() => handleUpdateAssignment(item.id, u.name)}
                                                                            className="w-full text-left px-4 py-2 text-[10px] font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 flex items-center gap-2"
                                                                        >
                                                                            <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-[8px]">{u.name.charAt(0)}</div>
                                                                            {u.name}
                                                                        </button>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-1.5 ml-2">
                                                            <Button variant="outline" className="text-[9px] font-bold border-slate-200 text-slate-600 gap-1.5 py-1 rounded-lg h-7 px-2.5">
                                                                <Icons.Upload className="w-3 h-3" /> Files
                                                            </Button>
                                                            <Button
                                                                onClick={() => {
                                                                    setSummarySessionId(item.id);
                                                                    setIsSessionSummaryOpen(true);
                                                                }}
                                                                variant="outline"
                                                                className="text-[9px] font-bold border-slate-200 text-slate-600 gap-1.5 py-1 rounded-lg h-7 px-2.5"
                                                            >
                                                                <Icons.FileText className="w-3 h-3" /> Summary
                                                            </Button>
                                                        </div>
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

            {/* Session Detail Modal */}
            {selectedSessionId && selectedSession && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-start bg-slate-50/50">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <Badge variant="blue" className="bg-slate-900 text-white border-none rounded-lg px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">
                                        {selectedSession.abstractId || selectedSession.id}
                                    </Badge>
                                    <Badge className="bg-white border-slate-200 text-slate-500 rounded-lg px-2 py-0.5 text-[10px] uppercase font-bold">
                                        {selectedSession.track}
                                    </Badge>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 leading-tight">{selectedSession.title}</h2>
                                <div className="flex items-center gap-6 text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <Icons.Planner className="w-4 h-4" />
                                        <span className="text-xs font-bold">{new Date((selectedSession.date || '') + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Icons.Clock className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase">{selectedSession.startTime} - {selectedSession.endTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Icons.Location className="w-4 h-4" />
                                        <span className="text-xs font-bold uppercase">{selectedSession.location}</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedSessionId(null)}
                                className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-400"
                            >
                                <Icons.X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-8 overflow-y-auto space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                    <Icons.Lightbulb className="w-4 h-4 text-orange-500" /> AI Executive Summary
                                </h3>
                                <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-6 text-slate-700 leading-relaxed text-sm italic">
                                    "This session explores the latest clinical advancements in {selectedSession.track}. Key highlights include a focus on novel therapeutic targets and patient outcome data from recent phase III trials. The speaker will discuss the implications for standard of care and future directions in clinical practice."
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Metadata</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                            <span className="text-xs font-medium text-slate-500">Priority</span>
                                            <Badge className={cn(
                                                "border-none rounded-lg px-2 py-0.5 text-[10px] uppercase font-bold",
                                                selectedSession.priority === Priority.CRITICAL ? "bg-red-50 text-red-600" :
                                                    selectedSession.priority === Priority.HIGH ? "bg-orange-50 text-orange-600" :
                                                        "bg-blue-50 text-blue-600"
                                            )}>{selectedSession.priority}</Badge>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                            <span className="text-xs font-medium text-slate-500">Coverage Status</span>
                                            <Badge className="bg-slate-100 text-slate-600 border-none rounded-lg px-2 py-0.5 text-[10px] uppercase font-bold">{selectedSession.status}</Badge>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-slate-50">
                                            <span className="text-xs font-medium text-slate-500">Assigned To</span>
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold">{selectedSession.assignedTo[0]?.name.charAt(0)}</div>
                                                <span className="text-xs font-bold text-slate-700">{selectedSession.assignedTo[0]?.name || "Unassigned"}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Documents ({selectedSession.documents?.length || 0})</h3>
                                    <div className="space-y-2">
                                        {selectedSession.documents && selectedSession.documents.length > 0 ? (
                                            selectedSession.documents.map(doc => (
                                                <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                                    <div className="flex items-center gap-3">
                                                        <Icons.FileText className="w-4 h-4 text-blue-500" />
                                                        <div className="flex flex-col">
                                                            <span className="text-[11px] font-bold text-slate-700 truncate max-w-[120px]">{doc.name}</span>
                                                            <span className="text-[9px] text-slate-400 uppercase font-bold">{doc.size}</span>
                                                        </div>
                                                    </div>
                                                    <button className="text-slate-400 hover:text-slate-900 transition-colors">
                                                        <Icons.More className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                                <Icons.FileText className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">No User Documents</p>
                                            </div>
                                        )}
                                        <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-xl text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:border-blue-400 hover:text-blue-500 transition-all flex items-center justify-center gap-2 group">
                                            <Icons.Plus className="w-3.5 h-3.5" /> Add Document
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <Button
                                onClick={() => setSelectedSessionId(null)}
                                variant="outline"
                                className="px-6 rounded-xl text-xs font-bold h-11 border-slate-200 text-slate-600 hover:bg-white"
                            >
                                Close Dashboard
                            </Button>
                            <Button className="px-8 rounded-xl text-xs font-bold h-11 bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10">
                                Generate Full Report
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* Session Summary Modal */}
            {isSessionSummaryOpen && summarySessionId && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-blue-50/50 to-white">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                                    <Icons.AI className="w-6 h-6 animate-pulse" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">AI Session Summary</h2>
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">{localSessions.find(s => s.id === summarySessionId)?.title}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsSessionSummaryOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                            >
                                <Icons.X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-10 overflow-y-auto space-y-8">
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" /> Executive Breakdown
                                </h3>
                                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative overflow-hidden">
                                    <p className="text-base text-slate-700 leading-relaxed font-medium italic relative z-10">
                                        "Synthesizing information from {localSessions.find(s => s.id === summarySessionId)?.documents?.length || 0} uploaded documents. This session presents high-impact clinical data suggesting a shift in standard-of-care for refractory patients. Key findings include a 22% improvement in overall survival compared to standard chemotherapy in the Phase III subgroup analysis."
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Key Takeaways</h4>
                                    <ul className="space-y-3">
                                        {[
                                            "Enhanced durability in HER2-low populations",
                                            "Manageable toxicities with the new combination",
                                            "Potential for first-line indication approval"
                                        ].map((point, i) => (
                                            <li key={i} className="flex gap-3 text-sm text-slate-600">
                                                <Icons.Check className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-blue-50/30 rounded-2xl p-6 border border-blue-50">
                                    <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-3">AI Context Metrics</h4>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between text-xs font-bold mb-1">
                                                <span>Data Coverage</span>
                                                <span className="text-blue-600">88%</span>
                                            </div>
                                            <div className="h-1.5 w-full bg-blue-100 rounded-full overflow-hidden">
                                                <div className="h-full bg-blue-500 w-[88%]"></div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center bg-white p-3 rounded-xl border border-blue-50 shadow-sm">
                                            <span className="text-[10px] font-bold text-slate-500">Confidence Score</span>
                                            <Badge variant="blue" className="bg-blue-600 text-white rounded-lg px-2">9.2</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                            <Button
                                onClick={() => setIsSessionSummaryOpen(false)}
                                variant="outline"
                                className="px-8 rounded-2xl text-xs font-bold h-12 border-slate-200 text-slate-600 hover:bg-white"
                            >
                                Close
                            </Button>
                            <Button className="px-10 rounded-2xl text-xs font-bold h-12 bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 gap-2">
                                <Icons.Download className="w-4 h-4" /> Download PDF
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* Conference Report Modal */}
            {isConferenceReportOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-900 to-slate-800 text-white">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/10 rounded-2xl text-white">
                                    <Icons.Brain className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold leading-tight">AI Intelligence Report</h2>
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">{conference.title} Synthesis</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsConferenceReportOpen(false)}
                                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400"
                            >
                                <Icons.X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-10 overflow-y-auto space-y-10">
                            <section className="space-y-4">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-slate-800" /> Strategic Overview
                                </h3>
                                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 text-slate-700 leading-relaxed">
                                    <p className="font-medium italic mb-4">
                                        "Synthesizing across all {localSessions.length} tracked sessions and {localSessions.reduce((acc, s) => acc + (s.documents?.length || 0), 0)} documentation artifacts."
                                    </p>
                                    <p>
                                        The overarching theme of this conference centers on the rapid maturity of bispecific antibodies and personalized vaccine platforms. Competitive signaling indicates a 30% increase in biomarker-driven patient stratification compared to last year's congress.
                                    </p>
                                </div>
                            </section>

                            <div className="grid grid-cols-2 gap-8">
                                <section className="space-y-4">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Top Insight areas</h3>
                                    <div className="space-y-3">
                                        {[
                                            { label: "Oncology Pipeline Velocity", value: "High" },
                                            { label: "Strategic Enrollment Gaps", value: "Identified" },
                                            { label: "Payer Consensus Shifts", value: "Moderate" }
                                        ].map((item, i) => (
                                            <div key={i} className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                                                <span className="text-xs font-bold text-slate-600">{item.label}</span>
                                                <Badge className="bg-slate-100 text-slate-800 border-none font-bold text-[10px]">{item.value}</Badge>
                                            </div>
                                        ))}
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Document Analysis</h3>
                                    <div className="bg-slate-900 rounded-2xl p-6 text-white text-center">
                                        <div className="text-4xl font-extrabold mb-2">{localSessions.reduce((acc, s) => acc + (s.documents?.length || 0), 0)}</div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Artifacts Synthesized</p>
                                        <div className="mt-4 pt-4 border-t border-white/10 flex justify-around">
                                            <div>
                                                <div className="text-lg font-bold">12</div>
                                                <div className="text-[8px] text-slate-400 uppercase">Abstracts</div>
                                            </div>
                                            <div>
                                                <div className="text-lg font-bold">5</div>
                                                <div className="text-[8px] text-slate-400 uppercase">Slide Decks</div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                            <Button
                                onClick={() => setIsConferenceReportOpen(false)}
                                variant="outline"
                                className="px-8 rounded-2xl text-xs font-bold h-12 border-slate-200 text-slate-600 hover:bg-white"
                            >
                                Close Report
                            </Button>
                            <Button className="px-10 rounded-2xl text-xs font-bold h-12 bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/10 gap-2">
                                <Icons.Download className="w-4 h-4" /> Export Strategic Brief
                            </Button>
                        </div>
                    </div>
                </div>
            )}
            {/* Day Summary Modal */}
            {isDaySummaryOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-purple-50/50 to-white">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-purple-100 rounded-2xl text-purple-600">
                                    <Icons.AI className="w-6 h-6 animate-pulse" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">Day Summary AI</h2>
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">{selectedDate === 'All Days' ? 'Full Conference Overview' : `Summary for ${selectedDate}`}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsDaySummaryOpen(false)}
                                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
                            >
                                <Icons.X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-10 overflow-y-auto space-y-10">
                            <div className="space-y-6">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-purple-500" /> Executive Insights
                                </h3>
                                <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 shadow-inner relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                                        <Icons.AI className="w-24 h-24 text-purple-900" />
                                    </div>
                                    <p className="text-base text-slate-700 leading-relaxed font-medium italic relative z-10">
                                        "Based on the documents uploaded by {USERS[0].name} and the team for {selectedDate === 'All Days' ? 'the entire conference' : selectedDate}, we've observed a strong focus on oncology advancements. Analysts have documented significant readouts in biomarker-driven therapy, with 85% of high-priority sessions already summarized. Key takeaway: immunotherapies are showing 15% better durability in Phase III readouts presented today."
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-6">
                                <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Docs Analyzed</p>
                                    <p className="text-2xl font-bold text-purple-600">{filteredSessions.reduce((acc, s) => acc + (s.documents?.length || 0), 0) || 12}</p>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Sessions Covered</p>
                                    <p className="text-2xl font-bold text-slate-800">{filteredSessions.length}</p>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-2xl p-5 text-center shadow-sm">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">AI Confidence</p>
                                    <p className="text-2xl font-bold text-emerald-500">94%</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
                            <Button
                                onClick={() => setIsDaySummaryOpen(false)}
                                variant="outline"
                                className="px-8 rounded-2xl text-xs font-bold h-12 border-slate-200 text-slate-600 hover:bg-white"
                            >
                                Close
                            </Button>
                            <Button className="px-10 rounded-2xl text-xs font-bold h-12 bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10 gap-2">
                                <Icons.Download className="w-4 h-4" /> Export Report
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
