export interface LatLng {
  lat: number;
  lng: number;
}

export interface VerifiedCustomerUser {
  id: string;
  email: string;
  name: string;
  phone?: string;
  picture?: string;
  emailVerified: boolean;
  provider?: 'google' | 'credentials';
  role: 'customer';
}

export interface AuthSession {
  user: VerifiedCustomerUser;
  token: string;
  refreshToken?: string;
  expiresAt?: string;
}

export interface OtpDeliveryMetadata {
  deliveryMode: 'demo-simulated' | 'smtp';
  expiresAt: string;
  simulatedNotice: string;
  demoOtp?: string;
}

export interface GasPlant {
  id: string;
  name: string;
  address: string;
  location: LatLng;
  distanceKm: number;
  rating?: number;
  userRatingCount?: number;
  openNow?: boolean;
  businessStatus?: string;
  googleMapsUri?: string;
  source?: 'google_places';
  isGasDeckVerified?: boolean;
}

export interface SelectedLocationState {
  coords: LatLng;
  label: string;
  source: 'gps' | 'manual-search' | 'city-preset';
  accuracyMeters: number | null;
}

export interface RouteSummary {
  distanceMeters: number;
  durationMillis: number;
  calculationSource?: 'maps-js-routes' | 'server-routes-api';
}

export type OrderStatus = 'draft' | 'awaiting_payment' | 'paid' | 'cancelled';
export type OrderPaymentStatus = 'unpaid' | 'pending' | 'paid' | 'failed';

export interface PersistedOrderRecord {
  id: string;
  customerId: string;
  plantPlaceId: string;
  plantName: string;
  plantAddress: string;
  plantLat: number;
  plantLng: number;
  plantSource: 'google_places';
  isGasDeckVerified: false;
  deliveryLat: number;
  deliveryLng: number;
  deliveryLocationLabel: string;
  deliveryLocationSource: string;
  deliveryStreet: string;
  contactPhone: string;
  deliveryNotes?: string;
  orderType: 'refill' | 'new-cylinder';
  cylinderSizeKg: '3' | '6' | '12.5' | '25' | '50';
  quantity: number;
  straightLineDistanceKm: number;
  routeDistanceMeters?: number;
  routeDurationSeconds?: number;
  estimatedSubtotalNgn: number;
  estimatedDeliveryFeeNgn: number;
  estimatedTotalNgn: number;
  status: OrderStatus;
  paymentStatus: OrderPaymentStatus;
  paymentProvider?: string;
  paymentReference?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentTransactionRecord {
  id: string;
  orderId: string;
  customerId: string;
  provider: 'paystack' | 'paystack_demo_mock';
  reference: string;
  idempotencyKey?: string;
  amountKobo: number;
  currency: string;
  status: 'initialized' | 'pending' | 'success' | 'failed' | 'abandoned';
  authorizationUrl?: string;
  gatewayResponse?: string;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDraftDetails {
  orderType: 'refill' | 'new-cylinder';
  cylinderSizeKg: '3' | '6' | '12.5' | '25' | '50';
  quantity: number;
  deliveryStreet: string;
  contactPhone: string;
  deliveryNotes: string;
  savedOrder?: PersistedOrderRecord;
  persistenceMode?: 'postgresql' | 'sqlite-local';
}

export interface CustomerJourneyState {
  permissionState: 'idle' | 'requesting' | 'granted' | 'denied' | 'unsupported';
  selectedLocation: SelectedLocationState | null;
  plants: GasPlant[];
  selectedCandidatePlant: GasPlant | null;
  confirmedPlant: {
    plant: GasPlant;
    routeSummary: RouteSummary | null;
  } | null;
  orderDraft: OrderDraftDetails;
}

export function createInitialJourneyState(defaultPhone = ''): CustomerJourneyState {
  return {
    permissionState: 'idle',
    selectedLocation: null,
    plants: [],
    selectedCandidatePlant: null,
    confirmedPlant: null,
    orderDraft: {
      orderType: 'refill',
      cylinderSizeKg: '12.5',
      quantity: 1,
      deliveryStreet: '',
      contactPhone: defaultPhone,
      deliveryNotes: '',
    },
  };
}
