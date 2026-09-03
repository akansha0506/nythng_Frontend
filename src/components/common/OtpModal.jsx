"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export default function OtpModal({
  phone = "",
  onBack,
  onVerify,
  onResend,
  loading = false,
}) {
  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [timer, setTimer] = useState(30);

  const inputs = useRef([]);

  // ================= OTP TIMER =================

  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // ================= OTP CHANGE =================

  const handleChange = (value, index) => {
    // Only allow numbers
    if (!/^\d?$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  // ================= BACKSPACE =================

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputs.current[index - 1]?.focus();
    }
  };

  // ================= RESEND OTP =================

  const resendOTP = async () => {
    if (loading) return;

    setOtp([
      "",
      "",
      "",
      "",
      "",
      "",
    ]);

    setTimer(30);

    inputs.current[0]?.focus();

    await onResend?.();
  };

  // ================= VERIFY =================

  const handleVerify = () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      return;
    }

    onVerify?.(otpValue);
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onBack}
    >

      <div
        className="relative w-full max-w-md overflow-hidden rounded-[30px] bg-white shadow-[0_30px_80px_rgba(0,0,0,.25)]"
        onClick={(e) => e.stopPropagation()}
      >
      
        {/* TOP GRADIENT */}

        <div className="h-1 bg-gradient-to-r from-[#61b9b9] via-[#7ED6D6] to-[#61b9b9]" />

        <div className="flex items-center justify-between border-b border-[#E8EEEE] px-6 py-5">

          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={onBack}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E5EEEE] bg-white text-[#183838] shadow-sm transition hover:bg-[#61b9b9] hover:text-white"
            aria-label="Back"
          >
            <ArrowLeft size={18} />
          </button>

          {/* TITLE */}

          <div className="text-center">

            <h2 className="text-2xl font-semibold text-[#183838]">
              Verify OTP
            </h2>

            <p className="mt-1 text-sm text-[#718181]">
              Enter the code sent to
            </p>

            <p className="mt-1 text-sm font-semibold text-[#61b9b9]">
              +91 {phone}
            </p>

          </div>

          {/* SPACER */}

          <div className="h-11 w-11" />

        </div>

        {/* CONTENT */}
       
        <div className="p-8">

          {/* ICON */}

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EEF9F9]">
            <ShieldCheck
              size={32}
              className="text-[#61b9b9]"
            />
          </div>

          {/* HEADING */}

          <h3 className="mt-6 text-center text-2xl font-light text-[#183838]">
            One-Time Password
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-[#728282]">
            We've sent a secure verification code to
            your mobile number.
          </p>

          {/* OTP INPUTS */}
          
          <div className="mt-10 flex justify-center gap-2 sm:gap-3">

            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                type="tel"
                inputMode="numeric"
                autoComplete={
                  index === 0
                    ? "one-time-code"
                    : "off"
                }
                value={digit}
                maxLength={1}
                onChange={(e) =>
                  handleChange(
                    e.target.value,
                    index
                  )
                }
                onKeyDown={(e) =>
                  handleKeyDown(e, index)
                }
                className="h-12 w-10 rounded-xl border border-[#D8E8E8] bg-[#FCFEFE] text-center text-xl font-semibold text-[#183838] outline-none transition focus:border-[#61b9b9] focus:ring-4 focus:ring-[#61b9b9]/10 sm:h-14 sm:w-12"
              />
            ))}

          </div>

          {/* RESEND */}
       
          <div className="mt-8 flex items-center justify-between">

            <p className="text-sm text-[#708080]">
              Didn't receive OTP?
            </p>

            {timer === 0 ? (

              <button
                type="button"
                onClick={resendOTP}
                disabled={timer > 0 || loading}
                className="flex items-center gap-2 text-sm font-semibold text-[#61b9b9] transition hover:text-[#4EA0A0]"
              >
                <RefreshCw size={15} />
                Resend
              </button>

            ) : (

              <span className="text-sm font-semibold text-[#61b9b9]">
                00:{timer < 10 ? `0${timer}` : timer}
              </span>

            )}

          </div>

          {/* VERIFY BUTTON */}
       
          <button
            type="button"
            onClick={handleVerify}
            disabled={otp.join("").length !== 6}
            className="mt-8 w-full rounded-2xl bg-gradient-to-r from-[#61b9b9] via-[#6CC7C7] to-[#4EA0A0] py-4 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(97,185,185,.30)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            Verify OTP
          </button>

        {/* Terms */}

          <p className="mt-5 text-center text-xs leading-5 text-[#8A9999]">
            By continuing you agree to our{" "}
            <span className="font-medium text-[#61b9b9]">
              Terms
            </span>{" "}
            and{" "}
            <span className="font-medium text-[#61b9b9]">
              Privacy Policy
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}