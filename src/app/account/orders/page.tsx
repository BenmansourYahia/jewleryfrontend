
"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import OrderHistoryItem from '@/components/account/OrderHistoryItem';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ListOrdered, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';


// export const metadata: Metadata = { // Metadata should be in Server Components or layout files
//   title: 'Order History - Gleaming Gallery',
//   description: 'View your past orders with Gleaming Gallery.',
// };
// For client components, set title in RootLayout or a parent server component

export default function OrderHistoryPage() {
  const { currentUser, orders } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const newOrderId = searchParams.get('orderId');

  useEffect(() => {
    if (!currentUser) {
      router.push('/login?redirect=/account/orders');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <p className="text-center">Loading order history or redirecting...</p>;
  }
  
  // Sort orders by date, newest first
  const sortedOrders = [...orders].sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime());


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary flex items-center"><ListOrdered className="mr-3 h-8 w-8"/>Order History</h1>
        <Link href="/products">
          <Button variant="outline">Continue Shopping</Button>
        </Link>
      </div>

      {newOrderId && (
        <Alert className="bg-green-50 border-green-200 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-300">
          <AlertTitle className="font-semibold">Order Confirmed!</AlertTitle>
          <AlertDescription>
            Thank you for your purchase. Your order ID is: <strong>{newOrderId}</strong>. You can find its details below.
          </AlertDescription>
        </Alert>
      )}

      {sortedOrders.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-card shadow-sm">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground mb-2">You have no past orders.</p>
          <p className="text-sm text-muted-foreground mb-6">All your future orders will appear here.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedOrders.map((order) => (
            <OrderHistoryItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
