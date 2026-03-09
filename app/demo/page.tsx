'use client';

import React from 'react';
import Link from 'next/link';
import {
    Sprout,
    Store,
    ShieldCheck,
    ArrowRight,
    CheckCircle2,
    MapPin,
    Tag,
    ShoppingCart,
    Activity
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DemoPage() {
    const roles = [
        {
            title: 'Farmer (Vendor)',
            role: 'FARMER',
            name: 'Agriberry Farms',
            email: 'sales@agriberry.com',
            description: 'Manage your farm profile, list seasonal products, and fulfill bulk orders from local grocers.',
            icon: <Sprout className="w-8 h-8 text-green-600" />,
            dashboardUrl: '/farmer',
            features: ['Product Management', 'Order Fulfillment', 'Connection Requests', 'Inventory Tracking'],
            color: 'border-green-100 bg-green-50/50',
        },
        {
            title: 'Grocer (Buyer)',
            role: 'GROCER',
            name: "Eddie's of Mount Vernon",
            email: 'buyer@eddiesmv.com',
            description: 'Discover local farms, connect with vendors, and place bulk orders for your retail store.',
            icon: <Store className="w-8 h-8 text-blue-600" />,
            dashboardUrl: '/grocer',
            features: ['Marketplace Access', 'Vendor Discovery', 'Bulk Ordering', 'Order History'],
            color: 'border-blue-100 bg-blue-50/50',
        },
        {
            title: 'Platform Admin',
            role: 'ADMIN',
            name: 'Platform Admin',
            email: 'admin@farmtogrocer.com',
            description: 'Full visibility across all vendors, grocers, connections, and system-wide transactions.',
            icon: <ShieldCheck className="w-8 h-8 text-purple-600" />,
            dashboardUrl: '/admin',
            features: ['User Management', 'System Analytics', 'Conflict Resolution', 'Platform Settings'],
            color: 'border-purple-100 bg-purple-50/50',
        },
    ];

    return (
        <div className="min-h-screen bg-neutral-50 py-20 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6 border border-neutral-200">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                        </span>
                        <span className="text-sm font-semibold text-neutral-800 tracking-tight uppercase">Demo Control Room</span>
                    </div>
                    <h1 className="text-5xl font-extrabold text-neutral-900 tracking-tight mb-4">
                        Step directly into the seeded workflow.
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                        This environment skips public signup so you can move straight into the product experience.
                        Choose a vendor, grocer, or admin profile and explore exact role-based workflows.
                    </p>
                </div>

                {/* Roles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {roles.map((role) => (
                        <div
                            key={role.role}
                            className={`relative overflow-hidden group rounded-3xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${role.color}`}
                        >
                            <div className="p-8">
                                <div className="mb-6 p-4 bg-white rounded-2xl w-fit shadow-sm">
                                    {role.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-900 mb-2">{role.title}</h3>
                                <p className="text-sm font-semibold text-neutral-500 mb-4">{role.name}</p>
                                <p className="text-neutral-600 mb-8 leading-relaxed">
                                    {role.description}
                                </p>

                                <div className="space-y-3 mb-10">
                                    {role.features.map((feature) => (
                                        <div key={feature} className="flex items-center text-sm text-neutral-600">
                                            <CheckCircle2 className="w-4 h-4 mr-2 text-neutral-400" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <Link href={`/login?email=${role.email}`} passHref>
                                    <Button className="w-full bg-neutral-900 hover:bg-black text-white rounded-xl h-12 text-base font-semibold transition-all group">
                                        Login as {role.role.toLowerCase()}
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Info Blocks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-[40px] p-12 shadow-sm border border-neutral-100">
                    <div>
                        <div className="flex items-center space-x-3 mb-6">
                            <Activity className="w-6 h-6 text-blue-500" />
                            <h2 className="text-2xl font-bold text-neutral-900">Recommended happy path</h2>
                        </div>
                        <p className="text-neutral-600 leading-relaxed mb-6">
                            Start as <strong>Eddie’s of Mount Vernon (Grocer)</strong>, place a test order with <strong>Agriberry Farms (Farmer)</strong>, then switch to the Farmer and Admin dashboards to see the same transaction move across all three views.
                        </p>
                        <div className="flex items-center text-sm font-semibold text-blue-600 space-x-2">
                            <span>View full workflow documentation</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </div>

                    <div className="space-y-6 border-l border-neutral-100 pl-12">
                        <h2 className="text-2xl font-bold text-neutral-900 mb-2">What this demo proves</h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <div className="bg-neutral-50 p-2 rounded-lg mt-1 mr-4">
                                    <ShoppingCart className="w-5 h-5 text-neutral-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-neutral-800">Unified Transactions</h4>
                                    <p className="text-sm text-neutral-500">Orders move cleanly across buyer, vendor, and admin views.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-neutral-50 p-2 rounded-lg mt-1 mr-4">
                                    <MapPin className="w-5 h-5 text-neutral-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-neutral-800">Local Routing</h4>
                                    <p className="text-sm text-neutral-500">Service areas and delivery days are enforced based on geography.</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="bg-neutral-50 p-2 rounded-lg mt-1 mr-4">
                                    <Tag className="w-5 h-5 text-neutral-400" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-neutral-800">B2B Pricing</h4>
                                    <p className="text-sm text-neutral-500">Product pack sizes and wholesale pricing are clearly defined.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="text-center mt-16 text-neutral-400 text-sm">
                    <p>Login credentials for all demo accounts: <strong>password123</strong></p>
                </div>
            </div>
        </div>
    );
}
