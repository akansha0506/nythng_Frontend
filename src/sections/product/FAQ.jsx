"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

function Faq({ faqData }) {
  const container = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="w-full text-white py-8 md:py-20 px-5 md:px-10 bg-[#79b0b8db] mt-30">
      <motion.div
        className="max-w-4xl mx-auto flex flex-col md:flex-row md:gap-12 justify-around md:p-10"
        initial="hidden"
        whileInView="show"
        viewport={{
          once: true,
          amount: 0.2,
        }}
        variants={container}
      >
        {/* LEFT FAQ TEXT */}

        <motion.div
          className="flex justify-center md:justify-start md:w-1/4 mb-10 md:mb-0 h-full"
          variants={item}
        >
          <h2 className="text-[40px] md:text-[180px] font-bold leading-none tracking-tighter text-white rotate-0 md:-rotate-90 origin-bottom">
            FAQ
          </h2>
        </motion.div>

        {/* RIGHT ACCORDION */}

        <motion.div
          className="md:w-3/4 w-full"
          variants={item}
        >
          <Accordion
            type="single"
            collapsible
            className="w-full divide-y divide-white/80"
          >
            {faqData?.map((itemData, index) => {
              /*
               * Use a guaranteed unique key.
               * itemData.id may not exist or may not be unique.
               */
              const uniqueKey =
                itemData?.id ??
                itemData?._id ??
                `faq-${index}`;

              return (
                <motion.div
                  key={uniqueKey}
                  variants={item}
                  transition={{
                    delay: index * 0.1,
                  }}
                >
                  <AccordionItem
                    value={`item-${uniqueKey}`}
                    className="border-b-2 border-[#355454] text-[#355454] bg-white"
                    bgColor="#F1EBE4"
                  >
                    <AccordionTrigger className="flex focus:outline-none focus:ring-0 justify-between border-none items-center py-5 text-lg md:text-xl font-semibold hover:no-underline transition-all">
                      {itemData?.question}
                    </AccordionTrigger>

                    <AccordionContent className="pb-6 pt-2 pl-6 text-base md:text-lg leading-relaxed">
                      {itemData?.answer}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              );
            })}
          </Accordion>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Faq;