import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="BuatLaman AI - Create Stunning Websites with AI">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
                <meta name="description" content="Create beautiful, professional websites in minutes using the power of AI. No coding required!" />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Navigation */}
                <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">🤖</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">BuatLaman AI</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <>
                                        <Link
                                            href={route('page-generator')}
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                                        >
                                            Create Website
                                        </Link>
                                        <Link
                                            href={route('dashboard')}
                                            className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                    </>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-gray-700 hover:text-gray-900 px-4 py-2 rounded-lg transition-colors"
                                        >
                                            Log in
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200"
                                        >
                                            Get Started Free
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-8">
                            ✨ Powered by Advanced AI Technology
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                            Create <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Beautiful Websites</span><br />
                            in Minutes with AI
                        </h1>
                        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                            🚀 Transform your ideas into stunning, professional websites using cutting-edge AI. 
                            No coding skills required – just describe what you want and watch the magic happen!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {auth.user ? (
                                <Link
                                    href={route('page-generator')}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                                >
                                    🎨 Start Creating Now
                                </Link>
                            ) : (
                                <Link
                                    href={route('register')}
                                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                                >
                                    🎨 Start Free Trial
                                </Link>
                            )}
                            <button className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200">
                                📺 Watch Demo
                            </button>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose BuatLaman AI?</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Experience the future of web design with our intelligent platform
                            </p>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">🤖</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI-Powered Design</h3>
                                <p className="text-gray-600">
                                    Our advanced AI understands your vision and creates pixel-perfect websites tailored to your needs.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Lightning Fast</h3>
                                <p className="text-gray-600">
                                    Generate complete websites in under 30 seconds. From concept to code in record time.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">🎨</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Professional Templates</h3>
                                <p className="text-gray-600">
                                    Choose from modern, classic, minimal, creative, and business styles to match your brand.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">📱</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Fully Responsive</h3>
                                <p className="text-gray-600">
                                    Every website looks perfect on desktop, tablet, and mobile devices automatically.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-pink-600 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">💎</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Clean Code Export</h3>
                                <p className="text-gray-600">
                                    Download production-ready HTML and CSS that's clean, semantic, and optimized.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl hover:shadow-lg transition-shadow">
                                <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mb-4">
                                    <span className="text-2xl">🔄</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">Unlimited Revisions</h3>
                                <p className="text-gray-600">
                                    Not happy with the result? Regenerate and refine until it's exactly what you want.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing Preview */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
                        <p className="text-xl text-gray-600 mb-12">
                            Start free, upgrade when you need more power
                        </p>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
                                <div className="text-4xl font-bold text-gray-900 mb-4">$0<span className="text-base font-normal text-gray-500">/month</span></div>
                                <ul className="text-left space-y-3 mb-8">
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>3 page generations</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Basic templates</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>HTML/CSS export</li>
                                </ul>
                                <Link
                                    href={route('register')}
                                    className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors inline-block text-center"
                                >
                                    Get Started
                                </Link>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-blue-500 relative">
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                    Most Popular
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                                <div className="text-4xl font-bold text-gray-900 mb-4">$19<span className="text-base font-normal text-gray-500">/month</span></div>
                                <ul className="text-left space-y-3 mb-8">
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>50 page generations</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Premium templates</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Priority support</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Custom domains</li>
                                </ul>
                                <Link
                                    href={route('register')}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-block text-center"
                                >
                                    Start Pro Trial
                                </Link>
                            </div>
                            <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-transparent">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
                                <div className="text-4xl font-bold text-gray-900 mb-4">$49<span className="text-base font-normal text-gray-500">/month</span></div>
                                <ul className="text-left space-y-3 mb-8">
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>Unlimited generations</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>All templates</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>White-label options</li>
                                    <li className="flex items-center"><span className="text-green-500 mr-2">✓</span>API access</li>
                                </ul>
                                <Link
                                    href={route('register')}
                                    className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors inline-block text-center"
                                >
                                    Go Business
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Creating your dream website is easier than ever
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-12">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl text-white">1</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">📝 Describe Your Vision</h3>
                                <p className="text-gray-600 text-lg">
                                    Tell our AI what kind of website you want. Be as detailed or as simple as you like.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl text-white">2</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">🤖 AI Creates Magic</h3>
                                <p className="text-gray-600 text-lg">
                                    Our AI analyzes your request and generates a beautiful, custom website in seconds.
                                </p>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-3xl text-white">3</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">🚀 Launch & Export</h3>
                                <p className="text-gray-600 text-lg">
                                    Preview, refine, and export your website. Deploy anywhere or use our hosting.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Ready to Build Something Amazing?
                        </h2>
                        <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                            Join thousands of creators who've already built stunning websites with BuatLaman AI. 
                            Your next project is just one click away! 🎯
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {auth.user ? (
                                <Link
                                    href={route('page-generator')}
                                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200"
                                >
                                    🎨 Create Your Website Now
                                </Link>
                            ) : (
                                <Link
                                    href={route('register')}
                                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200"
                                >
                                    🎨 Start Your Free Trial
                                </Link>
                            )}
                        </div>
                        <p className="text-blue-200 text-sm mt-4">
                            ✨ No credit card required • ⚡ Generate your first website in 30 seconds
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <div className="flex items-center justify-center space-x-2 mb-6">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">🤖</span>
                            </div>
                            <span className="text-2xl font-bold text-white">BuatLaman AI</span>
                        </div>
                        <p className="text-gray-400 mb-6">
                            The future of web design is here. Create beautiful websites with the power of artificial intelligence.
                        </p>
                        <div className="border-t border-gray-800 pt-8">
                            <p className="text-gray-500">
                                &copy; {new Date().getFullYear()} BuatLaman AI. Built with ❤️ and cutting-edge AI technology.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}