import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface Props {
    page: {
        id: number;
        title: string;
        description: string | null;
        prompt: string;
        generated_html: string;
        generated_css: string | null;
        template_style: string | null;
        status: string;
        created_at: string;
    };
    [key: string]: unknown;
}

export default function ShowGeneratedPage({ page }: Props) {
    const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css'>('preview');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDelete = () => {
        router.delete(route('pages.destroy', page.id), {
            onSuccess: () => setShowDeleteModal(false),
        });
    };

    const downloadCode = (type: 'html' | 'css' | 'both') => {
        if (type === 'html') {
            const blob = new Blob([page.generated_html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${page.title.toLowerCase().replace(/\s+/g, '-')}.html`;
            a.click();
            URL.revokeObjectURL(url);
        } else if (type === 'css' && page.generated_css) {
            const blob = new Blob([page.generated_css], { type: 'text/css' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${page.title.toLowerCase().replace(/\s+/g, '-')}.css`;
            a.click();
            URL.revokeObjectURL(url);
        } else if (type === 'both') {
            // Create a zip file (simplified - in real app would use JSZip)
            const htmlBlob = new Blob([page.generated_html], { type: 'text/html' });
            const htmlUrl = URL.createObjectURL(htmlBlob);
            const htmlA = document.createElement('a');
            htmlA.href = htmlUrl;
            htmlA.download = `${page.title.toLowerCase().replace(/\s+/g, '-')}.html`;
            htmlA.click();
            URL.revokeObjectURL(htmlUrl);

            if (page.generated_css) {
                setTimeout(() => {
                    const cssBlob = new Blob([page.generated_css!], { type: 'text/css' });
                    const cssUrl = URL.createObjectURL(cssBlob);
                    const cssA = document.createElement('a');
                    cssA.href = cssUrl;
                    cssA.download = `${page.title.toLowerCase().replace(/\s+/g, '-')}.css`;
                    cssA.click();
                    URL.revokeObjectURL(cssUrl);
                }, 500);
            }
        }
    };

    return (
        <AppShell>
            <Head title={`${page.title} - Generated Website`} />
            
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <Link 
                                href={route('page-generator')} 
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                ← Back to Generator
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">{page.title}</h1>
                        {page.description && (
                            <p className="text-lg text-gray-600 mt-1">{page.description}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                            <span>Created: {page.created_at}</span>
                            <span>•</span>
                            <span className="capitalize">Style: {page.template_style}</span>
                            <span>•</span>
                            <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                                page.status === 'completed' 
                                    ? 'bg-green-100 text-green-800'
                                    : page.status === 'generating'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-red-100 text-red-800'
                            }`}>
                                {page.status === 'completed' ? '✅ Complete' : 
                                 page.status === 'generating' ? '⏳ Generating' : '❌ Failed'}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Link
                            href={route('pages.edit', page.id)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            ✏️ Edit
                        </Link>
                        <div className="relative">
                            <button
                                onClick={() => downloadCode('both')}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                            >
                                📥 Download
                            </button>
                        </div>
                        <button
                            onClick={() => setShowDeleteModal(true)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                </div>

                {/* Original Prompt */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">Original Prompt 💭</h2>
                    <p className="text-gray-700 leading-relaxed">{page.prompt}</p>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('preview')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'preview'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                👁️ Preview
                            </button>
                            <button
                                onClick={() => setActiveTab('html')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'html'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                📝 HTML Code
                            </button>
                            {page.generated_css && (
                                <button
                                    onClick={() => setActiveTab('css')}
                                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                        activeTab === 'css'
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                                >
                                    🎨 CSS Code
                                </button>
                            )}
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'preview' && (
                            <div className="bg-gray-100 rounded-lg p-4">
                                <div className="bg-white rounded-lg shadow-inner overflow-hidden" style={{ minHeight: '600px' }}>
                                    <iframe
                                        srcDoc={`
                                            <style>${page.generated_css || ''}</style>
                                            ${page.generated_html}
                                        `}
                                        className="w-full h-96 border-0"
                                        style={{ minHeight: '600px' }}
                                        title="Website Preview"
                                    />
                                </div>
                                <div className="flex justify-center mt-4">
                                    <p className="text-sm text-gray-500">
                                        📱 Preview shows how your website will look. Use the HTML/CSS tabs to see the code.
                                    </p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'html' && (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">HTML Code</h3>
                                    <button
                                        onClick={() => downloadCode('html')}
                                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        📥 Download HTML
                                    </button>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-sm text-gray-100">
                                        <code>{page.generated_html}</code>
                                    </pre>
                                </div>
                            </div>
                        )}

                        {activeTab === 'css' && page.generated_css && (
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-900">CSS Code</h3>
                                    <button
                                        onClick={() => downloadCode('css')}
                                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        📥 Download CSS
                                    </button>
                                </div>
                                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-sm text-gray-100">
                                        <code>{page.generated_css}</code>
                                    </pre>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Delete</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to delete "{page.title}"? This action cannot be undone.
                        </p>
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AppShell>
    );
}