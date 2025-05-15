
"use client";

import CartItemCard from '@/components/cart/CartItemCard';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cartItems, cartTotal, clearCart } = useAppContext();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <ShoppingCart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground mb-2">Your cart is empty.</p>
          <p className="text-sm text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4 bg-card p-4 sm:p-6 rounded-lg shadow">
            <div className="hidden sm:flex items-center font-semibold text-muted-foreground border-b pb-2 text-sm">
                <div className="flex-grow pl-24">Product</div>
                <div className="w-32 text-center">Quantity</div>
                <div className="w-20 text-right">Total</div>
                <div className="w-12 text-right"></div> {/* For remove button spacing */}
            </div>
            {cartItems.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
             <div className="flex justify-end mt-4">
              <Button variant="outline" onClick={clearCart} className="text-destructive hover:border-destructive hover:bg-destructive/10">
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="lg:col-span-1 bg-card p-6 rounded-lg shadow h-fit sticky top-24">
            <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Order Summary</h2>
            <div className="space-y-3 text-md">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-600">FREE</span>
              </div>
              {/* <div className="flex justify-between">
                <span>Tax (estimated)</span>
                <span>$0.00</span>
              </div> */}
              <div className="flex justify-between text-xl font-bold border-t pt-3 mt-3">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/checkout" passHref>
              <Button size="lg" className="w-full mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

// No metadata needed here as it's a client component focused page. 
// Root layout will handle general metadata.
