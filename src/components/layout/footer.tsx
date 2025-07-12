import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Logo } from '@/components/icons';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          <div className='lg:col-span-2'>
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Your one-stop shop for everything cool. High-quality products and unbeatable prices.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/collections/new-arrivals" className="text-sm text-muted-foreground hover:text-primary transition-colors">New Arrivals</Link></li>
              <li><Link href="/collections/summer-collection" className="text-sm text-muted-foreground hover:text-primary transition-colors">Summer Collection</Link></li>
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider">About</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
              <li><Link href="/account/orders" className="text-sm text-muted-foreground hover:text-primary transition-colors">Order Status</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-muted pt-8 flex flex-col md:flex-row items-center justify-between">
           <p className="text-sm text-muted-foreground text-center md:text-left">
              &copy; {new Date().getFullYear()} ShopSphere. All Rights Reserved.
            </p>
            <div className="mt-4 md:mt-0">
                <form className='flex w-full max-w-sm items-center space-x-2'>
                    <Input type='email' placeholder='Enter your email' className='bg-background'/>
                    <Button type='submit'>Subscribe</Button>
                </form>
            </div>
        </div>
      </div>
    </footer>
  );
}
