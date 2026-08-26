// "use client";

// import {
//   Accordion,
//   AccordionItem,
//   AccordionTrigger,
//   AccordionContent,
// } from "@/components/ui/accordion";

// import LearnMoreButton from "@/components/ui/LearnMoreButton";
// import SecondaryButton from "@/components/ui/SecondaryButton";

// import { useState } from "react";
// import Image from "next/image";

// import smartIndgreadient from "@/assets/images/landingPage/smart indgreadient.png";

// export default function IngredientAccordionSection() {
//   const [openItem, setOpenItem] = useState("");

//   const handleAccordionToggle = (itemId) => {
//     setOpenItem(openItem === itemId ? "" : itemId);
//   };

//   const data = [
//     {
//       id: "1",
//       title: "Advanced Nano-Vesicles Technology",
//       content: (
//         <>
//           Our serums use advanced nano-vesicles, delivering actives deep into
//           skin for rare precision, unmatched absorption, and transformative
//           results.

//           <br />
//           <br />

//           Boosts hydration retention by 2x
//           <br />
//           Contains Hyaluronic Acid + Niacinamide
//           <br />
//           Perfect for dry or dull skin types
//         </>
//       ),
//     },
//     {
//       id: "2",
//       title: "Proven Formulas, Real Results",
//       content: (
//         <>
//           Our dermatologist-tested products are backed by science and loved by
//           users.

//           <br />
//           <br />

//           Clinically validated in independent trials
//           <br />
//           Designed to target real skin concerns
//           <br />
//           Formulated for sensitive skin
//         </>
//       ),
//     },
//     {
//       id: "3",
//       title: "Planet-Conscious Beauty",
//       content: (
//         <>
//           Sustainability is at the core of nythng. We use clean, vegan, and
//           cruelty-free ingredients.

//           <br />
//           <br />

//           Eco-friendly packaging
//           <br />
//           No microplastics or harmful chemicals
//           <br />
//           100% cruelty-free & vegan
//         </>
//       ),
//     },
//   ];

//   return (
//     <>
//       {/* ================= Desktop ================= */}

//       <div className="hidden md:flex flex-row justify-center items-start gap-8 h-50 pb-6">
//         <div className="w-1/2 flex flex-col gap-4 justify-between items-start h-full">
//           <p className="xl:text-xl bodyText">
//             We deliver science-backed solutions your skin can trust.
//             Ready to solve your skin struggles? Start with our shop.
//           </p>

//           <LearnMoreButton to="/Blogs" />
//         </div>

//         <div className="h-full w-1/2 overflow-hidden rounded-2xl">
//           <Image
//             src={smartIndgreadient}
//             alt=""
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>

//       {/* ================= Mobile ================= */}

//       <div className="md:hidden mb-6">
//         <div className="rounded-[28px] bg-[#F6FBFB] border border-[#E6ECEC] shadow-sm p-5">
//           <div className="flex gap-4 items-center">
//             <div className="flex-1">
//               <p className="bodyText text-[15px] leading-8">
//                 We deliver science-backed solutions your skin can trust.
//                 Ready to solve your skin struggles? Start with our shop.
//               </p>

//               <div className="mt-5">
//                 <LearnMoreButton to="/Blogs" />
//               </div>
//             </div>

//             <div className="w-28 h-32 rounded-2xl overflow-hidden shrink-0">
//               <Image
//                 src={smartIndgreadient}
//                 alt=""
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ================= Accordion ================= */}

//       <Accordion
//         type="single"
//         collapsible
//         value={openItem}
//         onValueChange={handleAccordionToggle}
//         className="space-y-3 md:space-y-0"
//       >
//         {data.map((item, index) => (
//           <AccordionItem
//             key={item.id}
//             value={item.id}
//             className={`
//               bg-white
//               border
//               border-[#E5E7EB]
//               rounded-2xl
//               shadow-sm
//               md:shadow-none
//               md:rounded-none
//               md:border-x-0
//               md:border-b
//               md:border-gray-300
//               ${index === 0 ? "md:border-t" : ""}
//             `}
//           >
//             <AccordionTrigger
//               className="px-5 py-5 text-left font-normal primaryText hover:no-underline"
//               accordionIcon="bg-[#61b9b9] text-white!"
//             >
//               <div className="flex w-full justify-between items-center text-lg md:text-xl">
//                 {item.title}
//               </div>
//             </AccordionTrigger>

//             <AccordionContent className="bodyText text-sm md:text-base px-5 pb-5">
//               {item.content}
//             </AccordionContent>
//           </AccordionItem>
//         ))}
//       </Accordion>

//       {/* ================= Button ================= */}

//       <div className="mt-8 flex justify-center md:justify-end">
//         <SecondaryButton text="Our Story" to="/about" />
//       </div>
//     </>
//   );
// }

"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import LearnMoreButton from "@/components/ui/LearnMoreButton";
import SecondaryButton from "@/components/ui/SecondaryButton";

import { useState } from "react";
import Image from "next/image";

import smartIndgreadient from "@/assets/images/landingPage/smart indgreadient.png";

export default function IngredientAccordionSection() {
  const [openItem, setOpenItem] = useState("");

  const handleAccordionToggle = (itemId) => {
    setOpenItem((current) => (current === itemId ? "" : itemId));
  };

  const data = [
    {
      id: "1",
      title: "Advanced Nano-Vesicles Technology",
      content: (
        <>
          Our serums use advanced nano-vesicles, delivering actives deep into
          skin for rare precision, unmatched absorption, and transformative
          results.
          <br />
          <br />
          Boosts hydration retention by 2x
          <br />
          Contains Hyaluronic Acid + Niacinamide
          <br />
          Perfect for dry or dull skin types
        </>
      ),
    },
    {
      id: "2",
      title: "Proven Formulas, Real Results",
      content: (
        <>
          Our dermatologist-tested products are backed by science and loved by
          users.
          <br />
          <br />
          Clinically validated in independent trials
          <br />
          Designed to target real skin concerns
          <br />
          Formulated for sensitive skin
        </>
      ),
    },
    {
      id: "3",
      title: "Planet-Conscious Beauty",
      content: (
        <>
          Sustainability is at the core of nythng. We use clean, vegan, and
          cruelty-free ingredients.
          <br />
          <br />
          Eco-friendly packaging
          <br />
          No microplastics or harmful chemicals
          <br />
          100% cruelty-free & vegan
        </>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* ================= TOP INTRO SECTION ================= */}

      <div
        className="
          mb-6
          flex flex-col
          gap-5

          sm:mb-8
          sm:gap-6

          md:flex-row
          md:items-stretch
          md:gap-6

          lg:gap-8
          xl:mb-10
        "
      >
        {/* ================= TEXT SIDE ================= */}

        <div
          className="
            order-1
            flex w-full
            flex-col
            justify-between

            md:w-1/2
            md:min-h-[180px]

            lg:min-h-[200px]
            xl:min-h-[220px]
          "
        >
          <p
            className="
              bodyText
              text-[14px]
              leading-6

              sm:text-[15px]
              sm:leading-7

              md:text-[15px]

              lg:text-[17px]
              lg:leading-7

              xl:text-xl
              xl:leading-8
            "
          >
            We deliver science-backed solutions your skin can trust. Ready to
            solve your skin struggles? Start with our shop.
          </p>

          <div
            className="
              mt-5
              md:mt-6
              lg:mt-8
            "
          >
            <LearnMoreButton to="/Blogs" />
          </div>
        </div>

        {/* ================= IMAGE SIDE ================= */}

        <div
          className="
            order-2
            relative
            w-full
            overflow-hidden
            rounded-[20px]

            h-[180px]

            sm:h-[220px]
            sm:rounded-[24px]

            md:h-auto
            md:min-h-[180px]
            md:w-1/2

            lg:min-h-[200px]
            xl:min-h-[220px]
            xl:rounded-2xl
          "
        >
          <Image
            src={smartIndgreadient}
            alt="Smart ingredients"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* ================= ACCORDION ================= */}

      <Accordion
        type="single"
        collapsible
        value={openItem}
        onValueChange={setOpenItem}
        className="
          w-full
          space-y-3

          md:space-y-0
        "
      >
        {data.map((item, index) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className={`
              overflow-hidden
              bg-white
              border
              border-[#E5E7EB]
              rounded-[18px]
              shadow-sm

              md:rounded-none
              md:shadow-none
              md:border-x-0
              md:border-b
              md:border-[#D7DFE0]

              ${
                index === 0
                  ? "md:border-t"
                  : ""
              }
            `}
          >
            <AccordionTrigger
              className="
                w-full
                px-4
                py-4
                text-left
                font-normal
                hover:no-underline

                sm:px-5
                sm:py-5

                md:px-2
                md:py-6

                lg:px-3
              "
              accordionIcon="bg-[#61b9b9] text-white!"
            >
              <div
                className="
                  flex
                  w-full
                  items-center
                  pr-2

                  text-[15px]
                  leading-6

                  sm:text-lg

                  md:text-[17px]

                  lg:text-xl
                "
              >
                <span className="primaryText">
                  {item.title}
                </span>
              </div>
            </AccordionTrigger>

            <AccordionContent
              className="
                bodyText
                px-4
                pb-5

                text-[13px]
                leading-6

                sm:px-5
                sm:text-[14px]
                sm:leading-7

                md:px-2
                md:pb-6
                md:text-[15px]

                lg:px-3
                lg:text-base
                lg:leading-7
              "
            >
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {/* ================= BOTTOM BUTTON ================= */}

      <div
        className="
          mt-6
          flex
          justify-center

          sm:mt-7

          md:mt-8
          md:justify-end
        "
      >
        <SecondaryButton text="Our Story" to="/about" />
      </div>
    </div>
  );
}