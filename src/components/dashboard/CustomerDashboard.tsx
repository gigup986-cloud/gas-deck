import React, { useState } from 'react';
import {
  Flame,
  MapPin,
  Clock,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  RotateCcw,
  Bell,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  ChevronDown,
  Info,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { useGasDeck } from '../../context/GasDeckContext';

export const CustomerDashboard: React.FC = () => {
  const {
    user,
    activeAddress,
    setIsLocationModalOpen,
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
    reorderPrevious,
    setCurrentView,
    setIsCheckoutModalOpen,
    setIsOrderModalOpen,
    setIsSafetyModalOpen,
    showToast,
  } = useGasDeck();

  // Find previous refill order matching video: Son And Father Oil & Gas
  const lastRefillOrder = orders.find(o => o.merchantName.includes('Son And Father')) || orders[1] || orders[0];

  // Preset click handler matching video
  const handlePresetSelect = (presetKey: string) => {
    setSelectedPreset(presetKey);
    if (presetKey === '8500') {
      setRefillMode('BY_BUDGET');
      setRefillBudgetNaira(8500);
      setRefillWeightKg(Math.round((8500 / 1480) * 10) / 10); // ~5.7 kg
    } else if (presetKey === '12') {
      setRefillMode('BY_WEIGHT');
      setRefillWeightKg(12.5); // 12.5 kg standard cylinder
      setRefillBudgetNaira(18500); // 12.5 * 1480 = 18,500 exactly
    } else {
      // Custom mode
      setIsOrderModalOpen(true);
    }
  };

  const handleFindGasMerchant = () => {
    // Open checkout / discovery
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Active Order Live Banner if an order is active */}
      {activeOrder && activeOrder.status !== 'DELIVERED' && activeOrder.status !== 'CANCELLED' && (
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-2xl p-4 shadow-lg border border-indigo-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-indigo-300 animate-spin" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono text-indigo-300">
                  {activeOrder.orderCode}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {activeOrder.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {activeOrder.cylinderSizeKg} kg LPG refill from <strong>{activeOrder.merchantName}</strong>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-white/10 px-2.5 py-1 rounded-lg text-amber-300 border border-white/10">
              PIN: {activeOrder.completionPin}
            </span>
            <button
              onClick={() => setCurrentView('TRACKING')}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1"
            >
              <span>Track Live</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Mobile/Tablet Mockup Framing (Preserving Video Authority) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Top Header: Avatar, Greeting, Notification Bell (Verified in Video 00:01-00:03) */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white font-bold text-sm flex items-center justify-center shadow-sm">
              {user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('') : 'EZ'}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Hi, {user ? user.fullName.split(' ')[0] : 'Ezekiel'} 👋
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Cooking gas on-demand • Fast doorstep delivery
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('All notifications are up to date.')}
              className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 relative transition"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>
          </div>
        </div>

        {/* Location Selector Bar (Verified in Video: "24 Blueberry, Alakahia") */}
        <div
          onClick={() => setIsLocationModalOpen(true)}
          className="flex items-center justify-between bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-2xl p-3 cursor-pointer transition"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Delivery Address
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                {activeAddress.streetAddress}
              </span>
              <span className="text-[11px] text-slate-500 block">
                {activeAddress.area}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-indigo-600">
            <span>Change</span>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* HERO CARD: "Running low?" (Verified in Video 00:01 – 00:03) */}
        <div className="bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-3xl p-5 sm:p-7 border border-indigo-100 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Running low?
              </h3>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-100/70 border border-amber-200/80 px-2.5 py-1 rounded-full mt-1.5">
                <span>⚡ 15 - 25 min delivery time</span>
              </div>
            </div>

            {/* Cylinder graphic asset matching video */}
            <div className="w-16 h-16 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-600 shadow-inner shrink-0 self-end sm:self-auto">
              <div className="relative">
                <Flame className="w-8 h-8 text-orange-500 animate-pulse" />
                <span className="absolute -bottom-1 -right-1 text-[9px] font-black bg-orange-600 text-white px-1 rounded-xs">
                  LPG
                </span>
              </div>
            </div>
          </div>

          {/* Quick Refill Presets (Verified in Video: ₦8,500 / 12 kg / Custom) */}
          <div className="space-y-1.5 mb-5">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
              Quick Select Refill Option:
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              {/* Preset 1: ₦8,500 */}
              <button
                type="button"
                onClick={() => handlePresetSelect('8500')}
                className={`py-3 px-2 rounded-2xl text-center transition border font-bold text-xs sm:text-sm ${
                  selectedPreset === '8500'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                ₦8,500
                <span className="block text-[10px] font-normal opacity-80">Budget</span>
              </button>

              {/* Preset 2: 12 kg (or 12.5 kg cylinder) */}
              <button
                type="button"
                onClick={() => handlePresetSelect('12')}
                className={`py-3 px-2 rounded-2xl text-center transition border font-bold text-xs sm:text-sm ${
                  selectedPreset === '12'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                12 kg
                <span className="block text-[10px] font-normal opacity-80">Standard Tank</span>
              </button>

              {/* Preset 3: Custom (Purple Highlighted in Video) */}
              <button
                type="button"
                onClick={() => handlePresetSelect('custom')}
                className={`py-3 px-2 rounded-2xl text-center transition border font-bold text-xs sm:text-sm ${
                  selectedPreset === 'custom'
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/20'
                    : 'bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}
              >
                Custom
                <span className="block text-[10px] font-normal opacity-80">Choose Kg / ₦</span>
              </button>
            </div>
          </div>

          {/* Transparent Cost Breakdown (Verified in Video: ₦18,500 + ₦1,500 = ₦20,000) */}
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-slate-200/80 mb-5 space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-slate-600">
              <span className="flex items-center gap-1.5">
                <span>Gas refill</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  ({refillMode === 'BY_WEIGHT' ? `${refillWeightKg} kg @ ₦1,480/kg` : 'Fixed Budget'})
                </span>
              </span>
              <span className="font-mono font-semibold text-slate-800">
                ₦{calculatedGasPrice.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span className="flex items-center gap-1.5">
                <span>Delivery fee</span>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded">
                  Flat rate
                </span>
              </span>
              <span className="font-mono font-semibold text-slate-800">
                ₦{calculatedDeliveryFee.toLocaleString()}
              </span>
            </div>

            <div className="border-t border-slate-100 pt-2 flex justify-between items-center text-sm">
              <span className="font-bold text-slate-900">Total</span>
              <span className="text-lg font-black text-indigo-600 font-mono">
                ₦{calculatedTotal.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Primary CTA (Verified in Video: "Find my gas merchant") */}
          <button
            onClick={handleFindGasMerchant}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-extrabold rounded-full text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
          >
            <span>Find my gas merchant</span>
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Selected Gas Plant Spotlight (Directly matches Son And Father Oil & Gas from Video) */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">
              <Flame className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-xs sm:text-sm text-slate-900">
                  {selectedVendor?.name || 'Son And Father Oil & Gas'}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                  Open
                </span>
              </div>
              <span className="text-[11px] text-slate-500 block">
                {selectedVendor?.distanceKm || 1.4} km away • ⭐ {selectedVendor?.rating || 4.9} ({selectedVendor?.reviewCount || 342} reviews) • Calibrated Scales
              </span>
            </div>
          </div>

          <button
            onClick={() => setCurrentView('DISCOVERY')}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 self-end sm:self-auto"
          >
            Change Plant →
          </button>
        </div>

        {/* "Your last refill" Section (Verified in Video 00:01 – 00:03) */}
        {lastRefillOrder && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide">
                Your last refill
              </h4>
              <button
                onClick={() => setCurrentView('HISTORY')}
                className="text-xs font-semibold text-indigo-600 hover:underline"
              >
                View all orders
              </button>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-300 transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">
                    {lastRefillOrder.cylinderSizeKg} kg | Full refill
                  </div>
                  <div className="text-[11px] text-slate-500">
                    14 Oct • {lastRefillOrder.merchantName}
                  </div>
                  <div className="text-xs font-bold font-mono text-slate-900 mt-0.5">
                    ₦{lastRefillOrder.gasAmountNaira.toLocaleString()}
                  </div>
                </div>
              </div>

              <button
                onClick={() => reorderPrevious(lastRefillOrder)}
                className="px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl text-xs border border-indigo-200 transition self-start sm:self-auto"
              >
                Reorder
              </button>
            </div>
          </div>
        )}

        {/* Safety & Service Guarantee Footer Card */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs text-emerald-900">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold block text-emerald-950">
                Doorstep Soapy Water Leak Test Included Free
              </span>
              <span className="text-[11px] text-emerald-800/80">
                Every delivery rider carries certified test solution to verify cylinder valve integrity.
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsSafetyModalOpen(true)}
            className="text-[11px] font-bold text-emerald-800 underline hover:text-emerald-950 shrink-0"
          >
            Safety Guide
          </button>
        </div>
      </div>
    </div>
  );
};
