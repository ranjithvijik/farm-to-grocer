import { Metadata } from "next";
import Link from "next/link";
import { RegisterForm } from "./register-form";
import { Leaf, Truck, Store, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Join Farm to Grocer - Connect with local farmers and grocers.",
};

interface RegisterPageProps {
  searchParams: {
    role?: "farmer" | "grocer";
  };
}

export default function RegisterPage({ searchParams }: RegisterPageProps) {
  const preselectedRole = searchParams.role;

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
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
            Start Your Journey
            <br />
            <span className="text-farm-200">With Local Partners</span>
          </h1>
          <p className="text-lg text-farm-100 max-w-md mb-10">
            Whether you&apos;re a farmer looking to expand your market or a grocer seeking fresh local produce, we&apos;ve got you covered.
          </p>
          <div className="space-y-6 max-w-md">
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-farm-500 rounded-lg"><Truck className="h-5 w-5" /></div>
                <h4 className="font-semibold">For Farmers</h4>
              </div>
              <ul className="space-y-2 text-sm text-farm-100">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-farm-300" />Direct access to local grocers</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-farm-300" />Fair pricing, no middlemen</li>
              </ul>
            </div>
            <div className="p-4 bg-white/10 rounded-xl backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-farm-500 rounded-lg"><Store className="h-5 w-5" /></div>
                <h4 className="font-semibold">For Grocers</h4>
              </div>
              <ul className="space-y-2 text-sm text-farm-100">
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-farm-300" />Fresh, locally-sourced produce</li>
                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-farm-300" />Competitive wholesale prices</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-12 overflow-y-auto">
        <div className="mx-auto w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <Leaf className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Farm to Grocer</span>
          </div>
          <div className="text-center lg:text-left mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Create your account</h2>
            <p className="text-muted-foreground mt-2">Get started in just a few minutes</p>
          </div>
          <RegisterForm preselectedRole={preselectedRole} />
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
