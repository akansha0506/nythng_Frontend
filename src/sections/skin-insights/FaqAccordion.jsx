"use client";

import HeadingHighlight from "@/components/ui/HeadingHighlight";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    number: "01",
    question: "How does the skin scan work?",
    answer:
      "Our AI analyzes your selfie using dermatologist-trained models to assess skin concerns like dryness, acne, pigmentation, pores, and early signs of aging — all within seconds.",
  },
  {
    number: "02",
    question: "Is the scan safe for my skin and privacy?",
    answer:
      "Yes, your scan is fully encrypted and never shared. We prioritize user privacy at every step.",
  },
  {
    number: "03",
    question: "Do I need to wear makeup or skincare before scanning?",
    answer:
      "No, it works best on your natural skin — no makeup or skincare products needed.",
  },
  {
    number: "04",
    question: "Will it work for all skin tones and types?",
    answer:
      "Absolutely. Our AI is trained on diverse datasets to support all skin tones and types.",
  },
];

export default function FaqAccordion() {
  return (
    <section className="w-11/12 mx-auto sectionMargin">
      <HeadingHighlight
        text="FAQ– Skin Insight"
        highlight="FAQ"
      />

      <Accordion
        type="single"
        collapsible
        className="w-full mt-10"
      >
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`item-${faq.number}`}
            className="mb-2"
          >
            <AccordionTrigger
              className="
                text-lg
                md:text-2xl
                mb
                w-full
                flex
                justify-between
                items-start
                text-left
                font-normal
                primaryText
                py-4
                px-2
                bg-gray-100
                hover:no-underline
              "
            >
              <div className="flex items-start gap-2 md:gap-6 px-2">
                <span className="text-lg md:text-2xl text-gray-400 font-bold w-6">
                  {String(faq.number).padStart(2, "0")}
                </span>

                {faq.question}
              </div>
            </AccordionTrigger>

            <AccordionContent className="bg-gray-100 rounded md:px-4 px-10 bodyText">
              <div className="flex flex-col sm:flex-row gap-4 md:px-3 flex-end w-11/12 mx-auto text-xl">
                {faq.answer}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}