import bg from "@/assets/images/researchLab/researchBG.png";
import HeroActives from "@/sections/research-lab/HeroActives";
import AiBanner from "@/components/layout/AiBanner";
import Research from "@/sections/research-lab/Research";
import ChooseUs from "@/sections/research-lab/ChooseUs";

import star from "@/assets/svg/Vector.svg";
import NanoVesicleCard from "@/components/Rnd/NanoVesicleCard";

function ResearchWrapper() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      
      <section
        className="relative grid items-center w-full h-[100vh] grid-cols-1 lg:grid-cols-2 header reverse"
        style={{
          background: `url(${bg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "30% center",
          height:"100vh"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 z-0 bg-black/10"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-start px-8 sm:px-12 text-white w-full">
          <h1 className="text-3xl md:text-5xl font-regular leading-tight">
            You've Entered
            <br /> The Future Of Skincare.
          </h1>

          <p className="mt-4 mb-8 font-light w-[90%]">
            At Nythng, science is not an afterthought—it is the soul of
            everything we create. Our commitment to skin intelligence,
            precision, and timeless care drives a research-first approach that
            redefines skincare.
          </p>
        </div>
      </section>

      {/* </main> */}
      <Research />
      <ChooseUs />
      {/* <HeroActives /> */}
      <NanoVesicleCard />
      <AiBanner />
    </main>
  );
}

export default ResearchWrapper;