"use client";

import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  getAllProductsForSearch,
} from "@/redux/slices/productSlice";

import {
  addToCart,
  toggleSidebar,
} from "@/redux/slices/cartSlice";

import ComboCard from "@/sections/bundle/ComboCard";
import ComboSummary from "@/sections/bundle/ComboSummary";
import MobileBundleCart from "@/sections/bundle/MobileBundleCart";

const BrandCombos = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [selectedCombos, setSelectedCombos] =
    useState([]);

  const [isAdding, setIsAdding] =
    useState(false);

  const allProductsForSearch =
    useSelector(
      (state) =>
        state.product.allProductsForSearch
    );

  // products

  const allProducts = useMemo(
    () =>
      allProductsForSearch?.data || [],
    [allProductsForSearch]
  );

  // fetch products

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(
          getAllProductsForSearch()
        ).unwrap();
      } catch (error) {
        console.log(
          "Brand Combo API Error:",
          error
        );
      }
    };

    fetchProducts();
  }, [dispatch]);


  const normalizeText = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[\s_-]+/g, "");

  const getNormalizedTags = (product) => {
    if (!Array.isArray(product?.tags)) {
      return [];
    }

    return product.tags
      .map((tag) =>
        normalizeText(tag)
      )
      .filter(Boolean);
  };

  const hasProductTag = (
    product,
    tagName
  ) => {
    const tags =
      getNormalizedTags(product);

    return tags.includes(
      normalizeText(tagName)
    );
  };

  const problemFilters = [
    {
      label: "Acne",
      key: "Acne",
    },
    {
      label: "Dryness",
      key: "Dry",
    },
    {
      label: "Dark Spots",
      key: "Dark Spots",
    },
    {
      label: "Pigmentation",
      key: "Pigmentation",
    },
    {
      label: "Ageing Signs",
      key: "Ageing",
    },
  ];

  const getProductProblems = (
    product
  ) => {
    const tags =
      getNormalizedTags(product);

    return problemFilters
      .filter((problem) => {
        const problemKey =
          normalizeText(
            problem.key
          );

        return tags.some(
          (tag) =>
            tag === problemKey ||
            tag.includes(problemKey) ||
            problemKey.includes(tag)
        );
      })
      .map(
        (problem) =>
          problem.label
      );
  };

  // brand combos

  const brandCombos = useMemo(() => {
    return allProducts
      .filter((product) =>
        hasProductTag(
          product,
          "brandcombo"
        )
      )
      .map((product) => ({
        ...product,

        id: product._id,

        title: product.heading,

        image:
          product.sizes?.[0]?.image
            ?.url || "",

        price:
          Number(
            product.sizes?.[0]?.price
              ?.sellingPrice
          ) || 0,

        tag:
          product.tags?.find(
            (tag) =>
              [
                "bestseller",
                "trending",
                "mostloved",
              ].includes(
                tag.toLowerCase()
              )
          ) || "",

        products:
          product.products || [],

        problems:
          getProductProblems(
            product
          ),
      }));
  }, [allProducts]);

  // add combo

  const addCombo = (combo) => {
    setSelectedCombos((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === combo.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === combo.id
            ? {
              ...item,
              quantity:
                item.quantity + 1,
            }
            : item
        );
      }

      return [
        ...prev,
        {
          ...combo,
          quantity: 1,
        },
      ];
    });
  };

  // decrease

  const decreaseCombo = (
    comboId
  ) => {
    setSelectedCombos((prev) =>
      prev
        .map((item) =>
          item.id === comboId
            ? {
              ...item,
              quantity:
                item.quantity - 1,
            }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };
  const removeCombo = (
    comboId
  ) => {
    setSelectedCombos((prev) =>
      prev.filter(
        (item) =>
          item.id !== comboId
      )
    );
  };

  const clearCombos = () => {
    setSelectedCombos([]);
  };

  // total quantity

  const totalQuantity = useMemo(
    () =>
      selectedCombos.reduce(
        (total, combo) =>
          total +
          combo.quantity,
        0
      ),
    [selectedCombos]
  );

  //  total price

  const totalPrice = useMemo(
    () =>
      selectedCombos.reduce(
        (total, combo) =>
          total +
          combo.price *
          combo.quantity,
        0
      ),
    [selectedCombos]
  );

  // add to cart

  const handleAddToCart =
    async () => {
      if (
        !selectedCombos.length
      ) {
        return;
      }

      try {
        setIsAdding(true);

        for (const combo of selectedCombos) {
          await dispatch(
            addToCart({
              product: combo,
              quantity:
                combo.quantity,
              sku:
                combo.sizes?.[0]
                  ?.sku,
            })
          ).unwrap();
        }

        dispatch(toggleSidebar(true));
      } catch (error) {
        console.log(
          "Add combo to cart error:",
          error
        );
      } finally {
        setIsAdding(false);
      }
    };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">

        {/* HEADER */}

        <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#457980]">
              Curated by us
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#355454] md:text-5xl">
              Brand Combos
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#6d7f7f] md:text-base">
              Our expert-curated combinations
              pair one Hero with one ROM to
              create a complete skincare ritual.
            </p>

          </div>
        </div>

        {/* MAIN */}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">

          {/* COMBOS */}

          <div className="grid gap-6 md:grid-cols-2">

            {brandCombos.map((combo) => (
              <ComboCard
                key={combo.id}
                combo={combo}
                selectedCombos={
                  selectedCombos
                }
                addCombo={
                  addCombo
                }
                decreaseCombo={
                  decreaseCombo
                }
              />
            ))}

          </div>

          {/* DESKTOP SUMMARY */}

          <ComboSummary
            selectedCombos={
              selectedCombos
            }
            totalQuantity={
              totalQuantity
            }
            totalPrice={
              totalPrice
            }
            addCombo={
              addCombo
            }
            decreaseCombo={
              decreaseCombo
            }
            removeCombo={
              removeCombo
            }
            clearCombos={
              clearCombos
            }
            handleAddToCart={
              handleAddToCart
            }
            isAdding={isAdding}
          />

        </div>

        {/* MOBILE CART */}

        <MobileBundleCart
          totalQuantity={
            totalQuantity
          }
          totalPrice={
            totalPrice
          }
          handleAddToCart={
            handleAddToCart
          }
          isAdding={isAdding}
        />

      </div>
    </section>
  );
};

export default BrandCombos;