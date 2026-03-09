"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";
import { HelpCircle, Search, Mail, Book } from "lucide-react";

export default function HelpPage() {
    const faqs = [
        {
            q: "How do I get paid as a farmer?",
            a: "Farmers are paid automatically via Stripe. Once an order is marked as 'Delivered' by the grocer, the funds (minus our platform fee) are distributed directly to your connected bank account within 2-3 business days."
        },
        {
            q: "How does delivery work?",
            a: "Farm to Grocer facilitates the transaction, but logistics are handled between the buyer and seller. You can negotiate whether the farmer delivers, or if the grocer picks up. In some select markets, we have partnered with local cold-chain logistics providers."
        },
        {
            q: "What is the platform fee?",
            a: "We charge a transparent flat fee of 8% on transactions, paid by the buyer (grocer). Farmers keep 100% of the price they set for their produce."
        },
        {
            q: "Do I need organic certification to sell?",
            a: "No! While organic certification is highly desired by many grocers, we welcome all farmers. We require you to accurately tag your farming practices (e.g., conventional, pesticide-free, transitional, USDA Organic)."
        },
        {
            q: "What if there is a dispute about produce quality?",
            a: "Grocers have 24 hours to report spoilage or quality issues upon receipt. If reported, funds are temporarily held while our support team reviews photos and mediates the issue to ensure fairness."
        }
    ];

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-background pb-20">
                {/* Header */}
                <section className="bg-primary/10 py-16 md:py-24 border-b">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="h-16 w-16 bg-primary/20 text-primary rounded-full flex items-center justify-center">
                                <HelpCircle className="h-8 w-8" />
                            </div>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                            How can we help you?
                        </h1>
                        <div className="relative max-w-2xl mx-auto shadow-sm">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search for articles, guides, or FAQs..."
                                className="w-full h-14 pl-12 pr-4 rounded-xl border border-input focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-lg"
                            />
                        </div>
                    </div>
                </section>

                <div className="container mx-auto px-4 max-w-5xl mt-16 text-left">
                    <div className="grid md:grid-cols-3 gap-8 mb-20">
                        {/* Quick Links */}
                        <div className="md:col-span-1 space-y-4">
                            <h2 className="font-bold text-xl mb-4">Support Channels</h2>
                            <div className="p-6 border rounded-xl bg-card hover:border-primary/50 transition-colors shadow-sm text-center">
                                <Book className="h-8 w-8 text-primary mx-auto mb-4" />
                                <h3 className="font-bold mb-2">Read our Guides</h3>
                                <p className="text-sm text-muted-foreground mb-4">In-depth tutorials for getting the most out of the platform.</p>
                                <div className="flex flex-col gap-2">
                                    <Button variant="ghost" className="w-full justify-start text-primary" asChild>
                                        <a href="/guides/farmers">Guide for Farmers</a>
                                    </Button>
                                    <Button variant="ghost" className="w-full justify-start text-primary" asChild>
                                        <a href="/guides/grocers">Guide for Grocers</a>
                                    </Button>
                                </div>
                            </div>
                            <div className="p-6 border rounded-xl bg-muted/30 text-center">
                                <Mail className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                                <h3 className="font-bold mb-2">Still need help?</h3>
                                <p className="text-sm text-muted-foreground mb-4">Our support team is available Mon-Fri, 9am - 5pm EST.</p>
                                <Button className="w-full" asChild>
                                    <a href="/contact">Contact Support</a>
                                </Button>
                            </div>
                        </div>

                        {/* FAQs */}
                        <div className="md:col-span-2">
                            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                            <div className="space-y-6">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="border-b pb-6">
                                        <h3 className="text-lg font-bold mb-3">{faq.q}</h3>
                                        <p className="text-muted-foreground">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 text-center sm:text-left">
                                <Button variant="outline">Load More FAQs</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
