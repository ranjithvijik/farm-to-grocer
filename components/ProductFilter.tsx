"use client";

import * as React from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProductCategory, ProductCategoryLabels } from "@/types";
import { cn } from "@/lib/utils";

interface ProductFilterProps {
    onFilterChange: (filters: {
        search?: string;
        category?: ProductCategory;
        minPrice?: number;
        maxPrice?: number;
    }) => void;
    className?: string;
}

export function ProductFilter({ onFilterChange, className }: ProductFilterProps) {
    const [search, setSearch] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState<ProductCategory | "ALL">("ALL");
    const [minPrice, setMinPrice] = React.useState<string>("");
    const [maxPrice, setMaxPrice] = React.useState<string>("");

    // Handle instant category changes
    React.useEffect(() => {
        onFilterChange({
            search: search || undefined,
            category: selectedCategory === "ALL" ? undefined : selectedCategory,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        });
    }, [selectedCategory]); // Only trigger when category changes directly

    const handleApplyFilters = React.useCallback(() => {
        onFilterChange({
            search: search || undefined,
            category: selectedCategory === "ALL" ? undefined : selectedCategory,
            minPrice: minPrice ? parseFloat(minPrice) : undefined,
            maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        });
    }, [onFilterChange, search, selectedCategory, minPrice, maxPrice]);

    const handleReset = () => {
        setSearch("");
        setSelectedCategory("ALL");
        setMinPrice("");
        setMaxPrice("");
        onFilterChange({});
    };

    return (
        <Card className={cn("sticky top-20 h-fit", className)}>
            <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        Filters
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 text-xs">
                        Reset
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                {/* Search */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold">Search</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search products..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9"
                            onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold">Categories</label>
                    <div className="grid grid-cols-1 gap-1">
                        <button
                            onClick={() => setSelectedCategory("ALL")}
                            className={cn(
                                "text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                                selectedCategory === "ALL"
                                    ? "bg-primary text-primary-foreground font-medium"
                                    : "hover:bg-accent text-muted-foreground"
                            )}
                        >
                            All Categories
                        </button>
                        {Object.entries(ProductCategoryLabels).map(([key, label]) => (
                            <button
                                key={key}
                                onClick={() => setSelectedCategory(key as ProductCategory)}
                                className={cn(
                                    "text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                                    selectedCategory === key
                                        ? "bg-primary text-primary-foreground font-medium"
                                        : "hover:bg-accent text-muted-foreground"
                                )}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold">Price Range</label>
                    <div className="flex items-center gap-2">
                        <Input
                            type="number"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            className="h-9"
                        />
                        <span className="text-muted-foreground">—</span>
                        <Input
                            type="number"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="h-9"
                        />
                    </div>
                </div>

                <Button className="w-full" onClick={handleApplyFilters}>
                    Apply Filters
                </Button>
            </CardContent>
        </Card>
    );
}
