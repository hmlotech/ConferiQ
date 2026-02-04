
import React, { useState } from 'react';
import { Icons, Button, cn } from './UIComponents';

export interface AIPanelProps {
  children?: React.ReactNode;
  title?: string;
}

export const AIPanel = ({ children, title = "AI Assistant" }: AIPanelProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={cn(
      "flex flex-col h-full bg-white border-l border-slate-200 transition-all duration-300 ease-in-out relative z-30 shadow-2xl",
      isOpen ? "w-80 translate-x-0" : "w-16"
    )}>
      {/* Toggle Button - Redesigned to be floating on the edge */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -left-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-md text-slate-400 hover:text-purple-600 z-50 hover:scale-110 transition-transform"
      >
        {isOpen ? <Icons.ChevronRight className="w-4 h-4" /> : <Icons.ChevronLeft className="w-4 h-4" />}
      </button>

      {isOpen ? (
        <>
           <div className="h-18 px-5 py-4 border-b border-slate-100 flex items-center gap-3 bg-gradient-to-r from-purple-50/50 to-white">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                    <Icons.AI className="w-5 h-5" />
                </div>
                <h2 className="text-md font-bold text-slate-800 tracking-tight">{title}</h2>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F8F9FB]">
               {children}
           </div>

           <div className="p-4 border-t border-slate-100 bg-white">
                <Button variant="ghost" className="w-full text-xs text-slate-500 flex items-center justify-center gap-2 hover:bg-slate-50 border border-dashed border-slate-200">
                    <Icons.Settings className="w-3 h-3" /> Configure Sources
                </Button>
           </div>
        </>
      ) : (
        <div className="flex flex-col items-center h-full py-4 bg-slate-50/50">
             {/* Header Placeholder for alignment */}
             <div className="h-14 w-full flex items-center justify-center mb-4">
                 <div 
                    onClick={() => setIsOpen(true)} 
                    className="w-10 h-10 rounded-xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-purple-600 cursor-pointer hover:shadow-md hover:scale-105 transition-all group"
                    title="Open AI Assistant"
                 >
                    <Icons.AI className="w-5 h-5 group-hover:animate-pulse" />
                 </div>
             </div>
             
             {/* Visual Indicators of Content */}
             <div className="flex-1 flex flex-col items-center gap-3 w-full">
                 <div className="w-1 h-8 bg-slate-200 rounded-full"></div>
                 <div className="w-8 h-8 rounded-full bg-slate-200/50"></div>
                 <div className="w-8 h-8 rounded-full bg-slate-200/50"></div>
             </div>
             
             <div className="mt-auto pb-4">
                <div className="w-8 h-8 flex items-center justify-center text-slate-300">
                    <Icons.Settings className="w-4 h-4" />
                </div>
             </div>
        </div>
      )}
    </div>
  );
};

// Reusable AI Card Component
export interface AICardProps {
    title: string;
    type?: string;
    typeColor?: "blue" | "red" | "green" | "purple" | "amber";
    children?: React.ReactNode;
    key?: React.Key;
}

export const AICard = ({ title, type, typeColor = "blue", children }: AICardProps) => {
    const colors = {
        blue: "bg-blue-50 text-blue-600 border-blue-100",
        red: "bg-red-50 text-red-600 border-red-100",
        green: "bg-emerald-50 text-emerald-600 border-emerald-100",
        purple: "bg-purple-50 text-purple-600 border-purple-100",
        amber: "bg-amber-50 text-amber-600 border-amber-100",
    };

    return (
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:shadow-md transition-all group animate-in slide-in-from-right-2 duration-300">
            <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center group-hover:bg-purple-50 transition-colors">
                        <Icons.AI className="w-3 h-3 text-slate-500 group-hover:text-purple-600" />
                    </div>
                    {type && (
                        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider", colors[typeColor])}>
                            {type}
                        </span>
                    )}
                </div>
            </div>
            <h3 className="font-semibold text-slate-700 text-sm mb-2 leading-tight">{title}</h3>
            <div className="text-xs text-slate-500 space-y-2">
                {children}
            </div>
        </div>
    )
}
