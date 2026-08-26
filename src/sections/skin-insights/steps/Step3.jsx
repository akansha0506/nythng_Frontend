"use client";

import React from "react";
import { motion } from "framer-motion";

import {
  MultiPill,
  pageVariants,
} from "../utils";

export default function Step3({
  answers,
  setAnswers,
  errors,
  setErrors,
  CONCERNS,
}) {
  return (
    <motion.div
      key="step3"
      {...pageVariants}
      className="space-y-4"
    >
      {/* =====================================================
          HEADING
      ====================================================== */}

      <h2 className="text-xl font-medium">
        What are your main skincare concerns?
      </h2>

      <p className="text-sm text-zinc-600">
        Select all that apply.
      </p>

      {/* =====================================================
          CONCERNS
      ====================================================== */}

      <div className="flex flex-wrap gap-2">
        {CONCERNS.map((concern) => {
          const checked =
            answers?.concerns?.includes(concern.id);

          return (
            <MultiPill
              key={concern.id}
              checked={checked}
              label={concern.label}
              onChange={() => {
                setAnswers((prev) => ({
                  ...prev,
                  concerns: checked
                    ? prev.concerns.filter(
                        (item) => item !== concern.id
                      )
                    : [
                        ...prev.concerns,
                        concern.id,
                      ],
                }));

                // Clear error when user selects a concern
                setErrors((prev) => ({
                  ...prev,
                  concerns: "",
                }));
              }}
            />
          );
        })}
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}

      {!answers?.concerns?.length &&
        errors?.concerns && (
          <p className="mt-1 text-sm text-red-500">
            {errors.concerns}
          </p>
        )}
    </motion.div>
  );
}