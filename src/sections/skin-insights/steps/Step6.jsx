"use client";

import { motion } from "framer-motion";
import { Card, classNames, pageVariants } from "../utils";

export default function Step6({
  answers,
  setAnswers,
  errors,
  setErrors,
  ROUTINE_LEVELS,
}) {
  return (
    <motion.div
      key="step4"
      {...pageVariants}
      className="space-y-4"
    >
      {/* Heading */}
      <h2 className="text-xl font-medium">
        How would you describe your skincare routine?
      </h2>

      {/* Routine Options */}
      <div className="grid gap-3">
        {ROUTINE_LEVELS.map((r) => {
          const isActive = answers.routineLevel === r.id;

          return (
            <Card
              key={r.id}
              active={isActive}
              onClick={() => {
                setAnswers((a) => ({
                  ...a,
                  routineLevel: r.id,
                }));

                // Clear error after selection
                if (errors?.routineLevel) {
                  setErrors((e) => ({
                    ...e,
                    routineLevel: "",
                  }));
                }
              }}
            >
              <div className="flex items-center gap-3">
                <span
                  className={classNames(
                    "inline-block h-3 w-3 rounded-full",
                    isActive
                      ? "bg-[#3A8B88]"
                      : "border-2 border-[#3A8B88]"
                  )}
                />

                <span className="font-medium">
                  {r.label}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Validation Error */}
      {!answers?.routineLevel &&
        errors?.routineLevel && (
          <p className="mt-1 text-sm text-red-500">
            {errors.routineLevel}
          </p>
        )}
    </motion.div>
  );
}