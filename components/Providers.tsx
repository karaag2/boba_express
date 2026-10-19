"use client";

import React from "react";
import { ToastProvider } from "@/lib/toast-context";
import { CartProvider } from "@/lib/cart-context";
import CartDrawer from "./CartDrawer";
import CheckoutModal from "./CheckoutModal";
import OrderSuccessModal from "./OrderSuccessModal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <CheckoutModal />
        <OrderSuccessModal />
      </CartProvider>
    </ToastProvider>
  );
}

export default Providers;
