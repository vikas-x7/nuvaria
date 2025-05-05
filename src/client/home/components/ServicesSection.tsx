import React from "react";

interface Service {
  id: string;
  number: string;
  title: string;
  taglines: string[];
}

const ServicesSection: React.FC = () => {
  const services: Service[] = [
    {
      id: "1",
      number: "01",
      title: "Digital Design",
      taglines: ["More than just fancy UIs.", "We make life better."],
    },
    {
      id: "2",
      number: "02",
      title: "Branding",
      taglines: ["Originality and relevance.", "Supporting."],
    },
    {
      id: "3",
      number: "03",
      title: "Communication",
      taglines: ["Bringing values together.", "Get it right, do it right."],
    },
    {
      id: "4",
      number: "04",
      title: "Strategy Research",
      taglines: ["Beyond hollow theory.", "Delivering real value."],
    },
  ];

  return (
  <div className="min-h-screen bg-[#0A0A0A] text-white px-4 sm:px-6 md:px-30 lg:py-40 font-[DM_Sans] py-20  ">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full  ">

    {/* Left Side Sticky Image */}
 

    {/* Right Side Content */}
    <div className="lg:col-span-8 space-y-12 md:space-y-16">
      {services.map((service) => (
        <div
          key={service.id}
          className="border-b border-gray-800 pb-12 last:border-b-0"
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Number */}
            <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-orange-600 shrink-0">
              {service.number}
            </span>

            {/* Title + Taglines */}
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-light text-gray-300 tracking-tight">
                {service.title}
              </h2>

              <div className="space-y-2">
                {service.taglines.map((tag, idx) => (
                  <p key={idx} className="text-gray-500 text-lg md:text-xl">
                    {tag}
                  </p>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="hidden lg:flex flex-col gap-3 pt-2">
              <div className="w-2 h-2 rounded-full bg-gray-700"></div>
              <div className="w-2 h-2 rounded-full bg-gray-700"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="lg:col-span-4">
      <div className="sticky top-20">
        <img
          src="./images/heroimage.jpg"
          alt=""
          className="w-full h-[400px] max-w-[420px] object-cover rounded-2xl"
        />
      </div>
    </div>
  </div>
</div>

  );
};

export default ServicesSection;