"use client";

import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
    const posts = [
        {
            title: "From Farm to Grocer: How Technology is Enabling Hyper-Local Sourcing",
            excerpt: "We explore the rise of inventory-tracking software and B2B platforms that bridge the gap between regional farmers and local supermarkets.",
            category: "Tech & Innovation",
            date: "Mar 05, 2026",
            img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
        },
        {
            title: "The Rise of Regenerative Agriculture: Why Consumers Pay a Premium",
            excerpt: "Sustainability is no longer a buzzword for 2026. Shoppers actively seek grocers offering products from carbon-neutral, regenerative farms.",
            category: "Industry Insights",
            date: "Feb 22, 2026",
            img: "https://images.unsplash.com/photo-1628102491629-778571d893a3?auto=format&fit=crop&q=80"
        },
        {
            title: "Overcoming Logistics: New Solutions for Regional Food Distribution",
            excerpt: "A deep dive into how food hubs, shared transport models, and cold-chain innovations are keeping small farm produce fresh on grocer shelves.",
            category: "Logistics",
            date: "Feb 10, 2026",
            img: "https://images.unsplash.com/photo-1586528116311-ad8ed7c159bf?auto=format&fit=crop&q=80"
        },
        {
            title: "How Smart Labeling is Building Trust Between Consumers and Farms",
            excerpt: "QR codes on produce are giving shoppers unprecedented insight into harvest dates, travel miles, and farm practices.",
            category: "Consumer Trends",
            date: "Jan 28, 2026",
            img: "https://images.unsplash.com/photo-1620857502441-2b04791a81dc?auto=format&fit=crop&q=80"
        },
        {
            title: "The Economic Impact of Keeping Food Spending within the Community",
            excerpt: "A recent study shows that every dollar spent on local produce through independent grocers returns significantly more to the local economy than national chains.",
            category: "Market Study",
            date: "Jan 12, 2026",
            img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80"
        },
        {
            title: "Supermarkets vs. Farmers Markets: The Shifting Landscape of Local Foods",
            excerpt: "With regional chains scaling up their local sourcing programs, the definition of \"local\" continues to evolve in the modern retail environment.",
            category: "Retail Trends",
            date: "Dec 30, 2025",
            img: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80"
        }
    ];

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-background">
                {/* Header */}
                <section className="bg-primary text-primary-foreground py-20">
                    <div className="container mx-auto px-4 text-center max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            The Harvest Herald
                        </h1>
                        <p className="text-xl text-primary-foreground/80 mb-8">
                            Insights, stories, and updates from the team at Farm to Grocer and our community of agricultural innovators.
                        </p>
                    </div>
                </section>

                {/* Latest Post */}
                <section className="py-16 bg-muted/20 border-b">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden shadow-md">
                                <img src="https://images.unsplash.com/photo-1595853035070-59a39dfc7365?auto=format&fit=crop&q=80" alt="Featured post" className="object-cover w-full h-full" />
                            </div>
                            <div className="space-y-6">
                                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                                    Featured Report
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold">State of Local Food Sourcing 2026</h2>
                                <p className="text-lg text-muted-foreground">
                                    Our annual report details how the "farm-to-grocer" supply chain evolved this year. From transparent QR supply tracking to grocers scaling up climate-friendly sustainable produce.
                                </p>
                                <Button size="lg" className="w-full sm:w-auto" asChild>
                                    <Link href="#">Read the Report <ArrowRight className="ml-2 h-4 w-4" /></Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Grid */}
                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <h2 className="text-3xl font-bold mb-10 tracking-tight">Recent Articles</h2>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post, i) => (
                                <Link href="#" key={i} className="group flex flex-col items-start space-y-4">
                                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-sm border">
                                        <img src={post.img} alt={post.title} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
                                    </div>
                                    <div className="flex w-full items-center justify-between text-sm">
                                        <span className="font-semibold text-primary">{post.category}</span>
                                        <span className="text-muted-foreground">{post.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold group-hover:underline decoration-primary underline-offset-4">{post.title}</h3>
                                    <p className="text-muted-foreground flex-1">{post.excerpt}</p>
                                </Link>
                            ))}
                        </div>
                        <div className="mt-16 text-center">
                            <Button variant="outline" size="lg">Load More Articles</Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
