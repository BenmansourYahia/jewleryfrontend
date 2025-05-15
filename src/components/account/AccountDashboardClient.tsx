
"use client";

import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ListOrdered, MapPin, Heart, UserCircle, LogOut } from 'lucide-react';

const AccountDashboardClient = () => {
  const { currentUser, logout } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      router.push('/login?redirect=/account');
    }
  }, [currentUser, router]);

  if (!currentUser) {
    return <p className="text-center">Loading account details or redirecting...</p>; // Or a spinner
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  }

  const dashboardLinks = [
    { href: '/account/orders', label: 'Order History', icon: ListOrdered, description: "View your past orders and track current shipments." },
    { href: '/account/addresses', label: 'Manage Addresses', icon: MapPin, description: "Update your shipping and billing addresses." },
    { href: '/account/favorites', label: 'Favorite Products', icon: Heart, description: "See your saved favorite jewelry pieces." },
    // { href: '/account/profile', label: 'Profile Settings', icon: UserCircle, description: "Manage your personal details and password." },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Welcome, {currentUser.name}!</CardTitle>
          <CardDescription>Manage your account, view orders, and update your preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <p><span className="font-medium">Email:</span> {currentUser.email}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dashboardLinks.map(link => (
          <Link href={link.href} key={link.href} passHref>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
              <CardHeader className="flex flex-row items-center space-x-3 pb-3">
                <link.icon className="h-8 w-8 text-primary" />
                <CardTitle className="text-xl">{link.label}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{link.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center">
          <Button variant="outline" onClick={handleLogout} className="text-destructive hover:border-destructive hover:bg-destructive/10">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
      </div>
    </div>
  );
};

export default AccountDashboardClient;
