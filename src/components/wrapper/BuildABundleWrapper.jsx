"use client";

import React, { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import BrandCombos from "@/components/bundle/BrandCombos";
import CustomBundleBuilder from "@/components/bundle/CustomBundleBuilder";

const BuildYourBundle = () => {
  const [showCustomBuilder, setShowCustomBuilder] =
    useState(false);

  const handleOpenBuilder = () => {
    setShowCustomBuilder(true);

    // Wait for CustomBundleBuilder to render
    setTimeout(() => {
      const builder =
        document.getElementById(
          "custom-bundle-builder"
        );

      if (builder) {
        builder.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f7f3] text-[#1c1c1c]">

      {/* =========================================
          PAGE HERO
      ========================================= */}

      <section className="relative overflow-hidden border-b border-black/10">

        {/* Background Glow */}
        <div
          className="
            pointer-events-none
            absolute
            -left-20
            top-10
            h-72
            w-72
            rounded-full
            bg-[#dbe9e4]
            blur-[100px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-0
            top-0
            h-80
            w-80
            rounded-full
            bg-[#eadfd7]
            blur-[120px]
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-7xl
            px-5
            py-12
            sm:px-6
            md:px-8
            md:py-24
            lg:py-28
          "
        >

          <div
            className="
              mx-auto
              max-w-3xl
              text-center
            "
          >

            {/* Label */}
            <div
              className="
                mb-5
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-black/10
                bg-white/60
                px-4
                py-2
                text-[10px]
                font-medium
                uppercase
                tracking-[0.2em]
                backdrop-blur-xl
                sm:text-xs
              "
            >
              <Sparkles size={14} />

              <span>
                Made better together
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                text-4xl
                font-medium
                leading-[1.1]
                tracking-[-0.04em]
                text-[#355454]
                sm:text-5xl
                md:text-7xl
              "
            >
              Find your perfect

              <span
                className="
                  shimmer-text
                  mt-2
                  block
                  text-3xl
                  italic
                  text-[#355454]
                  sm:text-4xl
                  md:text-6xl
                  xl:text-7xl
                "
              >
                skincare combination.
              </span>
            </h1>

          </div>
        </div>
      </section>


      {/* =========================================
          BRAND COMBOS
      ========================================= */}

      <BrandCombos />


      {/* =========================================
          BUILD YOUR OWN CTA
      ========================================= */}

      <section
        className="
          px-5
          py-12
          sm:px-6
          md:px-8
          md:py-24
          lg:py-28
        "
      >

        <div className="mx-auto max-w-6xl">

          <div
            className="
              relative
              overflow-hidden
              rounded-[24px]
              bg-gradient-to-br
              from-[#2f4b4b]
              via-[#355454]
              to-[#294242]
              px-5
              py-10
              text-center
              sm:px-8
              sm:py-14
              md:rounded-[40px]
              md:px-16
              md:py-24
            "
          >

            {/* =================================
                BACKGROUND GLOW
            ================================= */}

            <div
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                h-[250px]
                w-[250px]
                -translate-x-1/2
                rounded-full
                bg-white/5
                blur-[100px]
                md:h-[420px]
                md:w-[420px]
                md:blur-[140px]
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-24
                -left-24
                hidden
                h-72
                w-72
                rounded-full
                bg-[#9bc5c2]/10
                blur-[120px]
                md:block
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -right-24
                top-0
                hidden
                h-72
                w-72
                rounded-full
                bg-[#9bc5c2]/10
                blur-[120px]
                md:block
              "
            />


            {/* =================================
                DECORATIVE GRID
            ================================= */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                opacity-[0.04]
              "
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(255,255,255,.5) 1px,
                    transparent 1px
                  ),
                  linear-gradient(
                    90deg,
                    rgba(255,255,255,.5) 1px,
                    transparent 1px
                  )
                `,
                backgroundSize: "50px 50px",
              }}
            />


            {/* =================================
                CONTENT
            ================================= */}

            <div className="relative z-10">

              {/* Small Label */}

              <span
                className="
                  inline-flex
                  rounded-full
                  border
                  border-white/15
                  bg-white/5
                  px-4
                  py-2
                  text-[10px]
                  font-medium
                  uppercase
                  tracking-[0.3em]
                  text-white/60
                  backdrop-blur
                  sm:px-5
                  sm:text-xs
                  sm:tracking-[0.35em]
                "
              >
                Custom Bundle
              </span>


              {/* Heading */}

              <h2
                className="
                  mx-auto
                  mt-7
                  max-w-4xl
                  text-3xl
                  font-light
                  leading-[1.15]
                  text-white
                  sm:text-4xl
                  md:mt-8
                  md:text-6xl
                "
              >
                Build Your Perfect

                <span className="block font-semibold">
                  Skincare Routine
                </span>
              </h2>


              {/* =================================
                  CTA BUTTON
              ================================= */}

              <div
                className="
                  relative
                  mt-10
                  flex
                  justify-center
                  sm:mt-12
                  md:mt-14
                "
              >

                {/* Button Glow */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    left-1/2
                    top-1/2
                    h-28
                    w-56
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-white/20
                    blur-[60px]
                    animate-pulse
                    sm:h-36
                    sm:w-72
                    sm:blur-[70px]
                  "
                />


                <button
                  type="button"
                  onClick={handleOpenBuilder}
                  className="
                    group
                    relative
                    flex
                    h-14
                    w-full
                    max-w-[340px]
                    cursor-pointer
                    items-center
                    justify-center
                    gap-3
                    overflow-hidden
                    rounded-full
                    bg-white
                    px-6
                    text-base
                    font-semibold
                    text-[#355454]
                    shadow-[0_20px_60px_rgba(255,255,255,0.18)]
                    transition-all
                    duration-500
                    hover:scale-[1.03]
                    hover:shadow-[0_25px_80px_rgba(255,255,255,0.35)]
                    active:scale-[0.98]
                    sm:h-16
                    sm:text-lg
                  "
                >

                  {/* Shine */}

                  <span
                    className="
                      absolute
                      inset-0
                      overflow-hidden
                      rounded-full
                    "
                  >
                    <span
                      className="
                        absolute
                        -left-24
                        top-0
                        h-full
                        w-20
                        -skew-x-12
                        bg-white/40
                        blur-md
                        transition-all
                        duration-1000
                        group-hover:left-[120%]
                      "
                    />
                  </span>


                  {/* Button Content */}

                  <span
                    className="
                      relative
                      z-10
                      flex
                      items-center
                      gap-3
                    "
                  >
                    Build Your Bundle

                    <ArrowRight
                      size={18}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1.5
                      "
                    />
                  </span>

                </button>

              </div>


              {/* =================================
                  FEATURES
              ================================= */}

              <div
                className="
                  mt-10
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-3
                  sm:mt-14
                  sm:flex-row
                  sm:flex-wrap
                  sm:gap-4
                "
              >

                <div
                  className="
                    w-full
                    max-w-xs
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-2.5
                    text-xs
                    text-white/75
                    backdrop-blur
                    sm:w-auto
                    sm:max-w-none
                    sm:px-5
                    sm:py-3
                    sm:text-sm
                  "
                >
                  ✓ Choose Your Products
                </div>

                <div
                  className="
                    w-full
                    max-w-xs
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-2.5
                    text-xs
                    text-white/75
                    backdrop-blur
                    sm:w-auto
                    sm:max-w-none
                    sm:px-5
                    sm:py-3
                    sm:text-sm
                  "
                >
                  ✓ Mix Collections
                </div>

                <div
                  className="
                    w-full
                    max-w-xs
                    rounded-full
                    border
                    border-white/10
                    bg-white/5
                    px-4
                    py-2.5
                    text-xs
                    text-white/75
                    backdrop-blur
                    sm:w-auto
                    sm:max-w-none
                    sm:px-5
                    sm:py-3
                    sm:text-sm
                  "
                >
                  ✓ Personalized Routine
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>


      {/* =========================================
          CUSTOM BUNDLE BUILDER
      ========================================= */}

      {showCustomBuilder && (
        <div
          id="custom-bundle-builder"
          className="scroll-mt-24"
        >
          <CustomBundleBuilder />
        </div>
      )}

    </main>
  );
};

export default BuildYourBundle;