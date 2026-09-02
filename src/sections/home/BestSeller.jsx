"use client";

import ProductCard from "@/components/common/ProductCard";
import ArrowButton from "@/components/ui/ArrowButton";
import HeadingHighlight from "@/components/ui/HeadingHighlight";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { useSelector } from "react-redux";
import { useRef } from "react";

import { motion } from "framer-motion";
import Link from "next/link";

import bgImage from "@/assets/images/new_images/section_bg.png";

import { Leaf } from "lucide-react";

export default function BestSeller({
  allProducts = [],
  heading,
  bodyText,
}) {
  const swiperRef = useRef(null);

  const language = useSelector(
    (state) => state.language?.value || "en"
  );

  const wishlistIds = useSelector(
    (state) => state.wishlist?.wishlistIds || []
  );

  const products = Array.isArray(allProducts)
    ? allProducts
    : allProducts?.products ||
      allProducts?.data ||
      [];

  return (
    <div
      className="relative w-full overflow-hidden bg-cover bg-center bg-no-repeat py-16"
      style={{
        backgroundImage: `url(${bgImage.src})`,
      }}
    >
      <motion.section
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.15,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative z-10 mx-auto w-full max-w-[1380px] px-4 sm:px-8"
      >
        <div className="text-center">
          {language === "en" ? (
            <HeadingHighlight
              text={
                heading ||
                "Loved by Many, Chosen for You"
              }
              highlight="Chosen for You"
              withBreak={false}
            />
          ) : (
            <h2 className="text-3xl font-semibold text-[#355454] lg:text-4xl xl:text-5xl">
              Loved by Many, Chosen for You
            </h2>
          )}

          <p className="mt-3 text-sm text-[#457980] md:text-base">
            {bodyText ||
              "Our most-loved products, trusted by thousands."}
          </p>

          {/* Decorative Divider */}

          <div className="mt-4 flex items-center justify-center gap-3 text-[#70A3A1]">
            <span className="h-[1px] w-12 bg-[#70A3A1]/40" />

            <Leaf
              className="h-5 w-5 rotate-[-20deg] text-[#70A3A1]"
              strokeWidth={1.8}
            />

            <span className="h-[1px] w-12 bg-[#70A3A1]/40" />
          </div>
        </div>

      {/* swiper */}

        <div className="relative mt-8 px-2 sm:px-12">

          {/* LEFT ARROW */}

          <div className="absolute -left-2 top-1/2 z-20 hidden -translate-y-1/2 sm:block">
            <ArrowButton
              color="#1b4b47"
              direction="prev"
              onClick={() =>
                swiperRef.current?.slidePrev()
              }
            />
          </div>

          {/* RIGHT ARROW */}

          <div className="absolute -right-2 top-1/2 z-20 hidden -translate-y-1/2 sm:block">
            <ArrowButton
              color="#1b4b47"
              direction="next"
              onClick={() =>
                swiperRef.current?.slideNext()
              }
            />
          </div>

          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation]}
            spaceBetween={24}
            breakpoints={{
              0: {
                slidesPerView: 1.12,
                spaceBetween: 14,
              },

              480: {
                slidesPerView: 1.35,
                spaceBetween: 16,
              },

              640: {
                slidesPerView: 2,
                spaceBetween: 18,
              },

              768: {
                slidesPerView: 2.4,
                spaceBetween: 20,
              },

              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },

              1280: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            className="w-full !py-4"
          >
            {products.length > 0 ? (
              products.map((product, index) => (
                <SwiperSlide
                  key={
                    product?._id ||
                    product?.id ||
                    index
                  }
                  className="!h-auto"
                >
                  <motion.div
                    className="h-full cursor-pointer"
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    whileHover={{
                      scale: 1.08,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    <ProductCard
                      product={product}
                      wishlistIds={
                        wishlistIds
                      }
                    />
                  </motion.div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="flex min-h-[300px] items-center justify-center">
                  <p className="text-sm text-[#457980]">
                    No products available.
                  </p>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
        
        {/* view all products */}

        <div className="mt-12 flex justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 rounded-full bg-[#1b4b47] px-8 py-3.5 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-[#123633] hover:shadow-lg"
          >
            VIEW ALL PRODUCTS

            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}