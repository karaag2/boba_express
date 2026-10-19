"use client";

import React, { useState } from "react";
import { MapPin, Navigation, Phone, ExternalLink, Clock, Compass } from "lucide-react";
import { pickupSpots } from "@/lib/data";
import { useCart } from "@/lib/cart-context";

export default function Location() {
  const [selectedSpotId, setSelectedSpotId] = useState<string>(pickupSpots[0]?.id || "plateau");
  const { openCart, totalCount } = useCart();

  const activeSpot = pickupSpots.find((s) => s.id === selectedSpotId) || pickupSpots[0];

  const handleOrderClick = () => {
    if (totalCount > 0) {
      openCart();
    } else {
      const menuSection = document.getElementById("menu");
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: "smooth" });
      } else {
        openCart();
      }
    }
  };

  // Coordonnées approximatives / requêtes maps pour l'iframe Google Maps
  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    activeSpot.name + ", " + activeSpot.address + ", Niamey, Niger"
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="locations" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/15 border-2 border-foreground brutalist-shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest text-foreground">
              4 SPOTS OFFICIELS À NIAMEY
            </span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black font-display uppercase italic text-foreground leading-[0.85] text-wrap-balance">
            TROUVE TA <br />
            <span className="text-secondary not-italic relative">
              BOBA ZONE
              <span className="absolute -bottom-2 left-0 w-full h-2 bg-primary/30 -z-10" />
            </span>
          </h2>
          <p className="mt-4 text-lg md:text-xl font-medium text-foreground/75 max-w-2xl">
            Retrouve tes bubble teas et milkshakes préférés en retrait express ou commande directement en livraison dans toute la ville.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Liste des 4 spots */}
          <div className="lg:col-span-6 space-y-4">
            {pickupSpots.map((spot) => {
              const isSelected = spot.id === activeSpot.id;
              return (
                <div
                  key={spot.id}
                  onClick={() => setSelectedSpotId(spot.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedSpotId(spot.id);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`Sélectionner le spot ${spot.name}`}
                  className={`p-6 md:p-7 border-2 border-foreground brutalist-shadow-sm transition-all cursor-pointer outline-none ${
                    isSelected
                      ? "bg-primary/20 translate-x-[-3px] translate-y-[-3px] border-foreground ring-2 ring-primary"
                      : "bg-muted hover:translate-x-[-2px] hover:translate-y-[-2px] hover:bg-muted/80"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-3 flex-1">
                      {/* En-tête du spot */}
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-2xl md:text-3xl font-display uppercase leading-tight text-foreground">
                          {spot.name.replace("Boba Express - ", "")}
                        </h3>
                        <span className="px-2.5 py-0.5 bg-primary text-primary-content text-[11px] font-black uppercase rounded-full">
                          {spot.openHours}
                        </span>
                      </div>

                      {/* Adresse */}
                      <p className="font-sans text-sm font-semibold uppercase tracking-tight text-foreground flex items-center gap-2">
                        <MapPin size={16} className="text-secondary shrink-0" />
                        <span>{spot.address}</span>
                      </p>

                      {/* Repère local */}
                      <p className="font-sans text-xs font-medium opacity-80 text-foreground flex items-start gap-2 bg-background/50 p-2.5 border border-foreground/20 rounded">
                        <Compass size={15} className="text-primary shrink-0 mt-0.5" />
                        <span>
                          <strong className="font-bold">Repère : </strong>
                          {spot.landmark}
                        </span>
                      </p>

                      {/* Liens : Téléphone & Itinéraire Google Maps */}
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <a
                          href={`tel:${spot.phone.replace(/\s+/g, "")}`}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-background border-2 border-foreground text-xs font-black uppercase text-foreground hover:bg-foreground hover:text-background transition-colors brutalist-shadow-sm"
                        >
                          <Phone size={13} />
                          <span>{spot.phone}</span>
                        </a>

                        <a
                          href={spot.mapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-secondary-content border-2 border-foreground text-xs font-black uppercase hover:opacity-95 transition-opacity brutalist-shadow-sm"
                        >
                          <span>ITINÉRAIRE GOOGLE MAPS</span>
                          <ExternalLink size={13} />
                        </a>
                      </div>
                    </div>

                    <div
                      className={`w-11 h-11 shrink-0 rounded-full border-2 border-foreground flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-secondary text-secondary-content"
                          : "bg-background text-foreground"
                      }`}
                    >
                      <MapPin size={20} />
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bannière Livraison Express */}
            <div className="bg-secondary p-8 border-2 border-foreground brutalist-shadow flex flex-col justify-between min-h-[200px] text-secondary-content mt-6">
              <div className="space-y-2">
                <div className="inline-block bg-background text-foreground text-[11px] font-black uppercase px-2 py-0.5 border border-foreground">
                  LIVRAISON À DOMICILE & AU BUREAU
                </div>
                <h4 className="text-3xl font-display uppercase italic">LIVRAISON EXPRESS NIAMEY</h4>
                <p className="font-sans text-base font-medium opacity-95 max-w-md">
                  Reçois ton Boba frais en 30-45 minutes à Plateau, Yantala, Niamey 2000, Koira Kano, Francophonie ou Koubia.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOrderClick}
                className="self-start mt-6 bg-background text-foreground px-8 py-3.5 border-2 border-foreground font-display text-xl uppercase hover:translate-x-[-2px] hover:translate-y-[-2px] brutalist-shadow transition-all cursor-pointer focus-visible:ring-4 focus-visible:ring-primary focus-visible:outline-none"
              >
                COMMANDER ICI
              </button>
            </div>
          </div>

          {/* Carte visuelle interactive Google Maps centrée sur Niamey */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="border-4 border-foreground brutalist-shadow bg-muted overflow-hidden flex flex-col h-full min-h-[520px]">
              {/* Barre de contrôle carte */}
              <div className="bg-foreground text-background px-4 py-3 flex items-center justify-between border-b-2 border-foreground">
                <div className="flex items-center gap-2">
                  <Navigation size={18} className="text-secondary animate-pulse" />
                  <span className="font-display uppercase tracking-widest text-sm">
                    CARTE INTERACTIVE • {activeSpot.name.replace("Boba Express - ", "")}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-wider">LIVE GPS</span>
                </div>
              </div>

              {/* Boutons d'accès rapide aux spots au-dessus de la carte */}
              <div className="bg-background/90 p-2 border-b-2 border-foreground grid grid-cols-2 md:grid-cols-4 gap-1.5 text-center">
                {pickupSpots.map((spot) => (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setSelectedSpotId(spot.id)}
                    className={`px-2 py-1.5 text-[11px] font-display uppercase border border-foreground transition-all truncate ${
                      spot.id === activeSpot.id
                        ? "bg-primary text-primary-content font-bold shadow-sm"
                        : "bg-muted text-foreground hover:bg-muted/80"
                    }`}
                  >
                    {spot.id.replace("-", " ")}
                  </button>
                ))}
              </div>

              {/* Iframe interactif Google Maps */}
              <div className="relative flex-1 w-full min-h-[360px] bg-slate-200">
                <iframe
                  title={`Carte Google Maps de ${activeSpot.name}`}
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "360px" }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-[20%] contrast-[1.05]"
                />

                {/* Badge superposé discret */}
                <div className="absolute bottom-3 left-3 bg-background/95 backdrop-blur-sm px-3 py-1.5 border-2 border-foreground text-[11px] font-black uppercase tracking-wider z-10 shadow-md">
                  📍 {activeSpot.address}
                </div>
              </div>

              {/* Footer de la carte avec infos du spot actif */}
              <div className="bg-background p-5 border-t-2 border-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display uppercase text-lg leading-tight text-foreground">
                      {activeSpot.name}
                    </span>
                    <span className="text-[10px] bg-secondary text-secondary-content font-bold px-1.5 py-0.5 rounded">
                      HOT SPOT
                    </span>
                  </div>
                  <p className="text-xs text-foreground/80 flex items-center gap-1.5">
                    <Clock size={13} className="text-primary" />
                    <span>Ouvert 7j/7 de 11h00 à 22h00</span>
                  </p>
                </div>

                <a
                  href={activeSpot.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-foreground text-background font-display text-sm uppercase hover:bg-primary hover:text-primary-content transition-colors brutalist-shadow-sm text-center"
                >
                  <span>OUVRIR DANS MAPS</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
