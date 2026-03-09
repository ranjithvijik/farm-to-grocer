// Farm-to-Grocer MVP - Root Layout
// Path: app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

// Providers
import { Providers } from "@/components/providers";
import { Toaster } from "@/components/ui/Toaster";
import { Toaster as SonnerToaster } from "sonner";

// Inter - Primary font
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// ============================================
// METADATA CONFIGURATION
// ============================================

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Farm to Grocer | Fresh Local Produce Marketplace",
    template: "%s | Farm to Grocer",
  },
  description:
    "Connect directly with local farmers for fresh, sustainable produce. Farm to Grocer bridges the gap between farms and grocery stores, restaurants, and food businesses.",
  keywords: [
    "farm to table",
    "local produce",
    "wholesale produce",
    "farmers marketplace",
    "grocery supply",
    "organic vegetables",
    "fresh fruits",
    "sustainable farming",
    "B2B food marketplace",
    "farm direct",
  ],
  authors: [{ name: "Farm to Grocer Team" }],
  creator: "Farm to Grocer",
  publisher: "Farm to Grocer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Farm to Grocer",
    title: "Farm to Grocer | Fresh Local Produce Marketplace",
    description:
      "Connect directly with local farmers for fresh, sustainable produce. The modern B2B marketplace for farms and grocers.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Farm to Grocer - Fresh Local Produce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Farm to Grocer | Fresh Local Produce Marketplace",
    description:
      "Connect directly with local farmers for fresh, sustainable produce.",
    images: ["/og-image.png"],
    creator: "@farmtogrocer",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: "/favicon-16x16.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
};

// ============================================
// ROOT LAYOUT COMPONENT
// ============================================

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable}`}
    >
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* DNS Prefetch for API endpoints */}
        <link rel="dns-prefetch" href="https://api.stripe.com" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
      </head>
      <body
        className={`
          min-h-screen 
          bg-background 
          font-sans 
          antialiased
          selection:bg-primary/20
          selection:text-primary
        `}
      >
        {/* Skip to main content - Accessibility */}
        <a
          href="#main-content"
          className="
            sr-only 
            focus:not-sr-only 
            focus:absolute 
            focus:left-4 
            focus:top-4 
            focus:z-50 
            focus:rounded-md 
            focus:bg-primary 
            focus:px-4 
            focus:py-2 
            focus:text-primary-foreground
            focus:outline-none
            focus:ring-2
            focus:ring-ring
          "
        >
          Skip to main content
        </a>

        {/* All Providers Wrapper */}
        <Providers>
          {/* Ambient Background Effects — Light Cream Theme */}
          <div className="fixed inset-0 z-[-1]" style={{ background: 'hsl(42, 50%, 96%)' }}>
            <div className="absolute inset-0 opacity-30 bg-grid-pattern [mask-image:linear-gradient(to_bottom,white,transparent)]" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] opacity-20 blur-[120px] rounded-full pointer-events-none bg-green-200" />
            <div className="absolute right-0 bottom-0 w-[500px] h-[500px] opacity-15 blur-[120px] rounded-full pointer-events-none bg-amber-200" />
          </div>

          {/* Main Content */}
          <div id="main-content" className="relative flex min-h-screen flex-col isolate">
            {children}
          </div>

          {/* Toast Notifications */}
          <Toaster />
          <SonnerToaster
            position="top-right"
            expand={false}
            richColors
            closeButton
            duration={4000}
            toastOptions={{
              style: {
                fontFamily: "var(--font-inter)",
              },
            }}
          />
        </Providers>

        {/* Analytics Script Placeholder */}
        {process.env.NODE_ENV === "production" && (
          <>
            {/* Add your analytics scripts here */}
            {/* Example: Google Analytics, Plausible, etc. */}
          </>
        )}
      </body>
    </html>
  );
}

// ============================================
// ADDITIONAL EXPORTS
// ============================================

// Enable dynamic rendering for authenticated routes
export const dynamic = "force-dynamic";

// Revalidation settings
export const revalidate = 0;
