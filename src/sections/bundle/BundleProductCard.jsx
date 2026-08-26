"use client";

import React from "react";
import {
  Minus,
  Plus,
  ShoppingBag,
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

const BundleProductCard = ({
  product,
  selectedProduct,
  addProduct,
  decreaseProduct,
}) => {
  const isSelected =
    Boolean(selectedProduct);

  const sellingPrice =
    getSellingPrice(product);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-[#e5e8e7] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* IMAGE */}

      <div className="relative overflow-hidden bg-[#efede8]">
        {product.displayImage ? (
          <img
            src={product.displayImage}
            alt={
              product.displayImageAlt
            }
            className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex aspect-[4/5] w-full items-center justify-center bg-[#edf2f1]">
            <ShoppingBag
              size={28}
              className="text-[#78908f]"
            />
          </div>
        )}

        {isSelected && (
          <span className="absolute right-3 top-3 flex h-8 min-w-8 items-center justify-center rounded-full bg-white px-2 text-sm font-bold text-[#355454]">
            {selectedProduct.quantity}
          </span>
        )}
      </div>

      {/* CONTENT */}

      <div className="flex flex-1 flex-col p-3 sm:p-4">

        {/* NAME */}

        <h3 className="min-h-[30px] line-clamp-2 text-base font-semibold text-[#355454]">
          {product.heading}
        </h3>

        {/* PROBLEMS */}

        <div className="mt-2">
          {product.problems.length > 0 ? (
            <>
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#78908f]">
                Problems
              </p>

              <div className="mt-2 min-h-[52px] space-y-1">
                {product.problems
                  .slice(0, 3)
                  .map(
                    (
                      problem,
                      index
                    ) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-sm text-[#457980]"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#457980]" />

                        <span>
                          {problem}
                        </span>
                      </div>
                    )
                  )}
              </div>
            </>
          ) : (
            <div className="min-h-[76px]" />
          )}
        </div>

        {/* SUGGESTIONS */}

        <div className="mt-3 min-h-[55px]">
          {product.ownSuggestion && (
            <>
              <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#78908f]">
                Suggestions
              </p>

              <p className="mt-2 text-[13px] text-[#355454]">
                {product.ownSuggestion}
              </p>
            </>
          )}
        </div>

        {/* PRICE */}

        <div className="mt-auto pt-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-[#355454]">
              ₹
              {sellingPrice.toLocaleString(
                "en-IN"
              )}
            </span>

            {product.displayMrp >
              sellingPrice && (
              <span className="text-sm text-black/35 line-through">
                ₹
                {product.displayMrp.toLocaleString(
                  "en-IN"
                )}
              </span>
            )}
          </div>
        </div>

        {/* ACTION */}

        {isSelected ? (
          <div className="mt-4 flex h-11 items-center justify-between rounded-full border border-[#457980] bg-[#edf2f1] p-1">

            <button
              type="button"
              onClick={() =>
                decreaseProduct(
                  product.id
                )
              }
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#457980] text-white"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>

            <div className="text-center">
              <span className="text-sm font-semibold text-[#355454]">
                {
                  selectedProduct.quantity
                }
              </span>

              <p className="text-[8px] uppercase tracking-wider text-[#78908f]">
                Added
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                addProduct(product)
              }
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#457980] text-white"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>

          </div>
        ) : (
          <button
            type="button"
            onClick={() =>
              addProduct(product)
            }
            className="mt-4 flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#457980] text-sm font-medium text-white"
          >
            <Plus size={14} />
            Add to Bundle
          </button>
        )}
      </div>
    </article>
  );
};

export default BundleProductCard;