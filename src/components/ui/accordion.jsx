"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({
  bgColor,
  className,
  ...props
}) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={className}
      {...props}
    />
  );
}

function AccordionItem({
  className,
  bgColor,
  ...props
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      {...props}
      className={cn(
        "bg-gray-100 rounded-xl",
        className
      )}
      style={
        bgColor
          ? {
              backgroundColor: bgColor,
            }
          : undefined
      }
    />
  );
}

function AccordionTrigger({
  className,
  children,
  accordionIcon,
  ...props
}) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-xl md:p-6! p-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-45 cursor-pointer",
          className
        )}
        {...props}
      >
        {children}

        <Plus
          className={`bg-[#61b9b9] text-[#D1C0B3] pointer-events-none size-8 rounded-full shrink-0 translate-y-0.5 transition-transform duration-200 p-1 ${
            accordionIcon || ""
          }`}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div
        className={cn(
          "pt-0 pb-4 rounded-t rounded-b-xl!",
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
};