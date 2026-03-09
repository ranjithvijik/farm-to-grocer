"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Leaf,
    Store,
    CheckCircle,
    ArrowRight,
    Package,
    ShoppingCart,
    Truck,
    CreditCard,
    Users,
    LineChart
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";

export default function HowItWorksPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="bg-farm-50 dark:bg-farm-950/20 py-16 md:py-24">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            How Farm to Grocer Works
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            We've simplified the supply chain to bring fresh, local produce directly
                            from farms to stores and restaurants.
                        </p>
                    </div>
                </section>

                {/* For Grocers Section */}
                <section className="py-20 md:py-32">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                            <div className="flex-1 space-y-8">
                                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                                    <Store className="h-4 w-4" />
                                    <span>For Grocers & Restaurants</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                    Source Fresher Produce, <br />
                                    <span className="text-primary">At Better Prices</span>
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: Users,
                                            title: "1. Browse Local Farmers",
                                            description: "Explore a marketplace of verified local farmers in your area. See their ratings, certifications, and current harvest."
                                        },
                                        {
                                            icon: ShoppingCart,
                                            title: "2. Place Your Order",
                                            description: "Shop directly from multiple farms in one place. Scale your orders to meet your business needs."
                                        },
                                        {
                                            icon: Truck,
                                            title: "3. Direct Delivery",
                                            description: "Receive produce harvested at peak freshness, delivered within 24-48 hours directly to your door."
                                        }
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <step.icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{step.title}</h3>
                                                <p className="text-muted-foreground">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button size="lg" asChild className="rounded-full px-8">
                                    <Link href="/register?role=grocer">
                                        Get Started as a Grocer
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                            <div className="flex-1">
                                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/images/grocer-buying.png"
                                        alt="Grocer browsing fresh produce"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* For Farmers Section */}
                <section className="py-20 md:py-32 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-20">
                            <div className="flex-1 space-y-8">
                                <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary-foreground">
                                    <Leaf className="h-4 w-4" />
                                    <span>For Local Farmers</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                                    Sell Directly to Local <br />
                                    <span className="text-secondary-foreground font-semibold">Businesses</span>
                                </h2>
                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: Package,
                                            title: "1. List Your Harvest",
                                            description: "Easily upload your current products, set quantities, and manage your inventory in real-time."
                                        },
                                        {
                                            icon: LineChart,
                                            title: "2. Manage Orders",
                                            description: "Receive orders from local grocers and restaurants. Track your sales and view growth analytics."
                                        },
                                        {
                                            icon: CreditCard,
                                            title: "3. Fast Payments",
                                            description: "Get paid automatically and securely for your deliveries. No more chasing invoices."
                                        }
                                    ].map((step, i) => (
                                        <div key={i} className="flex gap-4">
                                            <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                                                <step.icon className="h-5 w-5 text-secondary-foreground font-semibold" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{step.title}</h3>
                                                <p className="text-muted-foreground">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button size="lg" variant="outline" asChild className="rounded-full px-8">
                                    <Link href="/register?role=farmer">
                                        Start Selling Today
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </div>
                            <div className="flex-1">
                                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                    <img
                                        src="/images/farmer-harvest.png"
                                        alt="Farmer preparing a delivery"
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why the Direct Model? Section */}
                <section className="py-20 md:py-32">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">
                                Why Support the Direct Model?
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                By cutting out the traditional distribution middleman, we create a system
                                that's better for everyone.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Fairer for Farmers",
                                    description: "Farmers keep more of every dollar spent, allowing them to reinvest in sustainable practices."
                                },
                                {
                                    title: "Better for Grocers",
                                    description: "Lower costs and access to unique, local varieties that standard distributors don't carry."
                                },
                                {
                                    title: "Framer for Consumers",
                                    description: "End consumers get produce with higher nutritional value and a longer shelf life."
                                }
                            ].map((benefit, i) => (
                                <Card key={i} className="border-none bg-farm-50/50 dark:bg-farm-950/10 p-4">
                                    <CardContent className="pt-6">
                                        <CheckCircle className="h-8 w-8 text-green-500 mb-4" />
                                        <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                                        <p className="text-muted-foreground">{benefit.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
