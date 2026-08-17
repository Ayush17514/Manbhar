import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Truck, CreditCard, QrCode, Banknote, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

export const CheckoutView: React.FC = () => {
  const { cart, placeOrder, navigate, user, showToast } = useStore();

  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '9694410462');
  const [email, setEmail] = useState(user?.email || 'customer@example.com');
  const [address, setAddress] = useState('B-14 Malviya Nagar, Near World Trade Park');
  const [city, setCity] = useState('Jaipur');
  const [state, setState] = useState('Rajasthan');
  const [pincode, setPincode] = useState('302017');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'UPI' | 'Card'>('UPI');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.03 * 100) / 100;
  const making = Math.round(subtotal * 0.05 * 100) / 100;
  const shipping = subtotal >= 4999 || subtotal === 0 ? 0 : 50.0;
  const grandTotal = subtotal + gst + making + shipping;

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-serif font-bold text-gray-800">Your bag is empty</h2>
        <p className="text-xs text-gray-500">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => navigate('collections')}
          className="px-6 py-2.5 bg-[#273639] text-[#C5A880] text-xs font-bold uppercase rounded-full"
        >
          Explore Catalog
        </button>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address || !pincode) {
      showToast('Please complete all required shipping fields', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const createdOrder = await placeOrder({
        name,
        phone,
        email,
        address,
        city,
        state,
        pincode,
        payment_method: paymentMethod
      });

      showToast(`Order ${createdOrder.order_number} placed successfully!`, 'success');
      navigate('order-success', { orderId: createdOrder.id });
    } catch (err) {
      showToast('Error placing order. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#273639]">Secure Checkout</h1>
        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>BIS Hallmarked Gold Delivery with Full Transit Insurance</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Shipping & Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Shipping Details */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#273639] text-[#C5A880] text-xs flex items-center justify-center font-bold">1</span>
              <span>Shipping & Contact Information</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
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
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                  Phone Number (For OTP & Courier) *
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

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                Email Address (For Tax Invoice & Hallmark Certificate) *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">
                Street Address, Flat / House No. *
              </label>
              <textarea
                required
                rows={2}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House / Apartment number, Street, Landmark"
                className="w-full px-3.5 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">City *</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">State *</label>
                <input
                  type="text"
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-gray-700 mb-1">Pincode *</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#C5A880]"
                />
              </div>
            </div>
          </div>

          {/* 2. Payment Method */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
            <h3 className="font-serif text-base font-bold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#273639] text-[#C5A880] text-xs flex items-center justify-center font-bold">2</span>
              <span>Payment Option</span>
            </h3>

            <div className="space-y-3">
              {/* UPI Option */}
              <label
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'UPI'
                    ? 'border-[#273639] bg-[#fef9f5] ring-2 ring-[#C5A880]/30'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="text-[#273639] focus:ring-[#C5A880]"
                  />
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">Instant UPI & QR (Google Pay, PhonePe, Paytm)</h5>
                    <p className="text-[11px] text-gray-500">Fastest confirmation with zero transaction fees</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Recommended
                </span>
              </label>

              {/* Card Option */}
              <label
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'Card'
                    ? 'border-[#273639] bg-[#fef9f5] ring-2 ring-[#C5A880]/30'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'Card'}
                    onChange={() => setPaymentMethod('Card')}
                    className="text-[#273639] focus:ring-[#C5A880]"
                  />
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">Credit / Debit Card (Visa, RuPay, MasterCard)</h5>
                    <p className="text-[11px] text-gray-500">Secure 3D verification gateway</p>
                  </div>
                </div>
              </label>

              {/* COD Option */}
              <label
                className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                  paymentMethod === 'COD'
                    ? 'border-[#273639] bg-[#fef9f5] ring-2 ring-[#C5A880]/30'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="text-[#273639] focus:ring-[#C5A880]"
                  />
                  <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900">Cash on Delivery (COD)</h5>
                    <p className="text-[11px] text-gray-500">Pay cash or UPI upon package inspection</p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Order Preview Box (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#fef9f5] p-6 rounded-2xl border border-[#C5A880]/30 shadow-sm space-y-4">
            <h3 className="font-serif text-base font-bold text-[#273639] border-b border-[#C5A880]/20 pb-3">
              Items in Order ({cart.length})
            </h3>

            {/* List of items */}
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.product.images[0] || '/uploads/categories/rings.webp'}
                    alt={item.product.title}
                    className="w-12 h-12 rounded-lg object-cover bg-white border border-gray-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-gray-900 truncate">{item.product.title}</h5>
                    <span className="text-[11px] text-gray-500">
                      Qty: {item.quantity} {item.selectedSize && `• ${item.selectedSize}`}
                    </span>
                  </div>
                  <span className="font-bold text-[#273639]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-gray-600 pt-3 border-t border-[#C5A880]/20">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (3%)</span>
                <span className="font-semibold text-gray-900">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Making Charges (5%)</span>
                <span className="font-semibold text-gray-900">₹{making.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Express Insured Shipping</span>
                <span className="font-semibold text-emerald-700">
                  {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#C5A880]/30 flex justify-between items-baseline">
              <span className="font-serif text-sm font-bold text-gray-900">Total Payable</span>
              <span className="text-xl font-bold font-serif text-[#273639]">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-[#273639] hover:bg-[#3C4A4C] text-[#C5A880] font-bold text-xs uppercase tracking-widest rounded-xl transition shadow-xl flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Placing Your Order...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm & Place Order</span>
                </>
              )}
            </button>

            <div className="p-3 bg-white rounded-xl border border-gray-100 text-[11px] text-gray-600 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Genuine BIS Hallmark Guarantee</span>
              </div>
              <p className="text-[10px] text-gray-500">
                Includes tamper-evident luxury presentation box, hallmark authentication certificate, and 1-year manufacturing warranty.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
