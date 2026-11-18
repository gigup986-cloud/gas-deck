import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, GasVendor, GasOrder, DeliveryAddress, RefillPreset, PaymentMethod } from '../types';
import { INITIAL_USER, MOCK_VENDORS, INITIAL_ORDERS } from '../data/mockData';

interface GasDeckContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  activeAddress: DeliveryAddress;
  setActiveAddress: (addr: DeliveryAddress) => void;
  allAddresses: DeliveryAddress[];
  addAddress: (addr: Omit<DeliveryAddress, 'id'>) => void;
  vendors: GasVendor[];
  selectedVendor: GasVendor | null;
  setSelectedVendor: (v: GasVendor | null) => void;
  // Refill Order Builder state
  refillWeightKg: number;
  setRefillWeightKg: (kg: number) => void;
  refillBudgetNaira: number;
  setRefillBudgetNaira: (naira: number) => void;
  refillMode: 'BY_WEIGHT' | 'BY_BUDGET';
  setRefillMode: (mode: 'BY_WEIGHT' | 'BY_BUDGET') => void;
  selectedPreset: string; // '8500' | '12' | 'custom'
  setSelectedPreset: (p: string) => void;
  calculatedGasPrice: number;
  calculatedDeliveryFee: number;
  calculatedTotal: number;
  // Orders
  orders: GasOrder[];
  activeOrder: GasOrder | null;
  setActiveOrder: (order: GasOrder | null) => void;
  createOrder: (payload: {
    vendor: GasVendor;
    weightKg: number;
    gasAmount: number;
    deliveryFee: number;
    paymentMethod: PaymentMethod;
    deliveryAddress: DeliveryAddress;
    deliveryInstructions?: string;
  }) => GasOrder;
  advanceOrderStatus: (orderId: string) => void;
  cancelOrder: (orderId: string) => void;
  reorderPrevious: (previousOrder: GasOrder) => void;
  // Global View Navigation
  currentView: 'LANDING' | 'DASHBOARD' | 'DISCOVERY' | 'TRACKING' | 'HISTORY' | 'SPEC_PORTAL';
  setCurrentView: (view: 'LANDING' | 'DASHBOARD' | 'DISCOVERY' | 'TRACKING' | 'HISTORY' | 'SPEC_PORTAL') => void;
  // Modals
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'LOGIN' | 'REGISTER';
  setAuthModalMode: (mode: 'LOGIN' | 'REGISTER') => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  isOrderModalOpen: boolean;
  setIsOrderModalOpen: (open: boolean) => void;
  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;
  isSafetyModalOpen: boolean;
  setIsSafetyModalOpen: (open: boolean) => void;
  // Notification Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const GasDeckContext = createContext<GasDeckContextType | undefined>(undefined);

export const GasDeckProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('gasdeck_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [allAddresses, setAllAddresses] = useState<DeliveryAddress[]>(() => {
    return user ? user.savedAddresses : INITIAL_USER.savedAddresses;
  });

  const [activeAddress, setActiveAddress] = useState<DeliveryAddress>(() => {
    return allAddresses[0] || INITIAL_USER.savedAddresses[0];
  });

  const [vendors] = useState<GasVendor[]>(MOCK_VENDORS);
  const [selectedVendor, setSelectedVendor] = useState<GasVendor | null>(MOCK_VENDORS[0]); // Son And Father Oil & Gas

  // Refill Builder defaults matching video:
  // Video shows 12 kg preset or ₦8,500 preset, total ₦20,000 (18,500 + 1,500)
  const [selectedPreset, setSelectedPreset] = useState<string>('12');
  const [refillMode, setRefillMode] = useState<'BY_WEIGHT' | 'BY_BUDGET'>('BY_WEIGHT');
  const [refillWeightKg, setRefillWeightKg] = useState<number>(12.5);
  const [refillBudgetNaira, setRefillBudgetNaira] = useState<number>(18500);

  // Orders State
  const [orders, setOrders] = useState<GasOrder[]>(() => {
    const saved = localStorage.getItem('gasdeck_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [activeOrder, setActiveOrder] = useState<GasOrder | null>(() => {
    return orders.find(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED') || orders[0] || null;
  });

  // Current view
  const [currentView, setCurrentView] = useState<'LANDING' | 'DASHBOARD' | 'DISCOVERY' | 'TRACKING' | 'HISTORY' | 'SPEC_PORTAL'>('DASHBOARD');

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'LOGIN' | 'REGISTER'>('REGISTER');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSafetyModalOpen, setIsSafetyModalOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync user state to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('gasdeck_user', JSON.stringify(user));
    }
  }, [user]);

  // Sync orders to localStorage
  useEffect(() => {
    localStorage.setItem('gasdeck_orders', JSON.stringify(orders));
  }, [orders]);

  // Dynamic price calculation
  const currentPricePerKg = selectedVendor?.pricePerKg || 1480;
  const calculatedDeliveryFee = selectedVendor?.deliveryFee || 1500;

  let calculatedGasPrice = 18500;
  if (refillMode === 'BY_WEIGHT') {
    calculatedGasPrice = Math.round(refillWeightKg * currentPricePerKg);
  } else {
    calculatedGasPrice = refillBudgetNaira;
  }
  const calculatedTotal = calculatedGasPrice + calculatedDeliveryFee;

  // Add address
  const addAddress = (newAddr: Omit<DeliveryAddress, 'id'>) => {
    const created: DeliveryAddress = {
      ...newAddr,
      id: `addr-${Date.now()}`,
    };
    const updated = [created, ...allAddresses];
    setAllAddresses(updated);
    setActiveAddress(created);
    if (user) {
      setUser({
        ...user,
        savedAddresses: updated,
      });
    }
    showToast(`Delivery location updated to ${created.streetAddress}`);
  };

  // Create new order
  const createOrder = (payload: {
    vendor: GasVendor;
    weightKg: number;
    gasAmount: number;
    deliveryFee: number;
    paymentMethod: PaymentMethod;
    deliveryAddress: DeliveryAddress;
    deliveryInstructions?: string;
  }): GasOrder => {
    const orderNumber = Math.floor(2050 + Math.random() * 500);
    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    const newOrder: GasOrder = {
      id: `ord-${orderNumber}`,
      orderCode: `#ORD-${orderNumber}`,
      customerId: user?.id || 'usr-guest',
      customerName: user?.fullName || 'Amina Bello',
      customerPhone: user?.phoneNumber || '+234 801 234 5678',
      merchantId: payload.vendor.id,
      merchantName: payload.vendor.name,
      cylinderSizeKg: payload.weightKg,
      orderType: refillMode,
      gasAmountNaira: payload.gasAmount,
      deliveryFeeNaira: payload.deliveryFee,
      serviceFeeNaira: 0,
      totalNaira: payload.gasAmount + payload.deliveryFee,
      deliveryAddress: payload.deliveryAddress,
      deliveryInstructions: payload.deliveryInstructions,
      paymentMethod: payload.paymentMethod,
      paymentStatus: payload.paymentMethod === 'PAY_ON_DELIVERY' ? 'PENDING_POD' : 'PAID_ONLINE',
      status: 'ACCEPTED',
      distanceKm: payload.vendor.distanceKm,
      createdAt: new Date().toISOString(),
      estimatedDeliveryTime: payload.vendor.deliveryTimeMin,
      completionPin: pin,
      riderName: 'Godswill Tamuno',
      riderPhone: '+234 803 987 6543',
      riderVehicle: 'Bajaj Tricycle (Keke) • PH-249-AB',
    };

    const updated = [newOrder, ...orders];
    setOrders(updated);
    setActiveOrder(newOrder);
    setCurrentView('TRACKING');
    showToast(`Order ${newOrder.orderCode} sent to ${payload.vendor.name}!`);
    return newOrder;
  };

  // Advance order status for testing & review
  const advanceOrderStatus = (orderId: string) => {
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) return;

    const currentOrder = orders[orderIndex];
    let nextStatus: GasOrder['status'] = 'ACCEPTED';

    if (currentOrder.status === 'ACCEPTED') nextStatus = 'FILLING';
    else if (currentOrder.status === 'FILLING') nextStatus = 'IN_TRANSIT';
    else if (currentOrder.status === 'IN_TRANSIT') nextStatus = 'ARRIVED_SAFETY_TEST';
    else if (currentOrder.status === 'ARRIVED_SAFETY_TEST') nextStatus = 'DELIVERED';
    else return;

    const updatedOrder: GasOrder = {
      ...currentOrder,
      status: nextStatus,
    };

    const updatedOrders = [...orders];
    updatedOrders[orderIndex] = updatedOrder;
    setOrders(updatedOrders);
    if (activeOrder?.id === orderId) {
      setActiveOrder(updatedOrder);
    }

    showToast(`Status updated: ${nextStatus.replace('_', ' ')}`);
  };

  // Cancel order
  const cancelOrder = (orderId: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status: 'CANCELLED' as const } : o))
    );
    if (activeOrder?.id === orderId) {
      setActiveOrder(null);
    }
    showToast(`Order cancelled.`);
  };

  // Reorder previous
  const reorderPrevious = (previousOrder: GasOrder) => {
    const matchedVendor = vendors.find(v => v.id === previousOrder.merchantId) || vendors[0];
    setSelectedVendor(matchedVendor);
    setRefillWeightKg(previousOrder.cylinderSizeKg);
    setRefillMode('BY_WEIGHT');
    setSelectedPreset(previousOrder.cylinderSizeKg === 12.5 ? '12' : 'custom');
    setIsCheckoutModalOpen(true);
  };

  return (
    <GasDeckContext.Provider
      value={{
        user,
        setUser,
        activeAddress,
        setActiveAddress,
        allAddresses,
        addAddress,
        vendors,
        selectedVendor,
        setSelectedVendor,
        refillWeightKg,
        setRefillWeightKg,
        refillBudgetNaira,
        setRefillBudgetNaira,
        refillMode,
        setRefillMode,
        selectedPreset,
        setSelectedPreset,
        calculatedGasPrice,
        calculatedDeliveryFee,
        calculatedTotal,
        orders,
        activeOrder,
        setActiveOrder,
        createOrder,
        advanceOrderStatus,
        cancelOrder,
        reorderPrevious,
        currentView,
        setCurrentView,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
        isLocationModalOpen,
        setIsLocationModalOpen,
        isOrderModalOpen,
        setIsOrderModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        isSafetyModalOpen,
        setIsSafetyModalOpen,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </GasDeckContext.Provider>
  );
};

export const useGasDeck = () => {
  const context = useContext(GasDeckContext);
  if (!context) {
    throw new Error('useGasDeck must be used within a GasDeckProvider');
  }
  return context;
};
