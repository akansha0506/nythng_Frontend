"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { getAllProductsForSearch } from "@/redux/slices/productSlice";
import { addToCart, toggleSidebar } from "@/redux/slices/cartSlice";

import BundleHeader from "@/sections/bundle/BundleHeader";
import BundleSearch from "@/sections/bundle/BundleSearch";
import BundleProductGrid from "@/sections/bundle/BundleProductGrid";
import BundleSummary from "@/sections/bundle/BundleSummary";
import MobileBundleBar from "@/sections/bundle/MobileBundleBar";

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

const normalizeText = (value) => {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "");
};

const getProductTags = (product) => {
  if (!Array.isArray(product?.tags)) {
    return [];
  }

  return product.tags
    .map((tag) => String(tag || "").trim())
    .filter(Boolean);
};

const getNormalizedTags = (product) => {
  return getProductTags(product).map((tag) =>
    normalizeText(tag)
  );
};

const hasProductTag = (product, tagName) => {
  const normalizedTags = getNormalizedTags(product);
  const normalizedTagName = normalizeText(tagName);

  return normalizedTags.some(
    (tag) => tag === normalizedTagName
  );
};

const getProductType = (product) => {
  if (hasProductTag(product, "herobundle")) {
    return "hero";
  }

  if (hasProductTag(product, "rombundle")) {
    return "rom";
  }

  return null;
};

const getProductProblems = (product) => {
  const normalizedTags = getNormalizedTags(product);

  return problemFilters
    .filter((problem) => {
      const normalizedProblemKey = normalizeText(
        problem.key
      );

      return normalizedTags.some(
        (tag) =>
          tag === normalizedProblemKey ||
          tag.includes(normalizedProblemKey) ||
          normalizedProblemKey.includes(tag)
      );
    })
    .map((problem) => problem.label);
};

const getFirstSize = (product) => {
  if (!Array.isArray(product?.sizes)) {
    return null;
  }

  return product.sizes[0] || null;
};

const getProductImage = (product) => {
  const firstSize = getFirstSize(product);

  return firstSize?.image?.url || "";
};

const getProductImageAlt = (product) => {
  const firstSize = getFirstSize(product);

  return (
    firstSize?.image?.alt ||
    product?.heading ||
    "Product"
  );
};

const getSellingPrice = (product) => {
  const firstSize = getFirstSize(product);

  return Number(firstSize?.price?.sellingPrice) || 0;
};

const getMrp = (product) => {
  const firstSize = getFirstSize(product);

  return Number(firstSize?.price?.mrp) || 0;
};

const CustomBundleBuilder = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedProducts, setSelectedProducts] =
    useState([]);

  const [searchQuery, setSearchQuery] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [isAdding, setIsAdding] =
    useState(false);

  const allProductsForSearch = useSelector(
    (state) =>
      state.product.allProductsForSearch
  );

  const allProducts =
    allProductsForSearch?.data || [];

  // FETCH PRODUCTS

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        await dispatch(
          getAllProductsForSearch()
        ).unwrap();
      } catch (error) {
        console.log(
          "Bundle products API error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [dispatch]);

  // PREPARE PRODUCTS

  const bundleProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        return getProductType(product) !== null;
      })
      .map((product) => ({
        ...product,

        id:
          product?._id ||
          product?.id,

        type:
          getProductType(product),

        displayName:
          product?.heading || "",

        displayDescription:
          product?.subheading ||
          product?.description ||
          "",

        problems:
          getProductProblems(product),

        tags:
          getProductTags(product),

        displayPrice:
          getSellingPrice(product),

        displayMrp:
          getMrp(product),

        displayImage:
          getProductImage(product),

        displayImageAlt:
          getProductImageAlt(product),
      }));
  }, [allProducts]);

  // SEARCH

  const filteredProducts = useMemo(() => {
    const query =
      searchQuery.trim().toLowerCase();

    return bundleProducts.filter(
      (product) => {
        const productName =
          String(
            product.heading || ""
          ).toLowerCase();

        const productDescription =
          String(
            product.displayDescription ||
            ""
          ).toLowerCase();

        const problemsText =
          product.problems
            .join(" ")
            .toLowerCase();

        const tagsText =
          product.tags
            .join(" ")
            .toLowerCase();

        return (
          !query ||
          productName.includes(query) ||
          productDescription.includes(
            query
          ) ||
          problemsText.includes(query) ||
          tagsText.includes(query)
        );
      }
    );
  }, [
    bundleProducts,
    searchQuery,
  ]);

  // ADD PRODUCT

  const addProduct = (product) => {
    setSelectedProducts((prev) => {
      const existingProduct =
        prev.find(
          (item) =>
            item.id === product.id
        );

      if (existingProduct) {
        return prev.map((item) =>
          item.id === product.id
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
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // DECREASE

  const decreaseProduct = (
    productId
  ) => {
    setSelectedProducts((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? {
              ...item,
              quantity:
                item.quantity - 1,
            }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };

  // REMOVE

  const removeProduct = (
    productId
  ) => {
    setSelectedProducts((prev) =>
      prev.filter(
        (item) =>
          item.id !== productId
      )
    );
  };

  // CLEAR

  const clearBundle = () => {
    setSelectedProducts([]);
  };

  // total item

  const totalItems = useMemo(() => {
    return selectedProducts.reduce(
      (total, item) =>
        total + item.quantity,
      0
    );
  }, [selectedProducts]);

  // TOTAL PRICE

  const totalPrice = useMemo(() => {
    return selectedProducts.reduce(
      (total, item) =>
        total +
        getSellingPrice(item) *
        item.quantity,
      0
    );
  }, [selectedProducts]);

  // ADD TO CART

  const handleAddToCart = async () => {
    if (!selectedProducts.length) {
      return;
    }

    try {
      setIsAdding(true);

      for (const product of selectedProducts) {
        const quantity =
          product.quantity || 1;

        const sku =
          product.sizes?.[0]?.sku;

        await dispatch(
          addToCart({
            product,
            quantity,
            sku,
          })
        ).unwrap();
      }

      dispatch(toggleSidebar(true));
    } catch (error) {
      console.log(
        "Add bundle to cart error:",
        error
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <section className="border-t border-black/10 bg-[#f8f7f3]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-5 sm:py-16 md:px-8 md:py-24">

        {/* HEADER */}

        <BundleHeader />

        {/* MAIN */}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">

          {/* LEFT */}

          <div className="min-w-0">

            <BundleSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <BundleProductGrid
              loading={loading}
              products={filteredProducts}
              selectedProducts={
                selectedProducts
              }
              addProduct={addProduct}
              decreaseProduct={
                decreaseProduct
              }
            />

          </div>

          {/* RIGHT */}

          <BundleSummary
            selectedProducts={
              selectedProducts
            }
            totalItems={totalItems}
            totalPrice={totalPrice}
            addProduct={addProduct}
            decreaseProduct={
              decreaseProduct
            }
            removeProduct={
              removeProduct
            }
            clearBundle={clearBundle}
            handleAddToCart={
              handleAddToCart
            }
            isAdding={isAdding}
          />

        </div>
      </div>

      {/* MOBILE */}

      <MobileBundleBar
        totalItems={totalItems}
        totalPrice={totalPrice}
        handleAddToCart={
          handleAddToCart
        }
        isAdding={isAdding}
      />
    </section>
  );
};

export default CustomBundleBuilder;