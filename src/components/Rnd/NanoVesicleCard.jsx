"use client";

import { motion } from "framer-motion";
// import videoSrc from "@/../../public/videos/nanotech.mp4";

import { FaStar, FaGem } from "react-icons/fa";
import { BiSolidZap } from "react-icons/bi";
import { ImDroplet } from "react-icons/im";

export default function NanoVesicleCard() {
  const points = [
    {
      desc: "Superior absorption and bioavailability.",
      icon: (
        <ImDroplet className="w-8 h-8 md:w-10 md:h-10 text-[#5E8C90]" />
      ),
    },
    {
      desc: "Targeted release at the cellular level.",
      icon: (
        <FaStar className="w-8 h-8 md:w-10 md:h-10 text-[#5E8C90]" />
      ),
    },
    {
      desc: "Faster, longer-lasting results.",
      icon: (
        <BiSolidZap className="w-8 h-8 md:w-10 md:h-10 text-[#5E8C90]" />
      ),
    },
    {
      desc: "A luxurious experience backed by science.",
      icon: (
        <FaGem className="w-8 h-8 md:w-10 md:h-10 text-[#5E8C90]" />
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-11/12 max-w-7xl mx-auto mt-16 md:mt-24 relative overflow-hidden rounded-3xl shadow-xl flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16"
    >
      {/* 🔹 Background Video */}

      <video
         loop
         autoPlay
         muted
         playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
          <source
            src="/videos/nanotech.mp4"
            type="video/mp4"
          />
        </video>
      
      {/* 🔹 Dark Gradient Overlay for High Text Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-0" />

      {/* 🔹 Foreground Header Content */}
      <div className="relative z-10 w-full max-w-3xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold text-white leading-tight">
          Advanced Nano-Vesicle Technology
        </h2>

        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-200 leading-relaxed font-light">
          Our serums are powered by cutting-edge nano-vesicle delivery systems,
          designed to transport active ingredients deep into the skin with
          unmatched precision. This advanced biotechnology ensures:
        </p>
      </div>

      {/* 🔹 Cards Grid */}
      <div className="relative z-10 mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
        {points.map((point, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center justify-center text-center p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 h-full"
          >
            <div className="mb-4 flex items-center justify-center p-3 rounded-full bg-teal-50/80">
              {point.icon}
            </div>

            <h3 className="font-semibold text-base sm:text-lg text-gray-800 leading-snug">
              {point.desc}
            </h3>
          </motion.div>
        ))}
      </div>

      {/* 🔹 Footer Tagline */}
      <p className="relative z-10 mt-10 text-sm sm:text-base italic text-gray-200 font-medium text-center tracking-wide">
        "This is not just skincare, we are delivering rare innovation in every drop."
      </p>
    </motion.div>
  );
}