"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Code, Terminal } from "lucide-react";

export default function ApiDocsPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 bg-background pb-20">
                <div className="bg-[#0f172a] text-white py-16">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="flex-1 space-y-4 text-center md:text-left">
                                <Code className="h-12 w-12 text-primary mx-auto md:mx-0" />
                                <h1 className="text-4xl md:text-5xl font-bold">API Documentation</h1>
                                <p className="text-slate-400 text-lg max-w-lg">Integrate Farm to Grocer data directly into your store's inventory management or POS system.</p>
                                <div className="pt-4">
                                    <span className="bg-primary/20 text-primary px-3 py-1 rounded-md font-mono text-sm">v1.0 (Beta)</span>
                                </div>
                            </div>
                            <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 w-full md:w-96 shadow-xl">
                                <div className="flex items-center gap-2 mb-4 text-slate-400">
                                    <Terminal className="h-4 w-4" /> <span>Quick Start</span>
                                </div>
                                <code className="block text-sm text-emerald-400 mb-2">curl -X GET \</code>
                                <code className="block text-sm text-emerald-400 mb-2">&nbsp;&nbsp;https://api.farmtogrocer.com/v1/produce \</code>
                                <code className="block text-sm text-emerald-400">&nbsp;&nbsp;-H 'Authorization: Bearer YOUR_API_KEY'</code>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 max-w-5xl mt-16">
                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="md:col-span-1 border-r pr-4 hidden md:block">
                            <h3 className="font-bold text-sm uppercase text-muted-foreground tracking-wider mb-4">Endpoints</h3>
                            <ul className="space-y-3 font-medium text-sm">
                                <li><a href="#authentication" className="text-primary hover:underline">Authentication</a></li>
                                <li><a href="#get-products" className="hover:text-primary transition-colors">GET /products</a></li>
                                <li><a href="#get-products-id" className="hover:text-primary transition-colors">GET /products/:id</a></li>
                                <li><a href="#post-orders" className="hover:text-primary transition-colors">POST /orders</a></li>
                                <li><a href="#get-orders-id" className="hover:text-primary transition-colors">GET /orders/:id</a></li>
                                <li><a href="#patch-orders-id" className="hover:text-primary transition-colors">PATCH /orders/:id</a></li>
                                <li><a href="#webhooks" className="hover:text-primary transition-colors">Webhooks</a></li>
                            </ul>
                        </div>
                        <div className="md:col-span-3 prose max-w-none">
                            <h2 className="text-2xl font-bold border-b pb-2 mb-6">Introduction</h2>
                            <p className="text-muted-foreground mb-8">
                                The Farm to Grocer API is organized around REST. Our API has predictable, resource-oriented URLs, and uses HTTP response codes to indicate API errors. We use built-in HTTP features, like HTTP authentication and HTTP verbs, which are understood by off-the-shelf HTTP clients.
                            </p>

                            <h2 id="authentication" className="text-2xl font-bold border-b pb-2 mb-6">Authentication</h2>
                            <p className="text-muted-foreground mb-4">
                                Authenticate your account when using the API by including your secret API key in the request. You can manage your API keys in the Dashboard. Your API keys carry many privileges, so be sure to keep them secure!
                            </p>
                            <div className="bg-muted rounded-md p-4 mb-8 overflow-x-auto">
                                <pre className="text-sm font-mono text-muted-foreground"><code>Authorization: Bearer sk_live_...</code></pre>
                            </div>

                            <h2 id="get-products" className="text-2xl font-bold border-b pb-2 mb-6 mt-12">GET /products</h2>
                            <p className="text-muted-foreground mb-4">
                                Retrieve a list of available produce from local farmers. Supports filtering by category, farm, and proximity.
                            </p>
                            <div className="bg-muted rounded-md p-4 mb-8 overflow-x-auto">
                                <pre className="text-sm font-mono text-muted-foreground"><code>GET https://api.farmtogrocer.com/v1/products?limit=10</code></pre>
                            </div>

                            <h2 id="get-products-id" className="text-2xl font-bold border-b pb-2 mb-6 mt-12">GET /products/:id</h2>
                            <p className="text-muted-foreground mb-4">
                                Retrieve details for a specific product, including current inventory levels and farmer information.
                            </p>
                            <div className="bg-muted rounded-md p-4 mb-8 overflow-x-auto">
                                <pre className="text-sm font-mono text-muted-foreground"><code>GET https://api.farmtogrocer.com/v1/products/prod_123xyz</code></pre>
                            </div>

                            <h2 id="post-orders" className="text-2xl font-bold border-b pb-2 mb-6 mt-12">POST /orders</h2>
                            <p className="text-muted-foreground mb-4">
                                Create a new wholesale order for one or multiple products.
                            </p>
                            <div className="bg-muted rounded-md p-4 mb-8 overflow-x-auto">
                                <pre className="text-sm font-mono text-muted-foreground"><code>POST https://api.farmtogrocer.com/v1/orders</code></pre>
                            </div>

                            <h2 id="get-orders-id" className="text-2xl font-bold border-b pb-2 mb-6 mt-12">GET /orders/:id</h2>
                            <p className="text-muted-foreground mb-4">
                                Retrieve the status and details of an existing order.
                            </p>
                            <div className="bg-muted rounded-md p-4 mb-8 overflow-x-auto">
                                <pre className="text-sm font-mono text-muted-foreground"><code>GET https://api.farmtogrocer.com/v1/orders/ord_456abc</code></pre>
                            </div>

                            <h2 id="patch-orders-id" className="text-2xl font-bold border-b pb-2 mb-6 mt-12">PATCH /orders/:id</h2>
                            <p className="text-muted-foreground mb-4">
                                Update an existing order object. Often used to update order status or adjust delivery notes.
                            </p>
                            <div className="bg-muted rounded-md p-4 mb-8 overflow-x-auto">
                                <pre className="text-sm font-mono text-muted-foreground"><code>PATCH https://api.farmtogrocer.com/v1/orders/ord_456abc</code></pre>
                            </div>

                            <h2 id="webhooks" className="text-2xl font-bold border-b pb-2 mb-6 mt-12">Webhooks</h2>
                            <p className="text-muted-foreground mb-4">
                                Listen for events on your Farm to Grocer account so your integration can automatically trigger reactions. For example, when an order's status changes to "Out for Delivery".
                            </p>
                            <div className="bg-muted rounded-md p-4 mb-8 overflow-x-auto">
                                <pre className="text-sm font-mono text-muted-foreground"><code>POST https://your-domain.com/webhook-endpoint</code></pre>
                            </div>

                            <h2 className="text-2xl font-bold border-b pb-2 mb-6 mt-12">Pagination</h2>
                            <p className="text-muted-foreground mb-4">
                                All top-level API resources have support for bulk fetches via "list" API methods. These list API methods share a common structure, taking at least these two parameters: <code>limit</code>, and <code>starting_after</code>.
                            </p>

                            <div className="bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 p-4 rounded-lg my-8">
                                <strong>Note:</strong> The API is currently in Beta and available only to Enterprise Grocer partners. If you wish to request an API key, please contact support@farmtogrocer.com.
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
