import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface SubscriptionPlan {
    id: number;
    name: string;
    description: string;
    price: number;
    formatted_price: string;
    billing_period: string;
    page_generations_limit: number | null;
    features: string[];
    is_unlimited: boolean;
}

interface CurrentSubscription {
    id: number;
    plan_id: number;
    plan_name: string;
    status: string;
    current_period_end: string;
    pages_generated: number;
    remaining_generations: number | null;
    can_generate: boolean;
}

interface Props {
    plans: SubscriptionPlan[];
    current_subscription: CurrentSubscription | null;
    [key: string]: unknown;
}

export default function SubscriptionIndex({ plans, current_subscription }: Props) {
    const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubscribe = (planId: number) => {
        setSelectedPlan(planId);
        setIsSubmitting(true);
        
        router.post(route('subscriptions.store'), { plan_id: planId }, {
            onFinish: () => {
                setIsSubmitting(false);
                setSelectedPlan(null);
            },
        });
    };

    const handleCancelSubscription = () => {
        if (confirm('Are you sure you want to cancel your subscription?')) {
            router.delete(route('subscriptions.destroy'));
        }
    };

    const isCurrentPlan = (planId: number) => {
        return current_subscription?.plan_id === planId;
    };

    const monthlyPlans = plans.filter(plan => plan.billing_period === 'monthly');
    const yearlyPlans = plans.filter(plan => plan.billing_period === 'yearly');

    return (
        <AppShell>
            <Head title="Subscription Plans" />
            
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan 💎</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Unlock the full power of AI website generation with our flexible subscription plans
                    </p>
                </div>

                {/* Current Subscription Status */}
                {current_subscription && (
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-12">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Current Plan: {current_subscription.plan_name} ✨
                                </h2>
                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Status:</span>
                                        <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                                            current_subscription.status === 'active' 
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {current_subscription.status === 'active' ? '✅ Active' : '❌ Inactive'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Renews:</span>
                                        <span className="ml-2 font-medium">{current_subscription.current_period_end}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Usage:</span>
                                        <span className="ml-2 font-medium">
                                            {current_subscription.pages_generated} / {
                                                current_subscription.remaining_generations === null 
                                                    ? 'Unlimited' 
                                                    : (current_subscription.pages_generated + current_subscription.remaining_generations)
                                            } pages
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={handleCancelSubscription}
                                className="bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors"
                            >
                                Cancel Plan
                            </button>
                        </div>
                    </div>
                )}

                {/* Monthly Plans */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Monthly Plans 📅</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {monthlyPlans.map((plan) => (
                            <div
                                key={plan.id}
                                className={`bg-white rounded-2xl shadow-lg border-2 p-8 relative ${
                                    plan.name === 'Pro' 
                                        ? 'border-blue-500 scale-105' 
                                        : isCurrentPlan(plan.id)
                                        ? 'border-green-500'
                                        : 'border-gray-200'
                                }`}
                            >
                                {plan.name === 'Pro' && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                        🔥 Most Popular
                                    </div>
                                )}
                                {isCurrentPlan(plan.id) && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                        ✅ Current Plan
                                    </div>
                                )}
                                
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                    <p className="text-gray-600 mb-4">{plan.description}</p>
                                    <div className="text-4xl font-bold text-gray-900 mb-2">
                                        {plan.formatted_price}
                                        <span className="text-base font-normal text-gray-500">/month</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start space-x-3">
                                            <span className="text-green-500 mt-1">✓</span>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => handleSubscribe(plan.id)}
                                    disabled={isCurrentPlan(plan.id) || (isSubmitting && selectedPlan === plan.id)}
                                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                                        isCurrentPlan(plan.id)
                                            ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                            : plan.name === 'Pro'
                                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105'
                                            : plan.name === 'Free'
                                            ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            : 'bg-gray-900 text-white hover:bg-gray-800'
                                    }`}
                                >
                                    {isSubmitting && selectedPlan === plan.id ? (
                                        <span className="flex items-center justify-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Processing...</span>
                                        </span>
                                    ) : isCurrentPlan(plan.id) ? (
                                        'Current Plan'
                                    ) : plan.name === 'Free' ? (
                                        'Start Free'
                                    ) : (
                                        `Choose ${plan.name}`
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Annual Plans */}
                {yearlyPlans.length > 0 && (
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">Annual Plans 🎉</h2>
                        <p className="text-center text-green-600 font-medium mb-8">💰 Save 2 months with annual billing!</p>
                        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {yearlyPlans.map((plan) => (
                                <div
                                    key={plan.id}
                                    className={`bg-white rounded-2xl shadow-lg border-2 p-8 relative ${
                                        isCurrentPlan(plan.id) ? 'border-green-500' : 'border-gray-200'
                                    }`}
                                >
                                    {isCurrentPlan(plan.id) && (
                                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                            ✅ Current Plan
                                        </div>
                                    )}
                                    
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                        <p className="text-gray-600 mb-4">{plan.description}</p>
                                        <div className="text-4xl font-bold text-gray-900 mb-2">
                                            {plan.formatted_price}
                                            <span className="text-base font-normal text-gray-500">/year</span>
                                        </div>
                                        <div className="text-sm text-green-600 font-medium">
                                            Save ${((plan.price / 12) * 2).toFixed(0)} compared to monthly
                                        </div>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start space-x-3">
                                                <span className="text-green-500 mt-1">✓</span>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <button
                                        onClick={() => handleSubscribe(plan.id)}
                                        disabled={isCurrentPlan(plan.id) || (isSubmitting && selectedPlan === plan.id)}
                                        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                                            isCurrentPlan(plan.id)
                                                ? 'bg-green-100 text-green-700 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-green-600 to-blue-600 text-white hover:shadow-lg hover:scale-105'
                                        }`}
                                    >
                                        {isSubmitting && selectedPlan === plan.id ? (
                                            <span className="flex items-center justify-center space-x-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                                <span>Processing...</span>
                                            </span>
                                        ) : isCurrentPlan(plan.id) ? (
                                            'Current Plan'
                                        ) : (
                                            `Choose ${plan.name}`
                                        )}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* FAQ or Additional Info */}
                <div className="mt-16 bg-gray-50 rounded-2xl p-8">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Frequently Asked Questions 🤔</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
                            <p className="text-gray-600">Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">What happens to my generated pages?</h3>
                            <p className="text-gray-600">All your generated pages remain yours forever, even if you downgrade or cancel your subscription.</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
                            <p className="text-gray-600">We offer a 30-day money-back guarantee on all paid plans. No questions asked!</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">Is there a setup fee?</h3>
                            <p className="text-gray-600">No setup fees, hidden costs, or surprises. What you see is what you pay.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}