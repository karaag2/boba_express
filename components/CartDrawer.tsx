"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/data";

interface CartDrawerProps {
  onCheckout?: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalCount,
    subtotal,
    isCartOpen,
    closeCart,
    openCheckout,
  } = useCart();

  // Fermeture par la touche Échap et blocage du scroll
  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeCart();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  const handleDiscoverMenu = () => {
    closeCart();
    const menuEl = document.getElementById("menu");
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#menu";
    }
  };

  const handleCheckoutClick = () => {
    if (onCheckout) {
      onCheckout();
    } else {
      openCheckout();
      window.dispatchEvent(new CustomEvent("boba:open-checkout"));
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label="Mon Panier Boba Express"
          className="fixed inset-0 z-50 overflow-hidden"
        >
          {/* Overlay avec fondu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm"
          />

          {/* Panneau latéral coulissant brutaliste */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 h-full w-full max-w-md sm:max-w-lg bg-background border-l-4 border-foreground brutalist-shadow z-50 flex flex-col shadow-2xl"
          >
            {/* EN-TÊTE */}
            <div className="p-5 border-b-3 border-foreground bg-muted/30 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-xl border-2 border-foreground flex items-center justify-center brutalist-shadow-sm font-display text-xl">
                  🥤
                </div>
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-foreground leading-none">
                    MON PANIER
                  </h2>
                  <span className="text-xs font-black text-secondary-content tracking-wider uppercase">
                    {totalCount} {totalCount > 1 ? "boissons" : "boisson"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {items.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCart}
                    className="text-xs font-black uppercase text-foreground/60 hover:text-red-600 transition-colors px-2 py-1 underline cursor-pointer"
                    title="Vider tous les articles"
                  >
                    Vider
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeCart}
                  aria-label="Fermer le panier"
                  className="p-2.5 bg-background border-2 border-foreground rounded-xl brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <X size={20} className="text-foreground" />
                </button>
              </div>
            </div>

            {/* CONTENU DU PANIER */}
            {items.length === 0 ? (
              /* ÉCRAN VIDE */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-6">
                <motion.div
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 15 }}
                  className="w-28 h-28 bg-primary/20 border-4 border-foreground rounded-3xl flex items-center justify-center brutalist-shadow"
                >
                  <ShoppingBag size={56} className="text-foreground" />
                </motion.div>

                <div className="space-y-2 max-w-xs">
                  <h3 className="font-display text-3xl uppercase tracking-tight text-foreground">
                    Ton panier est vide !
                  </h3>
                  <p className="text-sm font-medium text-foreground/75 leading-relaxed">
                    Envie d&apos;un Matcha Supreme bien frais ou d&apos;un milkshake crémeux ? Fais-toi plaisir dès maintenant !
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDiscoverMenu}
                  className="px-8 py-4 bg-primary text-primary-content border-3 border-foreground font-display text-xl uppercase brutalist-shadow hover-brutalist transition-all flex items-center gap-3 font-black cursor-pointer"
                >
                  <span>DÉCOUVRIR LE MENU</span>
                  <ArrowRight size={20} />
                </button>
              </div>
            ) : (
              /* LISTE DES ARTICLES */
              <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                      className="bg-card border-2 border-foreground p-3.5 rounded-xl brutalist-shadow-sm flex gap-3 relative group"
                    >
                      {/* Image miniature */}
                      <div className="w-20 h-20 relative border-2 border-foreground rounded-lg overflow-hidden shrink-0 bg-muted">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                        <div className="absolute top-1 left-1 bg-foreground text-background text-[9px] font-black px-1.5 py-0.5 uppercase rounded">
                          {item.size.id}
                        </div>
                      </div>

                      {/* Détails du produit */}
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="pr-6">
                          <div className="flex items-center gap-2">
                            <h4 className="font-display text-lg uppercase tracking-tight text-foreground truncate">
                              {item.name}
                            </h4>
                            <span className="text-[10px] font-black bg-secondary text-secondary-content px-1.5 py-0.5 rounded uppercase">
                              {item.size.volume}
                            </span>
                          </div>

                          {/* Options personnalisées */}
                          <div className="text-[11px] font-semibold text-foreground/75 mt-1 space-y-0.5">
                            <div>
                              Sucre: <span className="font-bold text-foreground">{item.sugar}</span> • Glace: <span className="font-bold text-foreground">{item.ice}</span>
                            </div>
                            {item.toppings && item.toppings.length > 0 ? (
                              <div className="text-secondary-content font-bold flex items-center gap-1 flex-wrap">
                                <Sparkles size={11} className="shrink-0" />
                                <span>
                                  Toppings: {item.toppings.map((t) => `${t.name} (+${t.price}F)`).join(", ")}
                                </span>
                              </div>
                            ) : (
                              <div className="text-foreground/50 italic">
                                Toppings: Sans extra
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Barre de quantité et prix */}
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-foreground/10">
                          {/* Contrôle de quantité */}
                          <div className="flex items-center gap-1.5 bg-background border border-foreground rounded-lg p-0.5">
                            <button
                              type="button"
                              aria-label={item.quantity === 1 ? `Supprimer ${item.name}` : "Diminuer la quantité"}
                              onClick={() => {
                                if (item.quantity === 1) {
                                  removeItem(item.id);
                                } else {
                                  updateQuantity(item.id, item.quantity - 1);
                                }
                              }}
                              className="w-7 h-7 flex items-center justify-center hover:bg-muted rounded text-foreground cursor-pointer"
                            >
                              {item.quantity === 1 ? (
                                <Trash2 size={13} className="text-red-500" />
                              ) : (
                                <Minus size={13} />
                              )}
                            </button>
                            <span className="font-display text-sm font-black w-6 text-center tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Augmenter la quantité"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center hover:bg-muted rounded text-foreground cursor-pointer"
                            >
                              <Plus size={13} />
                            </button>
                          </div>

                          {/* Prix */}
                          <div className="text-right">
                            <div className="font-black text-sm sm:text-base tabular-nums text-foreground">
                              {formatPrice(item.unitPrice * item.quantity)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-[10px] text-foreground/60 tabular-nums">
                                {formatPrice(item.unitPrice)} / unité
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Bouton de suppression rapide */}
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Supprimer ${item.name}`}
                        className="absolute top-2.5 right-2.5 p-1 text-foreground/40 hover:text-red-500 transition-colors cursor-pointer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* PIED DU TIROIR (RÉCAPITULATIF & ACTION) */}
            {items.length > 0 && (
              <div className="p-4 sm:p-5 border-t-3 border-foreground bg-background space-y-3.5 shrink-0 shadow-lg">
                {/* Ligne sous-total */}
                <div className="flex items-center justify-between">
                  <span className="font-display text-xl uppercase tracking-wider text-foreground">
                    SOUS-TOTAL
                  </span>
                  <span className="font-black text-2xl sm:text-3xl tabular-nums text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {/* Badge de réassurance locale Niamey */}
                <div className="p-2.5 bg-primary/20 border-2 border-foreground rounded-xl flex items-start gap-2 text-xs font-bold text-foreground">
                  <CheckCircle2 size={16} className="text-primary-content shrink-0 mt-0.5" />
                  <div className="leading-tight">
                    <span className="block">⚡️ Confirmation instantanée sur WhatsApp</span>
                    <span className="block opacity-80 mt-0.5">🛵 Livraison express ou retrait à nos spots Niamey</span>
                  </div>
                </div>

                {/* Grand bouton brutaliste d'action */}
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full py-4 px-6 bg-primary text-primary-content border-3 border-foreground brutalist-shadow hover-brutalist transition-all font-display text-2xl uppercase tracking-wider flex items-center justify-center gap-3 font-black cursor-pointer active:translate-y-0.5"
                >
                  <span>PASSER LA COMMANDE</span>
                  <ArrowRight size={24} />
                </button>

                {/* Bouton secondaire vider le panier */}
                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full py-2 text-xs font-black uppercase tracking-wider text-foreground/50 hover:text-red-500 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Trash2 size={13} />
                  <span>Vider le panier</span>
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
