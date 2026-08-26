"use client";

import React, { useState } from "react";
import Sidebar from "@/components/user-dashboard/Sidebar";
import Orders from "@/components/user-dashboard/Order";
import Wishlist from "@/components/user-dashboard/Wishlist";
import AddressTab from "@/components/user-dashboard/address/AddressTab";
import Profile from "@/components/user-dashboard/Profile";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders />;

      case "wishlist":
        return <Wishlist />;

      case "addresses":
        return <AddressTab />;

      case "account":
        return <Profile />;

      // default:
      //   return <Orders />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfbf8] via-white to-[#f8f2eb] pt-10 pb-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="mb-10 mt-[5rem]">
          <p className="text-sm uppercase tracking-[4px] text-[#457980] font-medium">
            My Account
          </p>

          <h1 className="text-4xl font-bold text-[#457980] mt-2">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your orders, wishlist, addresses and account details.
          </p>
        </div>

        <div className="grid xl:grid-cols-[300px_1fr] gap-8">

          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div
            className="
              bg-white
              rounded-[32px]
              border
              border-[#efe7dc]
              shadow-xl
              p-6
              md:p-10
              min-h-[700px]
            "
          >
            {renderContent()}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;