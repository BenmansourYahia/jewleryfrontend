
import ProductDetailClient from '@/components/products/ProductDetailClient';
import { mockProducts } from '@/lib/mockData';
import type { Product } from '@/types';
import type { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

type Props = {
  params: { id: string };
};

// This function would fetch a single product by ID in a real app
async function getProduct(id: string): Promise<Product | undefined> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return mockProducts.find((p) => p.id === id);
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProduct(params.id);

  if (!product) {
    return {
      title: 'Product Not Found - Gleaming Gallery',
    };
  }

  return {
    title: `${product.name} - Gleaming Gallery`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: typeof product.imageUrl === 'string' ? product.imageUrl : '', // Adjust if StaticImageData
          width: 600,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div>
      <ProductDetailClient product={product} />
    </div>
  );
}

// Generate static paths for all products
export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }));
}
