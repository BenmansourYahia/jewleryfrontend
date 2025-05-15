
import CheckoutClient from '@/components/checkout/CheckoutClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout - Gleaming Gallery',
  description: 'Complete your purchase securely.',
};

export default function CheckoutPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-8">Checkout</h1>
      <CheckoutClient />
    </div>
  );
}
