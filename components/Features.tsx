"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Heart, Sparkles, MapPin, Clock } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "ÉNERGIE PURE",
    description: "Nos boissons sont conçues pour vous donner le boost nécessaire sans le crash du sucre industriel.",
    color: "bg-primary"
  },
  {
    icon: ShieldCheck,
    title: "SÉCURITÉ ALIMENTAIRE",
    description: "Hygiène irréprochable. Ingrédients tracés. Préparation devant vos yeux.",
    color: "bg-secondary"
  },
  {
    icon: MapPin,
    title: "4 SPOTS À NIAMEY",
    description: "Plateau, Niamey 2000, Nouveau Marché, Centre Aéré. On est là où tu es.",
    color: "bg-amber-400"
  },
  {
    icon: Clock,
    title: "SERVICE FLASH",
    description: "Parce que le Boba n'attend pas. Commandé en 2 min, dégusté en 10.",
    color: "bg-blue-400"
  },
  {
    icon: Heart,
    title: "100% PASSION",
    description: "Plus qu'un métier, c'est une culture. On respire Boba Express chaque jour.",
    color: "bg-red-400"
  },
  {
    icon: Sparkles,
    title: "RECHARGE PERRIERS",
    description: "L'exclusivité Boba Express : tes boissons favorites avec une base Perrier pétillante.",
    color: "bg-purple-400"
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-white px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 space-y-4">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-black font-display uppercase italic text-foreground text-wrap-balance"
            >
                POURQUOI <span className="text-primary-content not-italic">NOUS ?</span>
            </motion.h2>
            <p className="text-xl text-foreground/80 font-medium max-w-2xl mx-auto">
                On ne fait pas juste des boissons. On crée des moments.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ translateZ: 20, rotate: idx % 2 === 0 ? 2 : -2 }}
              className="p-10 border-4 border-foreground bg-white brutalist-shadow hover:bg-muted transition-colors group relative focus-within:ring-4 focus-within:ring-primary outline-none"
            >
              <div className={`w-20 h-20 ${feature.color} border-4 border-foreground rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-12 transition-transform`}>
                <feature.icon size={40} className="text-foreground" aria-hidden="true" />
              </div>
              <h3 className="text-3xl font-display mb-4 uppercase italic tracking-tighter">{feature.title}</h3>
              <p className="text-lg font-medium text-foreground/80">{feature.description}</p>
              
              {/* Corner accent */}
              <div className={`absolute top-4 right-4 w-4 h-4 rounded-full ${feature.color} border-2 border-foreground`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
