// Farm-to-Grocer MVP - Responsive Navbar Component
// Path: components/Navbar.tsx
//
// A fully responsive navigation bar with:
// - Mobile hamburger menu with slide-out drawer
// - Authentication state handling (login/logout)
// - Role-based navigation (farmer/grocer)
// - Dropdown menus for user profile
// - Active link highlighting
// - Smooth animations and transitions

"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Settings,
  ShoppingCart,
  Package,
  LayoutDashboard,
  Leaf,
  Store,
  Bell,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

// ============================================
// TYPES & INTERFACES
// ============================================

interface NavLink {
  name: string;
  href: string;
  icon?: React.ReactNode;
  badge?: number;
}

interface NavDropdownItem {
  name: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
}

// ============================================
// NAVIGATION CONFIGURATION
// ============================================

const publicLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "Marketplace", href: "/marketplace" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "About", href: "/about" },
];

const farmerLinks: NavLink[] = [
  { name: "Dashboard", href: "/farmer", icon: <LayoutDashboard className="h-4 w-4" /> },
  { name: "Products", href: "/farmer/products", icon: <Package className="h-4 w-4" /> },
  { name: "Orders", href: "/farmer/orders", icon: <ShoppingCart className="h-4 w-4" /> },
];

const grocerLinks: NavLink[] = [
  { name: "Dashboard", href: "/grocer", icon: <LayoutDashboard className="h-4 w-4" /> },
  { name: "Browse", href: "/grocer/browse", icon: <Search className="h-4 w-4" /> },
  { name: "Orders", href: "/grocer/orders", icon: <ShoppingCart className="h-4 w-4" /> },
];

const userMenuItems: NavDropdownItem[] = [
  { name: "Profile", href: "/profile", icon: <User className="h-4 w-4" /> },
  { name: "Settings", href: "/settings", icon: <Settings className="h-4 w-4" /> },
];

// ============================================
// NAVBAR COMPONENT
// ============================================

export interface NavbarProps {
  /**
   * Show transparent background (for hero sections)
   */
  transparent?: boolean;

  /**
   * Fixed position at top
   */
  fixed?: boolean;

  /**
   * Custom className
   */
  className?: string;
}

export function Navbar({ transparent = false, fixed = true, className }: NavbarProps) {
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated, signOut: authSignOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const userMenuRef = React.useRef<HTMLDivElement>(null);

  // Determine user role and navigation links
  const userRole = user?.role;
  const session = { user }; // Compatibility shim

  const roleLinks = userRole === "FARMER" ? farmerLinks : userRole === "GROCER" ? grocerLinks : [];

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close user menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Check if link is active
  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Handle sign out
  const handleSignOut = async () => {
    await authSignOut();
    window.location.href = "/";
  };

  return (
    <>
      <header
        className={cn(
          "w-full z-50 transition-all duration-300",
          fixed && "fixed top-0 left-0 right-0",
          transparent && !isScrolled
            ? "glass-transparent" // or bg-transparent
            : "glass border-b border-border/50 transition-all duration-300",
          className
        )}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-bold text-primary hover:opacity-90 transition-opacity"
              >
                <Leaf className="h-7 w-7" />
                <span className="hidden sm:inline">Farm to Grocer</span>
                <span className="sm:hidden">FTG</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              {/* Public Links */}
              {!isAuthenticated &&
                publicLinks.map((link) => (
                  <NavLinkItem
                    key={link.href}
                    href={link.href}
                    isActive={isActiveLink(link.href)}
                  >
                    {link.name}
                  </NavLinkItem>
                ))}

              {/* Role-based Links */}
              {isAuthenticated &&
                roleLinks.map((link) => (
                  <NavLinkItem
                    key={link.href}
                    href={link.href}
                    isActive={isActiveLink(link.href)}
                    icon={link.icon}
                  >
                    {link.name}
                  </NavLinkItem>
                ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications (authenticated only) */}
              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hidden sm:flex"
                  aria-label="Notifications"
                >
                  <Bell className="h-5 w-5" />
                  {/* Notification badge */}
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
                </Button>
              )}

              {/* Auth Buttons / User Menu */}
              {isLoading ? (
                <div className="h-8 w-20 animate-pulse rounded-md bg-muted" />
              ) : isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md",
                      "text-sm font-medium",
                      "hover:bg-accent transition-colors",
                      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    )}
                    aria-expanded={isUserMenuOpen}
                    aria-haspopup="true"
                  >
                    {/* User Avatar */}
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {session.user?.image ? (
                        <img
                          src={session.user.image}
                          alt={session.user.name || "User"}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <span className="hidden md:inline max-w-[120px] truncate">
                      {session.user?.name || "User"}
                    </span>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isUserMenuOpen && "rotate-180"
                      )}
                    />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div
                      className={cn(
                        "absolute right-0 mt-2 w-56",
                        "bg-popover border border-border rounded-lg shadow-lg",
                        "py-1 z-50",
                        "animate-in fade-in-0 zoom-in-95"
                      )}
                    >
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium truncate">
                          {session.user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {session.user?.email}
                        </p>
                        <span className="inline-flex items-center mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                          {userRole === "FARMER" ? (
                            <>
                              <Leaf className="h-3 w-3 mr-1" />
                              Farmer
                            </>
                          ) : (
                            <>
                              <Store className="h-3 w-3 mr-1" />
                              Grocer
                            </>
                          )}
                        </span>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                              "flex items-center gap-3 px-4 py-2",
                              "text-sm text-foreground",
                              "hover:bg-accent transition-colors"
                            )}
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            {item.icon}
                            {item.name}
                          </Link>
                        ))}
                      </div>

                      {/* Sign Out */}
                      <div className="border-t border-border py-1">
                        <button
                          onClick={handleSignOut}
                          className={cn(
                            "flex items-center gap-3 w-full px-4 py-2",
                            "text-sm text-destructive",
                            "hover:bg-destructive/10 transition-colors"
                          )}
                        >
                          <LogOut className="h-4 w-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Button variant="ghost" asChild>
                    <Link href="/login"><span>Sign In</span></Link>
                  </Button>
                  <Button asChild>
                    <Link href="/register"><span>Get Started</span></Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-[280px] bg-background border-l border-border shadow-xl",
          "transform transition-transform duration-300 ease-in-out lg:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold text-primary"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <Leaf className="h-6 w-6" />
            Farm to Grocer
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Mobile Menu Content */}
        <div className="flex flex-col h-[calc(100%-65px)] overflow-y-auto">
          {/* Navigation Links */}
          <nav className="flex-1 p-4 space-y-1">
            {/* Public Links (when not authenticated) */}
            {!isAuthenticated &&
              publicLinks.map((link) => (
                <MobileNavLink
                  key={link.href}
                  href={link.href}
                  isActive={isActiveLink(link.href)}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </MobileNavLink>
              ))}

            {/* Role-based Links (when authenticated) */}
            {isAuthenticated && (
              <>
                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {userRole === "FARMER" ? "Farmer Menu" : "Grocer Menu"}
                </p>
                {roleLinks.map((link) => (
                  <MobileNavLink
                    key={link.href}
                    href={link.href}
                    isActive={isActiveLink(link.href)}
                    icon={link.icon}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </MobileNavLink>
                ))}

                <div className="my-4 border-t border-border" />

                <p className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Account
                </p>
                {userMenuItems.map((item) => (
                  <MobileNavLink
                    key={item.href}
                    href={item.href}
                    icon={item.icon}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </MobileNavLink>
                ))}
              </>
            )}
          </nav>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-border">
            {isAuthenticated ? (
              <div className="space-y-3">
                {/* User Info */}
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/50">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {session?.user?.email}
                    </p>
                  </div>
                </div>

                {/* Sign Out Button */}
                <Button
                  variant="outline"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <span>Sign In</span>
                  </Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <span>Get Started</span>
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      {fixed && <div className="h-16" />}
    </>
  );
}

// ============================================
// NAV LINK ITEM COMPONENT (Desktop)
// ============================================

interface NavLinkItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  icon?: React.ReactNode;
}

function NavLinkItem({ href, children, isActive, icon }: NavLinkItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors nav-link-animated",
        isActive
          ? "text-primary active"
          : "text-foreground/80 hover:text-foreground"
      )}
    >
      {icon}
      {children}
    </Link>
  );
}

// ============================================
// MOBILE NAV LINK COMPONENT
// ============================================

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  icon?: React.ReactNode;
  onClick?: () => void;
}

function MobileNavLink({
  href,
  children,
  isActive,
  icon,
  onClick,
}: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-foreground hover:bg-accent"
      )}
    >
      {icon && <span className="text-muted-foreground">{icon}</span>}
      {children}
    </Link>
  );
}

// ============================================
// EXPORTS
// ============================================

export default Navbar;
