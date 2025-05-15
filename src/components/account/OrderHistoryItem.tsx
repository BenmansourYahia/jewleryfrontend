
"use client";

import type { Order } from '@/types';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import Link from 'next/link';

interface OrderHistoryItemProps {
  order: Order;
}

const OrderHistoryItem = ({ order }: OrderHistoryItemProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between sm:items-center">
        <div>
            <CardTitle className="text-xl">Order ID: {order.id}</CardTitle>
            <CardDescription>Placed on: {new Date(order.orderDate).toLocaleDateString()}</CardDescription>
        </div>
        <div className="mt-2 sm:mt-0 flex flex-col sm:items-end gap-1">
           <p className="text-lg font-semibold">Total: ${order.totalPrice.toFixed(2)}</p>
           <div className="flex gap-2">
            <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} 
                   className={`${order.status === 'Delivered' ? 'bg-green-600 text-white' : ''} ${order.status === 'Canceled' ? 'bg-destructive text-destructive-foreground' : ''}`}>
              {order.status}
            </Badge>
            <Badge variant={order.paymentStatus === 'Completed' ? 'default' : 'outline'}>
              {order.paymentStatus}
            </Badge>
           </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-4">
          {order.items.map((item) => (
            <div key={item.productId} className="flex items-center space-x-3 text-sm">
              {item.imageUrl && (
                <Image 
                    src={item.imageUrl} 
                    alt={item.productName} 
                    width={60} 
                    height={60} 
                    className="rounded object-cover"
                    data-ai-hint="order product"
                />
              )}
              <div className="flex-grow">
                <Link href={`/products/${item.productId}`} className="font-medium hover:text-primary">{item.productName}</Link>
                <p className="text-xs text-muted-foreground">Qty: {item.quantity} - Unit Price: ${item.unitPrice.toFixed(2)}</p>
              </div>
              <p className="font-medium">${(item.unitPrice * item.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>
        <Separator />
        <div className="mt-3 text-sm">
            <p className="font-medium">Shipping Address:</p>
            <p>{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}, {order.shippingAddress.country}</p>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-end">
        <Button variant="outline" size="sm">View Details</Button>
      </CardFooter> */}
    </Card>
  );
};

export default OrderHistoryItem;
