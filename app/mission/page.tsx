"use client";

import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Heart, Globe, Users, Shield } from "lucide-react";

export default function MissionPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-background">
                {/* Hero Section */}
                <section className="relative bg-primary text-primary-foreground py-20 lg:py-32 overflow-hidden text-center">
                    <div className="container mx-auto px-4 relative z-10 max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Fixing the food supply chain.
                        </h1>
                        <p className="text-xl text-primary-foreground/80">
                            Our mission is to build a more transparent, equitable, and sustainable local food system by directly connecting the people who grow our food with the businesses that sell it.
                        </p>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-20">
                        <Image
                            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80"
                            alt="Harvest"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-primary/80 mix-blend-multiply" />
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-24 bg-background">
                    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold">The Problem We Saw</h2>
                            <p className="text-lg text-muted-foreground">
                                For decades, the agricultural supply chain has favored massive industrial consolidation. Small and mid-sized farmers work tirelessly, yet often see only cents on the dollar for their produce because of complex webs of brokers, distributors, and wholesalers.
                            </p>
                            <p className="text-lg text-muted-foreground">
                                Meanwhile, local grocers and restaurants struggle to source truly fresh, local ingredients consistently without driving to six different farms every morning.
                            </p>
                            <p className="text-lg text-muted-foreground font-semibold text-foreground">
                                We realized technology could bridge this gap.
                            </p>
                        </div>
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                            <Image
                                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&q=80"
                                alt="Farm land"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-24 bg-muted/30">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
                            <p className="text-lg text-muted-foreground">
                                These principles guide everything we build and every decision we make.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    icon: Heart,
                                    title: "Farmer First",
                                    desc: "We believe the people growing our food deserve a fair wage. We prioritize features that maximize farmer margins and protect their livelihoods."
                                },
                                {
                                    icon: Globe,
                                    title: "Sustainability",
                                    desc: "Local food means fewer food miles, less spoilage, and fresher ingredients. We're actively reducing the carbon footprint of the food supply chain."
                                },
                                {
                                    icon: Shield,
                                    title: "Radical Transparency",
                                    desc: "No hidden fees or obscure markups. Buyers know exactly who grew their food and exactly how much the farmer is getting paid."
                                },
                                {
                                    icon: Users,
                                    title: "Community Resilience",
                                    desc: "A localized food system is a resilient one. We aim to strengthen local economies by keeping food dollars within the community."
                                }
                            ].map((value, i) => (
                                <div key={i} className="flex gap-6 bg-background rounded-xl p-8 shadow-sm border">
                                    <div className="h-12 w-12 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <value.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                        <p className="text-muted-foreground">{value.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
