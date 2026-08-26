"use client";

import Image from "next/image";

import HeadingHighlight from "@/components/ui/HeadingHighlight";
import icon1 from "@/assets/images/researchLab/icon1New.png";
import icon2 from "@/assets/images/researchLab/icon2New.png";
import icon3 from "@/assets/images/researchLab/icon3New.png";
import icon4 from "@/assets/images/researchLab/icon4New.png";

function ChooseUs() {
  const features = [
    { image: icon1 },
    { image: icon2 },
    { image: icon3 },
    { image: icon4 },
  ];

  return (
    <section className="mt-20 md:mt-30 w-11/12 max-w-6xl mx-auto flex flex-col items-center">
      <HeadingHighlight
        text="Why Choose Us"
        highlight="Choose Us"
        className="text-center"
      />

      {/* Grid container with proper alignment & auto-sizing for images */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 w-full mt-10 md:mt-16 justify-items-center items-center">
        {features.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center w-full"
          >
            <Image
              src={item.image}
              alt={`icon-${index}`}
              className="w-full max-w-[200px] h-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ChooseUs;