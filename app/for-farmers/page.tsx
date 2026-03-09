"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, TrendingUp, Truck, ShieldCheck, ArrowRight } from "lucide-react";

export default function ForFarmersPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-background">
                {/* Hero Section */}
                <section className="relative bg-muted/30 py-20 lg:py-32 overflow-hidden">
                    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6 z-10 relative">
                            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-primary/10 text-primary border-primary/20">
                                Empowering Local Agriculture
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                                Grow your business, <span className="text-primary">skip the middleman.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                                Farm to Grocer connects you directly with local retailers, restaurants, and grocery stores. Keep more of your profits while ensuring your harvest reaches the community fresher than ever.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <Button size="lg" asChild className="gap-2">
                                    <Link href="/register?type=farmer">
                                        Start Selling Today <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/contact">Talk to our team</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl z-10">
                            <Image
                                src="https://images.unsplash.com/photo-1592982537447-6f2334965251?auto=format&fit=crop&q=80"
                                alt="Farmer inspecting crops"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-10">
                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-[800px] h-[800px]">
                            <path fill="#22c55e" d="M45.7,-76.4C58.9,-69.3,69.2,-55.8,75.4,-41.1C81.6,-26.4,83.7,-10.5,82.4,5.1C81.1,20.6,76.5,35.8,68.2,48.2C59.9,60.6,47.9,70.2,34.2,76.5C20.5,82.8,5.1,85.8,-9.7,84C-24.5,82.2,-38.7,75.6,-50.2,65.8C-61.7,56,-70.5,43,-75.4,28.7C-80.3,14.4,-81.3,-1.2,-77.6,-15.8C-73.9,-30.4,-65.5,-44,-53.8,-52C-42.1,-60,-27,-62.4,-12.9,-65C1.2,-67.6,15.3,-70.4,28.7,-74C34.3,-75.6,40.1,-79.8,45.7,-76.4Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="py-24 bg-background">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why sell on Farm to Grocer?</h2>
                            <p className="text-lg text-muted-foreground">
                                Traditional supply chains take a massive cut of your hard work. We've built a platform that puts the control—and the profits—back in your hands.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[
                                {
                                    icon: TrendingUp,
                                    title: "Higher Margins",
                                    desc: "By selling directly to retailers, you retain on average 30-40% more revenue compared to traditional wholesale distribution."
                                },
                                {
                                    icon: Truck,
                                    title: "Streamlined Logistics",
                                    desc: "Coordinate pickups and deliveries efficiently. Buyers schedule their transport or opt into our localized delivery network."
                                },
                                {
                                    icon: ShieldCheck,
                                    title: "Guaranteed Payments",
                                    desc: "Say goodbye to 90-day net terms. Our integrated payment system ensures you get paid securely within days of delivery."
                                },
                                {
                                    icon: CheckCircle2,
                                    title: "Brand Recognition",
                                    desc: "Grocers want to highlight local farms. Build your brand identity and loyalty directly with the retailers selling your food."
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

                {/* Steps Section */}
                <section className="py-24 bg-primary text-primary-foreground">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl hidden md:block border-4 border-primary-foreground/20">
                                <Image
                                    src="https://images.unsplash.com/photo-1595856453085-f53835061690?auto=format&fit=crop&q=80"
                                    alt="Farmer using a tablet in the field"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="space-y-8">
                                <h2 className="text-3xl md:text-5xl font-bold">How it works</h2>
                                <div className="space-y-12">
                                    {[
                                        { step: "01", title: "Create your farm profile", desc: "List your farming practices, certifications, and location to build trust with local grocers." },
                                        { step: "02", title: "List your inventory", desc: "Easily update what’s in season, pricing, and quantities available right from your phone." },
                                        { step: "03", title: "Receive and fulfill orders", desc: "Grocers browse and buy directly. Pack the order, and the buyer takes care of the pickup or delivery." }
                                    ].map((item, i) => (
                                        <div key={i} className="flex gap-6">
                                            <div className="text-4xl font-black text-primary-foreground/30">{item.step}</div>
                                            <div>
                                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                                <p className="text-primary-foreground/80">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <Button size="lg" variant="secondary" className="w-full sm:w-auto mt-8" asChild>
                                    <Link href="/register?type=farmer">Create Free Account</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
