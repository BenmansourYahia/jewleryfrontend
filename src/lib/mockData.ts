import type { Product, Category, User, Order, Review } from '@/types';

export const mockCategories: Category[] = [
  { id: '1', name: 'Necklaces', slug: 'necklaces' },
  { id: '2', name: 'Earrings', slug: 'earrings' },
  { id: '3', name: 'Rings', slug: 'rings' },
  { id: '4', name: 'Bracelets', slug: 'bracelets' },
  { id: '5', name: 'Watches', slug: 'watches' },
  { id: '6', name: 'Accessories', slug: 'accessories' }
];

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Diamond Solitaire Necklace',
    description: 'A timeless piece featuring a brilliant-cut diamond in a classic solitaire setting.',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Diamond solitaire necklace on a white background',
    category: mockCategories[0],
    stock: 15,
    brand: 'Elegance',
    rating: 4.8,
    numReviews: 24,
    dataAiHint: 'diamond necklace jewelry'
  },
  {
    id: '2',
    name: 'Pearl Drop Earrings',
    description: 'Elegant freshwater pearl earrings with sterling silver accents.',
    price: 89.99,
    imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Pearl drop earrings displayed on a jewelry stand',
    category: mockCategories[1],
    stock: 30,
    brand: 'Pearl Essence',
    rating: 4.5,
    numReviews: 18,
    dataAiHint: 'pearl earrings jewelry'
  },
  {
    id: '3',
    name: 'Sapphire Engagement Ring',
    description: 'Stunning sapphire ring with diamond accents in a platinum setting.',
    price: 2499.99,
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Sapphire engagement ring with diamond accents',
    category: mockCategories[2],
    stock: 8,
    brand: 'Royal Gems',
    rating: 4.9,
    numReviews: 32,
    dataAiHint: 'sapphire ring jewelry'
  },
  {
    id: '4',
    name: 'Gold Tennis Bracelet',
    description: 'Classic tennis bracelet with alternating diamonds and gold links.',
    price: 899.99,
    imageUrl: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Gold tennis bracelet with diamonds',
    category: mockCategories[3],
    stock: 20,
    brand: 'Golden Touch',
    rating: 4.7,
    numReviews: 15,
    dataAiHint: 'gold bracelet jewelry'
  },
  {
    id: '5',
    name: 'Luxury Chronograph Watch',
    description: 'Swiss-made chronograph watch with leather strap and sapphire crystal.',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Luxury chronograph watch with leather strap',
    category: mockCategories[4],
    stock: 12,
    brand: 'Timepiece',
    rating: 4.6,
    numReviews: 28,
    dataAiHint: 'luxury watch jewelry'
  },
  {
    id: '6',
    name: 'Crystal Hair Clip',
    description: 'Elegant crystal hair clip perfect for special occasions.',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=600&auto=format&fit=crop',
    imageAlt: 'Crystal hair clip on a velvet display',
    category: mockCategories[5],
    stock: 25,
    brand: 'Crystal Elegance',
    rating: 4.4,
    numReviews: 12,
    dataAiHint: 'crystal hair accessory'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user1',
    name: 'Alice Wonderland',
    email: 'alice@example.com',
    addresses: [
      { id: 'addr1', street: '123 Rabbit Hole', city: 'Fantasy Land', state: 'FL', zipCode: '12345', country: 'USA', isDefault: true },
    ],
    favoriteProductIds: ['1', '3'],
  },
];

export const mockOrders: Order[] = [
  {
    id: 'order1',
    userId: 'user1',
    items: [
      { productId: '1', productName: 'Celestial Harmony Necklace', quantity: 1, unitPrice: 129.99, imageUrl: mockProducts[0].imageUrl },
      { productId: '3', productName: 'Ocean Whisper Earrings', quantity: 1, unitPrice: 75.00, imageUrl: mockProducts[2].imageUrl },
    ],
    totalPrice: 204.99,
    shippingAddress: mockUsers[0].addresses[0],
    orderDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    status: 'Delivered',
    paymentStatus: 'Completed',
  },
  {
    id: 'order2',
    userId: 'user1',
    items: [
      { productId: '2', productName: 'Golden Radiance Ring', quantity: 1, unitPrice: 89.50, imageUrl: mockProducts[1].imageUrl },
    ],
    totalPrice: 89.50,
    shippingAddress: mockUsers[0].addresses[0],
    orderDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    status: 'Shipped',
    paymentStatus: 'Completed',
  }
];

export const mockReviews: Review[] = [
  {
    id: 'review1',
    userId: 'user1',
    userName: 'Alice W.',
    productId: '1',
    rating: 5,
    comment: 'Absolutely beautiful necklace! The crystals sparkle so much. I get compliments every time I wear it.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'review2',
    userId: 'user1',
    userName: 'Bob B.',
    productId: '1',
    rating: 4,
    comment: 'Very pretty and well-made. The chain is a bit delicate, but overall a great piece.',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'review3',
    userId: 'user1',
    userName: 'Charlie C.',
    productId: '2',
    rating: 5,
    comment: 'Love this ring! The design is unique and it fits perfectly. The gold is very shiny.',
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  }
];
