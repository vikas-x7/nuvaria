"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  return (
    <div className=" bg-[#CACACA]">
      {/* Shadow wrapper */}
      <div className="relative min-h-screen w-full shadow-[0_0_60px_20px_rgba(0,0,0,0.4)] overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
          <video
            className="inset-0 w-full h-full object-cover  "
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="/videos/hero-bg-4k.webm"
              type=""
            />
          </video>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        {/* Soft glow layer */}

        {/* Content */}
        <motion.div
          className="relative z-20 min-h-screen flex flex-col justify-center items-center px-6 md:px-20 py-20"
          initial={{
            opacity: 0,
            y: 30,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-instrument text-white tracking-[1px] md:tracking-[2px] leading-tight">
              Nuvaria AI-powered visuals
            </h1>

            <p className="mt-4 mb-5 text-sm sm:text-2xl font-[DM_Sans] text-white">
              Unleashing AI-powered creativity for seamless image and video
              generation.
              <br />
              Transform ideas into stunning visuals instantly.
            </p>
          </div>

          <Link
            href="/dashboard"
            className="bg-white text-black py-3 px-8 font-[DM_Sans] font-bold mt-6 rounded"
          >
            Getstart now
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
