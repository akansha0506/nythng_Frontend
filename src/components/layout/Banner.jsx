"use client";

import Link from "next/link";
import SecondaryButton from "../ui/SecondaryButton";

const Banner = ({
  // Content props
  headline = "Nothing Extra.",
  subheadline = "Everything That Works.",
  description = "Formulated by science, proven by skin. Zero fillers, zero fragrance—just clean, clinical skincare for real results.",

  // CTA props
  primaryButtonText = "Shop Now",
  primaryButtonLink = "/shop",
  secondaryButtonText = "Learn More",
  secondaryButtonLink = "/about",
  showSecondaryButton = false,

  // Image props
  imageUrl =
    "https://i.pinimg.com/736x/e1/87/c9/e187c949caffd9bde0bf4a1ab278bebf.jpg",
  imageAlt = "Premium skincare products showcase",

  // Floating CTA props
  showFloatingCTA = true,
  floatingCTAText = "Start Your Journey",
  floatingCTALinkText = "Explore Products",
  floatingCTALink = "/products",

  // Stats props
  showStats = false,
  stats = [
    { value: "10,000+", label: "Happy Customers" },
    { value: "4.8★", label: "Average Rating" },
    { value: "30 Days", label: "Money Back" },
  ],

  trustBadge = "Trusted by dermatologists",

  // Layout props
  layout = "default", // "default", "reverse", "center"
  backgroundColor = "from-gray-900 to-black",
  textColor = "white",

  // Custom styling
  className = "",
  containerClassName = "",
}) => {
  const isReverse = layout === "reverse";
  const isCenter = layout === "center";

  return (
    <section
      className={`px-4 sm:px-6 lg:px-8 my-12 sm:my-16 lg:my-20 ${className}`}
    >
      <div
        className={`max-w-7xl mx-auto bg-gradient-to-r header lg:text-[#355454] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl ${containerClassName}`}
      >
        <div
          className={`flex flex-col ${
            isCenter ? "lg:flex-col" : "lg:flex-row"
          } ${
            isReverse ? "lg:flex-row-reverse" : ""
          } min-h-fit`}
        >
          {/* =========================
              CONTENT SECTION
          ========================== */}

          <div
            className={`flex-1 p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-center ${
              isCenter ? "text-center" : ""
            }`}
          >
            <div
              className={`${
                isCenter ? "mx-auto" : ""
              } max-w-2xl`}
            >
              {/* Heading */}

              <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                {headline}

                {subheadline && (
                  <span className="block text-[#523d3a] text-lg xs:text-xl sm:text-2xl lg:text-3xl xl:text-4xl">
                    {subheadline}
                  </span>
                )}
              </h2>

              {/* Description */}

              <p className="text-sm sm:text-base lg:text-lg xl:text-xl mb-6 sm:mb-8 text-gray-100 font-light leading-relaxed max-w-xl">
                {description}
              </p>

              {/* CTA */}

              <div
                className={`flex flex-col xs:flex-row gap-3 sm:gap-4 ${
                  isCenter ? "justify-center" : ""
                }`}
              >
                <SecondaryButton
                  text={primaryButtonText}
                  to={primaryButtonLink}
                  className="w-full xs:w-auto justify-center xs:justify-start"
                />

                {showSecondaryButton && (
                  <Link
                    href={secondaryButtonLink}
                    className="w-full xs:w-auto px-6 sm:px-8 py-2.5 sm:py-3 border border-white/30 text-white hover:bg-white/10 rounded-lg transition-all duration-300 font-medium text-center"
                  >
                    {secondaryButtonText}
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* =========================
              IMAGE SECTION
          ========================== */}

          {!isCenter && (
            <div className="flex-1 relative overflow-hidden">
              <div className="w-full h-full lg:min-h-[300px] lg:max-h-[500px]">
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />

                {/* Mobile Gradient Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:hidden"></div>
              </div>

              {/* =========================
                  FLOATING CTA
              ========================== */}

              {showFloatingCTA && (
                <div className="hidden xl:block absolute bottom-6 right-6">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center">
                    <p className="text-sm text-white/90 mb-2">
                      {floatingCTAText}
                    </p>

                    <div className="flex items-center gap-2 text-white">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>

                      <Link
                        href={floatingCTALink}
                        className="text-sm font-medium"
                      >
                        {floatingCTALinkText}
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* =========================
            BOTTOM STATS BAR
        ========================== */}

        {showStats && (
          <div className="hidden sm:flex justify-between items-center px-6 sm:px-8 md:px-10 lg:px-12 xl:px-16 py-4 sm:py-6 bg-black/30 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center sm:text-left"
                >
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold">
                    {stat.value}
                  </div>

                  <div className="text-xs sm:text-sm text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {trustBadge && (
              <div className="hidden lg:flex items-center gap-2 text-sm text-gray-300">
                <span>{trustBadge}</span>

                <svg
                  className="w-4 h-4 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner;