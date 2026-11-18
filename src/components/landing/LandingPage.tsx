import React, { useState } from 'react';
import {
  Flame,
  Clock,
  ShieldCheck,
  Scale,
  MapPin,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
  Truck,
  Sparkles,
  ArrowRight,
  PhoneCall,
  Lock,
  ThumbsUp
} from 'lucide-react';
import { useGasDeck } from '../../context/GasDeckContext';

export const LandingPage: React.FC = () => {
  const { setCurrentView, setIsAuthModalOpen, setAuthModalMode, setIsOrderModalOpen } = useGasDeck();

  const [calculatorKg, setCalculatorKg] = useState(12.5);
  const estimatedPrice = Math.round(calculatorKg * 1480);
  const estimatedDelivery = 1500;
  const estimatedTotal = estimatedPrice + estimatedDelivery;

  return (
    <div className="space-y-16 py-6 sm:py-10">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-800 text-xs font-bold border border-orange-200">
              <Flame className="w-4 h-4 text-orange-600 animate-pulse" />
              <span>Nigeria's Cooking Gas Marketplace • 15–25 Min Delivery</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              A warmer welcome to effortless cooking gas delivery.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Stop carrying heavy gas cylinders under the hot sun. <strong>Gas Deck</strong> connects your home in Alakahia, Choba, and Port Harcourt with certified local retail plants for calibrated, safe, doorstep refills in minutes.
            </p>

            {/* Main CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => setCurrentView('DASHBOARD')}
                className="px-6 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-full text-sm sm:text-base shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2 transition"
              >
                <span>Order Cooking Gas Now</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentView('DISCOVERY')}
                className="px-6 py-4 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-full text-sm sm:text-base border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition"
              >
                <span>Explore Nearby Gas Plants</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-200 text-xs">
              <div>
                <span className="text-lg font-black text-indigo-600 block">15–25m</span>
                <span className="text-slate-500">Average Delivery SLA</span>
              </div>
              <div>
                <span className="text-lg font-black text-emerald-600 block">100%</span>
                <span className="text-slate-500">Calibrated Scale Tare</span>
              </div>
              <div>
                <span className="text-lg font-black text-amber-600 block">Free</span>
                <span className="text-slate-500">Doorstep Leak Testing</span>
              </div>
            </div>
          </div>

          {/* Right: Live Interactive Price Calculator Mockup */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl p-6 sm:p-7 relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-sm text-slate-900 block">Instant Price Estimator</span>
                    <span className="text-[10px] text-slate-400">Based on Son And Father Oil &amp; Gas (₦1,480/kg)</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Live Rate
                </span>
              </div>

              {/* Slider for Kg */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-700">Cylinder Weight (Kg)</span>
                  <span className="text-base font-black text-indigo-600 font-mono">{calculatorKg} kg</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="50"
                  step="0.5"
                  value={calculatorKg}
                  onChange={(e) => setCalculatorKg(parseFloat(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>3 kg</span>
                  <span>6 kg</span>
                  <span>12.5 kg</span>
                  <span>25 kg</span>
                  <span>50 kg</span>
                </div>
              </div>

              {/* Price Breakdown Container */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs mb-5">
                <div className="flex justify-between text-slate-600">
                  <span>LPG Content ({calculatorKg} kg @ ₦1,480)</span>
                  <span className="font-mono font-bold text-slate-800">₦{estimatedPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Standard Delivery Fee</span>
                  <span className="font-mono font-bold text-slate-800">₦{estimatedDelivery.toLocaleString()}</span>
                </div>
                <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm">
                  <span className="font-extrabold text-slate-900">Total Delivery Price</span>
                  <span className="text-lg font-black text-indigo-600 font-mono">
                    ₦{estimatedTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setCurrentView('DASHBOARD')}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-indigo-600/25 transition"
              >
                <span>Proceed to Order ({calculatorKg} kg)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* HOW GAS DECK WORKS (4-Step Flow) */}
      <section className="bg-slate-100/70 border-y border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              How Gas Deck Works
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              From low gas flame to fully filled and safety-tested cylinder in 4 effortless steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-black text-sm flex items-center justify-center mb-4">
                01
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                Set Delivery Address
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Confirm your street address or landmark (e.g. 24 Blueberry, Alakahia) so nearby open plants find you.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-black text-sm flex items-center justify-center mb-4">
                02
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-indigo-600" />
                Choose Kg or ₦ Budget
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Order by exact kilogram (3kg, 6kg, 12.5kg, 25kg, 50kg) or input a custom Naira amount like ₦8,500.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-black text-sm flex items-center justify-center mb-4">
                03
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-500" />
                15–25 Min Dispatch
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Your order is routed to open verified plants like Son And Father Oil &amp; Gas for instant filling and tricycle dispatch.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs relative">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 font-black text-sm flex items-center justify-center mb-4">
                04
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                Doorstep Leak Check
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                The rider carries soapy water solution, tests your cylinder valve on arrival, and verifies your 4-digit PIN.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY NIGERIAN HOUSEHOLDS CHOOSE GAS DECK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Zero Shortchanging Guarantee
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                All partnered stations utilize digital calibrated platform scales. The empty tare weight is subtracted to ensure you receive 100% of the gas paid for.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                NMDPRA Safety Standards
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We only onboard plants with verified regulatory safety permits and trained handlers following Nigerian LPG safety protocols.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900 mb-1">
                Flexible Payment Options
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pay online via secure card, USSD, or direct bank transfer, or choose Pay-on-Delivery (Cash / POS) at your doorstep.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to refill your gas cylinder?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
              Join thousands of households across Alakahia, Choba, and Port Harcourt who never run out of cooking gas.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('DASHBOARD')}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-full text-sm shadow-xl shadow-indigo-600/30 transition shrink-0"
          >
            Start Refill Now →
          </button>
        </div>
      </section>
    </div>
  );
};
