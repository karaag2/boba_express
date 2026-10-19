import {
  Category,
  Product,
  SizeOption,
  SugarLevel,
  IceLevel,
  Topping,
  PickupSpot,
  DeliveryZone
} from "./types";

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString("fr-FR")} FCFA`;
}

export const categories: Category[] = [
  { id: "all", name: "TOUT" },
  { id: "special", name: "SPÉCIAL BOBA" },
  { id: "milkshake", name: "MILKSHAKES" },
  { id: "smoothie", name: "SMOOTHIES" },
  { id: "the", name: "THÉS & CAFÉS" },
];

export const sizes: SizeOption[] = [
  { id: "M", name: "Moyen", volume: "500ml", extraPrice: 0 },
  { id: "L", name: "Large", volume: "700ml", extraPrice: 500 },
];

export const sugarLevels: SugarLevel[] = ["0%", "30%", "50%", "100%"];

export const iceLevels: IceLevel[] = ["Sans glace", "Peu de glace", "Normal"];

export const toppingsList: Topping[] = [
  { id: "tapioca", name: "Perles de Tapioca Artisanales", price: 500 },
  { id: "popping-mango", name: "Popping Boba Mangue", price: 500 },
  { id: "coco-jelly", name: "Gelée de Coco Cristalline", price: 500 },
  { id: "chantilly", name: "Chantilly Vanille Maison", price: 500 },
];

export const pickupSpots: PickupSpot[] = [
  {
    id: "plateau",
    name: "Boba Express - Plateau",
    address: "Avenue du Général de Gaulle, Plateau",
    landmark: "Face Ambassade de France & Ministère des Affaires Étrangères",
    openHours: "11h00 - 22h00",
    mapsUrl: "https://maps.google.com/?q=Plateau+Niamey",
    phone: "+227 77 39 41 65",
  },
  {
    id: "niamey-2000",
    name: "Boba Express - Niamey 2000",
    address: "Boulevard Tanimoune, Niamey 2000",
    landmark: "À 100m du Carrefour Station Oilibya",
    openHours: "11h00 - 22h00",
    mapsUrl: "https://maps.google.com/?q=Niamey+2000",
    phone: "+227 77 39 41 65",
  },
  {
    id: "nouveau-marche",
    name: "Boba Express - Nouveau Marché",
    address: "Zone Commerciale Grand Marché / Nouveau Marché",
    landmark: "Rond-Point Maourey, face Banque Atlantique",
    openHours: "11h00 - 22h00",
    mapsUrl: "https://maps.google.com/?q=Nouveau+Marche+Niamey",
    phone: "+227 77 39 41 65",
  },
  {
    id: "centre-aere",
    name: "Boba Express - Centre Aéré BCEAO",
    address: "Boulevard de la République",
    landmark: "Bord du fleuve Niger, près de l'Hôtel Bravia",
    openHours: "11h00 - 22h00",
    mapsUrl: "https://maps.google.com/?q=Centre+Aere+BCEAO+Niamey",
    phone: "+227 77 39 41 65",
  },
];

export const deliveryZones: DeliveryZone[] = [
  { id: "plateau", name: "Plateau", fee: 500, estimatedTime: "20-30 min" },
  { id: "yantala", name: "Yantala", fee: 1000, estimatedTime: "30-45 min" },
  { id: "niamey-2000", name: "Niamey 2000", fee: 1000, estimatedTime: "30-40 min" },
  { id: "koira-kano", name: "Koira Kano", fee: 1000, estimatedTime: "35-50 min" },
  { id: "francophonie", name: "Francophonie", fee: 1200, estimatedTime: "40-50 min" },
  { id: "koubia", name: "Koubia", fee: 1500, estimatedTime: "45-60 min" },
  { id: "aeroport", name: "Zone Aéroport", fee: 1500, estimatedTime: "45-60 min" },
];

export const products: Product[] = [
  // SPÉCIAL BOBA (4)
  {
    id: 1,
    slug: "matcha-latte-supreme",
    name: "Matcha Latté Supreme",
    price: 2500,
    tag: "Best-Seller",
    category: "special",
    color: "bg-primary/20",
    image: "/hero_master.jpg",
    description: "Le Matcha Latté Supreme est notre signature secrète. Un équilibre parfait entre le matcha premium et l'onctuosité du lait, avec nos perles de tapioca artisanales.",
    isAvailable: true,
  },
  {
    id: 2,
    slug: "taro-latte",
    name: "Taro Latté Royale",
    price: 2500,
    tag: "Unique",
    category: "special",
    color: "bg-purple-100",
    image: "/products/whisk/Whisk_b8bb1e5f7d5b1f3aa11456a67a556e31dr.jpeg",
    description: "Un voyage exotique avec le Taro Latté. Sa couleur violette naturelle et son goût biscuité en font l'un des favoris incontournables de Niamey.",
    isAvailable: true,
  },
  {
    id: 3,
    slug: "papaye-latte",
    name: "Papaye Latté Sahel",
    price: 2500,
    tag: "Local",
    category: "special",
    color: "bg-orange-100",
    image: "/products/whisk/Whisk_9df14184113915bbb4245297e737be93dr.jpeg",
    description: "Le mariage du soleil nigérien et de la culture Boba. La douceur de la papaye fraîche locale pour un rafraîchissement intense.",
    isAvailable: true,
  },
  {
    id: 4,
    slug: "brown-sugar-tiger-boba",
    name: "Brown Sugar Tiger Boba",
    price: 3000,
    tag: "Signature",
    category: "special",
    color: "bg-amber-100",
    image: "/products/whisk/Whisk_b6abbd94b53a5878efe42dad38b31a78dr.jpeg",
    description: "Sirop de sucre roux caramélisé cuit lentement, nappé contre les parois, servi avec un lait entier soyeux et nos perles chaudes de tapioca.",
    isAvailable: true,
  },

  // MILKSHAKES (4)
  {
    id: 5,
    slug: "milkshake-mina",
    name: "Milkshake Mina",
    price: 3000,
    tag: "Nouveauté",
    category: "milkshake",
    color: "bg-amber-50",
    image: "/products/whisk/Whisk_8aed87f8b2419f3829040a34b4670531dr.jpeg",
    description: "Gourmandise absolue. Le Milkshake Mina est une explosion de saveurs crémeuses, parfait pour les amateurs de douceurs à Niamey.",
    isAvailable: true,
  },
  {
    id: 6,
    slug: "shake-speculos",
    name: "Shake Spéculos Crunch",
    price: 2500,
    tag: "Gourmand",
    category: "milkshake",
    color: "bg-amber-100",
    image: "/products/whisk/Whisk_8f30c54e16da55fa0044b44fc8a4c140dr.jpeg",
    description: "Le craquant du biscuit spéculoos dans un milkshake glacé onctueux. Un grand classique revisité par le labo Boba Express.",
    isAvailable: true,
  },
  {
    id: 7,
    slug: "milkshake-vanille-doree",
    name: "Milkshake Vanille Dorée",
    price: 2500,
    tag: "Classique",
    category: "milkshake",
    color: "bg-yellow-50",
    image: "/products/milkshake_mina.jpg",
    description: "Crème glacée vanille bourbon fouettée au lait frais, surmontée d'un nuage de chantilly maison et de coulis doré.",
    isAvailable: true,
  },
  {
    id: 8,
    slug: "shake-choco-brownie",
    name: "Shake Choco Brownie",
    price: 3000,
    tag: "Intense",
    category: "milkshake",
    color: "bg-stone-200",
    image: "/products/whisk/Whisk_7370c1f045621e996244258587b68d9bdr.jpeg",
    description: "Cacao pur intense mixé avec des pépites fondantes de brownie maison. L'extase totale pour tous les amoureux de chocolat.",
    isAvailable: true,
  },

  // SMOOTHIES (4)
  {
    id: 9,
    slug: "smoothie-mangue-passion",
    name: "Smoothie Mangue Passion",
    price: 2500,
    tag: "Fruité",
    category: "smoothie",
    color: "bg-yellow-100",
    image: "/products/whisk/Whisk_974d7890caeaae496164cb1521c00ffadr.jpeg",
    description: "Mangues charnues du Niger mixées avec une touche de fruit de la passion acidulé. Un concentré de vitamines et d'énergie pure.",
    isAvailable: true,
  },
  {
    id: 10,
    slug: "smoothie-sahel-sunset",
    name: "Smoothie Sahel Sunset",
    price: 2500,
    tag: "Coup de Cœur",
    category: "smoothie",
    color: "bg-rose-100",
    image: "/products/whisk/Whisk_e30331d74c49100a858447f573a8115fdr.jpeg",
    description: "Un dégradé envoûtant d'agrumes, de fruits rouges et de papaye mûre évoquant le coucher de soleil sur les rives du fleuve Niger.",
    isAvailable: true,
  },
  {
    id: 11,
    slug: "smoothie-ananas-coco",
    name: "Smoothie Ananas Coco",
    price: 2500,
    tag: "Tropical",
    category: "smoothie",
    color: "bg-lime-50",
    image: "/products/whisk/Whisk_4e9067ebd8d4b66a22d435d661f13f8cdr.jpeg",
    description: "Ananas Victoria pressé minute, lait de coco soyeux et glace pilée pour une escapade rafraîchissante au cœur de la capitale.",
    isAvailable: true,
  },
  {
    id: 12,
    slug: "smoothie-baies-sauvages",
    name: "Smoothie Baies Rouges",
    price: 2800,
    tag: "Vitalité",
    category: "smoothie",
    color: "bg-red-50",
    image: "/products/whisk/Whisk_a818d87ba576d8c90714c5c2faa03a5edr.jpeg",
    description: "Mélange tonifiant de fraises, framboises et myrtilles sauvages, parfait pour une pause fraîcheur ultra légère.",
    isAvailable: true,
  },

  // THÉS & CAFÉS (4)
  {
    id: 13,
    slug: "the-glace-bissap-hibiscus",
    name: "Thé Glacé Bissap & Hibiscus",
    price: 2000,
    tag: "Tradition",
    category: "the",
    color: "bg-red-100",
    image: "/products/the_glace.jpg",
    description: "Infusion artisanale de fleurs d'hibiscus karkadé du Niger, menthe fraîche et citron vert. Le grand classique sahélien réinventé.",
    isAvailable: true,
  },
  {
    id: 14,
    slug: "the-vert-jasmin-menthe",
    name: "Thé Vert Jasmin Menthe",
    price: 2000,
    tag: "Désaltérant",
    category: "the",
    color: "bg-emerald-50",
    image: "/products/whisk/Whisk_ca2cbd0d738f0d7b219497b8cb3cdca9dr.jpeg",
    description: "Thé vert impérial délicatement parfumé aux fleurs de jasmin et feuilles de menthe pilées, servi très frais avec ou sans perles.",
    isAvailable: true,
  },
  {
    id: 15,
    slug: "cafe-latte-frappe-boba",
    name: "Café Latté Frappé Boba",
    price: 2500,
    tag: "Énergie",
    category: "the",
    color: "bg-stone-100",
    image: "/products/whisk/Whisk_ccf4bddf9427b0a84fc417d66816ed1ddr.jpeg",
    description: "Double shot d'espresso corsé frappé sur glace avec du lait crémeux et des perles de tapioca au caramel fondant.",
    isAvailable: true,
  },
  {
    id: 16,
    slug: "the-noir-peche-glacee",
    name: "Thé Noir Pêche Glacée",
    price: 2000,
    tag: "Best-Seller",
    category: "the",
    color: "bg-orange-50",
    image: "/products/whisk/Whisk_cdc564ec7cbb4caa2f4494b3e474596fdr.jpeg",
    description: "Thé noir de Ceylan infusé à froid, sublimé par un nectar de pêche juteuse. Frais, léger et intensément parfumé.",
    isAvailable: true,
  },
];

export const BOBA_CONFIG = {
  whatsappNumber: "+22777394165",
  whatsappDisplay: "+227 77 39 41 65",
  openingHour: 11,
  closingHour: 22,
  currency: "FCFA",
  city: "Niamey",
  country: "Niger",
};
