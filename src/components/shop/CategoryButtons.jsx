"use client";

import React, { useEffect, useState } from "react";
import {
  LayoutGrid,
  Gem,
  Crown,
  Leaf,
  SlidersHorizontal,
  RotateCcw,
} from "lucide-react";

function CategoryButtons({
  onCategoryChange,
  activeCategory,
  price,
  setPrice,
  maxPrice,
}) {
  const [showFilter, setShowFilter] = useState(false);

  const [tempCategory, setTempCategory] = useState(activeCategory);
  const [tempPrice, setTempPrice] = useState(price);

  useEffect(() => {
    setTempCategory(activeCategory);
    setTempPrice(price);
  }, [activeCategory, price]);

  const categories = [
    {
      label: "All",
      value: "all",
      icon: LayoutGrid,
    },
    {
      label: "Featured",
      value: "featured",
      icon: Gem,
    },
    {
      label: "Best Seller",
      value: "best seller",
      icon: Crown,
    },
    {
      label: "New Arrival",
      value: "new arrival",
      icon: Leaf,
    },
  ];

  const handleReset = () => {
    // Reset local state
    setTempCategory("all");
    setTempPrice(maxPrice);

    // Immediately apply reset
    onCategoryChange("all");
    setPrice(maxPrice);

    // Close the filter panel
    setShowFilter(false);
  };

  const handleApply = () => {
    onCategoryChange(tempCategory);
    setPrice(tempPrice);
    setShowFilter(false);
  };

  return (
    <div className="mb-6">
      {/* Filter Button */}
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="flex items-center gap-2 rounded-xl bg-[#70A3A1] px-4 py-3 text-white shadow-md"
      >
        <SlidersHorizontal size={18} />
        Filters
      </button>

      {/* Filter Panel */}
      {showFilter && (
        <div className="mt-4 rounded-3xl border border-[#E6EEEE] bg-white p-5 shadow-lg">
          {/* Categories */}
          <h3 className="mb-4 font-semibold text-[#355454]">
            Categories
          </h3>

          <div
            className="flex gap-3 overflow-x-auto pb-2"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
            }}
          >
            {categories.map((category) => {
              const Icon = category.icon;

              return (
                <button
                  key={category.value}
                  onClick={() =>
                    setTempCategory(category.value)
                  }
                  className={`
                    flex items-center gap-2
                    rounded-full
                    border
                    px-4
                    py-2.5
                    whitespace-nowrap
                    transition-all
                    duration-300
                    shrink-0

                    ${
                      tempCategory === category.value
                        ? "bg-[#70A3A1] text-white border-[#70A3A1]"
                        : "bg-[#F8FBFB] text-[#355454] border-[#E6EEEE]"
                    }
                  `}
                >
                  <Icon size={16} />

                  <span className="text-sm font-medium">
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Price */}
          {/* <div className="mt-8">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-[#355454]">
                Price
              </span>

              <span className="font-semibold text-[#70A3A1]">
                ₹{tempPrice}
              </span>
            </div>

            <input
              type="range"
              min={0}
              max={maxPrice}
              value={tempPrice}
              onChange={(e) =>
                setTempPrice(Number(e.target.value))
              }
              className="w-full accent-[#70A3A1]"
            />

            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>₹0</span>
              <span>₹{maxPrice}</span>
            </div>
          </div> */}

          {/* Buttons */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={handleReset}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#E6EEEE] py-3 text-[#355454]"
            >
              <RotateCcw size={16} />
              Reset
            </button>

            <button
              onClick={handleApply}
              className="flex-1 rounded-xl bg-[#70A3A1] py-3 font-semibold text-white"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryButtons;