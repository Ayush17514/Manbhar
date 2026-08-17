import React from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, PackageCheck, Truck, Sparkles, ArrowRight, ShieldCheck, Download, Home } from 'lucide-react';
import { motion } from 'motion/react';

export const OrderSuccessView: React.FC = () => {
  const { currentRoute, orders, navigate } = useStore();

  const orderId = currentRoute.orderId;
  const order = orders.find((o) => o.id === orderId) || orders[0];

  if (!order) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <h2 className="text-xl font-bold font-serif">No order found</h2>
        <button
          onClick={() => navigate('home')}
          className="mt-4 px-6 py-2 bg-[#273639] text-[#C5A880] text-xs font-bold rounded-full"
        >
          Return Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Success banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl border border-[#C5A880]/30 p-8 sm:p-12 text-center shadow-xl relative overflow-hidden"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="inline-flex items-center gap-1.5 bg-[#fef9f5] border border-[#C5A880]/30 text-[#273639] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Order Confirmed & Secured</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#273639]">
          Thank You, {order.name}!
        </h1>
        <p className="text-sm text-gray-600 mt-2 max-w-md mx-auto">
          Your bespoke jewelry order has been received. Our Jaipur atelier has initiated handcrafted preparation and BIS hallmarking.
        </p>

        <div className="mt-6 inline-block bg-gray-50 border border-gray-200 px-5 py-2.5 rounded-2xl text-xs">
          <span className="text-gray-500">Order Reference: </span>
          <strong className="text-[#273639] font-mono text-sm tracking-wider">{order.order_number}</strong>
        </div>

        {/* Stepper tracker */}
        <div className="mt-10 pt-8 border-t border-gray-100 max-w-2xl mx-auto">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-[#273639] text-[#C5A880] flex items-center justify-center mx-auto text-xs font-bold shadow-xs">
                ✓
              </div>
              <span className="text-[11px] font-bold text-gray-900 block">Order Placed</span>
              <span className="text-[10px] text-gray-400">Confirmed</span>
            </div>

            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-[#C5A880] text-gray-900 flex items-center justify-center mx-auto text-xs font-bold shadow-xs">
                2
              </div>
              <span className="text-[11px] font-bold text-gray-900 block">Handcrafted QC</span>
              <span className="text-[10px] text-gray-400">BIS Hallmarked</span>
            </div>

            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto text-xs font-bold">
                3
              </div>
              <span className="text-[11px] font-bold text-gray-400 block">Shipped</span>
              <span className="text-[10px] text-gray-400">Insured Transit</span>
            </div>

            <div className="space-y-1">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto text-xs font-bold">
                4
              </div>
              <span className="text-[11px] font-bold text-gray-400 block">Delivered</span>
              <span className="text-[10px] text-gray-400">To Doorstep</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Itemized Order Details & Address */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Items */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-4">
          <h3 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
            Purchased Ornaments ({order.items.length})
          </h3>
          <div className="space-y-3">
            {order.items.map((item) => (
              <div key={item.product_id} className="flex items-center gap-3 text-xs">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-14 h-14 rounded-xl object-cover bg-gray-50 border border-gray-100 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-gray-500">
                    Qty: {item.quantity} {item.selectedSize && `• ${item.selectedSize}`}
                  </p>
                  <span className="font-bold text-[#273639] text-xs">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-1.5 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (3%):</span>
              <span>₹{order.gst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Making Charges:</span>
              <span>₹{order.making.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-sm pt-2 border-t border-gray-100">
              <span>Total Paid ({order.payment_method}):</span>
              <span className="text-[#273639]">₹{order.grand_total.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Shipping address & dispatch notice */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <h3 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-100 pb-3">
              Delivery Destination
            </h3>
            <div className="text-xs text-gray-700 space-y-1 pt-2">
              <p className="font-bold text-gray-900">{order.name}</p>
              <p>{order.address}</p>
              <p>{order.city}, {order.state} - {order.pincode}</p>
              <p className="pt-1 text-gray-500">Phone: {order.phone}</p>
              <p className="text-gray-500">Email: {order.email}</p>
            </div>
          </div>

          <div className="bg-[#fef9f5] border border-[#C5A880]/30 p-4 rounded-xl text-xs text-gray-600 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-[#273639]">
              <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
              <span>Jaipur Studio Dispatch Notice</span>
            </div>
            <p className="text-[11px] text-gray-500">
              A copy of the digital invoice and tracking link have been dispatched to your email.
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={() => navigate('profile')}
          className="w-full sm:w-auto px-8 py-3.5 bg-[#273639] hover:bg-[#3C4A4C] text-[#C5A880] font-bold text-xs uppercase tracking-widest rounded-full transition shadow-lg flex items-center justify-center gap-2"
        >
          <span>Track in My Orders</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigate('home')}
          className="w-full sm:w-auto px-6 py-3.5 border border-gray-300 text-gray-800 font-semibold text-xs uppercase tracking-widest rounded-full hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </button>
      </div>
    </div>
  );
};
