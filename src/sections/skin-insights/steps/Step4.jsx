"use client";

import { motion } from "framer-motion";
import { MultiPill, pageVariants } from "../utils";

export default function Step4({
  answers,
  setAnswers,
  errors,
  setErrors,
  CONCERNS,
  SUB_CONCERNS,
}) {
  return (
    <motion.div
      key="step-subconcerns"
      {...pageVariants}
      className="space-y-4"
    >
      {/* Heading */}
      <h2 className="text-xl font-medium">
        Let’s go deeper — what specific issues are you facing?
      </h2>

      {/* Description */}
      <p className="text-sm text-zinc-600">
        Select all that apply.
      </p>

      {/* Sub Concerns */}
      <div className="space-y-4">
        {answers.concerns.map((concernId) => {
          const concern = CONCERNS.find(
            (c) => c.id === concernId
          );

          const subConcerns =
            SUB_CONCERNS[concernId] || [];

          return (
            <div key={concernId}>
              {/* Concern Heading */}
              <h3 className="mb-2 font-medium">
                {concern?.label}
              </h3>

              {/* Sub Concern Options */}
              <div className="flex flex-wrap gap-2">
                {subConcerns.map((sub) => {
                  const checked =
                    answers?.subConcerns?.includes(sub);

                  return (
                    <MultiPill
                      key={sub}
                      checked={checked}
                      label={sub}
                      onChange={() => {
                        setAnswers((a) => ({
                          ...a,
                          subConcerns: checked
                            ? a.subConcerns.filter(
                                (x) => x !== sub
                              )
                            : [
                                ...a.subConcerns,
                                sub,
                              ],
                        }));

                        // Clear error when user selects
                        if (errors?.subConcerns) {
                          setErrors((e) => ({
                            ...e,
                            subConcerns: "",
                          }));
                        }
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Validation Error */}
      {!answers?.subConcerns?.length &&
        errors?.subConcerns && (
          <p className="mt-1 text-sm text-[#7a1712]">
            {errors.subConcerns}
          </p>
        )}
    </motion.div>
  );
}