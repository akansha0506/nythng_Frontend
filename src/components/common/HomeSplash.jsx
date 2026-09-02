"use client";

import React, { useEffect, useState } from "react";

const HomeSplash = ({ children }) => {
  const [showSplash, setShowSplash] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if splash has already been shown
    const splashShown =
      sessionStorage.getItem("nythng_home_splash");

    if (!splashShown) {
      setShowSplash(true);

      // Mark it immediately so refresh won't show video again
      sessionStorage.setItem(
        "nythng_home_splash",
        "true"
      );

      document.body.style.overflow = "hidden";
    }

    setChecking(false);

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleVideoEnd = () => {
    setShowSplash(false);
    document.body.style.overflow = "";
  };

  // Prevent homepage from flashing before
  // sessionStorage check completes
  if (checking) {
    return null;
  }

  return (
    <>
      {/* ==========================================
          FIRST VISIT VIDEO SPLASH
      ========================================== */}

      {showSplash && (
        <div
          className="
            fixed
            inset-0
            z-[99999]
            flex
            h-screen
            w-screen
            items-center
            justify-center
            overflow-hidden
            bg-white
          "
        >
          <video
            src="/videos/nythng-loader.mp4"
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnd}
            className="
              h-full
              w-full
              object-cover
            "
          />
        </div>
      )}
      {/* homepage */}
      {children}
    </>
  );
};

export default HomeSplash;