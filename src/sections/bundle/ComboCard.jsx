"use client";

import React from "react";

import {
  Minus,
  Plus,
} from "lucide-react";

const ComboCard = ({
  combo,
  selectedCombos,
  addCombo,
  decreaseCombo,
}) => {
  const selectedCombo =
    selectedCombos.find(
      (item) =>
        item.id === combo.id
    );

  const isSelected =
    Boolean(selectedCombo);

  const comboPrice =
    combo.price;

  return (
    <article
      className={`overflow-hidden rounded-[20px] border bg-white transition ${
        isSelected
          ? "border-[#457980]"
          : "border-[#e4e9e8]"
      }`}
    >

      {/* IMAGE */}

      <div className="relative h-[260px] overflow-hidden bg-[#f3f5f3] sm:h-[300px]">

        {combo.tag && (
          <span className="absolute left-4 top-4 z-10 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#355454]">
            {combo.tag}
          </span>
        )}

        {isSelected && (
          <span className="absolute right-4 top-4 z-10 flex h-8 min-w-8 items-center justify-center rounded-full bg-[#457980] px-2 text-xs font-semibold text-white">
            {selectedCombo.quantity}
          </span>
        )}

        <img
          src={combo.image}
          alt={combo.title}
          className="h-full w-full object-cover"
        />

      </div>

      {/* CONTENT */}

      <div className="p-5">

        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#78908f]">
          Combo Pack
        </p>

        <h3 className="mt-2 text-xl font-semibold text-[#355454]">
          {combo.title}
        </h3>

        {/* PROBLEMS */}

        {combo.problems?.length > 0 && (
          <div className="mt-4">

            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#78908f]">
              Problems
            </p>

            <div className="mt-2 flex flex-col gap-2">

              {combo.problems.map(
                (problem, index) => (
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
          </div>
        )}

        {/* PRICE */}

        <div className="mt-5 flex items-center justify-between border-t border-[#e7ebea] pt-5">

          <div>
            <p className="text-xs text-[#78908f]">
              Combo total
            </p>

            <p className="mt-1 text-2xl font-semibold text-[#355454]">
              ₹
              {comboPrice.toLocaleString(
                "en-IN"
              )}
            </p>
          </div>

        </div>

        {/* ACTION */}

        {isSelected ? (
          <div className="mt-5 flex h-12 items-center justify-between rounded-[8px] border border-[#dce5e3]">

            <button
              type="button"
              onClick={() =>
                decreaseCombo(
                  combo.id
                )
              }
              className="flex h-full w-12 cursor-pointer items-center justify-center border-r border-[#dce5e3] text-[#355454]"
            >
              <Minus size={16} />
            </button>

            <div className="text-center">
              <p className="text-sm font-semibold text-[#355454]">
                {selectedCombo.quantity}
              </p>

              <p className="text-[9px] uppercase tracking-wider text-[#78908f]">
                In cart
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                addCombo(combo)
              }
              className="flex h-full w-12 cursor-pointer items-center justify-center rounded-r-[7px] bg-[#457980] text-white"
            >
              <Plus size={16} />
            </button>

          </div>
        ) : (
          <button
            type="button"
            onClick={() =>
              addCombo(combo)
            }
            className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-[8px] bg-[#457980] text-sm font-medium text-white"
          >
            <Plus size={16} />
            Add Combo
          </button>
        )}

      </div>
    </article>
  );
};

export default ComboCard;