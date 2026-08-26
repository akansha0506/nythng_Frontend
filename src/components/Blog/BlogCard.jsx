"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { setSelectedBlog } from "@/redux/slices/blogSlice";

const BlogCard = ({ post }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOnClick = () => {
    dispatch(setSelectedBlog(post));

    router.push(`/blogs/${post.slug}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <article
      onClick={handleOnClick}
      className="
        bg-white
        rounded-xl
        sm:rounded-2xl
        flex
        flex-col
        justify-between
        overflow-hidden
        shadow-sm
        border
        hover:shadow-lg
        transition-all
        duration-300
        cursor-pointer
        group
        h-full
      "
    >
      {/* Image Container */}
      <div className="overflow-hidden rounded-lg sm:rounded-xl m-3 sm:m-4">
        <div className="relative w-full h-[200px] xs:h-[220px] sm:h-[240px] md:h-[250px] lg:h-[260px]">
          <Image
            src={post?.featuredImage}
            alt={post?.title || "Blog image"}
            fill
            className="
              object-cover
              rounded-lg
              sm:rounded-xl
              group-hover:scale-105
              scale-100
              transition-all
              duration-300
            "
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 768px) 50vw,
              (max-width: 1024px) 33vw,
              25vw
            "
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="p-3 sm:p-4 lg:p-5 flex flex-col flex-grow">

        {/* Category Badge */}
        <span
          className={`inline-block ${
            post?.category ? "text-[#355454] bg-blue-50" : ""
          } text-xs sm:text-sm font-semibold px-2 sm:px-3 py-1 rounded-full mb-2 sm:mb-3 w-fit`}
        >
          {post?.category}
        </span>

        {/* Title */}
        <h3
          className="
            text-sm
            sm:text-base
            lg:text-lg
            font-semibold
            text-gray-500
            mb-2
            sm:mb-3
            lg:mb-4
            leading-snug
            line-clamp-2
            flex-grow
          "
        >
          {post?.title}
        </h3>

        {/* Excerpt */}
        {post?.excerpt && (
          <p
            className="
              hidden
              xs:block
              text-xs
              sm:text-sm
              text-gray-600
              mb-3
              sm:mb-4
              line-clamp-2
              leading-relaxed
            "
          >
            {post.excerpt}
          </p>
        )}

        {/* Meta Information */}
        {post?.publishedAt && (
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500 mt-auto">
            <div className="flex items-center gap-1 sm:gap-2">
              <time dateTime={post.publishedAt} className="font-medium">
                {formatDate(post.publishedAt)}
              </time>

              {post?.readingTime && (
                <>
                  <span className="hidden xs:inline">•</span>

                  <span className="hidden xs:inline text-gray-400">
                    {post.readingTime}
                  </span>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogCard;