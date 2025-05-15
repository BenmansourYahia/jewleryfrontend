
import type { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import CategoryListTable from '@/components/admin/categories/CategoryListTable';

export const metadata: Metadata = {
  title: 'Manage Categories - Admin Panel',
  description: 'Add, edit, and manage product categories.',
};

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Manage Categories</h1>
        <Link href="/admin/categories/new" passHref>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Category
          </Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Category List</CardTitle>
          <CardDescription>View, edit, or delete product categories.</CardDescription>
        </CardHeader>
        <CardContent>
          <CategoryListTable />
        </CardContent>
      </Card>
    </div>
  );
}

    