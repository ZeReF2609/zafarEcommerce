
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
import { CartSheet } from '@/components/cart-sheet';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/products', label: 'Todos los Productos' },
  { href: '/collections/new-arrivals', label: 'Novedades' },
  { href: '/collections/summer-collection', label: 'Colección de Verano' },
];

export function Header() {
  const [isMounted, setIsMounted] = useState(false);
  const { totalItems, isCartOpen, toggleCart } = useCart();
  const itemCount = totalItems();
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[#121212] text-white">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6">
            <Logo className="text-white" />
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-between md:justify-center">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-white bg-white/10 hover:bg-white/20">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Abrir Menú</span>
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
                    <Link href="/account" className="text-lg transition-colors hover:text-primary">
                      Mi Cuenta
                    </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="md:hidden">
            <Link href="/">
                <Logo className="text-white" />
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-2">
            <div className="hidden sm:block">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-white/60" />
                  <Input
                    type="search"
                    placeholder="Buscar productos..."
                    className="w-full rounded-lg pl-8 bg-white/10 text-white placeholder:text-white/60 border-white/20 md:w-[200px] lg:w-[240px]"
                  />
                </div>
              </form>
            </div>
            <Link href="/account">
              <Button variant="ghost" size="icon" className="text-white hover:text-white bg-white/10 hover:bg-white/20">
                <User className="h-5 w-5" />
                <span className="sr-only">Cuenta</span>
              </Button>
            </Link>
            <Sheet open={isCartOpen} onOpenChange={toggleCart}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white hover:text-white bg-white/10 hover:bg-white/20">
                  <ShoppingCart className="h-5 w-5" />
                  {isMounted && itemCount > 0 && (
                    <Badge variant="destructive" className="absolute -right-2 -top-2 h-5 w-5 justify-center rounded-full p-0 text-xs">{itemCount}</Badge>
                  )}
                  <span className="sr-only">Carrito de Compras</span>
                </Button>
              </SheetTrigger>
              <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <CartSheet />
              </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
