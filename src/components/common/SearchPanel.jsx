"use client";

import Fuse from "fuse.js";
import { useEffect, useState } from "react";
import { Search, X, Sparkles, Clock3 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import Image from "next/image";

import { getAllProductsForSearch } from "@/redux/slices/productSlice";

export const SearchPanel = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const allProducts = useSelector(
    (state) => state.product.allProductsForSearch
  );

  // -----------------------------------------
  // SAFE PRODUCT DATA
  // -----------------------------------------

  const products = Array.isArray(allProducts?.data)
    ? allProducts.data
    : [];

  // -----------------------------------------
  // SEARCH STATES
  // -----------------------------------------

  const isTyping = searchQuery.trim() !== "";

  const trendingSearches = [
    "Acne",
    "Dark Spots",
    "Dry Skin",
    "Pigmentation",
    "Vitamin C",
    "Niacinamide",
    "Cleanser",
  ];

  const recentSearches = [
    "Moisturizer",
    "Sunscreen",
    "Vitamin C Serum",
  ];

  // -----------------------------------------
  // ANIMATION
  // -----------------------------------------

  const panelVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
      },
    },
  };

  // -----------------------------------------
  // FILTERS
  // -----------------------------------------

  const priceFilters = [
    {
      label: "Acne",
      key: "Acne",
    },
    {
      label: "Dryness",
      key: "Dry",
    },
    {
      label: "Dark Spots",
      key: "Dark Spots",
    },
    {
      label: "Pigmentation",
      key: "Pigmentation",
    },
    {
      label: "Ageing Signs",
      key: "Ageing",
    },
  ];

  // -----------------------------------------
  // FETCH PRODUCTS
  // -----------------------------------------

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(getAllProductsForSearch()).unwrap();
      } catch (error) {
        console.log(error);
      }
    };

    if (!products.length) {
      fetchProducts();
    }
  }, [dispatch, products.length]);

  // -----------------------------------------
  // FUSE SEARCH
  // -----------------------------------------

  const fuse = new Fuse(products, {
    keys: [
      "heading",
      "subheading",
      "usps.title",
      "ingredients",
      "tags",
      "skinType",
      "tagline",
      "description",
    ],
    threshold: 0.2,
  });

  // -----------------------------------------
  // FILTERED PRODUCTS
  // -----------------------------------------

  const filteredProducts = searchQuery.trim()
    ? fuse
        .search(searchQuery)
        .map((r) => r.item)
        // IMPORTANT:
        // Don't render product links when slug is missing
        .filter((product) => product?.slug)
    : [];

  // -----------------------------------------
  // SUGGESTIONS
  // -----------------------------------------

  const suggestionData = products.flatMap((product) => {
    return [
      ...(Array.isArray(product.tags) ? product.tags : []),
      ...(product.heading ? [product.heading] : []),
      ...(product.tagline ? [product.tagline] : []),
    ];
  });

  const uniqueSuggestions = Array.from(
    new Set(
      suggestionData
        .filter(Boolean)
        .map((tag) => String(tag).toLowerCase())
    )
  );

  const suggestionFuse = new Fuse(uniqueSuggestions, {
    threshold: 0.1,
  });

  const matchedSuggestions = searchQuery.trim()
    ? suggestionFuse.search(searchQuery).map((r) => r.item)
    : [];

  // -----------------------------------------
  // BODY SCROLL LOCK
  // -----------------------------------------

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // -----------------------------------------
  // PANEL
  // -----------------------------------------

  const panel = (
    <motion.div
      key="search-panel"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={panelVariants}
      className="fixed inset-0 z-[9999]"
    >
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Main Container */}
      <div className="absolute inset-0 overflow-hidden flex flex-col z-[9999]">
        {/* Header */}
        <div className="sticky top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-5">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search
                  size={20}
                  className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  autoFocus
                  value={inputValue}
                  placeholder="Search products, ingredients, skin concerns..."
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setSearchQuery(e.target.value);
                  }}
                  className="
                    h-16
                    w-full
                    rounded-full
                    border
                    border-gray-200
                    bg-white
                    pl-14
                    pr-14
                    text-[16px]
                    font-medium
                    shadow-sm
                    outline-none
                    transition-all
                    duration-300
                    text-[#355454]
                    focus:border-[#355454]
                    focus:ring-4
                    focus:ring-[#355454]/10
                  "
                />

                {inputValue && (
                  <button
                    onClick={() => {
                      setInputValue("");
                      setSearchQuery("");
                    }}
                    className="
                      absolute
                      right-5
                      top-1/2
                      -translate-y-1/2
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-full
                      bg-gray-100
                      hover:bg-[#355454]
                      hover:text-white
                      transition
                    "
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  bg-white
                  shadow-sm
                  transition-all
                  text-gray-500
                  hover:bg-[#355454]
                  hover:text-white
                  cursor-pointer
                "
              >
                <X size={20} />
              </button>
            </div>

            {/* Trending Searches */}
            {!isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2 mr-2">
                    <Sparkles
                      size={18}
                      className="text-[#355454]"
                    />

                    <h3 className="font-semibold whitespace-nowrap text-[#355454]">
                      Trending Searches
                    </h3>
                  </div>

                  {trendingSearches.map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setSearchQuery(item);
                        setInputValue(item);
                      }}
                      className="
                        rounded-full
                        border
                        border-gray-200
                        bg-white
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-[#355454]
                        transition-all
                        duration-300
                        hover:border-[#355454]
                        hover:bg-[#355454]
                        hover:text-white
                        cursor-pointer
                      "
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
              {/* ====================== LEFT SIDE ====================== */}

              <div className="space-y-4">
                {/* Suggestions */}
                <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="mb-5 flex items-center gap-2">
                    <Search
                      size={18}
                      className="text-[#355454]"
                    />

                    <h3 className="text-lg font-semibold text-[#355454]">
                      Suggestions
                    </h3>
                  </div>

                  {isTyping ? (
                    matchedSuggestions.length > 0 ? (
                      <div className="space-y-2">
                        {matchedSuggestions
                          .slice(0, 8)
                          .map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => {
                                setSearchQuery(suggestion);
                                setInputValue(suggestion);
                              }}
                              className="
                                flex
                                w-full
                                items-center
                                gap-3
                                rounded-xl
                                px-4
                                py-3
                                text-left
                                transition-all
                                duration-300
                                hover:bg-[#355454]/5
                              "
                            >
                              <Search
                                size={16}
                                className="text-gray-400"
                              />

                              <span className="text-sm font-medium text-[#355454]">
                                {suggestion}
                              </span>
                            </button>
                          ))}
                      </div>
                    ) : (
                      <div className="rounded-2xl bg-gray-50 p-5">
                        <p className="text-sm leading-7 text-gray-500">
                          Try searching using
                          <br />
                          • Product Name
                          <br />
                          • Ingredient
                          <br />
                          • Skin Concern
                          <br />
                          • Collection
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="space-y-2">
                      {recentSearches.map((item) => (
                        <button
                          key={item}
                          onClick={() => {
                            setInputValue(item);
                            setSearchQuery(item);
                          }}
                          className="
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-xl
                            px-4
                            py-3
                            transition-all
                            duration-300
                            hover:bg-[#355454]/5
                          "
                        >
                          <Clock3
                            size={16}
                            className="text-gray-400"
                          />

                          <span className="text-sm font-medium text-[#355454]">
                            {item}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ====================== RIGHT SIDE ====================== */}

              <div>
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white/70">
                      Products
                    </h2>

                    <p className="mt-1 text-sm text-white/70">
                      {isTyping
                        ? `${filteredProducts.length} products found`
                        : "Start typing to discover products"}
                    </p>
                  </div>

                  {isTyping && (
                    <div
                      className="
                        rounded-full
                        bg-[#355454]/10
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-[#355454]
                      "
                    >
                      {filteredProducts.length} Results
                    </div>
                  )}
                </div>

                {/* ================= PRODUCTS GRID ================= */}

                {filteredProducts.length > 0 ? (
                  <motion.div
                    layout
                    className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      xl:grid-cols-3
                      gap-5
                    "
                  >
                    {filteredProducts.map((p, index) => (
                      <motion.div
                        key={p._id || p.id || p.slug || index}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.35,
                          delay: index * 0.05,
                        }}
                      >
                        {/* IMPORTANT:
                            Next.js uses href, not to.
                            We also filtered products without slug above.
                        */}
                        <Link
                          href={`/product/${p.slug}`}
                          onClick={onClose}
                          className="group block"
                        >
                          <div
                            className="
                              overflow-hidden
                              rounded-[30px]
                              border
                              border-gray-100
                              bg-white
                              shadow-sm
                              transition-all
                              duration-500
                              hover:-translate-y-2
                              hover:shadow-2xl
                              hover:shadow-[#355454]/10
                            "
                          >
                            {/* Image */}
                            <div className="relative aspect-square overflow-hidden bg-[#f8f8f8]">
                              {p?.sizes?.[0]?.image?.url ? (
                                <Image
                                  src={p.sizes[0].image.url}
                                  alt={p?.heading || "Product"}
                                  fill
                                  className="
                                    object-contain
                                    p-8
                                    transition-transform
                                    duration-500
                                    group-hover:scale-110
                                  "
                                  unoptimized
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">
                                  No Image
                                </div>
                              )}

                              <div className="absolute left-4 top-4">
                                <span
                                  className="
                                    rounded-full
                                    bg-[#355454]
                                    px-3
                                    py-1
                                    text-xs
                                    font-semibold
                                    text-white
                                  "
                                >
                                  Bestseller
                                </span>
                              </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-3 p-6">
                              <div className="text-xs uppercase tracking-[2px] text-gray-400">
                                {p.subheading}
                              </div>

                              <h3 className="line-clamp-2 text-lg font-semibold text-[#355454]">
                                {p.heading}
                              </h3>

                              {p.tagline && (
                                <p className="line-clamp-2 text-sm text-gray-500">
                                  {p.tagline}
                                </p>
                              )}

                              <div className="flex items-center gap-3 pt-2">
                                <span className="text-2xl font-bold text-[#355454]">
                                  ₹{p?.sizes?.[0]?.price?.sellingPrice}
                                </span>

                                <span className="text-gray-400 line-through">
                                  ₹{p?.sizes?.[0]?.price?.mrp}
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <div
                    className="
                      flex
                      flex-col
                      items-center
                      justify-center
                      rounded-[32px]
                      border
                      border-dashed
                      border-gray-200
                      bg-white
                      py-20
                      px-10
                      text-center
                    "
                  >
                    <div
                      className="
                        mb-6
                        flex
                        h-24
                        w-24
                        items-center
                        justify-center
                        rounded-full
                        bg-[#355454]/10
                      "
                    >
                      <Search
                        size={40}
                        className="text-[#355454]"
                      />
                    </div>

                    <h2 className="mb-3 text-3xl font-bold text-[#355454]">
                      No Products Found
                    </h2>

                    <p className="max-w-lg text-gray-500 leading-8">
                      We couldn't find any products matching{" "}
                      <span className="font-semibold text-[#355454]">
                        "{searchQuery}"
                      </span>
                      .
                      <br />
                      Try searching using another ingredient,
                      skin concern or product name.
                    </p>
                  </div>
                )}

                {isTyping && filteredProducts.length > 0 && (
                  <div className="mt-12 flex justify-center">
                    <button
                      className="
                        rounded-full
                        bg-[#355454]
                        px-8
                        py-3
                        text-white
                        font-medium
                        transition-all
                        duration-300
                        hover:bg-[#274040]
                        hover:shadow-xl
                        hover:shadow-[#355454]/20
                      "
                    >
                      SEARCH FOR "{searchQuery.toUpperCase()}"
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );


  if (typeof document !== "undefined") {
    return createPortal(panel, document.body);
  }

  return null;
};