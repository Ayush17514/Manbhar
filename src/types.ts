export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  stock: number;
  images: string[];
  category: string;
  tag?: string;
  size?: string;
  dimensions?: string;
  material?: string;
  stones?: string;
  gross_weight?: number;
  metal_weight?: number;
  stone_weight?: number;
  additional_info?: string;
  video?: string;
  rating: number;
  reviewCount: number;
  created_at: string;
}

export interface Category {
  name: string;
  image: string;
  description?: string;
  itemCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Review {
  id: string;
  product_id: number;
  name: string;
  rating: number;
  comment: string;
  created_at: string;
  verified?: boolean;
}

export interface OrderItem {
  product_id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  order_number: string;
  user_id?: number | string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  payment_method: 'COD' | 'UPI' | 'Card';
  subtotal: number;
  gst: number;
  shipping: number;
  making: number;
  discount: number;
  grand_total: number;
  payment_status: 'Pending' | 'Paid' | 'Processing' | 'Completed' | 'Cancelled';
  order_status: 'Order Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  items: OrderItem[];
  created_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  created_at: string;
}

export type ViewType =
  | 'home'
  | 'collections'
  | 'product'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'wishlist'
  | 'about'
  | 'services'
  | 'contact'
  | 'profile'
  | 'admin';

export interface RouteState {
  view: ViewType;
  productId?: number;
  category?: string;
  search?: string;
  orderId?: string;
}

export interface FilterState {
  categories: string[];
  materials: string[];
  stones: string[];
  tags: string[];
  minPrice: number;
  maxPrice: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery: string;
}
