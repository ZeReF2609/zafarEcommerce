
"use client";

import Link from 'next/link';
import React, { Suspense } from 'react';
import Image from 'next/image';
import { products } from '@/lib/placeholder-data';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductCard } from '@/components/product-card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from '@/components/ui/skeleton';
import { CountdownTimer } from '@/components/countdown-timer';
import { Card, CardContent } from '@/components/ui/card';

function ProductCarouselSkeleton() {
  return (
    <div className="w-full">
      <div className="flex space-x-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="min-w-0 shrink-0 grow-0 basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5">
            <Skeleton className="h-[350px] w-full" />
          </div>
        ))}
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {[...Array(5)].map((_, i) => (
        <Skeleton key={i} className="h-[350px] w-full" />
      ))}
    </div>
  )
}

const heroSlides = [
    {
        title: "La Colección de Verano ya está Aquí",
        description: "Descubre las últimas tendencias y define tu estilo con nuestras novedades.",
        buttonText: "Compra la Colección",
        href: "/collections/summer-collection",
        image: "https://placehold.co/1600x900.png",
        hint: "fashion lifestyle modern"
    },
    {
        title: "Novedades que te Encantarán",
        description: "Lo último en moda acaba de llegar. Sé el primero en descubrirlo.",
        buttonText: "Ver Novedades",
        href: "/collections/new-arrivals",
        image: "https://placehold.co/1600x900.png",
        hint: "clothing rack store"
    },
    {
        title: "Accesorios para Completar tu Look",
        description: "Desde bolsos hasta relojes, encuentra el complemento perfecto.",
        buttonText: "Explorar Accesorios",
        href: "/products",
        image: "https://placehold.co/1600x900.png",
        hint: "watch sunglasses accessory"
    }
]

export default function Home() {
  const newArrivals = products.filter(p => p.collection === 'new-arrivals').slice(0, 5);
  const summerCollection = products.filter(p => p.collection === 'summer-collection').slice(0, 5);
  const featuredProducts = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const dealOfTheDay = products.find(p => p.originalPrice);
  
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  
  const heroPlugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const offerEndDate = new Date();
  offerEndDate.setDate(offerEndDate.getDate() + 1);
  offerEndDate.setHours(23, 59, 59, 999);

  return (
    <div className="animate-fade-in">
      <section className="relative h-[80vh] w-full">
         <Carousel
            plugins={[heroPlugin.current]}
            className="w-full h-full"
            opts={{ loop: true }}
            onMouseEnter={heroPlugin.current.stop}
            onMouseLeave={heroPlugin.current.reset}
          >
            <CarouselContent className="h-full">
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index} className="h-full">
                    <div className="relative h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${slide.image}')` }} data-ai-hint={slide.hint}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
                        <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white p-4">
                            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl font-headline">
                                {slide.title}
                            </h1>
                            <p className="mt-4 max-w-2xl text-lg text-gray-200">
                                {slide.description}
                            </p>
                            <Button asChild size="lg" className="mt-8">
                                <Link href={slide.href}>{slide.buttonText}</Link>
                            </Button>
                        </div>
                    </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 hidden md:flex" />
        </Carousel>
      </section>

      {dealOfTheDay && (
        <section className="py-16 sm:py-20 lg:py-24">
            <div className="container">
                <Card className="overflow-hidden">
                    <div className="grid md:grid-cols-2">
                         <div className="relative aspect-video md:aspect-auto">
                            <Image 
                                src={dealOfTheDay.images[0]} 
                                alt={dealOfTheDay.name}
                                fill
                                className="object-cover"
                                data-ai-hint="fashion product lifestyle"
                            />
                        </div>
                        <div className="flex flex-col justify-center p-8 lg:p-12">
                            <h3 className="text-sm uppercase tracking-widest text-primary font-semibold">Oferta del Día</h3>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl font-headline">{dealOfTheDay.name}</h2>
                            <p className="mt-4 text-muted-foreground">{dealOfTheDay.description}</p>
                            <div className="mt-4 flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-foreground">${dealOfTheDay.price.toFixed(2)}</span>
                                {dealOfTheDay.originalPrice && (
                                    <span className="text-xl text-muted-foreground line-through">${dealOfTheDay.originalPrice?.toFixed(2)}</span>
                                )}
                            </div>
                            <CountdownTimer targetDate={offerEndDate} />
                            <Button asChild size="lg" className="mt-6 w-full sm:w-auto">
                                <Link href={`/products/${dealOfTheDay.id}`}>Comprar Ahora</Link>
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
        </section>
      )}

      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Productos Destacados</h2>
            <p className="mt-2 text-lg text-muted-foreground">
                Seleccionados por nosotros, solo para ti.
            </p>
        </div>
        <div className="w-full">
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
              <CarouselContent className="-ml-1 pl-4 md:pl-6 lg:pl-8">
                {featuredProducts.map((product, index) => (
                  <CarouselItem key={product.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 xl:basis-1/5 pl-4">
                    <div className="p-1">
                        <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
          </Suspense>
        </div>
      </section>


      <section className="py-16 sm:py-20 lg:py-24 bg-secondary/50">
        <div className="container">
            <Tabs defaultValue="new-arrivals" className="w-full">
            <div className="mb-12 flex flex-col items-center justify-center text-center">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">Nuestras Colecciones</h2>
                <p className="mt-2 text-lg text-muted-foreground">
                    Descubre lo nuevo y lo que está en tendencia.
                </p>
                <TabsList className="mt-6 grid w-full max-w-md grid-cols-2">
                    <TabsTrigger value="new-arrivals">Novedades</TabsTrigger>
                    <TabsTrigger value="summer-collection">Colección de Verano</TabsTrigger>
                </TabsList>
            </div>
            
            <TabsContent value="new-arrivals">
              <Suspense fallback={<ProductGridSkeleton />}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {newArrivals.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
                </div>
              </Suspense>
            </TabsContent>
            <TabsContent value="summer-collection">
              <Suspense fallback={<ProductGridSkeleton />}>
                <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
