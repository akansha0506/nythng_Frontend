"use client";

import { useEffect } from "react";
import Link from "next/link";
// import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  Droplet,
  Sparkles,
  ShieldCheck,
} from "lucide-react";


export default function HeroSection() {
//   const dispatch = useDispatch();

//   const allCategoryProduct = useSelector(
//     (state) => state.product.allCategoryProduct
//   );

//   useEffect(() => {
//     if (allCategoryProduct?.length) return;

//     dispatch(fetchAllCategoryProduct());
//   }, [dispatch, allCategoryProduct]);

  return (
    <>
      {/* Hero */}

      <section className="relative flex min-h-screen overflow-hidden">

        {/* Background Video */}

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="/videos/about_video.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay */}

        <div className="absolute inset-0 bg-[#ffffff00]" />

        {/* Hero Content */}

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center 
        justify-between gap-10 px-6 pt-8 sm:px-8 lg:flex-row lg:gap-12 lg:px-10">

          {/* Left */}

          {/* <div className="w-full space-y-6 text-left lg:max-w-2xl">

            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-widest text-[#2C4E52]/80 sm:text-sm">
                TARGETED SOLUTIONS.
                <br />
                LASTING IMPACT.
              </p>

              <div className="my-2 h-[2px] w-8 bg-[#2C4E52]/60" />
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal leading-[1.15] text-[#1e4f4f]">
              Nothing Extra,
              <br />
              <span className="inline-block text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl text-[#298393]">
                Everything Essential.
              </span>
            </h1>

            <p className="max-w-md text-sm font-medium leading-relaxed text-[#203639] sm:max-w-lg sm:text-base md:text-lg">
              Simplifying Skincare With Clarity, So That You Can
              Choose Anything Beyond Average. Empowering You To
              Choose Better And Unlock Your Best Self.
            </p>

            <div className="pt-2">
              <Link
                href="/shop"
                className="group inline-flex items-center gap-3 rounded-full bg-[#1e4f4f] px-6 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#153a3a]"
              >
                <span>Choose Clarity</span>

                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div> */}

          {/* Right Stats */}

        </div>
      </section>
    </>
  );
}



// "use client";

// import { useEffect } from "react";
// import Link from "next/link";
// // import { useDispatch, useSelector } from "react-redux";
// import {
//   ArrowRight,
//   Droplet,
//   Sparkles,
//   ShieldCheck,
// } from "lucide-react";
// import { useSelector } from "react-redux";
// import SecondaryButton from "@/components/ui/SecondaryButton";

// const stats = [
//   {
//     icon: Droplet,
//     value: "98%",
//     label: "Improved Hydration",
//   },
//   {
//     icon: Sparkles,
//     value: "95%",
//     label: "Better Skin Texture",
//   },
//   {
//     icon: ShieldCheck,
//     value: "93%",
//     label: "Stronger Skin Barrier",
//   },
// ];

// export default function HeroSection() {
//  const language = useSelector(
//     (state) => state.language.value
//   );


//   return (
//     <>
//       {/* Hero */}

//           <div className="relative h-[100vh] w-full overflow-hidden bg-[#A08E83]">

//         {/* Background Image */}
//         {/* <Image
//           src={bg}
//           alt="Skin analysis"
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover object-center"
//         /> */}
//         <video
//           src="/videos/skin-analysis.mp4"
//           autoPlay
//           loop
//           muted
//           playsInline
//           className="absolute inset-0 w-full h-full object-cover object-center"
//         />

//         {/* Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-[#74b8c2]/40 via-[#A08E83]/20 to-transparent" />

//         {/* Hero Content */}
//         <div className="relative z-10 flex h-full w-full items-center">

//           <div className="w-full px-8 md:w-[50%] md:px-12 lg:w-[45%] lg:px-16">

//             {/* Label */}
//             <p className="bodyText mb-3 inline-block rounded-full bg-white/70 px-4 py-1">
//               # SCIENCE + NATURE + YOU
//             </p>

//             {/* Heading */}
//             <h1
//               className={
//                 language === "en"
//                   ? "text-3xl text-[#1a4747] md:text-6xl"
//                   : "text-2xl leading-tight text-[#1a4747] md:text-3xl"
//               }
//             >
//               Nothing Extra
//             </h1>

//             <h1
//               className={
//                 language === "en"
//                   ? "text-3xl italic text-[#2a7879] md:text-5xl"
//                   : "text-2xl leading-tight text-[#2a7879] md:text-3xl"
//               }
//             >
//               Everything Essential
//             </h1>

//             {/* Description */}
//             <p className="bodyText mb-8 mt-4 w-[95%] font-medium">
//               Simplifying skincare with clarity, so you can choose better and unlock your best self.
//             </p>
            
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }