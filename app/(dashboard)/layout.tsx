// Farm-to-Grocer MVP - Dashboard Layout
// Path: app/(dashboard)/layout.tsx
//
// A comprehensive dashboard layout with:
// - Collapsible sidebar navigation
// - Top header with user menu
// - Role-based navigation (Farmer/Grocer/Admin)
// - Mobile-responsive design with slide-out drawer
// - Breadcrumb navigation
// - Notification bell
// - Search functionality

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DashboardShell } from "./dashboard-shell";

// ============================================
// METADATA
// ============================================

export const metadata = {
  title: {
    template: "%s | Dashboard",
    default: "Dashboard",
  },
  description: "Manage your Farm to Grocer account",
};

// ============================================
// DASHBOARD LAYOUT COMPONENT
// ============================================

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // Get the user session
  const session = await getServerSession(authOptions);

  // Redirect to login if not authenticated
  if (!session?.user) {
    redirect("/login?callbackUrl=/farmer");
  }

  // Check if user needs to complete onboarding
  if (session.user.status === "PENDING") {
    redirect("/onboarding");
  }

  // Check if user is suspended
  if (session.user.status === "SUSPENDED") {
    redirect("/suspended");
  }

  return (
    <DashboardShell user={session.user}>
      {children}
    </DashboardShell>
  );
}
