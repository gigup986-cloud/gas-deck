export type UserRole = 'CUSTOMER' | 'MERCHANT' | 'ADMIN';

export interface User {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  savedAddresses: DeliveryAddress[];
  defaultAddressId?: string;
}

export interface DeliveryAddress {
  id: string;
  label: string; // e.g. "Home", "Office"
  streetAddress: string; // e.g. "24 Blueberry, Alakahia"
  area: string; // e.g. "Alakahia, Port Harcourt"
  state: string; // e.g. "Rivers State"
  landmark?: string; // e.g. "Near Uniport Delta Park gate"
  deliveryNotes?: string;
  latitude: number;
  longitude: number;
  isDefault: boolean;
}

export interface GasVendor {
  id: string;
  name: string; // e.g. "Son And Father Oil & Gas"
  logo?: string;
  coverImage?: string;
  address: string;
  area: string;
  distanceKm: number; // e.g. 1.4 km
  deliveryTimeMin: string; // e.g. "15 - 25 min"
  rating: number; // e.g. 4.8
  reviewCount: number;
  pricePerKg: number; // in Naira, e.g. 1480
  deliveryFee: number; // in Naira, e.g. 1500
  isOpen: boolean;
  isVerified: boolean;
  nmdpraLicense: string; // regulatory verification
  currentStockKg: number;
  phone: string;
  supportedSizes: number[]; // e.g. [3, 6, 12.5, 25, 50]
  cylinderSwapAvailable: boolean;
  acceptsPayOnDelivery: boolean;
  safetyRating: number; // e.g. 99%
}

export type OrderType = 'BY_WEIGHT' | 'BY_BUDGET';

export type PaymentMethod = 'ONLINE_CARD' | 'ONLINE_TRANSFER' | 'ONLINE_USSD' | 'PAY_ON_DELIVERY';

export type PaymentStatus = 'PAID_ONLINE' | 'PENDING_POD' | 'REFUNDED';

export type OrderStatus =
  | 'PENDING_MATCH'
  | 'NEW_REQUEST'
  | 'ACCEPTED'
  | 'FILLING'
  | 'IN_TRANSIT'
  | 'ARRIVED_SAFETY_TEST'
  | 'DELIVERED'
  | 'DECLINED'
  | 'CANCELLED';

export interface GasOrder {
  id: string;
  orderCode: string; // e.g. "#ORD-2048"
  customerId: string;
  customerName: string;
  customerPhone: string;
  merchantId: string;
  merchantName: string;
  cylinderSizeKg: number; // e.g. 12.5
  orderType: OrderType;
  gasAmountNaira: number; // e.g. 18500
  deliveryFeeNaira: number; // e.g. 1500
  serviceFeeNaira: number; // e.g. 0
  totalNaira: number; // e.g. 20000
  deliveryAddress: DeliveryAddress;
  deliveryInstructions?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  distanceKm: number;
  createdAt: string;
  estimatedDeliveryTime: string;
  completionPin: string; // e.g. "4829"
  riderName?: string;
  riderPhone?: string;
  riderVehicle?: string; // e.g. "Bajaj Tricycle (Keke) - PH-249-AB"
}

export interface RefillPreset {
  id: string;
  label: string;
  type: 'amount' | 'weight' | 'custom';
  value: number; // amount in ₦ or weight in kg
  displayTag: string;
}
