// "use client";

// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useParams } from "next/navigation";
// import {
//   Check,
//   Package,
//   Truck,
//   MapPin,
//   CreditCard,
//   Calendar,
//   Clock,
//   Receipt,
//   ShoppingBag,
//   CircleCheck,
// } from "lucide-react";

// import api from "@/utils/api";

// /* ============================ HELPERS ====================== */

// function capitalizeAndFormat(value) {
//   if (typeof value !== "string" || !value.trim()) return "-";

//   return value
//     .replace(/_/g, " ")
//     .split(" ")
//     .map(
//       (word) =>
//         word.charAt(0).toUpperCase() +
//         word.slice(1).toLowerCase()
//     )
//     .join(" ");
// }

// const formatDate = (dateStr, format = "long") => {
//   if (!dateStr) return "-";

//   const date = new Date(dateStr);

//   if (Number.isNaN(date.getTime())) return "-";

//   if (format === "short") {
//     return date.toLocaleDateString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//     });
//   }

//   return date.toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });
// };

// /* ======================== STATUS STEPPER ====================== */

// const StatusStepper = ({ current }) => {
//   const steps = [
//     {
//       label: "Order Placed",
//       icon: ShoppingBag,
//     },
//     {
//       label: "Shipped",
//       icon: Package,
//     },
//     {
//       label: "Out for Delivery",
//       icon: Truck,
//     },
//     {
//       label: "Delivered",
//       icon: Check,
//     },
//   ];

//   return (
//     <>
//       {/* Desktop */}

//       <div className="hidden md:flex relative justify-between">
//         <div className="absolute top-6 left-[12%] right-[12%] h-[2px] bg-gray-200" />

//         {steps.map((step, index) => {
//           const Icon = step.icon;

//           const isActive = index + 1 <= current;
//           const isCompleted = index + 1 < current;

//           return (
//             <div
//               key={step.label}
//               className="relative z-10 flex flex-col items-center w-1/4"
//             >
//               {index > 0 && (
//                 <motion.div
//                   initial={{ scaleX: 0 }}
//                   animate={{
//                     scaleX: index + 1 <= current ? 1 : 0,
//                   }}
//                   transition={{ duration: 0.5 }}
//                   className="absolute top-6 right-1/2 w-full h-[2px] bg-[#187582] origin-left -z-10"
//                 />
//               )}

//               <div
//                 className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
//                   isActive
//                     ? "bg-[#187582] text-white shadow-lg shadow-[#187582]/20"
//                     : "bg-white border-2 border-gray-200 text-gray-400"
//                 }`}
//               >
//                 {isCompleted ? (
//                   <Check size={18} />
//                 ) : (
//                   <Icon size={18} />
//                 )}
//               </div>

//               <p
//                 className={`mt-3 text-sm font-medium text-center ${
//                   isActive
//                     ? "text-[#187582]"
//                     : "text-gray-400"
//                 }`}
//               >
//                 {step.label}
//               </p>
//             </div>
//           );
//         })}
//       </div>

//       {/* Mobile */}

//       <div className="md:hidden space-y-4">
//         {steps.map((step, index) => {
//           const Icon = step.icon;
//           const isActive = index + 1 <= current;
//           const isCompleted = index + 1 < current;

//           return (
//             <div
//               key={step.label}
//               className="flex items-center gap-4"
//             >
//               <div
//                 className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
//                   isActive
//                     ? "bg-[#187582] text-white"
//                     : "bg-gray-100 text-gray-400"
//                 }`}
//               >
//                 {isCompleted ? (
//                   <Check size={16} />
//                 ) : (
//                   <Icon size={16} />
//                 )}
//               </div>

//               <p
//                 className={`text-sm font-medium ${
//                   isActive
//                     ? "text-[#187582]"
//                     : "text-gray-400"
//                 }`}
//               >
//                 {step.label}
//               </p>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// /* ==================== PRODUCT CARD ======================= */

// const ProductCard = ({ product }) => {
//   const { heading, subheading } = product?.productId || {};

//   const { size, quantity } = product || {};

//   const sellingPrice =
//     Number(size?.price?.sellingPrice) || 0;

//   const qty = Number(quantity) || 0;

//   const totalPrice = sellingPrice * qty;

//   return (
//     <div className="flex gap-4 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
//       {/* Image */}

//       <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-xl overflow-hidden bg-gray-50">
//         <img
//           src={size?.image?.url || "/placeholder.png"}
//           alt={size?.image?.alt || heading || "Product"}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Content */}

//       <div className="flex-1 min-w-0 flex flex-col">
//         <div>
//           <h4 className="font-semibold text-gray-800 text-base md:text-lg">
//             {heading || "Product"}
//           </h4>

//           {subheading && (
//             <p className="text-sm text-gray-500 mt-1">
//               {subheading}
//             </p>
//           )}
//         </div>

//         <div className="flex justify-between items-end mt-auto pt-4">
//           <div>
//             <p className="text-xs text-gray-400">
//               Quantity
//             </p>

//             <p className="font-medium text-gray-700 mt-1">
//               {qty}
//             </p>
//           </div>

//           <div className="text-right">
//             <p className="text-xs text-gray-400">
//               Price
//             </p>

//             <p className="font-semibold text-[#187582] mt-1">
//               ₹ {totalPrice.toFixed(2)}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ==================== DELIVERY + PAYMENT CARD ============= */

// const DeliveryPaymentCard = ({
//   shippingAddress,
//   payment,
// }) => {
//   const {
//     fullName,
//     phoneNumber,
//     addressLine1,
//     addressLine2,
//     city,
//     landmark,
//     postalCode,
//     state,
//   } = shippingAddress || {};

//   const paymentStatus =
//     payment?.status ||
//     payment?.paymentStatus ||
//     "Paid";

//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
//       {/* Header */}

//       <div className="px-5 md:px-6 py-5 border-b border-gray-100">
//         <h3 className="font-semibold text-gray-800 text-lg">
//           Delivery & Payment Details
//         </h3>

//         <p className="text-xs text-gray-400 mt-1">
//           Shipping address and payment information
//         </p>
//       </div>

//       {/* Content */}

//       <div className="grid grid-cols-1 md:grid-cols-2">
//         {/* ================= DELIVERY ================= */}

//         <div className="p-5 md:p-6 md:border-r border-gray-100">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="w-10 h-10 shrink-0 rounded-xl bg-[#eaf5f5] text-[#187582] flex items-center justify-center">
//               <MapPin size={19} />
//             </div>

//             <div>
//               <h4 className="font-semibold text-gray-800">
//                 Delivery Address
//               </h4>

//               <p className="text-xs text-gray-400">
//                 Shipping location
//               </p>
//             </div>
//           </div>

//           {shippingAddress ? (
//             <div className="md:pl-[52px] text-sm text-gray-500 leading-6">
//               <p className="font-semibold text-gray-800">
//                 {fullName || "-"}
//               </p>

//               <p>{phoneNumber || "-"}</p>

//               <div className="mt-3">
//                 {addressLine1 && <p>{addressLine1}</p>}

//                 {addressLine2 && (
//                   <p>{addressLine2}</p>
//                 )}

//                 {landmark && (
//                   <p>{landmark}</p>
//                 )}

//                 {(city || state?.name) && (
//                   <p>
//                     {city}
//                     {city && state?.name ? ", " : ""}
//                     {state?.name}
//                   </p>
//                 )}

//                 {postalCode && (
//                   <p>{postalCode}</p>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <p className="text-sm text-gray-400">
//               Delivery address not available.
//             </p>
//           )}
//         </div>

//         {/* ================= PAYMENT ================= */}

//         <div className="p-5 md:p-6">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="w-10 h-10 shrink-0 rounded-xl bg-[#eaf5f5] text-[#187582] flex items-center justify-center">
//               <CreditCard size={19} />
//             </div>

//             <div>
//               <h4 className="font-semibold text-gray-800">
//                 Payment Details
//               </h4>

//               <p className="text-xs text-gray-400">
//                 Payment information
//               </p>
//             </div>
//           </div>

//           <div className="md:pl-[52px]">
//             <div className="flex justify-between items-center py-3 border-b border-gray-100">
//               <span className="text-sm text-gray-500">
//                 Payment Method
//               </span>

//               <span className="text-sm font-medium text-gray-800 capitalize">
//                 {payment?.method || "-"}
//               </span>
//             </div>

//             <div className="flex justify-between items-center py-3">
//               <span className="text-sm text-gray-500">
//                 Payment Status
//               </span>

//               <span
//                 className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
//                   String(paymentStatus)
//                     .toLowerCase()
//                     .includes("fail")
//                     ? "bg-red-50 text-[#7a1712]"
//                     : "bg-green-50 text-green-700"
//                 }`}
//               >
//                 <Check size={13} />

//                 {capitalizeAndFormat(paymentStatus)}
//               </span>
//             </div>

//             {payment?.handlingFee > 0 && (
//               <div className="flex justify-between items-center py-3 border-t border-gray-100">
//                 <span className="text-sm text-gray-500">
//                   Handling Fee
//                 </span>

//                 <span className="text-sm font-medium text-gray-800">
//                   ₹ {Number(payment.handlingFee).toFixed(2)}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // tracking item

// const TrackingItem = ({
//   info,
//   isLatest,
//   isLast,
// }) => {
//   const {
//     date,
//     activity,
//     location,
//     sr_status_label,
//   } = info || {};

//   return (
//     <div className="flex gap-5">
//       {/* Timeline */}

//       <div className="flex flex-col items-center">
//         <div
//           className={`w-4 h-4 rounded-full shrink-0 mt-1 ${
//             isLatest
//               ? "bg-[#187582] ring-4 ring-[#eaf5f5]"
//               : "bg-gray-300"
//           }`}
//         />

//         {!isLast && (
//           <div className="w-[2px] flex-1 min-h-[65px] bg-gray-100 my-2" />
//         )}
//       </div>

//       {/* Content */}

//       <div
//         className={`flex-1 ${
//           !isLast ? "pb-8" : ""
//         }`}
//       >
//         <div className="flex flex-wrap items-center gap-2">
//           <h4
//             className={`font-medium ${
//               isLatest
//                 ? "text-[#187582]"
//                 : "text-gray-700"
//             }`}
//           >
//             {sr_status_label || "Order Update"}
//           </h4>

//           {isLatest && (
//             <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-[#eaf5f5] text-[#187582]">
//               Latest
//             </span>
//           )}
//         </div>

//         {activity && (
//           <p className="text-sm text-gray-500 mt-2">
//             {activity}
//           </p>
//         )}

//         <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-xs text-gray-400">
//           {location && (
//             <span className="flex items-center gap-1.5">
//               <MapPin size={13} />
//               {location}
//             </span>
//           )}

//           {date && (
//             <span className="flex items-center gap-1.5">
//               <Clock size={13} />
//               {formatDate(date)}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // tracking info

// const TrackingInfo = ({ trackingInfo }) => {
//   const history = [...trackingInfo].reverse();

//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-7">
//       <div className="flex items-center gap-3 mb-8">
//         <div className="w-10 h-10 rounded-xl bg-[#eaf5f5] text-[#187582] flex items-center justify-center">
//           <Clock size={19} />
//         </div>

//         <div>
//           <h3 className="font-semibold text-gray-800">
//             Tracking History
//           </h3>

//           <p className="text-xs text-gray-400">
//             Latest updates about your delivery
//           </p>
//         </div>
//       </div>

//       <div className="max-w-3xl">
//         {history.map((info, index) => (
//           <TrackingItem
//             key={info?._id || index}
//             info={info}
//             isLatest={index === 0}
//             isLast={index === history.length - 1}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

//     // main order card

// const OrderCard = () => {
//   const params = useParams();

//   const orderId = params?.orderId;

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const {
//     payment,
//     shipping,
//     createdAt,
//     orderId: dataOrderId,
//     products,
//     shippingAddress,
//     orderStatus,
//     coupon,
//     totalBeforeDiscount,
//     totalAfterDiscount,
//   } = data || {};

//   const getCurrentStep = (status) => {
//     const statusMap = {
//       pending: 1,
//       confirmed: 1,
//       shipped: 2,
//       out_for_delivery: 3,
//       delivered: 4,
//     };

//     return statusMap[String(status || "").toLowerCase()] || 1;
//   };

//   const calculateDiscount = (
//     amount,
//     type,
//     value
//   ) => {
//     if (!coupon) return 0;

//     if (type === "flat") {
//       return Number(value || 0);
//     }

//     if (type === "percentage") {
//       return (
//         Number(amount || 0) *
//         (Number(value || 0) / 100)
//       );
//     }

//     return 0;
//   };

//  //   fetch order

//   useEffect(() => {
//     if (!orderId) return;

//     const fetchOrder = async () => {
//       try {
//         setLoading(true);

//         const token = localStorage.getItem("token");

//         const res = await api.get(
//           `/track?orderid=${orderId}`,
//           {
//             headers: {
//               Authorization: token
//                 ? `Bearer ${token}`
//                 : "",
//             },
//           }
//         );

//         if (res?.data?.success) {
//           setData(res.data.order);
//         }
//       } catch (error) {
//         console.error(
//           "Order fetch error:",
//           error
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrder();
//   }, [orderId]);

// //   loading

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f8fafb]">
//         <div className="text-center">
//           <div className="w-10 h-10 mx-auto border-4 border-gray-200 border-t-[#187582] rounded-full animate-spin" />

//           <p className="text-sm text-gray-500 mt-4">
//             Loading order details...
//           </p>
//         </div>
//       </div>
//     );
//   }

// //   not-found
//   if (!data) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#f8fafb]">
//         <div className="text-center">
//           <Package
//             size={50}
//             className="mx-auto text-gray-300 mb-4"
//           />

//           <h2 className="text-xl font-semibold text-gray-800">
//             Order not found
//           </h2>

//           <p className="text-gray-500 mt-2">
//             We couldn't find this order.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const currentStep = getCurrentStep(orderStatus);

//   const discount = calculateDiscount(
//     totalBeforeDiscount,
//     coupon?.discountType,
//     coupon?.discountValue
//   );

//   return (
//     <section className="min-h-screen bg-[#f8fafb] py-10 md:py-14 px-4 mt-[6rem]">
//       <div className="max-w-7xl mx-auto">

//         {/* =============== PAGE HEADER =================== */}

//         <div className="mb-7">
//           <p className="text-[#187582] text-sm font-semibold uppercase tracking-widest">
//             Order Tracking
//           </p>

//           <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
//             Track Your Order
//           </h1>

//           <p className="text-sm text-gray-500 mt-2">
//             View your order status and delivery updates.
//           </p>
//         </div>

//         {/* ==================== ORDER HEADER ======================== */}

//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-7 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

//             <div>
//               <p className="text-xs uppercase tracking-widest text-gray-400">
//                 Order Number
//               </p>

//               <h2 className="text-xl font-semibold text-gray-800 mt-2">
//                 #{dataOrderId || orderId}
//               </h2>

//               <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
//                 <Calendar size={15} />

//                 {formatDate(createdAt, "short")}
//               </div>
//             </div>

//             <div className="md:text-right">
//               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#eaf5f5] text-[#187582] text-sm font-medium">
//                 <CircleCheck size={16} />

//                 {capitalizeAndFormat(orderStatus)}
//               </div>

//               {shipping?.expected_delivery_date && (
//                 <p className="text-sm text-gray-500 mt-3">
//                   Expected delivery:{" "}
//                   <span className="font-medium text-gray-700">
//                     {formatDate(
//                       shipping.expected_delivery_date,
//                       "short"
//                     )}
//                   </span>
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Progress */}

//           <div className="border-t border-gray-100 mt-8 pt-8">
//             <StatusStepper current={currentStep} />
//           </div>
//         </div>

//         {/* ================== PRODUCTS + SUMMARY ===================== */}

//         <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">

//           {/* PRODUCTS */}

//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
//             <div className="flex items-center justify-between px-5 md:px-6 py-5 border-b border-gray-100">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-xl bg-[#eaf5f5] text-[#187582] flex items-center justify-center">
//                   <ShoppingBag size={19} />
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-gray-800">
//                     Order Items
//                   </h3>

//                   <p className="text-xs text-gray-400">
//                     {products?.length || 0} item
//                     {products?.length !== 1 ? "s" : ""}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="p-5 md:p-6 space-y-5">
//               {products?.map((product, index) => (
//                 <ProductCard
//                   key={product?._id || index}
//                   product={product}
//                 />
//               ))}
//             </div>
//           </div>

//           {/* ORDER SUMMARY */}

//           <aside className="lg:sticky lg:top-24">
//             <div className="bg-[#187582] rounded-2xl shadow-lg p-6 text-white">

//               <div className="flex items-center gap-3 mb-6">
//                 <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
//                   <Receipt size={19} />
//                 </div>

//                 <h3 className="font-semibold">
//                   Order Summary
//                 </h3>
//               </div>

//               <div className="space-y-4 text-sm">

//                 <div className="flex justify-between text-white/80">
//                   <span>Subtotal</span>

//                   <span>
//                     ₹{" "}
//                     {Number(
//                       totalBeforeDiscount || 0
//                     ).toFixed(2)}
//                   </span>
//                 </div>

//                 {coupon && (
//                   <div className="flex justify-between text-green-200">
//                     <span>
//                       Discount ({coupon.code})
//                     </span>

//                     <span>
//                       - ₹ {discount.toFixed(2)}
//                     </span>
//                   </div>
//                 )}

//                 {payment?.handlingFee > 0 && (
//                   <div className="flex justify-between text-white/80">
//                     <span>Handling Fee</span>

//                     <span>
//                       ₹{" "}
//                       {Number(
//                         payment.handlingFee
//                       ).toFixed(2)}
//                     </span>
//                   </div>
//                 )}

//                 <div className="border-t border-white/20 pt-5">
//                   <div className="flex justify-between items-center">
//                     <span className="font-medium">
//                       Total Amount
//                     </span>

//                     <span className="text-xl font-bold">
//                       ₹{" "}
//                       {Number(
//                         totalAfterDiscount || 0
//                       ).toFixed(2)}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </aside>
//         </div>

//         {/* ================ DELIVERY + PAYMENT COMBINED ======================= */}

//         <div className="mt-6">
//           <DeliveryPaymentCard
//             shippingAddress={shippingAddress}
//             payment={payment}
//           />
//         </div>

//       {/* tracking history */}

//         {shipping?.tracking_history?.length > 0 && (
//           <div className="mt-6">
//             <TrackingInfo
//               trackingInfo={shipping.tracking_history}
//             />
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default OrderCard;

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import {
  Check,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Calendar,
  Clock,
  Receipt,
  ShoppingBag,
  CircleCheck,
} from "lucide-react";

import api from "@/utils/api";

/* ============================ HELPERS ====================== */

function capitalizeAndFormat(value) {
  if (typeof value !== "string" || !value.trim()) return "-";

  return value
    .replace(/_/g, " ")
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1).toLowerCase()
    )
    .join(" ");
}

const formatDate = (dateStr, format = "long") => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  if (Number.isNaN(date.getTime())) return "-";

  if (format === "short") {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

/* ======================== STATUS STEPPER ====================== */

const StatusStepper = ({ current }) => {
  const steps = [
    {
      label: "Order Placed",
      icon: ShoppingBag,
    },
    {
      label: "Shipped",
      icon: Package,
    },
    {
      label: "Out for Delivery",
      icon: Truck,
    },
    {
      label: "Delivered",
      icon: Check,
    },
  ];

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex relative justify-between">
        <div className="absolute top-5 left-[12%] right-[12%] h-[2px] bg-gray-200" />

        {steps.map((step, index) => {
          const Icon = step.icon;

          const isActive = index + 1 <= current;
          const isCompleted = index + 1 < current;

          return (
            <div
              key={step.label}
              className="relative z-10 flex flex-col items-center w-1/4"
            >
              {index > 0 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: index + 1 <= current ? 1 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-5 right-1/2 w-full h-[2px] bg-[#187582] origin-left -z-10"
                />
              )}

              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? "bg-[#187582] text-white shadow-md shadow-[#187582]/20"
                    : "bg-white border-2 border-gray-200 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <Check size={16} />
                ) : (
                  <Icon size={16} />
                )}
              </div>

              <p
                className={`mt-2 text-xs font-medium text-center ${
                  isActive
                    ? "text-[#187582]"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="md:hidden space-y-3">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index + 1 <= current;
          const isCompleted = index + 1 < current;

          return (
            <div
              key={step.label}
              className="flex items-center gap-4"
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                  isActive
                    ? "bg-[#187582] text-white"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {isCompleted ? (
                  <Check size={15} />
                ) : (
                  <Icon size={15} />
                )}
              </div>

              <p
                className={`text-sm font-medium ${
                  isActive
                    ? "text-[#187582]"
                    : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

/* ==================== PRODUCT CARD ======================= */

const ProductCard = ({ product }) => {
  const { heading, subheading } = product?.productId || {};
  const { size, quantity } = product || {};

  const sellingPrice =
    Number(size?.price?.sellingPrice) || 0;

  const qty = Number(quantity) || 0;

  const totalPrice = sellingPrice * qty;

  return (
    <div className="flex gap-4 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-xl overflow-hidden bg-gray-50">
        <img
          src={size?.image?.url || "/placeholder.png"}
          alt={size?.image?.alt || heading || "Product"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col">
        <div>
          <h4 className="font-semibold text-gray-800 text-base md:text-lg">
            {heading || "Product"}
          </h4>

          {subheading && (
            <p className="text-sm text-gray-500 mt-1">
              {subheading}
            </p>
          )}
        </div>

        <div className="flex justify-between items-end mt-auto pt-4">
          <div>
            <p className="text-xs text-gray-400">
              Quantity
            </p>

            <p className="font-medium text-gray-700 mt-1">
              {qty}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">
              Price
            </p>

            <p className="font-semibold text-[#187582] mt-1">
              ₹ {totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ==================== DELIVERY + PAYMENT CARD ============= */

const DeliveryPaymentCard = ({
  shippingAddress,
  payment,
}) => {
  const {
    fullName,
    phoneNumber,
    addressLine1,
    addressLine2,
    city,
    landmark,
    postalCode,
    state,
  } = shippingAddress || {};

  const paymentStatus =
    payment?.status ||
    payment?.paymentStatus ||
    "Paid";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 md:px-6 py-5 border-b border-gray-100">
        <h3 className="font-semibold text-gray-800 text-lg">
          Delivery & Payment Details
        </h3>

        <p className="text-xs text-gray-400 mt-1">
          Shipping address and payment information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Delivery */}
        <div className="p-5 md:p-6 md:border-r border-gray-100">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-[#eaf5f5] text-[#187582] flex items-center justify-center">
              <MapPin size={19} />
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">
                Delivery Address
              </h4>

              <p className="text-xs text-gray-400">
                Shipping location
              </p>
            </div>
          </div>

          {shippingAddress ? (
            <div className="md:pl-[52px] text-sm text-gray-500 leading-6">
              <p className="font-semibold text-gray-800">
                {fullName || "-"}
              </p>

              <p>{phoneNumber || "-"}</p>

              <div className="mt-3">
                {addressLine1 && <p>{addressLine1}</p>}
                {addressLine2 && <p>{addressLine2}</p>}
                {landmark && <p>{landmark}</p>}

                {(city || state?.name) && (
                  <p>
                    {city}
                    {city && state?.name ? ", " : ""}
                    {state?.name}
                  </p>
                )}

                {postalCode && <p>{postalCode}</p>}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">
              Delivery address not available.
            </p>
          )}
        </div>

        {/* Payment */}
        <div className="p-5 md:p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-[#eaf5f5] text-[#187582] flex items-center justify-center">
              <CreditCard size={19} />
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">
                Payment Details
              </h4>

              <p className="text-xs text-gray-400">
                Payment information
              </p>
            </div>
          </div>

          <div className="md:pl-[52px]">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">
                Payment Method
              </span>

              <span className="text-sm font-medium text-gray-800 capitalize">
                {payment?.method || "-"}
              </span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-sm text-gray-500">
                Payment Status
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                <Check size={13} />
                {capitalizeAndFormat(paymentStatus)}
              </span>
            </div>

            {payment?.handlingFee > 0 && (
              <div className="flex justify-between items-center py-3 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  Handling Fee
                </span>

                <span className="text-sm font-medium text-gray-800">
                  ₹ {Number(payment.handlingFee).toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ================= TRACKING ITEM ================= */

const TrackingItem = ({
  info,
  isLatest,
  isLast,
}) => {
  const {
    date,
    activity,
    location,
    sr_status_label,
  } = info || {};

  return (
    <div className="flex gap-5">
      <div className="flex flex-col items-center">
        <div
          className={`w-4 h-4 rounded-full shrink-0 mt-1 ${
            isLatest
              ? "bg-[#187582] ring-4 ring-[#eaf5f5]"
              : "bg-gray-300"
          }`}
        />

        {!isLast && (
          <div className="w-[2px] flex-1 min-h-[65px] bg-gray-100 my-2" />
        )}
      </div>

      <div className={`flex-1 ${!isLast ? "pb-8" : ""}`}>
        <div className="flex flex-wrap items-center gap-2">
          <h4
            className={`font-medium ${
              isLatest
                ? "text-[#187582]"
                : "text-gray-700"
            }`}
          >
            {sr_status_label || "Order Update"}
          </h4>

          {isLatest && (
            <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-[#eaf5f5] text-[#187582]">
              Latest
            </span>
          )}
        </div>

        {activity && (
          <p className="text-sm text-gray-500 mt-2">
            {activity}
          </p>
        )}

        <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-xs text-gray-400">
          {location && (
            <span className="flex items-center gap-1.5">
              <MapPin size={13} />
              {location}
            </span>
          )}

          {date && (
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {formatDate(date)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

/* ================= TRACKING INFO ================= */

const TrackingInfo = ({ trackingInfo }) => {
  const history = [...trackingInfo].reverse();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 md:p-7">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-[#eaf5f5] text-[#187582] flex items-center justify-center">
          <Clock size={19} />
        </div>

        <div>
          <h3 className="font-semibold text-gray-800">
            Tracking History
          </h3>

          <p className="text-xs text-gray-400">
            Latest updates about your delivery
          </p>
        </div>
      </div>

      <div className="max-w-3xl">
        {history.map((info, index) => (
          <TrackingItem
            key={info?._id || index}
            info={info}
            isLatest={index === 0}
            isLast={index === history.length - 1}
          />
        ))}
      </div>
    </div>
  );
};

/* ================= MAIN ORDER CARD ================= */

const OrderCard = () => {
  const params = useParams();
  const orderId = params?.orderId;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const {
    payment,
    shipping,
    createdAt,
    orderId: dataOrderId,
    products,
    shippingAddress,
    orderStatus,
    coupon,
    totalBeforeDiscount,
    totalAfterDiscount,
  } = data || {};

  const getCurrentStep = (status) => {
    const statusMap = {
      pending: 1,
      confirmed: 1,
      shipped: 2,
      out_for_delivery: 3,
      delivered: 4,
    };

    return statusMap[String(status || "").toLowerCase()] || 1;
  };

  const calculateDiscount = (amount, type, value) => {
    if (!coupon) return 0;

    if (type === "flat") {
      return Number(value || 0);
    }

    if (type === "percentage") {
      return (
        Number(amount || 0) *
        (Number(value || 0) / 100)
      );
    }

    return 0;
  };

  /* ================= FETCH ORDER ================= */

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const res = await api.get(
          `/track?orderid=${orderId}`,
          {
            headers: {
              Authorization: token
                ? `Bearer ${token}`
                : "",
            },
          }
        );

        if (res?.data?.success) {
          setData(res.data.order);
        }
      } catch (error) {
        console.error("Order fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafb]">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto border-4 border-gray-200 border-t-[#187582] rounded-full animate-spin" />

          <p className="text-sm text-gray-500 mt-4">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafb]">
        <div className="text-center">
          <Package
            size={50}
            className="mx-auto text-gray-300 mb-4"
          />

          <h2 className="text-xl font-semibold text-gray-800">
            Order not found
          </h2>

          <p className="text-gray-500 mt-2">
            We couldn't find this order.
          </p>
        </div>
      </div>
    );
  }

  const currentStep = getCurrentStep(orderStatus);

  const discount = calculateDiscount(
    totalBeforeDiscount,
    coupon?.discountType,
    coupon?.discountValue
  );

  return (
    <section className="min-h-screen bg-[#f8fafb] py-10 md:py-14 px-4 mt-[6rem]">
      <div className="max-w-7xl mx-auto">

        {/* PAGE HEADER */}

        <div className="mb-7">
          <p className="text-[#187582] text-sm font-semibold uppercase tracking-widest">
            Order Tracking
          </p>

          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
            Track Your Order
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            View your order status and delivery updates.
          </p>
        </div>

        {/* ================= COMPACT ORDER HEADER ================= */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 md:px-6 md:py-5 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            {/* Left */}

            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-gray-400">
                Order Number
              </p>

              <div className="flex flex-wrap items-center gap-3 mt-1.5">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  #{dataOrderId || orderId}
                </h2>

                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Calendar size={14} />
                  {formatDate(createdAt, "short")}
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="md:text-right">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#eaf5f5] text-[#187582] text-xs font-medium">
                <CircleCheck size={14} />
                {capitalizeAndFormat(orderStatus)}
              </div>

              {shipping?.expected_delivery_date && (
                <p className="text-xs text-gray-500 mt-2">
                  Expected delivery:{" "}
                  <span className="font-medium text-gray-700">
                    {formatDate(
                      shipping.expected_delivery_date,
                      "short"
                    )}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Compact Progress */}

          <div className="border-t border-gray-100 mt-5 pt-5">
            <StatusStepper current={currentStep} />
          </div>
        </div>

        {/* PRODUCTS + SUMMARY */}

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-6 items-start">

          {/* PRODUCTS */}

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between px-5 md:px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eaf5f5] text-[#187582] flex items-center justify-center">
                  <ShoppingBag size={19} />
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800">
                    Order Items
                  </h3>

                  <p className="text-xs text-gray-400">
                    {products?.length || 0} item
                    {products?.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 md:p-6 space-y-5">
              {products?.map((product, index) => (
                <ProductCard
                  key={product?._id || index}
                  product={product}
                />
              ))}
            </div>
          </div>

          {/* ORDER SUMMARY */}

          <aside className="lg:sticky lg:top-24">
            <div className="bg-[#187582] rounded-2xl shadow-lg p-6 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Receipt size={19} />
                </div>

                <h3 className="font-semibold">
                  Order Summary
                </h3>
              </div>

              <div className="space-y-4 text-sm">

                <div className="flex justify-between text-white/80">
                  <span>Subtotal</span>

                  <span>
                    ₹{" "}
                    {Number(
                      totalBeforeDiscount || 0
                    ).toFixed(2)}
                  </span>
                </div>

                {coupon && (
                  <div className="flex justify-between text-green-200">
                    <span>
                      Discount ({coupon.code})
                    </span>

                    <span>
                      - ₹ {discount.toFixed(2)}
                    </span>
                  </div>
                )}

                {payment?.handlingFee > 0 && (
                  <div className="flex justify-between text-white/80">
                    <span>Handling Fee</span>

                    <span>
                      ₹{" "}
                      {Number(
                        payment.handlingFee
                      ).toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="border-t border-white/20 pt-5">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      Total Amount
                    </span>

                    <span className="text-xl font-bold">
                      ₹{" "}
                      {Number(
                        totalAfterDiscount || 0
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* DELIVERY + PAYMENT */}

        <div className="mt-6">
          <DeliveryPaymentCard
            shippingAddress={shippingAddress}
            payment={payment}
          />
        </div>

        {/* TRACKING HISTORY */}

        {shipping?.tracking_history?.length > 0 && (
          <div className="mt-6">
            <TrackingInfo
              trackingInfo={shipping.tracking_history}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderCard;