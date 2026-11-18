import React from 'react';
import { Flame, Printer, X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { GasOrder } from '../../types';

interface ReceiptModalProps {
  order: GasOrder | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Actions header */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs">
          <span className="font-bold text-slate-700">Digital Tax Invoice</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Receipt Content */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-900 text-xs">
          {/* Logo & Header */}
          <div className="text-center space-y-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-indigo-600 flex items-center justify-center text-white mx-auto shadow-md">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-base font-black tracking-tight text-slate-900">Gas Deck Nigeria</h3>
            <p className="text-[10px] text-slate-500">Domestic Clean Energy Marketplace</p>
            <div className="font-mono text-xs font-bold text-indigo-700 pt-1">
              {order.orderCode}
            </div>
          </div>

          {/* Details Table */}
          <div className="border-t border-b border-dashed border-slate-300 py-3 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Date &amp; Time:</span>
              <span className="font-mono">{new Date(order.createdAt).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Customer:</span>
              <span className="font-medium">{order.customerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Customer Phone:</span>
              <span className="font-mono">{order.customerPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Plant Partner:</span>
              <span className="font-bold text-slate-900">{order.merchantName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Delivery Address:</span>
              <span className="text-right max-w-[200px] truncate">{order.deliveryAddress.streetAddress}</span>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-slate-700 pb-1 border-b border-slate-100">
              <span>Item Description</span>
              <span>Amount</span>
            </div>
            <div className="flex justify-between">
              <div>
                <span>{order.cylinderSizeKg} kg LPG Cooking Gas</span>
                <span className="text-[10px] text-slate-400 block">Calibrated digital scale tare</span>
              </div>
              <span className="font-mono font-medium">₦{order.gasAmountNaira.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Doorstep Delivery SLA (Alakahia)</span>
              <span className="font-mono font-medium">₦{order.deliveryFeeNaira.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Soapy Water Leak Safety Test</span>
              <span className="text-emerald-600 font-bold">₦0 (Included)</span>
            </div>

            <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-sm font-black">
              <span>Total Paid</span>
              <span className="text-base text-indigo-600 font-mono">₦{order.totalNaira.toLocaleString()}</span>
            </div>
          </div>

          {/* Payment & Security Footer */}
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-emerald-700 font-bold text-[11px]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{order.paymentStatus === 'PAID_ONLINE' ? 'Payment Verified (Online)' : 'Paid on Delivery'}</span>
            </div>
            <p className="text-[10px] text-slate-400">
              Handover PIN {order.completionPin} • Courier: {order.riderName || 'Godswill Tamuno'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
