"use client";

import * as React from "react";
import { ProductCard, type ProductCardProduct } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { ProductCategory } from "@/types";
import { AlertCircle, RefreshCw, ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const C_DARK = "hsl(30,15%,10%)";
const C_MED = "hsl(30,10%,38%)";
const C_G_LIGHT = "hsl(142,20%,94%)";

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
                ...(filters?.search && { query: filters.search }),
                ...(filters?.category && { category: filters.category }),
                ...(filters?.minPrice && { minPrice: filters.minPrice.toString() }),
                ...(filters?.maxPrice && { maxPrice: filters.maxPrice.toString() }),
            });

            const response = await fetch(`/api/products?${params.toString()}`);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error?.message || "Failed to fetch products");
            }

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
            <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold font-display mb-2" style={{ color: C_DARK }}>Unable to load products</h3>
                <p className="text-sm font-medium max-w-sm mb-8" style={{ color: C_MED }}>
                    {error}. This might be a temporary connection issue.
                </p>
                <Button
                    variant="outline"
                    className="rounded-full px-8 border-gray-200 hover:bg-gray-50 font-bold text-xs uppercase tracking-widest"
                    onClick={() => fetchProducts()}
                >
                    <RefreshCw className="h-3.5 w-3.5 mr-2" />
                    Try Again
                </Button>
            </div>
        );
    }

    if (isLoading && products.length === 0) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} className="space-y-4 animate-pulse">
                        <Skeleton className="aspect-square w-full rounded-2xl bg-gray-100" />
                        <div className="space-y-2 px-1">
                            <Skeleton className="h-4 w-1/3 bg-gray-100" />
                            <Skeleton className="h-6 w-3/4 bg-gray-100" />
                            <Skeleton className="h-4 w-1/2 bg-gray-100" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    if (!isLoading && products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 text-center animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
                    <ShoppingBag className="h-10 w-10 text-emerald-600/40" />
                </div>
                <h3 className="text-xl font-bold font-display mb-2" style={{ color: C_DARK }}>No products found</h3>
                <p className="text-sm font-medium max-w-sm mb-8" style={{ color: C_MED }}>
                    We couldn't find any produce matching your current filters. Try
                    broadening your search to see more results.
                </p>
                <Button
                    variant="outline"
                    className="rounded-full px-8 border-emerald-200 hover:bg-emerald-50 text-emerald-700 font-bold text-xs uppercase tracking-widest"
                    onClick={() => setPage(1)}
                >
                    Clear All Filters
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                {products.map((product, index) => (
                    <div
                        key={product.id}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center pt-8 border-t" style={{ borderColor: C_G_LIGHT }}>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-gray-50 border border-gray-100">
                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={page === 1}
                            onClick={() => setPage((p) => p - 1)}
                            className="rounded-xl h-10 w-10 p-0 hover:bg-white hover:shadow-sm"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>

                        <div className="flex items-center gap-1 px-4">
                            {Array.from({ length: totalPages }).map((_, i) => {
                                const pNum = i + 1;
                                // Basic pagination logic to show current, first, last, and neighbors
                                if (
                                    pNum === 1 ||
                                    pNum === totalPages ||
                                    (pNum >= page - 1 && pNum <= page + 1)
                                ) {
                                    return (
                                        <button
                                            key={pNum}
                                            onClick={() => setPage(pNum)}
                                            className={cn(
                                                "h-10 min-w-[2.5rem] px-2 rounded-xl text-sm font-bold transition-all",
                                                page === pNum
                                                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-200"
                                                    : "hover:bg-white hover:shadow-sm text-gray-500"
                                            )}
                                        >
                                            {pNum}
                                        </button>
                                    );
                                }
                                if (pNum === 2 && page > 3) return <span key="dots-1" className="px-1 opacity-30">...</span>;
                                if (pNum === totalPages - 1 && page < totalPages - 2) return <span key="dots-2" className="px-1 opacity-30">...</span>;
                                return null;
                            })}
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => p + 1)}
                            className="rounded-xl h-10 w-10 p-0 hover:bg-white hover:shadow-sm"
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
