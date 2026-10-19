"use client";

import React, { useState } from "react";
import { Instagram, Facebook, ArrowRight, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useToast } from "@/lib/toast-context";
import InfoModal, { ModalType } from "./InfoModals";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const { showToast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      showToast("Veuillez saisir une adresse email valide", "error");
      return;
    }
    showToast("🎉 Bienvenue dans le Boba Club ! Ton drop secret t'attend.", "success");
    setEmail("");
  };

  return (
    <>
      <footer className="bg-[#0F172A] text-[#F5F5F0] pt-32 pb-12 px-6 overflow-hidden border-t-8 border-primary">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 mb-32 pb-20 border-b border-white/10">
            <div className="space-y-10">
              <h2 className="text-7xl md:text-[8rem] leading-[0.85] font-black font-display uppercase italic tracking-[0.05em]">
                STAY <br />
                <span className="text-primary not-italic">EXPRESS</span>
              </h2>
              <div className="space-y-6">
                <p className="text-2xl font-medium opacity-90 max-w-md">
                  Inscris-toi pour recevoir les drops secrets et les menus éphémères de la saison à Niamey.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row max-w-md group gap-2 sm:gap-0">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Adresse email pour la newsletter"
                    placeholder="TON EMAIL"
                    className="bg-white/5 border-2 border-white/20 px-8 py-5 flex-grow font-display text-2xl focus:outline-none focus:border-primary transition-colors text-white focus-visible:ring-2 focus-visible:ring-primary"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-[#0F172A] px-10 py-5 font-display text-2xl uppercase hover:bg-white transition-all flex items-center justify-center gap-3 brutalist-shadow-sm h-full focus-visible:ring-4 focus-visible:ring-secondary focus-visible:outline-none cursor-pointer"
                  >
                    OK <ArrowRight size={24} />
                  </button>
                </form>
              </div>
            </div>

            <div className="hidden lg:flex flex-col justify-end items-end relative">
              <div className="text-[25rem] font-black opacity-5 leading-none tracking-tighter select-none absolute -bottom-20 right-0">
                BOBA
              </div>
              <div className="z-10 p-12 bg-primary border-4 border-foreground brutalist-shadow rounded-3xl -rotate-3 hover:rotate-0 transition-transform duration-500 cursor-default">
                <span className="text-foreground font-display text-6xl block leading-none">
                  VIBE <br />
                  ONLY.
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary border-2 border-foreground rounded-xl flex items-center justify-center font-display text-3xl text-foreground font-black">
                  B
                </div>
                <span className="font-display text-3xl tracking-tighter uppercase font-black">
                  Boba Express
                </span>
              </div>
              <p className="opacity-70 font-medium text-lg leading-relaxed">
                Le premier concept de Bubble Tea urbain au Niger. Boba frais, Shakes & Authentic Vibes à Niamey.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com/boba.express_"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Boba Express"
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary hover:text-[#0F172A] hover:scale-110 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://wa.me/22777394165"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Boba Express"
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary hover:text-[#0F172A] hover:scale-110 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <MessageCircle size={24} />
                </a>
                <a
                  href="https://facebook.com/bobaexpressniamey"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Boba Express"
                  className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-primary hover:text-[#0F172A] hover:scale-110 transition-all focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
                >
                  <Facebook size={24} />
                </a>
              </div>
            </div>

            <div className="space-y-8">
              <h4 className="font-display text-2xl text-primary font-black uppercase italic tracking-widest">
                Navigation
              </h4>
              <ul className="space-y-4 text-xl font-medium opacity-70">
                <li className="hover:text-primary transition-colors cursor-pointer">
                  <a href="#menu" className="outline-none focus-visible:underline">
                    Le Menu
                  </a>
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  <a href="#locations" className="outline-none focus-visible:underline">
                    Nos Spots
                  </a>
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  <button
                    type="button"
                    onClick={() => setActiveModal("faq")}
                    className="outline-none hover:underline cursor-pointer"
                  >
                    Questions Fréquentes (FAQ)
                  </button>
                </li>
                <li className="hover:text-primary transition-colors cursor-pointer">
                  <a
                    href="https://wa.me/22777394165?text=Bonjour%20Boba%20Express,%20je%20souhaite%20rejoindre%20votre%20équipe%20à%20Niamey%20!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="outline-none focus-visible:underline"
                  >
                    Rejoindre la Team
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-display text-2xl text-primary font-black uppercase italic tracking-widest">
                Contact Direct
              </h4>
              <ul className="space-y-4 text-lg font-medium opacity-75">
                <li className="flex items-center gap-4 hover:opacity-100 transition-opacity">
                  <MapPin size={20} className="text-secondary shrink-0" />
                  <span>Plateau & Yantala, Niamey</span>
                </li>
                <li className="flex items-center gap-4 hover:opacity-100 transition-opacity">
                  <Phone size={20} className="text-secondary shrink-0" />
                  <a href="tel:+22777394165" className="hover:text-primary transition-colors">
                    +227 77 39 41 65
                  </a>
                </li>
                <li className="flex items-center gap-4 hover:opacity-100 transition-opacity">
                  <MessageCircle size={20} className="text-primary shrink-0" />
                  <a
                    href="https://wa.me/22777394165"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    WhatsApp Barista (+227 77 39 41 65)
                  </a>
                </li>
                <li className="flex items-center gap-4 hover:opacity-100 transition-opacity">
                  <Mail size={20} className="text-secondary shrink-0" />
                  <a href="mailto:hello@bobaexpress.ne" className="hover:text-primary transition-colors">
                    hello@bobaexpress.ne
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-display text-2xl text-primary font-black uppercase italic tracking-widest">
                Horaires d&apos;Ouverture
              </h4>
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl space-y-4">
                <div className="flex justify-between items-center">
                  <span className="opacity-50">Lun - Dim</span>
                  <span className="font-bold">11:00 - 22:00</span>
                </div>
                <div className="flex justify-between items-center text-primary">
                  <span className="opacity-80">Week-ends</span>
                  <span className="font-black">Service continu</span>
                </div>
                <div className="pt-4 border-t border-white/10 text-center">
                  <span className="text-xs font-black uppercase tracking-widest text-[#A3FF47]">
                    ⚡️ LIVRAISON EN 30 MIN
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10 opacity-60 text-xs font-black tracking-[0.2em] gap-8">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <p>© 2026 BOBA EXPRESS NIAMEY. TOUS DROITS RÉSERVÉS.</p>
              <a
                href="https://www.linkedin.com/in/amos-issa-yonli-953826298"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors border-b border-transparent hover:border-primary"
              >
                SITE PAR AMOS ISSA
              </a>
            </div>
            <div className="flex gap-8">
              <button
                type="button"
                onClick={() => setActiveModal("privacy")}
                className="hover:text-primary transition-colors uppercase cursor-pointer"
              >
                CONFIDENTIALITÉ
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("terms")}
                className="hover:text-primary transition-colors uppercase cursor-pointer"
              >
                CGV
              </button>
              <button
                type="button"
                onClick={() => setActiveModal("legal")}
                className="hover:text-primary transition-colors uppercase cursor-pointer"
              >
                MENTIONS
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals d'informations */}
      <InfoModal
        type={activeModal}
        isOpen={activeModal !== null}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
}
