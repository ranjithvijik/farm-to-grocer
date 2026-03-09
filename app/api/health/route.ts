import { NextResponse } from "next/server";
import { checkDatabaseHealth } from "@/lib/prisma";

/**
 * GET /api/health
 * Public endpoint to check system and database health
 */
export async function GET() {
    // Start total execution timer
    const startTime = performance.now();

    // 1. Check Database Connectivity
    const dbHealth = await checkDatabaseHealth();

    // 2. System Metrics
    const system = {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        nodeVersion: process.version,
    };

    // 3. Configuration Validation
    // Do NOT expose actual secret values, only boolean presence
    const envStatus = {
        DATABASE_URL: !!process.env.DATABASE_URL,
        NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    };

    // Determine overall configuration readiness
    const configOk = Object.values(envStatus).every(Boolean);

    // Calculate overall status
    // 503 if database is down or critical configuration is missing
    const isHealthy = dbHealth.connected && configOk;
    const statusCode = isHealthy ? 200 : 503;

    // End execution timer
    const executionTimeMs = performance.now() - startTime;

    return NextResponse.json(
        {
            status: isHealthy ? "up" : "down",
            database: dbHealth,
            system,
            configuration: envStatus,
            metrics: {
                apiLatencyMs: parseFloat(executionTimeMs.toFixed(2)),
            },
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV,
        },
        { status: statusCode }
    );
}

// Ensure the health check is always fresh
export const dynamic = "force-dynamic";
export const revalidate = 0;
