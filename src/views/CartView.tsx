import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, ArrowLeft, Sparkles } from 'lucide-react';

export const CartView: React.FC = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart, navigate, showToast } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.03 * 100) / 100;
  const making = Math.round(subtotal * 0.05 * 100) / 100;
  const shipping = subtotal >= 4999 || subtotal === 0 ? 0 : 50.0;
  const grandTotal = Math.max(0, subtotal + gst + making + shipping - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'MANBHAR10') {
      const disc = Math.round(subtotal * 0.1);
      setDiscount(disc);
      setAppliedCoupon('MANBHAR10 (10% OFF)');
      showToast(`Coupon MANBHAR10 applied! You saved ₹${disc.toLocaleString('en-IN')}`, 'success');
    } else if (code === 'JAIPUR500') {
      setDiscount(500);
      setAppliedCoupon('JAIPUR500 (₹500 OFF)');
      showToast('Coupon JAIPUR500 applied! You saved ₹500', 'success');
    } else {
      showToast('Invalid coupon code. Try MANBHAR10 or JAIPUR500', 'error');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] mx-auto shadow-sm">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#273639]">Your Shopping Bag is Empty</h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Explore our certified BIS Hallmarked gold chains, bridal chokers, sparkling earrings and personalized CAD jewelry.
        </p>
        <div>
          <button
            onClick={() => navigate('collections')}
            className="px-8 py-3.5 rounded-full bg-[#273639] hover:bg-[#3C4A4C] text-[#C5A880] font-bold text-xs uppercase tracking-widest transition shadow-lg inline-flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Discover Collections</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#273639]">Shopping Bag</h1>
          <p className="text-xs text-gray-500 mt-1">Review your handcrafted ornaments before checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-600 hover:underline font-medium"
        >
          Clear Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Cart Table (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="divide-y divide-gray-100">
              {cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <img
                    src={item.product.images[0] || '/uploads/categories/rings.webp'}
                    alt={item.product.title}
                    className="w-24 h-24 rounded-xl object-cover bg-gray-50 border border-gray-100 shrink-0 cursor-pointer"
                    onClick={() => navigate('product', { productId: item.product.id })}
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C5A880]">
                      {item.product.category}
                    </span>
                    <h3
                      onClick={() => navigate('product', { productId: item.product.id })}
                      className="font-serif text-sm font-bold text-gray-900 hover:text-[#C5A880] cursor-pointer transition line-clamp-1"
                    >
                      {item.product.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {item.selectedSize ? `Size: ${item.selectedSize}` : item.product.material}
                    </p>
                    <span className="text-xs font-bold text-[#273639] block mt-1">
                      ₹{item.product.price.toLocaleString('en-IN')} each
                    </span>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden bg-white">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 transition"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-bold text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="px-2.5 py-1.5 text-gray-600 hover:bg-gray-100 transition"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right min-w-[90px]">
                      <span className="text-sm font-bold text-[#273639]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-gray-400 hover:text-rose-600 transition p-1"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => navigate('collections')}
            className="text-xs font-semibold text-[#273639] hover:underline inline-flex items-center gap-1.5 pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {/* Right: Summary Box (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Coupon Box */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs">
            <h4 className="font-serif text-xs font-bold uppercase tracking-wider text-gray-800 mb-3 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>Apply Discount Coupon</span>
            </h4>
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Try MANBHAR10 or JAIPUR500"
                className="flex-1 px-3 py-2 text-xs uppercase bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#273639] text-[#C5A880] text-xs font-bold rounded-xl hover:bg-[#3C4A4C] transition"
              >
                Apply
              </button>
            </form>
            {appliedCoupon && (
              <p className="text-xs text-emerald-700 font-medium mt-2 bg-emerald-50 p-2 rounded-lg">
                Applied: {appliedCoupon}
              </p>
            )}
          </div>

          {/* Breakdown Card */}
          <div className="bg-[#fef9f5] p-6 rounded-2xl border border-[#C5A880]/30 shadow-sm space-y-4">
            <h3 className="font-serif text-base font-bold text-[#273639] border-b border-[#C5A880]/20 pb-3">
              Order Summary
            </h3>

            <div className="space-y-2.5 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (3% Hallmarking Tax)</span>
                <span className="font-semibold text-gray-900">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Making Charges (5%)</span>
                <span className="font-semibold text-gray-900">₹{making.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Insured Express Shipping</span>
                <span className="font-semibold text-emerald-700">
                  {shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString('en-IN')}`}
                </span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-[#C5A880]/30 flex justify-between items-baseline">
              <div>
                <span className="font-serif text-sm font-bold text-gray-900">Grand Total</span>
                <p className="text-[10px] text-gray-500">Includes all taxes & certificates</p>
              </div>
              <span className="text-xl font-bold font-serif text-[#273639]">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => navigate('checkout')}
              className="w-full py-4 bg-[#273639] hover:bg-[#3C4A4C] text-[#C5A880] font-bold text-xs uppercase tracking-widest rounded-xl transition shadow-lg flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-gray-500">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Safe & Secure 256-Bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
