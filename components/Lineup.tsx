"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Flame, IceCream, Utensils, Zap } from "lucide-react";
import Image from "next/image";

const categories = [
  { id: "all", name: "TOUT", icon: Utensils },
  { id: "special", name: "SPÉCIAL BOBA", icon: Flame },
  { id: "milkshake", name: "MILKSHAKES", icon: IceCream },
  { id: "smoothie", name: "SMOOTHIES", icon: Utensils },
  { id: "the", name: "THÉS & CAFÉS", icon: Utensils },
];

const products = [
  // Special Boba
  { id: 1, name: "Matcha Latté Supreme", price: "2500F", tag: "Best-Seller", category: "special", color: "bg-primary/20", image: "/hero_master.jpg" },
  { id: 2, name: "Taro Latté", price: "2500F", tag: "Unique", category: "special", color: "bg-purple-100", image: "/products/boba_time.jpg" },
  { id: 3, name: "Papaye Latté", price: "2500F", tag: "Local", category: "special", color: "bg-orange-100", image: "/products/boba_time.jpg" },
  
  // Milkshakes
  { id: 4, name: "Milkshake Mina", price: "3000F", tag: "Nouveauté", category: "milkshake", color: "bg-amber-50", image: "/products/milkshake_mina.jpg" },
  { id: 5, name: "Shake Spéculos", price: "2000F", tag: "Gourmand", category: "milkshake", color: "bg-amber-100", image: "/products/milkshake_mina.jpg" },
  { id: 6, name: "Milkshake Oreo", price: "2000F", tag: "Populaire", category: "milkshake", color: "bg-gray-100", image: "/products/milkshake_mina.jpg" },

  // Smoothies
  { id: 7, name: "Smoothie Mangue", price: "2000F", tag: "Frais", category: "smoothie", color: "bg-yellow-100", image: "/products/the_glace.jpg" },
  { id: 8, name: "Smoothie Kiwi", price: "2000F", tag: "Vitamines", category: "smoothie", color: "bg-green-100", image: "/products/the_glace.jpg" },

  // The & Cafe
  { id: 10, name: "Thé Glacé Passion", price: "2000F", tag: "Rafraîchissant", category: "the", color: "bg-red-50", image: "/products/the_glace.jpg" },
  { id: 11, name: "Café Latté", price: "2000F", tag: "Énergie", category: "the", color: "bg-orange-50", image: "/products/boba_time.jpg" },
];

export default function Lineup() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts = activeTab === "all" 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section id="menu" className="py-24 px-6 bg-white">
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
                className={`px-6 py-3 font-display text-lg border-2 border-foreground transition-all brutalist-shadow-sm ${
                  activeTab === cat.id ? "bg-primary translate-x-[-2px] translate-y-[-2px] shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]" : "bg-white hover:bg-muted text-foreground"
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
                className="group relative bg-white border-2 border-foreground p-5 hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all brutalist-shadow cursor-default"
              >
                <div className={`w-full aspect-square mb-6 border-2 border-foreground overflow-hidden relative ${product.color}`}>
                   <Image 
                     src={product.image}
                     alt={product.name}
                     fill
                     className="object-cover group-hover:scale-110 transition-transform duration-500"
                   />
                   <div className="absolute top-2 left-2 bg-foreground text-background text-[10px] font-black px-2 py-1 uppercase italic z-10">
                      {product.tag}
                   </div>
                </div>
                
                <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase opacity-40 text-foreground">{product.category}</span>
                    <h3 className="text-2xl font-display leading-tight text-foreground">{product.name}</h3>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <span className="text-3xl font-black text-foreground">{product.price}</span>
                  <button className="p-3 bg-secondary text-white border-2 border-foreground brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                    <ShoppingCart size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-20 p-10 bg-primary border-2 border-foreground flex flex-col md:flex-row items-center justify-between gap-8 brutalist-shadow">
            <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white border-2 border-foreground rounded-full flex items-center justify-center animate-bounce">
                    <Zap size={32} className="text-secondary" />
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
