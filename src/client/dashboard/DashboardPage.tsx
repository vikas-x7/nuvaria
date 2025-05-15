"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

export type Message = {
    id: string;
    role: 'bot' | 'user';
    text: string;
    imageUrl?: string;
    status?: string;
};

const initialMessages: Message[] = [
    {
        id: 'welcome',
        role: 'bot',
        text: "Hello! I'm Nuvaria. Let's create something beautiful together. What would you like to imagine?"
    }
];

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const chatId = searchParams.get('chatId');

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (chatId) {
            fetch(`/api/chat/${chatId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.data) {
                        const history = data.data.images || [];
                        const formattedMessages: Message[] = [];

                        history.forEach((img: any) => {
                            formattedMessages.push({ id: `prompt-${img.id}`, role: 'user', text: img.prompt });
                            formattedMessages.push({ id: `resp-${img.id}`, role: 'bot', text: '', imageUrl: img.imageUrl, status: img.status });
                        });

                        setMessages([initialMessages[0], ...formattedMessages]);
                    }
                })
                .catch(console.error);
        } else {
            setMessages(initialMessages);
        }
    }, [chatId]);

    const handleSend = async () => {
        if (!message.trim()) return;
        const currentMessage = message;
        setMessage('');

        const tempUserId = Date.now().toString();
        const tempBotId = tempUserId + '-bot';

        setMessages(prev => [
            ...prev,
            { id: tempUserId, role: 'user', text: currentMessage },
            { id: tempBotId, role: 'bot', text: '', status: 'PENDING' }
        ]);

        let targetChatId = chatId;

        // If no active chat, create one
        if (!targetChatId) {
            try {
                const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: currentMessage })
                }).then(r => r.json());

                if (res.success) {
                    targetChatId = res.data.id;
                    // Update URL without a hard reload so DashboardLayout detects pathname/query change
                    router.replace(`/dashboard?chatId=${targetChatId}`);
                }
            } catch (err) {
                console.error("Failed to create chat", err);
            }
        }

        // Generate Image
        try {
            const genRes = await fetch('/api/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: currentMessage, chatId: targetChatId })
            }).then(r => r.json());

            if (genRes.success) {
                setMessages(prev => prev.map(m => m.id === tempBotId ? { ...m, status: 'SUCCESS', imageUrl: genRes.data.imageUrl } : m));
            } else {
                setMessages(prev => prev.map(m => m.id === tempBotId ? { ...m, status: 'FAILED', text: 'Error generating image: ' + (genRes.error || 'Unknown error') } : m));
            }
        } catch (err) {
            setMessages(prev => prev.map(m => m.id === tempBotId ? { ...m, status: 'FAILED', text: 'Network error generating image.' } : m));
        }
    };

    return (
        <div className="flex-1 flex flex-col h-full relative">
            {/* Top Header */}
            <header className="h-14 flex flex-shrink-0 items-center px-6 border-b border-[#2E2E2E] bg-[#0F0F0F] z-10 sticky top-0">
                <h2 className="text-sm font-medium text-gray-200">Nuvaria Chat</h2>
            </header>

            {/* Chat Area Scrollable */}
            <div className="flex-1 overflow-y-auto w-full relative scrollbar-hide py-4">
                <div className="max-w-3xl mx-auto px-6 space-y-8 pb-40">
                    {messages.map((msg) => (
                        msg.role === 'bot' ? (
                            <div key={msg.id} className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center flex-shrink-0 shadow-lg">
                                    <Bot className="w-5 h-5" />
                                </div>
                                <div className="flex-1 mt-1">
                                    <div className="text-gray-100 mb-2 font-semibold">Nuvaria</div>

                                    {msg.status === 'PENDING' ? (
                                        <div className="flex items-center gap-3 text-zinc-400 bg-[#171717] px-4 py-3 rounded-2xl w-fit border border-[#2E2E2E]">
                                            <div className="w-5 h-5 border-[3px] border-zinc-600 border-t-white rounded-full animate-spin" />
                                            <span className="text-sm font-medium">Generating your masterpiece...</span>
                                        </div>
                                    ) : msg.status === 'FAILED' ? (
                                        <p className="text-red-400 bg-red-950/30 px-4 py-3 rounded-2xl border border-red-900/50 w-fit text-sm">
                                            {msg.text || "An error occurred."}
                                        </p>
                                    ) : msg.imageUrl ? (
                                        <div className="group relative w-fit mt-1 rounded-xl overflow-hidden shadow-2xl border border-[#333]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={msg.imageUrl} alt="Generated using Nuvaria" className="max-w-sm rounded-xl hover:scale-[1.02] transition-transform duration-500 ease-out" />
                                        </div>
                                    ) : (
                                        <p className="text-gray-300 leading-relaxed max-w-[85%] text-[15px]">
                                            {msg.text}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div key={msg.id} className="flex items-start gap-4 flex-row-reverse">
                                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0 shadow-inner">
                                    <User className="w-5 h-5 text-gray-300" />
                                </div>
                                <div className="flex-1 mt-1 flex flex-col items-end">
                                    <div className="text-gray-100 mb-1 font-semibold text-sm">You</div>
                                    <p className="text-gray-100 bg-[#2A2A2A] px-5 py-3 rounded-2xl rounded-tr-sm max-w-[85%] leading-relaxed text-left inline-block text-[15px] shadow-sm">
                                        {msg.text}
                                    </p>
                                </div>
                            </div>
                        )
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Bottom Input Area */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F] to-transparent pt-12 pb-6 px-4 md:px-6 z-20">
                <div className="max-w-3xl mx-auto relative">
                    <div className="relative flex items-center bg-[#171717] border border-[#333333] rounded-2xl shadow-xl transition-all focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-400/20 focus-within:shadow-[0_0_20px_rgba(255,255,255,0.05)] overflow-hidden group hover:border-[#444]">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Message Nuvaria to generate an image..."
                            className="flex-1 bg-transparent text-white placeholder-gray-500 px-5 py-4 max-h-48 min-h-[58px] resize-none outline-none text-[15px]"
                            rows={1}
                        />
                        <div className="absolute right-3 bottom-3">
                            <button
                                onClick={handleSend}
                                className="p-2.5 bg-white text-black rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-30 disabled:hover:bg-white flex items-center justify-center shadow-sm hover:shadow-md"
                                disabled={!message.trim()}
                            >
                                <Send className="w-4 h-4 ml-0.5" />
                            </button>
                        </div>
                    </div>
                    <div className="text-center mt-3 text-[11px] text-zinc-500 tracking-wide font-medium">
                        Nuvaria uses AI to imagine images. Some results may be unpredictable.
                    </div>
                </div>
            </div>
        </div>
    );
}
