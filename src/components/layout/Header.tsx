"use client";

import Link from 'next/link';
import { ShoppingCart, User, Heart, Search, Menu, X, LogIn } from 'lucide-react';
import Logo from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/context/AppContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const Header = () => {
  const { cartItems, currentUser, logout, adminUser, adminLogout } = useAppContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ];

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const NavLinkItem = ({ href, label }: { href: string; label: string }) => (
    <Link href={href} passHref>
      <Button 
        variant="ghost" 
        className={`nav-elegant text-sm ${pathname === href ? 'text-primary' : 'text-foreground/70'}`} 
        onClick={() => setIsMobileMenuOpen(false)}
      >
        {label}
      </Button>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-elegant flex h-16 items-center justify-between">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
          {navLinks.map(link => <NavLinkItem key={link.href} {...link} />)}
        </nav>

        <div className="flex items-center space-x-2 md:space-x-3">
          {/* Search (optional for now)
          <div className="hidden sm:flex items-center space-x-1 border rounded-md px-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search..." className="h-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-sm w-32 lg:w-48" />
          </div>
          */}

          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon" className="nav-elegant" aria-label="Shopping Cart">
              <ShoppingCart className="h-5 w-5" />
              {totalCartItems > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {totalCartItems}
                </span>
              )}
            </Button>
          </Link>

          {currentUser && (
             <Link href="/account/favorites" passHref>
               <Button variant="ghost" size="icon" className="nav-elegant" aria-label="Favorites">
                 <Heart className="h-5 w-5" />
               </Button>
             </Link>
          )}

          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="nav-elegant" aria-label="User Account">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Hi, {currentUser.name}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="nav-elegant">
                  <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="nav-elegant">
                  <Link href="/account/orders">Order History</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} className="nav-elegant">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              {!adminUser && (
                <Link href="/login" passHref>
                  <Button variant="ghost" className="nav-elegant text-sm">Login</Button>
                </Link>
              )}
            </>
          )}

          {!adminUser && (
            <Link href="/admin/login" passHref>
              <Button variant="ghost" size="sm" className="nav-elegant text-sm">
                <LogIn className="mr-1 h-4 w-4 md:hidden lg:inline-block" /> Admin
              </Button>
            </Link>
          )}
          {adminUser && (
            <Button
              variant="outline"
              className="ml-2 text-destructive border-destructive hover:bg-destructive/10"
              onClick={() => {
                adminLogout();
                router.push('/admin/login');
              }}
            >
              Logout
            </Button>
          )}
          <Button variant="ghost" size="icon" className="md:hidden nav-elegant" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col space-y-1 p-4">
            {navLinks.map(link => <NavLinkItem key={link.href} {...link} />)}
            {!adminUser && (
              <Link href="/admin/login" passHref>
                <Button variant="ghost" className="w-full justify-start nav-elegant text-sm" onClick={() => setIsMobileMenuOpen(false)}>
                   <LogIn className="mr-2 h-4 w-4" /> Admin Login
                </Button>
              </Link>
            )}
             {/* Mobile Search
            <div className="flex items-center space-x-1 border rounded-md px-2 mt-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search..." className="h-8 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent text-sm flex-grow" />
            </div>
            */}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
