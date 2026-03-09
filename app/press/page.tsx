"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { Download, ExternalLink, Mail } from "lucide-react";

export default function PressPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-background">
                {/* Header */}
                <section className="bg-muted/40 py-20 border-b">
                    <div className="container mx-auto px-4 text-center max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            Press & Media
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            Everything you need to write about Farm to Grocer and our mission to decentralize the food supply chain.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button className="gap-2">
                                <Download className="h-4 w-4" /> Download Press Kit
                            </Button>
                            <Button variant="outline" asChild className="gap-2">
                                <Link href="/contact"><Mail className="h-4 w-4" /> Media Inquiries</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-16">
                            {/* In the News */}
                            <div>
                                <h2 className="text-3xl font-bold mb-8 tracking-tight">Farm to Grocer in the News</h2>
                                <div className="space-y-8">
                                    {[
                                        { outlet: "TechCrunch", title: "Farm to Grocer raises $5M seed to connect local farms to local shelves", date: "October 12, 2025" },
                                        { outlet: "Fast Company", title: "How this startup is shortening the supply chain for fresh produce", date: "August 04, 2025" },
                                        { outlet: "Modern Grocer", title: "The future of the produce aisle is hyper-local", date: "June 22, 2025" },
                                    ].map((article, i) => (
                                        <div key={i} className="group cursor-pointer">
                                            <div className="text-sm font-semibold text-primary mb-2">{article.outlet}</div>
                                            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{article.title}</h3>
                                            <div className="flex items-center justify-between text-muted-foreground">
                                                <span className="text-sm">{article.date}</span>
                                                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </div>
                                            <hr className="mt-6" />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Brand Assets */}
                            <div>
                                <h2 className="text-3xl font-bold mb-8 tracking-tight">Brand Assets</h2>
                                <div className="space-y-6">
                                    <div className="border rounded-xl p-8 text-center bg-muted/20">
                                        <div className="h-20 w-auto flex items-center justify-center mb-6">
                                            <span className="text-3xl font-black tracking-tighter text-primary">Farm to Grocer</span>
                                        </div>
                                        <Button variant="secondary" size="sm" className="w-full gap-2 font-bold">
                                            <Download className="h-4 w-4" /> Primary Logo (.SVG)
                                        </Button>
                                    </div>
                                    <div className="border border-input bg-primary text-primary-foreground rounded-xl p-8 text-center">
                                        <div className="h-20 w-auto flex items-center justify-center mb-6">
                                            <span className="text-3xl font-black tracking-tighter text-primary-foreground">Farm to Grocer</span>
                                        </div>
                                        <Button variant="outline" size="sm" className="w-full gap-2 font-bold bg-transparent text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground hover:text-primary">
                                            <Download className="h-4 w-4" /> Knockout Logo (.SVG)
                                        </Button>
                                    </div>
                                    <div className="bg-muted p-6 rounded-xl text-sm text-center text-muted-foreground mt-4">
                                        Please do not edit, change, distort, recolor, or reconfigure the Farm to Grocer logo. Use the primary logo on light backgrounds and the knockout on dark.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
