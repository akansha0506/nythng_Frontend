"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";


const logo = "/NewLogo.svg";
const signature = "/signature.png";

// Register font
Font.register({
  family: "NotoSans",
  src: "/fonts/NotoSans-VariableFont_wdth,wght.ttf",
})

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "NotoSans",
    lineHeight: 1.5,
    color: "#000",
  },

  headerRow: {
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    paddingBottom: 10,
    marginBottom: 20,
    position: "relative",
  },

  logo: {
    position: "absolute",
    top: -18,
    right: -18,
    objectFit: "contain",
    height: 30,
    width: "auto",
  },

  companyInfo: {
    textAlign: "center",
    width: "100%",
  },

  companyText: {
    color: "#555",
    fontSize: 10,
  },

  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },

  section: {
    marginBottom: 15,
  },

  heading: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 6,
    textTransform: "uppercase",
  },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    padding: 4,
    textAlign: "center",
    justifyContent: "space-between",
    alignContent: "center",
  },

  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ccc",
    borderBottomStyle: "solid",
    paddingVertical: 4,
    justifyContent: "space-between",
    alignContent: "center",
  },

  col: {
    width: "12%",
  },

  largeCol: {
    width: "28%",
    textAlign: "left",
  },

  textRight: {
    textAlign: "right",
  },

  textLeft: {
    textAlign: "left",
  },

  textCenter: {
    textAlign: "center",
  },

  marginRight: {
    marginRight: 4,
  },

  marginLeft: {
    marginLeft: 4,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
    marginBottom: 20,
  },

  infoBox: {
    width: "48%",
  },

  summaryAndQr: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 20,
    width: "100%",
  },

  summary: {
    width: "50%",
    textAlign: "right",
  },

  qr: {
    width: 100,
    height: 100,
    alignSelf: "flex-start",
  },

  footer: {
    marginTop: 30,
    paddingTop: 10,
  },

  footerText: {
    fontSize: 8,
    color: "#666666",
    marginBottom: 1,
    textAlign: "center",
  },

  termsAndConditions: {
    marginTop: 20,
    fontSize: 8,
  },

  signature: {
    marginTop: 20,
    textAlign: "right",
    fontSize: 8,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "100%",
  },

  barcode: {
    width: "100%",
    height: 60,
    marginBottom: 5,
  },
});

// Synchronous Discount Calculator
const calculateDiscount = (totalBeforeDiscount, coupon) => {
  if (
    !coupon ||
    !coupon.discountType ||
    !coupon.discountValue
  ) {
    return {
      discountAmount: 0,
      finalTotal: totalBeforeDiscount,
    };
  }

  let discountAmount = 0;

  if (coupon.discountType === "percentage") {
    discountAmount =
      (totalBeforeDiscount * coupon.discountValue) / 100;
  } else if (coupon.discountType === "flat") {
    discountAmount = coupon.discountValue;
  }

  if (discountAmount > totalBeforeDiscount) {
    discountAmount = totalBeforeDiscount;
  }

  const finalTotal =
    totalBeforeDiscount - discountAmount;

  return {
    discountAmount,
    finalTotal,
  };
};

const InvoiceDocument = ({
  data,
  qrDataURL = null,
  barcodeURL,
}) => {
  const {
    shippingAddress = {},
    products = [],
    payment = {},
    coupon = null,
    createdAt,
    invoiceId,
    totalBeforeDiscount,
  } = data;

  const isDelhi =
    (shippingAddress?.state?.name || "").toLowerCase() ===
    "delhi";

  const TAX_RATE = 0.18;

  const processedItems = products.map((item) => {
    const sellingPrice =
      item.size.price.sellingPrice;

    const taxAmount =
      (sellingPrice * TAX_RATE) / (1 + TAX_RATE);

    const basePricePerUnit =
      sellingPrice - taxAmount;

    const totalWithTax =
      sellingPrice * item.quantity;

    return {
      product: item.productId,
      size: item.size,
      basePricePerUnit,
      taxAmount: taxAmount * item.quantity,
      halfTax:
        (taxAmount * item.quantity) / 2,
      totalWithTax,
      quantity: item.quantity,
    };
  });

  const shippingFee =
    payment?.handlingFee || 0;

  const subtotal = processedItems.reduce(
    (sum, i) =>
      sum + i.basePricePerUnit * i.quantity,
    0
  );

  const totalTax = processedItems.reduce(
    (sum, i) => sum + i.taxAmount,
    0
  );

  const { discountAmount } =
    calculateDiscount(
      totalBeforeDiscount,
      coupon
    );

  const finalPayable =
    subtotal +
    totalTax -
    discountAmount +
    shippingFee;

  const formattedStateCode =
    shippingAddress?.state?.code
      ? shippingAddress.state.code
          .toString()
          .padStart(2, "0")
      : "00";

  const termsAndConditionsText = [
    "1. Any disputes arising out of this transaction shall be subject to the Delhi jurisdiction.",
    "2. The Items are meant for Personal Use only Not for Resale.",
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Header */}
        <View style={styles.headerRow}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginBottom: 6,
            }}
          >
            TAX INVOICE
          </Text>

          <Image
            src={logo}
            style={styles.logo}
          />

          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>
              MHJ Pharmaconcepts Private Limited
            </Text>

            <Text style={styles.companyText}>
              CIN: U51909DL2018PTC330169
            </Text>

            <Text style={styles.companyText}>
              DSM-030/031, DLF Corporate Tower, Shivaji Marg,
              New Delhi - 110015
            </Text>

            <Text style={styles.companyText}>
              GSTIN: 07AALCM6505E1ZJ
            </Text>

            <Text style={styles.companyText}>
              Email: support@nythng.in
            </Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoRow}>

          <View
            style={[
              styles.section,
              styles.infoBox,
            ]}
          >
            <Text style={styles.heading}>
              Bill To
            </Text>

            <Text>
              {shippingAddress.fullName}
            </Text>

            <Text>
              {shippingAddress.addressLine1}
              {shippingAddress.landmark
                ? `, ${shippingAddress.landmark}`
                : ""}
            </Text>

            <Text>
              {shippingAddress.city},{" "}
              {shippingAddress?.state?.name} -{" "}
              {shippingAddress.postalCode}
            </Text>

            <Text>
              Phone: {shippingAddress.phoneNumber}
            </Text>

            <Text>
              State Code: {formattedStateCode} (
              {shippingAddress?.state?.name})
            </Text>
          </View>

          <View
            style={[
              styles.section,
              styles.infoBox,
            ]}
          >
            <Image
              src={barcodeURL || ""}
              style={styles.barcode}
            />

            <Text>
              Invoice No: {String(invoiceId)}
            </Text>

            <Text>
              Invoice Date:{" "}
              {new Date(createdAt).toDateString()}
            </Text>

            <Text>
              Payment Mode: {payment.method}
            </Text>

            {payment.transactionId && (
              <Text>
                Transaction ID:{" "}
                {payment.transactionId}
              </Text>
            )}
          </View>
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>

          <Text
            style={[
              styles.largeCol,
              styles.textLeft,
              styles.marginLeft,
            ]}
          >
            Item
          </Text>

          <Text
            style={[
              styles.col,
              styles.textCenter,
            ]}
          >
            HSN Code
          </Text>

          <Text
            style={[
              styles.col,
              styles.textCenter,
            ]}
          >
            Rate
          </Text>

          <Text
            style={[
              styles.col,
              styles.textCenter,
            ]}
          >
            Qty
          </Text>

          {isDelhi ? (
            <>
              <Text
                style={[
                  styles.col,
                  styles.textCenter,
                ]}
              >
                CGST (9%)
              </Text>

              <Text
                style={[
                  styles.col,
                  styles.textCenter,
                ]}
              >
                SGST (9%)
              </Text>
            </>
          ) : (
            <Text
              style={[
                styles.col,
                styles.textCenter,
              ]}
            >
              IGST (18%)
            </Text>
          )}

          <Text
            style={[
              styles.col,
              styles.textRight,
            ]}
          >
            Total
          </Text>
        </View>

        {/* Table Rows */}
        {processedItems.map((item, i) => (
          <View
            style={styles.tableRow}
            key={i}
          >
            <Text style={styles.largeCol}>
              {item.product.heading} -{" "}
              {item.size.size}
            </Text>

            <Text
              style={[
                styles.col,
                styles.textCenter,
              ]}
            >
              {item.size.hsn || 2936}
            </Text>

            <Text
              style={[
                styles.col,
                styles.textCenter,
              ]}
            >
              ₹
              {item.basePricePerUnit.toFixed(2)}
            </Text>

            <Text
              style={[
                styles.col,
                styles.textCenter,
              ]}
            >
              {item.quantity}
            </Text>

            {isDelhi ? (
              <>
                <Text
                  style={[
                    styles.col,
                    styles.textCenter,
                  ]}
                >
                  ₹{item.halfTax.toFixed(2)}
                </Text>

                <Text
                  style={[
                    styles.col,
                    styles.textCenter,
                  ]}
                >
                  ₹{item.halfTax.toFixed(2)}
                </Text>
              </>
            ) : (
              <Text
                style={[
                  styles.col,
                  styles.textCenter,
                ]}
              >
                ₹{item.taxAmount.toFixed(2)}
              </Text>
            )}

            <Text
              style={[
                styles.col,
                styles.textRight,
              ]}
            >
              ₹
              {item.totalWithTax.toFixed(2)}
            </Text>
          </View>
        ))}

        {/* Summary and QR */}
        <View style={styles.summaryAndQr}>

          {qrDataURL && (
            <View style={styles.section}>
              <Image
                src={qrDataURL}
                style={styles.qr}
              />
            </View>
          )}

          <View style={styles.summary}>
            <Text>
              Subtotal: ₹{subtotal.toFixed(2)}
            </Text>

            {isDelhi ? (
              <>
                <Text>
                  CGST (9%): ₹
                  {(totalTax / 2).toFixed(2)}
                </Text>

                <Text>
                  SGST (9%): ₹
                  {(totalTax / 2).toFixed(2)}
                </Text>
              </>
            ) : (
              <Text>
                IGST (18%): ₹
                {totalTax.toFixed(2)}
              </Text>
            )}

            <Text>
              Shipping Charges: ₹{shippingFee}
            </Text>

            {discountAmount > 0 && (
              <Text>
                Discount: -₹
                {discountAmount.toFixed(2)}
              </Text>
            )}

            <Text
              style={{
                fontWeight: "bold",
                marginTop: 6,
              }}
            >
              Total Payable: ₹
              {finalPayable.toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Signature */}
        <View style={styles.signature}>
          <Image
            src={signature}
            style={{
              width: 100,
              height: 50,
            }}
          />

          <Text
            style={{
              textAlign: "right",
              marginTop: 5,
            }}
          >
            Authorized Signatory
          </Text>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsAndConditions}>
          {termsAndConditionsText.map(
            (line, i) => (
              <Text key={i}>
                {line}
              </Text>
            )
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Thank you for shopping with us! For any
            queries, email support@nythng.in
          </Text>
        </View>

      </Page>
    </Document>
  );
};

export default InvoiceDocument;