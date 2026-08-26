"use client";

import React from "react";

const MobileBundleCart = ({
  totalQuantity,
  totalPrice,
  handleAddToCart,
  isAdding,
}) => {
  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-50 transition-all duration-300 lg:hidden ${
        totalQuantity === 0
          ? "translate-y-40 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >

      <div className="rounded-2xl bg-[#355454] px-4 py-4 shadow-2xl sm:px-5">

        <div className="flex items-center justify-between gap-4">

          {/* TOTAL */}

          <div className="min-w-0">

            <p className="text-xs text-white/70">
              {totalQuantity}{" "}
              {totalQuantity === 1
                ? "Combo"
                : "Combos"}
            </p>

            <h3 className="text-lg font-semibold text-white sm:text-xl">
              ₹
              {totalPrice.toLocaleString(
                "en-IN"
              )}
            </h3>

          </div>

          {/* BUTTON */}

          <button
            type="button"
            onClick={
              handleAddToCart
            }
            disabled={isAdding}
            className="shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#355454] disabled:opacity-60 sm:px-6"
          >
            {isAdding
              ? "Adding..."
              : "Buy Now"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default MobileBundleCart;