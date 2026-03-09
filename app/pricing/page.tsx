"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Check, Info, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import Link from "next/link";

export default function PricingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 bg-muted/30">
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                Simple, Transparent Pricing
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                We're committed to keeping costs low for local farmers and businesses.
                                Choose the plan that fits your operation.
                            </p>
                        </div>

                        <Tabs defaultValue="grocers" className="max-w-5xl mx-auto">
                            <div className="flex justify-center mb-12">
                                <TabsList className="grid w-64 grid-cols-2">
                                    <TabsTrigger value="grocers">For Grocers</TabsTrigger>
                                    <TabsTrigger value="farmers">For Farmers</TabsTrigger>
                                </TabsList>
                            </div>

                            <TabsContent value="grocers" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Card className="flex flex-col border-2 border-primary/10">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">Standard</CardTitle>
                                        <CardDescription>Perfect for small shops & cafes</CardDescription>
                                        <div className="mt-4 flex items-baseline gap-1">
                                            <span className="text-4xl font-bold font-mono">$0</span>
                                            <span className="text-muted-foreground">/month</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <ul className="space-y-4 text-sm">
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>Access to local marketplace</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>Real-time delivery tracking</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>5.9% transaction fee</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button className="w-full" asChild>
                                            <Link href="/register?role=grocer">Join as a Grocer</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card className="flex flex-col border-2 border-primary relative overflow-hidden shadow-2xl">
                                    <div className="bg-primary text-primary-foreground text-center py-1 text-xs font-bold uppercase tracking-widest">
                                        Recommended
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">Pro</CardTitle>
                                        <CardDescription>For growing businesses & restaurants</CardDescription>
                                        <div className="mt-4 flex items-baseline gap-1">
                                            <span className="text-4xl font-bold font-mono">$49</span>
                                            <span className="text-muted-foreground">/month</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <ul className="space-y-4 text-sm">
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>Everything in Standard</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>Priority delivery slots</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>Reduced 2.9% transaction fee</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>Advanced spending analytics</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="default" className="w-full" asChild>
                                            <Link href="/register?role=grocer">Upgrade to Pro</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="farmers" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <Card className="flex flex-col border-2 border-secondary/20">
                                    <CardHeader>
                                        <CardTitle className="text-2xl">Seed</CardTitle>
                                        <CardDescription>For small family farms</CardDescription>
                                        <div className="mt-4 flex items-baseline gap-1">
                                            <span className="text-4xl font-bold font-mono">$0</span>
                                            <span className="text-muted-foreground">/month</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <ul className="space-y-4 text-sm">
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>List up to 10 products</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>Basic sales dashboard</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>8% commission per sale</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="secondary" className="w-full" asChild>
                                            <Link href="/register?role=farmer">Join as a Farmer</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <Card className="flex flex-col border-2 border-secondary overflow-hidden shadow-xl">
                                    <div className="bg-secondary text-secondary-foreground text-center py-1 text-xs font-bold uppercase tracking-widest">
                                        Growth
                                    </div>
                                    <CardHeader>
                                        <CardTitle className="text-2xl">Harvest</CardTitle>
                                        <CardDescription>For production-scale farms</CardDescription>
                                        <div className="mt-4 flex items-baseline gap-1">
                                            <span className="text-4xl font-bold font-mono">$29</span>
                                            <span className="text-muted-foreground">/month</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <ul className="space-y-4 text-sm">
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>Unlimited product listings</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>Advanced analytics & forecasting</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>Reduced 4% commission</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <Check className="h-5 w-5 text-green-500 shrink-0" />
                                                <span>Featured farm placement</span>
                                            </li>
                                        </ul>
                                    </CardContent>
                                    <CardFooter>
                                        <Button variant="secondary" className="w-full" asChild>
                                            <Link href="/register?role=farmer">Choose Harvest</Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        <div className="mt-20 text-center max-w-2xl mx-auto">
                            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-6">
                                <ShieldCheck className="h-6 w-6" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Enterprise Custom Plans</h3>
                            <p className="text-muted-foreground mb-6">
                                Running a large-scale distribution center or a chain of stores?
                                We offer custom volume pricing and API access.
                            </p>
                            <Button variant="ghost" asChild>
                                <Link href="/contact">Contact Our Sales Team</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
