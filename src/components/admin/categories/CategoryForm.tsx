
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Category } from '@/types';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface CategoryFormProps {
  initialData?: Category | null;
}

type FormData = {
  name: string;
  slug: string;
};

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const { addCategory, updateCategory, categories } = useAppContext();
  const { toast } = useToast();

  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
  });

  const isEditing = Boolean(initialData);

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData({
        name: initialData.name,
        slug: initialData.slug,
      });
    }
  }, [initialData, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'name' && !isEditing && !formData.slug) { // Auto-generate slug only if not editing and slug is empty
        setFormData(prev => ({ ...prev, slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') }));
    }
  };
  
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Allow manual override of slug, but still clean it
    setFormData(prev => ({ ...prev, slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.slug.trim()) {
        toast({ title: "Validation Error", description: "Name and Slug are required.", variant: "destructive" });
        return;
    }
    
    const categoryDataPayload = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
    };

    if (isEditing && initialData) {
      updateCategory({
        ...initialData, 
        ...categoryDataPayload,
      });
      // updateCategory in context now handles toast
      router.push('/admin/categories');
    } else {
      const newCategory = addCategory(categoryDataPayload);
      if (newCategory) { // addCategory returns null on failure (e.g. duplicate slug/name)
        // addCategory in context now handles toast
        router.push('/admin/categories');
      }
      // If newCategory is null, the toast is handled by addCategory in context
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isEditing ? 'Edit Category' : 'Create New Category'}</CardTitle>
        <CardDescription>
          {isEditing ? `Editing details for ${initialData?.name}` : 'Fill in the details for the new category.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Category Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug">Category Slug</Label>
            <Input id="slug" name="slug" value={formData.slug} onChange={handleSlugChange} required />
            <p className="text-xs text-muted-foreground">
              Unique identifier for the URL (e.g., "new-arrivals", "summer-collection"). Will be auto-generated from name if left empty on creation.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => router.push('/admin/categories')}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? 'Save Changes' : 'Create Category'}</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

    