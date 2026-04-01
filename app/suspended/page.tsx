// Farm-to-Grocer MVP - Suspended Account Page
// Path: app/suspended/page.tsx
//
// A user-friendly suspended account page with:
// - Clear explanation of account status
// - Possible reasons for suspension
// - Contact support options
// - Sign out functionality
// - Appeal process information

import { Metadata } from "next";
import Link from "next/link";
import {
  AlertOctagon,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  FileText,
  Clock,
  ShieldAlert,
  Leaf,
  ExternalLink,
} from "lucide-react";
import { SignOutButton } from "@/components/sign-out-button";

// ============================================
// METADATA
// ============================================

export const metadata: Metadata = {
  title: "Account Suspended",
  description: "Your Farm to Grocer account has been suspended. Contact support for assistance.",
};

// ============================================
// SUSPENDED PAGE COMPONENT
// ============================================

export default function SuspendedPage() {
  // In dev mode, this is a simple static page. Auth checks are client-side.
  const session = { user: { name: "User", email: "user@example.com" } };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-red-950/30 dark:via-background dark:to-orange-950/30">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-red-200/20 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-orange-200/20 blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <Leaf className="h-7 w-7" />
            <span>Farm to Grocer</span>
          </div>
          <SignOutButton />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Alert Icon */}
          <div className="flex justify-center mb-8">
            <div className="h-24 w-24 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <AlertOctagon className="h-12 w-12 text-red-600 dark:text-red-400" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Account Suspended
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              Your Farm to Grocer account has been temporarily suspended.
              We're here to help you resolve this issue.
            </p>
          </div>

          {/* User Info Card */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center">
                <ShieldAlert className="h-7 w-7 text-muted-foreground" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{session.user.name}</p>
                <p className="text-sm text-muted-foreground">{session.user.email}</p>
                <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                  <Clock className="h-3 w-3" />
                  Account Suspended
                </span>
              </div>
            </div>
          </div>

          {/* Possible Reasons */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-muted-foreground" />
              Possible Reasons for Suspension
            </h2>
            <ul className="space-y-3">
              {[
                "Violation of our Terms of Service or Community Guidelines",
                "Suspicious account activity or security concerns",
                "Outstanding payment issues or disputes",
                "Multiple customer complaints or negative reviews",
                "Providing inaccurate or misleading information",
                "Failure to complete required verification steps",
              ].map((reason, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          {/* What You Can Do */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              What You Can Do
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Review Our Policies</p>
                  <p className="text-sm text-muted-foreground">
                    Check our{" "}
                    <Link href="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/community-guidelines" className="text-primary hover:underline">
                      Community Guidelines
                    </Link>{" "}
                    to understand what may have caused the suspension.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Contact Support</p>
                  <p className="text-sm text-muted-foreground">
                    Reach out to our support team for more information about your specific case
                    and to discuss next steps.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium text-foreground">Submit an Appeal</p>
                  <p className="text-sm text-muted-foreground">
                    If you believe this suspension was made in error, you can submit a formal
                    appeal for review by our team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Contact Support</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Email */}
              <a
                href="mailto:support@farmtogrocer.com?subject=Account%20Suspension%20Appeal"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-center"
              >
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="font-medium text-sm">Email Us</span>
                <span className="text-xs text-muted-foreground">support@farmtogrocer.com</span>
              </a>

              {/* Phone */}
              <a
                href="tel:+1-800-555-0123"
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-center"
              >
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="font-medium text-sm">Call Us</span>
                <span className="text-xs text-muted-foreground">1-800-555-0123</span>
              </a>

              {/* Live Chat */}
              <button
                className="flex flex-col items-center gap-2 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-center"
                onClick={() => {
                  // Trigger live chat widget
                  // window.Intercom?.('show');
                }}
              >
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <span className="font-medium text-sm">Live Chat</span>
                <span className="text-xs text-muted-foreground">Available 9am-5pm EST</span>
              </button>
            </div>
          </div>

          {/* Appeal Form Link */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Submit an Appeal</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  If you believe your account was suspended in error, you can submit a formal
                  appeal. Our team will review your case within 3-5 business days.
                </p>
                <Link
                  href="/appeal"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Start Appeal Process
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-8">
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800 dark:text-amber-200 text-sm">
                  Response Time
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Our support team typically responds within 24-48 hours. Appeals are reviewed
                  within 3-5 business days. Thank you for your patience.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/help"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors text-sm font-medium"
            >
              <HelpCircle className="h-4 w-4" />
              Help Center
            </Link>
            <Link
              href="/terms"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:bg-accent transition-colors text-sm font-medium"
            >
              <FileText className="h-4 w-4" />
              Terms of Service
            </Link>
            <SignOutButton variant="outline" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 bg-background/80 backdrop-blur-sm py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Farm to Grocer. All rights reserved.
          </p>
          <p className="mt-2">
            <Link href="/privacy" className="hover:text-foreground hover:underline">
              Privacy Policy
            </Link>
            {" · "}
            <Link href="/terms" className="hover:text-foreground hover:underline">
              Terms of Service
            </Link>
            {" · "}
            <Link href="/contact" className="hover:text-foreground hover:underline">
              Contact Us
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
