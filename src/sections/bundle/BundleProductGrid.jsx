"use client";

import React from "react";
import { Search } from "lucide-react";

import BundleProductCard from "./BundleProductCard";

const BundleProductGrid = ({
  loading,
  products,
  selectedProducts,
  addProduct,
  decreaseProduct,
}) => {
  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#dce7e6] border-t-[#457980]" />

          <p className="mt-4 text-sm text-[#78908f]">
            Loading products...
          </p>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[24px] border border-dashed border-black/10 bg-white px-6 text-center">
        <Search
          size={24}
          className="text-[#78908f]"
        />

        <h3 className="mt-4 text-lg font-semibold text-[#355454]">
          No bundle products found
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-[#78908f]">
          Products with herobundle or
          rombundle tags will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const selectedProduct =
          selectedProducts.find(
            (item) =>
              item.id === product.id
          );

        return (
          <BundleProductCard
            key={product.id}
            product={product}
            selectedProduct={
              selectedProduct
            }
            addProduct={addProduct}
            decreaseProduct={
              decreaseProduct
            }
          />
        );
      })}
    </div>
  );
};

export default BundleProductGrid;