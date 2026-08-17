import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, Sparkles, Phone, ShieldCheck, MapPin, Layers } from 'lucide-react';
import { AuthModal } from './AuthModal';

export const Header: React.FC = () => {
  const {
    navigate,
    currentRoute,
    cart,
    wishlist,
    setIsCartOpen,
    categories,
    products,
    user
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const wishlistCount = wishlist.length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('collections', { search: searchQuery.trim() });
      setIsSearchOpen(false);
    }
  };

  const matchingSuggestions = searchQuery.trim()
    ? products
        .filter((p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.material?.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 5)
    : [];

  return (
    <header className="fixed top-0 inset-x-0 z-40">
      {/* Top Announcement Bar */}
      <div className="bg-[#273639] text-[#F7E7CE] text-[11px] py-1.5 px-4 tracking-wider uppercase font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
              100% Certified BIS Hallmarked
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:flex items-center gap-1 text-white/80">
              <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
              Jaipur Flagship Studio
            </span>
          </div>

          <div className="mx-auto sm:mx-0 flex items-center gap-1.5 text-white/90">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Free Insured Express Shipping On Orders Over ₹4,999</span>
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+919694410462"
              className="flex items-center gap-1 text-white/80 hover:text-white transition"
            >
              <Phone className="w-3 h-3 text-[#C5A880]" />
              <span>+91 96944 10462</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
            : 'bg-[#fef9f5] border-b border-[#C5A880]/20 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Mobile Menu & Desktop Nav */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#273639] transition"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
              <button
                onClick={() => navigate('home')}
                className={`transition-colors uppercase tracking-wider text-xs ${
                  currentRoute.view === 'home'
                    ? 'text-[#273639] font-bold border-b-2 border-[#C5A880] pb-0.5'
                    : 'text-gray-700 hover:text-[#273639]'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => navigate('collections')}
                className={`transition-colors uppercase tracking-wider text-xs ${
                  currentRoute.view === 'collections' && !currentRoute.category
                    ? 'text-[#273639] font-bold border-b-2 border-[#C5A880] pb-0.5'
                    : 'text-gray-700 hover:text-[#273639]'
                }`}
              >
                Collections
              </button>

              {/* Categories Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
                onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
              >
                <button
                  onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
                  className="flex items-center gap-1 uppercase tracking-wider text-xs text-gray-700 hover:text-[#273639] py-2 transition"
                >
                  <span>Categories</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {isCategoriesDropdownOpen && (
                  <div className="absolute top-full left-0 w-[580px] bg-white rounded-2xl shadow-2xl border border-[#C5A880]/20 p-5 grid grid-cols-3 gap-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {categories.map((cat) => (
                      <button
                        key={cat.name}
                        onClick={() => {
                          navigate('collections', { category: cat.name });
                          setIsCategoriesDropdownOpen(false);
                        }}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#fef9f5] transition group text-left"
                      >
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-10 h-10 rounded-lg object-cover bg-gray-100 group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <span className="text-xs font-semibold text-gray-800 group-hover:text-[#273639]">
                            {cat.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => navigate('services')}
                className={`transition-colors uppercase tracking-wider text-xs ${
                  currentRoute.view === 'services'
                    ? 'text-[#273639] font-bold border-b-2 border-[#C5A880] pb-0.5'
                    : 'text-gray-700 hover:text-[#273639]'
                }`}
              >
                Services
              </button>

              <button
                onClick={() => navigate('about')}
                className={`transition-colors uppercase tracking-wider text-xs ${
                  currentRoute.view === 'about'
                    ? 'text-[#273639] font-bold border-b-2 border-[#C5A880] pb-0.5'
                    : 'text-gray-700 hover:text-[#273639]'
                }`}
              >
                About
              </button>

              <button
                onClick={() => navigate('contact')}
                className={`transition-colors uppercase tracking-wider text-xs ${
                  currentRoute.view === 'contact'
                    ? 'text-[#273639] font-bold border-b-2 border-[#C5A880] pb-0.5'
                    : 'text-gray-700 hover:text-[#273639]'
                }`}
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Center: Brand Logo */}
          <div
            onClick={() => navigate('home')}
            className="cursor-pointer flex flex-col items-center select-none"
          >
            <div className="flex items-center gap-2">
              <img
                src="/uploads/manbhar.png"
                alt="Manbhar Fine Jewelry"
                className="h-9 sm:h-11 object-contain"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-wider text-[#273639]">
                MANBHAR
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880] font-semibold -mt-1">
              Fine Jewelry • Jaipur
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
                className="p-2 text-gray-700 hover:text-[#273639] hover:bg-gray-100 rounded-full transition"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Search popup dropdown */}
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 animate-in fade-in duration-150">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search rings, necklace, gold, silver..."
                      className="w-full pl-9 pr-8 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                    />
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </form>

                  {/* Quick Suggestions */}
                  {matchingSuggestions.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-gray-100 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-gray-400 px-2 tracking-wider">
                        Suggested Items
                      </span>
                      {matchingSuggestions.map((prod) => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            navigate('product', { productId: prod.id });
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer transition"
                        >
                          <img
                            src={prod.images[0] || '/uploads/categories/rings.webp'}
                            alt={prod.title}
                            className="w-9 h-9 rounded-lg object-cover bg-gray-100"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-xs font-medium text-gray-800 truncate">
                              {prod.title}
                            </h5>
                            <span className="text-[11px] font-bold text-[#273639]">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => navigate('wishlist')}
              className="relative p-2 text-gray-700 hover:text-rose-600 hover:bg-gray-100 rounded-full transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-rose-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-[#273639] hover:bg-gray-100 rounded-full transition"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#273639] text-[#C5A880] text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User / Profile Account */}
            <button
              onClick={() => {
                if (user) {
                  navigate('profile');
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              className="p-2 text-gray-700 hover:text-[#273639] hover:bg-gray-100 rounded-full transition relative"
              aria-label="Account"
              title={user ? `Signed in as ${user.name}` : 'Sign In'}
            >
              <User className="w-5 h-5" />
              {user && (
                <span className="absolute bottom-1 right-1 w-2 h-2 bg-emerald-500 rounded-full border border-white" />
              )}
            </button>

            {/* Admin Switch Link */}
            <button
              onClick={() => navigate('admin')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition ${
                currentRoute.view === 'admin'
                  ? 'bg-[#C5A880] text-[#273639]'
                  : 'bg-[#273639] text-[#C5A880] hover:bg-[#3C4A4C]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl px-4 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => {
                navigate('home');
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-serif text-base font-semibold text-gray-800 hover:text-[#C5A880]"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigate('collections');
                setIsMobileMenuOpen(false);
              }}
              className="text-left font-serif text-base font-semibold text-gray-800 hover:text-[#C5A880]"
            >
              All Collections
            </button>

            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs font-bold uppercase text-gray-400 tracking-wider mb-2">
                Popular Categories
              </p>
              <div className="grid grid-cols-2 gap-2">
                {categories.slice(0, 8).map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => {
                      navigate('collections', { category: cat.name });
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-left text-xs text-gray-700 hover:text-[#273639] py-1"
                  >
                    • {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex flex-col space-y-2">
              <button
                onClick={() => {
                  navigate('services');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-sm text-gray-800 hover:text-[#C5A880]"
              >
                Services (CAD Design & Care)
              </button>
              <button
                onClick={() => {
                  navigate('about');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-sm text-gray-800 hover:text-[#C5A880]"
              >
                About Manbhar
              </button>
              <button
                onClick={() => {
                  navigate('contact');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-sm text-gray-800 hover:text-[#C5A880]"
              >
                Contact & Studio
              </button>
              <button
                onClick={() => {
                  navigate('admin');
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-sm font-semibold text-[#273639] hover:text-[#C5A880]"
              >
                Admin Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};
