"use client";

import { motion as m } from "framer-motion";
import {
  CheckCircle2,
  Star,
  TrendingUp,
} from "lucide-react";

import StarRating from "./StarRating";

export default function RatingsCard({
  avgRating,
  totalReviews,
  count,
}) {
  const counts = count || [];

  const totalRatings = counts.reduce(
    (sum, star) => sum + star.count,
    0
  );

  console.log("Counts:", count);

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-[#E7DDD4]
        bg-white
        shadow-[0_25px_80px_rgba(73,55,38,0.07)]
      "
    >
      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-[40%_60%]
        "
      >
        {/* OVERALL SCORE */}

        <m.div
          viewport={{ once: true }}
          initial="hidden"
          whileInView="visible"
          className="
            relative
            flex
            min-h-[350px]
            flex-col
            items-center
            justify-center
            overflow-hidden
            border-b
            border-[#d4e0e9]
            bg-[#edf4f7ad]
            px-6
            py-10
            text-center
            lg:min-h-[430px]
            lg:border-b-0
            lg:border-r
          "
        >
          {/* Decorative Rings */}

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[320px]
              w-[320px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#d4e0e9]
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[240px]
              w-[240px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              border
              border-[#d4e0e9]
            "
          />

          {/* Content */}

          <div className="relative z-10">
            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.24em]
                text-[#355454]
              "
            >
              Overall Rating
            </span>

            <div
              className="
                mt-6
                flex
                items-end
                justify-center
              "
            >
              <span
                className="
                  text-[88px]
                  font-medium
                  leading-[0.8]
                  tracking-[-0.08em]
                  text-[#355454]
                  sm:text-[110px]
                  xl:text-[120px]
                "
              >
                {avgRating?.toFixed(1) || "0.0"}
              </span>

              <span
                className="
                  mb-1
                  ml-2
                  text-xl
                  font-medium
                  text-[#355454]
                "
              >
                /5
              </span>
            </div>

            {/* Stars */}

            <div
              className="
                mx-auto
                mt-8
                flex
                w-fit
                items-center
                justify-center
                rounded-full
                border
                border-[#E7DDD4]
                bg-white
                px-5
                py-3
                shadow-[0_10px_35px_rgba(73,55,38,0.07)]
              "
            >
              <StarRating avgRating={avgRating} />
            </div>

            {/* Verified */}

            <div
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <CheckCircle2
                size={17}
                strokeWidth={1.8}
                className="text-[#9C5E3E]"
              />

              <span
                className="
                  text-sm
                  font-semibold
                  text-[#355454]
                "
              >
                {totalReviews || 0}
              </span>

              <span className="text-sm text-[#355454]">
                verified reviews
              </span>
            </div>
          </div>
        </m.div>

        {/* BREAKDOWN */}

        <m.div
          viewport={{ once: true }}
          initial="hidden"
          whileInView="visible"
          className="
            flex
            flex-col
            justify-center
            px-5
            py-9
            sm:px-8
            md:px-10
            lg:px-12
            xl:px-16
          "
        >
          {/* Header */}

          <div
            className="
              mb-8
              flex
              items-start
              justify-between
              gap-5
            "
          >
            <div>
              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#355454]
                "
              >
                Customer Feedback
              </span>

              <h3
                className="
                  mt-2
                  text-2xl
                  font-medium
                  tracking-[-0.03em]
                  text-[#355454]
                  sm:text-3xl
                "
              >
                Rating breakdown
              </h3>
            </div>

            <div
              className="
                hidden
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                bg-[#F6F0EA]
                sm:flex
              "
            >
              <TrendingUp
                size={20}
                strokeWidth={1.7}
                className="text-[#3d6d6d]"
              />
            </div>
          </div>

          {/* Rating Bars */}

          <div className="space-y-5">
            {counts?.map((star, i) => {
              const percentage =
                totalRatings > 0
                  ? (star.count / totalRatings) * 100
                  : 0;

              return (
                <div key={i}>
                  <div
                    className="
                      mb-2.5
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="
                          min-w-[12px]
                          text-sm
                          font-semibold
                          text-[#355454]
                        "
                      >
                        {star.rating}
                      </span>

                      <Star
                        size={14}
                        fill="currentColor"
                        className="text-[#D5A142]"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className="
                          text-xs
                          font-medium
                          text-[#355454]
                        "
                      >
                        {Math.round(percentage)}%
                      </span>

                      <span
                        className="
                          min-w-[68px]
                          text-right
                          text-xs
                          text-[#355454]
                        "
                      >
                        {star.count} reviews
                      </span>
                    </div>
                  </div>

                  <div
                    className="
                      h-2
                      w-full
                      overflow-hidden
                      rounded-full
                      bg-[#F0EAE4]
                    "
                  >
                    <m.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: `${percentage}%`,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.9,
                        delay: i * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="
                        h-full
                        rounded-full
                        bg-[#61b9b9]
                      "
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Trust Note */}

          <div
            className="
              mt-9
              flex
              items-center
              gap-3
              border-t
              border-[#EEE7E0]
              pt-6
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-[#F5EEE8]
              "
            >
              <CheckCircle2
                size={18}
                className="text-[#3e7e9c]"
              />
            </div>

            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-[#355454]
                "
              >
                Genuine customer experiences
              </p>

              <p
                className="
                  mt-0.5
                  text-xs
                  leading-5
                  text-[#355454]
                "
              >
                Every review is shared by a verified customer.
              </p>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
}