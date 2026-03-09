// Farm-to-Grocer MVP - Order Table Component
// Path: components/OrderTable.tsx
//
// A comprehensive data table component for displaying orders with:
// - Sorting by any column (ascending/descending)
// - Filtering by status, date range, search
// - Pagination with configurable page sizes
// - Row selection for bulk actions
// - Responsive design with mobile card view
// - Loading and empty states
// - Action buttons per row

"use client";

import * as React from "react";
import Link from "next/link";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  X,
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Truck,
  Package,
  Clock,
  RefreshCw,
  Download,
  Printer,
} from "lucide-react";
import { cn, formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import {
  OrderStatus,
  PaymentStatus,
  OrderStatusLabels,
} from "@/types";

// ============================================
// TYPES & INTERFACES
// ============================================

export interface OrderTableOrder {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
  itemCount: number;
  createdAt: Date | string;
  deliveryDate?: Date | string | null;
  // For farmer view
  grocer?: {
    businessName: string;
    user: {
      name: string;
      email?: string;
    };
  };
  // For grocer view
  farmer?: {
    farmName: string;
    user: {
      name: string;
      email?: string;
    };
  };
}

export type SortDirection = "asc" | "desc" | null;

export interface SortConfig {
  key: keyof OrderTableOrder | string;
  direction: SortDirection;
}

export interface FilterConfig {
  search: string;
  status: OrderStatus | "all";
  paymentStatus: PaymentStatus | "all";
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
}

export interface OrderTableProps {
  /**
   * Array of orders to display
   */
  orders: OrderTableOrder[];

  /**
   * View mode (farmer sees grocers, grocer sees farmers)
   */
  viewMode: "farmer" | "grocer";

  /**
   * Callback when order status is updated
   */
  onStatusUpdate?: (orderId: string, newStatus: OrderStatus) => void;

  /**
   * Callback when order is viewed
   */
  onViewOrder?: (orderId: string) => void;

  /**
   * Callback when orders are selected
   */
  onSelectionChange?: (selectedIds: string[]) => void;

  /**
   * Loading state
   */
  isLoading?: boolean;

  /**
   * Show filters
   */
  showFilters?: boolean;

  /**
   * Show pagination
   */
  showPagination?: boolean;

  /**
   * Default page size
   */
  defaultPageSize?: number;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Empty state message
   */
  emptyMessage?: string;
}

// ============================================
// ORDER STATUS BADGE COMPONENT
// ============================================

interface OrderStatusBadgeProps {
  status: OrderStatus;
  size?: "sm" | "default";
}

export function OrderStatusBadge({ status, size = "default" }: OrderStatusBadgeProps) {
  const statusConfig: Record<
    OrderStatus,
    { icon: React.ReactNode; className: string }
  > = {
    PENDING: {
      icon: <Clock className="h-3 w-3" />,
      className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    },
    CONFIRMED: {
      icon: <CheckCircle className="h-3 w-3" />,
      className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    },
    PROCESSING: {
      icon: <Package className="h-3 w-3" />,
      className: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400",
    },
    READY_FOR_PICKUP: {
      icon: <Package className="h-3 w-3" />,
      className: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    },
    OUT_FOR_DELIVERY: {
      icon: <Truck className="h-3 w-3" />,
      className: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
    },
    DELIVERED: {
      icon: <CheckCircle className="h-3 w-3" />,
      className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    },
    CANCELLED: {
      icon: <XCircle className="h-3 w-3" />,
      className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    },
    REFUNDED: {
      icon: <RefreshCw className="h-3 w-3" />,
      className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        config.className
      )}
    >
      {config.icon}
      {OrderStatusLabels[status]}
    </span>
  );
}

// ============================================
// PAYMENT STATUS BADGE COMPONENT
// ============================================

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const statusConfig: Record<PaymentStatus, { label: string; className: string }> = {
    PENDING: {
      label: "Pending",
      className: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
    },
    PAID: {
      label: "Paid",
      className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    },
    FAILED: {
      label: "Failed",
      className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    },
    REFUNDED: {
      label: "Refunded",
      className: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
        config.className
      )}
    >
      {config.label}
    </span>
  );
}

// ============================================
// ORDER TABLE COMPONENT
// ============================================

export function OrderTable({
  orders,
  viewMode,
  onStatusUpdate,
  onSelectionChange,
  isLoading = false,
  showFilters = true,
  showPagination = true,
  defaultPageSize = 10,
  className,
  emptyMessage = "No orders found",
}: OrderTableProps) {
  // ─────────────────────────────────────────
  // STATE
  // ─────────────────────────────────────────

  const [sortConfig, setSortConfig] = React.useState<SortConfig>({
    key: "createdAt",
    direction: "desc",
  });

  const [filters, setFilters] = React.useState<FilterConfig>({
    search: "",
    status: "all",
    paymentStatus: "all",
    dateRange: { from: null, to: null },
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(defaultPageSize);
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [actionMenuOpen, setActionMenuOpen] = React.useState<string | null>(null);

  // ─────────────────────────────────────────
  // SORTING
  // ─────────────────────────────────────────

  const handleSort = (key: keyof OrderTableOrder | string) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        // Cycle through: asc -> desc -> null
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: "", direction: null };
        return { key, direction: "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const getSortIcon = (key: string) => {
    if (sortConfig.key !== key) {
      return <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50" />;
    }
    if (sortConfig.direction === "asc") {
      return <ChevronUp className="h-4 w-4 text-primary" />;
    }
    if (sortConfig.direction === "desc") {
      return <ChevronDown className="h-4 w-4 text-primary" />;
    }
    return <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50" />;
  };

  // ─────────────────────────────────────────
  // FILTERING
  // ─────────────────────────────────────────

  const filteredOrders = React.useMemo(() => {
    let result = [...orders];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter((order) => {
        const searchableFields = [
          order.orderNumber,
          order.grocer?.businessName,
          order.grocer?.user.name,
          order.farmer?.farmName,
          order.farmer?.user.name,
        ];
        return searchableFields.some(
          (field) => field?.toLowerCase().includes(searchLower)
        );
      });
    }

    // Status filter
    if (filters.status !== "all") {
      result = result.filter((order) => order.status === filters.status);
    }

    // Payment status filter
    if (filters.paymentStatus !== "all") {
      result = result.filter(
        (order) => order.paymentStatus === filters.paymentStatus
      );
    }

    // Date range filter
    if (filters.dateRange.from) {
      result = result.filter(
        (order) => new Date(order.createdAt) >= filters.dateRange.from!
      );
    }
    if (filters.dateRange.to) {
      result = result.filter(
        (order) => new Date(order.createdAt) <= filters.dateRange.to!
      );
    }

    return result;
  }, [orders, filters]);

  // ─────────────────────────────────────────
  // SORTING APPLIED
  // ─────────────────────────────────────────

  const sortedOrders = React.useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) {
      return filteredOrders;
    }

    return [...filteredOrders].sort((a, b) => {
      let aValue: any = a[sortConfig.key as keyof OrderTableOrder];
      let bValue: any = b[sortConfig.key as keyof OrderTableOrder];

      // Handle nested properties
      if (sortConfig.key === "customerName") {
        aValue = viewMode === "farmer" ? a.grocer?.user.name : a.farmer?.user.name;
        bValue = viewMode === "farmer" ? b.grocer?.user.name : b.farmer?.user.name;
      }

      // Handle dates
      if (sortConfig.key === "createdAt" || sortConfig.key === "deliveryDate") {
        aValue = aValue ? new Date(aValue).getTime() : 0;
        bValue = bValue ? new Date(bValue).getTime() : 0;
      }

      // Handle numbers
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortConfig.direction === "asc" ? aValue - bValue : bValue - aValue;
      }

      // Handle strings
      const aStr = String(aValue || "").toLowerCase();
      const bStr = String(bValue || "").toLowerCase();

      if (sortConfig.direction === "asc") {
        return aStr.localeCompare(bStr);
      }
      return bStr.localeCompare(aStr);
    });
  }, [filteredOrders, sortConfig, viewMode]);

  // ─────────────────────────────────────────
  // PAGINATION
  // ─────────────────────────────────────────

  const totalPages = Math.ceil(sortedOrders.length / pageSize);
  const paginatedOrders = React.useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedOrders.slice(start, start + pageSize);
  }, [sortedOrders, currentPage, pageSize]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // ─────────────────────────────────────────
  // SELECTION
  // ─────────────────────────────────────────

  const handleSelectAll = () => {
    if (selectedIds.length === paginatedOrders.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedOrders.map((o) => o.id));
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  React.useEffect(() => {
    onSelectionChange?.(selectedIds);
  }, [selectedIds, onSelectionChange]);

  // ─────────────────────────────────────────
  // CLEAR FILTERS
  // ─────────────────────────────────────────

  const clearFilters = () => {
    setFilters({
      search: "",
      status: "all",
      paymentStatus: "all",
      dateRange: { from: null, to: null },
    });
  };

  const hasActiveFilters =
    filters.search ||
    filters.status !== "all" ||
    filters.paymentStatus !== "all" ||
    filters.dateRange.from ||
    filters.dateRange.to;

  // ─────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────

  return (
    <div className={cn("space-y-4", className)}>
      {/* Toolbar */}
      {showFilters && (
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search orders..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className={cn(
                "w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background",
                "text-sm placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              )}
            />
            {filters.search && (
              <button
                onClick={() => setFilters((prev) => ({ ...prev, search: "" }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Filter Actions */}
          <div className="flex items-center gap-2">
            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  status: e.target.value as OrderStatus | "all",
                }))
              }
              className={cn(
                "px-3 py-2 rounded-md border border-input bg-background",
                "text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              )}
            >
              <option value="all">All Status</option>
              {Object.entries(OrderStatusLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}

            {/* Export */}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Selection Actions */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <span className="text-sm font-medium">
            {selectedIds.length} order{selectedIds.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex-1" />
          <Button variant="outline" size="sm" onClick={() => setSelectedIds([])}>
            Clear Selection
          </Button>
          <Button size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print Selected
          </Button>
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border bg-card overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {/* Checkbox */}
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={
                      paginatedOrders.length > 0 &&
                      selectedIds.length === paginatedOrders.length
                    }
                    onChange={handleSelectAll}
                    className="rounded border-input"
                  />
                </th>

                {/* Order Number */}
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort("orderNumber")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Order
                    {getSortIcon("orderNumber")}
                  </button>
                </th>

                {/* Customer/Farmer */}
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort("customerName")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {viewMode === "farmer" ? "Customer" : "Farmer"}
                    {getSortIcon("customerName")}
                  </button>
                </th>

                {/* Status */}
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort("status")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Status
                    {getSortIcon("status")}
                  </button>
                </th>

                {/* Payment */}
                <th className="px-4 py-3 text-left">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Payment
                  </span>
                </th>

                {/* Items */}
                <th className="px-4 py-3 text-center">
                  <button
                    onClick={() => handleSort("itemCount")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Items
                    {getSortIcon("itemCount")}
                  </button>
                </th>

                {/* Total */}
                <th className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleSort("total")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors ml-auto"
                  >
                    Total
                    {getSortIcon("total")}
                  </button>
                </th>

                {/* Date */}
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort("createdAt")}
                    className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Date
                    {getSortIcon("createdAt")}
                  </button>
                </th>

                {/* Actions */}
                <th className="w-16 px-4 py-3 text-right">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b">
                    <td className="px-4 py-4">
                      <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-5 w-16 bg-muted animate-pulse rounded-full" />
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="h-4 w-8 bg-muted animate-pulse rounded mx-auto" />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="h-4 w-20 bg-muted animate-pulse rounded ml-auto" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="h-8 w-8 bg-muted animate-pulse rounded" />
                    </td>
                  </tr>
                ))
              ) : paginatedOrders.length === 0 ? (
                // Empty state
                <tr>
                  <td colSpan={9} className="px-4 py-12 text-center">
                    <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium">{emptyMessage}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {hasActiveFilters
                        ? "Try adjusting your filters"
                        : "Orders will appear here when placed"}
                    </p>
                    {hasActiveFilters && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearFilters}
                        className="mt-4"
                      >
                        Clear Filters
                      </Button>
                    )}
                  </td>
                </tr>
              ) : (
                // Data rows
                paginatedOrders.map((order) => (
                  <tr
                    key={order.id}
                    className={cn(
                      "border-b hover:bg-muted/50 transition-colors",
                      selectedIds.includes(order.id) && "bg-primary/5"
                    )}
                  >
                    {/* Checkbox */}
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(order.id)}
                        onChange={() => handleSelectRow(order.id)}
                        className="rounded border-input"
                      />
                    </td>

                    {/* Order Number */}
                    <td className="px-4 py-4">
                      <Link
                        href={`/${viewMode}/orders/${order.id}`}
                        className="font-medium text-primary hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>

                    {/* Customer/Farmer */}
                    <td className="px-4 py-4">
                      <div>
                        <p className="font-medium">
                          {viewMode === "farmer"
                            ? order.grocer?.businessName
                            : order.farmer?.farmName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {viewMode === "farmer"
                            ? order.grocer?.user.name
                            : order.farmer?.user.name}
                        </p>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <OrderStatusBadge status={order.status} />
                    </td>

                    {/* Payment */}
                    <td className="px-4 py-4">
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </td>

                    {/* Items */}
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm">{order.itemCount}</span>
                    </td>

                    {/* Total */}
                    <td className="px-4 py-4 text-right">
                      <span className="font-semibold">
                        {formatCurrency(order.total)}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4">
                      <div>
                        <p className="text-sm">
                          {formatDate(order.createdAt, "short")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatRelativeTime(order.createdAt)}
                        </p>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="relative">
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          onClick={() =>
                            setActionMenuOpen(
                              actionMenuOpen === order.id ? null : order.id
                            )
                          }
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>

                        {/* Dropdown Menu */}
                        {actionMenuOpen === order.id && (
                          <>
                            <div
                              className="fixed inset-0 z-10"
                              onClick={() => setActionMenuOpen(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 w-48 rounded-md border bg-popover shadow-lg z-20 py-1">
                              <Link
                                href={`/${viewMode}/orders/${order.id}`}
                                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
                                onClick={() => setActionMenuOpen(null)}
                              >
                                <Eye className="h-4 w-4" />
                                View Details
                              </Link>

                              {viewMode === "farmer" &&
                                order.status === "PENDING" && (
                                  <>
                                    <button
                                      onClick={() => {
                                        onStatusUpdate?.(order.id, "CONFIRMED");
                                        setActionMenuOpen(null);
                                      }}
                                      className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent transition-colors text-left"
                                    >
                                      <CheckCircle className="h-4 w-4 text-green-500" />
                                      Confirm Order
                                    </button>
                                    <button
                                      onClick={() => {
                                        onStatusUpdate?.(order.id, "CANCELLED");
                                        setActionMenuOpen(null);
                                      }}
                                      className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent transition-colors text-left text-destructive"
                                    >
                                      <XCircle className="h-4 w-4" />
                                      Cancel Order
                                    </button>
                                  </>
                                )}

                              <div className="border-t my-1" />

                              <button
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent transition-colors text-left"
                                onClick={() => setActionMenuOpen(null)}
                              >
                                <Printer className="h-4 w-4" />
                                Print Invoice
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="p-4 space-y-3">
                <div className="flex justify-between">
                  <div className="h-5 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-6 w-20 bg-muted animate-pulse rounded-full" />
                </div>
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
                <div className="flex justify-between">
                  <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                  <div className="h-5 w-16 bg-muted animate-pulse rounded" />
                </div>
              </div>
            ))
          ) : paginatedOrders.length === 0 ? (
            <div className="p-8 text-center">
              <Package className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-lg font-medium">{emptyMessage}</h3>
            </div>
          ) : (
            paginatedOrders.map((order) => (
              <div key={order.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <Link
                      href={`/${viewMode}/orders/${order.id}`}
                      className="font-semibold text-primary hover:underline"
                    >
                      {order.orderNumber}
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {viewMode === "farmer"
                        ? order.grocer?.businessName
                        : order.farmer?.farmName}
                    </p>
                  </div>
                  <OrderStatusBadge status={order.status} size="sm" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {order.itemCount} items • {formatRelativeTime(order.createdAt)}
                  </span>
                  <span className="font-semibold">
                    {formatCurrency(order.total)}
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <Link href={`/${viewMode}/orders/${order.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Link>
                  </Button>
                  {viewMode === "farmer" && order.status === "PENDING" && (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => onStatusUpdate?.(order.id, "CONFIRMED")}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirm
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {showPagination && sortedOrders.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Page Size Selector */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Show</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2 py-1 rounded border border-input bg-background text-sm"
            >
              {[5, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <span>of {sortedOrders.length} orders</span>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <span className="px-3 py-1 text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// EXPORTS
// ============================================

export default OrderTable;
