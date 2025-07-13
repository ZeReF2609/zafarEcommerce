
"use client";

import { useState, useEffect } from 'react';
import { products } from '@/lib/placeholder-data';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Filter } from 'lucide-react';
import { useDebounce } from '@/hooks/use-debounce';

const allCollections = Array.from(new Set(products.map(p => p.collection)));
const allTags = Array.from(new Set(products.flatMap(p => p.tags)));
const maxPrice = Math.ceil(Math.max(...products.map(p => p.price)) / 10) * 10;

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const debouncedPriceRange = useDebounce(priceRange, 500);

  useEffect(() => {
    let tempProducts = [...products];

    // Filter by collection
    if (selectedCollections.length > 0) {
      tempProducts = tempProducts.filter(p => selectedCollections.includes(p.collection));
    }

    // Filter by tags
    if (selectedTags.length > 0) {
        tempProducts = tempProducts.filter(p => p.tags.some(tag => selectedTags.includes(tag)));
    }

    // Filter by price
    tempProducts = tempProducts.filter(p => p.price >= debouncedPriceRange[0] && p.price <= debouncedPriceRange[1]);

    // Sort
    tempProducts.sort((a, b) => {
      switch (sortOrder) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
            return b.rating - a.rating;
        default: // newest
          // Assuming the original `products` array is sorted by newest.
          // We can return 0 and rely on stable sort, or implement date-based sorting if available.
          return products.indexOf(a) - products.indexOf(b);
      }
    });

    setFilteredProducts(tempProducts);
  }, [selectedCollections, selectedTags, debouncedPriceRange, sortOrder]);
  
  const handleCollectionChange = (collection: string) => {
    setSelectedCollections(prev => 
        prev.includes(collection) 
        ? prev.filter(c => c !== collection) 
        : [...prev, collection]
    );
  };
  
  const handleTagChange = (tag: string) => {
    setSelectedTags(prev => 
        prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setSelectedCollections([]);
    setSelectedTags([]);
    setPriceRange([0, maxPrice]);
    setSortOrder('newest');
  }

  const FiltersSidebar = () => (
    <Card className="p-4 lg:p-6 sticky top-20">
        <div className='flex items-center justify-between mb-6'>
            <h3 className="text-lg font-semibold">Filtros</h3>
            <Button variant="ghost" size="sm" onClick={resetFilters}>Reiniciar</Button>
        </div>
        <div className="space-y-8">
             <div>
                <h4 className="font-semibold mb-3">Colección</h4>
                <div className="space-y-2">
                    {allCollections.map(c => (
                        <div key={c} className="flex items-center space-x-2">
                            <Checkbox id={`filter-${c}`} checked={selectedCollections.includes(c)} onCheckedChange={() => handleCollectionChange(c)}/>
                            <Label htmlFor={`filter-${c}`} className="capitalize text-sm font-normal">{c.replace('-', ' ')}</Label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-3">Etiquetas</h4>
                 <div className="space-y-2">
                    {allTags.map(t => (
                        <div key={t} className="flex items-center space-x-2">
                            <Checkbox id={`filter-${t}`} checked={selectedTags.includes(t)} onCheckedChange={() => handleTagChange(t)} />
                            <Label htmlFor={`filter-${t}`} className="capitalize text-sm font-normal">{t}</Label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-3">Rango de Precios</h4>
                <Slider
                    max={maxPrice}
                    step={5}
                    value={priceRange}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    minStepsBetweenThumbs={1}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
        </div>
    </Card>
  );

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Todos los Productos</h1>
        <p className="mt-2 text-lg text-muted-foreground">Encuentra tu próximo artículo favorito.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="hidden lg:block lg:col-span-1">
          <FiltersSidebar />
        </aside>

        <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
                <div className='lg:hidden'>
                     <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline">
                                <Filter className="h-4 w-4 mr-2" />
                                Filtros
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px]">
                           <FiltersSidebar />
                        </SheetContent>
                    </Sheet>
                </div>
                <p className="text-sm text-muted-foreground hidden sm:block">{filteredProducts.length} productos encontrados</p>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Más nuevos</SelectItem>
                        <SelectItem value="price-asc">Precio: Bajo a Alto</SelectItem>
                        <SelectItem value="price-desc">Precio: Alto a Bajo</SelectItem>
                        <SelectItem value="rating">Mejor Calificados</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
                    {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-secondary/50 rounded-lg">
                    <h2 className="text-2xl font-semibold">No se encontraron productos</h2>
                    <p className="text-muted-foreground mt-2">Intenta ajustar tus filtros o reiniciarlos.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
}
