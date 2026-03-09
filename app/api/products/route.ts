// Farm-to-Grocer MVP - Products API Route Handler
// Path: app/api/products/route.ts
//
// RESTful API for product management
// GET: List/search products (public)
// POST: Create product (farmers only)

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma, {
  getPaginationParams,
  buildPaginationMeta,
  isPrismaError,
  getPrismaErrorMessage,
} from "@/lib/prisma";
import { requireFarmer } from "@/lib/auth";
import type {
  ProductWithFarmer,
  ProductSearchParams,
  ApiResponse,
  PaginatedResponse,
} from "@/types";
import { Product } from "@prisma/client";

export type ProductWithDetails = Product & {
  farmer: {
    user: {
      name: string | null;
      email: string | null;
      phone: string | null;
      image: string | null;
    };
  };
};

// ============================================
// VALIDATION SCHEMAS
// ============================================

/**
 * Schema for creating a new product
 */
const createProductSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters"),
  description: z
    .string()
    .max(2000, "Description must be less than 2000 characters")
    .optional(),
  category: z.enum([
    "VEGETABLES",
    "FRUITS",
    "DAIRY",
    "MEAT",
    "POULTRY",
    "GRAINS",
    "HERBS",
    "EGGS",
    "HONEY",
    "OTHER",
  ], {
    required_error: "Category is required",
  }),
  unit: z.enum([
    "LB",
    "KG",
    "OZ",
    "BUNCH",
    "DOZEN",
    "GALLON",
    "LITER",
    "PIECE",
    "CASE",
    "PALLET",
  ], {
    required_error: "Unit is required",
  }),
  pricePerUnit: z
    .number()
    .positive("Price must be greater than 0")
    .max(999999.99, "Price exceeds maximum allowed"),
  packSize: z
    .string()
    .min(1, "Pack size is required")
    .max(50, "Pack size must be less than 50 characters")
    .default("1 unit"),
  minOrderQty: z
    .number()
    .int()
    .positive("Minimum order quantity must be at least 1")
    .default(1),
  maxOrderQty: z
    .number()
    .int()
    .positive("Maximum order quantity must be positive")
    .optional()
    .nullable(),
  availableQty: z
    .number()
    .int()
    .nonnegative("Available quantity cannot be negative"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .max(10, "Maximum 10 images allowed")
    .default([]),
  isOrganic: z.boolean().default(false),
  harvestDate: z
    .string()
    .datetime()
    .optional()
    .nullable()
    .transform((val) => (val ? new Date(val) : null)),
  expiryDate: z
    .string()
    .datetime()
    .optional()
    .nullable()
    .transform((val) => (val ? new Date(val) : null)),
  tags: z
    .array(z.string().max(50))
    .max(20, "Maximum 20 tags allowed")
    .default([]),
});

/**
 * Schema for search/filter query params
 */
const searchParamsSchema = z.object({
  query: z.string().optional(),
  category: z.enum([
    "VEGETABLES",
    "FRUITS",
    "DAIRY",
    "MEAT",
    "POULTRY",
    "GRAINS",
    "HERBS",
    "EGGS",
    "HONEY",
    "OTHER",
  ]).optional(),
  farmerId: z.string().cuid().optional(),
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().positive().optional(),
  isOrganic: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  inStock: z
    .string()
    .transform((val) => val === "true")
    .optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  tags: z
    .string()
    .transform((val) => val.split(",").filter(Boolean))
    .optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sortBy: z
    .enum(["pricePerUnit", "createdAt", "name", "availableQty"])
    .default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Build Prisma where clause from search params
 */
function buildWhereClause(params: ProductSearchParams) {
  const where: any = {
    status: "ACTIVE",
  };

  // Text search
  if (params.query) {
    where.OR = [
      { name: { contains: params.query, mode: "insensitive" } },
      { description: { contains: params.query, mode: "insensitive" } },
      { tags: { hasSome: [params.query.toLowerCase()] } },
    ];
  }

  // Category filter
  if (params.category) {
    where.category = params.category;
  }

  // Farmer filter
  if (params.farmerId) {
    where.farmerId = params.farmerId;
  }

  // Price range
  if (params.minPrice !== undefined || params.maxPrice !== undefined) {
    where.pricePerUnit = {};
    if (params.minPrice !== undefined) {
      where.pricePerUnit.gte = params.minPrice;
    }
    if (params.maxPrice !== undefined) {
      where.pricePerUnit.lte = params.maxPrice;
    }
  }

  // Organic filter
  if (params.isOrganic !== undefined) {
    where.isOrganic = params.isOrganic;
  }

  // In stock filter
  if (params.inStock) {
    where.availableQty = { gt: 0 };
  }

  // Location filters (via farmer relation)
  if (params.city || params.state) {
    where.farmer = {};
    if (params.city) {
      where.farmer.city = { contains: params.city, mode: "insensitive" };
    }
    if (params.state) {
      where.farmer.state = params.state;
    }
  }

  // Tags filter
  if (params.tags && params.tags.length > 0) {
    where.tags = { hasSome: params.tags };
  }

  return where;
}

/**
 * Create standardized API response
 */
function createResponse<T>(
  data: T,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

/**
 * Create error response
 */
function createErrorResponse(
  message: string,
  code: string,
  status: number = 400,
  details?: Record<string, string[]>
): NextResponse<ApiResponse<never>> {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        details,
      },
    },
    { status }
  );
}

// ============================================
// GET /api/products
// List and search products (public)
// ============================================

export async function GET(
  request: NextRequest
): Promise<NextResponse<PaginatedResponse<ProductWithFarmer>>> {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const params = Object.fromEntries(searchParams.entries());

    // Handle 'search' alias for 'query'
    if (params.search && !params.query) {
      params.query = params.search;
    }

    // Validate params
    const validationResult = searchParamsSchema.safeParse(params);

    if (!validationResult.success) {
      console.warn("⚠️ Invalid query parameters:", validationResult.error.format());
      return createErrorResponse(
        "Invalid query parameters",
        "VALIDATION_ERROR",
        400,
        validationResult.error.flatten().fieldErrors as Record<string, string[]>
      ) as any;
    }

    const validatedParams = validationResult.data;

    // Build query
    const where = buildWhereClause(validatedParams);
    const { skip, take } = getPaginationParams(
      validatedParams.page,
      validatedParams.limit
    );

    // Execute queries in parallel
    try {
      const [products, total] = await Promise.all([
        prisma.product.findMany({
          where,
          skip,
          take,
          orderBy: {
            [validatedParams.sortBy]: validatedParams.sortOrder,
          },
          include: {
            farmer: {
              include: {
                user: {
                  select: {
                    name: true,
                    image: true,
                  },
                },
              },
            },
          },
        }),
        prisma.product.count({ where }),
      ]);

      // Build pagination metadata
      const meta = buildPaginationMeta(
        total,
        validatedParams.page,
        validatedParams.limit
      );

      return NextResponse.json({
        success: true,
        data: products as ProductWithFarmer[],
        meta,
      });
    } catch (queryError) {
      console.error("❌ Prisma query execution failed:", queryError);
      throw queryError; // Rethrow to be caught by outer catch block
    }
  } catch (error) {
    console.error("❌ GET /api/products fatal error:", error);

    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";

    if (isPrismaError(error)) {
      return createErrorResponse(
        getPrismaErrorMessage(error),
        "DATABASE_ERROR",
        500
      ) as any;
    }

    return createErrorResponse(
      errorMessage,
      "INTERNAL_ERROR",
      500
    ) as any;
  }
}

// ============================================
// POST /api/products
// Create a new product (farmers only)
// ============================================

export async function POST(
  request: NextRequest
): Promise<NextResponse<ApiResponse<Product>>> {
  try {
    // Authenticate and authorize
    let farmer;
    try {
      farmer = await requireFarmer();
    } catch (error) {
      return createErrorResponse(
        "You must be logged in as a farmer to create products",
        "UNAUTHORIZED",
        401
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return createErrorResponse(
        "Invalid JSON in request body",
        "INVALID_INPUT",
        400
      );
    }

    // Validate input
    const validationResult = createProductSchema.safeParse(body);

    if (!validationResult.success) {
      return createErrorResponse(
        "Validation failed",
        "VALIDATION_ERROR",
        400,
        validationResult.error.flatten().fieldErrors as Record<string, string[]>
      );
    }

    const data = validationResult.data;

    // Additional validation: maxOrderQty >= minOrderQty
    if (data.maxOrderQty && data.maxOrderQty < data.minOrderQty) {
      return createErrorResponse(
        "Maximum order quantity must be greater than or equal to minimum order quantity",
        "VALIDATION_ERROR",
        400
      );
    }

    // Additional validation: expiryDate > harvestDate
    if (data.harvestDate && data.expiryDate && data.expiryDate <= data.harvestDate) {
      return createErrorResponse(
        "Expiry date must be after harvest date",
        "VALIDATION_ERROR",
        400
      );
    }

    // Create product
    const product = await prisma.product.create({
      data: {
        farmerId: farmer.farmerId,
        name: data.name,
        description: data.description,
        category: data.category,
        unit: data.unit,
        pricePerUnit: data.pricePerUnit,
        packSize: data.packSize,
        minOrderQty: data.minOrderQty,
        maxOrderQty: data.maxOrderQty,
        availableQty: data.availableQty,
        images: data.images,
        isOrganic: data.isOrganic,
        harvestDate: data.harvestDate,
        expiryDate: data.expiryDate,
        tags: data.tags.map((tag) => tag.toLowerCase()),
        status: "ACTIVE",
      },
    });

    // Log product creation
    console.log(
      `✅ Product created: ${product.id} by farmer ${farmer.farmerId}`
    );

    return createResponse(product as Product, 201);
  } catch (error) {
    console.error("POST /api/products error:", error);

    if (isPrismaError(error, "UNIQUE_CONSTRAINT")) {
      return createErrorResponse(
        "A product with this name already exists",
        "ALREADY_EXISTS",
        409
      );
    }

    if (isPrismaError(error)) {
      return createErrorResponse(
        getPrismaErrorMessage(error),
        "DATABASE_ERROR",
        500
      );
    }

    return createErrorResponse(
      "An unexpected error occurred",
      "INTERNAL_ERROR",
      500
    );
  }
}

// ============================================
// OPTIONS /api/products
// CORS preflight handler
// ============================================

export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Max-Age": "86400",
    },
  });
}

// ============================================
// ROUTE SEGMENT CONFIG
// ============================================

// Enable dynamic rendering
export const dynamic = "force-dynamic";

// Disable caching for this route
export const revalidate = 0;

// Set maximum duration for serverless function
export const maxDuration = 30;
