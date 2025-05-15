
import type { StaticImageData } from 'next/image';

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | StaticImageData;
  imageAlt: string;
  category: Category;
  stock: number;
  brand?: string; // Added brand
  rating?: number; // Optional: 1-5 stars
  numReviews?: number; // Optional
  keywords?: string[]; // For AI hint and search
  dataAiHint?: string;
}

export interface CartItemType extends Product {
  quantity: number;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  addresses: Address[];
  favoriteProductIds: string[];
  // password_hash is not stored on client
}

export interface AdminUser {
  id: string;
  email: string;
  // Add other admin-specific fields if needed
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  imageUrl?: string | StaticImageData;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  shippingAddress: Address;
  orderDate: string; // ISO date string
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Canceled';
  paymentStatus: 'Pending' | 'Completed' | 'Refunded';
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  productId: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string; // ISO date string
}
