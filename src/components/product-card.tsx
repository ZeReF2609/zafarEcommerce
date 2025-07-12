"use client"

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/star-rating';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
  };
  
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-xl">
      <CardHeader className="relative border-b p-0">
        <Link href={`/products/${product.id}`} className="block">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className="aspect-square w-full object-cover"
            data-ai-hint="product photo"
          />
        </Link>
        {product.originalPrice && (
          <Badge className="absolute left-3 top-3 bg-destructive text-destructive-foreground">
            SALE
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <Link href={`/products/${product.id}`}>
          <CardTitle className="mb-2 text-lg font-semibold leading-tight hover:text-primary">
            {product.name}
          </CardTitle>
        </Link>
        <div className="flex items-center">
            <StarRating rating={product.rating} />
            <span className="ml-2 text-sm text-muted-foreground">({product.reviewsCount})</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-baseline gap-2">
            {product.originalPrice && <span className="text-sm text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>}
            <span className="text-xl font-bold text-foreground">${product.price.toFixed(2)}</span>
        </div>
        <Button size="icon" variant="outline" onClick={handleAddToCart} aria-label="Add to cart">
          <ShoppingCart className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
