import React from 'react';
import {
  Flame,
  MapPin,
  Clock,
  ShieldCheck,
  User as UserIcon,
  ShoppingBag,
  History,
  FileCode,
  Download,
  Menu,
  X,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { useGasDeck } from '../../context/GasDeckContext';
import { downloadProjectArchive } from '../../utils/zipExporter';

export const Navbar: React.FC = () => {
  const {
    user,
    activeAddress,
    setIsLocationModalOpen,
    setIsAuthModalOpen,
    setAuthModalMode,
    currentView,
    setCurrentView,
    activeOrder,
    setIsSafetyModalOpen,
    showToast,
  } = useGasDeck();

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);

  const handleExportZip = async () => {
    setIsExporting(true);
    showToast('Preparing complete project archive .zip...');
    try {
      await downloadProjectArchive();
      showToast('Project archive downloaded successfully!');
    } catch {
      showToast('Error exporting project zip.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      {/* Top Demo & Architecture Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] px-3 py-1.5 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono font-bold text-[10px]">
              PHASE 1 CUSTOMER MVP
            </span>
            <span className="hidden sm:inline text-slate-400">
              Target Market: Nigeria (Alakahia / Port Harcourt Reference) • Sandbox Mode
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView('SPEC_PORTAL')}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded transition text-[11px] ${
                currentView === 'SPEC_PORTAL'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <FileCode className="w-3 h-3 text-indigo-400" />
              <span>Spec &amp; Video Analysis</span>
            </button>
            <button
              onClick={handleExportZip}
              disabled={isExporting}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-700/50 text-[11px] transition"
              title="Download entire codebase and specs as a ZIP archive"
            >
              <Download className="w-3 h-3 text-emerald-400" />
              <span>{isExporting ? 'Zipping...' : 'Download Code .ZIP'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-6">
              <button
                onClick={() => setCurrentView('DASHBOARD')}
                className="flex items-center gap-2.5 text-left focus:outline-hidden"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                      Gas Deck
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-orange-100 text-orange-700">
                      NG
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-500 block -mt-0.5">
                    15–25 min LPG delivery
                  </span>
                </div>
              </button>

              {/* Active Location Indicator */}
              <button
                onClick={() => setIsLocationModalOpen(true)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 transition max-w-xs"
                title="Change delivery location"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="font-medium truncate max-w-[160px]">
                  {activeAddress.streetAddress}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 text-xs font-semibold text-slate-600">
              <button
                onClick={() => setCurrentView('LANDING')}
                className={`px-3 py-2 rounded-lg transition ${
                  currentView === 'LANDING'
                    ? 'text-indigo-600 bg-indigo-50 font-bold'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                How It Works
              </button>
              <button
                onClick={() => setCurrentView('DASHBOARD')}
                className={`px-3 py-2 rounded-lg transition ${
                  currentView === 'DASHBOARD'
                    ? 'text-indigo-600 bg-indigo-50 font-bold'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Refill Dashboard
              </button>
              <button
                onClick={() => setCurrentView('DISCOVERY')}
                className={`px-3 py-2 rounded-lg transition ${
                  currentView === 'DISCOVERY'
                    ? 'text-indigo-600 bg-indigo-50 font-bold'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Nearby Plants
              </button>
              <button
                onClick={() => setCurrentView('TRACKING')}
                className={`px-3 py-2 rounded-lg transition relative ${
                  currentView === 'TRACKING'
                    ? 'text-indigo-600 bg-indigo-50 font-bold'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Active Order
                {activeOrder && activeOrder.status !== 'DELIVERED' && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1.5 right-1 animate-pulse"></span>
                )}
              </button>
              <button
                onClick={() => setCurrentView('HISTORY')}
                className={`px-3 py-2 rounded-lg transition ${
                  currentView === 'HISTORY'
                    ? 'text-indigo-600 bg-indigo-50 font-bold'
                    : 'hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Order History
              </button>
              <button
                onClick={() => setIsSafetyModalOpen(true)}
                className="px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition text-amber-700 flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                <span>Safety Guide</span>
              </button>
            </div>

            {/* Right: Actions & User Avatar */}
            <div className="flex items-center gap-2.5">
              {user ? (
                <div className="flex items-center gap-2">
                  <div
                    onClick={() => setCurrentView('DASHBOARD')}
                    className="flex items-center gap-2 cursor-pointer p-1 rounded-lg hover:bg-slate-50 transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 font-bold text-xs flex items-center justify-center">
                      {user.fullName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="hidden sm:block text-left">
                      <span className="text-xs font-bold text-slate-800 block leading-tight">
                        {user.fullName}
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        Customer
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setAuthModalMode('LOGIN');
                      setIsAuthModalOpen(true);
                    }}
                    className="text-xs font-semibold text-slate-700 hover:text-indigo-600 px-3 py-1.5"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => {
                      setAuthModalMode('REGISTER');
                      setIsAuthModalOpen(true);
                    }}
                    className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-1.5 rounded-lg shadow-sm"
                  >
                    Create account
                  </button>
                </div>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 text-xs">
            {/* Mobile Location Selector */}
            <button
              onClick={() => {
                setIsLocationModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 text-xs mb-3"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="font-medium text-left truncate">{activeAddress.streetAddress}</span>
              </div>
              <span className="text-[10px] font-semibold text-indigo-600">Change</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('DASHBOARD');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                currentView === 'DASHBOARD' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700'
              }`}
            >
              Refill Dashboard
            </button>
            <button
              onClick={() => {
                setCurrentView('DISCOVERY');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                currentView === 'DISCOVERY' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700'
              }`}
            >
              Nearby Gas Plants
            </button>
            <button
              onClick={() => {
                setCurrentView('TRACKING');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                currentView === 'TRACKING' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700'
              }`}
            >
              Track Active Order ({activeOrder?.orderCode || 'None'})
            </button>
            <button
              onClick={() => {
                setCurrentView('HISTORY');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                currentView === 'HISTORY' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700'
              }`}
            >
              Order History &amp; Receipts
            </button>
            <button
              onClick={() => {
                setCurrentView('LANDING');
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg font-medium ${
                currentView === 'LANDING' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-slate-700'
              }`}
            >
              Public Landing Page
            </button>
            <button
              onClick={() => {
                setIsSafetyModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-amber-800 bg-amber-50/60"
            >
              Safety Leak-Testing Guide
            </button>
            <button
              onClick={() => {
                setCurrentView('SPEC_PORTAL');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-indigo-700 bg-indigo-50/60"
            >
              Requirements Specification &amp; Video Analysis
            </button>
          </div>
        )}
      </nav>
    </>
  );
};
