import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, Order } from '../types';
import { Layers, Package, ShoppingBag, Plus, Trash2, Edit, CheckCircle, Clock, Search, TrendingUp, IndianRupee, MessageSquare, ShieldCheck, X } from 'lucide-react';

export const AdminView: React.FC = () => {
  const { products, orders, enquiries, addProduct, updateProduct, deleteProduct, updateOrderStatus, categories, showToast } = useStore();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'enquiries' | 'analytics'>('products');

  // Search & Filter
  const [productSearch, setProductSearch] = useState('');
  const [orderFilter, setOrderFilter] = useState<string>('all');

  // Product Add / Edit Modal
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Rings');
  const [formPrice, setFormPrice] = useState<number>(999);
  const [formOriginalPrice, setFormOriginalPrice] = useState<number>(1499);
  const [formStock, setFormStock] = useState<number>(20);
  const [formTag, setFormTag] = useState('Trending');
  const [formMaterial, setFormMaterial] = useState('18K Gold Plated Brass');
  const [formStones, setFormStones] = useState('Zircon Crystals');
  const [formGrossWeight, setFormGrossWeight] = useState<number>(4.5);
  const [formDescription, setFormDescription] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('/uploads/categories/rings.webp');

  // Metrics
  const totalRevenue = orders.reduce((acc, o) => acc + o.grand_total, 0);
  const totalItemsSold = orders.reduce((acc, o) => acc + o.items.reduce((s, i) => s + i.quantity, 0), 0);

  const handleOpenAdd = () => {
    setEditingProductId(null);
    setFormTitle('');
    setFormCategory('Rings');
    setFormPrice(999);
    setFormOriginalPrice(1499);
    setFormStock(20);
    setFormTag('Trending');
    setFormMaterial('18K Gold Plated');
    setFormStones('Zircon');
    setFormGrossWeight(4.5);
    setFormDescription('');
    setFormImageUrl('/uploads/categories/rings.webp');
    setIsProductModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProductId(p.id);
    setFormTitle(p.title);
    setFormCategory(p.category);
    setFormPrice(p.price);
    setFormOriginalPrice(p.originalPrice || p.price);
    setFormStock(p.stock);
    setFormTag(p.tag || '');
    setFormMaterial(p.material || '');
    setFormStones(p.stones || '');
    setFormGrossWeight(p.gross_weight || 0);
    setFormDescription(p.description);
    setFormImageUrl(p.images[0] || '/uploads/categories/rings.webp');
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingProductId) {
      updateProduct(editingProductId, {
        title: formTitle,
        category: formCategory,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        stock: Number(formStock),
        tag: formTag,
        material: formMaterial,
        stones: formStones,
        gross_weight: Number(formGrossWeight),
        description: formDescription,
        images: [formImageUrl]
      });
    } else {
      addProduct({
        title: formTitle,
        category: formCategory,
        price: Number(formPrice),
        originalPrice: Number(formOriginalPrice),
        stock: Number(formStock),
        tag: formTag,
        material: formMaterial,
        stones: formStones,
        gross_weight: Number(formGrossWeight),
        description: formDescription,
        images: [formImageUrl]
      });
    }

    setIsProductModalOpen(false);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.order_status.toLowerCase() === orderFilter.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-16">
      {/* Admin Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A880] mb-1">
            <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
            <span>Manbhar Backoffice</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#273639]">
            Store Administration & Management
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 bg-[#273639] hover:bg-[#3C4A4C] text-[#C5A880] font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-md flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Ornament</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <IndianRupee className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase text-gray-400">Total Revenue</span>
            <h4 className="text-xl font-bold font-serif text-gray-900">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#fef9f5] text-[#273639] flex items-center justify-center shrink-0 border border-[#C5A880]/30">
            <ShoppingBag className="w-6 h-6 text-[#C5A880]" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase text-gray-400">Customer Orders</span>
            <h4 className="text-xl font-bold font-serif text-gray-900">{orders.length}</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase text-gray-400">Active Catalog</span>
            <h4 className="text-xl font-bold font-serif text-gray-900">{products.length} Items</h4>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase text-gray-400">Bespoke Inquiries</span>
            <h4 className="text-xl font-bold font-serif text-gray-900">{enquiries.length}</h4>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-6">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-3 font-serif text-sm font-bold transition border-b-2 ${
            activeTab === 'products'
              ? 'border-[#273639] text-[#273639]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Catalog Products ({products.length})
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 font-serif text-sm font-bold transition border-b-2 ${
            activeTab === 'orders'
              ? 'border-[#273639] text-[#273639]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Customer Orders ({orders.length})
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`pb-3 font-serif text-sm font-bold transition border-b-2 ${
            activeTab === 'enquiries'
              ? 'border-[#273639] text-[#273639]'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          Custom Inquiries ({enquiries.length})
        </button>
      </div>

      {/* Tab 1: Products */}
      {activeTab === 'products' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100">
            <div className="relative w-72">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-xl"
              />
            </div>
            <span className="text-xs text-gray-500 font-medium">
              Showing {filteredProducts.length} items
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#273639] text-white uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Item</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Tag</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={p.images[0] || '/uploads/categories/rings.webp'}
                          alt={p.title}
                          className="w-12 h-12 rounded-lg object-cover bg-gray-50 border border-gray-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <h5 className="font-semibold text-gray-900 truncate max-w-xs">{p.title}</h5>
                          <span className="text-[11px] text-gray-400">ID: #{p.id} • {p.material}</span>
                        </div>
                      </td>
                      <td className="p-4 font-medium text-gray-700">{p.category}</td>
                      <td className="p-4 font-bold text-[#273639]">₹{p.price.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          p.stock > 10 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {p.stock} units
                        </span>
                      </td>
                      <td className="p-4">
                        {p.tag && (
                          <span className="px-2 py-0.5 bg-[#fef9f5] border border-[#C5A880]/40 text-[#273639] rounded-md font-semibold text-[10px]">
                            {p.tag}
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEdit(p)}
                          className="p-1.5 text-gray-600 hover:text-[#273639] hover:bg-gray-100 rounded-lg transition"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${p.title}"?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            {['all', 'Order Placed', 'Processing', 'Shipped', 'Delivered'].map((status) => (
              <button
                key={status}
                onClick={() => setOrderFilter(status)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition ${
                  orderFilter === status
                    ? 'bg-[#273639] text-[#C5A880]'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-[#273639] text-white uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4">Order #</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Items</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Payment</th>
                    <th className="p-4">Fulfillment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredOrders.map((o) => (
                    <tr key={o.id} className="hover:bg-gray-50">
                      <td className="p-4 font-mono font-bold text-[#273639]">{o.order_number}</td>
                      <td className="p-4">
                        <span className="font-semibold text-gray-900 block">{o.name}</span>
                        <span className="text-[11px] text-gray-400">{o.phone} • {o.city}</span>
                      </td>
                      <td className="p-4">
                        <span className="font-medium text-gray-700">
                          {o.items.length} item(s)
                        </span>
                      </td>
                      <td className="p-4 font-bold text-gray-900">₹{o.grand_total.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 bg-gray-100 rounded text-[10px] font-semibold text-gray-700">
                          {o.payment_method} ({o.payment_status})
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={o.order_status}
                          onChange={(e) =>
                            updateOrderStatus(o.id, e.target.value as Order['order_status'])
                          }
                          className="px-2.5 py-1 text-xs font-semibold bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                        >
                          <option value="Order Placed">Order Placed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Custom Enquiries */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          {enquiries.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-gray-100">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-2" />
              <h4 className="font-serif font-bold text-gray-800">No Inquiries Yet</h4>
              <p className="text-xs text-gray-500">Customer bespoke CAD requests submitted through the Services page will appear here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enquiries.map((enq) => (
                <div key={enq.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs space-y-2">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                    <div>
                      <h4 className="font-bold text-gray-900 text-xs">{enq.name}</h4>
                      <span className="text-[11px] text-gray-500">{enq.phone} • {enq.email}</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-mono">
                      {new Date(enq.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <span className="inline-block text-[11px] font-semibold text-[#273639] bg-[#fef9f5] px-2 py-0.5 rounded border border-[#C5A880]/30">
                    {enq.service}
                  </span>
                  <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl leading-relaxed">
                    "{enq.message}"
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl border border-[#C5A880]/30">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-serif text-lg font-bold text-[#273639]">
                {editingProductId ? 'Edit Ornament' : 'Add New Ornament to Catalog'}
              </h3>
              <button onClick={() => setIsProductModalOpen(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Royal Emerald Heritage Choker"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    {categories.map((c) => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">Original MRP (₹)</label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={(e) => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">Tag Badge</label>
                  <select
                    value={formTag}
                    onChange={(e) => setFormTag(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    <option value="">None</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="Trending">Trending</option>
                    <option value="New">New</option>
                    <option value="Featured">Featured</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">Gross Wt (g)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formGrossWeight}
                    onChange={(e) => setFormGrossWeight(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-gray-700 mb-1">Metal / Material</label>
                  <input
                    type="text"
                    value={formMaterial}
                    onChange={(e) => setFormMaterial(e.target.value)}
                    placeholder="18K Gold / 925 Silver"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">Gemstones</label>
                <input
                  type="text"
                  value={formStones}
                  onChange={(e) => setFormStones(e.target.value)}
                  placeholder="e.g. Zircon, Emerald, Moissanite"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">Image URL / Path</label>
                <input
                  type="text"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.target.value)}
                  placeholder="/uploads/categories/rings.webp"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Detailed description of the jewelry piece..."
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-5 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#273639] hover:bg-[#3C4A4C] text-[#C5A880] font-bold rounded-xl shadow-md"
                >
                  Save Ornament
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
