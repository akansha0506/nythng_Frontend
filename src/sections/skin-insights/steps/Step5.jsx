"use client";

import { motion } from "framer-motion";
import { MultiPill, pageVariants } from "../utils";

export default function Step5({
  answers,
  setAnswers,
  errors,
  setErrors,
  LIFESTYLE,
}) {
  return (
    <motion.div
      key="step3"
      {...pageVariants}
      className="space-y-4"
    >
      {/* Heading */}
      <h2 className="text-xl font-medium">
        Which of these apply to your daily life?
      </h2>

      {/* Description */}
      <p className="text-sm text-zinc-600">
        Select all that apply.
      </p>

      {/* Lifestyle Options */}
      <div className="flex flex-wrap gap-2">
        {LIFESTYLE.map((l) => {
          const checked = answers.lifestyle.includes(l.id);

          return (
            <MultiPill
              key={l.id}
              checked={checked}
              label={l.label}
              onChange={() => {
                setAnswers((a) => ({
                  ...a,
                  lifestyle: checked
                    ? a.lifestyle.filter(
                        (x) => x !== l.id
                      )
                    : [...a.lifestyle, l.id],
                }));

                // Clear validation error
                if (errors?.lifestyle) {
                  setErrors((e) => ({
                    ...e,
                    lifestyle: "",
                  }));
                }
              }}
            />
          );
        })}
      </div>

      {/* Validation Error */}
      {!answers?.lifestyle?.length &&
        errors?.lifestyle && (
          <p className="mt-1 text-sm text-[#7a1712]">
            {errors.lifestyle}
          </p>
        )}
    </motion.div>
  );
}