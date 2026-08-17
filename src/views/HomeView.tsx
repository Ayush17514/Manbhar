import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Sparkles, ArrowRight, ShieldCheck, Gem, RefreshCw, Truck, ChevronLeft, ChevronRight, Star, Heart, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HomeView: React.FC = () => {
  const { navigate, categories, products } = useStore();
  const [activeTab, setActiveTab] = useState<'All' | 'Bestseller' | 'Rings' | 'Necklaces' | 'Earrings'>('All');
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Where Elegance Meets Emotion",
      subtitle: "Custom-crafted jewelry for moments that last a lifetime.",
      badge: "Jaipur Heritage Collection 2026",
      cta: "Explore Collections",
      category: "",
      bgImage: "/uploads/carousel/1000276120.jpg",
      fallbackColor: "bg-[#273639]"
    },
    {
      title: "Handcrafted 18K & 22K Gold Masterpieces",
      subtitle: "Certified BIS Hallmarked ornaments created by master karigars.",
      badge: "Timeless Bridal & Festive Wear",
      cta: "Shop Gold & Diamonds",
      category: "Gold Chains",
      bgImage: "/uploads/carousel/Shop now.jpg",
      fallbackColor: "bg-[#1f2d30]"
    },
    {
      title: "Bespoke 3D CAD Custom Jewelry",
      subtitle: "Bring your dream design to life with precision 3D CAD rendering.",
      badge: "Personalized Jewelry Services",
      cta: "Design Your Own",
      category: "Name Pendants",
      bgImage: "/uploads/carousel/1000276121.jpg",
      fallbackColor: "bg-[#153448]"
    }
  ];

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Bestseller') return p.tag === 'Bestseller';
    return p.category === activeTab;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Carousel */}
      <section className="relative w-full h-[550px] sm:h-[650px] overflow-hidden bg-[#273639]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background image & gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30 z-10" />
            <img
              src={heroSlides[currentSlide].bgImage}
              alt="Hero Banner"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            {/* Slide Content */}
            <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-2xl"
              >
                <div className="inline-flex items-center gap-2 bg-[#C5A880]/20 border border-[#C5A880]/40 text-[#F7E7CE] px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-4 backdrop-blur-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>{heroSlides[currentSlide].badge}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4">
                  {heroSlides[currentSlide].title}
                </h1>

                <p className="text-base sm:text-lg text-gray-200 mb-8 max-w-xl font-light leading-relaxed">
                  {heroSlides[currentSlide].subtitle}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() =>
                      heroSlides[currentSlide].category
                        ? navigate('collections', { category: heroSlides[currentSlide].category })
                        : navigate('collections')
                    }
                    className="px-8 py-4 bg-[#C5A880] hover:bg-[#d6bc96] text-[#273639] font-bold text-xs uppercase tracking-widest rounded-full transition shadow-xl hover:shadow-2xl flex items-center gap-2 transform hover:-translate-y-0.5 duration-200"
                  >
                    <span>{heroSlides[currentSlide].cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => navigate('services')}
                    className="px-6 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-xs uppercase tracking-widest rounded-full transition backdrop-blur-xs"
                  >
                    CAD Customization
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Navigation Controls */}
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-xs flex items-center justify-center transition border border-white/20"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-xs flex items-center justify-center transition border border-white/20"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-6 inset-x-0 z-30 flex items-center justify-center gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === i ? 'w-8 bg-[#C5A880]' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639] shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">100% Certified</h4>
              <p className="text-xs text-gray-500 mt-0.5">BIS Hallmarked Ornaments</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639] shrink-0">
              <Truck className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Insured Shipping</h4>
              <p className="text-xs text-gray-500 mt-0.5">Free over ₹4,999 across India</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639] shrink-0">
              <Gem className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Jaipur Artistry</h4>
              <p className="text-xs text-gray-500 mt-0.5">Heritage master karigars</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#fef9f5] border border-[#C5A880]/40 flex items-center justify-center text-[#273639] shrink-0">
              <RefreshCw className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900">Lifetime Policy</h4>
              <p className="text-xs text-gray-500 mt-0.5">Exchange & buyback guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
            Curated Collections
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#273639] mt-1">
            Explore Categories
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-3" />
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => navigate('collections', { category: cat.name })}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center p-3"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-[#f8f6f3] mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <h3 className="font-serif text-sm font-semibold text-gray-900 group-hover:text-[#C5A880] transition-colors">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured / Bestseller Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
              Handcrafted Treasures
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#273639] mt-1">
              Featured Ornaments
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Bestseller', 'Rings', 'Necklaces', 'Earrings'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition ${
                  activeTab === tab
                    ? 'bg-[#273639] text-[#C5A880] shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {tab === 'All' ? 'All Pieces' : tab === 'Bestseller' ? '★ Bestsellers' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('collections')}
            className="px-8 py-3.5 rounded-full border-2 border-[#273639] text-[#273639] font-bold text-xs uppercase tracking-widest hover:bg-[#273639] hover:text-[#C5A880] transition duration-200 shadow-md inline-flex items-center gap-2"
          >
            <span>View All Jewelry Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Bespoke CAD Promotional Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#273639] rounded-3xl overflow-hidden shadow-2xl border border-[#C5A880]/30 grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 sm:p-14 flex flex-col justify-center text-white">
            <div className="inline-flex items-center gap-2 text-[#C5A880] text-xs uppercase tracking-widest font-semibold mb-3">
              <Gem className="w-4 h-4" />
              <span>Bespoke Jaipur Atelier</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4 leading-snug">
              Turn Your Vision into a Certified Gold Masterpiece
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed mb-6 font-light">
              From personalized name calligraphy necklaces to one-of-a-kind royal bridal sets: collaborate directly with our CAD jewelry designers and Jaipur master goldsmiths.
            </p>

            <div className="space-y-2 mb-8 text-xs text-gray-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                <span>3D Photorealistic CAD render approval before casting</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                <span>Choice of 18K, 22K Gold, 925 Sterling Silver, or Platinum</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                <span>Certified gemstone & diamond authentication certificates</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('services')}
                className="px-7 py-3.5 bg-[#C5A880] hover:bg-[#d6bc96] text-[#273639] font-bold text-xs uppercase tracking-widest rounded-full transition shadow-lg flex items-center gap-2"
              >
                <span>Consult with CAD Artist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('collections', { category: 'Name Pendants' })}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold text-xs uppercase tracking-widest rounded-full transition"
              >
                Custom Name Pendants
              </button>
            </div>
          </div>

          <div className="relative min-h-[300px] lg:min-h-full bg-[#153448] overflow-hidden">
            <img
              src="/uploads/carousel/Shop now.jpg"
              alt="Bespoke Jewelry Craftsmanship"
              className="w-full h-full object-cover brightness-90"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#273639]/80 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      {/* Customer Reviews & Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
            Loved By Thousands
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#273639] mt-1">
            Client Testimonials
          </h2>
          <div className="w-16 h-0.5 bg-[#C5A880] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed">
                "The royal emerald choker arrived in majestic velvet packaging. The craftsmanship is identical to high-end heritage showrooms in Jaipur. Absolutely stunning!"
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h5 className="font-serif text-xs font-bold text-gray-900">Ananya Deshmukh</h5>
                <span className="text-[10px] text-gray-400">Jaipur, Rajasthan</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed">
                "Ordered a customized name pendant in Hindi script. The CAD preview was sent to my WhatsApp before production. Excellent precision and swift delivery."
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h5 className="font-serif text-xs font-bold text-gray-900">Sneha Agrawal</h5>
                <span className="text-[10px] text-gray-400">Delhi NCR</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Verified Buyer
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed">
                "The diamond earrings sparkle brilliantly under evening lighting. Lightweight and comfortable with secure clasps. Will definitely order again."
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <h5 className="font-serif text-xs font-bold text-gray-900">Pooja Sharma</h5>
                <span className="text-[10px] text-gray-400">Mumbai</span>
              </div>
              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Verified Buyer
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
