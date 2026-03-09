import React from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

// Assuming these are the valid statuses based on types
export type CommonOrderStatus =
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";

interface OrderStatusBadgeProps {
    status: CommonOrderStatus | string;
    size?: "default" | "sm" | "lg";
    className?: string;
}

export function OrderStatusBadge({ status, className }: OrderStatusBadgeProps) {
    const statusColors: Record<string, string> = {
        PENDING: "bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300",
        CONFIRMED: "bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300",
        PROCESSING: "bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300",
        SHIPPED: "bg-indigo-100 text-indigo-800 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300",
        DELIVERED: "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300",
        CANCELLED: "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-300",
    };

    const statusLabels: Record<string, string> = {
        PENDING: "Pending",
        CONFIRMED: "Confirmed",
        PROCESSING: "Processing",
        SHIPPED: "Shipped",
        DELIVERED: "Delivered",
        CANCELLED: "Cancelled",
    };

    const colorClass = statusColors[status as string] || "bg-gray-100 text-gray-800";
    const label = statusLabels[status as string] || status;

    return (
        <Badge
            variant="outline"
            className={cn("font-medium border-0", colorClass, className)}
        >
            {label}
        </Badge>
    );
}
