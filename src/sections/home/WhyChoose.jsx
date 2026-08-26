"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import {
  Sparkles,
  FlaskConical,
  Leaf,
  ShieldCheck,
  Users,
  Globe,
} from "lucide-react";

import backgroundImg from "@/assets/images/new_images/whychooseBg.png";
import nythngLogo from "@/assets/svg/newLogo.png";

const features = [
  {
    icon: Sparkles,
    title: "Clean & Safe",
    description: "No toxins, no nasties.\nOnly clean ingredients.",
  },
  {
    icon: FlaskConical,
    title: "Results Driven",
    description: "Visible results\nwith every use.",
  },
  {
    icon: Leaf,
    title: "Ayurveda Inspired",
    description: "Ancient wisdom.\nModern science.",
  },
  {
    icon: ShieldCheck,
    title: "Clinically Proven",
    description: "Dermatologist tested\nfor real results.",
  },
  {
    icon: Users,
    title: "Trusted by Thousands",
    description: "Loved by 4.9K+ happy\ncustomers worldwide.",
  },
  {
    icon: Globe,
    title: "Sustainable",
    description: "Kind to your skin\nand the planet.",
  },
];

export default function WhyChooseHorizontal() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % features.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const progressPercentage =
    (activeStep / (features.length - 1)) * 100;

  return (
    <section className="relative overflow-hidden py-24 px-6">
      {/* Background */}

      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src={backgroundImg}
          alt="Background"
          fill
          priority
          className="object-cover object-center opacity-20 blur-[1px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-16 max-w-2xl space-y-3 text-center"
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h2 className="shimmer-text font-serif text-3xl font-normal tracking-tight text-[#0f3d3e] md:text-5xl">
              Why Choose
            </h2>

            <Image
              src={nythngLogo}
              alt="NYTHNG"
              width={170}
              height={48}
              className="h-8 w-auto object-contain md:h-12"
            />
          </div>

          <p className="text-sm leading-relaxed text-[#457980] md:text-base">
            We combine the best of science and nature to deliver
            high-performance, gentle and effective skincare.
          </p>

          <div className="mt-4 flex items-center justify-center gap-3 text-[#70A3A1]">
            <span className="h-[1px] w-18 bg-[#70A3A1]/40"></span>

            <Leaf
              className="h-5 w-5 rotate-[-20deg]"
              strokeWidth={1.8}
            />

            <span className="h-[1px] w-18 bg-[#70A3A1]/40"></span>
          </div>
        </motion.div>

        {/* Timeline */}

        <div className="relative">
          {/* Progress Line */}

          <div className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-[28px] z-0 hidden h-[2px] overflow-hidden rounded-full bg-emerald-900/15 lg:block">
            <div
              className="h-full bg-[#0f3d3e] transition-all duration-1000 ease-in-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Cards */}

          <div className="relative z-10 grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {features.map((item, index) => {
              const Icon = item.icon;

              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.12,
                    ease: "easeOut",
                  }}
                  className="group flex flex-col items-center text-center"
                >
                  {/* Icon */}

                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#0f3d3e] transition-all duration-700 ${
                      isCurrent
                        ? "scale-110 border-2 border-[#0f3d3e] shadow-[0_0_12px_rgba(15,61,62,0.25)]"
                        : isActive
                        ? "border-2 border-[#0f3d3e]/70"
                        : "border border-emerald-800/20 opacity-70"
                    }`}
                  >
                    <Icon className="h-6 w-6 stroke-[1.5]" />
                  </div>

                  {/* Title */}

                  <h3
                    className={`mb-2 text-sm font-semibold transition-colors duration-500 ${
                      isActive
                        ? "text-[#0f3d3e]"
                        : "text-gray-500"
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}

                  <p className="whitespace-pre-line text-[13px] leading-relaxed text-[#457980]">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}