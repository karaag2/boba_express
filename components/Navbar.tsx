"use client";

import React, { useState, useEffect } from "react";
import { ShoppingBag, Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "NOTRE HISTOIRE", href: "#" },
    { name: "LE MENU", href: "#" },
    { name: "FIDÉLITÉ", href: "#" },
    { name: "COMMUNAUTÉ", href: "#" },
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
                className="px-6 py-2 rounded-full font-display text-[11px] tracking-widest hover:bg-white hover:text-primary transition-all duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button className="relative hidden md:flex p-2.5 bg-white border-2 border-foreground rounded-xl brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all group">
              <ShoppingBag size={20} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-secondary text-white text-[10px] rounded-full flex items-center justify-center border border-foreground font-black">2</span>
            </button>
            
            <button className="hidden sm:flex bg-primary border-2 border-foreground px-6 py-2.5 lg:px-8 font-display text-lg lg:text-xl uppercase brutalist-shadow-sm hover-brutalist transition-all">
              COMMANDER
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2.5 bg-foreground text-background border-2 border-foreground rounded-xl brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
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
            className="fixed inset-0 z-40 lg:hidden bg-[#F5F5F0] pt-28 px-6"
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
              <button className="w-full bg-primary border-2 border-foreground py-6 font-display text-3xl uppercase brutalist-shadow">
                COMMANDER MAINTENANT
              </button>
              <div className="flex justify-between items-center p-6 bg-white border-2 border-foreground brutalist-shadow-sm">
                 <span className="font-display text-xl uppercase tracking-widest">Mon Panier</span>
                 <div className="flex items-center gap-2">
                    <ShoppingBag size={24} />
                    <span className="font-black text-2xl">2</span>
                 </div>
              </div>
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
