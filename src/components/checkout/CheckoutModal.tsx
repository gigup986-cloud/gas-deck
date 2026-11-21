import React, { useState, useEffect } from 'react';
import {
  Flame,
  MapPin,
  CreditCard,
  Banknote,
  ShieldCheck,
  CheckCircle2,
  X,
  ChevronRight,
  Info,
  Clock,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import { useGasDeck } from '../../context/GasDeckContext';
import { authService } from '../../services/authService';
import { PaymentMethod } from '../../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    selectedVendor,
    refillWeightKg,
    calculatedGasPrice,
    calculatedDeliveryFee,
    calculatedTotal,
    activeAddress,
    setIsLocationModalOpen,
    createOrder,
    user,
    setIsAuthModalOpen,
    setAuthModalMode,
    showToast,
  } = useGasDeck();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('ONLINE_CARD');
  const [deliveryInstructions, setDeliveryInstructions] = useState('Please perform soapy water leak test before cylinder handover.');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendOrderId, setBackendOrderId] = useState<string | null>(null);
  const [paymentAuthUrl, setPaymentAuthUrl] = useState<string | null>(null);

  if (!isCheckoutModalOpen) return null;

  useEffect(() => {
    if (paymentAuthUrl) {
      window.open(paymentAuthUrl, '_blank');
    }
  }, [paymentAuthUrl]);

  const placeOrderViaBackend = async (): Promise<{ success: boolean; orderId?: string; error?: string }> => {
    if (!user) return { success: false, error: 'Not authenticated' };

    try {
      // Ensure delivery address exists in backend
      let addressId = activeAddress.id;
      if (!addressId.startsWith('addr-')) {
        // Already a backend address ID
        addressId = activeAddress.id;
      } else {
        // Try to sync the address to backend
        try {
          const addrResp = await fetch(`${API_URL}/api/addresses`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${(await authService.getSession())?.access_token ?? ''}`,
            },
            body: JSON.stringify({
              label: activeAddress.label,
              streetAddress: activeAddress.streetAddress,
              area: activeAddress.area,
              state: activeAddress.state,
              landmark: activeAddress.landmark,
              deliveryNotes: activeAddress.deliveryNotes,
              latitude: activeAddress.latitude,
              longitude: activeAddress.longitude,
              isDefault: activeAddress.isDefault,
            }),
          });
          if (addrResp.ok) {
            const addrData = await addrResp.json();
            addressId = addrData.id;
          }
        } catch {
          // Address sync failed; will fall back to mock
        }
      }

      const orderResp = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${(await authService.getSession())?.access_token ?? ''}`,
        },
        body: JSON.stringify({
          vendorId: selectedVendor?.id || 'ven-son-and-father',
          orderType: refillWeightKg ? 'BY_WEIGHT' : 'BY_BUDGET',
          cylinderSizeKg: refillWeightKg || undefined,
          budgetNaira: refillWeightKg ? undefined : Math.round(calculatedGasPrice / 1480) * 1480,
          deliveryAddressId: addressId,
          deliveryInstructions,
          paymentMethod,
        }),
      });

      if (!orderResp.ok) {
        const errorBody = await orderResp.json().catch(() => ({}));
        return { success: false, error: errorBody.message || 'Order creation failed' };
      }

      const orderData = await orderResp.json();
      setBackendOrderId(orderData.order.id);

      if (paymentMethod === 'ONLINE_CARD') {
        const payResp = await fetch(`${API_URL}/api/payments/initialize`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${(await authService.getSession())?.access_token ?? ''}`,
          },
          body: JSON.stringify({
            reference: orderData.order.orderCode,
          }),
        });

        if (payResp.ok) {
          const payData = await payResp.json();
          setPaymentAuthUrl(payData.authorizationUrl);
        }
      }

      return { success: true, orderId: orderData.order.id };
    } catch (error: any) {
      return { success: false, error: error.message || 'Order creation failed' };
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      setIsCheckoutModalOpen(false);
      setAuthModalMode('REGISTER');
      setIsAuthModalOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await placeOrderViaBackend();
      if (result.success) {
        // Also update local context for UI consistency
        createOrder({
          vendor: selectedVendor || {
            id: 'ven-son-and-father',
            name: 'Son And Father Oil & Gas',
            distanceKm: 1.4,
            deliveryFee: 1500,
            pricePerKg: 1480,
            deliveryTimeMin: '15 - 25 min',
          } as any,
          weightKg: refillWeightKg,
          gasAmount: calculatedGasPrice,
          deliveryFee: calculatedDeliveryFee,
          paymentMethod: paymentMethod,
          deliveryAddress: activeAddress,
          deliveryInstructions: deliveryInstructions,
        });
        setIsCheckoutModalOpen(false);
        if (paymentMethod === 'ONLINE_CARD' && paymentAuthUrl) {
          // Paystack URL opened via useEffect
          showToast('Order created. Completing payment via Paystack...');
        } else {
          showToast('Order placed successfully!');
        }
      } else {
        // Fall back to mock order creation
        createOrder({
          vendor: selectedVendor || {
            id: 'ven-son-and-father',
            name: 'Son And Father Oil & Gas',
            distanceKm: 1.4,
            deliveryFee: 1500,
            pricePerKg: 1480,
            deliveryTimeMin: '15 - 25 min',
          } as any,
          weightKg: refillWeightKg,
          gasAmount: calculatedGasPrice,
          deliveryFee: calculatedDeliveryFee,
          paymentMethod: paymentMethod,
          deliveryAddress: activeAddress,
          deliveryInstructions: deliveryInstructions,
        });
        setIsCheckoutModalOpen(false);
        showToast(`Order placed (sandbox mode). ${result.error}`);
      }
    } catch {
      // Final fallback: mock order
      createOrder({
        vendor: selectedVendor || {
          id: 'ven-son-and-father',
          name: 'Son And Father Oil & Gas',
          distanceKm: 1.4,
          deliveryFee: 1500,
          pricePerKg: 1480,
          deliveryTimeMin: '15 - 25 min',
        } as any,
        weightKg: refillWeightKg,
        gasAmount: calculatedGasPrice,
        deliveryFee: calculatedDeliveryFee,
        paymentMethod: paymentMethod,
        deliveryAddress: activeAddress,
        deliveryInstructions: deliveryInstructions,
      });
      setIsCheckoutModalOpen(false);
      showToast('Order placed (sandbox mode).');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto max-h-[calc(100vh-2rem)]">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900">Checkout &amp; Delivery</h3>
            <p className="text-xs text-slate-500">Confirm order details &amp; payment method</p>
          </div>
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Station being dispatched */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Fulfilling Merchant</span>
                <span className="text-xs font-bold text-slate-900">{selectedVendor?.name || 'Son And Father Oil & Gas'}</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
              15 - 25 min SLA
            </span>
          </div>

          {/* Delivery Address Section */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Delivery Location:
              </label>
              <button
                type="button"
                onClick={() => {
                  setIsCheckoutModalOpen(false);
                  setIsLocationModalOpen(true);
                }}
                className="text-xs font-bold text-indigo-600 hover:underline"
              >
                Change
              </button>
            </div>

            <div className="border border-slate-200 rounded-2xl p-3.5 bg-white space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="font-bold text-xs text-slate-900">{activeAddress.streetAddress}</span>
              </div>
              <p className="text-[11px] text-slate-500 pl-6">
                {activeAddress.area}, {activeAddress.state} {activeAddress.landmark && `(${activeAddress.landmark})`}
              </p>
            </div>
          </div>

          {/* Delivery Instructions */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
              Doorstep Delivery Notes:
            </label>
            <input
              type="text"
              value={deliveryInstructions}
              onChange={(e) => setDeliveryInstructions(e.target.value)}
              placeholder="e.g. Call when outside the gate, 2nd floor flat"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Payment Method Selector (Scope item 9) */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Payment Method:
            </label>
            <div className="space-y-2.5">
              {/* Option A: Online Payment */}
              <div
                onClick={() => setPaymentMethod('ONLINE_CARD')}
                className={`border-2 rounded-2xl p-3.5 cursor-pointer transition ${
                  paymentMethod === 'ONLINE_CARD'
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">Pay Online</span>
                        <span className="text-[9px] font-bold bg-indigo-100 text-indigo-800 px-1.5 py-0.2 rounded">
                          Paystack / Flutterwave Sandbox
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        Debit Card, USSD, or Bank Transfer (Auto-verified)
                      </span>
                    </div>
                  </div>
                  {paymentMethod === 'ONLINE_CARD' && (
                    <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                  )}
                </div>
              </div>

              {/* Option B: Pay on Delivery */}
              <div
                onClick={() => setPaymentMethod('PAY_ON_DELIVERY')}
                className={`border-2 rounded-2xl p-3.5 cursor-pointer transition ${
                  paymentMethod === 'PAY_ON_DELIVERY'
                    ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <Banknote className="w-5 h-5 text-emerald-600" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900">Pay on Delivery</span>
                        <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">
                          Cash or POS
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        Pay the rider after doorstep cylinder inspection &amp; leak test
                      </span>
                    </div>
                  </div>
                  {paymentMethod === 'PAY_ON_DELIVERY' && (
                    <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      ✓
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Checkout Summary (Scope item 8) */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>LPG Content ({refillWeightKg} kg)</span>
              <span className="font-mono font-bold text-slate-900">₦{calculatedGasPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee (Alakahia Delivery SLA)</span>
              <span className="font-mono font-bold text-slate-900">₦{calculatedDeliveryFee.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Doorstep Soapy Water Test</span>
              <span className="font-bold text-emerald-600">Free</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-extrabold text-slate-900">
              <span>Total to Pay</span>
              <span className="text-lg font-black text-indigo-600 font-mono">
                ₦{calculatedTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Sandbox Notice per Boundary Guidelines */}
          <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-100 p-2.5 rounded-xl border border-slate-200">
            <Info className="w-4 h-4 text-slate-400 shrink-0" />
            <span>
              Phase 1 Sandbox mode: No real debit card will be charged. Clicking submit confirms your simulated order to Son And Father Oil &amp; Gas.
            </span>
          </div>

          {!user && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 space-y-1">
              <span className="text-xs font-bold text-amber-800 block">Registration Required</span>
              <span className="text-[10px] text-amber-700 block">
                Create an account or sign in to place your order. Your vendor, quantity, and delivery address will be saved.
              </span>
            </div>
          )}

          {/* Submit Action */}
          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-full text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/25 transition"
          >
            {isSubmitting ? (
              <span>Dispatching Order...</span>
            ) : (
              <>
                <span>Confirm &amp; Dispatch Order (₦{calculatedTotal.toLocaleString()})</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
