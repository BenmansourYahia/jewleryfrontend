
"use client";

import Image from 'next/image';
import type { CartItemType } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';

interface CartItemCardProps {
  item: CartItemType;
}

const CartItemCard = ({ item }: CartItemCardProps) => {
  const { updateQuantity, removeFromCart } = useAppContext();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex items-center space-x-4 p-4 border-b">
      <Link href={`/products/${item.id}`} className="shrink-0">
        <div className="relative h-20 w-20 rounded-md overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.imageAlt || item.name}
            fill
            sizes="80px"
            className="object-cover"
            data-ai-hint={item.dataAiHint || "cart item"}
          />
        </div>
      </Link>
      <div className="flex-grow">
        <Link href={`/products/${item.id}`}>
          <h3 className="text-md font-semibold hover:text-primary transition-colors">{item.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity - 1)} disabled={item.quantity <= 1}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={item.quantity}
          onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
          className="h-8 w-12 text-center"
          min="1"
        />
        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleQuantityChange(item.quantity + 1)}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <p className="text-md font-semibold w-20 text-right">${(item.price * item.quantity).toFixed(2)}</p>
      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} aria-label="Remove item">
        <Trash2 className="h-5 w-5 text-destructive hover:text-destructive/80" />
      </Button>
    </div>
  );
};

export default CartItemCard;
