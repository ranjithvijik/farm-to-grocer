"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function BlogPage() {
    const posts = [
        {
            title: "5 Crops with the Highest Demand in Urban Markets",
            excerpt: "Discover what city grocers are paying premium prices for this summer, and how to optimize your planting schedule.",
            category: "For Farmers",
            date: "Nov 12, 2025",
            img: "https://images.unsplash.com/photo-1592982537447-6f2334965251?auto=format&fit=crop&q=80"
        },
        {
            title: "The Ultimate Guide to Storing Root Vegetables",
            excerpt: "Extend the shelf life of carrots, potatoes, and beets with these simple temperature and humidity strategies.",
            category: "For Grocers",
            date: "Oct 28, 2025",
            img: "https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80"
        },
        {
            title: "Platform Update: Streamlined Delivery Scheduling",
            excerpt: "We've revamped the logistics tab. Buyers and sellers can now coordinate third-party delivery directly in the app.",
            category: "Product News",
            date: "Sep 05, 2025",
            img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80"
        },
        {
            title: "Interview: How Green Valley Farm Doubled Their Retail Orders",
            excerpt: "A look into how one mid-sized sustainable farm used our marketplace to ditch wholesale and go direct to grocer.",
            category: "Case Study",
            date: "Aug 19, 2025",
            img: "https://images.unsplash.com/photo-1530836369250-ef71a3f5e4bc?auto=format&fit=crop&q=80"
        },
        {
            title: "Understanding Regenerative Agriculture Certifications",
            excerpt: "Confused by the new labels? Here's what they mean and why consumers are willing to pay more for them.",
            category: "Industry Insights",
            date: "Jul 01, 2025",
            img: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80"
        },
        {
            title: "Maximizing Your Farm Profile for Better Visibility",
            excerpt: "Simple tips to make your listings stand out to local retailers when they're sourcing ingredients.",
            category: "For Farmers",
            date: "Jun 14, 2025",
            img: "https://images.unsplash.com/photo-1595856453085-f53835061690?auto=format&fit=crop&q=80"
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
                                <Image src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80" alt="Featured post" fill className="object-cover" />
                            </div>
                            <div className="space-y-6">
                                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-semibold rounded-full">
                                    Featured Report
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold">State of Local Food Sourcing 2026</h2>
                                <p className="text-lg text-muted-foreground">
                                    Our annual report breaks down buying trends among independent grocers, the highest yielding crops for local farmers, and the logistical challenges we solved this year.
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
                                        <Image src={post.img} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
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
