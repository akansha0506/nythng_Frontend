"use client";

import Banner from "@/components/layout/Banner";
import HeadingHighlight from "@/components/ui/HeadingHighlight";
import BlogCard from "@/components/Blog/BlogCard";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  fetchBlogBySlug,
  fetchBlogs,
} from "@/redux/slices/blogSlice";

import HelmetWrapper from "../common/HelmetWrapper";
import { Button } from "../ui/button";

const BlogDetail = () => {
  const params = useParams();
  const slug = params?.slug;

  const dispatch = useDispatch();

  const {
    blogs,
    selectedBlog,
    featuredBlog,
  } = useSelector((state) => state.blogs);

  const [loading, setLoading] = useState(false);
  const [dataLength, setDataLength] = useState(3);

  /* =========================
      LOAD MORE
  ========================== */

  const handleLoadMore = () => {
    setDataLength((prevLength) => prevLength + 3);
  };

  /* =========================
      FETCH BLOG
  ========================== */

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);

        if (!blogs.length) {
          await dispatch(fetchBlogs()).unwrap();
        }

        await dispatch(fetchBlogBySlug(slug)).unwrap();
      } catch (error) {
        console.error(
          "Failed to fetch blog by slug:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (
      slug &&
      (!selectedBlog || selectedBlog.slug !== slug)
    ) {
      fetch();
    }
  }, [slug, dispatch]);

  /* =========================
      FORMAT DATE
  ========================== */

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  /* =========================
      LOADING
  ========================== */

  if (loading) {
    return (
      <main className="flex justify-center items-center h-64">
        <p className="text-lg">
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="">

      {/* =========================
          SEO
      ========================== */}

      <HelmetWrapper
        title={
          selectedBlog?.seo?.title ||
          selectedBlog?.title ||
          "Blog Article - Skincare & Beauty Tips"
        }

        description={
          selectedBlog?.seo?.description ||
          selectedBlog?.excerpt ||
          "Discover expert skincare tips, beauty advice, and the latest trends in cosmetics. Read our comprehensive guides to achieve healthy, glowing skin."
        }

        canonicalUrl={
          selectedBlog?.slug
            ? `https://nythng.com/blogs/${selectedBlog.slug}`
            : `https://nythng.com/blogs/${slug}`
        }

        keywords={
          selectedBlog?.seo?.keywords ||
          selectedBlog?.tags || [
            "skincare",
            "beauty",
            "cosmetics",
            "skincare tips",
          ]
        }

        image={
          selectedBlog?.featuredImage ||
          "https://nythng.com/og-blog-default.jpg"
        }

        author="Nythng Cosmetics"
        publishedAt={selectedBlog?.publishedAt}
        modifiedAt={selectedBlog?.updatedAt}
        type="article"

        schema={
          selectedBlog
            ? {
                "@context": "https://schema.org",
                "@type": "Article",

                headline: selectedBlog.title,

                description:
                  selectedBlog.excerpt ||
                  selectedBlog.seo?.description,

                image: selectedBlog.featuredImage,

                author: {
                  "@type": "Organization",
                  name: "Nythng Cosmetics",
                },

                publisher: {
                  "@type": "Organization",
                  name: "Nythng Cosmetics",

                  logo: {
                    "@type": "ImageObject",
                    url: "https://nythng.com/logo.png",
                  },
                },

                datePublished:
                  selectedBlog.publishedAt,

                dateModified:
                  selectedBlog.updatedAt,

                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://nythng.com/blogs/${selectedBlog.slug}`,
                },

                articleSection:
                  selectedBlog.category,

                keywords:
                  selectedBlog.tags?.join(", ") ||
                  selectedBlog.seo?.keywords?.join(", "),

                wordCount: selectedBlog.content
                  ? selectedBlog.content
                      .replace(/<[^>]*>/g, "")
                      .split(" ").length
                  : 0,
              }
            : {
                "@context": "https://schema.org",
                "@type": "Article",

                headline:
                  "Blog Article - Skincare & Beauty Tips",

                description:
                  "Discover expert skincare tips, beauty advice, and the latest trends in cosmetics.",

                author: {
                  "@type": "Organization",
                  name: "Nythng Cosmetics",
                },

                publisher: {
                  "@type": "Organization",
                  name: "Nythng Cosmetics",

                  logo: {
                    "@type": "ImageObject",
                    url: "https://nythng.com/logo.png",
                  },
                },

                mainEntityOfPage: {
                  "@type": "WebPage",
                  "@id": `https://nythng.com/blogs/${slug}`,
                },
              }
        }
      />

      {/* =========================
          BLOG DETAIL
      ========================== */}

      {selectedBlog ? (
        <>
          <section
            className="
              px-[18px]
              md:px-[64px]
              w-full
              sm:w-[calc(90vw-32px)]
              md:w-[calc(90vw-64px)]
              lg:w-[calc(90vw-80px)]
              xl:w-[calc(90vw-120px)]
              mx-auto
              pt-5
              md:pt-10
              bodyText
              flex
              flex-col
              gap-4
            "
          >

            {/* TITLE */}

            <h1 className="text-3xl xl:text-4xl font-semibold primaryText">
              {selectedBlog.title}
            </h1>

            {/* META */}

            <div className="flex items-center justify-between gap-4 mt-4 bodyText px-2">

              <div>
                <span
                  className={`inline-block ${
                    !selectedBlog?.category
                      ? ""
                      : "bg-blue-50 "
                  }bodyText text-xs font-semibold px-3 py-1 rounded-full mb-3`}
                >
                  {selectedBlog?.category || ""}
                </span>
              </div>

              <div>

                <div className="flex items-center gap-2">

                  <p>
                    {formatDate(
                      selectedBlog.publishedAt
                    )}
                  </p>

                  <p>|</p>

                  <p>
                    {selectedBlog.readingTime}
                  </p>

                </div>

                {selectedBlog?.author && (
                  <p className="text-gray-500 text-sm text-right flex gap-1 justify-end items-center">

                    <span className="italic">
                      by
                    </span>

                    <span>
                      {selectedBlog.author.fullName}
                    </span>

                  </p>
                )}

              </div>
            </div>

            {/* EXCERPT */}

            {selectedBlog.excerpt && (
              <h3 className="text-md font-medium">
                {selectedBlog.excerpt}
              </h3>
            )}

            {/* FEATURED IMAGE */}

            <img
              src={selectedBlog.featuredImage}
              alt={selectedBlog.title}
              className="
                w-full
                h-[50vh]
                md:h-[60vh]
                lg:h-[70vh]
                object-cover
                rounded-xl
                transition-all
                duration-200
              "
            />

            {/* BLOG CONTENT */}

            <div
              className="blog-content mt-8 mb-12"
              dangerouslySetInnerHTML={{
                __html: selectedBlog.content,
              }}
            />

            {/* CTA BANNER */}

            {selectedBlog &&
            selectedBlog?.cta ? (
              <Banner
                headline={
                  selectedBlog?.cta.heading
                }
                subheadline={
                  selectedBlog?.cta.subHeading
                }
                imageUrl={
                  selectedBlog?.cta.image
                }
                description={
                  selectedBlog?.cta.description
                }
                showFloatingCTA={true}
                floatingCTALinkText={
                  selectedBlog?.cta.buttonText
                }
                floatingCTALink={
                  selectedBlog?.cta.buttonLink
                }
              />
            ) : (
              <Banner />
            )}

            {/* TAGS */}

            {selectedBlog.tags &&
              selectedBlog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-6 justify-end">

                  {selectedBlog.tags.map(
                    (tag, index) => (
                      <span
                        key={index}
                        className="
                          inline-block
                          bg-gray-100
                          text-gray-700
                          text-sm
                          px-3
                          py-1
                          rounded-full
                        "
                      >
                        #{tag}
                      </span>
                    )
                  )}

                </div>
              )}

          </section>

          {/* =========================
              RELATED POSTS
          ========================== */}

          <section className="sectionMargin">

            <HeadingHighlight
              text={"Related Posts"}
              className="text-center"
            />

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3
                mt-10
                w-11/12
                mx-auto
                gap-6
              "
            >

              {/* FEATURED BLOG */}

              {featuredBlog &&
                featuredBlog._id !==
                  selectedBlog._id && (
                  <BlogCard
                    post={featuredBlog}
                  />
                )}

              {/* OTHER BLOGS */}

              {blogs
                .filter(
                  (post) =>
                    post.slug !==
                    selectedBlog.slug
                )
                .slice(
                  0,
                  featuredBlog?._id !==
                    selectedBlog?._id
                    ? dataLength - 1
                    : dataLength
                )
                .map((post, i) => (
                  <BlogCard
                    key={i}
                    post={post}
                    blogsLength={blogs.length}
                  />
                ))}

            </div>

            {/* LOAD MORE */}

            {blogs &&
              dataLength < blogs.length && (
                <div className="flex justify-center mt-10">

                  <Button
                    onClick={handleLoadMore}
                    className="
                      group
                      px-6
                      py-2
                      text-base
                      rounded-xl
                      border
                      bg-[#61b9b9]
                      text-white
                      cursor-pointer
                    "
                  >
                    Load More
                  </Button>

                </div>
              )}

          </section>
        </>
      ) : (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg">
            Blog not found
          </p>
        </div>
      )}

    </main>
  );
};

export default BlogDetail;