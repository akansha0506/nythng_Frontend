"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

import mv5 from "@/assets/images/new_images/new_bottle.png";

import "@/app/innovative.css";

const innovativeProducts = [
  {
    number: "01",
    name: "MV5",
    subtitle: "Multivitamin Face Serum",
    image: mv5,
    description:
      "A powerful blend of vitamins & antioxidants that hydrates, nourishes & protects skin daily.",
  },
  {
    number: "02",
    name: "AGEVANA",
    subtitle: "Age Defence Serum",
    image: mv5,
    description:
      "Helps fight early signs of ageing and supports firm, youthful skin.",
  },
  {
    number: "03",
    name: "HOMEØ HEAL",
    subtitle: "Skin Barrier Serum",
    image: mv5,
    description:
      "Strengthens skin barrier, soothes irritation & locks in long-lasting hydration.",
  },
  {
    number: "04",
    name: "NAD GLOW",
    subtitle: "Face Serum",
    image: mv5,
    description:
      "Boosts natural radiance, evens tone & revitalizes dull, tired skin.",
  },
  {
    number: "05",
    name: "SEPI BRIGHT",
    subtitle: "Face Serum",
    image: mv5,
    description:
      "Brightens skin, reduces spots & reveals a clearer, more even complexion.",
  },
];

const promises = [
  {
    icon: "✧",
    title: "CLEAN INGREDIENTS",
  },
  {
    icon: "♧",
    title: "CLINICALLY TESTED",
  },
  {
    icon: "♢",
    title: "SAFE & EFFECTIVE",
  },
  {
    icon: "✦",
    title: "RESULTS DRIVEN",
  },
];

export default function InnovativeFirsts() {
  const total = innovativeProducts.length;

  const [activeIndex, setActiveIndex] = useState(2);

  const [isAnimating, setIsAnimating] = useState(false);

  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);

  const autoSlideRef = useRef(null);


  const goPrevious = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setActiveIndex((prev) => {
      if (prev === 0) {
        return total - 1;
      }

      return prev - 1;
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 1150);
  };


  /* =====================================================
     NEXT

     03 → 04
     04 → 05
     05 → 01
     01 → 02
     02 → 03
  ===================================================== */

  const goNext = () => {
    if (isAnimating) return;

    setIsAnimating(true);

    setActiveIndex((prev) => {
      if (prev === total - 1) {
        return 0;
      }

      return prev + 1;
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, 1150);
  };


  /* =====================================================
     AUTO SLIDER
  ===================================================== */

  const startAutoSlide = () => {
    clearInterval(autoSlideRef.current);

    autoSlideRef.current = setInterval(() => {
      goPrevious();
    }, 3500);
  };


  useEffect(() => {
    startAutoSlide();

    return () => {
      clearInterval(autoSlideRef.current);
    };
  }, []);


  /* =====================================================
     MANUAL PREVIOUS
  ===================================================== */

  const handlePrevious = () => {
    clearInterval(autoSlideRef.current);

    goPrevious();

    setTimeout(() => {
      startAutoSlide();
    }, 1200);
  };


  /* =====================================================
     MANUAL NEXT
  ===================================================== */

  const handleNext = () => {
    clearInterval(autoSlideRef.current);

    goNext();

    setTimeout(() => {
      startAutoSlide();
    }, 1200);
  };


  /* =====================================================
     POINTER DOWN
  ===================================================== */

  const handlePointerDown = (event) => {
    if (isAnimating) return;

    setIsDragging(true);

    startX.current = event.clientX;
  };


  /* =====================================================
     POINTER UP
  ===================================================== */

  const handlePointerUp = (event) => {
    if (!isDragging) return;

    setIsDragging(false);

    const difference = event.clientX - startX.current;

    if (Math.abs(difference) < 50) {
      return;
    }

    /*
     * Swipe LEFT
     */
    if (difference < 0) {
      handleNext();
    }

    /*
     * Swipe RIGHT
     */
    else {
      handlePrevious();
    }
  };


  const handlePointerCancel = () => {
    setIsDragging(false);
  };

  // get position

  const getPosition = (index) => {
    let difference = index - activeIndex;

    if (difference > 2) {
      difference -= total;
    }

    if (difference < -2) {
      difference += total;
    }

    if (difference === 0) {
      return "center";
    }

    if (difference === -1) {
      return "left";
    }

    if (difference === 1) {
      return "right";
    }

    if (difference === -2) {
      return "far-left";
    }

    if (difference === 2) {
      return "far-right";
    }

    return "hidden";
  };


  return (
    <section className="innovative-firsts">

      <div className="innovative-container">


        {/* =================================================
            LEFT INTRO
        ================================================= */}

        <div className="innovative-intro">

          <div className="innovative-intro-line">
            <span />
          </div>

          <p className="innovative-eyebrow">
            OUR PROMISE OF
          </p>

          <h2>
            INNOVATIVE
            <br />
            FIRSTS

            <span className="innovative-star">
              ✦
            </span>
          </h2>

          <div className="innovative-heading-line">
            <span />
          </div>

          <p className="innovative-description">
            Advanced Formulations
            <br />
            That Set New Standards.
          </p>

        </div>


        {/* =================================================
            PRODUCT STAGE
        ================================================= */}

        <div
          className={`innovative-stage ${isDragging ? "is-dragging" : ""
            }`}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
        >


          {/* =================================================
              FIXED NUMBERS
          ================================================= */}

          <div className="innovative-fixed-numbers">

            <span className="fixed-number fixed-number-01">
              01
            </span>

            <span className="fixed-number fixed-number-02">
              02
            </span>

            <span className="fixed-number fixed-number-03">
              03
            </span>

            <span className="fixed-number fixed-number-04">
              04
            </span>

            <span className="fixed-number fixed-number-05">
              05
            </span>

          </div>


          {/* =================================================
              ARC
          ================================================= */}

          <div className="innovative-arc" />


          {/* =================================================
              PRODUCTS

              Bottle + Content are ONE ELEMENT
          ================================================= */}

          <div className="innovative-products">

            {innovativeProducts.map((product, index) => {

              const position = getPosition(index);

              return (
                <div
                  key={product.number}
                  className={`innovative-product product-${position}`}
                >

                  {/* BOTTLE */}

                  <div className="innovative-product-bottle">

                    <Image
                      src={product.image}
                      alt={product.name}
                      width={220}
                      height={390}
                      className="bottle-image"
                      priority={index === 2}
                    />

                  </div>


                  {/* CONTENT */}

                  <div className="innovative-product-content">

                    <h3>
                      {product.name}
                    </h3>

                    <p className="innovative-product-subtitle">
                      {product.subtitle}
                    </p>

                    <span className="innovative-divider" />

                    <p className="innovative-product-description">
                      {product.description}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>


          {/* =================================================
              CONTROLS
          ================================================= */}

          <div className="innovative-controls">

            <button
              type="button"
              className="innovative-arrow"
              aria-label="Previous product"
              onPointerDown={(event) => {
                event.stopPropagation();
              }}
              onClick={(event) => {
                event.stopPropagation();
                handlePrevious();
              }}
            >
              ←
            </button>


            <div className="innovative-progress">

              <span className="innovative-progress-current">
                {innovativeProducts[activeIndex].number}
              </span>

              <span className="innovative-progress-line" />

              <span className="innovative-progress-total">
                05
              </span>

            </div>


            <button
              type="button"
              className="innovative-arrow"
              aria-label="Next product"
              onPointerDown={(event) => {
                event.stopPropagation();
              }}
              onClick={(event) => {
                event.stopPropagation();
                handleNext();
              }}
            >
              →
            </button>

          </div>

        </div>


        {/* =================================================
            PROMISES
        ================================================= */}

        <div className="innovative-promises">

          {promises.map((promise, index) => (

            <React.Fragment key={promise.title}>

              <div className="innovative-promise">

                <span className="innovative-promise-icon">
                  {promise.icon}
                </span>

                <span className="innovative-promise-title">
                  {promise.title}
                </span>

              </div>

              {index !== promises.length - 1 && (
                <div className="innovative-promise-separator" />
              )}

            </React.Fragment>

          ))}

        </div>

      </div>

    </section>
  );
}