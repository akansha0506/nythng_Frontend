"use client";

import bwipjs from "bwip-js";

export const generateBarcodeDataURL = async (text = "") => {
  try {
    if (!text || typeof text !== "string" || text.trim() === "") {
      throw new Error("Barcode text is missing or invalid.");
    }

    const canvas = document.createElement("canvas");

    bwipjs.toCanvas(canvas, {
      bcid: "code128",
      text: text.trim(),
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: "center",
    });

    return canvas.toDataURL("image/png");
  } catch (err) {
    console.error("Error generating barcode:", err);
    return null;
  }
};