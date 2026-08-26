"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import {
  CheckCircle2,
  ImageIcon,
  Quote,
  Sparkles,
} from "lucide-react";

import RatingsCard from "./RatingCard";
import StarRating from "./StarRating";
import Pagination from "@/components/common/Pagination";

import { useParams } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";

import {
  getProductReviewsBySlug,
  setPagination,
} from "@/redux/slices/reviewSlice";


const ReviewCard = ({ review, index }) => {
  const {
    rating,
    comment,
    images,
    createdAt,
    user,
    title,
  } = review;

  const userInitial =
    user?.fullName?.charAt(0)?.toUpperCase() || "U";

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        group
        relative
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-[28px]
        border
        border-[#E9E1D9]
        bg-white
        p-5
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-[#DCCFC3]
        hover:shadow-[0_24px_70px_rgba(77,55,37,0.10)]
        sm:p-6
        lg:p-7
      "
    >
      {/* Top Accent */}

      <div
        className="
          absolute
          left-0
          top-0
          h-[3px]
          w-0
          bg-[#355454]
          transition-all
          duration-500
          group-hover:w-full
        "
      />

      {/* Decorative Quote */}

      <Quote
        size={90}
        strokeWidth={0.8}
        className="
          pointer-events-none
          absolute
          -right-4
          -top-4
          rotate-180
          text-[#78a1a1]
          transition-transform
          duration-500
          group-hover:scale-110
        "
      />

      {/* Review Header */}

      <div className="relative flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3.5">

          {/* Avatar */}

          <div
            className="
              relative
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-[#F3ECE5]
              text-base
              font-semibold
              uppercase
              text-[#457980]
              sm:h-14
              sm:w-14
            "
          >
            {userInitial}

            {/* Verified Dot */}

            <div
              className="
                absolute
                -bottom-0.5
                -right-0.5
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                border-2
                border-white
                bg-[#457980]
              "
            >
              <CheckCircle2
                size={11}
                strokeWidth={2.5}
                className="text-white"
              />
            </div>
          </div>

          {/* User Info */}

          <div className="min-w-0">
            <h3
              className="
                truncate
                text-[15px]
                font-semibold
                tracking-[-0.01em]
                text-[#355454]
                sm:text-base
              "
            >
              {user?.fullName}
            </h3>

            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <StarRating
                avgRating={rating}
                size="small"
              />

              <span
                className="
                  hidden
                  h-1
                  w-1
                  rounded-full
                  bg-[#355454]
                  sm:block
                "
              />

              <span
                className="
                  text-[11px]
                  font-medium
                  text-[#355454]
                "
              >
                Verified buyer
              </span>
            </div>
          </div>
        </div>

        {/* Date */}

        <span
          className="
            shrink-0
            text-right
            text-[11px]
            font-medium
            leading-5
            text-[#7ca0a0]
            sm:text-xs
          "
        >
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Content */}

      <div className="relative mt-6 flex flex-1 flex-col">
        {title && (
          <h4
            className="
              mb-2
              text-base
              font-semibold
              leading-snug
              text-[#355454]
              sm:text-lg
            "
          >
            {title}
          </h4>
        )}

        <p
          className="
            text-sm
            leading-7
            text-[#457980]
            sm:text-[15px]
          "
        >
          {comment}
        </p>
      </div>

      {/* Images */}

      {images?.length > 0 && (
        <PhotoProvider>
          <div
            className="
              relative
              mt-6
              border-t
              border-[#F0EBE6]
              pt-5
            "
          >
            <div className="mb-3 flex items-center gap-2">
              <ImageIcon
                size={14}
                strokeWidth={1.8}
                className="text-[#355454]"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-[#9A8776]
                "
              >
                Customer Photos
              </span>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {images.map((img, imageIndex) => (
                <PhotoView
                  key={imageIndex}
                  src={img}
                >
                  <div
                    className="
                      group/image
                      relative
                      h-[72px]
                      w-[72px]
                      cursor-zoom-in
                      overflow-hidden
                      rounded-xl
                      border
                      border-[#E8E0D8]
                      bg-[#F8F5F2]
                      sm:h-20
                      sm:w-20
                    "
                  >
                    <img
                      src={img}
                      alt={`review-img-${imageIndex}`}
                      className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-500
                        group-hover/image:scale-110
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        bg-[#493726]/0
                        transition-colors
                        duration-300
                        group-hover/image:bg-[#493726]/10
                      "
                    />
                  </div>
                </PhotoView>
              ))}
            </div>
          </div>
        </PhotoProvider>
      )}
    </motion.article>
  );
};


function ReviewTab() {
  // Next.js replacement for react-router-dom useParams()

  const { slug } = useParams();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState([]);

  const dispatch = useDispatch();

  const { pagination } = useSelector(
    (state) => state.review
  );

  const { selectedProduct } = useSelector(
    (state) => state.product
  );

  console.log("review slug", slug);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await dispatch(
          getProductReviewsBySlug({
            slug,
            page,
            limit,
          })
        ).unwrap();

        if (data && data.success) {
          setReviews(data.reviews);
          setStats(data.ratingCountBystar);

          dispatch(
            setPagination(data.pagination)
          );
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (slug) {
      fetchReviews();
    }
  }, [slug, page, limit, dispatch]);

  return (
    (selectedProduct?.numReviews > 0 ||
      reviews?.length > 0) && (
      <section
        className="
          relative
          mt-16
          overflow-hidden
          py-10
          md:mt-24
          md:py-16
          lg:mt-28
        "
      >
        {/* Background Decoration */}

        <div
          className="
            pointer-events-none
            absolute
            left-[-150px]
            top-[20%]
            h-[400px]
            w-[400px]
            rounded-full
            bg-[#F5EEE8]
            opacity-70
            blur-[130px]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            right-[-180px]
            top-[55%]
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#F4ECE5]
            opacity-60
            blur-[140px]
          "
        />

        <div
          className="
            relative
            mx-auto
            w-full
            max-w-[1380px]
            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* SECTION HEADER */}

          <div
            className="
              mx-auto
              mb-10
              max-w-3xl
              text-center
              md:mb-14
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[#E4D9CF]
                bg-white
                px-4
                py-2
                shadow-[0_8px_25px_rgba(73,55,38,0.05)]
              "
            >
              <Sparkles
                size={13}
                className="text-[#457980]"
              />

              <span
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.2em]
                  text-[#457980]
                  sm:text-[11px]
                "
              >
                Real Stories, Real Results
              </span>
            </motion.div>

            <motion.h2
              initial={{
                opacity: 0,
                y: 16,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.08,
                duration: 0.5,
              }}
              className="
                primaryText
                mt-5
                text-3xl
                font-medium
                tracking-[-0.04em]
                sm:text-4xl
                lg:text-5xl
                xl:text-[56px]
              "
            >
              Loved by our community
            </motion.h2>

            <motion.p
              initial={{
                opacity: 0,
                y: 12,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.15,
              }}
              className="
                mx-auto
                mt-4
                max-w-xl
                text-sm
                leading-7
                text-[#457980]
                sm:text-base
              "
            >
              Discover genuine experiences shared by customers
              who made us a part of their journey.
            </motion.p>
          </div>

          {/* RATING SUMMARY */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <RatingsCard
              totalReviews={selectedProduct?.numReviews}
              avgRating={selectedProduct?.averageRating}
              count={stats}
            />
          </motion.div>

          {/* <VedioReviews selectedProduct={selectedProduct} /> */}

          {/* REVIEWS AREA */}

          <div className="mt-14 md:mt-20">
            {reviews?.length > 0 ? (
              <>
                {/* Reviews Header */}

                <div
                  className="
                    mb-7
                    flex
                    flex-col
                    gap-4
                    border-b
                    border-[#97afb9]
                    pb-5
                    sm:flex-row
                    sm:items-end
                    sm:justify-between
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
                      Customer Voices
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
                      What people are saying
                    </h3>
                  </div>

                  <div
                    className="
                      flex
                      w-fit
                      items-center
                      gap-2
                      rounded-full
                      border
                      border-[#E4D9CF]
                      bg-white
                      px-4
                      py-2
                    "
                  >
                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-[#9C5E3E]
                      "
                    />

                    <span
                      className="
                        text-xs
                        font-medium
                        text-[#735F4D]
                      "
                    >
                      {selectedProduct?.numReviews ||
                        reviews.length}{" "}
                      verified reviews
                    </span>
                  </div>
                </div>

                {/* Review Grid */}

                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="
                    grid
                    grid-cols-1
                    gap-5
                    md:grid-cols-2
                    xl:gap-6
                  "
                >
                  {reviews.map((review, index) => (
                    <ReviewCard
                      key={review._id}
                      review={review}
                      index={index}
                    />
                  ))}
                </motion.div>

                {/* PAGINATION */}

                {pagination && (
                  <div
                    className="
                      mt-10
                      border-t
                      border-[#E9E1D9]
                      pt-8
                      md:mt-14
                      md:pt-10
                    "
                  >
                    <Pagination
                      currentPage={page}
                      totalPages={pagination.totalPages}
                      onPageChange={setPage}
                      limit={pagination.limit}
                      handleLimitChange={(newLimit) => {
                        setLimit(newLimit);
                      }}
                    />
                  </div>
                )}
              </>
            ) : (
              <div
                className="
                  rounded-[30px]
                  border
                  border-dashed
                  border-[#DDD1C6]
                  bg-[#FBF8F5]
                  px-6
                  py-16
                  text-center
                "
              >
                <div
                  className="
                    mx-auto
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-[0_10px_35px_rgba(73,55,38,0.08)]
                  "
                >
                  <Quote
                    size={25}
                    className="text-[#9C5E3E]"
                  />
                </div>

                <h3
                  className="
                    mt-5
                    text-xl
                    font-semibold
                    text-[#493726]
                  "
                >
                  No reviews yet
                </h3>

                <p
                  className="
                    mx-auto
                    mt-2
                    max-w-sm
                    text-sm
                    leading-6
                    text-[#8D7967]
                  "
                >
                  Be the first customer to share your experience.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  );
}

export default ReviewTab;