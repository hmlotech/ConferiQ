
import React from 'react';
import { Icons, Button, Badge, cn } from './UIComponents';

export const SettingsView = () => {
  const [activeTab, setActiveTab] = React.useState('General');
  const TABS = ['General', 'Notifications', 'Conference', 'Integrations'];

  return (
    <div className="flex-1 flex h-full overflow-hidden relative">
        <div className="flex-1 flex flex-col h-full bg-[#F3F4F6] overflow-hidden relative font-sans">
            <header className="h-18 px-8 py-4 flex items-center justify-between bg-white border-b border-slate-200">
                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Settings</h1>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Settings Sidebar */}
                <div className="w-64 bg-white border-r border-slate-200 py-6">
                    <nav className="space-y-1 px-4">
                        {TABS.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={cn(
                                    "w-full flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-colors",
                                    activeTab === tab ? "bg-purple-50 text-purple-700" : "text-slate-600 hover:bg-slate-50"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-12">
                    <div className="max-w-2xl space-y-8">
                        {/* Section 1 */}
                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Display Preferences</h2>
                            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-800">Compact View</h3>
                                        <p className="text-xs text-slate-500">Show more sessions per screen in Planner</p>
                                    </div>
                                    <div className="w-11 h-6 bg-slate-200 rounded-full relative cursor-pointer transition-colors hover:bg-slate-300">
                                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                    </div>
                                </div>
                                <div className="border-t border-slate-100 pt-6 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm font-medium text-slate-800">Theme</h3>
                                        <p className="text-xs text-slate-500">Choose your interface appearance</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-800"></button>
                                        <button className="w-8 h-8 rounded-full bg-white border-2 border-purple-500 shadow-sm"></button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Conference Configuration</h2>
                            <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Default Time Zone</label>
                                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-purple-500/20">
                                        <option>Eastern Standard Time (EST)</option>
                                        <option>Pacific Standard Time (PST)</option>
                                        <option>Central European Time (CET)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Priority Keywords</label>
                                    <div className="flex flex-wrap gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg min-h-[50px]">
                                        <Badge variant="purple" className="bg-white shadow-sm">Lead-212 <Icons.Check className="w-3 h-3 ml-1" /></Badge>
                                        <Badge variant="purple" className="bg-white shadow-sm">Ac-225 <Icons.Check className="w-3 h-3 ml-1" /></Badge>
                                        <button className="text-xs text-slate-400 hover:text-purple-600 px-2">+ Add Keyword</button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        <div className="flex justify-end pt-4">
                            <Button variant="primary">Save Changes</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
