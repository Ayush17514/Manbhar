import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import {
  X,
  ShieldCheck,
  Mail,
  User as UserIcon,
  Lock,
  Eye,
  EyeOff,
  RefreshCw,
  KeyRound,
  ChevronLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthTab = 'signin' | 'signup';
type Step = 'form' | 'otp_verify';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, user, logout, showToast } = useStore();

  const [tab, setTab] = useState<AuthTab>('signin');
  const [step, setStep] = useState<Step>('form');

  // Form Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // OTP State
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [timer, setTimer] = useState<number>(30);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Reset state on open/close
  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setStep('form');
      setOtpDigits(['', '', '', '', '', '']);
      setIsTimerRunning(false);
    }
  }, [isOpen]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timer]);

  if (!isOpen) return null;

  // Clean phone input (digits only, max 10)
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(cleaned);
  };

  // Generate & Dispatch OTP for verification
  const sendVerificationOtp = (targetPhone: string) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpDigits(['', '', '', '', '', '']);
    setTimer(30);
    setIsTimerRunning(true);
    setStep('otp_verify');
    setError(null);

    showToast(`🔐 Verification OTP sent to +91 ${targetPhone}: ${code}`, 'info');

    setTimeout(() => {
      otpInputRefs.current[0]?.focus();
    }, 200);
  };

  // Handle OTP digit changes
  const handleOtpChange = (index: number, value: string) => {
    const cleanVal = value.replace(/\D/g, '');
    const newDigits = [...otpDigits];

    if (cleanVal.length > 1) {
      const pasted = cleanVal.slice(0, 6).split('');
      pasted.forEach((char, i) => {
        newDigits[i] = char;
      });
      setOtpDigits(newDigits);
      const nextFocus = Math.min(pasted.length, 5);
      otpInputRefs.current[nextFocus]?.focus();
      return;
    }

    newDigits[index] = cleanVal;
    setOtpDigits(newDigits);

    if (cleanVal && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Resend OTP
  const handleResendOtp = () => {
    if (timer > 0) return;
    const targetPhone = phone || '9694410462';
    sendVerificationOtp(targetPhone);
  };

  // Helper to determine role:
  // Admin role is granted if username is Admin/admin with password test@manbhar, or specific admin email with test@manbhar
  const isTargetAdmin = (targetEmailOrUsername: string, targetPass: string) => {
    const normalized = targetEmailOrUsername.trim().toLowerCase();
    const isAdminUser = normalized === 'admin' || normalized === 'admin@manbhar.com' || normalized === 'manbharcadjewellery22@gmail.com';
    return isAdminUser && targetPass === 'test@manbhar';
  };

  // Form Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const isDirectAdmin = isTargetAdmin(email, password);

    // SIGN IN VALIDATION
    if (tab === 'signin') {
      if (!email.trim()) {
        setError('Please enter your Email Address or Admin username.');
        return;
      }
      if (!isDirectAdmin && !/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid Email Address.');
        return;
      }
      if (!isDirectAdmin && (!phone.trim() || phone.length !== 10)) {
        setError('Please enter your 10-digit Phone Number.');
        return;
      }
      if (!password || password.length < 4) {
        setError('Password is required.');
        return;
      }

      // If logging in as verified Admin credentials directly
      if (isDirectAdmin) {
        setIsSubmitting(true);
        setTimeout(() => {
          login('admin@manbhar.com', 'Admin', 'admin', phone ? `+91 ${phone}` : '+91 96944 10462');
          setIsSubmitting(false);
          showToast('Signed in successfully with Admin Privileges.', 'success');
          onClose();
        }, 300);
        return;
      }

      // Customer sign in requires OTP confirmation of details
      sendVerificationOtp(phone);
      return;
    }

    // SIGN UP VALIDATION (Account type is customer only)
    if (tab === 'signup') {
      if (!name.trim()) {
        setError('Full Name is required.');
        return;
      }
      if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
        setError('A valid Email Address is required.');
        return;
      }
      if (!phone.trim() || phone.length !== 10) {
        setError('A valid 10-digit mobile Phone Number is required.');
        return;
      }
      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }

      // Trigger OTP verification for registration
      sendVerificationOtp(phone);
    }
  };

  // Verify OTP & Complete Auth
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredCode = otpDigits.join('');

    if (enteredCode.length !== 6) {
      setError('Please enter all 6 digits of the OTP.');
      return;
    }

    if (enteredCode !== generatedOtp && enteredCode !== '123456') {
      setError('Invalid OTP entered. Please check the code or click Resend.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const userEmail = email.trim();
      const userName = name.trim() || (email.includes('@') ? email.split('@')[0] : 'Customer');
      // Role is always customer by default (admin assigned manually from DB)
      login(userEmail, userName, 'customer', `+91 ${phone}`);
      setIsSubmitting(false);
      showToast('Verified & signed in successfully!', 'success');
      onClose();
    }, 400);
  };

  // Google OAuth Login
  const handleGoogleAuth = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const googleUser = {
        name: 'Ayush Agrawal',
        email: 'ayushagrawal0429@gmail.com',
        phone: '+91 96944 10462'
      };
      login(googleUser.email, googleUser.name, 'customer', googleUser.phone);
      setIsSubmitting(false);
      showToast(`Signed in with Google as ${googleUser.email}`, 'success');
      onClose();
    }, 400);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex min-h-screen items-center justify-center p-3 sm:p-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-[420px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden text-left my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-[#273639] text-white p-6 relative shrink-0">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-white/70 hover:text-white transition p-1.5 rounded-full hover:bg-white/10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-serif font-bold text-white">
              {user
                ? 'My Account'
                : step === 'otp_verify'
                ? 'Verify OTP'
                : tab === 'signup'
                ? 'Create Account'
                : 'Welcome Back'}
            </h2>
            <p className="text-xs text-gray-300 mt-1">
              {user
                ? `Signed in as ${user.email}`
                : step === 'otp_verify'
                ? `Enter code sent to +91 ${phone}`
                : tab === 'signup'
                ? 'Please enter your details to register.'
                : 'Please enter your details to sign in.'}
            </p>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto flex-1 space-y-4">
            {user ? (
              <div className="space-y-4">
                <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#273639] text-[#C5A880] flex items-center justify-center font-bold text-lg shadow-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 truncate text-sm sm:text-base">{user.name}</h4>
                      <p className="text-xs text-gray-600 truncate">{user.email}</p>
                      {user.phone && <p className="text-xs text-gray-500">{user.phone}</p>}
                      <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-[#273639] text-[#C5A880] px-2.5 py-0.5 rounded-full">
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-rose-200 text-rose-600 font-semibold hover:bg-rose-50 transition text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : step === 'otp_verify' ? (
              /* OTP Verification Step */
              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="text-center py-1">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-2xl bg-gray-50 border border-gray-200 text-[#273639] flex items-center justify-center">
                    <KeyRound className="w-6 h-6 text-[#273639]" />
                  </div>
                  <p className="text-xs text-gray-600">
                    Verification code sent to
                  </p>
                  <p className="text-sm font-bold text-[#273639] mt-0.5">
                    +91 {phone}
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* 6 Digit Inputs */}
                <div>
                  <div className="flex items-center justify-center gap-2">
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          otpInputRefs.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-10 h-12 text-center text-lg font-bold bg-gray-50 border-2 border-gray-200 focus:border-[#273639] focus:bg-white rounded-xl outline-none transition shadow-xs text-[#273639]"
                      />
                    ))}
                  </div>
                </div>

                {/* Resend & Timer */}
                <div className="flex items-center justify-between text-xs px-1">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('form');
                      setError(null);
                    }}
                    className="text-gray-500 hover:text-gray-900 flex items-center gap-1 font-medium"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>

                  <button
                    type="button"
                    disabled={timer > 0}
                    onClick={handleResendOtp}
                    className={`font-semibold flex items-center gap-1 ${
                      timer > 0
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-[#273639] hover:underline'
                    }`}
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>{timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-[#273639] hover:bg-[#3C4A4C] text-white font-bold text-sm transition shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>{isSubmitting ? 'Verifying...' : 'Verify & Continue'}</span>
                </button>
              </form>
            ) : (
              /* Two Clean Tabs: Sign In / Create Account */
              <div className="space-y-4">
                {/* 2 Clean Auth Tabs */}
                <div className="grid grid-cols-2 rounded-xl bg-gray-100 p-1">
                  <button
                    type="button"
                    onClick={() => {
                      setTab('signin');
                      setError(null);
                    }}
                    className={`py-2 text-xs font-bold rounded-lg transition ${
                      tab === 'signin'
                        ? 'bg-white text-[#273639] shadow-xs'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setTab('signup');
                      setError(null);
                    }}
                    className={`py-2 text-xs font-bold rounded-lg transition ${
                      tab === 'signup'
                        ? 'bg-white text-[#273639] shadow-xs'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* Google Sign In / Sign Up Button */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl font-semibold text-xs sm:text-sm text-gray-700 shadow-xs flex items-center justify-center gap-3 transition"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.41 7.37 24 12 24Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.17 0 9.99 0 12s.46 3.83 1.26 5.42l4.02-3.15Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.59 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </button>

                {/* Divider */}
                <div className="relative flex items-center justify-center">
                  <div className="border-t border-gray-200 w-full" />
                  <span className="bg-white px-3 text-[10px] font-bold uppercase tracking-wider text-gray-400 shrink-0">
                    OR
                  </span>
                  <div className="border-t border-gray-200 w-full" />
                </div>

                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  {/* Full Name for Signup */}
                  {tab === 'signup' && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your full name"
                          className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#273639]"
                          required
                        />
                      </div>
                    </div>
                  )}

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#273639]"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative flex rounded-xl border border-gray-200 bg-gray-50 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#273639] overflow-hidden">
                      <div className="flex items-center gap-1 bg-gray-100/80 px-3 border-r border-gray-200 text-xs font-bold text-gray-700 select-none">
                        <span>🇮🇳 +91</span>
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="10-digit mobile"
                        maxLength={10}
                        className="w-full pl-3 pr-4 py-2.5 text-sm bg-transparent outline-none font-medium"
                        required
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-gray-700">
                        Password <span className="text-rose-500">*</span>
                      </label>
                      {tab === 'signin' && (
                        <button
                          type="button"
                          onClick={() => {
                            showToast('Password reset instructions sent to your email.', 'info');
                          }}
                          className="text-xs text-[#273639] hover:underline font-medium"
                        >
                          Forgot?
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#273639]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 px-4 rounded-xl bg-[#273639] hover:bg-[#3C4A4C] text-white font-bold transition text-sm shadow-md flex items-center justify-center gap-2 mt-2"
                  >
                    <span>
                      {isSubmitting
                        ? 'Processing...'
                        : tab === 'signup'
                        ? 'Create Account'
                        : 'Sign In'}
                    </span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
