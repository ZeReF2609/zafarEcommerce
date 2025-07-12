
import { products } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export async function generateStaticParams() {
    const collections = Array.from(new Set(products.map(p => p.collection)));
    return collections.map(collection => ({
        slug: collection
    }));
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const collectionProducts = products.filter(p => p.collection === slug);

  if (collectionProducts.length === 0) {
    notFound();
  }

  const collectionName = slug.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8">
        <Button asChild variant="outline">
          <Link href="/products"> &larr; Back to All Products</Link>
        </Button>
      </div>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight font-headline">{collectionName}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Discover the latest trends in our {collectionName}.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {collectionProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
