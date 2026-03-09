"use client";

import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/Button";

export default function CareersPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-background">
                {/* Hero Section */}
                <section className="relative bg-muted/40 py-24 text-center">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                            Join us in reshaping the food system.
                        </h1>
                        <p className="text-xl text-muted-foreground mb-8">
                            We're looking for passionate builders, designers, and agricultural enthusiasts to help connect local farms directly to grocers.
                        </p>
                        <Button size="lg" asChild>
                            <a href="#positions">View Open Roles</a>
                        </Button>
                    </div>
                </section>

                <section className="py-20">
                    <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
                        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                            <Image
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80"
                                alt="Team collaborating"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold">Why work with us?</h2>
                            <p className="text-lg text-muted-foreground">
                                At Farm to Grocer, you're not just writing code or making sales—you're making a tangible impact on local economies and the environment. We are a remote-first team distributed across North America, united by a love for good food and sustainable practices.
                            </p>
                            <ul className="space-y-3 ms-2">
                                <li className="flex items-center gap-2">✅ Comprehensive health, dental, and vision</li>
                                <li className="flex items-center gap-2">✅ Remote-first culture with flexible hours</li>
                                <li className="flex items-center gap-2">✅ Weekly grocery stipend for local produce</li>
                                <li className="flex items-center gap-2">✅ Generous PTO and family leave</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Positions Section */}
                <section id="positions" className="py-24 bg-muted/20 border-t">
                    <div className="container mx-auto px-4 max-w-4xl">
                        <h2 className="text-3xl font-bold mb-12 text-center">Open Positions</h2>

                        <div className="space-y-4">
                            {[
                                { title: "Senior Full Stack Engineer", dept: "Engineering", loc: "Remote (US/Canada)" },
                                { title: "Product Designer", dept: "Product", loc: "Remote (Global)" },
                                { title: "Agricultural Outreach Specialist", dept: "Operations", loc: "California / Remote" },
                                { title: "Account Executive (Grocery)", dept: "Sales", loc: "Remote (US/Canada)" }
                            ].map((job, i) => (
                                <div key={i} className="bg-background border rounded-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between hover:border-primary/50 transition-colors shadow-sm gap-4">
                                    <div>
                                        <h3 className="text-xl font-bold">{job.title}</h3>
                                        <p className="text-muted-foreground">{job.dept} • {job.loc}</p>
                                    </div>
                                    <Button variant="outline" asChild>
                                        <Link href={`/contact?subject=Application for ${job.title}`}>Apply Now</Link>
                                    </Button>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 text-center p-8 bg-muted rounded-xl">
                            <h3 className="text-xl font-semibold mb-2">Don't see a fit?</h3>
                            <p className="text-muted-foreground mb-4">We're always looking for talented people. Send us your resume anyway.</p>
                            <Button variant="link" asChild>
                                <Link href="/contact">Get in touch</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
