"use client";

import Image from "next/image";
import forImg from "../../assets/images/about-us/forImg.jpg";
import everyone from "../../assets/images/madeFor-Everyone/madeforEveryone33.png";
import everyone1 from "../../assets/images/madeFor-Everyone/madeforEveryone11.png";
import everyone2 from "../../assets/images/madeFor-Everyone/madeforEveryone22.jpg";
import everyone3 from "../../assets/images/madeFor-Everyone/madeforEveryone33.png";
import everyone4 from "../../assets/images/madeFor-Everyone/madeforEveryone22.jpg";
import bgImage from "../../assets/images/new_images/section_bg.png";


const images = [
  {
    image: everyone1,
    size: "small",
  },
  {
    image: everyone2,
    size: "medium",
  },
  {
    image: everyone3,
    size: "large",
  },
  {
    image: forImg,
    size: "large",
  },
  {
    image: everyone4,
    size: "medium",
  },
  {
    image: everyone,
    size: "small",
  },
];

function MadeForEveryone() {
  return (
   <section className="relative w-full overflow-hidden py-14">
     <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
         src={bgImage}
         alt="Background"
         fill
         className="w-full h-full object-cover object-center"
        />
    </div>
         
  {/* Overlay */}
  {/* <div className="absolute inset-0 bg-gradient-to-b from-white/35 via-white/20 to-[#3a8b88]/10 backdrop-blur-[2px] z-0" /> */}

  {/* Content */}
  <div className="relative z-10 w-11/12 mx-auto">

    <div className="relative rounded-[50px] md:px-12 md:py-12 overflow-hidden">

      {/* Glow Effects */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(97,185,185,0.45) 0%, transparent 70%)",
        }}
      />

      <div
        className="absolute bottom-0 right-0 w-[300px] h-[300px] rounded-full blur-3xl opacity-10"
        style={{
          background:
            "radial-gradient(circle, rgba(183,146,53,0.45) 0%, transparent 70%)",
        }}
      />

      {/* Heading */}
      <div className="relative z-10 text-center">
        <span className="uppercase tracking-[6px] text-[#b79235] text-sm font-medium">
          Inclusive Beauty
        </span>

        <h2 className="mt-6 font-serif leading-none">
          <span className="block text-5xl md:text-7xl lg:text-[90px] primaryText">
            Made For
          </span>

          <span className="block text-5xl md:text-7xl lg:text-[120px] text-[#61b9b9]">
            Everyone
          </span>
        </h2>

        <p className="bodyText max-w-2xl mx-auto mt-8 text-lg">
          Thoughtfully crafted for every skin type, every skin tone,
          every concern and every stage of your skincare journey.
        </p>
      </div>

      {/* Floating Images */}
      <div className="relative z-10 mt-12 md:mt-16">

        {/* Mobile Layout */}
        <div className="flex md:hidden justify-center">
          <div className="grid grid-cols-3 gap-3 place-items-center">
            {images.map((item, index) => (
              <div
                key={index}
                className={`
                  relative overflow-hidden rounded-full
                  border-[4px] border-white
                  shadow-[0_15px_40px_rgba(53,84,84,0.10)]
                  ${
                    item.size === "large"
                      ? "w-28 h-28"
                      : item.size === "medium"
                      ? "w-24 h-24"
                      : "w-20 h-20"
                  }
                `}
              >
                <Image
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-center">
          <div className="flex items-center -space-x-8 lg:-space-x-10">
            {images.map((item, index) => (
              <div
                key={index}
                className={`
                  relative overflow-hidden rounded-full
                  border-[6px] border-white
                  shadow-[0_25px_60px_rgba(53,84,84,0.12)]
                  transition-all duration-500
                  hover:-translate-y-4 hover:z-20
                  ${
                    item.size === "large"
                      ? "w-44 h-44 lg:w-56 lg:h-56"
                      : item.size === "medium"
                      ? "w-36 h-36 lg:w-44 lg:h-44"
                      : "w-28 h-28 lg:w-36 lg:h-36"
                  }
                `}
              >
                <Image
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>

  </div>
</section>
  );
}

export default MadeForEveryone;