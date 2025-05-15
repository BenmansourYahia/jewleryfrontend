
import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Package, Shapes, DollarSign } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Gleaming Gallery',
  description: 'Overview of your e-commerce store.',
};

// This would ideally fetch real data
const getSummaryData = async () => {
  return {
    totalProducts: 8, // from mockData length
    totalCategories: 4, // from mockData length
    totalRevenue: 5678.99, // example data
  };
};

export default async function AdminDashboardPage() {
  const summary = await getSummaryData();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalProducts}</div>
            <p className="text-xs text-muted-foreground">Currently listed products</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
            <Shapes className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summary.totalCategories}</div>
            <p className="text-xs text-muted-foreground">Product categories available</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (Mock)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summary.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Based on mock order data</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Welcome to the Admin Panel</CardTitle>
          <CardDescription>
            From here, you can manage your products, categories, view orders, and more.
            Use the sidebar navigation to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is a basic dashboard. More features and analytics can be added here.</p>
        </CardContent>
      </Card>
    </div>
  );
}
