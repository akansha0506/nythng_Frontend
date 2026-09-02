"use client";

import React from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

const getSellingPrice = (product) => {
  const firstSize =
    Array.isArray(product?.sizes)
      ? product.sizes[0]
      : null;

  return (
    Number(
      firstSize?.price?.sellingPrice
    ) || 0
  );
};

const BundleSummary = ({
  selectedProducts,
  totalItems,
  totalPrice,
  addProduct,
  decreaseProduct,
  removeProduct,
  clearBundle,
  handleAddToCart,
  isAdding,
}) => {
  return (
    <aside className="hidden h-fit overflow-hidden rounded-[20px] border border-[#e2e8e6] bg-[#fafbfa] lg:sticky lg:top-6 lg:block">

      {/* HEADER */}

      <div className="p-6">
        <div className="flex items-start justify-between">

          <div>
            <span className="text-sm uppercase tracking-[0.12em] text-[#78908f]">
              Your creation
            </span>

            <h3 className="mt-1 text-xl font-semibold text-[#355454]">
              Custom Bundle
            </h3>
          </div>

          <div className="relative">
            <ShoppingBag
              size={22}
              className="text-[#457980]"
            />

            {totalItems > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#457980] px-1 text-[12px] font-semibold text-white">
                {totalItems}
              </span>
            )}
          </div>

        </div>
      </div>

      {/* PRODUCTS */}

      <div className="px-6">
        {selectedProducts.length === 0 ? (
          <EmptyBundle />
        ) : (
          <>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm text-[#355454]/80">
                Selected products
              </p>

              <button
                type="button"
                onClick={clearBundle}
                className="flex items-center gap-1.5 text-sm text-[#355454]/80"
              >
                <Trash2 size={14} />
                Clear all
              </button>
            </div>

            <div className="max-h-[400px] space-y-3 overflow-y-auto pr-1">
              {selectedProducts.map(
                (product) => (
                  <SelectedProduct
                    key={product.id}
                    product={product}
                    addProduct={
                      addProduct
                    }
                    decreaseProduct={
                      decreaseProduct
                    }
                    removeProduct={
                      removeProduct
                    }
                  />
                )
              )}
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}

      <div className="mt-6 border-t bg-[#457980] p-6">
        <div className="flex items-end justify-between">

          <div>
            <p className="text-sm text-white/70">
              Bundle total
            </p>

            <p className="mt-1 text-3xl font-semibold text-white">
              ₹
              {totalPrice.toLocaleString(
                "en-IN"
              )}
            </p>
          </div>

          {totalItems > 0 && (
            <span className="rounded-full bg-white/10 px-3 py-2 text-[12px] uppercase tracking-wider text-white">
              {totalItems}{" "}
              {totalItems === 1
                ? "Item"
                : "Items"}
            </span>
          )}

        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={
            selectedProducts.length ===
              0 || isAdding
          }
          className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white py-4 text-sm font-semibold text-[#355454] disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ShoppingBag size={17} />

          {isAdding
            ? "Adding..."
            : selectedProducts.length === 0
            ? "Add products to continue"
            : "Proceed to Checkout"}
        </button>
      </div>
    </aside>
  );
};

const EmptyBundle = () => {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-[20px] bg-transparent px-6 text-center">
      <ShoppingBag
        size={22}
        className="text-[#355454]/30"
      />

      <p className="mt-4 text-sm font-medium text-[#355454]">
        Your bundle is empty
      </p>

      <p className="mt-2 max-w-[220px] text-sm leading-5 text-[#355454]/40">
        Add products to create your
        own combination.
      </p>
    </div>
  );
};

const SelectedProduct = ({
  product,
  addProduct,
  decreaseProduct,
  removeProduct,
}) => {
  const price =
    getSellingPrice(product);

  return (
    <div className="flex items-center gap-3 rounded-[16px] border border-[#e2e8e6] bg-white p-3">

      {/* IMAGE */}

      {product.displayImage ? (
        <img
          src={product.displayImage}
          alt={
            product.displayImageAlt
          }
          className="h-16 w-14 shrink-0 rounded-[10px] object-cover"
        />
      ) : (
        <div className="flex h-16 w-14 shrink-0 items-center justify-center rounded-[10px] bg-[#edf2f1]">
          <ShoppingBag size={16} />
        </div>
      )}

      {/* INFO */}

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-[#355454]">
          {product.heading}
        </p>

        <p className="mt-1 text-sm text-[#355454]/80">
          ₹
          {price.toLocaleString(
            "en-IN"
          )}{" "}
          each
        </p>

        {/* QUANTITY */}

        <div className="mt-3 flex items-center gap-2">

          <button
            type="button"
            onClick={() =>
              decreaseProduct(
                product.id
              )
            }
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#edf2f1]"
          >
            <Minus size={12} />
          </button>

          <span className="min-w-5 text-center text-sm text-[#355454]">
            {product.quantity}
          </span>

          <button
            type="button"
            onClick={() =>
              addProduct(product)
            }
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-[#edf2f1]"
          >
            <Plus size={12} />
          </button>

        </div>
      </div>

      {/* REMOVE */}

      <button
        type="button"
        onClick={() =>
          removeProduct(
            product.id
          )
        }
        className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#f5f7f6] text-[#355454]/50"
        aria-label="Remove product"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default BundleSummary;