"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';
import { ProductListTable } from '@/components/admin/products/ProductListTable';
import { useAppContext } from '@/context/AppContext';
import { Product } from '@/types';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminProductsPage() {
  const router = useRouter();
  const { products, deleteProduct } = useAppContext();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = (product: Product) => {
    router.push(`/admin/products/edit/${product.id}`);
  };

  const handleDelete = async (productId: string) => {
    try {
      setIsDeleting(true);
      await deleteProduct(productId);
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Manage Products</h1>
        <Link href="/admin/products/new" passHref>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add New Product
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductListTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </CardContent>
      </Card>
    </div>
  );
}
