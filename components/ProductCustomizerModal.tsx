"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Plus, Minus, ShoppingBag, Sparkles } from "lucide-react";
import { Product, SizeOption, SugarLevel, IceLevel, Topping, Customization } from "@/lib/types";
import { sizes, sugarLevels, iceLevels, toppingsList, formatPrice } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { useToast } from "@/lib/toast-context";

interface ProductCustomizerModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddedToCart?: () => void;
}

interface ProductCustomizerContentProps {
  product: Product;
  onClose: () => void;
  onAddedToCart?: () => void;
}

function ProductCustomizerContent({
  product,
  onClose,
  onAddedToCart,
}: ProductCustomizerContentProps) {
  const { addItem, openCart } = useCart();
  const { showToast } = useToast();

  const [selectedSize, setSelectedSize] = useState<SizeOption>(sizes[0]);
  const [selectedSugar, setSelectedSugar] = useState<SugarLevel>("50%");
  const [selectedIce, setSelectedIce] = useState<IceLevel>("Normal");
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  const toggleTopping = (topping: Topping) => {
    setSelectedToppings((prev) => {
      const exists = prev.some((t) => t.id === topping.id);
      if (exists) {
        return prev.filter((t) => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  // Calculs de prix
  const basePrice = product.price;
  const sizeExtra = selectedSize.extraPrice;
  const toppingsExtra = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const unitPrice = basePrice + sizeExtra + toppingsExtra;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    const customization: Customization = {
      size: selectedSize,
      sugar: selectedSugar,
      ice: selectedIce,
      toppings: selectedToppings,
    };

    addItem(product, customization, quantity);
    showToast(`🧋 ${product.name} ajouté au panier !`, "success");
    onClose();
    onAddedToCart?.();
    openCart();
  };

  return (
    <motion.div
      initial={{ scale: 0.92, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.92, opacity: 0, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 350 }}
      className="relative z-10 w-full max-w-xl bg-background border-4 border-foreground brutalist-shadow rounded-2xl flex flex-col max-h-[90vh] overflow-hidden my-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* En-tête */}
      <div className="border-b-3 border-foreground p-4 sm:p-5 flex items-center justify-between bg-muted/40">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
          <div className="flex flex-col">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-secondary-content">
              PERSONNALISATION
            </span>
            <h2 
              id="customizer-modal-title"
              className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-foreground leading-none"
            >
              {product.name}
            </h2>
          </div>
        </div>

        <button
          onClick={onClose}
          aria-label="Fermer la personnalisation"
          className="p-2 bg-background border-2 border-foreground rounded-xl brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
          <X size={20} className="text-foreground" />
        </button>
      </div>

      {/* Corps avec défilement */}
      <div className="overflow-y-auto p-4 sm:p-6 space-y-6 flex-1">
        {/* Carte Aperçu de la boisson */}
        <div className="flex items-center gap-4 p-3 bg-muted/30 border-2 border-foreground/30 rounded-xl">
          <div className={`w-16 h-16 sm:w-20 sm:h-20 relative border-2 border-foreground rounded-lg overflow-hidden shrink-0 ${product.color}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="80px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase bg-foreground text-background px-2 py-0.5 rounded">
                {product.tag}
              </span>
              <span className="text-xs font-bold uppercase text-foreground/60">
                {product.category}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/80 mt-1 line-clamp-2">
              {product.description}
            </p>
            <div className="mt-1 font-black text-sm text-foreground">
              Base : {formatPrice(basePrice)}
            </div>
          </div>
        </div>

        {/* 1. Taille */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <label className="font-display text-lg tracking-wider text-foreground uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-foreground text-background font-black text-xs flex items-center justify-center">1</span>
              Format & Taille
            </label>
            <span className="text-xs font-bold text-foreground/60 uppercase">
              {selectedSize.id === "M" ? "Format classique" : "+500F grande soif"}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {sizes.map((s) => {
              const isSelected = selectedSize.id === s.id;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`p-3.5 border-2 border-foreground rounded-xl transition-all text-left flex justify-between items-center cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    isSelected
                      ? "bg-primary text-primary-content brutalist-shadow-sm translate-x-[-2px] translate-y-[-2px] font-black"
                      : "bg-background hover:bg-muted text-foreground"
                  }`}
                >
                  <div>
                    <div className="font-display text-xl leading-none">
                      Taille {s.id} ({s.volume})
                    </div>
                    <div className="text-xs opacity-80 mt-1">
                      {s.name}
                    </div>
                  </div>
                  <div className="text-xs font-black px-2 py-1 rounded bg-foreground/10">
                    {s.extraPrice > 0 ? `+${s.extraPrice}F` : "Inclus"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Sucre */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <label className="font-display text-lg tracking-wider text-foreground uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-foreground text-background font-black text-xs flex items-center justify-center">2</span>
              Niveau de Sucre
            </label>
            <span className="text-xs font-bold text-foreground/60">
              {selectedSugar === "50%" ? "⭐ Recommandé par le chef" : selectedSugar}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {sugarLevels.map((level) => {
              const isSelected = selectedSugar === level;
              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedSugar(level)}
                  className={`py-3 px-2 border-2 border-foreground rounded-xl text-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    isSelected
                      ? "bg-secondary text-secondary-content brutalist-shadow-sm translate-x-[-2px] translate-y-[-2px] font-black"
                      : "bg-background hover:bg-muted text-foreground"
                  }`}
                >
                  <div className="font-display text-lg leading-none">{level}</div>
                  <div className="text-[10px] uppercase font-bold mt-1 opacity-80">
                    {level === "0%" ? "Zéro" : level === "50%" ? "Idéal" : level === "100%" ? "Sucré" : "Léger"}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Glaçons */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <label className="font-display text-lg tracking-wider text-foreground uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-foreground text-background font-black text-xs flex items-center justify-center">3</span>
              Fraîcheur & Glaçons
            </label>
            <span className="text-xs font-bold text-foreground/60">
              {selectedIce}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {iceLevels.map((ice) => {
              const isSelected = selectedIce === ice;
              return (
                <button
                  key={ice}
                  type="button"
                  onClick={() => setSelectedIce(ice)}
                  className={`py-3 px-2 border-2 border-foreground rounded-xl text-center transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    isSelected
                      ? "bg-foreground text-background brutalist-shadow-sm translate-x-[-2px] translate-y-[-2px] font-black"
                      : "bg-background hover:bg-muted text-foreground"
                  }`}
                >
                  <div className="font-display text-base sm:text-lg leading-none">{ice}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Toppings (Multi-sélection) */}
        <div className="space-y-2.5">
          <div className="flex justify-between items-center">
            <label className="font-display text-lg tracking-wider text-foreground uppercase flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-foreground text-background font-black text-xs flex items-center justify-center">4</span>
              Toppings & Extras
            </label>
            <span className="text-xs font-bold text-secondary-content uppercase flex items-center gap-1">
              <Sparkles size={12} />
              +500F / topping
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {toppingsList.map((topping) => {
              const isSelected = selectedToppings.some((t) => t.id === topping.id);
              return (
                <button
                  key={topping.id}
                  type="button"
                  onClick={() => toggleTopping(topping)}
                  className={`p-3 border-2 border-foreground rounded-xl text-left flex items-center justify-between transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none ${
                    isSelected
                      ? "bg-primary/25 border-foreground font-black brutalist-shadow-sm translate-x-[-2px] translate-y-[-2px]"
                      : "bg-background hover:bg-muted text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <div
                      className={`w-5 h-5 rounded border-2 border-foreground flex items-center justify-center shrink-0 ${
                        isSelected ? "bg-primary text-foreground" : "bg-white"
                      }`}
                    >
                      {isSelected && <Check size={14} strokeWidth={3} />}
                    </div>
                    <span className="text-xs sm:text-sm font-bold truncate">
                      {topping.name}
                    </span>
                  </div>
                  <span className="text-xs font-black px-2 py-0.5 rounded bg-foreground/10 shrink-0">
                    +{topping.price}F
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Quantité */}
        <div className="pt-2 flex items-center justify-between p-3.5 bg-muted/40 border-2 border-foreground rounded-xl">
          <span className="font-display text-lg tracking-wider text-foreground uppercase flex items-center gap-2">
            <span className="w-6 h-6 rounded-md bg-foreground text-background font-black text-xs flex items-center justify-center">5</span>
            Quantité
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Diminuer la quantité"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-10 h-10 rounded-lg bg-background border-2 border-foreground brutalist-shadow-sm flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-muted cursor-pointer active:translate-y-0.5"
            >
              <Minus size={18} />
            </button>
            <span className="font-display text-2xl font-black w-8 text-center tabular-nums">
              {quantity}
            </span>
            <button
              type="button"
              aria-label="Augmenter la quantité"
              onClick={() => setQuantity((q) => Math.min(20, q + 1))}
              className="w-10 h-10 rounded-lg bg-background border-2 border-foreground brutalist-shadow-sm flex items-center justify-center hover:bg-muted cursor-pointer active:translate-y-0.5"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Pied de page / Bouton d'action */}
      <div className="border-t-3 border-foreground p-4 sm:p-5 bg-background flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs sm:text-sm text-foreground/80 font-bold px-1">
          <span>
            Prix unitaire : <strong className="text-foreground">{formatPrice(unitPrice)}</strong>
            {sizeExtra > 0 || toppingsExtra > 0 ? " (avec options)" : ""}
          </span>
          <span>Total : <strong className="text-foreground font-black text-base">{formatPrice(totalPrice)}</strong></span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-4 px-6 bg-primary text-primary-content border-3 border-foreground brutalist-shadow hover-brutalist transition-all font-display text-xl sm:text-2xl uppercase tracking-wider flex items-center justify-center gap-3 font-black cursor-pointer active:translate-y-0.5"
        >
          <ShoppingBag size={24} />
          <span>AJOUTER AU PANIER • {formatPrice(totalPrice)}</span>
        </button>
      </div>
    </motion.div>
  );
}

export default function ProductCustomizerModal({
  product,
  isOpen,
  onClose,
  onAddedToCart,
}: ProductCustomizerModalProps) {
  // Fermeture par la touche Échap et verrouillage du défilement
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && product && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="customizer-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop sombre avec flou */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-foreground/70 backdrop-blur-sm"
          />

          <ProductCustomizerContent
            key={product.id}
            product={product}
            onClose={onClose}
            onAddedToCart={onAddedToCart}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
