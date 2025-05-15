"use client";

import type { Product, Review } from '@/types';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, MessageSquare, Star } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { useState, useEffect } from 'react';
import { getStyleGuideSuggestions, StyleGuideInput } from '@/ai/flows/style-guide'; // Assuming this path
import { mockProducts as allMockProducts, mockReviews } from '@/lib/mockData'; // Import all products for AI
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Link from 'next/link';
import ProductCard from './ProductCard'; // To display suggested products

const ProductDetailClient = ({ product }: { product: Product }) => {
  const { addToCart, toggleFavorite, isFavorite, currentUser } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [styleSuggestions, setStyleSuggestions] = useState<string[]>([]);
  const [suggestedProducts, setSuggestedProducts] = useState<Product[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    // Filter reviews for the current product
    const productReviews = mockReviews.filter(review => review.productId === product.id);
    setReviews(productReviews);
  }, [product.id]);

  const handleQuantityChange = (amount: number) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleGetStyleSuggestions = async () => {
    setIsLoadingSuggestions(true);
    setStyleSuggestions([]);
    setSuggestedProducts([]);

    const availableProductsDescription = allMockProducts
      .filter(p => p.id !== product.id) // Exclude current product
      .map(p => `${p.name}: ${p.description.substring(0,100)}... (Category: ${p.category.name}, Price: $${p.price})`)
      .join('\n');

    const input: StyleGuideInput = {
      currentItemDescription: `${product.name}: ${product.description} (Category: ${product.category.name}, Price: $${product.price})`,
      availableProductsDescription: availableProductsDescription,
    };

    try {
      const result = await getStyleGuideSuggestions(input);
      setStyleSuggestions(result.suggestions);
      
      // Match suggestions text with actual product objects
      const matchedProducts = result.suggestions.map(suggestionText => {
        // This is a simple match, might need more sophisticated logic
        return allMockProducts.find(p => suggestionText.toLowerCase().includes(p.name.toLowerCase())) || null;
      }).filter(p => p !== null) as Product[];
      setSuggestedProducts(matchedProducts);

    } catch (error) {
      console.error("Error getting style suggestions:", error);
      setStyleSuggestions(["Could not fetch suggestions at this time."]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };
  
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : product.rating || 0;
  
  const numReviews = reviews.length > 0 ? reviews.length : product.numReviews || 0;

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div className="relative aspect-square overflow-hidden rounded-lg shadow-lg">
        <Image
          src={product.imageUrl}
          alt={product.imageAlt || product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          data-ai-hint={product.dataAiHint || 'jewelry details'}
          priority
        />
         {currentUser && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-background/70 hover:bg-background rounded-full h-10 w-10 nav-elegant"
              onClick={() => toggleFavorite(product)}
              aria-label={isFavorite(product.id) ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-5 w-5 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
            </Button>
          )}
      </div>

      <div className="space-y-6">
        <h1 className="heading-elegant text-3xl lg:text-4xl font-bold text-primary">{product.name}</h1>
        
        { (averageRating > 0 || numReviews > 0) && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-elegant text-sm text-muted-foreground">({numReviews} reviews)</span>
          </div>
        )}

        <p className="text-2xl font-semibold text-foreground">${product.price.toFixed(2)}</p>
        <p className="text-elegant text-muted-foreground leading-relaxed">{product.description}</p>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(-1)} disabled={quantity <= 1} className="nav-elegant">-</Button>
            <span className="w-10 text-center text-elegant">{quantity}</span>
            <Button variant="ghost" size="icon" onClick={() => handleQuantityChange(1)} className="nav-elegant">+</Button>
          </div>
          <Button size="lg" className="flex-grow nav-elegant bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
        </div>
        <p className="text-elegant text-sm text-green-600">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
        
        <div className="pt-6">
          <h3 className="heading-elegant text-xl font-semibold mb-3 text-foreground">Style Guide</h3>
          <Button onClick={handleGetStyleSuggestions} disabled={isLoadingSuggestions} variant="outline" className="nav-elegant">
            {isLoadingSuggestions ? 'Getting Suggestions...' : 'Get Styling Suggestions'}
          </Button>
          {styleSuggestions.length > 0 && !isLoadingSuggestions && (
            <div className="mt-4 space-y-3">
              <p className="text-elegant font-medium text-muted-foreground">Our AI stylist suggests pairing this with:</p>
              {suggestedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {suggestedProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                 <ul className="list-disc list-inside space-y-1 text-sm text-elegant">
                    {styleSuggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="md:col-span-2">
        <h2 className="heading-elegant text-2xl font-bold mb-6 text-foreground">Customer Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map(review => (
              <Card key={review.id} className="product-card-hover">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="heading-elegant text-lg">{review.userName}</CardTitle>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <CardDescription className="text-elegant">{new Date(review.createdAt).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-elegant">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-elegant text-muted-foreground">No reviews yet for this product. Be the first to write one!</p>
        )}
        {/* Add Review Form (Placeholder) */}
        <div className="mt-8">
            <h3 className="heading-elegant text-xl font-semibold mb-4">Write a Review</h3>
            <p className="text-elegant text-muted-foreground text-sm">Feature coming soon.</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailClient;
