import type { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Users, Target, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us - Gleaming Gallery',
  description: 'Learn more about Gleaming Gallery, our mission, values, and the team behind our exquisite jewelry.',
};

export default function AboutUsPage() {
  return (
    <div className="space-y-12">
      <section className="section-elegant text-center bg-muted/30 rounded-lg shadow-sm">
        <h1 className="heading-elegant text-4xl tracking-tight text-primary">About Gleaming Gallery</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto text-elegant">
          Discover the story behind our passion for exquisite jewelry and commitment to quality.
        </p>
      </section>

      <section className="section-elegant grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="heading-elegant text-3xl text-primary mb-4">Our Story</h2>
          <p className="text-muted-foreground mb-4 leading-relaxed text-elegant">
            Gleaming Gallery was founded with a simple mission: to bring breathtakingly beautiful and high-quality jewelry to everyone. We believe that jewelry is more than just an accessory; it's a form of self-expression, a celebration of milestones, and a timeless treasure.
          </p>
          <p className="text-muted-foreground leading-relaxed text-elegant">
            From humble beginnings, we've grown into a trusted name for those seeking unique designs and exceptional craftsmanship. Our curators travel the world to find the most stunning pieces, ensuring each item in our collection meets our high standards of beauty and durability.
          </p>
        </div>
        <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl product-card-hover">
          <Image
            src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=800&auto=format&fit=crop"
            alt="Artisan crafting jewelry"
            fill
            className="object-cover"
            data-ai-hint="artisan jewelry crafting"
          />
        </div>
      </section>

      <section className="section-elegant space-y-8">
        <div className="text-center">
            <h2 className="heading-elegant text-3xl text-primary mb-8">Our Values</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md product-card-hover">
            <Sparkles className="h-12 w-12 text-secondary mb-4" />
            <h3 className="heading-elegant text-xl text-foreground mb-2">Quality Craftsmanship</h3>
            <p className="text-sm text-muted-foreground text-elegant">
              Every piece is meticulously selected for its superior quality materials and expert craftsmanship, ensuring lasting beauty.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md product-card-hover">
            <Users className="h-12 w-12 text-secondary mb-4" />
            <h3 className="heading-elegant text-xl text-foreground mb-2">Customer Delight</h3>
            <p className="text-sm text-muted-foreground text-elegant">
              We are dedicated to providing an exceptional shopping experience, from browsing to unboxing your precious new item.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md product-card-hover">
            <Target className="h-12 w-12 text-secondary mb-4" />
            <h3 className="heading-elegant text-xl text-foreground mb-2">Timeless Elegance</h3>
            <p className="text-sm text-muted-foreground text-elegant">
              Our collection features designs that transcend trends, offering timeless elegance that can be cherished for generations.
            </p>
          </div>
        </div>
      </section>

      <section className="section-elegant text-center bg-accent/10 rounded-lg shadow">
        <h2 className="heading-elegant text-3xl text-accent mb-4">Join Our Journey</h2>
        <p className="text-lg text-accent-foreground/80 mb-6 max-w-xl mx-auto text-elegant">
          Explore our collections and find the perfect piece that tells your story.
        </p>
        <Link href="/products" passHref>
          <Button size="lg" className="btn-elegant">
            Shop Our Collections
          </Button>
        </Link>
      </section>
    </div>
  );
}
