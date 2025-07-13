
import { products } from "@/lib/placeholder-data";
import { ProductCard } from "@/components/product-card";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
    const favoriteProducts = products.slice(0, 3); // Placeholder for actual favorited products

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Tus Favoritos</h2>
            {favoriteProducts.length > 0 ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">Aún no tienes favoritos</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                        No has añadido ningún producto a tus favoritos.
                    </p>
                </div>
            )}
        </div>
    )
}
