"use client";

import React from "react";
import Image from "next/image";
import {
  LogOut,
  User,
  List,
  Heart,
  MapPin,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  logoutUser,
  resetAllState,
} from "@/redux/slices/authSlice";
import {
  useDispatch,
  useSelector,
} from "react-redux";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menu = [
    {
      key: "orders",
      label: "Orders",
      icon: List,
    },
    {
      key: "wishlist",
      label: "Wishlist",
      icon: Heart,
    },
    {
      key: "addresses",
      label: "Addresses",
      icon: MapPin,
    },
    {
      key: "account",
      label: "Profile",
      icon: User,
    },
    // { key: "logout", label: "logout", icon: LogOut },
  ];

  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const {
    fullName,
    email,
    profileImage,
  } = user || {};

  // const handleLogout = () => {
  //   console.log("Logging out...");

  //   dispatch(logoutUser());
  //   dispatch(resetAllState());

  //   // Clear local storage
  //   localStorage.clear();

  //   router.push("/auth/login");
  // };
  const handleLogout = () => {
  localStorage.removeItem("token");

   dispatch(logoutUser());
   dispatch(resetAllState());

  router.push("/auth/login");
};

  const handleAvatar = (name) => {
    const initials = name.split(" ");

    if (initials.length > 1) {
      return (
        initials[0][0].toUpperCase() +
        initials[1][0].toUpperCase()
      );
    }

    return initials[0][0].toUpperCase();
  };

  return (
    <div>
      {/* Desktop Sidebar */}
      <div className="hidden xl:flex flex-col rounded-[28px] bg-white border border-[#eee7dc] shadow-xl p-5 sticky top-24 h-[calc(100vh-7rem)]">
        <div className="flex flex-col items-center text-center border-b border-[#efe7dc] pb-5 mb-5">
          {profileImage ? (
          <Image
            src={profileImage}
            alt="profile"
            width={96}
            height={96}
            className="w-24 h-24 rounded-full object-cover shadow-lg"
          />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#3d6d6d] text-white flex items-center justify-center text-2xl font-semibold shadow-lg">
              {fullName &&
                handleAvatar(fullName)}
            </div>
          )}

          <div>
            <p className="text-xl font-semibold text-[#457980]">
              {fullName || "User"}
            </p>

            <p className="text-gray-500 text-sm mt-1">
              {email ||
                "user@example.com"}
            </p>
          </div>
        </div>

        {menu.map(
          ({
            key,
            label,
            icon: Icon,
          }) => (
            <button
              key={key}
              onClick={() =>
                setActiveTab(key)
              }
              className={`
                group w-full flex items-center justify-between
                px-5 py-4 mb-3
                bg-[#3d6d6d]/70
                font-medium
                backdrop-blur-md
                border border-[#cdb18f]/10
                rounded-full
                cursor-pointer
                shimmer-btn
                transition-all duration-300

                ${
                  activeTab === key
                    ? "bg-[#355454] text-white shadow-lg"
                    : "text-[#fff] hover:bg-[#3d6d6d]/30 hover:scale-90"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />

                <span>{label}</span>
              </div>

              <span
                className={`transition-transform duration-300 ${
                  activeTab === key
                    ? "translate-x-0"
                    : "group-hover:translate-x-1"
                }`}
              >
                →
              </span>
            </button>
          )
        )}

        {/* Logout */}
        <button
          className="
            mt-8
            w-full
            rounded-2xl
            border
            border-red-200
            py-4
            flex
            items-center
            justify-center
            gap-3
            text-[#7A1712]
            hover:bg-red-50
            transition
            cursor-pointer
          "
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />

          Logout
        </button>
      </div>

      {/* Bottom nav for mobile */}
      <div className="fixed bottom-0 left-0 right-0 xl:hidden bg-[#e3e1e1] border-t-4 border-[#e0dddd] shadow-md flex justify-around py-3 z-50">
        {menu.map(
          ({
            key,
            label,
            icon: Icon,
          }) => (
            <button
              key={key}
              onClick={() =>
                setActiveTab(key)
              }
              className={`flex flex-col items-center text-xs ${
                activeTab === key
                  ? "text-black"
                  : "text-gray-800"
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />

              {label}
            </button>
          )
        )}

        {/* Mobile Logout */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center text-xs text-[#7a1712]"
        >
          <LogOut className="w-5 h-5 mb-1" />

          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;