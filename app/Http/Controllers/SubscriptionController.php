<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\SubscriptionPlan;
use App\Models\UserSubscription;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SubscriptionController extends Controller
{
    /**
     * Display subscription plans.
     */
    public function index()
    {
        $plans = SubscriptionPlan::active()
            ->orderBy('sort_order')
            ->orderBy('price')
            ->get();

        $user = auth()->user();
        $currentSubscription = $user?->activeSubscription;

        return Inertia::render('subscriptions/index', [
            'plans' => $plans->map(fn($plan) => [
                'id' => $plan->id,
                'name' => $plan->name,
                'description' => $plan->description,
                'price' => $plan->price,
                'formatted_price' => $plan->formatted_price,
                'billing_period' => $plan->billing_period,
                'page_generations_limit' => $plan->page_generations_limit,
                'features' => $plan->features,
                'is_unlimited' => $plan->hasUnlimitedGenerations(),
            ]),
            'current_subscription' => $currentSubscription ? [
                'id' => $currentSubscription->id,
                'plan_id' => $currentSubscription->subscription_plan_id,
                'plan_name' => $currentSubscription->subscriptionPlan->name,
                'status' => $currentSubscription->status,
                'current_period_end' => $currentSubscription->current_period_end->format('M j, Y'),
                'pages_generated' => $currentSubscription->pages_generated_this_period,
                'remaining_generations' => $currentSubscription->getRemainingGenerations(),
                'can_generate' => $currentSubscription->canGeneratePages(),
            ] : null,
        ]);
    }

    /**
     * Subscribe to a plan.
     */
    public function store(Request $request)
    {
        $request->validate([
            'plan_id' => 'required|exists:subscription_plans,id',
        ]);

        $user = auth()->user();
        $plan = SubscriptionPlan::findOrFail($request->plan_id);

        // Cancel existing subscription
        $existingSubscription = $user->activeSubscription;
        if ($existingSubscription) {
            $existingSubscription->update(['status' => 'cancelled']);
        }

        // Create new subscription
        $startDate = now();
        $endDate = $plan->billing_period === 'yearly' 
            ? $startDate->copy()->addYear()
            : $startDate->copy()->addMonth();

        UserSubscription::create([
            'user_id' => $user->id,
            'subscription_plan_id' => $plan->id,
            'starts_at' => $startDate,
            'status' => 'active',
            'current_period_start' => $startDate,
            'current_period_end' => $endDate,
            'pages_generated_this_period' => 0,
        ]);

        return redirect()->route('subscriptions.index')
            ->with('success', "Successfully subscribed to {$plan->name}!");
    }

    /**
     * Cancel current subscription.
     */
    public function destroy()
    {
        $user = auth()->user();
        $subscription = $user->activeSubscription;

        if (!$subscription) {
            return back()->withErrors(['subscription' => 'No active subscription found.']);
        }

        $subscription->update(['status' => 'cancelled']);

        return back()->with('success', 'Subscription cancelled successfully.');
    }
}