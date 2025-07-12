
"use client"

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductById, reviews, products } from '@/lib/placeholder-data';
import { StarRating } from '@/components/star-rating';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCart } from '@/hooks/use-cart';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Minus, Plus } from 'lucide-react';
import { ProductCard } from '@/components/product-card';

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const relatedProducts = products.filter(p => p.collection === product.collection && p.id !== product.id).slice(0, 4);

  return (
    <div className="container py-8 md:py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
        <div className="w-full">
            <Carousel>
                <CarouselContent>
                    {product.images.map((src, index) => (
                        <CarouselItem key={index}>
                            <Card className="overflow-hidden">
                                <CardContent className="p-0">
                                <Image
                                    src={src}
                                    alt={`${product.name} image ${index + 1}`}
                                    width={600}
                                    height={600}
                                    className="aspect-square w-full object-cover"
                                    data-ai-hint="product lifestyle"
                                />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
            </Carousel>
        </div>

        <div>
          {product.originalPrice && <Badge>SALE</Badge>}
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl font-headline">{product.name}</h1>
          <div className="mt-3 flex items-center">
            <StarRating rating={product.rating} />
            <span className="ml-3 text-sm text-muted-foreground">{product.reviewsCount} reviews</span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            {product.originalPrice && <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>}
            <span className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
          </div>
          <p className="mt-4 text-base text-muted-foreground">{product.description}</p>
          
          <Separator className="my-6" />

          <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus className="h-4 w-4"/>
                </Button>
                <Input type="number" value={quantity} onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))} className="w-16 text-center" />
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                    <Plus className="h-4 w-4"/>
                </Button>
              </div>
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>Add to Cart</Button>
          </div>
          
          <Accordion type="single" collapsible className="mt-6 w-full" defaultValue="description">
            <AccordionItem value="description">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>{product.description}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="specifications">
              <AccordionTrigger>Specifications</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-5">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reviews">
              <AccordionTrigger>Reviews ({product.reviewsCount})</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={review.avatar} alt={review.author} data-ai-hint="person portrait"/>
                        <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{review.author}</p>
                          <StarRating rating={review.rating} size={14} />
                        </div>
                        <p className="text-sm text-muted-foreground">{review.date}</p>
                        <p className="mt-2 text-sm">{review.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

       {relatedProducts.length > 0 && (
        <section className="mt-16">
            <h2 className="text-3xl font-bold tracking-tight text-center font-headline mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
      )}
    </div>
  );
}
