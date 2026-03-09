"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Leaf, Clock, MapPin, BarChart3, ArrowRight } from "lucide-react";

export default function ForGrocersPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-background">
                {/* Hero Section */}
                <section className="relative bg-muted/30 py-20 lg:py-32 overflow-hidden">
                    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center flex-row-reverse">
                        <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl z-10 lg:order-last">
                            <Image
                                src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80"
                                alt="Fresh produce in a grocery store"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                        <div className="space-y-6 z-10 relative lg:order-first">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border-primary/20">
                                Freshness Delivered
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                                Source local produce, <span className="text-primary">delight your customers.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                                Access the freshest seasonal ingredients directly from farms in your region. Stand out from big box retailers by offering true farm-to-table quality on your shelves.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button size="lg" asChild className="gap-2">
                                    <Link href="/register?type=grocer">
                                        Start Sourcing Today <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/marketplace">Browse Marketplace</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-24 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why source from our platform?</h2>
                            <p className="text-lg text-muted-foreground">
                                Traditional distributors provide consistency, but lack transparency and peak freshness. Our marketplace gives you direct access to the source.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: Clock,
                                    title: "Unmatched Freshness",
                                    desc: "Produce spends less time sitting in distribution warehouses, resulting in longer shelf life and better taste for your customers."
                                },
                                {
                                    icon: MapPin,
                                    title: "Hyper-Local Marketing",
                                    desc: "Tell the story behind your food. Consumers increasingly demand to know where their food comes from and love supporting local."
                                },
                                {
                                    icon: BarChart3,
                                    title: "Transparent Pricing",
                                    desc: "See exactly what the farmer is charging without hidden distributor markups. Fair prices for them, better margins for you."
                                },
                                {
                                    icon: Leaf,
                                    title: "Discover Unique Items",
                                    desc: "Find heirloom varieties and specialized seasonal crops that massive logistical distributors won't carry."
                                }
                            ].map((feature, i) => (
                                <div key={i} className="bg-muted/40 rounded-xl p-6 border border-border/50 hover:border-primary/30 transition-colors">
                                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 text-primary">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonial/Info Section */}
                <section className="py-24 bg-muted/50 border-y">
                    <div className="container mx-auto px-4 text-center max-w-4xl">
                        <h2 className="text-3xl font-bold mb-8">"Since we started sourcing from Farm to Grocer, our produce department sales have increased by 25%. Our customers can taste the difference."</h2>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-12 w-12 rounded-full overflow-hidden relative">
                                <Image src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80" alt="Sarah J., Store Manager" fill className="object-cover" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold">Sarah Jenkins</p>
                                <p className="text-sm text-muted-foreground">Manager, Community Market</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
