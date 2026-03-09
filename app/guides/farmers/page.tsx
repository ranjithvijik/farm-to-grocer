"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, ChevronRight, Sprout } from "lucide-react";

export default function FarmersGuidePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-background pb-20">
                <div className="bg-primary text-primary-foreground py-12">
                    <div className="container mx-auto px-4 max-w-4xl flex items-center gap-4">
                        <Sprout className="h-10 w-10 opacity-80" />
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">The Farmer's Guide</h1>
                            <p className="text-primary-foreground/80">Everything you need to successfully sell on Farm to Grocer.</p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-4xl mt-12 flex flex-col md:flex-row gap-12">
                    {/* Navigation sidebar */}
                    <aside className="md:w-64 shrink-0 hidden md:block border-r pr-8">
                        <div className="sticky top-24 font-medium text-sm space-y-4">
                            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold mb-2">Contents</p>
                            <a href="#getting-started" className="flex items-center text-primary justify-between">Getting Started <ChevronRight className="h-4 w-4" /></a>
                            <a href="#listing-inventory" className="flex items-center text-muted-foreground hover:text-foreground justify-between">Listing Inventory</a>
                            <a href="#handling-orders" className="flex items-center text-muted-foreground hover:text-foreground justify-between">Handling Orders</a>
                            <a href="#payments" className="flex items-center text-muted-foreground hover:text-foreground justify-between">Payments & Fees</a>
                            <a href="#logistics" className="flex items-center text-muted-foreground hover:text-foreground justify-between">Logistics & Delivery</a>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="flex-1 prose prose-stone max-w-none">
                        <h2 id="getting-started" className="text-2xl font-bold mt-0 border-b pb-2 mb-6">Getting Started</h2>
                        <p className="text-muted-foreground mb-6">Welcome to Farm to Grocer. By cutting out wholesale intermediaries, you have full control over your pricing and customer relationships. Getting started only takes 10 minutes.</p>

                        <div className="bg-muted p-6 rounded-xl border mb-8">
                            <h3 className="font-bold mb-4">Initial Checklist</h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> <span>Upload high-quality photos of your farm and produce.</span></li>
                                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> <span>Fill out your "About the Farm" story. Grocers care about who they are buying from.</span></li>
                                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> <span>Connect your bank account via Stripe to receive payouts.</span></li>
                                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> <span>Accurately list your growing practices (Organic, GAP certified, Pesticide-free, etc)</span></li>
                            </ul>
                        </div>

                        <h2 id="listing-inventory" className="text-2xl font-bold border-b pb-2 mb-6 mt-12">Listing Inventory</h2>
                        <h4 className="font-bold text-lg mb-2">Pricing Strategy</h4>
                        <p className="text-muted-foreground mb-6">Unlike wholesale, you set your own prices here. We recommend pricing slightly below retail MSRP, but significantly higher than traditional wholesale bulk rates.</p>

                        <h4 className="font-bold text-lg mb-2">Managing Quantities</h4>
                        <p className="text-muted-foreground mb-12">Always double check your available quantities. Canceling an order because you oversold hurts your rating on the platform. It's better to under-list and add inventory later than to over-promise.</p>

                        <h2 id="handling-orders" className="text-2xl font-bold border-b pb-2 mb-6 mt-12">Handling Orders</h2>
                        <p className="text-muted-foreground mb-4">When a grocer places an order, you will receive an SMS and email notification.</p>
                        <ol className="list-decimal pl-5 space-y-4 text-muted-foreground mb-12">
                            <li><strong>Accept the Order:</strong> You have 24 hours to confirm the order in the portal.</li>
                            <li><strong>Pack with Care:</strong> Use standard, clean agricultural boxes. Clearly label the boxes with the Grocer's name and Order ID.</li>
                            <li><strong>Mark as Ready:</strong> Once packed, mark the status as "Ready for Pickup/Delivery".</li>
                        </ol>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
