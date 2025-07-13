
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
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, isCartOpen, toggleCart } = useCart();
  const itemCount = totalItems();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    setIsMounted(true);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClasses = cn(
    "sticky top-0 z-50 w-full transition-all duration-300",
    (isScrolled || !isHomePage) ? "border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent text-white"
  );
  
  const linkClasses = cn(
    "transition-colors hover:text-primary",
    (isScrolled || !isHomePage) ? "text-foreground/60 hover:text-foreground/80" : "text-white/80 hover:text-white"
  );
  
  const iconButtonClasses = cn(
    (isScrolled || !isHomePage) ? "" : "text-white hover:text-white bg-white/10 hover:bg-white/20"
  );

  return (
    <header className={headerClasses}>
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6">
            <Logo className={cn((isScrolled || !isHomePage) ? 'text-foreground' : 'text-white')} />
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={linkClasses}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-between md:justify-end">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={iconButtonClasses}>
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
        
          <div className="md:hidden">
            <Link href="/">
                <Logo className={cn((isScrolled || !isHomePage) ? 'text-foreground' : 'text-white')} />
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <div className="hidden sm:block">
              <form>
                <div className="relative">
                  <Search className={cn("absolute left-2.5 top-2.5 h-4 w-4", (isScrolled || !isHomePage) ? "text-muted-foreground" : "text-white/60")} />
                  <Input
                    type="search"
                    placeholder="Buscar productos..."
                    className={cn("w-full rounded-lg pl-8 md:w-[200px] lg:w-[320px]", (isScrolled || !isHomePage) ? "bg-secondary" : "bg-white/10 text-white placeholder:text-white/60 border-white/20")}
                  />
                </div>
              </form>
            </div>
            <Link href="/account">
              <Button variant="ghost" size="icon" className={iconButtonClasses}>
                <User className="h-5 w-5" />
                <span className="sr-only">Cuenta</span>
              </Button>
            </Link>
            <Sheet open={isCartOpen} onOpenChange={toggleCart}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className={cn("relative", iconButtonClasses)}>
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
      </div>
    </header>
  );
}
