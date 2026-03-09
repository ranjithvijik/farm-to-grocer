"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Accessibility } from "lucide-react";

export default function AccessibilityPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-background py-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-16 w-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                            <Accessibility className="h-8 w-8" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight">Accessibility Statement</h1>
                    </div>

                    <div className="prose prose-stone max-w-none">
                        <p className="text-muted-foreground mb-8 text-lg">
                            Farm to Grocer is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone, and applying the relevant accessibility standards.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Conformance status</h2>
                        <p className="text-muted-foreground mb-6">
                            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA. Farm to Grocer is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts of the content do not fully conform to the accessibility standard.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Feedback</h2>
                        <p className="text-muted-foreground mb-4">
                            We welcome your feedback on the accessibility of Farm to Grocer. Please let us know if you encounter accessibility barriers on our platform:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-8">
                            <li>Phone: +1 555-123-4567</li>
                            <li>E-mail: accessibility@farmtogrocer.com</li>
                            <li>Postal address: 123 Farm Way, Suite 400, Agricultural District, NY 10001</li>
                        </ul>
                        <p className="text-muted-foreground mb-8">
                            We try to respond to feedback within 2 business days.
                        </p>

                        <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">Technical specifications</h2>
                        <p className="text-muted-foreground mb-4">
                            Accessibility of Farm to Grocer relies on the following technologies to work with the particular combination of web browser and any assistive technologies or plugins installed on your computer:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 text-muted-foreground mb-8">
                            <li>HTML</li>
                            <li>WAI-ARIA</li>
                            <li>CSS</li>
                            <li>JavaScript</li>
                        </ul>
                        <p className="text-muted-foreground mb-8">
                            These technologies are relied upon for conformance with the accessibility standards used.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
