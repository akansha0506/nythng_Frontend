"use client";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ArrowButton from "@/components/ui/ArrowButton";
import { Play } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";

function VedioReviews() {
  const [activeVedio, setActiveVedio] = useState(null);
  const swiperRef = useRef(null);

  const reviewVedio = [
    "/videos/review-vedio.mp4",
    "/videos/review-vedio.mp4",
    "/videos/review-vedio.mp4",
    "/videos/review-vedio.mp4",
    "/videos/review-vedio.mp4",
    "/videos/review-vedio.mp4",
  ];

  const openVideo = (video) => {
    console.log("vedioooooo", video);
    setActiveVedio(video);
    document.body.style.overflow = "hidden";
  };

  const closeVideo = () => {
    setActiveVedio(null);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16 px-5 py-10 mx-auto w-full">
      {/* ✅ Section Heading */}
      <h2 className="text-3xl md:text-4xl font-semibold text-center text-[#355454] mb-8">
        Real People. Real Results.
      </h2>

      <div className="flex justify-end w-11/12 mb-2 gap-2">
        <ArrowButton
          className="hidden md:flex"
          color="#70A3A1"
          direction="prev"
          onClick={() => swiperRef.current?.slidePrev()}
        />

        <ArrowButton
          className="hidden md:flex"
          color="#70A3A1"
          direction="next"
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>

      <div className="w-11/12 h-[420px]">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={4}
          spaceBetween={20}
          breakpoints={{
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1280: {
              slidesPerView: 4,
            },
          }}
          modules={[Navigation]}
          className="h-full"
        >
          {reviewVedio?.map((data, i) => (
            <SwiperSlide key={i}>
              <div className="relative bg-white overflow-hidden shadow-md cursor-pointer rounded-xl h-full">
                <div
                  className="relative w-full overflow-hidden rounded-xl"
                  onClick={() => openVideo(data)}
                >
                  <video
                    src={data}
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center hover:bg-black/40 transition-all">
                    <div className="w-12 h-12 rounded-full bg-opacity-80 flex items-center justify-center">
                      <Play
                        size={40}
                        className="text-white ml-1"
                        fill="#ffffff"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* VIDEO MODAL */}
      {activeVedio && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/30 px-2"
          onClick={closeVideo}
        >
          <div
            className="relative w-full max-w-3xl bg-white rounded-md overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 z-10 bg-white rounded-full w-8 h-8 flex items-center justify-center text-black"
              onClick={closeVideo}
            >
              ✕
            </button>

            <div className="w-full aspect-video bg-black">
              <video
                src={activeVedio}
                autoPlay
                controls
                loop
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-3 text-center text-black text-lg font-medium">
              Real People. Real Results.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VedioReviews;