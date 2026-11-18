import React from 'react';
import { Flame, ShieldCheck, MapPin, Phone, Mail, CheckCircle, ExternalLink, Download } from 'lucide-react';
import { useGasDeck } from '../../context/GasDeckContext';
import { downloadProjectArchive } from '../../utils/zipExporter';

export const Footer: React.FC = () => {
  const { setCurrentView, setIsSafetyModalOpen } = useGasDeck();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-white">
                <Flame className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">Gas Deck</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Nigeria's on-demand cooking gas marketplace connecting households in Alakahia, Choba, and Port Harcourt with certified local LPG plants.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>NMDPRA Compliant Vendors</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentView('DASHBOARD')}
                  className="hover:text-white transition"
                >
                  Order Refill
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('DISCOVERY')}
                  className="hover:text-white transition"
                >
                  Find Nearby Plants
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('TRACKING')}
                  className="hover:text-white transition"
                >
                  Track Delivery
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('HISTORY')}
                  className="hover:text-white transition"
                >
                  Order Receipts &amp; History
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSafetyModalOpen(true)}
                  className="hover:text-white transition text-amber-400"
                >
                  Cylinder Safety Checklist
                </button>
              </li>
            </ul>
          </div>

          {/* Reference Areas */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Active Service Zones</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Alakahia Axis (UPTH / Blueberry)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Choba / Uniport Campus Axis</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Rumuekini / East-West Road</span>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                <span>Rumuokoro Junction Zone</span>
              </li>
            </ul>
          </div>

          {/* Developer / Project Handoff */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Phase 1 Handoff &amp; Source</h4>
            <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
              Full specification and video analysis document available. Complete codebase is packaged and exportable.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => setCurrentView('SPEC_PORTAL')}
                className="w-full py-1.5 px-3 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 transition"
              >
                <span>View Full Video Analysis Spec</span>
                <ExternalLink className="w-3 h-3 text-indigo-400" />
              </button>
              <button
                onClick={downloadProjectArchive}
                className="w-full py-1.5 px-3 rounded bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm"
              >
                <Download className="w-3 h-3" />
                <span>Download Source Archive (.zip)</span>
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Gas Deck Technologies Ltd. Built for Nigerian domestic clean energy access.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              Tare Weight Guaranteed
            </span>
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
              Soapy Water Valve Test on Arrival
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
