"use client";

import React, { useEffect, useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  resendOtp,
  verifyEmail,
} from "@/redux/slices/authSlice";

import { updateCartOnLogin } from "@/redux/slices/cartSlice";

import { useRouter } from "next/navigation";


const Otp = ({
  email = "abc@example.com",
  onClose,
}) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const dispatch = useDispatch();
  const router = useRouter();


  // ==========================================
  // RESEND OTP TIMER
  // ==========================================

  useEffect(() => {
    let timer;

    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [resendTimer]);


  // ==========================================
  // OTP CHANGE
  // ==========================================

  const handleChange = (value) => {
    setOtp(value);
    setError("");
  };


  // ==========================================
  // VERIFY OTP
  // ==========================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await dispatch(
        verifyEmail({
          email,
          otp,
        })
      ).unwrap();

      if (res?.success && res?.isVerified) {
        toast.success(
          res.message ||
            "OTP verified successfully"
        );

        // Close OTP modal
        if (onClose) {
          onClose();
        }

        // Redirect to home
        router.push("/");

        // ======================================
        // UPDATE GUEST CART
        // ======================================

        setTimeout(() => {
          try {
            const guestCart =
              localStorage.getItem("guestCart");

            if (!guestCart) {
              return;
            }

            const cartData =
              JSON.parse(guestCart);

            if (
              cartData?.products?.length > 0
            ) {
              dispatch(updateCartOnLogin());
            }
          } catch (cartError) {
            console.error(
              "Guest cart error:",
              cartError
            );
          }
        }, 100);
      }
    } catch (error) {
      setError(
        error?.message ||
          error ||
          "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };


  // ==========================================
  // RESEND OTP
  // ==========================================

  const handleResend = async () => {
    if (resendTimer > 0 || loading) {
      return;
    }

    setResent(true);
    setResendTimer(30);
    setError("");

    try {
      const res = await dispatch(
        resendOtp(email)
      ).unwrap();

      if (res?.success) {
        toast.success(
          res.message ||
            "OTP resent successfully"
        );
      }
    } catch (error) {
      setError(
        error?.message ||
          error ||
          "Failed to resend OTP"
      );

      console.error(
        "Resend OTP error:",
        error
      );
    }

    setTimeout(() => {
      setResent(false);
    }, 1000);
  };


  return (
    <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">

      {/* ========================================
          HEADING
      ======================================== */}

      <h2 className="mb-2 text-center text-2xl font-bold">
        Enter OTP
      </h2>


      {/* ========================================
          DESCRIPTION
      ======================================== */}

      <p className="mb-6 text-center text-gray-600">

        We have sent a 6-digit code to{" "}

        <span className="font-semibold">
          {email}
        </span>

        .

      </p>


      {/* ========================================
          OTP FORM
      ======================================== */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        <InputOTP
          maxLength={6}
          value={otp}
          onChange={handleChange}
          containerClassName="justify-center"
          disabled={loading}
        >

          <InputOTPGroup>

            {Array.from({
              length: 6,
            }).map((_, index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="text-xl"
              />
            ))}

          </InputOTPGroup>

        </InputOTP>


        {/* ======================================
            ERROR
        ====================================== */}

        {error && (
          <div className="text-center text-sm text-red-500">
            {error}
          </div>
        )}


        {/* ======================================
            VERIFY BUTTON
        ====================================== */}

        <button
          type="submit"
          disabled={
            loading ||
            otp.length !== 6
          }
          className="w-full rounded-lg bg-black py-3 font-semibold text-white transition hover:bg-gray-900 disabled:cursor-not-allowed disabled:opacity-60"
        >

          {loading
            ? "Verifying..."
            : "Verify OTP"}

        </button>

      </form>


      {/* ========================================
          RESEND OTP
      ======================================== */}

      <div className="mt-6 text-center text-sm text-gray-500">

        Didn&apos;t receive the code?{" "}

        <button
          type="button"
          className="text-blue-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          disabled={
            loading ||
            resendTimer > 0
          }
          onClick={handleResend}
        >

          {resendTimer > 0
            ? `Resend in ${resendTimer}s`
            : resent
            ? "Sent!"
            : "Resend"}

        </button>

      </div>

    </div>
  );
};

export default Otp;