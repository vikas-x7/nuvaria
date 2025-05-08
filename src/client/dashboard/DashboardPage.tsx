"use client";

import React, { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';

export default function DashboardPage() {
    const [message, setMessage] = useState('');

    return (
        <div className="flex-1 flex flex-col h-full relative">
            {/* Top Header */}
            <header className="h-14 flex flex-shrink-0 items-center px-6 border-b border-[#2E2E2E] bg-[#0F0F0F] z-10 sticky top-0">
                <h2 className="text-sm font-medium text-gray-200">Nuvaria Chat</h2>
            </header>

            {/* Chat Area Scrollable */}
            <div className="flex-1 overflow-y-auto w-full relative">
                <div className="max-w-3xl mx-auto p-6 space-y-8 pb-40">
                    {/* Welcome Message */}
                    <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0">
                            <Bot className="w-5 h-5" />
                        </div>
                        <div className="flex-1 mt-1">
                            <div className="text-gray-100 mb-1 font-semibold">Nuvaria</div>
                            <p className="text-gray-300 leading-relaxed">
                                Hello! I'm Nuvaria. How can I help you today?
                            </p>
                        </div>
                    </div>

                    {/* Example User Message */}
                    <div className="flex items-start gap-4 flex-row-reverse">
                        <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-gray-300" />
                        </div>
                        <div className="flex-1 mt-1 flex flex-col items-end">
                            <div className="text-gray-100 mb-1 font-semibold">You</div>
                            <p className="text-gray-100 bg-[#2A2A2A] px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-[85%] leading-relaxed text-left inline-block">
                                I need some help designing my new web application UI. Can you suggest some layout ideas?
                            </p>
                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Input Area */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F] to-transparent pt-10 pb-6 px-4 md:px-6 z-20">
                <div className="max-w-3xl mx-auto relative">
                    <div className="relative flex items-center bg-[#1E1E1E] border border-[#333333] rounded-2xl shadow-xl transition-all focus-within:border-gray-500 focus-within:ring-1 focus-within:ring-gray-500 overflow-hidden group">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message Nuvaria..."
                            className="flex-1 bg-transparent text-white placeholder-gray-500 px-5 py-4 max-h-48 min-h-[56px] resize-none outline-none text-[15px]"
                            rows={1}
                        />
                        <div className="absolute right-3 bottom-2.5">
                            <button
                                className="p-2 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-30 disabled:hover:bg-white"
                                disabled={!message.trim()}
                            >
                                <Send className="w-4 h-4 ml-0.5" />
                            </button>
                        </div>
                    </div>
                    <div className="text-center mt-3 text-xs text-gray-500">
                        Nuvaria can make mistakes. Consider verifying important information.
                    </div>
                </div>
            </div>
        </div>
    );
}
