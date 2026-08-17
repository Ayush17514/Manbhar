import React from 'react';
import { useStore } from '../context/StoreContext';
import { Gem, ShieldCheck, Sparkles, MapPin, Award, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { navigate } = useStore();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Banner */}
      <section className="bg-[#273639] text-white py-16 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#F7E7CE] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest backdrop-blur-xs">
            <Gem className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Artisans of the Pink City</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
            The Story of Manbhar
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed max-w-2xl mx-auto">
            Honoring Jaipur's royal gemological heritage through pure hallmarked precious metals and bespoke 3D CAD design precision.
          </p>
        </div>
      </section>

      {/* Heritage Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Jaipur's Royal Legacy
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#273639]">
              Born in the Historic Lanes of Johari Bazaar
            </h2>
            <p>
              For centuries, the Pink City of Jaipur has stood as the undisputed world capital of gemstone cutting, Kundan-Meenakari artistry, and regal jewelry design. Manbhar was founded to bridge this timeless craftsmanship with modern computerized CAD precision and ethical transparent pricing.
            </p>
            <p>
              Every ornament in our studio begins either at the jeweler's bench with intricate wax hand-carvings or on high-precision CAD workstations where microscopic gemstone tolerances are calibrated down to the millimeter.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-[#fef9f5] border border-[#C5A880]/30 rounded-2xl">
                <span className="text-2xl font-bold font-serif text-[#273639] block">100%</span>
                <span className="text-xs text-gray-600">BIS Hallmarked & Certified Purity</span>
              </div>
              <div className="p-4 bg-[#fef9f5] border border-[#C5A880]/30 rounded-2xl">
                <span className="text-2xl font-bold font-serif text-[#273639] block">5,000+</span>
                <span className="text-xs text-gray-600">Bespoke Ornaments Handcrafted</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-[#f8f6f3]">
            <img
              src="/uploads/carousel/1000276120.jpg"
              alt="Jaipur Karigar Craftsmanship"
              className="w-full h-[420px] object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="bg-gray-50/70 py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">Our Code</span>
            <h2 className="text-3xl font-serif font-bold text-[#273639] mt-1">The Manbhar Standard</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639]">
                <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900">Uncompromising Hallmarking</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                All gold, diamond and silver items are tested and stamped by government approved BIS hallmarking centers. Complete purity certification is provided with every order.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639]">
                <Sparkles className="w-6 h-6 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900">3D CAD Innovation</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our in-house 3D CAD modeling studio allows patrons to visualize customized bridal jewelry, name pendants, and heirloom replicas in photorealistic renders before casting.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639]">
                <HeartHandshake className="w-6 h-6 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-lg font-bold text-gray-900">Lifetime Care & Exchange</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We believe fine jewelry is an enduring bond. Enjoy complimentary sonic cleaning, prong tightening, re-polishing, and lifetime buyback or exchange policies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Visit CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#273639] rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border border-[#C5A880]/30">
          <div>
            <div className="flex items-center gap-2 text-[#C5A880] text-xs uppercase font-bold tracking-widest mb-2">
              <MapPin className="w-4 h-4" />
              <span>Jaipur Flagship Studio</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold">
              Visit Our Johari Bazaar Experience Center
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-xl">
              Experience the brilliance in person, explore thousands of unmounted gemstones, and consult with our master goldsmiths.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('contact')}
              className="px-6 py-3 bg-[#C5A880] hover:bg-[#d6bc96] text-[#273639] font-bold text-xs uppercase tracking-widest rounded-full transition shadow-lg"
            >
              Book Studio Appointment
            </button>
            <button
              onClick={() => navigate('collections')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded-full transition"
            >
              View Online Catalog
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
