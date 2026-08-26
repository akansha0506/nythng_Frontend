import Link from "next/link";
import Image from "next/image";

import logo from "@/assets/svg/NewLogo.svg";

import instagram from "@/assets/svg/instagram.svg";
import facebook from "@/assets/svg/facebook.svg";
import twitter from "@/assets/svg/twitter.svg";
import pinterest from "@/assets/svg/pinterest.svg";
import youtube from "@/assets/svg/youtube.svg";

const footerLinks = [
  {
    title: "COMPANY",
    links: [
      { label: "Our Story", path: "/about" },
      { label: "Shop", path: "/shop" },
      { label: "Research Lab", path: "/research-lab" },
      { label: "Skin Insights", path: "/skin-insights" },
      { label: "Blogs", path: "/blogs" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { label: "Contact Us", path: "/contact-us" },
      { label: "FAQ", path: "/faq" },
      { label: "Shipping", path: "/shipping-policy" },
      { label: "Return Policy", path: "/refund-policy" },
      { label: "Terms & Conditions", path: "/terms-and-conditions" },
    ],
  },
];

const socialIcons = [
  {
    Icon: pinterest,
    url: "https://in.pinterest.com/nythngcosmetics/",
  },
  {
    Icon: facebook,
    url: "https://www.facebook.com/nythngcosmetics/",
  },
  {
    Icon: instagram,
    url: "https://www.instagram.com/nythngcosmetics/",
  },
  {
    Icon: twitter,
    url: "https://x.com/nythngcosmetics",
  },
  {
    Icon: youtube,
    url: "https://www.youtube.com/@nythngcosmetics",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#3a8b88]/70 text-[#2c5357] font-sans">

      <style>{`
        @keyframes floatBubble1 {
          0%, 100% { transform: translateY(0px) scale(1); }
          33% { transform: translateY(-18px) scale(1.04); }
          66% { transform: translateY(-8px) scale(0.97); }
        }
        @keyframes floatBubble2 {
          0%, 100% { transform: translateY(0px) scale(1); }
          40% { transform: translateY(-22px) scale(1.05); }
          70% { transform: translateY(-10px) scale(0.96); }
        }
        @keyframes floatBubble3 {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        .bubble-left { animation: floatBubble1 6s ease-in-out infinite; }
        .bubble-right { animation: floatBubble2 7.5s ease-in-out infinite; }
        .bubble-mini { animation: floatBubble3 4s ease-in-out infinite; }
      `}</style>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#bce0ea]/30 to-[#a3d3e2]/60 pointer-events-none" />

      {/* Top Wave */}
      <div className="absolute top-0 left-0 w-full h-[70px] md:h-[95px] z-20 pointer-events-none">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            d="M0,32 C280,75 420,80 720,40 C1020,0 1200,60 1440,30 L1440,0 L0,0 Z"
            fill="#ffffff"
          />
        </svg>
      </div>

      {/* Left Bubble - Top */}
      <div className="bubble-left absolute left-4 top-12 z-10 pointer-events-none opacity-35">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/60 to-[#5aacbd]/35 border border-white/40 shadow-md" />
          <div className="bubble-mini absolute -right-3 top-2 w-4 h-4 rounded-full bg-white/40 border border-white/25" style={{ animationDelay: '1s' }} />
          <div className="bubble-mini absolute -right-1 top-8 w-3 h-3 rounded-full bg-white/35 border border-white/25" style={{ animationDelay: '2s' }} />
          <div className="bubble-mini absolute left-1 -bottom-3 w-4 h-4 rounded-full bg-white/40 border border-white/25" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      {/* Right Bubble - Top */}
      <div className="bubble-right absolute right-6 top-8 z-10 pointer-events-none opacity-35">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/60 to-[#5aacbd]/35 border border-white/40 shadow-md" />
          <div className="bubble-mini absolute -right-3 bottom-4 w-4 h-4 rounded-full bg-white/40 border border-white/25" style={{ animationDelay: '1.5s' }} />
          <div className="bubble-mini absolute right-3 -bottom-4 w-5 h-5 rounded-full bg-white/40 border border-white/25" style={{ animationDelay: '0.8s' }} />
        </div>
      </div>

      {/* Bottom Left Bubble */}
      <div className="bubble-right absolute left-10 bottom-16 z-10 pointer-events-none opacity-30">
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gradient-to-tl from-white/55 to-[#5aacbd]/30 border border-white/35 shadow-md" />
          <div className="bubble-mini absolute -left-3 top-3 w-3 h-3 rounded-full bg-white/35 border border-white/20" style={{ animationDelay: '1.2s' }} />
          <div className="bubble-mini absolute left-2 -bottom-3 w-4 h-4 rounded-full bg-white/35 border border-white/20" style={{ animationDelay: '2.5s' }} />
        </div>
      </div>

      {/* Bottom Right Bubble */}
      <div className="bubble-left absolute right-16 bottom-10 z-10 pointer-events-none opacity-30">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tl from-white/55 to-[#5aacbd]/30 border border-white/35 shadow-md" />
          <div className="bubble-mini absolute -right-4 top-1 w-5 h-5 rounded-full bg-white/35 border border-white/20" style={{ animationDelay: '0.3s' }} />
          <div className="bubble-mini absolute right-1 -bottom-4 w-3 h-3 rounded-full bg-white/30 border border-white/20" style={{ animationDelay: '1.8s' }} />
        </div>
      </div>

      <div className="relative z-30 max-w-[1240px] mx-auto px-6 md:px-12 pt-28 pb-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Logo */}
          <div className="lg:col-span-3 space-y-4">

            <Image
              src={logo}
              alt="NYTHNG"
              width={140}
              height={55}
              className="object-contain cursor-pointer"
            />

            <p className="text-[14px] leading-relaxed text-[#355358] max-w-[220px] font-medium">
              AI-powered skincare insights for your best skin, every day.
            </p>

          </div>

          {/* Newsletter */}
          <div className="lg:col-span-5 space-y-6">

            <h3 className="uppercase tracking-wider text-[12px] font-bold text-[#146670]">
              FOR WEEKLY SKINCARE UPDATES
            </h3>

            <div className="relative flex items-center w-full max-w-[420px] h-[46px] rounded-full bg-white shadow-sm border border-white/80 overflow-hidden p-1">

              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 h-full bg-transparent outline-none px-4 text-[13px] text-[#2c3237] placeholder:text-[#809ba2]"
              />

              <button
                className="h-full px-5 rounded-full bg-[#187582] hover:bg-[#115761] text-white text-[13px] font-medium flex items-center gap-2 transition-all duration-200 shrink-0"
              >
                <span>Subscribe</span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>

              </button>

            </div>
            {/* SUPPORT CONTACT */}
            <div className="flex items-center gap-3 pt-2">

              <div className="w-[38px] h-[38px] rounded-full bg-white/70 backdrop-blur-sm border border-[#b2d8e2] flex items-center justify-center text-[#187582] shrink-0">

                <svg
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 10a6 6 0 10-12 0v4a2 2 0 002 2h1v-5H7v-1a5 5 0 1110 0v1h-2v5h1a2 2 0 002-2v-4z"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 18a3 3 0 006 0"
                  />
                </svg>

              </div>

              <div className="text-[13px]">
                <span className="text-[#355358]">
                  Need Help? Contact Us At{" "}
                </span>

                <a
                  href="mailto:Support@Nythng.in"
                  className="text-[#187582] font-semibold underline underline-offset-2 hover:text-[#115761]"
                >
                  Support@Nythng.in
                </a>

              </div>

            </div>

          </div>

          {/* ================= RIGHT SECTION ================= */}

          <div className="lg:col-span-4 lg:border-l lg:border-[#a1d1dc] lg:pl-10">

            <div className="grid grid-cols-2 gap-8">

              {footerLinks.map((section) => (

                <div key={section.title}>

                  <h2 className="text-[#187582] uppercase font-bold tracking-wider text-[15px] mb-4 transform-underline">
                    {section.title}
                  </h2>

                  <ul className="space-y-2.5">

                    {section.links.map((link) => (

                      <li key={link.label}>

                        <Link
                          href={link.path}
                          className="text-[15px] text-[#ffffff]/70 font-medium hover:text-[#187582] transition-colors "
                        >
                          {link.label}
                        </Link>

                      </li>

                    ))}

                  </ul>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* ================= DIVIDER ================= */}

        <div className="relative flex items-center justify-center my-10">

          <div className="w-full border-t border-[#eff1f1]" />

          <div className="absolute px-3 bg-[#bfdee7] rounded-full">

            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="#187582"
            >
              <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />
            </svg>

          </div>

        </div>
        {/* ================= SOCIAL ICONS ================= */}

        <div className="flex justify-center items-center gap-3">

          {socialIcons.map((social, index) => (

            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Social ${index + 1}`}
              className="w-9 h-9 rounded-full border border-[#9ac2cd] bg-white/40 backdrop-blur-sm flex items-center justify-center transition-all duration-200 hover:bg-white hover:border-[#187582] hover:shadow-sm"
            >

              <Image
                src={social.Icon}
                alt="social-icon"
                width={16}
                height={16}
                className="object-contain opacity-80 hover:opacity-100"
              />

            </a>

          ))}

        </div>

        {/* ================= COPYRIGHT ================= */}

        <div className="text-center mt-6">

          <p className="text-[12px] text-[#426167] font-medium">

            © {new Date().getFullYear()} NYTHNG by MHJ PHARMACONCEPTS PRIVATE
            LIMITED. All rights reserved.

          </p>

        </div>

      </div>

    </footer>
  );
}