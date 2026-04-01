// Farm-to-Grocer - Auth Utilities
// Replaced NextAuth with Cognito + dev-mode mock auth.
// Server-side helpers are stubs; real auth is handled client-side via AuthProvider.

import { hash, compare } from "bcryptjs";
import { z } from "zod";

// ============================================
// VALIDATION SCHEMAS
// ============================================

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and number"
    ),
  role: z.enum(["FARMER", "GROCER"]),
});

// ============================================
// HELPER FUNCTIONS
// ============================================

export async function hashPassword(password: string): Promise<string> {
  return hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return compare(password, hashedPassword);
}

// ============================================
// SERVER-SIDE AUTH STUBS
// In dev mode, auth is handled client-side via AuthProvider.
// These stubs prevent server components from crashing.
// ============================================

export async function getSession(): Promise<null> {
  return null;
}

export async function getCurrentUser(): Promise<null> {
  return null;
}

export async function requireAuth(): Promise<never> {
  throw new Error("Auth is handled client-side in dev mode");
}

export async function requireRole(..._roles: string[]): Promise<never> {
  throw new Error("Auth is handled client-side in dev mode");
}

export async function requireFarmer(): Promise<never> {
  throw new Error("Auth is handled client-side in dev mode");
}

export async function requireGrocer(): Promise<never> {
  throw new Error("Auth is handled client-side in dev mode");
}

export async function requireAdmin(): Promise<never> {
  throw new Error("Auth is handled client-side in dev mode");
}

// Legacy export for compatibility - no longer used
export const authOptions = {};
