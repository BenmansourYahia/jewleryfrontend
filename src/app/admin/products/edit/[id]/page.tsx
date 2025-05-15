
"use client"; // This page needs to be client-side to use hooks like useParams and context

import { useParams, notFound } from 'next/navigation'; // Use next/navigation
import { useAppContext } from '@/context/AppContext';
import ProductForm from '@/components/admin/products/ProductForm';
import { useEffect, useState } from 'react';
import type { Product } from '@/types';
// No metadata in client components, set in layout or use a server component wrapper if needed.

export default function EditProductPage() {
  const params = useParams();
  const { getProductById } = useAppContext();
  const [product, setProduct] = useState<Product | null | undefined>(undefined); // undefined for loading state
  
  const productId = typeof params.id === 'string' ? params.id : undefined;

  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      setProduct(foundProduct);
    } else {
      setProduct(null); // No ID, so no product
    }
  }, [productId, getProductById]);

  if (product === undefined) {
    return <p className="text-center">Loading product details...</p>; // Loading state
  }

  if (!product) {
    notFound(); // Triggers the not-found page
  }
  
  return (
    <div className="space-y-6">
      {/* Title is handled by ProductForm now */}
      <ProductForm product={product} />
    </div>
  );
}
