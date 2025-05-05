"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Bookmark,
  Download,
  History,
  Image,
  Plus,
  Video,
  ArrowLeftToLine,
  ArrowRightToLine,
  SquarePen,
  VideoIcon,
} from "lucide-react";
export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div
      className={` transition-all duration-200 bg-[#0c0c0c] text-[#D4D4D4]  h-screen ${
        isOpen ? "w-62" : "w-16 "
      }`}
    >
      <div className="flex flex-col justify-between   h-screen  ">
        <div>
          <div className="flex items-center justify-between  border-b border-[#2E2E2E] ">
            {isOpen && (
              <div className="flex gap-2 px-4 ">
                <img className="w-7" src="./images/fevicon.svg" alt="" />
                <Link
                  href="/dashboard"
                  className="text-2xl font-medium font-instrument  text-[#D4D4D4] "
                >
                  Nuvaria
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="  m-4 cursor-pointer text-[#D1D1D1] "
            >
              {isOpen ? (
                <div className="p-1 border border-[#302f2f]  text-[#797777]  rounded-[5px] hover:bg-[#FD532F] duration-700">
                  <ArrowLeftToLine size={18} />
                </div>
              ) : (
                <div className="p-1 border border-[#302f2f]  text-[#797777]  rounded-[5px] hover:bg-[#FD532F] duration-700">
                  <ArrowRightToLine size={18} />
                </div>
              )}
            </button>
          </div>

          <div className="mt-4  px-4 font-inter ">
            <ul className="flex flex-col gap-y-2 cursor-pointer text-[14px] text-[#898888] font-light ">
              <Link
                href="/dashboard/chat"
                className="relative flex items-center px-2 py-2 hover:bg-[#FD532F] hover:text-white rounded-[5px]"
              >
                <SquarePen size={18} />
                <span
                  className={`absolute left-8 whitespace-nowrap transition-all duration-300
        ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-5px]"}
      `}
                >
                  New Chat
                </span>
              </Link>

              <Link
                href="/dashboard/save"
                className="relative flex items-center px-2 py-2 hover:bg-[#FD532F] hover:text-white  rounded-[5px]"
              >
                <Bookmark size={18} />
                <span
                  className={`absolute left-8 whitespace-nowrap transition-all duration-300
        ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-5px]"}
      `}
                >
                  Save data
                </span>
              </Link>

              <Link
                href="/dashboard/history"
                className="relative flex items-center px-2 py-2 hover:bg-[#FD532F] hover:text-white  rounded-[5px]"
              >
            
                <Image size={18} />
                <span
                  className={`absolute left-8 whitespace-nowrap transition-all duration-300
        ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-5px]"}
      `}
                >
                  AI image 
                </span>
              </Link>
                 <Link
                href="/dashboard/history"
                className="relative flex items-center px-2 py-2 hover:bg-[#FD532F] hover:text-white  rounded-[5px]"
              >
                <VideoIcon size={18} />
                <span
                  className={`absolute left-8 whitespace-nowrap transition-all duration-300
        ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-5px]"}
      `}
                >
                  AI video 
                </span>
              </Link>   <Link
                href="/dashboard/history"
                className="relative flex items-center px-2 py-2 hover:bg-[#FD532F] hover:text-white  rounded-[5px]"
              >
                <History size={18} />
                <span
                  className={`absolute left-8 whitespace-nowrap transition-all duration-300
        ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-5px]"}
      `}
                >
                  History
                </span>
              </Link>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="px-4 py-8">
          <div className=" flex  items-center ">
            <div className="w-10 h-10 ">
              <img
                className="w-full h-full object-cover rounded-full"
                src="https://avatars.githubusercontent.com/u/113900393?v=4"
                alt=""
              />
            </div>
            {isOpen ? (
              <div className="flex items-center justify-between font-inter text-[13px] ml-2.5">
                <div className="text-[12px]">
                  <p className="">Vikas Pal</p>
                  <p className="">vikaspal12@gmail.com</p>
                </div>
              </div>
            ) : (
              <div className=""></div>
            )}
          </div>
          {/* <div >
          <Link className="bg-white text-black text-center px-18 py-1 font-inter " href="/login" > login </Link>
        </div> */}
        </div>
      </div>
    </div>
  );
}
