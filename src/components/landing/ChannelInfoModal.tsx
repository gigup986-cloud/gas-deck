import React, { useEffect } from 'react';
import { X, Smartphone, MessageCircle, CheckCircle2 } from 'lucide-react';
import type { BottomChannelAction } from './BottomWaveBar';

interface ChannelInfoModalProps {
  channel: BottomChannelAction | null;
  onClose: () => void;
}

const CHANNEL_CONTENT: Record<
  BottomChannelAction,
  {
    title: string;
    subtitle: string;
    body: string;
    highlights: string[];
    ctaLabel: string;
    accentClass: string;
  }
> = {
  appstore: {
    title: 'Gas Deck for iOS',
    subtitle: 'Available on the Apple App Store',
    body: 'Order verified LPG refills, track your delivery van in real time, and manage recurring cylinder swaps right from your iPhone.',
    highlights: [
      'Instant doorstep refill scheduling across Nigeria',
      'Live rider tracking & digital safety receipts',
      'Pay seamlessly with card, transfer, or wallet',
    ],
    ctaLabel: 'Close Preview',
    accentClass: 'from-[#0b4b75] to-[#022b49]',
  },
  googleplay: {
    title: 'Gas Deck for Android',
    subtitle: 'Available on Google Play',
    body: 'Fast, lightweight Android app built for quick LPG orders, cylinder size selection, and verified local depot dispatch.',
    highlights: [
      'One-tap reorder for 3kg, 6kg, 12.5kg & 50kg cylinders',
      'Verified suppliers with sealed safety checks',
      'Real-time delivery ETA notifications',
    ],
    ctaLabel: 'Close Preview',
    accentClass: 'from-[#0b4b75] to-[#022b49]',
  },
  whatsapp: {
    title: 'Order Gas via WhatsApp',
    subtitle: 'Fast concierge ordering & live support',
    body: 'Prefer ordering directly on WhatsApp? Message our dispatch desk with your cylinder size and estate address for immediate supplier matching.',
    highlights: [
      'Verified Nigerian LPG dispatch agents',
      'Same-day doorstep delivery in active zones',
      'Instant quote before rider dispatch',
    ],
    ctaLabel: 'Close Preview',
    accentClass: 'from-emerald-600 to-emerald-800',
  },
};

export const ChannelInfoModal: React.FC<ChannelInfoModalProps> = ({ channel, onClose }) => {
  useEffect(() => {
    if (!channel) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [channel, onClose]);

  if (!channel) return null;
  const info = CHANNEL_CONTENT[channel];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="channel-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white text-[#09253f] shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`bg-gradient-to-r ${info.accentClass} px-6 py-5 text-white flex items-start justify-between gap-4`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              {channel === 'whatsapp' ? (
                <MessageCircle className="w-5 h-5 text-emerald-300" />
              ) : (
                <Smartphone className="w-5 h-5 text-amber-300" />
              )}
            </div>
            <div>
              <h3 id="channel-modal-title" className="font-display text-lg font-bold leading-snug">
                {info.title}
              </h3>
              <p className="text-xs text-white/80 mt-0.5">{info.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-600 leading-relaxed">{info.body}</p>
          <ul className="mt-4 space-y-2.5">
            {info.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-[#09253f] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#f97316] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#ff9422] to-[#ea580c] text-white text-sm font-semibold hover:brightness-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316]"
            >
              {info.ctaLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
