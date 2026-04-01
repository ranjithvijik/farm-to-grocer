import { Metadata } from "next";
import Link from "next/link";
import { LoginForm } from "./login-form";
import { Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Farm to Grocer account.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-farm-600 via-farm-700 to-farm-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
              <Leaf className="h-10 w-10" />
            </div>
            <span className="text-3xl font-bold">Farm to Grocer</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Connect with Local Farmers.
            <br />
            <span className="text-farm-200">Grow Your Business.</span>
          </h1>
          <p className="text-lg text-farm-100 max-w-md mb-8">
            Join thousands of farmers and grocers building sustainable food systems together.
          </p>
          <div className="grid grid-cols-3 gap-6 max-w-md">
            <div><p className="text-3xl font-bold">500+</p><p className="text-sm text-farm-200">Local Farmers</p></div>
            <div><p className="text-3xl font-bold">1,200+</p><p className="text-sm text-farm-200">Grocers</p></div>
            <div><p className="text-3xl font-bold">$2M+</p><p className="text-sm text-farm-200">Monthly Sales</p></div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12">
        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Farm to Grocer</span>
          </div>
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground mt-2">Sign in to your account to continue</p>
          </div>
          <LoginForm callbackUrl="/farmer" />
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
