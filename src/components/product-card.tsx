
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
      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <Link href={`/products/${product.id}`}>
            <CardTitle className="mb-1 text-base font-semibold leading-tight hover:text-primary">
              {product.name}
            </CardTitle>
          </Link>
          <div className="flex items-center">
              <StarRating rating={product.rating} size={14} />
              <span className="ml-2 text-xs text-muted-foreground">({product.reviewsCount})</span>
          </div>
        </div>
        <CardFooter className="flex items-center justify-between p-0 pt-4">
            <div className="flex flex-col items-start">
                {product.originalPrice && <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>}
                <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
            </div>
            <Button size="icon" variant="outline" onClick={handleAddToCart} aria-label="Add to cart" className="h-9 w-9">
              <ShoppingCart className="h-4 w-4" />
            </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
