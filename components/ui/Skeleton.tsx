"use client";

// Farm-to-Grocer MVP - Skeleton Loading Component
// Path: components/ui/Skeleton.tsx
//
// A comprehensive skeleton loading component system with:
// - Base Skeleton component with shimmer animation
// - Pre-built skeleton variants (text, avatar, card, table, etc.)
// - SkeletonTheme for consistent styling
// - Customizable dimensions, colors, and animations
// - Accessibility support (aria-busy, aria-label)
// - No external dependencies (pure Tailwind CSS)

import * as React from "react";
import { cn } from "@/lib/utils";

// ============================================
// SKELETON THEME CONTEXT
// ============================================

interface SkeletonThemeContextValue {
  baseColor?: string;
  highlightColor?: string;
  borderRadius?: string;
  duration?: number;
  enableAnimation?: boolean;
}

const SkeletonThemeContext = React.createContext<SkeletonThemeContextValue>({});

// ============================================
// SKELETON THEME PROVIDER
// ============================================

export interface SkeletonThemeProps extends SkeletonThemeContextValue {
  children: React.ReactNode;
}

/**
 * SkeletonTheme Provider
 *
 * Wraps skeleton components to provide consistent styling.
 *
 * @example
 * <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
 *   <Skeleton />
 *   <Skeleton />
 * </SkeletonTheme>
 */
export function SkeletonTheme({
  children,
  baseColor,
  highlightColor,
  borderRadius,
  duration,
  enableAnimation = true,
}: SkeletonThemeProps) {
  const value = React.useMemo(
    () => ({
      baseColor,
      highlightColor,
      borderRadius,
      duration,
      enableAnimation,
    }),
    [baseColor, highlightColor, borderRadius, duration, enableAnimation]
  );

  return (
    <SkeletonThemeContext.Provider value={value}>
      {children}
    </SkeletonThemeContext.Provider>
  );
}

// ============================================
// BASE SKELETON COMPONENT
// ============================================

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the skeleton
   */
  width?: string | number;

  /**
   * Height of the skeleton
   */
  height?: string | number;

  /**
   * Border radius
   */
  borderRadius?: string | number;

  /**
   * Make skeleton circular
   */
  circle?: boolean;

  /**
   * Number of skeleton lines to render
   */
  count?: number;

  /**
   * Enable shimmer animation
   */
  enableAnimation?: boolean;

  /**
   * Animation duration in seconds
   */
  duration?: number;

  /**
   * Base background color
   */
  baseColor?: string;

  /**
   * Highlight/shimmer color
   */
  highlightColor?: string;

  /**
   * Custom wrapper element
   */
  wrapper?: React.ComponentType<{ children: React.ReactNode }>;

  /**
   * Inline display
   */
  inline?: boolean;
}

/**
 * Skeleton Component
 *
 * A versatile skeleton loading placeholder with shimmer animation.
 *
 * @example
 * // Basic usage
 * <Skeleton />
 *
 * @example
 * // Multiple lines
 * <Skeleton count={3} />
 *
 * @example
 * // Custom dimensions
 * <Skeleton width={200} height={20} />
 *
 * @example
 * // Circle (avatar)
 * <Skeleton circle width={48} height={48} />
 */
const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      className,
      width,
      height,
      borderRadius,
      circle = false,
      count = 1,
      enableAnimation,
      duration,
      baseColor,
      highlightColor,
      wrapper: Wrapper,
      inline = false,
      style,
      ...props
    },
    ref
  ) => {
    // Get theme values
    const theme = React.useContext(SkeletonThemeContext);

    // Merge props with theme
    const finalEnableAnimation = enableAnimation ?? theme.enableAnimation ?? true;
    const finalDuration = duration ?? theme.duration ?? 1.5;
    const finalBaseColor = baseColor ?? theme.baseColor;
    const finalHighlightColor = highlightColor ?? theme.highlightColor;
    const finalBorderRadius = circle
      ? "9999px"
      : borderRadius ?? theme.borderRadius;

    // Build inline styles
    const skeletonStyle: React.CSSProperties = {
      width: width !== undefined ? (typeof width === "number" ? `${width}px` : width) : undefined,
      height: height !== undefined ? (typeof height === "number" ? `${height}px` : height) : undefined,
      borderRadius: finalBorderRadius,
      backgroundColor: finalBaseColor,
      animationDuration: `${finalDuration}s`,
      ...style,
    };

    // Custom CSS variables for colors
    const cssVars: Record<string, string> = {};
    if (finalBaseColor) {
      cssVars["--skeleton-base-color"] = finalBaseColor;
    }
    if (finalHighlightColor) {
      cssVars["--skeleton-highlight-color"] = finalHighlightColor;
    }

    // Render single skeleton element
    const renderSkeleton = (key?: number) => (
      <span
        key={key}
        ref={key === undefined || key === 0 ? ref : undefined}
        className={cn(
          "skeleton-base",
          "block bg-muted",
          finalEnableAnimation && "skeleton-shimmer",
          inline && "inline-block",
          !width && "w-full",
          !height && "h-4",
          className
        )}
        style={{ ...skeletonStyle, ...cssVars }}
        aria-hidden="true"
        {...props}
      />
    );

    // Render multiple skeletons
    if (count > 1) {
      const skeletons = Array.from({ length: count }, (_, i) => renderSkeleton(i));

      if (Wrapper) {
        return <Wrapper>{skeletons}</Wrapper>;
      }

      return (
        <div className="space-y-2" aria-busy="true" aria-label="Loading...">
          {skeletons}
        </div>
      );
    }

    // Single skeleton
    const skeleton = renderSkeleton();

    if (Wrapper) {
      return <Wrapper>{skeleton}</Wrapper>;
    }

    return skeleton;
  }
);

Skeleton.displayName = "Skeleton";

// ============================================
// SKELETON TEXT COMPONENT
// ============================================

export interface SkeletonTextProps extends Omit<SkeletonProps, "count"> {
  /**
   * Number of lines
   */
  lines?: number;

  /**
   * Gap between lines
   */
  gap?: "sm" | "md" | "lg";

  /**
   * Make last line shorter
   */
  lastLineWidth?: string | number;
}

/**
 * SkeletonText Component
 *
 * Pre-configured skeleton for text content.
 */
export function SkeletonText({
  lines = 3,
  gap = "md",
  lastLineWidth = "75%",
  height = 16,
  className,
  ...props
}: SkeletonTextProps) {
  const gapClasses = {
    sm: "space-y-1",
    md: "space-y-2",
    lg: "space-y-3",
  };

  return (
    <div className={cn(gapClasses[gap], className)} aria-busy="true" aria-label="Loading text...">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          height={height}
          width={i === lines - 1 ? lastLineWidth : undefined}
          {...props}
        />
      ))}
    </div>
  );
}

// ============================================
// SKELETON AVATAR COMPONENT
// ============================================

export interface SkeletonAvatarProps extends Omit<SkeletonProps, "circle" | "width" | "height"> {
  /**
   * Avatar size
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
}

/**
 * SkeletonAvatar Component
 *
 * Pre-configured circular skeleton for avatars.
 */
export function SkeletonAvatar({ size = "md", className, ...props }: SkeletonAvatarProps) {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 40,
    lg: 48,
    xl: 64,
  };

  const dimension = typeof size === "number" ? size : sizeMap[size];

  return (
    <Skeleton
      circle
      width={dimension}
      height={dimension}
      className={cn("flex-shrink-0", className)}
      {...props}
    />
  );
}

// ============================================
// SKELETON BUTTON COMPONENT
// ============================================

export interface SkeletonButtonProps extends Omit<SkeletonProps, "width" | "height"> {
  /**
   * Button size
   */
  size?: "sm" | "md" | "lg";

  /**
   * Full width button
   */
  fullWidth?: boolean;
}

/**
 * SkeletonButton Component
 *
 * Pre-configured skeleton for buttons.
 */
export function SkeletonButton({
  size = "md",
  fullWidth = false,
  className,
  ...props
}: SkeletonButtonProps) {
  const sizeConfig = {
    sm: { height: 32, width: 80 },
    md: { height: 40, width: 100 },
    lg: { height: 48, width: 120 },
  };

  const { height, width } = sizeConfig[size];

  return (
    <Skeleton
      height={height}
      width={fullWidth ? "100%" : width}
      borderRadius={6}
      className={className}
      {...props}
    />
  );
}

// ============================================
// SKELETON IMAGE COMPONENT
// ============================================

export interface SkeletonImageProps extends Omit<SkeletonProps, "width" | "height"> {
  /**
   * Aspect ratio
   */
  aspectRatio?: "square" | "video" | "wide" | "portrait" | number;

  /**
   * Image width
   */
  width?: string | number;
}

/**
 * SkeletonImage Component
 *
 * Pre-configured skeleton for images with aspect ratio support.
 */
export function SkeletonImage({
  aspectRatio = "video",
  width = "100%",
  className,
  ...props
}: SkeletonImageProps) {
  const aspectRatioMap = {
    square: 1,
    video: 16 / 9,
    wide: 21 / 9,
    portrait: 3 / 4,
  };

  const ratio = typeof aspectRatio === "number" ? aspectRatio : aspectRatioMap[aspectRatio];

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        paddingBottom: `${(1 / ratio) * 100}%`,
      }}
    >
      <Skeleton
        className="absolute inset-0"
        width="100%"
        height="100%"
        borderRadius={8}
        {...props}
      />
    </div>
  );
}

// ============================================
// SKELETON CARD COMPONENT
// ============================================

export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Show image placeholder
   */
  hasImage?: boolean;

  /**
   * Image aspect ratio
   */
  imageAspectRatio?: "square" | "video" | "wide";

  /**
   * Number of text lines
   */
  textLines?: number;

  /**
   * Show footer/action area
   */
  hasFooter?: boolean;
}

/**
 * SkeletonCard Component
 *
 * Pre-configured skeleton for card layouts.
 */
export function SkeletonCard({
  hasImage = true,
  imageAspectRatio = "video",
  textLines = 3,
  hasFooter = true,
  className,
  ...props
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card overflow-hidden",
        className
      )}
      aria-busy="true"
      aria-label="Loading card..."
      {...props}
    >
      {/* Image */}
      {hasImage && (
        <SkeletonImage aspectRatio={imageAspectRatio} borderRadius={0} />
      )}

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <Skeleton height={20} width="70%" />

        {/* Text */}
        <SkeletonText lines={textLines} height={14} />

        {/* Footer */}
        {hasFooter && (
          <div className="flex items-center justify-between pt-2">
            <Skeleton height={16} width={80} />
            <SkeletonButton size="sm" />
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// SKELETON TABLE COMPONENT
// ============================================

export interface SkeletonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of rows
   */
  rows?: number;

  /**
   * Number of columns
   */
  columns?: number;

  /**
   * Show table header
   */
  hasHeader?: boolean;
}

/**
 * SkeletonTable Component
 *
 * Pre-configured skeleton for table layouts.
 */
export function SkeletonTable({
  rows = 5,
  columns = 4,
  hasHeader = true,
  className,
  ...props
}: SkeletonTableProps) {
  return (
    <div
      className={cn("rounded-lg border overflow-hidden", className)}
      aria-busy="true"
      aria-label="Loading table..."
      {...props}
    >
      {/* Header */}
      {hasHeader && (
        <div className="flex items-center gap-4 p-4 bg-muted/50 border-b">
          {Array.from({ length: columns }, (_, i) => (
            <Skeleton
              key={`header-${i}`}
              height={14}
              width={i === 0 ? "30%" : `${100 / columns}%`}
            />
          ))}
        </div>
      )}

      {/* Rows */}
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          className="flex items-center gap-4 p-4 border-b last:border-b-0"
        >
          {Array.from({ length: columns }, (_, colIndex) => (
            <Skeleton
              key={`cell-${rowIndex}-${colIndex}`}
              height={16}
              width={colIndex === 0 ? "30%" : `${100 / columns}%`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

// ============================================
// SKELETON LIST COMPONENT
// ============================================

export interface SkeletonListProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of items
   */
  items?: number;

  /**
   * Show avatar
   */
  hasAvatar?: boolean;

  /**
   * Avatar size
   */
  avatarSize?: "sm" | "md" | "lg";

  /**
   * Number of text lines per item
   */
  textLines?: number;
}

/**
 * SkeletonList Component
 *
 * Pre-configured skeleton for list layouts.
 */
export function SkeletonList({
  items = 5,
  hasAvatar = true,
  avatarSize = "md",
  textLines = 2,
  className,
  ...props
}: SkeletonListProps) {
  return (
    <div
      className={cn("space-y-4", className)}
      aria-busy="true"
      aria-label="Loading list..."
      {...props}
    >
      {Array.from({ length: items }, (_, i) => (
        <div key={i} className="flex items-start gap-3">
          {hasAvatar && <SkeletonAvatar size={avatarSize} />}
          <div className="flex-1 space-y-2">
            <Skeleton height={16} width="60%" />
            {textLines > 1 && (
              <SkeletonText lines={textLines - 1} height={14} gap="sm" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// SKELETON FORM COMPONENT
// ============================================

export interface SkeletonFormProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of fields
   */
  fields?: number;

  /**
   * Show submit button
   */
  hasSubmitButton?: boolean;
}

/**
 * SkeletonForm Component
 *
 * Pre-configured skeleton for form layouts.
 */
export function SkeletonForm({
  fields = 4,
  hasSubmitButton = true,
  className,
  ...props
}: SkeletonFormProps) {
  return (
    <div
      className={cn("space-y-4", className)}
      aria-busy="true"
      aria-label="Loading form..."
      {...props}
    >
      {Array.from({ length: fields }, (_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton height={14} width={100} />
          <Skeleton height={40} borderRadius={6} />
        </div>
      ))}

      {hasSubmitButton && (
        <div className="pt-2">
          <SkeletonButton size="lg" fullWidth />
        </div>
      )}
    </div>
  );
}

// ============================================
// SKELETON PROFILE COMPONENT
// ============================================

export interface SkeletonProfileProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Layout orientation
   */
  orientation?: "horizontal" | "vertical";
}

/**
 * SkeletonProfile Component
 *
 * Pre-configured skeleton for user profile layouts.
 */
export function SkeletonProfile({
  orientation = "horizontal",
  className,
  ...props
}: SkeletonProfileProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn("flex flex-col items-center text-center space-y-3", className)}
        aria-busy="true"
        aria-label="Loading profile..."
        {...props}
      >
        <SkeletonAvatar size="xl" />
        <Skeleton height={20} width={150} />
        <Skeleton height={14} width={100} />
        <SkeletonText lines={2} className="max-w-xs" />
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center gap-4", className)}
      aria-busy="true"
      aria-label="Loading profile..."
      {...props}
    >
      <SkeletonAvatar size="lg" />
      <div className="flex-1 space-y-2">
        <Skeleton height={18} width={150} />
        <Skeleton height={14} width={100} />
      </div>
    </div>
  );
}

// ============================================
// SKELETON STATS COMPONENT
// ============================================

export interface SkeletonStatsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of stat cards
   */
  count?: number;
}

/**
 * SkeletonStats Component
 *
 * Pre-configured skeleton for stats/metrics cards.
 */
export function SkeletonStats({ count = 4, className, ...props }: SkeletonStatsProps) {
  return (
    <div
      className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}
      aria-busy="true"
      aria-label="Loading stats..."
      {...props}
    >
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="rounded-lg border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <Skeleton height={14} width={80} />
            <Skeleton circle width={32} height={32} />
          </div>
          <Skeleton height={28} width={100} />
          <Skeleton height={12} width={120} />
        </div>
      ))}
    </div>
  );
}

// ============================================
// CSS STYLES (Add to globals.css)
// ============================================

/*
Add these styles to your globals.css:

@keyframes skeleton-shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-shimmer {
  background: linear-gradient(
    90deg,
    hsl(var(--muted)) 25%,
    hsl(var(--muted-foreground) / 0.1) 50%,
    hsl(var(--muted)) 75%
  );
  background-size: 200% 100%;
  animation: skeleton-shimmer 1.5s ease-in-out infinite;
}

.skeleton-base {
  background-color: hsl(var(--muted));
}
*/

// ============================================
// ============================================

export { Skeleton };
export default Skeleton;
