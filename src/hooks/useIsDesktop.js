import { useEffect, useState } from "react";

/**
 * Custom hook to detect if the screen width is strictly greater than the given breakpoint.
 * @param {number} breakpoint - The breakpoint in pixels (default is 1024)
 * @returns {boolean} - Whether the screen is wider than the breakpoint
 */
export default function useIsDesktop(breakpoint = 1024) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth > breakpoint); // strictly greater than
    };

    checkScreenSize(); // run once on mount
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);

  return isDesktop;
}
