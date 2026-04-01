"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import * as React from "react";
import { Leaf } from "lucide-react";

export default function OnboardingPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login?callbackUrl=/onboarding");
    }
    if (!isLoading && user?.status === "ACTIVE") {
      const redirectPath = user.role === "FARMER" ? "/farmer" : "/grocer";
      router.push(redirectPath);
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-farm-50 via-white to-green-50 dark:from-farm-950 dark:via-background dark:to-green-950">
      <header className="relative z-10 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-bold text-xl">
            <Leaf className="h-7 w-7" />
            <span>Farm to Grocer</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Welcome, <span className="font-medium text-foreground">{user.name}</span>
          </p>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-lg mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
          <p className="text-muted-foreground mb-8">
            Your account is set up. Head to your dashboard to get started.
          </p>
          <button
            onClick={() => router.push(user.role === "FARMER" ? "/farmer" : "/grocer")}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </main>
    </div>
  );
}
