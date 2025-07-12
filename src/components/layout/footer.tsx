import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Logo } from '@/components/icons';

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="text-secondary-foreground" />
            <p className="mt-4 text-sm text-muted-foreground">
              Your one-stop shop for everything cool.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider">Shop</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/collections/new-arrivals" className="text-sm text-muted-foreground hover:text-primary">New Arrivals</Link></li>
              <li><Link href="/collections/summer-collection" className="text-sm text-muted-foreground hover:text-primary">Summer Collection</Link></li>
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary">All Products</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider">About</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Our Story</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold uppercase tracking-wider">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">FAQ</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
              <li><Link href="/orders" className="text-sm text-muted-foreground hover:text-primary">Order Status</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-muted pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ShopSphere. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
