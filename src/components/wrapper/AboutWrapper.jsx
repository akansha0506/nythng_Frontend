"use client";

import React from "react";
import Image from "next/image";
import WhyCreated from "@/sections/about/WhyCreated";
import AiBanner from "@/components/layout/AiBanner";
import mobileBg from "@/assets/images/about-us/mobile_banner.png";
import PurposeMissionSection from "@/sections/about/PurposeMission";
import SecretFormula from "@/sections/about/SecretFormula";
import Benefits from "@/sections/about/Benefits";
import BeforeAfter from "@/sections/about/BeforeAfter";
import ShopSlide from "@/sections/about/ShopSlide";
import MadeForEveryone from "../common/MadeForEveryone";
import aboutBg from "@/assets/images/about-us/about_banner1.png";

const AboutWrapper = () => {
  return (
    <main>
      {/* ================= Hero Section ================= */}
      <section className="relative w-full h-screen overflow-hidden">
        
        {/* Desktop Video */}
        {/* <video
          className="absolute inset-0 w-full h-full object-cover hidden md:block"
          src="/videos/aboutVideo.mp4"
          autoPlay
          muted
          loop
          playsInline
        /> */}
        <div className="absolute inset-0 hidden md:block">
            <Image
              src={aboutBg}
              alt="About NYTHNG"
              fill
              priority
              className="object-cover"
            />
          </div>

        {/* Mobile Background */}
        <div className="absolute inset-0 block md:hidden">
          <Image
            src={mobileBg}
            alt="About"
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Optional Gradient Overlay */}
        <div className="absolute inset-0 hero-gradient z-[1]" />

        {/* Content */}
        {/* <div className="relative z-10 h-screen flex items-end px-5 md:px-16 pb-16 md:pb-20">
          <h1 className="text-3xl sm:text-4xl xl:text-5xl font-regular text-white">
            Less Complexity.
            <br />

            <span className="block mt-3 md:mt-5">
              More Power.
            </span>
          </h1>
        </div> */}
      </section>

      
      <WhyCreated />
      <PurposeMissionSection />
      <SecretFormula />
      <Benefits />
      <BeforeAfter />
      <ShopSlide />
      <MadeForEveryone />
      <AiBanner />
    </main>
  );
};

export default AboutWrapper;