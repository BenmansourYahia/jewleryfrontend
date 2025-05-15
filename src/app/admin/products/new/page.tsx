
import type { Metadata } from 'next';
import ProductForm from '@/components/admin/products/ProductForm';

export const metadata: Metadata = {
  title: 'Add New Product - Admin Panel',
  description: 'Create a new product for Gleaming Gallery.',
};

export default function AddNewProductPage() {
  return (
    <div className="space-y-6">
      {/* <h1 className="text-3xl font-bold text-primary">Add New Product</h1> */}
      <ProductForm />
    </div>
  );
}
