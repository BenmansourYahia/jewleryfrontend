"use client";

import type { Product, Category } from '@/types';
import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/products/ProductCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, FilterX, Star } from 'lucide-react';

interface ProductListingProps {
  initialProducts: Product[];
  categories: Category[];
}

export default function ProductListing({ initialProducts, categories }: ProductListingProps) {
  const searchParams = useSearchParams();
  const initialCategorySlug = searchParams.get('category');

  const [searchTerm, setSearchTerm] = useState('');
  
  const maxPriceFromProducts = useMemo(() => 
    initialProducts.length > 0 ? Math.max(...initialProducts.map(p => p.price)) : 1000
  , [initialProducts]);
  
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPriceFromProducts]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(initialProducts);

  const allBrands = useMemo(() => {
    const brands = new Set<string>();
    initialProducts.forEach(p => {
      if (p.brand) brands.add(p.brand);
    });
    return Array.from(brands).sort();
  }, [initialProducts]);

  useEffect(() => {
    // Reset price range max if initialProducts change (e.g. category filter from URL)
     const currentMax = initialProducts.length > 0 ? Math.max(...initialProducts.map(p => p.price), 0) : 1000;
     setPriceRange(prev => [prev[0], currentMax]);
  }, [initialProducts]);


  useEffect(() => {
    let filtered = [...initialProducts];

    if (initialCategorySlug) {
      filtered = filtered.filter(p => p.category.slug === initialCategorySlug);
    }

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => p.brand && selectedBrands.includes(p.brand));
    }

    if (selectedRating !== null) {
      filtered = filtered.filter(p => (p.rating || 0) >= selectedRating);
    }

    setDisplayedProducts(filtered);
  }, [searchTerm, priceRange, selectedBrands, selectedRating, initialCategorySlug, initialProducts]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleRatingChange = (rating: number | null) => {
    setSelectedRating(prev => prev === rating ? null : rating);
  };
  
  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([0, maxPriceFromProducts]);
    setSelectedBrands([]);
    setSelectedRating(null);
    // Note: initialCategorySlug from URL is not cleared by this button, user needs to click "All Products" category
  };

  return (
    <div className="grid md:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <aside className="md:col-span-1 space-y-6">
        <Card className="product-card-hover">
          <CardHeader>
            <CardTitle className="heading-elegant text-xl flex items-center justify-between">
              Filters
              <Button variant="ghost" size="sm" onClick={clearFilters} className="nav-elegant text-xs">
                <FilterX className="mr-1 h-3.5 w-3.5" /> Clear All
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Search Filter */}
            <div className="space-y-2">
              <Label htmlFor="search" className="text-elegant font-semibold">Search</Label>
              <div className="relative">
                <Input
                  id="search"
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-elegant pl-8"
                />
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-elegant font-semibold">Price Range</Label>
              <Slider
                id="price"
                min={0}
                max={maxPriceFromProducts}
                step={10}
                value={priceRange}
                onValueChange={(value) => setPriceRange(value as [number, number])}
                className="my-4"
              />
              <div className="flex justify-between text-sm text-muted-foreground text-elegant">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>

            {/* Brand Filter */}
            {allBrands.length > 0 && (
              <div className="space-y-2">
                <Label className="text-elegant font-semibold">Brand</Label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-2">
                  {allBrands.map(brand => (
                    <div key={brand} className="flex items-center space-x-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => handleBrandChange(brand)}
                      />
                      <Label htmlFor={`brand-${brand}`} className="text-elegant font-normal text-sm">{brand}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Rating Filter */}
            <div className="space-y-2">
              <Label className="text-elegant font-semibold">Rating</Label>
              <div className="flex flex-wrap gap-2">
                {[4, 3, 2, 1].map(rating => (
                  <Button
                    key={rating}
                    variant={selectedRating === rating ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleRatingChange(rating)}
                    className="nav-elegant text-xs"
                  >
                    {rating}+ <Star className="ml-1 h-3.5 w-3.5 fill-current" />
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>

      {/* Product Grid */}
      <main className="md:col-span-3">
        {displayedProducts.length > 0 ? (
          <div className="products-grid">
            {displayedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 col-span-full">
             <Search className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="heading-elegant text-xl text-muted-foreground mb-2">No products match your filters.</p>
            <p className="text-elegant text-sm text-muted-foreground">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
}
