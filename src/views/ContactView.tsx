import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { submitEnquiry, showToast } = useStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Showroom Appointment');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "How do I know the gold and diamond jewelry is authentic?",
      a: "Every piece of gold, diamond, and silver jewelry crafted at Manbhar undergoes rigorous assay testing at government-certified BIS hallmarking centers. Your parcel includes the official BIS Hallmark purity stamp (916 for 22K, 750 for 18K) and a laboratory grading card."
    },
    {
      q: "How long does custom 3D CAD jewelry fabrication take?",
      a: "Our digital CAD design team delivers a 3D photorealistic rendering within 48 to 72 hours. Once you review and approve the design, casting, hand-setting, hallmarking and polishing take 5 to 7 working days before dispatch."
    },
    {
      q: "Is insured shipping really free?",
      a: "Yes! All orders valued above ₹4,999 include 100% insured express door-to-door transit across India. If any transit anomaly occurs, your piece is completely covered and replaced immediately."
    },
    {
      q: "Can I visit your flagship studio in Jaipur?",
      a: "We welcome you warmly! Our studio is located at 44 Johari Bazaar in the heart of Jaipur's Pink City. You can view our live goldsmithing bench, browse loose certified gems, and meet our CAD designers in person."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) {
      showToast('Please fill out the contact form completely', 'error');
      return;
    }

    submitEnquiry({
      name,
      email: email || 'visitor@manbhar.com',
      phone: phone || '9694410462',
      service: subject,
      message
    });

    setIsSent(true);
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Banner */}
      <section className="bg-[#273639] text-white py-16 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#F7E7CE] px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest backdrop-blur-xs">
            <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Jaipur Experience Center</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white">
            Connect with Manbhar
          </h1>
          <p className="text-sm sm:text-base text-gray-300 font-light max-w-2xl mx-auto">
            Whether you seek custom bridal styling, wholesale CAD inquiries, or showroom appointments, our jewelers are here to assist.
          </p>
        </div>
      </section>

      {/* Main 2-Column: Info & Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#273639]">
                Showroom & Atelier
              </h3>

              <div className="space-y-4 text-xs text-gray-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639] shrink-0">
                    <MapPin className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Showroom Address</h5>
                    <p className="text-gray-600 mt-0.5 leading-relaxed">
                      44 Johari Bazaar, Pink City, Jaipur, Rajasthan 302003, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639] shrink-0">
                    <Phone className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Phone & Concierge</h5>
                    <p className="text-gray-600 mt-0.5">
                      +91 96944 10462 / +91 78282 98545
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639] shrink-0">
                    <Mail className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Direct Email</h5>
                    <p className="text-gray-600 mt-0.5">
                      manbharcadjewellery22@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639] shrink-0">
                    <Clock className="w-4 h-4 text-[#C5A880]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-gray-900">Studio Hours</h5>
                    <p className="text-gray-600 mt-0.5">
                      Monday to Saturday: 10:30 AM - 8:30 PM (IST)<br />
                      Sunday: By Appointment Only
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <a
                  href="https://wa.me/919694410462"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp (+91 96944 10462)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl border border-[#C5A880]/30 p-8 shadow-xs">
              {isSent ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#273639]">Message Dispatched</h3>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto">
                    Thank you for reaching out. A jewelry specialist from our Jaipur studio will contact you promptly.
                  </p>
                  <button
                    onClick={() => setIsSent(false)}
                    className="px-6 py-2.5 bg-[#273639] text-[#C5A880] text-xs font-bold uppercase rounded-full"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-serif text-xl font-bold text-[#273639] mb-4">
                    Send Us a Message
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                        Your Name *
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
                        Phone Number *
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
                        Inquiry Purpose
                      </label>
                      <select
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                      >
                        <option value="Showroom Appointment">Book Showroom Appointment</option>
                        <option value="Custom Jewelry CAD Request">Custom Jewelry CAD Request</option>
                        <option value="Bulk / Wholesale Inquiry">Bulk / Wholesale Inquiry</option>
                        <option value="Order Tracking & Support">Order Tracking & Support</option>
                        <option value="Other Question">Other Question</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="How can our Jaipur jewelry team assist you?"
                      className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#273639] hover:bg-[#3C4A4C] text-[#C5A880] font-bold text-xs uppercase tracking-widest rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
            Help Center
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#273639] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-serif text-sm font-bold text-gray-900 hover:text-[#C5A880] transition"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
