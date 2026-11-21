import React from 'react';
import { GasDeckProvider, useGasDeck } from './context/GasDeckContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { VendorDiscovery } from './components/discovery/VendorDiscovery';
import { OrderTrackingView } from './components/tracking/OrderTrackingView';
import { OrderHistoryView } from './components/history/OrderHistoryView';
import { SpecPortalView } from './components/spec/SpecPortalView';
import { AuthModal } from './components/auth/AuthModal';
import { LocationModal } from './components/location/LocationModal';
import { GasOrderModal } from './components/order/GasOrderModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { SafetyModal } from './components/safety/SafetyModal';
import type { VerifiedCustomerUser } from './components/landing/customerJourney';

function GasDeckAppContent() {
  const {
    currentView,
    setCurrentView,
    user,
    setUser,
    showToast,
  } = useGasDeck();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      {/* Main App Bar */}
      <div>
        <Navbar />

        {/* Dynamic Views */}
        <main>
          {currentView === 'LANDING' && (
            <LandingPage
              authSession={user
                ? {
                    user: {
                      id: user.id,
                      email: user.email,
                      name: user.fullName,
                      phone: user.phoneNumber,
                      picture: user.avatarUrl ?? undefined,
                      emailVerified: true,
                      provider: 'credentials',
                      role: 'customer',
                    },
                    token: '',
                    expiresAt: undefined,
                  }
                : null}
              authPromptMessage={null}
              highlightAuthCard={false}
              confirmedPlantName={null}
              onStartOrderClick={() => {
                setCurrentView('DASHBOARD');
              }}
              onAuthSuccess={(verifiedUser, token) => {
                setUser({
                  id: verifiedUser.id,
                  fullName: verifiedUser.name,
                  phoneNumber: verifiedUser.phone ?? '',
                  email: verifiedUser.email,
                  role: (verifiedUser.role ?? 'CUSTOMER') as 'CUSTOMER',
                  savedAddresses: [],
                  defaultAddressId: undefined,
                  avatarUrl: verifiedUser.picture ?? undefined,
                });
                setCurrentView('DASHBOARD');
                showToast(`Welcome to Gas Deck, ${verifiedUser.name}!`);
              }}
              onSignOut={() => {
                setUser(null);
                setCurrentView('LANDING');
                showToast('Signed out.');
              }}
              onAuthAction={(action) => {
                // Auth actions are handled by authService inside AuthCard;
                // this hook is kept for analytics/telemetry if needed.
              }}
            />
          )}
          {currentView === 'DASHBOARD' && <CustomerDashboard />}
          {currentView === 'DISCOVERY' && <VendorDiscovery />}
          {currentView === 'TRACKING' && <OrderTrackingView />}
          {currentView === 'HISTORY' && <OrderHistoryView />}
          {currentView === 'SPEC_PORTAL' && <SpecPortalView />}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Modals */}
      <AuthModal />
      <LocationModal />
      <GasOrderModal />
      <CheckoutModal />
      <SafetyModal />
    </div>
  );
}

export default function App() {
  return (
    <GasDeckProvider>
      <GasDeckAppContent />
    </GasDeckProvider>
  );
}
