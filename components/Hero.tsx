"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Star, Zap, ShoppingCart } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-[#F5F5F0]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
            <span className="text-[40vw] font-black font-display rotate-[-10deg]">BOBA</span>
        </div>
      </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10">
        
        {/* Visual Component */}
        <div className="lg:col-span-5 order-1 lg:order-2 relative flex items-center justify-center pt-8 lg:pt-0">
            <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="relative w-full max-w-[280px] md:max-w-md aspect-[4/5]"
            >
                {/* Decorative Frames */}
                <div className="absolute inset-4 border-2 border-foreground brutalist-shadow rotate-3" />
                <div className="absolute inset-0 bg-white border-2 border-foreground brutalist-shadow overflow-hidden group">
                    <Image 
                        src="/hero_master.jpg" 
                        alt="Boba Signature" 
                        fill
                        className="object-cover transition-all duration-700"
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    />
                    
                    {/* Floating Info Tag */}
                    <motion.div 
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 bg-primary p-2 lg:p-4 border-2 border-foreground brutalist-shadow-sm flex items-center gap-2 lg:gap-3"
                    >
                        <Zap size={20} className="animate-pulse lg:w-6 lg:h-6" />
                        <div>
                            <div className="text-[10px] font-black uppercase opacity-70 leading-none text-foreground">Best Seller</div>
                            <div className="text-lg lg:text-xl font-display leading-none mt-1 text-foreground uppercase">MATCHA SUPREME</div>
                        </div>
                    </motion.div>
                </div>

                {/* Sticker Decorations */}
                <motion.div 
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    className="absolute top-[-15px] right-[-15px] lg:top-[-20px] lg:right-[-20px] w-16 h-16 lg:w-24 lg:h-24 bg-secondary rounded-full flex items-center justify-center border-2 border-foreground brutalist-shadow-sm rotate-12 cursor-pointer z-20"
                >
                    <span className="text-foreground font-display text-sm lg:text-lg text-center leading-none">NEW<br/>COLLECTION</span>
                </motion.div>
            </motion.div>
        </div>

        {/* Text Column: CTA & Info */}
        <div className="lg:col-span-7 order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-foreground brutalist-shadow-sm rounded-full"
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-xs font-black uppercase tracking-[0.2em] text-foreground">Ouvert à Yantala • 11:00 - 22:00</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-[14vw] lg:text-[7rem] leading-[0.85] font-black tracking-tighter uppercase mb-4 lg:mb-0 text-foreground text-wrap-balance">
              L&apos;ART DU <br/>
              <span className="text-primary-content italic relative">
                MATCHA 
                <svg className="absolute -bottom-2 left-0 w-full h-4 text-secondary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
              <br/> URBAIN
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-lg text-lg lg:text-2xl font-medium leading-relaxed text-foreground/80"
          >
            Boba Express redéfinit l&apos;expérience du Bubble Tea à Niamey. 
            Des ingrédients premium, une culture authentique, une énergie pure.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4 lg:gap-6 justify-center lg:justify-start"
          >
            <button className="group relative bg-foreground text-background px-8 lg:px-10 py-4 lg:py-5 font-display text-xl lg:text-2xl uppercase overflow-hidden brutalist-shadow hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all focus-visible:ring-4 focus-visible:ring-primary focus-visible:outline-none">
                <span className="relative z-10 flex items-center gap-3">
                    COMMANDER <ShoppingCart size={24} />
                </span>
                <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <button className="px-8 lg:px-10 py-4 lg:py-5 font-display text-xl lg:text-2xl uppercase border-2 border-foreground hover:bg-white transition-all flex items-center gap-3 text-foreground focus-visible:ring-4 focus-visible:ring-secondary focus-visible:outline-none">
                LE MENU <ArrowRight size={24} />
            </button>
          </motion.div>

          {/* Trust Badges */}
          <div className="flex items-center gap-4 lg:gap-8 pt-6 border-t border-foreground/10 w-full justify-center lg:justify-start">
            <div className="flex flex-col items-center lg:items-start text-foreground">
                <span className="text-2xl lg:text-3xl font-black tabular-nums">4.9/5</span>
                <div className="flex text-secondary-content">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                </div>
                <span className="text-[10px] font-bold uppercase mt-1 opacity-70">GOOGLE REVIEWS</span>
            </div>
            <div className="h-10 lg:h-12 w-px bg-foreground/10" />
            <div className="flex flex-col items-center lg:items-start text-foreground">
                <span className="text-2xl lg:text-3xl font-black">100%</span>
                <span className="text-[10px] font-bold uppercase mt-1 opacity-70 italic">Naturel & Frais</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Decorative Text */}
      <div className="absolute bottom-10 left-0 w-full overflow-hidden whitespace-nowrap opacity-20 pointer-events-none">
          <div className="animate-marquee-slow flex gap-20 font-display text-[10vh] uppercase text-outline" style={{ willChange: 'transform' }}>
              <span>Freshly Made • Ceremonial Grade • Niamey Vibe • Freshly Made • Ceremonial Grade • Niamey Vibe • </span>
          </div>
      </div>
    </section>
  );
}
