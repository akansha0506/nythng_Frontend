import "./globals.css";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ReduxProvider } from "@/redux/provider";
import { merriweather, aleo } from "./fonts";
import CartSidebar from "@/components/cart/CartSidebar";
import GoogleTranslate from "@/components/common/GoogleTranslate";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
        </ReduxProvider>
      </body>
    </html>
  );
}

