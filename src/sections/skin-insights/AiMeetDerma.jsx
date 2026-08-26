"use client";

import Image from "next/image";

import HeadingHighlight from "@/components/ui/HeadingHighlight";
import dashboard from "@/assets/images/skinInsights/aiDashboard.png";
import SecondaryButton from "@/components/ui/SecondaryButton";

const skinAnalysisFeatures = [
  {
    title: "Clinically Backed",
    description:
      "Trained with expert dermatologists to deliver reliable, science-based results.",
  },
  {
    title: "Made for Every Skin Tone",
    description:
      "Trained with expert dermatologists to deliver reliable, science-based results.",
  },
  {
    title: "Detects Multiple Concerns",
    description:
      "Spots dryness, acne, dullness, uneven tone, and early aging signs – all at once.",
  },
];

export default function AiMeetDerma() {
  return (
    <section className="w-11/12 mx-auto sectionMargin">
      {/* Heading + Description */}
      <div className="flex flex-col md:flex-row justify-between">
        <HeadingHighlight
          text="When AI Meet Dermatologist"
          highlight="AI Meet"
          className="md:w-1/3"
        />

        <p className="md:w-1/2 bodyText max-md:mt-2">
          Our skin insight system combines the precision of artificial
          intelligence with the clinical experience of board-certified
          dermatologists to deliver skincare that’s not just smart — it’s
          personalized, practical, and proven.
        </p>
      </div>

      {/* Main Card */}
      <div className="p-10 pt-16 mt-10 shadow-xl border border-gray-200 rounded-3xl">
        <div className="flex flex-col-reverse md:flex-row gap-8">
          {/* Left Content */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-2xl md:text-4xl mb-2 primaryText">
              Skin Intelligence, Simplified
            </h2>

            <ul className="text-lg md:text-xl bodyText mb-10">
              <li>🔹 Dermatologist collaboration</li>
              <li>🔹 Continual model training</li>
              <li>🔹 Privacy-first: No image storage</li>
            </ul>

            <SecondaryButton text="Start Now" />
          </div>

          {/* Right Image */}
          <div className="relative inline-block md:w-1/2">
            {/* Background Shape */}
            <div className="absolute -top-5 -left-5 w-full h-full bg-[#DFA37D] rounded-xl z-0" />

            {/* Dashboard Image */}
            <Image
              src={dashboard}
              alt="Skin Intelligence"
              className="w-full relative z-10 rounded-xl shadow-lg"
              priority
            />
          </div>
        </div>

        {/* Features */}
        <div className="mt-10 py-8 border-t grid grid-cols-1 md:grid-cols-3 gap-8">
          {skinAnalysisFeatures.map((e, i) => (
            <div key={i}>
              <h3 className="text-2xl mb-2 primaryText">
                {e.title}
              </h3>

              <p className="bodyText">
                {e.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}