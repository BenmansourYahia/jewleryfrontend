import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/products/ProductCard';
import { mockProducts, mockCategories } from '@/lib/mockData';
import type { Product } from '@/types';
import { ChevronRight } from 'lucide-react';

async function getFeaturedProducts(): Promise<Product[]> {
  // Simulate API delay and get first 4 products as featured
  await new Promise(resolve => setTimeout(resolve, 50));
  return mockProducts.slice(0, 4);
}

function getCategoryImage(slug: string): string {
  const images = {
    necklaces: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop",
    earrings: "https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop",
    rings: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop",
    bracelets: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
    watches: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=800&auto=format&fit=crop",
    accessories: "https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=800&auto=format&fit=crop"
  };
  return images[slug as keyof typeof images] || "https://images.unsplash.com/photo-1515405295579-ba7b45403062?q=80&w=800&auto=format&fit=crop";
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] rounded-lg overflow-hidden shadow-xl">
        <Image
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1920&q=80"
          alt="Gold jewelry set hero banner"
          fill
          priority
          className="object-cover"
          data-ai-hint="gold jewelry collection luxury"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h1 className="heading-elegant text-4xl sm:text-5xl md:text-6xl text-white leading-tight shadow-md">
            Discover Your Sparkle
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-2xl shadow-sm text-elegant">
            Explore our curated collection of exquisite jewelry, crafted to celebrate your unique style.
          </p>
          <Link href="/products" passHref>
            <Button size="lg" className="btn-elegant mt-8 text-lg px-8 py-6">
              Shop Collection
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-elegant">
        <h2 className="heading-elegant text-3xl text-center mb-8 text-primary">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {mockCategories.map(category => (
            <Link key={category.id} href={`/products?category=${category.slug}`} passHref>
              <div className="group aspect-[4/3] relative rounded-lg overflow-hidden shadow-md cursor-pointer product-card-hover">
                <Image 
                  src={getCategoryImage(category.slug)}
                  alt={category.name} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  data-ai-hint={`${category.slug} jewelry`}
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                  <h3 className="heading-elegant text-xl text-white">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section-elegant">
        <div className="flex justify-between items-center mb-8">
          <h2 className="heading-elegant text-3xl text-primary">Featured Jewelry</h2>
          <Link href="/products" passHref>
            <Button variant="outline" className="nav-elegant hover:text-primary">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
        {featuredProducts.length > 0 ? (
          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-elegant">No featured products available at the moment.</p>
        )}
      </section>

      {/* Call to Action / Special Offer */}
      <section className="section-elegant bg-accent/10 rounded-lg text-center shadow">
        <h2 className="heading-elegant text-3xl text-accent mb-4">Limited Time Offer</h2>
        <p className="text-lg text-accent-foreground/80 mb-6 max-w-xl mx-auto text-elegant">
          Sign up for our newsletter and receive 15% off your first order. Plus, get exclusive access to new arrivals and special promotions.
        </p>
        <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="input-elegant flex-grow" 
          />
          <Button type="submit" size="lg" className="btn-elegant">
            Subscribe Now
          </Button>
        </form>
      </section>
    </div>
  );
}
