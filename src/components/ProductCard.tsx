import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigate, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isLiked = isInWishlist(product.id);
  const mainImage = product.images[0] || '/uploads/categories/rings.webp';
  const hoverImage = product.images[1] || mainImage;
  const currentImage = isHovered && product.images.length > 1 ? hoverImage : mainImage;

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className="relative w-full aspect-square bg-[#f8f6f3] overflow-hidden cursor-pointer"
        onClick={() => navigate('product', { productId: product.id })}
      >
        <img
          src={imgError ? '/uploads/categories/rings.webp' : currentImage}
          alt={product.title}
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
          {product.tag && (
            <span className="bg-[#273639] text-[#C5A880] text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
              {product.tag}
            </span>
          )}
          {discountPercent && (
            <span className="bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-md z-10 ${
            isLiked
              ? 'bg-rose-50 text-rose-600 border border-rose-200'
              : 'bg-white/90 text-gray-700 hover:text-rose-600 hover:bg-white'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-600' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate('product', { productId: product.id });
            }}
            className="w-full py-2.5 bg-white/95 backdrop-blur-xs text-[#273639] font-medium text-xs rounded-xl shadow-lg hover:bg-[#273639] hover:text-white transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
        <div>
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span className="font-medium text-[#C5A880] uppercase tracking-wider text-[11px]">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-gray-700">{product.rating.toFixed(1)}</span>
              <span className="text-gray-400 text-[10px]">({product.reviewCount})</span>
            </div>
          </div>

          <h3
            onClick={() => navigate('product', { productId: product.id })}
            className="font-serif text-base font-semibold text-gray-900 group-hover:text-[#273639] line-clamp-1 cursor-pointer transition-colors"
          >
            {product.title}
          </h3>

          <p className="text-xs text-gray-500 line-clamp-1 mt-1">
            {product.material || 'Fine Handcrafted Jewelry'}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-[#273639]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
            <p className="text-[10px] text-emerald-600 font-medium">Free insured delivery</p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="p-2.5 rounded-xl bg-[#f5ede3] text-[#273639] hover:bg-[#273639] hover:text-[#C5A880] transition-colors shadow-xs"
            aria-label="Add to cart"
            title="Add to Bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
