import React, { useState } from 'react';
import { Icons, Button, Badge, cn, Dialog } from './UIComponents';
import { Conference } from '../types';
import { useConference } from '../contexts/ConferenceContext';
import { View } from './Sidebar';
import { ScraperService } from '../services/scraper';
import { AIService } from '../services/ai';

export const HomeView = ({ onNavigateDetail, onNavigate }: { onNavigateDetail: (id: string) => void, onNavigate: (view: View, id?: string) => void }) => {
    const { conferences, addConference, deleteConference } = useConference();
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [conferenceToDelete, setConferenceToDelete] = useState<string | null>(null);
    const [conferenceUrl, setConferenceUrl] = useState('');
    const [manualText, setManualText] = useState('');
    const [addMode, setAddMode] = useState<'url' | 'paste'>('url');
    const [isExtracting, setIsExtracting] = useState(false);
    const [extractionStep, setExtractionStep] = useState<string>('');

    // Sorting and Filtering Logic
    const sortedConferences = [...conferences].sort((a, b) => {
        const statusPriority: Record<string, number> = {
            'ongoing': 0,
            'upcoming': 1,
            'completed': 2
        };

        if (statusPriority[a.status] !== statusPriority[b.status]) {
            return statusPriority[a.status] - statusPriority[b.status];
        }

        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

    const filteredConferences = sortedConferences.filter(conf => {
        // Tab Filter
        const tabMatch = activeTab === 'all' || conf.status === activeTab;

        // Search Filter
        const searchMatch = conf.title.toLowerCase().includes(searchQuery.toLowerCase());

        return tabMatch && searchMatch;
    });

    const stats = {
        total: conferences.length,
        upcoming: conferences.filter(c => c.status === 'upcoming').length,
        completed: conferences.filter(c => c.status === 'completed').length,
        ongoing: conferences.filter(c => c.status === 'ongoing').length
    };

    const handleAddConference = async () => {
        const source = addMode === 'url' ? conferenceUrl : manualText;
        if (!source.trim()) return;

        setIsExtracting(true);
        setExtractionStep(addMode === 'url' ? 'Connecting to conference website...' : 'Analyzing pasted text...');

        try {
            let dataToProcess = source;

            if (addMode === 'url') {
                // 1. Scrape HTML
                dataToProcess = await ScraperService.fetchUrl(conferenceUrl);
            }

            setExtractionStep('Analyzing agenda with AI...');
            // 2. Extract Sessions
            const sessions = await AIService.extractSessions(dataToProcess);

            setExtractionStep('Finalizing schedule...');
            // 3. Add to Context (If URL mode, use URL; if paste, use domain-ish name)
            const simulatedUrl = addMode === 'url' ? conferenceUrl : `pasted-text-${Date.now()}`;
            addConference(simulatedUrl, sessions);

            if (sessions.length === 0) {
                alert("Conference created, but no sessions could be automatically extracted. You may need to add them manually.");
            }

            setConferenceUrl('');
            setManualText('');
            setIsAddModalOpen(false);
        } catch (error) {
            console.error("Extraction failed:", error);
            alert("Failed to extract data. Please ensure the content is accessible or try manual paste.");
        } finally {
            setIsExtracting(false);
            setExtractionStep('');
        }
    };

    const handleDeleteClick = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setConferenceToDelete(id);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (conferenceToDelete) {
            deleteConference(conferenceToDelete);
            setIsDeleteModalOpen(false);
            setConferenceToDelete(null);
        }
    };

    // Helper function to calculate time until conference
    const getTimeUntilConference = (startDate: string) => {
        const now = new Date('2026-02-11'); // Current date
        const start = new Date(startDate);
        const diffTime = start.getTime() - now.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return null; // Conference has passed
        if (diffDays === 0) return 'Starting today';
        if (diffDays === 1) return '1 day away';
        if (diffDays < 30) return `${diffDays} days away`;

        const diffMonths = Math.floor(diffDays / 30);
        const remainingDays = diffDays % 30;
        if (diffMonths === 1 && remainingDays === 0) return '1 month away';
        if (remainingDays === 0) return `${diffMonths} months away`;
        return `${diffMonths} month${diffMonths > 1 ? 's' : ''}, ${remainingDays} day${remainingDays !== 1 ? 's' : ''} away`;
    };

    // Helper function to get country flag image info based on location
    const getCountryFlag = (location: string) => {
        const countryMap: { [key: string]: { code: string; name: string } } = {
            'USA': { code: 'us', name: 'United States' },
            'IL': { code: 'us', name: 'United States' },
            'Chicago': { code: 'us', name: 'United States' },
            'Orlando': { code: 'us', name: 'United States' },
            'San Diego': { code: 'us', name: 'United States' },
            'New Orleans': { code: 'us', name: 'United States' },
            'Spain': { code: 'es', name: 'Spain' },
            'Barcelona': { code: 'es', name: 'Spain' },
            'France': { code: 'fr', name: 'France' },
            'Paris': { code: 'fr', name: 'France' },
            'Germany': { code: 'de', name: 'Germany' },
            'Munich': { code: 'de', name: 'Germany' },
            'UK': { code: 'gb', name: 'United Kingdom' },
            'United Kingdom': { code: 'gb', name: 'United Kingdom' },
            'Singapore': { code: 'sg', name: 'Singapore' }
        };

        for (const [key, info] of Object.entries(countryMap)) {
            if (location.includes(key)) {
                return info;
            }
        }
        return { code: 'un', name: 'International' }; // UN flag as default
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
                            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">ConferIQ</h1>
                            <p className="text-slate-500 text-sm font-medium">Conference Intelligence & Planning</p>
                        </div>
                    </div>
                    <Button
                        onClick={() => setIsAddModalOpen(true)}
                        variant="primary"
                        className="bg-[#1D4ED8] hover:bg-blue-700 shadow-lg shadow-blue-500/20 gap-2"
                    >
                        <Icons.Plus className="w-5 h-5" /> Add Conference
                    </Button>
                </div>
            </header>

            <div className="p-8 overflow-y-auto space-y-8 flex-1">
                {/* Summary Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden group">
                        <div>
                            <p className="text-slate-500 text-xs font-medium mb-1">Total Conferences</p>
                            <h2 className="text-2xl font-extrabold text-slate-800">{stats.total}</h2>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                            <Icons.Grid className="w-6 h-6 opacity-40" />
                        </div>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden group">
                        <div>
                            <p className="text-slate-500 text-xs font-medium mb-1">Ongoing</p>
                            <h2 className="text-2xl font-extrabold text-emerald-600">{stats.ongoing}</h2>
                        </div>
                        <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                            <Icons.Live className="w-6 h-6 opacity-40 text-emerald-500" />
                        </div>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden group">
                        <div>
                            <p className="text-slate-500 text-xs font-medium mb-1">Upcoming</p>
                            <h2 className="text-2xl font-extrabold text-blue-600">{stats.upcoming}</h2>
                        </div>
                        <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                            <Icons.Planner className="w-6 h-6 opacity-40 text-blue-500" />
                        </div>
                    </div>

                    <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between relative overflow-hidden group">
                        <div>
                            <p className="text-slate-500 text-xs font-medium mb-1">Completed</p>
                            <h2 className="text-2xl font-extrabold text-slate-600">{stats.completed}</h2>
                        </div>
                        <div className="p-2 bg-slate-50 rounded-xl text-slate-600">
                            <Icons.CheckCircle2 className="w-6 h-6 opacity-40 text-slate-500" />
                        </div>
                    </div>
                </div>

                {/* Filters Tabs & Search */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
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
                    </div>

                    <div className="relative w-80">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search conferences..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/10 shadow-sm"
                        />
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="flex flex-col">
                    {/* Sidebar Filters removed as per user request */}

                    {/* Conference Cards Grid - Single Column */}
                    {filteredConferences.length > 0 ? (
                        <div className="flex flex-col gap-6 pb-8">
                            {filteredConferences.map((conf) => (
                                <div key={conf.id} className="bg-white rounded-3xl border border-slate-200 p-4 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group relative overflow-hidden">
                                    {/* Main horizontal layout: content left, buttons right */}
                                    <div className="flex gap-6">
                                        {/* Left side: Conference content */}
                                        <div className="flex-1 flex flex-col">
                                            {/* Header with Logo and Status */}
                                            <div className="flex items-start gap-4 mb-3">
                                                {/* Conference Logo */}
                                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border border-slate-200 shadow-sm overflow-hidden">
                                                    {conf.logo && conf.logo.startsWith('/') ? (
                                                        <img src={conf.logo} alt={conf.title} className="w-full h-full object-contain p-2" />
                                                    ) : (
                                                        conf.logo || '🎯'
                                                    )}
                                                </div>

                                                {/* Title and Status */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="mb-2 flex items-center gap-3">
                                                        <h3 className="text-lg font-bold text-slate-800 line-clamp-2 leading-tight">{conf.title}</h3>
                                                        {conf.status === 'upcoming' && getTimeUntilConference(conf.startDate) && (
                                                            <span className="shrink-0 px-2 py-1 bg-blue-50 border border-blue-200 rounded-lg text-[10px] font-bold text-blue-700 whitespace-nowrap">
                                                                🕐 {getTimeUntilConference(conf.startDate)}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <Badge
                                                        variant={conf.status === 'ongoing' ? 'success' : conf.status === 'upcoming' ? 'blue' : 'default'}
                                                        className={cn(
                                                            "rounded-lg px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider",
                                                            conf.status === 'ongoing' ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                                                conf.status === 'upcoming' ? "bg-blue-50 text-blue-700 border-blue-100" :
                                                                    "bg-slate-50 text-slate-600 border-slate-100"
                                                        )}
                                                    >
                                                        {conf.status}
                                                    </Badge>
                                                </div>
                                            </div>

                                            {/* Date, Location and Therapeutic Areas - Horizontal Stack */}
                                            <div className="flex flex-wrap gap-12 mb-3">
                                                {/* Date and Location */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                                                            <Icons.Planner className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" />
                                                        </div>
                                                        <span className="text-xs font-medium">
                                                            {conf.startDate} - {conf.endDate}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <div className="p-1.5 bg-slate-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                                                            <Icons.Location className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" />
                                                        </div>
                                                        <img
                                                            src={`https://flagcdn.com/w40/${getCountryFlag(conf.location).code}.png`}
                                                            alt={getCountryFlag(conf.location).name}
                                                            className="w-5 h-auto rounded-sm shadow-sm mr-1 object-contain"
                                                        />
                                                        <span className="text-xs font-medium">{conf.location}</span>
                                                    </div>
                                                </div>

                                                {/* Therapeutic Areas */}
                                                <div className="min-w-[200px]">
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">Therapeutic Areas:</p>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {conf.therapeuticAreas.map((area) => (
                                                            <span key={area} className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[10px] font-semibold text-slate-600 hover:bg-white hover:border-slate-300 transition-all cursor-default">
                                                                {area}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right side: Action Buttons in vertical column */}
                                        <div className="flex flex-col gap-2 items-start w-48 flex-shrink-0 mr-10">
                                            <button
                                                onClick={() => onNavigateDetail(conf.id)}
                                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all"
                                            >
                                                <Icons.TrendingUp className="w-4 h-4 text-slate-500" /> Conference Coverage
                                            </button>
                                            <button
                                                onClick={() => onNavigate('planner', conf.id)}
                                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all"
                                            >
                                                <Icons.Planner className="w-4 h-4 text-slate-500" /> Planner
                                            </button>
                                            <button
                                                className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all"
                                            >
                                                <Icons.FileText className="w-4 h-4 text-slate-500" /> Conference Report
                                            </button>
                                        </div>

                                        {/* Delete button at top right */}
                                        <button
                                            onClick={(e) => handleDeleteClick(conf.id, e)}
                                            className="absolute top-3 right-3 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all bg-white border border-slate-200 shadow-sm z-10"
                                            title="Delete Conference"
                                        >
                                            <Icons.Trash className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-32 space-y-6 text-center">
                            <div className="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 shadow-inner">
                                <Icons.Search className="w-12 h-12 opacity-20" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-slate-800">No Conferences Found</h3>
                                <p className="text-slate-500 max-w-sm">
                                    Start your intelligence journey by adding your first conference via a URL.
                                </p>
                            </div>
                            <Button
                                onClick={() => setIsAddModalOpen(true)}
                                variant="primary"
                                className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20 px-8 py-6 rounded-2xl font-bold"
                            >
                                <Icons.Plus className="w-5 h-5 mr-2" /> Add My First Conference
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Conference Modal */}
            <Dialog
                isOpen={isAddModalOpen}
                onClose={() => !isExtracting && setIsAddModalOpen(false)}
                title="Add New Conference"
                actions={
                    <>
                        <Button variant="outline" onClick={() => setIsAddModalOpen(false)} disabled={isExtracting}>Cancel</Button>
                        <Button
                            variant="primary"
                            onClick={handleAddConference}
                            disabled={isExtracting || (addMode === 'url' ? !conferenceUrl.trim() : !manualText.trim())}
                            className="min-w-[140px]"
                        >
                            {isExtracting ? (
                                <div className="flex items-center gap-2">
                                    <Icons.Loader className="w-4 h-4 animate-spin" />
                                    <span>{extractionStep || 'Processing...'}</span>
                                </div>
                            ) : (
                                <>
                                    <Icons.AI className="w-4 h-4 mr-2" />
                                    Extract Data
                                </>
                            )}
                        </Button>
                    </>
                }
            >
                <div className="space-y-6">
                    {/* Mode Tabs */}
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button
                            onClick={() => !isExtracting && setAddMode('url')}
                            className={cn(
                                "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all",
                                addMode === 'url' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
                            )}
                        >
                            Extract from URL
                        </button>
                        <button
                            onClick={() => !isExtracting && setAddMode('paste')}
                            className={cn(
                                "flex-1 py-1.5 text-xs font-bold rounded-lg transition-all",
                                addMode === 'paste' ? "bg-white text-blue-600 shadow-sm" : "text-slate-500"
                            )}
                        >
                            Paste Agenda
                        </button>
                    </div>

                    {addMode === 'url' ? (
                        <div className="space-y-4">
                            <input
                                type="url"
                                placeholder="https://conference-website.com/agenda"
                                value={conferenceUrl}
                                onChange={(e) => setConferenceUrl(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                            />
                            <div className="bg-blue-50 p-4 rounded-xl flex gap-3">
                                <Icons.Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0" />
                                <p className="text-sm text-blue-800">
                                    <strong>AI Auto-Extraction:</strong> Paste the URL of the agenda page. Our AI will scrape the site and structure the session data for you.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <textarea
                                placeholder="Paste the agenda text or HTML here..."
                                value={manualText}
                                onChange={(e) => setManualText(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 h-48 resize-none text-xs font-mono"
                            />
                            <div className="bg-purple-50 p-4 rounded-xl flex gap-3">
                                <Icons.Zap className="w-5 h-5 text-purple-600 flex-shrink-0" />
                                <p className="text-sm text-purple-800">
                                    <strong>Bypass Blockers:</strong> If a website blocks automatic imports, copy the agenda text directly from your browser and paste it here.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </Dialog>

            {/* Delete Confirmation Modal */}
            <Dialog
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Delete Conference"
                actions={
                    <>
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>Delete Conference</Button>
                    </>
                }
            >
                <div className="space-y-4">
                    <p className="text-slate-600">
                        Are you sure you want to delete this conference? This action cannot be undone and will remove all associated session data.
                    </p>
                </div>
            </Dialog>
        </div>
    );
};
