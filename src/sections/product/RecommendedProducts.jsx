"use client";

import React, { useRef } from "react";
import HeadingHighlight from "@/components/ui/HeadingHighlight";
import ProductCard from "@/components/common/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

function RecommendedProducts({ recommendedProducts }) {
  const swiperRef = useRef(null);

  return (
    <section className="w-11/12 mx-auto md:sectionMargin mt-20">
      <HeadingHighlight
        text="Related Products"
        highlight="Products"
      />

      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView={1.2}
        breakpoints={{
          640: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
          1536: {
            slidesPerView: 4,
          },
        }}
        className="mt-8 w-full"
      >
        {recommendedProducts?.map((product, index) => (
          <SwiperSlide key={index}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default RecommendedProducts;