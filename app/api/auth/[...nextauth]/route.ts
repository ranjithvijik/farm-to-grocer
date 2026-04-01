// Legacy NextAuth route - no longer used.
// Auth is now handled client-side via AuthProvider (Cognito / dev-mode mock).
// This file exists to prevent 404s on /api/auth/* requests.

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "Auth is handled client-side" });
}

export async function POST() {
  return NextResponse.json({ message: "Auth is handled client-side" });
}
