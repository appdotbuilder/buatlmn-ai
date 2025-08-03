import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { type SharedData } from '@/types';

export default function Dashboard() {
    const { auth } = usePage<SharedData>().props;

    // Mock data - in real app this would come from props
    const stats = {
        pages_generated: 12,
        pages_remaining: 38,
        current_plan: 'Pro',
        next_billing: 'Dec 15, 2024'
    };

    const recentPages = [
        { id: 1, title: 'Photography Portfolio', status: 'completed', created_at: '2 hours ago' },
        { id: 2, title: 'Restaurant Website', status: 'completed', created_at: '1 day ago' },
        { id: 3, title: 'Tech Startup Landing', status: 'completed', created_at: '3 days ago' },
    ];

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome back, {auth.user?.name}! 👋
                    </h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Ready to create something amazing with AI?
                    </p>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-8 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">Create Your Next Website 🚀</h2>
                            <p className="text-blue-100 mb-4">
                                Transform your ideas into stunning websites with AI in just minutes
                            </p>
                            <Link
                                href={route('page-generator')}
                                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
                            >
                                <span>🎨</span>
                                <span>Start Creating</span>
                            </Link>
                        </div>
                        <div className="hidden md:block">
                            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                                <span className="text-6xl">🤖</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">📊</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Pages Generated</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pages_generated}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Remaining This Month</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.pages_remaining}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">💎</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Current Plan</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.current_plan}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">📅</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Next Billing</p>
                                <p className="text-lg font-bold text-gray-900">{stats.next_billing}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recent Pages */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">Recent Pages 📄</h2>
                                <Link
                                    href={route('page-generator')}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    View All →
                                </Link>
                            </div>
                            
                            {recentPages.length > 0 ? (
                                <div className="space-y-4">
                                    {recentPages.map((page) => (
                                        <div key={page.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-lg">🌐</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{page.title}</h3>
                                                    <p className="text-sm text-gray-600">{page.created_at}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-3">
                                                <span className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                                                    page.status === 'completed' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : page.status === 'generating'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {page.status === 'completed' ? '✅ Complete' : 
                                                     page.status === 'generating' ? '⏳ Generating' : '❌ Failed'}
                                                </span>
                                                <button className="text-blue-600 hover:text-blue-800 font-medium">
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-3xl">🎨</span>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No pages yet</h3>
                                    <p className="text-gray-600 mb-4">Create your first AI-generated website!</p>
                                    <Link
                                        href={route('page-generator')}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Quick Links & Tips */}
                    <div className="space-y-6">
                        {/* Quick Links */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions ⚡</h2>
                            <div className="space-y-3">
                                <Link
                                    href={route('page-generator')}
                                    className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    <span className="text-xl">🎨</span>
                                    <span className="font-medium text-gray-900">Create New Website</span>
                                </Link>
                                <Link
                                    href={route('subscriptions.index')}
                                    className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                                >
                                    <span className="text-xl">💎</span>
                                    <span className="font-medium text-gray-900">Manage Subscription</span>
                                </Link>
                                <button className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors w-full text-left">
                                    <span className="text-xl">📞</span>
                                    <span className="font-medium text-gray-900">Contact Support</span>
                                </button>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">💡 Pro Tips</h2>
                            <ul className="space-y-3 text-sm text-gray-700">
                                <li className="flex items-start space-x-2">
                                    <span className="text-yellow-500">⭐</span>
                                    <span>Be detailed in your prompts for better results</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-yellow-500">🎨</span>
                                    <span>Try different template styles for variety</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-yellow-500">🔄</span>
                                    <span>You can always regenerate if not satisfied</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-yellow-500">📱</span>
                                    <span>All websites are mobile-responsive</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}