"use client";

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";
import { Product, Customization, CartItem, OrderData } from "./types";

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, customization: Customization, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalCount: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  isSuccessOpen: boolean;
  setIsSuccessOpen: (open: boolean) => void;
  completedOrder: OrderData | null;
  setCompletedOrder: (order: OrderData | null) => void;
  openSuccess: (order: OrderData) => void;
  closeSuccess: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "boba_express_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderData | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Charger le panier depuis localStorage après le montage initial (évite le mismatch SSR / client)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la lecture du panier depuis localStorage:", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sauvegarder dans localStorage dès modification après l'hydratation
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du panier dans localStorage:", error);
    }
  }, [items, isHydrated]);

  const addItem = useCallback((product: Product, customization: Customization, quantity = 1) => {
    if (quantity <= 0) return;

    // Clé d'id unique pour chaque variante
    const toppingIds = (customization.toppings || []).map((t) => t.id).sort().join(",");
    const itemId = `${product.id}-${customization.size.id}-${customization.sugar}-${customization.ice}-${toppingIds}`;

    // Calcul du prix unitaire avec extras (taille + toppings)
    const toppingTotal = (customization.toppings || []).reduce((acc, t) => acc + (t.price || 0), 0);
    const unitPrice = product.price + (customization.size.extraPrice || 0) + toppingTotal;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        return prevItems.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const newItem: CartItem = {
        id: itemId,
        productId: product.id,
        name: product.name,
        basePrice: product.price,
        size: customization.size,
        sugar: customization.sugar,
        ice: customization.ice,
        toppings: customization.toppings || [],
        unitPrice,
        quantity,
        image: product.image,
      };

      return [...prevItems, newItem];
    });
  }, []);

  const removeItem = useCallback((itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, newQuantity: number) => {
    setItems((prevItems) => {
      if (newQuantity <= 0) {
        return prevItems.filter((item) => item.id !== itemId);
      }
      return prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const openCheckout = useCallback(() => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  }, []);
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  const openSuccess = useCallback((order: OrderData) => {
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setCompletedOrder(order);
    setIsSuccessOpen(true);
  }, []);

  const closeSuccess = useCallback(() => {
    setIsSuccessOpen(false);
    setCompletedOrder(null);
  }, []);

  const totalCount = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [items]);

  const value = useMemo<CartContextType>(() => ({
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalCount,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    openCart,
    closeCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    openCheckout,
    closeCheckout,
    isSuccessOpen,
    setIsSuccessOpen,
    completedOrder,
    setCompletedOrder,
    openSuccess,
    closeSuccess,
  }), [
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalCount,
    subtotal,
    isCartOpen,
    openCart,
    closeCart,
    isCheckoutOpen,
    openCheckout,
    closeCheckout,
    isSuccessOpen,
    completedOrder,
    openSuccess,
    closeSuccess,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
