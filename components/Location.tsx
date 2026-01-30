"use client";

import React from "react";
import { MapPin, Navigation } from "lucide-react";

const locations = [
  { name: "PLATEAU", address: "Avenue du Plateau, Niamey", active: true },
  { name: "NIAMEY 2000", address: "Zone Résidentielle, Niamey", active: true },
  { name: "NOUVEAU MARCHÉ", address: "Quartier Commercial, Niamey", active: true },
  { name: "CENTRE AÉRÉ", address: "BCEAO, Niamey", active: true },
];

export default function Location() {
  return (
    <section id="locations" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
            <h2 className="text-6xl md:text-8xl font-black font-display uppercase italic text-foreground leading-[0.85] text-wrap-balance">
                TROUVE TA <br/><span className="text-secondary not-italic relative">
                    BOBA ZONE
                    <span className="absolute -bottom-2 left-0 w-full h-2 bg-primary/30 -z-10" />
                </span>
            </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Location List */}
            <div className="lg:col-span-5 space-y-4">
                {locations.map((loc, i) => (
                    <div 
                        key={i} 
                        className="bg-muted p-5 md:p-8 border-2 border-foreground brutalist-shadow-sm flex items-center justify-between group hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all cursor-pointer focus-within:ring-4 focus-within:ring-primary outline-none" 
                        tabIndex={0}
                    >
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <h3 className="text-2xl md:text-3xl font-display uppercase leading-tight">{loc.name}</h3>
                                <span className="px-2 py-0.5 bg-primary text-primary-content text-[10px] font-black uppercase rounded-full">OPEN NOW</span>
                            </div>
                            <p className="font-sans text-sm opacity-70 uppercase tracking-tighter font-medium flex items-center gap-2">
                                <Navigation size={14} className="text-secondary" />
                                {loc.address}
                            </p>
                        </div>
                        <div className="w-12 h-12 rounded-full border-2 border-foreground flex items-center justify-center group-hover:bg-secondary group-hover:text-secondary-content transition-colors">
                            <MapPin size={24} />
                        </div>
                    </div>
                ))}

                <div className="bg-secondary p-8 border-2 border-foreground brutalist-shadow-sm flex flex-col justify-between min-h-[200px] text-secondary-content">
                    <div className="space-y-2">
                        <h4 className="text-2xl font-display uppercase italic">LIVRAISON EXPRESS</h4>
                        <p className="font-sans text-lg font-medium opacity-90 max-w-xs">Boit ton Boba où tu veux. Livraison à Niamey via nos partenaires.</p>
                    </div>
                    <button className="self-start mt-6 bg-background text-foreground px-6 py-3 border-2 border-foreground font-display text-xl uppercase hover:translate-x-[-2px] hover:translate-y-[-2px] brutalist-shadow-sm transition-all">
                        COMMANDER ICI
                    </button>
                </div>
            </div>

            {/* Visual Map Side */}
            <div className="lg:col-span-7 border-4 border-foreground brutalist-shadow relative overflow-hidden bg-[#E5E7EB] min-h-[500px] flex items-center justify-center group">
                {/* Styled Grid Pattern for Map */}
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
                
                {/* Abstract "Map" Strokes */}
                <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 20 L100 20 M20 0 L20 100 M80 0 L80 100 M0 70 L100 70" stroke="currentColor" strokeWidth="0.5" fill="none" />
                </svg>

                <div className="relative z-10 flex flex-col items-center p-12 text-center">
                    <div className="bg-primary p-10 rounded-full border-4 border-foreground brutalist-shadow animate-bounce shadow-2xl">
                        <Navigation size={80} className="text-foreground fill-white" />
                    </div>
                    <div className="mt-12 space-y-6">
                        <h3 className="text-4xl md:text-5xl font-display uppercase italic text-foreground leading-none">NIAMEY EST <br/>À TOI.</h3>
                        <div className="bg-background px-10 py-5 border-4 border-foreground font-display text-3xl tracking-widest uppercase brutalist-shadow hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all cursor-pointer inline-block group-hover:scale-105">
                            OUVRIR DANS MAPS
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-4 left-4 bg-background px-4 py-2 border-2 border-foreground text-[10px] font-black uppercase tracking-widest z-20">
                    SATELLITE VIEW ACTIVE
                </div>
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                    <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
