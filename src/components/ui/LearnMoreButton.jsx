import React from "react";
import Link from "next/link";

const LearnMoreButton = ({
  to,
  text,
  className = "",
}) => {
  return (
    <Link href={to}>
      <span
        className={`group inline-block rounded-full border bg-[#61b9b9] px-6 py-2 text-base text-white cursor-pointer hover:scale-105 duration-100 ${className}`}
      >
        {text || "Learn More"}
      </span>
    </Link>
  );
};

export default LearnMoreButton;