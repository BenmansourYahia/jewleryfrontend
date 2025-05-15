import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Products - Admin Panel',
  description: 'Add, edit, and manage products for Gleaming Gallery.',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 