<?php

namespace Database\Seeders;

use App\Models\SubscriptionPlan;
use Illuminate\Database\Seeder;

class SubscriptionPlanSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        SubscriptionPlan::create([
            'name' => 'Free',
            'description' => 'Perfect for trying out BuatLaman AI with basic features',
            'price' => 0.00,
            'billing_period' => 'monthly',
            'page_generations_limit' => 3,
            'features' => [
                '3 page generations per month',
                'Basic templates',
                'Standard support',
                'Export to HTML/CSS',
            ],
            'is_active' => true,
            'sort_order' => 1,
        ]);

        SubscriptionPlan::create([
            'name' => 'Pro',
            'description' => 'Ideal for professionals and small businesses',
            'price' => 19.99,
            'billing_period' => 'monthly',
            'page_generations_limit' => 50,
            'features' => [
                '50 page generations per month',
                'Premium templates',
                'Advanced customization',
                'Priority support',
                'Export to HTML/CSS',
                'Custom domain integration',
            ],
            'is_active' => true,
            'sort_order' => 2,
        ]);

        SubscriptionPlan::create([
            'name' => 'Business',
            'description' => 'Perfect for agencies and large teams',
            'price' => 49.99,
            'billing_period' => 'monthly',
            'page_generations_limit' => null, // unlimited
            'features' => [
                'Unlimited page generations',
                'All premium templates',
                'Advanced AI customization',
                'White-label options',
                'Priority support',
                'Export to HTML/CSS',
                'Custom domain integration',
                'Team collaboration tools',
                'API access',
            ],
            'is_active' => true,
            'sort_order' => 3,
        ]);

        SubscriptionPlan::create([
            'name' => 'Pro Annual',
            'description' => 'Pro plan with annual billing (2 months free)',
            'price' => 199.99,
            'billing_period' => 'yearly',
            'page_generations_limit' => 50,
            'features' => [
                '50 page generations per month',
                'Premium templates',
                'Advanced customization',
                'Priority support',
                'Export to HTML/CSS',
                'Custom domain integration',
                'Annual billing discount',
            ],
            'is_active' => true,
            'sort_order' => 4,
        ]);

        SubscriptionPlan::create([
            'name' => 'Business Annual',
            'description' => 'Business plan with annual billing (2 months free)',
            'price' => 499.99,
            'billing_period' => 'yearly',
            'page_generations_limit' => null, // unlimited
            'features' => [
                'Unlimited page generations',
                'All premium templates',
                'Advanced AI customization',
                'White-label options',
                'Priority support',
                'Export to HTML/CSS',
                'Custom domain integration',
                'Team collaboration tools',
                'API access',
                'Annual billing discount',
            ],
            'is_active' => true,
            'sort_order' => 5,
        ]);
    }
}