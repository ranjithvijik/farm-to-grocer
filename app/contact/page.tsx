"use client";

import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
    Mail,
    MessageSquare,
    MapPin,
    Phone,
    Send,
    HelpCircle
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Input, Textarea } from "@/components/ui/Input";

export default function ContactPage() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Message sent! This is a demo implementation.");
    };

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 bg-muted/20">
                <section className="py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h1 className="text-4xl font-bold tracking-tight mb-4">Get in Touch</h1>
                            <p className="text-lg text-muted-foreground">
                                Have questions about our marketplace? Our team is here to help
                                farmers and grocers succeed.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            {/* Contact Info */}
                            <div className="lg:col-span-1 space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                                    <div className="space-y-6">
                                        <div className="flex gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <Mail className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Email</p>
                                                <p className="text-lg">support@farmtogrocer.com</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <Phone className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Phone</p>
                                                <p className="text-lg">+1 (555) 123-4567</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <MapPin className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Office</p>
                                                <p className="text-lg">
                                                    123 Farm Way, Suite 400<br />
                                                    Agricultural District, NY 10001
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <Card className="bg-primary text-primary-foreground border-none">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <HelpCircle className="h-5 w-5" />
                                            Quick FAQ
                                        </CardTitle>
                                        <CardDescription className="text-primary-foreground/70 italic">
                                            Check our FAQ page for instant answers.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button variant="secondary" className="w-full" asChild>
                                            <a href="/faq">Visit FAQ Center</a>
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Contact Form */}
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Send us a Message</CardTitle>
                                        <CardDescription>
                                            Fill out the form below and we'll get back to you within 24 hours.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">First Name</label>
                                                    <Input placeholder="John" required />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm font-medium">Last Name</label>
                                                    <Input placeholder="Doe" required />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Email Address</label>
                                                <Input type="email" placeholder="john@example.com" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Subject</label>
                                                <Input placeholder="How can we help you?" required />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium">Message</label>
                                                <Textarea
                                                    placeholder="Tell us about your farm or retail business..."
                                                    className="min-h-[150px]"
                                                    required
                                                />
                                            </div>
                                            <Button className="w-full md:w-auto" size="lg">
                                                <Send className="mr-2 h-4 w-4" />
                                                Send Message
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
