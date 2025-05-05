"use client";
import React from "react";

const GetStartSection: React.FC = () => {
  return (
    <div className="flex justify-center items-center bg-[#0A0A0A] py-50 ">
      <div className="relative w-[90%] h-[100px] md:w-[80%] md:h-[300px] overflow-hidden rounded-xl">

        {/* Video Inside Div */}
        <video
          className="absolute inset-0 w-full h-full object-cover "
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="https://www.pexels.com/download/video/5299577/" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Center Button */}
        <div className="relative z-10 flex items-center justify-center w-full h-full">
          <button className="bg-white text-black text-lg px-8 py-3 rounded font-semibold">
            Get Start
          </button>
        </div>

      </div>
    </div>
  );
};

export default GetStartSection;
