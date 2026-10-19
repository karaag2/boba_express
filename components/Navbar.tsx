"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useCart } from "@/lib/cart-context";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "SÉLECTION", href: "#showcase" },
    { name: "LE MENU", href: "#menu" },
    { name: "NOS SPOTS", href: "#locations" },
    { name: "COMMUNAUTÉ", href: "#community" },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 px-6 py-4 lg:px-10 ${
          scrolled 
          ? "bg-white/80 backdrop-blur-lg border-b border-foreground/5 py-3 shadow-lg" 
          : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <motion.div 
                whileHover={{ rotate: -10, scale: 1.1 }}
                className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-xl flex items-center justify-center brutalist-shadow-sm font-display text-2xl lg:text-3xl border-2 border-foreground"
            >
                B
            </motion.div>
            <div className="flex flex-col">
                <span className="font-display text-xl lg:text-2xl tracking-tighter uppercase font-black leading-none">Boba Express</span>
                <span className="text-[10px] font-bold tracking-[0.3em] text-secondary leading-none">NIAMEY</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-1 items-center bg-foreground/5 p-1 rounded-full border border-foreground/5">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href} 
                className="px-6 py-2 rounded-full font-display text-[12px] tracking-widest hover:bg-white hover:text-primary-content transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            
            <button 
              onClick={openCart}
              aria-label={totalCount > 0 ? `Mon Panier (${totalCount} articles)` : "Mon Panier"}
              className="relative flex p-2.5 bg-background border-2 border-foreground rounded-xl brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all group focus-visible:ring-2 focus-visible:ring-secondary focus-visible:outline-none cursor-pointer"
            >
              <ShoppingBag size={20} className="text-foreground" />
              <AnimatePresence>
                {totalCount > 0 && (
                  <motion.span 
                    key="nav-cart-badge"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-secondary-content text-[10px] rounded-full flex items-center justify-center border border-foreground font-black"
                  >
                    {totalCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            
            <button 
              onClick={openCart}
              className="hidden sm:flex bg-primary border-2 border-foreground px-6 py-2.5 lg:px-8 font-display text-lg lg:text-xl uppercase brutalist-shadow-sm hover-brutalist transition-all focus-visible:ring-2 focus-visible:ring-foreground focus-visible:outline-none text-primary-content cursor-pointer"
            >
              COMMANDER
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              className="lg:hidden p-2.5 bg-foreground text-background border-2 border-foreground rounded-xl brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden bg-background pt-28 px-6"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-display uppercase tracking-[-0.05em] flex justify-between items-center py-2 border-b border-foreground/10 group"
                >
                  {link.name}
                  <ArrowRight size={32} className="opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all" />
                </motion.a>
              ))}
            </div>

            <div className="mt-12 space-y-4">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  openCart();
                }}
                className="w-full bg-primary border-2 border-foreground py-6 font-display text-3xl uppercase brutalist-shadow text-foreground focus-visible:ring-4 focus-visible:ring-secondary cursor-pointer hover-brutalist transition-all"
              >
                COMMANDER MAINTENANT
              </button>
              <button 
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openCart();
                }}
                className="w-full flex justify-between items-center p-6 bg-white border-2 border-foreground brutalist-shadow-sm cursor-pointer hover:bg-neutral-50 transition-colors text-left"
              >
                 <span className="font-display text-xl uppercase tracking-widest text-foreground">Mon Panier</span>
                 <div className="flex items-center gap-2">
                    <ShoppingBag size={24} className="text-foreground" />
                    <AnimatePresence>
                      {totalCount > 0 && (
                        <motion.span 
                          key="drawer-cart-badge"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 25 }}
                          className="font-black text-sm bg-secondary text-secondary-content px-2.5 py-0.5 rounded-full border border-foreground min-w-6 text-center"
                        >
                          {totalCount}
                        </motion.span>
                      )}
                    </AnimatePresence>
                 </div>
              </button>
            </div>

            {/* Social Links Mobile */}
            <div className="absolute bottom-10 left-6 right-6 flex justify-between items-center border-t border-foreground/10 pt-6 font-display text-xs tracking-widest opacity-40">
                <span>BOBA EXPRESS • NIAMEY</span>
                <div className="flex gap-4 underline">
                    <a href="#">INSTAGRAM</a>
                    <a href="#">FACEBOOK</a>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
