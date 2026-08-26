import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const PrimaryButton = ({
  text = "Shop Now",
  to = "#",
  onClick = null,
}) => {
  const content = (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center text-white transition-all duration-300 group cursor-pointer relative"
    >
      <div className="flex items-center bg-black text-white px-8 py-3 rounded-full hover:bg-gray-900 transition-all duration-300">
        <span className="text-sm">{text}</span>
      </div>

      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:translate-x-3 transition-transform duration-300 -ml-1 -rotate-45">
        <ArrowRight size={16} />
      </div>
    </button>
  );

  return onClick ? (
    content
  ) : (
    <Link href={to}>
      {content}
    </Link>
  );
};

export default PrimaryButton;