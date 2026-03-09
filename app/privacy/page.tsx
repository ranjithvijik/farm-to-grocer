import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
    const lastUpdated = "May 24, 2024";

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 py-20 bg-muted/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8 md:p-12">
                        <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
                        <p className="text-muted-foreground mb-10 italic">Last updated: {lastUpdated}</p>

                        <div className="prose prose-slate max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
                                <p>
                                    We collect information you provide directly to us when you create an
                                    account, place an order, or communicate with us. This includes name,
                                    email, business details, and payment information.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">2. How We Use Information</h2>
                                <p>
                                    We use the information we collect to provide, maintain, and improve
                                    our Service, process transactions, send updates, and support
                                    customer relations.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">3. Data Sharing</h2>
                                <p>
                                    We share information between Farmers and Grocers only as necessary to
                                    facilitate transactions and deliveries. We do not sell your personal
                                    data to third parties.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
                                <p>
                                    We take reasonable measures to help protect information about you from
                                    loss, theft, misuse, and unauthorized access. All payments are
                                    processed through secure, PCI-compliant providers.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">5. Your Choices</h2>
                                <p>
                                    You may update your account information or unsubscribe from
                                    marketing communications at any time through your dashboard
                                    settings.
                                </p>
                            </section>

                            <section className="mb-8 border-t pt-8 text-center text-sm text-muted-foreground">
                                <p>If you have questions about our Privacy Policy, please contact us at privacy@farmtogrocer.com</p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
