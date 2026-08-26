"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import Tick from "@/assets/svg/Tick.svg";

import { Share2, Plus } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartSlice";

import useIsDesktop from "@/hooks/useIsDesktop";

import { toast } from "react-toastify";

import DescriptionTab from "@/sections/product/DescriptionTabs";
import ProductAdditionalInfo from "@/sections/product/ProductAdditionalInfo";

function ProductDescription({ product }) {
  const isDesktop = useIsDesktop();

  const dispatch = useDispatch();

  const [selectedSize, setSelectedSizes] = useState(
    product?.sizes?.[0] || null
  );

  const [quantity, setQuantity] = useState(1);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const [cursorPosition, setCursorPosition] = useState({
    x: 0,
    y: 0,
  });

  const [hovering, setHovering] = useState(false);

  const [hoverSide, setHoverSide] = useState(null);

  const [openDetail, setOpenDetail] = useState(null);

  const swiperRef = useRef(null);

  /*
   * Mouse movement for gallery navigation
   */
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursorPosition({
      x,
      y,
    });

    setHoverSide(
      x < rect.width / 2
        ? "left"
        : "right"
    );

    setHovering(true);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  /*
   * Quantity
   */
  const increment = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );
  };

  /*
   * Add to cart
   */
  const handleAddToCart = () => {
    try {
      dispatch(
        addToCart({
          product,
          quantity,
          sku: selectedSize?.sku,
        })
      );

      console.log("selectedSize", selectedSize);
    } catch (err) {
      console.log("error occured", err);
    }
  };

  /*
   * Share product
   */
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title:
            product?.name ||
            product?.heading ||
            "Product",

          text:
            "Check out this awesome product!",

          url: window.location.href,
        });
      } catch (error) {
        console.error(
          "Error sharing:",
          error
        );
      }
    } else {
      toast.error(
        "Sharing is not supported in this browser."
      );
    }
  };

  /*
   * Set first size when product changes
   */
  useEffect(() => {
    if (
      product?.sizes?.length &&
      !selectedSize
    ) {
      setSelectedSizes(
        product.sizes[0]
      );
    }
  }, [product, selectedSize]);

  /*
   * Reset quantity when size changes
   */
  useEffect(() => {
    setQuantity(1);
  }, [selectedSize]);

  /*
   * Safety check
   */
  if (!product) {
    return null;
  }

  return (
    <section className="relative isolate w-11/12 mx-auto mb-12">

      {/* BACKGROUND GLOW */}

      <div className="pointer-events-none absolute -z-10 top-10 left-0 h-72 w-72 rounded-full bg-[#9ee6eb]/20 blur-[100px]" />

      <div className="pointer-events-none absolute -z-10 bottom-0 right-0 h-80 w-80 rounded-full bg-[#c2e7ff]/30 blur-[110px]" />


      {/* MAIN LAYOUT */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[46%_54%] xl:gap-8 mt-30">


        {/* =====================================================
            LEFT SIDE - STICKY PRODUCT IMAGE
        ===================================================== */}

        <div className="relative w-full min-w-0 self-stretch">

          <div className="lg:sticky lg:top-24 lg:self-start">

            {/* GALLERY CARD */}

            <div className="relative overflow-hidden rounded-[32px] border border-[#dcecec] bg-white shadow-[0_24px_70px_rgba(30,91,91,0.09)]">


              {/* TOP BAR */}

              <div className="pointer-events-none absolute top-0 left-0 right-0 z-30 flex items-center justify-between p-5">

                {/* PRODUCT BADGE */}

                <div className="max-w-[70%] rounded-full border border-white/80 bg-white/90 px-4 py-2 shadow-[0_8px_25px_rgba(24,56,56,0.08)] backdrop-blur-xl">

                  <span className="block truncate text-[10px] font-semibold tracking-[0.08em] text-[#4ca7aa]">

                    {product?.heading
                      ?.toLowerCase()
                      .replace(
                        /\b\w/g,
                        (char) =>
                          char.toUpperCase()
                      )}

                  </span>

                </div>


                {/* SHARE BUTTON */}

                <button
                  type="button"
                  onClick={handleShare}
                  className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white bg-white/95 text-[#183838] shadow-[0_8px_25px_rgba(24,56,56,0.1)] transition duration-300 hover:-translate-y-1 hover:bg-[#183838] hover:text-white"
                >
                  <Share2 size={17} />
                </button>

              </div>


              {/* MAIN SWIPER */}

              <Swiper
                onSwiper={(swiper) => {
                  swiperRef.current =
                    swiper;
                }}
                spaceBetween={20}
                slidesPerView={1}
                thumbs={
                  thumbsSwiper
                    ? {
                        swiper:
                          thumbsSwiper,
                      }
                    : undefined
                }
                modules={[
                  Navigation,
                  Pagination,
                  Thumbs,
                ]}
                pagination={{
                  clickable: true,
                }}
                className="product-gallery-swiper"
              >

                {/* SELECTED SIZE IMAGE */}

                <SwiperSlide>

                  <div
                    className="group relative h-[430px] overflow-hidden bg-[radial-gradient(circle_at_50%_45%,#ffffff_0%,#f4fbfb_50%,#e9f7f7_100%)] md:h-[500px] lg:h-[540px]"
                    onMouseMove={
                      handleMouseMove
                    }
                    onMouseLeave={
                      handleMouseLeave
                    }
                  >

                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#61b9b9]/10" />

                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-2xl" />


                    <img
                      src={
                        selectedSize
                          ?.image?.url
                      }
                      alt={
                        selectedSize
                          ?.image?.alt ||
                        product?.heading ||
                        "Product"
                      }
                      className="relative z-10 h-full w-full object-contain p-10 transition duration-700 group-hover:scale-[1.04] md:p-12"
                    />


                    {hovering &&
                      swiperRef.current && (
                        <button
                          type="button"
                          style={{
                            top: `${cursorPosition.y}px`,
                            left: `${cursorPosition.x}px`,
                            transform:
                              "translate(-50%,-50%)",
                          }}
                          className="absolute z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-white bg-white/90 text-[#183838] shadow-[0_12px_30px_rgba(24,56,56,0.18)] backdrop-blur-xl md:flex"
                          onClick={() => {
                            if (
                              !swiperRef.current
                            )
                              return;

                            hoverSide ===
                            "left"
                              ? swiperRef.current.slidePrev()
                              : swiperRef.current.slideNext();
                          }}
                        >
                          {hoverSide ===
                          "left"
                            ? "←"
                            : "→"}
                        </button>
                      )}

                  </div>

                </SwiperSlide>


                {/* OTHER PRODUCT IMAGES */}

                {product?.images
                  ?.slice()
                  .reverse()
                  .map((src, idx) => (

                    <SwiperSlide
                      key={
                        src?._id ||
                        src?.url ||
                        idx
                      }
                    >

                      <div
                        className="group relative h-[320px] overflow-hidden bg-[radial-gradient(circle_at_50%_45%,#ffffff_0%,#f4fbfb_50%,#e9f7f7_100%)] sm:h-[420px] md:h-[500px] lg:h-[540px]"
                        onMouseMove={
                          handleMouseMove
                        }
                        onMouseLeave={
                          handleMouseLeave
                        }
                      >

                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#61b9b9]/10" />

                        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 blur-2xl" />


                        <img
                          src={src?.url}
                          alt={
                            src?.alt ||
                            product?.heading ||
                            "Product"
                          }
                          className="relative z-10 h-full w-full object-contain p-10 transition duration-700 group-hover:scale-[1.04] md:p-12"
                        />


                        {hovering &&
                          swiperRef.current && (
                            <button
                              type="button"
                              style={{
                                top: `${cursorPosition.y}px`,
                                left: `${cursorPosition.x}px`,
                                transform:
                                  "translate(-50%,-50%)",
                              }}
                              className="absolute z-40 hidden h-12 w-12 items-center justify-center rounded-full border border-white bg-white/90 text-[#183838] shadow-[0_12px_30px_rgba(24,56,56,0.18)] backdrop-blur-xl md:flex"
                              onClick={() => {
                                if (
                                  !swiperRef.current
                                )
                                  return;

                                hoverSide ===
                                "left"
                                  ? swiperRef.current.slidePrev()
                                  : swiperRef.current.slideNext();
                              }}
                            >
                              {hoverSide ===
                              "left"
                                ? "←"
                                : "→"}
                            </button>
                          )}

                      </div>

                    </SwiperSlide>

                  ))}

              </Swiper>

            </div>


            {/* THUMBNAILS */}

            {isDesktop && (
              <div className="mt-3 rounded-[20px] border border-[#dcecec] bg-white p-2.5 shadow-[0_10px_35px_rgba(24,56,56,0.05)]">

                <Swiper
                  onSwiper={
                    setThumbsSwiper
                  }
                  spaceBetween={10}
                  slidesPerView={5}
                  modules={[Thumbs]}
                  breakpoints={{
                    640: {
                      slidesPerView: 4,
                    },
                    1024: {
                      slidesPerView: 5,
                    },
                  }}
                  watchSlidesProgress
                >

                  {/* SELECTED IMAGE THUMBNAIL */}

                  <SwiperSlide>

                    <div
                      onClick={() =>
                        swiperRef.current?.slideTo(
                          0
                        )
                      }
                      className="group h-[68px] cursor-pointer overflow-hidden rounded-[13px] border border-[#dcecec] bg-[#f4fafa] p-1 transition duration-300 hover:border-[#61b9b9] hover:shadow-md"
                    >

                      <img
                        src={
                          selectedSize
                            ?.image?.url
                        }
                        alt=""
                        className="h-full w-full rounded-[10px] object-contain transition duration-500 group-hover:scale-105"
                      />

                    </div>

                  </SwiperSlide>


                  {/* OTHER THUMBNAILS */}

                  {product?.images
                    ?.slice()
                    .reverse()
                    .map((src, idx) => (

                      <SwiperSlide
                        key={
                          src?._id ||
                          src?.url ||
                          idx
                        }
                      >

                        <div
                          onClick={() =>
                            swiperRef.current?.slideTo(
                              idx + 1
                            )
                          }
                          className="group h-[68px] cursor-pointer overflow-hidden rounded-[13px] border border-[#dcecec] bg-[#f4fafa] p-1 transition duration-300 hover:border-[#61b9b9] hover:shadow-md"
                        >

                          <img
                            src={src?.url}
                            alt=""
                            className="h-full w-full rounded-[10px] object-contain transition duration-500 group-hover:scale-105"
                          />

                        </div>

                      </SwiperSlide>

                    ))}

                </Swiper>

              </div>
            )}

          </div>

        </div>


        {/* =====================================================
            RIGHT SIDE - COMPLETE SCROLL CONTENT
        ===================================================== */}

        <div className="w-full min-w-0 space-y-4">


          {/* CURRENT PRODUCT DETAILS */}

          <div className="relative overflow-hidden rounded-[32px] border border-[#dcecec] bg-white shadow-[0_24px_70px_rgba(30,91,91,0.07)]">

            {/* TOP ACCENT */}

            <div className="h-[5px] w-full bg-gradient-to-r from-[#9de7ee] via-[#48c9da] to-[#00b6d5]" />

            <div className="p-5 xl:p-6">

              {/* HEADER */}

              <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                {/* PRODUCT INFORMATION */}

                <div className="min-w-0">

                  <span className="inline-flex rounded-full bg-[#eaf8f8] px-3 py-1.5 text-[10px] font-semibold tracking-[0.08em] text-[#4da4a7]">
                    Premium Skincare
                  </span>


                  {/* PRODUCT HEADING */}

                  <h1 className="mt-2 text-[30px] font-light leading-[1.08] tracking-[-0.025em] text-[#183838] xl:text-[36px]">
                    {product?.heading
                      ?.toLowerCase()
                      .replace(
                        /\b\w/g,
                        (char) =>
                          char.toUpperCase()
                      )}
                  </h1>


                  {/* SUBHEADING */}

                  <p className="mt-1.5 text-[13px] text-[#607878] xl:text-sm">
                    {product?.subheading}
                  </p>


                  {/* REVIEWS */}

                  <div className="mt-2 flex items-center gap-2">

                    <div className="flex items-center text-[#e3ad3d]">

                      {Array(5)
                        .fill(0)
                        .map((_, i) => (

                          <svg
                            key={i}
                            className="h-4 w-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <polygon points="9.9,1.1 12.3,7.3 18.7,7.3 13.6,11.3 15.6,17.6 9.9,13.5 4.3,17.6 6.3,11.3 1.2,7.3 7.6,7.3" />
                          </svg>

                        ))}

                    </div>

                    <span className="text-[12px] font-medium text-[#597070]">
                      {product?.numReviews ||
                        0}{" "}
                      reviews
                    </span>

                  </div>

                </div>


                {/* PRICE */}

                <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-[#dcecec] bg-gradient-to-r from-white to-[#f4fbfb] px-5 py-3 shadow-sm md:w-auto">

                  <span className="rounded-full bg-[#e8f7f6] px-3 py-1 text-xs font-semibold uppercase tracking-[2px] text-[#4f7d7b]">
                    Price
                  </span>

                  <span className="h-8 w-px bg-[#d7e6e5]" />

                  <div className="flex items-end">

                    <span className="mr-1 text-lg font-medium text-[#6a8080]">
                      ₹
                    </span>

                    <span className="text-[28px] font-bold leading-none tracking-tight text-[#183838]">
                      {
                        selectedSize
                          ?.price
                          ?.sellingPrice
                      }
                    </span>

                  </div>

                </div>

              </div>


              {/* DESCRIPTION */}

              <p className="mt-2.5 text-[16px] leading-[1.55] text-[#657a7a]">
                {product?.description}
              </p>


              {/* HIGHLIGHTS + USPs */}

              <div className="mt-3 rounded-[20px] border border-[#dcecec] bg-gradient-to-br from-[#f8fcfc] via-white to-[#eef9f9] p-3">

                <div className="flex flex-wrap gap-2">

                  {/* HIGHLIGHTS */}

                  {product?.highlights?.map(
                    (txt, idx) => (

                      <div
                        key={idx}
                        className="group flex items-center gap-2 rounded-[11px] border border-[#cfe8e7] bg-white px-3 py-2 shadow-[0_5px_16px_rgba(24,56,56,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#61b9b9]"
                      >

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-[#e9f8f7]">

                          <Image
                            src={Tick}
                            width={16}
                            height={16}
                            className="h-4 w-4 object-contain"
                            alt=""
                          />

                        </div>

                        <span className="text-[12px] font-medium leading-tight text-[#355454] xl:text-[13px]">
                          {txt}
                        </span>

                      </div>

                    )
                  )}


                  {/* USPs */}

                  {product?.usps?.map(
                    (usp, idx) => (

                      <div
                        key={idx}
                        className="group flex items-center gap-2 rounded-[11px] border border-[#b9e2e5] bg-gradient-to-r from-[#eefafa] to-[#e3f6f7] px-3 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#61b9b9]"
                      >

                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[9px] bg-white shadow-sm">

                          <Image
                            src={Tick}
                            width={16}
                            height={16}
                            className="h-4 w-4 object-contain"
                            alt=""
                          />

                        </div>

                        <span className="text-[12px] font-semibold leading-tight text-[#285253] xl:text-[13px]">
                          {usp?.title}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* SUITABLE FOR */}

              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center">

                <div className="w-[100px] shrink-0">

                  <h3 className="text-[15px] font-semibold text-[#183838] xl:text-[16px]">
                    Suitable For
                  </h3>

                </div>

                <div className="flex flex-wrap gap-2">

                  {product?.skinType?.map(
                    (type, id) => (

                      <div
                        key={id}
                        className="rounded-full border border-[#d7e8e7] bg-[#f7fbfb] px-3.5 py-2 text-[12px] font-medium text-[#466262] transition duration-300 hover:border-[#61b9b9] hover:bg-[#eef9f8] xl:text-[13px]"
                      >
                        {type}
                      </div>

                    )
                  )}

                </div>

              </div>


              {/* DIVIDER */}

              <div className="my-3 h-px w-full bg-[#e5eeee]" />


              {/* SIZE + QUANTITY */}

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">

                {/* SELECT SIZE */}

                <div className="rounded-[16px] border border-[#dcecec] bg-[#f8fbfb] px-3.5 py-3">

                  <div className="mb-2 flex items-center justify-between">

                    <h3 className="text-[16px] font-semibold text-[#183838] xl:text-[17px]">
                      Select Size
                    </h3>

                    <span className="h-2 w-2 rounded-full bg-[#17bdd4]" />

                  </div>

                  <div className="flex flex-wrap gap-2">

                    {product?.sizes?.map(
                      (sizeObj, id) => (

                        <button
                          type="button"
                          key={
                            sizeObj?._id ||
                            sizeObj?.size ||
                            id
                          }
                          onClick={() =>
                            setSelectedSizes(
                              sizeObj
                            )
                          }
                          className={`min-w-[66px] rounded-[10px] border px-3.5 py-2 text-[13px] font-semibold transition-all duration-300 ${
                            selectedSize?._id ===
                            sizeObj?._id
                              ? "border-[#183838] bg-[#183838] text-white shadow-[0_7px_18px_rgba(24,56,56,0.18)]"
                              : "border-[#d7e7e6] bg-white text-[#456060] hover:border-[#61b9b9] hover:bg-[#f1fafa]"
                          }`}
                        >
                          {sizeObj?.size}
                        </button>

                      )
                    )}

                  </div>

                </div>


                {/* QUANTITY */}

                <div className="rounded-[16px] border border-[#dcecec] bg-[#f8fbfb] px-3.5 py-3">

                  <div className="mb-2 flex items-center justify-between">

                    <h3 className="text-[16px] font-semibold text-[#183838] xl:text-[17px]">
                      Quantity
                    </h3>

                    <span className="h-2 w-2 rounded-full bg-[#17bdd4]" />

                  </div>

                  <div className="inline-flex items-center rounded-[10px] border border-[#d7e7e6] bg-white p-1">

                    <button
                      type="button"
                      onClick={decrement}
                      disabled={quantity <= 1}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-medium text-[#183838] transition hover:bg-[#183838] hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      −
                    </button>

                    <span className="w-12 text-center text-[15px] font-semibold text-[#183838]">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={increment}
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-medium text-[#183838] transition hover:bg-[#183838] hover:text-white"
                    >
                      +
                    </button>

                  </div>

                </div>

              </div>


              {/* ADD TO CART */}

              <button
                type="button"
                onClick={handleAddToCart}
                className="group relative mt-3 w-full cursor-pointer overflow-hidden rounded-[15px] py-3.5 text-[14px] text-white transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(31,147,160,0.28)]"
              >

                <span className="relative z-20 font-semibold tracking-[0.02em]">
                  Add to Cart
                </span>

                <span className="absolute inset-0 bg-gradient-to-r from-[#61b9b9] via-[#67aeaf] to-[#61b9b9]" />

                <span className="absolute inset-0 z-10 overflow-hidden rounded-[15px]">

                  <span className="absolute top-0 left-[-75%] h-full w-[50%] skew-x-[-20deg] animate-shine bg-gradient-to-r from-transparent via-white/25 to-transparent" />

                </span>

              </button>

            </div>

          </div>


          {/* FAQ STYLE PRODUCT ACCORDION */}

          <div className="overflow-hidden rounded-[28px] border border-[#dcecec] bg-white shadow-[0_20px_60px_rgba(30,91,91,0.055)]">

            {/* SUPER INGREDIENTS */}

            <div className="border-b border-[#e4eeee]">

              <button
                type="button"
                onClick={() =>
                  setOpenDetail(
                    openDetail ===
                      "ingredients"
                      ? null
                      : "ingredients"
                  )
                }
                className="group flex w-full items-center justify-between gap-5 px-5 py-5 text-left md:px-6"
              >

                <div>

                  <span className="text-[11px] font-medium text-[#7d9191]">
                    Formula
                  </span>

                  <h3 className="mt-1 text-[19px] font-semibold text-[#183838]">
                    Super Ingredients
                  </h3>

                </div>

                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    openDetail ===
                    "ingredients"
                      ? "rotate-45 border-[#183838] bg-[#183838] text-white"
                      : "border-[#d8e9e8] bg-[#f7fbfb] text-[#183838] group-hover:border-[#61b9b9]"
                  }`}
                >
                  <Plus
                    size={20}
                    strokeWidth={1.7}
                  />
                </span>

              </button>


              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                  openDetail ===
                  "ingredients"
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >

                <div className="overflow-hidden">

                  <div className="border-t border-[#edf2f2]">

                    <DescriptionTab
                      ingredients={
                        product?.superIngredients
                      }
                      directions={
                        product?.directions
                      }
                    />

                  </div>

                </div>

              </div>

            </div>


            {/* ADDITIONAL INFORMATION */}

            <div>

              <button
                type="button"
                onClick={() =>
                  setOpenDetail(
                    openDetail ===
                      "additional"
                      ? null
                      : "additional"
                  )
                }
                className="group flex w-full items-center justify-between gap-5 px-5 py-5 text-left md:px-6"
              >

                <div>

                  <span className="text-[11px] font-medium text-[#7d9191]">
                    Product Details
                  </span>

                  <h3 className="mt-1 text-[19px] font-semibold text-[#183838]">
                    Additional Information
                  </h3>

                </div>

                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    openDetail ===
                    "additional"
                      ? "rotate-45 border-[#183838] bg-[#183838] text-white"
                      : "border-[#d8e9e8] bg-[#f7fbfb] text-[#183838] group-hover:border-[#61b9b9]"
                  }`}
                >
                  <Plus
                    size={20}
                    strokeWidth={1.7}
                  />
                </span>

              </button>


              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                  openDetail ===
                  "additional"
                    ? "grid-rows-[1fr]"
                    : "grid-rows-[0fr]"
                }`}
              >

                <div className="overflow-hidden">

                  <div className="border-t border-[#edf2f2]">

                    <ProductAdditionalInfo
                      info={product}
                    />

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* SWIPER DESIGN */}

      <style jsx>{`
        .product-gallery-swiper
          .swiper-pagination {
          bottom: 16px !important;
        }

        .product-gallery-swiper
          .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: #183838;
          opacity: 0.22;
          transition: all 0.3s ease;
        }

        .product-gallery-swiper
          .swiper-pagination-bullet-active {
          width: 22px;
          border-radius: 999px;
          background: #17bdd4;
          opacity: 1;
        }
      `}</style>

    </section>
  );
}

export default ProductDescription;