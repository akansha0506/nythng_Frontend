"use client";

import { useRouter } from "next/navigation";
import BlogCard from "@/components/Blog/BlogCard";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogs,
  setSelectedBlog,
} from "@/redux/slices/blogSlice";
import { useEffect, useState } from "react";

const Blog = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { blogs, featuredBlog } = useSelector(
    (state) => state.blogs
  );

  const [loading, setLoading] = useState(false);

  const handleOnClick = () => {
    dispatch(setSelectedBlog(featuredBlog));

    router.push(`/blogs/${featuredBlog.slug}`);
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      try {
        await dispatch(fetchBlogs()).unwrap();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (!blogs.length || !featuredBlog) {
      fetch();
    }
  }, [dispatch, blogs.length, featuredBlog]);

  if (loading) {
    return (
      <main className=" flex justify-center items-center ">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>

          <p className="text-lg text-gray-600">
            Loading articles...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mt-35">

      {/* Featured blog section - Responsive hero */}
      {featuredBlog && (
        <section className="relative mb-8 sm:mb-12 lg:mb-16">

          <article
            className="
              w-full
              sm:w-[calc(100vw-32px)]
              md:w-[calc(100vw-64px)]
              lg:w-[calc(100vw-80px)]
              xl:w-[calc(100vw-120px)]
              mx-auto
              h-[60vh]
              xs:h-[65vh]
              sm:h-[70vh]
              md:h-[75vh]
              lg:h-[80vh]
              rounded-none
              sm:rounded-xl
              md:rounded-2xl
              relative
              overflow-hidden
              cursor-pointer
              group
            "
            style={{
              backgroundImage: `
                linear-gradient(
                  rgba(0, 0, 0, 0.2),
                  rgba(0, 0, 0, 0.6)
                ),
                url(${featuredBlog.featuredImage})
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={handleOnClick}
          >

            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 lg:p-12">

              <div className="max-w-full sm:max-w-2xl lg:max-w-3xl">

                {/* Category Badge */}
                <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4">
                  {featuredBlog.category}
                </span>

                {/* Title */}
                <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                  {featuredBlog.title}
                </h1>

                {/* Excerpt */}
                <p className="hidden xs:block text-white/90 text-sm sm:text-base md:text-md lg:text-lg mb-4 sm:mb-6 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                  {featuredBlog.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-white/80 text-xs sm:text-sm">

                  <span className="font-medium">
                    {featuredBlog.readingTime}
                  </span>

                  <span className="hidden xs:inline">
                    •
                  </span>

                  <span className="hidden xs:inline">
                    {new Date(
                      featuredBlog.publishedAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>

                </div>
              </div>
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

          </article>
        </section>
      )}

      {/* All blogs section - Responsive grid */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 mb-12 sm:mb-16 lg:mb-20">

        <div className="max-w-7xl mx-auto">

          {/* Section Header */}
          <header className="text-center mb-8 sm:mb-10 lg:mb-12">

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold primaryText mb-2 sm:mb-4">
              Latest Articles
            </h2>

            <p className="text-sm sm:text-base bodyText max-w-2xl mx-auto">
              Discover expert skincare tips, beauty advice, and the latest
              trends in cosmetics
            </p>

          </header>

          {/* Articles Grid - Responsive breakpoints */}
          {blogs.length > 0 ? (

            <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">

              {blogs.map((post, i) => (
                <BlogCard
                  key={post._id || i}
                  post={post}
                />
              ))}

            </div>

          ) : (

            <div className="text-center py-12 sm:py-16">

              <div className="max-w-md mx-auto">

                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>

                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No articles yet
                </h3>

                <p className="text-gray-500">
                  Check back soon for the latest skincare and beauty content.
                </p>

              </div>

            </div>
          )}

        </div>
      </section>

    </main>
  );
};

export default Blog;