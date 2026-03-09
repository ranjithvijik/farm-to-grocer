"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { HelpCircle, Search, MessageSquare, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import Link from "next/link";

export default function FAQPage() {
    const [search, setSearch] = React.useState("");

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 bg-muted/20">
                {/* Hero Section */}
                <section className="bg-white border-b py-20">
                    <div className="container mx-auto px-4 text-center">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
                            Frequently Asked Questions
                        </h1>
                        <div className="max-w-2xl mx-auto relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                            <Input
                                className="pl-12 h-14 rounded-full text-lg shadow-sm"
                                placeholder="Search for answers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </section>

                <section className="py-16">
                    <div className="container mx-auto px-4">
                        <Tabs defaultValue="general" className="max-w-4xl mx-auto">
                            <div className="flex justify-center mb-10">
                                <TabsList className="bg-white shadow-sm border h-12 px-2 hover:bg-muted/50">
                                    <TabsTrigger value="general">General</TabsTrigger>
                                    <TabsTrigger value="grocers">For Grocers</TabsTrigger>
                                    <TabsTrigger value="farmers">For Farmers</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="general">
                                <Accordion className="bg-white rounded-xl shadow-sm border px-6 overflow-hidden">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>What is Farm to Grocer?</AccordionTrigger>
                                        <AccordionContent>
                                            Farm to Grocer is a B2B marketplace that connects local farmers
                                            directly with grocery stores, restaurants, and other food service
                                            providers. Our goal is to make local sourcing easier, more efficient,
                                            and more profitable for both sides.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>Which regions do you serve?</AccordionTrigger>
                                        <AccordionContent>
                                            We currently serve the greater Northeastern region, with plans to
                                            expand nationwide soon. You can check if we're in your area by
                                            starting the registration process.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Is there a cost to join?</AccordionTrigger>
                                        <AccordionContent>
                                            It is completely free to create an account and browse the
                                            marketplace. We only charge transaction fees or subscription
                                            fees if you choose a premium plan. See our <Link href="/pricing" className="text-primary hover:underline">Pricing page</Link> for details.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </TabsContent>

                            <TabsContent value="grocers">
                                <Accordion className="bg-white rounded-xl shadow-sm border px-6 overflow-hidden">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>How is delivery handled?</AccordionTrigger>
                                        <AccordionContent>
                                            Delivery is coordinated directly between the farmer and the grocer.
                                            Farmers set their delivery zones and schedules. Many farmers handle
                                            their own deliveries, while others use our partner logistics services.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>What happens if produce arrives damaged?</AccordionTrigger>
                                        <AccordionContent>
                                            We have a robust quality guarantee. You can report damaged produce
                                            directly through the dashboard within 24 hours of delivery. We'll
                                            facilitate a refund or a replacement order immediately.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>How do I pay for my orders?</AccordionTrigger>
                                        <AccordionContent>
                                            Payments are handled securely through our platform via Stripe. You
                                            can pay by credit card, ACH transfer, or set up net-terms if you're
                                            on a Pro plan.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </TabsContent>

                            <TabsContent value="farmers">
                                <Accordion className="bg-white rounded-xl shadow-sm border px-6 overflow-hidden">
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>How do I set my prices?</AccordionTrigger>
                                        <AccordionContent>
                                            Farmers have full control over their pricing. You can set prices per
                                            unit (lb, case, bunch, etc.) and update them at any time based on
                                            market conditions or harvest volume.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-2">
                                        <AccordionTrigger>How often do I get paid?</AccordionTrigger>
                                        <AccordionContent>
                                            Payments are typically processed 48 hours after a delivery is
                                            confirmed by the buyer. Funds are deposited directly to your
                                            connected bank account.
                                        </AccordionContent>
                                    </AccordionItem>
                                    <AccordionItem value="item-3">
                                        <AccordionTrigger>Do I need to be certified organic?</AccordionTrigger>
                                        <AccordionContent>
                                            No, we welcome all local farmers. However, if you are certified
                                            organic, you can highlight this on your profile and products to
                                            attract specific buyers.
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-20 flex flex-col items-center gap-6">
                            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="h-8 w-8 text-primary" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                                <p className="text-muted-foreground mb-6">
                                    Our support team is available 7 days a week to help you.
                                </p>
                                <Button size="lg" asChild>
                                    <Link href="/contact">
                                        Contact Support
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
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
