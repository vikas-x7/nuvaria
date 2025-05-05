"use client";

import { useState } from "react";

interface Image {
  id: number;
  url: string;
  span: string;
}

export default function PhotoGallery() {
  const images: Image[] = [
    {
      id: 1,
      url: "https://i.pinimg.com/736x/63/e6/7c/63e67c6f0eeb94087faafb857f8bcc4d.jpg",
      span: "row-span-2",
    },
    {
      id: 2,
      url: "https://i.pinimg.com/1200x/bf/7e/cb/bf7ecb09d35a6af3de35fbe4bb2219a1.jpg",
      span: "row-span-2",
    },
    {
      id: 3,
      url: "https://i.pinimg.com/736x/12/0e/2b/120e2bdf8904e2d8f7b119a8df4924da.jpg",
      span: "row-span-3",
    },
    {
      id: 4,
      url: "https://i.pinimg.com/736x/f0/ad/52/f0ad52d9126a99563a092e31c9927af0.jpg",
      span: "row-span-2",
    },
    {
      id: 5,
      url: "https://i.pinimg.com/1200x/cb/74/8b/cb748be384b8ccc3e757fceb3820f9d4.jpg",
      span: "row-span-1",
    },
    {
      id: 6,
      url: "https://i.pinimg.com/736x/cb/bb/f1/cbbbf1d6eba91e1ccb545e49a42d5982.jpg",
      span: "row-span-2",
    },
    {
      id: 7,
      url: "https://i.pinimg.com/736x/3b/ae/5f/3bae5f3a15c1176e58882348d3f8559d.jpg",
      span: "row-span-2",
    },
    {
      id: 8,
      url: "https://i.pinimg.com/736x/a0/a3/93/a0a393137c366e12960fd6794cd6fcbf.jpg",
      span: "row-span-1",
    },
    {
      id: 9,
      url: "https://i.pinimg.com/736x/21/f8/f9/21f8f9bcce2e1aceec1f85856791ea6f.jpg",
      span: "row-span-2",
    },
    {
      id: 10,
      url: "https://i.pinimg.com/1200x/e1/0a/20/e10a20fe608c658a396fd8861b7112ba.jpg",
      span: "row-span-3",
    },
    {
      id: 11,
      url: "https://i.pinimg.com/736x/5c/1d/47/5c1d47ade79e20ea1919ef018b2b0342.jpg",
      span: "row-span-2",
    },
    {
      id: 12,
      url: "https://i.pinimg.com/736x/4d/36/0a/4d360ac31f151c7da9aebbe6aa2920d6.jpg",
      span: "row-span-1",
    },
    {
      id: 13,
      url: "https://i.pinimg.com/1200x/9d/c6/7f/9dc67f43be2f6d915db234b3b56188b0.jpg",
      span: "row-span-2",
    },
    {
      id: 14,
      url: "https://i.pinimg.com/736x/6b/2b/d3/6b2bd34cdd8ff3273790d8add32dd356.jpg",
      span: "row-span-1",
    },
    {
      id: 15,
      url: "https://i.pinimg.com/736x/c0/71/c0/c071c0d78f2afd00bd9e520b8c1e7f30.jpg",
      span: "row-span-2",
    },
    {
      id: 16,
      url: "https://i.pinimg.com/1200x/dd/6f/7f/dd6f7f89186be7c1268943593500551c.jpg",
      span: "row-span-1",
    },
    {
      id: 17,
      url: "https://i.pinimg.com/1200x/ea/e8/04/eae804fe4fbb17090efc2263ad1a6152.jpg",
      span: "row-span-1",
    },
  
  ];

  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  return (
    <div className="bg-black/80   ">
      {/* Masonry Grid */}
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 auto-rows-[150px] gap-2 px-2 py-2   ">
        {images.map((image) => (
          <div
            key={image.id}
            className={`${image.span} cursor-pointer overflow-hidden  group relative`}
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.url}
              alt={`Gallery image ${image.id}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={selectedImage.url}
            alt="Selected"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
