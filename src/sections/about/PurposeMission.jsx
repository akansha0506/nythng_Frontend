"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import image from "../../assets/images/about-us/aboutGirl1.png";
import image1 from "../../assets/images/about-us/bottlenew.png";
import backgroundImg from "../../assets/images/new_images/whychooseBg.png";

export default function PurposeMissionSection() {
  return (
    <section className="relative overflow-hidden py-20">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImg.src})`,
        }}
      />

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-white/80" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-11/12 max-w-screen-xl mx-auto"
      >
        <div className="grid lg:grid-cols-12 gap-8 items-center">

          {/* Large Image */}
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-4xl shadow-xl group">
              <Image
                src={image}
                alt="About"
                width={800}
                height={650}
                className="w-full h-[650px] object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          </div>

          {/* Purpose & Mission */}
          <div className="lg:col-span-4 flex flex-col gap-8">

            {/* Purpose */}
            <div className="bg-white/70 backdrop-blur-md p-8 rounded-4xl shadow-lg">
              <span className="uppercase tracking-[4px] text-sm text-gray-500">
                Purpose
              </span>

              <h2 className="text-4xl font-serif mt-3 primaryText">
                Our Purpose
              </h2>

              <p className="mt-4 text-medium leading-relaxed bodyText">
               To redefine the skincare industry by replacing hype and misinformation with truth, quality, 
               and self-worth — making beauty a path to personal growth, not just appearance. Nythng helps you achieve 
               your best version.

              </p>
            </div>

            {/* Mission */}
            <div className="bg-white/70 backdrop-blur-md p-8 rounded-4xl shadow-lg">
              <span className="uppercase tracking-[4px] text-sm text-gray-500">
                Mission
              </span>

              <h2 className="text-4xl font-serif mt-3 primaryText">
                Our Mission
              </h2>

              <p className="mt-4 text-medium leading-relaxed bodyText">
                We aim to create a world where skincare is no longer confusing, costly, or superficial — but an honest, 
                empowering daily ritual for every ambitious individual rising toward their best self.
              </p>
            </div>

          </div>

          {/* Product Image */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-b from-[#f7f5f0] to-[#dde9ec] rounded-4xl p-8 shadow-xl overflow-hidden group">
              <Image
                src={image1}
                alt="Product"
                width={500}
                height={500}
                className="w-full h-[500px] object-contain transition-transform duration-700 ease-out group-hover:scale-110"
              />
            </div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}