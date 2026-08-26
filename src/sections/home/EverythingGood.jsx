"use client";

import Image from "next/image";

import bannerBg from "@/assets/images/landingPage/everythingGoods.png";


export default function NythngBanner() {
  return (
    <section className="relative w-full h-[430px] md:h-[560px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={bannerBg}
          alt="Nythng skincare products"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Soft Overlay */}
      <div className="absolute inset-0 bg-white/20" />

      {/* Slight aqua/white overlay for the soft premium look */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-white/20" />

     {/* Center Glass Card */}
<div className="absolute z-10 left-1/2 bottom-[38px] md:bottom-[65px] -translate-x-1/2 w-[90%] max-w-[510px]">
  <div
    className="
      relative
      overflow-hidden
      rounded-[28px]
      border border-white/50
      bg-white/45
      backdrop-blur-xl
      shadow-[0_15px_50px_rgba(20,80,82,0.12)]
      px-7 py-6
      md:px-10 md:py-7
      text-center
    "
  >
    {/* Soft glass highlight */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/55 via-white/20 to-[#bde3e4]/20 pointer-events-none" />

    {/* Content */}
    <div className="relative z-10">

      {/* Heading */}
      <h2
        className="
          font-serif
          text-[25px]
          md:text-[30px]
          leading-[1.15]
          text-[#285b5d]
          font-normal
        "
      >
        one of everything really good
      </h2>

      {/* Elegant Divider */}
      <div className="flex items-center justify-center gap-2.5 my-3">
        <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#c8a96b]/70" />

        <span className="text-[#c8a96b] text-[9px]">
          ✦
        </span>

        <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#c8a96b]/70" />
      </div>

      {/* Description */}
      <p
        className="
          max-w-[440px]
          mx-auto
          text-[11px]
          md:text-[12px]
          leading-[1.7]
          text-[#4f5c5d]
          font-light
        "
      >
        At nythng, our philosophy is to make one of everything really good.
        To us, that means a collection of intentional, high-performance
        essentials you reach for everyday. The ones you love, rely on, and
        always come back to for ultimate barrier nourishment, tint, and glow.
      </p>

      {/* CTA */}
      <div className="mt-4">
        <a
          href="#shop"
          className="
            group
            inline-flex
            items-center
            justify-center
            gap-3
            rounded-full
            bg-[#28676a]/95
            hover:bg-[#20585b]
            px-5
            py-[9px]
            text-[9px]
            md:text-[10px]
            tracking-[0.13em]
            uppercase
            text-white
            shadow-[0_5px_15px_rgba(40,103,106,0.18)]
            transition-all
            duration-300
            hover:-translate-y-[1px]
          "
        >
          <span>Shop Nythng</span>

          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>

    </div>
  </div>
</div>
    </section>
  );
}