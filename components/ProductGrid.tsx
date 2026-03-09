"use client";

import * as React from "react";
import { ProductCard, type ProductCardProduct } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { ProductCategory, ApiResponse, PaginatedResponse } from "@/types";
import { AlertCircle, RefreshCw, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProductGridProps {
    filters?: {
        search?: string;
        category?: ProductCategory;
        minPrice?: number;
        maxPrice?: number;
    };
}

export function ProductGrid({ filters }: ProductGridProps) {
    const [products, setProducts] = React.useState<ProductCardProduct[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);
    const [page, setPage] = React.useState(1);
    const [totalPages, setTotalPages] = React.useState(1);

    const fetchProducts = React.useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: "12",
                ...(filters?.search && { search: filters.search }),
                ...(filters?.category && { category: filters.category }),
                ...(filters?.minPrice && { minPrice: filters.minPrice.toString() }),
                ...(filters?.maxPrice && { maxPrice: filters.maxPrice.toString() }),
            });

            const response = await fetch(`/api/products?${params.toString()}`);
            if (!response.ok) throw new Error("Failed to fetch products");

            const result: PaginatedResponse<ProductCardProduct> = await response.json();
            setProducts(result.data);
            setTotalPages(result.meta.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }, [page, filters]);

    React.useEffect(() => {
        setPage(1); // Reset to first page on filter change
    }, [filters]);

    React.useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                <h3 className="text-lg font-bold">Failed to load products</h3>
                <p className="text-muted-foreground mt-1">{error}</p>
                <Button variant="outline" className="mt-4" onClick={() => fetchProducts()}>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Try Again
                </Button>
            </div>
        );
    }

    if (isLoading && products.length === 0) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="aspect-square w-full rounded-xl" />
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <h3 className="text-lg font-bold">No products found</h3>
                <p className="text-muted-foreground mt-1">
                    Try adjusting your filters to find what you're looking for.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => setPage(1)}>
                    Clear Filters
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4">
                    <Button
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Previous
                    </Button>
                    <span className="text-sm font-medium">
                        Page {page} of {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p - 1)}
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    );
}
