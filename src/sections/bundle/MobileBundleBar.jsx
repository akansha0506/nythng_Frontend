"use client";

import React from "react";
import { ShoppingBag } from "lucide-react";

const MobileBundleBar = ({
  totalItems,
  totalPrice,
  handleAddToCart,
  isAdding,
}) => {
  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-50 transition-all duration-300 lg:hidden ${
        totalItems === 0
          ? "pointer-events-none translate-y-40 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div className="rounded-2xl bg-[#355454] p-4 shadow-2xl">

        <div className="flex items-center justify-between gap-4">

          <div className="min-w-0">
            <p className="text-sm text-white/70">
              {totalItems}{" "}
              {totalItems === 1
                ? "Item"
                : "Items"}
            </p>

            <h3 className="text-xl font-semibold text-white">
              ₹
              {totalPrice.toLocaleString(
                "en-IN"
              )}
            </h3>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            disabled={isAdding}
            className="flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#355454] disabled:opacity-60 sm:px-6"
          >
            <ShoppingBag
              size={16}
            />

            {isAdding
              ? "Adding..."
              : "Buy Now"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default MobileBundleBar;