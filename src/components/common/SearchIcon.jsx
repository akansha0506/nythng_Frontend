"use client";

import { cn } from "@/lib/utils";
// import { cn } from "@/lib/utils";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from "react";

const SearchIcon = forwardRef(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 28,
      durationMultiplier = 1,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const reduced = useReducedMotion();
    const isControlled = useRef(false);

    useImperativeHandle(ref, () => {
      isControlled.current = true;

      return {
        startAnimation: () =>
          reduced
            ? controls.start("normal")
            : controls.start("animate"),

        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleEnter = useCallback(
      (e) => {
        if (reduced) return;

        if (!isControlled.current) {
          controls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, reduced, onMouseEnter]
    );

    const handleLeave = useCallback(
      (e) => {
        if (!isControlled.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    const circleVariants = {
      normal: {
        strokeDashoffset: 0,
        opacity: 1,
        scale: 1,
      },

      animate: {
        strokeDashoffset: [50, 0],
        opacity: [0.3, 1],
        scale: [1, 1.1, 1],

        transition: {
          duration: 0.8 * durationMultiplier,
          ease: "easeInOut",
        },
      },
    };

    const handleVariants = {
      normal: {
        strokeDashoffset: 0,
        opacity: 1,
      },

      animate: {
        strokeDashoffset: [20, 0],
        opacity: [0, 1],

        transition: {
          duration: 0.6 * durationMultiplier,
          delay: 0.3,
          ease: "easeInOut",
        },
      },
    };

    const groupVariants = {
      normal: {
        rotate: 0,
        scale: 1,
      },

      animate: {
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],

        transition: {
          duration: 1 * durationMultiplier,
          ease: "easeInOut",
        },
      },
    };

    return (
      <motion.div
        className={cn(
          "inline-flex items-center justify-center",
          className
        )}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search-icon lucide-search"
        >
          <motion.g
            variants={groupVariants}
            initial="normal"
            animate={controls}
          >
            <motion.circle
              cx="11"
              cy="11"
              r="8"
              strokeDasharray="50"
              strokeDashoffset="50"
              variants={circleVariants}
              initial="normal"
              animate={controls}
            />

            <motion.path
              d="m21 21-4.34-4.34"
              strokeDasharray="20"
              strokeDashoffset="20"
              variants={handleVariants}
              initial="normal"
              animate={controls}
            />
          </motion.g>
        </motion.svg>
      </motion.div>
    );
  }
);

SearchIcon.displayName = "SearchIcon";

const ShoppingCartIcon = forwardRef(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 28,
      durationMultiplier = 1,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const reduced = useReducedMotion();
    const isControlled = useRef(false);

    useImperativeHandle(ref, () => {
      isControlled.current = true;

      return {
        startAnimation: () =>
          reduced
            ? controls.start("normal")
            : controls.start("animate"),

        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleEnter = useCallback(
      (e) => {
        if (reduced) return;

        if (!isControlled.current) {
          controls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, reduced, onMouseEnter]
    );

    const handleLeave = useCallback(
      (e) => {
        if (!isControlled.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    const cartVariants = {
      normal: {
        y: 0,
        rotate: 0,
        scale: 1,
      },

      animate: {
        y: [0, -3, 0, -1, 0],
        rotate: [0, -4, 3, -2, 0],

        transition: {
          duration: 1.8 * durationMultiplier,
          ease: "easeInOut",
        },
      },
    };

    const wheelVariants = {
      normal: {
        rotate: 0,
      },

      animate: {
        rotate: [0, 360],

        transition: {
          duration: 1 * durationMultiplier,
          ease: "linear",
        },
      },
    };

    return (
      <motion.div
        className={cn(
          "inline-flex items-center justify-center",
          className
        )}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="normal"
          animate={controls}
        >
          <motion.circle
            cx="8"
            cy="21"
            r="1"
            variants={wheelVariants}
          />

          <motion.circle
            cx="19"
            cy="21"
            r="1"
            variants={wheelVariants}
          />

          <motion.path
            d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"
            variants={cartVariants}
          />
        </motion.svg>
      </motion.div>
    );
  }
);

ShoppingCartIcon.displayName = "ShoppingCartIcon";

/* =========================================
   User Round Icon
========================================= */

const UserRoundIcon = forwardRef(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 28,
      speed = 1,
      ...props
    },
    ref
  ) => {
    const controls = useAnimation();
    const reduced = useReducedMotion();
    const isControlled = useRef(false);

    useImperativeHandle(ref, () => {
      isControlled.current = true;

      return {
        startAnimation: () =>
          reduced
            ? controls.start("normal")
            : controls.start("animate"),

        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleEnter = useCallback(
      (e) => {
        if (reduced) return;

        if (!isControlled.current) {
          controls.start("animate");
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, reduced, onMouseEnter]
    );

    const handleLeave = useCallback(
      (e) => {
        if (!isControlled.current) {
          controls.start("normal");
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    const headVariants = {
      normal: {
        scale: 1,
        opacity: 1,
      },

      animate: {
        scale: [0.5, 1.2, 1],
        opacity: [0, 1],

        transition: {
          duration: 0.6 * speed,
          ease: "easeOut",
        },
      },
    };

    const curveVariants = {
      normal: {
        strokeDashoffset: 0,
        opacity: 1,
      },

      animate: {
        strokeDashoffset: [40, 0],
        opacity: [0.3, 1],

        transition: {
          duration: 0.6 * speed,
          delay: 0.3,
          ease: "easeInOut",
        },
      },
    };

    return (
      <motion.div
        className={cn(
          "inline-flex items-center justify-center",
          className
        )}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user-round-icon lucide-user-round"
        >
          <motion.circle
            cx="12"
            cy="8"
            r="5"
            variants={headVariants}
            initial="normal"
            animate={controls}
          />

          <motion.path
            d="M20 21a8 8 0 0 0-16 0"
            strokeDasharray="40"
            strokeDashoffset="0"
            variants={curveVariants}
            initial="normal"
            animate={controls}
          />
        </motion.svg>
      </motion.div>
    );
  }
);

UserRoundIcon.displayName = "UserRoundIcon";


SearchIcon.displayName = "SearchIcon";
ShoppingCartIcon.displayName = "ShoppingCartIcon";
UserRoundIcon.displayName = "UserRoundIcon";


export {
  SearchIcon,
  ShoppingCartIcon,
  UserRoundIcon,
};