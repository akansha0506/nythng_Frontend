import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function AccordionComp({ heroActives = [] }) {
  return (
    <Accordion type="single" collapsible className="w-full mt-10">
      {heroActives.map((item) => (
        <AccordionItem
          key={item.id}
          value={`item-${item.id}`}
          className="mb-2"
        >
          <AccordionTrigger className="text-2xl w-full flex justify-between items-center text-left font-normal text-gray-800 py-4 px-2 bg-gray-100 hover:no-underline">
            <div className="flex items-center gap-6 px-2">
              <span className="text-2xl text-gray-400 font-bold w-6">
                {String(item.id).padStart(2, "0")}
              </span>

              <span className="primaryText text-xl md:text-2xl">
                {item.title}
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent className="bg-gray-100 rounded md:p-4 p-3 text-gray-700 font-light">
            <div className="flex flex-col sm:flex-row gap-4 md:px-6 w-10/12 mx-auto">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className="md:w-60 w-80 h-40 object-cover rounded-md mb-4"
                />
              )}

              <div className="flex-1 md:mx-10 md:mt-10">
                <strong className="block mb-1 text-gray-900 text-xl">
                  Benefits
                </strong>

                {item.benefits?.map((benefit, idx) => (
                  <p key={idx} className="text-lg">
                    {benefit}
                  </p>
                ))}
              </div>

              <div className="flex-1 mt-10">
                <strong className="block mb-1 text-gray-900 text-xl">
                  Ideal For
                </strong>

                {item.idealFor?.map((ideal, idx) => (
                  <p key={idx} className="text-lg">
                    {ideal}
                  </p>
                ))}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default AccordionComp;