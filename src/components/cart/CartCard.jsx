"use client";

import {
  addToCart,
  changeQuantity,
  removeFromCart,
} from "@/redux/slices/cartSlice";

import { Loader2, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { usePathname } from "next/navigation";

export default function CartCard({
  item,
  type = "cart",
}) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const [token, setToken] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // ==========================================
  // GET TOKEN
  // ==========================================

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // ==========================================
  // SIDEBAR PERMISSION
  // ==========================================

  const canOpenSidebar = pathname !== "/cart";

  // ==========================================
  // PRODUCT
  // ==========================================

  const product =
    type === "recommended"
      ? item
      : token
        ? item?.productId
        : item;

  // ==========================================
  // SIZE
  // ==========================================

  const size =
    type === "recommended"
      ? item?.sizes?.[0]
      : item?.size;

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = async () => {
    if (!product || !size?.sku) return;

    try {
      setIsAdding(true);

      await dispatch(
        addToCart({
          product,
          quantity: 1,
          sku: size.sku,
          openside: canOpenSidebar,
        })
      ).unwrap();
    } catch (error) {
      console.error(
        "Failed to add product:",
        error
      );
    } finally {
      setIsAdding(false);
    }
  };

  // ==========================================
  // REMOVE
  // ==========================================

  const handleRemove = async (
    productId,
    sku
  ) => {
    if (!productId || !sku) return;

    try {
      setIsRemoving(true);

      await dispatch(
        removeFromCart({
          productId,
          sku,
        })
      ).unwrap();
    } catch (error) {
      console.error(
        "Failed to remove item:",
        error
      );
    } finally {
      setIsRemoving(false);
    }
  };

  // ==========================================
  // PRODUCT ID
  // ==========================================

  const productId =
    product?._id ||
    product?.id ||
    item?.productId?._id ||
    item?.productId;

  // ==========================================
  // UI
  // ==========================================

  return (
    <div
      className={`flex flex-col gap-4 pb-4 ${
        type === "recommended"
          ? ""
          : "border-b-2"
      }`}
    >
      <div className="flex gap-4 pt-3">

        {/* PRODUCT IMAGE */}

        <img
          src={size?.image?.url}
          alt={
            size?.image?.alt ||
            product?.heading ||
            product?.name ||
            "Product"
          }
          className="h-34 w-30 rounded-md object-cover"
        />

        {/* PRODUCT DETAILS */}

        <div className="flex flex-1 flex-col justify-between">

          <div>

            {/* PRICE */}

            <p className="text-lg font-semibold text-[#355454]">

              ₹{size?.price?.sellingPrice}

              {size?.price?.mrp &&
                size.price.mrp !==
                  size.price.sellingPrice && (
                  <span className="ml-2 text-sm text-gray-400 line-through">
                    ₹{size.price.mrp}
                  </span>
                )}

            </p>

            {/* PRODUCT NAME */}

            <p
              className={`primaryText font-medium ${
                type === "recommended"
                  ? "text-xs"
                  : "text-md"
              }`}
            >
              {product?.heading ||
                product?.name}
            </p>

            {/* SUBHEADING */}

            <p className="bodyText mb-1 text-xs">
              {product?.subheading}
            </p>

            {/* SIZE */}

            <span className="bodyText inline-block rounded bg-gray-100 px-2 py-0.5 text-xs">
              Size : {size?.size}
            </span>

          </div>

          {/* ====================================
              NORMAL CART
          ==================================== */}

          {type === "cart" && (
            <div className="mt-3 flex items-center justify-between">

              {/* QUANTITY */}

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  className="primaryText cursor-pointer rounded bg-neutral-300 px-2"
                  onClick={() =>
                    dispatch(
                      changeQuantity({
                        productId,
                        sku: size?.sku,
                        change: -1,
                      })
                    )
                  }
                >
                  –
                </button>

                <span className="primaryText rounded bg-neutral-200 px-2">
                  {item?.quantity || 0}
                </span>

                <button
                  type="button"
                  className="primaryText cursor-pointer rounded bg-neutral-300 px-2"
                  onClick={() =>
                    dispatch(
                      changeQuantity({
                        productId,
                        sku: size?.sku,
                        change: 1,
                      })
                    )
                  }
                >
                  +
                </button>

              </div>

              {/* REMOVE */}

              <button
                type="button"
                className="bodyText cursor-pointer self-end text-sm duration-300 hover:text-red-500"
                disabled={isRemoving}
                onClick={() =>
                  handleRemove(
                    productId,
                    size?.sku
                  )
                }
                aria-label="Remove product"
              >
                {isRemoving ? (
                  <Loader2
                    className="animate-spin"
                    size={16}
                  />
                ) : (
                  <Trash size={16} />
                )}
              </button>

            </div>
          )}

          {/* ====================================
              RECOMMENDED PRODUCT
          ==================================== */}

          {type === "recommended" && (
            <div className="mt-3 flex items-center justify-between">

              <button
                type="button"
                className="shimmer-btn primaryText relative cursor-pointer overflow-hidden rounded-full border border-[#cdb18f]-90/10 bg-[#61b9b9]/50 px-6 py-1 backdrop-blur-md duration-300 hover:scale-105 hover:font-medium hover:text-[#3d6d6d]"
                disabled={isAdding}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
              >
                {isAdding ? (
                  <div className="flex gap-2">
                    <Loader2
                      size={20}
                      className="animate-spin"
                    />
                  </div>
                ) : (
                  "Add"
                )}
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}