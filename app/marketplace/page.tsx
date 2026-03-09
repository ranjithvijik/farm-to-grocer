"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductFilter } from "@/components/ProductFilter";
import { ProductCategory } from "@/types";
import { Leaf, ChevronRight, Home, LayoutGrid } from "lucide-react";

// Design tokens for consistency with landing page
const C_DARK = "hsl(30,15%,10%)";
const C_MED = "hsl(30,10%,38%)";
const C_G_LIGHT = "hsl(142,20%,94%)";

export default function MarketplacePage() {
    const [filters, setFilters] = React.useState<{
        search?: string;
        category?: ProductCategory;
        minPrice?: number;
        maxPrice?: number;
    }>({});

    return (
        <div className="flex min-h-screen flex-col font-body" style={{ background: "white" }}>
            <Navbar />

            {/* Premium Ambient Background (Fixed Layer) */}
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-50/40 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-orange-50/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
            </div>

            <main className="flex-1 relative z-10">
                {/* ══════════════════════════════════════════════════
                    MARKETPLACE HERO
                ══════════════════════════════════════════════════ */}
                <section className="relative pt-24 pb-16 overflow-hidden border-b" style={{ borderColor: C_G_LIGHT }}>
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1600&q=80"
                            alt="Fresh market produce background"
                            fill
                            className="object-cover opacity-10 scale-105"
                            priority
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />
                    </div>

                    <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Breadcrumbs */}
                        <nav className="flex items-center gap-2 mb-8 animate-fade-in-up">
                            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1" style={{ color: C_MED }}>
                                <Home className="h-3.5 w-3.5" /> Home
                            </Link>
                            <ChevronRight className="h-3.5 w-3.5 opacity-30" />
                            <span className="text-sm font-bold" style={{ color: C_DARK }}>Marketplace</span>
                        </nav>

                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-4 animate-fade-in-up"
                                style={{ background: "rgba(255,255,255,0.7)", borderColor: "hsl(142,30%,85%)", backdropFilter: "blur(8px)" }}>
                                <Leaf className="h-4 w-4 text-emerald-600" />
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Direct From Source</span>
                            </div>

                            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 tracking-tight animate-fade-in-up" style={{ color: C_DARK }}>
                                Explore <span className="text-emerald-700 italic">Fresh</span> <br />Local Produce
                            </h1>

                            <p className="text-xl font-medium max-w-2xl leading-relaxed animate-fade-in-up animation-delay-100" style={{ color: C_MED }}>
                                Connect directly with farmers in your region. Secure the highest quality inventory
                                with transparent pricing and real-time delivery tracking.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════════════════
                    MAIN CONTENT AREA
                ══════════════════════════════════════════════════ */}
                <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-72 flex-shrink-0 animate-fade-in-up">
                            <div className="sticky top-28">
                                <ProductFilter onFilterChange={setFilters} />
                            </div>
                        </aside>

                        {/* Product Grid Area */}
                        <div className="flex-1 animate-fade-in-up animation-delay-200">
                            <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b pb-6" style={{ borderColor: C_G_LIGHT }}>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <LayoutGrid className="h-4 w-4 text-emerald-600" />
                                        <h2 className="text-2xl font-bold font-display" style={{ color: C_DARK }}>Products</h2>
                                    </div>
                                    <p className="text-sm font-medium" style={{ color: C_MED }}>
                                        Browse seasonal offerings from verified local farms
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Sort by</span>
                                    {/* Sort selection could go here in future */}
                                    <div className="h-9 px-4 rounded-lg bg-white border flex items-center justify-between min-w-[160px] text-sm font-medium shadow-sm transition-all hover:bg-gray-50 cursor-pointer" style={{ borderColor: C_G_LIGHT }}>
                                        Latest Arrivals
                                        <ChevronRight className="h-4 w-4 rotate-90 opacity-40 ml-2" />
                                    </div>
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
