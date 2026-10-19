"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, HelpCircle, ShieldCheck, FileText } from "lucide-react";

export type ModalType = "faq" | "privacy" | "terms" | "legal" | null;

interface InfoModalProps {
  type: ModalType;
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({ type, isOpen, onClose }: InfoModalProps) {
  if (!isOpen || !type) return null;

  const contentMap = {
    faq: {
      title: "QUESTIONS FRÉQUENTES (FAQ)",
      icon: HelpCircle,
      sections: [
        {
          q: "Comment sont fabriquées vos perles de tapioca ?",
          a: "Nos perles de tapioca sont cuites chaque matin de façon artisanale dans nos ateliers à Niamey à base de farine de manioc pure et de sucre roux caramélisé, garantissant une texture 'chewy' (boba) ultra fraîche."
        },
        {
          q: "Comment se passe la confirmation de commande sur WhatsApp ?",
          a: "Dès que vous validez votre panier sur le site, votre bon de commande complet est automatiquement généré et transmis au barman Boba Express sur WhatsApp. Notre équipe vous répond immédiatement pour confirmer le délai et lancer la préparation."
        },
        {
          q: "Quels sont les délais et zones de livraison à Niamey ?",
          a: "Nous livrons dans les quartiers de Plateau, Yantala, Niamey 2000, Koira Kano, Francophonie, Koubia et Aéroport. Les délais varient de 25 à 45 minutes selon votre secteur. Les frais de livraison sont calculés automatiquement (500F à 1500F)."
        },
        {
          q: "Quels modes de paiement acceptez-vous ?",
          a: "Nous acceptons les espèces à la livraison ou au retrait, ainsi que les règlements par Mobile Money (Airtel Money et Moov Money)."
        },
        {
          q: "Faites-vous des prestations pour événements (mariages, anniversaires) ?",
          a: "Oui ! Nous installons notre Boba Bar mobile pour vos événements privés et d'entreprise à Niamey. Contactez-nous par WhatsApp ou téléphone au +227 77 39 41 65."
        }
      ]
    },
    privacy: {
      title: "POLITIQUE DE CONFIDENTIALITÉ",
      icon: ShieldCheck,
      sections: [
        {
          q: "Collecte de données minimale",
          a: "Boba Express Niamey ne collecte que les informations strictement nécessaires au traitement de vos commandes (nom, numéro de téléphone, quartier de livraison). Aucune donnée n'est cédée à des tiers."
        },
        {
          q: "Stockage du panier",
          a: "Votre panier d'achats est sauvegardé localement sur votre appareil (LocalStorage) pour vous permettre de reprendre votre commande à tout moment sans créer de compte obligatoire."
        },
        {
          q: "Communications",
          a: "Nous utilisons WhatsApp uniquement pour le suivi de votre commande en direct et l'envoi d'offres exclusives si vous avez rejoint notre club fidélité."
        }
      ]
    },
    terms: {
      title: "CONDITIONS GÉNÉRALES DE VENTE",
      icon: FileText,
      sections: [
        {
          q: "Commandes & Préparation",
          a: "Les boissons étant personnalisées et préparées à la demande avec des produits frais, toute commande confirmée sur WhatsApp est immédiatement mise en préparation."
        },
        {
          q: "Tarification",
          a: "Tous les prix indiqués sur le site sont en Francs CFA (XOF) toutes taxes comprises. Les frais de livraison sont affichés en toute transparence avant confirmation."
        },
        {
          q: "Retrait en boutique (Click & Collect)",
          a: "Vos boissons sont conservées au frais dans le spot choisi (Plateau, Niamey 2000, Nouveau Marché ou Centre Aéré) jusqu'à votre arrivée."
        }
      ]
    },
    legal: {
      title: "MENTIONS LÉGALES",
      icon: FileText,
      sections: [
        {
          q: "Éditeur du service",
          a: "Boba Express SARL — Niamey, République du Niger. Registre du Commerce et du Crédit Mobilier (RCCM) : NE-NIA-2024-B-0000. Numéro d'Identification Fiscale (NIF) : 000000/N."
        },
        {
          q: "Siège & Exploitation",
          a: "Avenue du Plateau, Niamey, Niger. Contact : hello@bobaexpress.ne / +227 77 39 41 65."
        },
        {
          q: "Conception & Réalisation",
          a: "Plateforme web et expérience digitale conçues pour Boba Express Niamey."
        }
      ]
    }
  };

  const current = contentMap[type];
  const Icon = current.icon;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[85vh] bg-background border-4 border-foreground brutalist-shadow overflow-hidden flex flex-col z-10"
        >
          {/* Header */}
          <div className="bg-primary text-primary-content p-6 border-b-4 border-foreground flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon size={24} className="shrink-0" />
              <h2 className="font-display text-2xl md:text-3xl uppercase tracking-wider font-black">
                {current.title}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-background text-foreground border-2 border-foreground brutalist-shadow-sm hover:scale-105 transition-transform"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1">
            {current.sections.map((sec, idx) => (
              <div key={idx} className="p-5 bg-muted border-2 border-foreground brutalist-shadow-sm space-y-2">
                <h3 className="font-display text-xl uppercase text-foreground font-black">
                  {sec.q}
                </h3>
                <p className="font-sans text-sm md:text-base text-foreground/85 leading-relaxed font-medium">
                  {sec.a}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="p-4 bg-muted border-t-2 border-foreground flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-foreground text-background px-8 py-3 font-display text-lg uppercase brutalist-shadow-sm hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
            >
              COMPRIS
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
