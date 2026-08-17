import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Category, CartItem, Order, Review, User, RouteState, ViewType, FilterState, Enquiry } from '../types';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_REVIEWS, INITIAL_ORDERS, INITIAL_USER } from '../data/initialData';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  wishlist: number[];
  orders: Order[];
  reviews: Review[];
  enquiries: Enquiry[];
  user: User | null;
  currentRoute: RouteState;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  navigate: (view: ViewType, params?: { productId?: number; category?: string; search?: string; orderId?: string }) => void;
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  placeOrder: (orderDetails: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    payment_method: 'COD' | 'UPI' | 'Card';
    discount?: number;
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, orderStatus: Order['order_status'], paymentStatus?: Order['payment_status']) => void;
  addReview: (productId: number, name: string, rating: number, comment: string) => void;
  addProduct: (productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'created_at'>) => Product;
  updateProduct: (id: number, productData: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  submitEnquiry: (enquiry: Omit<Enquiry, 'id' | 'created_at'>) => void;
  login: (email: string, name?: string, role?: 'admin' | 'customer') => void;
  logout: () => void;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const DEFAULT_FILTERS: FilterState = {
  categories: [],
  materials: [],
  stones: [],
  tags: [],
  minPrice: 0,
  maxPrice: 10000,
  sortBy: 'featured',
  searchQuery: ''
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('manbhar_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('manbhar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('manbhar_wishlist');
      return saved ? JSON.parse(saved) : [1, 3];
    } catch {
      return [1, 3];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('manbhar_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('manbhar_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => {
    try {
      const saved = localStorage.getItem('manbhar_enquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('manbhar_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  const [currentRoute, setCurrentRoute] = useState<RouteState>({ view: 'home' });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTERS);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('manbhar_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('manbhar_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('manbhar_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('manbhar_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('manbhar_reviews', JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('manbhar_enquiries', JSON.stringify(enquiries));
    } catch (e) {
      console.error(e);
    }
  }, [enquiries]);

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('manbhar_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('manbhar_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const navigate = (view: ViewType, params?: { productId?: number; category?: string; search?: string; orderId?: string }) => {
    if (params?.category) {
      setFilterState((prev) => ({
        ...DEFAULT_FILTERS,
        categories: [params.category!]
      }));
    } else if (params?.search) {
      setFilterState((prev) => ({
        ...DEFAULT_FILTERS,
        searchQuery: params.search!
      }));
    }

    setCurrentRoute({
      view,
      productId: params?.productId,
      category: params?.category,
      search: params?.search,
      orderId: params?.orderId
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product: Product, quantity = 1, selectedSize?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedSize: selectedSize || product.size }];
      }
    });
    showToast(`"${product.title.slice(0, 24)}..." added to bag`, 'success');
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist ❤️', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: number) => wishlist.includes(productId);

  const placeOrder = async (orderDetails: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    payment_method: 'COD' | 'UPI' | 'Card';
    discount?: number;
  }): Promise<Order> => {
    const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    const gst = Math.round(subtotal * 0.03 * 100) / 100; // 3% GST
    const shipping = subtotal >= 4999 || subtotal === 0 ? 0 : 50.0;
    const making = Math.round(subtotal * 0.05 * 100) / 100; // 5% making charges
    const discount = orderDetails.discount || 0;
    const grand_total = Math.round((subtotal + gst + shipping + making - discount) * 100) / 100;

    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const orderNumber = `MB${new Date().getFullYear()}${randomSuffix}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      order_number: orderNumber,
      user_id: user?.id,
      name: orderDetails.name,
      phone: orderDetails.phone,
      email: orderDetails.email,
      address: orderDetails.address,
      city: orderDetails.city,
      state: orderDetails.state,
      pincode: orderDetails.pincode,
      payment_method: orderDetails.payment_method,
      subtotal,
      gst,
      shipping,
      making,
      discount,
      grand_total,
      payment_status: orderDetails.payment_method === 'UPI' ? 'Paid' : 'Pending',
      order_status: 'Order Placed',
      items: cart.map((item) => ({
        product_id: item.product.id,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        image: item.product.images[0] || '/uploads/categories/necklace.jpe',
        selectedSize: item.selectedSize
      })),
      created_at: new Date().toISOString()
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    orderStatus: Order['order_status'],
    paymentStatus?: Order['payment_status']
  ) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              order_status: orderStatus,
              payment_status: paymentStatus || ord.payment_status
            }
          : ord
      )
    );
    showToast(`Order status updated to "${orderStatus}"`, 'success');
  };

  const addReview = (productId: number, name: string, rating: number, comment: string) => {
    const newRev: Review = {
      id: `rev-${Date.now()}`,
      product_id: productId,
      name: name || 'Verified Customer',
      rating,
      comment,
      created_at: new Date().toISOString(),
      verified: true
    };

    setReviews((prev) => [newRev, ...prev]);

    // Recalculate product rating
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const prodReviews = [...reviews.filter((r) => r.product_id === productId), newRev];
          const avg = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
          return {
            ...p,
            rating: Math.round(avg * 10) / 10,
            reviewCount: prodReviews.length
          };
        }
        return p;
      })
    );

    showToast('Thank you! Your review has been submitted.', 'success');
  };

  const addProduct = (
    productData: Omit<Product, 'id' | 'rating' | 'reviewCount' | 'created_at'>
  ): Product => {
    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    const newProduct: Product = {
      ...productData,
      id: nextId,
      rating: 5.0,
      reviewCount: 0,
      created_at: new Date().toISOString()
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Product "${newProduct.title}" created successfully!`, 'success');
    return newProduct;
  };

  const updateProduct = (id: number, productData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...productData } : p))
    );
    showToast('Product updated successfully', 'success');
  };

  const deleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast('Product deleted', 'info');
  };

  const submitEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'created_at'>) => {
    const newEnquiry: Enquiry = {
      ...enquiryData,
      id: `enq-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setEnquiries((prev) => [newEnquiry, ...prev]);
    showToast('Thank you for contacting Manbhar! Our jewellery expert will reach out soon.', 'success');
  };

  const login = (email: string, name?: string, role: 'admin' | 'customer' = 'customer') => {
    const newUser: User = {
      id: Date.now(),
      email,
      name: name || email.split('@')[0],
      role
    };
    setUser(newUser);
    showToast(`Welcome back, ${newUser.name}!`, 'success');
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        categories,
        cart,
        wishlist,
        orders,
        reviews,
        enquiries,
        user,
        currentRoute,
        isCartOpen,
        setIsCartOpen,
        filterState,
        setFilterState,
        navigate,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        placeOrder,
        updateOrderStatus,
        addReview,
        addProduct,
        updateProduct,
        deleteProduct,
        submitEnquiry,
        login,
        logout,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
