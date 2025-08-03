import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Props {
    subscription?: {
        plan: {
            id: number;
            name: string;
            page_generations_limit: number | null;
        };
        remaining_generations: number | null;
        can_generate: boolean;
    } | null;
    recent_pages: Array<{
        id: number;
        title: string;
        status: string;
        created_at: string;
    }>;
    [key: string]: unknown;
}

export default function PageGenerator({ subscription, recent_pages }: Props) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        prompt: '',
        template_style: 'modern',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.post(route('pages.store'), formData, {
            onFinish: () => setIsSubmitting(false),
            onSuccess: () => {
                setFormData({
                    title: '',
                    description: '',
                    prompt: '',
                    template_style: 'modern',
                });
            },
        });
    };

    const canGenerate = subscription?.can_generate ?? false;
    const remainingGenerations = subscription?.remaining_generations;

    return (
        <AppShell>
            <Head title="AI Website Generator" />
            
            <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white text-xl">🤖</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">AI Website Generator</h1>
                    </div>
                    <p className="text-lg text-gray-600">
                        Describe your vision and watch AI create a beautiful website for you ✨
                    </p>
                </div>

                {/* Subscription Status */}
                {subscription && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Current Plan: {subscription.plan.name} 💎
                                </h3>
                                <p className="text-gray-600">
                                    {remainingGenerations === null 
                                        ? 'Unlimited page generations remaining 🚀' 
                                        : `${remainingGenerations} page generations remaining this month`}
                                </p>
                            </div>
                            <Link
                                href={route('subscriptions.index')}
                                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium border border-blue-200 hover:bg-blue-50 transition-colors"
                            >
                                Manage Plan
                            </Link>
                        </div>
                        {!canGenerate && (
                            <div className="mt-4 p-4 bg-orange-100 border border-orange-200 rounded-lg">
                                <p className="text-orange-800 font-medium">
                                    ⚠️ You've reached your generation limit. Upgrade your plan to continue creating websites.
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Generator Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Your Website 🎨</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                        Website Title *
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={formData.title}
                                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., My Photography Portfolio"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                                        Short Description
                                    </label>
                                    <input
                                        type="text"
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., Showcasing my professional photography work"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="template_style" className="block text-sm font-medium text-gray-700 mb-2">
                                        Template Style
                                    </label>
                                    <select
                                        id="template_style"
                                        value={formData.template_style}
                                        onChange={(e) => setFormData(prev => ({ ...prev, template_style: e.target.value }))}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="modern">🔥 Modern - Sleek and contemporary</option>
                                        <option value="classic">📚 Classic - Traditional and elegant</option>
                                        <option value="minimal">✨ Minimal - Clean and simple</option>
                                        <option value="creative">🎨 Creative - Bold and artistic</option>
                                        <option value="business">💼 Business - Professional and corporate</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
                                        Describe Your Website *
                                    </label>
                                    <textarea
                                        id="prompt"
                                        value={formData.prompt}
                                        onChange={(e) => setFormData(prev => ({ ...prev, prompt: e.target.value }))}
                                        rows={6}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Describe what kind of website you want to create. Be as detailed as possible - mention the purpose, target audience, key sections, style preferences, colors, and any specific features you need. The more details you provide, the better your website will be!"
                                        required
                                    />
                                    <p className="text-sm text-gray-500 mt-2">
                                        💡 Tip: Include details about purpose, sections, colors, and target audience for best results
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={!canGenerate || isSubmitting}
                                    className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                                        canGenerate && !isSubmitting
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center space-x-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>🤖 AI is creating your website...</span>
                                        </span>
                                    ) : canGenerate ? (
                                        '🚀 Generate My Website'
                                    ) : (
                                        '⚠️ Upgrade Plan to Continue'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Recent Pages */}
                        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">📄 Recent Pages</h3>
                            {recent_pages.length > 0 ? (
                                <div className="space-y-3">
                                    {recent_pages.map((page) => (
                                        <div key={page.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-gray-900 truncate">
                                                    {page.title}
                                                </h4>
                                                <p className="text-xs text-gray-500">{page.created_at}</p>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                                                    page.status === 'completed' 
                                                        ? 'bg-green-100 text-green-800'
                                                        : page.status === 'generating'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {page.status === 'completed' ? '✅' : page.status === 'generating' ? '⏳' : '❌'}
                                                </span>
                                                <Link
                                                    href={route('pages.show', page.id)}
                                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">
                                    No pages created yet. Start by generating your first website! 🚀
                                </p>
                            )}
                        </div>

                        {/* Tips */}
                        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                            <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Pro Tips</h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start space-x-2">
                                    <span className="text-yellow-500">⭐</span>
                                    <span>Be specific about your target audience and website purpose</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-yellow-500">🎨</span>
                                    <span>Mention preferred colors, fonts, or visual styles</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-yellow-500">📱</span>
                                    <span>Describe key sections like About, Services, Contact</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <span className="text-yellow-500">🔄</span>
                                    <span>You can always regenerate if not satisfied</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}