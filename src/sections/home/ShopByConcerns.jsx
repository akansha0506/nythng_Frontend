"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Smile,
  Droplets,
  Waves,
  Eye,
  Sparkles,
  FlaskConical,
} from "lucide-react";

import Image from "next/image";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Images
import image from "@/assets/images/concerns/acne.jpg";
import image1 from "@/assets/images/concerns/dry1.png";
import image2 from "@/assets/images/concerns/oily1.png";
import image3 from "@/assets/images/concerns/ageing2.png";
import image4 from "@/assets/images/concerns/texture1.png";
import image5 from "@/assets/images/concerns/redness1.png";

import backgroundImg from "@/assets/images/new_images/whychooseBg.png";

const concerns = [
  {
    title: "Acne & Breakouts",
    image: image,
    icon: Smile,
    slug: "acne-blemishes",
  },
  {
    title: "Dryness & Dehydration",
    image: image1,
    icon: Droplets,
    slug: "dryness-dehydration",
  },
  {
    title: "Oily Skin",
    image: image2,
    icon: Waves,
    slug: "oil-control",
  },
  {
    title: "Ageing",
    image: image3,
    icon: Eye,
    slug: "dark-circles",
  },
  {
    title: "Texture & Pores",
    image: image4,
    icon: Sparkles,
    slug: "dullness",
  },
  {
    title: "Redness & Blotching",
    image: image5,
    icon: FlaskConical,
    slug: "fine-lines",
  },
];

export default function ShopByConcerns() {
  const swiperRef = useRef(null);
  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="relative w-full overflow-hidden bg-[#f4f8f7] px-4 py-16 md:px-12"
    >
      {/* =========================================
          Background Image Layer
      ========================================= */}

      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={backgroundImg}
          alt="Background"
          fill
          className="object-cover object-center opacity-20 blur-[1px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =========================================
            Header Section
        ========================================= */}

        <div className="mx-auto mb-12 max-w-2xl space-y-2 text-center">
          <span className="block text-xs font-bold uppercase tracking-[0.25em] text-[#355454]">
            SHOP BY CONCERN
          </span>

          <h2 className="font-serif text-3xl font-normal tracking-tight text-[#355454] md:text-4xl lg:text-5xl">
            Targeted Care for
            <br />
            <span className="shimmer-text italic">
              Every Skin Concern
            </span>
          </h2>

          <p className="pt-1 text-sm leading-relaxed text-[#457980] md:text-base">
            Discover solutions tailored to your skin&apos;s unique needs.
          </p>
        </div>

        {/* =========================================
            Carousel Container
        ========================================= */}

        <div className="relative px-2 md:px-10">
          {/* Left Navigation Arrow */}

          <button
            type="button"
            onClick={() =>
              swiperRef.current?.slidePrev()
            }
            className="absolute -left-2 top-[42%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-800/20 bg-white/90 text-[#0f3d3e] shadow-md backdrop-blur-md transition-all duration-300 hover:bg-[#0f3d3e] hover:text-white md:left-0"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Navigation Arrow */}

          <button
            type="button"
            onClick={() =>
              swiperRef.current?.slideNext()
            }
            className="absolute -right-2 top-[42%] z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-emerald-800/20 bg-white/90 text-[#0f3d3e] shadow-md backdrop-blur-md transition-all duration-300 hover:bg-[#0f3d3e] hover:text-white md:right-0"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* =========================================
              Swiper Slider
          ========================================= */}

          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[
              Navigation,
              Pagination,
              Autoplay,
            ]}
            spaceBetween={20}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".custom-swiper-pagination",
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 12,
              },
              640: {
                slidesPerView: 2.2,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 18,
              },
              1440: {
                slidesPerView: 4,
                spaceBetween: 24,
              },
            }}
            loop={true}
            className="pb-12"
          >
            {concerns.map(
              (item, index) => {
                const IconComponent =
                  item.icon;

                return (
                  <SwiperSlide
                    key={index}
                  >
                    <div
                      onClick={() =>
                        router.push(
                          `/shop?concern=${item.slug}`
                        )
                      }
                      className="group flex h-full cursor-pointer flex-col rounded-2xl border border-white/80 bg-white p-2.5 shadow-sm transition-all duration-300 hover:shadow-xl"
                    >
                      {/* =================================
                          Top Image Box
                      ================================= */}

                      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-slate-100">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 85vw, (max-width: 768px) 45vw, 25vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* =================================
                          Bottom Content Area
                      ================================= */}

                      <div className="flex items-center justify-between gap-2 px-1 pb-2 pt-3.5">
                        <div className="flex min-w-0 items-center gap-2.5">
                          {/* Circular Icon Holder */}

                          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-emerald-50 text-[#0f3d3e] transition-colors duration-300 group-hover:bg-[#0f3d3e] group-hover:text-white">
                            <IconComponent className="h-4 w-4 stroke-[1.8]" />
                          </div>

                          {/* Title */}

                          <h3 className="line-clamp-2 text-xs font-medium leading-tight text-gray-800 transition-colors group-hover:text-[#0f3d3e] md:text-sm">
                            {item.title}
                          </h3>
                        </div>

                        {/* Right Arrow */}

                        <ArrowRight className="h-4 w-4 flex-shrink-0 text-emerald-700 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>

          {/* =========================================
              Custom Styled Pagination Dots
          ========================================= */}

          <div className="custom-swiper-pagination mt-2 flex items-center justify-center gap-1.5" />
        </div>
      </div>

      {/* =========================================
          Tailwind Style Overrides
      ========================================= */}

      <style jsx global>{`
        .custom-swiper-pagination
          .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          background-color: #cbd5e1;
          opacity: 1;
          transition: all 0.3s ease;
          border-radius: 9999px;
          margin: 0 3px !important;
        }

        .custom-swiper-pagination
          .swiper-pagination-bullet-active {
          background-color: #0f3d3e;
          width: 18px;
        }
      `}</style>
    </motion.section>
  );
}