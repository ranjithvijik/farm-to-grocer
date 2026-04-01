"use client";

import * as React from "react";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface SignOutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  callbackUrl?: string;
  showIcon?: boolean;
  text?: string;
  className?: string;
  iconOnly?: boolean;
}

export function SignOutButton({
  variant = "ghost",
  size = "default",
  callbackUrl = "/",
  showIcon = true,
  text = "Sign Out",
  className,
  iconOnly = false,
}: SignOutButtonProps) {
  const { signOut } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.push(callbackUrl);
    } catch (error) {
      console.error("Sign out error:", error);
      setIsLoading(false);
    }
  };

  if (iconOnly) {
    return (
      <Button variant={variant} size="icon" onClick={handleSignOut} disabled={isLoading} className={className} aria-label="Sign out">
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSignOut}
      disabled={isLoading}
      className={cn("transition-all duration-200", variant === "ghost" && "text-muted-foreground hover:text-foreground", className)}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Signing out...
        </>
      ) : (
        <>
          {showIcon && <LogOut className="h-4 w-4 mr-2" />}
          {text}
        </>
      )}
    </Button>
  );
}

export function SignOutLink({ callbackUrl = "/", text = "Sign out", className }: { callbackUrl?: string; text?: string; className?: string }) {
  const { signOut } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.push(callbackUrl);
    } catch (error) {
      console.error("Sign out error:", error);
      setIsLoading(false);
    }
  };

  return (
    <button onClick={handleSignOut} disabled={isLoading} className={cn("text-sm text-muted-foreground hover:text-foreground hover:underline transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed", className)}>
      {isLoading ? "Signing out..." : text}
    </button>
  );
}

export default SignOutButton;
