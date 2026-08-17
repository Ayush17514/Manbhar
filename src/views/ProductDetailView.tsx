import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Star, Heart, ShoppingBag, Truck, ShieldCheck, RefreshCw, Sparkles, ChevronRight, Check, MapPin, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

export const ProductDetailView: React.FC = () => {
  const {
    currentRoute,
    products,
    reviews,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigate,
    addReview,
    setIsCartOpen,
    showToast
  } = useStore();

  const productId = currentRoute.productId || 1;
  const product = products.find((p) => p.id === productId) || products[0];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>(product.size || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>('details');

  // Review Form state
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');

  // Delivery check state
  const [pincode, setPincode] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState<string | null>(null);

  const isLiked = isInWishlist(product.id);
  const productReviews = reviews.filter((r) => r.product_id === product.id);

  const images = product.images && product.images.length > 0
    ? product.images
    : ['/uploads/categories/rings.webp'];

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerComment.trim()) return;
    addReview(product.id, reviewerName || 'Verified Buyer', reviewerRating, reviewerComment);
    setReviewerComment('');
    setReviewerName('');
  };

  const checkDeliveryPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setDeliveryStatus(`Express delivery available to ${pincode} by ${(new Date(Date.now() + 3 * 86400000)).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}.`);
    } else {
      setDeliveryStatus('Please enter a valid 6-digit Indian PIN code.');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard!', 'info');
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-[#fef9f5] border-b border-[#C5A880]/20 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <button onClick={() => navigate('home')} className="hover:text-[#273639]">Home</button>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <button onClick={() => navigate('collections')} className="hover:text-[#273639]">Collections</button>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <button
              onClick={() => navigate('collections', { category: product.category })}
              className="hover:text-[#273639]"
            >
              {product.category}
            </button>
            <ChevronRight className="w-3 h-3 text-gray-400" />
            <span className="text-[#273639] font-bold truncate max-w-xs">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Main Product Display */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Gallery (5 cols) */}
          <div className="lg:col-span-6 space-y-4">
            {/* Big Main Image */}
            <div className="relative aspect-square bg-[#f8f6f3] rounded-3xl overflow-hidden border border-gray-100 shadow-lg">
              <motion.img
                key={selectedImageIndex}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                src={images[selectedImageIndex] || '/uploads/categories/rings.webp'}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />

              {/* Tag & Discount */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                {product.tag && (
                  <span className="bg-[#273639] text-[#C5A880] text-xs font-bold tracking-wider uppercase px-3 py-1 rounded-full shadow-md">
                    {product.tag}
                  </span>
                )}
                {discountPercent && (
                  <span className="bg-rose-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full shadow-md">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* Share & Wishlist overlay */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs text-gray-700 hover:text-[#273639] hover:bg-white flex items-center justify-center shadow-md transition"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition ${
                    isLiked
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : 'bg-white/90 text-gray-700 hover:text-rose-600 hover:bg-white'
                  }`}
                  title="Save to Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isLiked ? 'fill-rose-600' : ''}`} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                      selectedImageIndex === idx
                        ? 'border-[#273639] ring-2 ring-[#C5A880]/50'
                        : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Buy Box & Specs (7 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
                {product.category} • Certified Jaipur Jewelry
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#273639] mt-1 leading-snug">
                {product.title}
              </h1>

              {/* Ratings */}
              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold text-gray-800">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-gray-500">
                  Based on <strong>{productReviews.length}</strong> verified customer reviews
                </span>
              </div>
            </div>

            {/* Price Box */}
            <div className="bg-[#fef9f5] border border-[#C5A880]/30 p-5 rounded-2xl">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold font-serif text-[#273639]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-gray-400 line-through">
                    MRP ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {discountPercent && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Save ₹{(product.originalPrice! - product.price).toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-gray-500 mt-1">
                Inclusive of all taxes. Free insured express shipping across India.
              </p>
            </div>

            {/* Key Specs Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Metal</span>
                <span className="font-semibold text-gray-800">{product.material || '18K Gold Plated'}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Gemstones</span>
                <span className="font-semibold text-gray-800">{product.stones || 'Zircon Crystals'}</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Gross Weight</span>
                <span className="font-semibold text-gray-800">{product.gross_weight ? `${product.gross_weight}g` : '4.5g'}</span>
              </div>
            </div>

            {/* Size selection */}
            {product.size && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                  Size / Dimension: <span className="text-[#273639] font-normal">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {[product.size, 'Custom Size'].map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                        selectedSize === sz
                          ? 'bg-[#273639] text-[#C5A880] border-[#273639]'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-200 bg-white rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 text-xs font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 font-bold"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-emerald-600 font-medium">
                  In Stock ({product.stock} pieces left)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => addToCart(product, quantity, selectedSize)}
                  className="py-3.5 px-6 rounded-xl bg-[#fef9f5] border-2 border-[#273639] text-[#273639] font-bold text-xs uppercase tracking-widest hover:bg-[#273639] hover:text-[#C5A880] transition shadow-xs flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add To Bag</span>
                </button>

                <button
                  onClick={() => {
                    addToCart(product, quantity, selectedSize);
                    navigate('checkout');
                  }}
                  className="py-3.5 px-6 rounded-xl bg-[#273639] hover:bg-[#3C4A4C] text-[#C5A880] font-bold text-xs uppercase tracking-widest transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="pt-4 border-t border-gray-100">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                Check Delivery Availability
              </label>
              <form onSubmit={checkDeliveryPincode} className="flex gap-2">
                <div className="relative flex-1">
                  <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="Enter 6-digit PIN code..."
                    className="w-full pl-9 pr-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gray-900 text-white font-semibold text-xs rounded-xl hover:bg-black transition"
                >
                  Check
                </button>
              </form>
              {deliveryStatus && (
                <p className="text-xs text-emerald-700 font-medium mt-2 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100">
                  {deliveryStatus}
                </p>
              )}
            </div>

            {/* Value Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100 text-center">
              <div className="p-2">
                <ShieldCheck className="w-5 h-5 text-[#C5A880] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-gray-800 block">BIS Hallmark</span>
                <span className="text-[10px] text-gray-500">100% Certified</span>
              </div>
              <div className="p-2">
                <Truck className="w-5 h-5 text-[#C5A880] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-gray-800 block">Free Shipping</span>
                <span className="text-[10px] text-gray-500">Insured Delivery</span>
              </div>
              <div className="p-2">
                <RefreshCw className="w-5 h-5 text-[#C5A880] mx-auto mb-1" />
                <span className="text-[11px] font-bold text-gray-800 block">Easy Exchange</span>
                <span className="text-[10px] text-gray-500">Lifetime Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Tabs: Description, Specs, Reviews */}
        <div className="mt-16 bg-white rounded-3xl border border-gray-100 shadow-xs overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-100 bg-gray-50/50">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-8 py-4 font-serif text-sm font-bold transition border-b-2 ${
                activeTab === 'details'
                  ? 'border-[#273639] text-[#273639] bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Description & Craftsmanship
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-8 py-4 font-serif text-sm font-bold transition border-b-2 ${
                activeTab === 'specs'
                  ? 'border-[#273639] text-[#273639] bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Gold & Stone Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-8 py-4 font-serif text-sm font-bold transition border-b-2 ${
                activeTab === 'reviews'
                  ? 'border-[#273639] text-[#273639] bg-white'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              Reviews ({productReviews.length})
            </button>
          </div>

          <div className="p-8">
            {/* Tab 1: Description */}
            {activeTab === 'details' && (
              <div className="space-y-4 max-w-3xl text-sm text-gray-700 leading-relaxed">
                <p>{product.description}</p>
                {product.additional_info && (
                  <div className="bg-[#fef9f5] border-l-4 border-[#C5A880] p-4 rounded-r-xl">
                    <h5 className="font-serif font-bold text-[#273639] text-xs uppercase mb-1">
                      Packaging & Guarantee
                    </h5>
                    <p className="text-xs text-gray-600">{product.additional_info}</p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Specs Table */}
            {activeTab === 'specs' && (
              <div className="max-w-2xl">
                <table className="w-full text-xs text-left border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 pr-4 font-semibold text-gray-500 w-1/3">Product Category</th>
                      <td className="py-3 font-medium text-gray-900">{product.category}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 pr-4 font-semibold text-gray-500">Material Composition</th>
                      <td className="py-3 font-medium text-gray-900">{product.material || '18K Gold Plated Brass'}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 pr-4 font-semibold text-gray-500">Gemstone Setting</th>
                      <td className="py-3 font-medium text-gray-900">{product.stones || 'None'}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 pr-4 font-semibold text-gray-500">Gross Weight</th>
                      <td className="py-3 font-medium text-gray-900">{product.gross_weight ? `${product.gross_weight} grams` : '4.50 grams'}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 pr-4 font-semibold text-gray-500">Metal Net Weight</th>
                      <td className="py-3 font-medium text-gray-900">{product.metal_weight ? `${product.metal_weight} grams` : '3.80 grams'}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 pr-4 font-semibold text-gray-500">Dimensions</th>
                      <td className="py-3 font-medium text-gray-900">{product.dimensions || 'Standard Jaipur Fitting'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 3: Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-8">
                {/* Submit review */}
                <div className="bg-[#fef9f5] border border-[#C5A880]/30 p-6 rounded-2xl max-w-xl">
                  <h4 className="font-serif text-base font-bold text-[#273639] mb-3">
                    Write a Customer Review
                  </h4>
                  <form onSubmit={handleReviewSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Your Name</label>
                        <input
                          type="text"
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          placeholder="e.g. Pooja S."
                          className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Rating</label>
                        <select
                          value={reviewerRating}
                          onChange={(e) => setReviewerRating(Number(e.target.value))}
                          className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl"
                        >
                          <option value={5}>★★★★★ 5 Stars (Excellent)</option>
                          <option value={4}>★★★★☆ 4 Stars (Very Good)</option>
                          <option value={3}>★★★☆☆ 3 Stars (Good)</option>
                          <option value={2}>★★☆☆☆ 2 Stars (Fair)</option>
                          <option value={1}>★☆☆☆☆ 1 Star (Poor)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">Your Experience</label>
                      <textarea
                        rows={3}
                        value={reviewerComment}
                        onChange={(e) => setReviewerComment(e.target.value)}
                        placeholder="Tell others about the shine, weight, packaging and delivery..."
                        className="w-full px-3 py-2 text-xs bg-white border border-gray-200 rounded-xl"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#273639] text-[#C5A880] font-semibold text-xs uppercase tracking-wider rounded-xl hover:bg-[#3C4A4C] transition"
                    >
                      Submit Review
                    </button>
                  </form>
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {productReviews.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">No reviews yet. Be the first to review this piece!</p>
                  ) : (
                    productReviews.map((rev) => (
                      <div key={rev.id} className="p-4 bg-gray-50/70 border border-gray-100 rounded-2xl space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-900">{rev.name}</span>
                            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                              Verified Purchase
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-400">
                            {new Date(rev.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{rev.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
                Match Your Style
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#273639] mt-1">
                You May Also Admire
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
