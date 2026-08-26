"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "@/redux/slices/cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/slices/wishlistSlice";

const RecommendedProductCard = ({
  product,
  wishlistIds = [],
  heightClass = "xl:h-128",
  selected = true,
  onToggle,
}) => {
  console.log("product in card", product);
  console.log("wishlistIds in card", wishlistIds);

  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [hasInWishlist, setHasInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Safe product ID
  const productId = product?._id || product?.id;

  // Safe first size
  const firstSize = product?.sizes?.[0];
 
  const handleAddToCart = async (product) => {
    if (!product) return;

    const quantity = 1;

    const sku = product?.sizes?.[0]?.sku;

    if (!sku) {
      console.error("Product SKU not found", product);
      return;
    }

    try {
      setIsAdding(true);

      await dispatch(
        addToCart({
          product,
          quantity,
          sku,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleAddWishlist = async (id, sku) => {
    setLoading(true);

    try {
      await dispatch(
        addToWishlist({
          productId: id,
          sku,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveWishlist = async (id, sku) => {
    setLoading(true);

    try {
      await dispatch(
        removeFromWishlist({
          productId: id,
          sku,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Next.js navigation
  const handleNavigateToProductPage = (slug) => {
    if (!slug) return;

    router.push(`/product/${slug}`);
  };

  useEffect(() => {
    if (!productId) return;

    setHasInWishlist(
      wishlistIds.includes(productId)
    );
  }, [wishlistIds, productId]);

  return (
    <div className="group relative">
      {/* Checkbox */}
      <div className="absolute top-5 left-5 z-30">
        <input
          type="checkbox"
          checked={selected}
          onChange={(e) => {
            e.stopPropagation();

            onToggle?.(
              productId,
              e.target.checked
            );
          }}
          className="h-6 w-6 rounded-md accent-[#355454] cursor-pointer"
        />
      </div>

     <div
  onClick={(e) => {
    e.preventDefault();
    handleNavigateToProductPage(product?.slug);
  }}
  className={`relative overflow-hidden rounded-[28px] 
    bg-gradient-to-b from-white to-[#f8f6f3] 
    border border-neutral-200/70 
    shadow-[0_15px_40px_rgba(0,0,0,0.08)] 
    hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)] 
    transition-all duration-500 
    hover:-translate-y-2 
    cursor-pointer 
    ${heightClass}`}
>
  {/* Product Heading */}
  <div
    className="absolute top-3 left-3 z-10 flex justify-end 
    items-start w-[90%]"
  >
    <div className="text-[#355454]">
      <h3 className="text-1xl font-bold tracking-tight leading-none">
        {product?.heading}
      </h3>

      <h4 className="mt-2 text-sm uppercase tracking-[3px] opacity-70">
        {product?.subheading}
      </h4>
    </div>
  </div>

  <div className="w-full aspect-[3/4] relative flex h-full">
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />

    {/* Only One Image */}
    <img
      src={product?.sizes?.[0]?.image?.url || ""}
      alt={
        product?.sizes?.[0]?.name ||
        product?.heading ||
        "Product"
      }
      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
    />

    {/* Bottom Content */}
    <div className="absolute bottom-5 left-5 right-5 z-20">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-white">
            ₹{product?.sizes?.[0]?.price?.sellingPrice || "—"}
          </p>

          <p className="text-white/70 text-sm mt-1">
            Premium Collection
          </p>
        </div>

        <button
          disabled={isAdding}
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart(product);
          }}
          className="rounded-full 
            bg-white 
            px-6 
            py-3 
            font-semibold 
            shadow-xl 
            transition-all 
            duration-300 
            hover:scale-105 
            hover:bg-[#3d6d6d] 
            hover:text-white"
        >
          {isAdding ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Add"
          )}
        </button>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default RecommendedProductCard;