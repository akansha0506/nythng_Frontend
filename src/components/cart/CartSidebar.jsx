"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  getCart,
  toggleSidebar,
} from "@/redux/slices/cartSlice";

import { X } from "lucide-react";

import CartCard from "./CartCard";

import emptyCartImage from "@/assets/images/addCart.png";

const CartSidebar = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();

  // ================= CART STATE =================

  const {
    isSidebarOpen,
    cart,
    recommendedProducts,
    coupons,
  } = useSelector((state) => state.cart);

  // ================= AUTH STATE =================

  const { user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [loading, setLoading] = useState(false);

  // Logged in check
  const isLoggedIn = Boolean(user || isAuthenticated);

  // ================= CART DATA =================

  const items = cart?.products || [];

  const totalBeforeDiscount =
    cart?.totalBeforeDiscount || 0;

  // ================= TOTAL MRP =================

  const totalMrp = items.reduce(
    (total, item) => {
      const size = item.size;

      return (
        total +
        (Number(size?.price?.mrp) || 0) *
          (Number(item.quantity) || 0)
      );
    },
    0
  );

  // ================= GET CART =================

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);

      try {
        await dispatch(getCart()).unwrap();
      } catch (error) {
        console.log(
          "Get cart error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (!cart) {
      fetchCart();
    }
  }, [cart, dispatch]);

  // ================= CLOSE SIDEBAR ON ROUTE =================

  useEffect(() => {
    return () => {
      dispatch(toggleSidebar(false));
    };
  }, [dispatch, pathname]);

  return (
    <div
      className={`fixed top-0 right-0 z-60 h-full md:w-120 lg:w-148 bg-white shadow-lg transition-transform duration-500 ${
        isSidebarOpen
          ? "translate-x-0"
          : "translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col p-4">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            Loading...
          </div>
        ) : (
          <>
            {/* ================= HEADER ================= */}

            <div className="sticky top-0 z-20 -mx-4 border-b border-[#E8F0F0] bg-white/90 px-6 py-6 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-flex rounded-full bg-[#EEF8F8] px-4 py-2 text-[11px] font-semibold uppercase tracking-[3px] text-[#61b9b9]">
                    Shopping Bag
                  </span>

                  <h2 className="mt-3 text-3xl font-light text-[#183838]">
                    {items.length}{" "}
                    {items.length === 1
                      ? "Item"
                      : "Items"}
                  </h2>

                  <p className="mt-1 text-sm text-[#708080]">
                    Review your products before checkout
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    dispatch(toggleSidebar(false))
                  }
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#E4EEEE] bg-[#F6FBFB] transition-all hover:bg-[#61b9b9] hover:text-white"
                  aria-label="Close cart"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ================= EMPTY CART ================= */}

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-10 py-20">
                <img
                  src={emptyCartImage.src}
                  alt="Empty shopping bag"
                  className="mb-8 w-52"
                />

                <h2 className="text-center text-3xl font-light text-[#183838]">
                  Your Shopping Bag is Empty
                </h2>

                <p className="mt-4 max-w-xs text-center leading-7 text-[#708080]">
                  Looks like you haven't added anything yet.
                  Start exploring our premium skincare
                  collection.
                </p>

                <Link
                  href="/shop"
                  onClick={() =>
                    dispatch(toggleSidebar(false))
                  }
                  className="mt-8 rounded-full bg-gradient-to-r from-[#61b9b9] to-[#4FA4A4] px-8 py-4 text-white shadow-xl transition hover:scale-105"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="flex grow flex-col items-start justify-start overflow-y-auto pr-2">
                <div className="w-full">
                  <div className="mb-6 mt-2">
                    <h2 className="text-2xl font-light text-[#183838]">
                      Your Shopping Bag
                    </h2>

                    <p className="text-[#6A7B7B]">
                      Everything you've selected.
                    </p>
                  </div>

                  {/* CART ITEMS */}

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

                {/* ================= RECOMMENDED ================= */}

                {recommendedProducts &&
                  recommendedProducts.length > 0 && (
                    <div className="mt-auto w-full">
                      <div className="mb-6 mt-10">
                        <span className="rounded-full bg-[#EEF8F8] px-3 py-2 text-xs uppercase tracking-[3px] text-[#61b9b9]">
                          Recommended
                        </span>

                        <h2 className="mt-4 text-2xl font-light text-[#183838]">
                          You May Also Like
                        </h2>

                        <p className="text-[#708080]">
                          Frequently bought together.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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

            {/* ================= BOTTOM SUMMARY ================= */}

            <div className="sticky bottom-0 -mx-4 border-t border-[#E4EEEE] bg-white/95 px-6 py-6 backdrop-blur-xl">
              {/* PRICE SUMMARY */}

              <div className="rounded-3xl border border-[#E4EEEE] bg-[#F8FBFB] p-5">
                <div className="flex justify-between">
                  <p className="text-[#708080]">
                    Subtotal
                  </p>

                  <p className="text-2xl font-semibold text-[#183838]">
                    ₹{Number(totalBeforeDiscount).toFixed(2)}
                  </p>
                </div>

                <div className="mt-2 flex justify-between">
                  <p className="text-[#708080]">
                    MRP
                  </p>

                  <p className="text-[#B2BABA] line-through">
                    ₹{Number(totalMrp).toFixed(2)}
                  </p>
                </div>
              </div>

              {/* ================= CHECKOUT ================= */}

              <div className="mt-5">
                {!isLoggedIn ? (
                  <Link
                    href="/auth/login"
                    onClick={() =>
                      dispatch(toggleSidebar(false))
                    }
                    className="block w-full rounded-full bg-[#61b9b9] px-4 py-2 text-center text-sm font-light text-white transition hover:bg-[#4FA4A4] sm:px-6 sm:py-3 sm:text-base"
                  >
                    Please log in to checkout
                  </Link>
                ) : items.length > 0 ? (
                  <Link
                    href="/cart"
                    onClick={() =>
                      dispatch(toggleSidebar(false))
                    }
                    className="relative block w-full overflow-hidden rounded-full bg-gradient-to-r from-[#61b9b9] via-[#69C4C4] to-[#4CA0A0] px-6 py-4 text-center font-semibold text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(97,185,185,.35)]"
                  >
                    Checkout
                  </Link>
                ) : (
                  <span className="block w-full cursor-not-allowed rounded-full bg-gray-300 px-6 py-3 text-center font-light text-gray-600">
                    Checkout
                  </span>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;