import React, { useState } from 'react';
import {
  MapPin,
  X,
  Check,
  Plus,
  Navigation,
  Compass,
  Building,
  Home
} from 'lucide-react';
import { useGasDeck } from '../../context/GasDeckContext';
import { DeliveryAddress } from '../../types';

export const LocationModal: React.FC = () => {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    activeAddress,
    setActiveAddress,
    allAddresses,
    addAddress,
    showToast,
  } = useGasDeck();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [streetAddress, setStreetAddress] = useState('');
  const [area, setArea] = useState('Alakahia, Port Harcourt');
  const [landmark, setLandmark] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  if (!isLocationModalOpen) return null;

  const handleSelectAddress = (addr: DeliveryAddress) => {
    setActiveAddress(addr);
    setIsLocationModalOpen(false);
    showToast(`Delivery location set to ${addr.streetAddress}`);
  };

  const handleAddNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!streetAddress) return;

    addAddress({
      label: 'Saved Address',
      streetAddress: streetAddress,
      area: area,
      state: 'Rivers State',
      landmark: landmark,
      deliveryNotes: deliveryNotes,
      latitude: 4.8967,
      longitude: 6.9242,
      isDefault: false,
    });

    setIsAddingNew(false);
    setIsLocationModalOpen(false);
  };

  const handleDetectGps = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      const gpsDetected: Omit<DeliveryAddress, 'id'> = {
        label: 'Current GPS Location',
        streetAddress: 'Plot 14 East-West Road, Alakahia',
        area: 'Alakahia, Port Harcourt',
        state: 'Rivers State',
        landmark: 'Near UPTH Emergency Gate',
        latitude: 4.8980,
        longitude: 6.9255,
        isDefault: false,
      };
      addAddress(gpsDetected);
      setIsLocationModalOpen(false);
      showToast('GPS coordinates locked to Alakahia, Rivers State (Accuracy: 5m)');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Delivery Address</h3>
              <p className="text-[11px] text-slate-500">Select where your cooking gas should be delivered</p>
            </div>
          </div>
          <button
            onClick={() => setIsLocationModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Detect Location Button */}
          <button
            onClick={handleDetectGps}
            disabled={isLocating}
            className="w-full py-3 px-4 rounded-2xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <Navigation className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Detecting GPS Satellite Fix...' : 'Use My Current GPS Location'}</span>
          </button>

          {!isAddingNew ? (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Saved Delivery Addresses:
              </span>

              {allAddresses.map((addr) => {
                const isSelected = activeAddress.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => handleSelectAddress(addr)}
                    className={`border-2 rounded-2xl p-3.5 cursor-pointer transition flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 shrink-0 mt-0.5">
                        <Home className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs text-slate-900">{addr.label}</span>
                          {addr.isDefault && (
                            <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-medium text-slate-800 block mt-0.5">
                          {addr.streetAddress}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {addr.area} {addr.landmark && `• ${addr.landmark}`}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>
                );
              })}

              <button
                type="button"
                onClick={() => setIsAddingNew(true)}
                className="w-full py-2.5 rounded-xl border border-dashed border-slate-300 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 text-xs font-semibold flex items-center justify-center gap-1 transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Another Delivery Address</span>
              </button>
            </div>
          ) : (
            /* Add new address form */
            <form onSubmit={handleAddNewSubmit} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-800">Add New Address:</span>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="text-xs text-slate-500 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">
                  Street Address &amp; House Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 15 Hospital Road"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">
                  Area / Neighborhood
                </label>
                <select
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white"
                >
                  <option value="Alakahia, Port Harcourt">Alakahia, Port Harcourt</option>
                  <option value="Choba, Port Harcourt">Choba, Port Harcourt</option>
                  <option value="Rumuekini Axis, Port Harcourt">Rumuekini Axis, Port Harcourt</option>
                  <option value="Rumuokoro, Port Harcourt">Rumuokoro, Port Harcourt</option>
                  <option value="GRA Phase 2, Port Harcourt">GRA Phase 2, Port Harcourt</option>
                  <option value="Lekki Phase 1, Lagos">Lekki Phase 1, Lagos</option>
                  <option value="Garki 2, Abuja">Garki 2, Abuja</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-medium text-slate-600 block mb-1">
                  Nearby Landmark (Crucial for dispatch rider)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Beside Police Post, Opposite First Bank ATM"
                  value={landmark}
                  onChange={(e) => setLandmark(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-600/20"
              >
                Save &amp; Select Address
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
