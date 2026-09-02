"use client";

import { motion } from "framer-motion";
import { MultiPill, pageVariants } from "../utils";

export default function Step7({
  answers,
  setAnswers,
  errors,
  setErrors,
  GOALS,
}) {
  return (
    <motion.div
      key="step5"
      {...pageVariants}
      className="space-y-4"
    >
      {/* Heading */}
      <h2 className="text-xl font-medium">
        What’s your top skincare goal?
      </h2>

      {/* Description */}
      <p className="text-sm text-zinc-600">
        Select all that apply.
      </p>

      {/* Goal Options */}
      <div className="flex flex-wrap gap-2">
        {GOALS.map((g) => {
          const checked = answers.goal.includes(g.id);

          return (
            <MultiPill
              key={g.id}
              checked={checked}
              label={g.label}
              onChange={() => {
                setAnswers((a) => ({
                  ...a,
                  goal: checked
                    ? a.goal.filter((x) => x !== g.id)
                    : [...a.goal, g.id],
                }));

                // Clear validation error
                if (errors?.goal) {
                  setErrors((e) => ({
                    ...e,
                    goal: "",
                  }));
                }
              }}
            />
          );
        })}
      </div>

      {/* Validation Error */}
      {!answers?.goal?.length && errors?.goal && (
        <p className="mt-1 text-sm text-[#7a1712]">
          {errors.goal}
        </p>
      )}
    </motion.div>
  );
}