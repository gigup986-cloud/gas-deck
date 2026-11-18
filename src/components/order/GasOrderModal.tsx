import React, { useState } from 'react';
import {
  Flame,
  Scale,
  CreditCard,
  X,
  ChevronRight,
  Info,
  Check,
  RotateCw,
  Truck
} from 'lucide-react';
import { useGasDeck } from '../../context/GasDeckContext';

export const GasOrderModal: React.FC = () => {
  const {
    isOrderModalOpen,
    setIsOrderModalOpen,
    selectedVendor,
    refillWeightKg,
    setRefillWeightKg,
    refillBudgetNaira,
    setRefillBudgetNaira,
    refillMode,
    setRefillMode,
    setSelectedPreset,
    setIsCheckoutModalOpen,
  } = useGasDeck();

  const [fulfillmentType, setFulfillmentType] = useState<'REFILL' | 'SWAP'>('REFILL');
  const pricePerKg = selectedVendor?.pricePerKg || 1480;
  const deliveryFee = selectedVendor?.deliveryFee || 1500;

  if (!isOrderModalOpen) return null;

  // Calculations
  const calculatedGas = refillMode === 'BY_WEIGHT'
    ? Math.round(refillWeightKg * pricePerKg)
    : refillBudgetNaira;

  const calculatedEquivalentKg = refillMode === 'BY_WEIGHT'
    ? refillWeightKg
    : Math.round((refillBudgetNaira / pricePerKg) * 10) / 10;

  const totalNaira = calculatedGas + deliveryFee;

  const standardWeights = [3, 6, 12.5, 25, 50];
  const standardBudgets = [5000, 8500, 10000, 15000, 18500, 20000];

  const handleProceedToCheckout = () => {
    setIsOrderModalOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Custom Gas Order</h3>
              <p className="text-[11px] text-slate-500">
                Fulfilling via: <strong className="text-slate-800">{selectedVendor?.name}</strong> (₦{pricePerKg}/kg)
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOrderModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-6">
          {/* Mode Switcher: By Weight (Kg) vs By Budget (₦) */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Order Specification Method:
            </label>
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-2xl">
              <button
                type="button"
                onClick={() => {
                  setRefillMode('BY_WEIGHT');
                  setSelectedPreset('custom');
                }}
                className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  refillMode === 'BY_WEIGHT'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>By Kilograms (Kg)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRefillMode('BY_BUDGET');
                  setSelectedPreset('custom');
                }}
                className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                  refillMode === 'BY_BUDGET'
                    ? 'bg-white text-indigo-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>By Budget Amount (₦)</span>
              </button>
            </div>
          </div>

          {/* Mode 1: By Weight */}
          {refillMode === 'BY_WEIGHT' ? (
            <div className="space-y-4">
              <span className="text-xs font-semibold text-slate-700 block">
                Standard Cylinder Weight Presets:
              </span>
              <div className="grid grid-cols-5 gap-2">
                {standardWeights.map((kg) => (
                  <button
                    key={kg}
                    type="button"
                    onClick={() => {
                      setRefillWeightKg(kg);
                      setSelectedPreset(kg === 12.5 ? '12' : 'custom');
                    }}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                      refillWeightKg === kg
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {kg} kg
                  </button>
                ))}
              </div>

              {/* Precise input / stepper */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Exact Cylinder Weight:</span>
                  <span className="text-[10px] text-slate-500">Includes 3kg to 50kg tanks</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setRefillWeightKg(Math.max(1, Math.round((refillWeightKg - 0.5) * 10) / 10))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 text-sm hover:bg-slate-100"
                  >
                    -
                  </button>
                  <span className="font-mono font-black text-indigo-700 text-base w-16 text-center">
                    {refillWeightKg} kg
                  </span>
                  <button
                    type="button"
                    onClick={() => setRefillWeightKg(Math.min(100, Math.round((refillWeightKg + 0.5) * 10) / 10))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 font-bold text-slate-700 text-sm hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Mode 2: By Budget */
            <div className="space-y-4">
              <span className="text-xs font-semibold text-slate-700 block">
                Quick Naira Budget Presets:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {standardBudgets.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setRefillBudgetNaira(amt);
                      setSelectedPreset(amt === 8500 ? '8500' : 'custom');
                    }}
                    className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                      refillBudgetNaira === amt
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    ₦{amt.toLocaleString()}
                  </button>
                ))}
              </div>

              {/* Custom amount input */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <label className="text-xs font-bold text-slate-800 block mb-1">
                  Custom Naira Budget:
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400 font-bold text-xs">₦</span>
                  <input
                    type="number"
                    step="500"
                    min="1000"
                    max="100000"
                    value={refillBudgetNaira}
                    onChange={(e) => setRefillBudgetNaira(parseInt(e.target.value) || 0)}
                    className="w-full pl-8 pr-3 py-2 text-xs font-mono font-bold rounded-xl border border-slate-300 bg-white"
                  />
                </div>
                <div className="text-[11px] text-indigo-700 font-semibold mt-1.5">
                  Approx. {calculatedEquivalentKg} kg of LPG at current station rate.
                </div>
              </div>
            </div>
          )}

          {/* Fulfillment Type: Refill vs Swap */}
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Fulfillment Type:
            </span>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setFulfillmentType('REFILL')}
                className={`border rounded-2xl p-3 cursor-pointer transition ${
                  fulfillmentType === 'REFILL'
                    ? 'border-indigo-600 bg-indigo-50/50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="font-bold text-xs text-slate-900">Standard Refill</div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Rider picks up your empty cylinder, fills it at the plant, and returns it.
                </p>
              </div>

              <div
                onClick={() => setFulfillmentType('SWAP')}
                className={`border rounded-2xl p-3 cursor-pointer transition ${
                  fulfillmentType === 'SWAP'
                    ? 'border-indigo-600 bg-indigo-50/50'
                    : 'border-slate-200 bg-white'
                }`}
              >
                <div className="font-bold text-xs text-slate-900">Instant Swap</div>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Rider swaps your empty cylinder for a pre-filled certified tank (15–25m delivery).
                </p>
              </div>
            </div>
          </div>

          {/* Summary Box */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-1.5 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Gas content</span>
              <span className="font-mono font-bold text-slate-900">₦{calculatedGas.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery fee ({selectedVendor?.distanceKm || 1.4} km away)</span>
              <span className="font-mono font-bold text-slate-900">₦{deliveryFee.toLocaleString()}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-extrabold text-slate-900">
              <span>Total Amount</span>
              <span className="text-base text-indigo-600 font-mono">₦{totalNaira.toLocaleString()}</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleProceedToCheckout}
            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/25 transition"
          >
            <span>Proceed to Checkout</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
