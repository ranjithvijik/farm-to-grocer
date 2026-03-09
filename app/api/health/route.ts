import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/prisma";

/**
 * GET /api/health
 * Public endpoint to check system and database health
 */
export async function GET() {
    const dbHealth = await checkDatabaseHealth();

    const status = dbHealth.connected ? 200 : 503;

    return NextResponse.json(
        {
            status: dbHealth.connected ? "up" : "down",
            database: dbHealth,
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
        },
        { status }
    );
}

// Ensure the health check is always fresh
export const dynamic = "force-dynamic";
export const revalidate = 0;
