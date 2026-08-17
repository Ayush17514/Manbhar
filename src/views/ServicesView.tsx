import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Gem, Sparkles, Cpu, RefreshCw, Send, CheckCircle2, ShieldCheck, PhoneCall } from 'lucide-react';

export const ServicesView: React.FC = () => {
  const { submitEnquiry, showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Custom 3D CAD Jewelry Design');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }

    submitEnquiry({
      name,
      email: email || 'not_provided@client.com',
      phone,
      service,
      message
    });

    setIsSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Banner */}
      <section className="bg-[#273639] text-white py-16 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#F7E7CE] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest backdrop-blur-xs">
            <Cpu className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Master Atelier Services</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Custom CAD & Jewelry Services
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-2xl mx-auto">
            From 3D digital CAD prototypes to heirloom restoration and certified gemstone valuation.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Service 1 */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639]">
                <Cpu className="w-7 h-7 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900">
                Custom 3D CAD Jewelry Design
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Provide a rough sketch, photograph, or inspiration. Our CAD jewelers will create a 360-degree photorealistic render and 3D wax model for your approval prior to casting in 18K or 22K gold.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-1">
              <span className="text-[#273639] font-bold block">• 48-Hour 3D Render Delivery</span>
              <span className="text-[#273639] font-bold block">• Microscopic Stone Setting Accuracy</span>
            </div>
          </div>

          {/* Service 2 */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639]">
                <Gem className="w-7 h-7 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900">
                Bridal Trousseau & Custom Curation
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Work one-on-one with our Jaipur jewelry consultants to curate matching chokers, jhumkas, haathphools, maang tikkas, and kadas harmonized with your wedding attire color palette.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-1">
              <span className="text-[#273639] font-bold block">• Bespoke Color Stone Matching</span>
              <span className="text-[#273639] font-bold block">• Complete Bridal Jewelry Boxes</span>
            </div>
          </div>

          {/* Service 3 */}
          <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639]">
                <RefreshCw className="w-7 h-7 text-[#C5A880]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-gray-900">
                Jewelry Spa & Restoration
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Restore cherished heirloom jewelry to its original brilliance. Our artisans provide ultrasonic cleaning, 24K gold flash re-electroplating, gemstone re-tightening, and rhodium anti-tarnish coats.
              </p>
            </div>
            <div className="pt-4 border-t border-gray-100 text-xs text-gray-500 space-y-1">
              <span className="text-[#273639] font-bold block">• Same-Day Ultrasonic Polish</span>
              <span className="text-[#273639] font-bold block">• Multi-Year Anti-Tarnish Shields</span>
            </div>
          </div>
        </div>
      </section>

      {/* Inquiry Consultation Form */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#C5A880]/30 shadow-2xl p-8 sm:p-12 overflow-hidden">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#273639]">Inquiry Received!</h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you for consulting with Manbhar Fine Jewelry. Our CAD master designer will contact you via WhatsApp/Phone within 24 hours with design options.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-2.5 bg-[#273639] text-[#C5A880] font-bold text-xs uppercase tracking-wider rounded-full mt-4"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <div>
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
                  Get A Free CAD Estimate
                </span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#273639] mt-1">
                  Request a Custom Jewelry Consultation
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  Tell us what you'd like to craft and our jewelry engineers will prepare a transparent quote.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ayush Agrawal"
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Service Type *
                    </label>
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    >
                      <option value="Custom 3D CAD Jewelry Design">Custom 3D CAD Jewelry Design</option>
                      <option value="Customized Name Pendant">Customized Name Pendant</option>
                      <option value="Bridal Trousseau Styling">Bridal Trousseau Styling</option>
                      <option value="Jewelry Spa & Restoration">Jewelry Spa & Restoration</option>
                      <option value="Hallmarking & Gemstone Valuation">Hallmarking & Gemstone Valuation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Describe Your Dream Design or Requirements *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Mention metal choice (18K, 22K, 925 Silver), approximate budget, gemstone preference, or name letters..."
                    className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#273639] hover:bg-[#3C4A4C] text-[#C5A880] font-bold text-xs uppercase tracking-widest rounded-xl transition shadow-xl flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Consultation Request</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
