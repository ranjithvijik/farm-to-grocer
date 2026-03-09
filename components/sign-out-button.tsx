// Farm-to-Grocer MVP - Sign Out Button Component
// Path: app/suspended/sign-out-button.tsx
//
// A reusable sign-out button component with:
// - NextAuth signOut integration
// - Loading state with spinner
// - Multiple style variants
// - Customizable redirect URL
// - Accessible design

"use client";

import * as React from "react";
import { signOut } from "next-auth/react";
import { LogOut, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

// ============================================
// TYPES & INTERFACES
// ============================================

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon";

interface SignOutButtonProps {
  /**
   * Button style variant
   * @default "ghost"
   */
  variant?: ButtonVariant;

  /**
   * Button size
   * @default "default"
   */
  size?: ButtonSize;

  /**
   * URL to redirect after sign out
   * @default "/"
   */
  callbackUrl?: string;

  /**
   * Show icon alongside text
   * @default true
   */
  showIcon?: boolean;

  /**
   * Custom button text
   * @default "Sign Out"
   */
  text?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Icon-only mode (no text)
   * @default false
   */
  iconOnly?: boolean;
}

// ============================================
// SIGN OUT BUTTON COMPONENT
// ============================================

export function SignOutButton({
  variant = "ghost",
  size = "default",
  callbackUrl = "/",
  showIcon = true,
  text = "Sign Out",
  className,
  iconOnly = false,
}: SignOutButtonProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  /**
   * Handle sign out action
   * Clears session and redirects to callback URL
   */
  const handleSignOut = async () => {
    setIsLoading(true);

    try {
      await signOut({
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      console.error("Sign out error:", error);
      setIsLoading(false);
    }
  };

  // Icon-only button
  if (iconOnly) {
    return (
      <Button
        variant={variant}
        size="icon"
        onClick={handleSignOut}
        disabled={isLoading}
        className={className}
        aria-label="Sign out"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <LogOut className="h-4 w-4" />
        )}
      </Button>
    );
  }

  // Standard button with text
  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSignOut}
      disabled={isLoading}
      className={cn(
        "transition-all duration-200",
        variant === "ghost" && "text-muted-foreground hover:text-foreground",
        className
      )}
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

// ============================================
// SIGN OUT LINK COMPONENT
// ============================================

interface SignOutLinkProps {
  /**
   * URL to redirect after sign out
   * @default "/"
   */
  callbackUrl?: string;

  /**
   * Custom link text
   * @default "Sign out"
   */
  text?: string;

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * A text-link style sign out component
 * Useful for inline text or footer links
 */
export function SignOutLink({
  callbackUrl = "/",
  text = "Sign out",
  className,
}: SignOutLinkProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);

    try {
      await signOut({
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      console.error("Sign out error:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className={cn(
        "text-sm text-muted-foreground hover:text-foreground hover:underline",
        "transition-colors duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {isLoading ? "Signing out..." : text}
    </button>
  );
}

// ============================================
// SIGN OUT MENU ITEM COMPONENT
// ============================================

interface SignOutMenuItemProps {
  /**
   * URL to redirect after sign out
   * @default "/"
   */
  callbackUrl?: string;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Callback when sign out is initiated
   */
  onSignOut?: () => void;
}

/**
 * A menu-item style sign out component
 * Designed for dropdown menus and sidebars
 */
export function SignOutMenuItem({
  callbackUrl = "/",
  className,
  onSignOut,
}: SignOutMenuItemProps) {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    onSignOut?.();

    try {
      await signOut({
        callbackUrl,
        redirect: true,
      });
    } catch (error) {
      console.error("Sign out error:", error);
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={isLoading}
      className={cn(
        "flex w-full items-center gap-3 px-4 py-2",
        "text-sm text-destructive",
        "hover:bg-destructive/10 transition-colors",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className
      )}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Signing out...</span>
        </>
      ) : (
        <>
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </>
      )}
    </button>
  );
}

// ============================================
// EXPORTS
// ============================================

export default SignOutButton;
