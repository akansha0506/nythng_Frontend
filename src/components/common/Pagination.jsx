"use client";

import React, { useEffect } from "react";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  handleLimitChange,
  limit,
}) => {
  const getVisiblePages = () => {
    let pages = [];

    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) {
      pages.push("...");
    }

    if (!pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <div className="flex flex-wrap justify-center items-center gap-3 mt-6">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-[#CFB8A1] disabled:opacity-40 transition cursor-pointer disabled:cursor-not-allowed"
      >
        <span className="text-sm">←</span>
        <span className="text-sm">Prev</span>
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, idx) => (
        <button
          key={idx}
          onClick={() =>
            typeof page === "number" && onPageChange(page)
          }
          disabled={page === "..."}
          className={`px-3 py-1.5 rounded-full text-sm transition font-medium cursor-pointer disabled:cursor-not-allowed ${
            page === currentPage
              ? "bg-[#61b9b9] text-white shadow"
              : "bg-gray-100 hover:bg-[#dac5b1] text-[#332A24]"
          } ${page === "..." && "cursor-default opacity-60"}`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-40 transition cursor-pointer disabled:cursor-not-allowed"
      >
        <span className="text-sm">Next</span>
        <span className="text-sm">→</span>
      </button>

      {/* Limit Dropdown */}
      {limit && (
        <div className="ml-4 flex items-center space-x-2">
          <label
            htmlFor="limit"
            className="text-sm font-medium text-gray-700"
          >
            Show:
          </label>

          <select
            id="limit"
            value={limit}
            disabled={
              handleLimitChange === undefined ||
              handleLimitChange === null
            }
            onChange={(e) =>
              handleLimitChange(Number(e.target.value))
            }
            className="px-2.5 py-1.5 border border-gray-300 rounded-md text-sm bg-white shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;