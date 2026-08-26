import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ReduxProvider } from "@/redux/provider";
import { merriweather, aleo } from "./fonts";
import CartSidebar from "@/components/cart/CartSidebar";
import GoogleTranslate from "@/components/common/GoogleTranslate";

export const metadata = {
  title: "NYTHNG",
  description: "AI Powered Skincare",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${merriweather.variable} ${aleo.variable}`}
      suppressHydrationWarning
    >
      <body>  
      <div
          id="google_translate_element"
          className="notranslate"
          style={{ display: "none" }}
          suppressHydrationWarning
        />

        <GoogleTranslate />
        <ReduxProvider>

          <Navbar />

          <main>{children}</main>
          <CartSidebar/>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}

