"use client";

import React, { useEffect, useState } from 'react';
import { Plus, MessageSquare, Settings, User } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [chats, setChats] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/chat', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    setChats(data.data);
                }
            })
            .catch(console.error);
    }, [pathname, searchParams]);

    const handleNewChat = () => {
        router.push(`/dashboard`);
    };

    const handleOpenChat = (id: string) => {
        router.push(`/dashboard?chatId=${id}`);
    }

    return (
        <div className="flex h-screen w-full bg-[#0F0F0F] text-white overflow-hidden font-[DM_Sans]">
            {/* Sidebar */}
            <aside className="w-64 max-w-[260px] flex-shrink-0 bg-[#171717] border-r border-[#2E2E2E] flex flex-col transition-all duration-300">
                <div className="p-4 flex items-center">
                    <h1 className="text-2xl font-bold font-instrument tracking-tight">Nuvaria</h1>
                </div>

                <div className="px-3 mt-4">
                    <button onClick={handleNewChat} className="w-full flex items-center justify-center gap-2 bg-white text-black py-2.5 px-4 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                        <Plus className="w-5 h-5" />
                        <span>New Chat</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto mt-6 px-3 space-y-1">
                    <div className="text-xs text-gray-500 font-semibold mb-3 px-2 uppercase tracking-wider">Recent</div>
                    {chats.map(chat => (
                        <button key={chat.id} onClick={() => handleOpenChat(chat.id)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[#2A2A2A] text-gray-300 transition-colors text-sm text-left">
                            <MessageSquare className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{chat.title || 'Nuvaria Chat'}</span>
                        </button>
                    ))}
                    {chats.length === 0 && (
                        <div className="text-gray-500 text-xs px-2 text-center mt-4">No recent chats</div>
                    )}
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
