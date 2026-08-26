"use client";

import Image from "next/image";

import HeadingHighlight from "@/components/ui/HeadingHighlight";

import steps1 from "@/assets/images/skinInsights/howItWorks1.png";
import steps2 from "@/assets/images/skinInsights/howItWorks2.png";
import steps3 from "@/assets/images/skinInsights/aiDashboard.png";

const scanSteps = [
  {
    step: 1,
    title: "Scan Your Face",
    description:
      "Easily upload or take a selfie. Our AI reads your skin without needing any filters or makeup — just your natural face.",
    image: steps1,
  },
  {
    step: 2,
    title: "Skin Analysis",
    description:
      "Using dermatologist-trained AI, we assess key skin metrics: hydration, texture, pores, pigmentation, and more — all within seconds.",
    image: steps2,
  },
  {
    step: 3,
    title: "Get Instant Results",
    description:
      "Receive a detailed report, see what your skin needs — and get personalized product suggestions that actually work.",
    image: steps3,
  },
];

export default function HowItWorks() {
  return (
    <section className="w-11/12 mx-auto sectionMargin">
      <HeadingHighlight
        text="How Our Skin Insight Works"
        highlight="Insight"
        className="max-md:text-center"
      />

      <div className="grid md:grid-cols-3 gap-16 mt-10">
        {scanSteps.map((e, i) => (
          <div key={i} className="text-center">
            <Image
              src={e.image}
              alt={e.title}
              className="w-full h-100 rounded-xl border object-cover"
            />

            <h3 className="text-2xl mt-4">
              {e.step}. {e.title}
            </h3>

            <p className="bodyText">
              {e.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}