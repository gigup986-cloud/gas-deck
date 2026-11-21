import React, { useState } from 'react';
import { ShieldCheck, Zap, Hash, Flame, ArrowRight } from 'lucide-react';
import heroDriverImg from '../../assets/images/gasdeck_hero_driver_van_1795287018911.jpg';
import { GasDeckLogo } from './GasDeckLogo';
import { AuthCard, type AuthCardProps } from './AuthCard';
import { BottomWaveBar, type BottomChannelAction } from './BottomWaveBar';
import { ChannelInfoModal } from './ChannelInfoModal';
import type { AuthSession, VerifiedCustomerUser } from './customerJourney';

export interface LandingPageProps {
  authSession?: AuthSession | null;
  authPromptMessage?: string | null;
  highlightAuthCard?: boolean;
  confirmedPlantName?: string | null;
  onStartOrderClick?: () => void;
  onAuthSuccess?: (
    user: VerifiedCustomerUser,
    token: string,
    refreshToken?: string,
    expiresAt?: string
  ) => void;
  onSignOut?: () => void;
  onAuthAction?: AuthCardProps['onAuthAction'];
}

const VALUE_PILLARS = [
  {
    id: 'verified',
    label: 'Verified Suppliers',
    icon: ShieldCheck,
  },
  {
    id: 'fast',
    label: 'Fast Delivery',
    icon: Zap,
  },
  {
    id: 'affordable',
    label: 'Affordable Prices',
    icon: Hash,
  },
] as const;

export const LandingPage: React.FC<LandingPageProps> = ({
  authSession,
  authPromptMessage,
  highlightAuthCard = false,
  confirmedPlantName,
  onStartOrderClick,
  onAuthSuccess,
  onSignOut,
  onAuthAction,
}) => {
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [activeChannel, setActiveChannel] = useState<BottomChannelAction | null>(null);

  return (
    <div id="top" className="w-full overflow-x-hidden bg-[#01223b] text-white">
      <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#01223b]">
        <div className="hidden lg:block absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          {!heroImgFailed ? (
            <img
              src={heroDriverImg}
              alt="Gas Deck delivery specialist in navy uniform holding an orange LPG cylinder beside a branded delivery van"
              referrerPolicy="no-referrer"
              onError={() => setHeroImgFailed(true)}
              className="absolute inset-y-0 -left-[28%] w-[132%] max-w-none h-full object-cover object-[50%_18%] transition-opacity duration-300"
            />
          ) : (
            <div
              className="w-full h-full"
              style={{
                background:
                  'radial-gradient(circle at 60% 40%, #0a4e7a 0%, #032d4c 52%, #011b30 100%)',
              }}
            />
          )}

          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(1, 34, 61, 0.94) 0%, rgba(2, 46, 82, 0.72) 22%, rgba(2, 46, 82, 0.14) 48%, rgba(1, 30, 54, 0.35) 100%)',
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(1, 32, 58, 0.92) 0%, rgba(2, 42, 74, 0.76) 28%, rgba(2, 42, 74, 0.22) 50%, rgba(2, 36, 65, 0.38) 100%)',
            }}
          />
        </div>

        <div
          className="lg:hidden absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 80% 10%, rgba(14, 96, 148, 0.42) 0%, rgba(1, 34, 59, 0) 55%), linear-gradient(180deg, #023257 0%, #01223b 48%, #011b30 100%)',
          }}
        />

        <header className="relative z-20 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 pt-5 sm:pt-7 pb-3">
          <div className="flex items-center justify-between gap-4">
            <GasDeckLogo showTagline size="lg" />

            {authSession && (
              <button
                type="button"
                onClick={onStartOrderClick}
                className="hidden sm:inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-white/12 hover:bg-white/20 border border-white/25 text-xs sm:text-sm font-semibold text-white transition-colors backdrop-blur-sm"
              >
                <Flame className="w-4 h-4 text-[#ff7a00] shrink-0" />
                <span>
                  {confirmedPlantName
                    ? `Resume Order (${confirmedPlantName})`
                    : `Open Customer Portal (${authSession.user.name.split(' ')[0]})`}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            )}
          </div>
        </header>

        <main className="relative z-20 flex-1 flex items-center w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8">
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-6">
            <section className="lg:col-span-5 xl:col-span-5 flex flex-col justify-center">
              <h1 className="font-display font-extrabold tracking-tight leading-[1.12] text-[34px] sm:text-[42px] xl:text-[46px] text-balance">
                <span className="text-white">Safe. Reliable.</span>{' '}
                <span className="text-[#ff7a00] whitespace-nowrap">On Time.</span>
              </h1>

              <p className="mt-3 sm:mt-4 text-[17px] sm:text-[20px] xl:text-[21px] font-normal leading-[1.45] text-white/95 max-w-[430px]">
                Get LPG gas delivered to your doorstep anywhere in Nigeria.
              </p>

              <ul className="mt-6 sm:mt-8 space-y-4">
                {VALUE_PILLARS.map(({ id, label, icon: Icon }) => (
                  <li key={id} className="flex items-center gap-3.5">
                    <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff9824] via-[#ff7a00] to-[#ea580c] border border-white/25 shadow-[0_6px_16px_rgba(234,88,12,0.38)] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white stroke-[2.2]" aria-hidden="true" />
                    </span>
                    <span className="text-[16px] sm:text-[17.5px] font-medium text-white tracking-[0.01em]">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col items-start gap-2">
                <button
                  type="button"
                  onClick={onStartOrderClick}
                  className="inline-flex items-center gap-2.5 h-12 px-6 rounded-xl bg-gradient-to-r from-[#ff9422] via-[#f97316] to-[#ea580c] text-white font-semibold text-[15px] shadow-[0_12px_26px_rgba(234,88,12,0.4)] hover:brightness-105 active:scale-[0.99] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Flame className="w-4 h-4 shrink-0" />
                  <span>
                    {authSession
                      ? confirmedPlantName
                        ? 'Continue Your Gas Order'
                        : 'Find Nearby Gas Plants & Order'
                      : 'Start Gas Order / Refill'}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>
                <p className="text-xs text-white/75">
                  {authSession
                    ? `Signed in as ${authSession.user.email}`
                    : 'Sign in or register to share your location and select a nearby LPG plant.'}
                </p>
              </div>

              <div className="mt-7 lg:hidden relative rounded-2xl overflow-hidden border border-white/15 shadow-xl aspect-[16/9] bg-[#022b49]">
                {!heroImgFailed ? (
                  <img
                    src={heroDriverImg}
                    alt="Gas Deck delivery specialist holding an orange LPG cylinder beside a delivery van"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgFailed(true)}
                    className="w-full h-full object-cover object-[58%_20%]"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#06416b] to-[#02243d] text-white/80 text-sm font-medium">
                    Gas Deck Nationwide LPG Delivery
                  </div>
                )}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(1,34,59,0.1) 0%, rgba(1,34,59,0.55) 100%)',
                  }}
                />
              </div>
            </section>

            <section className="lg:col-span-7 xl:col-span-7 flex justify-center lg:justify-end">
              <AuthCard
                initialTab="signin"
                authSession={authSession}
                authPromptMessage={authPromptMessage}
                highlightCard={highlightAuthCard}
                onAuthSuccess={onAuthSuccess}
                onOpenCustomerExperience={onStartOrderClick}
                onSignOut={onSignOut}
                onAuthAction={onAuthAction}
              />
            </section>
          </div>
        </main>

        <BottomWaveBar onSelectChannel={(channel) => setActiveChannel(channel)} />

        <ChannelInfoModal
          channel={activeChannel}
          onClose={() => setActiveChannel(null)}
        />
      </div>
    </div>
  );
};
