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
    <section id="community" className="py-24 px-6 bg-primary overflow-hidden border-y-4 border-foreground">
      <div className="max-w-7xl mx-auto text-center mb-20 text-primary-content">
        <h2 className="text-6xl md:text-8xl mb-4 leading-none font-display uppercase italic">INSTA VIBES</h2>
        <p className="font-display text-xl md:text-2xl uppercase tracking-[0.2em]">
          Partage ton moment avec <span className="bg-background text-foreground px-3 border-2 border-foreground brutalist-shadow-sm select-all">@BOBA.EXPRESS_</span>
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 md:gap-10">
        {feedImages.map((img) => (
          <a 
            key={img.id}
            href="https://instagram.com/boba.express_"
            target="_blank"
            rel="noopener noreferrer"
            className={`block w-60 h-72 md:w-72 md:h-96 bg-muted border-2 border-foreground p-3 md:p-4 brutalist-shadow transition-all hover:scale-105 hover:rotate-0 hover:z-30 hover:translate-x-[-4px] hover:translate-y-[-4px] cursor-pointer group focus-visible:ring-4 focus-visible:ring-secondary focus-visible:outline-none ${img.rotation}`}
            aria-label="Voir notre photo sur Instagram @boba.express_"
          >
            <div className="w-full h-full bg-slate-100 relative overflow-hidden">
                <Image 
                    src={img.src}
                    alt={`Instagram pulse ${img.id}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    decoding="async"
                    sizes="(max-width: 768px) 240px, 288px"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-secondary/90 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-secondary-content">
                    <span className="font-display text-lg tracking-widest border-2 border-foreground px-4 py-2 uppercase italic">VOIR L&apos;ARTICLE</span>
                    <span className="opacity-80 font-sans text-xs mt-4 uppercase font-black">#BobaExpressNiamey</span>
                </div>
            </div>
          </a>
        ))}
      </div>
      
      <div className="mt-20 flex justify-center">
        <a 
          href="https://instagram.com/boba.express_"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-foreground text-background px-12 py-5 font-display text-2xl uppercase brutalist-shadow hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all focus-visible:ring-4 focus-visible:ring-secondary focus-visible:outline-none"
        >
            VOIR TOUT LE FEED INSTAGRAM
        </a>
      </div>
    </section>
  );
}
