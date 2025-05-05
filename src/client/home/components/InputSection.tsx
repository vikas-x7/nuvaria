"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowUp } from "lucide-react";
import Link from "next/link";

export default function InputSection() {
  const [input, setInput] = useState<string>("");
  

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-grow logic
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 110) + "px";
  }, [input]);

  return (
    <div className="w-94 md:w-[500px] lg:w-[600px] select-none">
      <div className="backdrop-blur-2xl bg-black/30 rounded-[5px] border border-[#2E2E2E]">

        {/* Input Area */}
        <div className="p-6">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want, and get an AI-generated image instantly "
            className="w-full min-h-10 max-h-[200px] font-inter text-neutral-100 
            placeholder-neutral-500 text-[14px] resize-none outline-none no-scrollbar 
            overflow-hidden"
          />
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between px-6 pb-6">

          {/* Left Icons */}
          <div className="flex items-center gap-2">
           <label>
  
  <select className="bg-black outline-none font-inter font-medium text-[#D4D4D4] cursor-pointer">
    <option>Image</option>
    <option>Video</option>

  </select>
</label>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/chat"
              className="p-2 bg-[#FD532F] hover:bg-orange-700 rounded-lg transition-colors"
            >
              <ArrowUp className="w-5 h-5 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
