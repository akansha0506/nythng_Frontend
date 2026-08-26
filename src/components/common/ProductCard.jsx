"use client";

import React, { useEffect, useState } from "react";
import { Heart, Loader2, ShoppingBag } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "@/redux/slices/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/slices/wishlistSlice";

const ProductCard = ({ product, wishlistIds = [] }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [token, setToken] = useState(null);
  const [hasInWishlist, setHasInWishlist] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(false);
  const [isAddingCart, setIsAddingCart] = useState(false);

  /*
   * Get token only on the client.
   */
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const firstSize = product?.sizes?.[0] || {};

  const sellingPrice = firstSize?.price?.sellingPrice;
  const mrp = firstSize?.price?.mrp;

  const discountPercent =
    mrp && sellingPrice && mrp > sellingPrice
      ? Math.round(((mrp - sellingPrice) / mrp) * 100)
      : 0;

  /*
   * Wishlist state.
   */
  useEffect(() => {
    const productId = product?.id || product?._id;

    setHasInWishlist(
      productId ? wishlistIds.includes(productId) : false
    );
  }, [wishlistIds, product]);

  /*
   * Add to cart.
   */
  const handleAddToCart = async (e) => {
    e.stopPropagation();

    if (!product || !firstSize?.sku) {
      return;
    }

    try {
      setIsAddingCart(true);

      await dispatch(
        addToCart({
          product,
          quantity: 1,
          sku: firstSize.sku,
        })
      ).unwrap();
    } catch (error) {
      console.error("Cart Add Error:", error);
    } finally {
      setIsAddingCart(false);
    }
  };

  /*
   * Wishlist toggle.
   */
  const handleWishlistToggle = async (e) => {
    e.stopPropagation();

    if (!token || !isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    const productId = product?.id || product?._id;
    const sku = firstSize?.sku;

    if (!productId || !sku) {
      return;
    }

    setLoadingWishlist(true);

    try {
      if (hasInWishlist) {
        await dispatch(
          removeFromWishlist({
            productId,
            sku,
          })
        ).unwrap();
      } else {
        await dispatch(
          addToWishlist({
            productId,
            sku,
          })
        ).unwrap();
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
    } finally {
      setLoadingWishlist(false);
    }
  };

  /* Navigate to product details. */
  const handleNavigateToProductPage = () => {
    if (product?.slug) {
      router.push(`/product/${product.slug}`);
    }
  };

  const productImage =
    firstSize?.image?.url ||
    product?.images?.[0]?.url ||
    "/images/product-placeholder.jpg";

  return (
    <div
      onClick={handleNavigateToProductPage}
      className="
        group
        relative
        flex
        h-full
        min-h-[420px]
        cursor-pointer
        flex-col
        overflow-hidden
        rounded-2xl
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {/* =====================================================
          1. FULL-WIDTH IMAGE CONTAINER
          ===================================================== */}

      <div
        className="
          relative
          w-full
          h-[280px]
          sm:h-[300px]
          md:h-[320px]
          lg:h-[340px]
          xl:h-[360px]
          overflow-hidden
          bg-gray-100
        "
      >
        {/* Discount Badge */}
        {discountPercent > 0 && (
          <span
            className="
              absolute
              top-3
              left-3
              z-20
              rounded-full
              bg-[#1b4b47]
              px-2.5
              py-1
              text-[10px]
              font-extrabold
              uppercase
              tracking-widest
              text-white
              shadow-sm
            "
          >
            {discountPercent}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          disabled={loadingWishlist}
          aria-label="Wishlist"
          className="
            absolute
            top-3
            right-3
            z-20
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-white/90
            text-[#1b4b47]
            shadow-sm
            backdrop-blur-md
            transition-all
            hover:scale-110
            hover:bg-white
            active:scale-95
          "
        >
          {loadingWishlist ? (
            <Loader2
              size={14}
              className="animate-spin text-[#1b4b47]"
            />
          ) : (
            <Heart
              size={16}
              className={`transition-colors duration-200 ${
                hasInWishlist
                  ? "fill-[#b85d43] text-[#b85d43]"
                  : "text-[#2c5856] group-hover:text-[#b85d43]"
              }`}
            />
          )}
        </button>

        {/* =====================================================
            PRODUCT IMAGE
            ===================================================== */}

        <img
          src={productImage}
          alt={product?.heading || "Product"}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            object-center
            transition-transform
            duration-500
            ease-in-out
            group-hover:scale-[1.15]
          "
        />

        {/* =====================================================
            FLOATING ADD TO CART BUTTON
            ===================================================== */}

        <div
          onClick={(e) => e.stopPropagation()}
          className="
            absolute
            inset-x-3
            bottom-3
            z-20
            translate-y-6
            opacity-0
            transition-all
            duration-300
            ease-out
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <button
            disabled={isAddingCart}
            onClick={handleAddToCart}
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#1b4b47]/90
              px-4
              py-2.5
              text-[11px]
              font-bold
              uppercase
              tracking-wider
              text-white
              shadow-lg
              backdrop-blur-md
              transition-all
              hover:bg-[#1b4b47]
              active:scale-95
            "
          >
            {isAddingCart ? (
              <>
                <Loader2
                  size={14}
                  className="animate-spin"
                />
                <span>Adding...</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add To Cart</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          2. PRODUCT DETAILS SECTION
          ===================================================== */}

      <div
        className="
          flex
          min-h-[140px]
          flex-grow
          flex-col
          justify-between
          bg-white
          p-4
        "
      >
        {/* Subheading & Title */}
        <div className="flex flex-col gap-1">
          {product?.subheading && (
            <span
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-wider
                text-[#70a3a1]
              "
            >
              {product.subheading}
            </span>
          )}

          <h3
            className="
              line-clamp-1
              text-sm
              font-semibold
              text-[#143432]
              transition-colors
              group-hover:text-[#1b4b47]
              md:text-base
            "
          >
            {product?.heading || "Product Title"}
          </h3>
        </div>

        {/* Pricing Line */}
        <div
          className="
            mt-3
            flex
            items-baseline
            gap-2
            border-t
            border-[#1b4b47]/5
            pt-2
          "
        >
          <span
            className="
              text-base
              font-bold
              text-[#1b4b47]
            "
          >
            ₹
            {sellingPrice?.toLocaleString("en-IN") || "0"}
          </span>

          {mrp && sellingPrice && mrp > sellingPrice && (
            <span
              className="
                text-xs
                font-light
                text-gray-400
                line-through
              "
            >
              ₹{mrp.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
