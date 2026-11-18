import React from 'react';
import { ShieldCheck, X, AlertTriangle, CheckCircle2, Flame, Droplets } from 'lucide-react';
import { useGasDeck } from '../../context/GasDeckContext';

export const SafetyModal: React.FC = () => {
  const { isSafetyModalOpen, setIsSafetyModalOpen } = useGasDeck();

  if (!isSafetyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-emerald-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">Doorstep LPG Safety Protocol</h3>
              <p className="text-[11px] text-emerald-800">Standard operating procedure for all Gas Deck deliveries</p>
            </div>
          </div>
          <button
            onClick={() => setIsSafetyModalOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-700">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
            <Droplets className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-amber-900 mb-0.5">Free Doorstep Soapy Water Test</h4>
              <p className="text-[11px] text-amber-800/90 leading-relaxed">
                Before releasing your 4-digit confirmation PIN to the dispatch courier, the rider will apply soapy water solution around the cylinder valve and regulator spindle. If growing bubbles appear, the cylinder is instantly rejected and replaced at zero cost.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Upright Vertical Placement Only:</strong>
                <span className="text-slate-500">Never transport or store gas cylinders lying on their side. Ensure well-ventilated location outside kitchen cabinets.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Digital Tare Weight Calibration:</strong>
                <span className="text-slate-500">Empty cylinder tare weight stamped on collar (e.g. 13.5 kg) is subtracted on digital scale to verify net gas weight (e.g. 12.5 kg).</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">Cylinder Life &amp; Recertification:</strong>
                <span className="text-slate-500">Gas Deck partner plants only refill certified cylinders within their 5-year inspection date stamp.</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 block">In Case of Odour / Leak:</strong>
                <span className="text-slate-500">Do not strike matches, flick light switches, or make phone calls indoors. Disconnect regulator and open all windows immediately.</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsSafetyModalOpen(false)}
            className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-sm mt-4 transition"
          >
            I Understand the Safety Protocols
          </button>
        </div>
      </div>
    </div>
  );
};
