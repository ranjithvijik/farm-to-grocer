// Farm-to-Grocer MVP - TypeScript Type Definitions
// Path: types/index.ts
//
// This file contains all shared type definitions, interfaces, and enums
// used throughout the application. Types are organized by domain.

import {
  UserRole,
  AccountStatus,
  ProductCategory,
  ProductUnit,
  ProductStatus,
  OrderStatus,
  PaymentStatus,
  DeliveryMethod,
  NotificationType,
  ConnectionStatus,
} from "@prisma/client";

// ============================================
// RE-EXPORT PRISMA ENUMS
// ============================================

export {
  UserRole,
  AccountStatus,
  ProductCategory,
  ProductUnit,
  ProductStatus,
  OrderStatus,
  PaymentStatus,
  DeliveryMethod,
  NotificationType,
  ConnectionStatus,
};

// ============================================
// UTILITY TYPES
// ============================================

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Extract only the keys that are strings
 */
export type StringKeys<T> = Extract<keyof T, string>;

/**
 * Nullable type helper
 */
export type Nullable<T> = T | null;

/**
 * Async function return type
 */
export type AsyncReturnType<T extends (...args: any) => Promise<any>> =
  T extends (...args: any) => Promise<infer R> ? R : any;

// ============================================
// API RESPONSE TYPES
// ============================================

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  meta?: ApiMeta;
}

/**
 * API error structure
 */
export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string[]>;
  stack?: string;
}

/**
 * API metadata (pagination, etc.)
 */
export interface ApiMeta {
  total?: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
}

/**
 * Paginated response type
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: Required<Pick<ApiMeta, "total" | "page" | "limit" | "totalPages" | "hasNextPage" | "hasPrevPage">>;
}

/**
 * API error codes
 */
export const ApiErrorCodes = {
  // Authentication errors
  UNAUTHORIZED: "UNAUTHORIZED",
  FORBIDDEN: "FORBIDDEN",
  INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
  TOKEN_EXPIRED: "TOKEN_EXPIRED",

  // Validation errors
  VALIDATION_ERROR: "VALIDATION_ERROR",
  INVALID_INPUT: "INVALID_INPUT",
  MISSING_REQUIRED_FIELD: "MISSING_REQUIRED_FIELD",

  // Resource errors
  NOT_FOUND: "NOT_FOUND",
  ALREADY_EXISTS: "ALREADY_EXISTS",
  CONFLICT: "CONFLICT",

  // Server errors
  INTERNAL_ERROR: "INTERNAL_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  EXTERNAL_SERVICE_ERROR: "EXTERNAL_SERVICE_ERROR",

  // Rate limiting
  RATE_LIMITED: "RATE_LIMITED",
} as const;

export type ApiErrorCode = (typeof ApiErrorCodes)[keyof typeof ApiErrorCodes];

// ============================================
// USER TYPES
// ============================================

/**
 * Base user type (without sensitive data)
 */
export interface User {
  id: string;
  email: string;
  name: string;
  phone: string | null;
  role: UserRole;
  status: AccountStatus;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User with profile data
 */
export interface UserWithProfile extends User {
  farmer: Farmer | null;
  grocer: Grocer | null;
}

/**
 * Session user (minimal data for client)
 */
export interface SessionUser {
  id: string;
  email: string;
  name: string;
  image: string | null;
  role: UserRole;
  status: AccountStatus;
  farmerId?: string;
  grocerId?: string;
}

/**
 * User registration input
 */
export interface RegisterUserInput {
  name: string;
  email: string;
  password: string;
  role: "FARMER" | "GROCER";
}

/**
 * User login input
 */
export interface LoginInput {
  email: string;
  password: string;
}

// ============================================
// FARMER TYPES
// ============================================

/**
 * Farmer profile
 */
export interface Farmer {
  id: string;
  userId: string;
  farmName: string;
  description: string | null;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number | null;
  longitude: number | null;
  certifications: string[];
  rating: number;
  totalSales: number;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  // New fields
  phone: string | null;
  deliveryDays: string[];
  leadTimeDays: number | null;
  minimumOrderAmount: number | null;
  story: string | null;
}

/**
 * Farmer with user data
 */
export interface FarmerWithUser extends Farmer {
  user: User;
}

/**
 * Farmer with products
 */
export interface FarmerWithProducts extends Farmer {
  products: Product[];
}

/**
 * Farmer profile input (create/update)
 */
export interface FarmerProfileInput {
  farmName: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  certifications?: string[];
}

/**
 * Farmer search/filter params
 */
export interface FarmerSearchParams {
  query?: string;
  city?: string;
  state?: string;
  certifications?: string[];
  isVerified?: boolean;
  minRating?: number;
  page?: number;
  limit?: number;
  sortBy?: "rating" | "totalSales" | "createdAt";
  sortOrder?: "asc" | "desc";
}

/**
 * Farmer card display data
 */
export interface FarmerCard {
  id: string;
  farmName: string;
  description: string | null;
  city: string;
  state: string;
  certifications: string[];
  rating: number;
  isVerified: boolean;
  productCount: number;
  image: string | null;
}

// ============================================
// GROCER TYPES
// ============================================

/**
 * Grocer profile
 */
export interface Grocer {
  id: string;
  userId: string;
  businessName: string;
  businessType: string;
  description: string | null;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number | null;
  longitude: number | null;
  taxId: string | null;
  isVerified: boolean;
  totalOrders: number;
  createdAt: Date;
  updatedAt: Date;

  // New fields
  phone: string | null;
  receivingAddress: string | null;
  receivingDays: string[];
  preferredDeliveryDays: string[];
  categoriesOfInterest: string[];
}

/**
 * Grocer with user data
 */
export interface GrocerWithUser extends Grocer {
  user: User;
}

/**
 * Grocer profile input (create/update)
 */
export interface GrocerProfileInput {
  businessName: string;
  businessType: string;
  description?: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;
  taxId?: string;
}

// ============================================
// PRODUCT TYPES
// ============================================

/**
 * Product base type
 */
export interface Product {
  id: string;
  farmerId: string;
  name: string;
  description: string | null;
  category: ProductCategory;
  unit: ProductUnit;
  pricePerUnit: number;
  packSize: string;
  minOrderQty: number;
  maxOrderQty: number | null;
  availableQty: number;
  images: string[];
  isOrganic: boolean;
  harvestDate: Date | null;
  expiryDate: Date | null;
  status: ProductStatus;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Product with farmer data
 */
export interface ProductWithFarmer extends Product {
  farmer: Farmer & {
    user: Pick<User, "name" | "image">;
  };
}

/**
 * Product card display data
 */
export interface ProductCard {
  id: string;
  name: string;
  description: string | null;
  category: ProductCategory;
  unit: ProductUnit;
  pricePerUnit: number;
  minOrderQty: number;
  availableQty: number;
  image: string | null;
  isOrganic: boolean;
  farmerName: string;
  farmName: string;
  farmerCity: string;
  farmerState: string;
  packSize: string;
}

/**
 * Product create input
 */
export interface CreateProductInput {
  name: string;
  description?: string;
  category: ProductCategory;
  unit: ProductUnit;
  pricePerUnit: number;
  minOrderQty?: number;
  maxOrderQty?: number;
  availableQty: number;
  images?: string[];
  isOrganic?: boolean;
  harvestDate?: Date;
  expiryDate?: Date;
  tags?: string[];
}

/**
 * Product update input
 */
export interface UpdateProductInput extends Partial<CreateProductInput> {
  status?: ProductStatus;
}

/**
 * Product search/filter params
 */
export interface ProductSearchParams {
  query?: string;
  category?: ProductCategory;
  farmerId?: string;
  minPrice?: number;
  maxPrice?: number;
  isOrganic?: boolean;
  inStock?: boolean;
  city?: string;
  state?: string;
  tags?: string[];
  page?: number;
  limit?: number;
  sortBy?: "pricePerUnit" | "createdAt" | "name" | "availableQty";
  sortOrder?: "asc" | "desc";
}

// ============================================
// B2B CONNECTION TYPES
// ============================================

/**
 * B2B Connection
 */
export interface Connection {
  id: string;
  farmerId: string;
  grocerId: string;
  status: ConnectionStatus;
  requestedAt: Date;
  approvedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Connection with related profiles
 */
export interface ConnectionWithProfiles extends Connection {
  farmer: Farmer;
  grocer: Grocer;
}

// ============================================
// CART TYPES
// ============================================

/**
 * Cart item
 */
export interface CartItem {
  id: string;
  grocerId: string;
  productId: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Cart item with product details
 */
export interface CartItemWithProduct extends CartItem {
  product: ProductWithFarmer;
}

/**
 * Cart summary
 */
export interface CartSummary {
  items: CartItemWithProduct[];
  itemCount: number;
  subtotal: number;
  farmerGroups: {
    farmerId: string;
    farmerName: string;
    items: CartItemWithProduct[];
    subtotal: number;
  }[];
}

/**
 * Add to cart input
 */
export interface AddToCartInput {
  productId: string;
  quantity: number;
}

/**
 * Update cart item input
 */
export interface UpdateCartItemInput {
  quantity: number;
}

// ============================================
// ORDER TYPES
// ============================================

/**
 * Order base type
 */
export interface Order {
  id: string;
  orderNumber: string;
  farmerId: string;
  grocerId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  deliveryMethod: DeliveryMethod;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  notes: string | null;
  deliveryAddress: string | null;
  deliveryDate: Date | null;
  confirmedAt: Date | null;
  completedAt: Date | null;
  cancelledAt: Date | null;
  cancelReason: string | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Order item
 */
export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
}

/**
 * Order with items
 */
export interface OrderWithItems extends Order {
  items: OrderItem[];
}

/**
 * Order with full details
 */
export interface OrderWithDetails extends OrderWithItems {
  farmer: Farmer & {
    user: Pick<User, "name" | "email" | "phone">;
  };
  grocer: Grocer & {
    user: Pick<User, "name" | "email" | "phone">;
  };
}

/**
 * Order summary for list views
 */
export interface OrderSummary {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
  itemCount: number;
  createdAt: Date;
  farmerName?: string;
  grocerName?: string;
}

/**
 * Create order input
 */
export interface CreateOrderInput {
  farmerId: string;
  items: {
    productId: string;
    quantity: number;
  }[];
  deliveryMethod: DeliveryMethod;
  deliveryAddress?: string;
  deliveryDate?: Date;
  notes?: string;
}

/**
 * Update order status input
 */
export interface UpdateOrderStatusInput {
  status: OrderStatus;
  cancelReason?: string;
}

/**
 * Order search/filter params
 */
export interface OrderSearchParams {
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  farmerId?: string;
  grocerId?: string;
  startDate?: Date;
  endDate?: Date;
  minTotal?: number;
  maxTotal?: number;
  page?: number;
  limit?: number;
  sortBy?: "createdAt" | "total" | "status";
  sortOrder?: "asc" | "desc";
}

// ============================================
// NOTIFICATION TYPES
// ============================================

/**
 * Notification
 */
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  link: string | null;
  isRead: boolean;
  createdAt: Date;
}

/**
 * Notification preferences
 */
export interface NotificationPreferences {
  email: {
    orderUpdates: boolean;
    newMessages: boolean;
    promotions: boolean;
    systemAlerts: boolean;
  };
  push: {
    orderUpdates: boolean;
    newMessages: boolean;
    promotions: boolean;
    systemAlerts: boolean;
  };
}

// ============================================
// DASHBOARD & ANALYTICS TYPES
// ============================================

/**
 * Farmer dashboard stats
 */
export interface FarmerDashboardStats {
  totalProducts: number;
  activeProducts: number;
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  monthlyRevenue: number;
  averageRating: number;
  totalReviews: number;
}

/**
 * Grocer dashboard stats
 */
export interface GrocerDashboardStats {
  totalOrders: number;
  pendingOrders: number;
  totalSpent: number;
  monthlySpent: number;
  savedFarmers: number;
  cartItemCount: number;
}

/**
 * Revenue chart data point
 */
export interface RevenueDataPoint {
  date: string;
  revenue: number;
  orders: number;
}

/**
 * Top product data
 */
export interface TopProduct {
  id: string;
  name: string;
  totalSold: number;
  revenue: number;
}

/**
 * Order status distribution
 */
export interface OrderStatusDistribution {
  status: OrderStatus;
  count: number;
  percentage: number;
}

// ============================================
// FORM TYPES
// ============================================

/**
 * Form field error
 */
export interface FieldError {
  field: string;
  message: string;
}

/**
 * Form state
 */
export interface FormState<T = unknown> {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  data: T | null;
  errors: FieldError[];
}

// ============================================
// LOCATION TYPES
// ============================================

/**
 * Geographic coordinates
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Address
 */
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country?: string;
  coordinates?: Coordinates;
}

/**
 * Location search result
 */
export interface LocationSearchResult {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
}

// ============================================
// FILE UPLOAD TYPES
// ============================================

/**
 * Uploaded file info
 */
export interface UploadedFile {
  key: string;
  url: string;
  name: string;
  size: number;
  type: string;
}

/**
 * Upload progress
 */
export interface UploadProgress {
  fileName: string;
  progress: number;
  status: "pending" | "uploading" | "complete" | "error";
  error?: string;
}

// ============================================
// SEARCH & FILTER TYPES
// ============================================

/**
 * Generic search params
 */
export interface SearchParams {
  query?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

/**
 * Sort option
 */
export interface SortOption {
  label: string;
  value: string;
  field: string;
  order: "asc" | "desc";
}

/**
 * Filter option
 */
export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

// ============================================
// COMPONENT PROP TYPES
// ============================================

/**
 * Base component props with className
 */
export interface BaseProps {
  className?: string;
}

/**
 * Component with children
 */
export interface WithChildren {
  children: React.ReactNode;
}

/**
 * Modal props
 */
export interface ModalProps extends BaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

/**
 * Table column definition
 */
export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

// ============================================
// CONSTANTS
// ============================================

/**
 * Product category labels
 */
export const ProductCategoryLabels: Record<ProductCategory, string> = {
  VEGETABLES: "Vegetables",
  FRUITS: "Fruits",
  DAIRY: "Dairy",
  MEAT: "Meat",
  POULTRY: "Poultry",
  GRAINS: "Grains",
  HERBS: "Herbs",
  EGGS: "Eggs",
  HONEY: "Honey",
  OTHER: "Other",
};

/**
 * Product unit labels
 */
export const ProductUnitLabels: Record<ProductUnit, string> = {
  LB: "lb",
  KG: "kg",
  OZ: "oz",
  BUNCH: "bunch",
  DOZEN: "dozen",
  GALLON: "gallon",
  LITER: "liter",
  PIECE: "piece",
  CASE: "case",
  PALLET: "pallet",
};

/**
 * Product status labels
 */
export const ProductStatusLabels: Record<ProductStatus, string> = {
  DRAFT: "Draft",
  ACTIVE: "Active",
  OUT_OF_STOCK: "Out of Stock",
  DISCONTINUED: "Discontinued",
};

/**
 * Order status labels
 */
export const OrderStatusLabels: Record<OrderStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  PROCESSING: "Processing",
  READY_FOR_PICKUP: "Ready for Pickup",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
  REFUNDED: "Refunded",
};

/**
 * Order status colors (for UI)
 */
export const OrderStatusColors: Record<OrderStatus, string> = {
  PENDING: "yellow",
  CONFIRMED: "blue",
  PROCESSING: "indigo",
  READY_FOR_PICKUP: "purple",
  OUT_FOR_DELIVERY: "cyan",
  DELIVERED: "green",
  CANCELLED: "red",
  REFUNDED: "gray",
};

/**
 * US States
 */
export const US_STATES = [
  { value: "AL", label: "Alabama" },
  { value: "AK", label: "Alaska" },
  { value: "AZ", label: "Arizona" },
  { value: "AR", label: "Arkansas" },
  { value: "CA", label: "California" },
  { value: "CO", label: "Colorado" },
  { value: "CT", label: "Connecticut" },
  { value: "DE", label: "Delaware" },
  { value: "FL", label: "Florida" },
  { value: "GA", label: "Georgia" },
  { value: "HI", label: "Hawaii" },
  { value: "ID", label: "Idaho" },
  { value: "IL", label: "Illinois" },
  { value: "IN", label: "Indiana" },
  { value: "IA", label: "Iowa" },
  { value: "KS", label: "Kansas" },
  { value: "KY", label: "Kentucky" },
  { value: "LA", label: "Louisiana" },
  { value: "ME", label: "Maine" },
  { value: "MD", label: "Maryland" },
  { value: "MA", label: "Massachusetts" },
  { value: "MI", label: "Michigan" },
  { value: "MN", label: "Minnesota" },
  { value: "MS", label: "Mississippi" },
  { value: "MO", label: "Missouri" },
  { value: "MT", label: "Montana" },
  { value: "NE", label: "Nebraska" },
  { value: "NV", label: "Nevada" },
  { value: "NH", label: "New Hampshire" },
  { value: "NJ", label: "New Jersey" },
  { value: "NM", label: "New Mexico" },
  { value: "NY", label: "New York" },
  { value: "NC", label: "North Carolina" },
  { value: "ND", label: "North Dakota" },
  { value: "OH", label: "Ohio" },
  { value: "OK", label: "Oklahoma" },
  { value: "OR", label: "Oregon" },
  { value: "PA", label: "Pennsylvania" },
  { value: "RI", label: "Rhode Island" },
  { value: "SC", label: "South Carolina" },
  { value: "SD", label: "South Dakota" },
  { value: "TN", label: "Tennessee" },
  { value: "TX", label: "Texas" },
  { value: "UT", label: "Utah" },
  { value: "VT", label: "Vermont" },
  { value: "VA", label: "Virginia" },
  { value: "WA", label: "Washington" },
  { value: "WV", label: "West Virginia" },
  { value: "WI", label: "Wisconsin" },
  { value: "WY", label: "Wyoming" },
] as const;

export type USState = (typeof US_STATES)[number]["value"];
