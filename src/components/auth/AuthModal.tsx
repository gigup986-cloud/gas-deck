import React, { useState } from 'react';
import {
  Flame,
  Home,
  Store,
  User as UserIcon,
  Phone,
  Mail,
  Lock,
  X,
  ChevronRight,
  Check,
  Sparkles,
  Info
} from 'lucide-react';
import { useGasDeck } from '../../context/GasDeckContext';
import { INITIAL_USER } from '../../data/mockData';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    setUser,
    showToast,
    setCurrentView,
  } = useGasDeck();

  const [selectedRole, setSelectedRole] = useState<'CUSTOMER' | 'MERCHANT'>('CUSTOMER');
  const [fullName, setFullName] = useState('Amina Bello');
  const [phoneNumber, setPhoneNumber] = useState('+234 801 234 5678');
  const [email, setEmail] = useState('amina.bello@example.com');
  const [password, setPassword] = useState('password123');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedRole === 'MERCHANT') {
      showToast('Merchant portal is scheduled for Phase 2. Creating Customer account for Phase 1 demo.');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      fullName: fullName || 'Amina Bello',
      phoneNumber: phoneNumber || '+234 801 234 5678',
      email: email || 'user@gasdeck.ng',
      role: 'CUSTOMER' as const,
      savedAddresses: INITIAL_USER.savedAddresses,
      defaultAddressId: 'addr-01',
    };

    setUser(newUser);
    setIsAuthModalOpen(false);
    setCurrentView('DASHBOARD');
    showToast(`Welcome to Gas Deck, ${newUser.fullName}!`);
  };

  const handleQuickDemoLogin = () => {
    setUser(INITIAL_USER);
    setIsAuthModalOpen(false);
    setCurrentView('DASHBOARD');
    showToast('Signed in as Ezekiel Ogbonna (Demo Customer)');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {/* Brand Header from Video Frame */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                <Flame className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">Gas Deck</span>
            </div>

            {authModalMode === 'REGISTER' ? (
              <button
                type="button"
                onClick={() => setAuthModalMode('LOGIN')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Log in
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setAuthModalMode('REGISTER')}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-800"
              >
                Create account
              </button>
            )}
          </div>

          {/* Headline & Subhead (Directly from Video Frame) */}
          <div className="mb-6">
            <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {authModalMode === 'REGISTER' ? 'A warmer welcome.' : 'Welcome back.'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {authModalMode === 'REGISTER'
                ? "Create your account. We'll handle the gas."
                : 'Sign in to access your saved addresses and order history.'}
            </p>
          </div>

          {/* Quick Demo Fill Pill */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-2.5 mb-5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-amber-900 font-medium text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Reviewer shortcut:</span>
            </div>
            <button
              onClick={handleQuickDemoLogin}
              className="text-[11px] font-bold text-indigo-700 bg-white px-2.5 py-1 rounded-md border border-amber-300 hover:bg-amber-100 shadow-2xs"
            >
              Sign in as Ezekiel
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authModalMode === 'REGISTER' && (
              <>
                {/* Role Selector ("I'm here to..." - Verified in Video 00:06-00:10) */}
                <div>
                  <span className="text-xs font-medium text-slate-700 block mb-2">
                    I'm here to...
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Option A: Customer (Selected) */}
                    <div
                      onClick={() => setSelectedRole('CUSTOMER')}
                      className={`border-2 rounded-2xl p-3.5 relative cursor-pointer transition ${
                        selectedRole === 'CUSTOMER'
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {selectedRole === 'CUSTOMER' && (
                        <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                      <Home
                        className={`w-5 h-5 mb-1.5 ${
                          selectedRole === 'CUSTOMER' ? 'text-indigo-600' : 'text-slate-400'
                        }`}
                      />
                      <div className="font-bold text-xs text-slate-900">Order gas</div>
                      <div className="text-[10px] text-slate-500">Customer</div>
                    </div>

                    {/* Option B: Merchant */}
                    <div
                      onClick={() => setSelectedRole('MERCHANT')}
                      className={`border-2 rounded-2xl p-3.5 relative cursor-pointer transition ${
                        selectedRole === 'MERCHANT'
                          ? 'border-indigo-600 bg-indigo-50/50 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      {selectedRole === 'MERCHANT' && (
                        <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}
                      <Store
                        className={`w-5 h-5 mb-1.5 ${
                          selectedRole === 'MERCHANT' ? 'text-indigo-600' : 'text-slate-400'
                        }`}
                      />
                      <div className="font-bold text-xs text-slate-900 flex items-center gap-1">
                        <span>Sell gas</span>
                      </div>
                      <div className="text-[10px] text-indigo-600 font-medium">Merchant (Phase 2)</div>
                    </div>
                  </div>
                </div>

                {/* Full name input */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Full name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Amina Bello"
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-slate-900 font-medium"
                    />
                  </div>
                </div>

                {/* Phone number input */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                    Phone number
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+234 801 234 5678"
                      required
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-slate-900 font-medium font-mono"
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Used by the dispatch rider for arrival call &amp; SMS OTP
                  </span>
                </div>
              </>
            )}

            {/* Email input */}
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Email address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-slate-900 font-medium"
                />
              </div>
            </div>

            {/* Password input */}
            <div>
              <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 bg-white text-slate-900"
                />
              </div>
            </div>

            {/* Primary Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-full text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/25 transition"
              >
                <span>{authModalMode === 'REGISTER' ? 'Create account' : 'Sign in to Gas Deck'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Terms Footer */}
          <p className="text-[10px] text-slate-400 text-center mt-4 leading-normal">
            By creating an account, you agree to Gas Deck's Cylinder Safety Protocol and Doorstep Leak Inspection Standards.
          </p>
        </div>
      </div>
    </div>
  );
};
