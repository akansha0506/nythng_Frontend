"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/redux/slices/languageSlice";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageToggle = () => {
  const dispatch = useDispatch();

  const language = useSelector(
    (state) => state.language.value
  );

  const [open, setOpen] = useState(false);

  const languages = [
    {
      label: "English",
      value: "en",
      code: "EN",
      flag: "https://flagcdn.com/24x18/gb.png",
    },
    {
      label: "Spanish",
      value: "es",
      code: "ESP",
      flag: "https://flagcdn.com/24x18/es.png",
    },
  ];

  const selectedLang =
    languages.find(
      (lang) => lang.value === language
    ) || languages[0];

  const handleLanguageChange = (value) => {
    if (value === language) {
      setOpen(false);
      return;
    }

    const select =
      document.querySelector(".goog-te-combo");

    if (!select) {
      console.error(
        "Google Translate is not initialized"
      );
      return;
    }

    select.value = value;

    select.dispatchEvent(
      new Event("change", {
        bubbles: true,
      })
    );

    dispatch(setLanguage(value));

    setOpen(false);
  };

  return (
    <section className="relative z-50 notranslate">
      
      {/* DESKTOP */}
      <div className="hidden lg:block relative">
        <button
          type="button"
          onClick={() =>
            setOpen((prev) => !prev)
          }
          className="flex items-center gap-2 px-2 py-2 text-white"
        >
          <img
            src={selectedLang.flag}
            alt={selectedLang.label}
            className="w-6 h-4 object-cover"
          />

          <span
            translate="no"
            className="text-xs font-semibold"
          >
            {selectedLang.code}
          </span>
        </button>

        {open && (
          <div
            className="
              absolute
              right-0
              top-full
              mt-2
              w-[100px]
              overflow-hidden
              rounded-xl
              bg-white
              shadow-xl
              border
              border-gray-100
            "
          >
            {languages.map(
              ({
                label,
                value,
                code,
                flag,
              }) => (
                <button
                  type="button"
                  key={value}
                  onClick={() =>
                    handleLanguageChange(value)
                  }
                  className="
                    flex
                    w-full
                    items-center
                    gap-2
                    px-3
                    py-2.5
                    text-sm
                    text-[#2b6161]
                    hover:bg-gray-100
                    transition
                  "
                >
                  <img
                    src={flag}
                    alt={label}
                    className="w-5 h-3.5"
                  />

                  <span translate="no">
                    {code}
                  </span>
                </button>
              )
            )}
          </div>
        )}
      </div>

      {/* MOBILE */}
      <div className="lg:hidden">
        <Select
          value={language}
          onValueChange={handleLanguageChange}
        >
          <SelectTrigger
            className="
              w-[160px]
              border-white/20
              bg-white/10
              text-white
              shadow-none
              focus:ring-0
            "
          >
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            {languages.map(
              ({
                label,
                value,
                flag,
              }) => (
                <SelectItem
                  key={value}
                  value={value}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={flag}
                      alt={label}
                      className="w-5 h-3.5"
                    />

                    <span translate="no">
                      {label}
                    </span>
                  </div>
                </SelectItem>
              )
            )}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default LanguageToggle;