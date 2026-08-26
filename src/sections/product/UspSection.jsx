"use client";

import React, { useRef, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { Navigation } from "swiper/modules";

import ArrowButton from "@/components/ui/ArrowButton";
import { cn } from "@/lib/utils";

function UspSection({ product }) {
  console.log("uspsusps", product);

  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const usps = product?.usps ?? [];

  return (
    <section className="bg-[#f8f4f2] py-20 mt-10">
      <div className="w-11/12 mx-auto">

        <div className="text-center mb-5">
          <h2 className="font-medium primaryText text-4xl lg:text-5xl xl:text-6xl">
            What makes it{" "}
            <span className="shimmer-text text-4xl lg:text-5xl xl:text-6xl">
              Special
            </span>
          </h2>
        </div>

        <div className="flex items-center justify-center gap-4 mt-10 mx-auto px-5 lg:py-10 py-4">

          {/* Previous Arrow */}

          {/* 
          <ArrowButton
            color="#cccfcd"
            className="hidden lg:flex"
            direction="prev"
            onClick={() => swiperRef.current?.slidePrev()}
          />
          */}

          <div className="w-full md:max-w-2xl lg:max-w-4xl">
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              modules={[Navigation]}
              spaceBetween={20}
              loop={usps && usps.length > 3}
              slidesPerView={1}
              centeredSlides={usps && usps.length === 3}
              initialSlide={usps && usps.length === 3 ? 1 : 0}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  centeredSlides: false,
                },

                768: {
                  slidesPerView:
                    usps && usps.length >= 2 ? 2 : 1,
                  centeredSlides: usps && usps.length === 3,
                },

                1024: {
                  slidesPerView:
                    usps && usps.length >= 3
                      ? 3
                      : usps.length,
                  centeredSlides: usps && usps.length === 3,
                },
              }}
              slidesOffsetBefore={0}
              onSlideChange={(swiper) =>
                setActiveIndex(swiper.realIndex)
              }
              className="rounded-2xl"
            >
              {usps &&
                usps.map((card, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <SwiperSlide key={card.id}>
                      <div
                        className={cn(
                          "lg:h-[340px] h-[417px] transition-all duration-500 transform rounded-xl overflow-hidden shadow-xl",

                          isActive
                            ? "z-10 scale-100"
                            : "scale-90 opacity-80",

                          index < activeIndex
                            ? "lg:-rotate-4"
                            : index > activeIndex
                            ? "lg:rotate-6"
                            : ""
                        )}
                        style={{
                          backgroundImage: `url(${card.image.url})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          borderRadius: "8px",
                        }}
                      >
                        <div className="flex flex-col justify-end w-full h-full bg-black/30 items-start p-3 text-white font-semibold rounded-xl">
                          <div>
                            <p className="lg:text-2xl text-2xl">
                              {card.title}
                            </p>

                            <p className="mt-2 mb-5 lg:text-lg text-xl">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>

          {/* Next Arrow */}

          {/*
          <ArrowButton
            color="#cccfcd"
            className="hidden lg:flex"
            direction="next"
            onClick={() => swiperRef.current?.slideNext()}
          />
          */}

        </div>
      </div>
    </section>
  );
}

export default UspSection;