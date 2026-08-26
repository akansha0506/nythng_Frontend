"use client";

import Image from "next/image";

import blinkit from "../../assets/images/about-us/blinkit.png";
import zepto from "../../assets/images/about-us/zepto.png";
import HeadingHighlight from "@/components/ui/HeadingHighlight";
import bgImage from "../../assets/images/new_images/section_bg.png";

function ShopSlide() {
  return (
    <section className="relative w-full overflow-hidden py-20 bg-cover bg-center bg-no-repeat">

      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10">

        {/* Heading */}
        <div className="text-center mb-10 px-6">
          <HeadingHighlight
            text="Shop Where You Love"
            highlight="You Love"
            className="text-center"
            />

        </div>

        {/* Blinkit + Zepto */}
        <div className="mt-15 md:mt-10 mb-15 gap-5 grid grid-cols-2 md:flex justify-center items-center">

          {/* Blinkit */}
          <div className="flex justify-center h-12 w-24">
            <Image
              src={blinkit}
              alt="Blinkit"
              width={96}
              height={48}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Zepto */}
          <div className="flex justify-center">
            <Image
              src={zepto}
              alt="Zepto"
              width={120}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </div>

        </div>

      </div>
    </section>
  );
}

export default ShopSlide;