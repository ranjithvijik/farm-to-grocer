"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CookiesPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1 py-20 bg-muted/10">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border p-8 md:p-12">
                        <h1 className="text-4xl font-bold mb-2">Cookie Policy</h1>
                        <p className="text-muted-foreground mb-10 italic">Last Updated: October 1, 2025</p>

                        <div className="prose prose-slate max-w-none">
                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">1. What are cookies?</h2>
                                <p>
                                    Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information and assist with service or advertising personalization.
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">2. How we use cookies</h2>
                                <p>We use cookies for the following purposes:</p>
                                <ul>
                                    <li><strong>Essential Cookies:</strong> These are strictly necessary to provide you with services available through our website and to use some of its features, such as accessing secure areas that require login.</li>
                                    <li><strong>Performance and Functionality Cookies:</strong> These are used to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality (like videos) may become unavailable.</li>
                                    <li><strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our website is being used or how effective our marketing campaigns are, or to help us customize our website for you.</li>
                                </ul>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">3. Third-party cookies</h2>
                                <p>
                                    In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the service, deliver advertisements on and through the service, and so on. (For example: Google Analytics, Stripe for payments).
                                </p>
                            </section>

                            <section className="mb-8">
                                <h2 className="text-2xl font-bold mb-4">4. Your choices regarding cookies</h2>
                                <p>
                                    If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Note that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
                                </p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
