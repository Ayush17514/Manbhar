import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ShoppingBag, ArrowRight } from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { wishlist, products, navigate } = useStore();

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 pb-16">
      <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C5A880] mb-1">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Saved Treasures</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#273639]">
            My Wishlist ({wishlistProducts.length})
          </h1>
        </div>

        {wishlistProducts.length > 0 && (
          <button
            onClick={() => navigate('collections')}
            className="text-xs font-semibold text-[#273639] hover:underline"
          >
            Explore More Designs →
          </button>
        )}
      </div>

      {wishlistProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-gray-100 p-16 text-center space-y-4 shadow-xs">
          <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mx-auto">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="font-serif text-xl font-bold text-gray-800">Your Wishlist is Empty</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Save your favorite gold chains, bridal necklaces and diamond rings here for later reference or special occasions.
          </p>
          <div>
            <button
              onClick={() => navigate('collections')}
              className="px-6 py-3 rounded-full bg-[#273639] hover:bg-[#3C4A4C] text-[#C5A880] font-bold text-xs uppercase tracking-wider transition shadow-md inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Catalog</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
