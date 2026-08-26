"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import {
  Star,
  Heart,
  Sparkles,
  Leaf,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import bgImage from "@/assets/images/new_images/section_bg.png";
import nythngLogo from "@/assets/svg/newLogo.png";

import testimonial3 from "@/assets/images/profile/testimonial3.png";
import testimonial4 from "@/assets/images/profile/testimonial4.png";
import testimonial1 from "@/assets/images/profile/profile.png";
import testimonial2 from "@/assets/images/profile/profileImg6.png";

const testimonials = [
  {
    id: 1,
    name: "Aarushi Mehta",
    age: 29,
    location: "Delhi",
    rating: 5,
    badgeText: "Love the glow!",
    icon: Heart,
    avatar: testimonial3,
    quote:
      "I've Tried So Many Skincare Brands, But Nythng Totally Changed My Skin. Pure, Potent, And Visible Results! It's Clean, Vegan, And Truly Works.",
  },
  {
    id: 2,
    name: "Riya Sharma",
    age: 27,
    location: "Mumbai",
    rating: 5,
    badgeText: "Total game-changer",
    icon: Sparkles,
    avatar: testimonial4,
    quote:
      "Visible Improvement In My Skin Texture Within Just 2 Weeks. The Texture Absorbs Instantly.",
  },
  {
    id: 3,
    name: "Aarti B.",
    age: 26,
    location: "Bengaluru",
    rating: 5,
    badgeText: "Clean & effective",
    icon: Leaf,
    avatar: testimonial1,
    quote:
      "Helped Reduce My Breakouts And Calmed My Skin Like Nothing Else. My Skin Barrier Feels Stronger And Deeply Hydrated.",
  },
  {
    id: 4,
    name: "Divya K.",
    age: 28,
    location: "Hyderabad",
    rating: 5,
    badgeText: "Visible results!",
    icon: Star,
    avatar: testimonial2,
    quote:
      "My Skin Feels Hydrated, Plump And So Healthy Throughout The Day. I'm Completely Obsessed!",
  },
];

export default function CustomerReviews() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setActiveIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setActiveIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const getCardAt = (offset) => {
    const index =
      (activeIndex + offset + testimonials.length) %
      testimonials.length;

    return testimonials[index];
  };

  const leftItem = getCardAt(-1);
  const centerItem = getCardAt(0);
  const rightItem = getCardAt(1);

  const LeftIcon = leftItem.icon;
  const RightIcon = rightItem.icon;

  return (
    <section className="relative w-full overflow-hidden bg-[#d8f0f3] font-sans text-[#07363e] select-none">
      <style>{`
        @keyframes waveFloat1 {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-18px);
          }
        }

        @keyframes waveFloat2 {
          0%, 100% {
            transform: translateY(0) scaleX(1);
          }
          50% {
            transform: translateY(-12px) scaleX(1.04);
          }
        }

        @keyframes activeFloat {
          0%, 100% {
            transform: translateY(-8px) scale(1.03);
          }
          50% {
            transform: translateY(-14px) scale(1.05);
          }
        }

        .review-wave-1 {
          animation: waveFloat1 8s ease-in-out infinite;
        }

        .review-wave-2 {
          animation: waveFloat2 10s ease-in-out infinite reverse;
        }

        .active-review-card {
          animation: activeFloat 5s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .review-wave-1,
          .review-wave-2,
          .active-review-card {
            animation: none !important;
          }
        }
      `}</style>

      {/* ================= BACKGROUND ================= */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src={bgImage}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />

        {/* Center Glow */}
        <div
          className="
            absolute left-1/2 top-1/2
            h-[350px] w-[500px]
            -translate-x-1/2 -translate-y-1/2
            rounded-full
            bg-gradient-to-r
            from-white/60
            via-[#bce6ed]/50
            to-white/40
            blur-3xl
            sm:h-[450px] sm:w-[700px]
            lg:h-[600px] lg:w-[900px]
          "
        />

        {/* Wavy Lines */}
        <svg
          className="
            absolute bottom-0 left-0
            h-[180px] w-[140%]
            -translate-x-[10%]
            opacity-30 text-[#0f6875]
            sm:h-[240px]
            lg:h-auto lg:w-full lg:translate-x-0
          "
          viewBox="0 0 1440 320"
          fill="none"
          stroke="currentColor"
          preserveAspectRatio="none"
        >
          <path
            className="review-wave-1"
            strokeWidth="1.5"
            d="M0,192 C320,300 420,100 720,200 C1020,300 1120,100 1440,192"
          />

          <path
            className="review-wave-2"
            strokeWidth="1"
            d="M0,220 C360,120 480,280 800,160 C1120,280 1200,120 1440,220"
          />
        </svg>

        {/* Bubbles */}
        <div className="absolute left-[5%] top-[14%] hidden h-16 w-16 rounded-full border border-white/60 bg-white/40 shadow-inner backdrop-blur-md sm:block" />

        <div className="absolute left-[3%] top-[30%] hidden h-8 w-8 rounded-full border border-white/50 bg-white/30 backdrop-blur-sm sm:block" />

        <div className="absolute right-[6%] top-[16%] hidden h-14 w-14 rounded-full border border-white/60 bg-white/40 shadow-inner backdrop-blur-md sm:block" />

        <div className="absolute right-[10%] top-[32%] hidden h-6 w-6 rounded-full border border-white/50 bg-white/30 backdrop-blur-sm sm:block" />
      </div>

      {/* ================= CONTENT ================= */}

      <div
        className="
          relative z-10 mx-auto flex w-full max-w-[1440px]
          flex-col items-center
          px-3 py-12
          sm:px-6 sm:py-14
          md:px-10 md:py-16
          lg:px-12 lg:py-20
        "
      >
        {/* ================= HEADER ================= */}

        <div className="mb-7 px-2 text-center sm:mb-10 md:mb-12">
          <p
            className="
              mb-2 text-[10px] font-bold uppercase
              tracking-[0.16em] text-[#0c6270]
              sm:text-xs sm:tracking-[0.2em]
            "
          >
            REAL PEOPLE. REAL RESULTS.
          </p>

          <h1
            className="
              font-serif leading-[1.1] tracking-tight text-[#08353d]
              text-[30px]
              sm:text-[38px]
              md:text-[48px]
              lg:text-[54px]
            "
          >
            Over 10K Customers
            <br />

            <span className="mt-2 flex items-center justify-center gap-2 sm:gap-3">
              Trusted

              <Image
                src={nythngLogo}
                alt="Nythng"
                width={160}
                height={50}
                className="
                  h-auto w-[100px]
                  sm:w-[125px]
                  md:w-[145px]
                  lg:w-[160px]
                "
              />
            </span>
          </h1>
        </div>

        {/* ================= CAROUSEL ================= */}

        <div
          className="
            relative flex w-full max-w-[1280px]
            items-center justify-center
            gap-2
            sm:gap-3
            md:gap-4
            lg:gap-6
          "
        >
          {/* LEFT ARROW */}

          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="
              relative z-30
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-full border border-white
              bg-white/80 text-[#0c6270]
              shadow-md backdrop-blur-md
              transition-all
              active:scale-95
              sm:h-10 sm:w-10
              md:h-12 md:w-12
              hover:scale-105 hover:bg-white
            "
          >
            <ChevronLeft className="h-5 w-5 stroke-[2.5] sm:h-6 sm:w-6" />
          </button>

          {/* ================= CARDS AREA ================= */}

          <div
            className="
              relative flex min-w-0 flex-1
              items-center justify-center
              gap-3
              py-4
              sm:gap-4 sm:py-6
              md:gap-5 md:py-8
              lg:gap-6
            "
          >
            {/* LEFT CARD */}
            <div
              onClick={prevSlide}
              className="
                hidden cursor-pointer
                lg:flex lg:w-[190px] xl:w-[230px]
                flex-col items-center justify-between
                lg:h-[300px] xl:h-[340px]
                rounded-[28px] xl:rounded-[32px]
                border border-white/70
                bg-white/40
                p-4 xl:p-5
                shadow-[0_20px_40px_rgba(13,82,93,0.08)]
                backdrop-blur-xl
                -rotate-3
                transition-all duration-500
                hover:rotate-0 hover:scale-105
              "
            >
              <div className="h-14 w-14 overflow-hidden rounded-full bg-white/80 p-1 shadow-inner xl:h-20 xl:w-20">
                <Image
                  src={leftItem.avatar}
                  alt={leftItem.name}
                  width={80}
                  height={80}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <div className="my-2 px-1 text-center">
                <p className="line-clamp-3 text-[10px] leading-snug text-[#07363e]/80 italic xl:text-xs">
                  "{leftItem.quote}"
                </p>

                <span className="mt-2 block text-[10px] font-semibold text-[#0c6270] xl:text-[11px]">
                  — {leftItem.name}
                </span>
              </div>

              <div className="rounded-full border border-white bg-white/50 p-2 shadow-sm">
                <LeftIcon className="h-4 w-4 fill-current text-[#00a3be]" />
              </div>
            </div>

            {/* ================= CENTER CARD ================= */}

            <div
              className="
                active-review-card
                relative z-20
                flex
                w-full max-w-[260px]
                flex-col items-center justify-between
                overflow-hidden
                rounded-[28px]
                border border-white/70
                bg-white/55
                p-6
                shadow-[0_25px_60px_rgba(13,82,93,0.16)]
                backdrop-blur-2xl

                sm:max-w-[360px]
                sm:rounded-[32px]
                sm:p-8

                md:max-w-[420px]
                md:min-h-[390px]
                md:p-10

                lg:w-[390px]
                lg:max-w-none
                lg:min-h-[400px]

                xl:w-[440px]
                xl:min-h-[410px]
              "
            >
              {/* Glow */}
              <div
                className="
                  absolute left-1/2 top-0
                  h-48 w-48
                  -translate-x-1/2 -translate-y-1/3
                  rounded-full
                  bg-[#00a3be]/10
                  blur-3xl
                "
              />

              {/* Glass Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-white/5 to-transparent" />

              {/* Inner Border */}
              <div
                className="
                  pointer-events-none absolute inset-2
                  rounded-[22px] border border-white/40
                  sm:rounded-[28px]
                "
              />

              {/* Quote */}
              <span
                className="
                  absolute left-5 top-4
                  select-none
                  font-serif font-bold leading-none
                  text-5xl text-[#82dbe8]/70
                  sm:left-6 sm:top-5 sm:text-6xl
                "
              >
                “
              </span>

              {/* Avatar */}
              <div className="relative z-10 mt-2">
                <div className="absolute inset-0 scale-125 rounded-full bg-[#00a3be]/20 blur-xl animate-pulse" />

                <div
                  className="
                    relative
                    h-16 w-16
                    rounded-full
                    bg-gradient-to-br from-white via-[#d8f5fa] to-[#8edce8]
                    p-[3px]
                    shadow-xl

                    sm:h-20 sm:w-20
                    md:h-[104px] md:w-[104px]
                  "
                >
                  <div className="h-full w-full overflow-hidden rounded-full bg-white">
                    <Image
                      src={centerItem.avatar}
                      alt={centerItem.name}
                      width={104}
                      height={104}
                      className="h-full w-full rounded-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </div>
              </div>

              {/* Stars */}
              <div className="z-10 mt-4 flex gap-1 text-[#3A8B88]">
                {[...Array(centerItem.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-current sm:h-5 sm:w-5"
                  />
                ))}
              </div>

              {/* Review */}
              <p
                className="
                  z-10 my-4 max-w-[95%]
                  text-center text-[12px]
                  font-medium leading-6 text-[#07363e]

                  sm:text-sm sm:leading-7
                  md:text-[15px]
                "
              >
                "{centerItem.quote}"
              </p>

              {/* User */}
              <div className="z-10 text-center">
                <h4 className="text-[15px] font-semibold text-[#08353d] sm:text-[16px]">
                  {centerItem.name}
                </h4>

                <p className="mt-1 text-[10px] tracking-wide text-[#0c6270]/80 sm:text-xs">
                  {centerItem.age} Years • {centerItem.location}
                </p>
              </div>
            </div>

            {/* RIGHT CARD */}
            <div
              onClick={nextSlide}
              className="
                hidden cursor-pointer
                lg:flex lg:w-[190px] xl:w-[230px]
                flex-col items-center justify-between
                lg:h-[300px] xl:h-[340px]
                rounded-[28px] xl:rounded-[32px]
                border border-white/70
                bg-white/40
                p-4 xl:p-5
                shadow-[0_20px_40px_rgba(13,82,93,0.08)]
                backdrop-blur-xl
                rotate-3
                transition-all duration-500
                hover:rotate-0 hover:scale-105
              "
            >
              <div className="h-14 w-14 overflow-hidden rounded-full bg-white/80 p-1 shadow-inner xl:h-20 xl:w-20">
                <Image
                  src={rightItem.avatar}
                  alt={rightItem.name}
                  width={80}
                  height={80}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <div className="my-2 px-1 text-center">
                <p className="line-clamp-3 text-[10px] leading-snug text-[#07363e]/80 italic xl:text-xs">
                  "{rightItem.quote}"
                </p>

                <span className="mt-2 block text-[10px] font-semibold text-[#0c6270] xl:text-[11px]">
                  — {rightItem.name}
                </span>
              </div>

              <div className="rounded-full border border-white bg-white/50 p-2 shadow-sm">
                <RightIcon className="h-4 w-4 text-[#00a3be]" />
              </div>
            </div>
          </div>

          {/* RIGHT ARROW */}

          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next Slide"
            className="
              relative z-30
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-full border border-white
              bg-white/80 text-[#0c6270]
              shadow-md backdrop-blur-md
              transition-all
              active:scale-95
              sm:h-10 sm:w-10
              md:h-12 md:w-12
              hover:scale-105 hover:bg-white
            "
          >
            <ChevronRight className="h-5 w-5 stroke-[2.5] sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* ================= PAGINATION ================= */}

        <div className="mt-5 flex items-center gap-2 sm:mt-7">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`cursor-pointer rounded-full transition-all duration-300 ${
                idx === activeIndex
                  ? "h-2.5 w-2.5 scale-125 bg-[#00a3be]"
                  : "h-2 w-2 bg-[#0c6270]/25 hover:bg-[#0c6270]/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}