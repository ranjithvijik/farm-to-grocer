// Farm-to-Grocer MVP - Landing Page
// Path: app/page.tsx
//
// A comprehensive marketing landing page with:
// - Hero section with dual CTA (Farmer/Grocer)
// - Features/benefits section
// - How it works steps
// - Statistics/social proof
// - Testimonials carousel
// - Featured products preview
// - FAQ section
// - Final CTA section
// - Footer

import Link from "next/link";
import Image from "next/image";
import {
  Leaf,
  Store,
  ShieldCheck,
  TrendingUp,
  Clock,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle,
  Users,
  Package,
  DollarSign,
  ChevronRight,
  Quote,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// ============================================
// METADATA
// ============================================

export const metadata = {
  title: "Farm to Grocer | Fresh Local Produce Marketplace",
  description:
    "Connect directly with local farmers for fresh, sustainable produce. The modern B2B marketplace bridging farms and grocery stores.",
};

// ============================================
// LANDING PAGE COMPONENT
// ============================================

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <Navbar transparent />

      <main className="flex-1">
        {/* ════════════════════════════════════════════════════════════
            HERO SECTION
        ════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-farm-50 via-white to-green-50 dark:from-farm-950 dark:via-background dark:to-green-950">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-farm-200 blur-3xl" />
            <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-green-200 blur-3xl" />
          </div>

          <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full bg-farm-100 dark:bg-farm-900/50 px-4 py-1.5 text-sm font-medium text-farm-700 dark:text-farm-300 mb-6">
                  <Leaf className="h-4 w-4" />
                  <span>Supporting Local Agriculture</span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                  Fresh From Farm
                  <br />
                  <span className="text-primary">Direct to Your Store</span>
                </h1>

                {/* Subheadline */}
                <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                  Connect directly with local farmers for the freshest produce at wholesale prices.
                  No middlemen, no markups — just farm-fresh quality delivered to your door.
                </p>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="xl" asChild>
                    <Link href="/register?role=grocer" className="flex items-center">
                      <Store className="h-5 w-5 mr-2" />
                      I'm a Grocer
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Link>
                  </Button>
                  <Button size="xl" variant="outline" asChild>
                    <Link href="/register?role=farmer" className="flex items-center">
                      <Leaf className="h-5 w-5 mr-2" />
                      I'm a Farmer
                    </Link>
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-10 flex flex-wrap items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Free to join</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div className="relative">
                <div className="relative aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/hero-farm.jpg"
                    alt="Fresh produce from local farms"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay Card */}
                  <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">$2M+</p>
                        <p className="text-sm text-muted-foreground">Monthly transactions</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground rounded-full px-4 py-2 shadow-lg hidden lg:flex items-center gap-2">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-semibold">4.9 Rating</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            STATS SECTION
        ════════════════════════════════════════════════════════════ */}
        <section className="border-y bg-muted/30">
          <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {[
                { value: "500+", label: "Local Farmers", icon: Leaf },
                { value: "1,200+", label: "Grocers & Restaurants", icon: Store },
                { value: "50K+", label: "Orders Delivered", icon: Package },
                { value: "98%", label: "Satisfaction Rate", icon: Star },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            FEATURES SECTION
        ════════════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Why Choose Farm to Grocer?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We're building the future of local food distribution — connecting farmers directly
                with grocers for fresher produce and fairer prices.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Leaf,
                  title: "Farm Fresh Quality",
                  description:
                    "Get produce harvested at peak freshness, delivered within 24-48 hours of picking.",
                  color: "text-green-600 bg-green-100 dark:bg-green-900/50",
                },
                {
                  icon: DollarSign,
                  title: "Wholesale Prices",
                  description:
                    "Cut out the middlemen and save 15-30% on your produce costs with direct farm pricing.",
                  color: "text-blue-600 bg-blue-100 dark:bg-blue-900/50",
                },
                {
                  icon: MapPin,
                  title: "Support Local",
                  description:
                    "Build relationships with farmers in your community and reduce your carbon footprint.",
                  color: "text-amber-600 bg-amber-100 dark:bg-amber-900/50",
                },
                {
                  icon: ShieldCheck,
                  title: "Quality Guaranteed",
                  description:
                    "Every farmer is verified and rated. If you're not satisfied, we'll make it right.",
                  color: "text-purple-600 bg-purple-100 dark:bg-purple-900/50",
                },
                {
                  icon: Clock,
                  title: "Reliable Delivery",
                  description:
                    "Schedule deliveries that work for your business. Track orders in real-time.",
                  color: "text-cyan-600 bg-cyan-100 dark:bg-cyan-900/50",
                },
                {
                  icon: TrendingUp,
                  title: "Grow Your Business",
                  description:
                    "Access analytics, manage inventory, and scale your operations with our tools.",
                  color: "text-rose-600 bg-rose-100 dark:bg-rose-900/50",
                },
              ].map((feature, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.color} mb-4`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            HOW IT WORKS SECTION
        ════════════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                How It Works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Get started in minutes. It's simple, fast, and free.
              </p>
            </div>

            {/* Tabs for Farmer/Grocer */}
            <div className="max-w-4xl mx-auto">
              {/* For Grocers */}
              <div className="mb-12">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                    <Store className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold">For Grocers</h3>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    {
                      step: "1",
                      title: "Create Account",
                      description: "Sign up for free and tell us about your business.",
                    },
                    {
                      step: "2",
                      title: "Browse & Order",
                      description: "Explore products from verified local farmers and place orders.",
                    },
                    {
                      step: "3",
                      title: "Receive Fresh Produce",
                      description: "Get farm-fresh deliveries on your schedule.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{item.title}</h4>
                          <p className="text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                      {index < 2 && (
                        <div className="hidden md:block absolute top-5 left-[calc(100%-1rem)] w-8">
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* For Farmers */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold">For Farmers</h3>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  {[
                    {
                      step: "1",
                      title: "List Your Products",
                      description: "Create your farm profile and add your available produce.",
                    },
                    {
                      step: "2",
                      title: "Receive Orders",
                      description: "Get notified when grocers place orders for your products.",
                    },
                    {
                      step: "3",
                      title: "Deliver & Get Paid",
                      description: "Fulfill orders and receive secure payments directly.",
                    },
                  ].map((item, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{item.title}</h4>
                          <p className="text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                      {index < 2 && (
                        <div className="hidden md:block absolute top-5 left-[calc(100%-1rem)] w-8">
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            TESTIMONIALS SECTION
        ════════════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Loved by Farmers & Grocers
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                See what our community has to say about Farm to Grocer.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  quote:
                    "Farm to Grocer has transformed how we source produce. Direct connections with local farmers mean fresher products and better margins for our store.",
                  author: "John Martinez",
                  role: "Owner, Fresh Market Grocery",
                  avatar: "JM",
                  type: "grocer",
                },
                {
                  quote:
                    "I've increased my farm's revenue by 40% since joining. The platform makes it easy to reach new customers and manage orders efficiently.",
                  author: "Sarah Chen",
                  role: "Chen Family Farms",
                  avatar: "SC",
                  type: "farmer",
                },
                {
                  quote:
                    "The quality guarantee gives us confidence to try new suppliers. We've discovered amazing local farms we never knew existed.",
                  author: "Michael Thompson",
                  role: "Head Chef, The Green Table",
                  avatar: "MT",
                  type: "grocer",
                },
                {
                  quote:
                    "Finally, a platform that understands farmers. Fair prices, reliable payments, and a team that actually cares about agriculture.",
                  author: "Robert Williams",
                  role: "Williams Organic Farm",
                  avatar: "RW",
                  type: "farmer",
                },
                {
                  quote:
                    "Our customers love knowing exactly where their food comes from. Farm to Grocer helps us tell that story.",
                  author: "Emily Davis",
                  role: "Manager, Neighborhood Co-op",
                  avatar: "ED",
                  type: "grocer",
                },
                {
                  quote:
                    "The delivery scheduling feature is a game-changer. I can plan my harvests around actual orders instead of guessing.",
                  author: "James Wilson",
                  role: "Sunrise Valley Farm",
                  avatar: "JW",
                  type: "farmer",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="relative">
                  <CardContent className="p-6">
                    <Quote className="h-8 w-8 text-primary/20 mb-4" />
                    <p className="text-foreground mb-6">{testimonial.quote}</p>
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-10 w-10 rounded-full flex items-center justify-center font-bold text-white ${testimonial.type === "farmer" ? "bg-green-600" : "bg-primary"
                          }`}
                      >
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    {/* Type Badge */}
                    <div className="absolute top-4 right-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${testimonial.type === "farmer"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300"
                          : "bg-primary/10 text-primary"
                          }`}
                      >
                        {testimonial.type === "farmer" ? (
                          <Leaf className="h-3 w-3" />
                        ) : (
                          <Store className="h-3 w-3" />
                        )}
                        {testimonial.type === "farmer" ? "Farmer" : "Grocer"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            FAQ SECTION
        ════════════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Got questions? We've got answers.
                </p>
              </div>

              {/* FAQ Items */}
              <div className="space-y-4">
                {[
                  {
                    question: "Is it free to join Farm to Grocer?",
                    answer:
                      "Yes! Creating an account is completely free for both farmers and grocers. We only charge a small transaction fee when orders are completed.",
                  },
                  {
                    question: "How do you verify farmers?",
                    answer:
                      "All farmers go through a verification process that includes business documentation, farm location verification, and quality standards review. We also collect and display customer ratings.",
                  },
                  {
                    question: "What's the minimum order size?",
                    answer:
                      "Minimum order sizes are set by individual farmers based on their operations. Many farmers offer flexible minimums for new customers.",
                  },
                  {
                    question: "How does delivery work?",
                    answer:
                      "Farmers handle their own deliveries or use our partner logistics network. You can schedule deliveries based on your business needs and track orders in real-time.",
                  },
                  {
                    question: "What if I'm not satisfied with my order?",
                    answer:
                      "We have a quality guarantee. If produce doesn't meet your expectations, contact us within 24 hours and we'll work with the farmer to make it right or issue a refund.",
                  },
                ].map((faq, index) => (
                  <details
                    key={index}
                    className="group rounded-lg border bg-card p-4 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4">
                      <h3 className="font-semibold">{faq.question}</h3>
                      <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-90" />
                    </summary>
                    <p className="mt-4 text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}
              </div>

              {/* More Questions CTA */}
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Still have questions?{" "}
                  <Link href="/contact" className="text-primary hover:underline font-medium">
                    Contact our team
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════
            FINAL CTA SECTION
        ════════════════════════════════════════════════════════════ */}
        <section className="py-20 lg:py-28 bg-gradient-to-br from-primary to-farm-700 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white blur-3xl" />
          </div>

          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
              Join hundreds of farmers and grocers already building sustainable food systems together.
              Sign up today and start connecting with your local food community.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="secondary" asChild>
                <Link href="/register?role=grocer" className="flex items-center">
                  <Store className="h-5 w-5 mr-2" />
                  Get Started as Grocer
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link href="/register?role=farmer" className="flex items-center">
                  <Leaf className="h-5 w-5 mr-2" />
                  Join as Farmer
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span>1,700+ Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
