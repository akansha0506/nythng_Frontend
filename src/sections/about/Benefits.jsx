"use client";

import Image from "next/image";
import benefitImg from "../../assets/images/about-us/benefitImg1.png";

import {
  Droplets,
  Shield,
  Sparkles,
  Heart,
} from "lucide-react";

import bgImage from "@/assets/images/new_images/whychooseBg.png";
import { motion } from "framer-motion";

const benefits = [
  {
    title: "Deep Hydration",
    desc: "Keeps skin moisturized and plump all day.",
    icon: Droplets,
  },
  {
    title: "Barrier Repair",
    desc: "Strengthens and restores damaged skin.",
    icon: Shield,
  },
  {
    title: "Natural Glow",
    desc: "Boosts radiance and healthy-looking skin.",
    icon: Sparkles,
  },
  {
    title: "Daily Protection",
    desc: "Defends against environmental stressors.",
    icon: Heart,
  },
];

export default function Benefits() {
  return (
    <section
      className="relative overflow-hidden py-20"
      style={{
        backgroundImage: `url(${bgImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
     {/* Subtle overlay layer for readability */}
      <div className="absolute inset-0 bg-white/80 pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-11/12 mx-auto"
      >
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="uppercase tracking-[5px] text-[#b79235] text-sm">
            Benefits
          </span>

          <h2 className="shimmer-text text-5xl lg:text-6xl font-serif primaryText mt-4">
            More Than Skincare
          </h2>

          <p className="bodyText mt-6 text-lg">
            Every drop is carefully crafted to nourish,
            repair and elevate your skin.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-center">

          {/* Center Product */}
          <div className="lg:col-span-6 relative">

            <div
              className="absolute inset-0 m-auto w-100 h-100 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(97,185,185,0.25) 0%, transparent 70%)",
              }}
            />

            <div
              className="relative rounded-[40px] overflow-hidden p-10"
              style={{
                background:
                  "linear-gradient(135deg, rgba(163,194,209,.25), rgba(255,255,255,.5))",
              }}
            >
              <Image
                src={benefitImg}
                alt="Skincare benefits"
                width={700}
                height={700}
                priority
                className="mx-auto object-contain hover:scale-105 transition-all duration-700 rounded-[40px]"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="lg:col-span-6 grid sm:grid-cols-2 gap-5">
            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="group relative rounded-[30px] p-7 overflow-hidden bg-white border border-[#e7efef]
                    hover:-translate-y-2 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  <span className="absolute right-5 top-4 text-6xl font-bold text-[#355454]/15">
                    0{index + 1}
                  </span>

                  <div className="w-14 h-14 rounded-2xl bg-[#61b9b9]/10 flex items-center justify-center text-[#61b9b9] mb-5">
                    <Icon size={26} />
                  </div>

                  <h3 className="text-2xl font-medium primaryText mb-3">
                    {item.title}
                  </h3>

                  <p className="bodyText leading-relaxed">
                    {item.desc}
                  </p>

                  <div
                    className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#b79235] transition-all duration-500 group-hover:w-full"/>
                </div>
              );
            })}
          </div>

        </div>
      </motion.div>
    </section>
  );
}