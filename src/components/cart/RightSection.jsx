"use client";

import React, { useCallback, useEffect, useState, } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { ArrowLeft, Loader, Trash, } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";

import {
  applyCoupon,
  getRecommendedCoupon,
  removeCoupon,
  setCart,
} from "@/redux/slices/cartSlice";

import { placeOrder } from "@/redux/slices/checkoutSlice";

import PincodeChecker from "@/components/cart/PincodeChecker";

import { toast } from "react-toastify";

import { useRouter } from "next/navigation";

import api from "@/utils/api";

import { loadRazorpay } from "@/utils/loadRazorpay";

import CouponCard from "./CouponCard";


export default function RightSection({ changeStep, step,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState("prepaid");

  const [coupon, setCoupon] = useState("");

  const [couponApplied, setCouponApplied] = useState(false);

  const [couponTxt, setCouponTxt] = useState("");

  const [errorTxt, setErrorTxt] = useState("");

  const [disableCoupon, setDisableCoupon] = useState(false);

  const [discount, setDiscount] = useState(0);

  const [loading, setLoading] = useState(false);

  const [token, setToken] = useState(null);
  const cart = useSelector(
    (state) => state.cart.cart
  );

  const coupons = useSelector(
    (state) => state.cart.coupons
  );

  const selectedAddress = useSelector(
    (state) => state.address.selectedAddress
  );

  useEffect(() => {
    const storedToken =
      localStorage.getItem("token");

    setToken(storedToken);

    if (!storedToken) {
      setDisableCoupon(true);
    }
  }, []);

  const items = cart?.products || [];

  const subtotal =
    Number(cart?.totalBeforeDiscount) || 0;

  const totalMrp = items.reduce(
    (acc, item) =>
      acc +
      (item?.size?.price?.mrp || 0) *
      (item?.quantity || 0),
    0
  );

  const codFee = 55;

  const total =
    subtotal +
    (paymentMethod === "cod"
      ? codFee
      : 0) -
    Number(discount || 0);

  // online payment 

  const handlePaymentOnline = async (
    orderData
  ) => {
    if (!selectedAddress) {
      toast.warn(
        "Please select a shipping address first."
      );
      return;
    }

    setLoading(true);

    try {
      const razorpayLoaded =
        await loadRazorpay();

      if (!razorpayLoaded) {
        throw new Error(
          "Razorpay SDK failed to load. Are you online?"
        );
      }

      const { data } = await api.post(
        "/checkout/online-order",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(
              "token"
            )}`,
          },
        }
      );
      const order = data?.order;

      if (!order?.id) {
        throw new Error(
          "Failed to create Razorpay order."
        );
      }

      const { amount, currency, id, notes, } = order;

      // shipping information

      const shipping = notes?.shipping
        ? JSON.parse(notes.shipping)
        : {};

      const userName = shipping.fullName || "Guest";
      const userPhone = shipping.phoneNumber || "";
      const userEmail = shipping.email || "";

      const callbackUrl =
        `${window.location.origin}/user-dashboard`;

      // razorpay option

      const options = {
        key:
          process.env
            .NEXT_PUBLIC_RAZORPAY_KEY_ID,

        amount,

        currency,

        name: "Nythng",

        description: "Order Payment",

        order_id: id,

        show_coupons: true,

        callback_url: callbackUrl,

        redirect: true,

        prefill: {
          name: userName,
          email: userEmail,
          contact: userPhone,
        },

        notes: {
          internalOrderId:
            notes?.internalOrderId || "",

          userId:
            notes?.userId || "",
        },

        theme: {
          color: "#c1a68d",
        },
      };

      // Open Razorpay

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error) {
      console.error(
        "Payment error:",
        error
      );

      toast.error(
        error?.message ||
        "Something went wrong while processing payment."
      );

    } finally {
      setLoading(false);
    }
  };

  // COD ORDER
  
  const handleCodOrder = async (
    orderData
  ) => {
    if (!selectedAddress) {
      toast.warn(
        "Please select a shipping address first."
      );
      return;
    }

    setLoading(true);

    try {
      const res = await dispatch(
        placeOrder(orderData)
      ).unwrap();

      console.log("order", res);

      if (res?.success) {
        dispatch(setCart(null));

        toast.success(
          "Order placed successfully!"
        );

        router.push("/user-dashboard");
      }

    } catch (error) {
      console.log(
        "COD order error:",
        error
      );

      toast.error(
        error ||
        "Failed to place order."
      );

    } finally {
      setLoading(false);
    }
  };

  // HANDLE ORDER
  
  const handleOrder = async () => {
    if (
      !selectedAddress ||
      (typeof selectedAddress ===
        "object" &&
        Object.keys(
          selectedAddress
        ).length === 0)
    ) {
      toast.warn(
        "Please select a shipping address."
      );
      return;
    }

    if (!paymentMethod) {
      toast.warn(
        "Please select a payment method."
      );
      return;
    }

    if (!items.length) {
      return;
    }


    const orderData = {
      paymentMethod,
      shippingAddress:
        selectedAddress,
    };


    if (
      paymentMethod === "prepaid"
    ) {
      await handlePaymentOnline(
        orderData
      );
    } else {
      await handleCodOrder(
        orderData
      );
    }
  };


  // APPLY COUPON
  
  const handleApplyCoupon = async (
    codeFromCard
  ) => {
    const codeToApply =
      codeFromCard || coupon;

    if (!codeToApply) {
      return;
    }

    setErrorTxt("");
    setCouponTxt("");
    setDisableCoupon(true);

    try {
      const res = await dispatch(
        applyCoupon(codeToApply)
      ).unwrap();

      if (res) {
        const updatedCart =
          res.cart;

        const {
          coupon: applied,
          totalBeforeDiscount,
          totalAfterDiscount,
        } = updatedCart;

        const calculatedDiscount =
          Number(
            totalBeforeDiscount -
            totalAfterDiscount
          ).toFixed(1);


        setCouponApplied(
          !!applied
        );

        setDiscount(
          Number(
            calculatedDiscount
          )
        );


        setCouponTxt(
          applied
            ? `Code ${applied.code} applied — You saved ₹${calculatedDiscount}!`
            : ""
        );
      }

    } catch (error) {
      console.error(
        "Coupon error:",
        error
      );

      setErrorTxt(
        error ||
        "Failed to apply coupon."
      );

    } finally {
      setDisableCoupon(false);
    }
  };


  const handleRemoveCoupon =
    useCallback(async () => {
      if (!token) {
        return;
      }

      setDisableCoupon(true);

      try {
        const res =
          await dispatch(
            removeCoupon()
          ).unwrap();

        if (res) {
          setCoupon("");
          setCouponApplied(false);
          setCouponTxt("");
          setDiscount(0);
        }

      } catch (error) {
        console.log(
          "Remove coupon error:",
          error
        );

      } finally {
        setDisableCoupon(false);
      }
    }, [
      dispatch,
      token,
    ]);


  // ==========================================
  // RECOMMENDED COUPONS
  // ==========================================

  useEffect(() => {
    if (
      !cart ||
      !cart.totalAfterDiscount ||
      !token
    ) {
      return;
    }

    const fetchRecommendedCoupons =
      async () => {
        setLoading(true);

        try {
          await dispatch(
            getRecommendedCoupon(
              cart.totalAfterDiscount
            )
          );
        } catch (error) {
          console.error(
            "Error fetching coupons:",
            error
          );
        } finally {
          setLoading(false);
        }
      };

    fetchRecommendedCoupons();

  }, [
    cart,
    dispatch,
    token,
  ]);


  // ==========================================
  // SYNC APPLIED COUPON
  // ==========================================

  useEffect(() => {
    if (appliedCoupon) {
      setCoupon(
        appliedCoupon.code
      );

      setCouponApplied(true);

      const savedAmount =
        Number(
          (cart?.totalBeforeDiscount || 0) -
          (cart?.totalAfterDiscount || 0)
        ).toFixed(1);

      setDiscount(
        Number(savedAmount)
      );

      setCouponTxt(
        `Code ${appliedCoupon.code} applied — You saved ₹${savedAmount}!`
      );

    } else {
      setCoupon("");
      setCouponApplied(false);
      setCouponTxt("");
      setDiscount(0);
    }

  }, [cart]);

  useEffect(() => {
    if (!errorTxt && !couponTxt) {
      return;
    }

    const timeout =
      setTimeout(() => {
        setErrorTxt("");
      }, 3000);

    return () =>
      clearTimeout(timeout);

  }, [
    couponTxt,
    errorTxt,
  ]);

  // COD LIMIT

  useEffect(() => {
    if (
      paymentMethod === "cod" &&
      total > 1500
    ) {
      setPaymentMethod(
        "prepaid"
      );
    }
  }, [
    paymentMethod,
    total,
  ]);


  // ==========================================
  // APPLIED COUPON
  // ==========================================

  const appliedCoupon =
    cart?.coupon || null;



  return (
    <div className="w-full min-w-0 self-start rounded-2xl border border-[#E5EEEE] bg-white p-3
      shadow-[0_10px_35px_rgba(53,84,84,0.07)] sm:p-4 lg:p-5 xl:p-5">
      
      {/* COD notice */}
      {cart?.products?.length > 0 && total >= 1500 && (
        <div className="mb-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 sm:items-center">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full
            bg-red-500
            sm:mt-0 "/>

          <p
            className="
            text-[11px]
            leading-4
            text-[#7a1712]
            sm:text-xs
            md:text-sm
          "
          >
            Cash on Delivery is unavailable for
            orders above ₹1500.
          </p>
        </div>
      )}
      {/* PAYMENT METHOD */}
      <div
        className="
        flex
        flex-col
        gap-2.5
        sm:flex-row
        sm:items-center
        sm:justify-between
        sm:gap-4
      "
      >
        <Label
          htmlFor="method"
          className="
          text-sm
          font-semibold
          text-[#183838]
          sm:text-base
        "
        >
          Payment Method
        </Label>

        <Select
          name="method"
          value={paymentMethod}
          onValueChange={(value) =>
            setPaymentMethod(value)
          }
        >
          <SelectTrigger
            id="method"
            className="
            h-10
            w-full
            rounded-xl
            border-[#DCEAEA]
            bg-[#F9FCFC]
            text-sm
            text-[#355454]
            shadow-none
            focus:ring-[#61b9b9]/20
            sm:w-[180px]
            md:w-[190px]
          "
          >
            <SelectValue placeholder="Select Payment" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="prepaid">
              Prepaid
            </SelectItem>

            {(cart?.products?.length === 0 ||
              total <= 1500) && (
                <SelectItem value="cod">
                  Cash on Delivery
                </SelectItem>
              )}
          </SelectContent>
        </Select>
      </div>

      {/* coupon */}

      <div className="mt-5 space-y-3">
        <Label
          className="
          text-sm
          font-semibold
          text-[#183838]
          sm:text-base
        "
        >
          Apply Coupon
        </Label>

        {/* Coupon Input */}

        <div
          className="
          flex
          w-full
          flex-col
          gap-2
          rounded-xl
          border border-[#DCEAEA]
          bg-white
          p-1.5
          shadow-sm
          xs:flex-row
        "
        >
          <div className="relative min-w-0 flex-1">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) =>
                setCoupon(e.target.value)
              }
              className="
              h-10
              w-full
              rounded-lg
              bg-[#F9FCFC]
              px-3
              pr-9
              text-xs
              text-[#355454]
              outline-none
              placeholder:text-[#9AA9A9]
              sm:text-sm
            "
            />

            {coupon.length >= 1 && (
              <Trash
                size={15}
                onClick={handleRemoveCoupon}
                className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                cursor-pointer
                text-[#8A9B9B]
                transition-colors
                hover:text-[#7a1712]
              "
              />
            )}
          </div>

          <button
            onClick={() =>
              handleApplyCoupon()
            }
            disabled={
              disableCoupon ||
              items.length === 0
            }
            className="
            h-10
            w-full
            shrink-0
            rounded-lg
            bg-[#3d6d6d]
            px-5
            text-xs
            font-semibold
            text-white
            transition-all
            hover:bg-[#4b8585]
            disabled:cursor-not-allowed
            disabled:bg-gray-300
            sm:w-auto
            sm:text-sm
          "
          >
            {disableCoupon
              ? "Applying..."
              : "Apply"}
          </button>
        </div>

        {/* Coupon Success */}

        {couponApplied && couponTxt && (
          <div
            className="
            rounded-xl
            border border-green-200
            bg-green-50
            px-3
            py-2.5
          "
          >
            <p
              className="
              text-center
              text-[11px]
              font-medium
              leading-4
              text-green-600
              sm:text-xs
            "
            >
              {couponTxt}
            </p>
          </div>
        )}

        {/* Coupon Error */}

        {errorTxt && (
          <div
            className="
            rounded-xl
            border border-red-200
            bg-red-50
            px-3
            py-2.5
          "
          >
            <p
              className="
              text-center
              text-[11px]
              font-medium
              leading-4
              text-[#7a1712]
              sm:text-xs
            "
            >
              {errorTxt}
            </p>
          </div>
        )}

        {/* Recommended Coupons */}

        <div
          className="
          grid
          grid-cols-1
          gap-3
          sm:grid-cols-2
        "
        >
          {items.length > 0 &&
            coupons?.length > 0 ? (
            coupons.map(
              (couponItem, idx) => (
                <CouponCard
                  key={
                    couponItem?._id ||
                    couponItem?.code ||
                    idx
                  }
                  code={couponItem.code}
                  offer={
                    couponItem.discountValue
                  }
                  discountType={
                    couponItem.discountType
                  }
                  onApply={() =>
                    handleApplyCoupon(
                      couponItem.code
                    )
                  }
                  isApplied={
                    appliedCoupon?.code ===
                    couponItem.code
                  }
                />
              )
            )
          ) : (
            !loading &&
            !coupon && (
              <p
                className="
                col-span-full
                py-2
                text-center
                text-xs
                text-[#8A9B9B]
              "
              >
                No coupons found.
              </p>
            )
          )}
        </div>
      </div>

      {/* =====================================================
        ORDER SUMMARY
    ====================================================== */}

      <div
        className="
        mt-5
        rounded-2xl
        border border-[#E5EEEE]
        bg-[#F9FCFC]
        p-3.5
        sm:p-4
      "
      >
        {/* Header */}

        <div
          className="
          mb-4
          flex
          flex-wrap
          items-center
          justify-between
          gap-2
        "
        >
          <h2
            className="
            text-base
            font-semibold
            text-[#183838]
            sm:text-lg
          "
          >
            Order Summary
          </h2>

          <span
            className="
            rounded-full
            bg-[#3d6d6d]/10
            px-2
            py-1
            text-[9px]
            font-medium
            text-[#3d6d6d]
            sm:text-[10px]
          "
          >
            Secure Checkout
          </span>
        </div>

        {/* Price Details */}

        <div className="space-y-3">
          {/* Cart Total */}

          <div
            className="
            flex
            items-center
            justify-between
            gap-4
            text-xs
            text-[#607474]
            sm:text-sm
          "
          >
            <span>Cart Total</span>

            <span className="shrink-0 font-semibold text-[#355454]">
              ₹ {totalMrp}
            </span>
          </div>

          {/* MRP Discount */}

          <div
            className="
            flex
            items-center
            justify-between
            gap-4
            text-xs
            text-[#607474]
            sm:text-sm
          "
          >
            <span>Discount on MRP</span>

            <span className="shrink-0 font-semibold text-green-600">
              - ₹{" "}
              {Math.max(
                totalMrp - subtotal,
                0
              )}
            </span>
          </div>

          {/* COD Fee */}

          {paymentMethod === "cod" && (
            <div
              className="
              flex
              items-center
              justify-between
              gap-4
              text-xs
              text-[#607474]
              sm:text-sm
            "
            >
              <span>
                Cash on Delivery Fee
              </span>

              <span className="shrink-0">
                ₹ {codFee}
              </span>
            </div>
          )}

          {/* Coupon */}

          <div
            className="
            flex
            items-start
            justify-between
            gap-4
            text-xs
            text-[#607474]
            sm:text-sm
          "
          >
            <span className="min-w-0">
              Coupon Discount{" "}

              {appliedCoupon && (
                <span
                  className="
                  break-all
                  text-[10px]
                  text-[#3d6d6d]
                  sm:text-xs
                "
                >
                  ({appliedCoupon.code})
                </span>
              )}
            </span>

            <span className="shrink-0 font-semibold text-green-600">
              - ₹ {discount}
            </span>
          </div>

          <hr className="border-dashed border-[#DCEAEA]" />

          {/* Total */}

          <div
            className="
            flex
            items-center
            justify-between
            gap-4
            pt-1
          "
          >
            <span
              className="
              text-base
              font-semibold
              text-[#183838]
              sm:text-lg
            "
            >
              Total
            </span>

            <span
              className="
              shrink-0
              text-xl
              font-bold
              text-[#3d6d6d]
              sm:text-2xl
            "
            >
              ₹ {Math.max(total, 0)}
            </span>
          </div>
        </div>

        {/* =================================================
          CHECKOUT BUTTON
      ================================================= */}

        <div className="mt-5">
          {/* STEP 1 */}

          {step === 1 && (
            <button
              className="
              flex
              h-11
              w-full
              items-center
              justify-center
              rounded-xl
              bg-[#3d6d6d]
              px-4
              text-xs
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-[#4b8585]
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:bg-gray-300
              sm:h-12
              sm:text-sm
            "
              disabled={!items.length}
              onClick={() =>
                changeStep(2)
              }
            >
              {items.length > 0
                ? "Proceed to Checkout"
                : "Your cart is empty"}
            </button>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <button
              className="
              flex
              h-11
              w-full
              items-center
              justify-center
              rounded-xl
              bg-[#3d6d6d]
              px-4
              text-xs
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-[#4b8585]
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:bg-gray-300
              sm:h-12
              sm:text-sm
            "
              disabled={
                !items.length || loading
              }
              onClick={handleOrder}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  Processing...
                </span>
              ) : items.length > 0 ? (
                paymentMethod === "cod" ? (
                  "Confirm Order"
                ) : (
                  "Pay Now"
                )
              ) : (
                "Your cart is empty"
              )}
            </button>
          )}

          {/* Razorpay */}

          <div className="mt-3 flex justify-center">
            <div
              className="
              max-w-full
              rounded-lg
              border border-[#E5EEEE]
              bg-white
              px-2.5
              py-1.5
              shadow-sm
            "
            >
              <img
                referrerPolicy="origin"
                src="https://badges.razorpay.com/badge-light.png"
                className="h-7 max-w-full object-contain sm:h-8"
                alt="Razorpay"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}