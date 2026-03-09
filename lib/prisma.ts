// Farm-to-Grocer MVP - Prisma Client Singleton
// Path: lib/prisma.ts

import { PrismaClient } from "@prisma/client";

// ============================================
// TYPE DECLARATIONS
// ============================================

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
  var prismaConnectionPromise: Promise<void> | undefined;
}

// ============================================
// PRISMA CLIENT CONFIGURATION
// ============================================

/**
 * Prisma Client Options
 * Configure logging based on environment
 */
const prismaClientOptions = {
  log:
    process.env.NODE_ENV === "development"
      ? [
        { level: "query" as const, emit: "event" as const },
        { level: "error" as const, emit: "stdout" as const },
        { level: "warn" as const, emit: "stdout" as const },
      ]
      : [{ level: "error" as const, emit: "stdout" as const }],
};

// ============================================
// SINGLETON PATTERN IMPLEMENTATION
// ============================================

/**
 * Creates a new PrismaClient instance with proper configuration
 * Implements connection pooling and query logging in development
 */
function createPrismaClient(): PrismaClient {
  const client = new PrismaClient(prismaClientOptions);

  // Development: Log slow queries
  if (process.env.NODE_ENV === "development") {
    // @ts-ignore - Prisma event typing
    client.$on("query", (e: any) => {
      if (e.duration > 100) {
        console.warn(`⚠️ Slow query (${e.duration}ms):`, e.query);
      }
    });
  }

  return client;
}

/**
 * Prisma Client Singleton
 * 
 * In development: Stores client on globalThis to prevent
 * multiple instances during hot reloading (Next.js HMR)
 * 
 * In production: Creates a single instance per serverless function
 */
const prisma = globalThis.prisma ?? createPrismaClient();

// Preserve client across hot reloads in development
if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}

// ============================================
// DATABASE CONNECTION UTILITIES
// ============================================

/**
 * Ensures database connection is established
 * Useful for health checks and startup validation
 */
export async function connectDatabase(): Promise<void> {
  if (globalThis.prismaConnectionPromise) {
    return globalThis.prismaConnectionPromise;
  }

  globalThis.prismaConnectionPromise = prisma
    .$connect()
    .then(() => {
      console.log("✅ Database connected successfully");
    })
    .catch((error) => {
      console.error("❌ Database connection failed:", error);
      globalThis.prismaConnectionPromise = undefined;
      throw error;
    });

  return globalThis.prismaConnectionPromise;
}

/**
 * Gracefully disconnects from the database
 * Call this during application shutdown
 */
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect();
    globalThis.prismaConnectionPromise = undefined;
    console.log("✅ Database disconnected successfully");
  } catch (error) {
    console.error("❌ Database disconnection failed:", error);
    throw error;
  }
}

/**
 * Health check for database connection
 * Returns connection status and latency
 */
export async function checkDatabaseHealth(): Promise<{
  connected: boolean;
  latency: number | null;
  error?: string;
}> {
  const startTime = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    return {
      connected: true,
      latency: Date.now() - startTime,
    };
  } catch (error) {
    return {
      connected: false,
      latency: null,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// ============================================
// TRANSACTION HELPERS
// ============================================

/**
 * Execute operations within a transaction
 * Automatically handles rollback on error
 */
export async function withTransaction<T>(
  fn: (tx: Omit<PrismaClient, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends">) => Promise<T>,
  options?: {
    maxWait?: number;
    timeout?: number;
    isolationLevel?: "ReadUncommitted" | "ReadCommitted" | "RepeatableRead" | "Serializable";
  }
): Promise<T> {
  return prisma.$transaction(fn, {
    maxWait: options?.maxWait ?? 5000,
    timeout: options?.timeout ?? 10000,
    isolationLevel: options?.isolationLevel,
  });
}

// ============================================
// SOFT DELETE MIDDLEWARE (Optional)
// ============================================

/**
 * Uncomment to enable soft delete middleware
 * This will automatically filter out soft-deleted records
 */
// prisma.$use(async (params, next) => {
//   // Models that support soft delete
//   const softDeleteModels = ['Product', 'Order'];
//   
//   if (softDeleteModels.includes(params.model ?? '')) {
//     if (params.action === 'delete') {
//       params.action = 'update';
//       params.args['data'] = { deletedAt: new Date() };
//     }
//     
//     if (params.action === 'deleteMany') {
//       params.action = 'updateMany';
//       if (params.args.data !== undefined) {
//         params.args.data['deletedAt'] = new Date();
//       } else {
//         params.args['data'] = { deletedAt: new Date() };
//       }
//     }
//     
//     if (params.action === 'findUnique' || params.action === 'findFirst') {
//       params.action = 'findFirst';
//       params.args.where['deletedAt'] = null;
//     }
//     
//     if (params.action === 'findMany') {
//       if (params.args.where) {
//         if (params.args.where.deletedAt === undefined) {
//           params.args.where['deletedAt'] = null;
//         }
//       } else {
//         params.args['where'] = { deletedAt: null };
//       }
//     }
//   }
//   
//   return next(params);
// });

// ============================================
// QUERY HELPERS
// ============================================

/**
 * Pagination helper
 * Returns skip and take values for Prisma queries
 */
export function getPaginationParams(
  page: number = 1,
  limit: number = 10
): { skip: number; take: number } {
  const validPage = Math.max(1, page);
  const validLimit = Math.min(100, Math.max(1, limit));

  return {
    skip: (validPage - 1) * validLimit,
    take: validLimit,
  };
}

/**
 * Builds pagination metadata for API responses
 */
export function buildPaginationMeta(
  total: number,
  page: number,
  limit: number
): {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
} {
  const totalPages = Math.ceil(total / limit);

  return {
    total,
    page,
    limit,
    totalPages,
    hasNextPage: page < totalPages,
    hasPrevPage: page > 1,
  };
}

// ============================================
// ERROR HANDLING
// ============================================

/**
 * Prisma error codes for common scenarios
 */
export const PrismaErrorCodes = {
  UNIQUE_CONSTRAINT: "P2002",
  FOREIGN_KEY_CONSTRAINT: "P2003",
  RECORD_NOT_FOUND: "P2025",
  REQUIRED_FIELD_MISSING: "P2012",
  INVALID_ID: "P2023",
} as const;

/**
 * Check if error is a Prisma known error
 */
export function isPrismaError(
  error: unknown,
  code?: keyof typeof PrismaErrorCodes
): boolean {
  if (
    error &&
    typeof error === "object" &&
    "code" in error &&
    typeof (error as any).code === "string"
  ) {
    if (code) {
      return (error as any).code === PrismaErrorCodes[code];
    }
    return Object.values(PrismaErrorCodes).includes((error as any).code);
  }
  return false;
}

/**
 * Get user-friendly error message from Prisma error
 */
export function getPrismaErrorMessage(error: unknown): string {
  if (!isPrismaError(error)) {
    return "An unexpected database error occurred";
  }

  const prismaError = error as { code: string; meta?: { target?: string[] } };

  switch (prismaError.code) {
    case PrismaErrorCodes.UNIQUE_CONSTRAINT:
      const field = prismaError.meta?.target?.[0] ?? "field";
      return `A record with this ${field} already exists`;
    case PrismaErrorCodes.FOREIGN_KEY_CONSTRAINT:
      return "Referenced record does not exist";
    case PrismaErrorCodes.RECORD_NOT_FOUND:
      return "Record not found";
    case PrismaErrorCodes.REQUIRED_FIELD_MISSING:
      return "Required field is missing";
    case PrismaErrorCodes.INVALID_ID:
      return "Invalid ID format";
    default:
      return "A database error occurred";
  }
}

// ============================================
// EXPORTS
// ============================================

export { prisma };
export default prisma;
