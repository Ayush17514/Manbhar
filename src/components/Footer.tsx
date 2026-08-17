import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, ShieldCheck, Gem, Sparkles, Heart, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, categories, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      showToast('Thank you for subscribing to Manbhar Insiders! Check your inbox for your 10% welcome coupon.', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#1e2a2c] text-white border-t border-[#C5A880]/30 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Banner */}
        <div className="bg-[#273639] border border-[#C5A880]/30 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-xl">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-[#C5A880] text-xs uppercase tracking-widest font-semibold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Join The Manbhar Private Circle</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Receive ₹1,000 Off Your First Heritage Masterpiece
              </h3>
              <p className="text-sm text-gray-300">
                Be the first to explore limited bespoke drops, private bridal previews, and gemstone valuation guides.
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="w-full max-w-md flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-4 py-3 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:bg-white/20 backdrop-blur-xs"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#C5A880] hover:bg-[#d6bc96] text-[#273639] font-semibold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shrink-0 flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <Gem className="w-6 h-6 text-[#C5A880]" />
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                MANBHAR
              </span>
            </div>
            <p className="text-xs uppercase tracking-widest text-[#C5A880] font-semibold">
              Fine Handcrafted Jewelry • Jaipur Heritage
            </p>
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Rooted in the royal artisanal traditions of Jaipur, Manbhar creates certified gold, diamond, and silver ornaments that blend eternal devotion with modern luxury aesthetics.
            </p>

            <div className="pt-2 flex flex-col space-y-2 text-xs text-gray-300">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>44 Johari Bazaar, Pink City, Jaipur, Rajasthan 302003</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>+91 96944 10462 / +91 78282 98545</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A880] shrink-0" />
                <span>manbharcadjewellery22@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#C5A880]/30 pb-2 inline-block">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.name}>
                  <button
                    onClick={() => navigate('collections', { category: cat.name })}
                    className="hover:text-[#C5A880] transition"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigate('collections')}
                  className="text-[#C5A880] font-semibold hover:underline"
                >
                  View All Collections →
                </button>
              </li>
            </ul>
          </div>

          {/* Bespoke Services */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#C5A880]/30 pb-2 inline-block">
              Services & Care
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => navigate('services')} className="hover:text-[#C5A880] transition">
                  Custom CAD 3D Jewelry
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-[#C5A880] transition">
                  Bridal Trousseau Styling
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-[#C5A880] transition">
                  Gold & Diamond Hallmarking
                </button>
              </li>
              <li>
                <button onClick={() => navigate('services')} className="hover:text-[#C5A880] transition">
                  Jewelry Spa & Restoration
                </button>
              </li>
              <li>
                <button onClick={() => navigate('about')} className="hover:text-[#C5A880] transition">
                  Authenticity Promise
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4 border-b border-[#C5A880]/30 pb-2 inline-block">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-[#C5A880] transition">
                  Contact Showroom
                </button>
              </li>
              <li>
                <button onClick={() => navigate('profile')} className="hover:text-[#C5A880] transition">
                  Track Order Status
                </button>
              </li>
              <li>
                <button onClick={() => navigate('wishlist')} className="hover:text-[#C5A880] transition">
                  Saved Wishlist
                </button>
              </li>
              <li>
                <button onClick={() => navigate('admin')} className="text-gray-400 hover:text-white transition">
                  Store Administration
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Manbhar Fine Jewelry. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-gray-400">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              BIS Hallmark Certified
            </span>
            <span className="flex items-center gap-1 text-gray-400">
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              Handcrafted in Jaipur
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
