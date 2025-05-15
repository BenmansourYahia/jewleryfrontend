
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Gem } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 text-muted-foreground border-t">
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4 text-primary">
              <Gem className="h-7 w-7" />
              <span className="text-xl font-semibold">Gleaming Gallery</span>
            </Link>
            <p className="text-sm">
              Exquisite jewelry for every occasion. Discover your sparkle with us.
            </p>
          </div>
          <div>
            <h3 className="text-md font-semibold text-foreground mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-primary transition-colors">Shop All</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/account" className="hover:text-primary transition-colors">My Account</Link></li>
              <li><Link href="/cart" className="hover:text-primary transition-colors">Shopping Cart</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold text-foreground mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-md font-semibold text-foreground mb-3">Follow Us</h3>
            <div className="flex space-x-3">
              <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors"><Facebook size={20} /></Link>
              <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></Link>
              <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></Link>
            </div>
            <h3 className="text-md font-semibold text-foreground mt-6 mb-3">Newsletter</h3>
            <form className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Your email" className="flex-grow p-2 border rounded-md text-sm focus:ring-primary focus:border-primary" />
              <button type="submit" className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm hover:bg-primary/90 transition-colors">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="text-center text-sm border-t pt-8">
          <p>&copy; {currentYear} Gleaming Gallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
