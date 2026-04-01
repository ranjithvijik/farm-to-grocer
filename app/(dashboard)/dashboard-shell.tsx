"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import type { AuthUser } from "@/lib/auth-context";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Bell,
  Search,
  Sun,
  Moon,
  Leaf,
  Store,
  TrendingUp,
  DollarSign,
  Megaphone,
  MessageSquare,
  User,
  Shield,
} from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// ============================================
// TYPES
// ============================================

type SessionUser = AuthUser;

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface DashboardShellProps {
  children: React.ReactNode;
  user: SessionUser;
}

// ============================================
// NAVIGATION CONFIGURATION (per requirements)
// ============================================

const farmerNavItems: NavItem[] = [
  { title: "Dashboard", href: "/farmer", icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: "Storefront", href: "/farmer/storefront", icon: <Store className="h-5 w-5" /> },
  { title: "Products", href: "/farmer/products", icon: <Package className="h-5 w-5" /> },
  { title: "Orders", href: "/farmer/orders", icon: <ShoppingCart className="h-5 w-5" /> },
  { title: "Customers", href: "/farmer/customers", icon: <Users className="h-5 w-5" /> },
  { title: "Sales Hub", href: "/farmer/sales", icon: <TrendingUp className="h-5 w-5" /> },
  { title: "Marketing", href: "/farmer/marketing", icon: <Megaphone className="h-5 w-5" /> },
  { title: "Finance", href: "/farmer/finance", icon: <DollarSign className="h-5 w-5" /> },
  { title: "Messages", href: "/farmer/messages", icon: <MessageSquare className="h-5 w-5" /> },
  { title: "Settings", href: "/farmer/settings", icon: <Settings className="h-5 w-5" /> },
];

const grocerNavItems: NavItem[] = [
  { title: "Dashboard", href: "/grocer", icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: "Browse", href: "/grocer/browse", icon: <Store className="h-5 w-5" /> },
  { title: "Orders", href: "/grocer/orders", icon: <ShoppingCart className="h-5 w-5" /> },
  { title: "Finance", href: "/grocer/finance", icon: <DollarSign className="h-5 w-5" /> },
  { title: "Messages", href: "/grocer/messages", icon: <MessageSquare className="h-5 w-5" /> },
  { title: "Settings", href: "/grocer/settings", icon: <Settings className="h-5 w-5" /> },
];

const adminNavItems: NavItem[] = [
  { title: "Dashboard", href: "/admin", icon: <LayoutDashboard className="h-5 w-5" /> },
  { title: "Users", href: "/admin/users", icon: <Users className="h-5 w-5" /> },
  { title: "Farmers", href: "/admin/farmers", icon: <Leaf className="h-5 w-5" /> },
  { title: "Grocers", href: "/admin/grocers", icon: <Store className="h-5 w-5" /> },
  { title: "Orders", href: "/admin/orders", icon: <ShoppingCart className="h-5 w-5" /> },
  { title: "Settings", href: "/admin/settings", icon: <Settings className="h-5 w-5" /> },
];

// ============================================
// DASHBOARD SHELL COMPONENT
// ============================================

export function DashboardShell({ children, user }: DashboardShellProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { signOut: authSignOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [notificationsOpen, setNotificationsOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  const userMenuRef = React.useRef<HTMLDivElement>(null);
  const notificationsRef = React.useRef<HTMLDivElement>(null);

  const navItems = React.useMemo(() => {
    switch (user.role) {
      case "FARMER": return farmerNavItems;
      case "GROCER": return grocerNavItems;
      case "ADMIN": return adminNavItems;
      default: return [];
    }
  }, [user.role]);

  // Load sidebar state from localStorage
  React.useEffect(() => {
    const savedState = localStorage.getItem("sidebar-open");
    if (savedState !== null) setSidebarOpen(JSON.parse(savedState));
  }, []);

  // Save sidebar state
  React.useEffect(() => {
    localStorage.setItem("sidebar-open", JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  // Close mobile menu on route change
  React.useEffect(() => { setMobileMenuOpen(false); }, [pathname]);

  // Close dropdowns when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) setUserMenuOpen(false);
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) setNotificationsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcuts
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "b") {
        event.preventDefault();
        setSidebarOpen((prev) => !prev);
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        document.getElementById("dashboard-search")?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isActiveLink = (href: string) => {
    if (href === `/${user.role.toLowerCase()}`) return pathname === href;
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    await authSignOut();
    window.location.href = "/";
  };

  const getRoleInfo = () => {
    switch (user.role) {
      case "FARMER": return { label: "Farmer", icon: <Leaf className="h-3 w-3" />, color: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" };
      case "GROCER": return { label: "Grocer", icon: <Store className="h-3 w-3" />, color: "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300" };
      case "ADMIN": return { label: "Admin", icon: <Shield className="h-3 w-3" />, color: "bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300" };
      default: return { label: "User", icon: <User className="h-3 w-3" />, color: "bg-gray-100 text-gray-800" };
    }
  };

  const roleInfo = getRoleInfo();

  return (
    <div className="min-h-screen bg-muted/30">
      {/* ═══ SIDEBAR (Desktop) ═══ */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen transition-all duration-300 ease-in-out",
          "hidden lg:flex lg:flex-col",
          "bg-[#0F172A] text-white",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
          <Link
            href={`/${user.role.toLowerCase()}`}
            className={cn(
              "flex items-center gap-2 font-bold transition-opacity text-white",
              !sidebarOpen && "justify-center"
            )}
          >
            <Leaf className="h-7 w-7 flex-shrink-0 text-green-400" />
            {sidebarOpen && <span className="text-lg">Farm to Grocer</span>}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    "hover:bg-white/10",
                    isActiveLink(item.href)
                      ? "bg-green-600/20 text-green-400 border-l-2 border-green-400"
                      : "text-slate-300",
                    !sidebarOpen && "justify-center"
                  )}
                  title={!sidebarOpen ? item.title : undefined}
                >
                  {item.icon}
                  {sidebarOpen && <span>{item.title}</span>}
                  {item.badge && sidebarOpen && (
                    <span className="ml-auto rounded-full bg-green-500 px-2 py-0.5 text-xs text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info at Bottom */}
        {sidebarOpen && (
          <div className="border-t border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-green-600/20 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Collapse Toggle */}
        <div className="border-t border-white/10 p-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              "hover:bg-white/10 text-slate-400",
              !sidebarOpen && "justify-center"
            )}
          >
            {sidebarOpen ? (
              <>
                <ChevronLeft className="h-5 w-5" />
                <span>Collapse</span>
              </>
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </aside>

      {/* ═══ MOBILE OVERLAY ═══ */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ═══ MOBILE DRAWER ═══ */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-72 transition-transform duration-300 ease-in-out lg:hidden",
          "bg-[#0F172A] text-white",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-white/10">
          <Link href={`/${user.role.toLowerCase()}`} className="flex items-center gap-2 font-bold text-white">
            <Leaf className="h-7 w-7 text-green-400" />
            <span className="text-lg">Farm to Grocer</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="rounded-md p-2 hover:bg-white/10 text-slate-300">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                    "hover:bg-white/10",
                    isActiveLink(item.href) ? "bg-green-600/20 text-green-400" : "text-slate-300"
                  )}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-green-600/20 flex items-center justify-center">
              <User className="h-5 w-5 text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ═══ MAIN CONTENT AREA ═══ */}
      <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? "lg:ml-64" : "lg:ml-20")}>
        {/* ═══ TOP HEADER ═══ */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-card/95 backdrop-blur-sm px-4 lg:px-6">
          <button onClick={() => setMobileMenuOpen(true)} className="rounded-md p-2 hover:bg-accent lg:hidden">
            <Menu className="h-5 w-5" />
          </button>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                id="dashboard-search"
                type="search"
                placeholder="Search... (Cmd+K)"
                className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-md p-2 hover:bg-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Notifications */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative rounded-md p-2 hover:bg-accent transition-colors"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-border bg-card shadow-lg">
                  <div className="flex items-center justify-between p-4 border-b border-border">
                    <h3 className="font-semibold">Notifications</h3>
                    <button className="text-xs text-primary hover:underline">Mark all read</button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <div className="p-4 hover:bg-accent/50 cursor-pointer border-b border-border">
                      <p className="text-sm font-medium">New order received</p>
                      <p className="text-xs text-muted-foreground mt-1">Order #1234 from Fresh Market</p>
                      <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                    </div>
                    <div className="p-4 hover:bg-accent/50 cursor-pointer">
                      <p className="text-sm font-medium">Payment confirmed</p>
                      <p className="text-xs text-muted-foreground mt-1">$245.00 deposited to your account</p>
                      <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-accent transition-colors"
              >
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium truncate max-w-[120px]">{user.name}</p>
                  <span className={cn("inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded-full", roleInfo.color)}>
                    {roleInfo.icon}
                    {roleInfo.label}
                  </span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-card shadow-lg py-1">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm font-medium truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                  </div>
                  <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors" onClick={() => setUserMenuOpen(false)}>
                    <User className="h-4 w-4" /> Profile
                  </Link>
                  <Link href="/settings" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors" onClick={() => setUserMenuOpen(false)}>
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                  <Link href="/help" className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors" onClick={() => setUserMenuOpen(false)}>
                    <HelpCircle className="h-4 w-4" /> Help & Support
                  </Link>
                  <div className="border-t border-border my-1" />
                  <button onClick={handleSignOut} className="flex w-full items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ═══ PAGE CONTENT ═══ */}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default DashboardShell;
