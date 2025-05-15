
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import ProductCard from '@/components/products/ProductCard';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function FavoritesPage() {
  const { currentUser, favoriteItems } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login?redirect=/account/favorites');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <p className="text-center">Loading favorites or redirecting...</p>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary flex items-center"><Heart className="mr-3 h-8 w-8"/>Favorite Products</h1>
      {favoriteItems.length === 0 ? (
         <div className="text-center py-12 border rounded-lg bg-card shadow-sm">
          <Heart className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-xl text-muted-foreground mb-2">No favorites yet.</p>
          <p className="text-sm text-muted-foreground mb-6">Start browsing and add products you love!</p>
          <Link href="/products">
            <Button size="lg">Discover Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
