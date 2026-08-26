"use client";

import Hero from "@/sections/home/Hero";
import Whychoose from "@/sections/home/WhyChoose";
import BestSeller from "@/sections/home/BestSeller";
import { fetchAllCategoryProduct } from "@/redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import ShopByConcerns from "@/sections/home/ShopByConcerns";
import CustomerReviews from "@/sections/home/CustomerReviews";
import SmartIngredients from "@/sections/home/SmartIngredients";
import NythngCommunity from "@/sections/home/NythngCommunity";
import VideoTestimonial from "@/sections/home/VideoTestimonial";
import AiBanner from "../layout/AiBanner";
import WhoWe from "@/sections/home/WhoWe";
// import EverythingGood from "@/sections/home/EverythingGood";


function HomeWrapper() {

   const dispatch = useDispatch();
   const allCategoryProduct = useSelector((state) => state.product.allCategoryProduct);
   console.log("allCategoryProduct",allCategoryProduct)
  useEffect(() => {
    const fetch = async () => {
      // setLoading(true);
      try {
        await dispatch(fetchAllCategoryProduct()).unwrap();
      } catch (error) {
        console.log(error);
      } finally {
        // setLoading(false);
      }
    };

    if (!allCategoryProduct.length) {
      fetch();
    }
  }, [dispatch, allCategoryProduct.length]);
  return (
    <>
      <Hero />
      <WhoWe />
      <Whychoose />
      <BestSeller allProducts={allCategoryProduct?.trending} heading="Customers Top Picks" bodyText="Discover our community’s favorite skincare essentials"/>
      <ShopByConcerns />
      <CustomerReviews />
      <SmartIngredients />
      {/* <EverythingGood /> */}
      <BestSeller allProducts={allCategoryProduct?.trending} heading="Customers Top Picks" bodyText="Discover our community’s favorite skincare essentials"/>
      <NythngCommunity />
      <VideoTestimonial />
      <AiBanner />
    </>
  );
}

export default HomeWrapper;