"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ArrowButton = ({
  color,
  direction,
  onClick,
  hoverColor = "#61b9b9",
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors duration-300 ${className}`}
      style={{
        backgroundColor: isHovered ? hoverColor : color,
      }}
      aria-label={direction === "prev" ? "Previous" : "Next"}
    >
      {direction === "prev" ? (
        <ChevronLeft className="h-5 w-5" />
      ) : (
        <ChevronRight className="h-5 w-5" />
      )}
    </button>
  );
};

export default ArrowButton;