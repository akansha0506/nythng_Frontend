"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import SecondaryButton from "@/components/ui/SecondaryButton";

import SkinInsightQuiz from "@/sections/skin-insights/SkinInsightQuiz";

import bg from "@/assets/images/skinInsights/skinInsight_banner2.png";
import aiImg from "@/assets/images/skinInsights/bg1.png";

export default function SkinInsightsWrapper() {
  const language = useSelector(
    (state) => state.language.value
  );

  const scrollToQuiz = () => {
    const quizSection = document.getElementById(
      "skin-quiz-section"
    );

    if (quizSection) {
      quizSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="w-full">

      <div className="relative h-[100vh] w-full overflow-hidden bg-[#A08E83]">

        {/* Background Image */}
        {/* <Image
          src={bg}
          alt="Skin analysis"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        /> */}
        <video
          src="/videos/skin-analysis.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#74b8c2]/40 via-[#A08E83]/20 to-transparent" />

        {/* Hero Content */}
        <div className="relative z-10 flex h-full w-full items-center">

          <div className="w-full px-8 md:w-[50%] md:px-12 lg:w-[45%] lg:px-16">

            {/* Label */}
            <p className="bodyText mb-3 inline-block rounded-full bg-white/70 px-4 py-1">
              # Skin analysis
            </p>

            {/* Heading */}
            <h1
              className={
                language === "en"
                  ? "text-3xl text-[#1a4747] md:text-6xl"
                  : "text-2xl leading-tight text-[#1a4747] md:text-3xl"
              }
            >
              Know Your Skin
            </h1>

            <h1
              className={
                language === "en"
                  ? "text-3xl italic text-[#2a7879] md:text-5xl"
                  : "text-2xl leading-tight text-[#2a7879] md:text-3xl"
              }
            >
              Glow With Confidence
            </h1>

            {/* Description */}
            <p className="bodyText mb-8 mt-4 w-[95%] font-medium">
              Discover what your skin needs with a personalized
              analysis of hydration, texture, tone, pores, and
              key concerns, helping you build a routine that
              feels right for you.
            </p>

            {/* Try Now */}
            <SecondaryButton
              text="Try Now"
              onClick={scrollToQuiz}
            />

          </div>
        </div>
      </div>


      {/* =====================================================
          PERSONALIZED SKINCARE
      ====================================================== */}

      <main
        className="
          mx-auto
          mt-6
          flex
          h-[75vh]
          w-11/12
          flex-col
          justify-end
          bg-cover
          bg-left
          bg-no-repeat
          md:mt-30
          md:flex-row
          md:items-end
          md:rounded-2xl
        "
        style={{
          backgroundImage: `url(${aiImg.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >

        {/* Left Image Area */}
        <div className="w-1/2" />

        {/* Right Content */}
        <div
          className="
            flex
            h-full
            w-full
            items-center
            justify-center
            bg-gradient-to-b
            from-[#fffaf6]
            to-[#f5ebe0]
            px-6
            py-12
            md:w-1/2
            md:rounded-br-2xl
            md:rounded-tr-2xl
          "
        >

          <motion.div
            className="max-w-3xl text-center"
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
          >

            {/* Heading */}
            <h2 className="text-3xl font-bold leading-tight text-[#355454] md:text-4xl">
              Discover Your Personalized Skincare Suggestions
            </h2>

            {/* Description */}
            <p className="mt-4 px-10 text-md text-[#202323]">
              Answer a few quick questions and get a tailored
              recommendation based on your skin type, concerns,
              lifestyle, and goals.
            </p>

            {/* Start Analysis */}
            <div className="mt-8 flex justify-center">

              <SecondaryButton
                text="Start My Skin Analysis"
                onClick={scrollToQuiz}
              />

            </div>

            {/* Small Text */}
            <div className="mt-6 text-sm text-zinc-500">
              Takes less than 60 seconds. No login required.
            </div>

          </motion.div>
        </div>
      </main>

      {/* skin quiz */}
      <section
        id="skin-quiz-section"
        className="w-full scroll-mt-20"
      >
        <SkinInsightQuiz />
      </section>

    </section>
  );
}