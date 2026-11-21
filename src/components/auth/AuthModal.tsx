import React, { useState, useRef, useEffect } from 'react';
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
  ShieldCheck,
  Shield,
  Zap,
  Eye,
  EyeOff,
  ChevronDown,
} from 'lucide-react';
import { useGasDeck } from '../../context/GasDeckContext';
import { authService, type AuthResult } from '../../services/authService';
import { supabase } from '../../lib/supabase';
import { OTPInput } from './OTPInput';
import { DoorBurstTransition } from './DoorBurstTransition';
import { BrandMascot } from './BrandMascot';
import { AnimatedWords } from './AnimatedWords';

// Brand color palette
const NAVY = '#0f172a';
const PETROL_BLUE = '#0f4c5c';
const ORANGE = '#f97316';
const CREAM = '#fefdf8';
const CREAM_BORDER = '#f5f2e8';

// ---------- Inline SVG Illustration Placeholders ----------
// Branded SVGs built as clean intentional placeholders (no stock imagery, no unrelated assets)

const FlameLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="flameGrad2" x1="0%" y1="100%" x2="50%" y2="0%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="50%" stopColor="#fb923c" />
        <stop offset="100%" stopColor="#fbbf24" />
      </linearGradient>
      <filter id="flameGlow2">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <path d="M50 95 Q40 60 50 30 Q60 60 50 95 Z" fill="url(#flameGrad2)" filter="url(#flameGlow2)" />
    <ellipse cx="50" cy="45" rx="8" ry="12" fill="#fef3c7" opacity="0.9" />
  </svg>
);

const LpgCylinder = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="cylGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f97316" />
        <stop offset="100%" stopColor="#ea580c" />
      </linearGradient>
      <linearGradient id="cylShadow" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#c2410c" />
      </linearGradient>
    </defs>
    <rect x="55" y="60" width="90" height="100" rx="8" fill="url(#cylShadow)" stroke="#c2410c" strokeWidth="2" />
    <rect x="60" y="65" width="80" height="90" rx="4" fill="url(#cylGrad)" />
    <rect x="75" y="45" width="50" height="18" rx="4" fill="#fbbf24" />
    <rect x="82" y="63" width="36" height="6" rx="2" fill="#1e293b" />
    <path d="M65 165 Q75 150 85 160 Q95 155 105 165 Q115 175 115 180 Q55 175 55 180 Q65 175 65 165 Z" fill="#1e293b" opacity="0.15" />
  </svg>
);

const DeliveryVan = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 140" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="vanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>
    </defs>
    <rect x="10" y="40" width="150" height="50" rx="8" fill="url(#vanGrad)" />
    <rect x="20" y="45" width="40" height="40" rx="4" fill="rgba(255,255,255,0.08)" />
    <rect x="70" y="45" width="50" height="40" rx="4" fill="rgba(255,255,255,0.08)" />
    <rect x="130" y="45" width="25" height="30" rx="4" fill="rgba(255,255,255,0.08)" />
    <circle cx="35" cy="98" r="9" fill="#0f172a" stroke="#f97316" strokeWidth="2" />
    <circle cx="165" cy="98" r="9" fill="#0f172a" stroke="#f97316" strokeWidth="2" />
    <circle cx="35" cy="98" r="4" fill="#fbbf24" />
    <circle cx="165" cy="98" r="4" fill="#fbbf24" />
    <rect x="30" y="25" width="130" height="18" rx="6" fill="#f97316" />
    <text x="95" y="36" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">GAS DECK</text>
    <text x="95" y="48" fontFamily="Arial, sans-serif" fontSize="7" fill="#fefdf8" textAnchor="middle" letterSpacing="1">Your Gas. Delivered with Confidence.</text>
    <path d="M10 40 L25 25 L30 40 Z" fill="#1e293b" />
    <path d="M160 40 L175 25 L180 40 Z" fill="#1e293b" />
  </svg>
);

const DeliveryAttendant = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 120 160" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="uniformGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0f4c5c" />
        <stop offset="100%" stopColor="#0e3a4a" />
      </linearGradient>
    </defs>
    <circle cx="60" cy="32" r="18" fill="#d4a373" />
    <path d="M50 30 Q60 20 70 30" stroke="#d4a373" strokeWidth="3" fill="none" />
    <rect x="42" y="50" width="36" height="45" rx="6" fill="url(#uniformGrad)" />
    <rect x="46" y="54" width="28" height="12" fill="rgba(255,255,255,0.2)" />
    <rect x="44" y="70" width="32" height="8" fill="rgba(255,255,255,0.15)" />
    <rect x="30" y="95" width="16" height="25" fill="#0f4c5c" />
    <rect x="74" y="95" width="16" height="25" fill="#0f4c5c" />
    <rect x="26" y="120" width="12" height="30" fill="#1e293b" />
    <rect x="82" y="120" width="12" height="30" fill="#1e293b" />
    <rect x="45" y="130" width="30" height="6" fill="#fbbf24" />
    <path d="M50 140 Q60 135 70 140" stroke="#0f4c5c" strokeWidth="2" fill="none" />
  </svg>
);

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
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpError, setOtpError] = useState('');
  const [isOtpSent, setOtpSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [pendingAuthResult, setPendingAuthResult] = useState<AuthResult | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Prevent double-tap zoom without disabling pinch-to-zoom
  useEffect(() => {
    let lastTouchEnd = 0;
    const handleTouchEnd = (e: TouchEvent) => {
      const now = Date.now();
      if (e.touches.length > 1) return;
      if (now - (window as any).lastTouchEnd < 300) {
        e.preventDefault();
      }
      (window as any).lastTouchEnd = now;
    };
    document.addEventListener('touchend', handleTouchEnd, { passive: false });
    return () => document.removeEventListener('touchend', handleTouchEnd);
  }, []);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setOtpError('');

    try {
      // Step 1: Password-based auth (create account or sign in)
      let result: AuthResult;
      if (authModalMode === 'REGISTER') {
        result = await authService.signUp({
          email,
          password,
          fullName,
          phoneNumber,
          role: 'CUSTOMER',
        });
      } else {
        result = await authService.signIn({
          email,
          password,
        });
      }

      // Step 2: Send OTP for verification
      await authService.sendOTP({ email, phoneNumber });

      // Store result for after OTP verification
      setPendingAuthResult(result);
      setOtpSent(true);
    } catch (error: any) {
      setOtpError(error.message || 'Authentication failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsSubmitting(true);
    try {
      await authService.signInWithGoogle();
    } catch (error: any) {
      setOtpError(error.message || 'Google sign-in failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleRememberMe = () => setRememberMe(!rememberMe);

  const handleOtpComplete = async (value: string) => {
    if (value.length !== 6) return;

    setIsSubmitting(true);
    setOtpError('');

    try {
      // Verify OTP with Supabase
      await authService.verifyOTP(value, email);

      // OTP verified — set user from pending auth result
      const result = pendingAuthResult;
      if (result) {
        setUser({
          id: result.user.id,
          fullName: result.user.fullName,
          phoneNumber: result.user.phoneNumber,
          email: result.user.email,
          role: result.user.role as 'CUSTOMER',
          savedAddresses: [],
          defaultAddressId: undefined,
        });
        setPendingAuthResult(null);
        setOtpSent(false);
        setIsAuthModalOpen(false);
        setCurrentView('DASHBOARD');
        showToast(`Welcome to Gas Deck, ${fullName || ''}!`);
      }
    } catch (error: any) {
      setOtpError(error.message || 'Verification failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setIsSubmitting(true);
    setOtpError('');
    setOtpCode('');

    try {
      await authService.sendOTP({ email, phoneNumber });
      showToast('Verification code resent.');
    } catch (error: any) {
      setOtpError(error.message || 'Failed to resend code');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoginMode = authModalMode === 'LOGIN';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-0 overflow-y-auto"
      style={{ overscrollBehavior: 'contain' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAuthModalOpen(false);
      }}
    >
      <div
        ref={modalRef}
        className="flex flex-col lg:flex-row h-full max-h-full min-h-[600px] max-w-[1200px] w-full shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-300 my-8"
        style={{ overscrollBehavior: 'contain', touchAction: 'pan-y pinch-zoom' }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-white transition z-30"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Hero Panel (Desktop ~56%) */}
        <div
          className="hidden lg:flex flex-col w-full lg:w-[56%] bg-gradient-to-br from-petrol-blue via-navy to-slate-900 text-white p-8 lg:p-12 relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-petrol-blue/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative z-10 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-8">
              <FlameLogo className="w-8 h-8" />
              <span className="font-extrabold text-xl text-white tracking-tight">Gas Deck</span>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <AnimatedWords
                text="Safe. Reliable. On Time."
                duration={800}
                stagger={150}
                className="text-3xl font-black text-white tracking-tight leading-tight mb-6"
              />
              <p className="text-petrol-blue-200 text-lg font-medium mb-8 leading-relaxed max-w-[420px]">
                Your Gas. Delivered with Confidence.
              </p>

              {/* Trust Benefits */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">Verified vendors</span>
                    <span className="text-xs text-orange-100/70 block">Every plant is NMDPRA-licensed and calibrated.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Shield className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">Secure payments</span>
                    <span className="text-xs text-orange-100/70 block">Encrypted transactions with doorstep safety test.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-white block">15–25 min delivery</span>
                    <span className="text-xs text-orange-100/70 block">Fast doorstep LPG refill across your city.</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-2 text-xs text-orange-200 font-medium">
                <span className="flex items-center gap-1">
                  <ChevronDown className="w-4 h-4" />
                  Delivery attendant ready to serve
                </span>
              </div>
            </div>

            {/* Branded imagery strip at bottom of left panel */}
            <div className="mt-auto pt-8 flex items-center justify-center gap-6 opacity-90">
              <LpgCylinder className="w-16 h-16" />
              <DeliveryVan className="w-24 h-16" />
              <DeliveryAttendant className="w-12 h-16" />
            </div>
          </div>
        </div>

        {/* Right Authentication Card (Cream ~460px) */}
        <div className="flex flex-col w-full lg:w-[44%] bg-cream border-l border-cream-border shadow-xl relative z-10 overflow-hidden max-h-full">
          {/* Brand Header */}
          <div className="p-8 lg:p-10 flex flex-col items-start gap-2 flex-shrink-0">
            <div className="flex items-center gap-2">
              <FlameLogo className="w-6 h-6" />
              <span className="font-bold text-petrol-blue text-lg tracking-tight">Gas Deck</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-petrol-blue/70">
              Your Gas. Delivered with Confidence.
            </span>
          </div>

          {/* Scrollable Form Area */}
          <div className="flex-1 p-8 lg:p-10 overflow-y-auto">
            {/* Tabs */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setAuthModalMode('LOGIN')}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition ${
                  isLoginMode
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-petrol-blue/60 hover:text-petrol-blue border border-cream-border'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthModalMode('REGISTER')}
                className={`px-4 py-2 rounded-xl font-bold text-sm transition ${
                  !isLoginMode
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-petrol-blue/60 hover:text-petrol-blue border border-cream-border'
                }`}
              >
                Create Account
              </button>
            </div>

            <div className="text-center mb-6">
              <AnimatedWords
                text={isLoginMode ? 'Welcome back.' : 'A warmer welcome.'}
                duration={800}
                stagger={150}
                className="text-2xl font-black text-petrol-blue tracking-tight"
              />
              <p className="text-xs text-petrol-blue/60 mt-1">
                {isLoginMode
                  ? 'Sign in to access your saved addresses and order history.'
                  : "Create your account. We'll handle the gas."}
              </p>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-4 mb-6 text-xs text-petrol-blue/50">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs text-petrol-blue/50">Verified vendors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs text-petrol-blue/50">Secure payments</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs text-petrol-blue/50">Instant delivery</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {authModalMode === 'REGISTER' && (
                <>
                  {/* Role Selector */}
                  <div>
                    <span className="text-[10px] font-semibold text-petrol-blue/70 block mb-2 uppercase tracking-wider">
                      I'm here to...
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        onClick={() => setSelectedRole('CUSTOMER')}
                        className={`border-2 rounded-2xl p-3.5 relative cursor-pointer transition ${
                          selectedRole === 'CUSTOMER'
                            ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                            : 'border-cream-border bg-white hover:border-petrol-blue/30'
                        }`}
                      >
                        {selectedRole === 'CUSTOMER' && (
                          <div className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-orange-500 text-white flex items-center justify-center text-[10px]">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                        <Home className={`w-5 h-5 mb-1.5 ${selectedRole === 'CUSTOMER' ? 'text-orange-500' : 'text-petrol-blue/40'}`} />
                        <div className="font-bold text-xs text-petrol-blue">Order gas</div>
                        <div className="text-[10px] text-petrol-blue/50">Customer</div>
                      </div>

                      <div
                        onClick={() => setSelectedRole('MERCHANT')}
                        className={`border-2 rounded-2xl p-3.5 relative cursor-pointer transition ${
                          selectedRole === 'MERCHANT'
                            ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                            : 'border-cream-border bg-white hover:border-petrol-blue/30'
                        }`}
                      >
                        <Store className={`w-5 h-5 mb-1.5 ${selectedRole === 'MERCHANT' ? 'text-orange-500' : 'text-petrol-blue/40'}`} />
                        <div className="font-bold text-xs text-petrol-blue flex items-center gap-1">
                          <span>Sell gas</span>
                        </div>
                        <div className="text-[10px] text-orange-500 font-medium">Merchant (Phase 2)</div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Full name input (register only) */}
              {authModalMode === 'REGISTER' && (
                <div>
                  <label htmlFor="fullName" className="text-[10px] font-semibold text-petrol-blue/70 block mb-1 uppercase tracking-wider">
                    Full name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-petrol-blue/40 absolute left-3 top-2.5" aria-hidden="true" />
                    <input
                      id="fullName"
                      type="text"
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Amina Bello"
                      required
                      enterKeyHint="next"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-petrol-blue/30 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-petrol-blue font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Phone number input */}
              <div>
                <label htmlFor="phoneNumber" className="text-[10px] font-semibold text-petrol-blue/70 block mb-1 uppercase tracking-wider">
                  Phone number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-petrol-blue/40 absolute left-3 top-2.5" aria-hidden="true" />
                  <input
                    id="phoneNumber"
                    type="tel"
                    autoComplete="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="+234 801 234 5678"
                    required
                    inputMode="tel"
                    enterKeyHint="next"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-petrol-blue/30 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-petrol-blue font-medium font-mono"
                  />
                </div>
                <span className="text-[10px] text-petrol-blue/40 mt-0.5 block">
                  Used by the dispatch rider for arrival call & SMS OTP
                </span>
              </div>

              {/* Email input */}
              <div>
                <label htmlFor="email" className="text-[10px] font-semibold text-petrol-blue/70 block mb-1 uppercase tracking-wider">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-petrol-blue/40 absolute left-3 top-2.5" aria-hidden="true" />
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    required
                    autoComplete="email"
                    enterKeyHint="next"
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-petrol-blue/30 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-petrol-blue font-medium"
                  />
                </div>
              </div>

              {/* Password input */}
              <div>
                <label htmlFor="password" className="text-[10px] font-semibold text-petrol-blue/70 block mb-1 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-petrol-blue/40 absolute left-3 top-2.5" aria-hidden="true" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={authModalMode === 'REGISTER' ? 'new-password' : 'current-password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    autoComplete={authModalMode === 'REGISTER' ? 'new-password' : 'current-password'}
                    enterKeyHint={authModalMode === 'REGISTER' ? 'next' : 'done'}
                    className="w-full pl-9 pr-10 py-2 text-xs rounded-xl border border-petrol-blue/30 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-petrol-blue"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2.5 p-1 text-petrol-blue/40 hover:text-orange-500 transition"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me (login only) */}
              {isLoginMode && (
                <div className="flex items-center gap-2">
                  <input
                    id="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={toggleRememberMe}
                    className="w-4 h-4 rounded border-petrol-blue/30 text-orange-500 focus:ring-orange-500 bg-white"
                  />
                  <label htmlFor="rememberMe" className="text-xs text-petrol-blue/60 font-medium cursor-pointer select-none">
                    Remember me
                  </label>
                </div>
              )}

              {/* Forgot Password (login only) */}
              {isLoginMode && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await authService.resetPassword(email);
                        showToast('Password reset email sent.');
                      } catch (error: any) {
                        setOtpError(error.message || 'Failed to send reset email');
                      }
                    }}
                    className="text-xs text-orange-500 font-medium hover:text-orange-600 underline underline-offset-4"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Primary Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Verifying...' : (authModalMode === 'REGISTER' ? 'Create account' : 'Sign in')}</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              {/* Google OAuth */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-full text-xs flex items-center justify-center gap-1.5 border border-slate-300 shadow-xs transition disabled:opacity-50"
              >
                <span>Continue with Google</span>
              </button>

              {/* OTP Input - shown after initial submit */}
              {isOtpSent && (
                <div className="space-y-3" role="group" aria-label="One-time code verification">
                  <div className="text-center mb-3">
                    <p className="text-xs text-petrol-blue/60">
                      We&apos;ve sent a 6-digit code to <span className="font-medium text-petrol-blue">{phoneNumber}</span>
                    </p>
                  </div>
                  <OTPInput
                    value={otpCode}
                    onChange={setOtpCode}
                    onComplete={handleOtpComplete}
                    disabled={isSubmitting}
                    error={otpError}
                  />
                  {otpError && (
                    <p className="text-xs text-red-500 text-center" role="alert">{otpError}</p>
                  )}
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isSubmitting}
                    className="w-full text-xs text-orange-500 font-medium hover:text-orange-600 mt-2"
                  >
                    Resend code
                  </button>
                </div>
              )}
            </form>

            {/* Terms Footer */}
            <p className="text-[10px] text-petrol-blue/40 text-center mt-4 leading-normal">
              By creating an account, you agree to Gas Deck&apos;s Cylinder Safety Protocol and Doorstep Leak Inspection Standards.
            </p>
          </div>

          {/* App Footer - fixed at bottom, never overlaps form fields */}
          <div className="p-6 border-t border-cream-border bg-white flex-shrink-0 flex flex-col items-center gap-3">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-xs text-petrol-blue/60 hover:text-petrol-blue transition">
                <span className="w-5 h-5 rounded bg-petrol-blue/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-petrol-blue">A</span>
                </span>
                <span>App Store</span>
              </button>
              <button className="flex items-center gap-2 text-xs text-petrol-blue/60 hover:text-petrol-blue transition">
                <span className="w-5 h-5 rounded bg-petrol-blue/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-petrol-blue">G</span>
                </span>
                <span>Google Play</span>
              </button>
              <button className="flex items-center gap-2 text-xs text-petrol-blue/60 hover:text-petrol-blue transition">
                <span className="w-5 h-5 rounded bg-petrol-blue/10 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-petrol-blue">W</span>
                </span>
                <span>WhatsApp</span>
              </button>
            </div>
            <span className="text-[9px] text-petrol-blue/30">
              Gas Deck — Phase 1 Customer MVP • Sandbox Mode
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
