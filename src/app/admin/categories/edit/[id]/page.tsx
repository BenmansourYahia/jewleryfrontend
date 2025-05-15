
"use client";

import { useParams, notFound, useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import CategoryForm from '@/components/admin/categories/CategoryForm';
import { useEffect, useState } from 'react';
import type { Category } from '@/types';
import { useToast } from '@/hooks/use-toast';

// No metadata in client components for dynamic parts like this

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const { getCategoryById, updateCategory } = useAppContext();
  const { toast } = useToast();
  const [category, setCategory] = useState<Category | null | undefined>(undefined); // undefined for loading

  const categoryId = typeof params.id === 'string' ? params.id : undefined;

  useEffect(() => {
    if (categoryId) {
      const foundCategory = getCategoryById(categoryId);
      setCategory(foundCategory);
    } else {
      setCategory(null); // No ID, so no category
    }
  }, [categoryId, getCategoryById]);

  if (category === undefined) {
    return <p className="text-center py-10">Loading category details...</p>;
  }

  if (!category) {
    // This will typically only happen if ID is invalid and not caught by getCategoryById returning undefined earlier
    // Or if getCategoryById itself triggers a notFound (which it doesn't in current mock setup)
    notFound(); 
  }
  
  return (
    <div className="space-y-6">
      <CategoryForm
        initialData={category}
      />
    </div>
  );
}

    