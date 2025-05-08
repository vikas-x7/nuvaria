import React from 'react';
import { Plus, MessageSquare, Settings, User } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen w-full bg-[#0F0F0F] text-white overflow-hidden font-[DM_Sans]">
            {/* Sidebar */}
            <aside className="w-64 max-w-[260px] flex-shrink-0 bg-[#171717] border-r border-[#2E2E2E] flex flex-col transition-all duration-300">
                <div className="p-4 flex items-center">
                    <h1 className="text-2xl font-bold font-instrument tracking-tight">Nuvaria</h1>
                </div>

                <div className="px-3 mt-4">
                    <button className="w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 px-4 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                        <Plus className="w-5 h-5" />
                        <span>New Chat</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto mt-6 px-3 space-y-1">
                    {/* Recent chats placeholder */}
                    <div className="text-xs text-gray-500 font-semibold mb-3 px-2 uppercase tracking-wider">Recent</div>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2A2A2A] text-gray-300 transition-colors text-sm text-left">
                        <MessageSquare className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">How to build an AI app</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2A2A2A] text-gray-300 transition-colors text-sm text-left">
                        <MessageSquare className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">React layout ideas</span>
                    </button>
                </div>

                <div className="p-3 border-t border-[#2E2E2E]">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2A2A2A] text-gray-300 transition-colors text-sm text-left">
                        <User className="w-4 h-4" />
                        <span>Profile</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2A2A2A] text-gray-300 transition-colors text-sm text-left">
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full bg-[#0F0F0F] overflow-hidden relative">
                {children}
            </main>
        </div>
    );
}
