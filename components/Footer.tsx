"use client";

import React from "react";
import { Instagram, Facebook, Twitter, ArrowRight, Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-32 pb-12 px-6 overflow-hidden border-t-8 border-primary">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 mb-32 pb-20 border-b border-white/10">
            <div className="space-y-10">
                <h2 className="text-7xl md:text-[8rem] leading-[0.85] font-black font-display uppercase italic tracking-[0.05em]">
                    STAY <br/>
                    <span className="text-primary not-italic">EXPRESS</span>
                </h2>
                <div className="space-y-6">
                    <p className="text-2xl font-medium opacity-90 max-w-md">
                        Inscris-toi pour recevoir les drops secrets et les menus éphémères de la saison.
                    </p>
                    <div className="flex flex-col sm:flex-row max-w-md group gap-2 sm:gap-0">
                        <input 
                            type="email" 
                            aria-label="Adresse email pour la newsletter"
                            placeholder="TON EMAIL" 
                            className="bg-white/5 border-2 border-white/20 px-8 py-5 flex-grow font-display text-2xl focus:outline-none focus:border-primary transition-colors text-white focus-visible:ring-2 focus-visible:ring-primary"
                        />
                        <button className="bg-primary text-foreground px-10 py-5 font-display text-2xl uppercase hover:bg-white transition-all flex items-center justify-center gap-3 brutalist-shadow-sm h-full focus-visible:ring-4 focus-visible:ring-secondary focus-visible:outline-none">
                            OK <ArrowRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="hidden lg:flex flex-col justify-end items-end relative">
                <div className="text-[25rem] font-black opacity-5 leading-none tracking-tighter select-none absolute -bottom-20 right-0">
                    BOBA
                </div>
                <div className="z-10 p-12 bg-primary border-4 border-foreground brutalist-shadow rounded-3xl -rotate-3 hover:rotate-0 transition-transform duration-500 cursor-default">
                    <span className="text-foreground font-display text-6xl block leading-none">VIBE <br/>ONLY.</span>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="space-y-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary border-2 border-foreground rounded-xl flex items-center justify-center font-display text-3xl text-foreground">B</div>
                    <span className="font-display text-3xl tracking-tighter uppercase font-black">Boba Express</span>
                </div>
                <p className="opacity-70 font-medium text-lg leading-relaxed">
                    Le premier concept de Bubble Tea urbain au Niger. Boba, Shakes & Authentic Vibes.
                </p>
                <div className="flex gap-4">
                    <a href="https://instagram.com/boba.express_" target="_blank" aria-label="Instagram" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary hover:text-foreground hover:scale-110 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
                        <Instagram size={24} />
                    </a>
                    <a href="#" aria-label="Facebook" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary hover:text-foreground hover:scale-110 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
                        <Facebook size={24} />
                    </a>
                    <a href="#" aria-label="Twitter" className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary hover:text-foreground hover:scale-110 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none">
                        <Twitter size={24} />
                    </a>
                </div>
            </div>

            <div className="space-y-8">
                <h4 className="font-display text-2xl text-primary font-black uppercase italic tracking-widest">Navigation</h4>
                <ul className="space-y-4 text-xl font-medium opacity-70">
                    <li className="hover:text-primary transition-colors cursor-pointer focus-within:text-primary"><a href="#menu" className="outline-none focus-visible:underline">Le Menu</a></li>
                    <li className="hover:text-primary transition-colors cursor-pointer focus-within:text-primary"><a href="#locations" className="outline-none focus-visible:underline">Nos Spots</a></li>
                    <li className="hover:text-primary transition-colors cursor-pointer focus-within:text-primary"><a href="#" className="outline-none focus-visible:underline">L&apos;Histoire</a></li>
                    <li className="hover:text-primary transition-colors cursor-pointer focus-within:text-primary"><a href="#" className="outline-none focus-visible:underline">Rejoindre la Team</a></li>
                </ul>
            </div>

            <div className="space-y-8">
                <h4 className="font-display text-2xl text-primary font-black uppercase italic tracking-widest">Connect</h4>
                <ul className="space-y-4 text-lg font-medium opacity-60">
                    <li className="flex items-center gap-4 hover:opacity-100 transition-opacity">
                        <MapPin size={20} className="text-secondary" />
                        <span>Yantala, Niamey, Niger</span>
                    </li>
                    <li className="flex items-center gap-4 hover:opacity-100 transition-opacity">
                        <Phone size={20} className="text-secondary" />
                        <span>+227 00 00 00 00</span>
                    </li>
                    <li className="flex items-center gap-4 hover:opacity-100 transition-opacity">
                        <Mail size={20} className="text-secondary" />
                        <span>hello@bobaexpress.ne</span>
                    </li>
                </ul>
            </div>

            <div className="space-y-8">
                <h4 className="font-display text-2xl text-primary font-black uppercase italic tracking-widest">Horaires</h4>
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="opacity-50">Lun - Ven</span>
                        <span className="font-bold">11:00 - 22:00</span>
                    </div>
                    <div className="flex justify-between items-center text-primary">
                        <span className="opacity-80">Sam - Dim</span>
                        <span className="font-black">11:00 - 23:30</span>
                    </div>
                    <div className="pt-4 border-t border-white/10 text-center">
                        <span className="text-xs font-black uppercase tracking-widest text-[#A3FF47]">Open Late Night</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 opacity-30 text-xs font-black tracking-[0.3em] gap-8">
            <p>© 2026 BOBA EXPRESS NIAMEY. DESIGNED FOR THE STREETS.</p>
            <div className="flex gap-10">
                <a href="#" className="hover:text-primary transition-colors">PRIVACY</a>
                <a href="#" className="hover:text-primary transition-colors">TERMS</a>
                <a href="#" className="hover:text-primary transition-colors">LEGAL</a>
            </div>
        </div>
      </div>
    </footer>
  );
}
