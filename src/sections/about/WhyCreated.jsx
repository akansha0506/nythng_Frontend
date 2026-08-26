import React from "react";
import Image from "next/image";
import created from "../../assets/images/about-us/created.jpg";
import desc from "../../assets/images/about-us/description.png";
import HeadingHighlight from "@/components/ui/HeadingHighlight";
import bgImage from "../../assets/images/new_images/section_bg.png";

function WhyCreated() {
  return (
    <section
      className="w-full bg-cover bg-center bg-no-repeat py-20"
      style={{ backgroundImage: `url(${bgImage.src})` }}
    >
      <div className="w-11/12 mx-auto">
        <HeadingHighlight
          text="Less to Hide Behind. More to Reveal."
          highlight="Reveal."
          withBreak={false}
          className="block lg:hidden"
        />

        <p className="lg:w-1/2 mt-4 md:mt-2 bodyText">
          We are not just a skincare brand. We are a movement that is made to
          strip away the noise, detox beauty myths, and give you tools that
          actually serve and save your skin from skin issues — and your self.
          Our products are essentials they are crafted with precision, powered
          by truth, and designed to fit seamlessly into your daily ritual.
        </p>

        <div className="flex justify-between mt-8">
          <div className="w-full lg:w-1/2">
            <Image
              src={created}
              alt="created"
              className="lg:w-80 w-full h-80 object-cover rounded-2xl"
            />

            <h3 className="text-xl font-light md:text-2xl mt-2 bodyText">
              “No more than needed.
              <br />
              Just what works.”
            </h3>
          </div>

          <Image
            src={desc}
            alt="description"
            className="hidden lg:block h-[70vh] object-cover rounded-2xl w-full lg:w-1/2 mt-4 lg:mt-0"
          />
        </div>
      </div>
    </section>
  );
}

export default WhyCreated;