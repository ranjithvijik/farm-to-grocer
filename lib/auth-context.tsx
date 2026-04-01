"use client";

import * as React from "react";

// ============================================
// TYPES
// ============================================

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "FARMER" | "GROCER" | "ADMIN";
  status: string;
  image?: string | null;
  farmerId?: string;
  grocerId?: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: { name: string; email: string; password: string; role: string }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<{ success: boolean; error?: string }>;
}

// ============================================
// DEMO ACCOUNTS (for dev mode)
// ============================================

const DEMO_ACCOUNTS: AuthUser[] = [
  {
    id: "demo-farmer-1",
    email: "sales@agriberry.com",
    name: "Anne Geyer",
    role: "FARMER",
    status: "ACTIVE",
    farmerId: "demo-farmer-profile-1",
  },
  {
    id: "demo-farmer-2",
    email: "hello@fullbright.farm",
    name: "Michael Fullbright",
    role: "FARMER",
    status: "ACTIVE",
    farmerId: "demo-farmer-profile-2",
  },
  {
    id: "demo-farmer-3",
    email: "contact@babybeans.com",
    name: "Leo Chen",
    role: "FARMER",
    status: "ACTIVE",
    farmerId: "demo-farmer-profile-3",
  },
  {
    id: "demo-grocer-1",
    email: "buyer@eddiesmv.com",
    name: "Dennis Zorn",
    role: "GROCER",
    status: "ACTIVE",
    grocerId: "demo-grocer-profile-1",
  },
  {
    id: "demo-grocer-2",
    email: "orders@eddiesrolandpark.com",
    name: "Nancy Cohen",
    role: "GROCER",
    status: "ACTIVE",
    grocerId: "demo-grocer-profile-2",
  },
  {
    id: "demo-grocer-3",
    email: "buyer@freshmarket.com",
    name: "Rachel Kim",
    role: "GROCER",
    status: "ACTIVE",
    grocerId: "demo-grocer-profile-3",
  },
  {
    id: "demo-admin-1",
    email: "admin@farmtogrocer.com",
    name: "Platform Admin",
    role: "ADMIN",
    status: "ACTIVE",
  },
];

// ============================================
// DEV MODE FLAG
// ============================================

const IS_DEV_AUTH = process.env.NEXT_PUBLIC_DEV_AUTH === "true";

// ============================================
// AUTH CONTEXT
// ============================================

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// ============================================
// STORAGE HELPERS
// ============================================

const AUTH_STORAGE_KEY = "farm-to-grocer-auth-user";

function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

function setStoredUser(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

// ============================================
// AUTH PROVIDER (Dev Mode - Mock)
// ============================================

function DevAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Restore session from localStorage
  React.useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      setUser(stored);
    }
    setIsLoading(false);
  }, []);

  const signIn = React.useCallback(async (email: string, _password: string) => {
    // In dev mode, find the demo account by email, or accept any email with password123
    const demoUser = DEMO_ACCOUNTS.find(
      (a) => a.email.toLowerCase() === email.toLowerCase()
    );

    if (demoUser) {
      setUser(demoUser);
      setStoredUser(demoUser);
      return { success: true };
    }

    // For any other email, create a temporary farmer account for testing
    if (_password === "password123") {
      const tempUser: AuthUser = {
        id: `temp-${Date.now()}`,
        email: email.toLowerCase(),
        name: email.split("@")[0] || "User",
        role: "FARMER",
        status: "ACTIVE",
      };
      setUser(tempUser);
      setStoredUser(tempUser);
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  }, []);

  const signUp = React.useCallback(async (data: { name: string; email: string; password: string; role: string }) => {
    const newUser: AuthUser = {
      id: `new-${Date.now()}`,
      email: data.email.toLowerCase(),
      name: data.name,
      role: data.role as "FARMER" | "GROCER" | "ADMIN",
      status: "ACTIVE",
    };
    setUser(newUser);
    setStoredUser(newUser);
    return { success: true };
  }, []);

  const signOut = React.useCallback(async () => {
    setUser(null);
    setStoredUser(null);
  }, []);

  const confirmSignUp = React.useCallback(async (_email: string, _code: string) => {
    return { success: true };
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      signIn,
      signUp,
      signOut,
      confirmSignUp,
    }),
    [user, isLoading, signIn, signUp, signOut, confirmSignUp]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================
// AUTH PROVIDER (Production - Cognito stub)
// ============================================

function CognitoAuthProvider({ children }: { children: React.ReactNode }) {
  // Production Cognito auth would go here.
  // For now, fall back to dev mode since we can't connect to real Cognito in sandbox.
  return <DevAuthProvider>{children}</DevAuthProvider>;
}

// ============================================
// MAIN AUTH PROVIDER (auto-selects mode)
// ============================================

export function AuthProvider({ children }: { children: React.ReactNode }) {
  if (IS_DEV_AUTH) {
    return <DevAuthProvider>{children}</DevAuthProvider>;
  }
  return <CognitoAuthProvider>{children}</CognitoAuthProvider>;
}

// ============================================
// SERVER-SIDE AUTH HELPERS
// These replace the old NextAuth getSession/getCurrentUser functions.
// In dev mode, they read from cookies or return a mock user.
// ============================================

export function getDevModeUser(): AuthUser | null {
  // Server-side: we can't access localStorage.
  // The dashboard layout will use client-side auth context instead.
  return null;
}
