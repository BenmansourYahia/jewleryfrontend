"use client"; // Needs to be client component for hooks

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import AdminSidebar from '@/components/admin/AdminSidebar';

// Metadata should be defined in a parent server component or layout file if static
// export const metadata: Metadata = {
//   title: 'Admin Panel - Gleaming Gallery',
//   description: 'Manage products, categories, and orders for Gleaming Gallery.',
// };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { adminUser } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!adminUser && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [adminUser, router, pathname]);

  // If on login page, render only the children
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If not logged in, don't render anything while redirecting
  if (!adminUser) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
