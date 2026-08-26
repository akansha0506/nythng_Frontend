"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

import HeadingHighlight from "@/components/ui/HeadingHighlight";

// import vedio from "@/assets/videos/drop2.mp4";
import bgImage from "../../assets/images/new_images/section_bg.png";

function SecretFormula() {
  const features = [
    {
      title: "Proven, Not Promised",
      description:
        "Every formula is rooted in science and evidence, never in exaggerated claims or empty trends.",
    },
    {
      title: "Problem Solving Approach",
      description:
        "All your skin problems fear Nythng, because we follow a clear, problem-centric approach.",
    },
    {
      title: "Minimal & Intelligent Skincare",
      description:
        "No overcomplication. Just science-led serums designed to give your skin exactly what it needs—and nothing it doesn’t.",
    },
    {
      title: "Transparency You Can See",
      description:
        "We show you the science and proof behind every formula, nothing to hide.",
    },
  ];

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
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-11/12 max-w-screen-xl mx-auto"
      >
        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] text-[#61b9b9] font-medium mb-4">
            Why Nythng
          </p>

          <HeadingHighlight
            text="The Secret’s in the Formula"
            highlight="Formula"
            className="md:text-center text-center"
          />
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px_1fr] gap-8 lg:gap-12 items-center">

          {/* Left Features */}
          <div className="space-y-6">
            {features.slice(0, 2).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="group relative rounded-2xl border border-[#61b9b9]/15 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(53,84,84,0.08)]"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#eaf7f7] flex items-center justify-center text-[#61b9b9]">
                    <Check size={18} strokeWidth={2} />
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-normal mb-2 primaryText">
                      {item.title}
                    </h3>

                    <p className="text-base md:text-lg bodyText leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Video */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto w-full max-w-[400px]"
          >
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-b from-[#dff3f3] to-[#f5fbfb] rotate-3" />

            <div className="relative h-[500px] md:h-[560px] overflow-hidden rounded-[30px] shadow-[0_25px_70px_rgba(53,84,84,0.18)]">
              <video
                loop
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              >
          <source
            src="/videos/dropVideo.mp4"
            type="video/mp4"
          />
        </video>

              <div className="absolute inset-0 bg-gradient-to-t from-[#355454]/25 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-5 left-5 right-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md px-4 py-2 text-xs md:text-sm text-[#355454] shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-[#61b9b9]" />
                  Science-led skincare
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Features */}
          <div className="space-y-6">
            {features.slice(2).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                }}
                className="group relative rounded-2xl border border-[#61b9b9]/15 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(53,84,84,0.08)]"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-full bg-[#eaf7f7] flex items-center justify-center text-[#61b9b9]">
                    <Check size={18} strokeWidth={2} />
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-normal mb-2 primaryText">
                      {item.title}
                    </h3>

                    <p className="text-base md:text-lg bodyText leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </motion.div>
    </section>
  );
}

export default SecretFormula;