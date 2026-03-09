// Farm-to-Grocer MVP — Premium Landing Page (High Contrast)
// Path: app/page.tsx

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
  Sprout,
  Truck,
  Award,
  Heart,
  BarChart3,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata = {
  title: "Farm to Grocer | Fresh Local Produce Marketplace",
  description:
    "Connect directly with local farmers for fresh, sustainable produce. The modern B2B marketplace bridging farms and grocery stores.",
};

// ─── Constants ─────────────────────────────────────────────────────────────

// Dark near-black for body text
const C_DARK = "hsl(24,10%,8%)";
// Slightly softer but still high-contrast for secondary text
const C_MED = "hsl(24,8%,22%)";
// Muted but still ≥ 4.5:1 contrast on white
const C_MUTED = "hsl(24,6%,35%)";
// Primary green
const C_GREEN = "hsl(142,60%,28%)";
// Green for icons on cream
const C_G_ICON = "hsl(142,55%,32%)";
// Cream bg
const C_CREAM = "hsl(42,50%,96%)";
// Sage bg
const C_SAGE = "hsl(100,22%,94%)";

// ─── Data ──────────────────────────────────────────────────────────────────

const STATS = [
  { value: "340+", label: "Verified Farms", icon: Sprout },
  { value: "$2M+", label: "Monthly Transactions", icon: DollarSign },
  { value: "1,200+", label: "Grocery Partners", icon: Store },
  { value: "98%", label: "On-Time Delivery", icon: Truck },
];

const FEATURES = [
  {
    icon: Zap,
    title: "Real-Time Availability",
    desc: "See live inventory and harvest schedules from all your connected farms in one dashboard.",
    color: "bg-amber-100 text-amber-900",
  },
  {
    icon: ShieldCheck,
    title: "Verified Quality Standards",
    desc: "Every farm is vetted for GAP certification, USDA organic, or equivalent quality marks.",
    color: "bg-emerald-100 text-emerald-900",
  },
  {
    icon: TrendingUp,
    title: "Market-Competitive Pricing",
    desc: "Wholesale rates direct from the source — skip the distributor markup.",
    color: "bg-blue-100 text-blue-900",
  },
  {
    icon: Truck,
    title: "Flexible Delivery Options",
    desc: "Farm-direct delivery, coordinated drops, or local pickup — your schedule.",
    color: "bg-violet-100 text-violet-900",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Track spend, top products, seasonal trends, and supplier performance effortlessly.",
    color: "bg-rose-100 text-rose-900",
  },
  {
    icon: Heart,
    title: "Community Impact",
    desc: "Every order strengthens local agriculture, reduces food miles, and supports family farms.",
    color: "bg-orange-100 text-orange-900",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Create Your Account",
    desc: "Sign up as a grocer or farmer in under 2 minutes. Every profile is verified to keep the platform trustworthy.",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80",
  },
  {
    step: "02",
    title: "Browse & Connect",
    desc: "Explore verified local farms near you. Filter by certification, delivery day, product category, or price.",
    img: "https://images.unsplash.com/photo-1592457764956-8b1b0cd8bc47?w=600&q=80",
  },
  {
    step: "03",
    title: "Order with Confidence",
    desc: "Place orders directly, message your farmer, and track delivery in real time — all in one place.",
    img: "https://images.unsplash.com/photo-1560493676-04915de9ecd5?w=600&q=80",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Chen",
    role: "Head Buyer, Green Leaf Markets",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=200&q=80",
    quote: "Farm to Grocer saved us 18% on produce costs in the first quarter while improving freshness dramatically.",
    stars: 5,
    farm: "Works with Agriberry Farms",
  },
  {
    name: "James Fullbright",
    role: "Owner, Fullbright Farm",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    quote: "Before Farm to Grocer I spent hours chasing orders by phone. Now I list once and grocers come to me. Revenue is up 40%.",
    stars: 5,
    farm: "Serves 12 grocery partners",
  },
  {
    name: "Maria Torres",
    role: "Produce Manager, Corner Fresh Co.",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=200&q=80",
    quote: "The quality filtering tools are incredible. I schedule recurring orders and never run out of seasonal staples.",
    stars: 5,
    farm: "Orders 3x per week",
  },
];

const GALLERY = [
  { src: "https://images.unsplash.com/photo-1506484381205-f7945653044d?w=800&q=80", alt: "Fresh vegetables" },
  { src: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=800&q=80", alt: "Strawberries" },
  { src: "https://images.unsplash.com/photo-1560493676-04915de9ecd5?w=800&q=80", alt: "Farm at sunrise" },
  { src: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=800&q=80", alt: "Blueberries" },
  { src: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&q=80", alt: "Farm eggs" },
  { src: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&q=80", alt: "Farm landscape" },
];

// ─── Page ──────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <Navbar transparent />

      <main className="flex-1">

        {/* ══════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════ */}
        <section
          className="relative min-h-screen flex items-center overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${C_CREAM} 0%, hsl(100,30%,93%) 50%, hsl(42,40%,91%) 100%)` }}
        >
          {/* Decorative blobs */}
          <div className="absolute top-20 -left-40 w-96 h-96 rounded-full opacity-40 blur-3xl animate-float-slow bg-green-200 pointer-events-none" />
          <div className="absolute bottom-10 -right-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl bg-amber-200 pointer-events-none" style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '2s' }} />

          <div className="container relative mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 items-center">

              {/* Left — Text */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold mb-8 animate-fade-in-down"
                  style={{ background: 'hsl(142,71%,45%,0.14)', color: C_GREEN }}
                >
                  <Leaf className="h-3.5 w-3.5" />
                  Supporting Local Agriculture
                </div>

                {/* Headline */}
                <h1
                  className="font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-[4.5rem] animate-fade-in-up animation-delay-100"
                  style={{ color: C_DARK, lineHeight: 1.08 }}
                >
                  Farm Fresh.{" "}
                  <span className="relative inline-block">
                    <span style={{ color: C_GREEN }}>Direct to</span>
                    <span
                      className="absolute -bottom-1 left-0 h-1 w-full rounded-full animate-fade-in-right animation-delay-500"
                      style={{ background: C_G_ICON }}
                    />
                  </span>
                  <br />Your Store.
                </h1>

                <p
                  className="mt-8 text-lg font-medium leading-relaxed max-w-lg mx-auto lg:mx-0 animate-fade-in-up animation-delay-200"
                  style={{ color: C_MED }}
                >
                  The B2B marketplace that connects grocery buyers directly with verified local farms —
                  no middlemen, better prices, and produce that arrives fresher than anything from a distributor.
                </p>

                {/* CTAs */}
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-300">
                  <Link
                    href="/register?role=grocer"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl animate-pulse-glow"
                    style={{ background: 'hsl(142,71%,38%)', color: 'white' }}
                  >
                    <Store className="h-5 w-5" />
                    I&apos;m a Grocer
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/register?role=farmer"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-base font-bold border-2 transition-all duration-300 hover:scale-105"
                    style={{ borderColor: 'hsl(142,71%,38%)', color: C_GREEN, background: 'transparent' }}
                  >
                    <Leaf className="h-5 w-5" />
                    I&apos;m a Farmer
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>

                {/* Trust badges */}
                <div className="mt-10 flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-400">
                  {["340+ Verified Farms", "No Subscription Fees", "Same-week delivery"].map((t) => (
                    <span key={t} className="inline-flex items-center gap-1.5 text-sm font-semibold" style={{ color: C_MED }}>
                      <CheckCircle className="h-4 w-4" style={{ color: C_G_ICON }} />
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right — Floating Images */}
              <div className="relative h-[500px] lg:h-[600px] animate-fade-in-right animation-delay-200">
                {/* Main image */}
                <div
                  className="absolute right-0 top-0 w-[85%] h-[75%] rounded-3xl overflow-hidden shadow-2xl animate-float"
                  style={{ boxShadow: '0 30px 80px hsl(142,50%,20%,0.22)' }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&q=80"
                    alt="Farmers market fresh produce"
                    fill className="object-cover"
                    priority
                  />
                </div>
                {/* Secondary image */}
                <div
                  className="absolute left-0 bottom-0 w-[55%] h-[45%] rounded-2xl overflow-hidden shadow-xl"
                  style={{ animation: 'float 5s ease-in-out infinite', animationDelay: '1.5s', boxShadow: '0 20px 60px hsl(142,50%,20%,0.18)' }}
                >
                  <Image
                    src="https://images.unsplash.com/photo-1528825871115-3581a5387919?w=600&q=80"
                    alt="Fresh organic vegetables"
                    fill className="object-cover"
                  />
                </div>
                {/* Stat card */}
                <div
                  className="absolute right-4 bottom-8 rounded-2xl p-4 shadow-2xl animate-scale-in animation-delay-500"
                  style={{ background: 'rgba(255,255,255,0.96)', border: '1px solid rgba(0,0,0,0.08)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl flex items-center justify-center" style={{ background: 'hsl(142,71%,45%,0.14)' }}>
                      <TrendingUp className="h-5 w-5" style={{ color: C_GREEN }} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold font-display" style={{ color: C_DARK }}>$2M+</p>
                      <p className="text-xs font-semibold" style={{ color: C_MUTED }}>Monthly transactions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" className="w-full" style={{ color: C_CREAM }}>
              <path d="M0 80L1440 80L1440 40C1200 80 960 10 720 40C480 70 240 10 0 40L0 80Z" fill="currentColor" />
            </svg>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            STATS STRIP
        ══════════════════════════════════════════════════ */}
        <section className="py-14" style={{ background: C_CREAM }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`flex flex-col items-center gap-2 p-6 rounded-2xl text-center animate-fade-in-up animation-delay-${(i + 1) * 100}`}
                  style={{ background: 'white', boxShadow: '0 2px 20px rgba(0,0,0,0.07)' }}
                >
                  <div className="h-12 w-12 rounded-xl flex items-center justify-center mb-1" style={{ background: 'hsl(142,71%,45%,0.12)' }}>
                    <s.icon className="h-6 w-6" style={{ color: C_G_ICON }} />
                  </div>
                  <p className="text-3xl font-bold font-display" style={{ color: C_DARK }}>{s.value}</p>
                  <p className="text-sm font-semibold" style={{ color: C_MUTED }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            GALLERY STRIP (infinite scroll)
        ══════════════════════════════════════════════════ */}
        <section className="py-4 overflow-hidden" style={{ background: 'hsl(100,20%,92%)' }}>
          {/* animate-marquee is defined in globals.css — no SSR hydration issues */}
          <div className="flex gap-4 w-max animate-marquee">
            {[...GALLERY, ...GALLERY].map((img, i) => (
              <div key={i} className="relative flex-shrink-0 h-44 w-72 rounded-2xl overflow-hidden shadow-md">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="288px"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            FEATURES GRID
        ══════════════════════════════════════════════════ */}
        <section className="py-24" style={{ background: C_CREAM }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: C_GREEN }}>
                Why Farm to Grocer
              </p>
              <h2 className="font-display text-4xl font-bold sm:text-5xl" style={{ color: C_DARK }}>
                Everything You Need to Source Local
              </h2>
              <p className="mt-5 text-lg font-medium max-w-2xl mx-auto" style={{ color: C_MED }}>
                Purpose-built tools for modern grocery procurement and farm sales — all in one platform.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((f, i) => (
                <div
                  key={f.title}
                  className={`group p-7 rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-fade-in-up animation-delay-${(i % 4 + 1) * 100}`}
                  style={{ background: 'white', borderColor: 'hsl(142,15%,88%)' }}
                >
                  <div className={`h-11 w-11 rounded-xl flex items-center justify-center mb-5 ${f.color}`}>
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 font-display" style={{ color: C_DARK }}>{f.title}</h3>
                  <p className="text-sm font-medium leading-relaxed" style={{ color: C_MED }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            HOW IT WORKS
        ══════════════════════════════════════════════════ */}
        <section className="py-24" style={{ background: C_SAGE }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 animate-fade-in-up">
              <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: C_GREEN }}>
                Getting Started
              </p>
              <h2 className="font-display text-4xl font-bold sm:text-5xl" style={{ color: C_DARK }}>
                Up and Running in 3 Steps
              </h2>
            </div>

            <div className="space-y-24">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.step} className={`grid lg:grid-cols-2 gap-12 items-center`}>
                  <div className={`space-y-5 animate-fade-in-${i % 2 === 0 ? "left" : "right"} animation-delay-200 ${i % 2 === 1 ? "lg:order-last" : ""}`}>
                    <span className="inline-block font-display text-7xl font-bold opacity-15" style={{ color: C_GREEN }}>
                      {step.step}
                    </span>
                    <h3 className="font-display text-3xl font-bold -mt-4" style={{ color: C_DARK }}>{step.title}</h3>
                    <p className="text-lg font-medium leading-relaxed" style={{ color: C_MED }}>{step.desc}</p>
                    <Link
                      href="/register"
                      className="inline-flex items-center gap-2 font-bold transition-all hover:gap-3"
                      style={{ color: C_GREEN }}
                    >
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                  <div
                    className={`relative h-72 lg:h-96 rounded-3xl overflow-hidden shadow-2xl animate-scale-in animation-delay-300 ${i % 2 === 1 ? "lg:order-first" : ""}`}
                  >
                    <Image src={step.img} alt={step.title} fill className="object-cover" sizes="(min-width:1024px) 50vw, 100vw" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, hsl(30,15%,10%,0.12), transparent)' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            FULL-BLEED BRAND SECTION
        ══════════════════════════════════════════════════ */}
        <section className="relative py-28 text-center text-white overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600&q=80"
              alt="Golden farm field at sunset"
              fill className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, hsl(142,60%,10%,0.88), hsl(30,50%,10%,0.78))' }} />
          </div>
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in-up">
            <Leaf className="h-12 w-12 mx-auto mb-6 opacity-80" />
            <h2 className="font-display text-4xl font-bold sm:text-5xl lg:text-6xl mb-6">
              Local Food Systems.<br />
              <span style={{ color: 'hsl(42,100%,80%)' }}>Strengthened Together.</span>
            </h2>
            <p className="text-xl font-medium max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: 'rgba(255,255,255,0.9)' }}>
              Every order through Farm to Grocer keeps money in local communities,
              reduces transportation emissions, and ensures you serve the freshest produce possible.
            </p>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-base font-bold transition-all duration-300 hover:scale-105"
              style={{ background: 'hsl(42,100%,55%)', color: 'hsl(30,15%,8%)' }}
            >
              Browse the Marketplace
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            TESTIMONIALS
        ══════════════════════════════════════════════════ */}
        <section className="py-24" style={{ background: C_CREAM }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in-up">
              <p className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: C_GREEN }}>
                Real People, Real Results
              </p>
              <h2 className="font-display text-4xl font-bold sm:text-5xl" style={{ color: C_DARK }}>
                What Our Community Says
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-7">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name}
                  className={`p-7 rounded-2xl border animate-fade-in-up animation-delay-${(i + 1) * 200}`}
                  style={{ background: 'white', borderColor: 'hsl(142,15%,88%)', boxShadow: '0 4px 24px rgba(0,0,0,0.07)' }}
                >
                  <Quote className="h-8 w-8 mb-4" style={{ color: 'hsl(142,55%,55%)' }} />
                  <p className="text-base font-medium leading-relaxed mb-6" style={{ color: C_MED }}>
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: t.stars }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-current" style={{ color: 'hsl(45,93%,40%)' }} />
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'hsl(142,15%,90%)' }}>
                    <div className="relative h-11 w-11 rounded-full overflow-hidden flex-shrink-0">
                      <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="44px" />
                    </div>
                    <div>
                      <p className="font-bold text-sm" style={{ color: C_DARK }}>{t.name}</p>
                      <p className="text-xs font-medium" style={{ color: C_MUTED }}>{t.role}</p>
                      <p className="text-xs font-bold mt-0.5" style={{ color: C_GREEN }}>{t.farm}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            DUAL CTA CARDS
        ══════════════════════════════════════════════════ */}
        <section className="py-20" style={{ background: C_SAGE }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Grocer */}
              <div
                className="relative overflow-hidden rounded-3xl p-10 text-white animate-fade-in-left"
                style={{ background: 'linear-gradient(135deg, hsl(142,60%,24%) 0%, hsl(150,55%,16%) 100%)' }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-white" />
                <Store className="h-10 w-10 mb-6 opacity-90" />
                <h3 className="font-display text-3xl font-bold mb-3">For Grocers</h3>
                <p className="font-medium mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  Streamline your produce sourcing. Access 340+ local farms, manage orders, and cut costs by up to 25%.
                </p>
                <ul className="space-y-2 mb-8">
                  {["Browse real-time farm inventory", "Negotiate direct pricing", "Flexible delivery scheduling"].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.95)' }}>
                      <CheckCircle className="h-4 w-4 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register?role=grocer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{ background: 'white', color: 'hsl(142,60%,24%)' }}
                >
                  Sign Up as a Grocer <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Farmer */}
              <div
                className="relative overflow-hidden rounded-3xl p-10 text-white animate-fade-in-right"
                style={{ background: 'linear-gradient(135deg, hsl(30,70%,32%) 0%, hsl(25,65%,22%) 100%)' }}
              >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10 bg-white" />
                <Leaf className="h-10 w-10 mb-6 opacity-90" />
                <h3 className="font-display text-3xl font-bold mb-3">For Farmers</h3>
                <p className="font-medium mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  Grow your wholesale revenue. List products once and connect with grocery buyers who come to you.
                </p>
                <ul className="space-y-2 mb-8">
                  {["List harvest in under 5 minutes", "Receive orders while you farm", "Get paid reliably and on time"].map(item => (
                    <li key={item} className="flex items-center gap-2 text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.95)' }}>
                      <CheckCircle className="h-4 w-4 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/register?role=farmer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all hover:scale-105"
                  style={{ background: 'white', color: 'hsl(30,70%,32%)' }}
                >
                  Sign Up as a Farmer <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════
            TRUST BAR
        ══════════════════════════════════════════════════ */}
        <section className="py-14 border-t border-b" style={{ background: C_CREAM, borderColor: 'hsl(142,12%,88%)' }}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-bold uppercase tracking-widest mb-10" style={{ color: C_MUTED }}>
              Trusted by the Best in Regional Food Distribution
            </p>
            <div className="flex flex-wrap justify-center items-center gap-12">
              {["USDA Certified", "B Corp Pending", "GAP Approved", "Farm Bureau Member", "Baltimore Food Hub"].map((name) => (
                <div key={name} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                  <Award className="h-5 w-5" style={{ color: C_G_ICON }} />
                  <span className="text-sm font-bold" style={{ color: C_DARK }}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
