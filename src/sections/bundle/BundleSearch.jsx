"use client";

import React from "react";
import { Search, X } from "lucide-react";

const BundleSearch = ({
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="relative mb-5">
      <Search
        size={18}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#78908f]"
      />

      <input
        type="text"
        value={searchQuery}
        onChange={(e) =>
          setSearchQuery(
            e.target.value
          )
        }
        placeholder="Search products or problems..."
        className="h-12 w-full rounded-full border border-black/10 bg-white pl-12 pr-12 text-sm text-[#355454] outline-none transition placeholder:text-black/40 focus:border-[#457980]"
      />

      {searchQuery && (
        <button
          type="button"
          onClick={() =>
            setSearchQuery("")
          }
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#78908f]"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default BundleSearch;