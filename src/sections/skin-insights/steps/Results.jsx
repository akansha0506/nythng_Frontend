"use client";

import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";

import { pageVariants } from "../utils";
import RecommendedProductCard from "../RecommendedProductCard";
import Fadeloader from "@/components/common/Fadeloader";

import { addAllToCart } from "@/redux/slices/cartSlice";

export default function Results({
  answers,
  recommendations = [],
  loading,
  selectedProducts = [],
  onBack,
  resetAll,
  setSelectedProducts,
}) {
  const [adding, setAdding] = React.useState(false);

  const dispatch = useDispatch();

  const handleToggleProduct = (id, checked) => {
    setSelectedProducts((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const handleAddAllToCart = async () => {
    try {
      setAdding(true);

      const selected = recommendations.filter((product) =>
        selectedProducts.includes(product._id || product.id)
      );

      console.log("Selected Products:", selected);

      await dispatch(
        addAllToCart({
          products: selected,
          openside: true,
        })
      ).unwrap();
    } catch (error) {
      console.error("❌ Failed to add all:", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <motion.div
      key="results"
      {...pageVariants}
      className="space-y-5 max-w-7xl mx-auto w-full"
    >
      <div className="rounded-2xl bg-white p-4 md:p-6 w-full border-2 flex flex-col items-center">
        <h2 className="md:text-3xl text-xl font-semibold primaryText">
          Your Personalized Products
        </h2>

        <p className="text-zinc-600 mt-1">
          Tailored for <b>{answers.skinType || "your skin"}</b> skin with{" "}
          <b>
            {answers.concerns.length
              ? `${answers.concerns.length} concern${
                  answers.concerns.length > 1 ? "s" : ""
                }`
              : "your priorities"}
          </b>
          .
        </p>

        <div className="w-full">
          {loading ? (
            <div className="flex justify-center items-center h-64 w-full">
              <Fadeloader />
            </div>
          ) : recommendations.length === 0 ? (
            <p className="text-center text-gray-500 mt-16">
              No products found matching your criteria.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 grid-cols-1 gap-8 mt-16 w-full">
              {recommendations.map((product) => {
                const productId = product._id || product.id;

                return (
                  <RecommendedProductCard
                    key={productId}
                    product={product}
                    heightClass="h-[450px] md:h-[500px] lg:h-[550px] xl:h-[400px]"
                    selected={selectedProducts.includes(productId)}
                    onToggle={handleToggleProduct}
                  />
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <button
            className="rounded-xl border px-4 py-2 hover:border-zinc-300 cursor-pointer hover:scale-105 duration-500"
            onClick={onBack}
          >
            Back
          </button>

          <div className="flex items-center gap-3">
            <button
              className={`rounded-xl px-5 py-2 transition-all duration-500 ${
                selectedProducts.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-[#61b9b9] text-white hover:bg-[#3d6d6d] hover:scale-105 cursor-pointer"
              }`}
              onClick={handleAddAllToCart}
              disabled={selectedProducts.length === 0 || adding}
            >
              {adding ? "Adding..." : "Add Selected to Cart"}
            </button>

            <button
              className="rounded-xl bg-[#61b9b9] text-white px-5 py-2 hover:bg-[#3d6d6d] transition cursor-pointer hover:scale-105 duration-500"
              onClick={resetAll}
            >
              Start Over
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}