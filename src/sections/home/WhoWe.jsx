"use client";

import {
  FlaskConical,
  Leaf,
  ShieldCheck,
  Heart,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

import scienceBackedImg from "@/assets/images/new_images/science-baked.png";
import cleanConsciousImg from "@/assets/images/new_images/clean-conscious.png";
import safeEffectiveImg from "@/assets/images/new_images/safe-effective.png";
import madeForYouImg from "@/assets/images/new_images/made-for-you.png";

import nythngLogo from "@/assets/svg/newLogo.png";

const features = [
  {
    title: "Science-Backed",
    description: (
      <>
        Formulas developed
        <br />
        through clinical
        <br />
        research.
      </>
    ),
    icon: FlaskConical,
    image: scienceBackedImg,
    className: "bg-[#eef5f6]",
  },
  {
    title: "Clean & Conscious",
    description: (
      <>
        No harmful
        <br />
        ingredients,
        <br />
        no compromises.
      </>
    ),
    icon: Leaf,
    image: cleanConsciousImg,
    className: "bg-[#f7f4ee]",
  },
  {
    title: "Safe & Effective",
    description: (
      <>
        Dermatologically
        <br />
        tested for all
        <br />
        skin types.
      </>
    ),
    icon: ShieldCheck,
    image: safeEffectiveImg,
    className: "bg-[#edf6f8]",
  },
  {
    title: "Made For You",
    description: (
      <>
        Real people.
        <br />
        Real skin.
        <br />
        Real results.
      </>
    ),
    icon: Heart,
    image: madeForYouImg,
    className: "bg-[#faf0ed]",
  },
];

export default function WhoWe() {
  return (
    <section className="w-full bg-white px-4 py-10 sm:px-6 md:py-14 lg:px-8 xl:py-16">
      <div className="mx-auto w-full max-w-7xl">
        {/* MAIN LAYOUT */}
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[4%]">
          {/* ================= LEFT CONTENT ================= */}
          <div className="w-full pt-1 lg:w-[36%] lg:shrink-0">
            {/* Small Heading */}
            <div className="mb-6 flex items-center gap-4 sm:mb-7 sm:gap-5">
              <span className="font-sans text-[13px] font-semibold tracking-[2.5px] text-[#187a83] sm:text-[15px] md:text-[16px] md:tracking-[3px]">
                WHO WE ARE
              </span>

              <div className="relative h-[1px] w-[50px] bg-[#5ba4aa] sm:w-[65px]">
                <Sparkles
                  size={18}
                  strokeWidth={1.5}
                  className="absolute -right-[2px] -top-[8px] fill-[#187a83] text-[#187a83]"
                />
              </div>
            </div>

            {/* MAIN HEADING */}
            <h2 className="font-serif text-[34px] leading-[1.08] tracking-[-1px] text-[#102b3b] xl:text-[42px]">
              We’re{" "}
              <span className="inline-flex translate-y-[4px] items-center sm:translate-y-[5px]">
                <Image
                  src={nythngLogo}
                  alt="Nythng"
                  width={140}
                  height={50}
                  className="h-auto w-[110px] object-contain sm:w-[125px] lg:w-[115px] xl:w-[125px]"
                />
              </span>
              ,
              <br />
              Science. Real. Results
            </h2>

            {/* Divider */}
            <div className="relative my-6 h-[1px] w-[75px] bg-[#5ba4aa] sm:my-7 sm:w-[90px]">
              <Sparkles
                size={17}
                strokeWidth={1.5}
                className="absolute -right-[2px] -top-[8px] fill-[#187a83] text-[#187a83]"
              />
            </div>

            {/* Paragraphs */}
            <div className="max-w-[600px] space-y-4 font-sans text-[14px] leading-[1.65] text-[#1d3443] sm:text-[15px] sm:leading-[1.7]">
              <p>
                At Nythng, we believe skincare is more than a routine—
                <br className="hidden xl:block" />
                it’s a commitment to yourself.
              </p>

              <p>
                Born from science and driven by purpose, we create
                high-performance formulations that deliver visible,
                real results—without the unnecessary.
              </p>

              <p>
                Every product is thoughtfully crafted with clinically
                researched ingredients, backed by experts, and made
                for real skin and real life.
              </p>
            </div>
          </div>

          {/* ================= RIGHT CARDS ================= */}
          <div className="grid w-full flex-1 grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-[14px]">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className={`relative flex h-[390px] flex-col overflow-hidden rounded-[14px] sm:h-[440px] sm:rounded-[16px] md:h-[480px] lg:h-[500px] lg:rounded-[17px] ${item.className}`}
                >
                  {/* CARD TOP CONTENT */}
                  <div className="relative z-10 flex flex-col items-center px-3 pt-5 text-center sm:px-4 sm:pt-6">
                    {/* Icon Circle */}
                    <div className="flex h-[65px] w-[65px] items-center justify-center rounded-full border border-[#9aa9ae] sm:h-[75px] sm:w-[75px] lg:h-[82px] lg:w-[82px]">
                      <Icon
                        size={30}
                        strokeWidth={1.5}
                        className="text-[#122c3c] sm:hidden"
                      />

                      <Icon
                        size={34}
                        strokeWidth={1.5}
                        className="hidden text-[#122c3c] sm:block lg:hidden"
                      />

                      <Icon
                        size={38}
                        strokeWidth={1.5}
                        className="hidden text-[#122c3c] lg:block"
                      />
                    </div>

                    {/* Title */}
                    <h3 className="mt-3 min-h-[42px] font-serif text-[17px] font-semibold leading-[1.15] text-[#102b3b] sm:mt-[14px] sm:min-h-[48px] sm:text-[19px] lg:min-h-[52px] lg:text-[21px]">
                      {item.title}
                    </h3>

                    {/* Teal Line */}
                    <div className="my-2.5 h-[2px] w-[28px] bg-[#16818a] sm:my-3 sm:w-[35px]" />

                    {/* Description */}
                    <p className="font-sans text-[12px] leading-[1.5] text-[#1c3443] sm:text-[13px] lg:text-[14px] lg:leading-[1.55]">
                      {item.description}
                    </p>
                  </div>

                  {/* BOTTOM IMAGE */}
                  <div className="absolute inset-x-0 bottom-0 h-[32%] sm:h-[33%] lg:h-[34%]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}