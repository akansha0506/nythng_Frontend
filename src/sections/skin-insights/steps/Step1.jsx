"use client";

import React from "react";
import { motion } from "framer-motion";

import { pageVariants, pillVariants } from "../utils";

function classNames(...cn) {
  return cn.filter(Boolean).join(" ");
}

export default function Step1({
  answers,
  setAnswers,
  errors,
  setErrors,
}) {
  return (
    <motion.div
      key="stepAgeEmail"
      {...pageVariants}
      className="space-y-6"
    >
      <div>
        <h2 className="text-xl font-medium">
          Tell us about you
        </h2>
      </div>

    
      <div>
        <h3 className="mb-2 text-md font-medium">
          How old are you?
        </h3>

        <div className="flex flex-wrap gap-2">
          {[
            "18-29",
            "30-39",
            "40-49",
            "50+",
            "Prefer not to say",
          ].map((ageOption) => {
            const isActive =
              answers?.ageGroup === ageOption;

            return (
              <motion.button
                key={ageOption}
                type="button"
                variants={pillVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                onClick={() => {
                  setAnswers((prev) => ({
                    ...prev,
                    ageGroup: ageOption,
                  }));

                  // Clear age error
                  setErrors((prev) => ({
                    ...prev,
                    ageGroup: "",
                  }));
                }}
                className={classNames(
                  `
                    cursor-pointer
                    rounded-full
                    border
                    px-4
                    py-2
                    text-sm
                  `,
                  isActive
                    ? `
                      border-[#3A8B88]
                      bg-[#3A8B88]/10
                      text-[#3A8B88]
                    `
                    : errors?.ageGroup
                      ? `
                        border-red-500
                        bg-red-50
                        text-red-600
                      `
                      : `
                        border-zinc-200
                        bg-white
                        text-zinc-700
                        hover:border-zinc-300
                      `
                )}
              >
                {ageOption}
              </motion.button>
            );
          })}
        </div>

        {/* Age Error */}

        {errors?.ageGroup && (
          <p className="mt-1 text-sm text-red-500">
            {errors.ageGroup}
          </p>
        )}
      </div>

      {/* =====================================================
          NAME INPUT
      ====================================================== */}

      <div>
        <h3 className="mb-2 text-md font-medium">
          Name
        </h3>

        <input
          type="text"
          value={answers?.name || ""}
          onChange={(e) => {
            setAnswers((prev) => ({
              ...prev,
              name: e.target.value,
            }));

            // Clear name error
            setErrors((prev) => ({
              ...prev,
              name: "",
            }));
          }}
          placeholder="Enter your name"
          className={classNames(
            `
              w-full
              rounded-lg
              border
              px-4
              py-2
              outline-none
              focus:ring-2
            `,
            errors?.name
              ? `
                border-red-500
                bg-red-50
                focus:ring-red-500
              `
              : `
                border-zinc-300
                focus:ring-[#3A8B88]
              `
          )}
        />

        {/* Name Error */}

        {errors?.name && (
          <p className="mt-1 text-sm text-red-500">
            {errors.name}
          </p>
        )}
      </div>

      {/* =====================================================
          EMAIL INPUT
      ====================================================== */}

      <div>
        <h3 className="mb-2 text-md font-medium">
          Your Email
        </h3>

        <input
          type="email"
          value={answers?.email || ""}
          onChange={(e) => {
            setAnswers((prev) => ({
              ...prev,
              email: e.target.value,
            }));

            // Clear email error
            setErrors((prev) => ({
              ...prev,
              email: "",
            }));
          }}
          placeholder="Enter your email"
          className={classNames(
            `
              w-full
              rounded-lg
              border
              px-4
              py-2
              outline-none
              focus:ring-2
            `,
            errors?.email
              ? `
                border-red-500
                bg-red-50
                focus:ring-red-500
              `
              : `
                border-zinc-300
                focus:ring-[#3A8B88]
              `
          )}
        />

        {/* Email Error */}

        {errors?.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>
    </motion.div>
  );
}