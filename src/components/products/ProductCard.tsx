"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ShoppingCart, Heart } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, toggleFavorite, isFavorite, currentUser } = useAppContext();

  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent link navigation when clicking favorite
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Card className="overflow-hidden product-card-hover flex flex-col h-full group">
      <Link href={`/products/${product.id}`} className="flex flex-col h-full">
        <CardHeader className="p-0 relative">
          <div className="aspect-square w-full overflow-hidden relative">
            <Image
              src={product.imageUrl}
              alt={product.imageAlt || product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              data-ai-hint={product.dataAiHint || 'jewelry item'}
            />
          </div>
          {currentUser && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/70 hover:bg-background rounded-full h-9 w-9 nav-elegant"
              onClick={handleFavoriteToggle}
              aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="heading-elegant text-lg font-semibold leading-tight mb-1 group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <CardDescription className="text-elegant text-sm text-muted-foreground mb-2 truncate">{product.description}</CardDescription>
          <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button 
            variant="outline" 
            className="w-full nav-elegant hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;
