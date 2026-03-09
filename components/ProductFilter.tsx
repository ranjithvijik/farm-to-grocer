"use client";

import * as React from "react";
import { Search, Filter, Tag, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import { Separator } from "@/components/ui/Separator";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/Accordion";
import { ProductCategory, ProductCategoryLabels } from "@/types";
import { cn } from "@/lib/utils";

const C_DARK = "hsl(30,15%,10%)";
const C_MED = "hsl(30,10%,38%)";
const C_G_LIGHT = "hsl(142,20%,94%)";

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
        <Card className={cn("border bg-white shadow-sm overflow-hidden", className)} style={{ borderColor: C_G_LIGHT }}>
            <CardHeader className="pb-4 pt-5 px-6" style={{ background: "rgba(244, 245, 237, 0.4)" }}>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: C_DARK }}>
                        <Filter className="h-4 w-4 text-emerald-600" />
                        Refine Search
                    </CardTitle>
                    <button
                        onClick={handleReset}
                        className="text-[10px] font-bold uppercase tracking-widest hover:text-emerald-700 transition-colors"
                        style={{ color: C_MED }}
                    >
                        Reset
                    </button>
                </div>
            </CardHeader>

            <Separator style={{ backgroundColor: C_G_LIGHT }} />

            <CardContent className="p-0">
                <Accordion type="multiple" defaultValue={["search", "categories", "price"]} className="w-full">
                    {/* Search Field */}
                    <AccordionItem value="search" className="border-b-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50/50 transition-colors">
                            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <Search className="h-3.5 w-3.5 opacity-40" />
                                Search Keywords
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-1">
                            <div className="relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground group-focus-within:text-emerald-600 transition-colors" />
                                <Input
                                    placeholder="Strawberries, Kale, Honey..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-9 h-10 bg-gray-50/50 border-gray-200 focus:bg-white transition-all text-sm"
                                    onKeyDown={(e) => e.key === "Enter" && handleApplyFilters()}
                                />
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <Separator className="mx-6 w-auto" style={{ backgroundColor: C_G_LIGHT }} />

                    {/* Categories */}
                    <AccordionItem value="categories" className="border-b-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50/50 transition-colors">
                            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <Tag className="h-3.5 w-3.5 opacity-40" />
                                Categories
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-1">
                            <div className="flex flex-col gap-1">
                                <button
                                    onClick={() => setSelectedCategory("ALL")}
                                    className={cn(
                                        "text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                                        selectedCategory === "ALL"
                                            ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-200/50 translate-x-1"
                                            : "hover:bg-emerald-50 text-gray-600 hover:text-emerald-800"
                                    )}
                                >
                                    All Produce
                                </button>
                                {Object.entries(ProductCategoryLabels).map(([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() => setSelectedCategory(key as ProductCategory)}
                                        className={cn(
                                            "text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                                            selectedCategory === key
                                                ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-200/50 translate-x-1"
                                                : "hover:bg-emerald-50 text-gray-600 hover:text-emerald-800"
                                        )}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>
                        </AccordionContent>
                    </AccordionItem>

                    <Separator className="mx-6 w-auto" style={{ backgroundColor: C_G_LIGHT }} />

                    {/* Price Range */}
                    <AccordionItem value="price" className="border-b-0">
                        <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50/50 transition-colors">
                            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <CircleDollarSign className="h-3.5 w-3.5 opacity-40" />
                                Price Range
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 pt-1">
                            <div className="grid grid-cols-2 gap-3 items-center">
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Min ($)</Label>
                                    <Input
                                        type="number"
                                        placeholder="0"
                                        value={minPrice}
                                        onChange={(e) => setMinPrice(e.target.value)}
                                        className="h-9 bg-gray-50/50 border-gray-200"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-[10px] uppercase tracking-widest font-bold opacity-50">Max ($)</Label>
                                    <Input
                                        type="number"
                                        placeholder="500"
                                        value={maxPrice}
                                        onChange={(e) => setMaxPrice(e.target.value)}
                                        className="h-9 bg-gray-50/50 border-gray-200"
                                    />
                                </div>
                            </div>
                            <Button
                                className="w-full mt-6 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-lg shadow-emerald-100 transition-all hover:-translate-y-0.5"
                                onClick={handleApplyFilters}
                            >
                                Apply Filters
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </CardContent>
        </Card>
    );
}
