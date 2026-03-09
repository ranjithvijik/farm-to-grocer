"use client";

import * as React from "react";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFilter } from "@/components/ProductFilter";
import { ProductCategory } from "@/types";
import { Search, ShoppingBag } from "lucide-react";
import { DashboardShell } from "@/app/(dashboard)/dashboard-shell";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function GrocerBrowsePage() {
    const [filters, setFilters] = React.useState<{
        search?: string;
        category?: ProductCategory;
        minPrice?: number;
        maxPrice?: number;
    }>({});

    return (
        <div className="flex-1 space-y-6 p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Browse Products
                    </h1>
                    <p className="text-muted-foreground">
                        Find and order fresh produce from local farmers.
                    </p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/grocer/orders">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        My Orders
                    </Link>
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Filters */}
                <aside className="lg:col-span-1">
                    <ProductFilter onFilterChange={setFilters} />
                </aside>

                {/* Product Grid */}
                <div className="lg:col-span-3">
                    <ProductGrid filters={filters} />
                </div>
            </div>
        </div>
    );
}
