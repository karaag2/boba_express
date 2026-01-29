"use client";

import React from "react";
import Image from "next/image";

const feedImages = [
  { id: 1, src: "/hero_master.jpg", rotation: "-rotate-3" },
  { id: 2, src: "/products/boba_time.jpg", rotation: "rotate-2" },
  { id: 3, src: "/products/milkshake_mina.jpg", rotation: "-rotate-1" },
  { id: 4, src: "/products/the_glace.jpg", rotation: "rotate-3" },
  { id: 5, src: "/products/boba_time.jpg", rotation: "-rotate-2" },
];

export default function InstagramFeed() {
  return (
    <section className="py-24 px-6 bg-primary overflow-hidden border-y-4 border-foreground">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-6xl md:text-8xl mb-4 leading-none font-display uppercase italic text-foreground">INSTA VIBES</h2>
        <p className="font-display text-xl md:text-2xl uppercase tracking-[0.2em] text-foreground">
          Partage ton moment avec <span className="bg-white px-3 border-2 border-foreground brutalist-shadow-sm select-all">@BOBA.EXPRESS_</span>
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {feedImages.map((img) => (
          <div 
            key={img.id} 
            className={`w-60 h-72 md:w-72 md:h-96 bg-white border-2 border-foreground p-3 md:p-4 brutalist-shadow transition-all hover:scale-105 hover:z-20 cursor-pointer group ${img.rotation}`}
          >
            <div className="w-full h-full bg-slate-100 relative overflow-hidden">
                <Image 
                    src={img.src}
                    alt={`Instagram pulse ${img.id}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4">
                    <span className="text-white font-display text-lg tracking-widest border-2 border-white px-4 py-2 uppercase italic">VOIR L&apos;ARTICLE</span>
                    <span className="text-white/80 font-sans text-[10px] mt-4 uppercase font-black">#BobaExpressNiamey</span>
                </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-20 flex justify-center">
        <button className="bg-foreground text-background px-12 py-5 font-display text-2xl uppercase brutalist-shadow hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all">
            VOIR TOUT LE FEED
        </button>
      </div>
    </section>
  );
}
