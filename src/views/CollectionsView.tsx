import React, { useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext';
import { FilterState } from '../types';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, X, ArrowUpDown, Search, RotateCcw, ChevronRight } from 'lucide-react';

export const CollectionsView: React.FC = () => {
  const { products, categories, filterState, setFilterState, navigate } = useStore();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extract unique materials, stones, tags with item counts
  const filterCounts = useMemo(() => {
    const cats: Record<string, number> = {};
    const mats: Record<string, number> = {};
    const stns: Record<string, number> = {};
    const tgs: Record<string, number> = {};

    categories.forEach((c) => {
      cats[c.name] = 0;
    });

    products.forEach((p) => {
      if (p.category) cats[p.category] = (cats[p.category] || 0) + 1;
      if (p.material) mats[p.material] = (mats[p.material] || 0) + 1;
      if (p.stones && p.stones !== 'None') stns[p.stones] = (stns[p.stones] || 0) + 1;
      if (p.tag) tgs[p.tag] = (tgs[p.tag] || 0) + 1;
    });

    return { cats, mats, stns, tgs };
  }, [products, categories]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (filterState.categories.length > 0 && !filterState.categories.includes(product.category)) {
        return false;
      }
      // Material filter
      if (filterState.materials.length > 0 && (!product.material || !filterState.materials.includes(product.material))) {
        return false;
      }
      // Stones filter
      if (filterState.stones.length > 0 && (!product.stones || !filterState.stones.includes(product.stones))) {
        return false;
      }
      // Tag filter
      if (filterState.tags.length > 0 && (!product.tag || !filterState.tags.includes(product.tag))) {
        return false;
      }
      // Price range
      if (product.price < filterState.minPrice || product.price > filterState.maxPrice) {
        return false;
      }
      // Search query
      if (filterState.searchQuery.trim()) {
        const q = filterState.searchQuery.toLowerCase();
        const matchTitle = product.title.toLowerCase().includes(q);
        const matchDesc = product.description.toLowerCase().includes(q);
        const matchCat = product.category.toLowerCase().includes(q);
        const matchMat = product.material?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchCat && !matchMat) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      if (filterState.sortBy === 'rating') return b.rating - a.rating;
      if (filterState.sortBy === 'newest') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      return 0; // featured
    });
  }, [products, filterState]);

  const handleCategoryToggle = (catName: string) => {
    setFilterState((prev) => {
      const exists = prev.categories.includes(catName);
      return {
        ...prev,
        categories: exists ? prev.categories.filter((c) => c !== catName) : [...prev.categories, catName]
      };
    });
  };

  const handleMaterialToggle = (matName: string) => {
    setFilterState((prev) => {
      const exists = prev.materials.includes(matName);
      return {
        ...prev,
        materials: exists ? prev.materials.filter((m) => m !== matName) : [...prev.materials, matName]
      };
    });
  };

  const handleStoneToggle = (stnName: string) => {
    setFilterState((prev) => {
      const exists = prev.stones.includes(stnName);
      return {
        ...prev,
        stones: exists ? prev.stones.filter((s) => s !== stnName) : [...prev.stones, stnName]
      };
    });
  };

  const handleTagToggle = (tagName: string) => {
    setFilterState((prev) => {
      const exists = prev.tags.includes(tagName);
      return {
        ...prev,
        tags: exists ? prev.tags.filter((t) => t !== tagName) : [...prev.tags, tagName]
      };
    });
  };

  const resetAllFilters = () => {
    setFilterState({
      categories: [],
      materials: [],
      stones: [],
      tags: [],
      minPrice: 0,
      maxPrice: 10000,
      sortBy: 'featured',
      searchQuery: ''
    });
  };

  const activeFiltersCount =
    filterState.categories.length +
    filterState.materials.length +
    filterState.stones.length +
    filterState.tags.length +
    (filterState.searchQuery ? 1 : 0) +
    (filterState.minPrice > 0 || filterState.maxPrice < 10000 ? 1 : 0);

  return (
    <div className="space-y-8 pb-16">
      {/* Banner */}
      <section className="bg-[#273639] text-white py-12 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#C5A880] uppercase tracking-widest font-semibold mb-2">
              <button onClick={() => navigate('home')} className="hover:underline">Home</button>
              <ChevronRight className="w-3 h-3" />
              <span>Collections</span>
              {filterState.categories.length === 1 && (
                <>
                  <ChevronRight className="w-3 h-3" />
                  <span>{filterState.categories[0]}</span>
                </>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
              {filterState.categories.length === 1
                ? `${filterState.categories[0]} Collection`
                : 'Discover Your Sparkle'}
            </h1>
            <p className="text-sm text-gray-300 mt-2 max-w-xl">
              Explore handpicked collections of rings, earrings, necklaces & bespoke bridal jewellery crafted with gold, diamond and silver elegance.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs border border-white/20 p-4 rounded-2xl text-center min-w-[200px]">
            <span className="text-2xl font-bold font-serif text-[#C5A880]">{filteredProducts.length}</span>
            <p className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Available Pieces</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-6 sticky top-28">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#C5A880]" />
                  <h3 className="font-serif text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                  </h3>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={resetAllFilters}
                    className="text-xs text-rose-600 hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
                  Categories
                </h4>
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {Object.entries(filterCounts.cats).map(([cat, count]) => (
                    <label
                      key={cat}
                      className="flex items-center justify-between text-xs text-gray-700 hover:text-gray-900 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filterState.categories.includes(cat)}
                          onChange={() => handleCategoryToggle(cat)}
                          className="rounded text-[#273639] focus:ring-[#C5A880] border-gray-300 w-3.5 h-3.5"
                        />
                        <span>{cat}</span>
                      </div>
                      <span className="text-[10px] text-gray-400 font-medium">({count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
                  Price Range
                </h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="200"
                    value={filterState.maxPrice}
                    onChange={(e) =>
                      setFilterState((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
                    }
                    className="w-full accent-[#273639]"
                  />
                  <div className="flex justify-between text-xs font-bold text-gray-700">
                    <span>₹0</span>
                    <span className="text-[#273639]">Up to ₹{filterState.maxPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Material Filter */}
              {Object.keys(filterCounts.mats).length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
                    Material / Metal
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {Object.entries(filterCounts.mats).map(([mat, count]) => (
                      <label
                        key={mat}
                        className="flex items-center justify-between text-xs text-gray-700 hover:text-gray-900 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filterState.materials.includes(mat)}
                            onChange={() => handleMaterialToggle(mat)}
                            className="rounded text-[#273639] focus:ring-[#C5A880] border-gray-300 w-3.5 h-3.5"
                          />
                          <span className="truncate max-w-[140px]">{mat}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">({count})</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Stones Filter */}
              {Object.keys(filterCounts.stns).length > 0 && (
                <div className="pt-4 border-t border-gray-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
                    Gemstones
                  </h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {Object.entries(filterCounts.stns).map(([stn, count]) => (
                      <label
                        key={stn}
                        className="flex items-center justify-between text-xs text-gray-700 hover:text-gray-900 cursor-pointer select-none"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filterState.stones.includes(stn)}
                            onChange={() => handleStoneToggle(stn)}
                            className="rounded text-[#273639] focus:ring-[#C5A880] border-gray-300 w-3.5 h-3.5"
                          />
                          <span className="truncate max-w-[140px]">{stn}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-medium">({count})</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1 space-y-6">
            {/* Top Toolbar */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search input in catalog */}
              <div className="relative w-full sm:w-72">
                <input
                  type="text"
                  value={filterState.searchQuery}
                  onChange={(e) =>
                    setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))
                  }
                  placeholder="Search catalog..."
                  className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                {filterState.searchQuery && (
                  <button
                    onClick={() => setFilterState((prev) => ({ ...prev, searchQuery: '' }))}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                {/* Mobile Filter Toggle Button */}
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-800 rounded-xl text-xs font-semibold"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                </button>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-gray-400" />
                  <select
                    value={filterState.sortBy}
                    onChange={(e) =>
                      setFilterState((prev) => ({
                        ...prev,
                        sortBy: e.target.value as FilterState['sortBy']
                      }))
                    }
                    className="text-xs bg-transparent border-none font-semibold text-gray-800 focus:outline-none cursor-pointer"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active filter chips */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-gray-500">Active Filters:</span>
                {filterState.categories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#273639] text-[#C5A880] text-xs font-medium rounded-full"
                  >
                    {cat}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-white"
                      onClick={() => handleCategoryToggle(cat)}
                    />
                  </span>
                ))}
                {filterState.materials.map((mat) => (
                  <span
                    key={mat}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#273639] text-[#C5A880] text-xs font-medium rounded-full"
                  >
                    {mat}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-white"
                      onClick={() => handleMaterialToggle(mat)}
                    />
                  </span>
                ))}
                {filterState.stones.map((stn) => (
                  <span
                    key={stn}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-[#273639] text-[#C5A880] text-xs font-medium rounded-full"
                  >
                    {stn}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-white"
                      onClick={() => handleStoneToggle(stn)}
                    />
                  </span>
                ))}
                {filterState.searchQuery && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-medium rounded-full">
                    Search: "{filterState.searchQuery}"
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-amber-700"
                      onClick={() => setFilterState((prev) => ({ ...prev, searchQuery: '' }))}
                    />
                  </span>
                )}
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-rose-600 hover:underline font-medium ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500 mx-auto">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-800">No Ornaments Found</h3>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  We couldn't find any jewelry matching your current filter criteria. Try adjusting the price range or resetting filters.
                </p>
                <button
                  onClick={resetAllFilters}
                  className="px-6 py-2.5 rounded-full bg-[#273639] text-[#C5A880] font-semibold text-xs uppercase tracking-wider hover:bg-[#3C4A4C] transition"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-xs bg-white h-full shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-serif text-base font-bold text-gray-900">Filters</h3>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-3">
                  Categories
                </h4>
                <div className="space-y-2">
                  {Object.entries(filterCounts.cats).map(([cat, count]) => (
                    <label key={cat} className="flex items-center justify-between text-xs text-gray-700">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={filterState.categories.includes(cat)}
                          onChange={() => handleCategoryToggle(cat)}
                          className="rounded text-[#273639]"
                        />
                        <span>{cat}</span>
                      </div>
                      <span className="text-[10px] text-gray-400">({count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-2">
                  Max Price: ₹{filterState.maxPrice.toLocaleString('en-IN')}
                </h4>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="200"
                  value={filterState.maxPrice}
                  onChange={(e) =>
                    setFilterState((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))
                  }
                  className="w-full accent-[#273639]"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex gap-2">
              <button
                onClick={resetAllFilters}
                className="w-1/2 py-2.5 border border-gray-300 text-gray-700 text-xs font-semibold rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-1/2 py-2.5 bg-[#273639] text-[#C5A880] text-xs font-semibold rounded-xl"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
