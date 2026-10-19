import { OrderData } from "./types";
import { deliveryZones, pickupSpots, formatPrice, BOBA_CONFIG } from "./data";

/**
 * Génère une référence de commande unique sous le format BOBA-XXXX (ex: BOBA-9432)
 */
export function generateOrderId(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `BOBA-${randomNum}`;
}

/**
 * Formate la date et l'heure en français pour le fuseau de Niamey (GMT+1)
 */
export function formatOrderDateTime(dateString?: string): string {
  try {
    const date = dateString ? new Date(dateString) : new Date();
    if (isNaN(date.getTime())) {
      return new Date().toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
    return date.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return new Date().toLocaleString("fr-FR");
  }
}

/**
 * Formate le message WhatsApp complet et professionnel pour l'équipe Boba Express Niamey
 */
export function formatWhatsAppMessage(order: OrderData): string {
  const dateTimeStr = formatOrderDateTime(order.createdAt);
  const refCode = order.orderId.startsWith("BOBA-") ? `#${order.orderId}` : `#BOBA-${order.orderId}`;

  // Récupération des informations de livraison ou retrait
  let deliverySection = "";
  if (order.deliveryMethod === "delivery") {
    const zone = deliveryZones.find((z) => z.id === order.deliveryZoneId);
    const zoneName = zone ? zone.name : (order.deliveryZoneId || "Niamey");
    const address = order.deliveryAddress?.trim() || "Non précisée";
    deliverySection = [
      "🛵 *MODE : LIVRAISON À DOMICILE*",
      `• *Quartier :* ${zoneName}`,
      `• *Adresse / Repère :* ${address}`,
      `• *Frais de livraison :* ${formatPrice(order.deliveryFee)}`,
    ].join("\n");
  } else {
    const spot = pickupSpots.find((s) => s.id === order.pickupSpotId);
    const spotName = spot ? spot.name : "Boba Express - Plateau";
    const spotAddress = spot ? `${spot.address} (${spot.landmark})` : "Plateau, Niamey";
    deliverySection = [
      "🏬 *MODE : RETRAIT EN BOUTIQUE*",
      `• *Spot sélectionné :* ${spotName}`,
      `• *Adresse :* ${spotAddress}`,
      `• *Frais de retrait :* Gratuit (0 FCFA)`,
    ].join("\n");
  }

  // Détail de chaque boisson
  const itemsSection = order.items
    .map((item, index) => {
      const sizeVolume = item.size.volume ? ` - ${item.size.volume}` : "";
      const toppingsText =
        item.toppings && item.toppings.length > 0
          ? item.toppings.map((t) => `${t.name} (+${t.price}F)`).join(", ")
          : "Sans";

      const lineTotal = item.unitPrice * item.quantity;

      return [
        `${index + 1}. *${item.quantity}x ${item.name}* (Taille ${item.size.id}${sizeVolume})`,
        `   • Sucre: ${item.sugar} | Glace: ${item.ice}`,
        `   • Toppings: ${toppingsText}`,
        `   • Prix unitaire: ${formatPrice(item.unitPrice)}`,
        `   • Total ligne: ${formatPrice(lineTotal)}`,
      ].join("\n");
    })
    .join("\n\n");

  // Notes client optionnelles
  const notesSection = order.landmarkNotes?.trim()
    ? `\n\n📝 *NOTES CLIENT*\n${order.landmarkNotes.trim()}`
    : "";

  // Construction du message final
  const message = [
    "🧋 *NOUVELLE COMMANDE - BOBA EXPRESS NIAMEY*",
    "━━━━━━━━━━━━━━━━━━━━",
    `🔖 *Référence :* ${refCode}`,
    `📅 *Date :* ${dateTimeStr}`,
    "",
    "👤 *INFORMATIONS CLIENT*",
    `• *Nom :* ${order.customerName}`,
    `• *Téléphone :* ${order.customerPhone}`,
    "",
    deliverySection,
    "",
    `🥤 *DÉTAIL DES BOISSONS (${order.items.reduce((acc, i) => acc + i.quantity, 0)})*`,
    "────────────────────",
    itemsSection,
    "",
    "💰 *TOTAL COMMANDE*",
    "━━━━━━━━━━━━━━━━━━━━",
    `• Sous-total : ${formatPrice(order.subtotal)}`,
    `• Frais de livraison : ${order.deliveryMethod === "delivery" ? formatPrice(order.deliveryFee) : "Gratuit (0 FCFA)"}`,
    order.discount > 0 ? `• Réduction : -${formatPrice(order.discount)}` : null,
    `👉 *TOTAL À RÉGLER : ${formatPrice(order.total)}*`,
    "💵 *Mode de règlement :* À la réception (Espèces / Airtel Money / Moov Money)",
    notesSection,
    "",
    "━━━━━━━━━━━━━━━━━━━━",
    "Merci de confirmer la prise en charge de ma commande ! 🚀",
  ]
    .filter((line) => line !== null)
    .join("\n");

  return message;
}

/**
 * Construit le lien direct wa.me vers le numéro WhatsApp de Boba Express
 */
export function getWhatsAppCheckoutUrl(
  order: OrderData,
  phoneNumber: string = BOBA_CONFIG.whatsappNumber
): string {
  const message = formatWhatsAppMessage(order);
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
