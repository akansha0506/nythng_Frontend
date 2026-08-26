// "use client";

// import React, { useEffect, useState } from "react";
// import { ArrowRight } from "lucide-react";
// import Link from "next/link";

// const SecondaryButton = ({
//   text = "Shop Now",
//   to = "#",
//   onClick,
// }) => {
//   const [isDesktop, setIsDesktop] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsDesktop(window.innerWidth >= 768);
//     };

//     checkScreenSize();

//     window.addEventListener("resize", checkScreenSize);

//     return () => {
//       window.removeEventListener("resize", checkScreenSize);
//     };
//   }, []);

//   const content = (
//     <button
//       type="button"
//       onClick={onClick}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className="group btn-style505 relative buttonLightColor text-white flex items-center gap-4 px-6 py-3 rounded-full font-medium transition-all duration-300"
//     >
//       {/* Glossy shine effect */}
//       <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

//       {/* Text */}
//       <span className="relative z-10 text-md">
//         {text}
//       </span>

//       {/* Arrow */}
//       <span
//         className={`flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#355454] transition-all duration-300 ${
//           isDesktop && isHovered
//             ? "scale-100"
//             : !isDesktop
//               ? "scale-100"
//               : "scale-20"
//         }`}
//       >
//         <ArrowRight size={16} />
//       </span>
//     </button>
//   );

//   // If onClick exists → normal button
//   // Otherwise → Next.js Link
//   return onClick ? (
//     content
//   ) : (
//     <Link href={to}>
//       {content}
//     </Link>
//   );
// };

// export default SecondaryButton;


"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const SecondaryButton = ({
  text = "Shop Now",
  to = "#",
  onClick,
  className = "",
}) => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const content = (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group btn-style505 relative buttonLightColor text-white flex items-center gap-4 px-6 py-3 rounded-full font-medium transition-all duration-300 ${className}`}
    >
      <span className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="relative z-10 text-md">
        {text}
      </span>

      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#355454] transition-all duration-300 ${
          isDesktop && isHovered
            ? "scale-100"
            : !isDesktop
            ? "scale-100"
            : "scale-20"
        }`}
      >
        <ArrowRight size={16} />
      </span>
    </button>
  );

  return onClick ? content : <Link href={to}>{content}</Link>;
};

export default SecondaryButton;