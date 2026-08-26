"use client";

import { motion } from "framer-motion";
import { Camera, Users, Heart, ArrowRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

import NythngCommunity1 from "@/assets/images/landingPage/NythngCommunity1.png";
import NythngCommunity2 from "@/assets/images/landingPage/NythngCommunity7.png";
import NythngCommunity3 from "@/assets/images/landingPage/NythngCommunity2.png";
import NythngCommunity4 from "@/assets/images/landingPage/NythngCommunity6.png";
import NythngCommunity5 from "@/assets/images/landingPage/NythngCommunity5.png";
import sectionBgImage from "@/assets/images/new_images/whychooseBg.png";

const NythngCommunity = () => {
  const images = [
    NythngCommunity1,
    NythngCommunity2,
    NythngCommunity3,
    NythngCommunity4,
    NythngCommunity5,
  ];

  const features = [
    {
      icon: Camera,
      title: "Share Your Journey",
      desc: "Post your skincare moments",
    },
    {
      icon: Users,
      title: "Inspire Others",
      desc: "Connect and motivate",
    },
    {
      icon: Heart,
      title: "Be Part Of Something Real",
      desc: "A community that celebrates you",
    },
  ];

  return (
    /* MAIN OUTER SECTION CONTAINER WITH FULL BACKGROUND IMAGE */
    <motion.section
      className="relative w-full h-full overflow-hidden select-none py-12 md:py-16"
      style={{
        backgroundImage: `url(${sectionBgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Subtle overlay layer for readability */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none z-0" />

      {/* INNER ALIGNED CONTENT WRAPPER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* LEFT COLUMN: Title, Description & CTA */}
          <div className="lg:col-span-4 flex flex-col justify-between items-start py-1">
            <div>
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-[#0d5965] mb-2">
                JOIN THE
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif text-[#08353d] leading-tight font-medium">
                <span className="text-[#0e8b9e] font-semibold">
                  nythng®
                </span>{" "}
                Community
              </h2>

              {/* Accent underline */}
              <div className="w-10 h-0.5 bg-[#0e8b9e] my-4 rounded-full" />

              <div className="space-y-1 text-sm md:text-base text-[#2c5258] font-normal leading-relaxed">
                <p>Real people. Real results.</p>
                <p>Share your glow and get inspired.</p>
              </div>
            </div>

            <div className="mt-8 lg:mt-auto">
              <a
                href="https://www.instagram.com/nythngcosmetics/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#0c6270] hover:bg-[#084853] text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 shadow-sm hover:shadow-md active:scale-95"
              >
                Join The Glow

                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: 5 Images Grid + Features Banner */}
          <div className="lg:col-span-8 flex flex-col justify-between gap-6">
            
            {/* Top 5 Images Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {images.map((imgSrc, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden shadow-sm bg-gray-100 group border border-black/5"
                >
                  <Image
                    src={imgSrc}
                    alt={`Community member ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>

            {/* Bottom Features Strip */}
            <div
              className="bg-white/80 backdrop-blur-md rounded-2xl p-5 border border-[#e0f1f3] shadow-sm 
              grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-3 items-center"
            >
              {features.map((item, idx) => {
                const Icon = item.icon;

                return (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 ${
                      idx !== 0
                        ? "lg:border-l lg:border-[#d2ebed] lg:pl-4"
                        : ""
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#deeff1] flex items-center justify-center shrink-0">
                      <Icon className="w-4.5 h-4.5 text-[#0d5965]" />
                    </div>

                    <div className="flex flex-col">
                      <h3 className="text-xs font-bold text-[#08353d] leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-[11px] text-[#527b82] mt-0.5 leading-tight">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </motion.section>
  );
};

export default NythngCommunity;