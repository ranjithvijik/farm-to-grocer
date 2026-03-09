"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionContextValue {
    activeItems: string[];
    toggleItem: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null);

export function Accordion({
    children,
    className,
    allowMultiple = false,
}: {
    children: React.ReactNode;
    className?: string;
    allowMultiple?: boolean;
}) {
    const [activeItems, setActiveItems] = React.useState<string[]>([]);

    const toggleItem = (value: string) => {
        setActiveItems((prev) => {
            if (prev.includes(value)) {
                return prev.filter((item) => item !== value);
            }
            return allowMultiple ? [...prev, value] : [value];
        });
    };

    return (
        <AccordionContext.Provider value={{ activeItems, toggleItem }}>
            <div className={cn("divide-y divide-border border-y", className)}>
                {children}
            </div>
        </AccordionContext.Provider>
    );
}

export function AccordionItem({
    value,
    children,
    className,
}: {
    value: string;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div className={cn("group", className)}>
            {children}
        </div>
    );
}

export function AccordionTrigger({
    children,
    className,
    value,
}: {
    children: React.ReactNode;
    className?: string;
    value: string;
}) {
    const context = React.useContext(AccordionContext);
    if (!context) throw new Error("AccordionTrigger must be used within Accordion");

    const isOpen = context.activeItems.includes(value);

    return (
        <button
            onClick={() => context.toggleItem(value)}
            className={cn(
                "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
                className
            )}
            data-state={isOpen ? "open" : "closed"}
        >
            {children}
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
        </button>
    );
}

export function AccordionContent({
    children,
    className,
    value,
}: {
    children: React.ReactNode;
    className?: string;
    value: string;
}) {
    const context = React.useContext(AccordionContext);
    if (!context) throw new Error("AccordionContent must be used within Accordion");

    const isOpen = context.activeItems.includes(value);

    if (!isOpen) return null;

    return (
        <div
            className={cn(
                "overflow-hidden text-sm transition-all animate-in fade-in slide-in-from-top-1 pb-4",
                className
            )}
        >
            {children}
        </div>
    );
}
