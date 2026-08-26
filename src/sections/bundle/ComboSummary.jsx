"use client";

import React from "react";

import {
  CreditCard,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

const ComboSummary = ({
  selectedCombos,
  totalQuantity,
  totalPrice,
  addCombo,
  decreaseCombo,
  removeCombo,
  clearCombos,
  handleAddToCart,
  isAdding,
}) => {
  return (
    <aside className="hidden overflow-hidden rounded-[20px] border border-[#e2e8e6] bg-[#fafbfa] lg:sticky lg:top-6 lg:block">

      {/* HEADER */}

      <div className="flex items-center justify-between border-b border-[#e2e8e6] p-5">

        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-[#78908f]">
            Your selection
          </p>

          <h3 className="mt-1 text-xl font-semibold text-[#355454]">
            Brand Combos
          </h3>
        </div>

        <div className="relative">

          <ShoppingBag
            size={22}
            className="text-[#457980]"
          />

          {totalQuantity > 0 && (
            <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#457980] px-1 text-[10px] font-semibold text-white">
              {totalQuantity}
            </span>
          )}

        </div>

      </div>

      {/* EMPTY */}

      {selectedCombos.length === 0 ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#edf2f1]">
            <ShoppingBag
              size={20}
              className="text-[#78908f]"
            />
          </div>

          <p className="mt-4 text-sm font-medium text-[#355454]">
            No combos selected
          </p>

          <p className="mt-2 max-w-[220px] text-xs leading-5 text-[#78908f]">
            Choose your favourite brand
            combos and they will appear here.
          </p>

        </div>
      ) : (
        <>
          {/* TOP */}

          <div className="flex items-center justify-between px-5 pb-3 pt-5">

            <p className="text-xs text-[#78908f]">
              {totalQuantity}{" "}
              {totalQuantity === 1
                ? "combo"
                : "combos"}
            </p>

            <button
              type="button"
              onClick={clearCombos}
              className="flex cursor-pointer items-center gap-1 text-xs text-[#78908f]"
            >
              <Trash2 size={13} />
              Clear
            </button>

          </div>

          {/* ITEMS */}

          <div className="max-h-[400px] overflow-y-auto px-5">

            {selectedCombos.map(
              (combo) => (
                <div
                  key={combo.id}
                  className="border-b border-[#e2e8e6] py-4 last:border-0"
                >

                  <div className="flex gap-3">

                    {/* IMAGE */}

                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl">
                      <img
                        src={combo.image}
                        alt={combo.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* CONTENT */}

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-medium text-[#355454]">
                        {combo.title}
                      </p>

                      <p className="mt-1 text-[10px] text-[#78908f]">
                        {combo.products?.join(
                          " + "
                        )}
                      </p>

                      <p className="mt-1 text-xs text-[#78908f]">
                        ₹
                        {combo.price.toLocaleString(
                          "en-IN"
                        )}{" "}
                        each
                      </p>

                      {/* QUANTITY */}

                      <div className="mt-3 flex items-center gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseCombo(
                              combo.id
                            )
                          }
                          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#dce5e3]"
                        >
                          <Minus size={12} />
                        </button>

                        <span className="text-sm font-medium text-[#355454]">
                          {combo.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            addCombo(combo)
                          }
                          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[#dce5e3]"
                        >
                          <Plus size={12} />
                        </button>

                      </div>

                    </div>

                    {/* REMOVE */}

                    <button
                      type="button"
                      onClick={() =>
                        removeCombo(
                          combo.id
                        )
                      }
                      className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center text-[#9aa9a8]"
                    >
                      <X size={15} />
                    </button>

                  </div>

                </div>
              )
            )}

          </div>
        </>
      )}

      {/* FOOTER */}

      <div className="border-t border-[#e2e8e6] bg-white p-5">

        <div className="flex items-end justify-between">

          <span className="text-sm text-[#78908f]">
            Total
          </span>

          <span className="text-2xl font-semibold text-[#355454]">
            ₹
            {totalPrice.toLocaleString(
              "en-IN"
            )}
          </span>

        </div>

        <button
          type="button"
          onClick={
            handleAddToCart
          }
          disabled={
            selectedCombos.length === 0 ||
            isAdding
          }
          className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#457980] text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          <CreditCard size={16} />

          {isAdding
            ? "Adding..."
            : "Buy Now"}
        </button>

      </div>

    </aside>
  );
};

export default ComboSummary;