"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function RevenueChart({ data }: { data: any[] }) {
    if (!data || data.length === 0) {
        return (
            <div className="flex h-[300px] w-full items-center justify-center rounded-md border border-dashed text-sm text-muted-foreground">
                No revenue data available
            </div>
        );
    }

    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 10,
                        left: 10,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.2} />
                    <XAxis
                        dataKey="date"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        padding={{ left: 10, right: 10 }}
                    />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip
                        formatter={(value: number) => [`$${value.toFixed(2)}`, "Revenue"]}
                        labelStyle={{ color: "black" }}
                        contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0" }}
                    />
                    <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#16a34a"
                        strokeWidth={3}
                        dot={{ r: 4, fill: "#16a34a" }}
                        activeDot={{ r: 6, fill: "#16a34a", stroke: "#bbf7d0", strokeWidth: 4 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
