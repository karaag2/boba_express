"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Truck,
  Store,
  User,
  MapPin,
  AlertCircle,
  MessageCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { OrderData } from "@/lib/types";
import { deliveryZones, pickupSpots, formatPrice, BOBA_CONFIG } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { getWhatsAppCheckoutUrl, generateOrderId } from "@/lib/whatsapp";

interface CheckoutModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function CheckoutModal({ isOpen: propIsOpen, onClose: propOnClose }: CheckoutModalProps) {
  const {
    items,
    subtotal,
    clearCart,
    isCheckoutOpen,
    closeCheckout,
    openSuccess,
  } = useCart();

  // Permet d'être contrôlé soit par props soit par le CartContext
  const isOpen = propIsOpen !== undefined ? propIsOpen : isCheckoutOpen;
  const handleClose = useCallback(() => {
    if (propOnClose) {
      propOnClose();
    } else {
      closeCheckout();
    }
  }, [propOnClose, closeCheckout]);

  // États du formulaire
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState<"delivery" | "pickup">("delivery");
  const [selectedZoneId, setSelectedZoneId] = useState<string>(deliveryZones[0]?.id || "plateau");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [selectedSpotId, setSelectedSpotId] = useState<string>(pickupSpots[0]?.id || "plateau");
  const [landmarkNotes, setLandmarkNotes] = useState("");

  // Gestion des erreurs de validation
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Blocage du scroll et fermeture par Échap
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

  // Réinitialiser les erreurs lorsque l'utilisateur modifie les champs
  const handleNameChange = (val: string) => {
    setCustomerName(val);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handlePhoneChange = (val: string) => {
    setCustomerPhone(val);
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleAddressChange = (val: string) => {
    setDeliveryAddress(val);
    if (errors.address) {
      setErrors((prev) => ({ ...prev, address: "" }));
    }
  };

  // Calcul dynamique des frais de livraison
  const selectedZone = useMemo(() => {
    return deliveryZones.find((z) => z.id === selectedZoneId) || deliveryZones[0];
  }, [selectedZoneId]);

  const selectedSpot = useMemo(() => {
    return pickupSpots.find((s) => s.id === selectedSpotId) || pickupSpots[0];
  }, [selectedSpotId]);

  const deliveryFee = useMemo(() => {
    return deliveryMethod === "delivery" ? (selectedZone?.fee || 0) : 0;
  }, [deliveryMethod, selectedZone]);

  const totalAmount = useMemo(() => {
    return subtotal + deliveryFee;
  }, [subtotal, deliveryFee]);

  const totalDrinksCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  // Validation du formulaire
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!customerName.trim()) {
      newErrors.name = "Veuillez renseigner votre nom complet";
    }

    const cleanPhone = customerPhone.replace(/[^0-9]/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Veuillez indiquer un numéro WhatsApp valide";
    } else if (cleanPhone.length < 8) {
      newErrors.phone = "Le numéro doit comporter au moins 8 chiffres (ex: 90 12 34 56)";
    }

    if (deliveryMethod === "delivery") {
      if (!deliveryAddress.trim()) {
        newErrors.address = "Indiquez votre adresse exacte ou un repère connu à Niamey";
      }
    }

    if (items.length === 0) {
      newErrors.cart = "Votre panier est vide. Veuillez ajouter une boisson avant de commander.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Soumission et redirection WhatsApp
  const handleConfirmOrder = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Formatage propre du téléphone avec préfixe Niger +227
    let formattedPhone = customerPhone.trim();
    const digitsOnly = formattedPhone.replace(/[^0-9]/g, "");
    if (!formattedPhone.startsWith("+")) {
      if (digitsOnly.startsWith("227")) {
        formattedPhone = `+${digitsOnly}`;
      } else {
        formattedPhone = `+227 ${formattedPhone}`;
      }
    }

    const orderId = generateOrderId();
    const orderData: OrderData = {
      orderId,
      customerName: customerName.trim(),
      customerPhone: formattedPhone,
      deliveryMethod,
      pickupSpotId: deliveryMethod === "pickup" ? selectedSpotId : undefined,
      deliveryZoneId: deliveryMethod === "delivery" ? selectedZoneId : undefined,
      deliveryAddress: deliveryMethod === "delivery" ? deliveryAddress.trim() : undefined,
      landmarkNotes: landmarkNotes.trim() || undefined,
      items: [...items],
      subtotal,
      deliveryFee,
      discount: 0,
      total: totalAmount,
      createdAt: new Date().toISOString(),
    };

    // Génération de l'URL WhatsApp
    const whatsappUrl = getWhatsAppCheckoutUrl(orderData, BOBA_CONFIG.whatsappNumber);

    // Ouvrir WhatsApp dans un nouvel onglet
    const openedWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Si le bloqueur de popup empêche l'ouverture, on redirige la fenêtre actuelle
    if (!openedWindow || openedWindow.closed || typeof openedWindow.closed === "undefined") {
      // Le modal de succès proposera aussi un bouton pour réouvrir
    }

    // Vider le panier
    clearCart();

    // Fermer le checkout et afficher l'écran de succès
    handleClose();
    openSuccess(orderData);
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-modal-title"
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

          {/* Fenêtre Modale Brutaliste */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="relative z-10 w-full max-w-2xl bg-background border-4 border-foreground brutalist-shadow rounded-2xl flex flex-col max-h-[92vh] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* EN-TÊTE BRUTALISTE */}
            <div className="border-b-3 border-foreground p-4 sm:p-5 flex items-center justify-between bg-primary shrink-0 text-primary-content">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-background text-foreground rounded-xl border-2 border-foreground flex items-center justify-center brutalist-shadow-sm font-display text-2xl font-black">
                  🧋
                </div>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-[0.25em] text-foreground/80 leading-none mb-1">
                    TUNNEL DE COMMANDE • NIAMEY
                  </div>
                  <h2
                    id="checkout-modal-title"
                    className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-foreground leading-none font-black"
                  >
                    FINALISER MA COMMANDE
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Fermer le tunnel de commande"
                className="p-2 bg-background border-2 border-foreground rounded-xl brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer text-foreground focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* CORPS DU FORMULAIRE */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1 bg-background text-foreground">
              {/* Alerte générale si panier vide */}
              {errors.cart && (
                <div className="p-3 bg-red-100 border-2 border-red-500 rounded-xl flex items-center gap-2 text-red-700 text-xs font-bold">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{errors.cart}</span>
                </div>
              )}

              {/* SECTION 1 : COORDONNÉES CLIENT */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-foreground/15 pb-2">
                  <h3 className="font-display text-lg sm:text-xl uppercase tracking-wider flex items-center gap-2">
                    <User size={18} className="text-secondary" />
                    <span>1. VOS COORDONNÉES</span>
                  </h3>
                  <span className="text-[10px] font-black uppercase bg-secondary/15 text-secondary px-2 py-0.5 rounded-full">
                    REQUIS
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Nom complet */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="customer-name"
                      className="block text-xs font-black uppercase tracking-wider text-foreground"
                    >
                      Nom complet <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="customer-name"
                      type="text"
                      value={customerName}
                      onChange={(e) => handleNameChange(e.target.value)}
                      placeholder="ex: Abdoul-Karim Moussa"
                      className={`w-full px-3.5 py-3 bg-background border-2 ${
                        errors.name ? "border-red-500 bg-red-50/30" : "border-foreground"
                      } rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary brutalist-shadow-sm transition-all`}
                    />
                    {errors.name && (
                      <p className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Numéro de téléphone WhatsApp */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="customer-phone"
                      className="block text-xs font-black uppercase tracking-wider text-foreground"
                    >
                      Téléphone WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-muted border-2 border-r-0 border-foreground rounded-l-xl text-xs font-black text-foreground">
                        🇳🇪 +227
                      </span>
                      <input
                        id="customer-phone"
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        placeholder="90 12 34 56"
                        className={`w-full px-3.5 py-3 bg-background border-2 ${
                          errors.phone ? "border-red-500 bg-red-50/30" : "border-foreground"
                        } rounded-r-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary brutalist-shadow-sm transition-all`}
                      />
                    </div>
                    {errors.phone ? (
                      <p className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1">
                        <AlertCircle size={12} />
                        <span>{errors.phone}</span>
                      </p>
                    ) : (
                      <p className="text-[10px] text-foreground/60 font-semibold">
                        Numéro utilisé pour la préparation et la confirmation
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 2 : MODE DE RÉCEPTION (LIVRAISON OU RETRAIT) */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b-2 border-foreground/15 pb-2">
                  <h3 className="font-display text-lg sm:text-xl uppercase tracking-wider flex items-center gap-2">
                    <MapPin size={18} className="text-secondary" />
                    <span>2. MODE DE RÉCEPTION</span>
                  </h3>
                  <span className="text-[10px] font-black uppercase bg-primary text-primary-content px-2 py-0.5 rounded-full">
                    NIAMEY EXPRESS
                  </span>
                </div>

                {/* 2 ONGLETS BRUTALISTES */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("delivery")}
                    className={`p-3.5 sm:p-4 rounded-xl border-3 border-foreground font-display text-base sm:text-lg uppercase tracking-wide flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      deliveryMethod === "delivery"
                        ? "bg-primary text-primary-content brutalist-shadow scale-[1.01] font-black"
                        : "bg-background text-foreground/70 hover:bg-muted/50 brutalist-shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Truck size={20} />
                      <span>🛵 LIVRAISON</span>
                    </div>
                    <span className="text-[10px] font-sans font-bold tracking-normal opacity-90">
                      À domicile ou au bureau
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryMethod("pickup")}
                    className={`p-3.5 sm:p-4 rounded-xl border-3 border-foreground font-display text-base sm:text-lg uppercase tracking-wide flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      deliveryMethod === "pickup"
                        ? "bg-secondary text-secondary-content brutalist-shadow scale-[1.01] font-black"
                        : "bg-background text-foreground/70 hover:bg-muted/50 brutalist-shadow-sm"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Store size={20} />
                      <span>🏬 RETRAIT SPOT</span>
                    </div>
                    <span className="text-[10px] font-sans font-bold tracking-normal opacity-90">
                      Click & Collect (0 FCFA)
                    </span>
                  </button>
                </div>

                {/* CONTENU CONDITIONNEL : LIVRAISON */}
                {deliveryMethod === "delivery" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-muted/40 border-2 border-foreground rounded-xl space-y-4 brutalist-shadow-sm"
                  >
                    {/* Quartier de livraison */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="delivery-zone"
                          className="block text-xs font-black uppercase tracking-wider text-foreground"
                        >
                          Quartier de Niamey <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] font-bold text-foreground/70 flex items-center gap-1">
                          <Clock size={11} />
                          Délai estimé : {selectedZone.estimatedTime}
                        </span>
                      </div>

                      <select
                        id="delivery-zone"
                        value={selectedZoneId}
                        onChange={(e) => setSelectedZoneId(e.target.value)}
                        className="w-full px-3.5 py-3 bg-background border-2 border-foreground rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary brutalist-shadow-sm cursor-pointer"
                      >
                        {deliveryZones.map((zone) => (
                          <option key={zone.id} value={zone.id}>
                            {zone.name} • {formatPrice(zone.fee)} (Délai : {zone.estimatedTime})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Adresse précise & repère */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="delivery-address"
                        className="block text-xs font-black uppercase tracking-wider text-foreground"
                      >
                        Adresse exacte / Repère connu <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="delivery-address"
                        type="text"
                        value={deliveryAddress}
                        onChange={(e) => handleAddressChange(e.target.value)}
                        placeholder="ex: Face pharmacie Plateau, à côté de la station, villa jaune..."
                        className={`w-full px-3.5 py-3 bg-background border-2 ${
                          errors.address ? "border-red-500 bg-red-50/30" : "border-foreground"
                        } rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary brutalist-shadow-sm transition-all`}
                      />
                      {errors.address ? (
                        <p className="text-[11px] font-bold text-red-500 flex items-center gap-1 mt-1">
                          <AlertCircle size={12} />
                          <span>{errors.address}</span>
                        </p>
                      ) : (
                        <p className="text-[10px] text-foreground/60 font-semibold">
                          💡 Un repère visuel clair à Niamey permet à notre coursier de livrer sans vous déranger au téléphone.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* CONTENU CONDITIONNEL : RETRAIT */}
                {deliveryMethod === "pickup" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-muted/40 border-2 border-foreground rounded-xl space-y-4 brutalist-shadow-sm"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="pickup-spot"
                          className="block text-xs font-black uppercase tracking-wider text-foreground"
                        >
                          Choisir le Spot Boba Express <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] font-black uppercase bg-primary text-primary-content px-2 py-0.5 rounded-full">
                          GRATUIT (0 FCFA)
                        </span>
                      </div>

                      <select
                        id="pickup-spot"
                        value={selectedSpotId}
                        onChange={(e) => setSelectedSpotId(e.target.value)}
                        className="w-full px-3.5 py-3 bg-background border-2 border-foreground rounded-xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-primary brutalist-shadow-sm cursor-pointer"
                      >
                        {pickupSpots.map((spot) => (
                          <option key={spot.id} value={spot.id}>
                            {spot.name} ({spot.address})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Fiche informative du spot sélectionné */}
                    <div className="p-3 bg-background border-2 border-foreground/30 rounded-lg text-xs space-y-1.5">
                      <div className="font-black uppercase text-foreground flex items-center gap-1.5">
                        <Store size={14} className="text-secondary" />
                        <span>{selectedSpot.name}</span>
                      </div>
                      <div className="text-foreground/80 font-medium">
                        📍 {selectedSpot.address} — <span className="italic">{selectedSpot.landmark}</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-foreground/70 pt-1">
                        <span>🕒 Ouvert : {selectedSpot.openHours}</span>
                        <span>📞 {selectedSpot.phone}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* SECTION 3 : INSTRUCTIONS / NOTES POUR LE BAR */}
              <div className="space-y-2">
                <label
                  htmlFor="landmark-notes"
                  className="block text-xs font-black uppercase tracking-wider text-foreground flex items-center justify-between"
                >
                  <span>3. Instructions pour le bar (Optionnel)</span>
                  <span className="text-[10px] font-bold text-foreground/50 lowercase">facultatif</span>
                </label>
                <input
                  id="landmark-notes"
                  type="text"
                  value={landmarkNotes}
                  onChange={(e) => setLandmarkNotes(e.target.value)}
                  placeholder="ex: Paille large, boisson bien fraîche, appel avant d'arriver..."
                  className="w-full px-3.5 py-2.5 bg-background border-2 border-foreground rounded-xl font-medium text-sm focus:outline-none focus:ring-2 focus:ring-primary brutalist-shadow-sm"
                />
              </div>

              {/* RÉCAPITULATIF FINANCIER DYNAMIQUE */}
              <div className="p-4 bg-muted/30 border-3 border-foreground rounded-xl space-y-3 brutalist-shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground/80">
                  <span>Panier ({totalDrinksCount} {totalDrinksCount > 1 ? "boissons" : "boisson"})</span>
                  <span className="tabular-nums font-black">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-foreground/80">
                  <span className="flex items-center gap-1.5">
                    {deliveryMethod === "delivery" ? (
                      <>
                        <Truck size={13} className="text-secondary" />
                        <span>Frais de livraison ({selectedZone.name})</span>
                      </>
                    ) : (
                      <>
                        <Store size={13} className="text-secondary" />
                        <span>Frais de retrait en boutique</span>
                      </>
                    )}
                  </span>
                  <span className="tabular-nums font-black">
                    {deliveryMethod === "delivery" ? formatPrice(deliveryFee) : "0 FCFA (GRATUIT)"}
                  </span>
                </div>

                <div className="pt-2 border-t-2 border-foreground flex items-center justify-between">
                  <div>
                    <span className="font-display text-2xl sm:text-3xl uppercase tracking-wider text-foreground font-black block leading-none">
                      TOTAL À PAYER
                    </span>
                    <span className="text-[10px] font-bold text-foreground/60 uppercase">
                      Règlement à la réception
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-3xl sm:text-4xl tabular-nums text-foreground leading-none">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                </div>

                {/* Modes de règlement acceptés à Niamey */}
                <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] font-bold">
                  <span className="text-foreground/70">Moyens acceptés :</span>
                  <span className="px-2 py-0.5 bg-background border border-foreground/30 rounded font-black">
                    💵 Espèces
                  </span>
                  <span className="px-2 py-0.5 bg-red-100 text-red-800 border border-red-300 rounded font-black">
                    🔴 Airtel Money
                  </span>
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-800 border border-blue-300 rounded font-black">
                    🔵 Moov Money
                  </span>
                </div>
              </div>
            </div>

            {/* PIED DE MODAL & GRAND BOUTON CTA */}
            <div className="p-4 sm:p-5 border-t-3 border-foreground bg-background shrink-0 space-y-2.5">
              <button
                type="button"
                onClick={handleConfirmOrder}
                disabled={isSubmitting || items.length === 0}
                className="w-full py-4 px-6 bg-primary text-primary-content border-3 border-foreground brutalist-shadow hover-brutalist transition-all font-display text-2xl sm:text-3xl uppercase tracking-wider flex items-center justify-center gap-3 font-black cursor-pointer active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageCircle size={26} className="fill-current text-primary-content" />
                <span>CONFIRMER SUR WHATSAPP • {formatPrice(totalAmount)}</span>
                <ArrowRight size={26} />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] font-bold text-foreground/75 text-center">
                <ShieldCheck size={14} className="text-primary-content shrink-0" />
                <span>Votre commande sera transmise instantanément sur WhatsApp à notre équipe pour préparation immédiate.</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
