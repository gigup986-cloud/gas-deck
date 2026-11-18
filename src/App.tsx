import React from 'react';
import { GasDeckProvider, useGasDeck } from './context/GasDeckContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { LandingPage } from './components/landing/LandingPage';
import { CustomerDashboard } from './components/dashboard/CustomerDashboard';
import { VendorDiscovery } from './components/discovery/VendorDiscovery';
import { OrderTrackingView } from './components/tracking/OrderTrackingView';
import { OrderHistoryView } from './components/history/OrderHistoryView';
import { AuthModal } from './components/auth/AuthModal';
import { LocationModal } from './components/location/LocationModal';
import { GasOrderModal } from './components/order/GasOrderModal';
import { CheckoutModal } from './components/checkout/CheckoutModal';
import { SafetyModal } from './components/safety/SafetyModal';
import { SpecPortalView } from './components/spec/SpecPortalView';

function GasDeckAppContent() {
  const { currentView, toastMessage } = useGasDeck();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased flex flex-col justify-between">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Bar */}
      <div>
        <Navbar />

        {/* Dynamic Views */}
        <main>
          {currentView === 'LANDING' && <LandingPage />}
          {currentView === 'DASHBOARD' && <CustomerDashboard />}
          {currentView === 'DISCOVERY' && <VendorDiscovery />}
          {currentView === 'TRACKING' && <OrderTrackingView />}
          {currentView === 'HISTORY' && <OrderHistoryView />}
          {currentView === 'SPEC_PORTAL' && <SpecPortalView />}
        </main>
      </div>

      {/* Footer */}
      <Footer />

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
