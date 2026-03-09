// Farm-to-Grocer MVP - Farmer Dashboard Page
// Path: app/(dashboard)/farmer/page.tsx
//
// Server Component that displays farmer's dashboard with:
// - Key metrics/stats cards
// - Recent orders
// - Revenue chart
// - Top products
// - Quick actions

import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  Package,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Star,
  AlertCircle,
  Plus,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Truck,
} from "lucide-react";

import { requireFarmer } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";


// Components
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { OrderStatusBadge } from "@/components/orders/OrderStatusBadge";

// ============================================
// METADATA
// ============================================

export const metadata = {
  title: "Farmer Dashboard",
  description: "Manage your farm products, orders, and track your sales performance.",
};

// ============================================
// DATA FETCHING FUNCTIONS
// ============================================

/**
 * Fetch farmer dashboard statistics
 */
async function getFarmerStats(farmerId: string) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  // Execute all queries in parallel
  const [
    totalProducts,
    activeProducts,
    lowStockProducts,
    totalOrders,
    pendingOrders,
    thisMonthOrders,
    lastMonthOrders,
    thisMonthRevenue,
    lastMonthRevenue,
    farmer,
  ] = await Promise.all([
    // Total products
    prisma.product.count({
      where: { farmerId },
    }),

    // Active products
    prisma.product.count({
      where: { farmerId, status: "ACTIVE" },
    }),

    // Low stock products (less than 10 units)
    prisma.product.count({
      where: { farmerId, status: "ACTIVE", availableQty: { lt: 10 } },
    }),

    // Total orders
    prisma.order.count({
      where: { farmerId },
    }),

    // Pending orders
    prisma.order.count({
      where: { farmerId, status: { in: ["PENDING", "CONFIRMED", "PROCESSING"] } },
    }),

    // This month orders
    prisma.order.count({
      where: { farmerId, createdAt: { gte: startOfMonth } },
    }),

    // Last month orders
    prisma.order.count({
      where: {
        farmerId,
        createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
      },
    }),

    // This month revenue
    prisma.order.aggregate({
      where: {
        farmerId,
        status: "DELIVERED",
        createdAt: { gte: startOfMonth },
      },
      _sum: { total: true },
    }),

    // Last month revenue
    prisma.order.aggregate({
      where: {
        farmerId,
        status: "DELIVERED",
        createdAt: { gte: startOfLastMonth, lte: endOfLastMonth },
      },
      _sum: { total: true },
    }),

    // Farmer profile
    prisma.farmer.findUnique({
      where: { id: farmerId },
      select: { rating: true, totalSales: true, farmName: true },
    }),
  ]);

  // Calculate percentage changes
  const thisMonthRevenueValue = thisMonthRevenue._sum.total || 0;
  const lastMonthRevenueValue = lastMonthRevenue._sum.total || 0;
  const revenueChange = lastMonthRevenueValue > 0
    ? ((thisMonthRevenueValue - lastMonthRevenueValue) / lastMonthRevenueValue) * 100
    : 0;

  const ordersChange = lastMonthOrders > 0
    ? ((thisMonthOrders - lastMonthOrders) / lastMonthOrders) * 100
    : 0;

  return {
    totalProducts,
    activeProducts,
    lowStockProducts,
    totalOrders,
    pendingOrders,
    thisMonthOrders,
    thisMonthRevenue: thisMonthRevenueValue,
    revenueChange,
    ordersChange,
    rating: farmer?.rating || 0,
    totalSales: farmer?.totalSales || 0,
    farmName: farmer?.farmName || "Your Farm",
  };
}

/**
 * Fetch recent orders for the farmer
 */
async function getRecentOrders(farmerId: string, limit: number = 5) {
  return prisma.order.findMany({
    where: { farmerId },
    orderBy: { createdAt: "desc" },
    take: limit,
    include: {
      grocer: {
        include: {
          user: {
            select: { name: true },
          },
        },
      },
      items: {
        select: { id: true },
      },
    },
  });
}

/**
 * Fetch top selling products
 */
async function getTopProducts(farmerId: string, limit: number = 5) {
  const topProducts = await prisma.orderItem.groupBy({
    by: ["productId"],
    where: {
      order: {
        farmerId,
        status: "DELIVERED",
      },
    },
    _sum: {
      quantity: true,
      total: true,
    },
    orderBy: {
      _sum: {
        total: "desc",
      },
    },
    take: limit,
  });

  // Fetch product details
  const productIds = topProducts.map((p) => p.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
    select: { id: true, name: true, images: true, pricePerUnit: true, unit: true },
  });

  return topProducts.map((tp) => {
    const product = products.find((p) => p.id === tp.productId);
    return {
      id: tp.productId,
      name: product?.name || "Unknown Product",
      image: product?.images?.[0] || null,
      pricePerUnit: product?.pricePerUnit || 0,
      unit: product?.unit || "PIECE",
      totalSold: tp._sum.quantity || 0,
      revenue: tp._sum.total || 0,
    };
  });
}

/**
 * Fetch revenue data for chart (last 7 days)
 */
async function getRevenueChartData(farmerId: string) {
  const days = 7;
  const data = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    date.setHours(0, 0, 0, 0);

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const dayRevenue = await prisma.order.aggregate({
      where: {
        farmerId,
        status: "DELIVERED",
        completedAt: {
          gte: date,
          lt: nextDate,
        },
      },
      _sum: { total: true },
      _count: true,
    });

    data.push({
      date: date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }),
      revenue: dayRevenue._sum.total || 0,
      orders: dayRevenue._count || 0,
    });
  }

  return data;
}

// ============================================
// COMPONENT: STATS CARD
// ============================================

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "warning" | "success";
}

function StatsCard({ title, value, description, icon, trend, variant = "default" }: StatsCardProps) {
  const variantStyles = {
    default: "bg-card",
    warning: "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800",
    success: "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800",
  };

  return (
    <Card className={variantStyles[variant]}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <div className="flex items-center gap-2 mt-1">
            {trend && (
              <span
                className={`inline-flex items-center text-xs font-medium ${trend.isPositive ? "text-green-600" : "text-red-600"
                  }`}
              >
                {trend.isPositive ? (
                  <ArrowUpRight className="h-3 w-3 mr-0.5" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-0.5" />
                )}
                {Math.abs(trend.value).toFixed(1)}%
              </span>
            )}
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ============================================
// COMPONENT: RECENT ORDERS TABLE
// ============================================

function RecentOrdersTable({ orders }: { orders: Awaited<ReturnType<typeof getRecentOrders>> }) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <ShoppingCart className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium">No orders yet</h3>
        <p className="text-sm text-muted-foreground mt-1">
          When grocers place orders, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/farmer/orders/${order.id}`}
          className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingCart className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{order.orderNumber}</p>
              <p className="text-sm text-muted-foreground">
                {order.grocer.user.name} • {order.items.length} items
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">{formatCurrency(order.total)}</p>
            <OrderStatusBadge status={order.status} size="sm" />
          </div>
        </Link>
      ))}
    </div>
  );
}

// ============================================
// COMPONENT: TOP PRODUCTS LIST
// ============================================

function TopProductsList({ products }: { products: Awaited<ReturnType<typeof getTopProducts>> }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium">No sales data yet</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Your top products will appear here after sales.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent/50 transition-colors"
        >
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
            {index + 1}
          </div>
          <div className="h-12 w-12 rounded-md bg-muted overflow-hidden">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center">
                <Package className="h-6 w-6 text-muted-foreground" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{product.name}</p>
            <p className="text-sm text-muted-foreground">
              {product.totalSold} sold
            </p>
          </div>
          <div className="text-right">
            <p className="font-medium text-green-600">
              {formatCurrency(product.revenue)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// LOADING SKELETONS
// ============================================


function RecentOrdersSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center justify-between p-4 rounded-lg border">
          <div className="flex items-center gap-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <div className="text-right">
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-5 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default async function FarmerDashboardPage() {
  // Authenticate and get farmer data
  let farmer;
  try {
    farmer = await requireFarmer();
  } catch (error) {
    redirect("/login?callbackUrl=/farmer");
  }

  // Fetch all dashboard data in parallel
  const [stats, recentOrders, topProducts, revenueData] = await Promise.all([
    getFarmerStats(farmer.farmerId),
    getRecentOrders(farmer.farmerId),
    getTopProducts(farmer.farmerId),
    getRevenueChartData(farmer.farmerId),
  ]);

  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {(farmer.name ?? "").split(" ")[0] || "Farmer"}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with {stats.farmName} today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" asChild>
            <Link href="/farmer/products">
              <Package className="h-4 w-4 mr-2" />
              View Products
            </Link>
          </Button>
          <Button asChild>
            <Link href="/farmer/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Monthly Revenue"
          value={formatCurrency(stats.thisMonthRevenue)}
          icon={<DollarSign className="h-4 w-4" />}
          trend={{
            value: stats.revenueChange,
            isPositive: stats.revenueChange >= 0,
          }}
          description="vs last month"
        />
        <StatsCard
          title="Orders This Month"
          value={stats.thisMonthOrders}
          icon={<ShoppingCart className="h-4 w-4" />}
          trend={{
            value: stats.ordersChange,
            isPositive: stats.ordersChange >= 0,
          }}
          description="vs last month"
        />
        <StatsCard
          title="Active Products"
          value={`${stats.activeProducts} / ${stats.totalProducts}`}
          icon={<Package className="h-4 w-4" />}
          description="products listed"
        />
        <StatsCard
          title="Average Rating"
          value={stats.rating.toFixed(1)}
          icon={<Star className="h-4 w-4" />}
          description={`${stats.totalSales} total sales`}
          variant="success"
        />
      </div>

      {/* Alerts */}
      {stats.pendingOrders > 0 && (
        <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-amber-800 dark:text-amber-200">
                You have {stats.pendingOrders} pending order{stats.pendingOrders > 1 ? "s" : ""}
              </p>
              <p className="text-sm text-amber-600 dark:text-amber-400">
                Review and confirm orders to keep your customers happy.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="border-amber-300 hover:bg-amber-100">
              <Link href="/farmer/orders?status=PENDING">
                View Orders
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {stats.lowStockProducts > 0 && (
        <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
          <CardContent className="flex items-center gap-4 py-4">
            <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-red-800 dark:text-red-200">
                {stats.lowStockProducts} product{stats.lowStockProducts > 1 ? "s" : ""} running low on stock
              </p>
              <p className="text-sm text-red-600 dark:text-red-400">
                Update your inventory to avoid missing sales.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild className="border-red-300 hover:bg-red-100">
              <Link href="/farmer/products?filter=low-stock">
                Update Stock
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Charts and Tables */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Revenue Chart */}
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Your sales performance over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
              <RevenueChart data={revenueData} />
            </Suspense>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best selling items this month</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/farmer/analytics">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <TopProductsList products={topProducts} />
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest orders from grocers</CardDescription>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/farmer/orders">
              View All Orders
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<RecentOrdersSkeleton />}>
            <RecentOrdersTable orders={recentOrders} />
          </Suspense>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <Link href="/farmer/products/new">
            <CardContent className="flex items-center gap-4 py-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Add New Product</p>
                <p className="text-sm text-muted-foreground">List a new item for sale</p>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <Link href="/farmer/orders">
            <CardContent className="flex items-center gap-4 py-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">Manage Orders</p>
                <p className="text-sm text-muted-foreground">Process and track orders</p>
              </div>
            </CardContent>
          </Link>
        </Card>

        <Card className="hover:border-primary/50 transition-colors cursor-pointer group">
          <Link href="/farmer/analytics">
            <CardContent className="flex items-center gap-4 py-6">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="font-medium">View Analytics</p>
                <p className="text-sm text-muted-foreground">Insights and reports</p>
              </div>
            </CardContent>
          </Link>
        </Card>
      </div>
    </div>
  );
}
