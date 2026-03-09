// Farm-to-Grocer MVP - Grocer Orders Management Page
// Path: app/(dashboard)/grocer/orders/page.tsx
//
// A comprehensive orders management page with:
// - Order listing with status tabs
// - Search, filter, and sort functionality
// - Pagination with page size selector
// - Order details quick view
// - Reorder functionality
// - Mobile-responsive card view

import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Search,
  Package,
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  RefreshCw,
  Eye,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Download,
  MapPin,
  Star,
  X,
} from "lucide-react";

import { requireGrocer } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { formatCurrency, formatDate, formatRelativeTime } from "@/lib/utils";
import { OrderStatus, PaymentStatus, OrderStatusLabels } from "@/types";

// Components
import { Button } from "@/components/ui/Button";


// ============================================
// METADATA
// ============================================

export const metadata = {
  title: "My Orders",
  description: "View and manage your orders from local farmers.",
};

// ============================================
// TYPES
// ============================================

interface SearchParams {
  search?: string;
  status?: OrderStatus | "all" | "active";
  sort?: string;
  order?: "asc" | "desc";
  page?: string;
  limit?: string;
}

// ============================================
// DATA FETCHING
// ============================================

async function getOrders(grocerId: string, searchParams: SearchParams) {
  const {
    search = "",
    status = "all",
    sort = "createdAt",
    order = "desc",
    page = "1",
    limit = "10",
  } = searchParams;

  const pageSize = parseInt(limit, 10) || 10;
  const currentPage = parseInt(page, 10) || 1;
  const skip = (currentPage - 1) * pageSize;

  // Build where clause
  const where: any = {
    grocerId,
  };

  // Search filter
  if (search) {
    where.OR = [
      { orderNumber: { contains: search, mode: "insensitive" } },
      { farmer: { farmName: { contains: search, mode: "insensitive" } } },
      { farmer: { user: { name: { contains: search, mode: "insensitive" } } } },
    ];
  }

  // Status filter
  if (status === "active") {
    where.status = {
      notIn: ["DELIVERED", "CANCELLED", "REFUNDED"],
    };
  } else if (status && status !== "all") {
    where.status = status;
  }

  // Build orderBy
  const orderBy: any = {};
  const validSortFields = ["createdAt", "total", "status"];
  if (validSortFields.includes(sort)) {
    orderBy[sort] = order;
  } else {
    orderBy.createdAt = "desc";
  }

  // Execute queries in parallel
  const [orders, totalCount, statusCounts] = await Promise.all([
    prisma.order.findMany({
      where,
      orderBy,
      skip,
      take: pageSize,
      include: {
        farmer: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
        items: {
          include: {
            product: {
              select: { name: true, images: true },
            },
          },
        },
      },
    }),
    prisma.order.count({ where }),
    // Get counts for each status
    prisma.order.groupBy({
      by: ["status"],
      where: { grocerId },
      _count: true,
    }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  // Calculate status counts
  const counts: Record<string, number> = {
    all: await prisma.order.count({ where: { grocerId } }),
    active: await prisma.order.count({
      where: {
        grocerId,
        status: { notIn: ["DELIVERED", "CANCELLED", "REFUNDED"] },
      },
    }),
  };

  statusCounts.forEach((s) => {
    counts[s.status] = s._count;
  });

  return {
    orders,
    pagination: {
      currentPage,
      totalPages,
      totalCount,
      pageSize,
      hasNext: currentPage < totalPages,
      hasPrev: currentPage > 1,
    },
    statusCounts: counts,
  };
}

// ============================================
// ORDER STATUS BADGE COMPONENT
// ============================================

function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const config: Record<OrderStatus, { icon: React.ReactNode; className: string }> = {
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

  const { icon, className } = config[status];

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${className}`}
    >
      {icon}
      {OrderStatusLabels[status]}
    </span>
  );
}

// ============================================
// PAYMENT STATUS BADGE
// ============================================

function PaymentStatusBadge({ status }: { status: PaymentStatus }) {
  const config: Record<PaymentStatus, { label: string; className: string }> = {
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

  const { label, className } = config[status];

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${className}`}>
      {label}
    </span>
  );
}

// ============================================
// FILTERS COMPONENT
// ============================================

interface FiltersProps {
  searchParams: SearchParams;
  statusCounts: Record<string, number>;
}

function Filters({ searchParams, statusCounts }: FiltersProps) {
  const { search = "", status = "all" } = searchParams;

  const statusTabs = [
    { value: "all", label: "All Orders", count: statusCounts.all || 0 },
    { value: "active", label: "Active", count: statusCounts.active || 0 },
    { value: "PENDING", label: "Pending", count: statusCounts.PENDING || 0 },
    { value: "DELIVERED", label: "Delivered", count: statusCounts.DELIVERED || 0 },
    { value: "CANCELLED", label: "Cancelled", count: statusCounts.CANCELLED || 0 },
  ];

  return (
    <div className="space-y-4">
      {/* Status Tabs */}
      <div className="flex items-center gap-1 p-1 bg-muted rounded-lg overflow-x-auto">
        {statusTabs.map((tab) => (
          <Link
            key={tab.value}
            href={`/grocer/orders?${new URLSearchParams({
              ...searchParams,
              status: tab.value,
              page: "1",
            } as any).toString()}`}
            className={`px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${status === tab.value
              ? "bg-background shadow-sm text-foreground"
              : "text-muted-foreground hover:text-foreground"
              }`}
          >
            {tab.label}
            <span className="ml-1.5 text-xs text-muted-foreground">({tab.count})</span>
          </Link>
        ))}
      </div>

      {/* Search and Actions Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Search */}
        <form className="relative flex-1 max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            name="search"
            defaultValue={search}
            placeholder="Search orders or farmers..."
            className="w-full pl-10 pr-4 py-2 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {search && (
            <Link
              href={`/grocer/orders?${new URLSearchParams({
                ...searchParams,
                search: "",
                page: "1",
              } as any).toString()}`}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </Link>
          )}
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// ORDER ROW COMPONENT (Desktop)
// ============================================

interface OrderRowProps {
  order: any;
}

function OrderRow({ order }: OrderRowProps) {
  const itemCount = order.items.length;
  const firstProductImage = order.items[0]?.product?.images?.[0];

  return (
    <tr className="border-b hover:bg-muted/50 transition-colors">
      {/* Order Info */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          {/* Product Preview */}
          <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            {firstProductImage ? (
              <img
                src={firstProductImage}
                alt="Order preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
          <div>
            <Link
              href={`/grocer/orders/${order.id}`}
              className="font-medium text-primary hover:underline"
            >
              {order.orderNumber}
            </Link>
            <p className="text-sm text-muted-foreground">
              {itemCount} item{itemCount > 1 ? "s" : ""}
            </p>
          </div>
        </div>
      </td>

      {/* Farmer */}
      <td className="px-4 py-4">
        <div>
          <p className="font-medium">{order.farmer.farmName}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {order.farmer.city}, {order.farmer.state}
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

      {/* Total */}
      <td className="px-4 py-4">
        <span className="font-semibold">{formatCurrency(order.total)}</span>
      </td>

      {/* Date */}
      <td className="px-4 py-4">
        <div>
          <p className="text-sm">{formatDate(order.createdAt, "short")}</p>
          <p className="text-xs text-muted-foreground">
            {formatRelativeTime(order.createdAt)}
          </p>
        </div>
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon-sm" asChild>
            <Link href={`/grocer/orders/${order.id}`}>
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <OrderActionsMenu order={order} />
        </div>
      </td>
    </tr>
  );
}

// ============================================
// ORDER ACTIONS MENU
// ============================================

function OrderActionsMenu({ order }: { order: any }) {
  const canReorder = order.status === "DELIVERED";
  const canCancel = ["PENDING", "CONFIRMED"].includes(order.status);

  return (
    <div className="relative group">
      <Button variant="ghost" size="icon-sm">
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {/* Dropdown */}
      <div className="absolute right-0 top-full mt-1 w-48 rounded-md border bg-popover shadow-lg z-20 py-1 hidden group-hover:block group-focus-within:block">
        <Link
          href={`/grocer/orders/${order.id}`}
          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
        >
          <Eye className="h-4 w-4" />
          View Details
        </Link>

        {canReorder && (
          <Link
            href={`/grocer/orders/${order.id}/reorder`}
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Reorder
          </Link>
        )}

        <Link
          href={`/grocer/farmers/${order.farmerId}`}
          className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent transition-colors"
        >
          <Star className="h-4 w-4" />
          View Farmer
        </Link>

        {canCancel && (
          <>
            <div className="border-t my-1" />
            <button className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-accent transition-colors text-left text-destructive">
              <XCircle className="h-4 w-4" />
              Cancel Order
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================
// ORDER CARD COMPONENT (Mobile)
// ============================================

function OrderCard({ order }: { order: any }) {
  const itemCount = order.items.length;
  const firstProductImage = order.items[0]?.product?.images?.[0];

  return (
    <div className="p-4 border-b last:border-b-0">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            {firstProductImage ? (
              <img
                src={firstProductImage}
                alt="Order preview"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
            )}
          </div>
          <div>
            <Link
              href={`/grocer/orders/${order.id}`}
              className="font-semibold text-primary hover:underline"
            >
              {order.orderNumber}
            </Link>
            <p className="text-sm text-muted-foreground">
              {order.farmer.farmName}
            </p>
          </div>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      {/* Details */}
      <div className="flex items-center justify-between text-sm mb-3">
        <span className="text-muted-foreground">
          {itemCount} item{itemCount > 1 ? "s" : ""} • {formatRelativeTime(order.createdAt)}
        </span>
        <span className="font-semibold">{formatCurrency(order.total)}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link href={`/grocer/orders/${order.id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Link>
        </Button>
        {order.status === "DELIVERED" && (
          <Button size="sm" className="flex-1" asChild>
            <Link href={`/grocer/orders/${order.id}/reorder`}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reorder
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

// ============================================
// PAGINATION COMPONENT
// ============================================

interface PaginationProps {
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    pageSize: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  searchParams: SearchParams;
}

function Pagination({ pagination, searchParams }: PaginationProps) {
  const { currentPage, totalPages, totalCount, pageSize, hasNext, hasPrev } = pagination;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams as any);
    params.set("page", page.toString());
    return `/grocer/orders?${params.toString()}`;
  };

  // Generate visible page numbers
  const getVisiblePages = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("ellipsis");
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Page Size Selector */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>Show</span>
        <select
          defaultValue={pageSize}
          onChange={(e) => {
            const params = new URLSearchParams(searchParams as any);
            params.set("limit", e.target.value);
            params.set("page", "1");
            window.location.href = `/grocer/orders?${params.toString()}`;
          }}
          className="px-2 py-1 rounded border border-input bg-background text-sm"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span>of {totalCount} orders</span>
      </div>

      {/* Page Navigation */}
      <div className="flex items-center gap-1">
        {/* First Page */}
        <Button
          variant="outline"
          size="icon-sm"
          disabled={!hasPrev}
          asChild={hasPrev}
        >
          {hasPrev ? (
            <Link href={createPageUrl(1)}>
              <ChevronsLeft className="h-4 w-4" />
            </Link>
          ) : (
            <span>
              <ChevronsLeft className="h-4 w-4" />
            </span>
          )}
        </Button>

        {/* Previous Page */}
        <Button
          variant="outline"
          size="icon-sm"
          disabled={!hasPrev}
          asChild={hasPrev}
        >
          {hasPrev ? (
            <Link href={createPageUrl(currentPage - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          ) : (
            <span>
              <ChevronLeft className="h-4 w-4" />
            </span>
          )}
        </Button>

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center gap-1">
          {getVisiblePages().map((page, index) =>
            page === "ellipsis" ? (
              <span key={`ellipsis-${index}`} className="px-2 text-muted-foreground">
                ...
              </span>
            ) : (
              <Link
                key={page}
                href={createPageUrl(page)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${page === currentPage
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
                  }`}
              >
                {page}
              </Link>
            )
          )}
        </div>

        {/* Mobile Page Indicator */}
        <span className="sm:hidden px-3 py-1 text-sm">
          {currentPage} / {totalPages}
        </span>

        {/* Next Page */}
        <Button
          variant="outline"
          size="icon-sm"
          disabled={!hasNext}
          asChild={hasNext}
        >
          {hasNext ? (
            <Link href={createPageUrl(currentPage + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <span>
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </Button>

        {/* Last Page */}
        <Button
          variant="outline"
          size="icon-sm"
          disabled={!hasNext}
          asChild={hasNext}
        >
          {hasNext ? (
            <Link href={createPageUrl(totalPages)}>
              <ChevronsRight className="h-4 w-4" />
            </Link>
          ) : (
            <span>
              <ChevronsRight className="h-4 w-4" />
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}



// ============================================
// EMPTY STATE
// ============================================

function EmptyState({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
        <ShoppingCart className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">
        {hasFilters ? "No orders found" : "No orders yet"}
      </h3>
      <p className="text-muted-foreground max-w-sm mb-6">
        {hasFilters
          ? "Try adjusting your search or filters to find what you're looking for."
          : "Start browsing products from local farmers to place your first order."}
      </p>
      {!hasFilters && (
        <Button asChild>
          <Link href="/grocer/browse">
            <Search className="h-4 w-4 mr-2" />
            Browse Products
          </Link>
        </Button>
      )}
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default async function GrocerOrdersPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  // Authenticate grocer
  let grocer;
  try {
    grocer = await requireGrocer();
  } catch (error) {
    redirect("/login?callbackUrl=/grocer/orders");
  }

  // Fetch orders
  const { orders, pagination, statusCounts } = await getOrders(
    grocer.grocerId,
    searchParams
  );

  const hasFilters = !!(searchParams.search || (searchParams.status && searchParams.status !== "all"));

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
          <p className="text-muted-foreground">
            View and manage your orders from local farmers.
          </p>
        </div>
        <Button asChild>
          <Link href="/grocer/browse">
            <Search className="h-4 w-4 mr-2" />
            Browse Products
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Filters searchParams={searchParams} statusCounts={statusCounts} />

      {/* Orders Table/Cards */}
      {orders.length === 0 ? (
        <EmptyState hasFilters={hasFilters} />
      ) : (
        <div className="rounded-lg border bg-card overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left">
                    <button className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground">
                      Order
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Farmer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Payment
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground">
                      Total
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-foreground">
                      Date
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                  <th className="w-20 px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden divide-y">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </div>
      )}

      {/* Pagination */}
      {orders.length > 0 && (
        <Pagination pagination={pagination} searchParams={searchParams} />
      )}
    </div>
  );
}
