"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Flame, IceCream, Utensils, Search, X, Coffee, Sparkles, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products, formatPrice } from "@/lib/data";
import { Product } from "@/lib/types";
import ProductCustomizerModal from "./ProductCustomizerModal";

const categories = [
  { id: "all", name: "TOUT", icon: Utensils },
  { id: "special", name: "SPÉCIAL BOBA", icon: Flame },
  { id: "milkshake", name: "MILKSHAKES", icon: IceCream },
  { id: "smoothie", name: "SMOOTHIES", icon: Sparkles },
  { id: "the", name: "THÉS & CAFÉS", icon: Coffee },
];

export default function Lineup() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [customizingProduct, setCustomizingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenCustomizer = (product: Product) => {
    setCustomizingProduct(product);
    setIsModalOpen(true);
  };

  // Filtrage combiné : catégorie active + texte (nom ou description ou tag)
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return products.filter((p) => {
      const matchCategory = activeTab === "all" || p.category === activeTab;
      if (!matchCategory) return false;

      if (!query) return true;
      const matchName = p.name.toLowerCase().includes(query);
      const matchDesc = p.description?.toLowerCase().includes(query);
      const matchTag = p.tag?.toLowerCase().includes(query);
      return matchName || matchDesc || matchTag;
    });
  }, [activeTab, searchQuery]);

  const handleResetFilters = () => {
    setActiveTab("all");
    setSearchQuery("");
  };

  const handleFullMenuClick = () => {
    handleResetFilters();
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="menu" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border-2 border-foreground brutalist-shadow-sm mb-4">
              <Sparkles size={14} className="text-foreground animate-spin" />
              <span className="text-xs font-black uppercase tracking-widest text-foreground">
                16 CRÉATIONS ARTISANALES
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl mb-4 leading-none font-display text-foreground">
              La Carte <br />
              <span className="text-secondary italic">Explosive</span>
            </h2>
            <p className="text-xl opacity-75 max-w-lg text-foreground font-medium">
              Découvrez nos créations signatures, des milkshakes ultra crémeux aux thés glacés infusés au bissap frais de Niamey.
            </p>
          </div>

          {/* Nombre de boissons trouvées */}
          <div className="flex items-center gap-3">
            <span className="bg-muted px-4 py-2 border-2 border-foreground font-display text-sm tracking-wider uppercase brutalist-shadow-sm">
              {filteredProducts.length} {filteredProducts.length > 1 ? "Boissons" : "Boisson"} disponible{filteredProducts.length > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Barre de Recherche Stylisée Brutaliste */}
        <div className="mb-8">
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-foreground/60">
              <Search size={22} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Rechercher un Boba, Milkshake, Fruit..."
              aria-label="Rechercher une boisson"
              className="w-full pl-12 pr-12 py-4 bg-muted border-2 border-foreground brutalist-shadow-sm font-sans text-base md:text-lg text-foreground placeholder:text-foreground/45 placeholder:italic focus:bg-background focus:outline-none focus:ring-4 focus:ring-primary transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Effacer la recherche"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-foreground/60 hover:text-foreground cursor-pointer"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Boutons de Catégories */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const count = cat.id === "all" 
              ? products.length 
              : products.filter(p => p.category === cat.id).length;
            const isCurrent = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveTab(cat.id)}
                className={`px-5 py-3 font-display text-base md:text-lg border-2 border-foreground transition-all flex items-center gap-2 cursor-pointer focus-visible:ring-4 focus-visible:ring-primary focus-visible:outline-none ${
                  isCurrent
                    ? "bg-primary text-primary-content brutalist-shadow translate-x-[-2px] translate-y-[-2px]"
                    : "bg-background hover:bg-muted text-foreground brutalist-shadow-sm"
                }`}
              >
                <Icon size={18} />
                <span>{cat.name}</span>
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-sans font-bold ${
                  isCurrent ? "bg-background text-foreground" : "bg-muted text-foreground/70"
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Grille de Produits ou État Vide */}
        {filteredProducts.length === 0 ? (
          <div className="bg-muted border-4 border-foreground p-12 text-center brutalist-shadow max-w-2xl mx-auto my-12">
            <div className="w-20 h-20 bg-secondary/20 rounded-full border-2 border-foreground mx-auto flex items-center justify-center mb-6">
              <Search size={36} className="text-secondary" />
            </div>
            <h3 className="font-display text-3xl md:text-4xl uppercase mb-2 text-foreground">
              AUCUN BOBA TROUVÉ
            </h3>
            <p className="font-sans text-base text-foreground/80 max-w-md mx-auto mb-8">
              Aucune création ne correspond à « <span className="font-bold underline">{searchQuery}</span> »
              {activeTab !== "all" ? ` dans la catégorie ${categories.find(c => c.id === activeTab)?.name}` : ""}.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-3.5 font-display text-lg uppercase brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer"
            >
              <RotateCcw size={18} />
              <span>RÉINITIALISER LES FILTRES</span>
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  layout
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="group relative bg-muted border-2 border-foreground p-5 hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all brutalist-shadow cursor-default flex flex-col justify-between"
                >
                  <Link href={`/menu/${product.slug}`} className="block mb-4 relative outline-none flex-1">
                    <div className={`w-full aspect-square border-2 border-foreground overflow-hidden relative ${product.color}`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      />
                      <div className="absolute top-2 left-2 bg-foreground text-background text-[10px] font-black px-2 py-1 uppercase italic z-10">
                        {product.tag}
                      </div>
                    </div>

                    <div className="space-y-1.5 mt-3">
                      <span className="text-[11px] font-black uppercase opacity-60 text-foreground">
                        {product.category}
                      </span>
                      <h3 className="text-2xl font-display leading-tight text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      {product.description && (
                        <p className="text-xs text-foreground/70 line-clamp-2 font-sans font-medium">
                          {product.description}
                        </p>
                      )}
                    </div>
                  </Link>

                  <div className="flex justify-between items-center pt-4 border-t border-foreground/10 mt-auto">
                    <span className="text-2xl font-black text-foreground tabular-nums">
                      {formatPrice(product.price)}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleOpenCustomizer(product)}
                      aria-label={`Personnaliser et ajouter ${product.name} au panier`}
                      className="p-3 bg-secondary text-secondary-content border-2 border-foreground brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all focus-visible:ring-4 focus-visible:ring-primary focus-visible:outline-none cursor-pointer active:translate-y-0.5"
                    >
                      <ShoppingCart size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Bannière Carte & Bouton MENU COMPLET */}
        <div className="mt-20 p-8 md:p-10 bg-primary border-2 border-foreground flex flex-col md:flex-row items-center justify-between gap-8 brutalist-shadow">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-background border-2 border-foreground rounded-full flex items-center justify-center shrink-0">
              <Flame size={32} className="text-secondary" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-3xl md:text-4xl leading-none text-foreground">
                TA CARTE DÈS L&apos;ENTRÉE
              </span>
              <span className="text-base md:text-lg font-medium text-foreground mt-1">
                Perles de tapioca ou chantilly maison pour +500 FCFA. 100% Frais.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleFullMenuClick}
            className="w-full md:w-auto bg-foreground text-background px-10 py-5 font-display text-2xl uppercase brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer whitespace-nowrap"
          >
            MENU COMPLET
          </button>
        </div>
      </div>

      {/* Modal de Personnalisation de Boisson */}
      <ProductCustomizerModal
        product={customizingProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
