"use client";

import { motion } from "framer-motion";

/* ===================== CLASS NAMES HELPER ===================== */

export function classNames(...cn) {
  return cn.filter(Boolean).join(" ");
}

/* =========== PAGE ANIMATION =================== */

export const pageVariants = {
  initial: {
    opacity: 0,
    y: 12,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: -12,
  },

  transition: {
    duration: 0.25,
    ease: "easeOut",
  },
};


// PILL ANIMATION


export const pillVariants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 0 0 rgba(0,0,0,0)",
  },

  hover: {
    y: -2,
    scale: 1.02,
    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
  },

  tap: {
    scale: 0.98,
  },
};

/* ========================= CARD COMPONENT ================= */

export const Card = ({
  active = false,
  children,
  onClick,
}) => {
  return (
    <motion.button
      type="button"
      variants={pillVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={classNames(
        "w-full rounded-2xl border p-4 text-left transition md:p-5",

        active
          ? "border-[#8C6C54] bg-[#8C6C54]/10"
          : "border-zinc-200 bg-white hover:border-zinc-300"
      )}
    >
      {children}
    </motion.button>
  );
};

/* ============ MULTI SELECT PILL ================ */

export const MultiPill = ({
  checked = false,
  label,
  onChange,
}) => {
  return (
    <motion.label
      variants={pillVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      className={classNames(
        "inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm",

        checked
          ? "border-[#8C6C54] bg-[#8C6C54]/10 text-[#8C6C54]"
          : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300"
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />

      <span className="h-2.5 w-2.5 rounded-full border border-current" />

      <span>{label}</span>
    </motion.label>
  );
};