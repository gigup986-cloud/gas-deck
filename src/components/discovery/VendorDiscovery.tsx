import React, { useState } from 'react';
import {
  Flame,
  MapPin,
  Clock,
  Star,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Filter,
  Search,
  ArrowRight,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { useGasDeck } from '../../context/GasDeckContext';
import { GasVendor } from '../../types';

export const VendorDiscovery: React.FC = () => {
  const {
    vendors,
    selectedVendor,
    setSelectedVendor,
    activeAddress,
    setIsLocationModalOpen,
    setIsCheckoutModalOpen,
    setCurrentView,
  } = useGasDeck();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpenOnly, setFilterOpenOnly] = useState(true);
  const [filterSwapOnly, setFilterSwapOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'distance' | 'price' | 'rating'>('distance');
  const [activeModalVendor, setActiveModalVendor] = useState<GasVendor | null>(null);

  const filteredVendors = vendors
    .filter(v => {
      const matchesSearch = v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            v.area.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesOpen = !filterOpenOnly || v.isOpen;
      const matchesSwap = !filterSwapOnly || v.cylinderSwapAvailable;
      return matchesSearch && matchesOpen && matchesSwap;
    })
    .sort((a, b) => {
      if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
      if (sortBy === 'price') return a.pricePerKg - b.pricePerKg;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  const handleSelectVendorForOrder = (vendor: GasVendor) => {
    setSelectedVendor(vendor);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Header & Location Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        <div>
          <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 uppercase tracking-wider">
            Nearby LPG Stations
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Certified Gas Plants Near You
          </h2>
          <p className="text-xs text-slate-500">
            Real-time delivery estimates to <strong className="text-slate-800">{activeAddress.streetAddress}</strong>
          </p>
        </div>

        <button
          onClick={() => setIsLocationModalOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition self-start md:self-auto"
        >
          <MapPin className="w-4 h-4 text-rose-500" />
          <span>Change Location</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search plant or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-slate-50 text-slate-800"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterOpenOnly(!filterOpenOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
              filterOpenOnly
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-bold'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            Open Now Only
          </button>

          <button
            onClick={() => setFilterSwapOnly(!filterSwapOnly)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition ${
              filterSwapOnly
                ? 'bg-indigo-50 text-indigo-800 border-indigo-300 font-bold'
                : 'bg-white text-slate-600 border-slate-200'
            }`}
          >
            Cylinder Swap
          </button>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1.5 rounded-xl text-xs border border-slate-200 bg-white text-slate-700 font-medium focus:outline-hidden"
          >
            <option value="distance">Sort by: Nearest First</option>
            <option value="price">Sort by: Lowest Price / Kg</option>
            <option value="rating">Sort by: Top Rated</option>
          </select>
        </div>
      </div>

      {/* Vendor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVendors.map((vendor) => {
          const isSelected = selectedVendor?.id === vendor.id;
          return (
            <div
              key={vendor.id}
              className={`bg-white rounded-3xl border-2 p-5 shadow-xs transition flex flex-col justify-between ${
                isSelected ? 'border-indigo-600 ring-2 ring-indigo-500/20' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-orange-100 border border-orange-200 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">
                      <Flame className="w-6 h-6 text-orange-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 leading-snug">
                          {vendor.name}
                        </h3>
                        {vendor.isVerified && (
                          <span title="NMDPRA Verified Plant">
                            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 block">
                        {vendor.address}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                      vendor.isOpen
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {vendor.isOpen ? "Open" : "Closed"}
                  </span>
                </div>

                {/* Key Metrics Pill Bar */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-center text-xs mb-3">
                  <div className="bg-slate-50 rounded-xl p-2">
                    <span className="text-[10px] text-slate-400 block">Distance</span>
                    <span className="font-bold text-slate-800">{vendor.distanceKm} km away</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2">
                    <span className="text-[10px] text-slate-400 block">Price / Kg</span>
                    <span className="font-bold text-indigo-600 font-mono">₦{vendor.pricePerKg.toLocaleString()}</span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-2">
                    <span className="text-[10px] text-slate-400 block">Delivery Time</span>
                    <span className="font-bold text-slate-800">{vendor.deliveryTimeMin}</span>
                  </div>
                </div>

                {/* Badges / Extras */}
                <div className="flex flex-wrap gap-1.5 text-[11px] text-slate-600 mb-4">
                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                    <strong>{vendor.rating}</strong> ({vendor.reviewCount})
                  </span>
                  {vendor.cylinderSwapAvailable && (
                    <span className="bg-blue-50 text-blue-800 px-2 py-0.5 rounded-md border border-blue-200">
                      Swap Available
                    </span>
                  )}
                  <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-mono">
                    Delivery: ₦{vendor.deliveryFee.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalVendor(vendor)}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold text-center transition"
                >
                  View Details
                </button>
                <button
                  type="button"
                  disabled={!vendor.isOpen}
                  onClick={() => handleSelectVendorForOrder(vendor)}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold text-center transition flex items-center justify-center gap-1 ${
                    vendor.isOpen
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Select &amp; Order</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vendor Detail Modal if clicked */}
      {activeModalVendor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200 uppercase">
                  Plant Profile
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{activeModalVendor.name}</h3>
                <p className="text-xs text-slate-500">{activeModalVendor.address}, {activeModalVendor.area}</p>
              </div>
              <button
                onClick={() => setActiveModalVendor(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <div className="flex justify-between">
                <span className="text-slate-500">Regulatory License:</span>
                <span className="font-mono font-bold text-indigo-700">{activeModalVendor.nmdpraLicense}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tare Scale Calibration:</span>
                <span className="font-bold text-emerald-600">✓ Digital Certified</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Safety Rating:</span>
                <span className="font-bold text-slate-900">{activeModalVendor.safetyRating}% Leak-free Record</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Current Stock Capacity:</span>
                <span className="font-mono">{activeModalVendor.currentStockKg} kg LPG on site</span>
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => setActiveModalVendor(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleSelectVendorForOrder(activeModalVendor);
                  setActiveModalVendor(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-sm"
              >
                Order from this Plant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
