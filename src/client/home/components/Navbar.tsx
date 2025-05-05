"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full text-white fixed z-100  md:px-20 font-[DM_Sans]">
      <div className="bg-transparent backdrop-blur-sm py-3 mx-auto flex items-center justify-between px-4 md:px-10">
        <div className="flex items-center gap-1 justify-center">
        <img className="w-7" src="./images/fevicon.svg" alt="" />
        <Link href="/" className="text-2xl font-instrument">
          Nuvaria
        </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/features" className="hover:text-gray-300 duration-150">
            AI image
          </Link>
          <Link href="/pricing" className="hover:text-gray-300 duration-150">
            AI video
          </Link>
          <Link href="/gallery" className="hover:text-gray-300 duration-150">
            AI voice
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 duration-150"
          >
            Login
          </Link>
        </div>

        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 mt-3 bg-black/90 p-4 rounded-lg border border-white/10 text-sm animate-fadeIn">
          <Link href="/features" className="hover:text-gray-300 duration-150">
            AI image
          </Link>
          <Link href="/pricing" className="hover:text-gray-300 duration-150">
            AI video
          </Link>
          <Link href="/gallery" className="hover:text-gray-300 duration-150">
            AI voice
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 duration-150"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
