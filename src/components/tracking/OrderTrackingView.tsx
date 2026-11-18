import React from 'react';
import {
  Flame,
  Clock,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Phone,
  Truck,
  RotateCw,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useGasDeck } from '../../context/GasDeckContext';
import { GasOrder } from '../../types';

export const OrderTrackingView: React.FC = () => {
  const { activeOrder, advanceOrderStatus, cancelOrder, setCurrentView, showToast } = useGasDeck();

  if (!activeOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
          <Clock className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">No Active Order in Transit</h3>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          You don't have any active gas refills currently on the road. Need a cylinder refilled?
        </p>
        <button
          onClick={() => setCurrentView('DASHBOARD')}
          className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-sm"
        >
          Order Cooking Gas Now
        </button>
      </div>
    );
  }

  const steps = [
    { key: 'ACCEPTED', label: 'Order Accepted', desc: `By ${activeOrder.merchantName}` },
    { key: 'FILLING', label: 'Cylinder Filling & Calibration', desc: 'Calibrated tare scale test' },
    { key: 'IN_TRANSIT', label: 'Dispatch Rider En Route', desc: activeOrder.riderVehicle || 'Tricycle dispatch' },
    { key: 'ARRIVED_SAFETY_TEST', label: 'Doorstep Valve Leak Check', desc: 'Soapy water inspection' },
    { key: 'DELIVERED', label: 'Delivered & Completed', desc: 'PIN verified' },
  ];

  const getStepIndex = (status: GasOrder['status']) => {
    switch (status) {
      case 'NEW_REQUEST':
      case 'ACCEPTED':
        return 0;
      case 'FILLING':
        return 1;
      case 'IN_TRANSIT':
        return 2;
      case 'ARRIVED_SAFETY_TEST':
        return 3;
      case 'DELIVERED':
        return 4;
      default:
        return 0;
    }
  };

  const currentStepIdx = getStepIndex(activeOrder.status);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Back button */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentView('DASHBOARD')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        {/* Demo Advance Control */}
        <div className="flex items-center gap-2">
          {activeOrder.status !== 'DELIVERED' && (
            <button
              onClick={() => advanceOrderStatus(activeOrder.id)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition shadow-2xs"
              title="Simulator: Progress to next delivery step"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Simulate Next Step →</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Order Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-black text-base text-indigo-600">
                {activeOrder.orderCode}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                {activeOrder.paymentStatus === 'PAID_ONLINE' ? '✓ Paid Online' : 'Pay on Delivery'}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {activeOrder.cylinderSizeKg} kg LPG refill from <strong>{activeOrder.merchantName}</strong>
            </p>
          </div>

          {/* Doorstep Verification PIN */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 text-right self-start sm:self-auto">
            <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
              Doorstep Handover PIN
            </span>
            <span className="font-mono text-xl font-black text-amber-950 tracking-widest block">
              {activeOrder.completionPin}
            </span>
            <span className="text-[9px] text-amber-700">Give to rider after leak test</span>
          </div>
        </div>

        {/* Live Delivery Status Stepper */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Live Dispatch Progress:
          </h4>

          <div className="space-y-4 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {steps.map((step, idx) => {
              const isCompleted = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={step.key} className="relative pl-9 flex items-start justify-between">
                  {/* Indicator Dot */}
                  <div
                    className={`absolute left-1.5 top-0.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition ${
                      isCompleted
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : isCurrent
                        ? 'bg-indigo-600 border-white ring-4 ring-indigo-100'
                        : 'bg-white border-slate-300'
                    }`}
                  ></div>

                  <div>
                    <h5
                      className={`text-xs font-bold ${
                        isCurrent
                          ? 'text-indigo-700'
                          : isCompleted
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {step.label}
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">{step.desc}</p>
                  </div>

                  {isCurrent && (
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2 py-0.5 rounded-full shrink-0 animate-pulse">
                      In Progress
                    </span>
                  )}
                  {isCompleted && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0">
                      Completed ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Assigned Dispatch Rider Info */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Assigned Delivery Courier
              </span>
              <h5 className="font-bold text-xs sm:text-sm text-slate-900">
                {activeOrder.riderName || 'Godswill Tamuno'}
              </h5>
              <span className="text-[11px] text-slate-500 block">
                {activeOrder.riderVehicle || 'Bajaj Tricycle • PH-249-AB'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${activeOrder.riderPhone || '+2348039876543'}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-2xs"
            >
              <Phone className="w-3.5 h-3.5 text-indigo-600" />
              <span>Call Rider</span>
            </a>
          </div>
        </div>

        {/* Order Breakdown */}
        <div className="border-t border-slate-100 pt-4 text-xs space-y-1.5">
          <div className="flex justify-between text-slate-600">
            <span>Delivery Address</span>
            <span className="font-medium text-slate-800 text-right">{activeOrder.deliveryAddress.streetAddress}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Gas Amount</span>
            <span className="font-mono text-slate-800">₦{activeOrder.gasAmountNaira.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Delivery Fee</span>
            <span className="font-mono text-slate-800">₦{activeOrder.deliveryFeeNaira.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-extrabold text-slate-900 pt-1 text-sm">
            <span>Total Paid</span>
            <span className="text-indigo-600 font-mono">₦{activeOrder.totalNaira.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Button */}
        {activeOrder.status === 'DELIVERED' ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
            <h5 className="font-bold text-sm text-emerald-950">Refill Successfully Delivered!</h5>
            <p className="text-xs text-emerald-800/80">
              Leak test verified. Thank you for refueling with Son And Father Oil &amp; Gas.
            </p>
            <button
              onClick={() => setCurrentView('HISTORY')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm"
            >
              View Receipt &amp; Order History
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center pt-2">
            <button
              onClick={() => cancelOrder(activeOrder.id)}
              className="text-xs font-semibold text-rose-600 hover:underline"
            >
              Cancel Order
            </button>
            <span className="text-[11px] text-slate-400">
              Estimated Arrival: {activeOrder.estimatedDeliveryTime}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
