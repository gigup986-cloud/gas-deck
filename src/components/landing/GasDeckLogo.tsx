import React from 'react';

interface GasDeckLogoProps {
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const GasDeckFlameIcon: React.FC<{ className?: string }> = ({ className = 'w-12 h-14' }) => (
  <svg
    viewBox="0 0 64 76"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="gasdeckOuterFlame" x1="32" y1="2" x2="32" y2="72" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FFB32C" />
        <stop offset="52%" stopColor="#FF7A00" />
        <stop offset="100%" stopColor="#E65100" />
      </linearGradient>
      <linearGradient id="gasdeckInnerFlame" x1="32" y1="24" x2="32" y2="66" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF9100" />
        <stop offset="100%" stopColor="#D84315" />
      </linearGradient>
    </defs>
    <path
      d="M32.5 3C32.5 3 10 25.5 10 46.5C10 59.8 19.6 70.6 32 72.5C24.4 67.2 21.5 58.6 22.8 49.5C24.2 39.8 32 32 32 32C32 32 39.8 39.8 41.2 49.5C42.5 58.6 39.6 67.2 32 72.5C44.4 70.6 54 59.8 54 46.5C54 25.5 32.5 3 32.5 3Z"
      fill="url(#gasdeckOuterFlame)"
    />
    <path
      d="M32 36C32 36 24.5 44.2 24.5 52.8C24.5 58.6 27.9 63.4 32 65.5C36.1 63.4 39.5 58.6 39.5 52.8C39.5 44.2 32 36 32 36Z"
      fill="url(#gasdeckInnerFlame)"
    />
    <path
      d="M32 22C32 22 18 35.8 18 48.2C18 56.9 23.6 64.5 31.8 67.6C25.8 62.6 23.8 55.6 25.2 48.5C26.5 41.9 32 35.8 32 35.8C32 35.8 37.5 41.9 38.8 48.5C40.2 55.6 38.2 62.6 32.2 67.6C40.4 64.5 46 56.9 46 48.2C46 35.8 32 22 32 22Z"
      fill="#032642"
      fillOpacity="0.88"
    />
    <path
      d="M32 39.5C32 39.5 26.8 45.8 26.8 52.6C26.8 57.3 29.1 61.1 32 63C34.9 61.1 37.2 57.3 37.2 52.6C37.2 45.8 32 39.5 32 39.5Z"
      fill="url(#gasdeckOuterFlame)"
    />
  </svg>
);

export const GasDeckSwoosh: React.FC<{ className?: string }> = ({ className = 'w-44 h-4' }) => (
  <svg
    viewBox="0 0 220 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="gasdeckSwooshGrad" x1="0" y1="14" x2="220" y2="2" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#FF7A00" stopOpacity="0" />
        <stop offset="35%" stopColor="#FF7A00" />
        <stop offset="78%" stopColor="#FFA726" />
        <stop offset="100%" stopColor="#FF7A00" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M4 15.5C58 6.5 138 2.5 216 4.5C154 7.5 82 11.5 16 16.5L4 15.5Z"
      fill="url(#gasdeckSwooshGrad)"
    />
  </svg>
);

export const GasDeckLogo: React.FC<GasDeckLogoProps> = ({
  showTagline = true,
  size = 'lg',
}) => {
  const iconSize = size === 'sm' ? 'w-9 h-11' : size === 'md' ? 'w-11 h-13' : 'w-12 h-14 sm:w-14 sm:h-16';
  const wordSize = size === 'sm' ? 'text-2xl' : size === 'md' ? 'text-3xl' : 'text-[28px] sm:text-[38px]';
  const tagSize = size === 'sm' ? 'text-xs' : 'text-[13px] sm:text-[15px]';

  return (
    <a
      href="#top"
      className="inline-flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff7a00] rounded-xl"
      aria-label="Gas Deck Home"
    >
      <GasDeckFlameIcon className={`${iconSize} shrink-0 drop-shadow-[0_6px_14px_rgba(249,115,22,0.35)] transition-transform duration-200 group-hover:scale-[1.03]`} />
      <div className="flex flex-col">
        <div className={`font-display font-extrabold tracking-tight leading-none ${wordSize} whitespace-nowrap`}>
          <span className="text-white">GAS</span>{' '}
          <span className="text-[#ff7a00]">DECK</span>
        </div>
        {showTagline && (
          <div className="mt-1 flex flex-col">
            <span className={`${tagSize} font-medium text-white/95 tracking-[0.01em] whitespace-nowrap`}>
              Your Gas. Delivered with Confidence.
            </span>
            <GasDeckSwoosh className="w-36 sm:w-48 h-3 -mt-0.5 ml-10 sm:ml-14" />
          </div>
        )}
      </div>
    </a>
  );
};
