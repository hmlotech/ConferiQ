import React, { useState } from 'react';
import { Icons, Button, Badge, Dialog, cn } from './UIComponents';
import { AIPanel, AICard } from './AIPanel';
import { AIService } from '../services/ai';
import { SESSIONS } from '../constants';

const REPORTS = [
  { id: 1, title: "Day 1 Executive Summary", type: "Daily Brief", date: "Apr 6, 2026", author: "Mark Porter", status: "Final", downloads: 45 },
  { id: 2, title: "Competitor Analysis: Lead-212", type: "Deep Dive", date: "Apr 6, 2026", author: "Emma Liu", status: "Draft", downloads: 0 },
  { id: 3, title: "Emerging Trends in Radiopharma", type: "Topic Summary", date: "Apr 7, 2026", author: "AI Generated", status: "Processing", downloads: 0 },
  { id: 4, title: "Morning Keynote Highlights", type: "Flash Update", date: "Apr 7, 2026", author: "Sarah Chen", status: "Final", downloads: 12 },
  { id: 5, title: "AACR 2026: Pre-Conference Intelligence", type: "Strategic Report", date: "Apr 5, 2026", author: "Mark Porter", status: "Final", downloads: 128 },
];

export const ReportsView = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [draftContent, setDraftContent] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateDraft = async () => {
    setIsGenerating(true);
    try {
        // Generating a draft focused on 'Radiopharma' based on the AIPanel card prompt
        const result = await AIService.generateTopicDraft("Radiopharma", SESSIONS);
        setDraftContent(result);
        setIsModalOpen(true);
    } catch (e) {
        console.error(e);
    } finally {
        setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 flex h-full overflow-hidden relative">
        <div className="flex-1 flex flex-col h-full bg-[#F3F4F6] overflow-hidden relative font-sans">
            {/* Header */}
            <header className="h-18 px-8 py-4 flex items-center justify-between bg-white border-b border-slate-200">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Reports Hub</h1>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Search reports..." 
                            className="bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/20 w-64"
                        />
                    </div>
                    <Button variant="primary" className="shadow-lg shadow-purple-500/30 gap-2">
                        <Icons.Plus className="w-4 h-4" /> New Report
                    </Button>
                </div>
            </header>

            <div className="p-8 overflow-y-auto">
                {/* Filter Bar */}
                <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
                    <Button variant="white" className="bg-purple-50 text-purple-700 border-purple-200">All Reports</Button>
                    <Button variant="white" className="text-slate-600">Daily Briefs</Button>
                    <Button variant="white" className="text-slate-600">Deep Dives</Button>
                    <Button variant="white" className="text-slate-600">Strategic</Button>
                    <div className="h-6 w-px bg-slate-300 mx-2"></div>
                    <Button variant="ghost" className="text-slate-500 gap-2"><Icons.Filter className="w-4 h-4" /> Filters</Button>
                </div>

                {/* Reports Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {REPORTS.map((report) => (
                        <div key={report.id} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all group flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-50 rounded-xl group-hover:bg-purple-50 transition-colors">
                                    <Icons.FileText className="w-6 h-6 text-slate-400 group-hover:text-purple-600 transition-colors" />
                                </div>
                                <Badge 
                                    variant={report.status === 'Final' ? 'success' : report.status === 'Processing' ? 'warning' : 'default'}
                                    className="bg-opacity-10 border-opacity-20"
                                >
                                    {report.status}
                                </Badge>
                            </div>
                            
                            <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight">{report.title}</h3>
                            <p className="text-sm text-slate-500 mb-6">{report.type} • {report.date}</p>
                            
                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
                                        {report.author.charAt(0)}
                                    </div>
                                    <span className="text-xs text-slate-500">{report.author}</span>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100"><Icons.Eye className="w-4 h-4 text-slate-400" /></Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-slate-100"><Icons.Download className="w-4 h-4 text-slate-400" /></Button>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {/* New Report Placeholder */}
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 hover:border-purple-300 hover:bg-purple-50/10 transition-all flex flex-col items-center justify-center cursor-pointer min-h-[200px]">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4 text-slate-400">
                            <Icons.Plus className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold text-slate-600">Create Custom Report</h3>
                        <p className="text-sm text-slate-400 text-center mt-2 max-w-[200px]">Combine insights from multiple sessions into a new document.</p>
                    </div>
                </div>
            </div>
        </div>

        <AIPanel title="Drafting Assistant">
            <AICard title="Quick Summary" type="Action" typeColor="blue">
                 <p>Generate a 1-page summary of all <strong>Radiopharma</strong> sessions from Day 1?</p>
                 <Button 
                    size="sm" 
                    variant="secondary" 
                    className="w-full mt-2 text-xs"
                    onClick={handleGenerateDraft}
                    disabled={isGenerating}
                 >
                    {isGenerating ? "Generating Draft..." : "Generate Draft"}
                 </Button>
            </AICard>

            <AICard title="Key Quote Extraction" type="Insight" typeColor="purple">
                 <p>Found 14 impactful quotes regarding <strong>survival rates</strong> in uploaded transcripts.</p>
                 <div className="text-purple-600 text-xs font-bold mt-2 cursor-pointer">Review Quotes</div>
            </AICard>
        </AIPanel>

        {/* AI Result Dialog */}
        <Dialog 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            title="Generated Field Report: Radiopharma"
            actions={
                <>
                    <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Discard</Button>
                    <Button variant="primary">Save to Reports</Button>
                </>
            }
        >
            <div className="prose prose-sm prose-slate max-w-none whitespace-pre-wrap">
                {draftContent}
            </div>
        </Dialog>
    </div>
  );
};
