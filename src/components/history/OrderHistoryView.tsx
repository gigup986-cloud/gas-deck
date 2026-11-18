import React, { useState } from 'react';
import {
  FileText,
  RotateCcw,
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronRight,
  Flame,
  ArrowRight
} from 'lucide-react';
import { useGasDeck } from '../../context/GasDeckContext';
import { GasOrder } from '../../types';
import { ReceiptModal } from './ReceiptModal';

export const OrderHistoryView: React.FC = () => {
  const { orders, reorderPrevious, setCurrentView, setActiveOrder } = useGasDeck();
  const [selectedReceiptOrder, setSelectedReceiptOrder] = useState<GasOrder | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Order History &amp; Receipts
          </h2>
          <p className="text-xs text-slate-500">
            View completed refills, track ongoing deliveries, and print tax receipts.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('DASHBOARD')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition self-start sm:self-auto"
        >
          + New Refill Order
        </button>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => {
          const isDelivered = order.status === 'DELIVERED';
          const isInProgress = !isDelivered && order.status !== 'CANCELLED';

          return (
            <div
              key={order.id}
              className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                    isDelivered ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                  }`}
                >
                  {isDelivered ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5 animate-pulse" />}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900">
                      {order.orderCode}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isDelivered
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {order.status.replace('_', ' ')}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      • {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900">
                    {order.cylinderSizeKg} kg LPG Refill • {order.merchantName}
                  </h4>

                  <p className="text-xs text-slate-500">
                    Delivered to: {order.deliveryAddress.streetAddress}
                  </p>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="flex items-center justify-between md:justify-end gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-slate-400 block">Total Amount</span>
                  <span className="text-base font-black text-slate-900 font-mono">
                    ₦{order.totalNaira.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedReceiptOrder(order)}
                    className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-semibold"
                    title="View Receipt"
                  >
                    <FileText className="w-4 h-4" />
                  </button>

                  {isInProgress ? (
                    <button
                      onClick={() => {
                        setActiveOrder(order);
                        setCurrentView('TRACKING');
                      }}
                      className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
                    >
                      Track Live →
                    </button>
                  ) : (
                    <button
                      onClick={() => reorderPrevious(order)}
                      className="inline-flex items-center gap-1 px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-xl text-xs font-bold border border-indigo-200 transition"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for Receipt */}
      <ReceiptModal
        order={selectedReceiptOrder}
        onClose={() => setSelectedReceiptOrder(null)}
      />
    </div>
  );
};
