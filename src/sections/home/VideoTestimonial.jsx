// "use client";

// import React, { useRef, useState } from "react";

// import HeadingHighlight from "@/components/ui/HeadingHighlight";

// import profile1 from "@/assets/images/profile/profileImg4.png";
// import profile2 from "@/assets/images/profile/profileImg5.png";
// import profile3 from "@/assets/images/profile/profileImg6.png";

// import ArrowButton from "@/components/ui/ArrowButton";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";

// import { Navigation } from "swiper/modules";

// import Tick from "@/assets/svg/Tick.svg";

// import { fetchProductBySlug } from "@/redux/slices/productSlice";
// import { useDispatch, useSelector } from "react-redux";

// import { useRouter } from "next/navigation";

// import { Eye } from "lucide-react";

// import { addToCart } from "@/redux/slices/cartSlice";

// import featuredWithVideos from "@/utils/featuredVedioData";

// import ScrollLock from "@/utils/ScrollLock";


// const VideoTestimonial = () => {
//   const router = useRouter();

//   const { selectedProduct } = useSelector(
//     (state) => state.product
//   );

//   const dispatch = useDispatch();

//   const [loading, setLoading] = useState();
//   const [activeVedio, setActiveVedio] = useState(null);

//   const swiperRef = useRef(null);


//   const openVideo = async (data) => {
//     console.log("vedioooooo", data);

//     try {
//       setLoading(true);

//       const product = await dispatch(
//         fetchProductBySlug(data.slug)
//       ).unwrap();

//       console.log(
//         "ppppp1200000000000000000",
//         product
//       );

//       setActiveVedio(data.video);
//     } catch (error) {
//       console.error(
//         "Failed to fetch blog by slug:",
//         error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };


//   const closeVideo = () => {
//     setActiveVedio(null);
//   };


//   const handleAddToCart = async (product) => {
//     if (!product) return;

//     const quantity = 1;
//     const sku = product.sizes[0].sku;

//     try {
//       await dispatch(
//         addToCart({
//           product,
//           quantity,
//           sku,
//         })
//       ).unwrap();

//       setActiveVedio(false);
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   console.log(
//     "selelelelPPP",
//     selectedProduct
//   );


//   return (
//     <>
//       {activeVedio && <ScrollLock />}

//       <section className="w-11/12 mx-auto sectionMargin">
//         <div className="w-full">

//           <HeadingHighlight
//             text="Stories We Have"
//             highlight={"Reviews"}
//           />

//           <p className="mt-2 bodyText">
//             Unfiltered experiences from those who trusted
//             Nythng & chose beyond average.
//           </p>


//           <div className="flex justify-between items-end">

//             <div className="flex items-center -space-x-6 md:-space-x-4 mt-2">

//               <img
//                 className="w-16 h-16 rounded-full border-2 border-white"
//                 src={profile1.src}
//                 alt="User 1"
//               />

//               <img
//                 className="w-16 h-16 rounded-full border-2 border-white"
//                 src={profile2.src}
//                 alt="User 2"
//               />

//               <img
//                 className="w-16 h-16 rounded-full border-2 border-white"
//                 src={profile3.src}
//                 alt="User 3"
//               />

//               <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#3d6d6d] text-white text-xl border-2 border-white">
//                 20+
//               </div>

//             </div>


//             <div className="flex gap-2 md:gap-4">

//               <ArrowButton
//                 color="#70A3A1"
//                 direction="prev"
//                 onClick={() =>
//                   swiperRef.current?.slidePrev()
//                 }
//               />

//               <ArrowButton
//                 color="#70A3A1"
//                 direction="next"
//                 onClick={() =>
//                   swiperRef.current?.slideNext()
//                 }
//               />

//             </div>

//           </div>

//         </div>


//         <Swiper
//           onSwiper={(swiper) =>
//             (swiperRef.current = swiper)
//           }
//           slidesPerView={4}
//           spaceBetween={20}
//           breakpoints={{
//             320: {
//               slidesPerView: 1,
//             },
//             640: {
//               slidesPerView: 2,
//             },
//             1024: {
//               slidesPerView: 3,
//             },
//             1280: {
//               slidesPerView: 4,
//             },
//           }}
//           modules={[Navigation]}
//           className="mySwiper my-10"
//         >

//           {featuredWithVideos.map((data, i) => (

//             <SwiperSlide key={i}>

//               <div
//                 className="relative group w-full overflow-hidden rounded-xl cursor-pointer"
//                 onClick={() => openVideo(data)}
//               >

//                 {/* Video */}

//                 <video
//                   src={data.video}
//                   autoPlay
//                   muted
//                   loop
//                   playsInline
//                   className="w-full h-[460px] object-cover rounded-xl"
//                 />


//                 {/* Small Card */}

//                 <div className="absolute bottom-0 left-0 right-0 bg-white/70 mx-2 mb-2 backdrop-blur-sm rounded-xl p-2 flex items-center gap-2 shadow-md z-10">

//                   <img
//                     src={
//                       data?.sizes?.[0]?.image?.url
//                     }
//                     alt={
//                       data?.sizes?.[0]?.image?.alt ||
//                       data?.heading
//                     }
//                     className="w-12 h-12 object-contain rounded-md border"
//                   />


//                   <div className="flex flex-col">

//                     <p className="text-lg font-medium primaryText truncate max-w-[180px]">
//                       {data.heading}
//                     </p>

//                     <div className="flex items-center gap-2 bodyText">
//                       {data?.subheading}
//                     </div>

//                   </div>

//                 </div>


//                 {/* Hover Overlay */}

//                 <div className="absolute inset-0 bg-white/10 backdrop-blur-xl opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-in-out flex flex-col justify-center rounded-xl pointer-events-none group-hover:pointer-events-auto z-20 p-4">

//                   {/* Eye Icon */}

//                   <div className="flex justify-center items-center text-center">

//                     <button
//                       type="button"
//                       className="cursor-pointer w-10 h-10 rounded-full bg-white text-[#355454] flex items-center justify-center shadow hover:scale-105 transition"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         openVideo(data);
//                       }}
//                     >
//                       <Eye />
//                     </button>

//                   </div>

//                 </div>

//               </div>

//             </SwiperSlide>

//           ))}

//         </Swiper>


//         {/* ================= VIDEO MODAL ================= */}

//         {activeVedio && (

//           <div
//             className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-sm bg-black/30 px-2 md:rounded-3xl"
//             onClick={closeVideo}
//           >

//             <div
//               className="relative w-full max-w-4xl bg-[#] rounded-3xl overflow-hidden shadow-xl"
//               onClick={(e) =>
//                 e.stopPropagation()
//               }
//             >

//               {/* Close Button */}

//               <button
//                 type="button"
//                 className="absolute top-5 right-6 z-20 bg-[#70a3a1] shadow-md rounded-full w-8 h-8 flex items-center justify-center text-white hover:bg-[#61b9b9] cursor-pointer"
//                 onClick={closeVideo}
//               >
//                 ✕
//               </button>


//               <div className="w-full aspect-video bg-[#70a3a1] flex h-[80vh] -gap-4">

//                 {/* Video */}

//                 <video
//                   src={activeVedio}
//                   autoPlay
//                   controls
//                   loop
//                   className="md:w-2/5 w-full h-full object-cover rounded-3xl p-3"
//                 />


//                 {/* Desktop Product Details */}

//                 <div className="md:flex hidden flex-col bg-white rounded-xl my-3 mr-3 flex-1 overflow-hidden shadow-lg">

//                   {/* Product Header */}

//                   <div className="sticky top-0 z-10 bg-white px-8 pt-4 pb-2 shadow overflow-hidden">

//                     <div className="flex gap-4 overflow-hidden">

//                       <img
//                         src={
//                           selectedProduct?.sizes?.[0]?.image?.url
//                         }
//                         alt={
//                           selectedProduct?.sizes?.[0]?.image?.alt ||
//                           selectedProduct?.name
//                         }
//                         className="w-30 h-34 aspect-auto object-cover rounded-md"
//                       />


//                       <div className="flex flex-col justify-between flex-1">

//                         <div>

//                           <p className="font-medium text-xl text-[#355454]">
//                             {selectedProduct?.heading}
//                           </p>


//                           <p className="font-semibold text-lg text-[#0A5200]">

//                             ₹
//                             {
//                               selectedProduct
//                                 ?.sizes?.[0]
//                                 ?.price
//                                 ?.sellingPrice
//                             }

//                             {selectedProduct
//                               ?.sizes?.[0]
//                               ?.price
//                               ?.mrp &&
//                               selectedProduct
//                                 ?.sizes?.[0]
//                                 ?.price
//                                 ?.mrp !==
//                                 selectedProduct
//                                   ?.sizes?.[0]
//                                   ?.price
//                                   ?.sellingPrice && (
//                                 <span className="line-through text-gray-400 text-sm ml-2">

//                                   ₹
//                                   {
//                                     selectedProduct
//                                       ?.sizes?.[0]
//                                       ?.price
//                                       ?.mrp
//                                   }

//                                 </span>
//                               )}

//                           </p>


//                           {selectedProduct?.labels?.length > 0 && (

//                             <span className="ml-2 inline-block text-[10px] bg-yellow-100 text-yellow-800 rounded px-2 py-0.5">
//                               {selectedProduct.labels[0]}
//                             </span>

//                           )}

//                         </div>


//                         <div className="flex items-center justify-between mt-3">

//                           {/* Add To Cart */}

//                           <button
//                             type="button"
//                             className="relative px-5 py-2.5 bg-[#61b9b9] text-white font-medium rounded-lg shadow-md transition-all duration-300 ease-out hover:bg-[#3d6d6d] hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleAddToCart(
//                                 selectedProduct
//                               );
//                             }}
//                           >
//                             Add To Cart
//                           </button>


//                           {/* See Product */}

//                           <button
//                             type="button"
//                             onClick={() =>
//                               router.push(
//                                 `/product/${selectedProduct?.slug}`
//                               )
//                             }
//                             className="py-2 px-3 border flex items-center justify-center brownShade bg-[#61b9b9] text-white font-medium rounded-lg shadow-md transition-all duration-300 ease-out hover:bg-[#3d6d6d] hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer mr-2"
//                           >
//                             See Product
//                           </button>

//                         </div>

//                       </div>

//                     </div>


//                     {/* USP Tags */}

//                     <div className="flex my-3 flex-wrap text-xs bodyText gap-2 justify-center pt-2">

//                       {selectedProduct?.usps?.map(
//                         (usp, idx) => (

//                           <div
//                             key={`usp-${idx}`}
//                             className="flex items-start gap-2 mb-2"
//                           >

//                             <img
//                               src={Tick.src}
//                               alt="tick"
//                               className="w-4 h-4 mt-1"
//                             />

//                             <span className="text-sm text-[#355454]">
//                               {usp.title}
//                             </span>

//                           </div>

//                         )
//                       )}

//                     </div>

//                   </div>


//                   {/* Scrollable Bottom Section */}

//                   <div className="overflow-y-auto flex-1 px-8 pb-8 pt-4">

//                     <section className="grid gap-6 bodyText text-sm md:text-base">

//                       {/* Super Ingredients */}

//                       {selectedProduct?.superIngredients && (

//                         <div>

//                           <h3 className="font-medium text-[#355454] mb-1">
//                             Super Ingredients
//                           </h3>

//                           {selectedProduct.superIngredients.map(
//                             (ingredient, index) => (

//                               <p
//                                 className="bodyText"
//                                 key={index}
//                               >
//                                 {ingredient.name}
//                               </p>

//                             )
//                           )}

//                         </div>

//                       )}


//                       {/* Core Ingredients */}

//                       {selectedProduct?.ingredients && (

//                         <div>

//                           <h3 className="font-medium text-[#355454] mb-1">
//                             Core Ingredients
//                           </h3>

//                           <p className="bodyText">
//                             {selectedProduct.ingredients?.join(
//                               ", "
//                             )}
//                           </p>

//                         </div>

//                       )}


//                       {/* Suitable For */}

//                       <div className="flex justify-between">

//                         {selectedProduct?.skinType && (

//                           <div>

//                             <h3 className="font-medium text-[#355454] mb-1">
//                               Suitable For
//                             </h3>

//                             <p className="bodyText">
//                               {selectedProduct.skinType}
//                             </p>

//                           </div>

//                         )}

//                       </div>

//                     </section>

//                   </div>

//                 </div>

//               </div>


//               {/* Mobile Product Card */}

//               <div
//                 onClick={() =>
//                   router.push(
//                     `/product/${selectedProduct?.slug}`
//                   )
//                 }
//                 className="absolute bottom-0 left-0 right-0 bg-white/70 mx-2 mb-2 backdrop-blur-sm rounded-xl p-2 flex md:hidden justify-between items-center gap-2 shadow-md z-10"
//               >

//                 <div className="flex gap-2">

//                   <img
//                     src={
//                       selectedProduct?.sizes?.[0]?.image?.url
//                     }
//                     alt={
//                       selectedProduct?.sizes?.[0]?.image?.alt
//                     }
//                     className="w-12 h-12 object-contain rounded-md border"
//                   />


//                   <div className="flex flex-col">

//                     <p className="text-sm font-medium text-[#355454] truncate max-w-[180px]">
//                       {selectedProduct?.heading}
//                     </p>


//                     <div className="flex items-center gap-2">

//                       <span className="text-green-600 font-semibold">

//                         ₹
//                         {
//                           selectedProduct
//                             ?.sizes?.[0]
//                             ?.price
//                             ?.sellingPrice
//                         }

//                       </span>


//                       {selectedProduct
//                         ?.sizes?.[0]
//                         ?.price
//                         ?.mrp &&
//                         selectedProduct
//                           ?.sizes?.[0]
//                           ?.price
//                           ?.mrp !==
//                           selectedProduct
//                             ?.sizes?.[0]
//                             ?.price
//                             ?.sellingPrice && (

//                           <span className="line-through text-gray-400 text-sm ml-2">

//                             ₹
//                             {
//                               selectedProduct
//                                 ?.sizes?.[0]
//                                 ?.price
//                                 ?.mrp
//                             }

//                           </span>

//                         )}

//                     </div>

//                   </div>

//                 </div>


//                 <div>

//                   <button
//                     type="button"
//                     className="py-2 bg-[#8C6C54] hover:bg-[#3d2622] hover:scale-105 text-white rounded px-4"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleAddToCart(
//                         selectedProduct
//                       );
//                     }}
//                   >
//                     Add To Cart
//                   </button>

//                 </div>

//               </div>

//             </div>

//           </div>

//         )}

//       </section>
//     </>
//   );
// };

// export default VideoTestimonial;
"use client";

import React, { useRef, useState } from "react";

import HeadingHighlight from "@/components/ui/HeadingHighlight";

import profile1 from "@/assets/images/profile/profileImg4.png";
import profile2 from "@/assets/images/profile/profileImg5.png";
import profile3 from "@/assets/images/profile/profileImg6.png";

import ArrowButton from "@/components/ui/ArrowButton";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import { Navigation } from "swiper/modules";

import Tick from "@/assets/svg/Tick.svg";

import { fetchProductBySlug } from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/navigation";

import { Eye } from "lucide-react";

import { addToCart } from "@/redux/slices/cartSlice";

import featuredWithVideos from "@/utils/featuredVedioData";

import ScrollLock from "@/utils/ScrollLock";

const VideoTestimonial = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { selectedProduct } = useSelector(
    (state) => state.product
  );

  const [loading, setLoading] = useState(false);
  const [activeVedio, setActiveVedio] = useState(null);

  const swiperRef = useRef(null);

  const openVideo = async (data) => {
    try {
      setLoading(true);

      await dispatch(
        fetchProductBySlug(data.slug)
      ).unwrap();

      setActiveVedio(data.video);
    } catch (error) {
      console.error(
        "Failed to fetch product by slug:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const closeVideo = () => {
    setActiveVedio(null);
  };

  const handleAddToCart = async (product) => {
    if (!product) return;

    const quantity = 1;
    const sku = product?.sizes?.[0]?.sku;

    if (!sku) return;

    try {
      await dispatch(
        addToCart({
          product,
          quantity,
          sku,
        })
      ).unwrap();

      setActiveVedio(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {activeVedio && <ScrollLock />}

      <section
        className="
          mx-auto w-full max-w-[1440px]
          px-4
          sm:px-6
          md:px-8
          lg:px-10
          xl:px-12
          2xl:px-0
          sectionMargin
        "
      >
        {/* ================= HEADER ================= */}

        <div className="w-full">
          <HeadingHighlight
            text="Stories We Have"
            highlight="Reviews"
          />

          <p
            className="
              bodyText
              mt-2
              max-w-[600px]
              text-sm
              leading-6

              sm:text-base
              sm:leading-7

              lg:text-[17px]
            "
          >
            Unfiltered experiences from those who trusted
            Nythng & chose beyond average.
          </p>

          {/* Profiles + Arrows */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-between
              gap-4
              sm:mt-6
            "
          >
            {/* Profiles */}

            <div
              className="
                flex
                items-center
                -space-x-4

                sm:-space-x-5
                md:-space-x-4
              "
            >
              <img
                className="
                  h-11 w-11
                  rounded-full
                  border-2 border-white
                  object-cover

                  sm:h-14 sm:w-14
                  md:h-16 md:w-16
                "
                src={profile1.src}
                alt="User 1"
              />

              <img
                className="
                  h-11 w-11
                  rounded-full
                  border-2 border-white
                  object-cover

                  sm:h-14 sm:w-14
                  md:h-16 md:w-16
                "
                src={profile2.src}
                alt="User 2"
              />

              <img
                className="
                  h-11 w-11
                  rounded-full
                  border-2 border-white
                  object-cover

                  sm:h-14 sm:w-14
                  md:h-16 md:w-16
                "
                src={profile3.src}
                alt="User 3"
              />

              <div
                className="
                  flex
                  h-11 w-11
                  items-center
                  justify-center
                  rounded-full
                  border-2 border-white
                  bg-[#3d6d6d]
                  text-sm text-white

                  sm:h-14 sm:w-14
                  sm:text-base

                  md:h-16 md:w-16
                  md:text-xl
                "
              >
                20+
              </div>
            </div>

            {/* Navigation */}

            <div className="flex shrink-0 gap-2 sm:gap-3 md:gap-4">
              <ArrowButton
                color="#70A3A1"
                direction="prev"
                onClick={() =>
                  swiperRef.current?.slidePrev()
                }
              />

              <ArrowButton
                color="#70A3A1"
                direction="next"
                onClick={() =>
                  swiperRef.current?.slideNext()
                }
              />
            </div>
          </div>
        </div>

        {/* ================= SLIDER ================= */}

        <Swiper
          onSwiper={(swiper) =>
            (swiperRef.current = swiper)
          }
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            480: {
              slidesPerView: 1.35,
              spaceBetween: 16,
            },

            640: {
              slidesPerView: 2,
              spaceBetween: 18,
            },

            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },

            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },

            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation]}
          className="
            mySwiper
            mt-7
            sm:mt-8
            md:mt-10
          "
        >
          {featuredWithVideos.map((data, i) => (
            <SwiperSlide key={i}>
              <div
                className="
                  group
                  relative
                  w-full
                  cursor-pointer
                  overflow-hidden
                  rounded-xl
                "
                onClick={() => openVideo(data)}
              >
                {/* VIDEO */}

                <video
                  src={data.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="
                    h-[360px]
                    w-full
                    rounded-xl
                    object-cover

                    sm:h-[400px]

                    md:h-[420px]

                    lg:h-[440px]

                    xl:h-[460px]
                  "
                />

                {/* PRODUCT CARD */}

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    z-10
                    mx-2
                    mb-2
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-white/75
                    p-2
                    shadow-md
                    backdrop-blur-sm
                  "
                >
                  <img
                    src={
                      data?.sizes?.[0]?.image?.url
                    }
                    alt={
                      data?.sizes?.[0]?.image?.alt ||
                      data?.heading
                    }
                    className="
                      h-10 w-10
                      shrink-0
                      rounded-md
                      border
                      object-contain

                      sm:h-12 sm:w-12
                    "
                  />

                  <div className="min-w-0 flex-1">
                    <p
                      className="
                        truncate
                        primaryText
                        text-sm
                        font-medium

                        sm:text-base
                        lg:text-lg
                      "
                    >
                      {data.heading}
                    </p>

                    <p
                      className="
                        bodyText
                        truncate
                        text-xs

                        sm:text-sm
                      "
                    >
                      {data.subheading}
                    </p>
                  </div>
                </div>

                {/* HOVER */}

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    z-20
                    flex
                    scale-95
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/10
                    p-4
                    opacity-0
                    backdrop-blur-xl
                    transition-all
                    duration-500

                    group-hover:pointer-events-auto
                    group-hover:scale-100
                    group-hover:opacity-100
                  "
                >
                  <button
                    type="button"
                    className="
                      flex
                      h-10 w-10
                      items-center
                      justify-center
                      rounded-full
                      bg-white
                      text-[#355454]
                      shadow
                      transition

                      hover:scale-105
                    "
                    onClick={(e) => {
                      e.stopPropagation();
                      openVideo(data);
                    }}
                  >
                    <Eye size={20} />
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* ================= VIDEO MODAL ================= */}

      {activeVedio && (
        <div
          className="
            fixed
            inset-0
            z-[999]
            flex
            items-center
            justify-center
            bg-black/50
            p-3

            sm:p-5
            md:p-8
            backdrop-blur-sm
          "
          onClick={closeVideo}
        >
          <div
            className="
              relative
              flex
              w-full
              max-w-[1200px]
              max-h-[95vh]
              overflow-hidden
              rounded-2xl
              bg-[#70a3a1]
              shadow-2xl

              md:rounded-3xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* CLOSE */}

            <button
              type="button"
              className="
                absolute
                right-3 top-3
                z-30
                flex
                h-8 w-8
                items-center
                justify-center
                rounded-full
                bg-[#355454]
                text-white
                shadow-md
                transition

                hover:bg-[#61b9b9]

                md:right-5
                md:top-5
              "
              onClick={closeVideo}
            >
              ✕
            </button>

            {/* ================= MAIN MODAL ================= */}

            <div
              className="
                flex
                h-[80vh]
                w-full
                flex-col

                md:flex-row
              "
            >
              {/* VIDEO SIDE */}

              <div
                className="
                  relative
                  h-full
                  w-full
                  overflow-hidden

                  md:w-[42%]
                "
              >
                <video
                  src={activeVedio}
                  autoPlay
                  controls
                  loop
                  playsInline
                  className="
                    h-full
                    w-full
                    object-cover

                    md:p-3
                    md:rounded-3xl
                  "
                />
              </div>

              {/* ================= DESKTOP PRODUCT DETAILS ================= */}

              <div
                className="
                  hidden
                  min-w-0
                  flex-1
                  flex-col
                  overflow-hidden
                  bg-white

                  md:flex
                  md:my-3
                  md:mr-3
                  md:rounded-xl
                "
              >
                {/* HEADER */}

                <div
                  className="
                    shrink-0
                    bg-white
                    px-5
                    pb-3
                    pt-5
                    shadow-sm

                    lg:px-8
                  "
                >
                  <div className="flex gap-4">
                    <img
                      src={
                        selectedProduct?.sizes?.[0]?.image?.url
                      }
                      alt={
                        selectedProduct?.sizes?.[0]?.image?.alt ||
                        selectedProduct?.name
                      }
                      className="
                        h-[110px]
                        w-[90px]
                        shrink-0
                        rounded-md
                        object-cover

                        lg:h-[136px]
                        lg:w-[120px]
                      "
                    />

                    <div className="min-w-0 flex flex-1 flex-col justify-between">
                      <div>
                        <p
                          className="
                            truncate
                            text-lg
                            font-medium
                            text-[#355454]

                            lg:text-xl
                          "
                        >
                          {selectedProduct?.heading}
                        </p>

                        <p
                          className="
                            mt-2
                            text-base
                            font-semibold
                            text-[#0A5200]

                            lg:text-lg
                          "
                        >
                          ₹
                          {
                            selectedProduct
                              ?.sizes?.[0]
                              ?.price
                              ?.sellingPrice
                          }

                          {selectedProduct
                            ?.sizes?.[0]
                            ?.price
                            ?.mrp &&
                            selectedProduct
                              ?.sizes?.[0]
                              ?.price
                              ?.mrp !==
                              selectedProduct
                                ?.sizes?.[0]
                                ?.price
                                ?.sellingPrice && (
                              <span className="ml-2 text-sm text-gray-400 line-through">
                                ₹
                                {
                                  selectedProduct
                                    ?.sizes?.[0]
                                    ?.price
                                    ?.mrp
                                }
                              </span>
                            )}
                        </p>

                        {selectedProduct?.labels?.length >
                          0 && (
                          <span className="mt-2 inline-block rounded bg-yellow-100 px-2 py-1 text-[10px] text-yellow-800">
                            {selectedProduct.labels[0]}
                          </span>
                        )}
                      </div>

                      {/* Buttons */}

                      <div className="mt-4 flex flex-wrap gap-2">
                        <button
                          type="button"
                          className="
                            rounded-lg
                            bg-[#61b9b9]
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-white
                            shadow-md
                            transition

                            hover:bg-[#3d6d6d]
                            hover:scale-105
                          "
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(
                              selectedProduct
                            );
                          }}
                        >
                          Add To Cart
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/product/${selectedProduct?.slug}`
                            )
                          }
                          className="
                            rounded-lg
                            bg-[#61b9b9]
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-white
                            shadow-md
                            transition

                            hover:bg-[#3d6d6d]
                            hover:scale-105
                          "
                        >
                          See Product
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* USP */}

                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                    {selectedProduct?.usps?.map(
                      (usp, idx) => (
                        <div
                          key={`usp-${idx}`}
                          className="flex items-center gap-2"
                        >
                          <img
                            src={Tick.src}
                            alt="tick"
                            className="h-4 w-4"
                          />

                          <span className="text-xs text-[#355454]">
                            {usp.title}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* SCROLL CONTENT */}

                <div
                  className="
                    flex-1
                    overflow-y-auto
                    px-5
                    py-5

                    lg:px-8
                    lg:py-6
                  "
                >
                  <div className="grid gap-5 bodyText text-sm">
                    {selectedProduct?.superIngredients && (
                      <div>
                        <h3 className="mb-2 font-medium text-[#355454]">
                          Super Ingredients
                        </h3>

                        {selectedProduct.superIngredients.map(
                          (ingredient, index) => (
                            <p
                              className="bodyText"
                              key={index}
                            >
                              {ingredient.name}
                            </p>
                          )
                        )}
                      </div>
                    )}

                    {selectedProduct?.ingredients && (
                      <div>
                        <h3 className="mb-2 font-medium text-[#355454]">
                          Core Ingredients
                        </h3>

                        <p className="bodyText">
                          {selectedProduct.ingredients.join(
                            ", "
                          )}
                        </p>
                      </div>
                    )}

                    {selectedProduct?.skinType && (
                      <div>
                        <h3 className="mb-2 font-medium text-[#355454]">
                          Suitable For
                        </h3>

                        <p className="bodyText">
                          {selectedProduct.skinType}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ================= MOBILE PRODUCT CARD ================= */}

            <div
              onClick={() =>
                selectedProduct?.slug &&
                router.push(
                  `/product/${selectedProduct.slug}`
                )
              }
              className="
                absolute
                bottom-2
                left-2
                right-2
                z-20
                flex
                items-center
                justify-between
                gap-2
                rounded-xl
                bg-white/90
                p-2
                shadow-lg
                backdrop-blur-sm

                md:hidden
              "
            >
              <div className="flex min-w-0 items-center gap-2">
                <img
                  src={
                    selectedProduct?.sizes?.[0]?.image?.url
                  }
                  alt={
                    selectedProduct?.sizes?.[0]?.image?.alt ||
                    selectedProduct?.name
                  }
                  className="
                    h-10 w-10
                    shrink-0
                    rounded-md
                    border
                    object-contain

                    sm:h-12
                    sm:w-12
                  "
                />

                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-[#355454] sm:text-sm">
                    {selectedProduct?.heading}
                  </p>

                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-sm font-semibold text-green-600">
                      ₹
                      {
                        selectedProduct
                          ?.sizes?.[0]
                          ?.price
                          ?.sellingPrice
                      }
                    </span>

                    {selectedProduct
                      ?.sizes?.[0]
                      ?.price
                      ?.mrp &&
                      selectedProduct
                        ?.sizes?.[0]
                        ?.price
                        ?.mrp !==
                        selectedProduct
                          ?.sizes?.[0]
                          ?.price
                          ?.sellingPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ₹
                          {
                            selectedProduct
                              ?.sizes?.[0]
                              ?.price
                              ?.mrp
                          }
                        </span>
                      )}
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="
                  shrink-0
                  rounded-lg
                  bg-[#61b9b9]
                  px-3
                  py-2
                  text-xs
                  text-white
                  transition

                  hover:bg-[#3d6d6d]
                  sm:px-4
                  sm:text-sm
                "
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(selectedProduct);
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Optional Loading */}
      {loading && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/20 backdrop-blur-sm">
          <div className="rounded-xl bg-white px-6 py-4 shadow-xl">
            Loading...
          </div>
        </div>
      )}
    </>
  );
};

export default VideoTestimonial;