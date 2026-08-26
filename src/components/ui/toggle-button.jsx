"use client";

import React, { useEffect, useRef } from "react";

const LanguageToggle = () => {
  const isScriptAdded = useRef(false);

  useEffect(() => {
    if (isScriptAdded.current) return;

    // Google Translate callback
    window.googleTranslateElementInit = () => {
      if (
        window.google &&
        window.google.translate &&
        window.google.translate.TranslateElement
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es",
            layout:
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };

    // Check if script already exists
    const existingScript = document.querySelector(
      'script[src*="translate.google.com/translate_a/element.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");

      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

      script.async = true;

      document.body.appendChild(script);
    }

    isScriptAdded.current = true;

    return () => {
      // Don't remove Google's script because it can be reused
    };
  }, []);

  return (
    <div
      className="inline-flex items-center"
    />
  );
};

export default LanguageToggle;