import React from 'react';
import { ArrowRight } from 'lucide-react';

export type BottomChannelAction = 'appstore' | 'googleplay' | 'whatsapp';

interface BottomWaveBarProps {
  onSelectChannel?: (channel: BottomChannelAction) => void;
}

const AppleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43Zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45Z" />
  </svg>
);

const GooglePlayIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#00D2FF" d="M3.61 1.814 13.793 12 3.61 22.186a1.75 1.75 0 0 1-.61-1.344V3.158c0-.517.224-.998.61-1.344Z" />
    <path fill="#00F076" d="m17.345 8.448-3.552 3.552 3.552 3.552 4.012-2.29c.856-.489.856-1.735 0-2.224l-4.012-2.59Z" />
    <path fill="#FF3A44" d="M13.793 12 3.61 22.186c.414.365 1.028.458 1.592.136l12.143-6.77L13.793 12Z" />
    <path fill="#FFD500" d="m17.345 8.448-12.143-6.77C4.638 1.356 4.024 1.449 3.61 1.814L13.793 12l3.552-3.552Z" />
  </svg>
);

const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <circle cx="12" cy="12" r="10.5" fill="#25D366" />
    <path
      fill="#FFFFFF"
      d="M16.92 14.37c-.27-.13-1.59-.78-1.84-.87-.24-.09-.42-.13-.6.13-.18.27-.69.87-.85 1.05-.16.18-.31.2-.58.07-.27-.13-1.13-.42-2.16-1.34-.8-.71-1.34-1.59-1.5-1.86-.16-.27-.02-.41.12-.54.12-.12.27-.31.4-.47.13-.16.18-.27.27-.45.09-.18.04-.34-.02-.47-.07-.13-.6-1.45-.82-1.99-.22-.52-.44-.45-.6-.46h-.51c-.18 0-.47.07-.71.34-.24.27-.94.92-.94 2.24 0 1.32.96 2.6 1.09 2.78.13.18 1.89 2.89 4.58 4.05.64.28 1.14.44 1.53.57.64.2 1.23.17 1.69.1.52-.08 1.59-.65 1.81-1.28.22-.63.22-1.17.16-1.28-.07-.11-.25-.18-.52-.31Z"
    />
  </svg>
);

const AirplaneIcon: React.FC<{ className?: string }> = ({ className = 'w-8 h-8' }) => (
  <svg viewBox="0 0 36 36" fill="none" className={className} aria-hidden="true">
    <path
      d="M31.8 4.2c-.8-.8-2.3-.5-4.3.7l-6.4 3.9-12.5-3.2-2.3 2.3 9.7 5.6-4.7 4.7-4-.8-1.8 1.8 4.7 2.8 2.8 4.7 1.8-1.8-.8-4 4.7-4.7 5.6 9.7 2.3-2.3-3.2-12.5 3.9-6.4c1.2-2 1.5-3.5.7-4.3Z"
      fill="currentColor"
    />
  </svg>
);

export const BottomWaveBar: React.FC<BottomWaveBarProps> = ({ onSelectChannel }) => {
  return (
    <footer className="relative w-full z-20 mt-auto overflow-hidden">
      <div className="hidden md:block absolute inset-0 pointer-events-none select-none" aria-hidden="true">
        <svg
          viewBox="0 0 1440 130"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="navyWaveGrad" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#011e35" />
              <stop offset="55%" stopColor="#022744" />
              <stop offset="100%" stopColor="#011d33" />
            </linearGradient>
            <linearGradient id="orangeLeftWaveGrad" x1="0" y1="0" x2="540" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#ffa126" />
              <stop offset="55%" stopColor="#ff7a00" />
              <stop offset="100%" stopColor="#e65100" />
            </linearGradient>
          </defs>
          <path
            d="M0,45 C320,88 760,92 1150,74 C1310,66 1395,46 1440,18 L1440,130 L0,130 Z"
            fill="url(#navyWaveGrad)"
          />
          <path
            d="M0,16 C125,0 265,38 415,82 C480,102 545,118 610,126 L0,130 Z"
            fill="url(#orangeLeftWaveGrad)"
          />
          <path
            d="M0,17 C125,1 265,39 415,83 C475,101 535,115 595,124"
            stroke="#ffd29d"
            strokeOpacity="0.35"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>
      </div>

      <div className="md:hidden bg-[#01213a] border-t border-white/10">
        <div className="bg-gradient-to-r from-[#ff9422] via-[#f97316] to-[#ea580c] px-5 py-4 flex items-center gap-3.5">
          <AirplaneIcon className="w-8 h-8 text-white shrink-0" />
          <div className="font-display italic font-semibold text-[18px] leading-snug text-white">
            <div>More than Gas...</div>
            <div>A Better Life.</div>
          </div>
        </div>
        <div className="px-5 py-5 flex flex-col items-center gap-3">
          <span className="text-[13.5px] font-medium text-white/90">Download Our App:</span>
          <div className="flex flex-wrap items-center justify-center gap-2.5 w-full">
            <button
              type="button"
              onClick={() => onSelectChannel?.('appstore')}
              className="h-10 px-4 rounded-full border border-white/35 bg-[#042d4d] hover:bg-[#073b63] text-white text-[13px] font-medium inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a00]"
            >
              <AppleIcon className="w-4 h-4 shrink-0" />
              <span>App Store</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectChannel?.('googleplay')}
              className="h-10 px-4 rounded-full border border-white/35 bg-[#042d4d] hover:bg-[#073b63] text-white text-[13px] font-medium inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a00]"
            >
              <GooglePlayIcon className="w-4 h-4 shrink-0" />
              <span>Google Play</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectChannel?.('whatsapp')}
              className="h-10 px-4 rounded-full border border-emerald-400/45 bg-[#042d4d] hover:border-emerald-400 hover:bg-[#073b63] text-white text-[13px] font-medium inline-flex items-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex relative max-w-[1400px] mx-auto px-8 lg:px-12 pt-11 pb-5 items-end justify-between gap-6">
        <div className="flex items-center gap-3.5 pb-0.5">
          <AirplaneIcon className="w-9 h-9 text-white shrink-0 drop-shadow-sm" />
          <div className="flex flex-col">
            <div className="font-display italic font-semibold text-[18px] lg:text-[20px] leading-[1.2] text-white">
              <div>More than Gas...</div>
              <div>A Better Life.</div>
            </div>
            <div className="mt-1 h-[2px] w-32 rounded-full bg-gradient-to-r from-white/75 via-amber-200/70 to-transparent" />
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-3.5 pb-1">
          <span className="text-[13.5px] lg:text-[14px] font-medium text-white/95 whitespace-nowrap mr-1">
            Download Our App:
          </span>

          <button
            type="button"
            onClick={() => onSelectChannel?.('appstore')}
            className="h-10 px-4 rounded-full border border-white/40 bg-[#042b49]/90 hover:bg-[#083c63] hover:border-white/70 text-white text-[13.5px] font-medium inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a00]"
          >
            <AppleIcon className="w-4 h-4 shrink-0" />
            <span>App Store</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectChannel?.('googleplay')}
            className="h-10 px-4 rounded-full border border-white/40 bg-[#042b49]/90 hover:bg-[#083c63] hover:border-white/70 text-white text-[13.5px] font-medium inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a00]"
          >
            <GooglePlayIcon className="w-4 h-4 shrink-0" />
            <span>Google Play</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectChannel?.('whatsapp')}
            className="h-10 px-4 rounded-full border border-emerald-400/50 bg-[#042b49]/90 hover:bg-[#083c63] hover:border-emerald-400 text-white text-[13.5px] font-medium inline-flex items-center gap-2 whitespace-nowrap shrink-0 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>WhatsApp</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>
    </footer>
  );
};
