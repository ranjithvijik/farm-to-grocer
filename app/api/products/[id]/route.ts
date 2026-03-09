// Farm-to-Grocer MVP - Single Product API Route
// Path: app/api/products/[id]/route.ts
//
// RESTful API for single product operations:
// GET: Fetch single product by ID (public)
// PUT: Update product (owner farmer only)
// DELETE: Delete product (owner farmer only)
// PATCH: Partial update / status change (owner farmer only)

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma, {
  isPrismaError,
  getPrismaErrorMessage,
} from "@/lib/prisma";
import { getSession, requireFarmer } from "@/lib/auth";
import type {
  ApiResponse,
  ProductWithFarmer,
} from "@/types";
import { Product, ProductStatus } from "@prisma/client";

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
// ROUTE CONTEXT TYPE
// ============================================

interface RouteContext {
  params: {
    id: string;
  };
}

// ============================================
// VALIDATION SCHEMAS
// ============================================

/**
 * Schema for updating a product (full update)
 */
const updateProductSchema = z.object({
  name: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .max(100, "Product name must be less than 100 characters")
    .optional(),
  description: z
    .string()
    .max(2000, "Description must be less than 2000 characters")
    .optional()
    .nullable(),
  category: z
    .enum(
      [
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
      ],
      {
        errorMap: () => ({ message: "Invalid product category" }),
      }
    )
    .optional(),
  unit: z
    .enum(
      [
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
      ],
      {
        errorMap: () => ({ message: "Invalid product unit" }),
      }
    )
    .optional(),
  pricePerUnit: z
    .number()
    .positive("Price must be greater than 0")
    .max(999999.99, "Price exceeds maximum allowed")
    .optional(),
  packSize: z
    .string()
    .min(1, "Pack size is required")
    .max(50, "Pack size must be less than 50 characters")
    .optional(),
  minOrderQty: z
    .number()
    .int()
    .positive("Minimum order quantity must be at least 1")
    .optional(),
  maxOrderQty: z
    .number()
    .int()
    .positive("Maximum order quantity must be positive")
    .optional()
    .nullable(),
  availableQty: z
    .number()
    .int()
    .nonnegative("Available quantity cannot be negative")
    .optional(),
  images: z
    .array(z.string().url("Invalid image URL"))
    .max(10, "Maximum 10 images allowed")
    .optional(),
  isOrganic: z.boolean().optional(),
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
    .optional(),
  status: z
    .nativeEnum(ProductStatus, {
      errorMap: () => ({ message: "Invalid product status" }),
    })
    .refine(
      (val) => {
        const allowedStatuses: Record<string, string> = {
          DRAFT: "DRAFT",
          ACTIVE: "ACTIVE",
          OUT_OF_STOCK: "OUT_OF_STOCK",
          DISCONTINUED: "DISCONTINUED",
        };
        return val ? allowedStatuses[val] !== undefined : true;
      },
      { message: "Invalid product status for update" }
    )
    .optional(),
});

/**
 * Schema for partial update (PATCH)
 */
const patchProductSchema = z.object({
  status: z
    .nativeEnum(ProductStatus, {
      errorMap: () => ({ message: "Invalid product status" }),
    })
    .optional(),
  availableQty: z
    .number()
    .int()
    .nonnegative("Available quantity cannot be negative")
    .optional(),
  pricePerUnit: z
    .number()
    .positive("Price must be greater than 0")
    .max(999999.99, "Price exceeds maximum allowed")
    .optional(),
});

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Validate product ID format
 */
function isValidProductId(id: string): boolean {
  // CUID format validation (basic check)
  return /^c[a-z0-9]{24}$/.test(id) || /^[a-z0-9]{25}$/.test(id);
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
// GET /api/products/[id]
// Fetch single product by ID (public)
// ============================================

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse<ApiResponse<ProductWithFarmer>>> {
  try {
    const { id } = params;

    // Validate ID format
    if (!id || !isValidProductId(id)) {
      return createErrorResponse(
        "Invalid product ID format",
        "INVALID_ID",
        400
      );
    }

    // Fetch product with farmer details
    const product = await prisma.product.findUnique({
      where: { id },
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
        _count: {
          select: {
            orderItems: true,
          },
        },
      },
    });

    // Check if product exists
    if (!product) {
      return createErrorResponse(
        "Product not found",
        "NOT_FOUND",
        404
      );
    }

    // Check if product is accessible (active or owned by requester)
    const session = await getSession();
    const isOwner = session?.user?.farmerId === product.farmerId;

    if (product.status !== "ACTIVE" && !isOwner) {
      return createErrorResponse(
        "Product not found",
        "NOT_FOUND",
        404
      );
    }

    // View count tracking removed - field does not exist in schema

    return createResponse(product as ProductWithFarmer);
  } catch (error) {
    console.error("GET /api/products/[id] error:", error);

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
// PUT /api/products/[id]
// Update product (owner farmer only)
// ============================================

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse<ApiResponse<Product>>> {
  try {
    const { id } = params;

    // Validate ID format
    if (!id || !isValidProductId(id)) {
      return createErrorResponse(
        "Invalid product ID format",
        "INVALID_ID",
        400
      );
    }

    // Authenticate and authorize
    let farmer;
    try {
      farmer = await requireFarmer();
    } catch (error) {
      return createErrorResponse(
        "You must be logged in as a farmer to update products",
        "UNAUTHORIZED",
        401
      );
    }

    // Check if product exists and belongs to farmer
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      select: { id: true, farmerId: true },
    });

    if (!existingProduct) {
      return createErrorResponse(
        "Product not found",
        "NOT_FOUND",
        404
      );
    }

    if (existingProduct.farmerId !== farmer.farmerId) {
      return createErrorResponse(
        "You don't have permission to update this product",
        "FORBIDDEN",
        403
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
    const validationResult = updateProductSchema.safeParse(body);

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
    if (data.maxOrderQty && data.minOrderQty && data.maxOrderQty < data.minOrderQty) {
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

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        tags: data.tags?.map((tag) => tag.toLowerCase()),
        updatedAt: new Date(),
      },
    });

    // Log update
    console.log(
      `✅ Product updated: ${updatedProduct.id} by farmer ${farmer.farmerId}`
    );

    return createResponse(updatedProduct as Product);
  } catch (error) {
    console.error("PUT /api/products/[id] error:", error);

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
// PATCH /api/products/[id]
// Partial update (status, quantity, price)
// ============================================

export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse<ApiResponse<Product>>> {
  try {
    const { id } = params;

    // Validate ID format
    if (!id || !isValidProductId(id)) {
      return createErrorResponse(
        "Invalid product ID format",
        "INVALID_ID",
        400
      );
    }

    // Authenticate and authorize
    let farmer;
    try {
      farmer = await requireFarmer();
    } catch (error) {
      return createErrorResponse(
        "You must be logged in as a farmer to update products",
        "UNAUTHORIZED",
        401
      );
    }

    // Check if product exists and belongs to farmer
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      select: { id: true, farmerId: true },
    });

    if (!existingProduct) {
      return createErrorResponse(
        "Product not found",
        "NOT_FOUND",
        404
      );
    }

    if (existingProduct.farmerId !== farmer.farmerId) {
      return createErrorResponse(
        "You don't have permission to update this product",
        "FORBIDDEN",
        403
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
    const validationResult = patchProductSchema.safeParse(body);

    if (!validationResult.success) {
      return createErrorResponse(
        "Validation failed",
        "VALIDATION_ERROR",
        400,
        validationResult.error.flatten().fieldErrors as Record<string, string[]>
      );
    }

    const data = validationResult.data;

    // Check if there's anything to update
    if (Object.keys(data).length === 0) {
      return createErrorResponse(
        "No valid fields to update",
        "INVALID_INPUT",
        400
      );
    }

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    // Log update
    console.log(
      `✅ Product patched: ${updatedProduct.id} by farmer ${farmer.farmerId}`
    );

    return createResponse(updatedProduct as Product);
  } catch (error) {
    console.error("PATCH /api/products/[id] error:", error);

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
// DELETE /api/products/[id]
// Delete product (owner farmer only)
// ============================================

export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
): Promise<NextResponse<ApiResponse<{ deleted: boolean; id: string }>>> {
  try {
    const { id } = params;

    // Validate ID format
    if (!id || !isValidProductId(id)) {
      return createErrorResponse(
        "Invalid product ID format",
        "INVALID_ID",
        400
      );
    }

    // Authenticate and authorize
    let farmer;
    try {
      farmer = await requireFarmer();
    } catch (error) {
      return createErrorResponse(
        "You must be logged in as a farmer to delete products",
        "UNAUTHORIZED",
        401
      );
    }

    // Check if product exists and belongs to farmer
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      select: {
        id: true,
        farmerId: true,
        name: true,
        description: true,
        _count: {
          select: {
            orderItems: {
              where: {
                order: {
                  status: {
                    notIn: ["DELIVERED", "CANCELLED", "REFUNDED"],
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!existingProduct) {
      return createErrorResponse(
        "Product not found",
        "NOT_FOUND",
        404
      );
    }

    if (existingProduct.farmerId !== farmer.farmerId) {
      return createErrorResponse(
        "You don't have permission to delete this product",
        "FORBIDDEN",
        403
      );
    }

    // Check for active orders
    if (existingProduct._count.orderItems > 0) {
      return createErrorResponse(
        "Cannot delete product with active orders. Please wait for orders to complete or archive the product instead.",
        "HAS_ACTIVE_ORDERS",
        409
      );
    }

    // Check query param for soft vs hard delete
    const { searchParams } = new URL(request.url);
    const hardDelete = searchParams.get("hard") === "true";

    if (hardDelete) {
      // Hard delete - permanently remove from database
      await prisma.product.delete({
        where: { id },
      });

      console.log(
        `🗑️ Product hard deleted: ${id} (${existingProduct.name}) by farmer ${farmer.farmerId}`
      );
    } else {
      // Soft delete - archive the product
      await prisma.product.update({
        where: { id },
        data: {
          status: "DISCONTINUED" as ProductStatus,
          updatedAt: new Date(),
        },
      });

      console.log(
        `📦 Product archived: ${id} (${existingProduct.name}) by farmer ${farmer.farmerId}`
      );
    }

    return createResponse({
      deleted: true,
      id,
    });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);

    if (isPrismaError(error, "FOREIGN_KEY_CONSTRAINT")) {
      return createErrorResponse(
        "Cannot delete product because it has associated records. Try archiving instead.",
        "HAS_DEPENDENCIES",
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
// OPTIONS /api/products/[id]
// CORS preflight handler
// ============================================

export async function OPTIONS(_request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, PATCH, DELETE, OPTIONS",
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
