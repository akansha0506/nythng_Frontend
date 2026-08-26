"use client";

import React, { useState , useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {
  ShoppingBag,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import CartCard from "@/components/cart/CartCard";
import emptyCartImage from "@/assets/images/add-cart.png";
import RightSection from "@/components/cart/RightSection";
import AddressTab from "../user-dashboard/address/AddressTab";
import PincodeChecker from "@/components/cart/PincodeChecker";
import { recommendProducts } from "@/redux/slices/cartSlice";

function Cart() {

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const recommendedProducts = useSelector(
    (state) => state.cart.recommendedProducts
  );

  const [step, setStep] = useState(1);

  const items = cart?.products || [];

  useEffect(() => {
  if (items.length > 0) {
    dispatch(recommendProducts());
  }
}, [dispatch, items.length]);

  const changeStep = (newStep) => {
    if (!items.length && newStep === 2) return;

    setStep(newStep);
  };
  

  return (
    <main
      className=" min-h-screen bg-[#F8FBFB] px-3 pb-12 pt-24 sm:px-4 sm:pt-28 md:px-6 md:pb-16 lg:px-8 lg:pt-32" >
      {/* ================= BACKGROUND GLOW ================= */}

      <div
        className="pointer-events-none fixed -left-40 top-20 hidden h-[380px] w-[380px] rounded-full bg-[#61b9b9]/10
          blur-[120px] sm:block" />

      <div
        className=" pointer-events-none fixed -right-40 bottom-10 hidden h-[420px] w-[420px] rounded-full bg-[#69b4c2]/10 blur-[130px]
         sm:block " />

      <div className="relative mx-auto w-full max-w-[1440px]">
      {/* page header */}
        <div className="mb-5 flex flex-col gap-4 sm:mb-6 md:gap-5 lg:mb-7 lg:flex-row lg:items-end lg:justify-between">
          {/* LEFT */}

          <div className="min-w-0">
            <div className=" mb-2 inline-flex items-center gap-2 rounded-full border border-[#DCEAEA] bg-white
                px-3 py-1.5 shadow-sm sm:mb-3">
              <Sparkles
                size={13}
                className="shrink-0 text-[#61b9b9]"
              />

              <span className=" whitespace-nowrap text-[9px] font-semibold uppercase tracking-[2px]text-[#355454] sm:text-[10px]
                 sm:tracking-[2.5px]">
                Your Shopping Bag
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <h1
                className="text-2xl font-light tracking-tight text-[#183838] sm:text-3xl md:text-4xl">
                My Cart
              </h1>

              <span className=" rounded-full bg-[#EAF7F7] px-2.5 py-1 text-[10px] font-medium text-[#61b9b9] sm:text-xs">
                {items.length}{" "}
                {items.length === 1 ? "item" : "items"}
              </span>
            </div>

            <p className="mt-1.5 max-w-xl text-xs leading-5 text-[#789292] sm:mt-2 sm:text-sm">
              Review your products and continue
              securely to checkout.
            </p>
          </div>

          {/* PINCODE */}

          <div className=" w-full rounded-2xl border border-[#E5EEEE] bg-white p-2 shadow-[0_8px_30px_rgba(53,84,84,0.05)]
              sm:w-fit lg:min-w-[260px]">
            <PincodeChecker />
          </div>
        </div>

    {/* checkout stepper */}

        <div
          className="mb-5 rounded-[20px] border border-[#E5EEEE] bg-white p-3 shadow-[0_10px_35px_rgba(53,84,84,0.06)]
            sm:mb-6 sm:p-4 md:p-5 lg:mb-7">

          <div className="mx-auto flex w-full max-w-2xl items-center">
            {/* ================= STEP 1 ================= */}

            <button
              type="button"
              onClick={() => changeStep(1)}
              className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300
                  sm:h-9 sm:w-9
                  ${
                    step === 1
                      ? "bg-[#61b9b9] text-white shadow-[0_7px_20px_rgba(97,185,185,0.25)]"
                      : "bg-[#EAF7F7] text-[#61b9b9]"
                  }
                `}
              >
                <ShoppingBag
                  size={15}
                  className="sm:h-4 sm:w-4"
                />
              </div>

              <div className="hidden text-left xs:block sm:block">
                <p
                  className={`text-[9px] font-semibold uppercase tracking-[1px] sm:text-[10px] sm:tracking-[1.5px]
                    ${
                      step === 1
                        ? "text-[#355454]"
                        : "text-[#8A9B9B]"
                    }
                  `}
                >
                  Step 1
                </p>

                <p className="text-[10px] text-[#789292] sm:text-xs">
                  My Cart
                </p>
              </div>
            </button>

            {/* ================= PROGRESS LINE ================= */}

            <div className="mx-2 h-px min-w-[20px] flex-1 bg-[#E2EEEE] sm:mx-4">
              <div
                className="
                  h-full
                  bg-[#61b9b9]
                  transition-all
                  duration-500
                "
                style={{
                  width: step === 2 ? "100%" : "0%",
                }}
              />
            </div>

            {/* ================= STEP 2 ================= */}

            <button
              type="button"
              onClick={() => changeStep(2)}
              disabled={!items.length}
              className="flex min-w-0 shrink-0 items-center gap-2 disabled:cursor-not-allowed sm:gap-2.5">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:h-9
                  sm:w-9
                  ${
                    step === 2
                      ? "bg-[#61b9b9] text-white shadow-[0_7px_20px_rgba(97,185,185,0.25)]"
                      : "bg-[#EDF4F4] text-[#8A9B9B]"
                  }
                `}
              >
                <MapPin
                  size={15}
                  className="sm:h-4 sm:w-4"
                />
              </div>

              <div className="hidden text-left sm:block">
                <p
                  className={`text-[9px] font-semibold uppercase tracking-[1px] sm:text-[10px] sm:tracking-[1.5px]
                    ${
                      step === 2
                        ? "text-[#355454]"
                        : "text-[#8A9B9B]"
                    }
                  `}
                >
                  Step 2
                </p>

                <p className="text-[10px] text-[#789292] sm:text-xs">
                  Delivery Address
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* main content */}
        <div
          className="grid grid-cols-1 items-start gap-5 md:gap-6
            lg:grid-cols-[minmax(0,1.55fr)_minmax(300px,0.9fr)] lg:gap-7
            xl:grid-cols-[minmax(0,1.6fr)_minmax(340px,0.85fr)]
          ">
         {/* left section */}

          <div className="min-w-0">
            {/* ================= CART STEP ================= */}

            {step === 1 && (
              <div className="space-y-5 md:space-y-6">
                {/* EMPTY CART */}

                {items.length === 0 ? (
                  <div
                    className="flex min-h-[360px] flex-col items-center justify-center rounded-[22px] border border-[#E5EEEE]
                      bg-white px-5 py-10
                      text-center
                      shadow-[0_15px_50px_rgba(53,84,84,0.06)]
                      sm:min-h-[420px]
                      sm:rounded-[26px]
                      sm:px-6
                    "
                  >
                    <div
                      className="
                        mb-5
                        flex
                        h-18
                        w-18
                        items-center
                        justify-center
                        rounded-full
                        bg-[#EAF7F7]
                        sm:h-20
                        sm:w-20
                      "
                    >
                      <img
                        src={emptyCartImage.src}
                        alt="Empty Cart"
                        className="
                          h-12
                          w-12
                          object-contain
                          opacity-75
                          sm:h-14
                          sm:w-14
                        "
                      />
                    </div>

                    <h2
                      className="
                        text-lg
                        font-semibold
                        text-[#183838]
                        sm:text-xl
                      "
                    >
                      Your cart is empty
                    </h2>

                    <p
                      className="
                        mt-2
                        max-w-sm
                        text-xs
                        leading-5
                        text-[#789292]
                        sm:text-sm
                        sm:leading-6
                      "
                    >
                      Looks like you haven't added
                      anything to your cart yet.
                      Discover something you'll love.
                    </p>

                    <Link
                      href="/shop"
                      className="
                        mt-5
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-gradient-to-r
                        from-[#61b9b9]
                        via-[#6eb7c1]
                        to-[#69b4c2]
                        px-5
                        py-2.5
                        text-xs
                        font-semibold
                        text-white
                        shadow-[0_10px_25px_rgba(97,185,185,0.22)]
                        transition-all
                        duration-300
                        hover:-translate-y-0.5
                        sm:mt-6
                        sm:px-6
                        sm:py-3
                        sm:text-sm
                      "
                    >
                      Continue Shopping
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                ) : (
                  /* ================= CART ITEMS ================= */

                  <div
                    className="
                      rounded-[22px]
                      border
                      border-[#E5EEEE]
                      bg-white
                      p-3
                      shadow-[0_15px_50px_rgba(53,84,84,0.06)]
                      sm:rounded-[26px]
                      sm:p-5
                    "
                  >
                    <div
                      className="
                        mb-4
                        flex
                        items-center
                        justify-between
                        gap-3
                      "
                    >
                      <div className="min-w-0">
                        <h2
                          className="
                            text-base
                            font-semibold
                            text-[#183838]
                            sm:text-lg
                          "
                        >
                          Cart Items
                        </h2>

                        <p className="mt-0.5 text-[10px] text-[#8A9B9B] sm:text-xs">
                          Your selected products
                        </p>
                      </div>

                      <span
                        className="
                          shrink-0
                          rounded-full
                          bg-[#F1F8F8]
                          px-2.5
                          py-1
                          text-[10px]
                          font-medium
                          text-[#61b9b9]
                          sm:px-3
                          sm:text-[11px]
                        "
                      >
                        {items.length} products
                      </span>
                    </div>

                    <div
                      className={`
                        space-y-3
                        pr-0.5
                        sm:space-y-4
                        sm:pr-1
                        ${
                          recommendedProducts?.length > 0
                            ? "lg:max-h-[55vh] lg:overflow-y-auto"
                            : "lg:max-h-[68vh] lg:overflow-y-auto"
                        }
                      `}
                    >
                      {items.map((item, index) => (
                        <CartCard
                          item={item}
                          key={
                            item?._id ||
                            item?.id ||
                            index
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* ================= RECOMMENDED ================= */}

                {recommendedProducts &&
                  recommendedProducts.length > 0 && (
                    <div
                      className="
                        rounded-[22px]
                        border
                        border-[#E5EEEE]
                        bg-white
                        p-4
                        shadow-[0_15px_50px_rgba(53,84,84,0.06)]
                        sm:rounded-[26px]
                        sm:p-5
                      "
                    >
                      <div className="mb-4 sm:mb-5">
                        <span
                          className="
                            text-[9px]
                            font-semibold
                            uppercase
                            tracking-[2px]
                            text-[#61b9b9]
                            sm:text-[10px]
                            sm:tracking-[2.5px]
                          "
                        >
                          You May Also Like
                        </span>

                        <h2
                          className="
                            mt-1
                            text-lg
                            font-light
                            text-[#183838]
                            sm:text-xl
                          "
                        >
                          Recommended for you
                        </h2>
                      </div>

                      <div
                        className="
                          grid
                          grid-cols-1
                          gap-4
                          sm:gap-5
                          md:grid-cols-2
                        "
                      >
                        {recommendedProducts.map(
                          (item, index) => (
                            <CartCard
                              item={item}
                              key={
                                item?._id ||
                                item?.id ||
                                index
                              }
                              type="recommended"
                            />
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            )}

            {/* ===================================================
                ADDRESS STEP
            =================================================== */}

            {step === 2 && (
              <div
                className="
                  rounded-[22px]
                  border
                  border-[#E5EEEE]
                  bg-white
                  p-3
                  shadow-[0_15px_50px_rgba(53,84,84,0.06)]
                  sm:rounded-[26px]
                  sm:p-5
                  md:p-6
                "
              >
                <div className="mb-4 sm:mb-5">
                  <span
                    className="
                      text-[9px]
                      font-semibold
                      uppercase
                      tracking-[2px]
                      text-[#61b9b9]
                      sm:text-[10px]
                      sm:tracking-[2.5px]
                    "
                  >
                    Delivery Details
                  </span>

                  <h2
                    className="
                      mt-1
                      text-lg
                      font-light
                      text-[#183838]
                      sm:text-xl
                      md:text-2xl
                    "
                  >
                    Choose your delivery address
                  </h2>

                  <p
                    className="
                      mt-1
                      text-[11px]
                      leading-5
                      text-[#789292]
                      sm:text-xs
                    "
                  >
                    Select where you'd like your order delivered.
                  </p>
                </div>

                {/* Address content */}

                <div
                  className="
                    w-full
                    lg:max-h-[65vh]
                    lg:overflow-y-auto
                    lg:pr-1
                  "
                >
                  <AddressTab />
                </div>
              </div>
            )}
          </div>

          {/* ===================================================
              RIGHT SECTION
          =================================================== */}

          <aside
            className="
              min-w-0
              lg:sticky
              lg:top-24
              lg:self-start
            "
          >
            <div
              className="
                rounded-[22px]
                border
                border-[#E5EEEE]
                bg-white
                p-3
                shadow-[0_15px_50px_rgba(53,84,84,0.08)]
                sm:rounded-[26px]
                sm:p-4
                md:p-5
              "
            >
              <RightSection
                changeStep={changeStep}
                step={step}
              />
            </div>

            {/* ================= TRUST ================= */}

            <div
              className="
                mt-3
                flex
                items-center
                justify-center
                gap-2
                rounded-2xl
                border
                border-[#E5EEEE]
                bg-white
                px-3
                py-2.5
                sm:mt-4
                sm:px-4
                sm:py-3
              "
            >
              <ShieldCheck
                size={14}
                className="shrink-0 text-[#61b9b9]"
              />

              <span
                className="
                  text-[10px]
                  text-[#789292]
                  sm:text-[11px]
                "
              >
                Secure & protected checkout
              </span>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;