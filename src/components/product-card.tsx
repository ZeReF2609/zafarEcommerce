
"use client"

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/star-rating';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };
  
  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-lg transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/products/${product.id}`} className="block h-full">
        <div className="flex h-full flex-col">
          <div className="relative border-b overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={400}
              height={400}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint="product photo"
            />
            {product.originalPrice && (
              <Badge className="absolute left-3 top-3">
                SALE
              </Badge>
            )}
          </div>
          <div className="flex flex-1 flex-col p-4">
            <div className="flex-1">
              <h3 className="mb-1 text-base font-semibold leading-tight group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center">
                  <StarRating rating={product.rating} size={14} />
                  <span className="ml-2 text-xs text-muted-foreground">({product.reviewsCount})</span>
              </div>
            </div>
            <div className="flex items-end justify-between pt-4">
                <div className="flex flex-col items-start">
                    {product.originalPrice && <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>}
                    <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
                </div>
                <Button size="icon" variant="outline" onClick={handleAddToCart} aria-label="Add to cart" className="h-9 w-9">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
