"use client";

import React, { useState } from "react";
import { Loader2, Trash } from "lucide-react";
import Link from "next/link";
import { removeFromWishlist } from "@/redux/slices/wishlistSlice";
import { useDispatch } from "react-redux";

const WishlistCard = ({ product }) => {
  console.log("prrprprprppr", product);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleRemoveFromWishlist = async (e) => {
    // Prevent Link navigation when clicking trash
    e.preventDefault();
    e.stopPropagation();

    try {
      const sku = product?.sizes?.[0]?.sku;
      const productId =
        product?.productId || product?._id;

      setLoading(true);

      await dispatch(
        removeFromWishlist({
          productId,
          sku,
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href="/" className="group">
      <div
        className="mb-5 rounded-xl overflow-hidden shadow bg-[#F3F3F3] hover:shadow-lg transition-shadow duration-800 relative xl:h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="py-4 absolute top-3 left-3 z-10 flex justify-end items-start w-[90%]">
          <div
            className={`${
              isHovered
                ? "text-neutral-50"
                : "primaryText"
            } text-right`}
          >
            <h3 className="uppercase w-full">
              {product?.heading}
            </h3>

            <h4 className="capitalize">
              {product?.subheading || ""}
            </h4>
          </div>
        </div>

        <div className="p-4 w-full aspect-[3/4] relative flex h-full">
          <img
            src={
              product?.sizes?.[0]?.image?.url || ""
            }
            alt={
              product?.sizes?.[0]?.image?.alt ||
              "Hover image"
            }
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-full mx-auto h-full object-cover transition-opacity duration-500 ${
              isHovered
                ? "opacity-0"
                : "opacity-100"
            }`}
          />

          {/* Hover Image */}
          <img
            src={
              product?.hoverImage?.url || ""
            }
            alt={
              product?.hoverImage?.alt ||
              "Hover image"
            }
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered
                ? "opacity-100 brightness-95"
                : "opacity-0"
            }`}
          />

          <div className="absolute bottom-4 left-3 z-10 text-black/60 flex flex-row justify-between items-end w-[90%]">
            {loading ? (
              <Loader2
                size={20}
                color={
                  isHovered
                    ? "white"
                    : "black"
                }
                className="animate-spin"
              />
            ) : (
              <Trash
                size={20}
                color="gray"
                onClick={
                  handleRemoveFromWishlist
                }
                className={`${
                  isHovered
                    ? "text-neutral-50"
                    : "primaryText"
                } cursor-pointer`}
              />
            )}

            <p
              className={`mt-2 ${
                isHovered
                  ? "text-neutral-50"
                  : "primaryText"
              }`}
            >
              ₹
              {product?.sizes?.[0]?.price
                ?.sellingPrice || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WishlistCard;