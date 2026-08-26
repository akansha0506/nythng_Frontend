"use client"

import {
  ShieldCheck,
  Truck,
  Leaf,
  Star,
  HeartHandshake,
} from "lucide-react";

const trustItems = [
  { icon: Star, text: "10,000+ Happy Customers" },
  { icon: ShieldCheck, text: "Dermatologist Approved" },
  { icon: Leaf, text: "Clean Ingredients" },
  { icon: Truck, text: "Free Shipping" },
  { icon: HeartHandshake, text: "Cruelty Free" },
];

export default function TrustMarquee() {
  return (
    <section className="py-8 overflow-hidden">
      <div
        className="rounded-full py-4"
        style={{
          background:
            "linear-gradient(135deg, rgba(163,194,209,.25), rgba(255,255,255,.6))",
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="marquee">
          <div className="marquee-content">
            {[...trustItems, ...trustItems].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="flex items-center gap-3 mx-8"
                >
                  <div className="w-10 h-10 rounded-full bg-[#b79235]/10 flex items-center justify-center">
                    <Icon
                      size={18}
                      className="text-[#b79235]"
                    />
                  </div>

                  <span className="text-[#355454] font-medium whitespace-nowrap">
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}