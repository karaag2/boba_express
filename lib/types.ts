export interface Category {
  id: 'all' | 'special' | 'milkshake' | 'smoothie' | 'the';
  name: string;
  icon?: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number; // en FCFA
  tag: string;
  category: 'special' | 'milkshake' | 'smoothie' | 'the';
  color: string;
  image: string;
  description: string;
  isAvailable?: boolean;
}

export interface SizeOption {
  id: 'M' | 'L';
  name: string;
  volume: string;
  extraPrice: number;
}

export type SugarLevel = '0%' | '30%' | '50%' | '100%';

export type IceLevel = 'Sans glace' | 'Peu de glace' | 'Normal';

export interface Topping {
  id: string;
  name: string;
  price: number;
}

export interface Customization {
  size: SizeOption;
  sugar: SugarLevel;
  ice: IceLevel;
  toppings: Topping[];
}

export interface CartItem {
  id: string;
  productId: number;
  name: string;
  basePrice: number;
  size: SizeOption;
  sugar: SugarLevel;
  ice: IceLevel;
  toppings: Topping[];
  unitPrice: number;
  quantity: number;
  image: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
  estimatedTime: string;
}

export interface PickupSpot {
  id: string;
  name: string;
  address: string;
  landmark: string;
  openHours: string;
  mapsUrl: string;
  phone: string;
}

export interface OrderData {
  orderId: string;
  customerName: string;
  customerPhone: string;
  deliveryMethod: 'pickup' | 'delivery';
  pickupSpotId?: string;
  deliveryZoneId?: string;
  deliveryAddress?: string;
  landmarkNotes?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  createdAt: string;
}
