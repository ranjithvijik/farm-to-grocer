"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Heart,
    Target,
    ShieldCheck,
    Globe,
    Users,
    Clock,
    ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/about-hero.jpg"
                            alt="Local farm landscape"
                            className="w-full h-full object-cover brightness-50"
                        />
                    </div>
                    <div className="container relative z-10 mx-auto px-4 text-center text-white">
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                            Our Mission
                        </h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-200">
                            Transforming local food systems by connecting the people who grow
                            food with the people who feed their communities.
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-20 md:py-32">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold tracking-tight">How We Started</h2>
                                <div className="space-y-4 text-lg text-muted-foreground">
                                    <p>
                                        Farm to Grocer was born from a simple observation: it's often harder
                                        for a grocer to buy from a farm five miles away than from a
                                        distributor five hundred miles away.
                                    </p>
                                    <p>
                                        The traditional supply chain is fragmented, inefficient, and leaves
                                        too many small farms behind. We set out to build a platform that
                                        bridges this gap with technology, making local sourcing the
                                        standard, not the exception.
                                    </p>
                                    <p>
                                        Today, we support hundreds of farmers and businesses, fostering a
                                        more resilient, transparent, and sustainable food system for everyone.
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <img src="/images/about-1.jpg" alt="Local marketplace" className="rounded-2xl shadow-lg w-full h-48 object-cover translate-y-8" />
                                    <img src="/images/about-2.jpg" alt="Fresh harvest" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                                </div>
                                <div className="space-y-4">
                                    <img src="/images/about-3.jpg" alt="Farmer hands" className="rounded-2xl shadow-lg w-full h-64 object-cover" />
                                    <img src="/images/about-4.jpg" alt="Grocer store" className="rounded-2xl shadow-lg w-full h-48 object-cover -translate-y-8" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 md:py-32 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-3xl font-bold tracking-tight mb-4">Our Core Values</h2>
                            <p className="text-lg text-muted-foreground">
                                Guided by principles that put the community and planet first.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Target,
                                    title: "Transparency",
                                    description: "Full visibility into where food comes from, how it's grown, and exactly where your money goes."
                                },
                                {
                                    icon: Heart,
                                    title: "Community First",
                                    description: "Prioritizing local economies and building relationships that strengthen our neighborhoods."
                                },
                                {
                                    icon: Globe,
                                    title: "Sustainability",
                                    description: "Reducing food miles and food waste while supporting regenerative agricultural practices."
                                }
                            ].map((value, i) => (
                                <Card key={i} className="text-center p-6 border-none shadow-xl hover:-translate-y-1 transition-transform">
                                    <CardContent className="pt-6">
                                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                                            <value.icon className="h-8 w-8 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                                        <p className="text-muted-foreground leading-relaxed">
                                            {value.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Join Us CTA */}
                <section className="py-20 md:py-32">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-4xl font-bold tracking-tight mb-8">
                            Be Part of the Solution
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="xl" asChild>
                                <Link href="/register?role=grocer">
                                    Join as a Grocer
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button size="xl" variant="outline" asChild>
                                <Link href="/register?role=farmer">
                                    Join as a Farmer
                                </Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
