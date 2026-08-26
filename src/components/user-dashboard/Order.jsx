"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { PDFDownloadLink } from "@react-pdf/renderer";

import { fetchOrders } from "@/redux/slices/orderSlice";
import Fadeloader from "@/components/common/Fadeloader";
import { cancelOrder } from "@/redux/slices/checkoutSlice";
import Pagination from "@/components/common/Pagination";
import { generateQRCodeDataURL } from "@/utils/generateQRCodeDataURL";
import { generateBarcodeDataURL } from "@/utils/generateBarcodeDataURL";
import InvoiceDocument from "@/utils/InvoiceDocument";

import ReviewModal from "@/components/user-dashboard/ReviewModal";

import image from "@/assets/images/market-blue.png";

// Helper: format date
const formatDate = (dateStr, format = "long") => {
  if (!dateStr) return "-";

  const date = new Date(dateStr);

  if (format === "short") {
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// Helper: format price
const formatPrice = (p) =>
  `₹${Number(p).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  })}`;

const Orders = () => {
  const { orders, pagination } = useSelector((state) => state.order);

  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  const fetchOrderData = useCallback(async () => {
    setLoading(true);

    try {
      await dispatch(fetchOrders({ page, limit })).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [dispatch, limit, page]);

  useEffect(() => {
    fetchOrderData();
  }, [fetchOrderData]);

  return (
    <div>
      <h2 className="text-4xl font-light mb-4 pb-1 border-b-2 primaryText">
        Orders
      </h2>

      {loading ? (
        <Fadeloader />
      ) : orders.length > 0 ? (
        <div className="space-y-4">
          <>
            {orders.map((order) => (
              <OrderCard
                key={order?._id || order.orderId}
                order={order}
              />
            ))}

            {pagination && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={(newPage) => setPage(newPage)}
                handleLimitChange={(newLimit) => setLimit(newLimit)}
                limit={pagination.limit}
              />
            )}
          </>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-96">
          <Image
            src={image}
            alt="No Orders"
            className="w-40 mb-4"
          />

          <h3 className="text-2xl font-semibold primaryText mb-2">
            No Orders Found
          </h3>

          <p className="bodyText mb-6 text-center max-w-xs">
            You haven't placed any orders yet. Browse our products and start
            shopping!
          </p>

          <Link
            href="/shop"
            className="bg-[#3d6d6d] hover:bg-[#61b9b9] text-white px-6 py-2 rounded-full transition"
          >
            Go to Shop
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;

const OrderCard = ({ order }) => {
  const dispatch = useDispatch();

  const [isCanceling, setIsCanceling] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [barcodeUrl, setBarcodeUrl] = useState("");

  const product = order.products;
  const payment = order.payment || {};
  const shipping = order.shipping || {};
  const coupon = order.coupon;

  const handleCancel = async () => {
    const id = order._id;

    if (!id) {
      console.log("no id selected");
      return;
    }

    setIsCanceling(true);

    try {
      const res = await dispatch(cancelOrder(id)).unwrap();
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsCanceling(false);
    }
  };

  useEffect(() => {
    if (order.hash) {
      const frontendBaseURL =
        process.env.NEXT_PUBLIC_FRONTEND_URL ||
        "http://localhost:3000";

      const fullURL = `${frontendBaseURL}/verify-invoice/${order.hash}`;

      const qr = generateQRCodeDataURL(fullURL);
      setQrCodeUrl(qr);
    }

    if (order.orderId) {
      const barcode = generateBarcodeDataURL(order.orderId);
      setBarcodeUrl(barcode);
    }
  }, [order.hash, order.orderId]);

  return (
    <div className="p-4 rounded-md shadow-sm ">
      <div className="flex flex-col-reverse md:flex-row justify-between pt-1">
        <div>
          <p className="text-xl mb-2 primaryText font-semibold">
            {order.orderId}
          </p>

          <p className="text-sm bodyText">
            Order Date: <span>{formatDate(order.createdAt)}</span>
          </p>

          {order.orderStatus !== "cancelled" &&
            order.orderStatus !== "delivered" && (
              <div className="flex gap-2">
                <p className="text-sm bodyText font-medium">
                  Estimated Delivery :
                </p>

                <span className="text-sm text-[#0E7A00]">
                  {shipping.expected_delivery_date
                    ? formatDate(
                        shipping.expected_delivery_date,
                        "short"
                      )
                    : "-"}
                </span>
              </div>
            )}

          <p className="text-sm bodyText">
            Payment Method:
            <span className="capitalize">
              {payment.method || "-"}
            </span>
          </p>

          <p className="text-sm bodyText mb-2">
            Payment:
            <span className="capitalize">
              {payment.status || "-"}
            </span>
          </p>
        </div>

        <div
          className={`
            ${
              order.orderStatus === "delivered"
                ? "bg-green-100 text-[#0E7A00]"
                : order.orderStatus === "cancelled"
                ? "bg-red-100 text-red-800"
                : "bg-[#1D890733] text-[#3A3A3A]"
            }
            text-sm px-3 w-25 mb-2 py-0.5 h-6 rounded-full shadow-md flex items-center justify-center min-w-[100px] capitalize
          `}
        >
          {order.orderStatus}
        </div>
      </div>

      {product &&
        product.map((prod, index) => (
          <ProductCard
            key={index}
            product={prod}
            OrderId={order.orderId}
            status={order.orderStatus}
          />
        ))}

      <div className="mt-4 flex justify-between items-center border-t-2 pt-2">
        <div className="w-full flex flex-col md:flex-row justify-between">
          <div className="text-lg font-medium w-full md:w-1/2 text-right md:text-left primaryText">
            <div>
              Total:{" "}
              <span className="text-[#0E7A00]">
                {formatPrice(order.totalAfterDiscount)}
              </span>
            </div>

            <div>
              {coupon && (
                <span className="text-xs text-[#0E7A00]">
                  (Coupon: {coupon.code}, {coupon.discountValue}
                  {coupon.discountType === "percentage"
                    ? "%"
                    : "₹"}{" "}
                  off)
                </span>
              )}
            </div>
          </div>

          <div className="space-x-2 w-full sm:w-1/2 items-center text-center flex justify-end self-end mt-2 md:mt-0">
            {order.orderStatus === "pending" &&
              payment.method === "cod" && (
                <button
                  className="hover:bg-[#da1c22] bg-[#e5484d] text-white text-sm px-4 py-2 rounded-full cursor-pointer disabled:cursor-not-allowed"
                  onClick={handleCancel}
                  disabled={isCanceling}
                >
                  {isCanceling
                    ? "Cancelling..."
                    : "Cancel Order"}
                </button>
              )}

            {order.orderStatus !== "delivered" &&
              order.orderStatus !== "cancelled" && (
                <Link
                  href={`/track-order/${order.orderId}`}
                  className="hover:bg-[#3a8b88] bg-[#61b9b9] text-white text-sm px-4 py-2 rounded-full"
                >
                  Track Order
                </Link>
              )}

            {order.orderStatus === "delivered" && (
              <>
                {qrCodeUrl && barcodeUrl && (
                  <PDFDownloadLink
                    document={
                      <InvoiceDocument
                        data={order}
                        qrDataURL={qrCodeUrl}
                        barcodeURL={barcodeUrl}
                      />
                    }
                    fileName={`${order.orderId}.pdf`}
                    className="hover:bg-[#3d2622] bg-[#8C6C54] text-white text-sm px-4 py-2 rounded-full duration-300"
                  >
                    {({ loading }) =>
                      loading
                        ? "Preparing invoice..."
                        : "Download Invoice"
                    }
                  </PDFDownloadLink>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, OrderId, status }) => {
  const { size, productId, quantity } = product;

  const [openReviewModal, setOpenReviewModal] =
    useState(false);

  return (
    <div className="md:flex items-center gap-4 mt-5 w-full">
      <Image
        src={size?.image?.url}
        alt={size?.image?.alt || productId?.name || "Product"}
        width={120}
        height={120}
        className="md:w-30 md:h-30 w-69 h-46 object-cover rounded-md"
      />

      <div className="w-full space-y-2 lg:space-y-1 mt-2">
        <div className="flex justify-between">
          <div>
            <p className="font-medium text-lg primaryText">
              {`${productId?.heading || productId?.name} - ${
                size?.size || ""
              }`}
            </p>

            <p className="text-xs bodyText">
              {productId?.subheading}
            </p>
          </div>

          <div>
            <p className="text-md bodyText pr-5">
              Qty: <span>{quantity}</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between relative">
          <div>
            <p className="text-sm primaryText flex gap-2">
              Price:{" "}
              <span className="text-[#0E7A00]">
                {formatPrice(size?.price?.sellingPrice)}
              </span>

              <span className="line-through bodyText">
                {formatPrice(size?.price?.mrp)}
              </span>
            </p>
          </div>

          <div className="mt-2 md:mt-0 self-end flex flex-col gap-1">
            <p className="text-sm primaryText">
              Subtotal:{" "}
              <span className="text-[#0E7A00]">
                {formatPrice(
                  size?.price?.sellingPrice * quantity
                )}
              </span>
            </p>

            {status === "delivered" && (
              <button
                onClick={() => setOpenReviewModal(true)}
                className="text-blue-400 text-md cursor-pointer hover:underline hover:text-blue-500 duration-150 rounded-full ml-auto"
              >
                Review
              </button>
            )}
          </div>
        </div>
      </div>

      {openReviewModal && (
        <ReviewModal
          onClose={() => setOpenReviewModal(false)}
          product={product}
          OrderId={OrderId}
        />
      )}
    </div>
  );
};