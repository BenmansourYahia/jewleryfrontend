import { mockProducts, mockCategories } from '@/lib/mockData';
import type { Product, Category } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductListing from '@/components/products/ProductListing';

export const metadata = {
  title: 'Shop All Products - Gleaming Gallery',
  description: 'Browse our collection of exquisite jewelry. Filter by category, price, brand, and ratings.',
};

async function getAllProducts(): Promise<Product[]> {
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate API delay
  return mockProducts;
}

async function getAllCategories(): Promise<Category[]> {
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate API delay
  return mockCategories;
}

export default async function ProductsPage() {
  const allProducts = await getAllProducts();
  const allCategories = await getAllCategories();

  return (
    <div className="space-y-8">
      <section className="section-elegant text-center bg-muted/30 rounded-lg shadow-sm">
        <h1 className="heading-elegant text-4xl tracking-tight text-primary">Our Collection</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-elegant">
          Explore handcrafted jewelry designed to make every moment shine. Find your perfect piece today.
        </p>
      </section>
      
      <section className="section-elegant">
        <h2 className="heading-elegant text-2xl mb-4 text-center md:text-left">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {allCategories.map(category => (
            <Link key={category.id} href={`/products?category=${category.slug}`} passHref>
              <Button 
                variant="outline" 
                className="nav-elegant w-full h-16 text-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {category.name}
              </Button>
            </Link>
          ))}
           <Link href={`/products`} passHref>
              <Button 
                variant="outline" 
                className="nav-elegant w-full h-16 text-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                All Products
              </Button>
            </Link>
        </div>
      </section>

      <ProductListing initialProducts={allProducts} categories={allCategories} />
    </div>
  );
}
