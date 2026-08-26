"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProductDescription from "@/sections/product/ProductDescription";
import Faq from "@/sections/product/FAQ";
import RecommendedProducts from "@/sections/product/RecommendedProducts";

import {
  fetchProductBySlug,
  fetchRecommendedProducts,
} from "@/redux/slices/productSlice";

import Fadeloader from "@/components/common/Fadeloader";

import UspSection from "@/sections/product/UspSection";
import ReviewTab from "@/sections/product/ReviewTab";
import ChooseUs from "@/sections/research-lab/ChooseUs";
import VedioReviews from "@/sections/product/VideoReviews";
import FloatingTrustBar from "@/sections/product/FloatingTrustBar";

import singleProduct from "@/utils/singleProduct";

function ProductWrapper({ slug }) {
  const dispatch = useDispatch();

  const {
    selectedProduct,
    recommendedProducts,
  } = useSelector((state) => state.product);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);

        const product = await dispatch(
          fetchProductBySlug(slug)
        ).unwrap();

        if (product?.id || product?._id) {
          await dispatch(
            fetchRecommendedProducts(
              product._id || product.id
            )
          );
        }
      } catch (error) {
        console.error(
          "Failed to fetch product:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug, dispatch]);

  if (loading) {
    return <Fadeloader />;
  }

  if (!selectedProduct) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <main>
      {/* Main Product Section */}
      <ProductDescription
        product={selectedProduct}
      />

      {/* Floating Trust */}
      <FloatingTrustBar />

      {/* USP */}
      <UspSection
        product={selectedProduct}
      />

      {/* Why Choose Us */}
      <ChooseUs />

      {/* Video Reviews */}
      <VedioReviews
        selectedProduct={selectedProduct}
      />

      {/* Reviews */}
      <ReviewTab
        product={singleProduct}
      />

      {/* FAQ */}
      <Faq
        faqData={selectedProduct?.faqs}
      />

      {/* Recommended Products */}
      <RecommendedProducts
        recommendedProducts={recommendedProducts}
      />
    </main>
  );
}

export default ProductWrapper;