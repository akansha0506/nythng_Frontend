import { Merriweather, Aleo } from "next/font/google";

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--font-heading",
  display: "swap",
});

export const aleo = Aleo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});