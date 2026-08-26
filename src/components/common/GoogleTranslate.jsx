"use client";

import { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Already initialized
    if (window.__googleTranslateInitialized) {
      return;
    }

    window.__googleTranslateInitialized = true;

    window.googleTranslateElementInit = () => {
      const element = document.getElementById(
        "google_translate_element"
      );

      if (
        !element ||
        element.dataset.initialized === "true"
      ) {
        return;
      }

      if (
        window.google?.translate?.TranslateElement
      ) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,es",
            autoDisplay: false,
          },
          "google_translate_element"
        );

        element.dataset.initialized = "true";
      }
    };

    const existingScript = document.getElementById(
      "google-translate-script"
    );

    if (!existingScript) {
      const script = document.createElement("script");

      script.id = "google-translate-script";

      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";

      script.async = true;

      document.body.appendChild(script);
    } else if (
      window.google?.translate?.TranslateElement
    ) {
      window.googleTranslateElementInit();
    }
  }, []);

  return null;
};

export default GoogleTranslate;