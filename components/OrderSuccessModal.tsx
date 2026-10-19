"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  X,
  MessageCircle,
  ArrowRight,
  Truck,
  Store,
  Clock,
  PhoneCall,
} from "lucide-react";
import { OrderData } from "@/lib/types";
import { formatPrice, deliveryZones, pickupSpots, BOBA_CONFIG } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { getWhatsAppCheckoutUrl } from "@/lib/whatsapp";

interface OrderSuccessModalProps {
  order?: OrderData | null;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function OrderSuccessModal({
  order: propOrder,
  isOpen: propIsOpen,
  onClose: propOnClose,
}: OrderSuccessModalProps) {
  const {
    completedOrder,
    isSuccessOpen,
    closeSuccess,
  } = useCart();

  const order = propOrder || completedOrder;
  const isOpen = propIsOpen !== undefined ? propIsOpen : isSuccessOpen;

  const handleClose = useCallback(() => {
    if (propOnClose) {
      propOnClose();
    } else {
      closeSuccess();
    }
  }, [propOnClose, closeSuccess]);

  // Fermeture par la touche Échap et blocage du défilement
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleClose]);

  if (!order && !isOpen) return null;

  const orderRef = order?.orderId
    ? order.orderId.startsWith("BOBA-")
      ? `#${order.orderId}`
      : `#BOBA-${order.orderId}`
    : "#BOBA-EXPRESS";

  const zone = order?.deliveryZoneId
    ? deliveryZones.find((z) => z.id === order.deliveryZoneId)
    : null;

  const spot = order?.pickupSpotId
    ? pickupSpots.find((s) => s.id === order.pickupSpotId)
    : null;

  const handleReopenWhatsApp = () => {
    if (!order) return;
    const url = getWhatsAppCheckoutUrl(order, BOBA_CONFIG.whatsappNumber);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-4 md:p-6"
        >
          {/* Overlay avec fondu */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleClose}
            className="fixed inset-0 bg-foreground/60 backdrop-blur-sm"
          />

          {/* Modal brutaliste */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            className="relative z-10 w-full max-w-lg bg-background border-4 border-foreground brutalist-shadow rounded-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* EN-TÊTE FESTIF */}
            <div className="p-5 bg-primary border-b-3 border-foreground text-primary-content flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎉</span>
                <span className="text-xs font-black uppercase tracking-[0.25em] text-foreground">
                  COMMANDE ENREGISTRÉE
                </span>
              </div>
              <button
                type="button"
                onClick={handleClose}
                aria-label="Fermer la confirmation"
                className="p-1.5 bg-background border-2 border-foreground rounded-lg brutalist-shadow-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* CORPS DE L'ÉCRAN */}
            <div className="p-6 overflow-y-auto space-y-6 text-foreground text-center">
              {/* Icône animée */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 350, damping: 18, delay: 0.1 }}
                className="w-20 h-20 mx-auto bg-primary text-primary-content border-3 border-foreground rounded-2xl flex items-center justify-center brutalist-shadow"
              >
                <CheckCircle2 size={46} strokeWidth={2.5} className="text-foreground" />
              </motion.div>

              {/* Titre & Référence */}
              <div className="space-y-2">
                <h2
                  id="success-modal-title"
                  className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-foreground leading-none font-black"
                >
                  COMMANDE TRANSMISE !
                </h2>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary text-secondary-content border-2 border-foreground rounded-full font-display text-xl sm:text-2xl tracking-wider brutalist-shadow-sm font-black">
                  <span>RÉFÉRENCE :</span>
                  <span>{orderRef}</span>
                </div>
              </div>

              {/* Message rassurant */}
              <div className="p-4 bg-muted/40 border-2 border-foreground rounded-xl text-left space-y-2 text-xs sm:text-sm font-medium leading-relaxed brutalist-shadow-sm">
                <div className="font-bold flex items-center gap-2 text-foreground">
                  <Clock size={16} className="text-secondary shrink-0" />
                  <span>Votre message a été transmis à notre équipe sur WhatsApp.</span>
                </div>
                <p className="text-foreground/80">
                  Nos baristas préparent vos boissons dès validation. Gardez votre WhatsApp ouvert pour le suivi en temps réel !
                </p>
              </div>

              {/* Fiche récapitulative compacte */}
              {order && (
                <div className="p-4 bg-card border-2 border-foreground rounded-xl text-left text-xs space-y-2.5">
                  <div className="flex items-center justify-between pb-2 border-b border-foreground/15">
                    <span className="font-bold text-foreground/60 uppercase">Client</span>
                    <span className="font-black text-foreground">
                      {order.customerName} ({order.customerPhone})
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-foreground/15">
                    <span className="font-bold text-foreground/60 uppercase">Mode</span>
                    <span className="font-black text-foreground flex items-center gap-1">
                      {order.deliveryMethod === "delivery" ? (
                        <>
                          <Truck size={13} className="text-secondary" />
                          <span>Livraison ({zone?.name || "Niamey"})</span>
                        </>
                      ) : (
                        <>
                          <Store size={13} className="text-secondary" />
                          <span>Retrait ({spot?.name || "Spot Niamey"})</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-display text-lg uppercase tracking-wider text-foreground">
                      TOTAL À RÉGLER
                    </span>
                    <span className="font-black text-xl tabular-nums text-foreground">
                      {formatPrice(order.total)}
                    </span>
                  </div>

                  <div className="text-[11px] font-bold text-foreground/70 bg-muted/50 p-2 rounded-lg text-center">
                    💵 Espèces / Airtel Money / Moov Money acceptés à la réception.
                  </div>
                </div>
              )}

              {/* Assistance & Numéro Direct */}
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-foreground/75">
                <PhoneCall size={14} className="text-secondary" />
                <span>Service client Niamey :</span>
                <span className="font-black text-foreground">{BOBA_CONFIG.whatsappDisplay}</span>
              </div>
            </div>

            {/* ACTIONS / BOUTONS */}
            <div className="p-5 border-t-3 border-foreground bg-background shrink-0 space-y-3">
              {/* Bouton de secours : Réouvrir WhatsApp */}
              <button
                type="button"
                onClick={handleReopenWhatsApp}
                className="w-full py-3.5 px-5 bg-background border-3 border-foreground brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all font-display text-xl uppercase tracking-wider flex items-center justify-center gap-2.5 font-black text-foreground cursor-pointer"
              >
                <MessageCircle size={20} className="text-green-600" />
                <span>RÉOUVRIR WHATSAPP</span>
              </button>

              {/* Bouton de fermeture / Continuer */}
              <button
                type="button"
                onClick={handleClose}
                className="w-full py-4 px-6 bg-primary text-primary-content border-3 border-foreground brutalist-shadow hover-brutalist transition-all font-display text-2xl uppercase tracking-wider flex items-center justify-center gap-2.5 font-black cursor-pointer active:translate-y-0.5"
              >
                <span>RETOURNER SUR LE SITE</span>
                <ArrowRight size={22} />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
