import React from "react";
import InputSection from "./InputSection";
import PhotoGallery from "./PhotoGallery";
import Footer from "./Footer";

export const ChatHero = () => {
  return (
    <div className="relative h-screen w-full overflow-y-auto no-scrollbar ">

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="./videos/heroVideo.mp4" type="video/mp4" />
      </video>

      {/* Overlay to darken video */}
     <div className="absolute top-0 left-0 w-full h-full 
    bg-black/70 
  
    z-10">
</div>


      {/* Main Content */}
      <div className="relative z-20 bg-transparent h-screen">
        <div className="h-[80%] flex flex-col justify-center items-center">
          <div className="flex flex-col  justify-center items-center py-7">
            <div className="text-center">
              <h1 className="text-6xl font-instrument text-gray-100">
                Nuvaria AI-powered visuals
              </h1>
              <p className="mt-4 mb-5 text-[15px] font-inter text-gray-300">
                Unleashing AI-powered creativity for seamless image and video
                generation , <br /> Transform ideas into stunning visuals instantly
              </p>
            </div>
          </div>

           
          <InputSection />
        </div>

        <PhotoGallery />
        <Footer />
      </div>
    </div>
  );
};
