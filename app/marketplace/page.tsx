"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFilter } from "@/components/ProductFilter";
import { ProductCategory } from "@/types";
import { Leaf, Search } from "lucide-react";

export default function MarketplacePage() {
    const [filters, setFilters] = React.useState<{
        search?: string;
        category?: ProductCategory;
        minPrice?: number;
        maxPrice?: number;
    }>({});

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 bg-muted/30">
                {/* Hero Section */}
                <section className="bg-primary pt-16 pb-24 text-primary-foreground relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-white blur-3xl" />
                        <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-white blur-3xl" />
                    </div>

                    <div className="container relative mx-auto px-4 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium mb-6">
                            <Leaf className="h-4 w-4" />
                            <span>Direct Farm-to-Store Marketplace</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            Explore Fresh Local Produce
                        </h1>
                        <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
                            Connect directly with farmers in your area. Get the freshest quality,
                            best prices, and support your local community.
                        </p>
                    </div>
                </section>

                {/* Search & Content Section */}
                <section className="container mx-auto px-4 -mt-10 pb-20">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar Filters */}
                        <aside className="lg:col-span-1">
                            <ProductFilter onFilterChange={setFilters} />
                        </aside>

                        {/* Product Grid */}
                        <div className="lg:col-span-3">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold">Products</h2>
                                    <p className="text-sm text-muted-foreground">
                                        Showing all available fresh produce
                                    </p>
                                </div>
                            </div>

                            <ProductGrid filters={filters} />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
