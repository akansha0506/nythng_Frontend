import QRCode from "qrcode";

export const generateQRCodeDataURL = async (value) => {
  try {
    if (!value) {
      throw new Error("QR code value is missing.");
    }

    const dataUrl = await QRCode.toDataURL(String(value), {
      errorCorrectionLevel: "H",
      margin: 2,
      width: 200,
    });

    return dataUrl;
  } catch (err) {
    console.error("QR Code generation failed:", err);
    return null;
  }
};