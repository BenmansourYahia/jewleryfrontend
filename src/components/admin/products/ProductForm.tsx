
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Product, Category } from '@/types';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ProductFormProps {
  product?: Product | null; // For editing
}

type FormData = {
  name: string;
  description: string;
  price: string; // string for input, convert to number on submit
  imageUrl: string;
  imageAlt: string;
  categoryId: string;
  stock: string; // string for input, convert to number on submit
  dataAiHint: string;
};

export default function ProductForm({ product: initialProductData }: ProductFormProps) {
  const router = useRouter();
  const { categories, addProduct, updateProduct, getCategoryById } = useAppContext();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    price: '',
    imageUrl: 'https://placehold.co/600x600.png', // Default placeholder
    imageAlt: '',
    categoryId: '',
    stock: '',
    dataAiHint: '',
  });

  const isEditing = Boolean(initialProductData);

  useEffect(() => {
    if (isEditing && initialProductData) {
      setFormData({
        name: initialProductData.name,
        description: initialProductData.description,
        price: initialProductData.price.toString(),
        imageUrl: typeof initialProductData.imageUrl === 'string' ? initialProductData.imageUrl : '',
        imageAlt: initialProductData.imageAlt || '',
        categoryId: initialProductData.category.id,
        stock: initialProductData.stock.toString(),
        dataAiHint: initialProductData.dataAiHint || '',
      });
    }
  }, [initialProductData, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, categoryId: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(formData.price);
    const stock = parseInt(formData.stock, 10);

    if (isNaN(price) || price <= 0) {
      toast({ title: "Invalid Price", description: "Price must be a positive number.", variant: "destructive" });
      return;
    }
    if (isNaN(stock) || stock < 0) {
      toast({ title: "Invalid Stock", description: "Stock must be a non-negative number.", variant: "destructive" });
      return;
    }
    if (!formData.categoryId) {
      toast({ title: "Category Required", description: "Please select a category.", variant: "destructive" });
      return;
    }

    const selectedCategory = getCategoryById(formData.categoryId);
    if (!selectedCategory) {
      toast({ title: "Invalid Category", description: "The selected category is not valid.", variant: "destructive" });
      return;
    }

    const productDataPayload = {
      name: formData.name,
      description: formData.description,
      price: price,
      imageUrl: formData.imageUrl,
      imageAlt: formData.imageAlt || formData.name, // Default alt to name if empty
      stock: stock,
      dataAiHint: formData.dataAiHint,
      // categoryId is part of formData but handled differently for addProduct/updateProduct
    };

    if (isEditing && initialProductData) {
      updateProduct({
        ...initialProductData, // Preserves ID, rating, numReviews
        ...productDataPayload,
        category: selectedCategory, // updateProduct expects full Category object
      });
      router.push('/admin/products');
    } else {
      const newProduct = addProduct({
        ...productDataPayload,
        categoryId: formData.categoryId, // addProduct expects categoryId
      });
      if (newProduct) {
        router.push('/admin/products');
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Product' : 'Create New Product'}</CardTitle>
        <CardDescription>
          {isEditing ? `Editing details for ${initialProductData?.name}` : 'Fill in the details for the new product.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="categoryId">Category</Label>
              <Select name="categoryId" value={formData.categoryId} onValueChange={handleSelectChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleChange} required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleChange} required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="imageAlt">Image Alt Text</Label>
              <Input id="imageAlt" name="imageAlt" value={formData.imageAlt} onChange={handleChange} placeholder="Brief description of image" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dataAiHint">Data AI Hint (Optional)</Label>
            <Input id="dataAiHint" name="dataAiHint" value={formData.dataAiHint} onChange={handleChange} placeholder="e.g., necklace silver" />
            <p className="text-xs text-muted-foreground">Keywords for AI image search (1-2 words).</p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? 'Save Changes' : 'Create Product'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
