"use client";

import ReactCompareImage from "react-compare-image";

import beforeImg from "../../assets/images/about-us/beforeImg.png";
import afterImg from "../../assets/images/about-us/afterImg.png";

const BeforeAfter = () => {
  return (
    <section className="w-11/12 mx-auto py-24 rounded-[50px] overflow-hidden">
      {/* Heading */}
      <div className="text-center mb-14 px-6">
        <span className="uppercase tracking-[5px] text-[#b79235] text-sm">
          Real Results
        </span>

        <h2 className="shimmer-text text-5xl lg:text-6xl font-serif primaryText mt-4">
          Before & After
        </h2>

        <p className="bodyText mt-5 max-w-2xl mx-auto">
          Drag the slider to reveal visible transformation.
        </p>
      </div>

      {/* Slider */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="rounded-[40px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.1)]">
          <ReactCompareImage
            leftImage={beforeImg.src}
            rightImage={afterImg.src}
            sliderLineColor="#b79235"
            handleSize={50}
          />
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;