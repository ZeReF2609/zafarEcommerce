
"use client";

import Link from 'next/link';
import React from 'react';
import { products } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";

export default function Home() {
  const newArrivals = products.filter(p => p.collection === 'new-arrivals').slice(0, 5);
  const summerCollection = products.filter(p => p.collection === 'summer-collection').slice(0, 5);
  const featuredProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div>
      <section className="relative h-[60vh] bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1600x900.png')" }} data-ai-hint="fashion lifestyle">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white">
          <h1 className="text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl font-headline">
            Discover Your Style
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200">
            Explore our curated collections of premium apparel, accessories, and gadgets.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-accent">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container">
          <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Featured Products</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                  Hand-picked by us, just for you.
              </p>
          </div>
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5">
                   <div className="p-1">
                      <ProductCard product={product} />
                   </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
          </Carousel>
        </div>
      </section>


      <section className="py-12 sm:py-16 lg:py-20 bg-background">
        <div className="container">
            <Tabs defaultValue="new-arrivals" className="w-full">
            <div className="mb-8 flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Our Collections</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                    Check out what's new and trending.
                </p>
                <TabsList className="mt-4 grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="new-arrivals">New Arrivals</TabsTrigger>
                    <TabsTrigger value="summer-collection">Summer Collection</TabsTrigger>
                </TabsList>
            </div>
            
            <TabsContent value="new-arrivals">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {newArrivals.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            </TabsContent>
            <TabsContent value="summer-collection">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {summerCollection.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
            </TabsContent>
            </Tabs>
        </div>
      </section>
    </div>
  );
}
