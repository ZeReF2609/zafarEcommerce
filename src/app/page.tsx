
"use client";

import Link from 'next/link';
import React, { Suspense } from 'react';
import { products } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from '@/components/ui/skeleton';

function ProductCarouselSkeleton() {
  return (
    <div className="w-full">
      <div className="flex space-x-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex-shrink-0 basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5">
            <Skeleton className="h-[350px] w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-[350px] w-full" />
      ))}
    </div>
  )
}

export default function Home() {
  const newArrivals = products.filter(p => p.collection === 'new-arrivals').slice(0, 5);
  const summerCollection = products.filter(p => p.collection === 'summer-collection').slice(0, 5);
  const featuredProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );

  return (
    <div className="animate-fade-in">
      <section className="relative h-[70vh] bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1600x900.png')" }} data-ai-hint="fashion lifestyle modern">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl font-headline">
            Define Your Style
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-gray-200">
            Explore our curated collections of premium apparel, accessories, and gadgets.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/products">Shop The Collection</Link>
          </Button>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container">
          <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Featured Products</h2>
              <p className="mt-2 text-lg text-muted-foreground">
                  Hand-picked by us, just for you.
              </p>
          </div>
          <Suspense fallback={<ProductCarouselSkeleton />}>
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
          </Suspense>
        </div>
      </section>


      <section className="py-16 sm:py-20 lg:py-24 bg-secondary/50">
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
              <Suspense fallback={<ProductGridSkeleton />}>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {newArrivals.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
              </Suspense>
            </TabsContent>
            <TabsContent value="summer-collection">
              <Suspense fallback={<ProductGridSkeleton />}>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {summerCollection.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
              </Suspense>
            </TabsContent>
            </Tabs>
        </div>
      </section>
    </div>
  );
}
