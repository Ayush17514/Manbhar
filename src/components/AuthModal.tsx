import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Sparkles, UserCheck, ShieldCheck, Mail, User as UserIcon, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, user, logout } = useStore();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    login(email, name || email.split('@')[0], role);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-[#C5A880]/30 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-[#273639] text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-[#C5A880] text-xs uppercase tracking-widest font-semibold mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Manbhar Fine Jewelry</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-white">
              {user ? 'My Account' : isRegister ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm text-gray-300 mt-1">
              {user
                ? `Signed in as ${user.email}`
                : 'Access your saved wishlist, custom orders & exclusive perks.'}
            </p>
          </div>

          <div className="p-6">
            {user ? (
              <div className="space-y-4">
                <div className="bg-[#fef9f5] border border-[#C5A880]/40 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#273639] text-[#C5A880] flex items-center justify-center font-bold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{user.name}</h4>
                      <p className="text-xs text-gray-600">{user.email}</p>
                      <span className="inline-block mt-1 text-[11px] font-semibold bg-[#273639] text-[#C5A880] px-2 py-0.5 rounded-full capitalize">
                        {user.role} Access
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl border border-red-200 text-red-600 font-medium hover:bg-red-50 transition text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {isRegister && (
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <UserIcon className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Ayush Agrawal"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Email or Mobile Number
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('customer')}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition ${
                        role === 'customer'
                          ? 'bg-[#273639] text-white border-[#273639]'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      Customer
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border transition ${
                        role === 'admin'
                          ? 'bg-[#C5A880] text-gray-900 border-[#C5A880]'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      Store Admin
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#273639] hover:bg-[#3C4A4C] text-white font-semibold transition text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
                  <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-xs text-gray-600 hover:text-[#273639] hover:underline"
                  >
                    {isRegister
                      ? 'Already have an account? Sign in'
                      : "Don't have an account yet? Register here"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
