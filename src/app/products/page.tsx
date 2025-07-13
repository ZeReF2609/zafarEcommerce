
"use client";

import { useState } from 'react';
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

const allCollections = Array.from(new Set(products.map(p => p.collection)));
const allTags = Array.from(new Set(products.flatMap(p => p.tags)));
const maxPrice = Math.max(...products.map(p => p.price));

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, maxPrice]);

  const applyFiltersAndSorting = () => {
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
    tempProducts = tempProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

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
          return 0; // Placeholder, assuming default order is fine
      }
    });

    setFilteredProducts(tempProducts);
  };
  
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
    setFilteredProducts(products);
  }

  const FiltersSidebar = () => (
    <Card className="p-4">
        <h3 className="text-lg font-semibold mb-4">Filtros</h3>
        <div className="space-y-6">
             <div>
                <h4 className="font-semibold mb-2">Colección</h4>
                <div className="space-y-2">
                    {allCollections.map(c => (
                        <div key={c} className="flex items-center space-x-2">
                            <Checkbox id={c} checked={selectedCollections.includes(c)} onCheckedChange={() => handleCollectionChange(c)}/>
                            <Label htmlFor={c} className="capitalize">{c.replace('-', ' ')}</Label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Etiquetas</h4>
                 <div className="space-y-2">
                    {allTags.map(t => (
                        <div key={t} className="flex items-center space-x-2">
                            <Checkbox id={t} checked={selectedTags.includes(t)} onCheckedChange={() => handleTagChange(t)} />
                            <Label htmlFor={t} className="capitalize">{t}</Label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <h4 className="font-semibold mb-2">Rango de Precios</h4>
                <Slider
                    defaultValue={[maxPrice]}
                    max={maxPrice}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>
        </div>
        <div className="mt-8 flex flex-col gap-2">
            <Button onClick={applyFiltersAndSorting}>Aplicar Filtros</Button>
            <Button variant="ghost" onClick={resetFilters}>Reiniciar</Button>
        </div>
    </Card>
  );

  return (
    <div className="container py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">Todos los Productos</h1>
        <p className="mt-2 text-lg text-muted-foreground">Encuentra tu próximo artículo favorito.</p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <aside className="hidden md:block md:col-span-1">
          <FiltersSidebar />
        </aside>

        <main className="md:col-span-3">
            <div className="flex justify-between items-center mb-6">
                <div className='md:hidden'>
                     <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Filter className="h-4 w-4" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left">
                           <FiltersSidebar />
                        </SheetContent>
                    </Sheet>
                </div>
                <p className="text-sm text-muted-foreground">{filteredProducts.length} productos encontrados</p>
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
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <h2 className="text-2xl font-semibold">No se encontraron productos</h2>
                    <p className="text-muted-foreground mt-2">Intenta ajustar tus filtros.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
}
