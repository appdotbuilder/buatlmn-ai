import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Props {
    page: {
        id: number;
        title: string;
        description: string | null;
        prompt: string;
        template_style: string | null;
    };
    [key: string]: unknown;
}

export default function EditGeneratedPage({ page }: Props) {
    const [formData, setFormData] = useState({
        title: page.title,
        description: page.description || '',
        prompt: page.prompt,
        template_style: page.template_style || 'modern',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.patch(route('pages.update', page.id), formData, {
            onFinish: () => setIsSubmitting(false),
        });
    };

    return (
        <AppShell>
            <Head title={`Edit ${page.title}`} />
            
            <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <Link 
                            href={route('pages.show', page.id)} 
                            className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                            ← Back to Page
                        </Link>
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Edit Website ✏️</h1>
                    <p className="text-lg text-gray-600 mt-2">
                        Make changes to regenerate your website with updated content
                    </p>
                </div>

                {/* Edit Form */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
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
                                rows={8}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Describe what kind of website you want to create. Be as detailed as possible - mention the purpose, target audience, key sections, style preferences, colors, and any specific features you need."
                                required
                            />
                            <div className="mt-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex items-start space-x-2">
                                    <span className="text-yellow-500 mt-0.5">⚠️</span>
                                    <div>
                                        <p className="text-sm text-yellow-800 font-medium mb-1">
                                            Regeneration Notice
                                        </p>
                                        <p className="text-sm text-yellow-700">
                                            Changing the prompt or template style will regenerate your website and count towards your monthly limit. 
                                            Only the title and description can be updated without regeneration.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-4 pt-6">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`flex-1 py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-200 ${
                                    isSubmitting
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                                }`}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        <span>🤖 Updating website...</span>
                                    </span>
                                ) : (
                                    '🚀 Update Website'
                                )}
                            </button>
                            <Link
                                href={route('pages.show', page.id)}
                                className="flex-1 py-4 px-6 rounded-lg font-semibold text-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors text-center"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>

                {/* Tips */}
                <div className="mt-8 bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Editing Tips</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-start space-x-2">
                            <span className="text-blue-500">📝</span>
                            <span>Title and description changes won't trigger regeneration</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-blue-500">🔄</span>
                            <span>Prompt or style changes will regenerate the entire website</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-blue-500">🎯</span>
                            <span>Be specific about changes you want to see in the regenerated version</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-blue-500">⏱️</span>
                            <span>Regeneration typically takes 10-30 seconds</span>
                        </li>
                    </ul>
                </div>
            </div>
        </AppShell>
    );
}