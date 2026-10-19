"use client";

import React, { useState } from "react";
import { ShoppingBag, Sparkles } from "lucide-react";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/data";
import ProductCustomizerModal from "./ProductCustomizerModal";

interface ProductDetailOrderProps {
  product: Product;
}

export default function ProductDetailOrder({ product }: ProductDetailOrderProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="space-y-4 pt-2">
        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          <span className="text-4xl sm:text-5xl font-black tabular-nums text-foreground">
            {formatPrice(product.price)}
          </span>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-primary-content border-4 border-foreground px-8 sm:px-10 py-4 sm:py-5 font-display text-2xl uppercase brutalist-shadow hover-brutalist transition-all flex items-center gap-3 cursor-pointer active:translate-y-0.5 font-black"
          >
            <ShoppingBag size={24} />
            <span>COMMANDER & PERSONNALISER</span>
          </button>
        </div>

        <div className="inline-flex items-center gap-2 text-xs font-bold text-foreground/70 bg-muted/50 border border-foreground/20 px-3 py-1.5 rounded-full">
          <Sparkles size={13} className="text-secondary" />
          <span>Tailles M ou L • 4 niveaux de sucre • Toppings au choix</span>
        </div>
      </div>

      {/* Modal de personnalisation */}
      <ProductCustomizerModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
