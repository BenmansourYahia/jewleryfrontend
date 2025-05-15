
"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import type { CartItemType, Product, User, Address, Order, Category, AdminUser } from '@/types';
import { mockUsers, mockOrders, mockProducts as initialMockProducts, mockCategories as initialMockCategories } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

// Hardcoded admin credentials (REPLACE WITH SECURE AUTH IN PRODUCTION)
const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'adminpassword';

interface AppContextType {
  cartItems: CartItemType[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  
  currentUser: User | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, pass: string) => boolean;
  
  adminUser: AdminUser | null;
  adminLogin: (email: string, pass: string) => boolean;
  adminLogout: () => void;

  favoriteItems: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (address: Address) => void;
  deleteAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
  
  orders: Order[];
  placeOrder: (shippingAddress: Address) => Order | null;

  // Admin related
  products: Product[];
  categories: Category[];
  getProductById: (productId: string) => Product | undefined;
  getCategoryById: (categoryId: string) => Category | undefined;
  addProduct: (productData: Omit<Product, 'id' | 'rating' | 'numReviews' | 'category'> & { categoryId: string }) => Product | null;
  updateProduct: (updatedProductData: Product) => void;
  deleteProduct: (productId: string) => void; // Added deleteProduct
  addCategory: (categoryData: Omit<Category, 'id'>) => Category | null;
  updateCategory: (updatedCategoryData: Category) => void;
  deleteCategory: (categoryId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [favoriteProductIds, setFavoriteProductIds] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [orders, setOrders] = useState<Order[]>([]);
  const { toast } = useToast();

  const [products, setProducts] = useState<Product[]>(initialMockProducts);
  const [categories, setCategories] = useState<Category[]>(initialMockCategories);

  useEffect(() => {
    const storedCart = localStorage.getItem('gleamingGalleryCart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
    const storedAdminUser = sessionStorage.getItem('gleamingGalleryAdmin');
    if (storedAdminUser) {
      setAdminUser(JSON.parse(storedAdminUser));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gleamingGalleryCart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (adminUser) {
      sessionStorage.setItem('gleamingGalleryAdmin', JSON.stringify(adminUser));
    } else {
      sessionStorage.removeItem('gleamingGalleryAdmin');
    }
  }, [adminUser]);

  useEffect(() => {
    if (currentUser) {
      setFavoriteProductIds(currentUser.favoriteProductIds);
      const userOrders = mockOrders.filter(o => o.userId === currentUser.id);
      setOrders(userOrders);
    } else {
      setFavoriteProductIds([]);
      setOrders([]);
    }
  }, [currentUser]);


  const addToCart = (product: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { ...product, quantity }];
    });
    toast({ title: `${product.name} added to cart` });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    toast({ title: `Item removed from cart` });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const login = (email: string, _pass: string) => {
    const user = users.find((u) => u.email === email);
    if (user) {
      setCurrentUser(user);
      toast({ title: "Logged in successfully!" });
      return true;
    }
    toast({ title: "Login failed", description: "User not found.", variant: "destructive" });
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setCartItems([]); 
    localStorage.removeItem('gleamingGalleryCart');
    toast({ title: "Logged out." });
  };

  const register = (name: string, email: string, _pass: string) => {
    if (users.find((u) => u.email === email)) {
      toast({ title: "Registration failed", description: "Email already exists.", variant: "destructive" });
      return false;
    }
    const newUser: User = {
      id: `user${Date.now()}`,
      name,
      email,
      addresses: [],
      favoriteProductIds: [],
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    toast({ title: "Registered successfully!" });
    return true;
  };

  const adminLogin = (email: string, pass: string) => {
    if (email === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
      const newAdminUser: AdminUser = { id: 'admin1', email: ADMIN_EMAIL };
      setAdminUser(newAdminUser);
      toast({ title: "Admin logged in successfully!" });
      return true;
    }
    toast({ title: "Admin login failed", description: "Invalid credentials.", variant: "destructive" });
    return false;
  };

  const adminLogout = () => {
    setAdminUser(null);
    toast({ title: "Admin logged out." });
  };
  
  const toggleFavorite = (product: Product) => {
    if (!currentUser) {
      toast({ title: "Please log in to save favorites.", variant: "destructive"});
      return;
    }
    setFavoriteProductIds((prevIds) => {
      const newFavs = prevIds.includes(product.id)
        ? prevIds.filter((id) => id !== product.id)
        : [...prevIds, product.id];
      
      setCurrentUser(prevUser => prevUser ? {...prevUser, favoriteProductIds: newFavs} : null);
      setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? {...u, favoriteProductIds: newFavs} : u));

      toast({ title: newFavs.includes(product.id) ? `${product.name} added to favorites` : `${product.name} removed from favorites` });
      return newFavs;
    });
  };

  const isFavorite = (productId: string) => favoriteProductIds.includes(productId);

  const favoriteItems = products.filter(p => favoriteProductIds.includes(p.id));

  const addAddress = (addressData: Omit<Address, 'id'>) => {
    if (!currentUser) return;
    const newAddress: Address = { ...addressData, id: `addr${Date.now()}` };
    const updatedUser = {
      ...currentUser,
      addresses: [...currentUser.addresses, newAddress],
    };
    setCurrentUser(updatedUser);
    setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? updatedUser : u));
    toast({ title: "Address added." });
  };

  const updateAddress = (updatedAddress: Address) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      addresses: currentUser.addresses.map(addr => addr.id === updatedAddress.id ? updatedAddress : addr),
    };
    setCurrentUser(updatedUser);
    setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? updatedUser : u));
    toast({ title: "Address updated." });
  };
  
  const deleteAddress = (addressId: string) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      addresses: currentUser.addresses.filter(addr => addr.id !== addressId),
    };
    setCurrentUser(updatedUser);
    setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? updatedUser : u));
    toast({ title: "Address deleted." });
  };

  const setDefaultAddress = (addressId: string) => {
    if (!currentUser) return;
    const updatedUser = {
      ...currentUser,
      addresses: currentUser.addresses.map(addr => ({...addr, isDefault: addr.id === addressId })),
    };
    setCurrentUser(updatedUser);
    setUsers(prevUsers => prevUsers.map(u => u.id === currentUser.id ? updatedUser : u));
    toast({ title: "Default address updated." });
  };

  const placeOrder = (shippingAddress: Address): Order | null => {
    if (!currentUser || cartItems.length === 0) {
      toast({ title: "Cannot place order", description: "Please log in or add items to your cart.", variant: "destructive" });
      return null;
    }
    const newOrder: Order = {
      id: `order${Date.now()}`,
      userId: currentUser.id,
      items: cartItems.map(item => ({
        productId: item.id,
        productName: item.name,
        quantity: item.quantity,
        unitPrice: item.price,
        imageUrl: item.imageUrl,
      })),
      totalPrice: cartTotal,
      shippingAddress,
      orderDate: new Date().toISOString(),
      status: 'Processing',
      paymentStatus: 'Completed', 
    };
    setOrders(prevOrders => [...prevOrders, newOrder]);
    clearCart();
    toast({ title: "Order Placed!", description: `Thank you for your purchase. Order ID: ${newOrder.id}` });
    return newOrder;
  };

  const getProductById = (productId: string) => {
    return products.find(p => p.id === productId);
  };
  
  const getCategoryById = (categoryId: string) => {
    return categories.find(c => c.id === categoryId);
  };

  const addProduct = (productData: Omit<Product, 'id' | 'rating' | 'numReviews' | 'category'> & { categoryId: string }) => {
    const category = categories.find(c => c.id === productData.categoryId);
    if (!category) {
        toast({ title: "Error adding product", description: "Selected category not found.", variant: "destructive" });
        return null;
    }
    const newProduct: Product = {
        ...productData,
        id: `prod-${Date.now()}`,
        category,
        rating: 0,
        numReviews: 0,
    };
    setProducts(prev => [...prev, newProduct]);
    toast({ title: "Product Added", description: `${newProduct.name} has been added.` });
    return newProduct;
  };

  const updateProduct = (updatedProductData: Product) => {
    const category = categories.find(c => c.id === updatedProductData.category.id);
     if (!category && typeof updatedProductData.category === 'string') { 
        const cat = categories.find(c => c.id === updatedProductData.category);
        if (!cat) {
          toast({ title: "Error updating product", description: "Selected category not found.", variant: "destructive" });
          return;
        }
        updatedProductData.category = cat;
     } else if (!category && typeof updatedProductData.category === 'object') {
         const cat = categories.find(c => c.id === updatedProductData.category.id);
          if (!cat) {
            toast({ title: "Error updating product", description: "Category for product not found.", variant: "destructive" });
            return;
          }
          updatedProductData.category = cat;
     }

    setProducts(prev => prev.map(p => p.id === updatedProductData.id ? updatedProductData : p));
    toast({ title: "Product Updated", description: `${updatedProductData.name} has been updated.` });
  };

  const deleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    toast({ title: "Product Deleted", description: `Product has been successfully deleted.` });
  };

  const addCategory = (categoryData: Omit<Category, 'id'>) => {
    // Simple slug check (a more robust system would be needed for production)
    const existingCategory = categories.find(c => c.slug === categoryData.slug || c.name.toLowerCase() === categoryData.name.toLowerCase());
    if (existingCategory) {
      toast({ title: "Error adding category", description: "Category name or slug already exists.", variant: "destructive" });
      return null;
    }

    const newCategory: Category = {
      ...categoryData,
      id: `cat-${Date.now()}`,
    };
    setCategories(prev => [...prev, newCategory]);
    toast({ title: "Category Added", description: `${newCategory.name} has been added.` });
    return newCategory;
  };

  const updateCategory = (updatedCategoryData: Category) => {
    // Check for slug/name conflicts, excluding the current category being edited
    const conflictingCategory = categories.find(c => c.id !== updatedCategoryData.id && (c.slug === updatedCategoryData.slug || c.name.toLowerCase() === updatedCategoryData.name.toLowerCase()));
    if (conflictingCategory) {
        toast({ title: "Error updating category", description: "Another category with the same name or slug already exists.", variant: "destructive" });
        return;
    }

    setCategories(prev => prev.map(c => c.id === updatedCategoryData.id ? updatedCategoryData : c));
    // Also update the category object in products that use this category
    setProducts(prevProducts => prevProducts.map(p => {
      if (p.category.id === updatedCategoryData.id) {
        return { ...p, category: updatedCategoryData };
      }
      return p;
    }));
    toast({ title: "Category Updated", description: `${updatedCategoryData.name} has been updated.`});
  };

  const deleteCategory = (categoryId: string) => {
    const isCategoryInUse = products.some(p => p.category.id === categoryId);
    if (isCategoryInUse) {
      toast({
        title: "Cannot delete category",
        description: "This category is used by one or more products. Please reassign products first.",
        variant: "destructive",
      });
      return;
    }
    setCategories(prev => prev.filter(c => c.id !== categoryId));
    toast({ title: "Category Deleted" });
  };

  return (
    <AppContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        currentUser,
        login,
        logout,
        register,
        adminUser,
        adminLogin,
        adminLogout,
        favoriteItems,
        toggleFavorite,
        isFavorite,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        orders,
        placeOrder,
        products,
        categories,
        getProductById,
        getCategoryById,
        addProduct,
        updateProduct,
        deleteProduct, 
        addCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

    
