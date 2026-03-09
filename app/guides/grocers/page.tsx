"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function GrocersPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-muted/20 flex flex-col items-center justify-center p-8 text-center min-h-[60vh]">
                <div className="max-w-2xl">
                    <h1 className="text-4xl font-bold mb-4 tracking-tight capitalize">
                        Grocers
                    </h1>
                    <p className="text-lg text-muted-foreground mb-8">
                        This page is currently under development. Check back soon!
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}
