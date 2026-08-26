// "use client";

// import logo from "@/assets/svg/newLogo.png";
// import PlayVideo from "@/components/common/PlayVideo";
// import IngredientAccordionSection from "./IngredientAccordion";
// import { motion } from "framer-motion";

// const SmartIngredients = () => {
//   return (
//     <motion.section
//       className="flex flex-col md:flex-row items-start justify-center w-11/12 mx-auto gap-8 sectionMargin"
//       initial={{ opacity: 0, y: 80 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.2 }}
//       transition={{
//         duration: 0.8,
//         ease: "easeOut",
//       }}
//     >
//       {/* ================= Left Side ================= */}

//       <div className="w-full md:w-1/2">
//         {/* Desktop Heading */}
//         <div className="hidden md:block">
//           <h2 className="text-5xl primaryText">
//             Why do skin problems
//           </h2>

//           <span className="flex items-center mt-3 text-5xl primaryText">
//             fear

//             <img
//               src={logo.src}
//               alt="logo"
//               className="ml-3 h-14 w-auto"
//             />
//           </span>

//           <p className="xl:text-xl w-[70%] mt-4 mb-4 bodyText">
//             Because all our formulations are thoughtfully designed to target
//             real skin issues you face.
//           </p>
//         </div>

//         {/* Mobile Heading */}
//         <div className="md:hidden">
//           <h2 className="text-[42px] leading-[48px] primaryText">
//             Why do
//           </h2>

//           <h2 className="text-[42px] leading-[48px] primaryText">
//             skin problems
//           </h2>

//           <div className="flex items-center mt-2">
//             <span className="text-[42px] leading-[48px] primaryText">
//               fear
//             </span>

//             <img
//               src={logo.src}
//               alt="logo"
//               className="ml-3 h-10 w-auto"
//             />
//           </div>

//           <p className="bodyText text-lg leading-8 mt-5">
//             Because all our formulations are thoughtfully designed to target
//             real skin issues you face.
//           </p>
//         </div>

//         {/* Video */}
//         <div className="mt-6">
//           <PlayVideo />
//         </div>

//         {/* Description */}
//         <p className="bodyText text-base md:w-[70%] mt-5">
//           Discover the story behind our ingredients and how each one works to
//           elevate your glow.
//         </p>
//       </div>

//       {/* ================= Right Side ================= */}

//       <div className="w-full md:w-1/2">
//         <IngredientAccordionSection />
//       </div>
//     </motion.section>
//   );
// };

// export default SmartIngredients;

"use client";

import logo from "@/assets/svg/newLogo.png";
import PlayVideo from "@/components/common/PlayVideo";
import IngredientAccordionSection from "./IngredientAccordion";
import { motion } from "framer-motion";

const SmartIngredients = () => {
  return (
    <motion.section
      className="
        mx-auto flex w-full max-w-[1440px] flex-col items-start justify-center
        gap-8 px-4
        sm:px-6
        md:flex-row md:gap-8 md:px-8
        lg:gap-12 lg:px-10
        xl:gap-16 xl:px-12
        2xl:px-0
        sectionMargin
      "
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      {/* ================= LEFT SIDE ================= */}

      <div className="w-full md:w-1/2">
        {/* ================= DESKTOP / TABLET HEADING ================= */}

        <div className="hidden md:block">
          <h2
            className="
              primaryText
              text-[38px] leading-[1.1]
              lg:text-[44px]
              xl:text-5xl
              2xl:text-[58px]
            "
          >
            Why do skin problems
          </h2>

          <div className="mt-2 flex flex-wrap items-center gap-2 lg:mt-3 lg:gap-3">
            <span
              className="
                primaryText
                text-[38px] leading-[1.1]
                lg:text-[44px]
                xl:text-5xl
                2xl:text-[58px]
              "
            >
              fear
            </span>

            <img
              src={logo.src}
              alt="Nythng logo"
              className="
                h-auto w-[100px]
                lg:w-[120px]
                xl:w-[140px]
                2xl:w-[155px]
              "
            />
          </div>

          <p
            className="
              bodyText
              mt-4
              w-full max-w-[520px]
              text-[15px] leading-6
              lg:text-[17px] lg:leading-7
              xl:text-xl xl:leading-8
            "
          >
            Because all our formulations are thoughtfully designed to target
            real skin issues you face.
          </p>
        </div>

        {/* ================= MOBILE HEADING ================= */}

        <div className="md:hidden">
          <h2
            className="
              primaryText
              text-[32px] leading-[1.12]
              xs:text-[36px]
              sm:text-[42px]
            "
          >
            Why do
          </h2>

          <h2
            className="
              primaryText
              text-[32px] leading-[1.12]
              xs:text-[36px]
              sm:text-[42px]
            "
          >
            skin problems
          </h2>

          <div className="mt-2 flex items-center gap-2">
            <span
              className="
                primaryText
                text-[32px] leading-[1.12]
                xs:text-[36px]
                sm:text-[42px]
              "
            >
              fear
            </span>

            <img
              src={logo.src}
              alt="Nythng logo"
              className="
                h-auto
                w-[90px]
                xs:w-[105px]
                sm:w-[120px]
              "
            />
          </div>

          <p
            className="
              bodyText
              mt-5
              max-w-[520px]
              text-[15px] leading-7
              sm:text-lg sm:leading-8
            "
          >
            Because all our formulations are thoughtfully designed to target
            real skin issues you face.
          </p>
        </div>

        {/* ================= VIDEO ================= */}

        <div
          className="
            mt-6
            w-full
            max-w-[700px]
            md:mt-7
            lg:mt-8
          "
        >
          <PlayVideo />
        </div>

        {/* ================= DESCRIPTION ================= */}

        <p
          className="
            bodyText
            mt-5
            w-full
            max-w-[520px]
            text-[14px] leading-6
            sm:text-base sm:leading-7
            md:mt-6
            lg:text-[17px]
          "
        >
          Discover the story behind our ingredients and how each one works to
          elevate your glow.
        </p>
      </div>

      {/* ================= RIGHT SIDE ================= */}

      <div
        className="
          w-full
          md:w-1/2
          md:pt-2
          lg:pt-4
        "
      >
        <IngredientAccordionSection />
      </div>
    </motion.section>
  );
};

export default SmartIngredients;