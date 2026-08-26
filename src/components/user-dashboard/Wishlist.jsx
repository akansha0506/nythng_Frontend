"use client";

import React, { useEffect } from "react";
import Link from "next/link";

import WishlistCard from "./WishlistCard";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { fetchWishlist } from "@/redux/slices/wishlistSlice";

import emptyCard from "@/assets/images/wishlist.png";

function Wishlist() {
  const { wishlist } = useSelector(
    (state) => state.wishlist
  );

  const { products } = wishlist || {};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-4xl font-light mb-4 pb-1 border-b-2 primaryText">
        Wishlist
      </h2>

      {products?.length > 0 ? (
        <div className="mt-4 grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
          {products.map((product, index) => (
            <WishlistCard
              product={product}
              key={index}
            />
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center">
          <img
            src={emptyCard.src}
            alt="No products"
            className="w-64 h-64 object-contain opacity-70"
          />

          <p className="text-center text-2xl mt-4 primaryText">
            Empty Wishlist
          </p>

          <Link
            href="/shop"
            className="mt-4 px-6 py-2 bg-[#3d6d6d] text-white rounded-full hover:bg-[#61b9b9] transition font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}

export default Wishlist;