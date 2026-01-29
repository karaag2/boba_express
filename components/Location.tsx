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
    <section id="locations" className="py-24 px-6 bg-[#F5F5F0]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 bg-secondary p-8 md:p-12 border-4 border-foreground relative overflow-hidden brutalist-shadow">
            <h2 className="text-5xl md:text-7xl text-foreground mb-8 leading-none font-display uppercase italic text-wrap-balance">TROUVE TA <br/><span className="text-foreground">BOBA ZONE</span></h2>
            <p className="text-xl text-foreground/90 font-sans mb-10 max-w-sm">4 spots stratégiques à Niamey pour ne jamais manquer ta dose d&apos;énergie.</p>
            
            <div className="space-y-4">
                {locations.map((loc, i) => (
                    <div key={i} className="bg-white p-4 md:p-6 border-2 border-foreground brutalist-shadow-sm flex items-center justify-between group hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer focus-within:ring-4 focus-within:ring-primary outline-none" tabIndex={0}>
                        <div>
                            <h3 className="text-xl md:text-2xl font-display uppercase leading-tight">{loc.name}</h3>
                            <p className="font-sans text-xs opacity-70 uppercase tracking-tighter font-medium">{loc.address}</p>
                        </div>
                        <MapPin className="text-secondary group-hover:scale-125 transition-transform" />
                    </div>
                ))}
            </div>
        </div>

        <div className="lg:col-span-7 aspect-square md:aspect-video lg:aspect-auto lg:h-full bg-slate-200 border-4 border-foreground brutalist-shadow relative overflow-hidden flex items-center justify-center">
             {/* Simple visual representation of a map vibe */}
             <div className="absolute inset-0 bg-[#E5E7EB]">
                <div className="absolute top-[20%] left-[30%] w-4 h-4 bg-primary rounded-full animate-ping" />
                <div className="absolute top-[20%] left-[30%] w-6 h-6 bg-primary/40 rounded-full border-2 border-primary" />
                
                <div className="absolute bottom-[40%] right-[25%] w-4 h-4 bg-secondary rounded-full animate-pulse" />
                <div className="absolute bottom-[40%] right-[25%] w-6 h-6 bg-secondary/40 rounded-full border-2 border-secondary" />
                
                <div className="absolute top-[60%] left-[15%] w-4 h-4 bg-primary rounded-full animate-ping" />
                <div className="absolute top-[60%] left-[15%] w-6 h-6 bg-primary/40 rounded-full border-2 border-primary" />

                <div className="absolute top-[10%] right-[40%] w-4 h-4 bg-secondary rounded-full animate-pulse" />
                <div className="absolute top-[10%] right-[40%] w-6 h-6 bg-secondary/40 rounded-full border-2 border-secondary" />
             </div>
             
             <div className="z-10 flex flex-col items-center">
                <div className="bg-primary p-6 rounded-full border-4 border-foreground brutalist-shadow animate-bounce">
                    <Navigation size={64} className="text-foreground fill-white" />
                </div>
                <div className="mt-8 bg-white px-8 py-4 border-4 border-foreground font-display text-2xl tracking-widest uppercase brutalist-shadow hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all cursor-pointer">
                    OUVRIR DANS MAPS
                </div>
             </div>
        </div>
      </div>
    </section>
  );
}
