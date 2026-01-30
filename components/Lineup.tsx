"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Flame, IceCream, Utensils } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";

const categories = [
  { id: "all", name: "TOUT", icon: Utensils },
  { id: "special", name: "SPÉCIAL BOBA", icon: Flame },
  { id: "milkshake", name: "MILKSHAKES", icon: IceCream },
  { id: "smoothie", name: "SMOOTHIES", icon: Utensils },
  { id: "the", name: "THÉS & CAFÉS", icon: Utensils },
];

export default function Lineup() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section id="menu" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <h2 className="text-6xl md:text-8xl mb-4 leading-none font-display text-foreground">La Carte <br/><span className="text-secondary italic">Explosive</span></h2>
            <p className="text-xl opacity-70 max-w-lg text-foreground">Découvrez nos créations signatures, des milkshakes de docteurs aux thés glacés qui réveillent la ville.</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-6 py-3 font-display text-lg border-2 border-foreground transition-all focus-visible:ring-4 focus-visible:ring-primary focus-visible:outline-none ${
                  activeTab === cat.id 
                    ? "bg-primary text-primary-content brutalist-shadow translate-x-[-2px] translate-y-[-2px]" 
                    : "bg-background hover:bg-muted text-foreground brutalist-shadow-sm"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-muted border-2 border-foreground p-5 hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all brutalist-shadow cursor-default"
              >
                <Link href={`/menu/${product.slug}`} className="block mb-6 relative outline-none">
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
                  
                  <div className="space-y-1">
                      <span className="text-xs font-black uppercase opacity-60 text-foreground">{product.category}</span>
                      <h3 className="text-2xl font-display leading-tight text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
                  </div>
                </Link>
                
                <div className="flex justify-between items-center mt-6">
                   <span className="text-3xl font-black text-foreground tabular-nums">{product.price}</span>
                   <button 
                     aria-label={`Ajouter ${product.name} au panier`}
                     className="p-3 bg-secondary text-secondary-content border-2 border-foreground brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all focus-visible:ring-4 focus-visible:ring-primary focus-visible:outline-none"
                   >
                     <ShoppingCart size={20} />
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 p-10 bg-primary border-2 border-foreground flex flex-col md:flex-row items-center justify-between gap-8 brutalist-shadow">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-background border-2 border-foreground rounded-full flex items-center justify-center animate-bounce">
                    <Flame size={32} className="text-secondary" />
                </div>
                <div className="flex flex-col">
                    <span className="font-display text-4xl leading-none text-foreground">TA CARTE DÉS L&apos;ENTRÉE</span>
                    <span className="text-lg font-medium text-foreground">Ajoute Perles ou Chantilly pour +500F. 100% Frais.</span>
                </div>
            </div>
            <button className="bg-foreground text-background px-12 py-5 font-display text-3xl uppercase brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                MENU COMPLET
            </button>
        </div>
      </div>
    </section>
  );
}
