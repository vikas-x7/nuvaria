"use client";
import React from "react";

interface AssetCard {
  id: number;
  title: string;
  image: string;
  gradient: string;
}

const assets: AssetCard[] = [
  {
    id: 1,
    title: "Music",
    image:
      "https://i.pinimg.com/1200x/51/be/02/51be0221356936581a0382ae26080d19.jpg",
    gradient: "from-black/60 to-transparent",
  },
  {
    id: 2,
    title: "SFX",
    image:
      "https://i.pinimg.com/736x/41/d8/c2/41d8c260bead65dda136dc36ff050f53.jpg",
    gradient: "from-black/60 to-transparent",
  },
  {
    id: 3,
    title: "Footage",
    image:
      "https://i.pinimg.com/1200x/dc/c3/ba/dcc3ba8c94d0fe9a2231c94ef20b338f.jpg",
    gradient: "from-black/60 to-transparent",
  },
  {
    id: 1,
    title: "Music",
    image:
      "https://i.pinimg.com/1200x/51/be/02/51be0221356936581a0382ae26080d19.jpg",
    gradient: "from-black/60 to-transparent",
  },
  {
    id: 2,
    title: "SFX",
    image:
      "https://i.pinimg.com/736x/41/d8/c2/41d8c260bead65dda136dc36ff050f53.jpg",
    gradient: "from-black/60 to-transparent",
  },
  {
    id: 3,
    title: "Footage",
    image:
      "https://i.pinimg.com/1200x/dc/c3/ba/dcc3ba8c94d0fe9a2231c94ef20b338f.jpg",
    gradient: "from-black/60 to-transparent",
  },
];

const CreativeAssetsHero: React.FC = () => {
  return (
    <div className="h-screen bg-[#0A0A0A] text-white ">
      {/* Hero Header */}
      <div className="text-start pt-20 md:px-30 px-6 font-[DM_Sans]">
        <h1 className="text-5xl md:text-7xl lg:text-7xl mb-3 text-[#CACACA] -tracking-[2px]">
          Nuvaria AI-powered visuals, <br />
          shaping ideas effortlessly.
        </h1>
      </div>

    <div className="w-full flex justify-center items-center">


      {/* Auto-scroll cards */}
      <div className="w-[90%] overflow-hidden relative pb-16  md:w-[85%]  mt-20 ">
        <div className="flex animate-scroll whitespace-nowrap">
          {assets.concat(assets).map((asset, idx) => (
            <div
              key={idx}
              className="relative w-94 h-94  shrink-0 cursor-pointer overflow-hidden"
            >
              <img
                src={asset.image}
                alt={asset.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-linear-to-t ${asset.gradient}`}
              />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-2xl md:text-4xl font-[DM_Sans] text-white">
                  {asset.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          display: flex;
          gap: 16px;
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CreativeAssetsHero;
