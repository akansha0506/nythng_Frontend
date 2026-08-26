"use client";

import React from "react";
import { motion } from "framer-motion";

import {
  Card,
  classNames,
  pageVariants,
} from "../utils";

export default function Step2({
  answers,
  setAnswers,
  errors,
  setErrors,
  SKIN_TYPES,
}) {
  return (
    <motion.div
      key="step2"
      {...pageVariants}
      className="space-y-4"
    >
      {/* =====================================================
          HEADING
      ====================================================== */}

      <h2 className="text-xl font-medium">
        What best describes your skin type?
      </h2>

      {/* =====================================================
          SKIN TYPE OPTIONS
      ====================================================== */}

      <div className="grid gap-3 md:grid-cols-2">
        {SKIN_TYPES.map((skinType) => {
          const isActive =
            answers?.skinType === skinType;

          return (
            <Card
              key={skinType}
              active={isActive}
              onClick={() => {
                setAnswers((prev) => ({
                  ...prev,
                  skinType: skinType,
                }));

                // Clear error after selection
                setErrors((prev) => ({
                  ...prev,
                  skinType: "",
                }));
              }}
            >
              <div className="flex items-center gap-3">
                {/* Selection Indicator */}

                <span
                  className={classNames(
                    "inline-block h-3 w-3 rounded-full",
                    isActive
                      ? "bg-[#3A8B88]"
                      : "border-2 border-[#3A8B88]"
                  )}
                />

                {/* Skin Type */}

                <span className="font-medium">
                  {skinType}
                </span>
              </div>

              {/* Description */}

              <p className="mt-1 text-sm text-zinc-600">
                {skinType === "Dry" &&
                  "Tight after washing, loves rich creams."}

                {skinType === "Oily" &&
                  "Shiny T-zone, prefers gel textures."}

                {skinType === "Combination" &&
                  "Oily T-zone, normal/dry cheeks."}

                {skinType === "Sensitive" &&
                  "Easily irritated, needs gentleness."}

                {skinType === "Normal" &&
                  "Balanced, not too oily or dry."}
              </p>
            </Card>
          );
        })}
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {!answers?.skinType && errors?.skinType && (
        <p className="mt-1 text-sm text-red-500">
          {errors.skinType}
        </p>
      )}
    </motion.div>
  );
}