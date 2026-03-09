// Farm-to-Grocer MVP - Footer Component
// Path: components/Footer.tsx
//
// A comprehensive footer component with:
// - Multi-column link sections
// - Newsletter subscription form
// - Social media links
// - Contact information
// - Legal links and copyright
// - Responsive design

"use client";

import * as React from "react";
import Link from "next/link";
import {
  Leaf,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  Heart,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

// ============================================
// FOOTER CONFIGURATION
// ============================================

const footerLinks = {
  platform: {
    title: "Platform",
    links: [
      { label: "How It Works", href: "/how-it-works" },
      { label: "For Farmers", href: "/for-farmers" },
      { label: "For Grocers", href: "/for-grocers" },
      { label: "Pricing", href: "/pricing" },
      { label: "Marketplace", href: "/marketplace" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Mission", href: "/mission" },
      { label: "Careers", href: "/careers", badge: "Hiring" },
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
    ],
  },
  resources: {
    title: "Resources",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "FAQs", href: "/faq" },
      { label: "Farmer Guide", href: "/guides/farmers" },
      { label: "Grocer Guide", href: "/guides/grocers" },
      { label: "API Documentation", href: "/docs/api", external: true },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
};

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/farmtogrocer", icon: Facebook },
  { label: "Twitter", href: "https://twitter.com/farmtogrocer", icon: Twitter },
  { label: "Instagram", href: "https://instagram.com/farmtogrocer", icon: Instagram },
  { label: "LinkedIn", href: "https://linkedin.com/company/farmtogrocer", icon: Linkedin },
  { label: "YouTube", href: "https://youtube.com/@farmtogrocer", icon: Youtube },
];

const contactInfo = {
  email: "hello@farmtogrocer.com",
  phone: "(555) 123-4567",
  address: "123 Farm Lane, Austin, TX 78701",
};

// ============================================
// FOOTER COMPONENT
// ============================================

export interface FooterProps {
  /**
   * Show newsletter subscription form
   */
  showNewsletter?: boolean;

  /**
   * Simplified footer (fewer links)
   */
  minimal?: boolean;

  /**
   * Custom className
   */
  className?: string;
}

export function Footer({
  showNewsletter = true,
  minimal = false,
  className,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "bg-muted/30 border-t",
        className
      )}
      role="contentinfo"
    >
      {/* Newsletter Section */}
      {showNewsletter && !minimal && (
        <div className="border-b">
          <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="text-center lg:text-left">
                <h3 className="text-xl font-semibold">
                  Stay updated with Farm to Grocer
                </h3>
                <p className="text-muted-foreground mt-1">
                  Get the latest news, tips, and updates delivered to your inbox.
                </p>
              </div>
              <NewsletterForm />
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {minimal ? (
          // Minimal Footer
          <MinimalFooterContent />
        ) : (
          // Full Footer
          <FullFooterContent />
        )}
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {currentYear} Farm to Grocer. All rights reserved.
            </p>

            {/* Made with love */}
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for local farmers
            </p>

            {/* Social Links (Mobile) */}
            <div className="flex items-center gap-3 sm:hidden">
              {socialLinks.slice(0, 4).map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// NEWSLETTER FORM COMPONENT
// ============================================

function NewsletterForm() {
  const [email, setEmail] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // In production, call your newsletter API
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   body: JSON.stringify({ email }),
      // });

      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-950/30 px-4 py-3 rounded-lg">
        <Leaf className="h-5 w-5" />
        <span className="font-medium">Thanks for subscribing!</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className={cn(
            "w-full sm:w-72 pl-10 pr-4 py-2.5 rounded-lg border bg-background",
            "text-sm placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            error && "border-destructive"
          )}
        />
      </div>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          "Subscribing..."
        ) : (
          <>
            Subscribe
            <ArrowRight className="h-4 w-4 ml-2" />
          </>
        )}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </form>
  );
}

// ============================================
// FULL FOOTER CONTENT
// ============================================

function FullFooterContent() {
  return (
    <div className="grid gap-8 lg:grid-cols-6">
      {/* Brand Column */}
      <div className="lg:col-span-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-4">
          <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
            <Leaf className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">Farm to Grocer</span>
        </Link>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-6 max-w-xs">
          Connecting local farmers directly with grocers and restaurants for fresher produce and fairer prices.
        </p>

        {/* Contact Info */}
        <div className="space-y-3">
          <a
            href={`mailto:${contactInfo.email}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" />
            {contactInfo.email}
          </a>
          <a
            href={`tel:${contactInfo.phone.replace(/\D/g, "")}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Phone className="h-4 w-4" />
            {contactInfo.phone}
          </a>
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            {contactInfo.address}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3 mt-6">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "h-9 w-9 rounded-lg flex items-center justify-center",
                "bg-muted text-muted-foreground",
                "hover:bg-primary hover:text-primary-foreground",
                "transition-colors"
              )}
              aria-label={social.label}
            >
              <social.icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      {/* Link Columns */}
      {Object.entries(footerLinks).map(([key, section]) => (
        <div key={key}>
          <h4 className="font-semibold mb-4">{section.title}</h4>
          <ul className="space-y-3">
            {section.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm text-muted-foreground hover:text-foreground transition-colors",
                    "inline-flex items-center gap-1"
                  )}
                  {...('external' in link && link.external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {link.label}
                  {'external' in link && link.external && <ExternalLink className="h-3 w-3" />}
                  {'badge' in link && link.badge && (
                    <span className="ml-1 px-1.5 py-0.5 text-xs font-medium rounded bg-primary/10 text-primary">
                      {link.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ============================================
// MINIMAL FOOTER CONTENT
// ============================================

function MinimalFooterContent() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <Leaf className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold">Farm to Grocer</span>
      </Link>

      {/* Quick Links */}
      <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <Link
          href="/about"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          About
        </Link>
        <Link
          href="/help"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Help
        </Link>
        <Link
          href="/terms"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Terms
        </Link>
        <Link
          href="/privacy"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Privacy
        </Link>
        <Link
          href="/contact"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Contact
        </Link>
      </nav>

      {/* Social Links */}
      <div className="flex items-center gap-3">
        {socialLinks.slice(0, 4).map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label={social.label}
          >
            <social.icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </div>
  );
}

// ============================================
// SIMPLE FOOTER COMPONENT (Alternative)
// ============================================

export function SimpleFooter({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t py-6",
        className
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="font-semibold">Farm to Grocer</span>
          </Link>

          <p className="text-sm text-muted-foreground">
            © {currentYear} Farm to Grocer. All rights reserved.
          </p>

          <nav className="flex items-center gap-4">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// EXPORTS
// ============================================

export default Footer;
