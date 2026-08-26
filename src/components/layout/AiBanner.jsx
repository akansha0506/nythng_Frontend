// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import Image from "next/image";

// import product from "@/assets/images/new_images/productBg.png";

// const AiBanner = () => {
//   const [scrollProgress, setScrollProgress] = useState(0);
//   const sectionRef = useRef(null);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!sectionRef.current) return;

//       const rect = sectionRef.current.getBoundingClientRect();
//       const windowHeight = window.innerHeight;

//       if (rect.top < windowHeight && rect.bottom > 0) {
//         const relativeScroll = windowHeight - rect.top;
//         setScrollProgress(relativeScroll);
//       }
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll();

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   // Column 1: Fast Downward Scroll
//   const col1Style = {
//     transform: `translate3d(0, ${scrollProgress * 0.45}px, 0)`,
//     transition: "transform 0.05s ease-out",
//     willChange: "transform",
//   };

//   // Column 2: Fast Upward Scroll
//   const col2Style = {
//     transform: `translate3d(0, ${-scrollProgress * 0.45}px, 0)`,
//     transition: "transform 0.05s ease-out",
//     willChange: "transform",
//   };

//   const images = [product, product, product];

//   return (
//     <section
//       ref={sectionRef}
//       className="w-11/12 mx-auto my-12 overflow-hidden rounded-3xl"
//     >
//       <div className="relative w-full bg-[#3A8B88] min-h-[550px] md:min-h-[620px] flex items-center p-8 md:p-16 overflow-hidden">

//         {/* Background - 2 Columns */}
//         <div
//           className="absolute -top-[50%] -right-[12%] md:-right-[6%] flex justify-end gap-5 md:gap-7 pointer-events-none -rotate-12 z-0"
//           aria-hidden="true"
//         >
//           {/* Column 1 */}
//           <div
//             className="flex flex-col gap-5 md:gap-7 -mt-60 w-[170px] sm:w-[210px] md:w-[240px]"
//             style={col1Style}
//           >
//             {[...images, ...images, ...images, ...images].map((img, i) => (
//               <div
//                 key={`col1-${i}`}
//                 className="relative w-full h-44 sm:h-52 md:h-64 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-sm"
//               >
//                 <Image
//                   src={img}
//                   alt="Product"
//                   fill
//                   sizes="(max-width: 640px) 170px, (max-width: 768px) 210px, 240px"
//                   className="object-cover"
//                 />

//                 <div className="absolute inset-0 bg-[#3A8B88]/25 mix-blend-multiply" />
//               </div>
//             ))}
//           </div>

//           {/* Column 2 */}
//           <div
//             className="flex flex-col gap-5 md:gap-7 w-[170px] sm:w-[210px] md:w-[240px]"
//             style={col2Style}
//           >
//             {[...images, ...images, ...images, ...images].map((img, i) => (
//               <div
//                 key={`col2-${i}`}
//                 className="relative w-full h-44 sm:h-52 md:h-64 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-sm"
//               >
//                 <Image
//                   src={img}
//                   alt="Product"
//                   fill
//                   sizes="(max-width: 640px) 170px, (max-width: 768px) 210px, 240px"
//                   className="object-cover"
//                 />

//                 <div className="absolute inset-0 bg-[#3A8B88]/25 mix-blend-multiply" />
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Foreground Content */}
//         <div className="w-full md:w-1/2 flex flex-col items-start text-white z-10 relative">
//           <p className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/80 mb-3">
//             Skincare Simplified
//           </p>

//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">
//             Simplify your{" "}
//             <br className="hidden sm:inline" />
//             skincare.
//           </h2>

//           <p className="text-base sm:text-lg text-white/90 font-normal leading-relaxed mb-2">
//             Complete your routine with our Oil Cleanser, Lipid Serum, and
//             Hyvia® Crème.
//           </p>

//           <p className="text-sm sm:text-base font-bold text-white mb-8 tracking-wide">
//             CLEANSE. TREAT. HYDRATE. Twice daily.
//           </p>

//           <Link
//             href="/skin-quiz"
//             className="group inline-flex items-center gap-3 bg-white text-[#3A8B88] hover:bg-slate-100 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 shadow-md hover:-translate-y-0.5 hover:shadow-lg"
//           >
//             <span>LEARN MORE</span>

//             <svg
//               className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 stroke-[#3A8B88]"
//               viewBox="0 0 21 20"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M3 10H18M18 10L12.1667 4.16675M18 10L12.1667 15.8334"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AiBanner;
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

import product from "@/assets/images/new_images/productBg.png";

const AiBanner = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || ticking.current) return;

      ticking.current = true;

      requestAnimationFrame(() => {
        const rect =
          sectionRef.current.getBoundingClientRect();

        const windowHeight = window.innerHeight;

        if (
          rect.top < windowHeight &&
          rect.bottom > 0
        ) {
          const relativeScroll =
            windowHeight - rect.top;

          setScrollProgress(relativeScroll);
        }

        ticking.current = false;
      });
    };

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* ===============================
     PARALLAX COLUMNS
  =============================== */

  const col1Style = {
    transform: `translate3d(0, ${
      scrollProgress * 0.38
    }px, 0)`,
    willChange: "transform",
  };

  const col2Style = {
    transform: `translate3d(0, ${
      -scrollProgress * 0.38
    }px, 0)`,
    willChange: "transform",
  };

  const images = [product, product, product];

  const repeatedImages = [
    ...images,
    ...images,
    ...images,
    ...images,
  ];

  return (
    <section
      ref={sectionRef}
      className="
        mx-auto
        my-8
        w-[calc(100%-24px)]

        sm:my-10
        sm:w-11/12

        md:my-12

        lg:max-w-[1440px]

        overflow-hidden
        rounded-[22px]

        sm:rounded-3xl
      "
    >
      <div
        className="
          relative
          flex
          min-h-[520px]
          w-full
          items-center
          overflow-hidden
          bg-[#3A8B88]

          px-5
          py-10

          sm:min-h-[560px]
          sm:px-8
          sm:py-12

          md:min-h-[600px]
          md:px-12
          md:py-14

          lg:min-h-[620px]
          lg:px-16
        "
      >
        {/* ===============================
            BACKGROUND GRADIENT OVERLAY
        =============================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[1]
            bg-gradient-to-r
            from-[#3A8B88]
            via-[#3A8B88]/95
            to-[#3A8B88]/30

            md:to-transparent
          "
        />

        {/* ===============================
            BACKGROUND PRODUCT COLUMNS
        =============================== */}

        <div
          className="
            pointer-events-none
            absolute
            z-[2]
            flex
            rotate-[-12deg]
            justify-end

            gap-3

            -top-[35%]
            -right-[45%]

            sm:gap-4
            sm:-right-[25%]

            md:gap-6
            md:-top-[45%]
            md:-right-[12%]

            lg:gap-7
            lg:-right-[6%]

            xl:-right-[3%]
          "
          aria-hidden="true"
        >
          {/* ================= COLUMN 1 ================= */}

          <div
            className="
              flex
              w-[115px]
              flex-col
              gap-3
              -mt-24

              sm:w-[160px]
              sm:gap-4
              sm:-mt-40

              md:w-[210px]
              md:gap-6
              md:-mt-52

              lg:w-[240px]
              lg:gap-7
              lg:-mt-60
            "
            style={col1Style}
          >
            {repeatedImages.map((img, i) => (
              <div
                key={`col1-${i}`}
                className="
                  relative
                  h-[125px]
                  w-full
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  shadow-xl
                  backdrop-blur-sm

                  sm:h-[170px]
                  sm:rounded-2xl

                  md:h-[220px]
                  md:rounded-3xl

                  lg:h-64
                  lg:shadow-2xl
                "
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  sizes="
                    (max-width: 480px) 115px,
                    (max-width: 640px) 160px,
                    (max-width: 1024px) 210px,
                    240px
                  "
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-[#3A8B88]/25 mix-blend-multiply" />
              </div>
            ))}
          </div>

          {/* ================= COLUMN 2 ================= */}

          <div
            className="
              flex
              w-[115px]
              flex-col
              gap-3

              sm:w-[160px]
              sm:gap-4

              md:w-[210px]
              md:gap-6

              lg:w-[240px]
              lg:gap-7
            "
            style={col2Style}
          >
            {repeatedImages.map((img, i) => (
              <div
                key={`col2-${i}`}
                className="
                  relative
                  h-[125px]
                  w-full
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/20
                  bg-white/10
                  shadow-xl
                  backdrop-blur-sm

                  sm:h-[170px]
                  sm:rounded-2xl

                  md:h-[220px]
                  md:rounded-3xl

                  lg:h-64
                  lg:shadow-2xl
                "
              >
                <Image
                  src={img}
                  alt=""
                  fill
                  sizes="
                    (max-width: 480px) 115px,
                    (max-width: 640px) 160px,
                    (max-width: 1024px) 210px,
                    240px
                  "
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-[#3A8B88]/25 mix-blend-multiply" />
              </div>
            ))}
          </div>
        </div>

        {/* ===============================
            FOREGROUND CONTENT
        =============================== */}

        <div
          className="
            relative
            z-10
            flex
            w-full
            flex-col
            items-start
            text-white

            md:w-[60%]

            lg:w-1/2
          "
        >
          {/* Small Heading */}

          <p
            className="
              mb-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-white/80

              sm:text-xs

              md:text-sm
            "
          >
            Skincare Simplified
          </p>

          {/* Main Heading */}

          <h2
            className="
              mb-4
              text-[32px]
              font-bold
              leading-[1.1]

              xs:text-[36px]

              sm:text-4xl

              md:text-[46px]

              lg:text-5xl

              xl:text-[58px]
            "
          >
            Simplify your

            <br className="hidden sm:block" />

            skincare.
          </h2>

          {/* Description */}

          <p
            className="
              mb-3
              max-w-[500px]
              text-sm
              leading-relaxed
              text-white/90

              sm:text-base

              md:text-lg
            "
          >
            Complete your routine with our Oil Cleanser,
            Lipid Serum, and Hyvia® Crème.
          </p>

          {/* Routine */}

          <p
            className="
              mb-7
              text-xs
              font-bold
              tracking-wide
              text-white

              sm:text-sm

              md:mb-8

              lg:text-base
            "
          >
            CLEANSE. TREAT. HYDRATE. Twice daily.
          </p>

          {/* Button */}

          <Link
            href="/skin-insights"
            className="
              group
              inline-flex
              items-center
              gap-3
              rounded-full
              bg-white
              px-6
              py-3
              text-[11px]
              font-bold
              tracking-wider
              text-[#3A8B88]
              shadow-md
              transition-all
              duration-300

              hover:-translate-y-0.5
              hover:bg-slate-100
              hover:shadow-lg

              sm:px-8
              sm:py-3.5
              sm:text-sm
            "
          >
            <span>LEARN MORE</span>

            <svg
              className="
                h-4
                w-4
                stroke-[#3A8B88]
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 10H18M18 10L12.1667 4.16675M18 10L12.1667 15.8334"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AiBanner;