// Farm-to-Grocer - Dashboard Layout
// Auth is handled client-side via AuthProvider.

"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import * as React from "react";
import { DashboardShell } from "./dashboard-shell";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
