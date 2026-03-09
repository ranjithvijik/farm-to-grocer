// Farm-to-Grocer MVP - Registration Form Client Component
// Path: app/(auth)/register/register-form.tsx
//
// A comprehensive multi-step registration form with:
// - Step 1: Role selection (Farmer/Grocer)
// - Step 2: Account details (name, email, password)
// - Step 3: Business/Farm profile information
// - React Hook Form + Zod validation
// - Password strength indicator
// - Google OAuth option
// - Progress indicator

"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
// Link import removed because it's unused
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Building2,
  MapPin,
  Phone,
  Leaf,
  Store,
  CheckCircle,
  Circle,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { US_STATES } from "@/types";

// ============================================
// VALIDATION SCHEMAS
// ============================================

// Step 1: Role Selection
const roleSchema = z.object({
  role: z.enum(["FARMER", "GROCER"], {
    required_error: "Please select your role",
  }),
});

// Step 2: Account Details
const accountSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Step 3: Farmer Profile
const farmerProfileSchema = z.object({
  farmName: z
    .string()
    .min(1, "Farm name is required")
    .min(2, "Farm name must be at least 2 characters")
    .max(100, "Farm name must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-\(\)\+]+$/, "Please enter a valid phone number"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z
    .string()
    .min(1, "ZIP code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  isOrganic: z.boolean().optional(),
  acceptsDelivery: z.boolean().optional(),
});

// Step 3: Grocer Profile
const grocerProfileSchema = z.object({
  businessName: z
    .string()
    .min(1, "Business name is required")
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must be less than 100 characters"),
  businessType: z.enum(["GROCERY_STORE", "RESTAURANT", "CAFE", "MARKET", "OTHER"], {
    required_error: "Please select your business type",
  }),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-\(\)\+]+$/, "Please enter a valid phone number"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z
    .string()
    .min(1, "ZIP code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  taxId: z.string().optional(),
});

// Combined types
type RoleFormData = z.infer<typeof roleSchema>;
type AccountFormData = z.infer<typeof accountSchema>;
type FarmerProfileFormData = z.infer<typeof farmerProfileSchema>;
type GrocerProfileFormData = z.infer<typeof grocerProfileSchema>;

type FormData = RoleFormData &
  AccountFormData &
  (FarmerProfileFormData | GrocerProfileFormData);

// ============================================
// GOOGLE ICON COMPONENT
// ============================================

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ============================================
// PASSWORD STRENGTH INDICATOR
// ============================================

function PasswordStrengthIndicator({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", valid: password.length >= 8 },
    { label: "Uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "Lowercase letter", valid: /[a-z]/.test(password) },
    { label: "Number", valid: /[0-9]/.test(password) },
  ];

  const strength = checks.filter((c) => c.valid).length;
  const strengthLabel =
    strength === 0
      ? ""
      : strength <= 2
        ? "Weak"
        : strength === 3
          ? "Good"
          : "Strong";
  const strengthColor =
    strength <= 2
      ? "bg-red-500"
      : strength === 3
        ? "bg-amber-500"
        : "bg-green-500";

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all duration-300", strengthColor)}
            style={{ width: `${(strength / 4) * 100}%` }}
          />
        </div>
        <span
          className={cn(
            "text-xs font-medium",
            strength <= 2
              ? "text-red-500"
              : strength === 3
                ? "text-amber-500"
                : "text-green-500"
          )}
        >
          {strengthLabel}
        </span>
      </div>

      {/* Requirements */}
      <div className="grid grid-cols-2 gap-1">
        {checks.map((check, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center gap-1.5 text-xs",
              check.valid ? "text-green-600" : "text-muted-foreground"
            )}
          >
            {check.valid ? (
              <CheckCircle className="h-3 w-3" />
            ) : (
              <Circle className="h-3 w-3" />
            )}
            {check.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================
// STEP INDICATOR
// ============================================

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative">
        <div className="h-1 bg-muted rounded-full">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {/* Step Dots */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between">
          {steps.map((_, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col items-center",
                index === 0 && "items-start",
                index === steps.length - 1 && "items-end"
              )}
            >
              <div
                className={cn(
                  "h-4 w-4 rounded-full border-2 transition-all duration-300",
                  index + 1 < currentStep
                    ? "bg-primary border-primary"
                    : index + 1 === currentStep
                      ? "bg-background border-primary"
                      : "bg-background border-muted"
                )}
              >
                {index + 1 < currentStep && (
                  <CheckCircle className="h-3 w-3 text-primary-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => (
          <span
            key={index}
            className={cn(
              "text-xs font-medium",
              index + 1 <= currentStep ? "text-primary" : "text-muted-foreground",
              index === 0 && "text-left",
              index === steps.length - 1 && "text-right"
            )}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================
// REGISTER FORM COMPONENT
// ============================================

interface RegisterFormProps {
  preselectedRole?: "farmer" | "grocer";
}

export function RegisterForm({ preselectedRole }: RegisterFormProps) {
  const router = useRouter();

  // State
  const [currentStep, setCurrentStep] = React.useState(preselectedRole ? 2 : 1);
  const [formData, setFormData] = React.useState<Partial<FormData>>({
    role: preselectedRole?.toUpperCase() as "FARMER" | "GROCER" | undefined,
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const steps = ["Role", "Account", "Profile"];
  const totalSteps = 3;

  // ─────────────────────────────────────────
  // STEP 1: ROLE FORM
  // ─────────────────────────────────────────

  const roleForm = useForm<RoleFormData>({
    resolver: zodResolver(roleSchema),
    defaultValues: {
      role: formData.role,
    },
  });

  // ─────────────────────────────────────────
  // STEP 2: ACCOUNT FORM
  // ─────────────────────────────────────────

  const accountForm = useForm<AccountFormData>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: (formData as AccountFormData)?.name || "",
      email: (formData as AccountFormData)?.email || "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchPassword = accountForm.watch("password");

  // ─────────────────────────────────────────
  // STEP 3: FARMER PROFILE FORM
  // ─────────────────────────────────────────

  const farmerProfileForm = useForm<FarmerProfileFormData>({
    resolver: zodResolver(farmerProfileSchema),
    defaultValues: {
      farmName: "",
      description: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      isOrganic: false,
      acceptsDelivery: true,
    },
  });

  // ─────────────────────────────────────────
  // STEP 3: GROCER PROFILE FORM
  // ─────────────────────────────────────────

  const grocerProfileForm = useForm<GrocerProfileFormData>({
    resolver: zodResolver(grocerProfileSchema),
    defaultValues: {
      businessName: "",
      businessType: undefined,
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      taxId: "",
    },
  });

  // ─────────────────────────────────────────
  // HANDLERS
  // ─────────────────────────────────────────

  // Handle Step 1 submission
  const handleRoleSubmit = (data: RoleFormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(2);
  };

  // Handle Step 2 submission
  const handleAccountSubmit = (data: AccountFormData) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setCurrentStep(3);
  };

  // Handle Step 3 submission (Final)
  const handleProfileSubmit = async (
    data: FarmerProfileFormData | GrocerProfileFormData
  ) => {
    setIsLoading(true);
    setError(null);

    const finalData = { ...formData, ...data };

    try {
      // Call registration API
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || "Registration failed");
      }

      // Auto sign in after registration
      const signInResult = await signIn("credentials", {
        email: (finalData as AccountFormData).email,
        password: (finalData as AccountFormData).password,
        redirect: false,
      });

      if (signInResult?.error) {
        // Registration succeeded but auto-login failed
        router.push("/login?registered=true");
      } else {
        // Redirect to appropriate dashboard
        const redirectUrl = finalData.role === "FARMER" ? "/farmer" : "/grocer";
        router.push(redirectUrl);
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google OAuth
  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    setError(null);

    try {
      await signIn("google", {
        callbackUrl: "/onboarding", // Redirect to onboarding to complete profile
      });
    } catch (err) {
      setError("Failed to connect to Google. Please try again.");
      setIsGoogleLoading(false);
    }
  };

  // Go back to previous step
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // ─────────────────────────────────────────
  // RENDER STEP 1: ROLE SELECTION
  // ─────────────────────────────────────────

  const renderRoleStep = () => (
    <form onSubmit={roleForm.handleSubmit(handleRoleSubmit)} className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground text-center">
          Select how you'll be using Farm to Grocer
        </p>

        {/* Role Cards */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Farmer Card */}
          <label
            className={cn(
              "relative flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all",
              "hover:border-primary/50 hover:bg-primary/5",
              roleForm.watch("role") === "FARMER"
                ? "border-primary bg-primary/5"
                : "border-muted"
            )}
          >
            <input
              type="radio"
              value="FARMER"
              className="sr-only"
              {...roleForm.register("role")}
            />
            <div
              className={cn(
                "h-16 w-16 rounded-full flex items-center justify-center mb-4",
                roleForm.watch("role") === "FARMER"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Leaf className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-lg">I'm a Farmer</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Sell your produce directly to local grocers and restaurants
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                List unlimited products
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Set your own prices
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Manage orders easily
              </li>
            </ul>
            {roleForm.watch("role") === "FARMER" && (
              <div className="absolute top-3 right-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
            )}
          </label>

          {/* Grocer Card */}
          <label
            className={cn(
              "relative flex flex-col items-center p-6 rounded-xl border-2 cursor-pointer transition-all",
              "hover:border-primary/50 hover:bg-primary/5",
              roleForm.watch("role") === "GROCER"
                ? "border-primary bg-primary/5"
                : "border-muted"
            )}
          >
            <input
              type="radio"
              value="GROCER"
              className="sr-only"
              {...roleForm.register("role")}
            />
            <div
              className={cn(
                "h-16 w-16 rounded-full flex items-center justify-center mb-4",
                roleForm.watch("role") === "GROCER"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Store className="h-8 w-8" />
            </div>
            <h3 className="font-semibold text-lg">I'm a Grocer</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Source fresh, local produce for your store or restaurant
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Browse local farms
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Wholesale pricing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                Scheduled deliveries
              </li>
            </ul>
            {roleForm.watch("role") === "GROCER" && (
              <div className="absolute top-3 right-3">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
            )}
          </label>
        </div>

        {roleForm.formState.errors.role && (
          <p className="text-sm text-destructive text-center">
            {roleForm.formState.errors.role.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full" size="lg">
        Continue
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </form>
  );

  // ─────────────────────────────────────────
  // RENDER STEP 2: ACCOUNT DETAILS
  // ─────────────────────────────────────────

  const renderAccountStep = () => (
    <div className="space-y-6">
      {/* Google OAuth */}
      <Button
        type="button"
        variant="outline"
        className="w-full"
        size="lg"
        onClick={handleGoogleSignUp}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
        ) : (
          <GoogleIcon className="h-5 w-5 mr-2" />
        )}
        Continue with Google
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or create with email
          </span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Account Form */}
      <form onSubmit={accountForm.handleSubmit(handleAccountSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              className={cn(
                "w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background",
                "text-sm placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                accountForm.formState.errors.name && "border-destructive"
              )}
              {...accountForm.register("name")}
            />
          </div>
          {accountForm.formState.errors.name && (
            <p className="text-sm text-destructive">
              {accountForm.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={cn(
                "w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background",
                "text-sm placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                accountForm.formState.errors.email && "border-destructive"
              )}
              {...accountForm.register("email")}
            />
          </div>
          {accountForm.formState.errors.email && (
            <p className="text-sm text-destructive">
              {accountForm.formState.errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a strong password"
              className={cn(
                "w-full pl-10 pr-12 py-2.5 rounded-lg border bg-background",
                "text-sm placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                accountForm.formState.errors.password && "border-destructive"
              )}
              {...accountForm.register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <PasswordStrengthIndicator password={watchPassword || ""} />
          {accountForm.formState.errors.password && (
            <p className="text-sm text-destructive">
              {accountForm.formState.errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="text-sm font-medium">
            Confirm password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Confirm your password"
              className={cn(
                "w-full pl-10 pr-12 py-2.5 rounded-lg border bg-background",
                "text-sm placeholder:text-muted-foreground",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                accountForm.formState.errors.confirmPassword && "border-destructive"
              )}
              {...accountForm.register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {accountForm.formState.errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {accountForm.formState.errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button type="submit" className="flex-1">
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );

  // ─────────────────────────────────────────
  // RENDER STEP 3: PROFILE (FARMER)
  // ─────────────────────────────────────────

  const renderFarmerProfileStep = () => (
    <form
      onSubmit={farmerProfileForm.handleSubmit(handleProfileSubmit)}
      className="space-y-4"
    >
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Farm Name */}
      <div className="space-y-2">
        <label htmlFor="farmName" className="text-sm font-medium">
          Farm name
        </label>
        <div className="relative">
          <Leaf className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="farmName"
            type="text"
            placeholder="Green Valley Farm"
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              farmerProfileForm.formState.errors.farmName && "border-destructive"
            )}
            {...farmerProfileForm.register("farmName")}
          />
        </div>
        {farmerProfileForm.formState.errors.farmName && (
          <p className="text-sm text-destructive">
            {farmerProfileForm.formState.errors.farmName.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              farmerProfileForm.formState.errors.phone && "border-destructive"
            )}
            {...farmerProfileForm.register("phone")}
          />
        </div>
        {farmerProfileForm.formState.errors.phone && (
          <p className="text-sm text-destructive">
            {farmerProfileForm.formState.errors.phone.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label htmlFor="address" className="text-sm font-medium">
          Farm address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="address"
            type="text"
            placeholder="123 Farm Road"
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              farmerProfileForm.formState.errors.address && "border-destructive"
            )}
            {...farmerProfileForm.register("address")}
          />
        </div>
        {farmerProfileForm.formState.errors.address && (
          <p className="text-sm text-destructive">
            {farmerProfileForm.formState.errors.address.message}
          </p>
        )}
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-6 gap-3">
        <div className="col-span-2 space-y-2">
          <label htmlFor="city" className="text-sm font-medium">
            City
          </label>
          <input
            id="city"
            type="text"
            placeholder="City"
            className={cn(
              "w-full px-3 py-2.5 rounded-lg border bg-background",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              farmerProfileForm.formState.errors.city && "border-destructive"
            )}
            {...farmerProfileForm.register("city")}
          />
        </div>
        <div className="col-span-2 space-y-2">
          <label htmlFor="state" className="text-sm font-medium">
            State
          </label>
          <select
            id="state"
            className={cn(
              "w-full px-3 py-2.5 rounded-lg border bg-background",
              "text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              farmerProfileForm.formState.errors.state && "border-destructive"
            )}
            {...farmerProfileForm.register("state")}
          >
            <option value="">Select</option>
            {Object.entries(US_STATES).map(([code]) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2 space-y-2">
          <label htmlFor="zipCode" className="text-sm font-medium">
            ZIP
          </label>
          <input
            id="zipCode"
            type="text"
            placeholder="12345"
            className={cn(
              "w-full px-3 py-2.5 rounded-lg border bg-background",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              farmerProfileForm.formState.errors.zipCode && "border-destructive"
            )}
            {...farmerProfileForm.register("zipCode")}
          />
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 pt-2">
        <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            {...farmerProfileForm.register("isOrganic")}
          />
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <span className="text-sm font-medium">Certified Organic Farm</span>
          </div>
        </label>

        <label className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
            defaultChecked
            {...farmerProfileForm.register("acceptsDelivery")}
          />
          <div className="flex items-center gap-2">
            <Truck className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">I offer delivery services</span>
          </div>
        </label>
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );

  // ─────────────────────────────────────────
  // RENDER STEP 3: PROFILE (GROCER)
  // ─────────────────────────────────────────

  const renderGrocerProfileStep = () => (
    <form
      onSubmit={grocerProfileForm.handleSubmit(handleProfileSubmit)}
      className="space-y-4"
    >
      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Business Name */}
      <div className="space-y-2">
        <label htmlFor="businessName" className="text-sm font-medium">
          Business name
        </label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="businessName"
            type="text"
            placeholder="Fresh Market Grocery"
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              grocerProfileForm.formState.errors.businessName && "border-destructive"
            )}
            {...grocerProfileForm.register("businessName")}
          />
        </div>
        {grocerProfileForm.formState.errors.businessName && (
          <p className="text-sm text-destructive">
            {grocerProfileForm.formState.errors.businessName.message}
          </p>
        )}
      </div>

      {/* Business Type */}
      <div className="space-y-2">
        <label htmlFor="businessType" className="text-sm font-medium">
          Business type
        </label>
        <select
          id="businessType"
          className={cn(
            "w-full px-3 py-2.5 rounded-lg border bg-background",
            "text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            grocerProfileForm.formState.errors.businessType && "border-destructive"
          )}
          {...grocerProfileForm.register("businessType")}
        >
          <option value="">Select business type</option>
          <option value="GROCERY_STORE">Grocery Store</option>
          <option value="RESTAURANT">Restaurant</option>
          <option value="CAFE">Café / Coffee Shop</option>
          <option value="MARKET">Farmers Market Vendor</option>
          <option value="OTHER">Other</option>
        </select>
        {grocerProfileForm.formState.errors.businessType && (
          <p className="text-sm text-destructive">
            {grocerProfileForm.formState.errors.businessType.message}
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <label htmlFor="grocerPhone" className="text-sm font-medium">
          Phone number
        </label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="grocerPhone"
            type="tel"
            placeholder="(555) 123-4567"
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              grocerProfileForm.formState.errors.phone && "border-destructive"
            )}
            {...grocerProfileForm.register("phone")}
          />
        </div>
        {grocerProfileForm.formState.errors.phone && (
          <p className="text-sm text-destructive">
            {grocerProfileForm.formState.errors.phone.message}
          </p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-2">
        <label htmlFor="grocerAddress" className="text-sm font-medium">
          Business address
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            id="grocerAddress"
            type="text"
            placeholder="456 Main Street"
            className={cn(
              "w-full pl-10 pr-4 py-2.5 rounded-lg border bg-background",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              grocerProfileForm.formState.errors.address && "border-destructive"
            )}
            {...grocerProfileForm.register("address")}
          />
        </div>
        {grocerProfileForm.formState.errors.address && (
          <p className="text-sm text-destructive">
            {grocerProfileForm.formState.errors.address.message}
          </p>
        )}
      </div>

      {/* City, State, ZIP */}
      <div className="grid grid-cols-6 gap-3">
        <div className="col-span-2 space-y-2">
          <label htmlFor="grocerCity" className="text-sm font-medium">
            City
          </label>
          <input
            id="grocerCity"
            type="text"
            placeholder="City"
            className={cn(
              "w-full px-3 py-2.5 rounded-lg border bg-background",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              grocerProfileForm.formState.errors.city && "border-destructive"
            )}
            {...grocerProfileForm.register("city")}
          />
        </div>
        <div className="col-span-2 space-y-2">
          <label htmlFor="grocerState" className="text-sm font-medium">
            State
          </label>
          <select
            id="grocerState"
            className={cn(
              "w-full px-3 py-2.5 rounded-lg border bg-background",
              "text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              grocerProfileForm.formState.errors.state && "border-destructive"
            )}
            {...grocerProfileForm.register("state")}
          >
            <option value="">Select</option>
            {Object.entries(US_STATES).map(([code]) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-2 space-y-2">
          <label htmlFor="grocerZipCode" className="text-sm font-medium">
            ZIP
          </label>
          <input
            id="grocerZipCode"
            type="text"
            placeholder="12345"
            className={cn(
              "w-full px-3 py-2.5 rounded-lg border bg-background",
              "text-sm placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              grocerProfileForm.formState.errors.zipCode && "border-destructive"
            )}
            {...grocerProfileForm.register("zipCode")}
          />
        </div>
      </div>

      {/* Tax ID (Optional) */}
      <div className="space-y-2">
        <label htmlFor="taxId" className="text-sm font-medium">
          Tax ID / EIN <span className="text-muted-foreground">(optional)</span>
        </label>
        <input
          id="taxId"
          type="text"
          placeholder="XX-XXXXXXX"
          className={cn(
            "w-full px-3 py-2.5 rounded-lg border bg-background",
            "text-sm placeholder:text-muted-foreground",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
          {...grocerProfileForm.register("taxId")}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={handleBack} className="flex-1">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Create Account
              <ArrowRight className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );

  // ─────────────────────────────────────────
  // MAIN RENDER
  // ─────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} steps={steps} />

      {/* Step Content */}
      {currentStep === 1 && renderRoleStep()}
      {currentStep === 2 && renderAccountStep()}
      {currentStep === 3 &&
        (formData.role === "FARMER"
          ? renderFarmerProfileStep()
          : renderGrocerProfileStep())}
    </div>
  );
}

// ============================================
// EXPORTS
// ============================================

export default RegisterForm;
