"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const sections = [
  {
    title: "MATCHA SUPREME",
    subtitle: "L'excellence Cérémoniale",
    description: "Notre Matcha est sourcé directement du Japon, préparé avec une précision chirurgicale pour une explosion de saveurs vertes et terreuses.",
    image: "/hero_master.jpg",
    accent: "bg-primary",
    textColor: "text-primary-content"
  },
  {
    title: "DOCTOR MILKSHAKES",
    subtitle: "Gourmandise Absolue",
    description: "Le Milkshake Mina ou le Shake Spéculos ne sont pas de simples boissons. Ce sont des thérapies sucrées pour l'âme.",
    image: "/products/milkshake_mina.jpg",
    accent: "bg-secondary",
    textColor: "text-secondary-content"
  },
  {
    title: "LOCAL FRUIT VIBES",
    subtitle: "Fraîcheur du Sahel",
    description: "Hibiscus, Papaye, Mangue. Nous célébrons les saveurs de notre terre avec une touche moderne et rafraîchissante.",
    image: "/products/whisk/Whisk_e30331d74c49100a858447f573a8115fdr.jpeg",
    accent: "bg-primary",
    textColor: "text-primary-content"
  }
];

export default function BobaShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="showcase" ref={containerRef} className="relative bg-background text-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto py-24 px-6">
        <div className="space-y-48">
          {sections.map((section, idx) => (
            <div 
                key={idx} 
                className={`flex flex-col lg:flex-row items-center gap-20 ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Visual Side */}
              <div className="flex-1 relative group">
                <motion.div
                   initial={{ opacity: 0, scale: 0.8, rotate: idx % 2 === 0 ? -5 : 5 }}
                   whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                   transition={{ duration: 0.8, ease: "easeOut" }}
                   viewport={{ once: true, margin: "-100px" }}
                   className="relative aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden brutalist-shadow z-10"
                >
                   <Image 
                     src={section.image}
                     alt={section.title}
                     fill
                     className="object-cover transition-transform duration-700 group-hover:scale-110"
                     sizes="(max-width: 1024px) 100vw, 50vw"
                   />
                   <div className={`absolute inset-0 opacity-20 ${section.accent}`} />
                </motion.div>
                
                {/* Background decorative blob */}
                <div className={`absolute -inset-10 ${section.accent} opacity-5 blur-[80px] rounded-full`} />
              </div>

              {/* Text Side */}
              <div className="flex-1 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center gap-4 mb-4">
                     <span className={`w-12 h-1 ${section.accent}`} />
                     <span className="font-black uppercase tracking-[0.3em] text-sm opacity-60">Insight {idx + 1}</span>
                  </div>
                  <h2 className="text-6xl md:text-8xl font-black font-display leading-none mb-4 uppercase italic text-wrap-balance">
                    {section.title}
                  </h2>
                  <h3 className="text-3xl font-display text-secondary-content mb-8 uppercase tracking-tighter">
                    {section.subtitle}
                  </h3>
                  <p className="text-2xl font-medium text-foreground/80 leading-relaxed max-w-lg">
                    {section.description}
                  </p>
                  
                  <button className={`mt-12 px-10 py-5 font-display text-2xl uppercase border-4 border-foreground brutalist-shadow-sm hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all bg-background text-foreground hover:bg-muted focus-visible:ring-4 focus-visible:ring-primary focus-visible:outline-none`}>
                    Découvrir la gamme
                  </button>
                </motion.div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side floating text decorations */}
      <div className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
          <span className="text-[10vh] font-black opacity-[0.03] whitespace-nowrap uppercase italic font-display">THE ART OF BOBA</span>
      </div>
      <div className="hidden lg:block absolute right-10 top-1/2 -translate-y-1/2 rotate-90 origin-right">
          <span className="text-[10vh] font-black opacity-[0.03] whitespace-nowrap uppercase italic font-display">NIAMEY VIBES</span>
      </div>
    </section>
  );
}
