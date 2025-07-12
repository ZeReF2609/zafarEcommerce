"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'All Products' },
  { href: '/collections/new-arrivals', label: 'New Arrivals' },
  { href: '/collections/summer-collection', label: 'Summer Collection' },
  { href: '/orders', label: 'My Orders'}
];

export function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const { totalItems } = useCart();
  const itemCount = totalItems();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="mb-4">
                  <Logo />
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-lg bg-secondary/20 pl-8 md:w-[200px] lg:w-[320px]"
                />
              </div>
            </form>
          </div>
          <Button variant="ghost" size="icon">
            <User className="h-6 w-6" />
            <span className="sr-only">Account</span>
          </Button>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {isMounted && itemCount > 0 && (
                 <Badge variant="destructive" className="absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full p-0">{itemCount}</Badge>
              )}
              <span className="sr-only">Shopping Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
