"use client";

import { X, Lock } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import OtpModal from "./OtpModal";
import { requestPhoneOtp, verifyPhoneOtp } from "@/redux/slices/authSlice";
import { updateCartOnLogin } from "@/redux/slices/cartSlice";
import { toast } from "react-toastify";

export default function LoginModal({ onClose }) {
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  // ================= CART =================

  const { cart } = useSelector((state) => state.cart);

  const items = cart?.products || [];

  const totalBeforeDiscount =
    cart?.totalBeforeDiscount || 0;

  // ================= TOTAL MRP =================

  const totalMrp = items.reduce(
    (total, item) => {
      const size = item?.size;

      return (
        total +
        (Number(size?.price?.mrp) || 0) *
        (Number(item?.quantity) || 0)
      );
    },
    0
  );

  // ================= CONTINUE =================

  const handleContinue = async () => {
    if (phone.length !== 10) {
      return;
    }

    setLoading(true);
    try {
      await dispatch(requestPhoneOtp({ phone })).unwrap();
      setOpenOtpModal(true);
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // ================= CLOSE OTP =================

  const handleCloseOtp = () => {
    setOpenOtpModal(false);
  };

  // ================= VERIFY OTP =================

  const handleVerifyOtp = async (otp) => {
    setLoading(true);
    try {
      await dispatch(verifyPhoneOtp({ phone, otp })).unwrap();
      const guestCart = localStorage.getItem("guestCart");
      if (guestCart && JSON.parse(guestCart)?.products?.length > 0) {
        await dispatch(updateCartOnLogin()).unwrap();
      }
      toast.success("Login successful");
      setOpenOtpModal(false);
      onClose?.();
      router.push("/cart");
    } catch (error) {
      toast.error(typeof error === "string" ? error : "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ================================================= */}
      {/* LOGIN MODAL */}
      {/* ================================================= */}

      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
        onClick={onClose}
      >

        <div
          className="relative w-full max-w-md overflow-hidden rounded-[30px] bg-white shadow-[0_30px_80px_rgba(0,0,0,.18)]"
          onClick={(e) => e.stopPropagation()}
        >

          {/* ================================================= */}
          {/* TOP GRADIENT */}
          {/* ================================================= */}

          <div className="h-1 bg-gradient-to-r from-[#61b9b9] via-[#79d3d3] to-[#61b9b9]" />

          {/* ================================================= */}
          {/* HEADER */}
          {/* ================================================= */}

          <div className="flex items-center justify-between border-b border-[#E8EEEE] px-6 py-5">

            <div className="flex items-center gap-4">

              {/* LOCK */}

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF9F9]">
                <Lock
                  size={26}
                  className="text-[#61b9b9]"
                />
              </div>

              {/* TITLE */}

              <div>
                <h2 className="text-2xl font-semibold text-[#183838]">
                  Secure Login
                </h2>

                <p className="mt-1 flex items-center gap-2 text-sm text-[#6E7F7F]">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Safe & encrypted login
                </p>
              </div>

            </div>

            {/* CLOSE */}

            <button
              type="button"
              onClick={onClose}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#E5EEEE] bg-white shadow-sm transition hover:bg-[#61b9b9] hover:text-white"
              aria-label="Close login"
            >
              <X size={20} />
            </button>

          </div>

          {/* ================================================= */}
          {/* CONTENT */}
          {/* ================================================= */}

          <div className="p-6">

            {/* ================================================= */}
            {/* ORDER SUMMARY */}
            {/* ================================================= */}

            <div className="rounded-3xl border border-[#E4EEEE] bg-[#F8FBFB] p-5">

              {/* SUBTOTAL */}

              <div className="flex items-center justify-between">

                <p className="text-[#708080]">
                  Subtotal
                </p>

                <p className="text-2xl font-semibold text-[#183838]">
                  ₹
                  {Number(
                    totalBeforeDiscount
                  ).toFixed(2)}
                </p>

              </div>

              {/* MRP */}

              <div className="mt-2 flex items-center justify-between">

                <p className="text-[#708080]">
                  MRP
                </p>

                <p className="text-[#B2BABA] line-through">
                  ₹
                  {Number(
                    totalMrp
                  ).toFixed(2)}
                </p>

              </div>

            </div>

            {/* ================================================= */}
            {/* LOGIN CARD */}
            {/* ================================================= */}

            <div className="mt-6 rounded-[28px] border border-[#E5EEEE] bg-white p-6 shadow-sm">

              <h3 className="text-center text-3xl font-light text-[#183838]">
                Enter Mobile Number
              </h3>

              <p className="mt-2 text-center text-[#728282]">
                We'll send you an OTP for secure login
              </p>

              {/* ================================================= */}
              {/* PHONE INPUT */}
              {/* ================================================= */}

              <div className="mt-8 flex overflow-hidden rounded-2xl border border-[#D8E8E8] bg-[#FCFEFE]">

                {/* COUNTRY CODE */}

                <div className="flex items-center border-r border-[#E4EEEE] px-5 font-semibold text-[#183838]">
                  +91
                </div>

                {/* PHONE */}

                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  maxLength={10}
                  onChange={(e) => {
                    const value =
                      e.target.value.replace(/\D/g, "");

                    setPhone(value);
                  }}
                  placeholder="Enter Mobile Number"
                  className="flex-1 px-5 py-5 text-lg outline-none placeholder:text-[#A6B5B5]"
                />

              </div>

              {/* ================================================= */}
              {/* CONTINUE */}
              {/* ================================================= */}

              <button
                type="button"
                onClick={handleContinue}
                disabled={phone.length !== 10 || loading}
                className="group relative mt-8 w-full overflow-hidden rounded-2xl bg-gradient-to-r from-[#61b9b9] via-[#6CC7C7] to-[#4EA0A0] py-5 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_25px_40px_rgba(97,185,185,.35)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >

                <span className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" />

                <span className="relative">
                  {loading ? "Please wait..." : "Continue"}
                </span>

              </button>

              {/* ================================================= */}
              {/* TRUST INDICATORS */}
              {/* ================================================= */}

              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-[#708080]">

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#61b9b9]" />
                  Secure
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#61b9b9]" />
                  OTP Login
                </div>

                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#61b9b9]" />
                  Fast
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* ================================================= */}
      {/* OTP MODAL */}
      {/* OUTSIDE LOGIN OVERLAY */}
      {/* ================================================= */}

      {openOtpModal && (
        <OtpModal
          phone={phone}
          onBack={handleCloseOtp}
          onVerify={handleVerifyOtp}
          onResend={handleContinue}
          loading={loading}
        />
      )}
    </>
  );
}