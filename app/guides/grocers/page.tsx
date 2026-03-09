"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Store, ChevronRight, CheckCircle2 } from "lucide-react";

export default function GrocersGuidePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-background pb-20">
                <div className="bg-primary text-primary-foreground py-12">
                    <div className="container mx-auto px-4 max-w-4xl flex items-center gap-4">
                        <Store className="h-10 w-10 opacity-80" />
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold">The Grocer's Guide</h1>
                            <p className="text-primary-foreground/80">Everything you need to source the freshest local produce.</p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-4xl mt-12 flex flex-col md:flex-row gap-12">
                    {/* Navigation sidebar */}
                    <aside className="md:w-64 shrink-0 hidden md:block border-r pr-8">
                        <div className="sticky top-24 font-medium text-sm space-y-4">
                            <p className="text-muted-foreground uppercase tracking-widest text-xs font-bold mb-2">Contents</p>
                            <a href="#getting-started" className="flex items-center text-primary justify-between">Getting Started <ChevronRight className="h-4 w-4" /></a>
                            <a href="#sourcing" className="flex items-center text-muted-foreground hover:text-foreground justify-between">Sourcing Produce</a>
                            <a href="#payments" className="flex items-center text-muted-foreground hover:text-foreground justify-between">Payments & Fees</a>
                            <a href="#delivery" className="flex items-center text-muted-foreground hover:text-foreground justify-between">Delivery & Receiving</a>
                        </div>
                    </aside>

                    {/* Content */}
                    <div className="flex-1 prose prose-stone max-w-none">
                        <h2 id="getting-started" className="text-2xl font-bold mt-0 border-b pb-2 mb-6">Getting Started</h2>
                        <p className="text-muted-foreground mb-6">Welcome to Farm to Grocer. Our platform gives you direct access to the farmers in your region, allowing you to bypass massive distribution warehouses and get food directly from the field to your shelves.</p>

                        <div className="bg-muted p-6 rounded-xl border mb-8">
                            <h3 className="font-bold mb-4">Initial Checklist</h3>
                            <ul className="space-y-3">
                                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> <span>Add your store's Tax ID (EIN) to unlock purchasing.</span></li>
                                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> <span>Add a payment method (Credit Card or ACH via Stripe).</span></li>
                                <li className="flex gap-3"><CheckCircle2 className="h-5 w-5 text-primary shrink-0" /> <span>Set your delivery preferences (Do you have a loading dock? Operating hours?)</span></li>
                            </ul>
                        </div>

                        <h2 id="sourcing" className="text-2xl font-bold border-b pb-2 mb-6 mt-12">Sourcing Produce</h2>
                        <h4 className="font-bold text-lg mb-2">Using the Marketplace</h4>
                        <p className="text-muted-foreground mb-6">The marketplace is updated in real-time by farmers. Use the distance filter to find farms within your desired radius (e.g., within 50 miles for truly local impact).</p>

                        <h4 className="font-bold text-lg mb-2">Standing Orders vs. Spot Buying</h4>
                        <p className="text-muted-foreground mb-12">While spot buying is great for seasonal specialties (like finding 50lbs of heirloom tomatoes in August), you can also message farmers directly to set up recurring "standing orders" for staples like lettuce and carrots.</p>

                        <h2 id="delivery" className="text-2xl font-bold border-b pb-2 mb-6 mt-12">Delivery & Receiving</h2>
                        <p className="text-muted-foreground mb-4">You have three options for receiving your produce:</p>
                        <ol className="list-decimal pl-5 space-y-4 text-muted-foreground mb-12">
                            <li><strong>Farmer Delivery:</strong> Many farmers offer delivery themselves for a small fee. This guarantees the chain of custody.</li>
                            <li><strong>Store Pickup:</strong> If you have a van, you can drive to the farm and pick it up directly, saving on logistics costs.</li>
                            <li><strong>Third-Party Freight:</strong> For large palleted orders, you can coordinate LTL freight through our integrated partners.</li>
                        </ol>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
