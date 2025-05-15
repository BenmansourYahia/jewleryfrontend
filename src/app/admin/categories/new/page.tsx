
import type { Metadata } from 'next';
import CategoryForm from '@/components/admin/categories/CategoryForm';

export const metadata: Metadata = {
  title: 'Add New Category - Admin Panel',
  description: 'Create a new product category.',
};

export default function AddNewCategoryPage() {
  return (
    <div className="space-y-6">
      <CategoryForm />
    </div>
  );
}

    