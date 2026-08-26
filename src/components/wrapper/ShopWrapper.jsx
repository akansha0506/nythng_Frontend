"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeadingHighlight from "@/components/ui/HeadingHighlight";

import CategoryTabs from "@/components/shop/CategoryTabs";
import bg from "@/assets/images/shopBg.jpg";
import { css } from "@emotion/react";
import ProductCard from "@/components/common/ProductCard";
import AiBanner from "@/components/layout/AiBanner";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllProducts,
  getAllProductsForSearch,
} from "@/redux/slices/productSlice";
import { fetchWishlist } from "@/redux/slices/wishlistSlice";
import CategoryButtons from "@/components/shop/CategoryButtons";
import useIsDesktop from "@/hooks/useIsDesktop";
import { Search } from "lucide-react";
import Fuse from "fuse.js";
import InnovativeFirsts from "@/components/shop/InnovativeFirsts";

const ShopWrapper = () => {
  const [price, setPrice] = useState(10000);
  const [search, setSearch] = useState("");

  const isDesktop = useIsDesktop();

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const dispatch = useDispatch();

  const productState = useSelector((state) => state.product.allProducts);

  const searchProducts = useSelector(
    (state) => state.product.allProductsForSearch
  );
  // console.log("product-State", productState);

  const allProducts = productState || [];
  // console.log("allProducts",allProducts)

  const [loading, setLoading] = useState(false);

  const { wishlistIds = [] } = useSelector((state) => state.wishlist);
  // console.log(wishlistIds);

  const [activeCategory, setActiveCategory] = useState("all");
  const [activeConcern, setActiveConcern] = useState("all");


  const fuse = new Fuse(searchProducts?.data || [], {
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

  const matchedIds =
    activeConcern === "all"
      ? null
      : new Set(
        fuse.search(activeConcern).map((item) => item.item._id)
      );


  console.log(
    activeConcern,
    fuse.search(activeConcern).map((r) => ({
      id: r.item._id,
      heading: r.item.heading || r.item.name,
      tags: r.item.tags,
    }))
  );

  //code for filtered products
  const filteredProducts = allProducts?.data?.filter((product) => {
    const searchText = search.trim().toLowerCase();

    const heading = product?.heading?.toLowerCase() || "";
    const subheading = product?.subheading?.toLowerCase() || "";
    const labels = product?.labels || [];

    const matchesCategory =
      activeCategory === "all" ||
      labels.some(
        (label) => label.toLowerCase() === activeCategory.toLowerCase()
      );

    const matchesSearch =
      !searchText ||
      heading.includes(searchText) ||
      subheading.includes(searchText) ||
      labels.some((label) =>
        label.toLowerCase().includes(searchText)
      );

    const matchesConcern =
      activeConcern === "all" ||
      matchedIds.has(product._id);

    return matchesCategory && matchesSearch && matchesConcern;
  });


  useEffect(() => {
    const fetch = async () => {
      setLoading(true);

      try {
        await Promise.all([
          dispatch(fetchAllProducts()).unwrap(),
          dispatch(getAllProductsForSearch()).unwrap(),
        ]);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (token && !wishlistIds.length) {
      dispatch(fetchWishlist());
    }
  }, [dispatch, token, wishlistIds.length]);

  // max price logic

  const maxPrice =
    allProducts?.data?.length
      ? Math.max(
        ...allProducts.data.flatMap((product) =>
          product.sizes.map((size) => size.price.sellingPrice)
        )
      )
      : 1000;


  useEffect(() => {
    if (maxPrice) {
      setPrice(maxPrice);
    }
  }, [maxPrice]);


  const concernList = [
    { label: "All", value: "all" },
    { label: "Acne", value: "acne" },
    { label: "Dryness", value: "dryness" },
    { label: "Dark Spots", value: "dark spots" },
    { label: "Pigmentation", value: "pigmentation" },
    { label: "Ageing Signs", value: "ageing signs" },
  ];


  return (
    <main className="min-h-screen bg-[#F8FBFB]">

      {/* ================= Hero ================= */}

      <InnovativeFirsts />
      {/* <section
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(25, 52, 52, 0.35),
              rgba(25, 52, 52, 0.35)
            ),
            url(${bg.src})
          `,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="w-[96%] mx-auto h-[72vh] rounded-[34px] overflow-hidden flex items-end"
      >
        <div className="w-full px-7 md:px-16 pb-14">

      <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 px-5 py-2 text-white text-sm mb-6">
        ✨ Premium Skincare Collection
      </div>

      <HeadingHighlight
        text="Explore Enemies Of Skin Issues"
        className="text-white max-w-2xl"
      />

      <p className="text-white/90 mt-6 max-w-xl leading-8 text-lg">
        Discover dermatologist-inspired skincare essentials
        carefully designed for healthy, glowing skin.
      </p>

    </div>
  </section> */}

      {/* ================= Shop ================= */}

      <section className="w-11/12 mx-auto py-14">

        {/* Toolbar */}

        <div
          className="
        rounded-[32px]
        bg-white
        border
        border-[#E2ECEB]
        shadow-[0_20px_50px_rgba(53,84,84,.08)]
        p-7
        mb-10
      "
        >

          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

            {/* Left */}

            <div>

              <h2 className="text-3xl font-semibold text-[#355454]">
                Shop Collection
              </h2>

              <p className="text-[#7A9594] mt-2">
                Find products specially crafted for your skin.
              </p>

            </div>

          </div>

          {/* <InnovativeFirsts /> */}
        </div>

        {/* Category */}
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar */}
          {isDesktop ? (
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}

              activeConcern={activeConcern}
              onConcernChange={setActiveConcern}

              concerns={concernList}

              price={price}
              setPrice={setPrice}
              maxPrice={maxPrice}
            />
          ) : null}

          {/* Right Content */}
          <div className="flex-1">

            {/* Mobile Category Buttons */}
            {!isDesktop && (
              <div className="mb-8">
                <CategoryButtons
                  activeCategory={activeCategory}
                  onCategoryChange={setActiveCategory}
                />
              </div>
            )}


            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-semibold text-[#355454]">
                  Our Collections
                </h2>

                <p className="text-[#7A9594] mt-1">
                  Showing{" "}
                  <span className="font-semibold text-[#70A3A1]">
                    {filteredProducts?.length}
                  </span>{" "}
                  Products
                </p>
              </div>

              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="h-11 w-72 rounded-full border border-[#DCE7E6] pl-11 pr-5 outline-none focus:border-[#70A3A1]"
                />
              </div>
            </div>

            {/* <InnovativeFirsts /> */}

            {/* Product Grid */}
            <div
              className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
            gap-7
          "
            >
              {filteredProducts?.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-24">

                  <div className="w-24 h-24 rounded-full bg-[#EEF7F6] flex items-center justify-center">
                    <span className="text-4xl">🛍️</span>
                  </div>

                  <h3 className="mt-6 text-2xl font-semibold text-[#355454]">
                    No Products Found
                  </h3>

                  <p className="text-[#8B9F9F] mt-2 text-center">
                    Try selecting another category.
                  </p>

                </div>
              ) : (
                filteredProducts?.map((product) => (
                  <div
                    key={product.id}
                    className="
                  transition-all
                  duration-300
                  hover:-translate-y-2
                "
                  >
                    <ProductCard
                      product={product}
                      wishlistIds={wishlistIds}
                    />
                  </div>
                ))
              )}
            </div>

          </div>

        </div>
      </section>
      <AiBanner />
    </main>
  );
};
export default ShopWrapper;