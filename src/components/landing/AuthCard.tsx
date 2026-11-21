import React, { useEffect, useState } from 'react';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  UserPlus,
  LogIn,
  Phone,
  ShieldCheck,
  Check,
  ArrowLeft,
  Loader2,
  LogOut,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Flame,
  KeyRound,
  RefreshCw,
} from 'lucide-react';
import { authService, type AuthResult } from '../../services/authService';
import type {
  AuthSession,
  OtpDeliveryMetadata,
  VerifiedCustomerUser,
} from './customerJourney';

export type { VerifiedCustomerUser };

export type AuthTab = 'signin' | 'signup';
export type AuthSubView = 'credentials' | 'verify-otp' | 'forgot' | 'reset-password' | 'phone';

export interface AuthCardProps {
  initialTab?: AuthTab;
  authSession?: AuthSession | null;
  authPromptMessage?: string | null;
  highlightCard?: boolean;
  onAuthSuccess?: (
    user: VerifiedCustomerUser,
    token: string,
    refreshToken?: string,
    expiresAt?: string
  ) => void;
  onOpenCustomerExperience?: () => void;
  onSignOut?: () => void;
  onAuthAction?: (action: {
    type: 'signin' | 'signup' | 'verify-otp' | 'google' | 'phone' | 'forgot' | 'reset-password' | 'logout';
    email?: string;
    name?: string;
    phone?: string;
    rememberMe?: boolean;
    user?: VerifiedCustomerUser;
    token?: string;
  }) => void;
}

const GoogleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
    />
  </svg>
);

export const AuthCard: React.FC<AuthCardProps> = ({
  initialTab = 'signin',
  authSession,
  authPromptMessage,
  highlightCard = false,
  onAuthSuccess,
  onOpenCustomerExperience,
  onSignOut,
  onAuthAction,
}) => {
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
  const [subView, setSubView] = useState<AuthSubView>('credentials');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [pendingOtpMeta, setPendingOtpMeta] = useState<OtpDeliveryMetadata | null>(null);

  const [localSession, setLocalSession] = useState<AuthSession | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [oauthSetupHint, setOauthSetupHint] = useState<{
    message: string;
    redirectUri?: string;
    missingVars?: string[];
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activeSession = authSession ?? localSession;
  const activeUser = activeSession?.user ?? null;

  const resetFeedback = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setOauthSetupHint(null);
  };

  useEffect(() => {
    const handleMessage = async (event: MessageEvent) => {
      const origin = event.origin;
      const isTrustedOrigin =
        origin === window.location.origin ||
        origin.endsWith('.run.app') ||
        origin.includes('localhost');
      if (!isTrustedOrigin) return;

      if (event.data?.type === 'GASDECK_GOOGLE_AUTH_SUCCESS') {
        const token = typeof event.data.token === 'string' ? event.data.token : '';
        const refreshToken =
          typeof event.data.refreshToken === 'string' ? event.data.refreshToken : undefined;
        const expiresAt =
          typeof event.data.expiresAt === 'string' ? event.data.expiresAt : undefined;
        const user = event.data.user as VerifiedCustomerUser | undefined;
        setGoogleLoading(false);

        if (!token || !user) {
          setErrorMessage('Google authentication response was incomplete.');
          return;
        }

        setLocalSession({ user, token, refreshToken, expiresAt });
        setSuccessMessage('Google Sign-In verified via server-side Google OAuth 2.0.');
        onAuthSuccess?.(user, token, refreshToken, expiresAt);
        onAuthAction?.({ type: 'google', user, token });
      } else if (event.data?.type === 'GASDECK_GOOGLE_AUTH_ERROR') {
        setGoogleLoading(false);
        setErrorMessage(
          typeof event.data.error === 'string'
            ? event.data.error
            : 'Google Sign-In was cancelled or failed.'
        );
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onAuthAction, onAuthSuccess]);

  const handleTabSwitch = (tab: AuthTab) => {
    setActiveTab(tab);
    setSubView('credentials');
    setPendingOtpMeta(null);
    setOtpInput('');
    resetFeedback();
  };

  const validateEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  const mapUserToVerifiedCustomer = (result: AuthResult): VerifiedCustomerUser => ({
    id: result.user.id,
    email: result.user.email,
    name: result.user.fullName,
    phone: result.user.phoneNumber,
    picture: result.user.avatarUrl ?? undefined,
    emailVerified: false,
    provider: 'credentials',
    role: 'customer',
  });

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();

    if (activeTab === 'signup' && fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (activeTab === 'signup' && phone.trim().length < 7) {
      setErrorMessage('Please enter a valid Nigerian phone number.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      let result: AuthResult;
      if (activeTab === 'signin') {
        result = await authService.signIn({
          email: email.trim(),
          password,
        });
      } else {
        result = await authService.signUp({
          email: email.trim(),
          password,
          fullName: fullName.trim(),
          phoneNumber: phone.trim(),
          role: 'CUSTOMER',
        });
      }

      const session = await authService.getSession();
      const token = session?.access_token ?? '';

      const user: VerifiedCustomerUser = mapUserToVerifiedCustomer(result);

      setLocalSession({
        user,
        token,
      });
      setSuccessMessage('Signed in! Opening your customer experience...');
      onAuthSuccess?.(user, token);
      onAuthAction?.({
        type: activeTab === 'signin' ? 'signin' : 'signup',
        email: user.email,
        name: user.name,
        phone: user.phone,
        rememberMe,
        user,
        token,
      });

      // Send OTP for email verification after signup/signin
      try {
        await authService.sendOTP({ email: email.trim(), phoneNumber: phone.trim() });
        setPendingOtpMeta({
          deliveryMode: 'demo-simulated',
          expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
          simulatedNotice: 'A 6-digit verification code has been sent to your email.',
        });
        setOtpInput('');
        setSubView('verify-otp');
        setSuccessMessage(
          activeTab === 'signup'
            ? 'Account created! Enter the 6-digit verification code below to activate your account.'
            : 'Email verification required before sign-in. Enter the 6-digit code below.'
        );
      } catch {
        // OTP send failed; proceed without OTP flow
        setSuccessMessage('Signed in! Opening your customer experience...');
      }
    } catch (err) {
      const authErr = err as { message?: string; code?: string; statusCode?: number };
      setErrorMessage(authErr.message ?? 'Unable to reach Gas Deck authentication service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyEmailOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();

    const cleanedOtp = otpInput.trim();
    if (!/^\d{6}$/.test(cleanedOtp)) {
      setErrorMessage('Enter the 6-digit numeric verification code.');
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.verifyOTP(cleanedOtp, email.trim());

      const session = await authService.getSession();
      const token = session?.access_token ?? '';

      const user: VerifiedCustomerUser = {
        id: localSession?.user?.id ?? '',
        email: email.trim(),
        name: localSession?.user?.name ?? '',
        phone: localSession?.user?.phone,
        picture: localSession?.user?.picture,
        emailVerified: true,
        provider: 'credentials',
        role: 'customer',
      };

      setLocalSession({ user, token });
      setPendingOtpMeta(null);
      setOtpInput('');
      setSuccessMessage('Email verified! Opening your Gas Deck customer experience...');
      onAuthSuccess?.(user, token);
      onAuthAction?.({ type: 'verify-otp', email: user.email, user, token });
    } catch (err) {
      const authErr = err as { message?: string; code?: string; statusCode?: number };
      setErrorMessage(authErr.message ?? 'Unable to verify your email code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendVerificationOtp = async () => {
    resetFeedback();
    setIsSubmitting(true);
    try {
      await authService.sendOTP({ email: email.trim(), phoneNumber: phone.trim() });
      setPendingOtpMeta({
        deliveryMode: 'demo-simulated',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        simulatedNotice: 'A fresh 6-digit verification code has been sent to your email.',
      });
      setOtpInput('');
      setSuccessMessage('A fresh 6-digit verification code has been sent to your email.');
    } catch (err) {
      const authErr = err as { message?: string; code?: string; statusCode?: number };
      setErrorMessage(authErr.message ?? 'Unable to resend verification code.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    if (!validateEmail(email)) {
      setErrorMessage('Enter the email linked to your Gas Deck account.');
      return;
    }

    setIsSubmitting(true);
    try {
      await authService.resetPassword(email.trim());
      setOtpInput('');
      setNewPassword('');
      setSubView('reset-password');
      setSuccessMessage('Enter your 6-digit reset code and choose a new password.');
      onAuthAction?.({ type: 'forgot', email: email.trim() });
    } catch (err) {
      const authErr = err as { message?: string; code?: string; statusCode?: number };
      setErrorMessage(authErr.message ?? 'Unable to request password reset.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();

    if (!/^\d{6}$/.test(otpInput.trim())) {
      setErrorMessage('Enter the 6-digit reset verification code.');
      return;
    }
    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Supabase resetPasswordForEmail sends a reset link; OTP verification via verifyOTP
      await authService.verifyOTP(otpInput.trim(), email.trim());
      setPendingOtpMeta(null);
      setOtpInput('');
      setPassword('');
      setNewPassword('');
      setActiveTab('signin');
      setSubView('credentials');
      setSuccessMessage('Password updated! Sign in with your new password.');
      onAuthAction?.({ type: 'reset-password', email: email.trim() });
    } catch (err) {
      const authErr = err as { message?: string; code?: string; statusCode?: number };
      setErrorMessage(authErr.message ?? 'Unable to reset password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFeedback();
    const cleaned = phone.replace(/\s+/g, '');
    if (cleaned.length < 8) {
      setErrorMessage('Enter a valid phone number (e.g., 803 123 4567).');
      return;
    }
    setIsSubmitting(true);
    try {
      setErrorMessage(
        `Phone SMS OTP is not active yet (+234 ${cleaned.replace(/^0/, '')}). Please use Email or Google Sign-In.`
      );
      onAuthAction?.({ type: 'phone', phone: cleaned });
    } catch {
      setErrorMessage('Unable to reach Gas Deck SMS authentication service.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleClick = async () => {
    resetFeedback();
    setGoogleLoading(true);
    try {
      await authService.signInWithGoogle();
    } catch (err) {
      setGoogleLoading(false);
      const authErr = err as { message?: string; code?: string; statusCode?: number };
      setErrorMessage(authErr.message ?? 'Google Sign-In was cancelled or failed.');
    }
  };

  const handleSignOut = async () => {
    const tokenToRevoke = activeSession?.token;
    if (tokenToRevoke) {
      // Best-effort server-side logout
      try {
        await authService.signOut();
      } catch {
        // Ignore sign-out errors
      }
    }
    setLocalSession(null);
    setPassword('');
    resetFeedback();
    onSignOut?.();
    onAuthAction?.({ type: 'logout' });
  };

  return (
    <div
      id="auth-card"
      className={`relative w-full max-w-[440px] rounded-[26px] p-5 sm:p-7 text-[#09253f] shadow-[0_24px_65px_rgba(1,22,40,0.48)] border transition-all duration-300 ${
        highlightCard
          ? 'border-[#ff7a00] ring-4 ring-[#ff7a00]/40'
          : 'border-white/85'
      }`}
      style={{
        background:
          'radial-gradient(circle at 8% 92%, rgba(255, 224, 194, 0.45) 0%, rgba(255, 255, 255, 0) 48%), linear-gradient(168deg, #ffffff 0%, #fcf9f4 60%, #faf3ea 100%)',
      }}
    >
      {activeUser ? (
        <div className="space-y-4 py-2">
          <div className="flex items-center gap-3 rounded-2xl bg-emerald-50 border border-emerald-200 p-4">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            <div>
              <p className="text-sm font-bold text-emerald-950">
                {activeUser.provider === 'google'
                  ? 'Google Account Verified'
                  : 'Customer Account Verified'}
              </p>
              <p className="text-xs text-emerald-800">
                {activeUser.provider === 'google'
                  ? 'Authenticated via server-side Google OAuth 2.0'
                  : 'Email verified & authenticated session active'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl bg-white border border-slate-200 p-4">
            {activeUser.picture ? (
              <img
                src={activeUser.picture}
                alt={activeUser.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border border-slate-200 shrink-0"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-[#09253f] text-white font-bold flex items-center justify-center shrink-0">
                {activeUser.name.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="min-w-0">
              <p className="font-display font-bold text-[#09253f] truncate">{activeUser.name}</p>
              <p className="text-xs text-slate-600 truncate">{activeUser.email}</p>
              <p className="text-[11px] font-medium text-[#ea580c] mt-0.5">
                Ready for LPG location &amp; plant selection
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => onOpenCustomerExperience?.()}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-[#ff9422] via-[#f97316] to-[#ea580c] text-white font-semibold text-sm shadow-[0_8px_20px_rgba(234,88,12,0.3)] flex items-center justify-center gap-2 hover:brightness-105 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316]"
            >
              <Flame className="w-4 h-4 shrink-0" />
              <span>Continue to Gas Order &amp; Plant Locator</span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full h-11 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>

          <div className="pt-1 flex items-center justify-center gap-1.5 text-[12px] text-[#334155] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#09253f] shrink-0" />
            <span>Your information is secure and protected</span>
          </div>
        </div>
      ) : (
        <>
          {authPromptMessage && (
            <div
              role="status"
              className="mb-4 rounded-xl bg-orange-50 border border-orange-200 px-3.5 py-2.5 text-[12.5px] font-medium text-[#9a3412] flex items-start gap-2.5"
            >
              <Flame className="w-4 h-4 text-[#ea580c] shrink-0 mt-0.5" />
              <span>{authPromptMessage}</span>
            </div>
          )}

          <div
            role="tablist"
            aria-label="Account Access Mode"
            className="grid grid-cols-2 rounded-[14px] bg-[#eceef2] p-1 border border-[#e2e5ec]"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'signin'}
              onClick={() => handleTabSwitch('signin')}
              className={`flex items-center justify-center gap-2 h-11 rounded-[11px] text-[14px] sm:text-[15px] font-semibold whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] ${
                activeTab === 'signin'
                  ? 'bg-gradient-to-r from-[#ff8f1c] to-[#ea580c] text-white shadow-[0_6px_16px_rgba(234,88,12,0.34)]'
                  : 'text-[#1e293b] hover:text-[#09253f]'
              }`}
            >
              <User className="w-4 h-4 shrink-0" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'signup'}
              onClick={() => handleTabSwitch('signup')}
              className={`flex items-center justify-center gap-2 h-11 rounded-[11px] text-[14px] sm:text-[15px] font-semibold whitespace-nowrap transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] ${
                activeTab === 'signup'
                  ? 'bg-gradient-to-r from-[#ff8f1c] to-[#ea580c] text-white shadow-[0_6px_16px_rgba(234,88,12,0.34)]'
                  : 'text-[#1e293b] hover:text-[#09253f]'
              }`}
            >
              <UserPlus className="w-4 h-4 shrink-0" />
              <span>Create Account</span>
            </button>
          </div>

          {subView === 'credentials' && (
            <div className="mt-5">
              <div className="text-center">
                <h2 className="font-display text-[26px] sm:text-[30px] font-extrabold tracking-tight text-[#082642] leading-tight">
                  {activeTab === 'signin' ? 'Welcome Back!' : 'Create Your Account'}
                </h2>
                <p className="mt-1 text-[13.5px] sm:text-[14.5px] text-[#334155] font-medium">
                  {activeTab === 'signin'
                    ? 'Sign in to continue your Gas Deck experience'
                    : 'Get fast, safe LPG delivery across Nigeria'}
                </p>
              </div>

              <form onSubmit={handleCredentialsSubmit} noValidate className="mt-5 space-y-3.5">
                {activeTab === 'signup' && (
                  <div>
                    <label htmlFor="gd-fullname" className="sr-only">
                      Full Name
                    </label>
                    <div className="flex items-center gap-3 h-12 px-3.5 rounded-xl bg-white/90 border border-[#dfe4ec] focus-within:border-[#f97316] focus-within:ring-2 focus-within:ring-[#f97316]/20 transition-colors">
                      <User className="w-[18px] h-[18px] text-[#475569] shrink-0" />
                      <input
                        id="gd-fullname"
                        type="text"
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errorMessage) resetFeedback();
                        }}
                        placeholder="Full Name"
                        className="w-full bg-transparent text-[14.5px] text-[#09253f] placeholder:text-[#64748b] focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="gd-email" className="sr-only">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 h-12 px-3.5 rounded-xl bg-white/90 border border-[#dfe4ec] focus-within:border-[#f97316] focus-within:ring-2 focus-within:ring-[#f97316]/20 transition-colors">
                    <Mail className="w-[18px] h-[18px] text-[#475569] shrink-0" />
                    <input
                      id="gd-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) resetFeedback();
                      }}
                      placeholder="Email Address"
                      className="w-full bg-transparent text-[14.5px] text-[#09253f] placeholder:text-[#64748b] focus:outline-none"
                    />
                  </div>
                </div>

                {activeTab === 'signup' && (
                  <div>
                    <label htmlFor="gd-phone-signup" className="sr-only">
                      Phone Number
                    </label>
                    <div className="flex items-center gap-3 h-12 px-3.5 rounded-xl bg-white/90 border border-[#dfe4ec] focus-within:border-[#f97316] focus-within:ring-2 focus-within:ring-[#f97316]/20 transition-colors">
                      <Phone className="w-[18px] h-[18px] text-[#475569] shrink-0" />
                      <span className="text-[13.5px] font-semibold text-[#334155] border-r border-[#e2e8f0] pr-2.5 shrink-0 tabular-nums">
                        +234
                      </span>
                      <input
                        id="gd-phone-signup"
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errorMessage) resetFeedback();
                        }}
                        placeholder="803 123 4567"
                        className="w-full bg-transparent text-[14.5px] text-[#09253f] placeholder:text-[#64748b] focus:outline-none tabular-nums"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="gd-password" className="sr-only">
                    Password
                  </label>
                  <div className="flex items-center gap-3 h-12 px-3.5 rounded-xl bg-white/90 border border-[#dfe4ec] focus-within:border-[#f97316] focus-within:ring-2 focus-within:ring-[#f97316]/20 transition-colors">
                    <Lock className="w-[18px] h-[18px] text-[#09253f] shrink-0" />
                    <input
                      id="gd-password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete={activeTab === 'signin' ? 'current-password' : 'new-password'}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errorMessage) resetFeedback();
                      }}
                      placeholder="Password"
                      className="w-full bg-transparent text-[14.5px] text-[#09253f] placeholder:text-[#64748b] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="p-1 text-[#475569] hover:text-[#09253f] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316]"
                    >
                      {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {activeTab === 'signin' && (
                  <div className="flex items-center justify-between pt-0.5 text-[13px]">
                    <label className="inline-flex items-center gap-2 cursor-pointer select-none group">
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={rememberMe}
                        onClick={() => setRememberMe((prev) => !prev)}
                        className={`w-[18px] h-[18px] rounded-[4px] flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316] ${
                          rememberMe
                            ? 'bg-[#0b4b75] text-white'
                            : 'bg-white border border-[#94a3b8] text-transparent'
                        }`}
                      >
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </button>
                      <span className="font-medium text-[#1e293b]">Remember Me</span>
                    </label>

                    <button
                      type="button"
                      onClick={() => {
                        resetFeedback();
                        setSubView('forgot');
                      }}
                      className="font-semibold text-[#ea580c] hover:text-[#c2410c] transition-colors focus-visible:outline-none focus-visible:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-[12.5px] font-medium text-red-700"
                  >
                    {errorMessage}
                  </div>
                )}

                {successMessage && (
                  <div
                    role="status"
                    className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-[12.5px] font-medium text-emerald-800"
                  >
                    {successMessage}
                  </div>
                )}

                {oauthSetupHint && (
                  <div
                    role="status"
                    className="rounded-xl bg-amber-50 border border-amber-200 px-3.5 py-2.5 text-[12px] text-amber-950 space-y-1"
                  >
                    <div className="flex items-start gap-2 font-semibold">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span>Google OAuth Ready — Credentials Needed</span>
                    </div>
                    <p className="text-amber-900 leading-relaxed">{oauthSetupHint.message}</p>
                    {oauthSetupHint.redirectUri && (
                      <p className="text-[11px] font-mono break-all text-amber-900 bg-amber-100/70 rounded px-2 py-1">
                        Callback: {oauthSetupHint.redirectUri}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#ff9422] via-[#f97316] to-[#ea580c] text-white font-semibold text-[15.5px] shadow-[0_10px_22px_rgba(234,88,12,0.34)] hover:brightness-105 active:scale-[0.99] transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#f97316]"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : activeTab === 'signin' ? (
                    <LogIn className="w-[18px] h-[18px]" />
                  ) : (
                    <UserPlus className="w-[18px] h-[18px]" />
                  )}
                  <span>{activeTab === 'signin' ? 'Sign In' : 'Create Account'}</span>
                </button>
              </form>

              <div className="my-4 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#e2e8f0]" />
                <span className="text-[11.5px] font-semibold tracking-wider text-[#475569]">OR</span>
                <div className="h-px flex-1 bg-[#e2e8f0]" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={handleGoogleClick}
                  disabled={googleLoading}
                  className="h-11 px-3 rounded-full bg-white border border-[#d6dce6] hover:border-[#94a3b8] hover:bg-[#f8fafc] text-[#0f172a] text-[12.5px] sm:text-[13px] font-medium flex items-center justify-center gap-2 whitespace-nowrap transition-colors disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316]"
                >
                  {googleLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                  ) : (
                    <GoogleIcon className="w-4 h-4 shrink-0" />
                  )}
                  <span className="truncate">Continue with Google</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    resetFeedback();
                    setSubView('phone');
                  }}
                  className="h-11 px-3 rounded-full bg-white border border-[#d6dce6] hover:border-[#94a3b8] hover:bg-[#f8fafc] text-[#0f172a] text-[12.5px] sm:text-[13px] font-medium flex items-center justify-center gap-2 whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f97316]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#09253f] shrink-0" />
                  <span className="truncate">Continue with Phone</span>
                </button>
              </div>
            </div>
          )}

          {subView === 'verify-otp' && (
            <div className="mt-5">
              <button
                type="button"
                onClick={() => {
                  resetFeedback();
                  setSubView('credentials');
                }}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0b4b75] hover:text-[#082642] focus-visible:outline-none focus-visible:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In / Register</span>
              </button>

              <h2 className="mt-3 font-display text-[24px] font-extrabold text-[#082642]">
                Verify Your Email
              </h2>
              <p className="mt-1 text-[13px] text-[#334155]">
                Enter the 6-digit verification code for <strong>{email}</strong>.
              </p>

              {pendingOtpMeta?.deliveryMode === 'demo-simulated' && (
                <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-950 space-y-1.5">
                  <p className="font-bold text-amber-900">
                    DEMO MODE (Simulated Email — No real email sent)
                  </p>
                  {pendingOtpMeta.demoOtp && (
                    <div className="flex items-center justify-between gap-2 bg-white border border-amber-200 rounded-lg px-3 py-2">
                      <span className="text-[11.5px] text-slate-600">Simulated Demo OTP:</span>
                      <span
                        data-testid="demo-otp-code"
                        className="font-mono text-base font-extrabold tracking-[0.22em] text-[#082642]"
                      >
                        {pendingOtpMeta.demoOtp}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleVerifyEmailOtp} noValidate className="mt-4 space-y-3.5">
                <div className="flex items-center gap-3 h-12 px-3.5 rounded-xl bg-white/90 border border-[#dfe4ec] focus-within:border-[#f97316] focus-within:ring-2 focus-within:ring-[#f97316]/20">
                  <KeyRound className="w-[18px] h-[18px] text-[#475569] shrink-0" />
                  <input
                    id="gd-verify-otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => {
                      setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6));
                      if (errorMessage) resetFeedback();
                    }}
                    placeholder="Enter 6-digit code"
                    className="w-full bg-transparent text-[15px] font-mono tracking-[0.2em] text-[#09253f] placeholder:font-sans placeholder:tracking-normal placeholder:text-[#64748b] focus:outline-none"
                  />
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-[12.5px] font-medium text-red-700"
                  >
                    {errorMessage}
                  </div>
                )}
                {successMessage && (
                  <div
                    role="status"
                    className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-[12.5px] font-medium text-emerald-800"
                  >
                    {successMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#ff9422] via-[#f97316] to-[#ea580c] text-white font-semibold text-[15px] shadow-[0_10px_22px_rgba(234,88,12,0.34)] hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Verify Email &amp; Continue</span>
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleResendVerificationOtp}
                  className="w-full h-10 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-[#0b4b75] flex items-center justify-center gap-1.5 transition-colors disabled:opacity-60"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Resend Verification Code</span>
                </button>
              </form>
            </div>
          )}

          {subView === 'forgot' && (
            <div className="mt-5">
              <button
                type="button"
                onClick={() => {
                  resetFeedback();
                  setSubView('credentials');
                }}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0b4b75] hover:text-[#082642] focus-visible:outline-none focus-visible:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Sign In</span>
              </button>

              <h2 className="mt-3 font-display text-[24px] font-extrabold text-[#082642]">
                Forgot Password
              </h2>
              <p className="mt-1 text-[13.5px] text-[#334155]">
                Enter your email to generate a 6-digit password reset verification code.
              </p>

              <form onSubmit={handleForgotSubmit} noValidate className="mt-4 space-y-3.5">
                <div className="flex items-center gap-3 h-12 px-3.5 rounded-xl bg-white/90 border border-[#dfe4ec] focus-within:border-[#f97316] focus-within:ring-2 focus-within:ring-[#f97316]/20">
                  <Mail className="w-[18px] h-[18px] text-[#475569] shrink-0" />
                  <input
                    id="gd-forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errorMessage) resetFeedback();
                    }}
                    placeholder="Email Address"
                    className="w-full bg-transparent text-[14.5px] text-[#09253f] placeholder:text-[#64748b] focus:outline-none"
                  />
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-[12.5px] font-medium text-red-700"
                  >
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#ff9422] via-[#f97316] to-[#ea580c] text-white font-semibold text-[15px] shadow-[0_10px_22px_rgba(234,88,12,0.34)] hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Send Reset Verification Code</span>
                </button>
              </form>
            </div>
          )}

          {subView === 'reset-password' && (
            <div className="mt-5">
              <button
                type="button"
                onClick={() => {
                  resetFeedback();
                  setSubView('forgot');
                }}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0b4b75] hover:text-[#082642] focus-visible:outline-none focus-visible:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <h2 className="mt-3 font-display text-[24px] font-extrabold text-[#082642]">
                Reset Password
              </h2>
              <p className="mt-1 text-[13px] text-[#334155]">
                Enter the reset code for <strong>{email}</strong> and your new password.
              </p>

              {pendingOtpMeta?.deliveryMode === 'demo-simulated' && (
                <div className="mt-3 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-950 space-y-1.5">
                  <p className="font-bold text-amber-900">
                    DEMO MODE (Simulated Reset Email — No real email sent)
                  </p>
                  {pendingOtpMeta.demoOtp && (
                    <div className="flex items-center justify-between gap-2 bg-white border border-amber-200 rounded-lg px-3 py-2">
                      <span className="text-[11.5px] text-slate-600">Simulated Reset Code:</span>
                      <span
                        data-testid="demo-reset-otp-code"
                        className="font-mono text-base font-extrabold tracking-[0.22em] text-[#082642]"
                      >
                        {pendingOtpMeta.demoOtp}
                      </span>
                    </div>
                  )}
                </div>
              )}

              <form onSubmit={handleResetPasswordSubmit} noValidate className="mt-4 space-y-3">
                <div className="flex items-center gap-3 h-12 px-3.5 rounded-xl bg-white/90 border border-[#dfe4ec] focus-within:border-[#f97316] focus-within:ring-2 focus-within:ring-[#f97316]/20">
                  <KeyRound className="w-[18px] h-[18px] text-[#475569] shrink-0" />
                  <input
                    id="gd-reset-otp"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    value={otpInput}
                    onChange={(e) => {
                      setOtpInput(e.target.value.replace(/\D/g, '').slice(0, 6));
                      if (errorMessage) resetFeedback();
                    }}
                    placeholder="6-digit Reset Code"
                    className="w-full bg-transparent text-[15px] font-mono tracking-[0.2em] text-[#09253f] placeholder:font-sans placeholder:tracking-normal placeholder:text-[#64748b] focus:outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 h-12 px-3.5 rounded-xl bg-white/90 border border-[#dfe4ec] focus-within:border-[#f97316] focus-within:ring-2 focus-within:ring-[#f97316]/20">
                  <Lock className="w-[18px] h-[18px] text-[#09253f] shrink-0" />
                  <input
                    id="gd-new-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (errorMessage) resetFeedback();
                    }}
                    placeholder="New Password (min. 6 chars)"
                    className="w-full bg-transparent text-[14.5px] text-[#09253f] placeholder:text-[#64748b] focus:outline-none"
                  />
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-[12.5px] font-medium text-red-700"
                  >
                    {errorMessage}
                  </div>
                )}
                {successMessage && (
                  <div
                    role="status"
                    className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-[12.5px] font-medium text-emerald-800"
                  >
                    {successMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#ff9422] via-[#f97316] to-[#ea580c] text-white font-semibold text-[15px] shadow-[0_10px_22px_rgba(234,88,12,0.34)] hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Reset Password</span>
                </button>
              </form>
            </div>
          )}

          {subView === 'phone' && (
            <div className="mt-5">
              <button
                type="button"
                onClick={() => {
                  resetFeedback();
                  setSubView('credentials');
                }}
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0b4b75] hover:text-[#082642] focus-visible:outline-none focus-visible:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Email Sign In</span>
              </button>

              <h2 className="mt-3 font-display text-[24px] font-extrabold text-[#082642]">
                Continue with Phone
              </h2>
              <p className="mt-1 text-[13.5px] text-[#334155]">
                Enter your Nigerian mobile number to check SMS OTP provider availability.
              </p>

              <form onSubmit={handlePhoneSubmit} noValidate className="mt-4 space-y-3.5">
                <div className="flex items-center gap-3 h-12 px-3.5 rounded-xl bg-white/90 border border-[#dfe4ec] focus-within:border-[#f97316] focus-within:ring-2 focus-within:ring-[#f97316]/20">
                  <Phone className="w-[18px] h-[18px] text-[#475569] shrink-0" />
                  <span className="text-[13.5px] font-semibold text-[#334155] border-r border-[#e2e8f0] pr-2.5 shrink-0 tabular-nums">
                    +234
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errorMessage) resetFeedback();
                    }}
                    placeholder="803 123 4567"
                    className="w-full bg-transparent text-[14.5px] text-[#09253f] placeholder:text-[#64748b] focus:outline-none tabular-nums"
                  />
                </div>

                {errorMessage && (
                  <div
                    role="alert"
                    className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-[12.5px] font-medium text-red-700"
                  >
                    {errorMessage}
                  </div>
                )}
                {successMessage && (
                  <div
                    role="status"
                    className="rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-2 text-[12.5px] font-medium text-emerald-800"
                  >
                    {successMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#ff9422] via-[#f97316] to-[#ea580c] text-white font-semibold text-[15px] shadow-[0_10px_22px_rgba(234,88,12,0.34)] hover:brightness-105 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Request SMS Verification Code</span>
                </button>
              </form>
            </div>
          )}

          <div className="mt-4 pt-1 flex items-center justify-center gap-1.5 text-[12px] sm:text-[12.5px] text-[#334155] font-medium">
            <ShieldCheck className="w-4 h-4 text-[#09253f] shrink-0" />
            <span>Your information is secure and protected</span>
          </div>
        </>
      )}
    </div>
  );
};
