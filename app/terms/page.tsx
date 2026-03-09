import * as React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
    const lastUpdated = "May 24, 2024";

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 py-20 bg-muted/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8 md:p-12">
                        <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
                        <p className="text-muted-foreground mb-10 italic">Last updated: {lastUpdated}</p>

                        <div className="prose prose-slate max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using Farm to Grocer (the "Service"), you agree to be
                                    bound by these Terms of Service. If you do not agree to these terms,
                                    please do not use the Service.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
                                <p>
                                    Farm to Grocer provides an online marketplace platform connecting
                                    local farmers ("Farmers") with grocery stores, restaurants, and other
                                    commercial food buyers ("Grocers").
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
                                <p>
                                    You must create an account to use most features of the Service. You are
                                    responsible for maintaining the confidentiality of your account credentials
                                    and for all activities that occur under your account.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">4. Marketplace Transactions</h2>
                                <p>
                                    Farm to Grocer facilitates transactions but is not a party to the
                                    purchase agreement between Farmers and Grocers. Farmers are responsible
                                    for the quality of their produce, and Grocers are responsible for
                                    timely payment.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">5. Fees and Payments</h2>
                                <p>
                                    Fees for using the Service are outlined on our Pricing page. We use
                                    Stripe for payment processing. By using our Service, you agree to
                                    Stripe's services agreement.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">6. Limitation of Liability</h2>
                                <p>
                                    To the maximum extent permitted by law, Farm to Grocer shall not be
                                    liable for any indirect, incidental, special, consequential, or
                                    punitive damages resulting from your use of the Service.
                                </p>
                            </section>

                            <section className="mb-8 border-t pt-8 text-center text-sm text-muted-foreground">
                                <p>If you have questions about our Terms, please contact us at legal@farmtogrocer.com</p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
