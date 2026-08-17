import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { User, Package, Heart, ShieldCheck, MapPin, Phone, Mail, LogOut, ChevronRight, Sparkles, Layers } from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, orders, wishlist, logout, navigate } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');

  if (!user) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639] mx-auto">
          <User className="w-8 h-8 text-[#C5A880]" />
        </div>
        <h2 className="text-xl font-serif font-bold text-gray-900">Please Sign In</h2>
        <p className="text-xs text-gray-500">Access your order histories, tracking updates, and saved fine jewelry.</p>
        <button
          onClick={() => navigate('home')}
          className="px-6 py-2.5 bg-[#273639] text-[#C5A880] font-bold text-xs uppercase rounded-full"
        >
          Return to Store
        </button>
      </div>
    );
  }

  // Filter user's orders or show all if guest/admin
  const userOrders = orders;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-16">
      {/* User Header Card */}
      <div className="bg-[#273639] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#C5A880]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 rounded-2xl bg-[#C5A880] text-[#273639] font-serif font-bold text-2xl flex items-center justify-center shadow-lg">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-white">{user.name}</h1>
              <span className="text-[10px] font-bold bg-white/20 text-[#F7E7CE] px-2 py-0.5 rounded-full capitalize">
                {user.role}
              </span>
            </div>
            <p className="text-xs text-gray-300 mt-0.5">{user.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.role === 'admin' && (
            <button
              onClick={() => navigate('admin')}
              className="px-4 py-2 bg-[#C5A880] hover:bg-[#d6bc96] text-[#273639] font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-1.5 shadow-md"
            >
              <Layers className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </button>
          )}

          <button
            onClick={() => {
              logout();
              navigate('home');
            }}
            className="px-4 py-2 border border-white/20 hover:bg-white/10 text-white font-semibold text-xs rounded-xl transition flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-6">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 font-serif text-sm font-bold transition border-b-2 ${
            activeTab === 'orders'
              ? 'border-[#273639] text-[#273639]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          My Orders ({userOrders.length})
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 font-serif text-sm font-bold transition border-b-2 ${
            activeTab === 'profile'
              ? 'border-[#273639] text-[#273639]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Account Details
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {userOrders.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center space-y-4">
              <Package className="w-12 h-12 text-gray-400 mx-auto" />
              <h3 className="font-serif text-lg font-bold text-gray-800">No orders placed yet</h3>
              <p className="text-xs text-gray-500">Your future bespoke jewelry purchases will appear here.</p>
              <button
                onClick={() => navigate('collections')}
                className="px-6 py-2.5 bg-[#273639] text-[#C5A880] text-xs font-bold uppercase rounded-full"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            userOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-xs p-6 space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4 text-xs">
                  <div>
                    <span className="text-gray-400">Order Reference: </span>
                    <strong className="text-[#273639] font-mono text-sm">{order.order_number}</strong>
                    <span className="text-gray-400 ml-3">Placed on: {new Date(order.created_at).toLocaleDateString()}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full font-bold text-[11px] ${
                        order.order_status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : order.order_status === 'Shipped'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      Status: {order.order_status}
                    </span>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full font-semibold text-[10px]">
                      {order.payment_method} ({order.payment_status})
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.product_id} className="flex items-center gap-4 text-xs">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover bg-gray-50 border border-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-gray-900 text-sm">{item.title}</h4>
                        <p className="text-gray-500">
                          Qty: {item.quantity} {item.selectedSize && `• ${item.selectedSize}`}
                        </p>
                        <span className="font-bold text-[#273639] mt-0.5 block">
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer summary */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100 bg-[#fef9f5] -mx-6 -mb-6 p-6 rounded-b-3xl text-xs">
                  <div>
                    <span className="text-gray-500">Shipping to: </span>
                    <span className="font-semibold text-gray-800">{order.address}, {order.city}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-gray-700">Total: </span>
                    <span className="text-lg font-bold font-serif text-[#273639]">
                      ₹{order.grand_total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Profile Details Tab */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-xs max-w-2xl space-y-6">
          <h3 className="font-serif text-lg font-bold text-[#273639]">Personal Information</h3>
          <div className="space-y-4 text-xs">
            <div>
              <span className="text-gray-400 uppercase font-bold block mb-1">Full Name</span>
              <p className="font-semibold text-gray-900 text-sm">{user.name}</p>
            </div>
            <div>
              <span className="text-gray-400 uppercase font-bold block mb-1">Registered Email</span>
              <p className="font-semibold text-gray-900 text-sm">{user.email}</p>
            </div>
            <div>
              <span className="text-gray-400 uppercase font-bold block mb-1">Phone Number</span>
              <p className="font-semibold text-gray-900 text-sm">{user.phone || '+91 96944 10462'}</p>
            </div>
            <div>
              <span className="text-gray-400 uppercase font-bold block mb-1">Saved Showroom Location</span>
              <p className="font-semibold text-gray-900 text-sm">Jaipur, Rajasthan</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
