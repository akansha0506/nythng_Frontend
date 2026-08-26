"use client";

import React, { useEffect, useReducer, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { loginUser } from "@/redux/slices/authSlice";
import { updateCartOnLogin } from "@/redux/slices/cartSlice";

import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Otp from "@/components/common/OTP";
import ForgotPasswordDialog from "@/components/auth/ForgotPasswordDialog";
import { toast } from "react-toastify";

import loginImage from "@/assets/images/login.png";

const initialState = {
  email: "",
  password: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return {
        ...state,
        email: action.payload,
      };

    case "SET_PASSWORD":
      return {
        ...state,
        password: action.payload,
      };

    default:
      return state;
  }
};

export default function LoginForm() {
  const [state, setState] = useReducer(reducer, initialState);

  const { email, password } = state;

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [token, setToken] = useState(null);

  const dispatch = useDispatch();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ==========================================
  // GET REDIRECT PATH
  // ==========================================

  const from = searchParams.get("from");

  // ==========================================
  // GET TOKEN
  // ==========================================

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  // ==========================================
  // HANDLE LOGIN
  // ==========================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await dispatch(
        loginUser({
          email,
          password,
        })
      ).unwrap();

      // ======================================
      // EMAIL NOT VERIFIED
      // ======================================

      if (res && !res.isVerified) {
        setShowOtpDialog(true);
        return;
      }

      // ======================================
      // SAVE TOKEN
      // ======================================

      localStorage.setItem("token", res?.token || "");

      setToken(res?.token || "");

      // ======================================
      // UPDATE GUEST CART
      // ======================================

      setTimeout(() => {
        try {
          const guestCart = localStorage.getItem("guestCart");

          if (guestCart) {
            const cartData = JSON.parse(guestCart);

            if (cartData?.products?.length > 0) {
              dispatch(updateCartOnLogin());
            }
          }
        } catch (error) {
          console.error("Guest cart error:", error);
        }
      }, 100);

      // ======================================
      // REDIRECT
      // ======================================

      if (from) {
        router.push(from);
      } else {
        router.push("/user-dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);

      toast.error(
        error?.message || "Invalid Credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) return;

    if (from) {
      router.push(from);
    } else {
      router.push("/user-dashboard");
    }
  }, [token, from, router]);

  return (
    <>
      <main className="relative h-screen overflow-hidden bg-[#f6fafa] pt-[70px]">

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-[#61b9b9]/10 blur-[130px]" />

          <div className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-[#d7eeee]/70 blur-[140px]" />
        </div>

        <section className="relative z-10 mx-auto flex h-[calc(100vh-70px)] w-full max-w-[1400px] items-center px-4 sm:px-6 lg:px-10 xl:px-14">

          <div className="grid h-full max-h-[720px] w-full items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 xl:gap-16">
            <div className="relative hidden h-[calc(100vh-110px)] max-h-[680px] lg:block">
              <div className="absolute -left-3 -top-3 h-full w-full rounded-[36px] border border-[#61b9b9]/15" />
              <div className="relative h-full overflow-hidden rounded-[36px] bg-[#dfeeee] shadow-[0_30px_80px_rgba(51,99,99,0.15)]">

                <Image
                  src={loginImage}
                  alt="Login Visual"
                  fill
                  priority
                  className="object-cover object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#123c3d]/75 via-transparent to-transparent" />

                <div className="absolute left-6 top-6">
                  <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-xl">
                    <Sparkles size={15} />
                    Beauty made personal
                  </div>
                </div>

                {/* Bottom content */}

                <div className="absolute bottom-0 left-0 w-full p-7 xl:p-8">
                  <div className="max-w-lg">

                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-[#c9eeee]">
                      Welcome back
                    </p>

                    <h2 className="text-3xl font-medium leading-[1.15] text-white xl:text-[38px]">
                      Continue your
                      <span className="block font-light text-[#d9f5f4]">
                        beauty journey.
                      </span>
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-6 text-white/75">
                      Your favorites, orders, and personalized beauty
                      experience are waiting for you.
                    </p>

                  </div>
                </div>

              </div>

              {/* Floating security card */}

              <div className="absolute -bottom-3 -right-4 flex items-center gap-3 rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-[0_15px_40px_rgba(45,91,91,0.15)] backdrop-blur-xl xl:-right-6">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#61b9b9]/10 text-[#4c9999]">
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Secure Login
                  </p>

                  <p className="mt-0.5 text-xs text-gray-400">
                    Your information is protected
                  </p>
                </div>

              </div>

            </div>

            <div className="flex h-full items-center justify-center lg:justify-end">

              <div className="w-full max-w-[470px]">

                {/* ================= MOBILE IMAGE ================= */}

                <div className="relative mb-5 h-[180px] overflow-hidden rounded-[24px] sm:h-[220px] lg:hidden">

                  <Image
                    src={loginImage}
                    alt="Login Visual"
                    fill
                    priority
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#173f40]/65 via-transparent to-transparent" />

                  <div className="absolute bottom-4 left-4">
                    <p className="text-xl font-medium text-white">
                      Welcome back
                    </p>

                    <p className="mt-1 text-sm text-white/75">
                      Continue your beauty journey.
                    </p>
                  </div>

                </div>

                {/* ================= HEADER ================= */}

                <div className="mb-5">

                  <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#61b9b9]/10 text-[#4b9696]">
                    <LockKeyhole size={21} strokeWidth={1.7} />
                  </div>

                  <p className="mb-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#61b9b9]">
                    Sign in to your account
                  </p>

                  <h1 className="primaryText text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                    Welcome Back
                  </h1>

                  <p className="bodyText mt-2 max-w-md text-sm leading-5 sm:text-base">
                    Sign in to manage your favorites, orders, and everything
                    made for you.
                  </p>

                </div>

                {/* ================= FORM ================= */}

                <form
                  className="space-y-4"
                  onSubmit={handleLogin}
                >

                  {/* EMAIL */}

                  <div>

                    <label
                      htmlFor="email"
                      className="primaryText mb-2 block text-[15px] font-medium sm:text-base"
                    >
                      Email address
                    </label>

                    <div className="group relative">

                      <Mail
                        size={18}
                        strokeWidth={1.8}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#4e9c9c]"
                      />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) =>
                          setState({
                            type: "SET_EMAIL",
                            payload: e.target.value,
                          })
                        }
                        placeholder="Example@email.com"
                        className="h-[54px] w-full rounded-2xl border border-[#dce7e7] bg-white py-3 pl-12 pr-4 text-[15px] text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-[#b9d5d5] focus:border-[#61b9b9] focus:ring-4 focus:ring-[#61b9b9]/10 sm:text-base"
                      />

                    </div>

                  </div>

                  {/* PASSWORD */}

                  <div>

                    <div className="mb-2 flex items-center justify-between gap-4">

                      <label
                        htmlFor="password"
                        className="primaryText block text-[15px] font-medium sm:text-base"
                      >
                        Password
                      </label>

                      <ForgotPasswordDialog />

                    </div>

                    <div className="group relative">

                      <LockKeyhole
                        size={18}
                        strokeWidth={1.8}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-[#4e9c9c]"
                      />

                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) =>
                          setState({
                            type: "SET_PASSWORD",
                            payload: e.target.value,
                          })
                        }
                        placeholder="At least 8 characters"
                        className="h-[54px] w-full rounded-2xl border border-[#dce7e7] bg-white py-3 pl-12 pr-12 text-[15px] text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-[#b9d5d5] focus:border-[#61b9b9] focus:ring-4 focus:ring-[#61b9b9]/10 sm:text-base"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword
                            ? "Hide password"
                            : "Show password"
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-[#4e9c9c]"
                      >
                        {showPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>

                    </div>

                  </div>

                  {/* ================= LOGIN BUTTON ================= */}

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex h-[54px] w-full items-center justify-center rounded-2xl bg-[#61b9b9] px-5 text-base font-semibold text-white shadow-[0_12px_30px_rgba(97,185,185,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4fa5a5] hover:shadow-[0_16px_35px_rgba(97,185,185,0.32)] active:translate-y-0 disabled:cursor-not-allowed disabled:bg-gray-400 disabled:shadow-none"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <Loader2
                          size={20}
                          className="mr-2 animate-spin"
                        />
                        Logging in...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Log in

                        <ArrowRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </span>
                    )}
                  </button>

                </form>

                {/* ================= DIVIDER ================= */}

                <div className="my-4 flex items-center gap-4">

                  <div className="h-px flex-1 bg-gray-200" />

                  <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
                    Or
                  </span>

                  <div className="h-px flex-1 bg-gray-200" />

                </div>

                {/* ================= SIGNUP ================= */}

                <div className="text-center">

                  <p className="primaryText text-sm sm:text-base">
                    Don&apos;t have an account?{" "}

                    <Link
                      href="/auth/signup"
                      className="font-semibold text-[#4b9696] transition-colors hover:text-[#357979] hover:underline"
                    >
                      Create an account
                    </Link>

                  </p>

                </div>

                {/* ================= SECURITY ================= */}

                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
                  <ShieldCheck size={14} />
                  <span>Secure and protected sign in</span>
                </div>

              </div>

            </div>

          </div>

        </section>
      </main>

      {/* ================= OTP MODAL ================= */}

      {showOtpDialog && (
        <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-[#102f30]/20 px-4 backdrop-blur-md">

          <Otp
            email={email}
            onClose={() => setShowOtpDialog(false)}
          />

        </div>
      )}
    </>
  );
}