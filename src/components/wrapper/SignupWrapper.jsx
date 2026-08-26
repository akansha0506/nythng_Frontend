"use client";

import React, { useReducer, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import image from "@/assets/images/singUp.png";

import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  Phone,
  Sparkles,
  UserRound,
} from "lucide-react";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { signup } from "@/redux/slices/authSlice";
import Otp from "@/components/common/OTP";


// =====================================================
// INITIAL STATE
// =====================================================

const initialState = {
  email: "",
  fullName: "",
  phoneNumber: "",
  password: "",
  keepUpdated: true,
};


// =====================================================
// REDUCER
// =====================================================

const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return {
        ...state,
        email: action.payload,
      };

    case "fullName":
      return {
        ...state,
        fullName: action.payload,
      };

    case "phoneNumber": {
      const phoneNumber = action.payload;

      if (phoneNumber.length > 10) {
        return state;
      }

      return {
        ...state,
        phoneNumber: phoneNumber.replace(
          /[^0-9]/g,
          ""
        ),
      };
    }

    case "password":
      return {
        ...state,
        password: action.payload,
      };

    case "keepUpdated":
      return {
        ...state,
        keepUpdated: action.payload,
      };

    default:
      return state;
  }
};


// =====================================================
// SIGNUP FORM
// =====================================================

export default function SignupForm() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [state, setState] = useReducer(
    reducer,
    initialState
  );

  const [loading, setLoading] = useState(false);

  const [showOtpDialog, setShowOtpDialog] =
    useState(false);

  const dispatch = useDispatch();

  const {
    email,
    fullName,
    phoneNumber,
    password,
    keepUpdated,
  } = state;


  // ===================================================
  // SIGNUP
  // ===================================================

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);

    const userData = {
      email,
      fullName,
      phoneNumber,
      password,
      keepUpdated,
    };

    try {
      const res = await dispatch(
        signup(userData)
      ).unwrap();

      if (
        res?.success &&
        !res?.isVerified
      ) {
        setShowOtpDialog(true);
      }
    } catch (error) {
      toast.error(
        error?.message ||
          error ||
          "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {/* =================================================
          MAIN SIGNUP
      ================================================= */}

      <main className="relative h-screen overflow-hidden bg-[#f7fbfb] pt-[70px]">

        {/* BACKGROUND */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">

          <div className="absolute -left-40 top-10 h-[450px] w-[450px] rounded-full bg-[#61b9b9]/10 blur-[130px]" />

          <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-[#d9eeee]/70 blur-[140px]" />

        </div>


        {/* =================================================
            CONTENT
        ================================================= */}

        <section className="relative z-10 mx-auto flex h-[calc(100vh-70px)] w-full max-w-[1400px] items-center px-4 sm:px-6 lg:px-10 xl:px-14">

          <div className="grid h-full max-h-[720px] w-full items-center gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 xl:gap-16">


            {/* =================================================
                LEFT IMAGE
            ================================================= */}

            <div className="relative hidden h-[calc(100vh-110px)] max-h-[680px] lg:block">

              <div className="absolute -left-3 -top-3 h-full w-full rounded-[32px] border border-[#61b9b9]/20" />

              <div className="relative h-full overflow-hidden rounded-[32px] bg-[#dfeeee] shadow-[0_25px_70px_rgba(51,99,99,0.14)]">

                <Image
                  src={image}
                  alt="Create your account"
                  fill
                  priority
                  className="object-cover object-center"
                />


                {/* OVERLAY */}

                <div className="absolute inset-0 bg-gradient-to-t from-[#123c3d]/80 via-[#123c3d]/5 to-transparent" />


                {/* TOP BADGE */}

                <div className="absolute left-6 top-6">

                  <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-xl">

                    <Sparkles size={14} />

                    Your beauty, personalized

                  </div>

                </div>


                {/* BOTTOM CONTENT */}

                <div className="absolute bottom-0 left-0 w-full p-7">

                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#c9eeee]">
                    Join our community
                  </p>

                  <h2 className="text-3xl font-medium leading-[1.1] text-white">

                    Beauty that begins

                    <span className="block font-light text-[#d9f5f4]">
                      with you.
                    </span>

                  </h2>

                  <p className="mt-3 max-w-md text-xs leading-5 text-white/75">

                    Create your account to discover
                    products, save your favorites,
                    and enjoy a beauty experience
                    made for you.

                  </p>


                  <div className="mt-4 flex flex-wrap gap-2">

                    <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] text-white backdrop-blur-md">

                      <Check size={12} />

                      Save favorites

                    </div>


                    <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] text-white backdrop-blur-md">

                      <Check size={12} />

                      Track orders

                    </div>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                RIGHT FORM
            ================================================= */}

            <div className="flex h-full items-center justify-center lg:justify-end">

              <div className="w-full max-w-[580px]">


                {/* HEADER */}

                <div className="mb-4">

                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#61b9b9]">
                    Create your account
                  </p>

                  <h1 className="primaryText text-3xl font-semibold tracking-[-0.03em]">
                    Welcome
                  </h1>

                  <p className="bodyText mt-1.5 text-sm leading-5">
                    Join us and discover a personalized
                    beauty experience made around you.
                  </p>

                </div>


                {/* =================================================
                    FORM
                ================================================= */}

                <form
                  className="space-y-3"
                  onSubmit={handleSignup}
                >

                  {/* NAME + PHONE */}

                  <div className="grid gap-3 sm:grid-cols-2">


                    {/* FULL NAME */}

                    <div>

                      <label
                        htmlFor="fullName"
                        className="primaryText mb-2 block text-[15px] font-medium sm:text-base"
                      >
                        Full Name
                      </label>

                      <div className="group relative">

                        <UserRound
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="fullName"
                          type="text"
                          placeholder="Your name"
                          value={fullName}
                          onChange={(e) =>
                            setState({
                              type: "fullName",
                              payload:
                                e.target.value,
                            })
                          }
                          className="h-[48px] w-full rounded-xl border border-[#dce7e7] bg-white pl-11 pr-4 text-[15px] outline-none transition-all focus:border-[#61b9b9] focus:ring-4 focus:ring-[#61b9b9]/10 sm:text-base"
                        />

                      </div>

                    </div>


                    {/* PHONE */}

                    <div>

                      <label
                        htmlFor="phoneNumber"
                        className="primaryText mb-2 block text-[15px] font-medium sm:text-base"
                      >
                        Phone Number
                      </label>

                      <div className="group relative">

                        <Phone
                          size={16}
                          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                          id="phoneNumber"
                          type="text"
                          value={phoneNumber}
                          onChange={(e) =>
                            setState({
                              type: "phoneNumber",
                              payload:
                                e.target.value,
                            })
                          }
                          placeholder="9891848652"
                          className="h-[48px] w-full rounded-xl border border-[#dce7e7] bg-white pl-11 pr-4 text-[15px] outline-none transition-all focus:border-[#61b9b9] focus:ring-4 focus:ring-[#61b9b9]/10 sm:text-base"
                        />

                      </div>

                    </div>

                  </div>


                  {/* EMAIL */}

                  <div>

                    <label
                      htmlFor="email"
                      className="primaryText mb-2 block text-[15px] font-medium sm:text-base"
                    >
                      Email address
                    </label>

                    <div className="relative">

                      <Mail
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setState({
                            type: "email",
                            payload:
                              e.target.value,
                          })
                        }
                        placeholder="Example@email.com"
                        className="h-[48px] w-full rounded-xl border border-[#dce7e7] bg-white pl-11 pr-4 text-[15px] outline-none transition-all focus:border-[#61b9b9] focus:ring-4 focus:ring-[#61b9b9]/10 sm:text-base"
                      />

                    </div>

                  </div>


                  {/* PASSWORD */}

                  <div>

                    <label
                      htmlFor="password"
                      className="primaryText mb-2 block text-[15px] font-medium sm:text-base"
                    >
                      Password
                    </label>

                    <div className="relative">

                      <LockKeyhole
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        id="password"
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(e) =>
                          setState({
                            type: "password",
                            payload:
                              e.target.value,
                          })
                        }
                        className="h-[48px] w-full rounded-xl border border-[#dce7e7] bg-white pl-11 pr-12 text-[15px] outline-none transition-all focus:border-[#61b9b9] focus:ring-4 focus:ring-[#61b9b9]/10 sm:text-base"
                      />


                      {/* PASSWORD TOGGLE */}

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(
                            (prev) => !prev
                          )
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                      >

                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}

                      </button>

                    </div>

                  </div>


                  {/* WHATSAPP */}

                  <label
                    htmlFor="whatsapp"
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-[#e1ebeb] bg-[#f8fbfb] px-4 py-2.5"
                  >

                    <div className="relative flex">

                      <input
                        type="checkbox"
                        id="whatsapp"
                        checked={keepUpdated}
                        onChange={(e) =>
                          setState({
                            type: "keepUpdated",
                            payload:
                              e.target.checked,
                          })
                        }
                        className="peer h-4 w-4 appearance-none rounded border border-gray-300 bg-white checked:border-[#61b9b9] checked:bg-[#61b9b9]"
                      />

                      <Check
                        size={11}
                        strokeWidth={3}
                        className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-white peer-checked:block"
                      />

                    </div>

                    <p className="text-xs text-gray-600">
                      I agree to receive updates and
                      offers via WhatsApp.
                    </p>

                  </label>


                  {/* SIGNUP BUTTON */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-[48px] w-full items-center justify-center rounded-xl bg-[#61b9b9] text-sm font-semibold text-white shadow-[0_10px_25px_rgba(97,185,185,0.25)] transition-all hover:bg-[#4fa5a5] disabled:cursor-not-allowed disabled:bg-gray-400"
                  >

                    {loading ? (

                      <span className="flex items-center gap-2">

                        <Loader2
                          size={18}
                          className="animate-spin"
                        />

                        Signing up...

                      </span>

                    ) : (

                      <span className="flex items-center gap-2">

                        Create account

                        <ArrowRight size={17} />

                      </span>

                    )}

                  </button>

                </form>


                {/* DIVIDER */}

                <div className="my-3 flex items-center gap-4">

                  <div className="h-px flex-1 bg-gray-200" />

                  <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
                    Or
                  </span>

                  <div className="h-px flex-1 bg-gray-200" />

                </div>


                {/* LOGIN */}

                <p className="primaryText text-center text-sm">

                  Already have an account?{" "}

                  <Link
                    href="/auth/login"
                    className="font-semibold text-[#4b9696] hover:underline"
                  >
                    Log in
                  </Link>

                </p>

              </div>

            </div>

          </div>

        </section>

      </main>


      {/* ====== OTP MODAL =============== */}

      {showOtpDialog && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#102f30]/20 px-4 backdrop-blur-md">

          <Otp
            email={email}
            onClose={() =>
              setShowOtpDialog(false)
            }
          />

        </div>

      )}

    </>
  );
}