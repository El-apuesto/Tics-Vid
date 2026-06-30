export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'apparel' | 'accessories';
  variants: string[];
  printfulUrl?: string;
  /** Merchize catalog SKU — find it in your Merchize Dashboard under Products */
  sku?: string;
}

export interface ShippingInfo {
  fullName: string;
  email: string;
  phone?: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface MerchizeOrderItem {
  name: string;
  sku: string;
  quantity: number;
  price: number;
  variant: string;
}

export interface OrderResult {
  orderId: string;
  status: string;
  message?: string;
}

export interface Show {
  id: string;
  date: string;
  venue: string;
  location: string;
  link?: string;
}

export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  url: string;
  embedUrl?: string;
}

export interface AdminState {
  isAuthenticated: boolean;
  username: string;
  password: string;
}

export interface SiteConfig {
  shows: Show[];
  videos: Video[];
  products: Product[];
  donations: Donation[];
}

export interface Donation {
  id: string;
  amount: number;
  date: string;
  donor?: string;
  message?: string;
}

export interface CartItem {
  product: Product;
  variant: string;
  quantity: number;
}
